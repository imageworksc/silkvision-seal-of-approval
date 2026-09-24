# 19 · The comparison table turns ninety degrees on a phone

**Status** Settled
**Date** 2026-09-24
**Touches** the `.compare` markup in `index.html`, the phone block at the foot
of the table section in `css/components.css`

## What we decided

Below 50rem the comparison table stops being a table on screen. Each row
becomes a block: the feature name as its heading, then its two values one
above the other, each labelled with the column it came from.

Above 50rem nothing changes.

## Why

Asked for. The table is `min-inline-size: 46rem` and a phone is 24, so it sat
in a horizontal scroller — and a scroller is the one thing that breaks this
particular table. Its entire job is to let you read two columns against each
other, and the scroller shows you one at a time.

Stacking keeps the comparison and only turns it. 50rem is where 46rem plus
the page's gutters stops fitting: at 800px the shell's inner width is exactly
736px.

It also removed the last overflow on the page. The 13-width sweep had
reported `past-edge 436px table.compare` at 320 and down through 122px at 640
for as long as it has existed; all five now read `none`.

## The part that is easy to get wrong

`display: block` on a table strips every implicit role and takes the
`scope="row"` / `scope="col"` associations with them. A screen reader stops
seeing a table and reads twenty-two loose values.

So every element restates its role in the markup — `table`, `rowgroup`, `row`,
`columnheader`, `rowheader`, `cell` — and the header row is hidden the
`.sr-only` way, clipped to 1×1px, rather than with `display: none`, which
would drop the column names out of the tree altogether. Verified at 390px: the
header row is `position: absolute` at 1×1px and every role is present.

## What we gave up

The column name now appears twice for a screen reader on a phone: once
through the header association, and once as the `::before` that prints
`attr(data-col)` for sighted readers. Generated content cannot be marked
decorative. A duplicated label is a smaller cost than an unusable scroller,
but it is a cost.

The stacked table is about three times as tall. Eleven features become eleven
blocks, and the section is a long scroll on a phone.

## What breaks if this changes

If a row is added, its two cells need `data-col` or they will stack with no
label — the attribute is the only thing naming the column once the header row
is clipped.

If the roles are removed because "the table already has them", check it at
390px, not at 1440. They are only load-bearing under the media query.
