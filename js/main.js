/* ==========================================================================
   Page behaviour
   Loaded with `defer`, so the document is parsed by the time this runs.

   Everything here is an enhancement. If the file fails to load the page is
   still complete and readable: nothing is hidden by CSS until this script
   says it is safe to hide it.
   ========================================================================== */

'use strict';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;

/* --------------------------------------------------------------------------
   1 · Menu
   A button with aria-expanded rather than a <details>: above 992px the panel
   has to be a plain row, and forcing a closed <details> open in CSS means
   fighting the browser's own hiding of its contents.
   -------------------------------------------------------------------------- */
const setupMenu = () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.dataset.open = String(open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  /* Escape closes it and returns focus to the control that opened it,
     otherwise focus is stranded in a panel that is no longer on screen.

     Bound to the document, not to nav. The toggle is nav's sibling, so right
     after you open the menu — when focus is still sitting on the button —
     a keydown on nav never fires and Escape did nothing at the one moment
     you are most likely to press it. */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    setOpen(false);
    toggle.focus();
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
};

/* --------------------------------------------------------------------------
   2 · Scroll state — the reading progress bar, the sticky header's shadow,
   and the flag that retires the scroll cue once it has done its job.
   -------------------------------------------------------------------------- */
const setupScroll = () => {
  const bar = document.getElementById('progress');
  const header = document.getElementById('siteHeader');
  let ticking = false;

  const read = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
    if (header) header.dataset.stuck = String(y > 8);
    root.dataset.scrolled = String(y > 40);
    ticking = false;
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(read);
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);

  read();
};

/* --------------------------------------------------------------------------
   3 · Scroll reveals
   The flag goes on <html> from here, so a target is only ever hidden while
   the page is in a position to bring it back.
   -------------------------------------------------------------------------- */
const setupReveals = () => {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  if (!targets.length) return;

  root.dataset.anim = 'on';

  if (reduced.matches || !('IntersectionObserver' in window)) {
    for (const el of targets) el.classList.add('is-in');
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: .1 });

  for (const el of targets) io.observe(el);

  // The negative rootMargin means anything in the last slice of a
  // fully-scrolled page would never trigger. Once the visitor reaches the
  // bottom, reveal whatever is still waiting.
  const flush = () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) return;
    for (const el of targets) {
      el.classList.add('is-in');
      io.unobserve(el);
    }
    window.removeEventListener('scroll', flush);
  };
  window.addEventListener('scroll', flush, { passive: true });
  window.addEventListener('load', flush);
};

/* --------------------------------------------------------------------------
   4 · The comparison table's swipe hint
   A closed loop: it runs once and ends. The hint exists because a horizontal
   swipe is an invisible trigger; the moment the region is actually scrolled
   the user has discovered it, so the hint retires and the listener with it.
   -------------------------------------------------------------------------- */
const setupScrollHint = () => {
  const region = document.getElementById('compareScroll');
  if (!region) return;

  const used = () => {
    region.dataset.used = 'true';
    region.removeEventListener('scroll', used);
  };
  region.addEventListener('scroll', used, { passive: true, once: true });
};

/* --------------------------------------------------------------------------
   5 · The floating seal
   In on the first scroll and held — it is an accreditation mark, not an
   alert, so it should not flicker with the scroll direction. Out again over
   the footer so it never covers the legal text.
   -------------------------------------------------------------------------- */
const setupSeal = () => {
  const seal = document.getElementById('seal');
  if (!seal) return;

  const footer = document.querySelector('footer');
  let footerVisible = false;
  let scrolled = window.scrollY > 0;

  const sync = () => seal.classList.toggle('is-in', scrolled && !footerVisible);

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
};

setupMenu();
setupScroll();
setupReveals();
setupScrollHint();
setupSeal();
