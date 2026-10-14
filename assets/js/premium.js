/* premium.js — progressive-enhancement interactions for taqi-kazmi-website.
   No conflicts with app.js: uses its own classes and listeners only. */
(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SELECTORS = [
    '.high-value-card', '.right-card', '.procedure-card', '.template-card',
    '.video-card', '.hub-total', '.glossary-grid > div', '.faq-list details',
    '.template-card', '.about-visual', '.trust-item'
  ].join(',');

  function observe(scope) {
    var els = (scope || document).querySelectorAll(SELECTORS);
    els.forEach(function (el) {
      if (el.classList.contains('reveal') || el.dataset.rv === '1') return;
      el.classList.add('reveal');
      el.dataset.rv = '1';
      io.observe(el);
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  observe(document);

  // app.js renders cards dynamically — pick them up too (debounced).
  var t = null;
  new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(function () { observe(document); }, 400);
  }).observe(document.body, { childList: true, subtree: true });
})();
