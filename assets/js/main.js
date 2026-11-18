// Forum Lindau – small UI helpers
(function () {
  'use strict';

  // Header shadow once the page is scrolled.
  // IntersectionObserver on a 1px marker at the top of the page: no scroll
  // listener and no forced layout during page load (better LCP / TBT).
  var header = document.querySelector('.fl-header');
  var marker = document.querySelector('.fl-scroll-marker');
  if (header && marker && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(marker);
  }

  // Keep aria-expanded on the menu button in sync (Bootstrap handles focus + Escape)
  var menu = document.getElementById('fl-menu');
  var burger = document.querySelector('.fl-burger');
  if (menu && burger) {
    menu.addEventListener('show.bs.offcanvas', function () { burger.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('hidden.bs.offcanvas', function () {
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    });
    // Close the overlay if the viewport grows to desktop width
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
      if (e.matches) {
        var oc = bootstrap.Offcanvas.getInstance(menu);
        if (oc) oc.hide();
      }
    });
  }
})();
