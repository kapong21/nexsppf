'use client';

import { Eyebrow, Icon, ImgPh } from './shared';
import { BRAND_STORY, NEXS_STANDARD, TECH_BENEFITS, BRAND, CTA } from '@/data/brand';
import { useGo } from '@/lib/use-go';

export const AboutPage = () => {
  const go = useGo();
  return (
    <main data-screen-label="07 About NEXS">
      <section className="page-hero">
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
            <div>
              <Eyebrow>About NEXS</Eyebrow>
              <h1 className="h-1" style={{ marginTop: 14 }}>{BRAND.descriptor.split(' ').slice(0, 2).join(' ')} for Perfect Surfaces</h1>
              <p className="lede thai" style={{ marginTop: 20 }}>
                แบรนด์ฟิล์มที่พัฒนาจากความเข้าใจในผิวรถจริง งานติดตั้งจริง และมาตรฐานของเจ้าของรถระดับพรีเมียม
              </p>
              <div className="row" style={{ marginTop: 32 }}>
                <button className="btn btn-primary btn-lg" onClick={() => go('clear-ppf')}>{CTA.exploreFilmSystems}</button>
                <button className="btn btn-ghost btn-lg" onClick={() => go('for-dealers')}>{CTA.becomeDealer}</button>
              </div>
            </div>
            <ImgPh ratio="4/3" label="About NEXS · brand hero · studio detail"/>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 880 }}>
            <Eyebrow>Brand Story</Eyebrow>
            <h2 className="h-1" style={{ marginTop: 14, marginBottom: 32 }}>{BRAND.campaign}</h2>
            <div className="stack-24 thai">
              {BRAND_STORY.map((para, i) => (
                <p key={i} className="lede" style={{ color: 'var(--nexs-ink)' }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <Eyebrow>The NEXS Standard</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>มาตรฐานที่ทำให้ลูกค้าและร้านติดตั้งวางใจ</h2>
          </div>
          <div className="grid-3">
            {NEXS_STANDARD.map((c, i) => (
              <div key={i} className="card thai" style={{ background: 'var(--nexs-canvas)' }}>
                <div className="caption" style={{ fontFamily: 'var(--font-mono)', color: 'var(--nexs-red)' }}>0{i + 1}</div>
                <h3 className="h-3" style={{ marginTop: 10, marginBottom: 10, fontSize: 18 }}>{c.title}</h3>
                <p className="body">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <Eyebrow>Technology Behind the Film</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>ทำงานในทุกวัน แม้คุณจะมองไม่เห็น</h2>
          </div>
          <div className="grid-3">
            {TECH_BENEFITS.slice(0, 6).map((b, i) => (
              <div key={i} className="card-flat thai">
                <div style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--nexs-hairline)', display: 'grid', placeItems: 'center', marginBottom: 16, color: 'var(--nexs-red)' }}>
                  <Icon name={['layers', 'sparkle', 'wand', 'droplet', 'shield', 'check'][i]} size={16}/>
                </div>
                <h3 className="h-3" style={{ fontSize: 16, marginBottom: 6 }}>{b.title}</h3>
                <div className="caption" style={{ marginBottom: 8 }}>{b.th}</div>
                <p className="body" style={{ fontSize: 13 }}>{b.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <h2 className="h-1 thai" style={{ maxWidth: 720, margin: '0 auto' }}>พร้อมเป็นส่วนหนึ่งของเครือข่าย NEXS?</h2>
          <p className="lede thai" style={{ margin: '16px auto 32px', maxWidth: 560 }}>
            ติดต่อทีมงานเพื่อสอบถามสินค้า หรือร่วมเป็นตัวแทนจำหน่าย NEXS
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg thai" onClick={() => go('contact')}>Contact NEXS</button>
            <button className="btn btn-ghost btn-lg" onClick={() => go('for-dealers')}>{CTA.becomeDealer}</button>
          </div>
        </div>
      </section>
    </main>
  );
};
