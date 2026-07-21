# Urban Explorer Labs Website

React + Vite company website with a web-optimized GLB exported from the original Urban Explorer Blender project.

## Run

```powershell
Set-Location -LiteralPath "C:\Users\ASUS\Desktop\Claude folder\company-website"
npm.cmd install
npm.cmd run dev
```

Open `http://127.0.0.1:4173`.

## Verify

```powershell
Set-Location -LiteralPath "C:\Users\ASUS\Desktop\Claude folder\company-website"
npm.cmd run lint
npm.cmd run build
```

## Model Source

- Original scene: `E:\logo JC\logo_FoamINTRO.blend` — never modified.
- Temporary export copy: `C:\tmp\urban-explorer-logo-export.blend`.
- Website model: `public\models\urban-explorer-logo.glb`.
- Exported objects: `Curve.001`, `Curve.002`, `Curve.003`, `Curve.004`, `Curve.005`.
- The old figure/hand mesh (`Curve.007`) is intentionally excluded from the website mark.
- Excluded: FLIP fluid simulation, domains, debug meshes, Suzanne, camera, lights, and laser/text element.

## Lead Form

The form currently saves the request to browser `localStorage`. Connect an approved email address, CRM, Telegram bot, or local API before public deployment.
