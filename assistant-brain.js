function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function getProductById(products, id) {
  return products.find((product) => product.id === id) || null;
}

function productFromPage(products, currentPage = "") {
  const page = normalizeText(currentPage);
  if (page.includes("dbl-prompt-vault")) return getProductById(products, "dbl-prompt-vault");
  if (page.includes("dbl-client-kit")) return getProductById(products, "dbl-client-kit");
  if (page.includes("digital-launch-bundle")) return getProductById(products, "digital-launch-bundle");
  if (page.includes("dbl-business-suite")) return getProductById(products, "dbl-business-suite");
  return null;
}

function detectBudget(message) {
  const normalized = normalizeText(message);
  const match = normalized.match(/(?:\$|usd|دولار|ميزانية|budget)?\s*(\d+(?:\.\d{1,2})?)/i);
  return match ? Number(match[1]) : null;
}

function detectExperience(message) {
  if (/beginner|new|مبتدئ|جديد|أول مرة|اول مرة/i.test(message)) return "beginner";
  if (/experienced|advanced|محترف|خبرة|متقدم/i.test(message)) return "experienced";
  return null;
}

function detectOccupation(message) {
  if (/designer|مصمم|تصميم/i.test(message)) return "designer";
  if (/marketer|marketing|مسوق|تسويق/i.test(message)) return "marketer";
  if (/content|creator|صانع محتوى|محتوى/i.test(message)) return "content_creator";
  if (/freelancer|freelance|مستقل|فريلانسر/i.test(message)) return "freelancer";
  if (/service|خدمة|خدمات/i.test(message)) return "service_provider";
  return null;
}

function detectIntent(message) {
  const text = normalizeText(message);
  if (/^(hi|hello|hey)\b/i.test(text) || /^(السلام عليكم|سلام|اهلا|أهلا|مرحبا|مرحباً|هلا)/i.test(text)) return "greeting";
  if (/pay|payment|gumroad|binance|usdt|card|بطاقة|دفع|بينانس|باينانس|يو اس دي/i.test(text)) return "payment";
  if (/compare|difference|vs|فرق|الفرق|قارن|مقارنة/i.test(text)) return "comparison";
  if (/price|cost|budget|\$|usd|دولار|سعر|ميزانية|تكلفة/i.test(text)) return "pricing";
  if (/details|more|explain|included|contents|تفاصيل|اشرح|يشمل|المحتوى|محتوى|أكثر|اكثر|يناسبني|مناسب/i.test(text)) return "product_details";
  if (/prompt|ai|chatgpt|gemini|ذكاء|برومبت|برومبتات|مطالبات/i.test(text)) return "asking_about_ai";
  if (/client|customer|pricing|revision|delivery|عميل|عملاء|تسعير|تعديل|تعديلات|تسليم/i.test(text)) return "asking_about_clients";
  if (/start|beginner|launch|online|book|guide|بداية|مبتدئ|أبدأ|ابدأ|انطلاق|أونلاين|اونلاين|كتاب|دليل/i.test(text)) return "beginner_start";
  if (/not sure|unsure|confused|help me choose|لست متأكد|مش متأكد|محتار|لا أعرف|ما اعرف/i.test(text)) return "emotional_or_unclear";
  if (/weather|football|politics|recipe|movie|طقس|سياسة|طبخ|فيلم|مباراة/i.test(text)) return "off_topic";
  return "emotional_or_unclear";
}

function productForIntent(products, intent, budget, pageProduct) {
  const byId = (id) => getProductById(products, id);

  if (intent === "product_details" && pageProduct) return pageProduct;
  if (intent === "asking_about_ai") return byId("dbl-prompt-vault");
  if (intent === "asking_about_clients") return byId("dbl-client-kit");
  if (intent === "beginner_start") return byId("digital-launch-bundle");

  if (budget !== null) {
    if (budget < 15) return byId("dbl-client-kit") || byId("digital-launch-bundle");
    if (budget >= 15 && budget < 25) return byId("dbl-prompt-vault");
    if (budget >= 35) return byId("dbl-business-suite");
  }

  return null;
}

function goalForIntent(intent) {
  const goals = {
    asking_about_ai: "ai_tools",
    asking_about_clients: "client_management",
    beginner_start: "start_online",
    comparison: "compare_products",
    payment: "payment_help",
    product_details: "product_details"
  };
  return goals[intent] || null;
}

function actionLabel(action, language) {
  const ar = language === "ar";
  const labels = {
    view_product: ar ? "عرض المنتج" : "View Product",
    compare_products: ar ? "قارن المنتجات" : "Compare Products",
    payment_options: ar ? "طرق الدفع" : "Payment Options",
    ask_more: ar ? "اسألني سؤالًا آخر" : "Ask another question"
  };
  return labels[action];
}

function buildActions(decision, product, language) {
  const actions = [];
  if (decision === "recommend_product" || decision === "explain_product") {
    if (product?.page_link) actions.push({ label: actionLabel("view_product", language), href: product.page_link });
    actions.push({ label: actionLabel("ask_more", language), value: language === "ar" ? "لدي سؤال آخر" : "I have another question" });
  }
  if (decision === "compare_products") {
    actions.push({ label: actionLabel("compare_products", language), value: language === "ar" ? "قارن المنتجات" : "Compare products" });
  }
  if (decision === "show_payment_options") {
    actions.push({ label: actionLabel("payment_options", language), href: "/payment-methods.html" });
  }
  return actions;
}

function draftReply({ intent, decision, product, pageProduct, language, memory, budget }) {
  const ar = language === "ar";

  if (intent === "greeting") {
    return ar
      ? "أهلًا بك. أخبرني باختصار: ما الذي تحاول تحسينه الآن في عملك الرقمي؟"
      : "Hi. Tell me briefly: what are you trying to improve in your digital work right now?";
  }

  if (intent === "off_topic") {
    return ar
      ? "أقدر أجاوب باختصار، لكن تخصصي هنا موارد DBL. هل تريد أن أساعدك تختار موردًا يناسب هدفك؟"
      : "I can answer briefly, but my focus here is DBL resources. Would you like help choosing the right one?";
  }

  if (decision === "show_payment_options") {
    return ar
      ? "إذا الدفع بالبطاقة غير مناسب لك، استخدم صفحة طرق الدفع البديلة. بعد الدفع أرسل التأكيد واسم المنتج."
      : "If card checkout is not available for you, use the alternative payment page. After payment, send confirmation and the product name.";
  }

  if (decision === "compare_products") {
    return ar
      ? "Client Kit يركز على التعامل مع العملاء والرسائل والتسعير. Prompt Vault يركز على برومبتات AI لتحسين الإنتاجية والمحتوى. أي جانب أهم لك الآن؟"
      : "Client Kit focuses on client communication, pricing, and delivery. Prompt Vault focuses on AI prompts for productivity and content. Which side matters more right now?";
  }

  if (decision === "explain_product" && product) {
    const context = pageProduct?.id === product.id ? (ar ? "بما أنك في صفحة هذا المنتج،" : "Since you are viewing this product,") : "";
    return ar
      ? `${context} ${product.name} مناسب إذا كان هدفك قريبًا من ${product.type}. لا تحتاجه إذا كنت تبحث عن شيء خارج هذا المجال.`
      : `${context} ${product.name} fits if your need is close to ${product.category}. You may not need it if your goal is outside that area.`;
  }

  if (decision === "recommend_product" && product) {
    const budgetNote = budget !== null ? (ar ? ` وميزانيتك حوالي ${budget}$` : ` and your budget is around $${budget}`) : "";
    return ar
      ? `بناءً على كلامك${budgetNote}، الأقرب لك هو ${product.name}. السبب: يناسب المشكلة التي ذكرتها بدون تعقيد زائد.`
      : `Based on what you shared${budgetNote}, the closest fit is ${product.name}. It matches the problem you described without adding unnecessary complexity.`;
  }

  if (decision === "ask_question") {
    return ar
      ? "أفهمك. قبل أن أرشح أي منتج، ما المشكلة الأساسية عندك الآن: AI، العملاء، البداية أونلاين، أم اختيار الحزمة المناسبة؟"
      : "I understand. Before recommending anything, what is the main issue right now: AI, clients, starting online, or choosing the right bundle?";
  }

  return ar
    ? "لا أحتاج أن أرشح لك منتجًا الآن. أقدر أساعدك تفهم الخيارات أو تختار موردًا إذا أخبرتني بهدفك."
    : "I do not need to recommend a product right now. I can help you understand the options or choose a resource if you share your goal.";
}

function analyzeConversation({ message, language = "ar", currentPage = "", pageTitle = "", memory = {}, products = [] }) {
  const intent = detectIntent(message);
  const pageProduct = productFromPage(products, currentPage);
  const budget = detectBudget(message);
  const experienceLevel = detectExperience(message) || memory.experience_level || null;
  const occupation = detectOccupation(message) || memory.occupation || null;
  const goal = goalForIntent(intent) || memory.goal || null;
  let product = productForIntent(products, intent, budget, pageProduct);

  let decision = "ask_question";
  if (intent === "greeting" || intent === "emotional_or_unclear") decision = "ask_question";
  if (intent === "off_topic") decision = "answer_without_selling";
  if (intent === "payment") decision = "show_payment_options";
  if (intent === "comparison") decision = "compare_products";
  if (intent === "product_details" && (pageProduct || memory.interested_product || memory.recommended_product)) {
    product = pageProduct || getProductById(products, memory.interested_product) || getProductById(products, memory.recommended_product);
    decision = "explain_product";
  }
  if (["asking_about_ai", "asking_about_clients", "beginner_start", "pricing"].includes(intent) && product) {
    decision = "recommend_product";
  }

  if (budget !== null && decision === "ask_question") {
    product = productForIntent(products, "pricing", budget, pageProduct);
    decision = product ? "recommend_product" : "ask_question";
  }

  const nextMemory = {
    ...memory,
    goal: goal || memory.goal || null,
    experience_level: experienceLevel,
    budget: budget ?? memory.budget ?? null,
    occupation,
    main_problem: intent !== "greeting" ? String(message || "").slice(0, 220) : memory.main_problem || null,
    interested_product: pageProduct?.id || memory.interested_product || null,
    recommended_product: product?.id || memory.recommended_product || null,
    conversation_stage: decision,
    last_intent: intent,
    page_title: pageTitle || memory.page_title || null
  };

  const draft = draftReply({ intent, decision, product, pageProduct, language, memory: nextMemory, budget });

  return {
    intent,
    decision,
    product,
    pageProduct,
    memory: nextMemory,
    draftReply: draft,
    actions: buildActions(decision, product, language)
  };
}

module.exports = {
  analyzeConversation
};
