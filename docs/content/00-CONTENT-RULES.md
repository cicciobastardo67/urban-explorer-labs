# Content Rules & Handoff Spec

**For:** Codex (implementation). **Author:** content pass, 2026-07-27. **Build reviewed:** `ea83f43`.

Read this file before touching any other file in `docs/content/`. It defines the claim policy, tone
matrix, Khmer policy and the data-shape mapping. The other four files contain the actual copy.

| File | Covers |
|---|---|
| `01-HOME.md` | Home page sections, incl. the missing About block |
| `02-PRODUCTS.md` | Deepened copy for all four product pages |
| `03-ABOUT-PRICING.md` | New `/about/` and `/pricing/` pages |
| `04-CASE-STUDIES.md` | Four worked examples, one per product |

---

## 1. Claim policy — TWO BANDS, never blur them

Everything written in these files sits in exactly one of two bands. **The band must survive
implementation.** If a claim moves out of its band on the live page, the content is wrong.

### Band A — Shipped
Verifiable today from `src/productData.js` and the product codebases. Stated as plain present-tense fact.
No hedging needed.

### Band B — Planned
Real direction, not yet shipped. **Must render inside a visually distinct block** labelled
`Planned` or `In pilot`. Never mixed into a Band A paragraph, never in a hero, never in a `<title>`
or meta description, never in a capability list.

**Implementation requirement:** Band B needs its own component and its own styling — a bordered block
with an explicit label. Suggested shape:

```js
roadmap: {
  label: 'Planned',           // or 'In pilot'
  note: 'Not available today. Confirm scope during assessment.',
  items: ['…', '…'],
}
```

Do not reuse `capabilities` for Band B. Do not merge the two arrays.

### Hard prohibitions

- **No invented numbers.** No percentages, no time savings, no accuracy rates, no ROI, no customer
  counts. If a number is not measured, it does not appear. (This has bitten this org before —
  fabricated "15–30 days" and invented hex codes.)
- **No customer names, logos, quotes or testimonials.** There are none yet. `04-CASE-STUDIES.md`
  is written as *representative worked examples* and is labelled as such on every page. Do not
  restyle those into testimonials.
- **No "AI-powered" as a value claim.** The brand position is control and evidence, not model hype.
- **Nothing that contradicts an existing disclaimer.** The site already says KramOS is a controlled
  local pilot and does not guarantee an audit result. Nothing added may undercut that.

### Known Band B items — flagged so they are not accidentally promoted

| Product | Item | Why Band B |
|---|---|---|
| LUYAGENT | Any channel other than Telegram | `productData.js` explicitly: "Telegram is the completed sales channel." |
| KhmerADV | TikTok publishing | Depends on platform review + account permission. Currently conditional. |
| Hermes Post | TikTok publishing | Explicitly absent — existing FAQ says no TikTok publisher exists. |
| KramOS | Production SaaS / multi-tenant hosting | Existing FAQ: "Not yet. Controlled local pilot with a human reviewer." |
| KramOS | Fine-tuned Khmer OCR | Gated behind a verified-document milestone. See note below. |

> **Confirm before publishing:** KramOS roadmap copy in `02-PRODUCTS.md` references a
> verified-document threshold before the OCR model is retrained. That is an internal engineering
> gate. It reads as a strong discipline signal externally, but it is your call whether to expose it.
> Marked `[CONFIRM]` at the point of use.

---

## 2. Tone matrix

Mixed by page, per direction given.

| Surface | Register | Sentence length | Jargon |
|---|---|---|---|
| Home, all heroes | Executive | Short. Outcome and boundary framed. | None |
| `/luyagent/` | **Simple** | Short. Shop-owner language. | None — say "payment proof", not "payment evidence artefact" |
| `/hermes-post/` | **Simple** | Short. Owner-operator language. | None |
| `/khmeradv/` | **Technical** | Medium. Operations depth, pipeline stages, permissions. | Yes — the buyer runs an agency |
| `/kramos/` | **Technical** | Medium. Evidence, determinism, lineage, audit trail. | Yes — the buyer is an auditor or compliance manager |
| `/about/`, `/pricing/` | Executive | Short. Plain. | None |
| Case studies | Matches its product | — | — |

> **Assumption made:** Hermes Post was not specified. Its stated audience is shops, bloggers,
> creators and owner-led businesses — the same simplicity need as LUYAGENT — so it is written
> **simple**. Say if you want it technical instead and it will be rewritten.

**Voice constants across all surfaces** (already established on the live site — keep them):
- Human approval is always visible and always named.
- Boundaries are stated, not hidden.
- "Controlled", "approved", "evidence-linked", "human decision" are load-bearing words. Keep them.
- No exclamation marks. No "revolutionise", "seamless", "cutting-edge", "unlock", "empower".

---

## 3. Khmer policy

Short Khmer lines are supplied for **LUYAGENT and KramOS only**, per direction. Not for KhmerADV,
not for Hermes Post, not for the home page.

**Placement:** one Khmer line directly under the English hero intro, and one in the deployment
boundary block. Three lines total per product, supplied in `02-PRODUCTS.md`.

**Implementation requirements:**

1. Wrap every Khmer string in `<span lang="km">`. The page is `lang="en"`; without this, screen
   readers pronounce Khmer with an English voice.
2. `Noto Sans Khmer` is already in the font stack (`index.html`) at weights 400/500/600/700 —
   no font work needed.
3. Khmer needs more line-height than Latin. Add `line-height: 1.9` for `[lang="km"]`; at the
   site's current `1.55` the subscript glyphs clip.
4. Do **not** run Khmer through `SpotlightText` or `WeightHoverText`. Both split text per letter or
   per word, which destroys Khmer cluster shaping. Plain text nodes only.

> ⚠️ **Every Khmer line must be checked by a native speaker before publishing.** They are written to
> be simple and grammatical, and each carries an English gloss so review is fast — but they are not
> native-verified. Treat them as drafts.

---

## 4. Data-shape mapping

Where each block lands. Current shape is in `src/productData.js`; each product object needs new keys.

| Content block | Suggested key | Renders in |
|---|---|---|
| Who it's for / not for | `fit: { forYou: [], notForYou: [] }` | new section, `ProductPage.jsx` |
| Use cases | `useCases: [[title, copy], …]` | new section |
| What it does not do | `boundaries: []` | new section — reuse `.product-disclaimer` styling |
| Requirements to run | `requirements: { runsOn, needs: [], optional: [] }` | new section |
| Data & deployment (expanded) | `dataHandling: { storage, processing, thirdParty, retention }` | replaces the one-line `privacy` |
| Pilot week-by-week | `pilotPlan: [[week, title, copy], …]` | expands the existing pilot section |
| Expanded FAQ | `faqs` — extend existing array | existing FAQ section |
| Roadmap | `roadmap: { label, note, items }` | **new Band B component** |
| Khmer lines | `km: { hero, boundary }` | inline, `<span lang="km">` |

**Home page** blocks go in `src/data.js` / the `Section01`–`Section04` components. The About block
resolves the dead `#about` anchor flagged as H2 in the UI review — give that section `id="about"`.

**New pages** `/about/` and `/pricing/` need entries in `vite.config.js` rollup inputs plus their own
`index.html`, following the existing product-page pattern.

---

## 5. Do not regress

These are open findings from `docs/UIUX-REVIEW-2026-07-27.md`. Content work must not depend on the
broken behaviour or make it worse:

- **B2** — contact form is a stub and accepts empty submissions. Every CTA written in these files
  points at `#contact`. **If the form is still fake when this content ships, the content ships a
  bigger lie than it does today.** Fix the form first, or point the CTAs at a working mailbox.
- **B3** — `hello@urbanexplorerlabs.com` does not resolve. Any email in new content must be a
  mailbox that exists.
- **H3** — `/khaudit/` duplicates `/kramos/`. Do not write content for `/khaudit/`. It should be
  removed or redirected.
- **H2** — `#about` is a dead link today. The About block in `01-HOME.md` fixes it. Ship them together.
- **B1** — hero headlines are unreadable in Night mode. New hero copy inherits that bug until it is
  fixed. Fix B1 before shipping new heroes, or the new copy is invisible by default too.
