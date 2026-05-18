# NEXS Sanity Studio

Sanity content models for the NEXS Paint Protection Film website.

## Setup (when Sanity workspace is ready)

```bash
npm create sanity@latest -- --project <id> --dataset production --output-path sanity-studio
# copy /sanity/schemas/* into sanity-studio/schemas/
```

In `sanity.config.js`:

```js
import { schemaTypes } from './schemas';
export default defineConfig({ /* ... */ schema: { types: schemaTypes } });
```

## Document types

| Type | Purpose | Public/Private |
|---|---|---|
| `page` | Editable marketing pages | Public |
| `productCategory` | Clear / Matte / Color grouping | Public |
| `product` | 12 public film options | Public (NO PRICE FIELDS) |
| `productSpec` | Public comparison rows | Public |
| `faq` | Schema-ready Q&A | Public |
| `asset` | Images, AI renders, alt text | Public |
| `blogPost` | Future articles | Public optional |
| `lead` | Contact / Quote / Installer form submissions | **Private** |
| `dealerApplication` | B2B dealer leads | **Private** |
| `warrantyRecord` | Digital Warranty Card records | Mixed (public read with PDPA masking) |
| `installerLocation` | Find Installer feature | Public optional |

## Hard rules

1. **No public pricing field anywhere in `product` or `productSpec`.**
2. All forms route to `nexsppf` channel (see Sprint 0 Decision Lock v5.2).
3. Alt text is required on all `asset` documents.
4. `warrantyRecord` PDPA: mask phone + license plate on public-facing API.

## Migration plan

Phase 5.1 — initialize Sanity workspace, dataset `production`.
Phase 5.2 — seed all 12 products from `src/data/brand.js::PRODUCTS`.
Phase 5.3 — seed FAQs and Asset placeholders (HOME-001..CON-003) from
            `NEXS_Image_Asset_Tracker_v3_1_AI_Render.xlsx` Asset Tracker sheet.
Phase 5.4 — wire `src/data/brand.js` exports to fetch from Sanity instead.
Phase 5.5 — admin/dealer login → Sanity auth (or pluggable auth provider).
