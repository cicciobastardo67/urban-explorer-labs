# New Pages — `/about/` and `/pricing/`

Read `00-CONTENT-RULES.md` first. **Tone: executive.** Short, plain, no jargon.

**Build setup for both pages:** add `about` and `pricing` to the rollup inputs in `vite.config.js`
and create `about/index.html` and `pricing/index.html` following the existing product-page pattern.
Both need their own `<title>`, meta description, canonical and Open Graph tags.

> Do **not** copy the `khaudit` pattern — that entry is a duplicate and is slated for removal (H3).

---
---

# `/about/` — About Urban Explorer Labs

**Title:** `About | Urban Explorer Labs`
**Meta:** `Urban Explorer Labs builds private automation systems in Phnom Penh for Cambodian business — local-first, Khmer-ready, and built to stop at a human decision.`

## Hero

> **We build automation that knows when to stop.**
>
> Four systems for Cambodian business. Built in Phnom Penh, running on infrastructure you control,
> handing every decision that matters back to a person.

## Why we exist

> The automation available to a Cambodian business was mostly built somewhere else. It assumes English
> first and Khmer as a translation. It assumes your customer records can live on a server in another
> country. It assumes you want fewer humans in the loop.
>
> Those assumptions do not survive contact with a shop taking orders on Telegram, an agency running
> five client brands out of one inbox, or a factory that has to show an auditor which page a number
> came from.
>
> So we build differently. Each system covers one real workflow rather than promising to cover
> everything. Khmer is a first-class output. And every one of them stops at a human decision — the
> seller confirms the payment, the campaign owner approves the post, the reviewer decides the finding.
>
> That last part is the product, not a limitation.

## How we work

> **We scope small.** One shop. One brand. One document family. A four-week pilot you can finish and
> measure beats a six-month rollout nobody can evaluate.
>
> **We run it with you.** During a pilot we are in it with your team, on your real material, watching
> what breaks. Not a handover and a manual.
>
> **We measure before expanding.** At the end of a pilot you get what it actually did — including what
> it got wrong. Expansion is a decision made from that, not from a demo.
>
> **We tell you when the answer is no.** Some workflows do not need automation. Some need a process
> fixed first. We would rather lose the sale than run a pilot we expect to fail.

## What we build

Four short blocks, each linking to its product page.

| | | |
|---|---|---|
| **LUYAGENT** | Private sales automation | Telegram conversations become confirmed orders. The seller approves every payment. → `/luyagent/` |
| **KhmerADV** | Agency media operations | Multi-brand campaign production with a structural approval gate before publishing. → `/khmeradv/` |
| **Hermes Post** | Small business content | One idea becomes an approved week of posts, in the owner's own voice. → `/hermes-post/` |
| **KramOS** | Compliance and document control | Evidence-linked findings from deterministic checks, decided by a named reviewer. → `/kramos/` |

## The four principles

Mirrors the home Approach section — keep the wording consistent between them.

> **Local-first.** Data stays in-country and systems run in your environment. Where a system needs an
> outside service, we name it on the product page instead of hiding it behind "cloud".
>
> **Human-approved.** The approval step is structural, not a setting. A payment, a post or a finding
> waits for a named person.
>
> **Evidence-linked.** A finding that cannot show its source is not stored. Approvals and overrides
> keep the reason attached.
>
> **Khmer-ready.** Khmer is a first-class output, not a translation pass. KramOS handles Khmer, English
> and Chinese in the same document set.

## Where we are

> Phnom Penh, Cambodia. We build here, and we run pilots on-site with your team.

## Team — `[FILL IN]`

> **This section needs your input and cannot be written from the codebase.**
>
> A named human on an About page is the single strongest trust signal for a compliance and payments
> product, especially for a company asking a factory to run its document review. Recommended: name,
> role, one line of relevant background, and a photograph, for each person you are willing to put
> forward.
>
> If you would rather not name individuals yet, replace this with a short paragraph on the team's
> background — but expect enterprise buyers to ask. **Do not leave a placeholder or stock photo on
> the live page.**

## Closing CTA

> **Bring us the workflow that wastes your team's time.**
> We will tell you whether we are the right answer. → `#contact`

---
---

# `/pricing/` — How engagement works

**Title:** `Pricing | Urban Explorer Labs`
**Meta:** `How an Urban Explorer Labs engagement works — a scoped four-week pilot, then deployment on infrastructure you control.`

> ## ⚠️ READ BEFORE IMPLEMENTING
>
> **There is no pricing data in the codebase.** Nothing in `productData.js` or anywhere else in the
> repository contains a rate, a fee or a currency. Every figure below is a marked placeholder.
>
> **Do not invent numbers to fill these in.** Publish the page with real figures or do not publish
> the page. A wrong price on a live site is worse than no pricing page.
>
> Placeholders are marked `[PRICE: …]`. The structure and copy around them are ready to use.

## Recommended model — pilot-first

All four products already lead with a pilot in `productData.js` ("LUYAGENT Seller Pilot", "Agency
Command Center Pilot", "First Content Week", "KramOS Controlled Pilot"). The pricing page should
match that, not contradict it with a self-serve subscription table.

Three stages: **Assessment → Pilot → Running it.**

## Hero

> **A scoped pilot first. Always.**
>
> We do not sell a licence and leave. Every engagement starts with one workflow, four weeks, and a
> measurement at the end that tells you whether to continue.

## Stage 1 — Assessment

> **`[PRICE: free / fixed fee — DECIDE]`**
>
> We look at one workflow: what it is, who does it, how long it takes and where it breaks. You get a
> straight answer on whether one of our four systems fits, which one, and what a pilot would cover.
>
> **You get:** a written scope, the channels or document families we would cover, and what we would
> measure.
>
> **If we are the wrong answer, this is where we say so.**

## Stage 2 — Pilot

> **`[PRICE: fixed per product — DECIDE]` · Four weeks · One workflow**
>
> We configure one system to your operation and run it with your team on your real material. Week by
> week plans are on each product page.
>
> **You get:** a working, configured system; your team trained on it; and a measurement at the end
> covering what it handled, what it passed to a human, and what it got wrong.
>
> **You do not get:** a rollout across your whole company. That is deliberate.

Per-product pilot scope, already defined:

| Product | Pilot scope | Price |
|---|---|---|
| LUYAGENT | One seller, one catalogue, Telegram | `[PRICE]` |
| Hermes Post | One business, one content week, connected channels | `[PRICE]` |
| KhmerADV | One brand, one campaign, permission-confirmed channels | `[PRICE]` |
| KramOS | One document family, one department's rule set | `[PRICE]` |

## Stage 3 — Running it

> **`[PRICE: model — DECIDE: per month / per seat / per campaign / annual licence]`**
>
> After the pilot, you keep the system. What that costs depends on which system, how many brands,
> shops or document families it covers, and whether you want us maintaining it.
>
> **Included in every arrangement:** the system runs on infrastructure you control, and your data
> stays where the product page says it stays.
>
> **Priced separately:** additional brands, shops or document families; new channels; new rule sets;
> `[CONFIRM: support response times]`.

## What is not charged for

> - Telling you that you do not need us.
> - The approval steps. Human control is not a paid tier.
> - Getting your data back out. It is on your infrastructure already.

## Pricing FAQ

- **Why is there no self-serve price list?** Because the honest answer for all four systems depends on scope — how many brands, shops or document families. A fixed number on this page would be wrong for most people reading it.
- **Do you charge per user?** `[DECIDE]`
- **What happens after the pilot if we stop?** For LUYAGENT and KramOS, your data is already on your own machine and stays there. For KhmerADV and Hermes Post, your records are in your installation and content exports out.
- **Is the pilot fee credited against deployment?** `[DECIDE — crediting it is a strong closing lever]`
- **Do you do custom builds?** We build products, not bespoke projects. A pilot configures an existing system. If your workflow needs something none of the four does, we will say so.
- **What currency and payment terms?** `[FILL IN]`

## Closing CTA

> **Start with the assessment.** One workflow, one conversation, a straight answer. → `#contact`

---

## Implementation checklist for these two pages

- [ ] Add `about` + `pricing` to `vite.config.js` rollup inputs
- [ ] Create `about/index.html`, `pricing/index.html` with title, meta, canonical, OG tags
- [ ] Add both to header nav and footer — and point the dead `#about` link (**H2**) at `/about/`
- [ ] Add both to `sitemap.xml` (**M10** — the file does not exist yet)
- [ ] **Replace every `[PRICE]`, `[DECIDE]`, `[CONFIRM]` and `[FILL IN]` before going live**
- [ ] Team section on `/about/` needs real people or a rewritten paragraph — no placeholder, no stock photo
