# Urban Explorer Labs — UI/UX & Frontend Review

**Reviewed build:** `ea83f43` — "Polish product workflows and final artwork"
**Live:** https://cicciobastardo67.github.io/urban-explorer-labs/
**Local:** `C:\Users\ASUS\Desktop\Claude folder\company-website`
**Date:** 2026-07-27
**Scope:** home + `/luyagent/` `/khmeradv/` `/hermes-post/` `/kramos/` (+ orphan `/khaudit/`), desktop 1440×900, tablet 820×1180, phone 390×844, Day + Night.
**No files were modified. Nothing was committed or pushed.**

---

## Verdict

# ❌ NEEDS FIXES

4 BLOCKERs. The site is visually strong and the product content is genuinely differentiated, but in its **default state (Night mode) the main headline of every page is black text on a dark navy map at 1.42:1 contrast**, and **there is no working way for a lead to contact the company** — the form is a stub and the published email domain does not exist.

**Good news, explicitly verified:**
- ✅ **All five final workflow artworks have real PNG alpha. No black rectangular background anywhere.** Corner alpha = 0 on all five; opaque-dark pixel share 0.0–1.8%. Verified on the files *and* rendered live over the map.
- ✅ Continuous scrolling background works and is seam-free on desktop.
- ✅ Day/Night toggle works, persists across pages via `localStorage`, no flash on load.
- ✅ Each product page describes its own application — no generic or cross-pasted product copy.
- ✅ `npm run lint` passes clean. Only console error site-wide is a `favicon.ico` 404.

---

## BLOCKER

### B1 — Main headline unreadable in Night mode (all 5 pages)
**Page / section:** Home hero; `/luyagent/`, `/khmeradv/`, `/hermes-post/`, `/kramos/` product heroes.

**Problem:** `SpotlightText` is called with `dimColor="#000000"` / `brightColor="#ffffff"` hardcoded, ignoring `data-map-mode`. On a fine pointer the white layer is masked to a 150px circle that follows the cursor — radius is `0px` until the pointer enters, so the H1 renders **pure black on the night map**.

Measured on the live LUYAGENT hero: glyph `rgb(0,0,0)` vs backdrop `rgb(36,39,54)` = **1.42:1**. WCAG AA needs 3:1 for large text.

Night is the **default** for a first-time visitor (`App.jsx:17` — anything other than `'day'` in storage ⇒ night).

**Inverted failure on touch:** on `(pointer: coarse)` / reduced-motion, `interactive === false` ⇒ `maskImage: 'none'` ⇒ the **white** layer paints fully. On a phone in **Day** mode that is white text on the pale map — invisible. So it is broken in one mode on every device class.

**Correction:** drive the two colours from map mode instead of hardcoding — e.g. pass `dimColor={mapMode === 'night' ? '#f5f8ff' : '#0b1b2e'}` and use the spotlight only as an *accent* on the already-legible base layer, never as the sole source of legibility. Guarantee ≥ 4.5:1 for the base state in both modes and on non-interactive devices.

**Files:** `src/components/SpotlightText.jsx` (:104, :113–118), `src/components/Hero/Hero.jsx:96-100`, `src/components/ProductPage.jsx:47`

---

### B2 — Contact form is a stub; it discards every lead and lies about it
**Page / section:** Home → `#contact` (section 04). Every CTA on the site funnels here — "Request a demo", "Request a private demo", "Request a LUYAGENT demo", "Request the pilot", "Book a controlled pilot", "Plan an agency pilot".

**Problem:** `handleSubmit` awaits a 1500 ms `setTimeout` and sets `status: 'success'`. There is no endpoint, no `mailto`, no service. Verified live: submitting produced **zero** network requests.

Worse, the form carries `noValidate` **and** has no JS validation, so `required` is never enforced. Verified live: submitting a **completely empty** form returns **"Sent — we'll be in touch"**.

**Correction:** wire to a real endpoint (Formspree / Basin / Cloudflare Worker / Telegram bot — the last fits your stack). Remove `noValidate` or implement equivalent JS validation with inline field errors. Announce success/failure in an `aria-live="polite"` region, not only as a button label. Until an endpoint exists, replace the form with a working `mailto:` so no lead is silently dropped.

**File:** `src/components/Section04/Section04.jsx:26-33` (handler), `:114` (`noValidate`)

---

### B3 — Published contact email is undeliverable — site has zero reachable contact channel
**Page / section:** Footer → "Let's talk".

**Problem:** the footer publishes `hello@urbanexplorerlabs.com`. DNS check:

```
urbanexplorerlabs.com  MX -> DNS name does not exist
urbanexplorerlabs.com  A  -> DNS name does not exist
```

The domain is **not registered / has no DNS**. Mail to it bounces. Combined with **B2**, the site currently has **no working contact path at all**.

**Correction:** either register `urbanexplorerlabs.com` and set up MX, or publish a mailbox that exists today (e.g. one of the accounts already in use) until the domain is live.

**File:** `src/components/Footer/Footer.jsx:114-116`

---

### B4 — Flagship workflow artwork contains garbled AI text
**Page / section:** Home → section 02 "Work" → "Four controlled systems…" figure.

**Problem:** the hero artwork of the whole portfolio has nonsense baked into the render:

| Shown | Should read |
|---|---|
| `Urbar Campaign` | Urban Campaign |
| `Conteent` | Content |
| `Prordoor BeneOugts` | (illegible) |
| `Elgaie Explorer Labs` | Urban Explorer Labs |
| Document card labels | illegible glyph soup |

This is the single largest image on the marketing page for a company selling *content and compliance automation*. Transparency is fine — the text is the defect.

**Correction:** regenerate with the labels composited as real vector/HTML text, or re-render text-free and overlay the four labels in the page. Do not ship AI-rendered lettering.

**File:** `public/images/workflows/urban-explorer-four-systems.png` (used at `src/components/VisualOverview.jsx:5, :86`)

---

## HIGH

### H1 — Contact heading is clipped off-screen on phones
**Page / section:** Home → `#contact`, 390 px viewport.
**Problem:** `.contact-heading-line { white-space: nowrap }` is re-asserted *inside* the `max-width: 768px` block. At 28–34 px the line "Bring us the workflow that" needs ~470 px in a ~330 px column; `overflow: hidden` on the section cuts it. Renders as "…the workflow" / "…your team's tim".
**Correction:** drop the `nowrap` inside the mobile query (let it wrap); keep it only ≥ 1101 px where the two-line break is intentional.
**File:** `src/index.css:1394-1396` (and the base rule at `:1357-1360`)

### H2 — "About" navigation link is dead
**Page / section:** Header desktop nav, mobile menu, footer "Company" column.
**Problem:** all three link to `#about`. No element with `id="about"` exists — page IDs are `home, systems, work, approach, contact`. Clicking does nothing (or reloads to top).
**Correction:** point it at `#approach`, or give the approach section a second `id="about"`, or remove the item.
**Files:** `src/components/Header/Header.jsx:25`, `src/components/Footer/Footer.jsx:97`

### H3 — `/khaudit/` is a live public duplicate of `/kramos/`
**Page / section:** whole page.
**Problem:** `productPages.khaudit = kramos`, and `khaudit/index.html` carries the **identical** `<title>` and `<meta description>` as `/kramos/`. Both return 200 live. Duplicate content, no `rel=canonical` anywhere on the site, and a second URL for a product that has one name.
**Correction:** remove the `khaudit` build input and the alias; if the old URL must survive, serve a redirect stub instead. Add `<link rel="canonical">` to all pages regardless.
**Files:** `vite.config.js` (rollup input), `khaudit/index.html`, `src/productData.js:136`

### H4 — No Open Graph / Twitter Card metadata on any page
**Page / section:** all five `index.html`.
**Problem:** no `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`. Sharing any link on Telegram, Facebook, LinkedIn or WhatsApp produces a bare grey URL with no title or preview image. Notably weak for a company whose products publish to exactly those platforms.
**Correction:** add per-page OG + Twitter tags and a 1200×630 share image (the systems artwork works once **B4** is fixed).
**Files:** `index.html`, `luyagent/index.html`, `khmeradv/index.html`, `hermes-post/index.html`, `kramos/index.html`

### H5 — Page weight and time-to-content
**Page / section:** all pages.
**Problem measured live:**

| Metric | Value |
|---|---|
| Background map PNG | **2.6 MB** (`phnom-penh-scroll-map-night-v2.png`) |
| JS bundle | **765 KB** transferred / 2.54 MB parsed (three.js + world-atlas) |
| Total first load, one mode | **~3.2 MB** |
| Unused assets shipped to Pages | **11.1 MB** (see O2) |
| FCP / LCP (desktop, warm cache) | **2.68 s / 3.48 s** |

Nothing paints until the React bundle executes. On a Cambodian mid-range phone on 4G this is a multi-second blank screen — for the audience the site is explicitly written for.

**Correction:** convert the two map backgrounds to AVIF/WebP with responsive `image-set()` (expect ~85% reduction); code-split the globe/`three` behind a dynamic import so it is not in the critical path; drop the unused assets from `public/`.
**Files:** `public/images/phnom-penh-scroll-map-*.png`, `src/components/Globe.jsx`, `vite.config.js`

### H6 — Section content drifts horizontally against the fixed header
**Page / section:** every section on every page, desktop.
**Problem:** `useMapScroll` writes `--layer-parallax-x` onto the **content containers**, with the sign alternating by section index. Sampled at one scroll position, the five `.container` left edges were at **71, 17, 34, 71** px — up to 54 px of misalignment, changing continuously as you scroll, while the header logo stays fixed. The page never has a stable left margin.
**Correction:** keep the parallax on the background layers only; leave `.container` on a fixed grid. If content motion is wanted, restrict it to translateY.
**File:** `src/hooks/useMapScroll.js:37-46`

### H7 — LUYAGENT workflow artwork has scrambled step numbers
**Page / section:** `/luyagent/` → "How the workflow moves".
**Problem:** the platform numbers read `1 1 2 4 5 3 3 6 2` instead of a 1→7 sequence, contradicting the seven-step list rendered right beneath it.
**Correction:** regenerate without numerals, or composite the numbers as real text.
**File:** `public/images/products/luyagent/order-workflow-v2.png`

---

## MEDIUM

### M1 — Body copy below AA in Night hero
Home + product heroes. Intro paragraph measured **3.43:1** (needs 4.5:1 at 18–20 px). Product heroes also lack the left scrim that the home hero has, so the copy sits directly on the busiest part of the map.
→ Lighten `--muted` in night mode; extend the home hero's gradient scrim to `.product-hero`.
**Files:** `src/design-tokens.css`, `src/components/Hero/Hero.jsx:37-58`, `src/index.css:1666`

### M2 — Mobile menu is not a proper dialog
No focus trap, **Escape does not close it**, and the page **scrolls behind it** (verified live). It also contains no links to the four product pages — on mobile those are reachable only from the systems table or the footer.
→ Lock body scroll while open, close on Escape, trap focus, add the four products.
**File:** `src/components/Header/Header.jsx:136-230`

### M3 — JS overwrites the SEO `<title>`
`ProductPage` sets `document.title = "${name} | Urban Explorer Labs"`, discarding the tuned static titles (e.g. "LUYAGENT | Private Sales Automation for Cambodian Sellers" → "LUYAGENT | Urban Explorer Labs").
→ Move the tuned title into `productData` and set that, or don't overwrite.
**File:** `src/components/ProductPage.jsx:18`

### M4 — Problem section only has artwork on one of four product pages
Only `luyagent` defines `visuals.problem`. The other three fall back to `product-two-column`, leaving the right 55% of that section as bare map. The four product pages don't share a rhythm.
→ Supply the three missing artworks, or drop the LUYAGENT one for consistency.
**File:** `src/productData.js` (`visuals` blocks), `src/components/ProductPage.jsx:53-65`

### M5 — Problem artwork alt text is hardcoded LUYAGENT copy
`alt={`${product.name} routes difficult orders to human review`}` is applied to whatever product renders there — meaningless for KramOS or Hermes Post the moment M4 is fixed.
→ Move the alt string into `productData.visuals`.
**File:** `src/components/ProductPage.jsx:61`

### M6 — No intrinsic dimensions on any image → layout shift
All 7 images per product page lack `width`/`height`, so every lazy image reflows the page on arrival.
→ Add intrinsic `width`/`height` (or `aspect-ratio`) to every `<img>`.
**Files:** `src/components/ProductPage.jsx`, `src/components/VisualOverview.jsx`, `src/components/ProductDataShow.jsx`

### M7 — Portfolio video is unpolished
No `poster` (first frame is the chaotic "tangled cables" problem image), no caption track, native browser controls that clash with the design system, and no duration hint before the 1:11 clip.
→ Add a `poster`, a `<track kind="captions">`, and style the control surface.
**File:** `src/components/VisualOverview.jsx:71-81`

### M8 — Header nav hard-reloads when the URL carries a query string
Nav hrefs are absolute (`${BASE_URL}#work`). From `…/?v=ea83f43`, clicking "Work" navigates to a **different** URL ⇒ full reload ⇒ lands at scroll 0 with the anchor lost. Verified live: scrollY went 2700 → 0. On the clean URL it behaves correctly (section lands at exactly 72 px, below the header). Hero links use bare `#contact`; header links use absolute — two conventions in one page.
→ Use bare `#id` everywhere on the home page.
**File:** `src/components/Header/Header.jsx:22-25, 128, 169, 221`

### M9 — The signature background motion is dead on every touch device
`useMapScroll` pins `--map-scroll` to `0%` whenever `(pointer: coarse)` matches, which kills the continuous map scroll **and** the parallax together. Phone and tablet visitors get a static wallpaper — the site's main motion identity, absent for most of its audience.
→ Split the two: keep the cheap `background-position` scroll on touch, disable only the per-section parallax.
**File:** `src/hooks/useMapScroll.js:22-28`

### M10 — No `robots.txt`, `sitemap.xml`, or branded `404.html`
All three return 404. Any mistyped path shows GitHub's generic 404, outside the brand.
→ Add all three to `public/`.

### M11 — "Built for" proof card sets a sentence as a display heading
`.product-proof-card strong` is `clamp(1.4rem, 2vw, 2.1rem)` bold. On `/luyagent/` the 17-word audience sentence wraps to **8 lines** at 1440 px and dominates the hero.
→ Drop it to body size, or shorten the `audience` strings.
**File:** `src/index.css:1675`, `src/productData.js` (`audience`)

### M12 — Form collects personal data with no privacy notice
Name, work email, company, role and a free-text business description are collected with no consent line, no privacy policy, and no link to one anywhere on the site.
→ Add a privacy statement next to the submit button and a policy page — especially given the "Local-first / data stays in-country" positioning.
**File:** `src/components/Section04/Section04.jsx`

### M13 — `theme-color` is always light
`<meta name="theme-color" content="#EAF5FF">` is fixed on all pages, so mobile browser chrome stays pale while the site renders in Night mode.
→ Ship both via `media="(prefers-color-scheme: dark)"`, or update it from the toggle.
**Files:** all five `index.html`

---

## OPTIONAL

**O1 — `src/styles.css` is orphaned.** 265 lines, never imported (`index.css` only imports `design-tokens.css`). Its `.contact-form` rules are superseded by inline styles in `Section04`. Delete.

**O2 — 11.1 MB of unreferenced assets ship to Pages:**
```
2832KB  images/phnom-penh-continuous-map-v2.png
3100KB  images/phnom-penh-square-map-v3.png
2000KB  images/phnom-penh-systems-map-v1.png
1256KB  images/hero-authority.png
 680KB  images/products/luyagent/sales-problems.png
 484KB  images/products/luyagent/order-workflow.png
 484KB  images/products/kramos/portfolio-workflow.png
 336KB  media/urban-explorer-visual-workflow.webp
```

**O3 — `favicon.ico` 404** is the only console error site-wide. Add `public/favicon.ico` or a `<link rel="icon" sizes="any">`.

**O4 — Google Fonts loaded from an external CDN** on a site whose section 03 promises "Local-first. Data stays in-country." Self-hosting Inter + Noto Sans Khmer removes the contradiction and two extra RTTs from Phnom Penh.

**O5 — Home `<title>` is 108 characters**, truncated in search results. Target ~60.

**O6 — `principles/evidence-linked-artwork.png`** is the one artwork with non-zero corner alpha (`64, 24, 31, 0`) — a faint edge halo on three corners. Cosmetic; every other PNG is clean.

**O7 — No skip-to-content link** before the fixed header.

**O8 — `SpotlightText` renders its text twice** (an `aria-label` on the visible layer plus an `aria-hidden` duplicate). Move the label to the `<h1>` and mark both layers `aria-hidden` to avoid double announcement.

---

## Verified working — do not change

- Real PNG transparency on **all five** final workflow artworks and all 37 artwork PNGs. Corner alpha 0, no black rectangles, confirmed both in-file and rendered over the map.
- Product content is authentically per-product: distinct problems, outcomes, 7-step workflows, capabilities, privacy boundaries, pilots and FAQs, plus four separate interactive `ProductDataShow` consoles.
- Day/Night toggle: correct `aria-pressed`, correct target-state label, persists via `localStorage`, no flash on load.
- Continuous background scroll on desktop: seam-free, 55 FPS, 0 long tasks over a full-page scroll.
- Semantics: one `<h1>` per page, clean heading order, `lang="en"`, landmarks, every `<img>` has an `alt`, decorative artwork correctly `alt=""`, global `:focus-visible` outline.
- `npm run lint` — clean.
- Phnom Penh background, branding and supplied 3D artwork preserved throughout this review.

---

## Suggested fix order

1. **B3** publish a reachable email (minutes)
2. **B2** wire the form + restore validation
3. **B1** map-mode-aware headline colours
4. **B4 / H7** regenerate the two artworks with broken lettering
5. **H1 / H2 / H3** mobile heading clip, dead `#about`, kill `/khaudit/`
6. **H4 / H5** OG tags, image + bundle diet
7. **H6** stop parallaxing content containers
8. MEDIUM batch
9. OPTIONAL cleanup
