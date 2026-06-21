// Language and Translation Management
let currentLanguage = 'ar';
let translations = {};
let currentTheme = 'dark';

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

document.addEventListener('DOMContentLoaded', async () => {
  injectBrandAssets();
  injectThemeToggles();
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
