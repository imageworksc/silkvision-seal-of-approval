# 11 · A scroller holding `.visually-hidden` needs `position: relative`

**Status** Settled
**Date** 2026-09-23
**Touches** `css/page.css` (`.sv-compare-scroll`), any future scrolling region

## What we decided

`.sv-compare-scroll` carries `position: relative`. It is not there for layout —
nothing inside it is absolutely positioned on purpose — and it must not be
removed as dead code.

## Why

Each cell of the comparison table carries a `.visually-hidden` "Yes" or "No", so
a screen reader gets the answer rather than silence where a tick is.

`.visually-hidden` is `position: absolute`. With no positioned ancestor, its
containing block is the initial containing block — the viewport — so the
browser lays it out at its static x, which inside a 640px table is up to 640px,
and does **not** clip it to the scroller. On a 360px phone the document then
measured `scrollWidth` 536 against a 360px viewport.

It cost an hour to find, for three reasons worth writing down:

- Nothing was visible. The overflow was a 1px box of clipped text.
- `body { overflow-x: clip }` in `system.css` stops the page scrolling
  sideways, so the usual symptom — a page that slides — never appeared.
- Every element the first probe flagged sat inside a scroll container and was
  dismissed as legitimately scrolled content. The actual culprits were 1px wide
  and never reached the top of a list sorted by width.

Making the scroller the containing block puts the hidden text back inside it,
where the scroller's own clipping applies.

## What we gave up

Nothing. `position: relative` on a scroll container has no other effect here.

## What breaks if this changes

A phone-only horizontal overflow with no visible cause, on a page that looks
correct at every width a desktop reviewer will check. The same trap is waiting
in any future `overflow: auto` region containing `.visually-hidden` text, so
check for one before adding a scroller.
