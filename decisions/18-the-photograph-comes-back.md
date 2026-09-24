# 18 · The photograph comes back, as a card

**Status** Settled
**Date** 2026-09-24
**Touches** `images/patients-walking.jpg`, `.card--photo` in
`css/components.css`, `--fill-scrim-card` in `css/tokens.css`, the dark-context
lists in `css/base.css`

## What we decided

The cataract card on the surgical-options section carries a photograph, with
one flat navy-blue scrim over it and the copy on top.

The photograph is the one the original Drupal page ran behind *Why Patients
Choose Office-Based Surgery* — `patient-benefits-bg-flipped.jpg`, deleted in
`d09d0b9` when the page was rebuilt, recovered from `e48d3ca`.

## Why

Asked for. The image was 1920×551 and half of it was a flat plum panel: the
original layout put the photograph on the left and set its text on the purple
on the right. Only the photograph is wanted here, so the panel is cropped off
— 950×551, and 410KB becomes 83KB.

The scrim is `rgb(1 53 89 / .78)`, the brand's deepest navy rather than the
hero's near-black, so that it reads as blue on a white band. Measured against
every one of the photograph's 523,450 pixels — it contains a pure white one,
so the measurement lands exactly on the theoretical floor:

| | |
| --- | --- |
| white text | 6.57:1 |
| 80%-white body copy | 4.89:1 |

Both clear AA. The card overrides `--text-soft` to 80% white for that second
number: the dark contract's default is `--on-dark-faint` at 62%, which over
this ground measures 3.6:1 and fails.

### The two things sitting on the scrim

The icon well and the ghost button were both blue on a blue ground. Measured
against the same photograph, the well at `rgb(0 88 148)` came out at **1.00:1
against the card behind it** — identical luminance, so at its worst point the
container was not faint, it was absent.

Both are glass now: a little white, a white hairline, and the backdrop
blurred. It gives each a body without introducing a second colour, which is
the point — the card already has one and it is the scrim's.

The blur is the finish, not the legibility. Both figures hold on the
translucent fill alone, so a browser that drops `backdrop-filter` loses the
frosting and nothing else:

| | | |
| --- | --- | --- |
| white icon on the well | 4.31:1 | graphics need 3.0 |
| white label on the button | 4.72:1 | text needs 4.5 |

This is the one place on the page where frosted glass is right, and it is
worth saying why, given 17 took it out of the hero. There it was decoration
on a flat ground and read as generated. Here it is the only way to float a
control over a photograph without painting a second colour on top.

## What we gave up

85KB on a page that had been carrying one photograph and is now carrying two,
and the second one is below the fold.

The card is `min-block-size: 24rem` whether or not the copy needs it. At its
natural height the photograph would have been a 90px band behind the heading,
which is a texture rather than a picture — but it does mean this card no
longer sizes to its content, and a longer paragraph will push it taller
rather than filling it.

## What breaks if this changes

`.card:hover` and the `.band--deep .card` rules set `background-color`, not
`background`. The shorthand resets `background-image`, so as `background` they
wiped the photograph on hover. Anything that sets a card's background from now
on names the longhand.

`.card--photo` is on the dark-context list in `base.css` alongside
`.band--deep` and `.hero`. That list is the contract for putting content on a
dark ground; a fourth thing joins it rather than restating the five
declarations.
