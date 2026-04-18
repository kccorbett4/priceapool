import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BrowseByState from './BrowseByState.jsx'

const T = {
  bg: "#FAF8F3", bg2: "#F2EFE7", card: "#FFFFFF",
  border: "#E8E3D7", accent: "#0F4C5C", accentLight: "#E6EEF0", accentDark: "#0A3440",
  text: "#0A0A0A", textMid: "#3D3D3D", textDim: "#8A8A8A",
  success: "#166534", warnBg: "#FFFBEB",
};

function Stat({ label, value, sub }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: "-.5px" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: T.textDim, marginTop: 4, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}
function H2({ children }) { return <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, marginTop: 36, marginBottom: 12, letterSpacing: "-.3px" }}>{children}</h2>; }
function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 24 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ background: T.bg2 }}>{headers.map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: T.text, borderBottom: `2px solid ${T.border}` }}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i} style={{ background: i % 2 === 0 ? T.card : T.bg }}>{row.map((cell, j) => <td key={j} style={{ padding: "10px 14px", color: T.textMid, borderBottom: `1px solid ${T.border}` }}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
function FactBox({ number, fact }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: T.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: T.accent, flexShrink: 0 }}>{number}</div>
      <div style={{ fontSize: 14, color: T.textMid, lineHeight: 1.7, paddingTop: 4 }}>{fact}</div>
    </div>
  );
}

export default function DataPage() {
  const dataSchema = {
    "@context": "https://schema.org", "@type": "Dataset",
    "name": "Inground Pool Cost Data 2026",
    "description": "Comprehensive dataset of inground pool costs across the United States in 2026, including averages by pool type, state, size, and feature.",
    "url": "https://priceapool.com/pool-cost-data",
    "creator": { "@type": "Organization", "name": "PriceAPool.com" },
    "dateModified": "2026-01-01",
    "spatialCoverage": "United States",
    "temporalCoverage": "2026",
  };

  const wrap = { fontFamily: "'Inter',system-ui,-apple-system,sans-serif", color: T.text, background: T.bg, minHeight: "100vh" };
  const inner = { maxWidth: 800, margin: "0 auto", padding: "0 16px 60px" };
  const card = { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "24px 28px", marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" };

  return (
    <div style={wrap}>
      <Helmet>
        <title>Pool Cost Statistics &amp; Data 2026 | PriceAPool Research</title>
        <meta name="description" content="Comprehensive pool cost statistics and data for 2026: national averages, cost by pool type, cost by state, maintenance costs, ROI data, and 25 key facts about inground pool pricing." />
        <link rel="canonical" href="https://priceapool.com/pool-cost-data" />
        <meta property="og:title" content="Pool Cost Statistics & Data 2026 — PriceAPool Research" />
        <meta property="og:url" content="https://priceapool.com/pool-cost-data" />
        <script type="application/ld+json">{JSON.stringify(dataSchema)}</script>
      </Helmet>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, background: "rgba(250,248,243,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" style={{ display: "block" }}><circle cx="14" cy="14" r="14" fill={T.text} /><path d="M6 15.5 Q 9 13, 12 15.5 T 18 15.5 T 24 15.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><path d="M6 19.5 Q 9 17, 12 19.5 T 18 19.5 T 24 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" /></svg>
          <span style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>PriceAPool</span>
        </Link>
        <Link to="/" style={{ fontSize: 12, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Free Calculator →</Link>
      </nav>

      <div style={inner}>
        <div style={{ padding: "40px 0 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Research & Statistics · Updated January 2026</div>
          <h1 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 800, color: T.text, letterSpacing: "-.5px", lineHeight: 1.15, marginBottom: 14 }}>Pool Cost Statistics & Data 2026</h1>
          <p style={{ fontSize: 15, color: T.textMid, lineHeight: 1.75 }}>
            Comprehensive inground pool cost data for 2026 — national averages, regional breakdowns, cost by pool type and size, maintenance costs, and ROI data. All figures are based on contractor pricing data adjusted for regional labor markets.
          </p>
        </div>

        {/* KEY STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 24 }}>
          <Stat label="Avg gunite pool (US)" value="$82,000" sub="500 sq ft, standard build" />
          <Stat label="Avg fiberglass pool (US)" value="$60,000" sub="500 sq ft installed" />
          <Stat label="Avg vinyl liner pool (US)" value="$44,000" sub="500 sq ft installed" />
          <Stat label="Avg annual maintenance" value="$3,200" sub="Chemicals, electric, service" />
          <Stat label="Pools built annually (US)" value="~100,000" sub="New inground pools" />
          <Stat label="Homes with pools (US)" value="~5.7M" sub="Inground pools" />
        </div>

        <div style={card}>
          <H2>National Average Pool Costs by Type (2026)</H2>
          <Table
            headers={["Pool Type", "Low End", "Average", "High End", "Cost/Sq Ft"]}
            rows={[
              ["Gunite / Shotcrete", "$48,000", "$82,000", "$150,000+", "$82–$120/sq ft"],
              ["Fiberglass", "$35,000", "$60,000", "$95,000", "$60–$85/sq ft"],
              ["Vinyl Liner", "$25,000", "$44,000", "$70,000", "$35–$55/sq ft"],
            ]}
          />
          <p style={{ fontSize: 12, color: T.textDim, lineHeight: 1.6 }}>Based on standard 500 sq ft pool (approximately 16×32 ft). Prices include shell, plumbing, electrical, and basic equipment. Excludes decking, landscaping, spa, and premium add-ons.</p>
        </div>

        <div style={card}>
          <H2>Pool Cost by Size (2026 National Average)</H2>
          <Table
            headers={["Size", "Sq Ft", "Gunite", "Fiberglass", "Vinyl"]}
            rows={[
              ["12×24 (small)", "288", "$35,000–$55,000", "$32,000–$48,000", "$25,000–$38,000"],
              ["14×28", "392", "$42,000–$65,000", "$36,000–$55,000", "$28,000–$44,000"],
              ["16×32 (most popular)", "512", "$55,000–$80,000", "$42,000–$65,000", "$33,000–$52,000"],
              ["18×36", "648", "$65,000–$95,000", "$50,000–$75,000", "$40,000–$62,000"],
              ["20×40 (large)", "800", "$80,000–$120,000", "N/A (max width)", "$50,000–$75,000"],
              ["20×50+ (XL)", "1,000+", "$100,000–$200,000+", "N/A", "$60,000–$90,000"],
            ]}
          />
        </div>

        <div style={card}>
          <H2>Annual Pool Maintenance Costs by Pool Type (2026)</H2>
          <Table
            headers={["Expense", "Gunite", "Fiberglass", "Vinyl Liner"]}
            rows={[
              ["Chemicals (annual)", "$700–$1,400", "$400–$800", "$500–$900"],
              ["Electricity (pump/equipment)", "$600–$1,800", "$500–$1,400", "$550–$1,600"],
              ["Professional service (optional)", "$1,500–$3,500", "$1,200–$3,000", "$1,300–$3,200"],
              ["Winterization (frost states)", "$300–$600", "$300–$600", "$300–$600"],
              ["Insurance increase (annual)", "$200–$500", "$200–$500", "$200–$500"],
              ["Average total (no service)", "$1,600–$3,800", "$1,100–$2,800", "$1,250–$3,100"],
              ["Average total (with service)", "$3,300–$7,800", "$2,600–$6,300", "$2,850–$6,800"],
            ]}
          />
        </div>

        <div style={card}>
          <H2>Pool Add-On Costs (2026)</H2>
          <Table
            headers={["Add-On", "Low", "Average", "High"]}
            rows={[
              ["Concrete decking (400–600 sq ft)", "$5,000", "$8,000", "$14,000"],
              ["Stamped/travertine pavers", "$10,000", "$16,000", "$26,000"],
              ["Attached spa (gunite)", "$22,000", "$32,000", "$50,000"],
              ["Attached spa (fiberglass)", "$12,000", "$17,000", "$25,000"],
              ["Gas heater", "$3,500", "$5,000", "$7,500"],
              ["Heat pump", "$5,000", "$7,000", "$10,000"],
              ["Salt chlorine generator", "$1,500", "$2,400", "$4,000"],
              ["LED lighting package", "$2,000", "$3,500", "$6,000"],
              ["Automation system", "$3,000", "$5,000", "$9,000"],
              ["Rock waterfall", "$6,000", "$9,000", "$18,000"],
              ["Auto safety cover", "$8,000", "$12,500", "$20,000"],
              ["Safety fence (4-ft)", "$2,000", "$3,200", "$5,500"],
            ]}
          />
        </div>

        <div style={card}>
          <H2>Pool Cost Impact by Soil Condition</H2>
          <Table
            headers={["Soil Type", "Cost vs. Standard", "Additional Cost"]}
            rows={[
              ["Loam / sandy loam (ideal)", "Baseline", "$0"],
              ["Sandy / loose soil", "+5–15%", "$3,000–$8,000"],
              ["Heavy clay / expansive", "+10–20%", "$8,000–$14,000"],
              ["Rocky / hardpan", "+15–40%", "$10,000–$30,000"],
              ["High water table", "+15–30%", "$12,000–$22,000"],
              ["Fill dirt / disturbed soil", "+20–50%", "$15,000–$35,000"],
            ]}
          />
        </div>

        <div style={card}>
          <H2>Pool ROI by Climate (Average Home Value Added)</H2>
          <Table
            headers={["Market", "Value Added (% of cost)", "Example States"]}
            rows={[
              ["Year-round warm, luxury", "65–90%", "South FL, Phoenix, Palm Springs"],
              ["Warm climate, suburban", "55–75%", "FL, AZ, TX, CA, NV, GA"],
              ["Mild climate, mid-range", "40–60%", "NC, SC, TN, VA, OR"],
              ["Cold climate, high-income", "30–50%", "NY, NJ, MA, CT, IL"],
              ["Cold climate, rural", "10–30%", "MN, WI, ND, SD, MT, WY"],
            ]}
          />
          <p style={{ fontSize: 12, color: T.textDim, lineHeight: 1.6, marginTop: 8 }}>Source: National Association of Realtors survey data, pool industry appraisal studies. Figures represent contributory value added to appraised home value as a percentage of pool construction cost.</p>
        </div>

        <div style={card}>
          <H2>25 Key Facts About Pool Costs in 2026</H2>
          {[
            "The average inground pool in the United States costs $35,000–$100,000 before add-ons, decking, and landscaping.",
            "Gunite pools account for approximately 50% of new inground pool installations in the US.",
            "Fiberglass is the fastest-growing pool type, gaining market share in Sun Belt states since 2018.",
            "Pool costs vary by up to 100% between states — from ~$48,000 in Mississippi to ~$95,000+ in Hawaii for the same pool.",
            "Labor costs account for approximately 40–50% of total pool construction cost.",
            "A standard 16×32 ft pool (512 sq ft) holds approximately 20,000–24,000 gallons of water.",
            "Fiberglass pools use 50–70% fewer chemicals annually than gunite pools ($400–$800 vs $700–$1,400/year).",
            "Pool permit costs range from $800 (rural South) to $3,500+ (California, New York) depending on jurisdiction.",
            "Rocky soil conditions can add $10,000–$30,000 to pool excavation costs.",
            "A high water table adds $12,000–$22,000 in dewatering and hydrostatic engineering costs.",
            "Gunite pool interiors need resurfacing every 10–15 years at a cost of $10,000–$20,000.",
            "A vinyl pool liner lasts 7–10 years and costs $3,500–$7,500 to replace.",
            "Fiberglass pool shells can last 25–30+ years without resurfacing.",
            "Pool construction typically takes 12–22 weeks for gunite, 6–14 weeks for fiberglass, 8–16 weeks for vinyl.",
            "The best time to sign a pool contract is September–November for 5–15% contractor discounts.",
            "An attached spa adds $12,000–$50,000 to total project cost depending on pool type and spa size.",
            "PebbleTec finish costs $16–$22/sq ft and lasts 20–30 years vs $8/sq ft for standard plaster lasting 8–12 years.",
            "A heat pump pool heater costs $5,000–$10,000 installed and runs $80–$200/month depending on climate.",
            "In Florida, Arizona, and Texas, a pool adds approximately 55–75% of its cost to home resale value.",
            "In cold-climate states (MN, WI, ND), a pool may add only 20–40% of its cost to resale value.",
            "Annual pool insurance premium increases average $200–$500 per year.",
            "The 16×32 ft pool is the most commonly built inground pool size in the United States.",
            "Approximately 5.7 million homes in the US have an inground pool.",
            "HELOC rates for pool financing averaged 7.5–9.5% in 2025–2026.",
            "A standard 500 sq ft gunite pool contains approximately 350–450 sq ft of interior surface area after depth calculations.",
          ].map((fact, i) => <FactBox key={i} number={i + 1} fact={fact} />)}
        </div>

        {/* INTERNAL LINKS */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 12 }}>Explore More</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 }}>
            {[
              { to: "/pool-cost-by-state", label: "Pool Cost by State — All 50 States" },
              { to: "/blog/fiberglass-vs-gunite-vs-vinyl", label: "Fiberglass vs Gunite vs Vinyl" },
              { to: "/blog/inground-pool-cost-guide", label: "Complete Pool Cost Guide" },
              { to: "/blog/pool-cost-by-size", label: "Pool Cost by Size" },
              { to: "/blog/pool-financing-guide", label: "Pool Financing Guide" },
              { to: "/blog/does-a-pool-add-home-value", label: "Pool ROI & Home Value" },
              { to: "/florida", label: "Pool Cost in Florida" },
              { to: "/texas", label: "Pool Cost in Texas" },
              { to: "/california", label: "Pool Cost in California" },
              { to: "/arizona", label: "Pool Cost in Arizona" },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{ fontSize: 13, color: T.accent, textDecoration: "none", fontWeight: 600 }}>→ {label}</Link>
            ))}
          </div>
        </div>

        <BrowseByState />
      </div>
    </div>
  );
}
