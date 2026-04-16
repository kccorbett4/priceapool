import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import App from './App.jsx'

const T = {
  bg: "#f5f0eb", bg2: "#ede7e0", card: "#ffffff",
  border: "#e2ddd6", borderLight: "#eee9e3",
  accent: "#0284c7", accentLight: "#e0f2fe", accentDark: "#0369a1",
  text: "#1e293b", textMid: "#475569", textDim: "#94a3b8",
  success: "#16a34a", successBg: "#f0fdf4", successBorder: "#bbf7d0",
};

const SLUG_TO_CODE = {
  "alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA",
  "colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA",
  "hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA",
  "kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD",
  "massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS",
  "missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV",
  "new-hampshire":"NH","new-jersey":"NJ","new-mexico":"NM","new-york":"NY",
  "north-carolina":"NC","north-dakota":"ND","ohio":"OH","oklahoma":"OK",
  "oregon":"OR","pennsylvania":"PA","rhode-island":"RI","south-carolina":"SC",
  "south-dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT",
  "virginia":"VA","washington":"WA","west-virginia":"WV","wisconsin":"WI",
  "wyoming":"WY","washington-dc":"DC",
};

const STATE_DATA = {
  AL:{name:"Alabama",labor:0.82,permit:1000,frost:false,region:"south",cities:["Birmingham","Huntsville","Mobile","Montgomery"],neighbors:["georgia","florida","mississippi","tennessee"]},
  AK:{name:"Alaska",labor:1.45,permit:2500,frost:true,region:"north",cities:["Anchorage","Fairbanks","Juneau"],neighbors:[]},
  AZ:{name:"Arizona",labor:1.02,permit:1600,frost:false,region:"southwest",cities:["Phoenix","Tucson","Scottsdale","Mesa","Chandler"],neighbors:["california","nevada","utah","new-mexico"]},
  AR:{name:"Arkansas",labor:0.78,permit:900,frost:false,region:"south",cities:["Little Rock","Fayetteville","Fort Smith","Jonesboro"],neighbors:["missouri","tennessee","mississippi","louisiana","texas","oklahoma"]},
  CA:{name:"California",labor:1.38,permit:2900,frost:false,region:"west",cities:["Los Angeles","San Diego","San Jose","San Francisco","Sacramento","Fresno"],neighbors:["oregon","nevada","arizona"]},
  CO:{name:"Colorado",labor:1.10,permit:1900,frost:true,region:"mountain",cities:["Denver","Colorado Springs","Aurora","Fort Collins","Boulder"],neighbors:["wyoming","nebraska","kansas","oklahoma","new-mexico","utah"]},
  CT:{name:"Connecticut",labor:1.25,permit:2400,frost:true,region:"northeast",cities:["Bridgeport","New Haven","Hartford","Stamford"],neighbors:["new-york","massachusetts","rhode-island"]},
  DE:{name:"Delaware",labor:1.08,permit:1700,frost:true,region:"midatlantic",cities:["Wilmington","Dover","Newark"],neighbors:["maryland","pennsylvania","new-jersey"]},
  FL:{name:"Florida",labor:0.92,permit:1300,frost:false,region:"south",cities:["Miami","Tampa","Orlando","Jacksonville","Fort Lauderdale","Naples","Sarasota"],neighbors:["georgia","alabama"]},
  GA:{name:"Georgia",labor:0.88,permit:1200,frost:false,region:"south",cities:["Atlanta","Augusta","Savannah","Columbus","Marietta","Alpharetta"],neighbors:["florida","alabama","tennessee","north-carolina","south-carolina"]},
  HI:{name:"Hawaii",labor:1.55,permit:3200,frost:false,region:"pacific",cities:["Honolulu","Kailua","Pearl City","Hilo"],neighbors:[]},
  ID:{name:"Idaho",labor:0.98,permit:1500,frost:true,region:"mountain",cities:["Boise","Meridian","Nampa","Idaho Falls"],neighbors:["washington","oregon","nevada","utah","wyoming","montana"]},
  IL:{name:"Illinois",labor:1.05,permit:1800,frost:true,region:"midwest",cities:["Chicago","Aurora","Naperville","Rockford","Springfield"],neighbors:["wisconsin","iowa","missouri","kentucky","indiana"]},
  IN:{name:"Indiana",labor:0.90,permit:1300,frost:true,region:"midwest",cities:["Indianapolis","Fort Wayne","Evansville","South Bend","Carmel"],neighbors:["michigan","ohio","kentucky","illinois"]},
  IA:{name:"Iowa",labor:0.88,permit:1200,frost:true,region:"midwest",cities:["Des Moines","Cedar Rapids","Davenport","Sioux City"],neighbors:["minnesota","wisconsin","illinois","missouri","nebraska","south-dakota"]},
  KS:{name:"Kansas",labor:0.84,permit:1100,frost:true,region:"midwest",cities:["Wichita","Overland Park","Kansas City","Topeka"],neighbors:["nebraska","missouri","oklahoma","colorado"]},
  KY:{name:"Kentucky",labor:0.83,permit:1100,frost:true,region:"south",cities:["Louisville","Lexington","Bowling Green","Owensboro"],neighbors:["ohio","indiana","illinois","missouri","tennessee","virginia","west-virginia"]},
  LA:{name:"Louisiana",labor:0.80,permit:1000,frost:false,region:"south",cities:["New Orleans","Baton Rouge","Shreveport","Lafayette","Metairie"],neighbors:["arkansas","mississippi","texas"]},
  ME:{name:"Maine",labor:1.12,permit:1900,frost:true,region:"northeast",cities:["Portland","Lewiston","Bangor","Augusta"],neighbors:["new-hampshire"]},
  MD:{name:"Maryland",labor:1.15,permit:2100,frost:true,region:"midatlantic",cities:["Baltimore","Frederick","Rockville","Gaithersburg","Annapolis"],neighbors:["virginia","west-virginia","pennsylvania","delaware","washington-dc"]},
  MA:{name:"Massachusetts",labor:1.30,permit:2500,frost:true,region:"northeast",cities:["Boston","Worcester","Springfield","Cambridge","Lowell"],neighbors:["connecticut","rhode-island","new-york","new-hampshire","vermont"]},
  MI:{name:"Michigan",labor:0.95,permit:1500,frost:true,region:"midwest",cities:["Detroit","Grand Rapids","Warren","Sterling Heights","Ann Arbor","Lansing"],neighbors:["ohio","indiana","wisconsin"]},
  MN:{name:"Minnesota",labor:1.02,permit:1600,frost:true,region:"midwest",cities:["Minneapolis","Saint Paul","Rochester","Duluth","Bloomington"],neighbors:["wisconsin","iowa","south-dakota","north-dakota"]},
  MS:{name:"Mississippi",labor:0.76,permit:900,frost:false,region:"south",cities:["Jackson","Gulfport","Southaven","Hattiesburg"],neighbors:["tennessee","alabama","louisiana","arkansas"]},
  MO:{name:"Missouri",labor:0.84,permit:1100,frost:true,region:"midwest",cities:["Kansas City","St. Louis","Springfield","Columbia","Independence"],neighbors:["iowa","illinois","kentucky","tennessee","arkansas","oklahoma","kansas","nebraska"]},
  MT:{name:"Montana",labor:1.00,permit:1500,frost:true,region:"mountain",cities:["Billings","Missoula","Great Falls","Bozeman"],neighbors:["idaho","wyoming","north-dakota","south-dakota"]},
  NE:{name:"Nebraska",labor:0.86,permit:1100,frost:true,region:"midwest",cities:["Omaha","Lincoln","Bellevue","Grand Island"],neighbors:["south-dakota","iowa","missouri","kansas","colorado","wyoming"]},
  NV:{name:"Nevada",labor:1.05,permit:1700,frost:false,region:"southwest",cities:["Las Vegas","Henderson","Reno","North Las Vegas","Sparks"],neighbors:["california","oregon","idaho","utah","arizona"]},
  NH:{name:"New Hampshire",labor:1.15,permit:2000,frost:true,region:"northeast",cities:["Manchester","Nashua","Concord","Derry"],neighbors:["maine","vermont","massachusetts"]},
  NJ:{name:"New Jersey",labor:1.28,permit:2600,frost:true,region:"midatlantic",cities:["Newark","Jersey City","Paterson","Trenton","Edison"],neighbors:["new-york","pennsylvania","delaware"]},
  NM:{name:"New Mexico",labor:0.90,permit:1300,frost:false,region:"southwest",cities:["Albuquerque","Las Cruces","Rio Rancho","Santa Fe"],neighbors:["arizona","utah","colorado","oklahoma","texas"]},
  NY:{name:"New York",labor:1.35,permit:2800,frost:true,region:"northeast",cities:["New York City","Buffalo","Rochester","Yonkers","Syracuse","Albany"],neighbors:["pennsylvania","new-jersey","connecticut","massachusetts","vermont"]},
  NC:{name:"North Carolina",labor:0.87,permit:1200,frost:false,region:"south",cities:["Charlotte","Raleigh","Greensboro","Durham","Winston-Salem","Cary"],neighbors:["virginia","tennessee","georgia","south-carolina"]},
  ND:{name:"North Dakota",labor:0.95,permit:1400,frost:true,region:"midwest",cities:["Fargo","Bismarck","Grand Forks","Minot"],neighbors:["minnesota","south-dakota","montana"]},
  OH:{name:"Ohio",labor:0.92,permit:1400,frost:true,region:"midwest",cities:["Columbus","Cleveland","Cincinnati","Toledo","Akron","Dayton"],neighbors:["michigan","pennsylvania","west-virginia","kentucky","indiana"]},
  OK:{name:"Oklahoma",labor:0.80,permit:1000,frost:false,region:"south",cities:["Oklahoma City","Tulsa","Norman","Broken Arrow","Edmond"],neighbors:["kansas","missouri","arkansas","texas","new-mexico","colorado"]},
  OR:{name:"Oregon",labor:1.12,permit:1900,frost:true,region:"west",cities:["Portland","Eugene","Salem","Gresham","Hillsboro","Bend"],neighbors:["washington","idaho","nevada","california"]},
  PA:{name:"Pennsylvania",labor:1.10,permit:2000,frost:true,region:"midatlantic",cities:["Philadelphia","Pittsburgh","Allentown","Erie","Reading","Harrisburg"],neighbors:["new-york","new-jersey","delaware","maryland","west-virginia","ohio"]},
  RI:{name:"Rhode Island",labor:1.22,permit:2300,frost:true,region:"northeast",cities:["Providence","Warwick","Cranston","Pawtucket","East Providence"],neighbors:["connecticut","massachusetts"]},
  SC:{name:"South Carolina",labor:0.85,permit:1100,frost:false,region:"south",cities:["Columbia","Charleston","North Charleston","Mount Pleasant","Greenville"],neighbors:["north-carolina","georgia"]},
  SD:{name:"South Dakota",labor:0.88,permit:1200,frost:true,region:"midwest",cities:["Sioux Falls","Rapid City","Aberdeen","Brookings"],neighbors:["north-dakota","minnesota","iowa","nebraska","wyoming","montana"]},
  TN:{name:"Tennessee",labor:0.83,permit:1100,frost:false,region:"south",cities:["Nashville","Memphis","Knoxville","Chattanooga","Clarksville","Murfreesboro"],neighbors:["kentucky","virginia","north-carolina","georgia","alabama","mississippi","arkansas","missouri"]},
  TX:{name:"Texas",labor:0.88,permit:1100,frost:false,region:"south",cities:["Houston","San Antonio","Dallas","Austin","Fort Worth","El Paso","Plano","Frisco"],neighbors:["new-mexico","oklahoma","arkansas","louisiana"]},
  UT:{name:"Utah",labor:1.05,permit:1800,frost:true,region:"mountain",cities:["Salt Lake City","West Valley City","Provo","West Jordan","Orem","Sandy"],neighbors:["idaho","wyoming","colorado","new-mexico","arizona","nevada"]},
  VT:{name:"Vermont",labor:1.15,permit:2000,frost:true,region:"northeast",cities:["Burlington","South Burlington","Rutland","Barre"],neighbors:["new-york","new-hampshire","massachusetts"]},
  VA:{name:"Virginia",labor:1.02,permit:1700,frost:true,region:"midatlantic",cities:["Virginia Beach","Norfolk","Chesapeake","Richmond","Newport News","Alexandria","Arlington"],neighbors:["west-virginia","maryland","north-carolina","tennessee","kentucky","washington-dc"]},
  WA:{name:"Washington",labor:1.18,permit:2100,frost:true,region:"west",cities:["Seattle","Spokane","Tacoma","Vancouver","Bellevue","Kirkland","Redmond"],neighbors:["idaho","oregon"]},
  WV:{name:"West Virginia",labor:0.82,permit:1000,frost:true,region:"midatlantic",cities:["Charleston","Huntington","Parkersburg","Morgantown"],neighbors:["ohio","pennsylvania","maryland","virginia","kentucky"]},
  WI:{name:"Wisconsin",labor:0.95,permit:1400,frost:true,region:"midwest",cities:["Milwaukee","Madison","Green Bay","Kenosha","Racine"],neighbors:["minnesota","michigan","iowa","illinois"]},
  WY:{name:"Wyoming",labor:1.00,permit:1400,frost:true,region:"mountain",cities:["Cheyenne","Casper","Laramie","Gillette"],neighbors:["montana","south-dakota","nebraska","colorado","utah","idaho"]},
  DC:{name:"Washington D.C.",labor:1.30,permit:2800,frost:true,region:"midatlantic",cities:["Washington"],neighbors:["maryland","virginia"]},
};

const fmt = n => "$" + Math.round(n).toLocaleString();

function getStateCosts(d) {
  // All-in estimate for a standard 500 sqft pool (16x32, avg depth 4.75ft, standard soil)
  const sqft = 500;
  const avgD = 4.75;
  const cuYd = (sqft * avgD) / 27;
  const lab = d.labor;
  const permits = d.permit || 1500;
  const frostC = d.frost ? 2400 : 0;
  const cont = 0.08;

  // Gunite: shell + excav + plumb + elec + interior finish + permits + frost + contingency
  const gShell = Math.max(48000, sqft * 82 * lab);
  const gExcav = cuYd * 35 * lab;
  const gPlumb = (7000 + sqft * 3.5) * lab;
  const gElec  = (3500 + sqft * 1.0) * lab;
  const gInter = (sqft * 1.4) * 8 * lab; // ~700 sqft finish at $8/sqft
  const gSub   = gShell + gExcav + gPlumb + gElec + gInter + permits + frostC;
  const gunite = Math.round((gSub * (1 + cont)) / 1000) * 1000;

  // Fiberglass: shell + excav + plumb + elec + permits + frost + contingency (no interior finish)
  const fShell = Math.max(35000, sqft * 60 * lab);
  const fExcav = cuYd * 35 * lab;
  const fPlumb = (7000 + sqft * 3.5) * lab;
  const fElec  = (3500 + sqft * 1.0) * lab;
  const fSub   = fShell + fExcav + fPlumb + fElec + permits + frostC;
  const fiber  = Math.round((fSub * (1 + cont)) / 1000) * 1000;

  // Vinyl: shell + excav + plumb + elec + permits + frost + contingency (no interior finish)
  const vShell = Math.max(25000, sqft * 35 * lab);
  const vExcav = cuYd * 35 * lab;
  const vPlumb = (7000 + sqft * 3.5) * lab;
  const vElec  = (3500 + sqft * 1.0) * lab;
  const vSub   = vShell + vExcav + vPlumb + vElec + permits + frostC;
  const vinyl  = Math.round((vSub * (1 + cont)) / 1000) * 1000;

  return { gunite, fiber, vinyl };
}

function climateSentence(d) {
  if (!d.frost) {
    const regions = { south: "long summers and mild winters", southwest: "a hot, dry climate", pacific: "warm tropical weather" };
    return `${d.name}'s ${regions[d.region] || "warm climate"} means you can enjoy your pool up to 8–10 months per year with no winterization required.`;
  }
  return `${d.name} has cold winters, so pool owners typically close their pool in October and reopen in April–May. Budget $300–$600 per year for winterization and opening services.`;
}

function permitSentence(d) {
  const low = d.permit;
  const high = Math.round(d.permit * 1.8);
  return `Building permits in ${d.name} typically run ${fmt(low)}–${fmt(high)} depending on your county, pool type, and local requirements. Most municipalities also require a fence or barrier around the pool.`;
}

function laborSentence(d) {
  if (d.labor >= 1.25) return `${d.name} has above-average labor costs — pool contractors here charge 20–40% more than the national average. Getting multiple bids is especially important in this market.`;
  if (d.labor >= 1.05) return `${d.name} has slightly above-average labor costs, meaning your total pool cost will run 5–15% higher than the national median.`;
  if (d.labor <= 0.85) return `${d.name} has below-average labor costs — one of the more affordable states to build a pool. You may find competitive pricing by shopping local contractors.`;
  return `${d.name} has near-average labor costs, so pricing is close to national medians for each pool type.`;
}

export default function StatePage() {
  const { stateSlug } = useParams();
  const code = SLUG_TO_CODE[stateSlug?.toLowerCase()];

  if (!code) return <Navigate to="/" replace />;

  const d = STATE_DATA[code];
  const costs = getStateCosts(d);

  const stateSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does an inground pool cost in ${d.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In ${d.name}, a gunite pool averages ${fmt(costs.gunite)}, fiberglass averages ${fmt(costs.fiber)}, and vinyl liner pools average ${fmt(costs.vinyl)} for a standard 500 sq ft pool. Prices vary by size, features, soil conditions, and local contractor.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you need a permit to build a pool in ${d.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": permitSentence(d)
        }
      },
      {
        "@type": "Question",
        "name": `What is the cheapest pool to build in ${d.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Vinyl liner pools are the most affordable option in ${d.name}, starting around ${fmt(costs.vinyl)}. Fiberglass pools offer a mid-range option at around ${fmt(costs.fiber)}, while gunite pools are the most customizable and start at ${fmt(costs.gunite)}.`
        }
      },
    ]
  };

  const wrap = { fontFamily: "'Instrument Sans','DM Sans',system-ui,sans-serif", color: T.text, background: T.bg, minHeight: "100vh" };
  const card = { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };
  const inner = { maxWidth: 720, margin: "0 auto", padding: "0 16px" };

  return (
    <div style={wrap}>
      <Helmet>
        <title>{`How Much Does a Pool Cost in ${d.name} (2026)? | PriceAPool`}</title>
        <meta name="description" content={`2026 pool cost in ${d.name}: gunite pools average ${fmt(costs.gunite)}, fiberglass ${fmt(costs.fiber)}, vinyl ${fmt(costs.vinyl)}. Free calculator adjusted for ${d.name} labor rates, permits, and climate.`} />
        <link rel="canonical" href={`https://priceapool.com/${stateSlug}`} />
        <meta property="og:title" content={`Pool Cost in ${d.name} (2026) — Free Calculator`} />
        <meta property="og:description" content={`How much does a pool cost in ${d.name}? Get a free instant estimate adjusted for local labor and permit costs.`} />
        <meta property="og:url" content={`https://priceapool.com/${stateSlug}`} />
        <script type="application/ld+json">{JSON.stringify(stateSchema)}</script>
      </Helmet>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "rgba(245,240,235,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: `linear-gradient(135deg,${T.accent},${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff" }}>🏊</div>
          <span style={{ fontSize: 15, fontWeight: 800, color: T.text, letterSpacing: "-.5px" }}>PriceAPool<span style={{ color: T.accent }}>.com</span></span>
        </Link>
        <Link to="/blog/fiberglass-vs-gunite-vs-vinyl" style={{ fontSize: 12, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Pool Guides →</Link>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "40px 20px 24px", background: `linear-gradient(180deg,${T.bg} 0%,${T.bg2} 100%)` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Pool Cost Estimator — {d.name}</div>
        <h1 style={{ fontSize: "clamp(24px,5vw,38px)", fontWeight: 800, color: T.text, letterSpacing: "-.5px", lineHeight: 1.15, marginBottom: 12 }}>
          How Much Does a Pool Cost in {d.name} in 2026?
        </h1>
        <p style={{ fontSize: 15, color: T.textMid, maxWidth: 560, margin: "0 auto 20px", lineHeight: 1.65 }}>
          In {d.name}, a gunite pool averages <strong>{fmt(costs.gunite)}</strong>, fiberglass averages <strong>{fmt(costs.fiber)}</strong>, and vinyl liner pools average <strong>{fmt(costs.vinyl)}</strong> — before features, decking, and site conditions.
          Use the free calculator below to get a personalized estimate.
        </p>
      </div>

      <div style={inner}>
        {/* COST SUMMARY CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 16 }}>
          {[
            { type: "Gunite / Shotcrete", cost: costs.gunite, tag: "Most Durable", color: T.accent },
            { type: "Fiberglass", cost: costs.fiber, tag: "Fastest Install", color: "#0891b2" },
            { type: "Vinyl Liner", cost: costs.vinyl, tag: "Most Affordable", color: T.success },
          ].map(({ type, cost, tag, color }) => (
            <div key={type} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{tag}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: "-.5px" }}>{fmt(cost)}</div>
              <div style={{ fontSize: 12, color: T.textMid, marginTop: 4 }}>{type}</div>
              <div style={{ fontSize: 10, color: T.textDim, marginTop: 3 }}>avg. 500 sq ft pool</div>
            </div>
          ))}
        </div>

        {/* ABOUT THIS STATE */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>Pool Costs in {d.name}: What You Need to Know</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75, marginBottom: 12 }}>
            {laborSentence(d)}
          </p>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75, marginBottom: 12 }}>
            {climateSentence(d)}
          </p>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>
            {permitSentence(d)}
          </p>
        </div>

        {/* KEY COST FACTORS */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>What Affects Pool Cost in {d.name}?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
            {[
              { icon: "🔧", title: "Labor Rates", body: `${d.name} contractors price labor at roughly ${Math.round(d.labor * 100)}% of the national average. ${d.labor > 1.1 ? "Plan for a higher budget compared to southern states." : d.labor < 0.9 ? "You may find more competitive bids here." : "Pricing is close to the national median."}` },
              { icon: "📋", title: "Permits & Inspections", body: `Permit costs in ${d.name} start around ${fmt(d.permit)}. Inspections are typically required at excavation, steel/shell, and final completion stages.` },
              { icon: "🏔️", title: "Soil & Site", body: `Soil type is the #1 hidden cost driver. Rocky or high-water-table conditions can add $10,000–$25,000 to any ${d.name} pool build. Always get a site evaluation first.` },
              { icon: d.frost ? "❄️" : "☀️", title: d.frost ? "Winter Closedown" : "Year-Round Use", body: d.frost ? `${d.name} winters require annual pool closing and opening — typically $300–$600/year combined. Budget for a quality pool cover.` : `${d.name}'s climate allows extended pool use, making your cost-per-swim lower than northern states. No winterization needed in most areas.` },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ background: T.bg, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CITIES */}
        {d.cities.length > 1 && (
          <div style={card}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 6 }}>Pool Costs by City in {d.name}</h2>
            <p style={{ fontSize: 13, color: T.textMid, marginBottom: 14, lineHeight: 1.6 }}>
              Costs vary within {d.name} based on metro vs. rural labor markets. Enter your ZIP code in the calculator below for the most accurate estimate.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 8 }}>
              {d.cities.map(city => {
                const cityMult = city.toLowerCase().includes("new york") || city.toLowerCase().includes("san francisco") ? 1.15
                  : city.toLowerCase().includes("los angeles") || city.toLowerCase().includes("chicago") || city.toLowerCase().includes("miami") ? 1.08
                  : city === d.cities[0] ? 1.04 : 1.0;
                const cityGunite = Math.round(costs.gunite * cityMult / 1000) * 1000;
                return (
                  <div key={city} style={{ background: T.bg, borderRadius: 9, padding: "11px 14px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{city}</div>
                    <div style={{ fontSize: 11, color: T.textMid, marginTop: 2 }}>Gunite from <span style={{ color: T.accent, fontWeight: 700 }}>{fmt(cityGunite)}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CALCULATOR */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ textAlign: "center", padding: "6px 0 4px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.textMid, letterSpacing: .5 }}>↓ Get Your Free {d.name} Pool Cost Estimate ↓</div>
          </div>
        </div>
      </div>

      <App initialState={code} hideNav={true} />

      {/* FAQ */}
      <div style={inner}>
        <div style={{ ...card, marginTop: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 16 }}>Frequently Asked Questions — Pool Costs in {d.name}</h2>
          {[
            {
              q: `How much does an inground pool cost in ${d.name}?`,
              a: `In ${d.name}, a gunite (concrete) pool averages ${fmt(costs.gunite)}, fiberglass pools average ${fmt(costs.fiber)}, and vinyl liner pools average ${fmt(costs.vinyl)} for a standard-size pool. These are base estimates — your final cost depends on size, soil conditions, features like spas or water features, and decking.`
            },
            {
              q: `What is the cheapest inground pool in ${d.name}?`,
              a: `Vinyl liner pools are the most affordable option in ${d.name}, starting around ${fmt(costs.vinyl)}. The liner will need replacement every 7–10 years at a cost of $3,500–$6,000. Fiberglass pools offer a middle ground — faster to install and lower long-term maintenance than vinyl.`
            },
            {
              q: `How much do pool permits cost in ${d.name}?`,
              a: permitSentence(d)
            },
            {
              q: `How long does it take to build a pool in ${d.name}?`,
              a: `Gunite pools in ${d.name} typically take 8–14 weeks from permit approval to completion. Fiberglass pools can be installed in 3–6 weeks. Vinyl liner pools fall in between at 4–8 weeks. Delays can occur due to weather, permit processing times, or contractor availability — especially during peak season (spring and summer).`
            },
            {
              q: `Do I need to winterize my pool in ${d.name}?`,
              a: d.frost
                ? `Yes — ${d.name} winters require proper pool winterization to prevent freeze damage to pipes and equipment. Professional closing and opening typically costs $300–$600 combined. Plan for this as an annual operating cost.`
                : `Most of ${d.name} does not require traditional pool winterization. In rare cold snaps, running equipment overnight is usually sufficient to protect your pool. This is one of the advantages of building a pool in ${d.name}.`
            },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: i === 0 ? "none" : `1px solid ${T.border}`, paddingTop: i === 0 ? 0 : 14, marginTop: i === 0 ? 0 : 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>{q}</div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>{a}</div>
            </div>
          ))}
        </div>

        {/* GUIDES LINKS */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 12 }}>Pool Buyer's Guides</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { slug: "fiberglass-vs-gunite-vs-vinyl", label: "Fiberglass vs Gunite vs Vinyl — Which Pool Type is Right for You?" },
              { slug: "inground-pool-cost-guide", label: "Complete Inground Pool Cost Guide 2026" },
              { slug: "pool-cost-by-size", label: "Pool Cost by Size: Small, Medium & Large Pools" },
              { slug: "pool-financing-guide", label: "How to Finance a Pool — Loans, HELOCs & More" },
              { slug: "does-a-pool-add-home-value", label: "Does a Pool Add Home Value? ROI Breakdown" },
            ].map(({ slug, label }) => (
              <Link key={slug} to={`/blog/${slug}`} style={{ fontSize: 13, color: T.accent, textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: T.textDim }}>→</span> {label}
              </Link>
            ))}
          </div>
        </div>

        {/* NEARBY STATES */}
        {d.neighbors.length > 0 && (
          <div style={{ ...card, marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 12 }}>Compare Pool Costs in Nearby States</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.neighbors.map(slug => {
                const neighborCode = SLUG_TO_CODE[slug];
                const neighborData = STATE_DATA[neighborCode];
                return (
                  <Link key={slug} to={`/${slug}`} style={{ padding: "8px 14px", borderRadius: 20, background: T.accentLight, color: T.accent, textDecoration: "none", fontSize: 12, fontWeight: 600 }}>
                    {neighborData?.name || slug} →
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
