/*
 * main.js — page behaviours (loaded with `defer`, so the DOM is ready).
 * Ported from the imageworks Drupal theme script (jQuery) to modern,
 * dependency-free JS.
 *
 *   1. Hamburger (#menu-push) opens/closes the mobile nav + language switcher.
 *   2. Top-level "expanded" menu links toggle their sub-menu on mobile
 *      (and, as on the live site, do not navigate on click).
 *   3. Floating seal badge (bottom-right) appears on the visitor's first
 *      scroll and hides while the footer is on screen.
 *   4. On desktop the header becomes fixed ("anchored") once you scroll past it.
 */
(() => {
  'use strict';

  const MOBILE_MAX = 1023;
  const SLIDE_MS = 600; // jQuery 'slow'

  const winWidth = () => window.innerWidth || document.documentElement.clientWidth;
  const scrollTop = () => window.pageYOffset || document.documentElement.scrollTop;
  const isMobile = () => winWidth() <= MOBILE_MAX;

  /* ---------- slideDown / slideUp (height animation, then display toggle) ---------- */

  const slideDown = (el) => {
    if (!el || el.classList.contains('is-open')) return;
    el.classList.add('is-open');
    const target = el.scrollHeight;
    el.style.overflow = 'hidden';
    el.style.height = '0px';
    el.style.transition = `height ${SLIDE_MS}ms ease`;
    void el.offsetHeight; // force reflow so the transition starts from 0
    el.style.height = `${target}px`;
    setTimeout(() => {
      el.style.transition = '';
      el.style.height = '';
      el.style.overflow = '';
    }, SLIDE_MS);
  };

  const slideUp = (el) => {
    if (!el || !el.classList.contains('is-open')) return;
    el.style.overflow = 'hidden';
    el.style.height = `${el.scrollHeight}px`;
    el.style.transition = `height ${SLIDE_MS}ms ease`;
    void el.offsetHeight;
    el.style.height = '0px';
    setTimeout(() => {
      el.classList.remove('is-open');
      el.style.transition = '';
      el.style.height = '';
      el.style.overflow = '';
    }, SLIDE_MS);
  };

  /* ---------- 1. Hamburger ---------- */

  const initMobileMenu = () => {
    const menuPush = document.getElementById('menu-push');
    if (!menuPush) return;

    const nav = document.querySelector('#header nav');
    const langSwitcher = document.getElementById('block-imageworks-languageswitchercontent');

    menuPush.addEventListener('click', () => {
      const open = menuPush.classList.toggle('active');
      const slide = open ? slideDown : slideUp;
      slide(nav);
      slide(langSwitcher);
    });
  };

  /* ---------- 2. Expanded top-level items ---------- */

  const initExpandedItems = () => {
    const links = document.querySelectorAll(
      '#block-imageworks-main-menu > ul.menu > li.menu-item.menu-item--expanded > a'
    );

    for (const link of links) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const sub = link.parentNode.querySelector(':scope > ul.menu');
        const open = link.classList.toggle('open');
        if (isMobile()) (open ? slideDown : slideUp)(sub);
      });
    }
  };

  /* ---------- 3. Floating seal badge ---------- */

  const initSealBadge = () => {
    const badge = document.getElementById('yrBadge');
    if (!badge) return;

    const footer = document.querySelector('footer');
    let footerVisible = false;
    let hasScrolled = scrollTop() > 0;

    const sync = () => badge.classList.toggle('show', hasScrolled && !footerVisible);

    if (footer && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        footerVisible = entry.isIntersecting;
        sync();
      }, { threshold: 0 }).observe(footer);
    }

    window.addEventListener('scroll', () => {
      if (hasScrolled) return;
      hasScrolled = true;
      sync();
    }, { passive: true });

    sync();
  };

  /* ---------- 4. Anchored header on desktop ---------- */

  const initAnchoredHeader = () => {
    const header = document.getElementById('header');
    const headerWrap = document.getElementById('header-wrap');
    if (!header || !headerWrap) return;

    const scrollPast = header.getBoundingClientRect().top + scrollTop();

    const setAnchored = (anchored) => {
      header.classList.toggle('anchored', anchored);
      headerWrap.classList.toggle('push-down', anchored);
    };

    const onScroll = () => {
      if (isMobile()) return;
      setAnchored(scrollTop() > scrollPast);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => (isMobile() ? setAnchored(false) : onScroll()));
  };

  initMobileMenu();
  initExpandedItems();
  initSealBadge();
  initAnchoredHeader();
})();
