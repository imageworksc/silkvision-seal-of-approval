# Silk Vision — Office-Based Surgery (static recreation)

Static, dependency-free recreation of
<https://www.silkvision.net/you-are-candidate-office-based-surgery>
for staging on GitHub Pages.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Same markup, IDs and classes as the live Drupal page (node/243). No inline styles or scripts. |
| `css/base.css` | Design tokens, normalize subset, typography, lists, layout primitives, shared components (`.divide`, `a.cta-btn`) and Drupal utilities (`clearfix`, `visually-hidden`, `text-align-center`). |
| `css/header.css` | Top utility bar, header, logo, main menu (dropdowns, megamenu, mobile push menu), language switcher. |
| `css/page-obs.css` | The page's sections: hero, two-column intro, patient benefits, surgery-day steps, advantages table, closing CTA. |
| `css/footer.css` | Contact CTA strip, pre-footer (offices, hours, logo, social) and footer. |
| `css/seal-badge.css` | Floating accreditation seal (bottom-right). |
| `js/main.js` | Page behaviours (ES2015+, `const`/`let`, arrow functions, loaded with `defer`): hamburger menu, mobile sub-menus, seal badge show/hide, anchored header on desktop scroll. |
| `js/cherry-widget.js` | Loader + configuration for the Cherry "Pay over time" estimator. |
| `images/` | Logos, hero / section backgrounds, list bullets, table checkmark, seal badge (240 px). |
| `floating-seal-badge.md`, `joint-commission-accreditation.png` | Seal-badge component spec and the original seal artwork. |
| `hero-office-based-surgery.jpg` | Full-size copy of the hero background (same file as `images/obs-bg2.jpg`, 1920×1201). |

Stylesheets are split by responsibility and linked in cascade order (base → header → page → footer → badge); each file keeps its own responsive block at the end. Rules were extracted from the `imageworks` theme's `style.css` preserving the original order.

External resources: Google Fonts (Poppins, Montserrat) and Font Awesome 6.7.2 from cdnjs.

## Conventions

- CSS lives in the stylesheets under `css/`, organised by component; no `style=""` attributes or `<style>` blocks in the HTML.
- JavaScript is modern (ES2015+): `const`/`let` only (no `var`), arrow functions, template literals; scripts are external files loaded with `defer`.

## Intentional differences from the live page

- All internal links point to `https://www.silkvision.net/...` so they work from this host.
- `<meta name="robots" content="noindex, nofollow">` so this copy is never indexed as a duplicate of the live page.
- Tracking embeds are left out (they would report staging traffic to production accounts): Google Tag Manager / Analytics, Meta Pixel, TikTok Pixel, Microsoft Clarity, Mailchimp and the Cloudflare beacon. The Cherry "Pay over time" floating estimator widget is included, with the same configuration as the live page.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static server.
