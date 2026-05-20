import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import App from './App.jsx'
import BrowseByState from './BrowseByState.jsx'

const T = {
  bg: "#FAF8F3", bg2: "#F2EFE7", card: "#FFFFFF",
  border: "#E8E3D7", accent: "#0F4C5C", accentLight: "#E6EEF0", accentDark: "#0A3440",
  text: "#0A0A0A", textMid: "#3D3D3D", textDim: "#8A8A8A",
  success: "#166534",
};
const fmt = n => "$" + Math.round(n).toLocaleString();

const CITIES = {
  "houston": {
    name: "Houston", state: "Texas", stateSlug: "texas", code: "TX",
    stateLaborMult: 0.88, metroMult: 0.95,
    season: "10–11 months", frost: false,
    permit: "$1,000–$2,000",
    nearby: ["dallas","san-antonio","austin-tx"],
    facts: [
      "Harris County permit processing typically takes 3–6 weeks.",
      "Houston's clay-heavy soil often requires structural engineering — budget $4,000–$10,000 extra.",
      "Houston's hot, humid climate means pools can be used 10+ months per year with minimal heating costs.",
      "The Houston metro has one of the highest concentrations of pool builders in the US, creating competitive pricing.",
    ],
    intro: "Houston is one of the best cities in America to build a pool. The 10–11 month swim season, competitive contractor market, and below-national-average labor costs make it a high-value pool market. The main wildcard is Houston's expansive clay soil, which can require additional engineering.",
  },
  "dallas": {
    name: "Dallas", state: "Texas", stateSlug: "texas", code: "TX",
    stateLaborMult: 0.88, metroMult: 0.97,
    season: "9–10 months", frost: false,
    permit: "$1,000–$2,200",
    nearby: ["houston","austin-tx","oklahoma-city"],
    facts: [
      "Dallas-Fort Worth is one of the largest pool markets in the US by volume of new builds.",
      "Black clay (expansive) soil is extremely common in DFW — a geotech report is strongly recommended.",
      "Permit processing in Dallas city proper averages 4–8 weeks; surrounding suburbs can be faster.",
      "The DFW market has hundreds of active pool contractors, creating highly competitive bidding.",
    ],
    intro: "The Dallas-Fort Worth metroplex builds more inground pools per year than almost any other metro area in the US. Competitive contractor pricing keeps costs close to the Texas state average, though DFW's notorious black clay soil requires careful site evaluation.",
  },
  "phoenix": {
    name: "Phoenix", state: "Arizona", stateSlug: "arizona", code: "AZ",
    stateLaborMult: 1.02, metroMult: 1.00,
    season: "Year-round", frost: false,
    permit: "$1,500–$2,800",
    nearby: ["las-vegas","tucson","denver"],
    facts: [
      "Phoenix has a true year-round pool season — even January averages 65°F.",
      "The Phoenix metro has one of the highest pool ownership rates in the US (~30% of homes).",
      "Caliche (hardpan calcium carbonate) is common in Phoenix soils — can add $3,000–$12,000 to excavation.",
      "Maricopa County permit processing averages 3–6 weeks for standard pool permits.",
    ],
    intro: "Phoenix is America's pool capital — the combination of 300+ sunny days, year-round swimming weather, and one of the nation's most active pool builder markets makes it ideal. Watch for caliche soil conditions, which can significantly impact excavation costs.",
  },
  "miami": {
    name: "Miami", state: "Florida", stateSlug: "florida", code: "FL",
    stateLaborMult: 0.92, metroMult: 1.04,
    season: "Year-round", frost: false,
    permit: "$1,200–$2,500",
    nearby: ["orlando","tampa","fort-lauderdale"],
    facts: [
      "Miami-Dade County has high water table issues in many areas — expect $8,000–$18,000 in dewatering costs.",
      "Miami pools can be used every month of the year with zero winterization needed.",
      "South Florida's humid climate can accelerate algae growth — salt systems and automation are popular.",
      "Permit processing in Miami-Dade averages 6–12 weeks — one of the slower markets in the state.",
    ],
    intro: "Miami's year-round tropical climate and luxury real estate market make pools both practical and high-value. The main challenges are a shallow water table in many neighborhoods and one of the slower permit processing timelines in Florida.",
  },
  "orlando": {
    name: "Orlando", state: "Florida", stateSlug: "florida", code: "FL",
    stateLaborMult: 0.92, metroMult: 1.00,
    season: "Year-round", frost: false,
    permit: "$1,100–$2,200",
    nearby: ["miami","tampa","jacksonville"],
    facts: [
      "Orange County is one of the most active pool-building counties in the US.",
      "Orlando's sandy soil is generally favorable for pool construction with minimal extra engineering.",
      "The Orlando market has a large supply of pool contractors due to the region's rapid growth.",
      "Florida's year-round warm climate means no winterization costs ever.",
    ],
    intro: "Orlando is one of the most active pool markets in Florida, with sandy soil conditions that are generally pool-friendly and a large, competitive contractor base. Year-round use and strong resale value make pools an excellent investment in the Orlando metro.",
  },
  "atlanta": {
    name: "Atlanta", state: "Georgia", stateSlug: "georgia", code: "GA",
    stateLaborMult: 0.88, metroMult: 0.96,
    season: "7–8 months", frost: false,
    permit: "$1,100–$2,000",
    nearby: ["charlotte","nashville","birmingham"],
    facts: [
      "Atlanta's red clay soil is common — budget $5,000–$12,000 for potential soil engineering.",
      "The Atlanta metro has a 7–8 month swim season (April–October) with no winterization required.",
      "Fulton County permit processing averages 4–8 weeks.",
      "Atlanta's growing luxury real estate market means pools have strong ROI — especially in Buckhead and suburbs.",
    ],
    intro: "Atlanta offers a compelling pool market: below-average labor costs, a long-ish swim season (no winterization needed), and strong resale value in the metro's growing luxury segments. Red clay soil is the main variable — get a site assessment before committing.",
  },
  "charlotte": {
    name: "Charlotte", state: "North Carolina", stateSlug: "north-carolina", code: "NC",
    stateLaborMult: 0.87, metroMult: 1.00,
    season: "6–7 months", frost: false,
    permit: "$1,100–$2,000",
    nearby: ["atlanta","raleigh","columbia-sc"],
    facts: [
      "Charlotte and surrounding Mecklenburg County have generally favorable red clay-loam soils for pool construction.",
      "The Charlotte metro has seen strong pool demand growth driven by rapid population increase since 2020.",
      "North Carolina does not require winterization in most of Charlotte — the season runs May–October.",
      "Mecklenburg County permit processing typically takes 4–7 weeks.",
    ],
    intro: "Charlotte is one of the fastest-growing pool markets in the Southeast. Below-average labor costs, a competitive contractor market, and a 6–7 month swim season (no winterization) make it a solid value. The city's booming real estate market supports strong pool ROI.",
  },
  "las-vegas": {
    name: "Las Vegas", state: "Nevada", stateSlug: "nevada", code: "NV",
    stateLaborMult: 1.05, metroMult: 1.00,
    season: "9–10 months", frost: false,
    permit: "$1,500–$2,800",
    nearby: ["phoenix","los-angeles","denver"],
    facts: [
      "Las Vegas has a 9–10 month pool season — winters are mild with occasional cool nights.",
      "Clark County permit processing averages 3–6 weeks.",
      "Las Vegas's desert alkaline soil is generally stable — fewer soil surprise costs than clay-heavy regions.",
      "Pool evaporation is significant in the desert — expect to add 1–2 inches of water per week in summer.",
    ],
    intro: "Las Vegas is a strong pool market with near-year-round swimming weather, stable desert soil, and a large contractor base. Slightly above-average labor costs (105% of national average) are offset by favorable building conditions and no freeze-thaw concerns.",
  },
  "nashville": {
    name: "Nashville", state: "Tennessee", stateSlug: "tennessee", code: "TN",
    stateLaborMult: 0.83, metroMult: 1.00,
    season: "6–7 months", frost: false,
    permit: "$1,000–$2,000",
    nearby: ["atlanta","charlotte","birmingham"],
    facts: [
      "Nashville's labor costs are among the most competitive in the South at 83% of the national average.",
      "Tennessee does not require winterization in the Nashville metro — the season typically runs May–October.",
      "Davidson County permit processing averages 3–6 weeks.",
      "Nashville's rapidly growing real estate market has driven strong pool demand since 2020.",
    ],
    intro: "Nashville is one of the best-value pool markets in the US — below-average labor costs (17% below national average), no winterization needed, and a booming real estate market that supports strong ROI. Growing contractor competition is keeping prices competitive.",
  },
  "denver": {
    name: "Denver", state: "Colorado", stateSlug: "colorado", code: "CO",
    stateLaborMult: 1.10, metroMult: 1.06,
    season: "5–6 months", frost: true,
    permit: "$1,800–$3,000",
    nearby: ["las-vegas","phoenix","salt-lake-city"],
    facts: [
      "Denver pools are typically open May through September — about 5 months of use per year.",
      "Annual winterization and opening costs approximately $400–$700 in the Denver metro.",
      "Denver's Front Range clay soils can require additional engineering — budget $5,000–$15,000 extra.",
      "Denver permit processing averages 4–8 weeks depending on the municipality.",
    ],
    intro: "Denver has a shorter swim season (5–6 months) but the metro's high income levels and strong real estate market support solid pool ROI. Above-average labor costs (combined state and metro: 17% above national average) and annual winterization requirements should be factored into your budget.",
  },
  "tampa": {
    name: "Tampa", state: "Florida", stateSlug: "florida", code: "FL",
    stateLaborMult: 0.92, metroMult: 0.97,
    season: "Year-round", frost: false,
    permit: "$1,000–$2,000",
    nearby: ["orlando","jacksonville","miami"],
    facts: [
      "Tampa Bay sits on Florida's Gulf Coast — high water table in many neighborhoods means $4,000–$10,000 in dewatering costs is common.",
      "Hillsborough and Pinellas counties typically process pool permits in 3–6 weeks.",
      "Tampa pools can be used year-round with no winterization, though heating extends comfort October–April.",
      "Hurricane season (June–November) influences construction scheduling and pool cage (screen enclosure) specifications — wind-rated cages add $8,000–$15,000.",
    ],
    intro: "Tampa is one of Florida's most active pool markets, with year-round use, competitive contractor pricing, and a deep bench of established builders. The main wildcards are a high water table near the coast (driving dewatering costs) and hurricane-resistant pool cage requirements that are standard in the Tampa Bay region.",
  },
  "jacksonville": {
    name: "Jacksonville", state: "Florida", stateSlug: "florida", code: "FL",
    stateLaborMult: 0.92, metroMult: 0.93,
    season: "10–11 months", frost: false,
    permit: "$900–$1,800",
    nearby: ["orlando","tampa","miami"],
    facts: [
      "Jacksonville's sandy coastal soils are generally favorable for pool construction — fewer soil-engineering surprises than other Florida markets.",
      "Duval County permit processing averages 3–6 weeks.",
      "Jacksonville has a 10–11 month swim season with rare frost events — no traditional winterization required.",
      "Labor costs in Jacksonville run 7–10% below the Florida state average, making it one of the more affordable major Florida pool markets.",
    ],
    intro: "Jacksonville is one of Florida's best-value pool markets — below-Florida-average labor costs, generally favorable sandy soils, and a 10–11 month swim season. The Jacksonville metro has seen strong growth in the pool-builder market without the price premium seen in Miami or Tampa.",
  },
  "tucson": {
    name: "Tucson", state: "Arizona", stateSlug: "arizona", code: "AZ",
    stateLaborMult: 1.02, metroMult: 0.93,
    season: "10–11 months", frost: false,
    permit: "$1,200–$2,200",
    nearby: ["phoenix","las-vegas","albuquerque"],
    facts: [
      "Tucson typically prices 5–10% below the Phoenix metro for comparable pool builds — both labor and contractor competition help.",
      "Pima County permit processing averages 4–7 weeks for standard residential pool permits.",
      "Caliche soil is less concentrated than in Phoenix but still common — budget $2,000–$8,000 for potential excavation surcharges.",
      "Tucson's elevation (~2,400 ft) brings cooler nights than Phoenix — pool heaters extend the comfortable swim season meaningfully here.",
    ],
    intro: "Tucson is one of Arizona's best-value pool markets — comparable swim season to Phoenix at 5–10% lower cost. Cooler nights at elevation mean a heater makes a real difference for shoulder-season comfort, and caliche-soil surprises are less frequent than in the Phoenix valley.",
  },
  "scottsdale": {
    name: "Scottsdale", state: "Arizona", stateSlug: "arizona", code: "AZ",
    stateLaborMult: 1.02, metroMult: 1.18,
    season: "Year-round", frost: false,
    permit: "$1,800–$3,200",
    nearby: ["phoenix","las-vegas","tucson"],
    facts: [
      "Scottsdale pools price 15–25% above the Phoenix metro due to HOA design review, premium finishes, and hillside-lot access constraints.",
      "City of Scottsdale and Paradise Valley HOAs typically dictate decking color palette, equipment-pad screening, and visible-from-street rules.",
      "Scottsdale permit processing averages 4–8 weeks; design-review boards in DC Ranch, Silverleaf, and Troon can add 4–6 weeks.",
      "Hillside lots in north Scottsdale and Paradise Valley often require engineered shoring and access surcharges of $15,000–$40,000.",
    ],
    intro: "Scottsdale is Arizona's premium pool market — luxury finishes, HOA design oversight, and hillside-lot complexity push the average pool cost 15–25% above the Phoenix metro. Year-round swim season and a deep bench of high-end custom builders make it one of the most active luxury pool markets in the US.",
  },
  "sarasota": {
    name: "Sarasota", state: "Florida", stateSlug: "florida", code: "FL",
    stateLaborMult: 0.92, metroMult: 1.02,
    season: "Year-round", frost: false,
    permit: "$1,100–$2,100",
    nearby: ["tampa","orlando","miami"],
    facts: [
      "Sarasota's coastal location means most builds require pool cages (screen enclosures) — budget $10,000–$18,000 for wind-rated cage construction.",
      "Sarasota County permit processing averages 4–7 weeks.",
      "Sandy coastal soils with locally high water tables — dewatering during excavation is common in Siesta Key, Longboat Key, and barrier-island builds.",
      "Year-round pool use with no winterization — Sarasota's swim season is 12 months.",
    ],
    intro: "Sarasota is one of Florida's premium pool markets — upscale coastal real estate, year-round swim season, and a strong contractor base. The main wildcards are coastal water-table issues on barrier islands and the near-universal need for wind-rated pool cages typical to Gulf Coast Florida builds.",
  },
  "naples": {
    name: "Naples", state: "Florida", stateSlug: "florida", code: "FL",
    stateLaborMult: 0.92, metroMult: 1.08,
    season: "Year-round", frost: false,
    permit: "$1,300–$2,500",
    nearby: ["tampa","miami","fort-lauderdale"],
    facts: [
      "Naples is Florida's most expensive metro for pool construction — luxury market pushes per-sqft pricing 8–12% above the Florida state average.",
      "Collier County is in Florida's High Velocity Hurricane Zone (HVHZ) — pool cages must meet enhanced wind-load specs (160+ mph).",
      "Naples has very high water tables in most neighborhoods — dewatering costs of $8,000–$15,000 are typical.",
      "Collier County permit processing averages 6–10 weeks; some communities (Port Royal, Mediterra, Pelican Bay) layer on architectural-review board approvals.",
    ],
    intro: "Naples is Florida's luxury pool market — premium finishes, HVHZ-rated cages, and shoreline water-table dewatering combine to push prices 8–12% above the Florida state average. The trade-off is a 12-month swim season, deep contractor expertise in luxury builds, and very strong real estate ROI.",
  },
  "fort-lauderdale": {
    name: "Fort Lauderdale", state: "Florida", stateSlug: "florida", code: "FL",
    stateLaborMult: 0.92, metroMult: 1.03,
    season: "Year-round", frost: false,
    permit: "$1,200–$2,400",
    nearby: ["miami","tampa","orlando"],
    facts: [
      "Fort Lauderdale is in Broward County's High Velocity Hurricane Zone (HVHZ) — pool cages and tie-downs must meet 175+ mph wind specs.",
      "Broward County permit processing averages 6–10 weeks for residential pool permits.",
      "Waterfront and Las Olas-area pools often require seawall coordination and shoreline setbacks; complex builds can run 3–6 months longer.",
      "Pool ownership is exceptionally high in Broward County — strong contractor competition keeps base pricing competitive vs Miami-Dade.",
    ],
    intro: "Fort Lauderdale sits in Florida's HVHZ zone alongside Miami-Dade, so pools require hurricane-rated enclosures and tie-downs. Permit timelines are longer than Tampa or Jacksonville. The upside: year-round use, strong real estate ROI, and a deep contractor market that often prices slightly below Miami.",
  },
  "san-antonio": {
    name: "San Antonio", state: "Texas", stateSlug: "texas", code: "TX",
    stateLaborMult: 0.88, metroMult: 0.96,
    season: "9–10 months", frost: false,
    permit: "$900–$1,800",
    nearby: ["houston","dallas","austin-tx"],
    facts: [
      "San Antonio is one of the most affordable major-metro pool markets in Texas — labor costs run 12–15% below the national average.",
      "Bexar County permit processing averages 3–5 weeks for standard pool permits.",
      "South Texas soils range from caliche-influenced clay (Hill Country side) to deep sandy loam (south side) — site evaluation matters.",
      "The San Antonio metro has a growing pool-builder market, with both national franchises (Premier Pools & Spas) and established local firms.",
    ],
    intro: "San Antonio is the most affordable major-metro pool market in Texas — a 9–10 month swim season, below-Texas-average labor costs, and competitive contractor pricing combine to make it a strong value market. Variable soils (caliche, clay, sand) make a site evaluation worthwhile before committing.",
  },
  "austin-tx": {
    name: "Austin", state: "Texas", stateSlug: "texas", code: "TX",
    stateLaborMult: 0.88, metroMult: 1.02,
    season: "9–10 months", frost: false,
    permit: "$1,300–$2,400",
    nearby: ["houston","dallas","san-antonio"],
    facts: [
      "Austin pools price 5–10% above the Texas state average — Hill Country labor scarcity and high housing demand have pushed builder schedules out 8–14 months.",
      "Travis County permit processing averages 6–10 weeks, with longer timelines in the City of Austin proper.",
      "Hill Country limestone bedrock is the dominant excavation challenge — rock-hammering adds $5,000–$18,000 to most westside builds.",
      "Austin's tech-driven housing market has made pools one of the highest-ROI improvements; backyard pools regularly add $40K–$70K to home value.",
    ],
    intro: "Austin is Texas's premium pool market — Hill Country labor scarcity, rock-heavy excavation, and a booming tech-driven housing market combine to push prices 5–10% above the Texas state average. The Hill Country limestone west of I-35 is the single biggest hidden cost driver. Backyard pools are one of the highest-ROI home improvements in the Austin market.",
  },
};

export default function CityPage() {
  const { citySlug } = useParams();
  const city = CITIES[citySlug?.toLowerCase()];

  if (!city) return <Navigate to="/pool-cost-by-state" replace />;

  const totalMult = city.stateLaborMult * city.metroMult;
  // All-in estimate for a standard 500 sqft pool (avg depth 4.75ft, standard soil)
  const _sqft = 500, _avgD = 4.75, _cuYd = (_sqft * _avgD) / 27, _lab = totalMult;
  const _permits = 1500, _frostC = city.frost ? 2400 : 0, _cont = 0.08;
  const gShell = Math.max(48000, _sqft * 82 * _lab);
  const gSub = gShell + _cuYd * 35 * _lab + (7000 + _sqft * 3.5) * _lab + (3500 + _sqft * 1.0) * _lab + (_sqft * 1.4) * 8 * _lab + _permits + _frostC;
  const gunite = Math.round((gSub * (1 + _cont)) / 1000) * 1000;
  const fShell = Math.max(35000, _sqft * 60 * _lab);
  const fSub = fShell + _cuYd * 35 * _lab + (7000 + _sqft * 3.5) * _lab + (3500 + _sqft * 1.0) * _lab + _permits + _frostC;
  const fiber = Math.round((fSub * (1 + _cont)) / 1000) * 1000;
  const vShell = Math.max(25000, _sqft * 35 * _lab);
  const vSub = vShell + _cuYd * 35 * _lab + (7000 + _sqft * 3.5) * _lab + (3500 + _sqft * 1.0) * _lab + _permits + _frostC;
  const vinyl = Math.round((vSub * (1 + _cont)) / 1000) * 1000;

  const citySchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `How much does an inground pool cost in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `In ${city.name}, a gunite pool averages ${fmt(gunite)}, fiberglass ${fmt(fiber)}, and vinyl liner ${fmt(vinyl)} for a standard 500 sq ft pool. Costs vary based on size, soil conditions, features, and specific contractor.` } },
      { "@type": "Question", "name": `What is the swim season in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `${city.name} has a pool season of approximately ${city.season}. ${city.frost ? `Annual winterization and opening costs approximately $400–$700.` : `No winterization is required in most years.`}` } },
      { "@type": "Question", "name": `How long does pool permitting take in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `Pool permit costs in ${city.name} typically run ${city.permit}. ${city.facts[0]}` } },
    ]
  };

  const wrap = { fontFamily: "'Inter',system-ui,-apple-system,sans-serif", color: T.text, background: T.bg, minHeight: "100vh" };
  const inner = { maxWidth: 720, margin: "0 auto", padding: "0 16px" };
  const card = { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" };

  return (
    <div style={wrap}>
      <Helmet>
        <title>{`Pool Cost in ${city.name} (2026) — Free Calculator | PriceAPool`}</title>
        <meta name="description" content={`How much does a pool cost in ${city.name} in 2026? Gunite pools average ${fmt(gunite)}, fiberglass ${fmt(fiber)}, vinyl ${fmt(vinyl)}. Free calculator with ${city.name}-specific pricing.`} />
        <link rel="canonical" href={`https://www.priceapool.com/city/${citySlug}`} />
        <meta property="og:title" content={`Pool Cost in ${city.name} (2026) — Free Calculator`} />
        <meta property="og:url" content={`https://www.priceapool.com/city/${citySlug}`} />
        <script type="application/ld+json">{JSON.stringify(citySchema)}</script>
      </Helmet>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, background: "rgba(250,248,243,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" style={{ display: "block" }}><circle cx="14" cy="14" r="14" fill={T.text} /><path d="M6 15.5 Q 9 13, 12 15.5 T 18 15.5 T 24 15.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><path d="M6 19.5 Q 9 17, 12 19.5 T 18 19.5 T 24 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" /></svg>
          <span style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>PriceAPool</span>
        </Link>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to={`/${city.stateSlug}`} style={{ fontSize: 12, color: T.textMid, textDecoration: "none", fontWeight: 600 }}>{city.state} →</Link>
          <Link to="/" style={{ fontSize: 12, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Calculator →</Link>
        </div>
      </nav>

      <div style={{ textAlign: "center", padding: "56px 20px 32px", background: `linear-gradient(180deg,${T.bg} 0%,#eef2f5 60%,#eaf4f8 100%)` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Pool Cost Estimator — {city.name}, {city.state}</div>
        <h1 style={{ fontSize: "clamp(22px,5vw,36px)", fontWeight: 800, color: T.text, letterSpacing: "-.5px", lineHeight: 1.15, marginBottom: 12 }}>
          How Much Does a Pool Cost in {city.name} in 2026?
        </h1>
        <p style={{ fontSize: 15, color: T.textMid, maxWidth: 560, margin: "0 auto", lineHeight: 1.65 }}>
          In {city.name}, a gunite pool averages <strong>{fmt(gunite)}</strong>, fiberglass <strong>{fmt(fiber)}</strong>, and vinyl liner <strong>{fmt(vinyl)}</strong> for a standard 500 sq ft pool.
        </p>
      </div>

      <div style={inner}>
        {/* COST CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 16 }}>
          {[
            { type: "Gunite / Shotcrete", cost: gunite, tag: "Most Durable", color: T.accent },
            { type: "Fiberglass", cost: fiber, tag: "Low Maintenance", color: T.accentDark },
            { type: "Vinyl Liner", cost: vinyl, tag: "Most Affordable", color: T.success },
          ].map(({ type, cost, tag, color }) => (
            <div key={type} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{tag}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: T.text }}>{fmt(cost)}</div>
              <div style={{ fontSize: 12, color: T.textMid, marginTop: 4 }}>{type}</div>
            </div>
          ))}
        </div>

        {/* CITY INTRO */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 12 }}>Pool Building in {city.name}: What to Know</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75, marginBottom: 14 }}>{city.intro}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
            {[
              { icon: city.frost ? "❄️" : "☀️", title: "Swim Season", body: `${city.season} per year. ${city.frost ? "Annual winterization required (~$400–$700)." : "No winterization required."}` },
              { icon: "📋", title: "Permit Cost", body: `Pool permits in ${city.name} typically run ${city.permit}.` },
              { icon: "🔧", title: "Labor Market", body: `${city.name} contractors price at ~${Math.round(city.stateLaborMult * city.metroMult * 100)}% of the national average.` },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ background: T.bg, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CITY FACTS */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 12 }}>{city.name} Pool Building Facts</h2>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {city.facts.map((fact, i) => (
              <li key={i} style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75, marginBottom: 6 }}>{fact}</li>
            ))}
          </ul>
        </div>

        {/* CALCULATOR */}
        <div style={{ textAlign: "center", padding: "6px 0 4px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.textMid }}>↓ Get Your Free {city.name} Pool Cost Estimate ↓</div>
        </div>
      </div>

      <App initialState={city.code} hideNav={true} />

      <div style={inner}>
        {/* FAQ */}
        <div style={{ ...card, marginTop: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 16 }}>Pool Cost FAQs — {city.name}</h2>
          {[
            { q: `How much does an inground pool cost in ${city.name}?`, a: `In ${city.name}, a gunite pool averages ${fmt(gunite)}, fiberglass ${fmt(fiber)}, and vinyl liner ${fmt(vinyl)} for a standard 500 sq ft pool. These are base estimates before decking, spa, features, and landscaping — a complete project typically adds $20,000–$50,000 to the base pool cost.` },
            { q: `What is the swim season in ${city.name}?`, a: `${city.name} has an approximate pool season of ${city.season}. ${city.frost ? `Winterization (closing in fall, opening in spring) costs approximately $400–$700 per year combined.` : `No winterization is required in ${city.name} — one of the benefits of the local climate.`}` },
            { q: `How long does it take to build a pool in ${city.name}?`, a: `Permit processing in ${city.name} typically takes 4–8 weeks. Once permits are approved, gunite pools take 8–14 additional weeks to complete, fiberglass 3–6 weeks, and vinyl liner 4–8 weeks. Starting your project in fall or winter usually results in faster completion.` },
            { q: `What is the cheapest pool option in ${city.name}?`, a: `Vinyl liner pools are the most affordable in ${city.name}, starting around ${fmt(vinyl)}. Fiberglass offers a middle ground at around ${fmt(fiber)}. Gunite is the most expensive at ${fmt(gunite)}+ but provides unlimited customization and a 50+ year structure.` },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: i === 0 ? "none" : `1px solid ${T.border}`, paddingTop: i === 0 ? 0 : 14, marginTop: i === 0 ? 0 : 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>{q}</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>{a}</div>
            </div>
          ))}
        </div>

        {/* STATE + NEARBY */}
        <div style={{ ...card, marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 12 }}>Compare Nearby Markets</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <Link to={`/${city.stateSlug}`} style={{ padding: "8px 14px", borderRadius: 20, background: T.accentLight, color: T.accent, textDecoration: "none", fontSize: 12, fontWeight: 700 }}>
              All of {city.state} →
            </Link>
            {city.nearby.filter(s => CITIES[s]).map(s => (
              <Link key={s} to={`/city/${s}`} style={{ padding: "8px 14px", borderRadius: 20, background: T.bg2, color: T.textMid, textDecoration: "none", fontSize: 12, fontWeight: 600 }}>
                {CITIES[s].name} →
              </Link>
            ))}
          </div>
          <Link to="/pool-cost-by-state" style={{ fontSize: 13, color: T.accent, textDecoration: "none", fontWeight: 600 }}>→ See pool costs for all 50 states</Link>
        </div>

        <BrowseByState />
      </div>
    </div>
  );
}
