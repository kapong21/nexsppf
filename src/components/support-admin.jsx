import React from 'react';
import { Eyebrow, Icon } from './shared.jsx';

// Support pages: Lost Warranty/QR + Inspection Request + Admin Dashboard

export const SupportWarrantyPage = ({ go }) => {
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <main data-screen-label="08 Support · Warranty Lost" style={{paddingBottom:80}}>
      <section className="page-hero">
        <div className="container-narrow">
          <Eyebrow>Support · Lost Warranty</Eyebrow>
          <h1 className="h-1 thai" style={{marginTop:14}}>แจ้งบัตรรับประกันหรือ QR สูญหาย</h1>
          <p className="lede thai">
            กรอกข้อมูลเบื้องต้น ทีมงาน NEXS หรือตัวแทนจำหน่ายจะตรวจสอบสิทธิ์ของคุณ
            ก่อนแสดง record และดำเนินการออกบัตร / QR ใหม่
          </p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-narrow">
          {submitted ? (
            <div className="card thai" style={{textAlign:"center", padding:"56px 32px"}}>
              <div style={{width:48, height:48, borderRadius:"50%", background:"rgba(27,127,79,0.1)", color:"var(--status-active)", display:"grid", placeItems:"center", margin:"0 auto"}}>
                <Icon name="check" size={22}/>
              </div>
              <h3 className="h-2" style={{marginTop:24}}>ส่งคำขอเรียบร้อย</h3>
              <p className="body" style={{marginTop:12, maxWidth:480, margin:"12px auto 0"}}>
                ทีมงานจะตรวจสอบสิทธิ์ของคุณตามขั้นตอนความปลอดภัย และติดต่อกลับผ่านช่องทางที่คุณให้ไว้
              </p>
              <button className="btn btn-secondary btn-sm" style={{marginTop:24}} onClick={()=>go("home")}>กลับหน้าแรก</button>
            </div>
          ) : (
            <form className="card thai" style={{padding:40}} onSubmit={(e)=>{e.preventDefault(); setSubmitted(true);}}>
              <div className="field">
                <label className="label">Serial Code <span className="opt">(ถ้ามี)</span></label>
                <input className="input" placeholder="เช่น PRO-1196MXY0401178Q" style={{fontFamily:"var(--font-mono)"}}/>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="label">ชื่อ–นามสกุล</label>
                  <input className="input" required/>
                </div>
                <div className="field">
                  <label className="label">เบอร์ติดต่อ</label>
                  <input className="input" required placeholder="ใช้สำหรับยืนยันสิทธิ์"/>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="label">วันที่ติดตั้ง <span className="opt">(โดยประมาณ)</span></label>
                  <input className="input" placeholder="เดือน / ปี"/>
                </div>
                <div className="field">
                  <label className="label">ตัวแทนจำหน่ายที่ติดตั้ง <span className="opt">(ถ้าจำได้)</span></label>
                  <input className="input"/>
                </div>
              </div>
              <div className="field">
                <label className="label">รายละเอียดเบื้องต้น</label>
                <textarea className="textarea" placeholder="แจ้งสาเหตุการสูญหาย / รายละเอียดที่จำได้"/>
              </div>
              <div className="card-flat" style={{padding:18, background:"var(--soft-grey)", border:"none", marginTop:8}}>
                <p className="caption" style={{lineHeight:1.6, color:"var(--muted)"}}>
                  ข้อมูลจริงจะต้องตรวจสอบสิทธิ์ก่อนแสดง record และรูปที่เกี่ยวข้อง
                  ระบบจะไม่เปิดเผยข้อมูลของบัตรทันทีเพื่อความปลอดภัย
                </p>
              </div>
              <div className="checkbox-row" style={{marginTop:18, marginBottom:24}}>
                <input id="pdpa-w" type="checkbox" required/>
                <label htmlFor="pdpa-w">ยินยอมตาม PDPA และเข้าใจว่าเป็นคำขอตรวจสอบ ไม่ใช่การออกบัตรอัตโนมัติ</label>
              </div>
              <button className="btn btn-primary btn-lg" type="submit">ส่งคำขอตรวจสอบ <Icon name="arrow-right" size={14}/></button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export const SupportInspectionPage = ({ go }) => {
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <main data-screen-label="09 Support · Inspection" style={{paddingBottom:80}}>
      <section className="page-hero">
        <div className="container-narrow">
          <Eyebrow>Support · Inspection</Eyebrow>
          <h1 className="h-1 thai" style={{marginTop:14}}>แจ้งนัดตรวจสอบฟิล์มและงานหลังการติดตั้ง</h1>
          <p className="lede thai">
            ส่งคำขอตรวจสอบให้ทีม NEXS หรือตัวแทนจำหน่ายในพื้นที่
            ทีมงานจะตรวจสอบ record ตามสิทธิ์ก่อนนัดหมายต่อไป
          </p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-narrow">
          {submitted ? (
            <div className="card thai" style={{textAlign:"center", padding:"56px 32px"}}>
              <div style={{width:48, height:48, borderRadius:"50%", background:"rgba(27,127,79,0.1)", color:"var(--status-active)", display:"grid", placeItems:"center", margin:"0 auto"}}>
                <Icon name="check" size={22}/>
              </div>
              <h3 className="h-2" style={{marginTop:24}}>คำขออยู่ระหว่างตรวจสอบ</h3>
              <p className="body" style={{marginTop:12, maxWidth:480, margin:"12px auto 0"}}>
                ทีมงานจะตรวจสอบ record ตามสิทธิ์และประสานงานต่อ
                การส่งคำขอนี้ไม่ใช่การอนุมัติเคลมโดยอัตโนมัติ
              </p>
              <button className="btn btn-secondary btn-sm" style={{marginTop:24}} onClick={()=>go("home")}>กลับหน้าแรก</button>
            </div>
          ) : (
            <form className="card thai" style={{padding:40}} onSubmit={(e)=>{e.preventDefault(); setSubmitted(true);}}>
              <div className="field-row">
                <div className="field">
                  <label className="label">Serial Code</label>
                  <input className="input" required style={{fontFamily:"var(--font-mono)"}}/>
                </div>
                <div className="field">
                  <label className="label">กลุ่มฟิล์ม</label>
                  <select className="select">
                    <option>Clear PPF</option>
                    <option>Matte PPF</option>
                    <option>Color PPF</option>
                  </select>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="label">วันที่ติดตั้ง <span className="opt">(โดยประมาณ)</span></label>
                  <input className="input" placeholder="เดือน / ปี"/>
                </div>
                <div className="field">
                  <label className="label">ตัวแทนจำหน่าย</label>
                  <input className="input" placeholder="ชื่อร้าน / สาขา"/>
                </div>
              </div>
              <div className="field">
                <label className="label">รายละเอียดที่ต้องการให้ตรวจสอบ</label>
                <textarea className="textarea" placeholder="ระบุพื้นที่ / อาการ / สิ่งที่สังเกตเห็น"/>
              </div>
              <div className="field">
                <label className="label">รูปประกอบ <span className="opt">(แนบในขั้นตอนต่อไป)</span></label>
                <div style={{
                  border:"1px dashed var(--border)", borderRadius:14,
                  padding:24, textAlign:"center", color:"var(--muted-2)", fontSize:13,
                }}>กรุณาเลือกรูปที่ไม่ติดข้อมูลส่วนตัว เช่น ทะเบียนรถ</div>
              </div>
              <div className="card-flat" style={{padding:18, background:"var(--soft-grey)", border:"none"}}>
                <p className="caption" style={{lineHeight:1.6, color:"var(--muted)"}}>
                  การส่งคำขอนี้ ไม่ใช่ การอนุมัติเคลมอัตโนมัติ ทีมงานจะตรวจสอบ record ตามสิทธิ์ก่อนนัดหมายหรือเปิดเคสในระบบจริง
                </p>
              </div>
              <div className="checkbox-row" style={{marginTop:18, marginBottom:24}}>
                <input id="pdpa-i" type="checkbox" required/>
                <label htmlFor="pdpa-i">ยินยอมตาม PDPA และยอมรับว่าเป็นคำขอตรวจสอบ</label>
              </div>
              <button className="btn btn-primary btn-lg" type="submit">ส่งคำขอตรวจสอบ <Icon name="arrow-right" size={14}/></button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

// Admin
export const AdminPage = ({ go }) => {
  const [tab, setTab] = React.useState("import");
  return (
    <main data-screen-label="10 Admin" style={{background:"var(--soft-grey)", minHeight:"calc(100vh - 56px)"}}>
      <div className="container" style={{paddingTop:32, paddingBottom:48}}>
        <div className="thai between" style={{marginBottom:24, flexWrap:"wrap", gap:12}}>
          <div>
            <div className="caption" style={{textTransform:"uppercase", letterSpacing:"0.1em"}}>Admin Console</div>
            <h1 className="h-2" style={{marginTop:6}}>NEXS Operations</h1>
          </div>
          <div className="row">
            <span className="pill"><span className="dot" style={{background:"var(--status-active)"}}/>Admin · Operations</span>
            <button className="btn btn-ghost btn-sm" onClick={()=>go("home")}>ออกจากระบบ</button>
          </div>
        </div>

        <div className="thai" style={{display:"flex", gap:4, padding:4, borderRadius:12, background:"white", border:"1px solid var(--hairline)", width:"fit-content", marginBottom:24}}>
          {[["import","Serial Import"],["dealers","Dealer Oversight"],["policy","Policy Config"]].map(([k,l])=>(
            <button key={k} className="btn btn-sm" onClick={()=>setTab(k)}
              style={{background: tab===k?"var(--graphite)":"transparent", color: tab===k?"white":"var(--graphite)"}}>{l}</button>
          ))}
        </div>

        {tab === "import" && <AdminImport/>}
        {tab === "dealers" && <AdminDealers/>}
        {tab === "policy" && <AdminPolicy/>}
      </div>
    </main>
  );
};

const AdminImport = () => (
  <div className="grid-2 thai" style={{gap:20, alignItems:"flex-start"}}>
    <div className="card" style={{padding:28}}>
      <h3 className="h-3" style={{marginBottom:6}}>Serial Import · Dry Run</h3>
      <p className="body" style={{marginBottom:18}}>อัปโหลด CSV เพื่อตรวจสอบ duplicate และ map model code ก่อน import จริง</p>
      <div style={{border:"1px dashed var(--border)", borderRadius:14, padding:32, textAlign:"center"}}>
        <div className="caption" style={{color:"var(--muted-2)", fontFamily:"var(--font-mono)"}}>serials_2026Q1.csv</div>
        <div style={{marginTop:8, fontSize:14}}>วาง CSV ที่นี่ หรือเลือกไฟล์</div>
      </div>
      <div className="row" style={{marginTop:16, justifyContent:"flex-end", gap:10}}>
        <button className="btn btn-ghost btn-sm">Reset</button>
        <button className="btn btn-primary btn-sm">Run dry-run</button>
      </div>
    </div>
    <div className="card" style={{padding:28}}>
      <h3 className="h-3" style={{marginBottom:14}}>Validation Result</h3>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:18}}>
        {[["1,248","Total"],["1,231","Valid"],["17","Issues"]].map(([n,l],i)=>(
          <div key={i} style={{padding:14, border:"1px solid var(--hairline)", borderRadius:10}}>
            <div className="caption" style={{color:"var(--muted-2)", textTransform:"uppercase", letterSpacing:"0.08em"}}>{l}</div>
            <div style={{fontFamily:"var(--font-display)", fontSize:22, fontWeight:500}}>{n}</div>
          </div>
        ))}
      </div>
      <div style={{border:"1px solid var(--hairline)", borderRadius:10, overflow:"hidden", fontSize:13}}>
        {[
          ["B-1100MXY0401001A","Clear · Begin","valid","—"],
          ["P-2200ABC0344008X","Clear · Prime","valid","—"],
          ["PRO-9988QQQ0401123Z","Clear · Pro","duplicate","Found in batch 2025-04"],
          ["M-7700XYZ0398002K","Matte · Pro","valid","Internal variant"],
          ["U-5511LLL0398099Q","Color · Ultimate CF","valid","—"],
        ].map((r,i)=>(
          <div key={i} style={{display:"grid", gridTemplateColumns:"1.6fr 1fr 100px 1.5fr", gap:12, padding:"10px 14px", borderTop: i===0?"none":"1px solid var(--hairline)", alignItems:"center"}}>
            <span style={{fontFamily:"var(--font-mono)", fontSize:12}}>{r[0]}</span>
            <span>{r[1]}</span>
            <span className={`pill ${r[2]==="duplicate"?"pill-warn":"pill-active"}`} style={{fontSize:10, padding:"2px 8px"}}><span className="dot"/>{r[2]}</span>
            <span className="muted">{r[3]}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AdminDealers = () => (
  <div className="card thai" style={{padding:0, overflow:"hidden"}}>
    <div className="between" style={{padding:"18px 24px", borderBottom:"1px solid var(--hairline)"}}>
      <div>
        <div className="caption" style={{textTransform:"uppercase", letterSpacing:"0.08em"}}>Dealers</div>
        <div style={{fontFamily:"var(--font-display)", fontWeight:500, fontSize:18, marginTop:2}}>32 ตัวแทนจำหน่ายในระบบ</div>
      </div>
      <div className="row" style={{gap:8}}>
        <span style={{position:"relative"}}>
          <Icon name="search" size={14}/>
          <input className="input" style={{height:36, fontSize:13, paddingLeft:32, width:240}} placeholder="ค้นหา dealer..."/>
        </span>
        <button className="btn btn-primary btn-sm">+ เพิ่ม Dealer</button>
      </div>
    </div>
    <div style={{display:"grid", gridTemplateColumns:"2fr 1.4fr 1fr 1fr 1fr 100px", padding:"12px 24px", borderBottom:"1px solid var(--hairline)", background:"var(--light-card)", fontSize:11, color:"var(--muted-2)", textTransform:"uppercase", letterSpacing:"0.08em"}}>
      <span>Dealer</span><span>Region</span><span>Active warr.</span><span>This month</span><span>Support</span><span>Status</span>
    </div>
    {[
      ["NEXS Authorized · Bangkok Central","BKK","146","12","0","Active"],
      ["NEXS Authorized · Phuket","South","98","8","2","Active"],
      ["NEXS Authorized · Chiang Mai","North","72","6","1","Active"],
      ["NEXS Authorized · Khon Kaen","NE","41","3","0","Active"],
      ["NEXS Pending · Hua Hin","Central","0","0","0","Pending"],
    ].map((r,i)=>(
      <div key={i} style={{display:"grid", gridTemplateColumns:"2fr 1.4fr 1fr 1fr 1fr 100px", padding:"14px 24px", borderTop: i===0?"none":"1px solid var(--hairline)", alignItems:"center", fontSize:13.5}}>
        <span style={{fontWeight:500}}>{r[0]}</span>
        <span className="muted">{r[1]}</span>
        <span style={{fontFamily:"var(--font-mono)"}}>{r[2]}</span>
        <span style={{fontFamily:"var(--font-mono)"}}>{r[3]}</span>
        <span style={{fontFamily:"var(--font-mono)"}}>{r[4]}</span>
        <span className={`pill ${r[5]==="Pending"?"pill-warn":"pill-active"}`} style={{fontSize:10, padding:"2px 8px"}}><span className="dot"/>{r[5]}</span>
      </div>
    ))}
  </div>
);

const AdminPolicy = () => (
  <div className="grid-2 thai" style={{gap:20}}>
    <div className="card" style={{padding:28}}>
      <h3 className="h-3" style={{marginBottom:6}}>Public Pricing Policy</h3>
      <p className="body" style={{marginBottom:14}}>กฎเหล็ก: ห้ามแสดงราคาบนเว็บ public — ใช้ "{`ขอใบเสนอราคา / Get a Quote`}" เป็น CTA แทน</p>
      <div className="row" style={{gap:8}}>
        <span className="pill pill-active"><span className="dot"/>No Public Pricing · Locked v5.2</span>
      </div>
      <p className="caption" style={{marginTop:14, color:"var(--nexs-ink-soft)", lineHeight:1.6}}>
        Locked by Sprint 0 Decision v5.2 — ไม่มี price field ใน public schema, template, หรือ asset
      </p>
    </div>
    <div className="card" style={{padding:28}}>
      <h3 className="h-3" style={{marginBottom:6}}>Approved Public Claims</h3>
      <p className="body" style={{marginBottom:14}}>เปิด/ปิด claim ที่ได้รับอนุมัติ ก่อนแสดงบนเว็บ public</p>
      <div className="stack-12">
        {[
          ["QR-based warranty verification", true],
          ["Digital warranty card", true],
          ["Warranty-backed after-sales support", true],
          ["Self-healing", false],
          ["Anti-yellowing", false],
          ["1000+ colors", false],
        ].map(([l,on],i)=>(
          <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom: i===5?"none":"1px solid var(--hairline)", fontSize:14}}>
            <span style={{color: on?"var(--graphite)":"var(--muted)"}}>{l}</span>
            <span className={`pill ${on?"pill-active":""}`} style={{fontSize:10, padding:"2px 8px"}}>
              <span className="dot"/>{on?"Approved":"Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
