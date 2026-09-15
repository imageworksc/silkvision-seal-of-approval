/*
 * Behaviours ported from the imageworks Drupal theme script (jQuery) to
 * dependency-free JS. Only what this page uses:
 *   1. Hamburger (#menu-push) opens/closes the mobile nav + language switcher.
 *   2. Top-level "expanded" menu links toggle their sub-menu on mobile
 *      (and, as on the live site, do not navigate on click).
 *   3. On desktop the header becomes fixed ("anchored") once you scroll past it.
 */
(function () {
  'use strict';

  var MOBILE_MAX = 1023;
  var SLIDE_MS = 600; // jQuery 'slow'

  function winWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
  }

  /* --- tiny slideDown / slideUp (height animation, then display toggle) --- */
  function slideDown(el) {
    if (!el || el.classList.contains('is-open')) return;
    el.classList.add('is-open');
    var target = el.scrollHeight;
    el.style.overflow = 'hidden';
    el.style.height = '0px';
    el.style.transition = 'height ' + SLIDE_MS + 'ms ease';
    // force reflow so the transition starts from 0
    void el.offsetHeight;
    el.style.height = target + 'px';
    setTimeout(function () {
      el.style.transition = '';
      el.style.height = '';
      el.style.overflow = '';
    }, SLIDE_MS);
  }

  function slideUp(el) {
    if (!el || !el.classList.contains('is-open')) return;
    el.style.overflow = 'hidden';
    el.style.height = el.scrollHeight + 'px';
    el.style.transition = 'height ' + SLIDE_MS + 'ms ease';
    void el.offsetHeight;
    el.style.height = '0px';
    setTimeout(function () {
      el.classList.remove('is-open');
      el.style.transition = '';
      el.style.height = '';
      el.style.overflow = '';
    }, SLIDE_MS);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var headerWrap = document.getElementById('header-wrap');
    var nav = document.querySelector('#header nav');
    var langSwitcher = document.getElementById('block-imageworks-languageswitchercontent');
    var menuPush = document.getElementById('menu-push');

    /* 1. Hamburger */
    if (menuPush) {
      menuPush.addEventListener('click', function () {
        if (menuPush.classList.contains('active')) {
          slideUp(nav);
          slideUp(langSwitcher);
          menuPush.classList.remove('active');
        } else {
          slideDown(nav);
          slideDown(langSwitcher);
          menuPush.classList.add('active');
        }
      });
    }

    /* 2. Expanded top-level items */
    var expanded = document.querySelectorAll(
      '#block-imageworks-main-menu > ul.menu > li.menu-item.menu-item--expanded > a'
    );
    Array.prototype.forEach.call(expanded, function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var sub = link.parentNode.querySelector(':scope > ul.menu');
        if (link.classList.contains('open')) {
          if (winWidth() <= MOBILE_MAX) slideUp(sub);
          link.classList.remove('open');
        } else {
          if (winWidth() <= MOBILE_MAX) slideDown(sub);
          link.classList.add('open');
        }
      });
    });

    /* 3. Anchored header on desktop */
    if (header && headerWrap) {
      var scrollPast = header.getBoundingClientRect().top + window.pageYOffset;
      var onScroll = function () {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (winWidth() > MOBILE_MAX && y > scrollPast) {
          header.classList.add('anchored');
          headerWrap.classList.add('push-down');
        } else if (winWidth() > MOBILE_MAX && y <= scrollPast) {
          header.classList.remove('anchored');
          headerWrap.classList.remove('push-down');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', function () {
        if (winWidth() <= MOBILE_MAX) {
          header.classList.remove('anchored');
          headerWrap.classList.remove('push-down');
        } else {
          onScroll();
        }
      });
    }
  });
})();
