// Language and Translation Management
let currentLanguage = 'en';
let translations = {};

// Load translations
async function loadTranslations(lang) {
  try {
    const response = await fetch(`/i18n/${lang}.json`);
    translations = await response.json();
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
  }
}

// Get nested translation value
function getTranslation(key) {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return Array.isArray(value) ? value : (typeof value === 'string' ? value : key);
}

// Update all translations on the page
function updatePageTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getTranslation(key);
    
    if (Array.isArray(translation)) {
      // For arrays, update only if this is a list item
      const index = Array.from(element.parentNode.children).indexOf(element);
      if (translation[index]) {
        element.textContent = translation[index];
      }
    } else {
      element.textContent = translation;
    }
  });
}

// Set language and update UI
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  // Update HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Update RTL class
  if (lang === 'ar') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
  
  // Load translations and update page
  loadTranslations(lang).then(() => {
    updatePageTranslations();
  });
  
  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Get saved language or default to English
  const savedLanguage = localStorage.getItem('language') || 'en';
  
  // Load translations
  await loadTranslations(savedLanguage);
  
  // Set initial language
  setLanguage(savedLanguage);
  
  // Attach language switcher listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});

// Reveal animation on scroll
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Parallax effect for floating cards
const visual = document.querySelector(".hero-visual");
const cards = document.querySelectorAll(".float-card");

visual?.addEventListener("pointermove", (event) => {
  const rect = visual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  cards.forEach((card, index) => {
    const depth = (index + 1) * 8;
    card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});

visual?.addEventListener("pointerleave", () => {
  cards.forEach((card) => {
    card.style.transform = "";
  });
});
