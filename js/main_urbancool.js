/**
 * UrbanCool Dynamics E-leaflet — optional behaviour
 */
(function () {
  'use strict';

  var translations = window.UrbanCool_TRANSLATIONS || { en: {}, fr: {} };
  var STORAGE_KEY = 'urbancool-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }

  function applyTranslations(lang) {
    var t = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key]) el.innerHTML = t[key];
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function initI18n() {
    var lang = getLang();
    setLang(lang);
    applyTranslations(lang);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newLang = this.getAttribute('data-lang');
        setLang(newLang);
        applyTranslations(newLang);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }

  // Mobile floating sidebar (MVRDV-style)
  function initNavSidebar() {
    var toggle = document.querySelector('.nav-toggle');
    var overlay = document.getElementById('nav-overlay');
    var sidebar = document.getElementById('nav-sidebar');
    var closeBtn = document.querySelector('.nav-sidebar-close');
    var sidebarLinks = document.querySelectorAll('.nav-sidebar-links a');

    function openSidebar() {
      if (!overlay || !sidebar) return;
      overlay.classList.add('is-open');
      sidebar.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (!overlay || !sidebar) return;
      overlay.classList.remove('is-open');
      sidebar.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
      document.body.style.overflow = '';
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        if (sidebar.classList.contains('is-open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    if (sidebarLinks && sidebarLinks.length) {
      sidebarLinks.forEach(function (link) {
        link.addEventListener('click', closeSidebar);
      });
    }

    var sidebarLang = document.querySelector('.nav-sidebar-lang');
    if (sidebarLang) {
      sidebarLang.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', closeSidebar);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('is-open')) {
        closeSidebar();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavSidebar);
  } else {
    initNavSidebar();
  }
})();
