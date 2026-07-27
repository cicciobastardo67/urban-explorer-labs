# Worked Examples — one per product

Read `00-CONTENT-RULES.md` first.

> ## ⚠️ THESE ARE NOT CASE STUDIES. DO NOT PRESENT THEM AS ONE.
>
> **There are no customers to write case studies about.** No names, no logos, no quotes, no results.
> Fabricating any of those is the exact failure mode this org has already been burned by.
>
> What follows are **representative worked examples** — a realistic walkthrough of one workflow moving
> through one system, written entirely from capabilities that exist in `productData.js`.
>
> **Mandatory on every page:**
> - Page title says **"Worked example"**, never "case study" or "success story".
> - The standing label below appears at the top of every one of these pages.
> - **No invented metrics.** Not "saved 4 hours", not "40% faster", not "handled 200 orders". Nothing
>   with a number that has not been measured on a real deployment.
> - No invented company names. Use role descriptions — "a shop selling homeware", "a garment factory".
> - Nothing implying this already happened for a paying customer.
>
> The site already uses this exact convention — `ProductDataShow` says "A representative KramOS review
> surface" and "Representative local workflow". These pages extend a pattern that is already there.

**Standing label — required at the top of each page:**

> **Representative workflow.** This example shows how the system is designed to handle this situation,
> using capabilities that exist today. It is not a customer account and contains no measured results.

**Where these live:** `/work/luyagent/`, `/work/khmeradv/`, `/work/hermes-post/`, `/work/kramos/`, with
an index at `/work/`. Each needs a rollup input and its own `index.html`. Link each from its product
page and from home Section 02.

---
---

# 1. LUYAGENT — An evening of orders nobody was awake for

**Tone: simple.** **Title:** `Worked example: an evening of orders | LUYAGENT`

## The situation

> A shop sells homeware through Telegram. One person runs it. The shop closes at six, but customers
> message until eleven — and the ones who do not get an answer buy somewhere else by morning.

## What happens, message by message

> **8:40pm — a question.** A customer asks whether a cookware set is still available. LUYAGENT checks
> the catalogue, confirms the stock, and shows the product with the price.
>
> **8:44pm — a second question.** "How much is delivery to Toul Kork?" That answer is in the shop's FAQ,
> so it comes back immediately.
>
> **8:51pm — a cart.** The customer adds the set and a second item. LUYAGENT takes the delivery name,
> the address and the phone number, and holds them on the order.
>
> **8:58pm — payment.** The customer chooses bank transfer. LUYAGENT shows the QR, the customer pays and
> sends a screenshot. **LUYAGENT does not confirm it.** The order moves to "payment review" and stops.
>
> **9:20pm — a question with no answer.** A different customer asks whether the set is oven-safe. That
> is not in the FAQ. LUYAGENT does not guess. It flags the conversation for the owner.
>
> **7:30am — the owner opens the dashboard.** Three orders waiting for payment review, one question
> waiting for a reply. She checks each screenshot against her bank, confirms two, rejects one where the
> amount is short, and answers the oven question. The two confirmed orders produce PDF receipts and hand
> back to her for delivery.

## What the system did and did not do

| Did | Did not |
|---|---|
| Answered from the real catalogue and the real FAQ | Confirm any payment |
| Held stock, address, payment proof and status on one order | Guess an answer it did not have |
| Flagged what it could not answer | Handle the short-payment conversation |
| Produced receipts after confirmation | Move customer data off the shop's computer |

## The point

> The shop was answering customers for five hours after it closed. The owner still made every decision
> that involved money — she just made them all at 7:30am instead of at 9pm.

**CTA:** See how LUYAGENT works → `/luyagent/`

---
---

# 2. KhmerADV — One campaign, four brands in the workspace, nothing crossed

**Tone: technical.** **Title:** `Worked example: a campaign through the gate | KhmerADV`

## The situation

> An agency runs four client brands. A hotel launch campaign has to reach Facebook, Instagram and
> Telegram this week. Three other campaigns are live in the same workspace. The failure everyone fears
> is the wrong logo on the wrong client's post.

## The run

> **Brief.** The hotel launch campaign is selected. Its brand rules and reference imagery are scoped to
> that campaign — the other three brands' assets are not reachable from this run. There is no shared
> global pool to pull the wrong logo from.
>
> **Copy and art direction.** Campaign copy is generated from the brief and the campaign's own rules,
> Khmer-first for the Khmer-language channels. Art direction is set from the campaign's references.
>
> **Image production.** Imagery is generated locally.
>
> **Brand composition.** The approved brand treatment is composed onto the image. The run's stage
> indicator moves to "Brand — in review".
>
> **The gate.** The run stops. It does not publish. A campaign owner opens the composition and either
> approves it, rejects it or sends it back. This step cannot be switched off.
>
> **Publishing.** Facebook, Instagram and Telegram are enabled — their accounts have the permissions,
> and platform approval is in place. LinkedIn shows "in review" and does not publish. TikTok is not
> enabled: it is awaiting platform review, so the workspace shows it as a permission check rather than
> pretending it will work.
>
> **A network timeout.** The Instagram publish times out mid-request. The retry is connection-scoped
> and bounded, and the attempt is recorded — it does not produce a second identical live post.
>
> **A correction.** A price in the Facebook caption is wrong. The post is corrected through the
> workflow, and the correction is kept in the event history.

## What the operator could see the whole time

> Which stage each of the four campaigns was in. Which channels were enabled versus awaiting
> permission. Who approved the composition. What was retried, and what was corrected after publishing.

## The point

> The value is not that content was produced. It is that the run stopped where it was supposed to, the
> client brands could not touch each other, an unpermissioned channel did not silently fail, and a
> timeout did not become two live posts.

**CTA:** See how KhmerADV works → `/khmeradv/`

---
---

# 3. Hermes Post — A Sunday hour, a week of posts

**Tone: simple.** **Title:** `Worked example: one week in one sitting | Hermes Post`

## The situation

> A café owner knows she should post regularly. It keeps slipping, because it means writing four
> different versions of the same thing and finding a picture, and that eats a morning.

## The hour

> **She brings five things.** A new weekend menu, a supplier story, a public holiday note, a customer
> tip and one open slot.
>
> **One idea, four versions.** The weekend menu becomes a Facebook post, an Instagram caption, a
> LinkedIn note and a Telegram message. Each written for that channel, all from the one idea.
>
> **She rewrites two of them.** The Instagram caption is too formal. She fixes it. That correction is
> kept and shows up in how later drafts are written.
>
> **Images.** Each post gets a prepared image in the format she picks. She regenerates one she does not
> like.
>
> **She approves.** Every post, one at a time. Nothing is scheduled that she has not read.
>
> **Thursday, on her phone.** The customer tip draft arrives in Telegram. She reads it between orders,
> changes one word and approves it there.
>
> **The open slot.** Wednesday stays empty on purpose. The calendar shows it as available rather than
> filling it with something she did not ask for.
>
> **One post goes somewhere it does not connect to.** She exports the supplier story as Markdown and
> posts it manually.

## What she kept

> Her voice, because she approved and corrected every line. Her calendar, including the deliberate gap.
> Her content, because export is always there.

## The point

> Not "AI wrote her posts". She wrote a week of posts in an hour instead of a morning, and every one of
> them still sounds like her, because she read every one before it counted.

**CTA:** See how Hermes Post works → `/hermes-post/`

---
---

# 4. KramOS — A finding somebody had to defend

**Tone: technical.** **Title:** `Worked example: an evidence-linked finding | KramOS`

## The situation

> A garment factory's compliance manager keeps operational evidence across scanned licences, supplier
> invoice PDFs, customs declarations and Office files, in Khmer, English and Chinese. When an external
> auditor challenges a finding, reconstructing where it came from takes hours.

## One document through the pipeline

> **Intake.** A batch of month-end documents is taken in as a folder.
>
> **OCR and script detection.** Processing runs locally. Khmer, English and Chinese are detected across
> PDFs, images and Office formats. OCR quality is recorded per document rather than assumed — one poorly
> scanned licence is flagged as low confidence instead of being read badly and passed on quietly.
>
> **Classification and routing.** Each document is identified by type and routed to the department that
> owns it. The company licence renewal goes to Corporate; the customs declaration goes to
> Import/Export; supplier invoices go to Finance.
>
> **Deterministic checks.** The department's verified rule set runs. Rules, not inference. An expiry
> rule fires on the licence renewal.
>
> **Evidence binding.** The finding cannot be stored without its source. It carries the document, the
> specific page and the rule applied.
>
> **Cross-document controls.** Across the batch, a supplier invoice appears twice with the same number.
> Duplicate and sequence controls catch it at the set level — not something a per-file check would find.
>
> **The human decision.** A named reviewer works the queue. The expiry finding is correct: resolved. The
> duplicate invoice is a re-submission the supplier was asked for: overridden, **with a recorded
> reason**. The low-confidence scan is sent back for a better copy.
>
> **Audit trail and export.** The findings, the evidence links, the reviewer, the actions and the
> override reason export together.

## Three weeks later, the challenge

> The auditor questions the customs finding. The compliance manager opens it: the document, the page,
> the rule that fired, who reviewed it, when, and what they decided. The override on the duplicate
> invoice is there too — including the reason it was overridden.
>
> The disagreement is part of the record, not missing from it.

## What KramOS did not do

> It did not decide whether the factory is compliant. It did not guarantee an audit outcome. It did not
> generate a finding without evidence, and it did not overwrite the reviewer. Qualified people remained
> responsible for the conclusions throughout — which is the only way the record is worth anything.

## The point

> The product is not that documents were read. It is that three weeks later, every finding could still
> show its source, and every human decision still had its reason attached.

**CTA:** See how KramOS works → `/kramos/`

---
---

# 5. `/work/` index page

**Heading:** Four workflows, start to finish.

> These are representative walkthroughs — how each system is designed to handle a real situation, using
> what it does today. They are not customer accounts and contain no measured results.

| | |
|---|---|
| **An evening of orders nobody was awake for** | A Telegram shop keeps selling after closing. The owner still approves every payment. → LUYAGENT |
| **One campaign, four brands, nothing crossed** | A campaign reaches three channels through a structural approval gate. → KhmerADV |
| **A Sunday hour, a week of posts** | Five ideas become an approved, scheduled week — in the owner's voice. → Hermes Post |
| **A finding somebody had to defend** | An expiry finding still shows its source three weeks later. → KramOS |

---

## Implementation checklist

- [ ] Add `work` index + four sub-pages to `vite.config.js` rollup inputs and create their `index.html` files
- [ ] Standing "Representative workflow" label at the top of **every** one of these pages
- [ ] Word "case study" appears nowhere — page titles, nav, links or metadata
- [ ] No numbers anywhere in the rendered copy that are not scene-setting times of day
- [ ] Link each from its product page and from home Section 02
- [ ] Add to `sitemap.xml`
- [ ] **Revisit once there are real customers** — a genuine case study with a name and measured results
      replaces the matching worked example, and it will outperform it by a wide margin
