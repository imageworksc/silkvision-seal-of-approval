# 13 · One motion idea: the headline resolves

**Status** Settled
**Date** 2026-09-23
**Touches** `css/page.css` §2 (`sv-resolve`, `sv-rise`), the hero markup

## What we decided

The hero headline animates from `blur(1rem)` to sharp over 900ms on load, and
the four elements under it rise in behind it at 300/450/600/750ms. That is the
page's only authored motion. Everything else moves because the design system
already moves it: `reveal.js` fading sections in, and `.btn:hover`.

The benefit cards deliberately do **not** lift on hover. They are not links,
and a card that rises under the cursor promises a click that is not there.

## Why

The reader is usually over sixty, was told this week that they are a candidate
for eye surgery, and does not see well. A page for them that is busy, or that
moves for the sake of moving, is worse than a still one.

So the motion budget goes to a single idea that means something: the headline
comes into focus, which is what the procedure does. It is the one moment on the
page that is about the subject rather than about the page.

Three constraints make it safe rather than clever:

- **Blur only, no travel.** Moving a headline while someone is trying to read
  it is the opposite of the point.
- **It resolves toward clarity, and ends there.** The keyframes run *from* the
  blurred state, so the finished state is the element's normal one. If CSS
  animation never runs, the text is simply sharp — it cannot be left soft.
- **Reduced motion.** `system.css` blankets animation durations, and `page.css`
  sets `animation: none` on these five elements explicitly, so it does not
  depend on the blanket alone.

## What we gave up

The page is quieter than a marketing site of this kind usually is. There is no
parallax, no counters, no scroll-jacking, nothing ambient. On a portfolio that
reads as restraint; to a client comparing it with a competitor's site it may
read as less.

## What breaks if this changes

Adding a second motion idea costs the first one its meaning — the resolve only
registers as the procedure because nothing else on the page is doing anything.

If it goes, do not replace it with a fade-up on the headline. An `h1` that
starts at `opacity: 0` is the one element on the page that must never depend on
a script or a stylesheet to become visible.
