import React from 'react';
import { Eyebrow, Icon, ImgPh } from './shared.jsx';
import { ProductCard } from './home.jsx';
import { PRODUCTS, productsByGroup, PRODUCT_GROUPS, COMPARISON_ROWS_CLEAR, WHY_CLEAR_PPF, CTA, BRAND } from '../data/brand.js';

// Clear PPF page — flagship clear product category (4 tiers)
export const ProductsPage = ({ go }) => {
  return <ClearPPFPage go={go}/>;
};

export const ClearPPFPage = ({ go }) => {
  const group = PRODUCT_GROUPS.clear;
  const items = productsByGroup("clear");
  return (
    <main data-screen-label="02 Clear PPF">
      <section className="page-hero">
        <div className="container">
          <div className="grid-2" style={{gap:64, alignItems:"center"}}>
            <div>
              <Eyebrow>{group.code}</Eyebrow>
              <h1 className="h-1" style={{marginTop:14}}>{group.heroTitle}</h1>
              <p className="lede thai" style={{marginTop:20}}>
                {group.heroTH}
              </p>
              <p className="thai" style={{marginTop:14, color:"var(--nexs-ink-muted)", fontStyle:"italic"}}>
                {group.heroConceptTH}
              </p>
              <div className="row" style={{marginTop:32, gap:12}}>
                <button className="btn btn-primary btn-lg thai" onClick={()=>go("compare")}>{CTA.compareAll}</button>
                <button className="btn btn-ghost btn-lg thai" onClick={()=>go("contact")}>{CTA.bookConsultation}</button>
              </div>
            </div>
            <ImgPh ratio="4/3" label="Clear PPF · silver car · studio hero"/>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Eyebrow>Clear PPF Models</Eyebrow>
          <h2 className="h-2 thai" style={{marginTop:14, marginBottom:40}}>4 รุ่นสำหรับการปกป้องในทุกระดับ</h2>
          <div className="grid-4">
            {items.map(p=>(
              <ProductCard key={p.code} p={p} go={go}/>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <Eyebrow>Find Your Best Match</Eyebrow>
          <h2 className="h-1 thai" style={{marginTop:14, marginBottom:48, maxWidth:640}}>เปรียบเทียบรุ่น Clear PPF</h2>
          <ComparisonTable rows={COMPARISON_ROWS_CLEAR} columns={items.map(p=>p.name)}/>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{maxWidth:640, marginBottom:48}}>
            <Eyebrow>Why Clear PPF</Eyebrow>
            <h2 className="h-1 thai" style={{marginTop:14}}>เหตุผลที่ Clear PPF เป็นทางเลือกพรีเมียม</h2>
          </div>
          <div className="grid-5">
            {WHY_CLEAR_PPF.map((b,i)=>(
              <div key={i} className="card-flat thai" style={{background:"var(--nexs-canvas)"}}>
                <div style={{width:36, height:36, borderRadius:10, border:"1px solid var(--nexs-hairline)", display:"grid", placeItems:"center", marginBottom:16, color:"var(--nexs-red)"}}>
                  <Icon name={["shield","sparkle","car","droplet","check"][i]} size={16}/>
                </div>
                <h3 className="h-3" style={{fontSize:16, marginBottom:6}}>{b.title}</h3>
                <div className="caption" style={{marginBottom:8}}>{b.th}</div>
                <p className="body" style={{fontSize:13}}>{b.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <div style={{maxWidth:640, marginBottom:48}}>
            <Eyebrow>Precision Installation</Eyebrow>
            <h2 className="h-1 thai" style={{marginTop:14}}>การติดตั้งที่ละเอียด เพื่อ finish ที่เนียน</h2>
          </div>
          <div className="grid-4">
            {[
              ["Front Bumper Protection","ปกป้องจุดรับแรงหลักจากสะเก็ดหิน แมลง และคราบถนน"],
              ["Hood & Edge Coverage","ปกป้องฝากระโปรงและขอบมุมสำคัญด้วยงานติดตั้งที่แนบเนียน"],
              ["Full Body Installation","ติดตั้งรอบคันเพื่อความต่อเนื่องของ finish และการปกป้องสูงสุด"],
              ["Invisible Mirror Finish","เนียนใส กลืนไปกับสีรถ และคงภาพลักษณ์เดิมของรถไว้"],
            ].map(([t,c],i)=>(
              <div key={i} className="card-flat thai" style={{background:"var(--nexs-canvas)"}}>
                <div className="caption" style={{textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--nexs-ink-soft)"}}>Card 0{i+1}</div>
                <h3 className="h-3" style={{marginTop:8, fontSize:17, marginBottom:8}}>{t}</h3>
                <p className="body" style={{fontSize:13}}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container center">
          <h2 className="h-1 thai" style={{maxWidth:720, margin:"0 auto"}}>ยังไม่แน่ใจว่ารุ่นไหนเหมาะกับรถ?</h2>
          <p className="lede thai" style={{margin:"16px auto 32px", maxWidth:560}}>
            ทีมงานหรือตัวแทนจำหน่ายในพื้นที่จะช่วยแนะนำตามการใช้งานจริงและรถของคุณ
          </p>
          <div className="row" style={{justifyContent:"center"}}>
            <button className="btn btn-primary btn-lg thai" onClick={()=>go("contact")}>{CTA.primary}</button>
            <button className="btn btn-ghost btn-lg thai" onClick={()=>go("for-dealers")}>{CTA.findInstallerTH}</button>
          </div>
        </div>
      </section>
    </main>
  );
};

// Generic comparison table used across Clear/Matte/Color/Compare pages
export const ComparisonTable = ({ rows, columns }) => {
  const colCount = columns.length;
  return (
    <div className="card" style={{padding:0, overflow:"hidden"}}>
      <div className="thai" style={{
        display:"grid",
        gridTemplateColumns:`1.4fr repeat(${colCount}, 1fr)`,
        background:"var(--nexs-canvas-soft)",
        padding:"22px 28px",
        borderBottom:"1px solid var(--nexs-hairline)",
      }}>
        <div className="caption" style={{textTransform:"uppercase", letterSpacing:"0.1em"}}>คุณสมบัติ</div>
        {columns.map((n,i)=>(
          <div key={n} style={{fontFamily:"var(--font-display)", fontWeight:600, fontSize:15, letterSpacing:"-0.01em"}}>
            {n}
          </div>
        ))}
      </div>
      {rows.map((r,i)=>(
        <div key={i} className="thai" style={{
          display:"grid",
          gridTemplateColumns:`1.4fr repeat(${colCount}, 1fr)`,
          padding:"20px 28px",
          borderBottom: i===rows.length-1?"none":"1px solid var(--nexs-hairline)",
          alignItems:"center",
          fontSize:14,
        }}>
          <div>
            <div style={{color:"var(--nexs-ink)", fontWeight:500, fontSize:13}}>{r.label}</div>
            <div style={{color:"var(--nexs-ink-soft)", fontSize:12, marginTop:2}}>{r.th}</div>
          </div>
          {r.values.map((v,j)=>(
            <div key={j} style={{
              color: v==="✓"?"var(--status-active)":v==="–"?"var(--nexs-ink-soft)":"var(--nexs-ink)",
              fontWeight: v==="✓"?500:400,
              fontSize:13,
            }}>
              {v==="✓" ? <Icon name="check" size={16}/> : v==="–" ? "—" : v}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
