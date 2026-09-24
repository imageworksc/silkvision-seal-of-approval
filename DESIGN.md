# Design system — Silk Vision, office-based surgery

Extracted from the shipped stylesheets, not invented alongside them. Every
value here is already in `css/` and every rule here is already enforced. The
reasoning behind the non-obvious ones lives in `decisions/`; this file is the
contract, those are the arguments.

**The reader is usually past sixty and was told this week that they are a
candidate for eye surgery.** That single fact decides more here than any
aesthetic preference: the 16px type floor, the 44px touch floor, the measured
contrast, and the restraint on motion all come from it.

---

## 1 · Tokens

All in `css/tokens.css`. Nothing downstream carries a raw hex, a raw duration
or a magic pixel number.

### Colour

| Ramp | Stops |
| --- | --- |
| Blues | `--ink-900 #001325` · `--ink-800 #012a47` · `--ink-700 #013559` · `--ink-600 #00497b` · `--blue-500 #005894` · `--blue-400 #1e7fbe` · `--cyan-400 #35a7e0` · `--cyan-300 #6cc5f0` · `--pale-200 #ccdeea` · `--pale-100 #e7eef4` |
| Plum | `--plum-700 #5c005c` · `--plum-600 #6a006a` · `--plum-500 #800080` · `--plum-400 #a626a6` · `--plum-100 #f5e4f5` |
| Neutral | `--white` · `--paper #f5f8fb` · `--grey-100` · `--grey-300` · `--grey-500` · `--grey-700` · `--grey-900` |

`--blue-500` is the brand blue and `--plum-500` the action colour. **Plum means
"do this."** It is the buttons, the benefit wells and the OBS column of the
comparison table, and nothing else may spend it.

Semantic tokens re-point per context: `--text` `--text-soft` `--text-faint`
`--heading` `--hairline`. A dark ground re-points all five at once — see §4.

### Fills — flat, never ramped

`--fill-action` · `--fill-cool` · `--fill-deep` · `--fill-accent` ·
`--fill-scrim` · `--fill-scrim-card`

**Nothing on this page is a gradient** (decision 14). The two scrims are the
only translucent fills, and each one's alpha was set by measuring white and
80%-white against the brightest pixel of the photograph under it:

| | white | 80% white |
| --- | --- | --- |
| `--fill-scrim` `rgb(1 34 58 / .78)` — hero | 8.1:1 | 5.9:1 |
| `--fill-scrim-card` `rgb(1 53 89 / .78)` — cataract card | 6.6:1 | 4.9:1 |

### Type

Poppins, four weights, base64-embedded in `css/fonts.css` (~42KB, SIL OFL in
`fonts/POPPINS-OFL.txt`). One typeface, no second family.

| Token | Range | For |
| --- | --- | --- |
| `--t-xs` | 13 → 14px | labels only — never a sentence |
| `--t-sm` | **16** → 17px | card copy, table cells, nav |
| `--t-body` | 17 → 19px | running copy |
| `--t-lead` | 17 → 21px | section leads |
| `--t-h3` | 21 → 26px | |
| `--t-h2` | 30 → 50px | |
| `--t-h1` | 36 → 68px | |

**16px is the floor for anything that is a sentence.** The footer runs its own
smaller scale (14px body, 11px labels) because it is reference material, not
reading.

### Space, shape, motion

Space `--s-1` .25rem → `--s-11` 7rem. `--gutter` `--band-y` `--shell 78rem`
`--measure 62ch`.

Radius ladder `--r-sm 6px` · `--r-md 10px` · `--r-lg 14px` · `--r-pill 999px`.
**The pill is for circles only** — the tick badge, the seal, the nav
underline's caps. A rectangle never takes it.

Motion `--ease cubic-bezier(.22,.9,.3,1)` · `--ease-spring
cubic-bezier(.34,1.4,.5,1)` · `--t-fast .2s` · `--t-mid .38s` · `--t-slow .7s`.

`--tap: 44px` never scales. It is the size of a fingertip.

---

## 2 · Layout

`.wrap` caps at `--shell` and pads by `--gutter`. `.band` is a full-width
section; `.band--paper` and `.band--deep` are its two grounds.

`.split` is the two-column primitive, with three composable modifiers:
`--wide-end` (1fr 1.35fr), `--middle` (centres a short column against a tall
one), `--wide-gutter` (80px instead of 48). They are modifiers and not changes
to `.split` because both current pairings happen to want them and a future one
may not.

Breakpoints, and what each is for: **34rem** hero facts gain rules · **48rem**
the timeline becomes two columns · **50rem** the comparison table would stop
fitting · **60rem** `.split` becomes two columns · **76rem** the accreditation
paragraph's hand-set line breaks switch on.

---

## 3 · Primitives and their states

`css/components.css`. Every one has been driven and inspected in a real
browser, with `:hover` rewritten to a class where headless could not hover.

| Primitive | Default | Hover | Active | Focus |
| --- | --- | --- | --- | --- |
| `.btn` | `--r-md`, 56px min | `translateY(-3px)` + shadow | `translateY(-1px)` | global ring |
| `.btn--solid` | plum, `--glow-plum` | deepens the glow | ” | ” |
| `.btn--ghost` | hairline border | border + tint | ” | ” |
| `.card` | white, `--shadow-sm` | see §5 — **open question** | — | ” |
| `.card--photo` | photo + scrim + copy, 3 layers | lifts; photo pushes in 1.06 over 1.1s | — | ” |
| `.ico-well` | 61.6px, `--fill-cool` | scales with its card | — | — |
| `.feature` | icon, claim, hairline | see §5 — **open question** | — | ” |
| `.nav a` | — | underline scales 0→1 from centre | opacity .62 | ” |
| `.compare tr` | column tints | each column deepens its own tint | — | — |
| `.social a` | white brand mark, 44×44 | cyan + `translateY(-2px)` | `transform: none` | ” |
| `.seal` | floating, in on first scroll | lift + 1.05 + 4° | `transform: none` | ” |

Links that lift seat back down when pressed; links that only recolour dip to
`opacity: .62`. **Hover does not exist on a touch screen** — without `:active`
a tap answers with nothing at all until the page changes.

### Icons

30 symbols in an inline sheet. 24×24, 1.8 stroke, `currentColor`.

The set has a signature: two concentric circles at the centre of the box,
r 3.4 and r 1 — the rings a corneal topographer projects onto an eye. Seven
icons carry it. That repetition is what makes the set read as drawn for this
page (decision 16).

Five exceptions: the social brand marks are **filled, not stroked**. A logo is
reproduced as its owner issues it.

---

## 4 · Dark-ground contract

One selector list in `css/base.css` re-points five tokens at once:

```
.band--deep, .hero, .card--photo
```

Anything that puts content on a dark ground joins that list rather than
restating the declarations. The ghost button and the focus-ring colour have
their own parallel lists.

**A well on a dark band cannot be blue, and plum does not rescue it.** Measured
against `--ink-700`: blue 1.71:1, plum-500 **1.35:1** — darker than the blue,
so it hides further — plum-400 2.08:1, white **12.69:1**. A container needs
3:1. White, with the icon in the band's own navy.

---

## 5 · Motion

**The rule: motion serves meaning.** Every animation maps to a real
interaction, state change or affordance. A hover that changes nothing, motion
on a non-interactive element, or decoration with no informational purpose is a
defect, not a flourish.

**GPU-composited only** — `transform`, `opacity`, `filter`. No layout property
is animated anywhere. Colour transitions are paint, cheap, and used only where
the colour change *is* the state.

The page's one authored idea is the hero headline resolving from blur —
"coming into focus" is what the procedure does (decision 13). Everything else
earns its motion by signalling interaction.

### Reduced motion

`css/motion.css`, loaded last so it can switch everything off in one place.
Durations blanket to `.01ms`; loops get `animation: none`; reveals are forced
visible so nothing can end on a frame that hides content.

**The blanket rule only zeroes the transform on the hovered element itself.**
Every hover that moves something *else* must be named, or it escapes. Audited
by listing all 18 `transform`s under a `:hover` against the block: 17 covered,
1 deliberate exclusion (the nav underline is a reveal, not travel — zeroing it
would leave it permanently drawn).

### Open question — two hovers that move non-interactive elements

`.card` is an `<article>` and `.feature` is a `<div>`/`<li>`. Neither is a
link, yet both lift, slide and scale on hover. By the rule above that is a
defect, and decision 13 originally said so in the project's own words: *"a card
that rises under the cursor promises a click that is not there."*

The motion was added later at the client's explicit request. **It is left in
place pending their decision** — this is a taste call they have already made
once, not a bug to fix unilaterally.

---

## 6 · Accessibility floors

- **16px** for anything that is a sentence.
- **44px** for every touch target. Inline links inside running prose are
  exempt (WCAG 2.5.8) and the audit harness knows the difference.
- **4.5:1** for text, **3:1** for graphics — measured against real pixels, not
  estimated. The hero and card scrims were both set by that measurement.
- A scroller reachable by keyboard needs `tabindex` and a `role`.
- `.sr-only` clips to 1×1px rather than `display: none`, which would drop the
  content out of the accessibility tree.
- `position: relative` on any scroller containing `.sr-only` — without a
  positioned ancestor those absolute spans lay out against the viewport and
  silently widen the page (decision 11).

---

## 7 · Verification

A page is not done because it renders. The harness in the scratchpad serves
the working tree and sweeps **13 widths** — 320 · 360 · 390 · 430 · 640 · 768 ·
960 · 1180 · 1440 · 1920 · 2560 · 3840 · 5120 — reporting past-edge overflow,
minimum body-copy size, measure in `ch`, and sub-44px targets.

Two traps it exists to catch, both documented in `README.md`:

- Headless Edge will not open a window narrower than ~492 CSS px.
- `body { overflow-x: clip }` hides overflow from `scrollWidth`, so overflow is
  measured from element rects against the viewport, never from `scrollWidth`.

Headless Edge does not run `requestAnimationFrame` or `IntersectionObserver`
for iframe content, and cannot hover. Scroll-driven behaviour is verified by
forcing `prefers-reduced-motion` (which is the safety path that must work
anyway); hover is verified by rewriting `:hover` to a class in a copy of the
shipped stylesheet and rendering the pinned state.

Assets are cache-busted with `?v=N` on every CSS and JS link, bumped on every
deploy that touches either. GitHub Pages serves `max-age=600`.
