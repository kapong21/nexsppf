# NEXS — Deploy Guide

## ⚠️ Critical: Replacing the existing nexsppf.com

`nexsppf.com` ตอนนี้ run **Next.js + Vercel** (codebase อื่น โฟลเดอร์อื่น) — ไม่ใช่โค้ดในโฟลเดอร์นี้

Plan: deploy codebase ใหม่ทับของเก่า → `nexsppf.com` จะกลายเป็น **Vite SPA ใหม่** ตาม spec v5.2

ผลกระทบ:
- ❌ Digital Warranty Next.js เก่าจะหยุดให้บริการบน domain นี้
- ⚠️ ถ้ามีลูกค้ามีบัตรรับประกันที่ scan QR ไป `nexsppf.com/...` Next.js route จะ 404
- ✅ Digital Warranty หน้าใหม่อยู่ใน codebase นี้แล้ว แต่ใช้ hash route (`/#warranty-card/...`) — **URL pattern ต่างจากเดิม**

**ก่อน deploy production:** ตรวจดู `nexsppf.com/warranty/...` ของเก่าก่อนว่า URL pattern เป็นยังไง ถ้าจำเป็นต้องรักษา backwards compat ให้ทำ redirect ใน `vercel.json::redirects[]`

---

## Quick deploy (Vercel CLI)

### Prerequisites
1. มี Vercel account (เข้า https://vercel.com/signup)
2. มี GitHub repo (optional — Vercel รับ direct upload จาก CLI ได้)

### Step 1 — Login & link
```bash
cd /Users/jatupornsinlapan/Documents/Claude/Projects/Nexs

# Install Vercel CLI (one-time)
npm i -g vercel

# Login (จะเปิด browser ให้ auth)
vercel login

# Link โฟลเดอร์นี้กับ Vercel project
vercel link
# → ตอบ:
#   - Set up "~/Documents/Claude/Projects/Nexs"? Y
#   - Which scope? (เลือก account ที่จะใช้)
#   - Link to existing project? N → กด N เพื่อสร้างใหม่
#     (ถ้ามี project "nexsppf" เก่าและอยากใช้ scope/team เดียวกัน เลือก Y แล้วเลือก project)
#   - What's your project's name? nexs (หรือชื่อใหม่ ไม่ใช้ชื่อเดียวกับ Next.js project เก่าเพื่อกัน confusion)
#   - In which directory is your code located? ./
```

### Step 2 — Deploy preview (test ก่อน production)
```bash
vercel
```
จะได้ URL แบบ `https://nexs-xxxxx.vercel.app/`

**เปิด URL นั้นใน browser แล้วเช็ค:**
- [ ] Home page โหลด, มี hero "Engineered to Be Invisible..."
- [ ] Nav 9 links ทำงาน (Clear/Matte/Color/Technology/Compare/For Dealers/About/FAQ/Contact)
- [ ] `/sitemap.xml` และ `/robots.txt` เปิดได้
- [ ] Warranty lookup ทำงาน (`/#warranty`)
- [ ] Forms ส่งได้ (จะ console.log → ยังไม่เข้า CRM จริง — ดู Sprint 4 wiring ใน LAUNCH-CHECKLIST.md)
- [ ] Mobile responsive (เปิดบนมือถือจริง)

### Step 3 — Deploy production (ทับ nexsppf.com)
```bash
vercel --prod
```

### Step 4 — Cut domain
1. ไปที่ Vercel dashboard → project ใหม่ที่เพิ่ง create
2. Settings → Domains → Add
3. Input: `nexsppf.com` + `www.nexsppf.com`
4. **Vercel จะเตือนว่า domain นี้ถูกใช้กับ project อื่นอยู่** (Next.js project เก่า)
5. กด "Transfer" → confirm
6. Vercel จะอัพเดท DNS ที่ Cloudflare (ถ้าใช้ Cloudflare proxy อยู่ ต้อง switch DNS record manually)

**ถ้าใช้ Cloudflare proxy:**
- Login Cloudflare → DNS records
- หา `nexsppf.com` A/CNAME record
- เปลี่ยน target เป็น `cname.vercel-dns.com` (Vercel จะให้ค่าที่แน่นอน)
- ⚠️ Propagation ใช้เวลา 1–60 นาที

### Step 5 — Verify
```bash
curl -sIL https://nexsppf.com/ | grep -i "x-powered\|server"
# ควรเห็น: server: Vercel หรือ cloudflare (ถ้ายังผ่าน proxy)
# ไม่ควรเห็น: x-powered-by: Next.js (ของเก่า)

curl -sL https://nexsppf.com/ | grep -i "<title>"
# ควรเห็น: <title>NEXS — Engineered for Perfect Surfaces</title>
```

---

## Alternative: GitHub Pages

ถ้าอยากใช้ GitHub Actions CI/CD แทน Vercel (ตาม spec v5.2):

```bash
# Push ขึ้น GitHub ก่อน
gh repo create nexs-ppf --private --source=. --remote=origin --push

# สร้าง .github/workflows/deploy.yml — ดู template ด้านล่าง
```

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run audit
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

ใส่ secrets ใน GitHub repo settings ก่อนรัน workflow ครั้งแรก

---

## Post-deploy hardening (ก่อน announce ลูกค้า)

จาก `LAUNCH-CHECKLIST.md`:

1. **Lead routing จริง** — `src/components/lead-forms.jsx::postLead()` ยังเป็น `console.log` stub
   - ใส่ env var `VITE_LEAD_ENDPOINT` ใน Vercel project settings
   - Update `postLead()` ให้ `fetch(import.meta.env.VITE_LEAD_ENDPOINT, ...)`
2. **Real contact data** — แทน LINE/Facebook/Email placeholders ใน `src/data/brand.js`
3. **GA4 / Meta Pixel** — เพิ่ม snippet ใน `index.html`
4. **Sanity workspace** — Phase 5 (Sprint 4 schemas พร้อมแล้ว แต่ Sanity studio ยังไม่ได้ initialize)
5. **AI render assets** — 28 P0 ภาพยังเป็น placeholder — ใส่ src ใน `src/data/assets/registry.js`
6. **Domain SSL** — Vercel ออก SSL อัตโนมัติ แต่ถ้าผ่าน Cloudflare proxy ต้อง set SSL mode เป็น "Full (strict)"

---

## Rollback plan

ถ้า deploy ใหม่มีปัญหา:

```bash
# Vercel dashboard → Deployments → previous version → "Promote to Production"
# หรือ CLI:
vercel rollback
```

ถ้าต้องกลับไปใช้ Next.js ของเก่า: ต้องไปที่ Vercel project เก่า แล้ว promote latest deployment ของมัน
