# Product Page Content — All Four Systems

Read `00-CONTENT-RULES.md` first. Band A = shipped, stated as fact. Band B = `Planned`, must render
in its own labelled block. Khmer lines are **drafts pending native review**.

Existing sections stay as they are unless marked REPLACE. Everything else is additive.

---
---

# 1. LUYAGENT — `/luyagent/`

**Tone: simple.** Short sentences. Shop-owner language. No jargon. Say "payment proof", not
"payment evidence artefact". Say "your computer", not "local deployment target".

## 1.1 Hero — REPLACE `intro`

> LUYAGENT answers your customers on Telegram while you are busy. It shows your products, builds the
> cart, takes the delivery address and collects the payment proof. Then it stops and waits for you.
> You confirm the payment. You handle the hard conversations. Your products, orders and customer
> details stay on your own computer.

### Khmer hero line — `km.hero`
Place directly under the English intro. `<span lang="km">`.

> ការសន្ទនាជាមួយអតិថិជនទទួលបានចម្លើយ សូម្បីពេលអ្នកមិននៅ។ ប៉ុន្តែអ្នកលក់ជាអ្នកបញ្ជាក់ការទូទាត់ជានិច្ច។

*Gloss: "Customer conversations get answered, even when you are away. But the seller always confirms
the payment."* — ⚠️ native review required.

## 1.2 Who it's for — `fit`

**LUYAGENT fits you if:**
- You already sell on Telegram and answer the same questions every day.
- You lose orders because you cannot reply fast enough at night or on weekends.
- You take payment by cash on delivery, or by ABA, Wing or ACLEDA transfer.
- You want the software to do the repetitive part, but you want to approve the money yourself.
- You have one computer that can stay on.

**LUYAGENT is not for you if:**
- You need it to confirm payments without you looking. It will not do that, by design.
- You sell mainly on Facebook, Instagram or a web shop. Telegram is the finished channel today.
- You need many staff accounts with different permissions.
- You cannot leave a computer running, and you do not want it hosted.

## 1.3 Use cases — `useCases`

**The shop that closes at 6pm**
Customers message at 9pm. They see the catalogue, ask about stock, build a cart and send the transfer
screenshot. In the morning you open the dashboard, check four payment proofs, and confirm. Nothing
waited on you overnight.

**The seller with one product line and many questions**
"Do you have size M?" "How much is delivery to Toul Kork?" "Is this still available?" The same
answers, all day. LUYAGENT answers from your catalogue and your FAQ, in Khmer or English, and only
brings you the questions it has not been given an answer for.

**The shop that keeps losing track of an order**
A chat, a screenshot, an address in a different message, a delivery arranged by phone. LUYAGENT
keeps the conversation, the cart, the address, the payment proof and the receipt on one order record,
so nothing has to be reconstructed later.

**The seller who needs a real receipt**
Once you confirm, LUYAGENT produces a PDF receipt and hands the conversation back to you for delivery.

## 1.4 What it does not do — `boundaries`

Keep this section. It is the most persuasive thing on the page.

- **It never confirms a payment.** It collects the proof and shows it to you. You approve or reject.
- **It never invents stock.** If the product is not in your catalogue, it says so instead of guessing.
- **It does not take over a difficult conversation.** Complaints, refunds and disputes go straight to you.
- **It does not move your customer data anywhere.** Your catalogue, orders and customer records stay
  in your installation.
- **It does not replace your delivery process.** It hands you a confirmed order; delivery stays yours.

## 1.5 What you need to run it — `requirements`

**Runs on:** your own Windows computer.

**You need:**
- A Telegram account for your shop.
- Your product list — a spreadsheet is enough to start.
- Your payment methods: cash on delivery, and/or ABA, Wing or ACLEDA.
- A computer that can stay on while you want the shop to answer.

**Optional:**
- Assisted replies for questions outside your FAQ. This needs a configured model connection.
  LUYAGENT works without it — it simply passes those questions to you instead.

## 1.6 Data & deployment — `dataHandling` — REPLACE the one-line `privacy`

> Your catalogue, your orders, your customers and your payment records are stored in the LUYAGENT
> installation on your machine, in a local database file. Selling happens over Telegram, so message
> delivery uses Telegram. If you switch on assisted replies, those specific questions are sent to the
> model connection you configure — everything else stays local. There is no Urban Explorer Labs
> server holding your business data.

### Khmer boundary line — `km.boundary`

> ទិន្នន័យអតិថិជន និងការបញ្ជាទិញរបស់អ្នក ស្ថិតនៅលើកុំព្យូទ័ររបស់អ្នក។

*Gloss: "Your customer and order data stays on your computer."* — ⚠️ native review required.

## 1.7 The pilot, week by week — `pilotPlan`

| Week | | |
|---|---|---|
| **1** | **We set up your shop** | We load your product list, your prices and your stock. We connect your Telegram and your payment methods. |
| **2** | **We teach it your answers** | Your real questions from the last month become the FAQ. We agree what it answers and what it must pass to you. |
| **3** | **You run it live, watching** | Real customers, real orders. You confirm every payment. We watch what it gets wrong and fix it. |
| **4** | **We check the numbers together** | How many orders it handled, what it passed to you, what it got wrong. Then you decide whether to keep going. |

## 1.8 Expanded FAQ — extend `faqs`

Keep the three existing. Add:

- **Does it confirm payments automatically?** No. It shows you the payment proof. You approve or reject.
- **Will it answer in Khmer?** Yes. Khmer and English customer journeys are both supported.
- **What if it does not know the answer?** It passes the question to you rather than guessing.
- **Can I take over a conversation?** Yes, at any point. Handover is built in and is the expected way to handle anything sensitive.
- **What happens if my internet drops?** The installation and your data stay on your machine. Telegram messages resume when the connection returns.
- **Do I need to know anything technical?** No. You need a product list and a computer that stays on. We do the setup.
- **Can I import my products from a spreadsheet?** Yes. Spreadsheet import is how most sellers start.
- **What about Facebook or Instagram selling?** Telegram is the finished channel today. Other channels are assessed case by case — see Planned below.
- **Who can see my customers' data?** Only you. It is stored in your installation, not on our servers.
- **What if I want to stop?** Your data is in your installation on your machine. It stays there.

## 1.9 Roadmap — Band B — `roadmap`

**Label:** `Planned` — **Note:** "Not available today. Confirm scope during assessment."

- Additional selling channels beyond Telegram
- Multiple staff accounts with separate permissions
- Automated delivery-partner handoff

---
---

# 2. KhmerADV — `/khmeradv/`

**Tone: technical.** The buyer runs an agency. Pipeline stages, permissions, isolation and failure
handling are the selling points. Medium-length sentences. Jargon is fine.

## 2.1 Hero — REPLACE `intro`

> KhmerADV runs multi-brand campaign production as a single controlled pipeline. A brief becomes
> copy, art direction, generated imagery and brand composition, then stops at a human approval gate
> before any enabled channel receives it. Brand rules, visual references and channel credentials are
> scoped per campaign, so client assets cannot bleed across accounts.

## 2.2 Who it's for — `fit`

**KhmerADV fits your team if:**
- You run more than one brand and you have been bitten by assets crossing between them.
- Your production is a queue — copy, art, branding, approval, publish — and you cannot currently see
  where a run is blocked.
- You need every post approved by a named person before it reaches a live channel.
- You publish to several platforms and each has its own account, permission state and approval status.
- You need to correct or remove a published post and record that it happened.

**KhmerADV is not for you if:**
- You want a scheduler. This is a production pipeline with a gate; scheduling is the last step, not the product.
- You want fully unattended publishing. The approval gate is not optional.
- You run a single brand with a single channel — Hermes Post is the correct product.
- You expect every platform to be connected on day one. Channel availability follows account
  permission and platform approval, not our roadmap.

## 2.3 Use cases — `useCases`

**Running four client brands without cross-contamination**
Campaign and brand records hold their own rules, reference imagery and channel settings. A reference
image uploaded for one client is scoped to that campaign. There is no shared global asset pool that
a hurried operator can pull the wrong logo from.

**Finding the blocked run before the client does**
Every campaign shows its production stage: copy, art direction, image, brand composition, approval,
publish. A run stalled at brand composition is visible as a stalled run, not as silence.

**Approval that leaves a record**
A campaign owner reviews the branded composition and approves, rejects or sends it back. The decision
is attached to the run. When the client asks who signed off on the post, there is an answer.

**Correcting a live post**
Supported posts can be corrected or removed after publishing, and the event history keeps what
changed. Retry protection prevents the classic failure where a network timeout produces two identical
live posts.

**Khmer-first output**
Campaign copy is produced for Khmer-language channels rather than translated as an afterthought.

## 2.4 What it does not do — `boundaries`

- **It does not publish without approval.** The gate is structural, not a setting.
- **It does not guarantee a channel will accept a post.** Publishing depends on the platform account,
  its permissions and its current approval status.
- **It does not share brand context between campaigns.** Rules, references and channel settings are
  scoped per campaign by design.
- **It does not write from a hidden house prompt.** Campaign content originates from the brief and the
  campaign's own rules. An empty result stops the run rather than falling back to generic filler.
- **It does not silently retry a publish.** Retries are bounded and recorded.

## 2.5 Architecture & requirements — `requirements`

**Runs as:** a local production workspace with configured external services.

**Local:** image generation, brand composition, the production queue, campaign and brand records,
event history.

**Configured external services:** copy generation, media CDN delivery, and the social platform APIs
for each channel you enable.

**Per channel you must supply:** an account with publishing permission, and — where the platform
requires it — a completed app review. This is the usual reason a channel is not live on day one.

**Control surfaces:** dashboard for production and approval; Telegram for remote approval.

## 2.6 Data & deployment — `dataHandling` — REPLACE `privacy`

> KhmerADV combines local media production with configured external services. Image production and
> brand composition run on your machine. Copy generation, CDN delivery and channel publishing use the
> providers and platform accounts you configure, so campaign copy and finished assets pass through
> those services by necessity. Campaign records, brand rules and reference imagery are held per
> campaign in the local installation. Channel availability is a function of your account permissions
> and each platform's approval state, not of the software.

## 2.7 The pilot, week by week — `pilotPlan`

| Week | | |
|---|---|---|
| **1** | **Scope one brand, one campaign** | We configure the brand rules, reference imagery, approval path and the channels whose permissions are already confirmed. |
| **2** | **Run the pipeline end to end** | A real brief through copy, art direction, image, composition and the approval gate — publishing to a private channel first. |
| **3** | **Enable confirmed public channels** | Only channels whose account permission and platform approval are verified. Retry and correction paths tested deliberately. |
| **4** | **Review the event history** | Where runs stalled, what was rejected at the gate and why, what a second brand would need. Then scope expansion. |

## 2.8 Expanded FAQ — extend `faqs`

Keep the three existing. Add:

- **How are brands kept separate?** Campaign and brand records carry their own rules, references and channel settings. There is no shared asset pool across campaigns.
- **Can it publish without a human?** No. The approval gate is structural.
- **What happens when a publish fails halfway?** Retries are bounded and connection-scoped, and the attempt is recorded. Duplicate live posts are specifically guarded against.
- **Can we remove a post after publishing?** On supported channels, yes — correction and removal are part of the workflow and are recorded.
- **Which channels can we use on day one?** Whichever ones already have a permissioned account and, where required, platform approval. That is assessed before the pilot, not assumed.
- **Does it produce Khmer copy?** Yes — Khmer is a first-class output, not a post-hoc translation.
- **Where does image generation run?** Locally.
- **Can two people work on different campaigns at once?** Campaigns are separated. Concurrent operation and per-user roles are scoped during assessment.
- **What if the generated copy is empty or wrong?** The run stops. It does not substitute default content.
- **How is this different from Hermes Post?** KhmerADV is multi-brand agency operations with a production queue. Hermes Post is one small business, one voice, one calendar.

## 2.9 Roadmap — Band B — `roadmap`

**Label:** `Planned` — **Note:** "Subject to platform approval and account permission. Confirm during assessment."

- TikTok publishing — pending platform review
- Per-user roles and permissions inside a campaign
- Scheduled campaign runs

---
---

# 3. Hermes Post — `/hermes-post/`

**Tone: simple.** Owner-operator language. This is the small sibling of KhmerADV and the copy should
make that obvious and unembarrassing.

## 3.1 Hero — REPLACE `intro`

> Hermes Post turns one idea into a week of posts you actually approve. Write the offer or the
> announcement once. It drafts the versions for each channel, prepares the image, and waits for you
> to say yes. Nothing goes out in your name that you have not read.

## 3.2 Who it's for — `fit`

**Hermes Post fits you if:**
- Posting consistently keeps slipping because it takes a whole morning.
- You rewrite the same message four times for four channels.
- You want to plan a week in one sitting instead of scrambling daily.
- You want to approve everything, ideally from your phone.
- You are one business with one voice — not an agency with clients.

**Hermes Post is not for you if:**
- You manage several client brands. That is KhmerADV.
- You want posts published without reading them first.
- TikTok is your main channel. There is no TikTok publisher.
- You need approval chains with several people signing off.

## 3.3 Use cases — `useCases`

**The Sunday planning hour**
Bring five things worth saying this week. Leave with five approved posts and a schedule.

**One offer, four channels**
A promotion becomes a Facebook post, an Instagram caption, a LinkedIn note and a Telegram message —
each written for that channel, all from one idea, all edited by you before they count.

**Approving from your phone**
Drafts arrive in Telegram. Read, approve or send back, from wherever you are.

**Keeping your voice as it learns**
When you rewrite something, that correction is kept and applied to later drafts. It gets closer to
how you actually write.

**Publishing somewhere it does not connect to**
Export the post as Markdown and paste it wherever you need. Manual export is always available.

## 3.4 What it does not do — `boundaries`

- **It does not post without your approval.**
- **It does not publish to TikTok.** There is no TikTok publisher.
- **It does not pretend to be an agency tool.** It is deliberately simpler than KhmerADV.
- **It does not keep your text private from the model providers.** Drafting uses configured online
  providers — see Data & deployment.
- **It does not lock your content in.** Markdown export is always there.

## 3.5 What you need to run it — `requirements`

**You need:** something to say, and the channel accounts you want to publish to.

**Connected channels:** Facebook, Instagram, LinkedIn and Telegram, each needing an account with
publishing permission.

**Images:** prepared through a ComfyUI or Gemini image workflow, in the format you choose.

**Control:** dashboard, or Telegram as a simple remote for review and approval.

**Always available:** Markdown export, for anywhere it does not publish directly.

## 3.6 Data & deployment — `dataHandling` — REPLACE `privacy`

> Hermes Post uses configured online providers to draft text, so the ideas and drafts you enter are
> sent to those providers. Publishing uses the channel accounts you connect. Your calendar, drafts,
> approvals and corrections are held in your installation. If direct publishing is not appropriate
> for something, export it as Markdown and post it yourself — that path is always open.

## 3.7 The first content week — `pilotPlan`

| Week | | |
|---|---|---|
| **1** | **Bring one week of material** | Offers, announcements, product stories — rough is fine. We connect your channels. |
| **2** | **Draft, correct, approve** | You edit until it sounds like you. Your corrections are kept. |
| **3** | **Schedule and publish** | The approved week goes out. You watch what performs. |
| **4** | **Decide the rhythm** | How long the week actually took, what you kept rewriting, whether it is worth continuing. |

## 3.8 Expanded FAQ — extend `faqs`

Keep the three existing. Add:

- **Will it sound like me?** Not at first. You correct it, and those corrections are kept and reused.
- **Do I have to approve every post?** Yes. That is the design.
- **Can I approve from my phone?** Yes — Telegram works as a remote for review and approval.
- **What if I do not like the image?** Regenerate it, choose a different format, or replace it.
- **Can I use it for a channel it does not connect to?** Yes — export as Markdown and post manually.
- **Is my text private?** No. Drafting uses configured online providers. If that is a problem for a particular post, write it yourself and use the calendar only.
- **How far ahead can I plan?** A practical week or month. It is a working calendar, not a year-long strategy tool.
- **Should I use this or KhmerADV?** One business, one voice — Hermes Post. Several client brands with an approval chain — KhmerADV.

## 3.9 Roadmap — Band B — `roadmap`

**Label:** `Planned` — **Note:** "Not available today."

- TikTok publishing
- More image format presets
- Simple performance view per post

---
---

# 4. KramOS — `/kramos/`

**Tone: technical.** The buyer is an auditor, compliance manager or finance lead. Evidence,
determinism, lineage and accountability are the product. Be precise about what is and is not
guaranteed — the existing disclaimer is an asset, not a weakness.

## 4.1 Hero — REPLACE `intro`

> KramOS reviews operational documents against verified rules and attaches the source to every
> finding — the document, the page, the rule applied. Checks are deterministic, evidence is mandatory
> before a finding is stored, and the decision to accept, correct, resolve or override always belongs
> to a named reviewer. Built for Cambodian operations and designed to run under your control.

### Khmer hero line — `km.hero`

> រាល់ការរកឃើញនីមួយៗ មានឯកសារ និងទំព័រប្រភពភ្ជាប់ជាមួយ។ មនុស្សជាអ្នកសម្រេចចិត្តចុងក្រោយ។

*Gloss: "Every single finding has its source document and page attached. A human makes the final
decision."* — ⚠️ native review required.

## 4.2 Who it's for — `fit`

**KramOS fits your team if:**
- Your evidence is scattered across scans, PDFs, Office files and more than one script.
- Reviewers repeat the same checks with no consistent decision trail.
- You have been asked to justify a finding and could not point at the source page.
- You need overrides to be possible but recorded, with a reason.
- You can run a controlled pilot with a named human reviewer.

**KramOS is not for you if:**
- You want a hosted production SaaS. This is a controlled local pilot today.
- You want a system that decides compliance outcomes. It supports decisions; qualified people make them.
- You want findings generated without supporting evidence. It will not store one.
- You need a guaranteed audit outcome. No software can offer that, and this one says so.

## 4.3 Use cases — `useCases`

**The finding you have to defend**
An expiry rule fires on a licence renewal. The finding carries the document, the specific page and the
rule applied. When it is challenged, the source is one click away rather than a reconstruction.

**Mixed-script intake**
Khmer, English and Chinese appear in the same document set. Script detection and OCR run locally
across PDFs, images and Office files, and classification routes each document to the department that
owns it.

**Department-specific checks**
Tax, audit, customs, logistics, garment, ISO and factory checks are separate rule sets. A customs
declaration is checked as a customs declaration, not against a generic template.

**Catching the duplicate before it is paid**
Cross-document duplicate and sequence controls surface the same invoice submitted twice, or a gap in
a numbered series, across the set rather than within one file.

**Recording the override**
A reviewer disagrees with a finding. They override it, with a recorded reason, and the override stays
in the audit trail. The disagreement itself becomes part of the record.

**Seeing where review time goes**
Analytics across document type, language, OCR quality and department show which intake is actually
costing the team.

## 4.4 What it does not do — `boundaries`

Reinforces the existing disclaimer. Keep both.

- **It does not decide compliance.** Qualified people remain responsible for compliance conclusions.
- **It does not guarantee an audit result.** No claim of that kind is made.
- **It does not store a finding without evidence.** Supporting evidence is mandatory, not encouraged.
- **It does not generate findings from a language model's opinion.** The findings path is deterministic.
- **It does not replace legal or professional judgement.**
- **It does not silently overwrite a reviewer.** Corrections, resolutions and overrides are recorded actions.

## 4.5 How a finding is produced — `requirements` / architecture

For a compliance buyer, *how* the finding is made is the purchase decision. Render this as a numbered
technical block, distinct from the seven-step workflow already on the page.

1. **Secure intake** — files, batches or a watched folder.
2. **OCR and script detection** — Khmer, English and Chinese, processed locally across PDF, image and Office formats.
3. **Classification** — document type identified and routed to the owning department.
4. **Deterministic checks** — the department's verified rule set runs. Rules, not inference.
5. **Evidence binding** — a finding cannot be stored unless the source document, page and applied rule are attached.
6. **Cross-document controls** — duplicate and sequence checks run across the set, not just within a file.
7. **Human decision** — a named reviewer corrects, resolves, ignores or overrides. Overrides require a reason.
8. **Audit trail and export** — the decision, the reason and the evidence stay linked and exportable.

**Deployment:** local processing, tenant isolation, audit trail retained per tenant.

## 4.6 Data & deployment — `dataHandling` — REPLACE `privacy`

> KramOS is positioned as a controlled local pilot. Document processing — OCR, classification and the
> deterministic checks — runs locally, so the documents under review are not sent to an external
> service as part of the review path. Findings, evidence links, reviewer actions and the audit trail
> are held per tenant with isolation between tenants. KramOS supports compliance review; it does not
> replace legal or professional judgement and does not guarantee an audit result.

### Khmer boundary line — `km.boundary`

> ឯកសាររបស់អ្នកត្រូវបានដំណើរការក្នុងប្រព័ន្ធរបស់អ្នកផ្ទាល់។

*Gloss: "Your documents are processed inside your own system."* — ⚠️ native review required.

## 4.7 The controlled pilot, week by week — `pilotPlan`

| Week | | |
|---|---|---|
| **1** | **Choose one document family** | Supplier invoices, licences or customs declarations. We configure that family's verified rules and the department that owns them. |
| **2** | **Intake and baseline** | Real documents through intake, OCR and classification. We measure what the OCR actually handles on your material. |
| **3** | **Findings under review** | Deterministic checks run. A named reviewer works the queue. Every correction and override is recorded. |
| **4** | **Measure before expanding** | Review time, OCR quality by document type, override rate and why. Expansion to a second family is a decision made from that data. |

## 4.8 Expanded FAQ — extend `faqs`

Keep the three existing. Add:

- **Is this production SaaS?** No. The current offer is a controlled local pilot with a human reviewer.
- **Can it invent a finding?** The findings path is deterministic and requires supporting evidence before anything is stored.
- **Can a reviewer override a result?** Yes, with a recorded reason that remains in the audit trail.
- **Which scripts are handled?** Khmer, English and Chinese detection, across PDF, image and Office formats.
- **Which check families exist?** Tax, audit, customs, logistics, garment, ISO and factory.
- **Do documents leave our environment?** Processing runs locally. Documents under review are not sent out as part of the review path.
- **How are two clients kept apart?** Tenant isolation, with the audit trail held per tenant.
- **What happens to a document the OCR reads badly?** Quality is tracked per document and language, and surfaced in analytics rather than hidden.
- **Does it catch the same invoice submitted twice?** Cross-document duplicate and sequence controls run across the set.
- **Does using this make us compliant?** No. It supports evidence collection and controlled review. Qualified people remain responsible for the conclusions.
- **Can we export for an external auditor?** Yes — findings, evidence links and the decision trail export together.

## 4.9 Roadmap — Band B — `roadmap`

**Label:** `In pilot` — **Note:** "The current offer is a controlled local pilot. The items below are
direction, not availability."

- Hosted multi-tenant deployment
- Additional department rule sets beyond the seven current families
- Complaint and dispute handling, and training-record export
- `[CONFIRM]` Khmer OCR accuracy improvements, gated behind a verified-document threshold before
  the model is retrained — *see the note in `00-CONTENT-RULES.md` §1 before publishing this line*

---
---

# 5. Cross-product comparison block

Place on all four product pages, near the bottom. Solves the real problem that KhmerADV and Hermes
Post sound similar, and gives every page an internal link to the other three.

**Heading:** Four systems. Pick the one that matches your operation.

| | Who runs it | Scope | Approval | Where the data sits |
|---|---|---|---|---|
| **LUYAGENT** | A seller | One shop, Telegram | Seller confirms every payment | Your own computer |
| **Hermes Post** | A business owner | One business, one voice | Owner approves every post | Installation + online drafting providers |
| **KhmerADV** | An agency team | Many brands, many channels | Campaign owner approves before publish | Local production + configured services |
| **KramOS** | A compliance reviewer | Document families, by department | Named reviewer decides every finding | Local processing, tenant-isolated |

**Closing line:** Every one of them stops and waits for a person before it does the thing that matters.
