# 9 · One radius, and it is 6px

**Status** Settled
**Date** 2026-09-23
**Touches** `css/brand.css` (`--radius`), every button, card, field and panel

## What we decided

`--radius: 6px`, held across buttons, cards, inputs and panels. The icon wells
keep `--radius-round`, which is a different thing and stays.

## Why

The live stylesheet ships two radii on controls: `5px` on `a.cta-btn`, which is
the site's main button, and `6px` on `#mobile-call-now a`, the call button that
appears on every phone screen. Elsewhere it uses `15px` (5 uses), `20px`, `10px`
and `2px` on boxes that are not controls.

The system allows exactly one. 6px was taken over 5px because it is the value on
the control that gets tapped most, and because at 5 versus 6 nobody can see the
difference — so the tie goes to the more-used number rather than to the more
prominent class name.

The larger values (15px, 20px) were not candidates: they belong to promotional
boxes on other pages, and applying them to a 54px button turns it into a pill.

## What we gave up

Byte-for-byte fidelity with `a.cta-btn`. A reviewer holding a screenshot of the
old header next to the new one will find the Contact button 1px rounder.

## What breaks if this changes

Nothing structural — but change it in `--radius` alone. The moment a second
radius appears anywhere in `brand.css` or `page.css`, the page has no radius,
and the next person has no way of telling which one is the real one.
