import React from 'react';
import { Icon } from './shared.jsx';
import { CTA, BRAND } from '../data/brand.js';

// Centralized lead capture endpoint — Sprint 4 will replace this stub with real Sanity/CRM webhook
async function postLead(payload) {
  // Routes to nexsppf channel per Sprint 0 Decision Lock v5.2
  // TODO Sprint 4: const res = await fetch(import.meta.env.VITE_LEAD_ENDPOINT, {...})
  console.log("[NEXS lead → nexsppf]", payload);
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: `lead_submit_${payload.formType}`,
      product_interest: payload.product_interest,
      source_page: window.location.hash || "/",
    });
  }
  await new Promise(r => setTimeout(r, 300));
  return { ok: true };
}

const FormShell = ({ title, subtitle, children, onSubmit, submitting, disabled, ctaLabel }) => (
  <form className="card thai" style={{padding:40}} onSubmit={onSubmit}>
    {title && <h3 className="h-2" style={{marginBottom:8}}>{title}</h3>}
    {subtitle && <p className="body" style={{marginBottom:24}}>{subtitle}</p>}
    {children}
    <div className="row" style={{justifyContent:"space-between", flexWrap:"wrap", gap:12, marginTop:8}}>
      <button className="btn btn-primary btn-lg" type="submit" disabled={disabled || submitting}>
        {submitting ? "กำลังส่ง..." : (ctaLabel || CTA.primary)} <Icon name="arrow-right" size={14}/>
      </button>
      <span className="caption">ใช้เวลาประมาณ 1 นาที</span>
    </div>
  </form>
);

const Success = ({ message, onReset }) => (
  <div className="card thai" style={{textAlign:"center", padding:"64px 32px", maxWidth:560, margin:"0 auto"}}>
    <div style={{width:48, height:48, borderRadius:"50%", background:"rgba(27,127,79,0.1)", color:"var(--status-active)", display:"grid", placeItems:"center", margin:"0 auto"}}>
      <Icon name="check" size={22}/>
    </div>
    <h3 className="h-2" style={{marginTop:24}}>{message || "ได้รับข้อมูลแล้ว"}</h3>
    <p className="body" style={{marginTop:12}}>
      ทีมงาน NEXS หรือตัวแทนจำหน่ายในพื้นที่จะติดต่อกลับโดยเร็วที่สุด
    </p>
    {onReset && (
      <button className="btn btn-secondary btn-sm" style={{marginTop:24}} onClick={onReset}>
        ส่งคำขออื่น
      </button>
    )}
  </div>
);

// Quote Request — embedded in product pages
export const QuoteRequestForm = ({ defaultProduct = "ขอคำแนะนำเลือกรุ่น", onSuccess }) => {
  const [data, setData] = React.useState({
    name: "", phone: "", line: "",
    vehicle: "", product_interest: defaultProduct,
    service_location: "",
    message: "",
    consent: false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const set = (k,v) => setData(s=>({...s,[k]:v}));

  const handle = async (e) => {
    e.preventDefault();
    if (!data.consent) return;
    setSubmitting(true);
    try {
      await postLead({ formType: "quote", ...data });
      setSubmitted(true);
      onSuccess && onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <Success message="ได้รับคำขอใบเสนอราคาแล้ว" onReset={()=>{ setSubmitted(false); setData({name:"",phone:"",line:"",vehicle:"",product_interest:defaultProduct,service_location:"",message:"",consent:false}); }}/>;

  return (
    <FormShell
      title="ขอใบเสนอราคา"
      subtitle="กรอกข้อมูลสั้นๆ ทีมงานหรือตัวแทนจำหน่ายในพื้นที่จะติดต่อกลับเพื่อยืนยันรายละเอียดและเสนอราคา"
      onSubmit={handle}
      submitting={submitting}
      disabled={!data.consent}
      ctaLabel="ส่งคำขอใบเสนอราคา"
    >
      <div className="field-row">
        <div className="field"><label className="label">ชื่อ–นามสกุล</label>
          <input className="input" required value={data.name} onChange={e=>set("name",e.target.value)}/></div>
        <div className="field"><label className="label">เบอร์โทร</label>
          <input className="input" required value={data.phone} onChange={e=>set("phone",e.target.value)} placeholder="08x-xxx-xxxx"/></div>
      </div>
      <div className="field-row">
        <div className="field"><label className="label">LINE ID <span className="opt">(ถ้ามี)</span></label>
          <input className="input" value={data.line} onChange={e=>set("line",e.target.value)} placeholder={"@"+BRAND.handle}/></div>
        <div className="field"><label className="label">พื้นที่ที่ต้องการติดตั้ง</label>
          <input className="input" value={data.service_location} onChange={e=>set("service_location",e.target.value)} placeholder="จังหวัด / เขต"/></div>
      </div>
      <div className="field">
        <label className="label">รุ่นรถ</label>
        <input className="input" required value={data.vehicle} onChange={e=>set("vehicle",e.target.value)} placeholder="ยี่ห้อ / รุ่น / ปี"/>
      </div>
      <div className="field">
        <label className="label">รุ่นฟิล์มที่สนใจ</label>
        <select className="select" value={data.product_interest} onChange={e=>set("product_interest",e.target.value)}>
          <option>ขอคำแนะนำเลือกรุ่น</option>
          <option>Clear PPF — Begin</option>
          <option>Clear PPF — Prime</option>
          <option>Clear PPF — Pro</option>
          <option>Clear PPF — Ultimate</option>
          <option>Matte PPF — Prime</option>
          <option>Matte PPF — Pro</option>
          <option>Matte PPF — Ultimate</option>
          <option>Color PPF — Begin</option>
          <option>Color PPF — Prime</option>
          <option>Color PPF — Pro</option>
          <option>Color PPF — Ultimate</option>
          <option>Color PPF — Ultimate Carbon Fiber</option>
        </select>
      </div>
      <div className="field">
        <label className="label">รายละเอียดเพิ่มเติม <span className="opt">(ไม่บังคับ)</span></label>
        <textarea className="textarea" value={data.message} onChange={e=>set("message",e.target.value)} placeholder="พื้นที่ติดตั้ง / ระยะเวลาที่ต้องการ"/>
      </div>
      <div className="checkbox-row" style={{marginBottom:8}}>
        <input id="pdpa-q" type="checkbox" checked={data.consent} onChange={e=>set("consent",e.target.checked)}/>
        <label htmlFor="pdpa-q">ยินยอมตาม PDPA และเข้าใจว่าใบเสนอราคาขึ้นอยู่กับขนาดรถและพื้นที่ติดตั้ง</label>
      </div>
    </FormShell>
  );
};

// Find Installer Form — short form, routed to nexsppf installer channel
export const FindInstallerForm = ({ onSuccess }) => {
  const [data, setData] = React.useState({
    name: "", phone: "", province: "", vehicle: "", product_interest: "ขอคำแนะนำ", consent: false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const set = (k,v) => setData(s=>({...s,[k]:v}));

  const handle = async (e) => {
    e.preventDefault();
    if (!data.consent) return;
    setSubmitting(true);
    try {
      await postLead({ formType: "installer", ...data });
      setSubmitted(true);
      onSuccess && onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <Success message="NEXS team will recommend installer"/>;

  return (
    <FormShell
      title="หาตัวแทนจำหน่ายในพื้นที่"
      subtitle="กรอกข้อมูลสั้นๆ ทีมงานจะแนะนำตัวแทนจำหน่ายและร้านติดตั้งที่ใกล้คุณที่สุด"
      onSubmit={handle}
      submitting={submitting}
      disabled={!data.consent}
      ctaLabel={CTA.findInstaller}
    >
      <div className="field-row">
        <div className="field"><label className="label">ชื่อ</label>
          <input className="input" required value={data.name} onChange={e=>set("name",e.target.value)}/></div>
        <div className="field"><label className="label">เบอร์โทร</label>
          <input className="input" required value={data.phone} onChange={e=>set("phone",e.target.value)} placeholder="08x-xxx-xxxx"/></div>
      </div>
      <div className="field-row">
        <div className="field"><label className="label">จังหวัด</label>
          <input className="input" required value={data.province} onChange={e=>set("province",e.target.value)} placeholder="กรุงเทพฯ"/></div>
        <div className="field"><label className="label">รุ่นรถ</label>
          <input className="input" value={data.vehicle} onChange={e=>set("vehicle",e.target.value)} placeholder="ยี่ห้อ / รุ่น / ปี"/></div>
      </div>
      <div className="field">
        <label className="label">รุ่นฟิล์มที่สนใจ</label>
        <select className="select" value={data.product_interest} onChange={e=>set("product_interest",e.target.value)}>
          <option>ขอคำแนะนำ</option>
          <option>Clear PPF</option>
          <option>Matte PPF</option>
          <option>Color PPF</option>
        </select>
      </div>
      <div className="checkbox-row" style={{marginBottom:8}}>
        <input id="pdpa-i2" type="checkbox" checked={data.consent} onChange={e=>set("consent",e.target.checked)}/>
        <label htmlFor="pdpa-i2">ยินยอมตาม PDPA เพื่อให้ทีมงานติดต่อกลับ</label>
      </div>
    </FormShell>
  );
};
