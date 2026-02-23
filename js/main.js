/**
 * FireCheck 4D E-leaflet — optional behaviour
 */
(function () {
  'use strict';

  // i18n — uses translations from firecheck4d_translate.js
  var translations = window.FireCheck4D_TRANSLATIONS || { en: {}, fr: {} };
  var STORAGE_KEY = 'firecheck4d-lang';

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

    sidebarLinks.forEach(function (link) {
      link.addEventListener('click', closeSidebar);
    });

    document.querySelectorAll('.nav-sidebar-lang .lang-btn').forEach(function (btn) {
      btn.addEventListener('click', closeSidebar);
    });

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

  // Hero video loop fallback
  var heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('ended', function () {
      heroVideo.currentTime = 0;
      heroVideo.play();
    });
  }

  // Stats count-up animation (0 → target when section in view)
  function easeOutQuart(t) {
    return 1 - (1 - t) * (1 - t) * (1 - t) * (1 - t);
  }

  function runCountAnimation(el, durationMs) {
    var target = Number(el.getAttribute('data-count-to'));
    var suffix = el.getAttribute('data-suffix') || '';
    var format = el.getAttribute('data-format');
    var start = 0;
    var startTime = null;

    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / durationMs, 1);
      var eased = easeOutQuart(progress);
      var value = start + (target - start) * eased;

      if (format === 'integer') {
        el.textContent = Math.round(value).toLocaleString();
      } else {
        el.textContent = Math.round(value) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (format === 'integer') {
          el.textContent = target.toLocaleString();
        } else {
          el.textContent = target + suffix;
        }
      }
    }

    requestAnimationFrame(update);
  }

  var statsSection = document.getElementById('benefits');
  var statValues = document.querySelectorAll('.stat-value[data-count-to]');

  if (statsSection && statValues.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          var duration = 1200;
          var stagger = 150;
          statValues.forEach(function (el, i) {
            setTimeout(function () {
              runCountAnimation(el, duration);
            }, i * stagger);
          });
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );
    observer.observe(statsSection);
  }
})();
