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

    document.querySelectorAll('iframe[data-youtube-en][data-youtube-fr]').forEach(function (iframe) {
      var nextSrc = lang === 'fr' ? iframe.getAttribute('data-youtube-fr') : iframe.getAttribute('data-youtube-en');
      if (nextSrc && iframe.getAttribute('src') !== nextSrc) {
        iframe.setAttribute('src', nextSrc);
      }
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

  // Workflow expand/collapse — images hidden by default, show on click
  // In wide screen (3 boxes horizontal), expand/collapse all together
  var workflowWideBreakpoint = window.matchMedia('(min-width: 900px)');

  function setWorkflowCardState(card, isExpanded) {
    var box = card.querySelector('.workflow-images-box');
    var btn = card.querySelector('.workflow-expand-btn');
    var expandText = btn ? btn.querySelector('.expand-text') : null;
    var collapseText = btn ? btn.querySelector('.collapse-text') : null;
    if (box) {
      box.classList.toggle('is-expanded', isExpanded);
      box.setAttribute('aria-hidden', !isExpanded);
    }
    if (btn) {
      btn.setAttribute('aria-expanded', isExpanded);
      if (expandText) expandText.style.display = isExpanded ? 'none' : 'inline';
      if (collapseText) collapseText.style.display = isExpanded ? 'inline' : 'none';
    }
  }

  function initWorkflowExpand() {
    var workflow = document.querySelector('.design-workflow');
    if (!workflow) return;
    var cards = workflow.querySelectorAll('.workflow-card');

    workflow.querySelectorAll('.workflow-expand-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = this.closest('.workflow-card');
        var controlsId = this.getAttribute('aria-controls');
        var box = controlsId ? document.getElementById(controlsId) : null;
        var expandText = this.querySelector('.expand-text');
        var collapseText = this.querySelector('.collapse-text');
        if (!box) return;

        var isExpanded = box.classList.toggle('is-expanded');
        this.setAttribute('aria-expanded', isExpanded);
        box.setAttribute('aria-hidden', !isExpanded);
        if (expandText) expandText.style.display = isExpanded ? 'none' : 'inline';
        if (collapseText) collapseText.style.display = isExpanded ? 'inline' : 'none';

        // Wide screen: sync all cards to the same expand/collapse state
        if (workflowWideBreakpoint.matches) {
          cards.forEach(function (c) {
            if (c !== card) setWorkflowCardState(c, isExpanded);
          });
        }
      });
    });
  }

  // SDG cards: touch devices can tap to expand/collapse text
  function initSdgCardExpandOnTouch() {
    var supportsHover = window.matchMedia('(hover: hover)').matches;
    if (supportsHover) return;

    var cards = document.querySelectorAll('.sdg-grid .sdg-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('is-expanded');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavSidebar);
  } else {
    initNavSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkflowExpand);
  } else {
    initWorkflowExpand();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSdgCardExpandOnTouch);
  } else {
    initSdgCardExpandOnTouch();
  }
})();
