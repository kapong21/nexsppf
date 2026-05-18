import React from 'react';
import { Eyebrow, Icon, ImgPh } from './shared.jsx';
import { DigitalWarrantySection, DealerInvite, QrProof, ContactStrip } from './home-sections.jsx';
import { BRAND, CTA, HOME_STATS, HOMEPAGE_PILLARS, PRODUCT_GROUPS, PRODUCTS } from '../data/brand.js';

// Home page — premium marketing landing per Copy Lock v1.2
export const Home = ({ go }) => {
  return (
    <main data-screen-label="01 Home">
      {/* Hero */}
      <section className="section" style={{ paddingTop: "clamp(56px,6vw,96px)" }}>
        <div className="container">
          <div className="row" style={{ gap: 8, marginBottom: 24 }}>
            <span className="pill pill-red"><span className="dot" />{BRAND.campaign}</span>
          </div>
          <h1 className="h-display-lg" style={{ maxWidth: 980 }}>
            {BRAND.heroEN}
          </h1>
          <h2 className="h-2 thai" style={{ marginTop: 20, color: "var(--nexs-ink-muted)", fontWeight: 400, maxWidth: 880 }}>
            {BRAND.heroTH}
          </h2>
          <p className="lede thai" style={{ maxWidth: 720, marginTop: 28 }}>
            {BRAND.heroSubcopyTH}
          </p>
          <div className="row thai" style={{ marginTop: 36, gap: 12 }}>
            <button className="btn btn-primary btn-lg" onClick={() => go("clear-ppf")}>
              {CTA.exploreFilmSystems} <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => go("contact")}>{CTA.findInstallerTH}</button>
            <button className="btn-link thai" style={{ marginLeft: 8, fontSize: 14, color: "var(--nexs-ink-muted)" }} onClick={() => go("warranty")}>
              ตรวจสอบบัตรรับประกัน <Icon name="arrow-right" size={14} />
            </button>
          </div>

          {/* Hero image stage */}
          <div className="hero-stage" style={{ marginTop: 64, aspectRatio: "16 / 8", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <div style={{ textAlign: "center", color: "var(--nexs-ink-soft)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Premium hero · white silver studio · soft reflections
              </div>
            </div>
            <div style={{ position: "absolute", left: 24, bottom: 24, color: "var(--nexs-ink-soft)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
              {BRAND.descriptor}
            </div>
            <div style={{ position: "absolute", right: 24, bottom: 24, color: "var(--nexs-ink-soft)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
              001 / 04
            </div>
          </div>

          {/* Stat strip */}
          <div className="thai" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1px solid var(--nexs-hairline)",
            borderBottom: "1px solid var(--nexs-hairline)",
            marginTop: 64,
            padding: "24px 0",
          }}>
            {HOME_STATS.map((s, i) =>
              <div key={i} style={{ paddingLeft: i === 0 ? 0 : 24, borderLeft: i === 0 ? "none" : "1px solid var(--nexs-hairline)" }}>
                <div className="caption" style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>{s.k}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 6 }}>
                  {s.v}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Homepage Pillars — 4 brand standards */}
      <section className="section section-grey">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <Eyebrow>The NEXS Standard</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>มาตรฐานสำหรับทุกพื้นผิวที่ต้องการความสมบูรณ์แบบ</h2>
            <p className="lede thai" style={{ marginTop: 16 }}>
              NEXS ออกแบบฟิล์มเพื่อยกระดับความใส ความเงา ความเรียบเนียน และความมั่นใจของผิวรถในทุกการใช้งาน
            </p>
          </div>
          <div className="grid-4">
            {HOMEPAGE_PILLARS.map((p, i) =>
              <div key={i} className="card-flat thai" style={{ background: "var(--nexs-canvas)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid var(--nexs-hairline)", display: "grid", placeItems: "center", marginBottom: 24, color: "var(--nexs-red)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600 }}>0{i + 1}</span>
                </div>
                <h3 className="h-3" style={{ marginBottom: 8, color: "var(--nexs-ink)" }}>{p.title}</h3>
                <p className="body">{p.th}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Choose Your Film System — 3 product groups */}
      <section className="section">
        <div className="container">
          <div className="between" style={{ alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
            <div style={{ maxWidth: 640 }}>
              <Eyebrow>Choose Your Film System</Eyebrow>
              <h2 className="h-1 thai" style={{ marginTop: 14 }}>ฟิล์มรถยนต์ระดับพรีเมียม 3 กลุ่ม 12 ทางเลือก</h2>
              <p className="lede thai" style={{ marginTop: 16, maxWidth: 580 }}>
                NEXS Film Systems ครอบคลุม 3 กลุ่ม 11 ทางเลือก* สำหรับการปกป้องและสไตล์ที่แตกต่างของรถแต่ละคัน
              </p>
            </div>
            <button className="btn btn-ghost" onClick={() => go("compare")}>
              Compare All Models <Icon name="arrow-right" size={14} />
            </button>
          </div>
          <div className="grid-3">
            <CategoryCard group={PRODUCT_GROUPS.clear} go={go}/>
            <CategoryCard group={PRODUCT_GROUPS.matte} go={go}/>
            <CategoryCard group={PRODUCT_GROUPS.color} go={go}/>
          </div>
          <p className="caption thai" style={{ marginTop: 24, color: "var(--nexs-ink-soft)" }}>
            * 12 Film Options: Clear PPF 4 รุ่น · Matte PPF 3 รุ่น · Color PPF 5 รุ่น
          </p>
        </div>
      </section>

      {/* Clear PPF Lineup preview (the flagship category) */}
      <section className="section section-grey">
        <div className="container">
          <div className="between" style={{ alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
            <div style={{ maxWidth: 640 }}>
              <Eyebrow>Clear PPF Lineup</Eyebrow>
              <h2 className="h-1 thai" style={{ marginTop: 14 }}>สี่ระดับการปกป้องที่แนบเนียน เลือกได้ตามการใช้งาน</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => go("clear-ppf")}>
              View Clear PPF <Icon name="arrow-right" size={14} />
            </button>
          </div>
          <div className="grid-4">
            {PRODUCTS.filter(p => p.group === "clear").map((p) =>
              <ProductCard key={p.code} p={p} go={go} />
            )}
          </div>
        </div>
      </section>

      {/* Quote Block — dark panel (only allowed dark moment) */}
      <section className="section">
        <div className="container">
          <div className="quote-block">
            <div className="quote-text">
              {BRAND.quote}
            </div>
            <p className="quote-th thai">
              {BRAND.quoteTH}
            </p>
          </div>
        </div>
      </section>

      {/* Technology preview */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: "center" }}>
            <div>
              <Eyebrow>Advanced Film Technology</Eyebrow>
              <h2 className="h-1 thai" style={{ marginTop: 14 }}>เทคโนโลยีที่มองไม่เห็น แต่ทำงานอย่างเหนือระดับ</h2>
              <p className="lede thai" style={{ marginTop: 16 }}>
                NEXS พัฒนาเทคโนโลยีฟิล์มหลายชั้น เพื่อให้ผิวรถมีความใส เงา เรียบเนียน
                ทนทาน และมั่นใจได้ในการใช้งานระยะยาว
              </p>
              <div className="row" style={{ marginTop: 32 }}>
                <button className="btn btn-secondary" onClick={() => go("technology")}>
                  Explore Technology <Icon name="arrow-right" size={14}/>
                </button>
              </div>
            </div>
            <ImgPh ratio="4/3" label="Technology · layer stack · TPU detail"/>
          </div>
        </div>
      </section>

      {/* Existing trust + warranty + dealer + contact sections */}
      <DigitalWarrantySection go={go} />
      <DealerInvite go={go} />
      <QrProof go={go} />
      <ContactStrip go={go} />
    </main>
  );
};

// Category card — Clear/Matte/Color overview
export const CategoryCard = ({ group, go }) => (
  <article className="card thai" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
    <div style={{
      aspectRatio: "16/10",
      position: "relative",
      background:
        group.id === "color"
          ? "linear-gradient(135deg,#D71920 0%,#3B5A82 50%,#2E7D32 100%)"
          : group.id === "matte"
          ? "linear-gradient(180deg,#5F6368 0%,#1D1D1F 100%)"
          : "linear-gradient(180deg,#F7F7F5 0%,#ECEBE8 100%)",
      borderBottom: "1px solid var(--nexs-hairline)",
      display: "grid",
      placeItems: "center",
      color: group.id === "clear" ? "var(--nexs-ink-muted)" : "rgba(255,255,255,0.7)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}>
      {group.name} · Visual reference
    </div>
    <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="caption" style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--nexs-ink-soft)" }}>
        {group.code} · {PRODUCTS.filter(p=>p.group===group.id).length} รุ่น
      </div>
      <h3 className="h-3" style={{ marginTop: 8, marginBottom: 12 }}>{group.name}</h3>
      <p className="body" style={{ flex: 1 }}>{group.homepageTH}</p>
      <div className="row" style={{ gap: 8, marginTop: 24 }}>
        <button className="btn btn-secondary btn-sm" onClick={() => go(group.slug)}>View {group.name}</button>
        <button className="btn btn-ghost btn-sm" onClick={() => go("contact")}>{CTA.primary}</button>
      </div>
    </div>
  </article>
);

// Product tier card — used on Home + each product page
export const ProductCard = ({ p, go }) =>
  <article className="card thai" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
    <div style={{
      aspectRatio: "4/3", position: "relative",
      background: p.bg,
      display: "grid", placeItems: "end start",
      padding: 20,
    }}>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 14px)" }} />
      <div style={{ position: "relative", color: p.fg }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", opacity: 0.7 }}>NEXS</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, marginTop: 4 }}>
          {p.name}
        </div>
      </div>
      <span className={`pill ${p.pill || ""}`} style={{ position: "absolute", top: 16, left: 16 }}>
        <span className="dot" />{p.badge}
      </span>
    </div>
    <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="caption" style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nexs-ink-soft)" }}>
        {p.tagline} · {p.warranty}
      </div>
      <div className="h-3" style={{ marginTop: 8, marginBottom: 6, fontWeight: 600, letterSpacing: "-0.015em" }}>{p.role}</div>
      <p className="body" style={{ flex: 1 }}>{p.benefit}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => go("contact")}>{CTA.primary}</button>
        <button className="btn btn-ghost btn-sm" onClick={() => go(p.group === "clear" ? "clear-ppf" : p.group === "matte" ? "matte-ppf" : "color-ppf")}>รายละเอียด</button>
      </div>
    </div>
  </article>;

// Re-export for compatibility (other components may import PRODUCTS from here)
export { PRODUCTS };
