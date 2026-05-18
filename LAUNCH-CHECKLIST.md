# NEXS Launch Checklist

Tracks remaining items before production launch. Mirrors `NEXS_Development_Backlog_Roadmap_v5_2.xlsx::Launch Checklist`.

## ✅ Sprint 1–5 Complete

### Phase 1 — Foundation Realignment
- [x] Design tokens v4 applied (`nexs_design_tokens_v4_0`)
- [x] White Apple-style canvas; dark only for quote/warranty card
- [x] Brand descriptor + campaign in Nav and Footer
- [x] Hero copy EN/TH from Copy Lock v1.2
- [x] Fonts: Inter + Noto Sans Thai + IBM Plex Sans Thai
- [x] All "สอบถามราคา" → "ขอใบเสนอราคา"
- [x] Audit: `npm run audit` passes

### Phase 2 — Product Model 4→12
- [x] `src/data/brand.js` PRODUCTS array (Clear 4 / Matte 3 / Color 5)
- [x] Warranty text "Warranty up to 10 years" placeholder
- [x] Comparison rows use public specs only
- [x] Stat strip: 40+ Countries / up to 10 Years / 12 Film Options / UV Protection

### Phase 3 — Missing Pages
- [x] `/clear-ppf` — 4-tier hero, comparison, benefits, install detail
- [x] `/matte-ppf` — 3-tier hero, comparison
- [x] `/color-ppf` — 5-tier hero, swatch gallery, carbon detail
- [x] `/technology` — 4-layer stack + 6 benefit cards + quote block
- [x] `/compare` — cross-category comparison with tab switcher
- [x] `/about-nexs` — brand story + NEXS Standard (5 cards incl. Digital Warranty)
- [x] `/faq` — accordion FAQ from FAQ_PUBLIC
- [x] `/for-dealers` — DealerPage refactored with 6 benefit cards

### Phase 4 — Warranty Integration
- [x] Warranty link in Nav (CTA button) + Footer Support
- [x] Digital Warranty added as 5th NEXS Standard card on /about-nexs
- [x] DigitalCardMock updated: Warranty up to 10 years, VERIFIED · NEXSPPF.COM

### Phase 5 — Sanity CMS Schemas (READY for deploy)
- [x] 11 schemas under `/sanity/schemas/`
- [x] No price fields in `product` or `productSpec`
- [x] WarrantyRecord includes PDPA masking note
- [x] Asset schema mapped to Asset Tracker IDs

### Phase 6 — Asset Pipeline
- [x] `src/data/assets/registry.js` — 30+ Asset IDs registered
- [x] `<ImgPh assetId="HOME-001">` swaps placeholder → `<img>` automatically when `src` set
- [x] Alt text required + present on all P0 assets

### Phase 7 — Forms (Lead capture)
- [x] ContactForm routes through postLead() → console + dataLayer push
- [x] QuoteRequestForm with 12-product selector
- [x] FindInstallerForm
- [x] All forms emit `lead_submit_*` analytics events

### Phase 8 — SEO + Analytics + Launch QA
- [x] Per-route metadata (`src/data/seo.js`)
- [x] useSEO hook sets title/description/canonical on route change
- [x] JSON-LD Organization schema injected at mount
- [x] FAQ schema generator (`faqSchema()`)
- [x] sitemap.xml + robots.txt in /public
- [x] GA4 event taxonomy: page_view, cta_click, lead_submit_*
- [x] Audit scripts in package.json (`npm run audit`)

---

## ⏳ Remaining work before production launch (external)

### Inputs needed from project lead
- [ ] **Real LINE OA URL** (currently shows handle only)
- [ ] **Facebook / IG / TikTok / YouTube URLs**
- [ ] **Email/domain** (replaces `dealer@nexsppf.com` placeholder)
- [ ] **Real phone number** for Contact page
- [ ] **Address / showroom location**
- [ ] **Confirmed warranty years per tier** (replace "up to 10 years" placeholder)
- [ ] **Hosting provider + domain DNS access**
- [ ] **GA4 / Meta Pixel / TikTok Pixel account IDs**
- [ ] **Bilingual depth decision** (Thai-primary vs full bilingual)

### Sanity workspace setup
- [ ] `npm create sanity@latest` — new project + dataset
- [ ] Copy `/sanity/schemas/*` into Sanity Studio
- [ ] Seed 12 products + FAQs + assets
- [ ] Add `VITE_SANITY_PROJECT_ID` + `VITE_SANITY_DATASET` env vars
- [ ] Wire `src/data/brand.js` to fetch from Sanity (replace inline arrays)

### Asset production (per Asset Tracker v3.1)
- [ ] Produce 28 P0 AI renders → set `src` in `src/data/assets/registry.js`
- [ ] Produce 45 P1 assets
- [ ] Setup CDN (WebP/AVIF) — Vercel/Cloudinary/Sanity Image Pipeline
- [ ] Each image: desktop crop + mobile crop variants

### Lead routing (Sprint 4 stub → production)
- [ ] Set up `VITE_LEAD_ENDPOINT` env var
- [ ] Replace `console.log` in `lead-forms.jsx::postLead()` with `fetch(endpoint)`
- [ ] Connect to nexsppf CRM/Google Sheet/webhook
- [ ] Anti-spam (reCAPTCHA / honeypot / hCaptcha)

### Routing upgrade (recommended for SEO)
- [ ] Migrate from hash routing → history routing (react-router or TanStack Router)
- [ ] Server-side or SPA fallback for `/clear-ppf` etc.
- [ ] Update sitemap.xml URLs from `/#clear-ppf` → `/clear-ppf`

### Final QA
- [ ] `npm run audit` (no pricing leak)
- [ ] No-OEM-logos check on all rendered assets
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95
- [ ] Mobile crops verified at 390px / 768px / 1440px
- [ ] Form smoke tests: contact / quote / dealer / installer / warranty support / inspection
- [ ] Browser matrix: Safari iOS / Chrome Android / Edge / Firefox desktop
- [ ] PDPA consent enforcement on every form
