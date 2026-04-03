import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const T = {
  bg: "#f5f0eb", bg2: "#ede7e0", card: "#ffffff",
  border: "#e2ddd6", accent: "#0284c7", accentLight: "#e0f2fe", accentDark: "#0369a1",
  text: "#1e293b", textMid: "#475569", textDim: "#94a3b8",
  success: "#16a34a",
};

const fmt = n => "$" + Math.round(n).toLocaleString();

const STATES = [
  { name: "Alabama", slug: "alabama", labor: 0.82, permit: 1000, frost: false },
  { name: "Alaska", slug: "alaska", labor: 1.45, permit: 2500, frost: true },
  { name: "Arizona", slug: "arizona", labor: 1.02, permit: 1600, frost: false },
  { name: "Arkansas", slug: "arkansas", labor: 0.78, permit: 900, frost: false },
  { name: "California", slug: "california", labor: 1.38, permit: 2900, frost: false },
  { name: "Colorado", slug: "colorado", labor: 1.10, permit: 1900, frost: true },
  { name: "Connecticut", slug: "connecticut", labor: 1.25, permit: 2400, frost: true },
  { name: "Delaware", slug: "delaware", labor: 1.08, permit: 1700, frost: true },
  { name: "Florida", slug: "florida", labor: 0.92, permit: 1300, frost: false },
  { name: "Georgia", slug: "georgia", labor: 0.88, permit: 1200, frost: false },
  { name: "Hawaii", slug: "hawaii", labor: 1.55, permit: 3200, frost: false },
  { name: "Idaho", slug: "idaho", labor: 0.98, permit: 1500, frost: true },
  { name: "Illinois", slug: "illinois", labor: 1.05, permit: 1800, frost: true },
  { name: "Indiana", slug: "indiana", labor: 0.90, permit: 1300, frost: true },
  { name: "Iowa", slug: "iowa", labor: 0.88, permit: 1200, frost: true },
  { name: "Kansas", slug: "kansas", labor: 0.84, permit: 1100, frost: true },
  { name: "Kentucky", slug: "kentucky", labor: 0.83, permit: 1100, frost: true },
  { name: "Louisiana", slug: "louisiana", labor: 0.80, permit: 1000, frost: false },
  { name: "Maine", slug: "maine", labor: 1.12, permit: 1900, frost: true },
  { name: "Maryland", slug: "maryland", labor: 1.15, permit: 2100, frost: true },
  { name: "Massachusetts", slug: "massachusetts", labor: 1.30, permit: 2500, frost: true },
  { name: "Michigan", slug: "michigan", labor: 0.95, permit: 1500, frost: true },
  { name: "Minnesota", slug: "minnesota", labor: 1.02, permit: 1600, frost: true },
  { name: "Mississippi", slug: "mississippi", labor: 0.76, permit: 900, frost: false },
  { name: "Missouri", slug: "missouri", labor: 0.84, permit: 1100, frost: true },
  { name: "Montana", slug: "montana", labor: 1.00, permit: 1500, frost: true },
  { name: "Nebraska", slug: "nebraska", labor: 0.86, permit: 1100, frost: true },
  { name: "Nevada", slug: "nevada", labor: 1.05, permit: 1700, frost: false },
  { name: "New Hampshire", slug: "new-hampshire", labor: 1.15, permit: 2000, frost: true },
  { name: "New Jersey", slug: "new-jersey", labor: 1.28, permit: 2600, frost: true },
  { name: "New Mexico", slug: "new-mexico", labor: 0.90, permit: 1300, frost: false },
  { name: "New York", slug: "new-york", labor: 1.35, permit: 2800, frost: true },
  { name: "North Carolina", slug: "north-carolina", labor: 0.87, permit: 1200, frost: false },
  { name: "North Dakota", slug: "north-dakota", labor: 0.95, permit: 1400, frost: true },
  { name: "Ohio", slug: "ohio", labor: 0.92, permit: 1400, frost: true },
  { name: "Oklahoma", slug: "oklahoma", labor: 0.80, permit: 1000, frost: false },
  { name: "Oregon", slug: "oregon", labor: 1.12, permit: 1900, frost: true },
  { name: "Pennsylvania", slug: "pennsylvania", labor: 1.10, permit: 2000, frost: true },
  { name: "Rhode Island", slug: "rhode-island", labor: 1.22, permit: 2300, frost: true },
  { name: "South Carolina", slug: "south-carolina", labor: 0.85, permit: 1100, frost: false },
  { name: "South Dakota", slug: "south-dakota", labor: 0.88, permit: 1200, frost: true },
  { name: "Tennessee", slug: "tennessee", labor: 0.83, permit: 1100, frost: false },
  { name: "Texas", slug: "texas", labor: 0.88, permit: 1100, frost: false },
  { name: "Utah", slug: "utah", labor: 1.05, permit: 1800, frost: true },
  { name: "Vermont", slug: "vermont", labor: 1.15, permit: 2000, frost: true },
  { name: "Virginia", slug: "virginia", labor: 1.02, permit: 1700, frost: true },
  { name: "Washington", slug: "washington", labor: 1.18, permit: 2100, frost: true },
  { name: "Washington D.C.", slug: "washington-dc", labor: 1.30, permit: 2800, frost: true },
  { name: "West Virginia", slug: "west-virginia", labor: 0.82, permit: 1000, frost: true },
  { name: "Wisconsin", slug: "wisconsin", labor: 0.95, permit: 1400, frost: true },
  { name: "Wyoming", slug: "wyoming", labor: 1.00, permit: 1400, frost: true },
].map(s => {
  // All-in estimate for a standard 500 sqft pool (avg depth 4.75ft, standard soil)
  const sqft = 500, avgD = 4.75, cuYd = (sqft * avgD) / 27, lab = s.labor;
  const permits = s.permit || 1500, frostC = s.frost ? 2400 : 0, cont = 0.08;

  const gShell = Math.max(48000, sqft * 82 * lab);
  const gSub = gShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + (sqft * 1.4) * 8 * lab + permits + frostC;
  const gunite = Math.round((gSub * (1 + cont)) / 1000) * 1000;

  const fShell = Math.max(35000, sqft * 60 * lab);
  const fSub = fShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + permits + frostC;
  const fiber = Math.round((fSub * (1 + cont)) / 1000) * 1000;

  const vShell = Math.max(25000, sqft * 35 * lab);
  const vSub = vShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + permits + frostC;
  const vinyl = Math.round((vSub * (1 + cont)) / 1000) * 1000;

  return { ...s, gunite, fiber, vinyl };
}).sort((a, b) => a.gunite - b.gunite);

export default function HubPage() {
  useEffect(() => {
    document.title = "Pool Cost by State 2026 — All 50 States Compared | PriceAPool";
    const setMeta = (attr, key, val) => { let el = document.querySelector(`meta[${attr}="${key}"]`); if (el) el.setAttribute('content', val); };
    setMeta('name', 'description', 'Compare inground pool costs across all 50 states in 2026. See average gunite, fiberglass, and vinyl pool prices for every state — adjusted for local labor rates and permit costs.');
    setMeta('property', 'og:title', 'Pool Cost by State 2026 — All 50 States Compared');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://priceapool.com/pool-cost-by-state');

    const schema = {
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Which state has the cheapest pool costs?", "acceptedAnswer": { "@type": "Answer", "text": "Mississippi, Arkansas, and Louisiana have the lowest pool construction costs in the US, with labor rates 20–25% below the national average. A standard gunite pool in Mississippi averages around $48,000–$65,000 vs $90,000–$140,000 in Hawaii or California." } },
        { "@type": "Question", "name": "Which state has the most expensive pool costs?", "acceptedAnswer": { "@type": "Answer", "text": "Hawaii has the most expensive pool costs — labor rates are 55% above the national average and permit costs are among the highest in the nation. California, New York, Massachusetts, and New Jersey also have significantly above-average pool costs." } },
        { "@type": "Question", "name": "How much cheaper are pools in southern states?", "acceptedAnswer": { "@type": "Answer", "text": "Pools in the South (Alabama, Mississippi, Arkansas, Tennessee, Georgia) typically cost 25–40% less than in high-cost states like California, New York, or Hawaii. Lower labor costs are the primary driver, along with lower permit fees." } },
      ]
    };
    let schemaTag = document.getElementById('hub-schema');
    if (!schemaTag) { schemaTag = document.createElement('script'); schemaTag.id = 'hub-schema'; schemaTag.type = 'application/ld+json'; document.head.appendChild(schemaTag); }
    schemaTag.textContent = JSON.stringify(schema);

    return () => {
      document.title = 'Pool Cost Calculator 2026 — How Much Does a Pool Cost in Your State?';
      if (canonical) canonical.setAttribute('href', 'https://priceapool.com/');
      const t = document.getElementById('hub-schema'); if (t) t.remove();
    };
  }, []);

  const wrap = { fontFamily: "'Instrument Sans','DM Sans',system-ui,sans-serif", color: T.text, background: T.bg, minHeight: "100vh" };
  const inner = { maxWidth: 860, margin: "0 auto", padding: "0 16px 60px" };
  const card = { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };

  const cheapest = STATES[0];
  const mostExpensive = [...STATES].sort((a, b) => b.gunite - a.gunite)[0];

  return (
    <div style={wrap}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "rgba(245,240,235,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: `linear-gradient(135deg,${T.accent},${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff" }}>🏊</div>
          <span style={{ fontSize: 15, fontWeight: 800, color: T.text, letterSpacing: "-.5px" }}>PriceAPool<span style={{ color: T.accent }}>.com</span></span>
        </Link>
        <Link to="/" style={{ fontSize: 12, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Free Calculator →</Link>
      </nav>

      <div style={inner}>
        <div style={{ padding: "40px 0 28px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>2026 Data · All 50 States + D.C.</div>
          <h1 style={{ fontSize: "clamp(24px,5vw,38px)", fontWeight: 800, color: T.text, letterSpacing: "-.5px", lineHeight: 1.15, marginBottom: 14 }}>Pool Cost by State in 2026</h1>
          <p style={{ fontSize: 15, color: T.textMid, lineHeight: 1.75, maxWidth: 680 }}>
            Pool construction costs vary by up to <strong>100%</strong> across US states, driven primarily by local labor rates and permit costs.
            The cheapest state to build a pool is <Link to={`/${cheapest.slug}`} style={{ color: T.accent, fontWeight: 700 }}>{cheapest.name}</Link> (gunite from <strong>{fmt(cheapest.gunite)}</strong>) and the most expensive is <Link to={`/${mostExpensive.slug}`} style={{ color: T.accent, fontWeight: 700 }}>{mostExpensive.name}</Link> (gunite from <strong>{fmt(mostExpensive.gunite)}</strong>).
            Click any state for a detailed breakdown and free cost calculator.
          </p>
        </div>

        {/* STAT CALLOUTS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 24 }}>
          {[
            { label: "National avg gunite pool", value: fmt(Math.round(STATES.reduce((s,x) => s + x.gunite, 0) / STATES.length / 1000) * 1000), sub: "500 sq ft, standard build" },
            { label: "Most affordable state", value: cheapest.name, sub: `Gunite from ${fmt(cheapest.gunite)}` },
            { label: "Most expensive state", value: mostExpensive.name, sub: `Gunite from ${fmt(mostExpensive.gunite)}` },
            { label: "Cost range (all states)", value: `${fmt(cheapest.gunite)}–${fmt(mostExpensive.gunite)}`, sub: "Gunite, standard 500 sq ft" },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.text, letterSpacing: "-.3px" }}>{value}</div>
              <div style={{ fontSize: 11, color: T.textDim, marginTop: 3 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* FULL TABLE */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: T.text, marginBottom: 4 }}>Average Pool Cost by State (2026)</h2>
          <p style={{ fontSize: 12, color: T.textDim, marginBottom: 16 }}>Based on a standard 500 sq ft pool. Sorted lowest to highest gunite cost. Click any state for detailed pricing.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: T.bg2 }}>
                  {["State", "Gunite / Shotcrete", "Fiberglass", "Vinyl Liner", "Permit Cost", "Season"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: T.text, borderBottom: `2px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STATES.map((s, i) => (
                  <tr key={s.slug} style={{ background: i % 2 === 0 ? T.card : T.bg }}>
                    <td style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, fontWeight: 600 }}>
                      <Link to={`/${s.slug}`} style={{ color: T.accent, textDecoration: "none" }}>{s.name}</Link>
                    </td>
                    <td style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, color: T.text, fontWeight: 700 }}>{fmt(s.gunite)}</td>
                    <td style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, color: T.textMid }}>{fmt(s.fiber)}</td>
                    <td style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, color: T.textMid }}>{fmt(s.vinyl)}</td>
                    <td style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, color: T.textDim }}>{fmt(s.permit)}+</td>
                    <td style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}` }}>
                      <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: s.frost ? T.bg2 : "#dcfce7", color: s.frost ? T.textDim : T.success, fontWeight: 600 }}>
                        {s.frost ? "Seasonal" : "Year-round"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 11, color: T.textDim, marginTop: 12, lineHeight: 1.6 }}>
            * Estimates based on 2026 national averages adjusted for state labor rates and permit costs. Actual costs vary by contractor, soil conditions, and local market. Always get 3+ written bids.
          </p>
        </div>

        {/* FAQ */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: T.text, marginBottom: 18 }}>Frequently Asked Questions</h2>
          {[
            { q: "Which state has the cheapest inground pool costs?", a: `${cheapest.name} has some of the lowest pool costs in the country, with gunite pools averaging around ${fmt(cheapest.gunite)} for a standard 500 sq ft pool — driven by below-average labor rates and lower permit costs. Other affordable states include Arkansas, Louisiana, Mississippi, Tennessee, and Georgia.` },
            { q: "Which state has the most expensive pool costs?", a: `${mostExpensive.name} has the highest pool costs, with gunite pools averaging around ${fmt(mostExpensive.gunite)}. High labor costs (${Math.round(mostExpensive.labor * 100)}% of national average) and permit costs (${fmt(mostExpensive.permit)}+) drive the premium. California, New York, New Jersey, and Massachusetts also rank among the most expensive.` },
            { q: "Why do pool costs vary so much by state?", a: "The biggest driver is local labor rates — a pool contractor in Hawaii or California charges significantly more per hour than one in Mississippi or Arkansas. Secondary drivers include local permit fees ($900 to $3,200+), soil conditions, seasonal demand (contractors in frost states build fewer pools so charge more per project), and local material costs." },
            { q: "How much does a pool cost in my state?", a: "Use the free PriceAPool calculator on the homepage, or click your state in the table above for a detailed breakdown. The calculator adjusts for your state's labor rate, permit costs, frost climate, and even your specific ZIP code for metro area pricing." },
          ].map((faq, i) => (
            <div key={i} style={{ borderTop: i === 0 ? "none" : `1px solid ${T.border}`, paddingTop: i === 0 ? 0 : 14, marginTop: i === 0 ? 0 : 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>{faq.q}</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{faq.a}</div>
            </div>
          ))}
        </div>

        {/* GUIDES */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 12 }}>Pool Buyer's Guides</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { to: "/blog/fiberglass-vs-gunite-vs-vinyl", label: "Fiberglass vs Gunite vs Vinyl — Which Pool Type is Right for You?" },
              { to: "/blog/inground-pool-cost-guide", label: "Complete Inground Pool Cost Guide 2026" },
              { to: "/blog/pool-cost-by-size", label: "Pool Cost by Size: Small, Medium & Large" },
              { to: "/blog/pool-financing-guide", label: "How to Finance a Pool — Loans, HELOCs & More" },
              { to: "/pool-cost-data", label: "Pool Cost Statistics & Research Data 2026" },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{ fontSize: 13, color: T.accent, textDecoration: "none", fontWeight: 600 }}>→ {label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
