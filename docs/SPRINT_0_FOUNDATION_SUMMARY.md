# Sprint 0 Foundation Summary — NEXS PPF

Status: Foundation branch only. Not deployed to production.

## Source of Truth Used
- Latest user instruction in Telegram on 2026-05-14.
- Attached document `NEXS_Sprint0_Decision_Lock_v5_2-1.docx`, extracted to project incoming text for review.
- Existing project registry and PROJECT.md for nexsppf-web.
- Existing locked redesign prompt under `incoming/nexsppf-zip-20260510-new-design/extracted/uploads/nexsppf-redesign-prompt.md`.

## Scope Completed
1. Next.js / React / TypeScript foundation preserved and updated.
2. Tailwind CSS v4 foundation added via `@import "tailwindcss"` and `@theme` tokens in `src/app/globals.css`.
3. Design token module added in `src/lib/design-tokens.ts`.
4. Sanity Studio foundation added at `/studio/[[...tool]]` with root `sanity.config.ts` and `sanity.cli.ts`.
5. CMS schema foundation added under `sanity/schemas/`, including pages, products, media, FAQ, blog/resources, leads, route config, and footer/legal config.
6. Product seed/config catalog added for the 12 locked film options under `sanity/seed/productCatalog.ts`.
7. Base layout/header/footer/navigation components added and wired through `src/app/layout.tsx`.
8. Media/image pipeline helper added in `src/lib/media-pipeline.ts`.
9. GitHub Actions CI skeleton added in `.github/workflows/ci.yml`.
10. Foundation tests added for brand guardrails, product catalog, and Sanity schema config.

## Repo Structure Added / Updated
- `.github/workflows/ci.yml`
- `sanity.config.ts`
- `sanity.cli.ts`
- `sanity/schemas/`
- `sanity/lib/client.ts`
- `sanity/lib/queries.ts`
- `sanity/seed/productCatalog.ts`
- `src/app/studio/[[...tool]]/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/warranty-policy/page.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Navigation.tsx`
- `src/components/layout/Footer.tsx`
- `src/content/navigation.ts`
- `src/lib/design-tokens.ts`
- `src/lib/media-pipeline.ts`
- `tests/brand-guardrails.test.ts`
- `tests/product-catalog.test.ts`
- `tests/sanity-schema-config.test.ts`

## Installed / Updated Dependencies
Runtime:
- `next@16.2.6`
- `react`
- `react-dom`
- `next-sanity`
- `sanity`
- `@sanity/image-url`
- Existing runtime deps preserved: `bcryptjs`, `drizzle-orm`, `pg`, `sharp`, `zod`

Dev:
- `tailwindcss`
- `@tailwindcss/postcss`
- Existing dev deps preserved: `typescript`, `vitest`, `eslint`, `tsx`, type packages

Security/audit note:
- Added npm override for `js-yaml` to resolve Sanity CLI transitive audit issue.
- `npm audit --audit-level=moderate` passed with 0 vulnerabilities after updates.

Sanity schema list:
- siteSettings
- navigation
- page
- hero
- productCategory
- productOption
- imageAsset
- faq
- resourcePost
- leadForm
- routeConfig
- footerLegal

## Route List
Existing routes preserved:
- `/`
- `/products`
- `/warranty`
- `/r/[serial]`
- `/support/warranty`
- `/support/inspection`
- `/contact`
- `/login`
- `/dealer`
- `/admin`
- `/preview`
- `/preview-redesign`
- `/preview-redesign/products`
- `/preview-redesign/warranty`
- `/preview-redesign/dealer`
- `/preview-redesign/contact`

Sprint 0 foundation routes added:
- `/studio/[[...tool]]`
- `/privacy`
- `/warranty-policy`

## Component List
- `Header`
- `Navigation`
- `Footer`

## Product Structure Seeded
Clear PPF:
- Begin
- Prime
- Pro
- Ultimate

Matte PPF:
- Matte Prime
- Matte Pro
- Matte Ultimate

Color PPF:
- Color Begin
- Color Prime
- Color Pro
- Color Ultimate
- Ultimate Carbon Fiber

Total: 12 film options.

## Verification Results
Commands run successfully:
- `npm test -- --run` → 21 test files passed, 125 tests passed
- `npm run check:content` → passed
- `npm run typecheck` → passed
- `npm run lint` → passed
- `npm run build` → passed, Next.js 16.2.6
- `npm audit --audit-level=moderate` → 0 vulnerabilities

## Missing Decisions Required Before Sprint 1
1. Sanity project ID, dataset, token policy, and Studio access roles.
2. Final form backend choice: internal API, Sanity write endpoint, CRM, or third-party form service.
3. Production image/CDN policy: Sanity CDN only, Cloudflare Images, S3/R2, or hybrid.
4. Which AI render assets are approved for launch and their usage rights.
5. Final legal text for Privacy Policy and Warranty Policy.
6. Whether all 12 film options should be public-facing immediately, or some should remain hidden until approved.
7. Approved warranty years/details for Matte and Color variants if different from seed defaults.
8. Sprint 1 page priority: homepage, products, warranty, dealer, contact, or CMS wiring first.

## Guardrails
- No pricing added.
- “Shine and Shield” remains prohibited by tests/content guardrails.
- Brand direction uses white/silver/light-gray/black with small red accents.
- Foundation is CMS/config-ready; final page content is intentionally not built in Sprint 0.
