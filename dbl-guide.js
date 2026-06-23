(function () {
  function guideLanguage() {
    return window.DBL_SITE?.getLanguage?.() || document.documentElement.lang || 'ar';
  }
let assistantKnowledgePromise = null;
const assistantSessionKey = 'dbl-guide-session';
const assistantHistoryKey = 'dbl-guide-history';
const assistantPositionKey = 'dbl-guide-position';
const assistantBubbleDismissedKey = 'dbl-guide-bubble-dismissed';

function guideTranslation(key) {
  return window.DBL_SITE?.getTranslation?.(key) || key;
}

function guideCopyText(value) {
  return window.DBL_SITE?.copyTextToClipboard?.(value) || Promise.resolve();
}

function getAssistantText(key) {
  const translated = guideTranslation(`dblGuide.${key}`);
  if (translated !== `dblGuide.${key}`) return translated;

  const dictionary = {
    ar: {
      welcomeBubble: 'هل تريد مساعدة؟ اسأل DBL Guide',
      secondBubble: 'أقدر أرشح لك المنتج المناسب خلال دقيقة.',
      title: 'DBL Guide',
      status: 'متصل الآن',
      intro: 'مرحباً، أنا DBL Guide. أقدر أساعدك تختار المنتج المناسب أو أوضح لك طريقة الدفع.',
      goalQuestion: 'ما الذي تبحث عنه اليوم؟',
      returningIntro: 'أهلًا بعودتك. أتذكر أنك كنت تبحث عن {goal}. ما الذي تحتاجه الآن؟',
      placeholder: 'اكتب رسالتك...',
      send: 'إرسال',
      thinking: 'يفكر...',
      paymentReply: 'للدفع بالبطاقة استخدم Gumroad. إذا لا تملك بطاقة، افتح صفحة طرق الدفع البديلة لاستخدام Binance Pay أو USDT.',
      defaultReply: 'فهمت عليك. كنسخة تجريبية، أقدر أرشح لك منتجاً حسب هدفك: إطلاق مشروع، إدارة عملاء، أو استخدام AI بشكل أفضل.'
    },
    en: {
      welcomeBubble: 'Need help? Ask DBL Guide',
      secondBubble: 'I can recommend the right product in one minute.',
      title: 'DBL Guide',
      status: 'Online now',
      intro: 'Hi, I am DBL Guide. I can help you choose a product or understand the payment options.',
      goalQuestion: 'What are you looking for today?',
      returningIntro: 'Welcome back. I remember you were looking for {goal}. What do you need now?',
      placeholder: 'Write your message...',
      send: 'Send',
      thinking: 'Thinking...',
      paymentReply: 'Use Gumroad for card checkout. If you do not have a card, open Alternative Payment Methods for Binance Pay or USDT.',
      defaultReply: 'Got it. In this demo version, I can recommend a product based on your goal: launching, managing clients, or using AI better.'
    }
  };
  return dictionary[guideLanguage()]?.[key] || dictionary.en[key] || key;
}

function setAssistantState(widget, state) {
  widget.classList.remove('is-thinking', 'is-happy', 'is-open-wave');
  if (state === 'thinking') widget.classList.add('is-thinking');
  if (state === 'happy') widget.classList.add('is-happy');
  if (state === 'wave') {
    widget.classList.add('is-open-wave');
    window.setTimeout(() => widget.classList.remove('is-open-wave'), 900);
  }
}

function addAssistantMessage(messages, text, type = 'assistant', actions = []) {
  const message = document.createElement('div');
  message.className = `dbl-chat-message ${type === 'user' ? 'is-user' : 'is-assistant'}`;
  const body = document.createElement('span');
  body.textContent = text;
  message.appendChild(body);

  if (actions.length) {
    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'dbl-chat-actions';
    actions.forEach((action) => {
      const href = action.href || action.url;
      const button = document.createElement(href ? 'a' : 'button');
      button.className = 'dbl-chat-action';
      button.textContent = action.label;
      if (href) {
        button.href = href;
        button.target = action.external || /^https?:\/\//.test(href) ? '_blank' : '_self';
        button.rel = button.target === '_blank' ? 'noopener' : '';
      } else {
        button.type = 'button';
        button.dataset.assistantChoice = action.value || action.label;
        button.dataset.assistantLabel = action.label;
      }
      actionsWrap.appendChild(button);
    });
    message.appendChild(actionsWrap);
  }

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

async function loadAssistantKnowledge() {
  if (!assistantKnowledgePromise) {
    assistantKnowledgePromise = fetch('/assets/dbl-guide/products.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Knowledge request failed: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        console.warn('DBL Guide product knowledge unavailable:', error);
        return null;
      });
  }
  return assistantKnowledgePromise;
}

function findKnowledgeProduct(knowledge, input) {
  if (!knowledge?.products?.length) return null;
  const normalized = input.toLowerCase();
  const byId = (id) => knowledge.products.find((product) => product.id === id);

  if (/suite|bundle|complete|everything|all|best value|كامل|كاملة|كل|حزمة|أفضل قيمة|افضل قيمة/i.test(normalized)) {
    return byId('dbl-business-suite');
  }
  if (/prompt|ai|chatgpt|gemini|ذكاء|برومبت|برومبتات|مطالبات/i.test(normalized)) {
    return byId('dbl-prompt-vault');
  }
  if (/client|customer|freelance|pricing|revision|عميل|عملاء|فريلانسر|تسعير|تعديل|تعديلات/i.test(normalized)) {
    return byId('dbl-client-kit');
  }
  if (/start|beginner|launch|online|book|guide|بداية|مبتدئ|أبدأ|ابدأ|انطلاق|أونلاين|اونلاين|كتاب|دليل/i.test(normalized)) {
    return byId('digital-launch-bundle');
  }

  return byId('dbl-business-suite');
}

function loadAssistantSession() {
  try {
    return JSON.parse(localStorage.getItem(assistantSessionKey) || '{}');
  } catch (error) {
    return {};
  }
}

function saveAssistantSession(patch) {
  const session = {
    ...loadAssistantSession(),
    ...patch,
    updatedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(assistantSessionKey, JSON.stringify(session));
  } catch (error) {
    // The assistant can still work without persistence.
  }
  return session;
}

function loadAssistantHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(assistantHistoryKey) || '[]');
    return Array.isArray(history) ? history.slice(-10) : [];
  } catch (error) {
    return [];
  }
}

function saveAssistantHistory(history) {
  try {
    localStorage.setItem(assistantHistoryKey, JSON.stringify(history.slice(-10)));
  } catch (error) {
    // The assistant still works without persisted conversation history.
  }
}

function rememberAssistantMessage(role, content) {
  const text = String(content || '').trim();
  if (!text) return;
  const history = loadAssistantHistory();
  history.push({
    role: role === 'assistant' ? 'assistant' : 'user',
    content: text.slice(0, 900)
  });
  saveAssistantHistory(history);
}

function normalizeAssistantActions(actions) {
  if (!Array.isArray(actions)) return [];
  return actions.slice(0, 4).map((action) => {
    const label = String(action?.label || '').trim();
    if (!label) return null;
    const href = action.href || action.url;
    if (href) {
      return {
        label,
        href,
        external: Boolean(action.external) || /^https?:\/\//.test(href)
      };
    }
    return {
      label,
      value: action.value || label
    };
  }).filter(Boolean);
}

function assistantGoalOptions() {
  return guideLanguage() === 'ar'
    ? [
        { label: 'أريد البدء بالعمل أونلاين', value: 'start_online' },
        { label: 'أحتاج أدوات ذكاء اصطناعي', value: 'ai_tools' },
        { label: 'أريد تحسين التعامل مع العملاء', value: 'client_management' },
        { label: 'أريد الحزمة الكاملة', value: 'complete_bundle' },
        { label: 'لست متأكدًا', value: 'unsure' }
      ]
    : [
        { label: 'Start working online', value: 'start_online' },
        { label: 'I need AI tools', value: 'ai_tools' },
        { label: 'Improve client communication', value: 'client_management' },
        { label: 'I want the full bundle', value: 'complete_bundle' },
        { label: 'Not sure yet', value: 'unsure' }
      ];
}

function getGoalLabel(goal) {
  return assistantGoalOptions().find((option) => option.value === goal)?.label || goal;
}

function assistantExperienceOptions() {
  return guideLanguage() === 'ar'
    ? [
        { label: 'أنا مبتدئ', value: 'beginner' },
        { label: 'لدي خبرة', value: 'experienced' }
      ]
    : [
        { label: 'I am a beginner', value: 'beginner' },
        { label: 'I have experience', value: 'experienced' }
      ];
}

function detectGreeting(input) {
  return /^(hi|hello|hey|السلام عليكم|سلام|اهلا|أهلا|مرحبا|مرحباً|هلا)\b/i.test(input.trim());
}

function detectDetailsRequest(input) {
  return /details|more|explain|included|contents|تفاصيل|اشرح|ماذا يشمل|يشمل|المحتوى|محتوى|أكثر|اكثر/i.test(input);
}

function detectOutOfScope(input) {
  return /weather|football|politics|recipe|movie|طقس|سياسة|طبخ|فيلم|مباراة/i.test(input);
}

function detectGoal(input) {
  const normalized = input.toLowerCase();
  const chosen = assistantGoalOptions().find((option) => option.value === input || option.label === input);
  if (chosen) return chosen.value;
  if (/prompt|ai|chatgpt|gemini|ذكاء|برومبت|برومبتات|مطالبات/i.test(normalized)) return 'ai_tools';
  if (/client|customer|freelance|pricing|revision|عميل|عملاء|فريلانسر|تسعير|تعديل|تعديلات/i.test(normalized)) return 'client_management';
  if (/start|beginner|launch|online|book|guide|بداية|مبتدئ|أبدأ|ابدأ|انطلاق|أونلاين|اونلاين|كتاب|دليل/i.test(normalized)) return 'start_online';
  if (/suite|bundle|complete|everything|all|best value|كامل|كاملة|كل|حزمة|أفضل قيمة|افضل قيمة/i.test(normalized)) return 'complete_bundle';
  if (/not sure|unsure|confused|لست متأكد|مش متأكد|محتار|لا أعرف|ما اعرف/i.test(normalized)) return 'unsure';
  return null;
}

function detectExperience(input) {
  if (input === 'beginner') return 'beginner';
  if (input === 'experienced') return 'experienced';
  if (/beginner|new|مبتدئ|جديد|أول مرة|اول مرة/i.test(input)) return 'beginner';
  if (/experienced|advanced|محترف|خبرة|متقدم/i.test(input)) return 'experienced';
  return null;
}

function productForGoal(knowledge, goal, input = '') {
  const byId = (id) => knowledge?.products?.find((product) => product.id === id);
  if (goal === 'complete_bundle') return byId('dbl-business-suite');
  if (goal === 'ai_tools') return byId('dbl-prompt-vault');
  if (goal === 'client_management') return byId('dbl-client-kit');
  if (goal === 'start_online') return byId('digital-launch-bundle');
  if (goal === 'unsure') return findKnowledgeProduct(knowledge, input);
  return findKnowledgeProduct(knowledge, input);
}

function recommendationReason(goal, product) {
  if (guideLanguage() === 'ar') {
    const reasons = {
      complete_bundle: 'يجمع منتجات DBL الأساسية في حزمة واحدة وبأفضل قيمة',
      ai_tools: 'يركز على برومبتات AI جاهزة وشروحات عملية',
      client_management: 'يساعدك في رسائل العملاء والتسعير والتعديلات والتسليم',
      start_online: 'يعطيك نقطة بداية واضحة للعمل أونلاين والمنتجات الرقمية',
      unsure: 'يغطي أكثر من جانب مهم: AI والعملاء والانطلاق الرقمي'
    };
    return reasons[goal] || product?.main_benefits?.[0] || 'يناسب هدفك الحالي';
  }

  const reasons = {
    complete_bundle: 'it combines DBL core products in one best-value bundle',
    ai_tools: 'it focuses on ready-to-use AI prompts and practical guidance',
    client_management: 'it helps with client messages, pricing, revisions, and delivery',
    start_online: 'it gives you a clear starting point for online work and digital products',
    unsure: 'it covers AI, clients, and digital launch foundations together'
  };
  return reasons[goal] || product?.main_benefits?.[0] || 'it matches your current goal';
}

function buildRecommendationReply(product, goal) {
  if (!product) return getAssistantText('defaultReply');

  if (guideLanguage() === 'ar') {
    return `بناءً على كلامك، أرشح لك ${product.name} لأنه ${recommendationReason(goal, product)}.`;
  }

  return `Based on what you shared, I recommend ${product.name} because ${recommendationReason(goal, product)}.`;
}

function buildProductDetailsReply(product) {
  if (!product) return getAssistantText('defaultReply');
  const items = product.included_items || product.included_products?.map((item) => item.name) || [];
  const topItems = items.slice(0, 4).join(guideLanguage() === 'ar' ? '، ' : ', ');

  if (guideLanguage() === 'ar') {
    return `${product.name} سعره ${product.price}. يشمل: ${topItems}. مناسب إذا كنت تريد ${product.best_for?.[0] || 'حلًا عمليًا من DBL'}.`;
  }

  return `${product.name} is ${product.price}. It includes: ${topItems}. It is a good fit if you want ${product.best_for?.[0] || 'a practical DBL resource'}.`;
}

function buildAssistantIntro() {
  const session = loadAssistantSession();
  if (session.goal) {
    return {
      text: getAssistantText('returningIntro').replace('{goal}', getGoalLabel(session.goal)),
      actions: []
    };
  }
  return {
    text: `${getAssistantText('intro')} ${getAssistantText('goalQuestion')}`,
    actions: assistantGoalOptions()
  };
}

async function buildAssistantFlowReply(input) {
  const knowledge = await loadAssistantKnowledge();
  const session = loadAssistantSession();

  if (detectGreeting(input)) {
    saveAssistantSession({ stage: 'greeting' });
    return {
      text: guideLanguage() === 'ar' ? `أهلًا بك. ${getAssistantText('goalQuestion')}` : `Hi there. ${getAssistantText('goalQuestion')}`,
      actions: assistantGoalOptions(),
      stage: 'greeting'
    };
  }

  if (detectOutOfScope(input)) {
    saveAssistantSession({ stage: 'needs_clarification' });
    return {
      text: guideLanguage() === 'ar'
        ? `أقدر أساعدك باختصار، لكن تخصصي منتجات DBL. ${getAssistantText('goalQuestion')}`
        : `I can help briefly, but my focus is DBL products. ${getAssistantText('goalQuestion')}`,
      actions: assistantGoalOptions(),
      stage: 'needs_clarification'
    };
  }

  if (/pay|payment|gumroad|binance|usdt|دفع|بطاقة|بينانس|باينانس|يو اس دي|usdt/i.test(input)) {
    saveAssistantSession({ stage: 'product_details', problem: 'payment' });
    return {
      text: guideLanguage() === 'ar'
        ? 'الدفع الأساسي يكون عبر رابط شراء المنتج. إذا لا تملك بطاقة، يمكنك استخدام طرق الدفع البديلة.'
        : 'The main checkout is through the product purchase link. If you do not have a card, you can use alternative payment methods.',
      actions: [{ label: guideLanguage() === 'ar' ? 'طرق الدفع البديلة' : 'Alternative Payment Methods', href: '/payment-methods.html' }],
      stage: 'product_details'
    };
  }

  const goal = detectGoal(input) || session.goal;
  const experience = detectExperience(input) || session.experience;
  const product = productForGoal(knowledge, goal, input);

  if (detectDetailsRequest(input) && (session.recommendedProduct || product)) {
    const detailsProduct = knowledge?.products?.find((item) => item.id === session.recommendedProduct) || product;
    saveAssistantSession({ stage: 'product_details', recommendedProduct: detailsProduct?.id });
    return {
      text: buildProductDetailsReply(detailsProduct),
      actions: detailsProduct?.page_link ? [{ label: guideLanguage() === 'ar' ? 'عرض المنتج' : 'View Product', href: detailsProduct.page_link }] : [],
      stage: 'product_details',
      product: detailsProduct
    };
  }

  if (!goal || goal === 'unsure') {
    saveAssistantSession({
      stage: 'needs_clarification',
      goal: goal || session.goal || 'unsure',
      experience,
      problem: input
    });
    return {
      text: guideLanguage() === 'ar'
        ? 'حتى أرشح لك بدقة: هل مشكلتك الأساسية مع AI، العملاء، البداية أونلاين، أم تريد الحزمة الكاملة؟'
        : 'To recommend accurately: is your main need AI, clients, starting online, or the complete bundle?',
      actions: assistantGoalOptions(),
      stage: 'needs_clarification'
    };
  }

  if (!experience && !session.experience && goal !== 'complete_bundle') {
    saveAssistantSession({
      stage: 'diagnosis',
      goal,
      problem: input
    });
    return {
      text: guideLanguage() === 'ar'
        ? 'قبل أن أرشح لك المنتج الأنسب: هل أنت مبتدئ أم لديك خبرة في العمل الرقمي؟'
        : 'Before I recommend the best product: are you a beginner or do you already have digital work experience?',
      actions: assistantExperienceOptions(),
      stage: 'diagnosis'
    };
  }

  saveAssistantSession({
    stage: 'recommendation',
    goal,
    experience,
    problem: input,
    recommendedProduct: product?.id
  });

  return {
    text: buildRecommendationReply(product, goal),
    actions: product?.page_link ? [{ label: guideLanguage() === 'ar' ? 'عرض المنتج' : 'View Product', href: product.page_link }] : [],
    stage: 'recommendation',
    product
  };
}

async function requestAssistantReply(message) {
  const fallbackReply = 'حدث خلل بسيط في الرد. جرّب إعادة صياغة سؤالك.';
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        language: guideLanguage(),
        conversationHistory: loadAssistantHistory().slice(-10),
        userMemory: loadAssistantSession(),
        currentPage: window.location.pathname,
        pageTitle: document.title
      })
    });

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      throw parseError;
    }
    if (!response.ok || data.error) {
      console.warn('DBL Guide server error:', {
        status: response.status,
        error: data.error,
        reply: data.reply
      });
      return {
        reply: data.reply || fallbackReply,
        actions: normalizeAssistantActions(data.buttons || data.actions || [])
      };
    }

    const reply = String(data.reply || fallbackReply).trim();
    if (data.memory_updates) saveAssistantSession(data.memory_updates);
    if (data.memory) saveAssistantSession(data.memory);
    return {
      reply,
      actions: normalizeAssistantActions(data.buttons || data.actions || []),
      recommendedProduct: data.recommended_product_id || null
    };
  } catch (error) {
    console.warn('DBL Guide API unavailable:', error);
    return {
      reply: fallbackReply,
      actions: []
    };
  }
}

function updateAssistantLanguage(widget) {
  if (!widget) return;
  widget.querySelector('[data-dbl-assistant-title]').textContent = getAssistantText('title');
  widget.querySelector('[data-dbl-assistant-status]').textContent = getAssistantText('status');
  widget.querySelector('[data-dbl-assistant-placeholder]').setAttribute('placeholder', getAssistantText('placeholder'));
  widget.querySelector('[data-dbl-assistant-send]').setAttribute('aria-label', getAssistantText('send'));
  const bubbleText = widget.querySelector('[data-dbl-bubble-text]');
  if (bubbleText && !widget.classList.contains('is-chat-open')) bubbleText.textContent = getAssistantText('welcomeBubble');
}

function getAssistantPosition() {
  try {
    return JSON.parse(localStorage.getItem(assistantPositionKey) || 'null');
  } catch (error) {
    return null;
  }
}

function saveAssistantPosition(position) {
  try {
    localStorage.setItem(assistantPositionKey, JSON.stringify(position));
  } catch (error) {
    // Dragging still works when storage is unavailable.
  }
}

function clampAssistantPosition(position, avatarSize) {
  const margin = 8;
  const maxRight = Math.max(margin, window.innerWidth - avatarSize - margin);
  const maxBottom = Math.max(margin, window.innerHeight - avatarSize - margin);
  return {
    right: Math.min(Math.max(position.right, margin), maxRight),
    bottom: Math.min(Math.max(position.bottom, margin), maxBottom)
  };
}

function applyAssistantPosition(widget, position) {
  if (!position) return;
  const avatar = widget.querySelector('.dbl-assistant-avatar');
  const avatarSize = avatar?.offsetWidth || 82;
  const safe = clampAssistantPosition(position, avatarSize);
  widget.style.right = `${safe.right}px`;
  widget.style.bottom = `${safe.bottom}px`;
}

function isAssistantBubbleDismissed() {
  try {
    return sessionStorage.getItem(assistantBubbleDismissedKey) === 'true';
  } catch (error) {
    return false;
  }
}

function dismissAssistantBubble(widget) {
  const bubble = widget.querySelector('.dbl-chat-bubble');
  window.clearTimeout(widget._bubbleTimer);
  bubble.classList.add('is-dismissing');
  bubble.classList.remove('is-visible');
  try {
    sessionStorage.setItem(assistantBubbleDismissedKey, 'true');
  } catch (error) {
    // The visual dismissal is enough if storage is unavailable.
  }
  window.setTimeout(() => bubble.classList.remove('is-dismissing'), 240);
}

function showAssistantBubble(widget, text, duration = 8000) {
  if (isAssistantBubbleDismissed()) return;
  if (widget.classList.contains('is-chat-open')) return;
  const bubble = widget.querySelector('.dbl-chat-bubble');
  const bubbleText = widget.querySelector('[data-dbl-bubble-text]');
  if (bubbleText) bubbleText.textContent = text;
  bubble.classList.add('is-visible');
  widget.classList.add('has-new-bubble');
  window.setTimeout(() => widget.classList.remove('has-new-bubble'), 760);
  window.clearTimeout(widget._bubbleTimer);
  widget._bubbleTimer = window.setTimeout(() => bubble.classList.remove('is-visible'), duration);
}

function injectAssistantWidget() {
    if (document.querySelector('.dbl-assistant-widget')) return;

  const widget = document.createElement('aside');
  widget.className = 'dbl-assistant-widget';
  widget.setAttribute('aria-label', 'DBL Guide assistant');
  widget.innerHTML = `
    <div class="dbl-chat-bubble" role="status" aria-live="polite">
      <button type="button" class="dbl-chat-bubble-close" aria-label="Close message">×</button>
      <span data-dbl-bubble-text></span>
    </div>
    <section class="dbl-chat-window" aria-hidden="true">
      <header class="dbl-chat-header">
        <img class="dbl-chat-header-avatar" src="/assets/dbl-guide/dbl-guide-bot.svg" alt="" aria-hidden="true">
        <div>
          <strong data-dbl-assistant-title>DBL Guide</strong>
          <span data-dbl-assistant-status>Online now</span>
        </div>
        <button type="button" class="dbl-chat-close" aria-label="Close DBL Guide">×</button>
      </header>
      <div class="dbl-chat-messages"></div>
      <form class="dbl-chat-form">
        <input type="text" data-dbl-assistant-placeholder autocomplete="off" />
        <button type="submit" data-dbl-assistant-send aria-label="Send">➤</button>
      </form>
    </section>
    <button type="button" class="dbl-assistant-avatar" aria-label="Open DBL Guide">
      <img src="/assets/dbl-guide/dbl-guide-bot.svg" alt="DBL Guide">
      <span class="dbl-assistant-pulse" aria-hidden="true"></span>
    </button>
  `;
  document.body.appendChild(widget);

  const avatar = widget.querySelector('.dbl-assistant-avatar');
  const bubbleClose = widget.querySelector('.dbl-chat-bubble-close');
  const closeButton = widget.querySelector('.dbl-chat-close');
  const chatWindow = widget.querySelector('.dbl-chat-window');
  const messages = widget.querySelector('.dbl-chat-messages');
  const form = widget.querySelector('.dbl-chat-form');
  const input = form.querySelector('input');
  let didDragAssistant = false;

  updateAssistantLanguage(widget);
  window.setTimeout(() => applyAssistantPosition(widget, getAssistantPosition()), 0);
  window.addEventListener('resize', () => applyAssistantPosition(widget, getAssistantPosition()));
  const intro = buildAssistantIntro();
  addAssistantMessage(messages, intro.text, 'assistant', intro.actions);

  avatar.addEventListener('click', () => {
    if (didDragAssistant) {
      didDragAssistant = false;
      return;
    }
    widget.classList.add('is-chat-open');
    chatWindow.setAttribute('aria-hidden', 'false');
    widget.querySelector('.dbl-chat-bubble').classList.remove('is-visible');
    setAssistantState(widget, 'wave');
    input.focus({ preventScroll: true });
  });

  bubbleClose.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    dismissAssistantBubble(widget);
  });

  closeButton.addEventListener('click', () => {
    widget.classList.remove('is-chat-open');
    chatWindow.setAttribute('aria-hidden', 'true');
  });

  avatar.addEventListener('pointerdown', (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    const avatarRect = avatar.getBoundingClientRect();
    const grabOffsetX = event.clientX - avatarRect.left;
    const grabOffsetY = event.clientY - avatarRect.top;
    const startX = event.clientX;
    const startY = event.clientY;
    const avatarSize = avatarRect.width;
    let dragging = false;

    avatar.setPointerCapture(event.pointerId);

    const handlePointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      if (!dragging && Math.hypot(deltaX, deltaY) < 5) return;
      dragging = true;
      didDragAssistant = true;
      widget.classList.add('is-dragging');
      widget.classList.toggle('is-looking-left', deltaX < -2);
      widget.classList.toggle('is-looking-right', deltaX > 2);

      const nextLeft = Math.min(Math.max(moveEvent.clientX - grabOffsetX, 8), window.innerWidth - avatarSize - 8);
      const nextTop = Math.min(Math.max(moveEvent.clientY - grabOffsetY, 8), window.innerHeight - avatarSize - 8);
      const nextPosition = {
        right: window.innerWidth - nextLeft - avatarSize,
        bottom: window.innerHeight - nextTop - avatarSize
      };
      applyAssistantPosition(widget, nextPosition);
    };

    const handlePointerUp = () => {
      avatar.releasePointerCapture(event.pointerId);
      avatar.removeEventListener('pointermove', handlePointerMove);
      avatar.removeEventListener('pointerup', handlePointerUp);
      avatar.removeEventListener('pointercancel', handlePointerUp);
      widget.classList.remove('is-dragging', 'is-looking-left', 'is-looking-right');
      widget.classList.add('is-drag-release');
      window.setTimeout(() => widget.classList.remove('is-drag-release'), 260);

      if (dragging) {
        const rect = avatar.getBoundingClientRect();
        saveAssistantPosition({
          right: window.innerWidth - rect.right,
          bottom: window.innerHeight - rect.bottom
        });
        window.setTimeout(() => { didDragAssistant = false; }, 180);
      } else {
        didDragAssistant = false;
      }
    };

    avatar.addEventListener('pointermove', handlePointerMove);
    avatar.addEventListener('pointerup', handlePointerUp);
    avatar.addEventListener('pointercancel', handlePointerUp);
  });

  input.addEventListener('focus', () => widget.classList.add('is-user-typing'));
  input.addEventListener('input', () => {
    widget.classList.add('is-user-typing');
    window.clearTimeout(widget._typingTimer);
    widget._typingTimer = window.setTimeout(() => widget.classList.remove('is-user-typing'), 900);
  });
  input.addEventListener('blur', () => widget.classList.remove('is-user-typing'));

  const submitAssistantInput = async (rawValue, displayValue = rawValue) => {
    const value = rawValue.trim();
    if (!value) return;
    addAssistantMessage(messages, displayValue.trim(), 'user');
    rememberAssistantMessage('user', value);
    input.value = '';
    setAssistantState(widget, 'thinking');
    const thinking = addAssistantMessage(messages, getAssistantText('thinking'), 'assistant');
    const result = await requestAssistantReply(value);
    thinking.remove();
    addAssistantMessage(messages, result.reply, 'assistant', result.actions);
    rememberAssistantMessage('assistant', result.reply);
    setAssistantState(widget, 'happy');
    window.setTimeout(() => setAssistantState(widget, 'idle'), 1400);
  };

  messages.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-assistant-choice]');
    if (!choice) return;
    submitAssistantInput(choice.dataset.assistantChoice || choice.textContent, choice.dataset.assistantLabel || choice.textContent);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitAssistantInput(input.value);
  });

  window.setTimeout(() => showAssistantBubble(widget, getAssistantText('welcomeBubble'), 8000), 5000);
  window.setTimeout(() => showAssistantBubble(widget, getAssistantText('secondBubble'), 8000), 30000);
}


  window.updateAssistantLanguage = updateAssistantLanguage;
  window.initDBLGuide = injectAssistantWidget;
})();
