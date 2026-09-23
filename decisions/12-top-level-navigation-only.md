# 12 · The header carries top-level navigation only

**Status** Open — needs the client's agreement
**Date** 2026-09-23
**Touches** `index.html` (the `.sv-nav` block), `css/page.css` §1

## What we decided

The header carries five destinations — Vision Correction, Eye Care, About,
Patients and a Contact button — plus the phone number in the utility bar. The
live site's mega-menu, twenty-five links across three hover panels, is not
rebuilt. Every one of those destinations is one click further on, from its own
section landing page.

## Why

The mega-menu is a site-wide component, not part of this page. Rebuilding it
here would mean this page owning a copy that drifts from the real one the first
time the client adds a service.

It is also a large interactive surface in front of a page whose job is a single
decision — book, or call. The five top-level links keep the site reachable
without putting three hover panels between the visitor and the hero.

## What we gave up

Direct access to the twenty sub-pages from this page. A visitor who lands here
and wants, say, the LASIK self-test reaches it in two clicks instead of one.

## What breaks if this changes

Nothing on the page. If the mega-menu is wanted, it belongs in a shared header
partial that this page includes, not copied into `index.html` — and it needs
the `--nav-h` token set to the header's height so an anchor never lands beneath
it. `--nav-h` is `0px` today because the header does not stick.

This record is **Open**: dropping a client's navigation is their call, and they
have not been asked.
