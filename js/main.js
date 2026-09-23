/* ==========================================================================
   Page behaviour — two things, and neither of them is layout.

   1. The header's menu toggle below 960px.
   2. The floating accreditation seal: in on the first scroll, out over the
      footer so it never sits on top of the legal text.

   Loaded with `defer`, so the document is parsed by the time this runs.
   Entrance reveals are js/reveal.js, which ships with the design system.
   ========================================================================== */

'use strict';

/* -------------------------------------------------------------------------
   1 · MENU TOGGLE
   A button with aria-expanded rather than a native <details>: the panel has
   to be a plain row above 960px, and forcing a closed <details> open in CSS
   means fighting the UA's own hiding of its content.
   ------------------------------------------------------------------------- */
function setupMenu() {
  const toggle = document.querySelector('.sv-nav-toggle');
  const nav = document.getElementById('sv-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.dataset.open = String(open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  /* Escape closes it and puts focus back on the control that opened it —
     otherwise focus is left inside a panel that is no longer on screen. */
  nav.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    setOpen(false);
    toggle.focus();
  });

  /* Following a link inside the panel leaves it open behind the new page in
     a back-navigation restore. Close on activation. */
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
}

/* -------------------------------------------------------------------------
   2 · THE FLOATING SEAL
   Shown once the visitor has scrolled at all, then held — it is an
   accreditation mark, not an alert, so it should not flicker with the
   scroll direction. Hidden again while the footer is on screen.
   ------------------------------------------------------------------------- */
function setupBadge() {
  const badge = document.getElementById('sv-badge');
  if (!badge) return;

  const footer = document.querySelector('footer');
  let footerVisible = false;
  let scrolled = window.scrollY > 0;

  const sync = () => badge.classList.toggle('is-shown', scrolled && !footerVisible);

  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      footerVisible = entry.isIntersecting;
      sync();
    }, { threshold: 0 }).observe(footer);
  }

  window.addEventListener('scroll', () => {
    if (scrolled) return;
    scrolled = true;
    sync();
  }, { passive: true });

  sync();
}

setupMenu();
setupBadge();
