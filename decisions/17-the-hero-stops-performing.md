# 17 · The hero stops performing

**Status** Settled
**Date** 2026-09-24
**Touches** the hero in `index.html`, `.hero-facts` in `css/sections.css`,
`.btn` and the deleted `.stat` / `.ico-well--ghost` in `css/components.css`,
`setupCounters` removed from `js/main.js`

## What we decided

The three facts under the hero's buttons — *Your visit 90 minutes*,
*Anesthetic Oral, no IV*, *Beforehand No fasting* — are small text. A faint
label at `--t-xs`, a white value at `--t-sm`, a hairline between them once
there is room for the three to sit on a line. Nothing else.

They used to be three frosted cards: translucent white fill, `backdrop-filter:
blur(10px)`, an icon in a rounded well, a number that counted up from zero on
scroll, and a lift-and-rotate on hover.

Buttons across the page lose the pill radius and take `--r-md`.

## Why

Asked for, in these words: *el hero aún se ve muy AI*.

That is a real observation and worth naming precisely, because it is not about
quality. Frosted translucent cards, a tracked uppercase micro-label, a number
that animates up, a lift on hover, and fully rounded buttons are the house
style of generated landing pages. A reader who has seen forty of those pages
this year recognises the combination before they read a word of it — and this
page's job is to be believed by somebody who has just been told they need eye
surgery.

The counting number was the worst of them. The figure is *90 minutes of your
day*, which is the reassurance; animating it turned a fact into a flourish.

None of the five things carried information. Removing them costs the hero
nothing it was actually saying.

## What we gave up

The hero is plainer, and the three facts no longer announce themselves — a
visitor skimming may not stop on them at all, where a card is hard to miss.
That is the trade: they are supporting detail, and they now look like it.

`i-clock` went with the pills and was deleted; it had no other use.

## What breaks if this changes

If the facts go back into containers, they stop being facts and become a
feature grid, and the hero will have two calls to action competing with the
buttons directly above them.

The counter's script is gone, not disabled. `data-count` does nothing now.
