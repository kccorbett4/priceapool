import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BrowseByState from './BrowseByState.jsx'

const T = {
  bg: "#FAF8F3", bg2: "#F2EFE7", card: "#FFFFFF",
  border: "#E8E3D7", borderLight: "#EFEBE0",
  accent: "#0F4C5C", accentLight: "#E6EEF0", accentDark: "#0A3440",
  text: "#0A0A0A", textMid: "#3D3D3D", textDim: "#8A8A8A",
  success: "#166534", successBg: "#F0FDF4", successBorder: "#BBF7D0",
  warn: "#92400E", warnBg: "#FFFBEB",
};

const money = (n) => "$" + n.toLocaleString();

/* ─── Shared layout bits ─── */
function Nav() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, background: "rgba(250,248,243,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ display: "block" }}><circle cx="14" cy="14" r="14" fill={T.text} /><path d="M6 15.5 Q 9 13, 12 15.5 T 18 15.5 T 24 15.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><path d="M6 19.5 Q 9 17, 12 19.5 T 18 19.5 T 24 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" /></svg>
        <span style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>PriceAPool</span>
      </Link>
      <Link to="/" style={{ fontSize: 12, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Free Calculator →</Link>
    </nav>
  );
}

/* ─── BUILD DATA ─── */

export const BUILDS = {
  "austin-family-fiberglass": {
    title: "The Austin Family Fiberglass",
    subtitle: "A 14×28 saltwater fiberglass pool for a young family on expansive clay soil.",
    location: "Austin, TX",
    type: "Fiberglass",
    tier: "Mid-range",
    image: "/build-austin-family.jpg",
    priceTotal: 68500,
    priceRange: [62000, 75000],
    timelineWeeks: 7,
    specs: {
      dimensions: "14 × 28 ft",
      surface: "392 sq ft",
      depth: "3.5 ft shallow → 6.5 ft deep",
      shape: "Rectangular with integrated tanning ledge",
      finish: "Dark blue gel coat (Leisure Pools catalog model)",
      chemistry: "Saltwater chlorination",
    },
    summary: "A two-working-parents family of four in Lakeway wanted the pool installed during a single summer and a near-zero maintenance burden. Expansive clay soil made a rigid gunite shell a gamble, and saltwater was non-negotiable. Fiberglass checked every box.",
    story: [
      "The owners interviewed four builders before choosing a Leisure Pools dealer with documented installs in Lakeway and Bee Cave. The deciding factor was not cost — fiberglass and vinyl came in within $8,000 of each other — but the builder's portfolio of six-year-old local installs they could visit in person.",
      "The shell was trucked from the Leisure Knoxville plant, dropped on a Tuesday morning, and the family was swimming 18 days later (permits had been pulled two months in advance). The tanning ledge is the one feature they say they wish they'd made larger.",
      "Two years in, chemical spend is running $42 per month on average, vs. neighbors with plaster gunite pools reporting $85–$110 per month.",
    ],
    breakdown: [
      { label: "Fiberglass shell (delivered)", cost: 27500 },
      { label: "Excavation & site prep", cost: 4200 },
      { label: "Shell set + crane rental", cost: 3500 },
      { label: "Plumbing & equipment pad", cost: 5800 },
      { label: "Saltwater chlorinator + variable-speed pump", cost: 4200 },
      { label: "Electrical + bonding", cost: 2400 },
      { label: "Paver deck (520 sq ft)", cost: 11200 },
      { label: "Coping + waterline tile", cost: 3200 },
      { label: "LED lighting (2 pool, 1 ledge)", cost: 1400 },
      { label: "Permits + engineering", cost: 1200 },
      { label: "Fence (code-required)", cost: 2800 },
      { label: "Startup chemicals + orientation", cost: 600 },
      { label: "Contingency (used)", cost: 500 },
    ],
    whatAddedCost: [
      { label: "Paver deck upgrade over broom-finish concrete", cost: 5200 },
      { label: "Variable-speed pump (required by TX code)", cost: 1600 },
      { label: "Saltwater chlorinator vs traditional", cost: 1100 },
    ],
    whatSavedCost: [
      { label: "Standard catalog model (no custom shape)", saved: 8000 },
      { label: "Chose fall excavation (off-peak pricing)", saved: 3200 },
      { label: "Skipped attached spa; bought portable hot tub later", saved: 16000 },
    ],
    tags: ["Fiberglass", "Saltwater", "Clay soil", "Family"],
  },

  "scottsdale-resort-gunite": {
    title: "The Scottsdale Resort",
    subtitle: "An 18×40 vanishing-edge gunite pool with raised spa, pebble finish, and a custom fire-and-water feature.",
    location: "Scottsdale, AZ",
    type: "Gunite",
    tier: "Luxury",
    image: "/build-scottsdale-resort.jpg",
    priceTotal: 215000,
    priceRange: [195000, 240000],
    timelineWeeks: 20,
    specs: {
      dimensions: "18 × 40 ft (freeform)",
      surface: "680 sq ft",
      depth: "3 ft shallow → 8.5 ft deep",
      shape: "Freeform with vanishing edge + raised spillover spa",
      finish: "PebbleTec Midnight Blue",
      chemistry: "Saltwater + UV/ozone",
    },
    summary: "A 3,400 sq ft McDowell Mountain home with panoramic valley views called for a pool that read as part of the architecture, not an afterthought. The client wanted a vanishing edge, a raised spa, integrated fire features, and the surface to look like the Arizona sky.",
    story: [
      "The builder spent six weeks on design before the first excavator showed up — renderings, a full hardscape plan, and lighting sections. The pool is technically two shells: the main pool and a raised spa that spills over a decorative glass tile wall into a 9-inch trough before cascading into the pool.",
      "Pebble finish (not plaster) was non-negotiable because of the saltwater system. The NPC has documented accelerated plaster erosion under salt; pebble handles it without issue. The midnight-blue pebble with the sky-reflection pattern reads almost black in direct sun and deep sapphire at dusk — exactly the effect the client wanted.",
      "Two fire bowls on the pool's raised back wall, a 6-foot infinity edge spilling into a planted catch basin, a fully-automated Pentair IntelliCenter system, and an automatic cover for the spa. Total pad equipment count: twelve pieces.",
    ],
    breakdown: [
      { label: "Shell: shotcrete + rebar (680 sq ft)", cost: 44000 },
      { label: "Excavation (rock excavation surcharge)", cost: 9800 },
      { label: "Engineering + post-tension design", cost: 4200 },
      { label: "Raised spa shell + spillover", cost: 18500 },
      { label: "PebbleTec Midnight Blue finish", cost: 16200 },
      { label: "Glass mosaic waterline + spa wall tile", cost: 12800 },
      { label: "Travertine coping + 1,200 sq ft travertine deck", cost: 38000 },
      { label: "Vanishing edge trough + catch basin", cost: 9600 },
      { label: "Plumbing (complex, dual-shell)", cost: 12000 },
      { label: "Pentair IntelliCenter + VS pumps (×3)", cost: 14500 },
      { label: "Saltwater + UV/ozone sanitation", cost: 6800 },
      { label: "Two fire bowls (copper, gas)", cost: 8400 },
      { label: "Landscape + architectural lighting", cost: 9200 },
      { label: "Automatic cover (spa only)", cost: 3600 },
      { label: "Electrical + 200A subpanel upgrade", cost: 5200 },
      { label: "Permits + inspections (Maricopa County)", cost: 2800 },
      { label: "Fence (glass panel, view-preserving)", cost: 6800 },
      { label: "Startup + orientation", cost: 1400 },
    ],
    whatAddedCost: [
      { label: "Vanishing edge + catch basin engineering", cost: 18000 },
      { label: "Travertine deck over broom-finish concrete", cost: 22000 },
      { label: "Pentair IntelliCenter over basic equipment", cost: 6500 },
      { label: "Rock excavation surcharge (desert bedrock)", cost: 4800 },
      { label: "Glass fence over tubular steel", cost: 3200 },
    ],
    whatSavedCost: [
      { label: "In-pool grotto skipped (originally specced)", saved: 28000 },
      { label: "Swim-up bar consolidated into sun shelf", saved: 14000 },
    ],
    tags: ["Gunite", "Saltwater", "Vanishing edge", "Luxury"],
  },

  "annarbor-budget-vinyl": {
    title: "The Ann Arbor Family Vinyl",
    subtitle: "A 16×32 polymer-wall vinyl liner pool — the most affordable honest inground build in the Midwest.",
    location: "Ann Arbor, MI",
    type: "Vinyl liner",
    tier: "Budget",
    image: "/build-annarbor-vinyl.jpg",
    priceTotal: 54200,
    priceRange: [48000, 60000],
    timelineWeeks: 9,
    specs: {
      dimensions: "16 × 32 ft",
      surface: "512 sq ft",
      depth: "3 ft shallow → 8 ft deep (hopper)",
      shape: "Rectangle with diving hopper",
      finish: "28-mil printed vinyl, blue mosaic pattern",
      chemistry: "Traditional chlorine (salt-compatible walls but not installed)",
    },
    summary: "A two-income family with three kids and a 2,100 sq ft colonial budgeted $60K maximum for the pool itself. Vinyl with polymer walls was the only way to get an inground pool with a diving depth under that cap in Southeast Michigan.",
    story: [
      "The couple got bids from three Southeast Michigan builders — vinyl at $52K, fiberglass at $74K, and gunite at $102K. Every dollar over the vinyl bid would have come out of the landscaping budget, so vinyl won on pragmatism.",
      "Polymer walls were specified (not galvanized steel) specifically to preserve the option to add a saltwater system later. The builder also upgraded the liner to 28-mil from the 20-mil standard — roughly a $450 add, generally expected to buy 2–3 extra years of liner life.",
      "The pool opened Memorial Day weekend, twelve days after the liner drop. Total all-in spend including fence, concrete deck, and a simple heat pump: $54,200. They're planning to budget $5,500 every eighth year for a liner replacement as routine maintenance.",
    ],
    breakdown: [
      { label: "Polymer wall panels + braces", cost: 8200 },
      { label: "Excavation + hopper cut", cost: 3800 },
      { label: "Concrete footer + vermiculite floor", cost: 4400 },
      { label: "28-mil printed vinyl liner", cost: 3100 },
      { label: "Plumbing + skimmer + returns", cost: 3800 },
      { label: "Single-speed pump + cartridge filter", cost: 2200 },
      { label: "Small heat pump (50K BTU)", cost: 3600 },
      { label: "Stamped concrete deck (500 sq ft)", cost: 7800 },
      { label: "Aluminum coping", cost: 1400 },
      { label: "LED light (1 pool)", cost: 700 },
      { label: "Electrical + bonding", cost: 2100 },
      { label: "Permits (Washtenaw County)", cost: 950 },
      { label: "Fence (code-required 48\")", cost: 3200 },
      { label: "Diving board + handrail + ladder", cost: 1100 },
      { label: "Startup chemicals", cost: 350 },
      { label: "Frost-line overdig + backfill", cost: 1100 },
      { label: "Safety cover (winterization)", cost: 2400 },
      { label: "Contingency", cost: 4000 },
    ],
    whatAddedCost: [
      { label: "Polymer walls vs galvanized steel", cost: 2200 },
      { label: "28-mil liner vs 20-mil standard", cost: 450 },
      { label: "Heat pump to extend swim season", cost: 3600 },
      { label: "Safety cover (required by insurance)", cost: 2400 },
    ],
    whatSavedCost: [
      { label: "Stamped concrete over pavers", saved: 4800 },
      { label: "Chose standard rectangle (no custom liner)", saved: 2200 },
      { label: "Skipped attached spa", saved: 14000 },
      { label: "Off-season fall start (5% builder discount)", saved: 2700 },
    ],
    tags: ["Vinyl liner", "Polymer walls", "Cold climate", "Budget"],
  },

  "tampa-standard-gunite": {
    title: "The Tampa Standard Gunite",
    subtitle: "A 16×32 kidney gunite pool with attached spa, screened lanai, and the classic Sun Belt package.",
    location: "Tampa, FL",
    type: "Gunite",
    tier: "Mid-range",
    image: "/build-tampa-standard.jpg",
    priceTotal: 98700,
    priceRange: [88000, 110000],
    timelineWeeks: 14,
    specs: {
      dimensions: "16 × 32 ft (kidney)",
      surface: "470 sq ft",
      depth: "3.5 ft shallow → 6 ft deep",
      shape: "Kidney with attached 7×7 spa",
      finish: "Diamond Brite French Grey",
      chemistry: "Saltwater chlorination",
    },
    summary: "A Wesley Chapel couple in their fifties built what Florida builders call 'the standard package' — a kidney-shape gunite pool, attached spa, and a mansard-roof screen enclosure to keep the mosquitos and pool debris out.",
    story: [
      "The pool is priced right in the middle of the Florida gunite market. Everything about it is conventional: kidney shape (the classic Sun Belt silhouette from the 1980s, now back in fashion), Diamond Brite interior in French Grey (a quartz aggregate that reads soft blue-green in water), and a 7×7 spa with three jets spilling into the pool.",
      "The screen enclosure — common throughout Florida but rare elsewhere — added $16,800 to the project but saves on weekly cleaning and dramatically reduces evaporation. The homeowners estimate it also adds about 6–8 weeks of usable pool time in winter by breaking the wind.",
      "Saltwater was specified because French Grey quartz is salt-tolerant. Plaster would have been $3,000 cheaper but would need resurfacing two to three years sooner under salt.",
    ],
    breakdown: [
      { label: "Shell: shotcrete + rebar (470 sq ft)", cost: 28500 },
      { label: "Excavation + site prep", cost: 3800 },
      { label: "Engineering", cost: 1800 },
      { label: "Attached spa (7×7 with spillover)", cost: 11500 },
      { label: "Diamond Brite French Grey finish", cost: 8200 },
      { label: "Waterline tile", cost: 2800 },
      { label: "Paver deck (800 sq ft)", cost: 14400 },
      { label: "Coping (travertine cut)", cost: 2800 },
      { label: "Plumbing + equipment pad", cost: 6200 },
      { label: "Variable-speed pump + DE filter", cost: 3800 },
      { label: "Saltwater chlorinator", cost: 2400 },
      { label: "Heat pump (135K BTU)", cost: 4600 },
      { label: "Screen enclosure (mansard, 900 sq ft)", cost: 16800 },
      { label: "LED lighting (3 pool + 1 spa)", cost: 1800 },
      { label: "Electrical", cost: 2400 },
      { label: "Permits + inspections (Hillsborough)", cost: 1400 },
      { label: "Startup + orientation", cost: 600 },
    ],
    whatAddedCost: [
      { label: "Screen enclosure (reduces maintenance but pricey)", cost: 16800 },
      { label: "Attached spa vs portable", cost: 11500 },
      { label: "Heat pump (year-round usability)", cost: 4600 },
      { label: "Diamond Brite over standard plaster", cost: 3000 },
    ],
    whatSavedCost: [
      { label: "No frost protection needed (FL)", saved: 2800 },
      { label: "Low excavation depth (shallow water table)", saved: 1800 },
      { label: "Off-season winter start", saved: 4900 },
    ],
    tags: ["Gunite", "Attached spa", "Screen enclosure", "Saltwater"],
  },

  "paloalto-lap-fiberglass": {
    title: "The Palo Alto Lap Pool",
    subtitle: "A 10×44 narrow fiberglass lap pool for a minimalist mid-century home on a tight urban lot.",
    location: "Palo Alto, CA",
    type: "Fiberglass",
    tier: "Mid-range",
    image: "/build-paloalto-lap.jpg",
    priceTotal: 106400,
    priceRange: [95000, 120000],
    timelineWeeks: 8,
    specs: {
      dimensions: "10 × 44 ft",
      surface: "440 sq ft",
      depth: "Uniform 4.5 ft",
      shape: "Narrow rectangle (lap)",
      finish: "Charcoal gel coat",
      chemistry: "Saltwater chlorination",
    },
    summary: "A software engineer and a physician built a dedicated lap pool on a 7,200 sq ft lot in Old Palo Alto. The brief: a pool that reads architectural, not recreational, and that accommodates 50 laps per morning before work.",
    story: [
      "Lot constraints made gunite impractical — there was no route to get a shotcrete rig behind the house without removing a 40-year-old olive tree the owners refused to sacrifice. Fiberglass, delivered by crane over the house, was the only option that worked on the site.",
      "The narrow 10-foot width is on the tight edge of what the catalog offers, but it was the right proportion for the yard. The charcoal gel coat reads almost black against the bluestone coping — the architect's brief was 'reflecting pool first, pool second.'",
      "A dual-jet swim current system was ordered but ultimately not installed after a month of testing the pool without it. The homeowners found 12-stroke push-offs sufficient for their morning sets and preferred the aesthetic simplicity.",
    ],
    breakdown: [
      { label: "Fiberglass shell (delivered, Leisure Reflection 44)", cost: 38000 },
      { label: "Crane-over-house delivery", cost: 4800 },
      { label: "Excavation (limited access surcharge)", cost: 7200 },
      { label: "Shell set + backfill", cost: 3800 },
      { label: "Plumbing + equipment pad (restricted location)", cost: 7600 },
      { label: "Variable-speed pump + cartridge filter", cost: 3400 },
      { label: "Saltwater chlorinator", cost: 2600 },
      { label: "Heat pump (55K BTU, lap pool is small)", cost: 3400 },
      { label: "Automatic cover (roll-up, end-mounted)", cost: 8200 },
      { label: "Bluestone coping + 300 sq ft deck", cost: 14800 },
      { label: "LED lighting (2 pool + step lights)", cost: 2400 },
      { label: "Electrical + subpanel", cost: 3200 },
      { label: "Permits (Palo Alto)", cost: 3200 },
      { label: "Zen landscape integration", cost: 2800 },
      { label: "Startup + orientation", cost: 800 },
      { label: "Fence (glass panel street side)", cost: 4400 },
    ],
    whatAddedCost: [
      { label: "Crane-over-house delivery (access)", cost: 4800 },
      { label: "Bay Area labor premium (+38% CCI)", cost: 14200 },
      { label: "Automatic cover (required by city)", cost: 8200 },
      { label: "Glass fence panels (aesthetic)", cost: 2800 },
    ],
    whatSavedCost: [
      { label: "Catalog lap model (no custom shape)", saved: 12000 },
      { label: "Uniform depth (no deep end excavation)", saved: 3800 },
      { label: "Skipped dual-jet swim current system", saved: 4800 },
    ],
    tags: ["Fiberglass", "Lap pool", "Urban lot", "California"],
  },

  "connecticut-estate-gunite": {
    title: "The Connecticut Heritage Estate",
    subtitle: "A 16×36 gunite pool with pebble finish, automatic cover, and frost protection — cold-climate luxury done right.",
    location: "Greenwich, CT",
    type: "Gunite",
    tier: "Luxury",
    image: "/build-connecticut-estate.jpg",
    priceTotal: 152500,
    priceRange: [140000, 170000],
    timelineWeeks: 18,
    specs: {
      dimensions: "16 × 36 ft",
      surface: "576 sq ft",
      depth: "3.5 ft shallow → 7 ft deep",
      shape: "True rectangle (Grecian corners)",
      finish: "PebbleSheen Midnight",
      chemistry: "Saltwater chlorination",
    },
    summary: "A 1910 clapboard colonial called for a pool that wouldn't clash with the architecture. A restrained rectangle in bluestone and pebble, with every cold-climate provision engineered in from day one.",
    story: [
      "The builder specified post-tensioned concrete and a reinforced expansion-joint system specifically for the freeze-thaw cycling. PebbleSheen (not plaster) was a saltwater pairing and a 20-year surface life calculation — plaster in Connecticut is a maintenance-cycle choice most luxury clients skip.",
      "An automatic pool cover with a dedicated hydraulic system was not optional. It lowers heating costs by roughly 40% during shoulder seasons, drops evaporation to near zero, and is required by the family's insurance carrier with two young children on the property.",
      "Frost protection added roughly $7,200 in extra excavation depth, insulated expansion joints, and a dedicated drainage system around the shell. The builder has been doing New England pools for 28 years and treats frost provisions the way a Texas builder treats clay — engineered in, never improvised.",
    ],
    breakdown: [
      { label: "Shell: shotcrete, post-tensioned (576 sq ft)", cost: 42000 },
      { label: "Excavation + frost overdig", cost: 8400 },
      { label: "Engineering (structural + drainage)", cost: 4200 },
      { label: "PebbleSheen Midnight finish", cost: 14200 },
      { label: "Waterline tile (custom glass mosaic)", cost: 5800 },
      { label: "Bluestone coping + 700 sq ft deck", cost: 28500 },
      { label: "Plumbing + equipment pad (heated)", cost: 8400 },
      { label: "Variable-speed pump + DE filter", cost: 4200 },
      { label: "Saltwater chlorinator", cost: 2800 },
      { label: "Heater (natural gas, 400K BTU)", cost: 6400 },
      { label: "Automatic cover (hydraulic, full-size)", cost: 18500 },
      { label: "LED lighting (4 pool, step, landscape)", cost: 3800 },
      { label: "Electrical + subpanel", cost: 4800 },
      { label: "Frost protection (insulation + drainage)", cost: 7200 },
      { label: "Permits (Greenwich)", cost: 2400 },
      { label: "Fence integration (existing stone wall)", cost: 3800 },
      { label: "Winterization system + first-season close", cost: 1600 },
      { label: "Landscape restoration", cost: 5400 },
    ],
    whatAddedCost: [
      { label: "Full-size automatic cover (insurance requirement)", cost: 18500 },
      { label: "Frost protection package", cost: 7200 },
      { label: "Post-tensioned shell (freeze-thaw)", cost: 5800 },
      { label: "Northeast CCI premium (+22%)", cost: 18200 },
      { label: "Natural gas heater vs heat pump", cost: 3200 },
    ],
    whatSavedCost: [
      { label: "True rectangle (simpler form)", saved: 9800 },
      { label: "No attached spa (planned separate)", saved: 14500 },
      { label: "No vanishing edge or water features", saved: 22000 },
    ],
    tags: ["Gunite", "Pebble finish", "Auto cover", "Cold climate"],
  },
};

export const BUILD_SLUGS = Object.keys(BUILDS);

/* ─── SHARED SECTIONS ─── */

function SpecRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.borderLight}` }}>
      <div style={{ fontSize: 13, color: T.textDim, fontWeight: 500, flexShrink: 0 }}>{label}</div>
      <div style={{ fontSize: 13, color: T.text, fontWeight: 600, textAlign: "right" }}>{value}</div>
    </div>
  );
}

function BreakdownRow({ label, cost, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "11px 0", borderBottom: `1px solid ${T.borderLight}`, fontWeight: bold ? 700 : 400 }}>
      <div style={{ fontSize: 14, color: bold ? T.text : T.textMid, lineHeight: 1.5 }}>{label}</div>
      <div style={{ fontSize: 14, color: T.text, fontWeight: bold ? 800 : 600, whiteSpace: "nowrap" }}>{money(cost)}</div>
    </div>
  );
}

function TierPill({ tier }) {
  const colors = tier === "Luxury" ? { bg: T.text, fg: "#fff" }
    : tier === "Mid-range" ? { bg: T.accentLight, fg: T.accentDark }
    : { bg: T.successBg, fg: T.success };
  return (
    <span style={{ padding: "4px 10px", borderRadius: 100, background: colors.bg, color: colors.fg, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{tier}</span>
  );
}

/* ─── DETAIL PAGE ─── */

export default function BuildPage() {
  const { buildSlug } = useParams();
  const b = BUILDS[buildSlug];
  if (!b) return <Navigate to="/builds" replace />;

  const similar = BUILD_SLUGS.filter(s => s !== buildSlug).slice(0, 3);

  const inner = { maxWidth: 920, margin: "0 auto", padding: "0 16px" };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
      <Helmet>
        <title>{`${b.title} — ${money(b.priceTotal)} in ${b.location} | PriceAPool`}</title>
        <meta name="description" content={`${b.summary} Full cost breakdown, specs, and decisions behind this ${b.type.toLowerCase()} pool build.`} />
        <link rel="canonical" href={`https://priceapool.com/builds/${buildSlug}`} />
        <meta property="og:title" content={`${b.title} — ${money(b.priceTotal)} in ${b.location}`} />
        <meta property="og:description" content={b.summary} />
        <meta property="og:image" content={`https://priceapool.com${b.image}`} />
        <meta property="og:url" content={`https://priceapool.com/builds/${buildSlug}`} />
      </Helmet>

      <Nav />

      <div style={inner}>
        {/* HERO */}
        <div style={{ padding: "36px 0 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Sample Pool Build · {b.location}</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 500, color: T.text, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 12, fontFamily: "'Fraunces',Georgia,serif" }}>{b.title}</h1>
          <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.55, marginBottom: 14, maxWidth: 680 }}>{b.subtitle}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <TierPill tier={b.tier} />
            <span style={{ fontSize: 12, color: T.textDim, fontWeight: 600 }}>{b.type}</span>
            <span style={{ fontSize: 12, color: T.textDim }}>· {b.timelineWeeks} weeks to swim</span>
          </div>
        </div>

        {/* IMAGE */}
        <div style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "16 / 9", background: T.bg2, boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 24px 60px -20px rgba(10,10,10,0.22)", marginBottom: 28 }}>
          <img src={b.image} alt={`${b.title} in ${b.location}`} loading="eager" fetchpriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        {/* KEY NUMBERS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 28 }}>
          <div style={{ background: T.text, color: "#fff", borderRadius: 14, padding: "22px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Total Build</div>
            <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>{money(b.priceTotal)}</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>Range {money(b.priceRange[0])}–{money(b.priceRange[1])}</div>
          </div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Size</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.text }}>{b.specs.dimensions}</div>
            <div style={{ fontSize: 12, color: T.textDim, marginTop: 4 }}>{b.specs.surface}</div>
          </div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Finish</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.text, lineHeight: 1.3 }}>{b.specs.finish}</div>
          </div>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Timeline</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.text }}>{b.timelineWeeks} weeks</div>
            <div style={{ fontSize: 12, color: T.textDim, marginTop: 4 }}>contract → swim</div>
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "24px 28px", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>The Brief</div>
          <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.7, marginBottom: 16 }}>{b.summary}</p>
          {b.story.map((p, i) => <p key={i} style={{ fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 12 }}>{p}</p>)}
        </div>

        {/* SPECS */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "24px 28px", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 12 }}>Specifications</div>
          <SpecRow label="Dimensions" value={b.specs.dimensions} />
          <SpecRow label="Surface area" value={b.specs.surface} />
          <SpecRow label="Depth" value={b.specs.depth} />
          <SpecRow label="Shape" value={b.specs.shape} />
          <SpecRow label="Interior finish" value={b.specs.finish} />
          <SpecRow label="Chemistry" value={b.specs.chemistry} />
          <SpecRow label="Pool type" value={b.type} />
          <SpecRow label="Location" value={b.location} />
        </div>

        {/* BREAKDOWN */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "24px 28px", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 4 }}>Line-Item Cost Breakdown</div>
          <div style={{ fontSize: 13, color: T.textDim, marginBottom: 16 }}>Real-world line items at 2026 pricing. Your build will differ — use this as a reference not a quote.</div>
          {b.breakdown.map((row, i) => <BreakdownRow key={i} label={row.label} cost={row.cost} />)}
          <BreakdownRow label="TOTAL" cost={b.priceTotal} bold />
        </div>

        {/* WHAT ADDED / SAVED */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div style={{ background: T.warnBg, border: `1px solid #F5E4BC`, borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.warn, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>What pushed cost up</div>
            {b.whatAddedCost.map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i === b.whatAddedCost.length - 1 ? "none" : `1px solid rgba(146,64,14,0.12)` }}>
                <span style={{ fontSize: 13, color: T.textMid, lineHeight: 1.45, paddingRight: 10 }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.warn, whiteSpace: "nowrap" }}>+{money(row.cost)}</span>
              </div>
            ))}
          </div>
          <div style={{ background: T.successBg, border: `1px solid ${T.successBorder}`, borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.success, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>What kept cost down</div>
            {b.whatSavedCost.map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i === b.whatSavedCost.length - 1 ? "none" : `1px solid rgba(22,101,52,0.12)` }}>
                <span style={{ fontSize: 13, color: T.textMid, lineHeight: 1.45, paddingRight: 10 }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.success, whiteSpace: "nowrap" }}>−{money(row.saved)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: T.accentLight, border: `1px solid ${T.accent}33`, borderRadius: 14, padding: "24px 28px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4 }}>Price a build like this for your zip code</div>
            <div style={{ fontSize: 13, color: T.textMid }}>The calculator adjusts for your state, metro, soil, and scope.</div>
          </div>
          <Link to="/" style={{ padding: "12px 20px", borderRadius: 10, background: T.text, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>Price Your Build →</Link>
        </div>

        {/* SIMILAR */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 28px", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>More sample pool builds</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {similar.map(s => {
              const o = BUILDS[s];
              return (
                <Link key={s} to={`/builds/${s}`} style={{ display: "block", textDecoration: "none", borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, background: T.card }}>
                  <div style={{ aspectRatio: "16 / 9", background: T.bg2, overflow: "hidden" }}>
                    <img src={o.image} alt={o.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>{o.title}</div>
                    <div style={{ fontSize: 12, color: T.textDim, marginBottom: 6 }}>{o.location} · {o.type}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>{money(o.priceTotal)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Link to="/builds" style={{ fontSize: 13, color: T.accent, fontWeight: 600, textDecoration: "none" }}>← All sample builds</Link>
        </div>

        <BrowseByState />
      </div>
    </div>
  );
}

/* ─── INDEX PAGE ─── */

export function BuildsIndex() {
  const inner = { maxWidth: 1040, margin: "0 auto", padding: "0 16px" };
  const builds = BUILD_SLUGS.map(s => ({ slug: s, ...BUILDS[s] }));

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
      <Helmet>
        <title>Sample Pool Builds with Full Cost Breakdowns | PriceAPool</title>
        <meta name="description" content="Six real-world pool build examples across gunite, fiberglass, and vinyl, from budget $54K Midwest builds to $215K desert resort gunite. Every build includes specs, line-item pricing, and what drove the numbers up or down." />
        <link rel="canonical" href="https://priceapool.com/builds" />
      </Helmet>

      <Nav />

      <div style={inner}>
        {/* HERO */}
        <div style={{ padding: "48px 0 24px", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Sample Pool Builds · 2026</div>
          <h1 style={{ fontSize: "clamp(32px,5.5vw,54px)", fontWeight: 500, color: T.text, lineHeight: 1.05, letterSpacing: "-0.03em", fontFamily: "'Fraunces',Georgia,serif", marginBottom: 16 }}>Six real pool builds, <em style={{ fontStyle: "italic" }}>priced line by line</em>.</h1>
          <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.55, maxWidth: 560, margin: "0 auto" }}>From a $54K Michigan vinyl family pool to a $215K Scottsdale vanishing-edge resort build — each example breaks down every dollar and the decision behind it.</p>
        </div>

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 36 }}>
          {builds.map(b => (
            <Link key={b.slug} to={`/builds/${b.slug}`} style={{ display: "block", textDecoration: "none", borderRadius: 18, overflow: "hidden", background: T.card, border: `1px solid ${T.border}`, boxShadow: "0 1px 2px rgba(10,10,10,0.04), 0 12px 32px -14px rgba(10,10,10,0.18)", transition: "transform .2s, box-shadow .2s" }}>
              <div style={{ aspectRatio: "16 / 10", background: T.bg2, overflow: "hidden" }}>
                <img src={b.image} alt={b.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <TierPill tier={b.tier} />
                  <span style={{ fontSize: 12, color: T.textDim, fontWeight: 600 }}>{b.location}</span>
                </div>
                <div style={{ fontSize: 21, fontWeight: 600, color: T.text, lineHeight: 1.22, letterSpacing: "-0.015em", fontFamily: "'Fraunces',Georgia,serif", marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.55, marginBottom: 14 }}>{b.subtitle}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${T.borderLight}` }}>
                  <div>
                    <div style={{ fontSize: 11, color: T.textDim, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Total build</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: T.text, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.01em" }}>{money(b.priceTotal)}</div>
                  </div>
                  <div style={{ fontSize: 12, color: T.accent, fontWeight: 600 }}>View build →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: T.text, color: "#fff", borderRadius: 18, padding: "32px 36px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 500, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.01em", marginBottom: 8 }}>Price a build like one of these for your zip.</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 18 }}>The calculator adjusts every line item for your state, metro, scope, and options.</div>
          <Link to="/" style={{ display: "inline-block", padding: "12px 22px", borderRadius: 10, background: "#fff", color: T.text, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Open the calculator →</Link>
        </div>

        <BrowseByState />
      </div>
    </div>
  );
}
