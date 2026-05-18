import React from 'react';
import { Eyebrow, Icon, ImgPh } from './shared.jsx';
import { TECH_LAYERS, TECH_BENEFITS, BRAND, CTA } from '../data/brand.js';

export const TechnologyPage = ({ go }) => (
  <main data-screen-label="05 Technology">
    <section className="page-hero">
      <div className="container">
        <Eyebrow>Advanced Film Technology</Eyebrow>
        <h1 className="h-1" style={{marginTop:14, maxWidth:880}}>The Technology Behind the Finish</h1>
        <h2 className="h-2 thai" style={{marginTop:10, color:"var(--nexs-ink-muted)", fontWeight:400, maxWidth:720}}>
          เทคโนโลยีเบื้องหลังผิวสัมผัสระดับพรีเมียม
        </h2>
        <p className="lede thai" style={{marginTop:20, maxWidth:720}}>
          NEXS พัฒนาโครงสร้างฟิล์มหลายชั้นให้ทำงานร่วมกันอย่างแม่นยำ ตั้งแต่ขั้นซ่อมรอย ขั้น TPU
          ขั้นกาว ไปจนถึง release liner เพื่อให้ได้ finish ที่ใส เรียบเนียน ทนทาน
          และติดตั้งได้อย่างมั่นใจ
        </p>
      </div>
    </section>

    {/* Layer stack — 4 layers */}
    <section className="section">
      <div className="container">
        <div className="grid-2" style={{gap:64, alignItems:"flex-start"}}>
          <div>
            <Eyebrow>Layer Stack</Eyebrow>
            <h2 className="h-1 thai" style={{marginTop:14}}>4 ชั้นที่ออกแบบให้ทำงานร่วมกัน</h2>
            <div className="stack-24" style={{marginTop:32}}>
              {TECH_LAYERS.map((l)=>(
                <div key={l.layer} className="thai" style={{paddingTop:20, borderTop:"1px solid var(--nexs-hairline)"}}>
                  <div className="row" style={{alignItems:"flex-start", gap:18}}>
                    <div style={{
                      minWidth:42, height:42, borderRadius:"50%",
                      border:"1px solid var(--nexs-hairline)",
                      display:"grid", placeItems:"center",
                      fontFamily:"var(--font-mono)", fontSize:13, color:"var(--nexs-red)", fontWeight:600
                    }}>0{l.layer}</div>
                    <div>
                      <h3 className="h-3" style={{marginBottom:6}}>{l.title}</h3>
                      <div className="caption" style={{marginBottom:8}}>{l.th}</div>
                      <p className="body">{l.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"sticky", top:80}}>
            <ImgPh ratio="3/4" label="Layer stack · cross-section render"/>
          </div>
        </div>
      </div>
    </section>

    {/* Benefits grid */}
    <section className="section section-grey">
      <div className="container">
        <div style={{maxWidth:720, marginBottom:48}}>
          <Eyebrow>Performance Features</Eyebrow>
          <h2 className="h-1 thai" style={{marginTop:14}}>เทคโนโลยีที่ทำงานในทุกวันที่คุณขับ</h2>
        </div>
        <div className="grid-3">
          {TECH_BENEFITS.map((b,i)=>(
            <div key={i} className="card thai" style={{background:"var(--nexs-canvas)"}}>
              <div style={{width:42, height:42, borderRadius:12, border:"1px solid var(--nexs-hairline)", display:"grid", placeItems:"center", marginBottom:20, color:"var(--nexs-red)"}}>
                <Icon name={["layers","sparkle","wand","droplet","shield","check"][i]} size={18}/>
              </div>
              <h3 className="h-3" style={{fontSize:18, marginBottom:6}}>{b.title}</h3>
              <div className="caption" style={{marginBottom:10}}>{b.th}</div>
              <p className="body" style={{fontSize:14}}>{b.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quote block */}
    <section className="section">
      <div className="container">
        <div className="quote-block">
          <div className="quote-text">{BRAND.quote}</div>
          <p className="quote-th thai">{BRAND.quoteTH}</p>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container center">
        <h2 className="h-1 thai" style={{maxWidth:720, margin:"0 auto"}}>พร้อมเลือกฟิล์มที่เหมาะกับรถของคุณ?</h2>
        <div className="row" style={{justifyContent:"center", marginTop:32}}>
          <button className="btn btn-primary btn-lg" onClick={()=>go("compare")}>{CTA.compareAll}</button>
          <button className="btn btn-ghost btn-lg thai" onClick={()=>go("contact")}>{CTA.primary}</button>
        </div>
      </div>
    </section>
  </main>
);
