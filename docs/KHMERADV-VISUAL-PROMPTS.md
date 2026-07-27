# KhmerADV visual prompts

## Shared visual language

Use the same visual system for every asset:

- premium isometric 3D operational diorama;
- electric cobalt-blue structures, cyan light, polished gold rails and edges;
- small green status lights for completed or approved actions;
- physically based materials, soft studio lighting, realistic reflections;
- isolated composition on pure black `#000000`, generous empty border;
- no human faces, no brand logos, no platform logos, no readable text;
- one logical operational idea per image.

### Shared negative prompt

```text
letters, words, captions, readable text, typography, watermark, signature, logo, social media logo, random symbols, deformed objects, duplicate objects, floating disconnected parts, clutter, excessive neon, purple-dominant palette, cartoon, flat vector art, low-poly, blurry, grain, chromatic aberration, harsh bloom, cropped object, cut-off edges, grey background, gradient background
```

## 01 — Keep brands separated

### Flux image prompt

```text
Premium isometric 3D operational diorama representing strict separation between agency clients. A central electric cobalt-blue campaign control hub connects through three independent polished-gold rails to three clearly separated transparent glass brand vaults. Each vault contains a different abstract asset kit: color swatches, image cards, reference folders and channel controls, but no readable text and no logos. Gold security dividers prevent assets from crossing between vaults. One small green status light on each vault confirms isolation. Blue, cyan and gold palette, physically based materials, realistic glass, subtle studio reflections, precise clean geometry, high-end enterprise automation aesthetic, centered single composition, pure black #000000 background, generous empty margin, no floor, no people, no text, 1:1 square.
```

Logical meaning: each client keeps independent rules, references, assets and channels.

## 02 — See the production pipeline

### Flux image prompt

```text
Premium isometric 3D production pipeline diorama for an agency content operation. A cobalt-blue and polished-gold conveyor moves one campaign package through six distinct connected machines: document intake, creative direction controls, image-generation chamber, brand-composition frame, human approval console and publishing gateway. The first three stations show green completed lights, the brand station shows a warm amber review light, and the final two stations are waiting with soft blue lights. Every station is physically connected in one visible sequence with no branching ambiguity. Blue, cyan, gold and restrained green accents, realistic metal and translucent glass, soft studio lighting, elegant enterprise automation aesthetic, centered isolated composition on pure black #000000, generous border, no readable text, no logos, no people, 1:1 square.
```

Logical meaning: the team can see exactly where a campaign is complete, blocked or waiting.

## 03 — Approve before publishing

### Flux image prompt

```text
Premium isometric 3D approval-gate diorama for controlled media publishing. On the left, a cobalt-blue campaign production machine presents one finished branded content card to a separate polished-gold human approval console in the center. The console has one large physical confirmation control, an amber review indicator and a clear green approved indicator. Only after approval, a gold security gate opens toward several abstract channel delivery nodes on the right. The content cannot bypass the gate. Show accountability, review and controlled release through the physical architecture, not through text. Electric blue, cyan, polished gold and green approval light, realistic metal and glass, high-end enterprise automation aesthetic, centered on pure black #000000, generous empty margin, no readable text, no logos, no faces, 1:1 square.
```

Logical meaning: nothing reaches an enabled public channel before a person approves it.

## Controlled workflow — explainer image

### Flux image prompt

```text
Wide premium isometric 3D explainer diorama showing one controlled KhmerADV campaign path from left to right. Seven connected cobalt-blue platforms with polished-gold rails form one continuous production line. Platform 1 receives a campaign brief folder. Platform 2 combines a copy document with an art-direction board. Platform 3 contains an image-production chamber. Platform 4 places the visual inside a precise brand-composition frame. Platform 5 is a separate human approval console with an amber review light and green confirmation control. Platform 6 is a secure publishing gateway feeding several abstract channel nodes. Platform 7 contains delivery monitoring, correction tools and a return rail that loops only the rejected item back to the appropriate production station. Make every stage visually distinct and logically connected. Blue, cyan, gold and restrained green palette, realistic PBR materials, soft studio light, no floating objects, no readable text, no logos, no people, isolated on pure black #000000, generous margins, 16:9 horizontal composition.
```

## Controlled workflow — animated explainer

### Image-to-video prompt

```text
Create an 8-second premium isometric 3D operational animation from the supplied KhmerADV workflow image. Keep the camera locked, the framing unchanged and the black background perfectly stable. Animate one campaign package moving smoothly from left to right through all seven connected stages. At campaign brief intake, a folder enters and a small blue light activates. At copy and art direction, document and reference cards align cleanly. At image production, a restrained cyan light scans the image panel. At brand composition, gold guides close around the visual and align it precisely. At human approval, motion pauses briefly, the amber review light pulses once, then a physical confirmation control depresses and turns green. The security gate opens only after approval. The approved package travels to the channel delivery nodes, which illuminate one by one. At delivery and correction, a monitoring light confirms success while one small correction token briefly follows the return rail to demonstrate controlled revision. Subtle machine movement, realistic weight and easing, no camera orbit, no zoom, no cuts, no object deformation, no new objects, no text generation, no logos, no flicker, no morphing. End on a clean stable frame suitable for a seamless website loop.
```

Recommended starting point: 16:9, 6–8 seconds, 16–24 fps, low-to-medium motion strength.

## Production pipeline dashboard — icon

### Flux image prompt

```text
Premium isometric 3D icon representing a live agency production pipeline. A compact cobalt-blue command board contains six physical status modules arranged in two precise rows: copy document, art-direction compass, image frame, brand alignment guides, human approval control and publishing gateway. Thin polished-gold tracks connect the modules in sequence. The first three modules glow green for completed, the brand module glows amber for in review, and approval and publish glow soft blue for waiting. Use recognizable objects and status lights instead of words or numbers. Realistic PBR metal and translucent glass, cyan edge light, polished gold details, clean enterprise automation aesthetic, centered isolated object on pure black #000000, generous empty margin, no readable text, no logos, no people, 1:1 square.
```

## Production pipeline dashboard — animation

### Image-to-video prompt

```text
Create a restrained 6-second isometric 3D status animation from the supplied production-pipeline icon. Lock the camera and preserve the exact composition. A thin cyan pulse travels once along the gold connection track from copy to art direction, image, brand, approval and publish. Completed modules remain steady green. The brand module changes from amber pulse to solid green. The approval control then depresses once with realistic mechanical weight, changes from blue to green, and releases the publishing gate. The publish module lights green last. Add only subtle reflections and tiny mechanical movement; no camera movement, no spinning, no dramatic glow, no new objects, no text, no logos, no morphing, no flicker. Finish with all six modules stable and clearly readable as one completed pipeline, suitable for a seamless website loop.
```

Recommended starting point: 1:1, 5–6 seconds, 16–24 fps, low motion strength.

## Flux starting settings

- Resolution: `1024×1024` for icons; `1536×864` or `1344×768` for the workflow.
- Steps: `28–36`.
- Guidance: `4.5–6`.
- Generate each concept separately; do not request all icons in one image.
- Remove the pure-black background after selection and export as transparent PNG/WebP.
