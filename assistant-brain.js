function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function getProductById(products, id) {
  return products.find((product) => product.id === id) || null;
}

function findProductByText(products, message = "") {
  const text = normalizeText(message);
  if (/business suite|suite|الحزمة الكاملة|بزنس|سويت|الكاملة/.test(text)) return getProductById(products, "dbl-business-suite");
  if (/prompt vault|prompt|برومبت|برومبتات|ai|chatgpt|gemini|ذكاء/.test(text)) return getProductById(products, "dbl-prompt-vault");
  if (/client kit|client|clients|عميل|عملاء|العملاء/.test(text)) return getProductById(products, "dbl-client-kit");
  if (/digital launch|launch bundle|دليل الانطلاق|الانطلاق الرقمي|انطلاق|ابدأ|بداية|اونلاين|أونلاين/.test(text)) return getProductById(products, "digital-launch-bundle");
  return null;
}

function productFromPage(products, currentPage = "") {
  const page = normalizeText(currentPage);
  if (page.includes("dbl-prompt-vault")) return getProductById(products, "dbl-prompt-vault");
  if (page.includes("dbl-client-kit")) return getProductById(products, "dbl-client-kit");
  if (page.includes("digital-launch-bundle")) return getProductById(products, "digital-launch-bundle");
  if (page.includes("dbl-business-suite")) return getProductById(products, "dbl-business-suite");
  return null;
}

function productFromMemory(products, memory = {}) {
  return getProductById(products, memory.currentProduct)
    || getProductById(products, memory.lastRecommendedProduct)
    || getProductById(products, memory.recommended_product)
    || getProductById(products, memory.interested_product)
    || null;
}

function detectBudget(message) {
  const text = normalizeText(message);
  const match = text.match(/(?:\$|usd|دولار|ميزانية|budget)?\s*(\d+(?:\.\d{1,2})?)/i);
  return match ? Number(match[1]) : null;
}

function detectExperience(message) {
  if (/beginner|new|مبتدئ|جديد|أول مرة|اول مرة/.test(message)) return "beginner";
  if (/experienced|advanced|محترف|خبرة|متقدم/.test(message)) return "experienced";
  return null;
}

function detectOccupation(message) {
  if (/designer|مصمم|تصميم/.test(message)) return "designer";
  if (/marketer|marketing|مسوق|تسويق/.test(message)) return "marketer";
  if (/content|creator|صانع محتوى|محتوى/.test(message)) return "content_creator";
  if (/freelancer|freelance|مستقل|فريلانسر/.test(message)) return "freelancer";
  if (/service|خدمة|خدمات/.test(message)) return "service_provider";
  return null;
}

function detectIntent(message) {
  const text = normalizeText(message);
  if (text === "ai_tools") return "choose_interest_ai";
  if (text === "client_management") return "choose_interest_clients";
  if (text === "start_online") return "choose_interest_beginner_start";
  if (text === "complete_bundle") return "choose_interest_full_bundle";
  if (text === "unsure") return "unclear";
  if (/^(hi|hello|hey)\b/.test(text) || /^(السلام عليكم|سلام|اهلا|أهلا|مرحبا|مرحباً|هلا)/.test(text)) return "greeting";
  if (/pay|payment|gumroad|binance|usdt|card|دفع|بطاقة|بدون بطاقة|بينانس|باينانس|يو اس دي/.test(text)) return "ask_payment";
  if (/purchase link|buy link|رابط الشراء|اشتري|شراء|كيف أشتري|كيف اشتري/.test(text)) return "ask_purchase_link";
  if (/price|cost|budget|\$|usd|دولار|سعر|بكم|كم سعر|ميزانية|تكلفة/.test(text)) return "ask_price";
  if (/compare|difference|vs|فرق|الفرق|قارن|مقارنة|بينه وبين/.test(text)) return "ask_comparison";
  if (/contents|included|inside|محتويات|محتوياته|يشمل|داخل|ماذا يحتوي|ما محتوياته/.test(text)) return "ask_product_contents";
  if (/benefits|benefit|value|يفيد|فائدة|فوائد|استفيد|القيمة/.test(text)) return "ask_product_benefits";
  if (/fit|fits|suitable|right for me|يناسبني|مناسب لي|هل يناسبني|كمبتدئ/.test(text)) return "ask_if_product_fits_me";
  if (/details|more|explain|اشرح|شرح|تفاصيل|أكثر|اكثر|اشرح لي المنتج/.test(text)) return "ask_product_details";
  if (/full bundle|complete bundle|الحزمة الكاملة|كاملة|كل المنتجات|اختيار الحزمة المناسبة/.test(text)) return "choose_interest_full_bundle";
  if (/prompt|ai|chatgpt|gemini|ذكاء|برومبت|برومبتات|مطالبات/.test(text)) return "choose_interest_ai";
  if (/client|customer|pricing|revision|delivery|عميل|عملاء|التعامل مع العملاء|تسعير|تعديل|تعديلات|تسليم/.test(text)) return "choose_interest_clients";
  if (/start|beginner|launch|online|book|guide|بداية|مبتدئ|أبدأ|ابدأ|انطلاق|اونلاين|أونلاين|كتاب|دليل/.test(text)) return "choose_interest_beginner_start";
  if (/not sure|unsure|confused|help me choose|لست متأكد|مش متأكد|محتار|لا أعرف|ما اعرف/.test(text)) return "unclear";
  if (/weather|football|politics|recipe|movie|طقس|سياسة|طبخ|فيلم|مباراة/.test(text)) return "off_topic";
  return "unclear";
}

function goalForIntent(intent) {
  return {
    choose_interest_ai: "ai_tools",
    choose_interest_clients: "client_management",
    choose_interest_beginner_start: "beginner_start",
    choose_interest_full_bundle: "full_bundle"
  }[intent] || null;
}

function productForNeed(products, intent, budget, message) {
  const mentioned = findProductByText(products, message);
  if (mentioned) return mentioned;

  if (intent === "choose_interest_ai") return getProductById(products, "dbl-prompt-vault");
  if (intent === "choose_interest_clients") return getProductById(products, "dbl-client-kit");
  if (intent === "choose_interest_beginner_start") return getProductById(products, "digital-launch-bundle");
  if (intent === "choose_interest_full_bundle") return getProductById(products, "dbl-business-suite");

  if (budget !== null) {
    if (budget < 15) return getProductById(products, "dbl-client-kit") || getProductById(products, "digital-launch-bundle");
    if (budget >= 15 && budget < 25) return getProductById(products, "dbl-prompt-vault");
    if (budget >= 35) return getProductById(products, "dbl-business-suite");
  }

  return null;
}

function resolveCurrentProduct(products, message, memory, pageProduct) {
  return findProductByText(products, message) || pageProduct || productFromMemory(products, memory);
}

function productFacts(product) {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    page_link: product.page_link,
    purchase_link: product.purchase_link,
    type: product.type,
    category: product.category,
    contents: product.included_items || product.included_products?.map((item) => item.name) || [],
    benefits: product.main_benefits || [],
    best_for: product.best_for || [],
    solves: product.customer_problems_it_solves || [],
    when_to_recommend: product.when_to_recommend || []
  };
}

function actionLabel(action, language) {
  const ar = language === "ar";
  return {
    view_product: ar ? "عرض المنتج" : "View Product",
    payment_options: ar ? "طرق الدفع" : "Payment Options",
    compare_prompt: "DBL Prompt Vault",
    compare_client: "DBL Client Kit"
  }[action];
}

function buildActions(responseGoal, product, language) {
  const actions = [];
  if (["recommend_product", "explain_product", "answer_price", "show_purchase_link"].includes(responseGoal) && product?.page_link) {
    actions.push({ label: actionLabel("view_product", language), href: product.page_link });
  }
  if (responseGoal === "show_payment_options") {
    actions.push({ label: actionLabel("payment_options", language), href: "/payment-methods.html" });
  }
  if (responseGoal === "compare_products") {
    actions.push({ label: actionLabel("compare_prompt", language), href: "/dbl-prompt-vault.html" });
    actions.push({ label: actionLabel("compare_client", language), href: "/dbl-client-kit.html" });
  }
  return actions;
}

function listItems(items, limit = 6) {
  return items.slice(0, limit).map((item) => `• ${typeof item === "string" ? item : item.name}`).join("\n");
}

function draftForIntent({ intent, responseGoal, product, language, memory, budget, pageProduct }) {
  const ar = language === "ar";
  const facts = productFacts(product);

  if (intent === "greeting") {
    return ar
      ? "أهلًا بك. أنا DBL Guide، أساعدك تختار المورد الأنسب لك من DBL. ما الذي تحاول تحسينه الآن في عملك الرقمي؟"
      : "Hi. I am DBL Guide, here to help you choose the right DBL resource. What are you trying to improve in your digital work?";
  }

  if (responseGoal === "answer_price" && facts) {
    return ar
      ? `سعر ${facts.name} هو ${facts.price}. وهو مناسب إذا كان هدفك قريبًا من ${facts.type}. هل تريد أن أوضح لك ماذا يحتوي؟`
      : `${facts.name} is ${facts.price}. It fits if your goal is close to ${facts.category}. Would you like me to explain what it includes?`;
  }

  if (responseGoal === "explain_contents" && facts) {
    return ar
      ? `${facts.name} يحتوي على:\n${listItems(facts.contents)}\nهل تريد أن أوضح لك كيف تستفيد منه حسب هدفك؟`
      : `${facts.name} includes:\n${listItems(facts.contents)}\nWould you like me to explain how it fits your goal?`;
  }

  if (responseGoal === "explain_benefits" && facts) {
    const problem = memory.mainProblem ? (ar ? `بناءً على مشكلتك: ${memory.mainProblem}` : `Based on your issue: ${memory.mainProblem}`) : "";
    return ar
      ? `${facts.name} يفيدك لأنه:\n${listItems(facts.benefits, 5)}\n${problem}\nما الجانب الذي تريد تحسينه أولًا؟`
      : `${facts.name} can help because:\n${listItems(facts.benefits, 5)}\n${problem}\nWhich part do you want to improve first?`;
  }

  if (responseGoal === "explain_product" && facts) {
    return ar
      ? `أكيد. ${facts.name} هو مورد عملي من DBL.\nيحتوي على:\n${listItems(facts.contents)}\nيناسب غالبًا: ${facts.best_for.slice(0, 3).join("، ")}.\nهل تريد مثالًا على طريقة استخدامه؟`
      : `Sure. ${facts.name} is a practical DBL resource.\nIt includes:\n${listItems(facts.contents)}\nBest for: ${facts.best_for.slice(0, 3).join(", ")}.\nWould you like an example of how to use it?`;
  }

  if (responseGoal === "answer_fit" && facts) {
    if (!memory.userExperienceLevel && !memory.experience_level && !/beginner|مبتدئ|كمبتدئ/i.test(memory.mainProblem || "")) {
      return ar
        ? `قد يناسبك ${facts.name}، لكن أحتاج سؤالًا واحدًا: هل أنت مبتدئ أم لديك تجربة سابقة في العمل الرقمي؟`
        : `${facts.name} may fit you, but one question first: are you a beginner or do you already have digital work experience?`;
    }
    return ar
      ? `نعم، ${facts.name} قد يناسبك إذا كان هدفك ${facts.best_for[0] || "قريبًا من هذا المجال"}. الأهم أنه يعطيك خطوات وموارد عملية بدل البدء من الصفر.`
      : `Yes, ${facts.name} may fit if your goal is ${facts.best_for[0] || "close to this area"}. It gives you practical resources instead of starting from scratch.`;
  }

  if (responseGoal === "compare_products") {
    return ar
      ? "الفرق بسيط:\n• DBL Prompt Vault: يساعدك في استخدام AI بشكل أفضل عبر 100 برومبت احترافي.\n• DBL Client Kit: يساعدك في التعامل مع العملاء عبر رسائل جاهزة وقواعد وأدوات عملية.\nإذا مشكلتك مع الذكاء الاصطناعي اختر Prompt Vault. إذا مشكلتك مع العملاء اختر Client Kit."
      : "Simple difference:\n• DBL Prompt Vault helps you use AI better with 100 professional prompts.\n• DBL Client Kit helps with clients through ready messages, rules, and practical tools.\nChoose Prompt Vault for AI. Choose Client Kit for client communication.";
  }

  if (responseGoal === "show_payment_options") {
    return ar
      ? "يمكنك استخدام صفحة طرق الدفع البديلة. اختر المنتج المطلوب، ثم أرسل تأكيد الدفع حسب التعليمات الموجودة في الصفحة."
      : "You can use the alternative payment page. Choose the product, then send payment confirmation using the instructions there.";
  }

  if (responseGoal === "show_purchase_link" && facts) {
    return ar
      ? `يمكنك فتح صفحة ${facts.name} من زر عرض المنتج، ثم إتمام الشراء من Gumroad.`
      : `Open ${facts.name} using the View Product button, then complete checkout through Gumroad.`;
  }

  if (responseGoal === "recommend_product" && facts) {
    return ar
      ? `بناءً على كلامك، الأقرب لك هو ${facts.name}. السبب: يناسب احتياجك الحالي ويعطيك موردًا عمليًا بدل أن تبدأ من الصفر. هل تريد شرح محتواه؟`
      : `Based on what you shared, the closest fit is ${facts.name}. It matches your current need and gives you a practical resource instead of starting from scratch. Want me to explain what it includes?`;
  }

  if (intent === "off_topic") {
    return ar
      ? "أقدر أجاوب باختصار، لكن تخصصي هنا موارد DBL. هل تريد مساعدة في اختيار مورد يناسب هدفك الرقمي؟"
      : "I can answer briefly, but my focus here is DBL resources. Would you like help choosing a resource for your digital goal?";
  }

  return ar
    ? "فهمت عليك. قبل أن أرشح أي شيء، ما الذي تريد تحسينه تحديدًا: استخدام AI، التعامل مع العملاء، البداية أونلاين، أم اختيار الحزمة المناسبة؟"
    : "I understand. Before recommending anything, what do you want to improve: AI, clients, starting online, or choosing the right bundle?";
}

function analyzeConversation({ message, language = "ar", currentPage = "", pageTitle = "", memory = {}, products = [] }) {
  const intent = detectIntent(message);
  const budget = detectBudget(message);
  const pageProduct = productFromPage(products, currentPage);
  const mentionedProduct = findProductByText(products, message);
  const rememberedProduct = productFromMemory(products, memory);
  let currentProduct = intent === "ask_comparison"
    ? (pageProduct || rememberedProduct || mentionedProduct)
    : (mentionedProduct || pageProduct || rememberedProduct);
  let recommendedProduct = null;
  let responseGoal = "ask_question";

  if (intent === "greeting") responseGoal = "ask_question";
  else if (intent === "ask_payment") responseGoal = "show_payment_options";
  else if (intent === "ask_purchase_link") responseGoal = "show_purchase_link";
  else if (intent === "ask_comparison") responseGoal = "compare_products";
  else if (intent === "ask_price") responseGoal = "answer_price";
  else if (intent === "ask_product_contents") responseGoal = "explain_contents";
  else if (intent === "ask_product_benefits") responseGoal = "explain_benefits";
  else if (intent === "ask_if_product_fits_me") responseGoal = "answer_fit";
  else if (intent === "ask_product_details") responseGoal = "explain_product";
  else if (intent.startsWith("choose_interest_")) responseGoal = "recommend_product";
  else if (intent === "off_topic") responseGoal = "answer_without_selling";

  if (responseGoal === "answer_price" || responseGoal === "show_purchase_link") {
    currentProduct = currentProduct || productForNeed(products, intent, budget, message);
  }

  if (["explain_product", "explain_contents", "explain_benefits", "answer_fit"].includes(responseGoal) && !currentProduct) {
    responseGoal = "ask_question";
  }

  if (responseGoal === "recommend_product") {
    recommendedProduct = productForNeed(products, intent, budget, message);
    currentProduct = recommendedProduct || currentProduct;
  }

  if (intent === "ask_price" && !currentProduct) responseGoal = "ask_question";

  if (budget !== null && responseGoal === "ask_question") {
    recommendedProduct = productForNeed(products, "pricing", budget, message);
    currentProduct = recommendedProduct || currentProduct;
    responseGoal = recommendedProduct ? "recommend_product" : "ask_question";
  }

  const nextMemory = {
    ...memory,
    currentProduct: currentProduct?.id || memory.currentProduct || null,
    lastRecommendedProduct: recommendedProduct?.id || memory.lastRecommendedProduct || memory.recommended_product || null,
    userGoal: goalForIntent(intent) || memory.userGoal || memory.goal || null,
    userOccupation: detectOccupation(message) || memory.userOccupation || memory.occupation || null,
    userExperienceLevel: detectExperience(message) || memory.userExperienceLevel || memory.experience_level || null,
    userBudget: budget ?? memory.userBudget ?? memory.budget ?? null,
    mainProblem: intent !== "greeting" ? String(message || "").slice(0, 220) : memory.mainProblem || memory.main_problem || null,
    conversationStage: responseGoal,
    lastIntent: intent,
    currentPage,
    goal: goalForIntent(intent) || memory.goal || null,
    experience_level: detectExperience(message) || memory.experience_level || null,
    budget: budget ?? memory.budget ?? null,
    occupation: detectOccupation(message) || memory.occupation || null,
    main_problem: intent !== "greeting" ? String(message || "").slice(0, 220) : memory.main_problem || null,
    interested_product: pageProduct?.id || memory.interested_product || null,
    recommended_product: recommendedProduct?.id || memory.recommended_product || null,
    conversation_stage: responseGoal,
    last_intent: intent,
    page_title: pageTitle || memory.page_title || null
  };

  const productForResponse = currentProduct || recommendedProduct;
  const relevantProductFacts = productFacts(productForResponse);
  const draftReply = draftForIntent({
    intent,
    responseGoal,
    product: productForResponse,
    language,
    memory: nextMemory,
    budget,
    pageProduct
  });

  return {
    intent,
    decision: responseGoal,
    responseGoal,
    product: productForResponse,
    pageProduct,
    relevantProductFacts,
    memory: nextMemory,
    draftReply,
    actions: buildActions(responseGoal, productForResponse, language)
  };
}

module.exports = {
  analyzeConversation
};
