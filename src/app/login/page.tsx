import { getImageSlot } from '@/content/image-assets';

export default function LoginPage() {
  const visual = getImageSlot('dealer_workflow_visual');

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Dealer / Admin Login</p>
          <h1>เข้าสู่ระบบตัวแทนจำหน่าย</h1>
          <p className="lead">Skeleton สำหรับ dealer/admin login ก่อนต่อ server-side auth และ session จริง</p>
          <form className="form-shell">
            <label htmlFor="email">Email</label>
            <div className="input-row">
              <input id="email" placeholder="dealer@example.com" type="email" />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-row">
              <input id="password" placeholder="••••••••" type="password" />
            </div>
            <button className="button primary" type="button">
              Login mock
            </button>
          </form>
        </div>
        <div className="hero-visual">{visual.path && <img src={visual.path} alt={visual.alt} />}</div>
      </section>
    </main>
  );
}
