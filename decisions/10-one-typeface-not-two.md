# 10 · Poppins only, and embedded

**Status** Open — the client has not been asked
**Date** 2026-09-23
**Touches** `css/brand.css` (`@font-face`, `--font`), `fonts/POPPINS-OFL.txt`

## What we decided

The page ships Poppins in four weights (400, 600, 700, 800), latin subset,
embedded as base64 in `brand.css`. Montserrat, which the live site also loads,
is not carried over. Every element that used it — the utility bar, the office
block, the footer — is set in Poppins.

## Why

Two measurements.

**Embedding.** A Google Fonts `<link>` costs a DNS lookup, a TLS handshake, a
CSS fetch and only then the font file. That is four serial round trips in front
of the one screen that has to land. Embedded, the font arrives inside a
stylesheet the browser is already blocking on. Four Poppins weights, latin only,
are 31KB raw and 42KB as base64.

**Dropping Montserrat.** Google serves it as a variable font: one file, latin
subset, **38KB** — more than all four Poppins weights put together. On this
page it would have set a utility bar that is hidden below 640px, four office
addresses and three lines of footer legal text. Poppins and Montserrat are both
geometric sans faces of similar proportion; at 14–17px in a footer the
difference is not something a visitor can name.

52KB of base64 for chrome that nobody reads in a typeface nobody can identify is
the wrong trade.

## What we gave up

A literal match with the live site's footer. If the brand treats the Poppins /
Montserrat pairing as part of its identity rather than an artefact of the old
Drupal theme, this is wrong and should be reverted.

## What breaks if this changes

Nothing. Putting Montserrat back is one `@font-face` block, one token, and the
handful of chrome rules in `page.css` pointing at it — budget 38KB raw, 52KB
embedded, and expect the stylesheet to roughly double. Subset it to the footer's
actual characters first if the weight matters.

This record is **Open** on purpose: it is a brand call, not a technical one, and
the client has not been asked.
