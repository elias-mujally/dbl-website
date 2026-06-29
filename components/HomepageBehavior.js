"use client";

import { useEffect } from "react";

const DBL_GUIDE_ENABLED = false;

function getSavedValue(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    return fallback;
  }
}

function saveValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
}

function getTranslation(translations, key) {
  const keys = key.split(".");
  let value = translations;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) value = value[k];
    else return key;
  }
  return Array.isArray(value) ? value : typeof value === "string" ? value : key;
}

function applyTheme(theme, translations) {
  const currentTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", currentTheme === "light" ? "#f6f8fb" : "#020611");
  updateThemeToggleLabel(currentTheme, translations);
  return currentTheme;
}

function updateThemeToggleLabel(currentTheme, translations) {
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", currentTheme === "light" ? "true" : "false");
    button.setAttribute("aria-label", getTranslation(translations, `theme.switchTo${nextTheme === "light" ? "Light" : "Dark"}`));
    const label = button.querySelector(".theme-toggle-text");
    if (label) label.textContent = getTranslation(translations, `theme.${nextTheme}`);
  });
}

function injectThemeToggles(translations) {
  document.querySelectorAll(".nav-controls").forEach((controls) => {
    if (controls.querySelector("[data-theme-toggle]")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("data-theme-toggle", "");
    button.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-text">Light</span>';
    controls.insertBefore(button, controls.firstChild);
  });
  updateThemeToggleLabel(document.documentElement.dataset.theme || "dark", translations);
}

function applyLanguageShell(lang) {
  const currentLanguage = lang === "en" ? "en" : "ar";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.documentElement.classList.toggle("rtl", currentLanguage === "ar");
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLanguage);
  });
  return currentLanguage;
}

function updatePageTranslations(translations) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = getTranslation(translations, element.getAttribute("data-i18n"));
    if (Array.isArray(translation)) {
      const index = Array.from(element.parentNode.children).indexOf(element);
      if (translation[index]) element.textContent = translation[index];
    } else {
      element.textContent = translation;
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.setAttribute("alt", getTranslation(translations, element.getAttribute("data-i18n-alt")));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria-label");
    let label = getTranslation(translations, key);
    if (element.hasAttribute("data-preview-dot")) label = `${label} ${Number(element.dataset.previewDot) + 1}`;
    element.setAttribute("aria-label", label);
  });

  document.querySelectorAll(".mobile-menu-toggle").forEach((button) => {
    button.setAttribute("aria-label", getTranslation(translations, "nav.mobileMenu"));
  });
  document.querySelectorAll(".mobile-nav-panel").forEach((panel) => {
    panel.setAttribute("aria-label", getTranslation(translations, "nav.mobileMenu"));
  });
  updateThemeToggleLabel(document.documentElement.dataset.theme || "dark", translations);
}

function injectMobileMenu(translations) {
  document.querySelectorAll(".nav").forEach((nav, index) => {
    if (nav.querySelector(".mobile-menu-toggle")) return;
    const controls = nav.querySelector(".nav-controls");
    const navLinks = nav.querySelector(".nav-links");
    if (!controls || !navLinks) return;

    const id = `mobile-menu-${index + 1}`;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-label", getTranslation(translations, "nav.mobileMenu"));
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", id);
    toggle.innerHTML = "<span></span><span></span><span></span>";

    const menu = document.createElement("nav");
    menu.className = "mobile-nav-panel";
    menu.id = id;
    menu.setAttribute("aria-label", getTranslation(translations, "nav.mobileMenu"));
    menu.setAttribute("hidden", "");
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
    button.setAttribute("aria-expanded", "false");
    document.getElementById(button.getAttribute("aria-controls"))?.setAttribute("hidden", "");
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("in-view"));
    return;
  }
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
  return () => revealObserver.disconnect();
}

function initHeroParallax() {
  const visual = document.querySelector(".hero-visual");
  const cards = document.querySelectorAll(".float-card");
  if (!visual) return undefined;
  const handleMove = (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cards.forEach((card, index) => {
      const depth = (index + 1) * 8;
      card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  };
  const handleLeave = () => {
    cards.forEach((card) => {
      card.style.transform = "";
    });
  };
  visual.addEventListener("pointermove", handleMove);
  visual.addEventListener("pointerleave", handleLeave);
  return () => {
    visual.removeEventListener("pointermove", handleMove);
    visual.removeEventListener("pointerleave", handleLeave);
  };
}

async function copyTextToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default function HomepageBehavior() {
  useEffect(() => {
    let currentLanguage = applyLanguageShell(getSavedValue("language", "ar"));
    let currentTheme = applyTheme(getSavedValue("theme", "dark"), {});
    let translations = {};
    let disposed = false;

    window.DBL_SITE = {
      getLanguage: () => currentLanguage,
      getTranslation: (key) => getTranslation(translations, key),
      copyTextToClipboard,
    };

    const loadTranslations = async (lang) => {
      try {
        const response = await fetch(`/i18n/${lang}.json`);
        translations = await response.json();
      } catch (error) {
        translations = {};
      }
      if (disposed) return;
      injectThemeToggles(translations);
      injectMobileMenu(translations);
      updatePageTranslations(translations);
    };

    const setLanguage = (lang) => {
      currentLanguage = applyLanguageShell(lang);
      saveValue("language", currentLanguage);
      loadTranslations(currentLanguage);
    };

    const setTheme = (theme) => {
      currentTheme = applyTheme(theme, translations);
      saveValue("theme", currentTheme);
    };

    const handleClick = async (event) => {
      const themeButton = event.target.closest("[data-theme-toggle]");
      if (themeButton) {
        event.preventDefault();
        event.stopPropagation();
        setTheme(currentTheme === "light" ? "dark" : "light");
        return;
      }

      const menuButton = event.target.closest(".mobile-menu-toggle");
      if (menuButton) {
        event.preventDefault();
        event.stopPropagation();
        const panel = document.getElementById(menuButton.getAttribute("aria-controls"));
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        closeMobileMenus();
        if (!isOpen && panel) {
          menuButton.setAttribute("aria-expanded", "true");
          panel.removeAttribute("hidden");
        }
        return;
      }

      if (event.target.closest(".mobile-nav-panel a")) {
        closeMobileMenus();
        return;
      }

      const languageButton = event.target.closest(".lang-btn");
      if (languageButton) {
        event.preventDefault();
        event.stopPropagation();
        setLanguage(languageButton.getAttribute("data-lang"));
        return;
      }

      if (!event.target.closest(".mobile-nav-panel")) closeMobileMenus();
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") closeMobileMenus();
    };

    const updateSocialLinks = () => {
      const facebookUrl = "https://www.facebook.com/share/18NR4xWCvr/";
      document.querySelectorAll('a[href*="facebook.com"]').forEach((link) => {
        link.href = facebookUrl;
      });
    };

    const revealCleanup = initRevealAnimations();
    const parallaxCleanup = initHeroParallax();
    updateSocialLinks();
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    loadTranslations(currentLanguage);

    if (DBL_GUIDE_ENABLED) {
      const script = document.createElement("script");
      script.src = "/dbl-guide.js?v=disabled-20260623";
      script.defer = true;
      script.addEventListener("load", () => window.initDBLGuide?.());
      document.body.appendChild(script);
    }

    return () => {
      disposed = true;
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
      revealCleanup?.();
      parallaxCleanup?.();
    };
  }, []);

  return null;
}
