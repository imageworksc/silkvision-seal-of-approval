# Silk Vision — Office-Based Surgery

The page at
[silkvision.net/you-are-candidate-office-based-surgery](https://www.silkvision.net/you-are-candidate-office-based-surgery),
rebuilt on the [structural design
system](https://github.com/imageworksc/general-design-system).

**Staging:** <https://imageworksc.github.io/silkvision-seal-of-approval/>

## The two-and-a-half stylesheets

```
css/system.css   space, type sizes, measure, grid, layout, component geometry
                 — dropped in unchanged, no blanks, no edits
css/brand.css    colour, typeface, the one radius — and nothing else
css/page.css     this page's own sizes, behind the `sv-` prefix
```

Loaded in that order. Geometry, then paint, then this page. The split is the
whole discipline: if the brand layer ever wants to move a size, the geometry is
wrong and belongs fixed in `system.css` for every client, not bent here.

| Changing | File |
| --- | --- |
| a colour, the typeface, the radius | `css/brand.css` |
| a size, a gap, a width, a breakpoint | `css/system.css` — and it changes for every client |
| this page's own sizes | `css/page.css`, every one a token at the head of the block |

## What else is here

| Path | What it is |
| --- | --- |
| `index.html` | The page. No inline styles, no inline scripts. |
| `js/reveal.js` | Scroll entrances. Ships with the system, unchanged. |
| `js/main.js` | The menu toggle and the floating seal. |
| `js/cherry-widget.js` | Loader and configuration for the Cherry "Pay over time" estimator. |
| `fonts/POPPINS-OFL.txt` | The SIL OFL licence. It travels with the font, including embedded — see [decision 10](decisions/10-one-typeface-not-two.md). |
| `decisions/` | Eight records from the system, four from this page. |
| `images/` | Logos, the hero photograph, the seal. |
| `floating-seal-badge.md` | Component spec for the seal. |
| `hero-office-based-surgery.jpg` | Full-size copy of the hero photograph. |

## Where the brand values came from

`silkvision.net/themes/imageworks/css/style.css` — the live stylesheet, not a
brand PDF. Where the site's own `:root` disagreed with what the page actually
ships, the shipped value won.

Two colours were changed rather than copied, both because they failed a
measurement:

- `#718286`, the live metadata grey, measures **4.01:1** on white and misses AA.
  Darkened to `#5f7276` — 5.05:1.
- The purple action colour over the deep blue band measures **1.00:1** — the
  two have the same relative luminance. A purple button there is a shape with no
  edge and the kicker vanishes outright. On dark bands the action goes white and
  the kicker takes `--brand-pale`.

Everything else clears AA, most of it AAA.

## Measured range

320 · 360 · 390 · 430 · 640 · 768 · 960 · 1180 · 1440 · 1920 · 2560 · 3840 · 5120

At every one: no horizontal overflow, body copy never under 16px, no line of
prose past 66 characters, every tappable target clearing 44px. The root steps
16 → 18 → 20 → 23px at 1800/2400/3200 as the system intends.

Two notes for whoever tests this next:

- **Measure in an iframe, or in real device pixels.** Headless Edge will not
  open a window narrower than ~492 CSS px, so a `--window-size=390` screenshot
  is a 492px page cropped to 390 and looks broken when it is not.
- **`body { overflow-x: clip }` hides overflow from `scrollWidth`.** A page can
  be clipping content badly and still report no overflow. Check element rects
  against the viewport, not just `scrollWidth`.

## Before this goes live

- [ ] **`og:image`.** Deliberately absent — there is no confirmed 1200×630
      asset. A share of this page currently falls back to a text card.
- [ ] **[Decision 10](decisions/10-one-typeface-not-two.md) — Montserrat
      dropped.** The live site sets its footer chrome in Montserrat; this page
      uses Poppins throughout. A brand call that has not been put to the client.
- [ ] **[Decision 12](decisions/12-top-level-navigation-only.md) — the
      mega-menu.** The header carries five top-level links, not the twenty-five
      across three hover panels.
- [ ] **Social links are text, not logos.** Facebook, X, YouTube, Instagram and
      TikTok appear as words. Confirm that is acceptable before shipping icons —
      it avoids redrawing five trademarked marks.
- [ ] **The Cherry estimator is live.** It loads from `files.withcherry.com`
      against the client's real account, so a financing enquiry from this
      staging copy reaches production. Its own UI renders at 12px, below the
      system's floor, and is outside our control.
- [ ] **Remove `noindex`** if this ever becomes the real page rather than a
      staging copy of it, and move the canonical.

## Not carried over

Google Tag Manager, Google Analytics, the Meta and TikTok pixels, Microsoft
Clarity, Mailchimp and the Cloudflare beacon. A staging copy must not report
traffic to production accounts. Font Awesome is gone too — the five icons the
page uses are an inline symbol sheet, which removes a render-blocking
third-party script.

## Conventions

- All CSS in the stylesheets above. No `style=""`, no `<style>` block.
- JavaScript is ES2015+: `const`/`let`, never `var`; arrow functions; external
  files loaded with `defer`.
- No leading zeros in CSS, no unit on zero, logical properties, tokens over bare
  values, `rem` for anything that scales and `px` for anything that must not.
