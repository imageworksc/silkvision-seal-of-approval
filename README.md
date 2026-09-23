# Silk Vision — Office-Based Surgery

The page at
[silkvision.net/you-are-candidate-office-based-surgery](https://www.silkvision.net/you-are-candidate-office-based-surgery),
rebuilt from scratch.

**Staging:** <https://imageworksc.github.io/silkvision-seal-of-approval/>

## Structure

```
css/fonts.css        Poppins, four weights, embedded as base64
css/tokens.css       every colour, size, shadow, radius and duration, named once
css/base.css         reset, typography, layout primitives, accessibility
css/components.css   buttons, icons, cards, nav, table, seal, progress bar
css/sections.css     hero, steps, closing call, offices, footer
css/motion.css       keyframes, scroll reveals, the reduced-motion contract
```

Linked in that order. `motion.css` is last on purpose: it can switch off
everything above it in one place.

```
js/main.js           menu, scroll state, reveals, counters, pointer glow, seal
js/cherry-widget.js  loader and configuration for the "Pay over time" estimator
```

No CSS in the HTML — no `style=""`, no `<style>` block. JavaScript is ES2015+:
`const`/`let` only, arrow functions, external files loaded with `defer`.

## The design

The reader is usually past sixty, was told this week that they are a candidate
for eye surgery, and does not see well. So the page is rich in colour, depth,
icons and motion — but never at the cost of size or contrast. Body copy has a
16px floor, the display line runs to 80px, and every tappable thing clears 44px.

**Motion.** A load sequence in the hero (the headline resolves out of blur —
which is what the procedure does), scroll reveals that stagger across a row,
counters that count, a reading-progress hairline, a sticky header that gains a
shadow, and hover states on everything that can be clicked: cards lift while a
pool of light follows the pointer, buttons sweep a sheen and slide their arrow, nav underlines
grow from the centre, table rows highlight, the seal floats. All of it is off
under `prefers-reduced-motion`, handled in one block at the foot of
`motion.css`.

**Icons.** Twenty-four original line drawings in one inline symbol sheet —
24×24, 1.8 stroke, `currentColor`, so each takes the colour it sits in. No icon
library and no third-party request. The social links are words rather than
brand marks.

**Colour.** Silk Vision's own blues and purple, extended into a full ramp so
there is somewhere to put depth: `#001325` through `#005894`, a cyan for light
and glow, and the purple reserved for actions.

## Measured

320 · 360 · 390 · 430 · 640 · 768 · 960 · 1180 · 1440 · 1920 · 2560 · 3840 · 5120

At every width: nothing past the right edge, body copy never under 16px, no
line of prose past 62 characters, every target clearing 44px. The only element
below 16px is the hero's uppercase badge, which is a tracked label rather than
a sentence.

Two traps worth knowing if you re-test this:

- **Measure in an iframe, or in real device pixels.** Headless Edge will not
  open a window narrower than ~492 CSS px, so a `--window-size=390` screenshot
  is a 492px page cropped to 390 and looks broken when it is not.
- **`body { overflow-x: clip }` hides overflow from `scrollWidth`.** A page can
  be clipping content badly and still report none. Check element rects against
  the viewport instead.

## Before this goes live

- [ ] **`og:image`** — deliberately absent, no confirmed 1200×630 asset exists.
      A share of this page falls back to a text card.
- [ ] **Social links are text, not logos.** Confirm that is acceptable before
      shipping icons; it avoids redrawing five trademarked marks.
- [ ] **Navigation is top-level only.** Five destinations rather than the live
      site's twenty-five across three hover panels. The mega-menu is a
      site-wide component and belongs in a shared header, not copied here.
- [ ] **The Cherry estimator is live.** It loads from `files.withcherry.com`
      against the client's real account, so a financing enquiry from this
      staging copy reaches production. Its own UI renders at 12px, below the
      floor used everywhere else, and is outside our control.
- [ ] **Remove `noindex`** if this ever becomes the real page rather than a
      staging copy of it, and move the canonical.

## Not carried over

Google Tag Manager, Google Analytics, the Meta and TikTok pixels, Microsoft
Clarity, Mailchimp and the Cloudflare beacon — a staging copy must not report
traffic to production accounts. Font Awesome is gone too, replaced by the
inline symbol sheet.

`decisions/` holds the records written while the page was on the structural
design system. The system itself has been set aside; the records are kept
because 9 (one radius), 10 (one typeface) and 11 (the `.sr-only` containing
block) still describe this build, and 11 in particular documents a bug that is
easy to reintroduce.
