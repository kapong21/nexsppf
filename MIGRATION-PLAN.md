# NEXS — Vite → Next.js Migration Plan

> **สถานะ:** Draft รอ user approve ก่อน execute
> **เป้าหมาย:** ย้าย codebase ปัจจุบัน (Vite + React 18 SPA) ไปเป็น Next.js 15 App Router + SSR/SSG เพื่อ SEO และ social sharing
> **เป้าหมาย deploy ปลายทาง:** `nexsppf.com` (Vercel)

---

## 1. Locked Decisions

| # | หัวข้อ | เลือก | เหตุผล |
|---|---|---|---|
| D1 | Framework | **Next.js 15 App Router** | App Router stable, RSC default, ตรงกับ Fluid Compute บน Vercel |
| D2 | URL strategy | **Clean paths** (`/clear-ppf`, `/about`) + redirects จาก hash | SEO + OG sharing — Google ไม่ index fragment |
| D3 | Sanity timing | **Migrate Next.js + wire Sanity พร้อมกัน** | Next.js + ISR + Sanity webhook คือ killer combo สำหรับ marketing site |
| D4 | Migration scope | **All-in:** 9 marketing + warranty + 2 support pages | ตัด tweaks-panel, login, admin (prototype/unused) |
| D5 | Styling | **Keep `src/styles.css` as global** | ยังไม่ต้องย้ายไป Tailwind/CSS Modules — เก็บไว้ phase หลัง |
| D6 | Rendering per page | SSG สำหรับ marketing, SSR สำหรับ warranty lookup, API route สำหรับ leads | ผสม static + dynamic ตามธรรมชาติของหน้า |
| D7 | Node runtime | **Node.js 24 (Fluid Compute default)** — ไม่ใช้ Edge | Sanity client + เผื่อ heavy server logic |

---

## 2. Out of Scope (อย่าทำในรอบนี้)

- ❌ tweaks-panel.jsx → ลบทิ้ง (prototype only)
- ❌ login / admin pages → ลบทิ้ง (stub ที่ไม่ functional)
- ❌ ย้าย CSS ไป Tailwind / CSS-in-JS
- ❌ Auth system จริง (จะมา phase ถัดไป)
- ❌ AI image generation pipeline (Phase 5 ของ spec เดิม)
- ❌ E2E test suite (Playwright/Cypress)
- ❌ Refactor component internals — งานนี้คือ "ย้ายบ้าน" ไม่ใช่ "ตกแต่งใหม่"

---

## 3. Target Architecture

### 3.1 Route map

| Vite hash | Next.js path | Render mode | Notes |
|---|---|---|---|
| `#home` หรือ `/` | `/` | SSG | Hero + product grid |
| `#clear-ppf` | `/clear-ppf` | SSG | Product page |
| `#matte-ppf` | `/matte-ppf` | SSG | Product page |
| `#color-ppf` | `/color-ppf` | SSG | Product page |
| `#technology` | `/technology` | SSG | |
| `#compare` | `/compare` | SSG | |
| `#for-dealers` | `/for-dealers` | SSG | มี form (client) |
| `#about-nexs` | `/about` | SSG | |
| `#faq` | `/faq` | SSG | (จาก Sanity เมื่อ wire เสร็จ) |
| `#contact` | `/contact` | SSG | มี form (client) |
| `#warranty` | `/warranty` | SSR | Lookup form |
| `#warranty-card/SERIAL/STATE` | `/warranty/[serial]/[state]` | SSR (no-cache) | PDPA — ไม่ cache |
| `#support-warranty` | `/support/warranty` | SSG | |
| `#support-inspection` | `/support/inspection` | SSG | |

### 3.2 Folder structure ปลายทาง

```
app/
├── layout.tsx                 ← root layout (replaces index.html)
├── page.tsx                   ← home (/)
├── globals.css                ← เดิมคือ src/styles.css
├── (marketing)/               ← route group, no URL impact
│   ├── clear-ppf/page.tsx
│   ├── matte-ppf/page.tsx
│   ├── color-ppf/page.tsx
│   ├── technology/page.tsx
│   ├── compare/page.tsx
│   ├── for-dealers/page.tsx
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   └── contact/page.tsx
├── warranty/
│   ├── page.tsx               ← lookup form (SSR)
│   └── [serial]/[state]/
│       └── page.tsx           ← warranty card (SSR, no-cache)
├── support/
│   ├── warranty/page.tsx
│   └── inspection/page.tsx
├── api/
│   └── leads/route.ts         ← POST endpoint (replaces postLead stub)
├── robots.ts                  ← generates /robots.txt
└── sitemap.ts                 ← generates /sitemap.xml

components/                    ← ย้ายมาจาก src/components/
├── chrome.tsx                 ← Nav, Footer (client component)
├── home.tsx, products.tsx, ...
├── lead-forms.tsx             ← 'use client'
├── warranty-card.tsx          ← can be RSC ถ้า fetch ฝั่ง server
└── ...

lib/
├── sanity/
│   ├── client.ts              ← Sanity client (server-only)
│   ├── queries.ts             ← GROQ queries
│   └── revalidate.ts          ← webhook handler
├── seo.ts                     ← generateMetadata helpers
└── analytics.ts               ← GA4 (client only)

data/                          ← ย้ายมาจาก src/data/
├── brand.ts                   ← BRAND, CTA, HOME_STATS (constants)
├── seo.ts                     ← per-route SEO defaults (fallback)
└── assets/registry.ts

public/                        ← เก็บเดิม
├── robots.txt → ลบ (generate จาก app/robots.ts)
├── sitemap.xml → ลบ (generate จาก app/sitemap.ts)
└── images/                    ← Next.js Image จะ optimize ให้

sanity/                        ← เก็บไว้ตามเดิม (Sanity Studio config)
```

### 3.3 Key files to convert (Vite → Next.js)

| Vite | Next.js | Strategy |
|---|---|---|
| `index.html` | `app/layout.tsx` + `app/page.tsx` | RSC layout ครอบ html/body/head |
| `src/main.jsx` | (ไม่ต้องมี) | Next.js handle root rendering เอง |
| `src/App.jsx` (hash router) | (ลบทิ้ง) | Next.js file-based routing ทดแทน |
| `src/hooks/useSEO.js` | `generateMetadata()` export ใน page.tsx | static metadata API ของ Next.js |
| `src/data/seo.js` | `lib/seo.ts` + page-level metadata | per-page metadata |
| `src/components/lead-forms.jsx` | `components/lead-forms.tsx` + `app/api/leads/route.ts` | client form + server endpoint |
| `vercel.json` (rewrites SPA) | `next.config.ts` (redirects) | hash → clean path redirects |
| `vite.config.js` | `next.config.ts` | framework config |
| `public/sitemap.xml` (static) | `app/sitemap.ts` | dynamic จาก Sanity เมื่อพร้อม |

---

## 4. Migration Phases (ทำตามลำดับ)

### Phase 0 — Safety net (1 commit)

- [ ] สร้าง git tag `pre-nextjs` ที่ commit `971da06` (rollback point)
- [ ] สร้าง branch `migration/nextjs` แยกจาก `develop`
- [ ] เพิ่ม `MIGRATION-PLAN.md` (ไฟล์นี้) เป็น commit แรกใน branch

### Phase 1 — Scaffold Next.js (เปลี่ยน toolchain แต่ยังไม่ migrate component)

- [ ] `npx create-next-app@latest .` ใน **temp folder** (เช่น `/tmp/nexs-next`) เพื่อเอา template — ตอบ:
  - TypeScript: **Yes** (ใหม่ก็ใช้ TS เลย — ลด bug ภายหลัง)
  - ESLint: Yes
  - Tailwind: **No** (D5)
  - `src/` directory: **No** (ใช้ app/ ที่ root)
  - App Router: **Yes**
  - Turbopack: **Yes** (default)
  - Import alias: `@/*`
- [ ] Copy scaffold files ออกมา: `app/`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts`, ESLint config
- [ ] Merge `package.json`:
  - ลบ: `vite`, `@vitejs/plugin-react`
  - เพิ่ม: `next`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
  - scripts: `dev: "next dev"`, `build: "next build"`, `start: "next start"`
  - เก็บ scripts: `audit`, `audit:no-price`, `audit:no-shineandshield` (ปรับ glob ให้รวม `app/**` `components/**`)
- [ ] ลบ `vite.config.js`, `index.html` (root)
- [ ] `npm install && npm run dev` → เปิด localhost:3000 → ควรเห็น Next.js default page
- [ ] **Commit:** `chore: scaffold Next.js 15 alongside existing src/`

### Phase 2 — Layout + Global Styles

- [ ] สร้าง `app/layout.tsx`:
  - `<html lang="th">` (ดู `<title>` ใน index.html)
  - import `./globals.css`
  - root metadata: title template, default OG image
- [ ] Copy `src/styles.css` → `app/globals.css`
- [ ] Copy `src/data/brand.js` → `data/brand.ts` (rename + type ที่ขั้นต่ำ)
- [ ] ลง `Inter` font ผ่าน `next/font/google` (เห็นใน App.jsx ตั้ง `--font-sans` runtime — ย้ายมาเป็น build-time)
- [ ] **Commit:** `feat: app/layout + global styles + brand data`

### Phase 3 — Migrate Chrome (Nav + Footer)

- [ ] Copy `src/components/chrome.jsx` → `components/chrome.tsx`, ใส่ `'use client'` ด้านบน
- [ ] เปลี่ยน Nav link: `onClick={() => go(r)}` → `<Link href={`/${r}`}>` จาก `next/link`
- [ ] เปลี่ยน active state: `route === r` → `usePathname() === '/' + r` (`'use client'` แล้วเรียก hook ได้)
- [ ] ใส่ `<Nav />` + `<Footer />` ใน `app/layout.tsx`
- [ ] **Commit:** `feat: migrate Nav and Footer to Next.js`

### Phase 4 — Migrate Marketing Pages (9 หน้า, page-by-page)

ทำที่ละหน้า, commit แยกกัน, เริ่มจากง่ายที่สุดก่อน

ลำดับแนะนำ: about → faq → technology → compare → clear-ppf → matte-ppf → color-ppf → contact → for-dealers → home (home ทำหลังสุดเพราะ depend on อื่น)

สำหรับแต่ละหน้า:
- [ ] สร้าง `app/(marketing)/<slug>/page.tsx`
- [ ] Copy component จาก `src/components/<name>.jsx` → `components/<name>.tsx`
- [ ] ใส่ `'use client'` เฉพาะถ้ามี hook/event handler — ถ้าเป็น static render ไม่ต้องใส่ (เพื่อให้เป็น RSC)
- [ ] Export `generateMetadata()` จาก page.tsx โดย pull จาก `data/seo.ts`:
  ```tsx
  // app/(marketing)/clear-ppf/page.tsx
  import { ClearPPF } from '@/components/products';
  import { seoFor } from '@/lib/seo';

  export const metadata = seoFor('clear-ppf');

  export default function Page() {
    return <ClearPPF />;
  }
  ```
- [ ] เปลี่ยน intra-app link จาก `go('about')` → `<Link href="/about">` ทุกที่
- [ ] **Commit:** `feat: migrate <page-name> to /<slug>`

### Phase 5 — Migrate Warranty + Support (4 หน้า)

- [ ] `/warranty` (lookup form) — ใส่ `'use client'` form + server action หรือ API route lookup
- [ ] `/warranty/[serial]/[state]/page.tsx` — Dynamic route, `export const dynamic = 'force-dynamic'` + `Cache-Control: no-store` (PDPA — ห้าม cache บัตรลูกค้า)
- [ ] `/support/warranty` — แจ้งบัตรหาย (static + form)
- [ ] `/support/inspection` — นัดตรวจสอบ (static + form)
- [ ] **Commit per page**

### Phase 6 — Lead API Route

- [ ] สร้าง `app/api/leads/route.ts`:
  ```ts
  // app/api/leads/route.ts
  import { NextRequest, NextResponse } from 'next/server';

  export async function POST(req: NextRequest) {
    const body = await req.json();
    // TODO: ส่งเข้า CRM/Slack/Sheets ตาม LAUNCH-CHECKLIST.md item 1
    console.log('[lead]', body);
    return NextResponse.json({ ok: true });
  }
  ```
- [ ] Update `components/lead-forms.tsx` → `fetch('/api/leads', { method: 'POST', body: JSON.stringify(payload) })`
- [ ] ลบ `VITE_LEAD_ENDPOINT` references — Next.js API route ไม่ต้อง env var
- [ ] ใส่ rate-limit ขั้นต่ำ (memory-based 1 req/sec/IP — phase หลังค่อยใช้ Upstash)
- [ ] **Commit:** `feat: lead API route + form wiring`

### Phase 7 — Sanity Wiring (D3)

> หมายเหตุ: ขั้นนี้เป็น *new feature* แต่ user เลือก D3 = ทำพร้อมกัน

- [ ] `npx sanity@latest init --bare` ใน `sanity/` (ถ้ายังไม่ได้ init)
- [ ] Copy `sanity/schemas/*.ts` ไป Sanity Studio (อาจอยู่ใน path เดียวกัน)
- [ ] Deploy Sanity Studio: `npx sanity deploy` → ได้ studio URL
- [ ] Seed initial content จาก `data/brand.ts` (สร้าง script `scripts/seed-sanity.ts`)
- [ ] `npm install next-sanity @sanity/image-url`
- [ ] สร้าง `lib/sanity/client.ts`:
  ```ts
  import { createClient } from 'next-sanity';

  export const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-10-01',
    useCdn: true,           // CDN สำหรับ public reads
    perspective: 'published',
  });
  ```
- [ ] เพิ่ม env vars ใน `vercel env`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `SANITY_REVALIDATE_SECRET` (webhook signing)
- [ ] เปลี่ยน static `brand.ts` reads → Sanity GROQ queries สำหรับ entities ที่ควรแก้ได้จาก CMS:
  - Products (`/clear-ppf`, `/matte-ppf`, `/color-ppf`) → ดึงจาก Sanity
  - FAQ items → Sanity
  - **ไม่ดึงจาก Sanity:** BRAND constants, CTA labels (เก็บใน code)
- [ ] ใส่ ISR: `export const revalidate = 60;` ในแต่ละ page ที่ดึง Sanity
- [ ] สร้าง webhook handler `app/api/revalidate/route.ts` ตาม [Sanity GROQ-Powered Webhooks](https://www.sanity.io/docs/webhooks) — ใช้ `revalidateTag()` ของ Next.js
- [ ] ตั้ง webhook ใน Sanity dashboard → `https://nexsppf.com/api/revalidate`
- [ ] **Commits:** `feat: sanity client`, `feat: products from sanity`, `feat: faq from sanity`, `feat: sanity webhook revalidation`

### Phase 8 — SEO + Sitemap + Redirects

- [ ] สร้าง `app/sitemap.ts`:
  ```ts
  import type { MetadataRoute } from 'next';
  import { sanity } from '@/lib/sanity/client';

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = 'https://nexsppf.com';
    const staticPaths = ['', '/clear-ppf', '/matte-ppf', '/color-ppf', '/technology',
      '/compare', '/for-dealers', '/about', '/faq', '/contact',
      '/support/warranty', '/support/inspection'];
    return staticPaths.map(p => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: p === '' ? 1 : 0.7,
    }));
  }
  ```
- [ ] สร้าง `app/robots.ts`:
  ```ts
  import type { MetadataRoute } from 'next';
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/warranty/'] }],
      sitemap: 'https://nexsppf.com/sitemap.xml',
    };
  }
  ```
- [ ] ลบ `public/sitemap.xml` และ `public/robots.txt`
- [ ] เพิ่ม redirects ใน `next.config.ts` สำหรับ hash → clean path:
  > ⚠️ Hash fragments **ไม่ส่งไป server** — redirect ใน next.config.ts redirect ไม่ได้
  > **ใช้** `app/page.tsx` client-side redirect แทน: detect `location.hash` แล้ว `router.replace()` ไป clean path
- [ ] สร้าง `components/legacy-hash-redirect.tsx` (`'use client'`):
  ```tsx
  'use client';
  import { useEffect } from 'react';
  import { useRouter } from 'next/navigation';

  const HASH_MAP: Record<string, string> = {
    'home': '/', 'clear-ppf': '/clear-ppf', 'matte-ppf': '/matte-ppf',
    'color-ppf': '/color-ppf', 'technology': '/technology', 'compare': '/compare',
    'for-dealers': '/for-dealers', 'about-nexs': '/about', 'faq': '/faq',
    'contact': '/contact', 'warranty': '/warranty',
    'support-warranty': '/support/warranty',
    'support-inspection': '/support/inspection',
  };

  export function LegacyHashRedirect() {
    const router = useRouter();
    useEffect(() => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      // warranty-card/SERIAL/STATE
      const wc = hash.match(/^warranty-card\/([^\/]+)\/([^\/]+)$/);
      if (wc) {
        router.replace(`/warranty/${wc[1]}/${wc[2]}`);
        return;
      }
      const target = HASH_MAP[hash];
      if (target) router.replace(target);
    }, [router]);
    return null;
  }
  ```
- [ ] วาง `<LegacyHashRedirect />` ใน `app/layout.tsx` (ครอบทุก page)
- [ ] **Commit:** `feat: SEO sitemap robots + legacy hash redirects`

### Phase 9 — Cleanup + Audit

- [ ] ลบ `src/` ทั้ง folder
- [ ] ลบ `vite.config.js`, `vercel.json` (เขียนใหม่)
- [ ] ลบ `index.html` ที่ root
- [ ] ลบ `dist/` (artifact ของ Vite)
- [ ] เขียน `vercel.json` ใหม่ (ถ้าจำเป็น) — Next.js auto-detect ไม่ต้อง config มาก:
  ```json
  {
    "$schema": "https://openapi.vercel.sh/vercel.json"
  }
  ```
  (framework, buildCommand, outputDirectory ลบหมด — Next.js zero-config บน Vercel)
- [ ] อัปเดต `package.json::scripts.audit`:
  - `audit:no-price` → ขยาย glob เป็น `'app/**' 'components/**' 'data/**' 'lib/**'`
  - `audit:no-shineandshield` → เหมือนกัน
- [ ] รัน `npm run audit` ผ่าน
- [ ] รัน `npm run build` ผ่านโดยไม่มี warning
- [ ] **Commit:** `chore: remove Vite artifacts`

### Phase 10 — Production deploy + Domain cutover

- [ ] Deploy preview: `vercel` → ได้ `nexs-xxx.vercel.app`
- [ ] **Manual QA bypass list** (เปิด preview URL):
  - [ ] หน้า 9 marketing โหลด, nav ทำงาน
  - [ ] `/sitemap.xml` คืน XML ที่ถูก
  - [ ] `/robots.txt` คืน text ที่ถูก
  - [ ] `<head>` มี OG tags ครบ (เปิด view-source)
  - [ ] Old hash URL `/#about-nexs` redirect ไป `/about` (ทดสอบใน console)
  - [ ] Warranty lookup ทำงาน
  - [ ] Lead form ส่งเข้า `/api/leads` ได้ (เช็ค Network tab)
  - [ ] Sanity webhook revalidate ได้ (แก้ product ใน Studio → reload page → เห็นค่าใหม่ใน <60s)
  - [ ] Mobile responsive
  - [ ] Lighthouse score: Performance ≥90, SEO 100, Accessibility ≥95
- [ ] Deploy prod: `vercel --prod`
- [ ] Update `DEPLOY.md` — section "Replacing existing nexsppf.com" ลบทิ้ง (เพราะตอนนี้ Next.js แทน Next.js แล้ว ไม่ใช่ Vite ทับ Next.js)
- [ ] **Cutover step** (ไม่ใช่ migration scope แต่บันทึก):
  - Vercel dashboard → project ใหม่ → Settings → Domains → Add `nexsppf.com`
  - Transfer domain จาก Next.js เก่า
- [ ] **Commit:** `docs: update DEPLOY.md post-migration`

---

## 5. Risks & Mitigations

| Risk | ผลกระทบ | Mitigation |
|---|---|---|
| Hash routes ของลูกค้า (warranty QR) 404 หลัง migration | ลูกค้า scan แล้วเปิดไม่ได้ — **production-critical** | `LegacyHashRedirect` ในทุก page + monitor 404 ใน Vercel Analytics สัปดาห์แรก |
| useSEO.js เคย manipulate `<head>` runtime → Next.js metadata API ไม่ครอบคลุม JSON-LD | Schema.org ลด, SEO เสีย | ใส่ JSON-LD เป็น `<script type="application/ld+json">` ใน layout.tsx |
| Sanity ที่ยังไม่เคย deploy → schema bug | Build fail หลัง wire Sanity | ทำ Phase 7 หลัง 4–6 (marketing ที่ใช้ static data ก่อน — Sanity เป็นบทเพิ่ม ไม่ใช่ block) |
| Vercel build hit cold start ครั้งแรก | first request ช้า | Fluid Compute default, warm via cron (`/api/health` ทุก 5 นาที — optional) |
| `import.meta.env.VITE_*` ที่หลุดมา | runtime error | grep `import.meta` ก่อน commit แต่ละ phase (มี 1 ที่เดียวคือ lead-forms.jsx — รู้ตำแหน่งแล้ว) |
| Component บางตัว assume window/document ที่ module top-level | RSC build crash | ใส่ `'use client'` ที่ component ที่ใช้ browser API — ถ้าไม่แน่ใจ ใส่ไว้ก่อน optimize ทีหลัง |
| Sanity webhook secret leak | content tampering | ตรวจ HMAC signature ใน `/api/revalidate` |
| PDPA: warranty card ถูก cache | ละเมิด PDPA | `export const dynamic = 'force-dynamic'` + response header `Cache-Control: private, no-store` |

---

## 6. Rollback

3 ระดับตามความเร็ว:

1. **Soft rollback** (Vercel UI): Deployments → previous → "Promote to Production" — กลับมาภายใน 30 วินาที
2. **Branch rollback** (git): `git checkout develop` (Vite branch) → `vercel --prod` — กลับมาภายใน 5 นาที
3. **Hard rollback** (last resort): `git reset --hard pre-nextjs` ใน branch ใหม่ → push → redeploy

---

## 7. Acceptance Criteria

migration นี้จะถือว่า **เสร็จ** เมื่อ:

- [ ] `npm run dev` รัน Next.js dev server ขึ้นที่ port 3000
- [ ] `npm run build` produces build ที่ไม่มี error/warning
- [ ] `npm run audit` ผ่าน (no public pricing, no Shine-and-Shield)
- [ ] หน้า 9 marketing + warranty + 2 support เปิดได้บน preview URL
- [ ] `/sitemap.xml` คืน sitemap ที่มี URL ครบ
- [ ] OG meta tag render server-side (เปิด view-source แล้วเห็น `<meta property="og:...`)
- [ ] Lighthouse SEO score = 100 ในหน้า home
- [ ] `/#clear-ppf` (old hash) redirect ไป `/clear-ppf` (ทั้ง client-side)
- [ ] Warranty card ลูกค้า scan QR ของเก่าได้ (test ด้วย serial จริง)
- [ ] Lead form submit เข้า `/api/leads` สำเร็จ
- [ ] Sanity Studio deploy ได้ + แก้ product แล้วเห็นใน site ภายใน 60s (ISR + webhook)
- [ ] ไม่มี `import.meta.env`, `vite.config.js`, หรือ `dist/` หลงเหลือ
- [ ] `src/` folder ถูกลบทั้งหมด
- [ ] `DEPLOY.md` อัพเดทตรงกับสถานะใหม่

---

## 8. Time estimate

| Phase | งาน | ประมาณ |
|---|---|---|
| 0 | Safety net | 10 นาที |
| 1 | Scaffold Next.js | 30 นาที |
| 2 | Layout + styles | 30 นาที |
| 3 | Chrome (Nav/Footer) | 45 นาที |
| 4 | Marketing pages × 9 | 3–4 ชั่วโมง |
| 5 | Warranty + support × 4 | 2 ชั่วโมง |
| 6 | Lead API | 30 นาที |
| 7 | Sanity wiring | 2–4 ชั่วโมง (depend on Studio setup) |
| 8 | SEO + redirects | 1 ชั่วโมง |
| 9 | Cleanup | 30 นาที |
| 10 | Deploy + QA | 1 ชั่วโมง |
| **รวม** | | **~12–15 ชั่วโมง** |

แบ่งทำได้ — แต่ละ phase commit แยก, deploy preview ได้ตั้งแต่ Phase 2

---

## 9. Next step

รออนุมัติแผนนี้ → เริ่ม **Phase 0 (Safety net)** ทันที, ทำเรียงตามลำดับ, commit แยก phase  เปิด preview URL ให้ดูตั้งแต่ Phase 4 (มี marketing page แรกพร้อม) เพื่อให้ verify ทีละหน้าระหว่างทาง
