/*
 * cherry-widget.js — Cherry "Pay over time" floating estimator.
 * Same configuration as the live page; the widget renders into
 * #floatingEstimator (inside <footer>). Loaded with `defer`.
 */
(() => {
  'use strict';

  const WIDGET_SRC = 'https://files.withcherry.com/widgets/widget.js';

  // Command queue: calls made before widget.js loads are replayed by it.
  const hw = (...args) => {
    (hw.q = hw.q || []).push(args);
  };
  window._hw = window._hw || hw;

  const script = document.createElement('script');
  script.id = '_hw';
  script.src = WIDGET_SRC;
  script.async = true;
  document.head.appendChild(script);

  window._hw('init', {
    debug: false,
    variables: {
      slug: 'silk-vision-and-surgical-center',
      name: 'Silk Vision LASIK Surgical Center',
      images: [85],
      customLogo: '',
      defaultPurchaseAmount: 1500,
      customImage: '',
      imageCategory: 'vision',
      language: 'en',
    },
    styles: {
      primaryColor: '#005894',
      secondaryColor: '#00589410',
      fontFamily: 'Montserrat',
      headerFontFamily: 'Montserrat',
      floatingEstimator: {
        position: 'bottom-left',
        offset: { x: '0px', y: '0px' },
        zIndex: 9999,
        ctaFontFamily: 'Montserrat',
        bodyFontFamily: 'Montserrat',
        ctaColor: '#005894',
        ctaTextColor: '#FFFFFF',
      },
    },
  }, ['floatingEstimator']);
})();
