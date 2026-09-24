# 15 · One closing band, not two

**Status** Settled
**Date** 2026-09-24
**Touches** the closing section in `index.html`, `.reach` in `css/sections.css`
(replacing `.strip`), the reduced-motion list in `css/motion.css`

## What we decided

The contact strip is no longer a section. It is the foot of the closing call,
under a hairline, on the same dark band.

Two of its five links went nowhere new: *Call* and *Request an appointment* are
the two buttons directly above it. Those two are dropped from the row rather
than repeated, so the three that survive — Fax, Ask a question, Financing — are
exactly the ways to get in touch that the buttons do not already offer.

## Why

Asked for directly: *estas dos secciones debemos unificarlas*.

It was a white band roughly one hundred pixels tall, wedged between the dark
closing call and the darker footer, holding five links of which three were
already on screen. It read as a divider that somebody had put content into.

Folding it in also fixes a counting problem the split was hiding. Across the
two sections the page offered ten ways to act — three cards, two buttons, five
links — for what are really three intents: book, call, finance. It now offers
each action once: the cards describe the three intents, the buttons carry the
two primary actions, and the row carries the remaining three.

## What we gave up

The white strip was the only light band between the closing call and the bottom
of the page, and without it the last two screens are one continuous dark field:
navy band, then near-black footer. The hairline and the step down in weight are
the only things now separating the secondary links from the primary buttons,
where before a whole change of background did that work.

## What breaks if this changes

The rule is one action, one place. If a link goes back into the row, check it is
not already a button eight pixels above it — that is the state this replaced.

`.reach` takes its colours from the dark-band context, not from its own tokens.
Moving it out of `.band--deep` leaves white links on white.
