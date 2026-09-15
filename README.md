# Silk Vision — Office-Based Surgery (static recreation)

Static, dependency-free recreation of
<https://www.silkvision.net/you-are-candidate-office-based-surgery>
for staging on GitHub Pages.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Same markup, IDs and classes as the live Drupal page (node/243). |
| `css/style.css` | The rules from the `imageworks` theme that apply to this page, in original cascade order, plus the Drupal core utilities the markup uses (`clearfix`, `visually-hidden`, `text-align-center`). |
| `js/main.js` | The theme behaviours ported from jQuery to vanilla JS: hamburger menu, mobile sub-menus, fixed ("anchored") header on desktop scroll. |
| `images/` | Logos, hero / section backgrounds, list bullets, table checkmark. |
| `floating-seal-badge.md`, `joint-commission-accreditation.png` | Seal-badge component spec and artwork for the next iteration. |

External resources: Google Fonts (Poppins, Montserrat) and Font Awesome 6.7.2 from cdnjs.

## Intentional differences from the live page

- All internal links point to `https://www.silkvision.net/...` so they work from this host.
- `<meta name="robots" content="noindex, nofollow">` so this copy is never indexed as a duplicate of the live page.
- Tracking embeds are left out (they would report staging traffic to production accounts): Google Tag Manager / Analytics, Meta Pixel, TikTok Pixel, Microsoft Clarity, Mailchimp and the Cloudflare beacon. The Cherry "Pay over time" floating estimator widget is included, with the same configuration as the live page.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static server.
