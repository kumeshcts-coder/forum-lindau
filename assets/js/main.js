// Forum Lindau – small UI helpers
(function () {
  'use strict';

  // Header shadow once the page is scrolled
  var header = document.querySelector('.fl-header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
