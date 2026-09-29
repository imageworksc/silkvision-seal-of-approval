# 14 · Flat fills, no gradients

**Status** Settled
**Date** 2026-09-24
**Touches** `css/tokens.css` (the `--fill-*` block), `.hero` and `.closing` in
`css/sections.css`, `.btn`/`.ico-well`/`.tick`/`.compare`/`.progress` in
`css/components.css`, `@keyframes sheen|drift|breathe` in `css/motion.css`

## What we decided

Nothing on the page ramps. Every surface that used a gradient now takes a flat
token from one `--fill-*` block, and the four decorative gradient layers — the
button sheen, the hero aurora, the hero's Placido disc, the closing call's
aurora — are gone rather than flattened.

The small tracked uppercase label above each heading — the eyebrow — goes with
them. Seven of them, plus the `.eyebrow` component itself.

Each fill was set to roughly where its ramp sat at the midpoint, so no surface
changed hue. The one exception is the hero scrim, below.

## Why

Asked for directly: *borra todos los eyebrows y todos los gradients que haya en
la página*.

Flattening them had a consequence worth recording. The hero's scrim used to be
a four-stop ramp that ran `.97` alpha under the headline and opened to `.46` on
the right, so the photograph showed through where no text sat. One flat value
has to hold for the whole frame, and the alpha is therefore set by the worst
case — white type over the photograph's brightest pixel — not by how it looks
over the dark half.

Measured against `rgb(1 34 58)` composited over white, the floor case:

| scrim alpha | white text | `--on-dark-soft` (80% white) | the photograph |
| ----------- | ---------- | ---------------------------- | -------------- |
| `.88`       | 11.4:1     | 8.0:1                        | all but gone   |
| `.78`       | 8.1:1      | 5.9:1                        | reads clearly  |

`.78` is the setting. It clears AA on both with room to spare, and it is the
lightest value that still does, so the operating room behind it survives.

## What we gave up

The hero lost the depth the ramp gave it — light on one side, dark on the
other — and the closing call lost the two pools of brand colour that separated
it from the dark band above. Both are now single even fields, which is more
honest and flatter in both senses.

The Placido disc went with them. It was the one motif on the page taken from
the instrument room rather than from a mood board, and it cannot be redrawn
without a gradient: concentric rings *are* a `repeating-radial-gradient`.

## What breaks if this changes

If a gradient comes back, it comes back through the `--fill-*` block, not
inline at the point of use. The reason the removal took five files and not
fifty is that every ramp was already named in one place.

Do not raise the hero scrim past `.78` to make the headline "pop". It is
already at 8:1; what changes is only how much of the photograph is left. And do
not lower it below `.7` without re-measuring against the brightest pixel in
whatever image is in `images/obs-bg2.jpg` at the time — the numbers above are
tied to that photograph, not to the token.
