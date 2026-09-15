# Floating Seal Badge — Reusable Component Spec

A small circular seal/coin image that sits **fixed in the bottom-right corner** of the page. It:

- Stays **hidden while the visitor is in the hero** (no point showing it there — the hero already carries the brand moment).
- **Fades + slides up into view** once the visitor scrolls past the hero.
- **Hides again over the footer** so it never overlaps footer links or legal text.
- **Lifts slightly on hover.**
- **Respects `prefers-reduced-motion`** (no transition for users who ask for reduced motion).
- Is a **link** (jumps to top by default, or point it anywhere).

Drop this into any page. The only thing you swap per client is the **seal image**.

---

## 1. The image

Use a **transparent PNG** (or SVG) of the client's seal/coin/award. It renders inside a circle, so a round mark works best; a square mark will be clipped to a circle by `border-radius:50%` (remove that if the mark isn't round).

**Prep before embedding** (keeps the file light):
- Resize to ~**240×240px** (2× the display size for retina sharpness).
- Compress. A detailed coin lands around **90–140KB** at that size.
- Either embed it as a base64 data URI, or host it (Cloudinary/S3/etc.) and reference the URL. For a self-contained comp, base64 is fine; for production, a hosted URL is cleaner.

> If the seal is **not** round, delete the two `border-radius:50%` declarations so it isn't clipped.

---

## 2. HTML

Place this **once**, just before the closing `</footer>` or anywhere near the end of `<body>` (position is `fixed`, so DOM location doesn't matter visually):

```html
<a class="yr-badge" id="yrBadge" href="#top"
   aria-label="[CLIENT] anniversary seal">
  <img src="[SEAL_IMAGE_URL_OR_DATA_URI]" alt="">
</a>
```

- Swap `[SEAL_IMAGE_URL_OR_DATA_URI]` for the client's seal.
- Update `aria-label` to describe the seal (e.g. `"Acme 50th Anniversary, 1975–2025"`).
- `href` can point wherever you like; `#top` scrolls to the top of the page.
- The `<img alt="">` is intentionally empty because the `aria-label` on the link already describes it (avoids double announcement for screen readers).

---

## 3. CSS

```css
/* ---------- FLOATING SEAL BADGE ---------- */
.yr-badge{
  position:fixed;
  right:24px;
  bottom:24px;
  z-index:70;
  width:118px;              /* seal size on desktop */
  height:118px;
  display:block;
  border-radius:50%;        /* remove these two if the seal isn't round */
  opacity:0;                /* hidden until .show is added */
  transform:translateY(14px) scale(.92);
  pointer-events:none;      /* not clickable while hidden */
  transition:opacity .4s ease, transform .4s ease;
  filter:drop-shadow(0 8px 20px rgba(0,0,0,.35));
}
.yr-badge img{
  width:100%;
  height:100%;
  display:block;
  border-radius:50%;        /* remove if the seal isn't round */
}
.yr-badge.show{             /* JS adds .show when it should appear */
  opacity:1;
  transform:none;
  pointer-events:auto;
}
.yr-badge:hover{
  transform:translateY(-2px) scale(1.03);
}

@media(max-width:700px){
  .yr-badge{ width:92px; height:92px; right:14px; bottom:14px; }
}
@media(prefers-reduced-motion:reduce){
  .yr-badge{ transition:none; }
}
```

**Tuning knobs:**
- **Size:** the `width`/`height` pairs (desktop and the mobile media query). Keep them equal.
- **Corner spacing:** `right` / `bottom`.
- **Shadow:** the `filter:drop-shadow(...)` — soften or strengthen as needed.
- **Faintness:** add `opacity` to `.yr-badge img` (e.g. `opacity:.75`) if the client wants it as a subtle watermark rather than a solid coin. (Note: don't put this on `.yr-badge` itself — that element's opacity is animated by the show/hide.)
- **Entrance distance:** the `translateY(14px)` in the base rule controls how far it slides up.

---

## 4. JavaScript

Add this once, near the end of `<body>` (after the element exists). It's vanilla JS, no dependencies:

```html
<script>
  (function(){
    var badge = document.getElementById('yrBadge');
    if(!badge) return;
    var foot = document.querySelector('footer');
    var footVisible = false;

    // Hide the badge whenever the footer is on screen
    if(foot && 'IntersectionObserver' in window){
      new IntersectionObserver(function(entries){
        footVisible = entries[0].isIntersecting;
        sync();
      }, { threshold:0 }).observe(foot);
    }

    // Show once scrolled past ~the hero, hide over the footer
    function sync(){
      var past = window.scrollY > 560;      // ~hero height; see note below
      badge.classList.toggle('show', past && !footVisible);
    }

    window.addEventListener('scroll', sync, { passive:true });
    sync();
  })();
</script>
```

**The one number to check:** `window.scrollY > 560`. That `560` is roughly "how far down before the badge appears" — tuned to clear the hero. If the client's hero is a different height, adjust it (or make it dynamic):

```js
// Dynamic version — appears once you've scrolled past the actual hero element:
var hero = document.querySelector('.hero');
function sync(){
  var trigger = hero ? hero.offsetHeight - 100 : 400;
  var past = window.scrollY > trigger;
  badge.classList.toggle('show', past && !footVisible);
}
```

This is more robust across clients since it measures the real hero instead of a hardcoded pixel value. Use it if the layout has a `.hero` element (adjust the selector if not).

---

## 5. How it behaves (for QA)

| State | What happens |
|---|---|
| In the hero (top of page) | Hidden — `opacity:0`, not clickable |
| Scrolled past the hero | Fades + slides up into the bottom-right corner |
| Footer scrolls into view | Fades back out so it never overlaps footer content |
| Hover | Lifts up ~2px and scales slightly |
| `prefers-reduced-motion` on | Appears/disappears with no transition |

**Verify:** scroll top→bottom and confirm it's hidden in the hero, visible through the body, and hidden again over the footer. On mobile check it doesn't cover any tap targets in the bottom-right (move it or shrink it if it does — e.g. a live chat widget often lives there).

---

## 6. Gotchas

- **Needs a `<footer>` element** for the hide-on-footer logic. If the page has no `<footer>`, the badge simply stays visible after the hero (still fine) — or change the selector to whatever the final section is.
- **`z-index:70`** sits above page content but you may need to raise it if the site has a higher-stacked element. Watch for collisions with sticky headers, chat widgets, or cookie banners in the bottom-right.
- **Don't animate `opacity` on `.yr-badge img`** — the parent's opacity is what fades. If you want the seal permanently faint, set opacity on the `img`, not the badge.
- If the seal is **not round**, remove both `border-radius:50%` lines and drop the drop-shadow's roundness assumption (it'll still work, just square).

---

## 7. Quick prompt to hand another Claude

> "Add a floating seal badge to this page using the spec below. The seal image is [attach or give URL]. It should be hidden in the hero, fade up into the bottom-right corner after scrolling past the hero, and hide again over the footer, with a subtle hover lift and reduced-motion support. Use the dynamic `.hero`-height trigger. Resize/compress the seal to ~240px before embedding."
>
> _(then paste sections 2–4 of this doc)_
