# 16 · Icons drawn for this page

**Status** Settled
**Date** 2026-09-24
**Touches** the icon sheet in `index.html`, `.ico` / `.ico-well` in `css/components.css`

## What we decided

Twenty-six symbols, all drawn here, on one grid: 24×24, 1.8 stroke, round caps
and joins, every stroke in `currentColor`.

The set has a signature. Two concentric circles at the centre of the box, r 3.4
and r 1 — the rings a corneal topographer projects onto an eye to read its
shape. They are the iris in the eye, the pupil the drop falls into, the hub of
the dial. Seven symbols carry them.

Nine symbols were replaced because the shape they used said the same thing as
every other site on the web says with it:

| was | is | where |
| --- | -- | ----- |
| struck droplet | IV bag, line, tape, struck through | No IV required |
| sparkle | a drop going into an eye | Preparation |
| lightning bolt | a door, and the way out of it | Faster recovery |
| dot-eyed smiley | a face with its eyes closed | Less stress |
| map pin | a building with its windows and door | One location |
| dining chair | a lounger, back leaning, footrest up | Recovery |
| bar chart | a climbing line with an arrowhead | Continuous improvement |
| bar chart | a payment card | Financing |
| document | a speech bubble with a question mark | Ask a question |

## Why

Asked for directly: *los iconos … se ven muy genéricos*.

Genericness is not solved one icon at a time. A set reads as drawn for a page
when its members share a mark, so the rings matter more than any single glyph —
and the rings are the motif we had already taken from the instrument room and
then lost when the hero's Placido disc went with the gradients (see 14).

Two rules fell out of drawing them:

- **Interface symbols stay plain.** The arrow, the hamburger, the tick and the
  chevron are not characterful. An arrow that is being expressive is an arrow
  somebody has to stop and read.
- **22px is the floor.** The intraocular lens — the optic with a haptic
  sweeping off each side — is the most specific drawing in the set and the only
  one that fails it. At the 22px of a small well it collapses into a squiggle,
  so it appears once, at 28px, on the cataract card, beside copy that names the
  implant. The eye takes the small wells instead.

## What we gave up

Nothing is reusable. These are twenty-six drawings tuned to one page's
vocabulary, and a second page would want its own, or would have to accept
icons that mean something slightly beside the point.

The set is also inlined in the document rather than fetched, so it costs about
4KB on every page load and cannot be cached separately.

## What breaks if this changes

If an icon is added, it takes the rings unless there is a reason it cannot —
that is the whole of what holds the set together.

Check any new drawing at 22px before shipping it, not at the size you drew it.
Three of these read fine at 56px and had to be redrawn: the lens curled into a
snail, the recliner into a blob, and the car had no wheels.
