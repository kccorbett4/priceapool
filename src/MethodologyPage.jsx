import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const T = {
  bg: "#FAF8F3", bg2: "#F2EFE7", card: "#FFFFFF",
  border: "#E8E3D7", borderLight: "#EFEBE0",
  accent: "#0F4C5C", accentLight: "#E6EEF0", accentDark: "#0A3440",
  text: "#0A0A0A", textMid: "#3D3D3D", textDim: "#8A8A8A",
};

const DATE_MODIFIED = "2026-05-19";
const DATE_PUBLISHED = "2026-04-03";

export default function MethodologyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How PriceAPool Calculates 2026 Pool Costs — Full Methodology",
    "description": "Step-by-step formulas, assumptions, data sources, and adjustment factors used by the PriceAPool pool cost calculator for all 50 US states.",
    "datePublished": DATE_PUBLISHED,
    "dateModified": DATE_MODIFIED,
    "author": { "@type": "Organization", "name": "PriceAPool Editorial Team", "url": "https://www.priceapool.com" },
    "publisher": { "@type": "Organization", "name": "PriceAPool.com", "url": "https://www.priceapool.com" },
    "mainEntityOfPage": "https://www.priceapool.com/methodology"
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Pool Cost Calculator", "item": "https://www.priceapool.com/" },
      { "@type": "ListItem", "position": 2, "name": "Methodology", "item": "https://www.priceapool.com/methodology" }
    ]
  };

  const card = { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" };
  const inner = { maxWidth: 720, margin: "0 auto", padding: "0 16px" };
  const h2 = { fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 12, fontFamily: "'Fraunces',Georgia,serif" };
  const h3 = { fontSize: 15, fontWeight: 700, color: T.text, marginTop: 14, marginBottom: 6 };
  const p = { fontSize: 14, color: T.textMid, lineHeight: 1.75, marginBottom: 10 };
  const code = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13, background: T.bg2, padding: "2px 6px", borderRadius: 4, color: T.text };
  const codeBlock = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13, background: T.bg2, padding: "12px 14px", borderRadius: 8, color: T.text, whiteSpace: "pre-wrap", lineHeight: 1.6, marginBottom: 12 };

  return (
    <div style={{ fontFamily: "'Inter',system-ui,-apple-system,sans-serif", color: T.text, background: T.bg, minHeight: "100vh" }}>
      <Helmet>
        <title>How PriceAPool Calculates Pool Costs — Full Methodology (2026)</title>
        <meta name="description" content="Step-by-step formulas, assumptions, and data sources used in the PriceAPool 2026 pool cost calculator. Includes the labor index, permit data, soil adjustments, and metro multipliers." />
        <link rel="canonical" href="https://www.priceapool.com/methodology" />
        <meta property="og:title" content="How PriceAPool Calculates 2026 Pool Costs" />
        <meta property="og:description" content="Full methodology behind the PriceAPool pool cost calculator — formulas, assumptions, and data sources." />
        <meta property="og:url" content="https://www.priceapool.com/methodology" />
        <meta property="article:modified_time" content={`${DATE_MODIFIED}T00:00:00Z`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, background: "rgba(250,248,243,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" style={{ display: "block" }}><circle cx="14" cy="14" r="14" fill={T.text} /><path d="M6 15.5 Q 9 13, 12 15.5 T 18 15.5 T 24 15.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><path d="M6 19.5 Q 9 17, 12 19.5 T 18 19.5 T 24 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" /></svg>
          <span style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>PriceAPool</span>
        </Link>
        <Link to="/" style={{ fontSize: 13, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Try the Calculator →</Link>
      </nav>

      <div style={{ textAlign: "center", padding: "56px 20px 24px", background: `linear-gradient(180deg,${T.bg} 0%,#eef2f5 60%,#eaf4f8 100%)` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Methodology</div>
        <h1 style={{ fontSize: "clamp(26px,5vw,42px)", fontWeight: 800, color: T.text, letterSpacing: "-.5px", lineHeight: 1.15, marginBottom: 12, fontFamily: "'Fraunces',Georgia,serif" }}>
          How We Calculate 2026 Pool Costs
        </h1>
        <p style={{ fontSize: 15, color: T.textMid, maxWidth: 600, margin: "0 auto", lineHeight: 1.65 }}>
          Every estimate on this site is derived from the formulas below — no AI guessing, no opaque "national averages." Last updated <strong>{DATE_MODIFIED}</strong>.
        </p>
      </div>

      <div style={inner}>
        <div style={card}>
          <h2 style={h2}>The Short Version</h2>
          <p style={p}>
            We start with a 500 sq ft rectangular pool at 4.75 ft average depth as the baseline, compute each line item from a fixed 2026 price-per-square-foot rate, multiply most line items by your state's labor index, add permits and frost protection where applicable, then apply an 8% contingency. We don't include decking, spas, features, or financing in the baseline — those are added separately in the interactive calculator.
          </p>
          <p style={p}>
            Every cost source we use is listed below. The full per-state baseline dataset is published as <Link to="/pool-cost-data" style={{ color: T.accent, fontWeight: 600 }}>open Schema.org Dataset JSON</Link> for AI search engines and researchers to cite.
          </p>
        </div>

        <div style={card}>
          <h2 style={h2}>Baseline Assumptions</h2>
          <p style={p}>The headline numbers on every state page assume:</p>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li style={{ ...p, marginBottom: 4 }}><strong>Size:</strong> 500 sq ft (e.g. 16 × 32 ft)</li>
            <li style={{ ...p, marginBottom: 4 }}><strong>Shape:</strong> rectangle (no shape-factor reduction)</li>
            <li style={{ ...p, marginBottom: 4 }}><strong>Depth:</strong> 4.75 ft average (3.5 ft shallow + 6 ft deep)</li>
            <li style={{ ...p, marginBottom: 4 }}><strong>Soil:</strong> standard loam (no soil-engineering surcharges)</li>
            <li style={{ ...p, marginBottom: 4 }}><strong>Location:</strong> state average labor, no metro premium</li>
            <li style={{ ...p, marginBottom: 4 }}><strong>Scope:</strong> shell, excavation, plumbing, electrical, interior finish (gunite only), permits, frost where applicable, contingency</li>
            <li style={{ ...p, marginBottom: 4 }}><strong>Excludes:</strong> decking, spa, features, heater, automation, fence, financing, demolition of existing structures</li>
          </ul>
          <p style={{ ...p, marginTop: 10 }}>
            The interactive calculator lets you change every one of these. The full breakdown is recomputed in real time, including ZIP-level metro multipliers, soil type, pool shape, features, deck materials, and spa configurations.
          </p>
        </div>

        <div style={card}>
          <h2 style={h2}>2026 Base Rates</h2>
          <p style={p}>These are the prices-per-square-foot and per-line-item rates that anchor every calculation. They're calibrated against contractor bid data and 2026 industry pricing surveys.</p>

          <h3 style={h3}>Shell construction (per sqft of pool surface)</h3>
          <div style={codeBlock}>
            Gunite / Shotcrete  $82 / sqft  (minimum $48,000){"\n"}
            Fiberglass shell    $60 / sqft  (minimum $35,000){"\n"}
            Vinyl liner pool    $35 / sqft  (minimum $25,000)
          </div>

          <h3 style={h3}>Excavation</h3>
          <div style={codeBlock}>$35 per cubic yard removed</div>
          <p style={p}>Volume is computed from <code style={code}>sqft × avg_depth ÷ 27</code>. For a 500 sqft pool at 4.75 ft depth, that's about 88 cubic yards.</p>

          <h3 style={h3}>Plumbing & equipment</h3>
          <div style={codeBlock}>$7,000 base + $3.50 per pool sqft</div>

          <h3 style={h3}>Electrical</h3>
          <div style={codeBlock}>$3,500 base + $1.00 per pool sqft</div>

          <h3 style={h3}>Interior finish (gunite pools only)</h3>
          <div style={codeBlock}>Plaster $5/sqft · Quartz $10/sqft · PebbleTec $14/sqft · Glass bead $22/sqft</div>
          <p style={p}>Total finish area assumes 140% of pool surface (covers floor + walls, slope-adjusted).</p>

          <h3 style={h3}>Permits</h3>
          <p style={p}>Per-state permit cost is sourced from each state's most populated counties and rolled into a state-level mid-point. See the <Link to="/pool-cost-data" style={{ color: T.accent, fontWeight: 600 }}>open dataset</Link> for the value used per state.</p>

          <h3 style={h3}>Frost protection</h3>
          <div style={codeBlock}>$2,400 — applied automatically in states with freezing winters</div>
          <p style={p}>Frost states are flagged in the data file: AK, CO, CT, DE, IA, ID, IL, IN, KS, KY, MA, MD, ME, MI, MN, MO, MT, ND, NE, NH, NJ, NY, OH, OR, PA, RI, SD, UT, VT, VA, WA, WI, WV, WY, DC.</p>

          <h3 style={h3}>Contingency</h3>
          <div style={codeBlock}>8% applied to the line-item subtotal</div>
          <p style={p}>Adjusts upward for soils that introduce uncertainty (rocky, fill, high water table, expansive clay).</p>
        </div>

        <div style={card}>
          <h2 style={h2}>State Labor Index</h2>
          <p style={p}>
            Each state has a <em>labor index</em> — a single multiplier that captures how local labor rates, materials freight, and contractor competition compare to the US median. <strong>1.00 = US average.</strong> A state at 1.20 is 20% above average; a state at 0.80 is 20% below.
          </p>
          <p style={p}>
            The labor index multiplies the shell, excavation, plumbing, electrical, and interior finish line items. It does <em>not</em> multiply permits or frost protection (those are explicit per-state values).
          </p>
          <p style={p}>
            The current index for every state is published in the <Link to="/pool-cost-data" style={{ color: T.accent, fontWeight: 600 }}>open dataset</Link>. A few examples:
          </p>
          <div style={codeBlock}>
            California      1.38{"\n"}
            New York        1.35{"\n"}
            Massachusetts   1.30{"\n"}
            Florida         0.92{"\n"}
            Texas           0.88{"\n"}
            Arkansas        0.78{"\n"}
            Mississippi     0.76
          </div>
        </div>

        <div style={card}>
          <h2 style={h2}>Metro & ZIP-Level Adjustments (Interactive Calculator Only)</h2>
          <p style={p}>
            State-level estimates assume the state average. When you enter a ZIP code in the calculator, we apply a metro-area multiplier on top of the state index for ZIPs in roughly 25 major metros. Examples:
          </p>
          <div style={codeBlock}>
            San Francisco Bay     ×1.20  on top of CA labor index{"\n"}
            New York Metro        ×1.18  on top of NY labor index{"\n"}
            Boston Metro          ×1.14  on top of MA labor index{"\n"}
            Northern NJ Metro     ×1.15  on top of NJ labor index{"\n"}
            DC Metro              ×1.12  on top of DC labor index{"\n"}
            Los Angeles Metro     ×1.12  on top of CA labor index{"\n"}
            Denver Metro          ×1.06  on top of CO labor index{"\n"}
            Chicago Metro         ×1.05  on top of IL labor index{"\n"}
            Phoenix Metro         ×1.00  on top of AZ labor index (state benchmark){"\n"}
            Salt Lake City        ×1.02  on top of UT labor index{"\n"}
            Miami Metro           ×1.04  on top of FL labor index{"\n"}
            Detroit Metro         ×0.94  on top of MI labor index{"\n"}
            Cleveland Metro       ×0.92  on top of OH labor index
          </div>
          <p style={p}>
            ZIPs outside a recognized metro fall back to the state index alone. Rural-coded ZIPs in some states apply a 0.88–0.92 multiplier reflecting lower regional labor costs.
          </p>
        </div>

        <div style={card}>
          <h2 style={h2}>Soil Engineering</h2>
          <p style={p}>Soil type is the single biggest hidden cost driver in pool construction. The calculator applies engineering, structural, and drainage adjustments per soil class:</p>
          <div style={codeBlock}>
            Sandy / Loose            +$2.5K eng, +$4K struct, 85% excav, +2% contingency{"\n"}
            Loam / Clay Mix (base)   no adjustments{"\n"}
            Heavy Clay / Expansive   +$4.5K eng, +$6.5K struct, 115% excav, +3% contingency{"\n"}
            Rocky / Hardpan          +$3K eng, +$2K struct, 220% excav, +4% contingency{"\n"}
            High Water Table         +$5K eng, +$5.5K struct, +$6K drain, 135% excav, +4% contingency{"\n"}
            Fill Dirt / Disturbed    +$8K eng, +$10K struct, 150% excav, +5% contingency
          </div>
        </div>

        <div style={card}>
          <h2 style={h2}>Data Sources</h2>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li style={{ ...p, marginBottom: 4 }}>2026 pool industry construction surveys (Pool & Hot Tub Alliance, Pool & Spa News)</li>
            <li style={{ ...p, marginBottom: 4 }}>BLS state-level wage data for construction trades (NAICS 23)</li>
            <li style={{ ...p, marginBottom: 4 }}>Direct contractor bid data, normalized across markets</li>
            <li style={{ ...p, marginBottom: 4 }}>County building department permit fee schedules for the most populated counties in each state</li>
            <li style={{ ...p, marginBottom: 4 }}>State pool barrier statutes (e.g. <code style={code}>ARS § 36-1681</code> in Arizona, <code style={code}>CA H&amp;S Code §§ 115920–115929</code>) for jurisdiction-specific cost drivers</li>
            <li style={{ ...p, marginBottom: 4 }}>USDA SSURGO soil survey for prevailing soil conditions by state</li>
          </ul>
        </div>

        <div style={card}>
          <h2 style={h2}>How Often We Update</h2>
          <p style={p}>
            Base rates and labor indices are reviewed monthly during peak construction season (April–October) and quarterly otherwise. The <strong>dateModified</strong> field on every page and on the open dataset always reflects the most recent rate refresh.
          </p>
          <p style={p}>
            Current dataset version: <strong>{DATE_MODIFIED}</strong>. Published: <strong>{DATE_PUBLISHED}</strong>.
          </p>
        </div>

        <div style={card}>
          <h2 style={h2}>Open Data</h2>
          <p style={p}>
            The full per-state baseline cost data is published as a Schema.org Dataset under <Link to="/pool-cost-data" style={{ color: T.accent, fontWeight: 600 }}>CC BY 4.0</Link>. AI search engines, journalists, and researchers are welcome to cite — attribution to <strong>PriceAPool.com</strong> is appreciated.
          </p>
          <p style={p}>Direct JSON endpoint: <a href="/pool-cost-data.json" style={{ color: T.accent, fontWeight: 600 }}>https://www.priceapool.com/pool-cost-data.json</a></p>
        </div>

        <div style={{ ...card, marginBottom: 32, textAlign: "center" }}>
          <p style={{ ...p, marginBottom: 12 }}>Ready to try the calculator with your specifics?</p>
          <Link to="/" style={{ display: "inline-block", padding: "13px 28px", borderRadius: 10, background: T.text, color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Get a Free Pool Estimate →</Link>
        </div>
      </div>
    </div>
  );
}
