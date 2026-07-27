# LUYAGENT workflow and dashboard prompts

## Shared visual language

- Premium isometric 3D seller-operations system.
- Electric cobalt-blue machinery, polished gold rails and clean white interface surfaces.
- Restrained green for ready, amber for human review and coral-red only for blocking attention.
- Pure black `#000000` background for easy alpha extraction.
- Every object must represent a real stage in the order workflow.
- No readable text, logos, flags, people, decorative clutter or invented payment branding.

## Workflow artwork — improved replacement

### Flux / ComfyUI image prompt

```text
Create a premium wide isometric 3D LUYAGENT seller workflow as one compact continuous tabletop machine, designed to sit directly above a seven-step numbered list on a website. Show exactly seven connected stages from left to right: a Telegram-style conversation terminal represented only by abstract chat bubbles; a catalog and FAQ shelf with product boxes and answer cards; a cart and customer-address station; a payment-choice station with one cash-on-delivery token and one generic bank QR tile; a payment-evidence scanner; a separate seller-confirmation console with an amber human-review control; and a final receipt-and-handoff printer. Join every stage with one clean cobalt-blue conveyor and thin polished-gold rails. Keep the whole machine shallow and horizontally balanced, with no tall object breaking the top edge. Three-quarter isometric view, slight left-to-right perspective, realistic PBR blue metal, brushed gold, translucent glass, soft cyan indicators, restrained green status lights, premium enterprise product visualization. Entire object fully visible with 12 percent empty margin, isolated on pure black #000000, no floor, no environment, no readable text, no logos, no people, no floating objects, 16:9 horizontal composition.
```

### Negative prompt

```text
readable text, letters, captions, logo, Telegram logo, bank logo, payment brand, watermark, people, hands, flags, random icons, duplicate stages, missing stage, disconnected conveyor, floating objects, vertical tower, extreme perspective, fisheye, clutter, purple palette, excessive neon, bloom, fog, floor, room, gradient background, grey background, cropped edges, cut-off machine, deformed cart, unreadable receipt, low resolution, blurry, grain
```

### Composition requirement

The generated object must occupy roughly `80% × 62%` of the canvas. Keep its visual center slightly above the canvas center so it can be placed immediately above the 01–07 list without covering it. Do not bake any rotation into the image; the website applies the subtle rotation.

## Workflow artwork — smooth animation prompt

Use the improved workflow image as the first frame.

```text
Create an 8-second seamless premium isometric 3D operational animation from the supplied LUYAGENT workflow image. Lock the camera and preserve the exact framing, proportions, materials and pure-black background. Animate one order token moving smoothly from left to right through exactly seven stages. First, one abstract customer chat bubble arrives and the conversation terminal activates with a soft blue pulse. Second, one product card slides cleanly from the catalog shelf. Third, the product enters the cart while one address card aligns beneath it. Fourth, the order pauses at the payment-choice station; the cash-on-delivery token and generic QR tile illuminate once without changing shape. Fifth, a narrow cyan scan passes across the payment-evidence card. Sixth, all forward motion pauses at the seller-confirmation console; an amber review light breathes once, the physical human approval control depresses, then the light turns green. Seventh, the approved order travels to the receipt printer and one clean receipt emerges while the handoff indicator activates. Use realistic mechanical weight, smooth ease-in/ease-out, subtle reflections and tiny status-light transitions. No camera movement, no orbit, no zoom, no cuts, no text generation, no new objects, no morphing, no deformation, no flicker, no particle effects. End on the exact stable completed composition and hold long enough for a clean website loop.
```

## Seller Operations dashboard — supporting image prompt

```text
Create a premium isometric 3D visual explanation of a human-controlled seller operations dashboard. On the left, four compact order trays show distinct operational states through color only: amber payment review, amber seller confirmation, blue human handoff and green ready. In the center, a six-stage order pipeline moves one order through conversation, cart, address, payment, confirmation and receipt using physical connected modules. On the right, a separate gold human-control console presents three universal actions through objects rather than words: inspect payment evidence, answer a difficult customer question and update low stock. Make the confirmation gate physically impossible to bypass. Electric cobalt blue, translucent white glass, polished gold, restrained cyan, amber and green indicators, realistic PBR materials, precise enterprise automation aesthetic, balanced wide composition, isolated on pure black #000000, no floor, no readable text, no logos, no people, no floating pieces, 16:9.
```

## Seller Operations dashboard — screenshot-to-video prompt

Use the actual dashboard screenshot as the first frame.

```text
Animate the supplied LUYAGENT Seller Operations dashboard for 8 seconds as a refined live operational interface. Preserve every existing word, number, order ID, tab label, column, card boundary, color and layout exactly. Keep the camera completely locked and the interface perfectly sharp. Begin with a subtle blue activity pulse on Order A-1048. Move a restrained amber highlight from Payment review into the Payment stage of the central order pipeline. Advance one thin progress signal through Conversation, Cart, Address and Payment using smooth 700-millisecond easing. Pause at Confirmation. Make the Payment evidence control on the right lift by two pixels and emit one soft amber border pulse, then return to rest. After a brief human-review pause, change only the relevant status indicator from amber to green and advance the signal to Receipt. Give Order A-1051 one quiet green readiness pulse near the end. Use only opacity, transform and border-light animation with realistic UI timing. No camera pan, no zoom, no parallax, no text changes, no text morphing, no new labels, no reordered elements, no scrolling, no flicker, no glow bloom, no cursor, no hands. Finish on a stable interface frame matching the source screenshot for a seamless loop.
```

## Recommended settings

- Workflow image: Flux, `1536×864` or `1344×768`, low-to-medium guidance.
- Supporting dashboard image: Flux, `1536×864`.
- Video: 8 seconds, 24 fps, image-to-video, low motion strength.
- Camera motion: disabled.
- First/last-frame similarity: high.
- Text preservation or region-lock: maximum when supported.

## Validation

1. Exactly seven workflow stages are visible.
2. Seller confirmation is a separate human-controlled gate.
3. The artwork remains fully inside the canvas with clean black edges.
4. No real payment or messaging logos appear.
5. Dashboard animation does not alter any text or layout.
6. Motion is slow enough to understand and smooth enough to loop.
