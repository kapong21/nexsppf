import React from 'react';
import { useTweaks, TweaksPanel, TweakSection, TweakSelect } from './tweaks-panel.jsx';
import { useSEO } from './hooks/useSEO.js';
import { Icon } from './components/shared.jsx';
import { Nav, Footer } from './components/chrome.jsx';
import { Home } from './components/home.jsx';
import { ClearPPFPage } from './components/products.jsx';
import { MattePPFPage, ColorPPFPage } from './components/matte-color.jsx';
import { TechnologyPage } from './components/technology.jsx';
import { ComparePage } from './components/compare.jsx';
import { AboutPage } from './components/about.jsx';
import { FaqPage } from './components/faq.jsx';
import { WarrantyPage, WarrantyCardPage } from './components/warranty.jsx';
import { DealerPage, ContactPage, LoginPage } from './components/dealer-contact-login.jsx';
import { SupportWarrantyPage, SupportInspectionPage, AdminPage } from './components/support-admin.jsx';

const ROUTES = [
  "home",
  "clear-ppf", "matte-ppf", "color-ppf",
  "technology", "compare",
  "for-dealers",
  "about-nexs",
  "faq",
  "contact",
  "warranty", "warranty-card",
  "login", "admin",
  "support-warranty", "support-inspection",
];

export default function App() {
  const [t, setTweak] = useTweaks({
    fontStack: "inter",
    showTweakHints: false,
  });

  React.useEffect(() => {
    const map = {
      inter: '"Inter", "Noto Sans Thai", "IBM Plex Sans Thai", -apple-system, system-ui, sans-serif',
      manrope: '"Manrope", "Noto Sans Thai", -apple-system, system-ui, sans-serif',
      plex: '"IBM Plex Sans Thai", "Inter", -apple-system, system-ui, sans-serif',
    };
    document.documentElement.style.setProperty('--font-display', map[t.fontStack] || map.inter);
    document.documentElement.style.setProperty('--font-base', map[t.fontStack] || map.inter);
  }, [t.fontStack]);

  const [route, setRoute] = React.useState("home");
  const [cardSerial, setCardSerial] = React.useState("PRO-1196MXY0401178Q");
  const [cardState, setCardState] = React.useState("active");

  React.useEffect(() => {
    const sync = () => {
      const h = (location.hash || "#home").slice(1);
      if (h.startsWith("warranty-card/")) {
        const [, s, st] = h.split("/");
        setCardSerial(decodeURIComponent(s || "PRO-1196MXY0401178Q"));
        setCardState(st || "active");
        setRoute("warranty-card");
      } else if (ROUTES.includes(h)) setRoute(h);
      else setRoute("home");
      window.scrollTo(0, 0);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = (r) => { location.hash = "#" + r; };
  const navigateToCard = (serial, state = "active") => {
    location.hash = `#warranty-card/${encodeURIComponent(serial)}/${state}`;
  };

  useSEO(route);

  const showChrome = !["warranty-card", "admin", "login"].includes(route);

  return (
    <div className="app">
      {showChrome && <Nav route={route} go={go} />}

      {route === "home" && <Home go={go} />}
      {route === "clear-ppf" && <ClearPPFPage go={go} />}
      {route === "matte-ppf" && <MattePPFPage go={go} />}
      {route === "color-ppf" && <ColorPPFPage go={go} />}
      {route === "technology" && <TechnologyPage go={go} />}
      {route === "compare" && <ComparePage go={go} />}
      {route === "for-dealers" && <DealerPage go={go} />}
      {route === "about-nexs" && <AboutPage go={go} />}
      {route === "faq" && <FaqPage go={go} />}
      {route === "contact" && <ContactPage go={go} />}
      {route === "warranty" && <WarrantyPage go={go} navigateToCard={navigateToCard} />}
      {route === "warranty-card" && <WarrantyCardPage serial={cardSerial} state={cardState} go={go} />}
      {route === "login" && <LoginPage go={go} />}
      {route === "admin" && <AdminPage go={go} />}
      {route === "support-warranty" && <SupportWarrantyPage go={go} />}
      {route === "support-inspection" && <SupportInspectionPage go={go} />}

      {showChrome && <Footer go={go} />}

      <PrototypeNav route={route} go={go} navigateToCard={navigateToCard} />

      <TweaksPanel title="NEXS Tweaks">
        <TweakSection label="Typography">
          <TweakSelect label="Display font"
            value={t.fontStack} onChange={v => setTweak("fontStack", v)}
            options={[
              { value: "inter", label: "Inter (default)" },
              { value: "manrope", label: "Manrope" },
              { value: "plex", label: "IBM Plex Sans Thai" },
            ]} />
        </TweakSection>
        <TweakSection label="Quick Navigation">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[
              ["home", "Home"],
              ["clear-ppf", "Clear PPF"], ["matte-ppf", "Matte PPF"], ["color-ppf", "Color PPF"],
              ["technology", "Technology"], ["compare", "Compare"],
              ["for-dealers", "Dealers"], ["about-nexs", "About"], ["faq", "FAQ"],
              ["warranty", "Warranty"], ["contact", "Contact"],
              ["login", "Login"], ["admin", "Admin"],
              ["support-warranty", "แจ้งบัตรหาย"], ["support-inspection", "Inspection"],
            ].map(([r, l]) => (
              <button key={r} className="btn btn-sm thai"
                onClick={() => go(r)}
                style={{
                  background: route === r ? "var(--nexs-ink)" : "var(--nexs-canvas-soft)",
                  color: route === r ? "white" : "var(--nexs-ink)",
                  fontSize: 11, height: 30, padding: "0 10px",
                  border: "1px solid var(--nexs-hairline)",
                }}>
                {l}
              </button>
            ))}
          </div>
        </TweakSection>
        <TweakSection label="Warranty Card State">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[["active", "Active"], ["not-registered", "Not Reg."], ["invalid", "Invalid"]].map(([k, l]) => (
              <button key={k} className="btn btn-sm" onClick={() => navigateToCard("PRO-1196MXY0401178Q", k)}
                style={{ background: "var(--nexs-canvas-soft)", fontSize: 12, height: 32, border: "1px solid var(--nexs-hairline)" }}>{l}</button>
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function PrototypeNav({ route, go, navigateToCard }) {
  const [open, setOpen] = React.useState(false);
  const groups = [
    ["Public Marketing", [
      ["home", "Home"],
      ["clear-ppf", "Clear PPF"], ["matte-ppf", "Matte PPF"], ["color-ppf", "Color PPF"],
      ["technology", "Technology"], ["compare", "Compare"],
      ["for-dealers", "For Dealers"], ["about-nexs", "About NEXS"],
      ["faq", "FAQ"], ["contact", "Contact"],
    ]],
    ["Digital Warranty", [
      ["warranty", "Warranty Lookup"],
      ["__active", "Card · Active"],
      ["__notreg", "Card · Not Registered"],
      ["__invalid", "Card · Invalid"],
    ]],
    ["Support", [["support-warranty", "แจ้งบัตร / QR หาย"], ["support-inspection", "นัดตรวจสอบ"]]],
    ["Auth", [["login", "Login"], ["admin", "Admin"]]],
  ];
  return (
    <>
      <button onClick={() => setOpen(!open)}
        style={{
          position: "fixed", left: 16, bottom: 16, zIndex: 60,
          width: 48, height: 48, borderRadius: "50%",
          background: "var(--nexs-ink)", color: "white",
          border: "none", boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
          display: "grid", placeItems: "center", cursor: "pointer",
        }} aria-label="prototype navigation">
        <Icon name={open ? "x" : "map"} size={18} />
      </button>
      {open && (
        <div className="thai" style={{
          position: "fixed", left: 16, bottom: 76, zIndex: 60,
          width: 300, padding: 16, background: "white",
          border: "1px solid var(--nexs-hairline)", borderRadius: 18,
          boxShadow: "0 24px 48px -12px rgba(0,0,0,0.18)",
          maxHeight: "70vh", overflow: "auto",
        }}>
          <div className="caption" style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--nexs-ink-soft)", marginBottom: 8 }}>Prototype Map</div>
          {groups.map(([g, links], gi) => (
            <div key={gi} style={{ marginTop: gi === 0 ? 0 : 14 }}>
              <div className="caption" style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, color: "var(--nexs-red)" }}>{g}</div>
              <div style={{ display: "grid", gap: 4 }}>
                {links.map(([r, l]) => {
                  const active = route === r;
                  return (
                    <button key={r}
                      onClick={() => {
                        if (r === "__active") navigateToCard("PRO-1196MXY0401178Q", "active");
                        else if (r === "__notreg") navigateToCard("PRO-9999XYZ0401000A", "not-registered");
                        else if (r === "__invalid") navigateToCard("INVALID-CODE", "invalid");
                        else go(r);
                        setOpen(false);
                      }}
                      style={{
                        textAlign: "left", padding: "8px 10px",
                        fontSize: 13, color: active ? "var(--nexs-ink)" : "var(--nexs-ink-muted)",
                        background: active ? "var(--nexs-canvas-soft)" : "transparent",
                        border: "none", borderRadius: 8, cursor: "pointer",
                      }}>
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
