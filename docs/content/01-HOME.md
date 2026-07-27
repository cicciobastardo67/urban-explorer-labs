# Home Page Content

Read `00-CONTENT-RULES.md` first. **Tone: executive.** Short sentences, outcome and boundary framed,
no jargon. The home page sells the *posture* — local, approved, evidenced — and routes to the four
product pages.

## Where this content lives

Home copy is **hardcoded JSX inside the section components**, not in a data file:

| Section | File | Current heading |
|---|---|---|
| Hero | `src/components/Hero/Hero.jsx` | *Intelligent automation. Built for Cambodia. Kept under your control.* |
| 01 | `src/components/Section01/Section01.jsx` | *Four systems. One accountable foundation.* |
| 02 | `src/components/Section02/Section02.jsx` | *Built systems, not slide decks.* |
| 03 | `src/components/Section03/Section03.jsx` | *Local by design. Accountable by default.* |
| 04 | `src/components/Section04/Section04.jsx` | *Bring us the workflow that wastes your team's time.* |

> ⚠️ **`src/data.js` is dead code — do not put content there.** Nothing imports it, and it imports
> `lucide-react`, which is not in `package.json` and is not installed. Importing it would break the
> build. It is also stale: it lists three products and is missing Hermes Post. Either delete it or
> repair it and wire it up deliberately — but content from this file must not be routed into it as-is.
> (`src/styles.css`, 265 lines, is orphaned the same way.)

---

## 1. Hero — KEEP

The current headline is good and on-message. Do not rewrite it.

> **Intelligent automation. Built for Cambodia. Kept under your control.**
>
> Private sales, compliance, document, and media automation designed around real Cambodian business workflows.

> ⚠️ This headline renders as black text on the dark night map — finding **B1** in the UI review, measured
> at 1.42:1. Fix the colour handling before shipping any new hero copy, or the new copy is invisible too.

**Optional third line**, under the existing intro, to state the boundary early:

> Every system stops and waits for a person before it does the thing that matters.

---

## 2. Section 01 — Systems — EXTEND

Keep the heading and the four-row systems table. Add a short framing paragraph under the heading,
because the table currently starts cold.

> Four systems, built separately, for four different jobs. They share one rule: the software does the
> repetitive work and then hands the decision back to a named person. Nothing publishes, confirms a
> payment or files a finding on its own.

**Add to the table row copy** — a "who runs it" line per product, so a visitor self-selects without
opening all four pages:

| Product | Add |
|---|---|
| LUYAGENT | For a seller running one shop on Telegram. |
| KhmerADV | For an agency team running several client brands. |
| Hermes Post | For one business keeping its own content going. |
| KramOS | For a compliance reviewer who has to show their sources. |

---

## 3. Section 02 — Work — EXTEND

Keep the heading and the video/artwork layout.

> ⚠️ The four-systems artwork here contains garbled AI text — finding **B4**. Regenerate before shipping.

**Replace the intro paragraph** with something that sets up the artwork:

> Verified inputs. Product-specific automation. Human quality control. The same three-part shape runs
> through all four systems — what goes in is checked, the work in the middle is specific to the job
> rather than a generic assistant, and a person signs off before anything leaves.

**Add below the artwork — "How an engagement actually runs":**

> **1. We look at the workflow.** Not your whole company — one workflow that is costing your team hours.
>
> **2. We tell you if we are the wrong answer.** Some workflows do not need automation. Some need a
> process change first. We say so before anyone signs anything.
>
> **3. We scope one pilot.** One brand, one shop, one document family. Narrow enough to finish.
>
> **4. We run it with you and measure it.** Four weeks, with your team, on your real material.
>
> **5. You decide whether to expand.** From measurements, not from a demo.

---

## 4. Section 03 — Approach — EXTEND

Keep the heading and the four principle rows. Each currently has one line. Give each a second,
concrete line so the principles read as commitments rather than slogans.

| Principle | Current | **Add** |
|---|---|---|
| **Local-first** | Data stays in-country. Systems run in your environment. | Where a system needs an outside service, we name it on the product page instead of hiding it behind "cloud". |
| **Human-approved** | | The approval step is structural, not a setting you can switch off. A payment, a post or a finding waits for a named person. |
| **Evidence-linked** | | A finding that cannot show its source is not stored. Approvals and overrides keep the reason attached. |
| **Khmer-ready** | | Khmer is a first-class output, not a translation pass at the end. Khmer, English and — in KramOS — Chinese are handled in the same document set. |

**Add a closing band — "What we will not do":**

> - We will not sell you a system that publishes, pays or files without a person.
> - We will not claim a channel works before your account has the permission for it.
> - We will not put a number on a page that we have not measured.
> - We will not tell you a pilot succeeded if the measurements say otherwise.

---

## 5. NEW — About section — `id="about"`

**This resolves finding H2.** The header nav, the mobile menu and the footer all link to `#about`
and there is no such element, so the link is dead in three places. Place this section between
Approach (03) and Contact (04) and renumber contact to 05, or give it `id="about"` without a number
if renumbering is disruptive.

**Heading:** Built in Phnom Penh, for the way business actually runs here.

> Urban Explorer Labs builds private automation systems for Cambodian businesses. We are not a
> reseller and not an integrator — we build the systems, run them with you during a pilot, and hand
> you something that keeps working on infrastructure you control.
>
> We started because the automation on offer here was built somewhere else, for a different market,
> in a different language, and assumed your data could live on someone else's server. That does not
> fit a shop taking orders on Telegram, an agency running five client brands, or a factory that has
> to show an auditor where a number came from.
>
> So each of our four systems is shaped around one real workflow, handles Khmer as a first-class
> language, and stops at a human decision. That last part is not a limitation we are apologising for.
> It is the product.

**Three supporting points:**

> **We build, we do not resell.** Four systems, built here, maintained here.
>
> **We scope small on purpose.** One shop, one brand, one document family. A pilot you can finish and
> measure beats a rollout you cannot.
>
> **We tell you when the answer is no.** Not every workflow should be automated. Saying so costs us a
> sale and saves you a year.

**Link out:** *Read more about how we work →* `/about/`

---

## 6. Section 04 — Contact — EXTEND

Keep the heading. It is strong.

> ⚠️ **The form does not send anything** — finding **B2**. It shows "Sent — we'll be in touch" for a
> completely empty submission and makes zero network requests. And `hello@urbanexplorerlabs.com` does
> not resolve — finding **B3**. Every CTA in this content pack points here. **Fix both before shipping
> this content**, or the site collects leads into nothing while promising a reply.

**Add under the intro** — sets expectations and improves lead quality:

> Tell us what the workflow is, who does it today, and roughly how long it takes. That is enough for
> a first conversation. If we think you do not need us, we will say so in the reply.

**Add beside the submit button** — required for **M12**, since the form collects name, email, company,
role and a free-text business description:

> We use this to reply to you and nothing else. We do not sell it, and we do not add you to a mailing
> list.

**Add a fallback contact line** — so there is a working path even while the form is being fixed:

> Prefer email? Write to us directly at `[VERIFIED MAILBOX]`.

> `[VERIFIED MAILBOX]` must be a mailbox that exists today. Do not use
> `hello@urbanexplorerlabs.com` — that domain has no DNS record at all.

---

## 7. NEW — Home FAQ

Six questions, placed between About and Contact. Answers objections before the form.

- **Do you host our data?** No. Each system states exactly where its data sits, on its own page. LUYAGENT and KramOS process on your own machine. KhmerADV and Hermes Post use external services for specific steps, and we name which ones.
- **Are these products or custom builds?** Products. Four of them, each shaped around one workflow. The pilot configures one to your operation rather than building something new.
- **Which one do we need?** Selling on Telegram — LUYAGENT. One business posting its own content — Hermes Post. An agency with client brands — KhmerADV. Documents you have to justify to an auditor — KramOS.
- **Do they work in Khmer?** Yes. Khmer is a first-class output, not a translation step. KramOS also handles English and Chinese in the same document set.
- **Can it run without approval steps?** No. That is the design, in all four.
- **What does a pilot cost and how long is it?** Four weeks, scoped to one workflow. See `/pricing/`.

---

## 8. Metadata

Applies to `index.html`. Covers findings **H4** (no Open Graph anywhere) and **O5** (title length).

**Title** — 108 characters today, truncated in search results. Replace:

> `Urban Explorer Labs — Private Automation for Cambodian Business`

**Meta description:**

> Four private automation systems for Cambodian business: Telegram sales, agency media operations,
> small-business content and evidence-linked compliance review. Human approval built in.

**Open Graph / Twitter** — currently absent on all five pages, so every shared link renders as a bare
grey URL. Add per page:

```
og:title, og:description, og:url, og:type=website, og:site_name=Urban Explorer Labs
og:image (1200×630), og:image:alt
twitter:card=summary_large_image
```

Use the four-systems artwork as `og:image` **only after B4 is fixed** — as it stands, the share card
would broadcast the garbled lettering.

Also add `<link rel="canonical">` to every page (finding **H3** — `/khaudit/` currently duplicates
`/kramos/` with identical title and description).
