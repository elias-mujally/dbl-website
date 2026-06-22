// Language and Translation Management
let currentLanguage = 'ar';
let translations = {};
let currentTheme = 'dark';
let assistantKnowledgePromise = null;

function getSavedTheme() {
  try {
    return localStorage.getItem('theme') || 'dark';
  } catch (error) {
    return 'dark';
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    // Theme switching should still work when storage is unavailable.
  }
}

function applyTheme(theme) {
  currentTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = currentTheme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute('content', currentTheme === 'light' ? '#f6f8fb' : '#020611');
  updateThemeToggleLabel();
}

function setTheme(theme) {
  applyTheme(theme);
  saveTheme(currentTheme);
}

function updateThemeToggleLabel() {
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', currentTheme === 'light' ? 'true' : 'false');
    button.setAttribute('aria-label', getTranslation(`theme.switchTo${nextTheme === 'light' ? 'Light' : 'Dark'}`));
    const label = button.querySelector('.theme-toggle-text');
    if (label) label.textContent = getTranslation(`theme.${nextTheme}`);
  });
}

applyTheme(getSavedTheme());

function getSavedLanguage() {
  try {
    return localStorage.getItem('language') || 'ar';
  } catch (error) {
    return 'ar';
  }
}

function saveLanguage(lang) {
  try {
    localStorage.setItem('language', lang);
  } catch (error) {
    // Language switching should still work when storage is unavailable.
  }
}

function injectBrandAssets() {
  const faviconHref = '/assets/dbl-favicon.svg';
  const logoHref = '/assets/dbl-logo-site.svg';

  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = faviconHref;
    document.head.appendChild(favicon);
  }

  if (!document.querySelector('#dbl-logo-style')) {
    const style = document.createElement('style');
    style.id = 'dbl-logo-style';
    style.textContent = `
      .brand { gap: 12px; }
      .brand-mark { width: 92px !important; height: 32px !important; min-width: 92px; border: 0 !important; border-radius: 0 !important; background: url('${logoHref}') center / contain no-repeat !important; box-shadow: none !important; color: transparent !important; font-size: 0 !important; overflow: hidden; text-indent: -9999px; }
      .footer .brand-mark { width: 104px !important; height: 36px !important; min-width: 104px; }
      .discount-code-box { display: none; margin-top: 12px; padding: 14px 16px; border: 1px solid rgba(0,200,255,.35); border-radius: 14px; background: rgba(0,200,255,.08); }
      .discount-code-box.is-visible { display: block; }
      .discount-code-box code { font-size: 18px; font-weight: 800; letter-spacing: 1.5px; color: #ffffff; }
      .discount-code-note { display: block; margin-top: 6px; font-size: 13px; opacity: .8; }
      @media (max-width: 760px) { .brand-mark { width: 78px !important; height: 28px !important; min-width: 78px; } }
    `;
    document.head.appendChild(style);
  }
}

function injectThemeToggles() {
  document.querySelectorAll('.nav-controls').forEach((controls) => {
    if (controls.querySelector('[data-theme-toggle]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.setAttribute('data-theme-toggle', '');
    button.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-text">Light</span>';
    controls.insertBefore(button, controls.firstChild);
  });
  updateThemeToggleLabel();
}

function injectClarityTracking() {
  const projectId = 'x13ucd5sdu';
  if (window.clarity || document.querySelector(`script[src="https://www.clarity.ms/tag/${projectId}"]`)) return;
  (function(c, l, a, r, i, t, y) { c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, 'clarity', 'script', projectId);
}

function updateSocialLinks() {
  const facebookUrl = 'https://www.facebook.com/share/18NR4xWCvr/';
  document.querySelectorAll('a[href*="facebook.com"]').forEach((link) => { link.href = facebookUrl; });
}

async function loadTranslations(lang) {
  try {
    const response = await fetch(`/i18n/${lang}.json`);
    translations = await response.json();
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
  }
}

function getTranslation(key) {
  const keys = key.split('.');
  let value = translations;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) value = value[k];
    else return key;
  }
  return Array.isArray(value) ? value : (typeof value === 'string' ? value : key);
}

function updatePageTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getTranslation(key);
    if (Array.isArray(translation)) {
      const index = Array.from(element.parentNode.children).indexOf(element);
      if (translation[index]) element.textContent = translation[index];
    } else {
      element.textContent = translation;
    }
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const key = element.getAttribute('data-i18n-alt');
    const translation = getTranslation(key);
    element.setAttribute('alt', translation);
  });
  updateThemeToggleLabel();
  updateAssistantLanguage(document.querySelector('.dbl-assistant-widget'));
}

function setLanguage(lang) {
  currentLanguage = lang;
  saveLanguage(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.classList.toggle('rtl', lang === 'ar');
  loadTranslations(lang).then(updatePageTranslations);
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active');
}

async function copyTextToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

async function handleCopyButton(button) {
  const value = button.getAttribute('data-copy');
  if (!value) return;
  try { await copyTextToClipboard(value); } catch (error) { console.warn('Copy action could not access the clipboard:', error); }
  const originalText = button.textContent;
  button.textContent = getTranslation('productPage.copiedBtn') || 'Copied';
  window.setTimeout(() => { button.textContent = originalText; }, 1500);
}

function handleDiscountReveal(button) {
  const targetSelector = button.getAttribute('data-target');
  const target = targetSelector ? document.querySelector(targetSelector) : button.parentElement?.querySelector('.discount-code-box');
  if (!target) return;
  target.classList.add('is-visible');
  const code = target.querySelector('code')?.textContent?.trim();
  if (code) copyTextToClipboard(code).catch(() => {});
}

function getAssistantText(key) {
  const dictionary = {
    ar: {
      welcomeBubble: 'هل تريد مساعدة؟ اسأل DBL Guide',
      secondBubble: 'أقدر أرشح لك المنتج المناسب خلال دقيقة.',
      title: 'DBL Guide',
      status: 'متصل الآن',
      intro: 'مرحباً، أنا DBL Guide. أقدر أساعدك تختار المنتج المناسب أو أوضح لك طريقة الدفع.',
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
      placeholder: 'Write your message...',
      send: 'Send',
      thinking: 'Thinking...',
      paymentReply: 'Use Gumroad for card checkout. If you do not have a card, open Alternative Payment Methods for Binance Pay or USDT.',
      defaultReply: 'Got it. In this demo version, I can recommend a product based on your goal: launching, managing clients, or using AI better.'
    }
  };
  return dictionary[currentLanguage]?.[key] || dictionary.en[key] || key;
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

function addAssistantMessage(messages, text, type = 'assistant') {
  const message = document.createElement('div');
  message.className = `dbl-chat-message ${type === 'user' ? 'is-user' : 'is-assistant'}`;
  message.textContent = text;
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

function formatKnowledgeReply(product) {
  if (!product) return getAssistantText('defaultReply');

  if (currentLanguage === 'ar') {
    return `أرشح لك ${product.name}. ${product.short_description} السعر: ${product.price}. صفحة المنتج: ${product.page_link}`;
  }

  return `I recommend ${product.name}. ${product.short_description} Price: ${product.price}. Product page: ${product.page_link}`;
}

async function getKnowledgeAssistantReply(input) {
  const normalized = input.toLowerCase();
  if (/pay|payment|gumroad|binance|usdt|دفع|بطاقة|بينانس|باينانس|يو اس دي|usdt/i.test(normalized)) {
    const knowledge = await loadAssistantKnowledge();
    return knowledge?.assistant_rules?.find((rule) => rule.includes('/payment-methods.html')) || getAssistantText('paymentReply');
  }

  const knowledge = await loadAssistantKnowledge();
  const product = findKnowledgeProduct(knowledge, input);
  return formatKnowledgeReply(product);
}

async function requestAssistantReply(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        language: currentLanguage
      })
    });

    if (!response.ok) throw new Error(`Chat request failed: ${response.status}`);

    const data = await response.json();
    const reply = String(data.reply || '').trim();
    return reply || await getKnowledgeAssistantReply(message);
  } catch (error) {
    console.warn('DBL Guide API unavailable, using fallback reply:', error);
    return await getKnowledgeAssistantReply(message);
  }
}

function updateAssistantLanguage(widget) {
  if (!widget) return;
  widget.querySelector('[data-dbl-assistant-title]').textContent = getAssistantText('title');
  widget.querySelector('[data-dbl-assistant-status]').textContent = getAssistantText('status');
  widget.querySelector('[data-dbl-assistant-placeholder]').setAttribute('placeholder', getAssistantText('placeholder'));
  widget.querySelector('[data-dbl-assistant-send]').setAttribute('aria-label', getAssistantText('send'));
  const bubble = widget.querySelector('.dbl-chat-bubble');
  if (bubble && !widget.classList.contains('is-chat-open')) bubble.textContent = getAssistantText('welcomeBubble');
}

function showAssistantBubble(widget, text, duration = 8000) {
  if (widget.classList.contains('is-chat-open')) return;
  const bubble = widget.querySelector('.dbl-chat-bubble');
  bubble.textContent = text;
  bubble.classList.add('is-visible');
  window.clearTimeout(widget._bubbleTimer);
  widget._bubbleTimer = window.setTimeout(() => bubble.classList.remove('is-visible'), duration);
}

function injectAssistantWidget() {
  if (document.querySelector('.dbl-assistant-widget')) return;

  const widget = document.createElement('aside');
  widget.className = 'dbl-assistant-widget';
  widget.setAttribute('aria-label', 'DBL Guide assistant');
  widget.innerHTML = `
    <div class="dbl-chat-bubble" role="status" aria-live="polite"></div>
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
  const closeButton = widget.querySelector('.dbl-chat-close');
  const chatWindow = widget.querySelector('.dbl-chat-window');
  const messages = widget.querySelector('.dbl-chat-messages');
  const form = widget.querySelector('.dbl-chat-form');
  const input = form.querySelector('input');

  updateAssistantLanguage(widget);
  addAssistantMessage(messages, getAssistantText('intro'));

  avatar.addEventListener('click', () => {
    widget.classList.add('is-chat-open');
    chatWindow.setAttribute('aria-hidden', 'false');
    widget.querySelector('.dbl-chat-bubble').classList.remove('is-visible');
    setAssistantState(widget, 'wave');
    input.focus({ preventScroll: true });
  });

  closeButton.addEventListener('click', () => {
    widget.classList.remove('is-chat-open');
    chatWindow.setAttribute('aria-hidden', 'true');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addAssistantMessage(messages, value, 'user');
    input.value = '';
    setAssistantState(widget, 'thinking');
    const thinking = addAssistantMessage(messages, getAssistantText('thinking'), 'assistant');
    const reply = await requestAssistantReply(value);
    thinking.remove();
    addAssistantMessage(messages, reply, 'assistant');
    setAssistantState(widget, 'happy');
    window.setTimeout(() => setAssistantState(widget, 'idle'), 1400);
  });

  window.setTimeout(() => showAssistantBubble(widget, getAssistantText('welcomeBubble'), 8000), 5000);
  window.setTimeout(() => showAssistantBubble(widget, getAssistantText('secondBubble'), 8000), 30000);
}

document.addEventListener('DOMContentLoaded', async () => {
  injectBrandAssets();
  injectThemeToggles();
  injectAssistantWidget();
  injectClarityTracking();
  updateSocialLinks();

  document.addEventListener('click', async (event) => {
    const themeButton = event.target.closest('[data-theme-toggle]');
    if (themeButton) {
      event.preventDefault();
      event.stopPropagation();
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
      return;
    }

    const discountButton = event.target.closest('[data-discount-reveal]');
    if (discountButton) {
      event.preventDefault();
      handleDiscountReveal(discountButton);
      return;
    }

    const copyButton = event.target.closest('.copy-btn');
    if (copyButton) {
      event.preventDefault();
      event.stopPropagation();
      await handleCopyButton(copyButton);
      return;
    }

    const button = event.target.closest('.lang-btn');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const lang = button.getAttribute('data-lang');
    if (lang) setLanguage(lang);
  });

  const savedLanguage = getSavedLanguage();
  await loadTranslations(savedLanguage);
  setLanguage(savedLanguage);
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealItems.forEach((item) => revealObserver.observe(item));

const visual = document.querySelector('.hero-visual');
const cards = document.querySelectorAll('.float-card');
visual?.addEventListener('pointermove', (event) => {
  const rect = visual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  cards.forEach((card, index) => {
    const depth = (index + 1) * 8;
    card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
visual?.addEventListener('pointerleave', () => { cards.forEach((card) => { card.style.transform = ''; }); });
