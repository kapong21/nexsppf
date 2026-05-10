'use client';

import { useState } from 'react';
import { BrandMark } from '../preview-redesign/variant-b-preview';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="variant-b-shell variant-b-login-shell">
      <div className="variant-b-login-wrap">
        <div className="variant-b-login-head">
          <BrandMark />
          <h1>Dealer / Admin Login</h1>
          <p>เข้าสู่ระบบเพื่อใช้งาน Dealer Console</p>
        </div>
        <form
          className="variant-b-login-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Authentication will be wired up by the back-end team');
          }}
        >
          <label>
            อีเมล
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dealer@nexsppf.com"
              autoComplete="username"
            />
          </label>
          <label>
            รหัสผ่าน
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          <div className="variant-b-login-row">
            <label className="variant-b-login-remember">
              <input type="checkbox" /> จดจำการเข้าสู่ระบบ
            </label>
            <a className="variant-b-login-forgot" href="/contact">
              ลืมรหัสผ่าน?
            </a>
          </div>
          <button type="submit">เข้าสู่ระบบ</button>
          <p className="variant-b-login-note">
            เฉพาะตัวแทนจำหน่ายและ Admin ที่ได้รับการแต่งตั้งจาก NEXS เท่านั้น
            <br />
            <a href="/contact">สมัครเป็นตัวแทนจำหน่าย</a> · <a href="/">กลับหน้าแรก</a>
          </p>
        </form>
        <p className="variant-b-login-secured">Secured by NEXS</p>
      </div>
    </main>
  );
}
