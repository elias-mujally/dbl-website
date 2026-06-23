// Core site interactions. Set DBL_GUIDE_ENABLED to true when DBL Guide is ready to relaunch.
const DBL_GUIDE_ENABLED = false;

let currentLanguage = 'ar';
let translations = {};
let currentTheme = 'dark';

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
  } catch (error) {}
}

function applyEarlyLanguage() {
  const lang = getSavedLanguage();
  currentLanguage = lang === 'en' ? 'en' : 'ar';
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.classList.toggle('rtl', currentLanguage === 'ar');
}

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
  } catch (error) {}
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

async function loadTranslations(lang) {
  try {
    const response = await fetch(`/i18n/${lang}.json`);
    translations = await response.json();
  } catch (error) {
    translations = {};
  }
}

function updatePageTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const translation = getTranslation(element.getAttribute('data-i18n'));
    if (Array.isArray(translation)) {
      const index = Array.from(element.parentNode.children).indexOf(element);
      if (translation[index]) element.textContent = translation[index];
    } else {
      element.textContent = translation;
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    element.setAttribute('alt', getTranslation(element.getAttribute('data-i18n-alt')));
  });

  updateThemeToggleLabel();
  document.querySelectorAll('.mobile-menu-toggle').forEach((button) => button.setAttribute('aria-label', getTranslation('nav.mobileMenu')));
  document.querySelectorAll('.mobile-nav-panel').forEach((panel) => panel.setAttribute('aria-label', getTranslation('nav.mobileMenu')));
  window.updateAssistantLanguage?.(document.querySelector('.dbl-assistant-widget'));
}

function setLanguage(lang) {
  currentLanguage = lang === 'en' ? 'en' : 'ar';
  saveLanguage(currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.classList.toggle('rtl', currentLanguage === 'ar');
  document.querySelectorAll('.lang-btn').forEach((btn) => btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLanguage));
  loadTranslations(currentLanguage).then(updatePageTranslations);
}

function injectMobileMenu() {
  document.querySelectorAll('.nav').forEach((nav, index) => {
    if (nav.querySelector('.mobile-menu-toggle')) return;
    const controls = nav.querySelector('.nav-controls');
    const navLinks = nav.querySelector('.nav-links');
    if (!controls || !navLinks) return;

    const id = `mobile-menu-${index + 1}`;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', getTranslation('nav.mobileMenu'));
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', id);
    toggle.innerHTML = '<span></span><span></span><span></span>';

    const menu = document.createElement('nav');
    menu.className = 'mobile-nav-panel';
    menu.id = id;
    menu.setAttribute('aria-label', getTranslation('nav.mobileMenu'));
    menu.setAttribute('hidden', '');
    menu.innerHTML = `
      <a href="/books.html" data-i18n="nav.books">Books</a>
      <a href="/tools.html" data-i18n="nav.tools">Tools</a>
      <a href="/about.html" data-i18n="nav.about">About</a>
      <a href="/contact.html" data-i18n="nav.contact">Contact</a>
      <a href="/refund-policy.html" data-i18n="nav.refundPolicy">Refund Policy</a>
      <a href="/terms.html" data-i18n="nav.terms">Terms</a>
      <a href="/privacy-policy.html" data-i18n="nav.privacy">Privacy</a>
    `;

    controls.appendChild(toggle);
    nav.appendChild(menu);
  });
}

function closeMobileMenus() {
  document.querySelectorAll('.mobile-menu-toggle[aria-expanded="true"]').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
    document.getElementById(button.getAttribute('aria-controls'))?.setAttribute('hidden', '');
  });
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
  try {
    await copyTextToClipboard(value);
  } catch (error) {}
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

function updateSocialLinks() {
  const facebookUrl = 'https://www.facebook.com/share/18NR4xWCvr/';
  document.querySelectorAll('a[href*="facebook.com"]').forEach((link) => { link.href = facebookUrl; });
}

function injectClarityTracking() {
  const projectId = 'x13ucd5sdu';
  if (window.clarity || document.querySelector(`script[src="https://www.clarity.ms/tag/${projectId}"]`)) return;
  (function(c, l, a, r, i, t, y) { c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, 'clarity', 'script', projectId);
}

function loadDBLGuideIfEnabled() {
  if (!DBL_GUIDE_ENABLED) return;
  const script = document.createElement('script');
  script.src = '/dbl-guide.js?v=disabled-20260623';
  script.defer = true;
  script.addEventListener('load', () => window.initDBLGuide?.());
  document.body.appendChild(script);
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('in-view'));
    return;
  }
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

function initHeroParallax() {
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
}

applyEarlyLanguage();
applyTheme(getSavedTheme());

window.DBL_SITE = {
  getLanguage: () => currentLanguage,
  getTranslation,
  copyTextToClipboard
};

document.addEventListener('DOMContentLoaded', async () => {
  injectThemeToggles();
  injectMobileMenu();
  injectClarityTracking();
  updateSocialLinks();
  initRevealAnimations();
  initHeroParallax();

  await loadTranslations(currentLanguage);
  updatePageTranslations();
  document.querySelectorAll('.lang-btn').forEach((btn) => btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLanguage));

  document.addEventListener('click', async (event) => {
    const themeButton = event.target.closest('[data-theme-toggle]');
    if (themeButton) {
      event.preventDefault();
      event.stopPropagation();
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
      return;
    }

    const menuButton = event.target.closest('.mobile-menu-toggle');
    if (menuButton) {
      event.preventDefault();
      event.stopPropagation();
      const panel = document.getElementById(menuButton.getAttribute('aria-controls'));
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      closeMobileMenus();
      if (!isOpen && panel) {
        menuButton.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
      return;
    }

    if (event.target.closest('.mobile-nav-panel a')) {
      closeMobileMenus();
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

    const languageButton = event.target.closest('.lang-btn');
    if (languageButton) {
      event.preventDefault();
      event.stopPropagation();
      setLanguage(languageButton.getAttribute('data-lang'));
      return;
    }

    if (!event.target.closest('.mobile-nav-panel')) closeMobileMenus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenus();
  });

  loadDBLGuideIfEnabled();
});
