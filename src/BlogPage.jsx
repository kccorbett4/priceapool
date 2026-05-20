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

/* ─── Shared layout components ─── */
function H2({ children }) {
  return <h2 style={{ fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 800, color: T.text, marginTop: 36, marginBottom: 10, letterSpacing: "-.3px" }}>{children}</h2>;
}
function H3({ children }) {
  return <h3 style={{ fontSize: 17, fontWeight: 700, color: T.text, marginTop: 24, marginBottom: 8 }}>{children}</h3>;
}
function P({ children }) {
  return <p style={{ fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}
function Ul({ items }) {
  return <ul style={{ paddingLeft: 20, marginBottom: 14 }}>{items.map((item, i) => <li key={i} style={{ fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 4 }}>{item}</li>)}</ul>;
}
function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 20 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: T.bg2 }}>
            {headers.map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: T.text, borderBottom: `2px solid ${T.border}` }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? T.card : T.bg }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "10px 14px", color: T.textMid, borderBottom: `1px solid ${T.border}` }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Callout({ icon, title, children, color }) {
  const bg = color === "warn" ? T.warnBg : T.accentLight;
  const border = color === "warn" ? "#fde68a" : T.accent + "33";
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 6 }}>{icon} {title}</div>
      <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
function Figure({ src, alt, caption }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "16 / 9", background: T.bg2, boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 12px 32px -12px rgba(10,10,10,0.18)" }}>
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {caption && <figcaption style={{ fontSize: 12, color: T.textDim, marginTop: 8, fontStyle: "italic", textAlign: "center" }}>{caption}</figcaption>}
    </figure>
  );
}
function ProConGrid({ pros, cons }) {
  const col = (heading, items, accent, bg, border) => (
    <div style={{ flex: 1, minWidth: 240, background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>{heading}</div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>{items.map((it, i) => <li key={i} style={{ fontSize: 14, color: T.textMid, lineHeight: 1.65, marginBottom: 6 }}>{it}</li>)}</ul>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
      {col("Pros", pros, T.success, T.successBg, T.successBorder)}
      {col("Cons", cons, "#991B1B", "#FDF2F2", "#F4CCCC")}
    </div>
  );
}
function RelatedPosts({ current }) {
  const all = [
    { slug: "fiberglass-vs-gunite-vs-vinyl", label: "Fiberglass vs Gunite vs Vinyl" },
    { slug: "inground-pool-cost-guide", label: "Inground Pool Cost Guide 2026" },
    { slug: "how-long-to-build-a-pool", label: "How Long Does It Take to Build a Pool?" },
    { slug: "pool-financing-guide", label: "Pool Financing Guide" },
    { slug: "pool-cost-by-size", label: "Pool Cost by Size" },
    { slug: "pool-permits-and-regulations", label: "Pool Permits & Regulations" },
    { slug: "gunite-pool-guide", label: "Complete Gunite Pool Guide" },
    { slug: "fiberglass-pool-guide", label: "Complete Fiberglass Pool Guide" },
    { slug: "vinyl-liner-pool-guide", label: "Complete Vinyl Liner Pool Guide" },
    { slug: "does-a-pool-add-home-value", label: "Does a Pool Add Home Value?" },
  ].filter(p => p.slug !== current);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginTop: 32 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 12 }}>More Pool Guides</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {all.slice(0, 5).map(({ slug, label }) => (
          <Link key={slug} to={`/blog/${slug}`} style={{ fontSize: 13, color: T.accent, textDecoration: "none", fontWeight: 600 }}>→ {label}</Link>
        ))}
      </div>
    </div>
  );
}

/* ─── ARTICLES ─── */

const ARTICLES = {

  "fiberglass-vs-gunite-vs-vinyl": {
    title: "Fiberglass vs Gunite vs Vinyl Pools: The Definitive 2026 Comparison",
    description: "An exhaustive, research-backed comparison of fiberglass, gunite/shotcrete, and vinyl liner pools — real 2026 pricing, material science, failure modes, saltwater compatibility, warranty reality, and a decision framework that tells you exactly which is right for your site, climate, and budget.",
    content: () => (
      <>
        <P>Picking a pool type is the single highest-leverage decision in a pool project. It locks in <em>everything downstream</em>: how long the build takes, what it costs to own for the next decade, what shapes you can dream up, whether saltwater is a good idea, and how the pool ages in your soil and climate. Most guides online compare these three pool types at a surface level. This one goes deep — drawing on industry association data, manufacturer spec sheets, and the real failure patterns contractors see on warranty calls.</P>

        <P>By the end you'll know not just <em>what</em> each type is, but <em>why</em> each one fails, <em>when</em> it's the wrong choice, and <em>how</em> to pressure-test a builder's bid.</P>

        <Callout icon="📌" title="The 10-second answer">
          <strong>Gunite</strong> is the right choice when shape and size customization matter more than money. <strong>Fiberglass</strong> is the right choice when you want the pool installed fast, chemical costs kept low, and plan to run a saltwater system. <strong>Vinyl</strong> is the right choice when the upfront budget is tight and you're comfortable replacing a liner every 8–10 years. Everything below is the detail behind that one-liner.
        </Callout>

        <H2>The 30,000-Foot Comparison</H2>
        <Table
          headers={["Factor", "Gunite / Shotcrete", "Fiberglass", "Vinyl Liner"]}
          rows={[
            ["Typical 2026 install (16×32)", "$60,000–$125,000", "$50,000–$85,000", "$40,000–$70,000"],
            ["High-end ceiling", "$200,000–$400,000+", "$110,000–$140,000", "$80,000–$100,000"],
            ["Install timeline (contract → swim)", "12–22 weeks", "6–12 weeks", "8–14 weeks"],
            ["Structural shell life", "50–100+ years", "25–50+ years", "Walls 20–35 yrs"],
            ["Interior finish life", "Plaster 7–12 yrs; pebble 15–25", "Gel coat 15–25 yrs", "Liner 6–12 yrs"],
            ["Shape & depth customization", "Unlimited", "Pick from catalog", "Mostly rectangular; custom liner possible"],
            ["Surface porosity / algae risk", "Porous — highest chemical demand", "Non-porous — lowest demand", "Non-porous — low demand"],
            ["Saltwater compatibility", "OK with pebble; accelerated erosion with plaster", "Ideal", "OK with polymer walls; corrodes steel walls"],
            ["Cold-climate performance", "Vulnerable to freeze-thaw cracking", "Excellent — flexible shell", "Good — liner absorbs flex"],
            ["US market share (new builds)", "~55–60%", "~20–23%", "~18–22%"],
            ["Share trend", "Declining slowly", "Growing fastest", "Stable to declining"],
            ["Warranty baseline", "1–10 yrs structural; 1 yr plaster", "Lifetime shell; 7–15 yrs gel coat", "Walls 25+ yrs prorated; liner 20–30 prorated"],
          ]}
        />
        <P style={{ fontSize: 13, color: T.textDim, fontStyle: "italic", marginTop: -8 }}>Figures synthesized from HomeGuide, Angi, Fixr, Pool &amp; Spa News State of the Industry reports, NPC technical bulletins, and published manufacturer spec sheets (Latham, Thursday Pools, River Pools, Leisure Pools). Pricing is directional — verify with at least three local bids before budgeting.</P>

        <H2>Gunite &amp; Shotcrete Pools — the Customizable Standard</H2>
        <Figure src="/pool-gunite.jpg" alt="Custom gunite pool with infinity edge, raised spa, and PebbleTec finish" caption="A gunite pool with integrated spa, tile band, and pebble finish — the configuration gunite does uniquely well." />
        <P>Gunite pools are not pre-built. A crew excavates the hole, shapes the soil with rebar, sprays concrete pneumatically over the rebar cage, cures it for 28 days, then applies tile, coping, and an interior plaster finish. The shell is concrete, rigid, and effectively permanent — you rebuild the <em>surface</em> periodically, not the structure.</P>
        <H3>Gunite vs shotcrete — what's the difference?</H3>
        <P>The names are often used interchangeably, but they're not the same material. <strong>Gunite</strong> is a dry-mix process: dry cement and aggregate travel through a hose, and water is added at the nozzle. <strong>Shotcrete</strong> is wet-mix: the concrete is batched with water at a plant and pumped. Wet-mix shotcrete produces more consistent density, fewer voids, and less rebound waste. The National Plasterers Council (NPC) has published several technical papers since 2022 favoring wet-mix for pool shells. Most top-tier builders have switched. If a bid specifies "gunite" as a quality signal, that's actually the older method — ask what mix they use and why.</P>
        <H3>What you actually get</H3>
        <Ul items={[
          "A 6–12 inch concrete shell over a grid of steel rebar, set on a compacted base.",
          "Any shape the designer draws — kidney, freeform, L, true rectangle, vanishing edge, beach entry, tanning ledge, integrated spa, swim-up bar.",
          "Any depth — 8+ feet for a real diving well is trivially possible, unlike the other two types.",
          "An interior finish applied as the last step: marcite plaster (cheapest, 7–12 year life), quartz aggregate like Diamond Brite (10–15 years), or pebble finish like PebbleTec or PebbleSheen (15–25 years).",
        ]} />
        <H3>Pros &amp; cons — gunite</H3>
        <ProConGrid
          pros={[
            "Unlimited design freedom — any shape, depth, or feature",
            "Structural shell lasts the life of the home (50–100+ years)",
            "Highest perceived resale value in luxury and Sun Belt markets",
            "Integrated spas, grottos, vanishing edges, and beach entries are natural fits",
            "Can be fully remodeled (retiled, replastered, reshaped) without removing the shell",
          ]}
          cons={[
            "Most expensive upfront — typically 20–40% above comparable fiberglass",
            "Longest construction window, with the most weather and trade dependencies",
            "Porous interior finish = highest chemical demand ($800–$1,200/yr)",
            "Plaster etches under saltwater; pebble finish is the safer saltwater pairing",
            "Vulnerable to cracks in expansive (clay) soil and freeze-thaw climates",
            "Interior finish requires resurfacing every 10–20 years ($10,000–$20,000)",
            "Warranty is only as strong as the contractor — no factory backing on the shell itself",
          ]}
        />
        <H3>How gunite actually fails</H3>
        <P>The serious failures are almost always structural cracks from soil movement — expansive clay in Dallas or Austin, or freeze-thaw cycling in the Northeast. A crack that leaks is expensive to diagnose (dye testing, pressure testing) and can require partial excavation to repair. Less serious but more common: plaster etching and mottling from chemistry neglect, rebar corrosion "pop-offs" (rust stains blooming through the finish), and calcium scaling at the tile line from high pH water.</P>
        <Callout icon="✅" title="Gunite is the right choice when">
          You want a specific custom shape; you need a real diving well or integrated spa; you're in a stable-soil warm climate (Florida, Arizona, Gulf Coast, Southern California); you plan to stay in the home 10+ years; and your total budget is $80,000 or more.
        </Callout>
        <Callout icon="⚠️" title="Gunite is the wrong choice when" color="warn">
          You want the pool swim-ready in a summer; you're building in expansive clay or a freeze-thaw state without a builder who's mastered those conditions; you prioritize low maintenance; or you're buying the cheapest pool and "upgrading later" (you can't meaningfully upgrade the shell material later).
        </Callout>

        <H2>Fiberglass Pools — the Fastest-Growing Segment</H2>
        <Figure src="/pool-fiberglass.jpg" alt="Fiberglass pool shell being lowered into excavated hole by crane" caption="The defining moment of a fiberglass install: a one-piece factory-made shell dropped into the hole. Hole-to-swim can be as short as three weeks." />
        <P>A fiberglass pool arrives on a truck as a single pre-formed shell. A crane lowers it into the hole, the installer plumbs it, backfills with gravel, pours a concrete collar, and you're looking at water within days. This is the opposite engineering philosophy from gunite: <em>factory controlled, site-assembled</em> instead of <em>site-built from scratch</em>.</P>
        <H3>What the shell actually is</H3>
        <P>Most fiberglass shells are built up in layers inside a female mold at a factory: a gel coat (the finished interior surface you see), a vinyl ester resin barrier layer, several chopped fiberglass layers, woven fiberglass reinforcement, and sometimes a ceramic or aluminum silicate core in newer "composite" models. Wall thickness ranges from roughly 3/8" to 3/4". The result is a <em>flexible</em> shell — it can deform about 2% without cracking, which is why it tolerates the soil movement and freeze-thaw that punish gunite.</P>
        <H3>The 16-foot wall</H3>
        <P>You'll see "18-foot wide fiberglass pools" in some marketing. Be skeptical. The US DOT highway transport limit without an oversize permit is 16 feet wide, and realistically the shell has to travel from a manufacturing plant (Virginia, Indiana, Texas are the big three) to your home. A handful of manufacturers will ship 16.5-foot shells with permits, but anything beyond that is either a split-mold design (two pieces bonded on site) or exaggeration. If you need 18+ feet of width, fiberglass is not the right category — look at gunite.</P>
        <P>Length tops out around 40–44 feet. Depth is fixed by the mold, typically 5.5–6.5 feet with a gradual slope. There is no such thing as a custom-shaped one-piece fiberglass pool.</P>
        <H3>Pros &amp; cons — fiberglass</H3>
        <ProConGrid
          pros={[
            "Dramatically faster — a well-permitted install can be swimming in 3 weeks",
            "Non-porous gel coat resists algae; chemical costs ~30–40% below gunite",
            "No resurfacing cycle for 15–25 years (then a re-gel refinish is optional)",
            "Flexible shell outperforms gunite in freeze-thaw and expansive soil",
            "Ideal pairing with saltwater chlorination — no surface degradation",
            "Heats faster than concrete; energy bills modestly lower",
            "Factory-backed structural warranties (often lifetime) from the shell maker",
          ]}
          cons={[
            "Limited to the manufacturer's catalog of molds — no true custom shape",
            "Hard cap around 16 feet of width and 40–44 feet of length",
            "Delivery requires crane access and a clear path for a wide-load trailer",
            "Gel coat can fade, chalk, or develop spider cracks at stress points",
            "Shell float risk if drained improperly in high-groundwater conditions",
            "Fewer qualified installers in some regional markets",
            "Not ideal for deep diving wells (>8 ft) — the mold geometry fights you",
          ]}
        />
        <H3>How fiberglass actually fails</H3>
        <P>The most common cosmetic issue is osmotic blistering ("gel coat pox") — tiny raised bumps from moisture migration through the gel coat. It is usually aesthetic and usually warranty-covered. Spider cracks at the radius points of steps and skimmer cutouts are common and generally cosmetic. The rare serious failure is <em>shell float</em>: if a fiberglass pool is drained without relieving hydrostatic pressure, groundwater can push the empty shell upward out of the ground. Any qualified installer installs a hydrostatic relief valve precisely to prevent this — the failure is almost always an installer error, not a product defect.</P>
        <H3>Ceramic-composite shells — worth the premium?</H3>
        <P>Since roughly 2019, several manufacturers (Thursday Pools "Geopremier," Leisure "Aqua Armor," River Pools "T40 Composite") have introduced multi-layer shells that add a ceramic or aluminum silicate core for extra rigidity and osmosis resistance. Marketing claims "lifetime gel coat" and "osmosis-proof." The engineering is real — but independent long-term data does not yet exist for these products. If your builder offers one and the price premium is modest (5–10%), it is a reasonable hedge. Don't pay a 30% premium for a claim that can't yet be independently verified.</P>
        <Callout icon="✅" title="Fiberglass is the right choice when">
          You want the pool built fast; you hate pool maintenance and want the lowest possible chemical bill; you're running (or planning) a saltwater system; you're in a clay or freeze-thaw soil region; you're happy with a standard 14×28, 16×32, or 16×40 footprint; and you have clear truck and crane access to the back yard.
        </Callout>
        <Callout icon="⚠️" title="Fiberglass is the wrong choice when" color="warn">
          You want a specific custom shape; you need more than 16 feet of width or a real diving well; the backyard is landlocked by fencing, power lines, or tight lot lines; or you want a vanishing edge, grotto, or complex water-feature integration.
        </Callout>

        <H2>Vinyl Liner Pools — the Budget Entry Point</H2>
        <Figure src="/pool-vinyl.jpg" alt="Classic vinyl liner inground pool in a Midwest suburban backyard" caption="Vinyl liner pools are the dominant choice in the Midwest, where regional manufacturers and installers concentrate the trade." />
        <P>A vinyl liner pool is a hybrid. The walls are rigid pre-fabricated steel or polymer panels that bolt together on a concrete footer. The floor is vermiculite or grout-mix over the excavated soil. Over that armature, a single custom-printed vinyl sheet — the liner — is stretched and sealed against the coping. The liner holds the water; the walls and floor just give it shape.</P>
        <H3>What to know about the wall panels</H3>
        <P>Steel wall panels are the legacy standard; they cost less but corrode in acidic soil and are incompatible with most saltwater systems. Polymer walls (more common in newer builds) are corrosion-proof and saltwater-safe. If a vinyl quote doesn't specify the wall material, ask — the difference in long-term durability is large.</P>
        <H3>What to know about the liner</H3>
        <P>Modern liners are printed on 20–30 mil vinyl; 28-mil or higher is worth paying for. Average real-world life is 8–10 years, though the marketing "20 or 25 year warranty" is almost always heavily prorated — by year five, the payout against a replacement is typically 20–30% of cost. Plan financially as if you're replacing the liner every 9 years at $4,500–$7,500 installed. Sharp dog claws, pointy toys, and bad winterization are the top three liner-killers.</P>
        <H3>Pros &amp; cons — vinyl</H3>
        <ProConGrid
          pros={[
            "Lowest upfront cost of the three — the entry point to inground ownership",
            "Install timelines roughly match fiberglass (3–6 weeks once permitted)",
            "Smooth, soft-feeling surface — kind to feet, knees, and swimsuits",
            "Liner can be swapped for a new pattern — effectively a visual refresh every decade",
            "Some custom shape flexibility (L-shapes, rounded ends) that fiberglass lacks",
            "Forgiving in freeze-thaw climates — walls flex slightly, liner absorbs the rest",
          ]}
          cons={[
            "Liner replacement every 8–10 years at $4,500–$7,500 is a non-optional line item",
            "Saltwater is problematic with steel walls; insist on polymer walls if salt is on your list",
            "Lowest resale bump; can read as deferred maintenance in high-end markets",
            "Cannot integrate an attached spa, vanishing edge, or complex water features",
            "Sharp objects (dog claws, toys, pool chairs) puncture liners — repairable but visible",
            "Liner wrinkles and floats can occur if groundwater is high during refills",
            "Steel walls, if present, are vulnerable to acidic soil and salt corrosion",
          ]}
        />
        <H3>How vinyl actually fails</H3>
        <P>The most common failure is simply liner aging — UV fade, chlorine fatigue, and tiny shrinkage that eventually manifests as wrinkles or leaks. A patched liner is fine temporarily, but patches are visible and accumulate. More structural failures include wall-panel corrosion (especially steel walls in acidic or salty conditions), washout behind the liner creating bulges in the floor or walls, and liner floats where high groundwater lifts the liner off the substrate during a refill. Polymer walls eliminate the corrosion failure mode; careful winterization and ground-drainage management handle most of the rest.</P>
        <Callout icon="✅" title="Vinyl is the right choice when">
          Your total pool budget is capped under $70,000; you're in the Midwest or Northeast and working with established regional vinyl builders; you specifically want a simple rectangular or L-shape pool; you're comfortable replacing the liner as a scheduled expense; and you either don't want saltwater or are willing to pay for polymer walls.
        </Callout>
        <Callout icon="⚠️" title="Vinyl is the wrong choice when" color="warn">
          You have large dogs that will swim with you (claws); you want a saltwater system and are being quoted steel walls; you're in a luxury market where pool quality affects resale; or you want a custom shape, vanishing edge, or integrated spa.
        </Callout>

        <H2>Saltwater Compatibility — the Often-Missed Differentiator</H2>
        <P>Roughly three-quarters of new US pools are now saltwater (Pool &amp; Spa News 2024 State of the Industry). The salt chlorinator converts dissolved salt into chlorine on demand — smoother water, less bagged chlorine, lower ongoing chemical cost. But salt is still salt, and it interacts very differently with each pool type.</P>
        <Table
          headers={["Pool type", "Saltwater compatibility", "What actually happens"]}
          rows={[
            ["Fiberglass", "Ideal — this is the benchmark", "Gel coat is inert to salt; no degradation mechanism."],
            ["Gunite — pebble finish", "Good", "Pebble aggregate resists salt erosion; widely recommended by modern builders."],
            ["Gunite — plaster finish", "Use with caution", "NPC has documented accelerated plaster erosion under salt; expect shorter resurface cycles."],
            ["Vinyl — polymer walls", "Good", "Polymer is inert; liner seams and hardware should be salt-rated."],
            ["Vinyl — steel walls", "Avoid", "Salt accelerates galvanized steel corrosion from behind the liner."],
          ]}
        />
        <P>If saltwater is non-negotiable for you, fiberglass is the simplest pairing; gunite-with-pebble is the premium pairing; and vinyl-with-polymer-walls is the budget pairing. Gunite-with-plaster and vinyl-with-steel are the two combinations to avoid.</P>

        <H2>Climate and Soil — Where the Pool Type Actually Breaks or Holds</H2>
        <P>This is where most cost-first comparisons fall down. The right pool type depends as much on <em>where you are</em> as on what you can spend.</P>
        <Ul items={[
          "Stable soil, warm climate (Florida, Arizona, coastal Southern California, Gulf Coast): every pool type works. Choose on cost and shape preference. Gunite dominates the luxury segment.",
          "Expansive clay (Dallas–Fort Worth, Austin, Denver Front Range, parts of the Central Valley): fiberglass handles soil movement best because of the flexible shell. Gunite here requires an experienced builder who understands post-tensioned shells and proper backfill.",
          "Freeze-thaw climates (Midwest, Northeast, Mid-Atlantic, higher-elevation West): fiberglass is the technically safest choice — the flexible shell tolerates the cyclic flex. Vinyl is historically dominant because the liner absorbs minor wall movement. Gunite is viable with proper winterization and expansion allowances, but risk is higher.",
          "High water table (coastal areas, parts of Florida and the Gulf, low-lying Midwest): hydrostatic pressure is the risk. Every pool type requires relief systems; fiberglass is most sensitive to improper draining, and vinyl liners can float. Gunite handles groundwater best once cured.",
          "Acidic or high-salinity soil: avoid steel-wall vinyl. Fiberglass and gunite with properly protected rebar are both fine.",
        ]} />

        <H2>The Honest 10-Year Cost of Ownership</H2>
        <P>Upfront cost is the headline number; ownership cost is the real one. The table below is a realistic 10-year projection for a 16×32 pool in a mid-cost state, using current industry averages.</P>
        <Table
          headers={["Cost category", "Gunite (plaster)", "Gunite (pebble)", "Fiberglass", "Vinyl (polymer)"]}
          rows={[
            ["Initial install", "$85,000", "$100,000", "$62,000", "$50,000"],
            ["Chemicals (10 yr)", "$10,000", "$10,000", "$5,000", "$6,500"],
            ["Electricity (10 yr, variable-speed pump)", "$4,000", "$4,000", "$3,500", "$3,500"],
            ["Resurface / liner", "$15,000 (yr 8–10)", "$0–$5,000", "$0", "$12,000 (two liners)"],
            ["Routine repairs", "$5,000", "$4,000", "$3,000", "$4,500"],
            ["Acid wash / tune-ups", "$1,500", "$1,200", "$500", "$1,000"],
            ["Total 10-year cost", "≈ $120,500", "≈ $119,200", "≈ $74,000", "≈ $77,500"],
          ]}
        />
        <P>Two findings jump out. First: fiberglass and vinyl end up very close at the 10-year mark, despite a $12,000 gap in upfront cost — vinyl's liner replacement closes most of that gap. Second: a pebble-finish gunite pool and a plaster-finish gunite pool end up within a few thousand dollars over ten years, because the pebble saves you a resurfacing cycle. If you're going gunite, pay for pebble the first time.</P>

        <H2>Warranty Reality Check</H2>
        <P>Every pool segment advertises long warranties. Read them carefully.</P>
        <Ul items={[
          "Gunite: The structural warranty is from the builder, not a factory. It's only as strong as the builder's business. One- to ten-year coverage is typical; if the builder is small, single-proprietor, or new, treat the warranty as ornamental.",
          "Fiberglass: Shell structural warranties are factory-backed and usually 'lifetime.' Gel coat surface warranties range from 3 years (some imports) to 15 years (Latham, Thursday Pools). Beware prorated schedules — a '15-year gel coat warranty' often pays 100% in year 1 and under 25% by year 6.",
          "Vinyl: Wall panels carry multi-decade warranties, often 'lifetime.' Liner warranties of 20–30 years are heavily prorated; real-world replacement is out-of-pocket after year 5–7 in most cases. Budget as though there is no liner warranty past year 5.",
        ]} />

        <H2>Market Share and Where the Industry Is Going</H2>
        <P>US new-build market share as reported by Pool &amp; Spa News (annual State of the Industry) has been directionally clear for a decade: gunite is slowly losing share, fiberglass is gaining fastest, and vinyl is holding steady in its regional strongholds.</P>
        <Ul items={[
          "Gunite: ~55–60% of new inground builds, down from ~75% a decade ago. Sun Belt holds steady; Midwest and Northeast are where gunite is losing most.",
          "Fiberglass: ~20–23%, up from ~15% in 2018. Growth is driven by saltwater adoption, skilled-labor shortages in concrete trades, and faster build times.",
          "Vinyl: ~18–22%, concentrated in the Midwest (Michigan, Ohio, Indiana) where most regional manufacturers operate. Slow decline.",
        ]} />
        <P>Two industry dynamics are worth understanding. First, <strong>skilled-labor shortages</strong> in shotcrete and plaster trades have pushed gunite prices up roughly 25–35% since 2020, versus about 15% for factory-built fiberglass. Second, <strong>saltwater is now dominant</strong> — which structurally favors fiberglass and pressures the older plaster-and-steel-wall configurations.</P>

        <H2>Myths, Debunked</H2>
        <Ul items={[
          "\"Gunite lasts forever with no maintenance.\" False. The shell is effectively permanent, but the interior finish is a maintenance-intensive surface that needs resurfacing every 10–20 years and acid washing every 3–5 years.",
          "\"Fiberglass pools float out of the ground.\" Overstated. Shell float is a drain-event failure and happens when a hydrostatic relief valve isn't installed or isn't opened. Modern installs by qualified builders are not at risk.",
          "\"Vinyl is the cheapest over the long term.\" Usually false once you include two liner replacements at $5,000–$7,500 each. Over 10 years, vinyl and fiberglass are within a few thousand dollars; over 20, fiberglass is clearly cheaper.",
          "\"Fiberglass pools all look the same.\" Partially true — there are a couple hundred molds industry-wide, so you'll see repeat designs. But the gel coat colors, waterline tile, and coping do a lot of the visual differentiation.",
          "\"You can't put a fiberglass pool in a cold climate.\" False. Fiberglass outperforms gunite in freeze-thaw because the shell flexes. This is the exact opposite of the folk wisdom.",
          "\"Shotcrete is just a marketing rebrand of gunite.\" False. Wet-mix shotcrete has measurably fewer voids and better density per NPC technical bulletins. Ask your builder which process they use.",
        ]} />

        <H2>The Decision Framework</H2>
        <P>If you answer the questions below honestly, the right pool type almost always becomes obvious.</P>
        <Ul items={[
          "Is your total pool budget under $70,000? → Vinyl, or a basic fiberglass if your region has good installers.",
          "Do you need a specific custom shape, a real diving well, or a vanishing edge? → Gunite. No substitutes.",
          "Do you want the pool swim-ready in under two months? → Fiberglass.",
          "Are you in expansive clay (DFW, Austin, Denver) or a freeze-thaw climate? → Fiberglass first, vinyl second. Gunite only with a builder who has a local portfolio in those conditions.",
          "Do you plan to run saltwater? → Fiberglass is the safest pairing. Gunite-with-pebble and vinyl-with-polymer-walls are both acceptable. Avoid plaster gunite and steel-wall vinyl.",
          "Do you have backyard access for a wide-load trailer and crane? → If no, fiberglass is off the table. Gunite or vinyl.",
          "Will you live in this home 15+ years and want to remodel the pool later? → Gunite. Liners and fiberglass shells don't meaningfully remodel.",
          "Do you have large dogs that will be in the pool? → Avoid vinyl unless you're committed to patching.",
        ]} />

        <H2>Questions to Ask Every Builder Before You Sign</H2>
        <Ul items={[
          "For gunite: Do you use wet-mix shotcrete or dry-mix gunite, and why? What is the structural warranty period, and who backs it if you're out of business?",
          "For gunite: Is the rebar schedule and steel diameter per ACI specs? Do you post-tension in expansive-soil areas?",
          "For fiberglass: Which manufacturer and model? What is the gel coat warranty, and is it prorated? Who installs the hydrostatic relief valve, and how is it maintained?",
          "For fiberglass: Do you have site photos showing crane and truck access on homes like mine?",
          "For vinyl: Are these polymer or steel wall panels? What mil thickness is the liner? What is the real-world expected liner life for your install base, not the warranty?",
          "For any type: Are permits, final electrical inspection, and fence installation included in this quote, or billed separately?",
          "For any type: Can you show me 5+ completed projects within a 20-minute drive that are at least 5 years old?",
        ]} />

        <Callout icon="🎯" title="The bottom line">
          There is no universally best pool. There is a best pool for <em>your</em> site, soil, climate, budget, and use case. If you map those five onto the framework above, the choice becomes straightforward — and you'll walk into bids as an informed buyer rather than a shopper.
        </Callout>
      </>
    )
  },

  "inground-pool-cost-guide": {
    title: "Inground Pool Cost Guide 2026: Everything You Need to Budget",
    description: "How much does an inground pool cost in 2026? Complete breakdown of gunite, fiberglass, and vinyl costs including excavation, permits, decking, features, and ongoing maintenance.",
    content: () => (
      <>
        <P>The average inground pool in 2026 costs between $35,000 and $100,000 before add-ons. But the actual number for your project could be anywhere from $25,000 (a basic vinyl pool in a low-cost state) to $200,000+ (a large gunite pool with a spa, waterfall, and custom decking in California). This guide breaks down every cost category so you know exactly what you're paying for.</P>

        <H2>Average Pool Costs by Type</H2>
        <Table
          headers={["Pool Type", "Low End", "Mid Range", "High End"]}
          rows={[
            ["Gunite / Shotcrete", "$48,000", "$82,000", "$150,000+"],
            ["Fiberglass", "$35,000", "$60,000", "$95,000"],
            ["Vinyl Liner", "$25,000", "$45,000", "$70,000"],
          ]}
        />
        <P>These prices include excavation, the pool shell or structure, basic plumbing, filtration, and a simple coping. They do not include decking, landscaping, fencing, lighting, or add-on features.</P>

        <H2>What's Included in a Base Pool Quote?</H2>
        <Ul items={[
          "Excavation and dirt removal",
          "Structural shell (gunite spray, fiberglass install, or vinyl frame and liner)",
          "Plumbing — main drain, returns, skimmer lines",
          "Equipment — pump, filter, and basic chlorination",
          "Electrical — pool light, pump wiring, GFCI",
          "Basic coping (edge finish)",
          "Standard plaster finish (gunite) or gel coat (fiberglass)",
          "Startup chemicals",
        ]} />

        <H2>Major Add-On Costs</H2>
        <Table
          headers={["Add-On", "Typical Cost"]}
          rows={[
            ["Concrete decking (400–600 sq ft)", "$5,000–$10,000"],
            ["Stamped or travertine pavers", "$10,000–$22,000"],
            ["Attached spa", "$12,000–$44,000"],
            ["Gas heater", "$3,500–$6,000 installed"],
            ["Heat pump", "$5,000–$9,000 installed"],
            ["Salt chlorine generator", "$1,500–$3,500"],
            ["Automation system", "$3,000–$7,000"],
            ["LED lighting package", "$2,000–$5,000"],
            ["Rock waterfall", "$6,000–$15,000"],
            ["Tanning ledge (gunite)", "$3,000–$7,000"],
            ["Automatic safety cover", "$8,000–$18,000"],
            ["Pool fence (code required)", "$2,000–$5,000"],
            ["Safety fence (removable)", "$1,500–$3,500"],
          ]}
        />

        <H2>Soil & Site Conditions: The Hidden Cost</H2>
        <P>Soil conditions are the single biggest source of budget overruns on pool projects. Here's what to expect by soil type:</P>
        <Table
          headers={["Soil Type", "Extra Cost vs. Standard"]}
          rows={[
            ["Loam / sandy loam (ideal)", "$0"],
            ["Sandy / loose soil", "$3,000–$8,000 (stabilization, dewatering)"],
            ["Heavy clay or expansive soil", "$8,000–$14,000 (engineering, flex joints)"],
            ["Rocky / hardpan", "$10,000–$30,000 (rock removal or blasting)"],
            ["High water table", "$12,000–$22,000 (dewatering, hydrostatic valves)"],
            ["Fill dirt / disturbed soil", "$15,000–$35,000 (piers or helical piles)"],
          ]}
        />
        <Callout icon="⚠️" title="Pro Tip" color="warn">
          Spend $2,000–$3,000 on a geotechnical ("geotech") report before signing a contract. It can save you $5,000–$20,000 in contractor risk padding — builders price high when they're uncertain about what's underground.
        </Callout>

        <H2>Permit Costs by Region</H2>
        <Table
          headers={["Region", "Typical Permit Cost"]}
          rows={[
            ["Southeast (AL, MS, AR, LA)", "$800–$1,500"],
            ["South Central (TX, OK, TN)", "$900–$1,500"],
            ["Midwest (OH, IN, IL, MN)", "$1,200–$2,000"],
            ["Mountain West (CO, UT, NV)", "$1,500–$2,200"],
            ["Pacific (CA, OR, WA)", "$1,800–$3,500"],
            ["Northeast (NY, NJ, MA, CT)", "$2,000–$3,500"],
            ["Hawaii", "$2,500–$4,000"],
          ]}
        />

        <H2>Annual Maintenance Costs</H2>
        <Ul items={[
          "Chemicals: $600–$1,200/year (less with salt system)",
          "Electricity (pump & equipment): $600–$1,800/year",
          "Professional cleaning service: $1,500–$3,500/year (optional)",
          "Winterization + opening (frost states): $300–$600/year",
          "Repairs & parts: $200–$800/year average",
          "Insurance premium increase: $200–$500/year",
        ]} />

        <H2>How to Save Money on Your Pool Build</H2>
        <Ul items={[
          "Get 3–5 bids — prices vary 20–40% between contractors for the same scope",
          "Build in fall or winter (Oct–Feb) — contractors discount 5–15% for off-season work",
          "Choose a standard fiberglass shape rather than custom gunite",
          "Skip the spa — spas add $15,000–$44,000; a standalone portable spa is $5,000–$12,000",
          "Do your own landscaping after pool completion",
          "Ask contractors what's negotiable — equipment brands, finish grades, etc.",
          "Avoid change orders — every design change after work starts is expensive",
        ]} />
      </>
    )
  },

  "how-long-to-build-a-pool": {
    title: "How Long Does It Take to Build a Pool? (2026 Timeline Guide)",
    description: "Complete timeline for building a gunite, fiberglass, or vinyl pool in 2026 — from permit to first swim. Includes what causes delays and how to avoid them.",
    content: () => (
      <>
        <P>One of the most common questions from first-time pool buyers: "How long will this actually take?" The honest answer is anywhere from 3 weeks to 6+ months, depending on pool type, permit processing times, weather, contractor workload, and site conditions. Here's a complete breakdown by pool type.</P>

        <H2>Timeline by Pool Type</H2>
        <Table
          headers={["Phase", "Gunite", "Fiberglass", "Vinyl Liner"]}
          rows={[
            ["Design & planning", "2–4 weeks", "1–2 weeks", "1–2 weeks"],
            ["Permit processing", "2–8 weeks", "2–8 weeks", "2–8 weeks"],
            ["Excavation", "2–5 days", "1–2 days", "2–4 days"],
            ["Shell / frame construction", "3–5 weeks", "1–2 days (install)", "1–2 weeks"],
            ["Plumbing & electrical", "1–2 weeks", "1–2 weeks", "1–2 weeks"],
            ["Decking & coping", "1–3 weeks", "1–3 weeks", "1–3 weeks"],
            ["Finish & startup", "2–3 weeks", "3–5 days", "3–5 days"],
            ["Total (permit to swim)", "12–22 weeks", "6–14 weeks", "8–16 weeks"],
          ]}
        />

        <H2>The Gunite Pool Timeline in Detail</H2>
        <H3>Week 1–4: Design, Bidding & Permitting</H3>
        <P>After you sign a contract, the contractor submits permit applications to your local building department. Permit processing is the most variable phase — some counties turn around permits in 2 weeks, others take 8–12 weeks. In high-demand markets like Florida, Texas, and California, processing times surged post-2020 and have remained slow in many counties.</P>
        <H3>Week 4–6: Excavation</H3>
        <P>Excavation typically takes 2–5 days depending on soil conditions. Rocky soil or high water table can extend this significantly (and add cost). Soil is hauled off-site or redistributed in your yard.</P>
        <H3>Week 6–9: Steel & Shell</H3>
        <P>Rebar is bent and tied into the pool shape. A structural inspection is required before spraying gunite. Then the concrete mixture is pneumatically sprayed and hand-sculpted. This takes 1–3 days of work but the shell needs to cure for 28 days before water is added.</P>
        <H3>Week 10–14: Plumbing, Electrical & Coping</H3>
        <P>Pool plumbing, light niches, and electrical are roughed in and inspected. Coping (the edge of the pool) is installed, and tile work is completed. More inspections occur at this stage.</P>
        <H3>Week 14–18: Decking</H3>
        <P>Concrete, pavers, or other deck material is poured or installed. Landscaping may begin. Equipment (pump, filter, heater) is set on a pad and connected.</P>
        <H3>Week 18–22: Plaster & Fill</H3>
        <P>The interior plaster or pebble finish is applied, then the pool is filled with water. A startup chemical process takes 2–3 weeks to properly balance the water and cure the plaster. Do not swim for the first 28 days after plaster application.</P>

        <H2>Fiberglass Pool Timeline</H2>
        <P>Fiberglass is the fastest option. Once the permit is approved, installation can move quickly because the shell arrives pre-built. Excavation takes 1–2 days, the crane lifts the shell in within hours, and backfill and plumbing follow. A fiberglass pool can go from permit approval to swimming in as little as 3–4 weeks in ideal conditions.</P>
        <Callout icon="⚠️" title="Access Warning" color="warn">
          Fiberglass shells are typically 14–16 feet wide and 40–45 feet long — plus trailer length. Confirm your yard has adequate crane access and that delivery routes don't have low bridges or narrow turns. Access issues are a common fiberglass delay.
        </Callout>

        <H2>What Causes Pool Construction Delays?</H2>
        <Ul items={[
          "Permit processing backlogs — especially in FL, TX, CA, AZ (4–12 week waits common)",
          "Contractor scheduling — good contractors book out 3–6 months during spring/summer",
          "Rain and weather — excavation and gunite work stop in wet conditions",
          "Failed inspections — one failed inspection can add 1–2 weeks",
          "Change orders — design changes after work starts reset timelines",
          "Material delays — equipment shortages have affected pool gear since 2021",
          "Soil surprises — unexpected rock or groundwater extends excavation",
        ]} />

        <H2>Best Time of Year to Start a Pool Project</H2>
        <P>The best time to sign a contract is September through November. Contractors are less busy, may offer 5–15% discounts, and permit processing is faster in winter. Your pool will be ready by spring/early summer — just in time for swimming season.</P>
        <P>Signing in March or April puts you in competition with every other homeowner who thought "I'll get a pool this summer." Expect 6+ month waits and full-price quotes during peak season.</P>
      </>
    )
  },

  "pool-financing-guide": {
    title: "How to Finance a Pool in 2026: Loans, HELOCs, and the Best Options",
    description: "The complete guide to pool financing in 2026 — HELOC, home equity loans, pool-specific loans, personal loans, and cash. Compare rates, pros and cons, and find the best option for your situation.",
    content: () => (
      <>
        <P>Most pool buyers don't pay cash. The average pool costs $45,000–$85,000, which is a significant out-of-pocket expense for most households. The good news: there are several smart ways to finance a pool in 2026, and the right option depends on your equity, credit score, and how long you plan to stay in your home.</P>

        <H2>Pool Financing Options Compared</H2>
        <Table
          headers={["Option", "Typical Rate (2026)", "Best For"]}
          rows={[
            ["HELOC", "7.5%–9.5% variable", "Homeowners with 20%+ equity who want flexibility"],
            ["Home equity loan", "7.0%–9.0% fixed", "Homeowners who want a fixed payment"],
            ["Cash-out refinance", "6.5%–8.5% fixed", "Refinancing anyway at a lower rate"],
            ["Pool-specific loan", "8.5%–14%", "Buyers who lack home equity"],
            ["Personal loan (unsecured)", "10%–24%", "Last resort — fast approval, high rates"],
            ["Contractor financing", "9%–20%", "Convenience — check the fine print"],
            ["Cash / savings", "0% (opportunity cost)", "Best long-term, rare"],
          ]}
        />

        <H2>HELOC (Home Equity Line of Credit)</H2>
        <P>A HELOC is the most popular pool financing tool for homeowners who have built up equity. You borrow against your home's equity (typically up to 85% of home value minus what you owe), and you only pay interest on what you draw. This is ideal for pool projects because costs trickle in over months — you don't pay interest until you actually spend the money.</P>
        <H3>How much can you borrow?</H3>
        <P>Example: Home value $500,000 × 85% = $425,000. Subtract your mortgage balance of $300,000 = $125,000 available. Most lenders cap HELOC draws at $250,000–$500,000.</P>
        <Callout icon="⚠️" title="Rate Risk" color="warn">
          HELOCs are variable-rate products. In 2022–2024, rates spiked from 4% to over 9%. If you borrow $70,000 at 9% vs 5%, that's an extra $2,800/year in interest. Consider locking into a fixed home equity loan if rates are high.
        </Callout>

        <H2>Home Equity Loan</H2>
        <P>Unlike a HELOC, a home equity loan gives you a lump sum at a fixed rate and fixed monthly payment. This is better for buyers who want payment predictability and plan to borrow the full pool cost upfront. Closing costs are typically $2,000–$5,000.</P>

        <H2>Pool-Specific Loans (Unsecured)</H2>
        <P>Several lenders (Lyon Financial, HFS Financial, Hearth) specialize in pool loans. These are unsecured personal loans with terms of 5–20 years. You don't need home equity, but rates are higher (8.5%–14%+) and approval depends heavily on credit score. These are a good option for recent homeowners who haven't built much equity.</P>

        <H2>What Monthly Payment Should You Expect?</H2>
        <Table
          headers={["Loan Amount", "Rate", "Term", "Monthly Payment"]}
          rows={[
            ["$50,000", "8.0%", "10 years", "~$607"],
            ["$50,000", "9.5%", "10 years", "~$649"],
            ["$75,000", "8.0%", "15 years", "~$717"],
            ["$75,000", "9.5%", "15 years", "~$783"],
            ["$100,000", "8.0%", "20 years", "~$836"],
            ["$100,000", "9.5%", "20 years", "~$931"],
          ]}
        />

        <H2>Is Pool Loan Interest Tax Deductible?</H2>
        <P>HELOC and home equity loan interest may be deductible if the funds are used to "buy, build, or substantially improve" your home. A pool generally qualifies. Personal/unsecured pool loans do not offer a deduction. Consult a tax advisor — the rules changed with the 2017 Tax Cuts and Jobs Act.</P>

        <H2>Tips for Getting the Best Pool Financing</H2>
        <Ul items={[
          "Shop at least 3 lenders — rates vary 1–3% for the same borrower profile",
          "Check your credit score before applying — 740+ gets you the best rates",
          "Ask your contractor if they have preferred lender relationships (sometimes discounted rates)",
          "Don't rush — a 1% rate difference on $70K over 15 years = $6,300 more in interest",
          "Avoid financing through a contractor's in-house program without comparing rates first",
          "Consider a shorter term if you can afford the payment — it saves significantly on total interest",
        ]} />
      </>
    )
  },

  "pool-cost-by-size": {
    title: "Pool Cost by Size: Small, Medium & Large Inground Pools (2026)",
    description: "How pool size affects cost — complete breakdown of small, medium, and large inground pool prices for gunite, fiberglass, and vinyl in 2026. Includes cost per square foot and dimensions.",
    content: () => (
      <>
        <P>Pool size is the second-biggest cost driver after pool type. A small 12×24 pool can cost as little as $28,000 in a low-cost state, while a large 20×40 gunite pool with all the features can exceed $150,000. Here's a complete breakdown of what to expect at each size.</P>

        <H2>Pool Cost by Size & Type (2026)</H2>
        <Table
          headers={["Size", "Dimensions", "Sq Ft", "Gunite", "Fiberglass", "Vinyl"]}
          rows={[
            ["Small", "12×24", "288", "$35,000–$55,000", "$32,000–$48,000", "$25,000–$38,000"],
            ["Small-Med", "14×28", "392", "$42,000–$65,000", "$36,000–$55,000", "$28,000–$44,000"],
            ["Medium", "16×32", "512", "$55,000–$80,000", "$42,000–$65,000", "$33,000–$52,000"],
            ["Med-Large", "18×36", "648", "$65,000–$95,000", "$50,000–$75,000", "$40,000–$62,000"],
            ["Large", "20×40", "800", "$80,000–$120,000", "N/A (size limit)", "$50,000–$75,000"],
            ["XL / Custom", "20×50+", "1,000+", "$100,000–$200,000+", "N/A", "$60,000–$90,000"],
          ]}
        />

        <H2>What Size Pool Should You Get?</H2>
        <H3>Small Pools (Under 400 sq ft)</H3>
        <P>Small pools are perfect for yards under 0.2 acres, urban lots, or families primarily using the pool for cooling off and light recreation. A 12×24 pool holds about 10,000–12,000 gallons and costs significantly less to heat, maintain, and chemically treat than a large pool.</P>
        <P>Downsides: Limited space for laps, pool games, or large gatherings. If you have children who will grow into the pool, consider going slightly larger than you think you need.</P>

        <H3>Medium Pools (400–600 sq ft)</H3>
        <P>The 16×32 is by far the most popular pool size in America. It fits most suburban backyards, accommodates a family of 4–6 comfortably, and is the sweet spot for cost vs. usability. Most fiberglass pool manufacturers' best-selling models are in this range.</P>

        <H3>Large Pools (600+ sq ft)</H3>
        <P>Large pools are for serious swimmers, entertaining, or homeowners with ample lot space. A 20×40 pool can accommodate lap swimming, pool volleyball, and large parties simultaneously. Note that fiberglass shells max out around 16 feet wide — a 20×40 pool must be gunite or vinyl.</P>

        <H2>Cost Per Square Foot by Pool Type</H2>
        <Table
          headers={["Pool Type", "Cost per Sq Ft (national avg)"]}
          rows={[
            ["Gunite / Shotcrete", "$82–$120/sq ft"],
            ["Fiberglass", "$60–$85/sq ft"],
            ["Vinyl Liner", "$35–$55/sq ft"],
          ]}
        />
        <P>These per-square-foot rates apply to the pool shell itself. Remember that decking, equipment, and features are largely fixed costs that don't scale with pool size — a $10,000 spa costs the same whether your pool is 300 sq ft or 800 sq ft.</P>

        <H2>How Pool Size Affects Operating Costs</H2>
        <Table
          headers={["Cost Factor", "Small (288 sq ft)", "Medium (512 sq ft)", "Large (800 sq ft)"]}
          rows={[
            ["Chemicals/year", "$400–$700", "$600–$1,200", "$900–$1,800"],
            ["Electric (pump)/year", "$400–$700", "$600–$1,200", "$800–$1,600"],
            ["Heating cost/month", "$60–$120", "$100–$200", "$150–$350"],
            ["Resurfacing (gunite)", "$6,000–$10,000", "$10,000–$16,000", "$14,000–$22,000"],
          ]}
        />

        <H2>Pool Depth and Cost</H2>
        <P>Depth affects cost more than most buyers realize. Every foot of extra depth means more excavation, more concrete, more steel, more plumbing length, and more water to heat. A 6-foot deep end is standard. Going to 8 feet (for a diving board) adds $3,000–$8,000. A true 10-foot deep diving well adds $10,000–$20,000 and requires a longer pool (minimum 20 feet for safety).</P>
        <Callout icon="💡" title="Size Strategy">
          If you're torn between two sizes, go one size up — the incremental cost per square foot decreases as pools get larger, so the jump from medium to large is proportionally smaller than from small to medium. You'll almost never regret having more pool space.
        </Callout>
      </>
    )
  },

  "pool-permits-and-regulations": {
    title: "Pool Permits & Regulations: What Every Buyer Needs to Know (2026)",
    description: "Complete guide to pool permits in 2026 — what approvals you need, how long permits take, what inspections are required, fencing laws, and setback rules by state.",
    content: () => (
      <>
        <P>Building a pool without a permit is one of the most expensive mistakes a homeowner can make — it can result in forced removal, heavy fines, and serious complications when selling your home. Here's everything you need to know about the permitting process before you break ground.</P>

        <H2>Why Permits Matter</H2>
        <Ul items={[
          "Unpermitted pools must be disclosed when selling — and buyers can demand removal or a price reduction",
          "Insurance may not cover incidents at an unpermitted pool",
          "Mortgage lenders can require proof of permits during refinancing",
          "Fines range from $500 to $10,000+ per day in many jurisdictions",
          "Permits ensure inspections happen — protecting you from contractor shortcuts",
        ]} />

        <H2>What Permits Are Typically Required?</H2>
        <Ul items={[
          "Building permit (the main pool structure permit)",
          "Electrical permit (pool wiring, lights, equipment)",
          "Plumbing permit (if separate from building in your jurisdiction)",
          "Gas permit (if adding a gas heater)",
          "Zoning/variance approval (if your pool doesn't meet standard setbacks)",
          "HOA approval (if applicable — required before the building permit in most cases)",
        ]} />

        <H2>How Long Does Pool Permitting Take?</H2>
        <Table
          headers={["State / Region", "Typical Permit Timeline"]}
          rows={[
            ["Florida (busy counties)", "4–12 weeks"],
            ["Texas (major metros)", "3–8 weeks"],
            ["California", "4–16 weeks"],
            ["Arizona", "2–6 weeks"],
            ["Northeast states", "4–10 weeks"],
            ["Midwest / rural areas", "2–5 weeks"],
            ["Mountain West", "3–8 weeks"],
          ]}
        />
        <Callout icon="⚠️" title="Post-Pandemic Backlogs" color="warn">
          Pool permit applications surged 40–60% in many counties between 2020–2022 and have remained elevated. In Florida's Manatee, Sarasota, and Collier counties, permits were taking 16–20 weeks as recently as 2024. Always factor permit time into your project timeline.
        </Callout>

        <H2>Pool Inspections: What to Expect</H2>
        <P>Most jurisdictions require multiple inspections throughout the build:</P>
        <Ul items={[
          "Pre-dig survey — inspector verifies proposed location meets setbacks",
          "Excavation inspection — before concrete or shell work begins",
          "Steel/rebar inspection — before gunite is sprayed (gunite pools)",
          "Rough plumbing/electrical — before backfill",
          "Barrier/fence inspection — required in almost all jurisdictions",
          "Final inspection — after completion, before filling",
        ]} />

        <H2>Pool Fencing Laws</H2>
        <P>Every state requires some form of barrier around residential pools — drowning is the leading cause of accidental death for children under 5. Requirements vary but commonly include:</P>
        <Ul items={[
          "Minimum 48-inch fence height (some states require 60 inches)",
          "Self-closing, self-latching gates that open outward away from the pool",
          "No gaps larger than 4 inches in the fence (prevents child passage)",
          "Gate latch must be on the pool side and at least 54 inches from the ground",
          "Pool alarms may be required in some jurisdictions (California, Texas)",
          "The home wall can serve as one barrier — but door alarms are then required",
        ]} />

        <H2>Setback Requirements</H2>
        <P>Setbacks define how close your pool can be to property lines, the home, easements, and utilities. Common setbacks:</P>
        <Table
          headers={["Setback Type", "Typical Minimum"]}
          rows={[
            ["Property line", "5–10 feet"],
            ["House foundation", "5–10 feet"],
            ["Utility easements", "10–25 feet (check with local utility)"],
            ["Septic system", "10–25 feet (varies significantly)"],
            ["Well", "25–50 feet"],
          ]}
        />
        <P>If your lot is small or oddly shaped, you may need a variance — a formal process to request an exception. Variances add cost ($500–$2,500) and time (4–12 weeks for a hearing).</P>

        <H2>What Your Contractor Should Handle</H2>
        <P>Most licensed pool contractors handle permit applications on your behalf as part of their contract. Before signing, confirm:</P>
        <Ul items={[
          "The contract explicitly states who is responsible for pulling permits",
          "Contractor is licensed in your state and has an active license bond",
          "Contractor carries general liability ($1M+ minimum) and workers' compensation",
          "All inspections will be scheduled and passed before moving to the next phase",
        ]} />
      </>
    )
  },

  "gunite-pool-guide": {
    title: "Gunite Pool Complete Guide 2026: Cost, Pros, Cons & What to Expect",
    description: "Everything you need to know about gunite pools — how they're built, cost breakdown, pros and cons, maintenance requirements, and whether gunite is right for your project.",
    content: () => (
      <>
        <P>Gunite (also called shotcrete) is the most popular pool construction method for custom, luxury, and large-format pools. If you've seen an infinity pool, a lagoon-style backyard, or a pool with a grotto and waterfall — it was almost certainly gunite. Here's everything you need to know before committing to a gunite build.</P>

        <H2>What Is a Gunite Pool?</H2>
        <P>Gunite pools are built by spraying a dry concrete mix (pneumatically conveyed, then wetted at the nozzle) over a framework of steel rebar. The resulting shell is extremely strong — typically 3,500–4,500 PSI — and is then finished with plaster, quartz aggregate, pebble, or glass bead. The entire process is done on-site, which is what enables unlimited customization.</P>
        <P>Shotcrete is similar but uses a pre-mixed wet concrete that is pumped to the nozzle. The two terms are often used interchangeably by contractors and homeowners.</P>

        <H2>How a Gunite Pool Is Built</H2>
        <Ul items={[
          "Step 1: Design and engineering — structural engineer draws plans; permit submitted",
          "Step 2: Layout and excavation — pool shape staked and dug to correct dimensions",
          "Step 3: Steel rebar framework — rebar is bent and tied per engineering specs",
          "Step 4: Rebar inspection — building inspector approves before next step",
          "Step 5: Gunite spray — concrete is pneumatically applied and hand-sculpted",
          "Step 6: Plumbing and electrical rough-in — all pipes and conduit installed",
          "Step 7: Coping and tile — edge finish and waterline tile applied",
          "Step 8: Decking — concrete, pavers, or other deck material poured",
          "Step 9: Equipment installation — pump, filter, heater, automation set and connected",
          "Step 10: Interior finish — plaster, quartz, or pebble applied; pool filled and started up",
        ]} />

        <H2>Gunite Pool Costs by Component</H2>
        <Table
          headers={["Component", "Typical Cost"]}
          rows={[
            ["Excavation (standard soil)", "$3,000–$8,000"],
            ["Steel rebar", "$4,000–$9,000"],
            ["Gunite spray and application", "$8,000–$20,000"],
            ["Plumbing", "$4,000–$10,000"],
            ["Electrical", "$3,000–$6,000"],
            ["Standard white plaster finish", "$5,000–$10,000"],
            ["Quartz aggregate finish", "$8,000–$15,000"],
            ["PebbleTec / pebble finish", "$12,000–$22,000"],
            ["Coping (concrete)", "$4,000–$8,000"],
            ["Coping (travertine)", "$8,000–$16,000"],
            ["Equipment (pump/filter/chlorinator)", "$4,000–$8,000"],
            ["Total typical range (shell only)", "$48,000–$120,000+"],
          ]}
        />

        <H2>Gunite Pool Finishes Compared</H2>
        <Table
          headers={["Finish", "Cost/Sq Ft", "Lifespan", "Notes"]}
          rows={[
            ["White plaster", "$8–$10", "8–12 years", "Classic look; requires periodic acid washing"],
            ["Quartz aggregate", "$12–$15", "12–18 years", "Better durability, more colors available"],
            ["PebbleTec", "$16–$22", "20–30 years", "Most durable; tactile feel underfoot"],
            ["Glass bead", "$20–$28", "15–25 years", "Brilliant color; slippery when wet"],
          ]}
        />

        <H2>Gunite Pool Maintenance</H2>
        <P>Gunite pools require more ongoing care than fiberglass because the porous concrete surface harbors algae and requires more chemicals to maintain balance.</P>
        <Ul items={[
          "Brush the walls and floor 2–3 times per week (prevents algae in pores)",
          "Test water 2–3 times per week; adjust pH (7.4–7.6) and chlorine (1–3 ppm)",
          "Shock the pool weekly during swim season",
          "Acid wash every 3–5 years to remove calcium and mineral buildup",
          "Resurface every 10–15 years ($12,000–$22,000 for quartz or pebble)",
        ]} />

        <H2>Is Gunite Right for You?</H2>
        <Ul items={[
          "Yes, if: you want a fully custom design with no size or shape constraints",
          "Yes, if: you're building a spa, grotto, vanishing edge, or complex water feature",
          "Yes, if: you have a budget of $70,000+ and plan to stay 10+ years",
          "No, if: you need the pool done quickly (3–5 months is common)",
          "No, if: your budget is under $55,000 — fiberglass or vinyl will serve better",
          "No, if: you want minimal maintenance — consider fiberglass instead",
        ]} />
      </>
    )
  },

  "fiberglass-pool-guide": {
    title: "Fiberglass Pool Complete Guide 2026: Cost, Pros, Cons & Best Models",
    description: "Everything you need to know about fiberglass pools — manufacturing process, cost breakdown, best brands, maintenance advantages, limitations, and whether fiberglass is right for you.",
    content: () => (
      <>
        <P>Fiberglass pools are the fastest-growing segment of the pool market, and for good reason. They install in a fraction of the time of concrete pools, require dramatically less maintenance, and have improved dramatically in quality and design options over the past decade. Here's the complete guide.</P>

        <H2>How Fiberglass Pools Are Made</H2>
        <P>Fiberglass pools are manufactured in climate-controlled factories. A gel coat (the surface you touch) is sprayed into a mold, followed by layers of fiberglass cloth saturated with resin, and a structural backing. The finished shell is inspected, loaded onto a flatbed trailer, and shipped to your home where a crane lowers it into the excavated hole.</P>
        <P>The one-piece construction means no seams, no liner, and no interior that can delaminate or crack from temperature changes the way concrete can.</P>

        <H2>Fiberglass Pool Costs</H2>
        <Table
          headers={["Size", "Shell Cost", "Installed Cost (avg)"]}
          rows={[
            ["12×24 (small)", "$15,000–$22,000", "$32,000–$48,000"],
            ["14×28", "$18,000–$26,000", "$38,000–$56,000"],
            ["16×32 (popular)", "$22,000–$32,000", "$44,000–$68,000"],
            ["16×38", "$26,000–$38,000", "$52,000–$78,000"],
            ["16×40 (large)", "$30,000–$45,000", "$60,000–$90,000"],
          ]}
        />
        <P>The installed cost includes excavation, delivery, crane, plumbing, electrical, backfill, and basic equipment. It does not include decking, fencing, or add-on features.</P>

        <H2>Fiberglass Pool Size Limitations</H2>
        <P>Fiberglass pools are manufactured in molds, which limits their maximum dimensions. Most shells max out at:</P>
        <Ul items={[
          "Width: 16 feet (some manufacturers offer 18 ft models)",
          "Length: 40–45 feet",
          "Depth: typically 5.5–6.5 ft (fixed — cannot customize)",
          "Shape: must choose from manufacturer's catalog",
        ]} />
        <P>If you need a pool wider than 16 feet, longer than 45 feet, or deeper than 7 feet, fiberglass is not an option — gunite is your only choice.</P>

        <H2>Top Fiberglass Pool Manufacturers (2026)</H2>
        <Ul items={[
          "Latham (formerly Thursday Pools, Barrier Reef, San Juan) — largest North American manufacturer",
          "Leisure Pools — known for swim-up ledges and modern designs",
          "Viking Pools — solid reputation, wide dealer network",
          "Trilogy by Latham — premium composite shells with improved rigidity",
          "Blue Hawaiian — popular in warm-climate states",
          "Imagine Pools — Australian brand known for design innovation",
        ]} />

        <H2>Fiberglass vs. Concrete: Maintenance Comparison</H2>
        <Table
          headers={["Task", "Fiberglass", "Gunite"]}
          rows={[
            ["Algae resistance", "Excellent (non-porous)", "Poor (porous concrete)"],
            ["Chemical use/year", "$400–$800", "$700–$1,400"],
            ["Brushing required", "1–2x/week", "2–3x/week (mandatory)"],
            ["Surface repair", "Rare", "Periodic acid wash, resurfacing"],
            ["Resurfacing", "Not typically needed", "Every 10–15 years"],
          ]}
        />

        <H2>Fiberglass Pool Pros & Cons</H2>
        <H3>Pros</H3>
        <Ul items={[
          "Fastest installation of any inground pool type",
          "Non-porous gel coat resists algae and saves on chemicals",
          "No resurfacing required — gel coat lasts 25+ years with proper care",
          "Flexible shell performs better than concrete in expansive clay soils",
          "Faster water heating due to lower thermal mass",
          "Smooth surface is gentle on feet, skin, and swimwear",
        ]} />
        <H3>Cons</H3>
        <Ul items={[
          "Limited to manufacturer's shapes, sizes, and depths",
          "Shell delivery requires crane access and clear delivery route",
          "Gel coat can fade, chalk, or develop spider cracks over 20+ years",
          "Cannot be customized with attached grottos or complex water features as easily",
          "Blistering can occur if pool is drained improperly (hydrostatic pressure)",
          "Quality varies significantly by manufacturer — research warranties carefully",
        ]} />

        <H2>The Most Important Question: Who's Installing It?</H2>
        <P>A fiberglass pool's quality is determined 40% by the manufacturer and 60% by the installer. Improper backfill (using unsuitable material, over-compacting, or not using water-saturated fill) is the leading cause of fiberglass pool problems. Always ask your installer about their backfill process and verify they follow the manufacturer's installation guidelines.</P>
      </>
    )
  },

  "vinyl-liner-pool-guide": {
    title: "Vinyl Liner Pool Complete Guide 2026: Cost, Lifespan & What to Know",
    description: "Complete guide to vinyl liner pools — how they're built, cost breakdown, liner replacement costs, pros and cons, and whether vinyl is the right choice for your budget and climate.",
    content: () => (
      <>
        <P>Vinyl liner pools are the most affordable inground pool option and remain extremely popular in cold-climate states, the Midwest, and among first-time pool buyers. But they come with ongoing costs that many buyers underestimate. Here's everything you need to know about vinyl liner pools in 2026.</P>

        <H2>How Vinyl Liner Pools Are Built</H2>
        <P>A vinyl liner pool uses a structural frame — typically steel, polymer (plastic), or aluminum panels — that is assembled in the excavated hole to form the pool's shape. A custom-cut vinyl liner (typically 20–30 mil thick) is then fitted inside the frame, held in place by a track (the "bead receiver") at the top edge. The liner holds all the water.</P>
        <P>Unlike gunite or fiberglass, the liner is the waterproofing layer — which is both a cost advantage (cheaper to replace than resurface concrete) and a vulnerability (it can tear, fade, or wrinkle).</P>

        <H2>Vinyl Pool Costs</H2>
        <Table
          headers={["Size", "Installed Cost"]}
          rows={[
            ["12×24 (small)", "$25,000–$38,000"],
            ["14×28", "$30,000–$46,000"],
            ["16×32 (popular)", "$35,000–$54,000"],
            ["18×36", "$42,000–$64,000"],
            ["20×40", "$52,000–$75,000"],
          ]}
        />

        <H2>The Real Cost of Vinyl: Liner Replacement</H2>
        <P>Vinyl liners last 7–10 years on average. A new liner costs $3,500–$7,500 installed, depending on pool size, liner thickness, and local labor rates. Over a 25-year ownership period, you can expect 2–3 liner replacements:</P>
        <Table
          headers={["Ownership Period", "Liner Replacements", "Replacement Cost"]}
          rows={[
            ["10 years", "1", "$3,500–$7,500"],
            ["20 years", "2", "$7,000–$15,000"],
            ["30 years", "3", "$10,500–$22,500"],
          ]}
        />
        <P>When you factor in liner replacements, the long-term cost of a vinyl pool approaches that of fiberglass. However, a vinyl pool still wins on upfront cost by $10,000–$20,000 compared to fiberglass.</P>

        <H2>What Damages Vinyl Liners?</H2>
        <Ul items={[
          "UV exposure — fades and weakens liner over time (covered pools last longer)",
          "Pool chemistry imbalance — low pH degrades vinyl faster; high pH causes scaling",
          "Sharp objects — pet claws, toys, and pool toys with sharp edges can puncture liners",
          "Leaving the pool empty — liners shrink when drained and may not re-fit properly",
          "Algae growth under the liner — can cause staining and weakening",
          "Freezing — if not properly winterized, standing water in a closed pool can damage liner",
        ]} />

        <H2>Vinyl Pool Pros & Cons</H2>
        <H3>Pros</H3>
        <Ul items={[
          "Lowest upfront cost of any inground pool type",
          "Smooth, non-abrasive surface comfortable for all ages",
          "More shape flexibility than fiberglass (rectangular, L-shape, kidney, etc.)",
          "Available in a wide range of liner patterns and colors",
          "When a liner is damaged, replacement is far cheaper than concrete resurfacing",
          "Performs well in cold climates — polymer and aluminum walls handle freeze-thaw well",
        ]} />
        <H3>Cons</H3>
        <Ul items={[
          "Liner replacement every 7–10 years is a recurring cost",
          "Lower resale value vs. gunite in most markets",
          "Cannot install attached concrete spas or complex water features",
          "Liner can wrinkle, tear, or fade over time",
          "Stepping into the pool from the deck requires caution — liner can be slippery",
          "Vinyl pools don't add the same curb appeal as gunite or fiberglass",
        ]} />

        <H2>Best States for Vinyl Pools</H2>
        <P>Vinyl liner pools are especially popular in cold-climate states for a practical reason: steel-wall frames handle freeze-thaw cycles better than concrete, and liner replacement is far less disruptive than dealing with concrete crack repairs after a harsh winter. You'll find vinyl as the dominant pool type in Minnesota, Wisconsin, Ohio, Pennsylvania, Michigan, and New York.</P>

        <H2>Choosing a Liner: Thickness Matters</H2>
        <Table
          headers={["Thickness", "Typical Cost Adder", "Best For"]}
          rows={[
            ["20 mil", "Base price", "Budget builds, mild climates"],
            ["27 mil", "+$500–$1,200", "Standard recommendation for most pools"],
            ["28 mil", "+$800–$1,500", "High-use pools, pets, colder climates"],
            ["30 mil", "+$1,200–$2,200", "Maximum durability, longest lifespan"],
          ]}
        />
        <P>Always upgrade to at least 27 mil if your budget allows. The incremental cost is small relative to installation, and the added durability extends liner life by 2–4 years.</P>
      </>
    )
  },

  "does-a-pool-add-home-value": {
    title: "Does a Pool Add Home Value? ROI, Resale Impact & the Real Numbers (2026)",
    description: "Does adding a pool increase your home's value? Real data on pool ROI, resale impact by state, what buyers think, and whether a pool is a good investment in 2026.",
    content: () => (
      <>
        <P>The question every pool buyer eventually asks: "Will this pool increase my home's value?" The honest answer is: sometimes yes, sometimes no — and the difference comes down to your state, your market, and the type of pool you build. Here's what the data actually shows.</P>

        <H2>The Bottom Line (Spoiler)</H2>
        <P>Most pools return 50–70 cents on the dollar when you sell your home. A $75,000 pool might increase your home's appraised value by $35,000–$50,000 in a favorable market. In cold-climate states with short swimming seasons, the return can be even lower — sometimes near zero.</P>
        <Callout icon="💡" title="Key Insight">
          A pool is best understood as a lifestyle investment, not a financial one. If you'll swim regularly and enjoy it for 10+ years, the experience value often exceeds any financial calculation. If you're building it purely for resale, reconsider.
        </Callout>

        <H2>Pool ROI by State / Climate</H2>
        <Table
          headers={["Market Type", "Typical Value Add", "Example States"]}
          rows={[
            ["Warm climate, luxury market", "60–80% of cost", "FL, AZ, CA, TX, HI, NV"],
            ["Warm climate, mid-range market", "40–65% of cost", "GA, SC, NC, TN, LA"],
            ["Cold climate, expensive market", "30–50% of cost", "NY, NJ, MA, CT, IL"],
            ["Cold climate, rural/affordable market", "10–30% of cost", "MN, ND, SD, WY, MT"],
            ["Year-round warm + high demand", "Up to 90% of cost", "South Florida, Phoenix, Palm Springs"],
          ]}
        />

        <H2>What Appraisers Look For</H2>
        <P>Real estate appraisers use the "sales comparison approach" — they find recent sales of similar homes with and without pools in your neighborhood. If your neighborhood has many pool homes, your pool has higher contributory value. If you're the only pool home on the block, appraisers may find few comparables and undervalue the pool.</P>
        <Ul items={[
          "Pool type matters: gunite is valued higher than vinyl by most appraisers",
          "Condition matters: a dated, stained, or leaking pool can be a negative",
          "Age matters: a 20-year-old pool that needs resurfacing may add zero value",
          "Neighborhood saturation: pools add more value in neighborhoods where they're common",
        ]} />

        <H2>What Buyers Think About Pools</H2>
        <P>Survey data from National Association of Realtors and pool industry groups consistently shows:</P>
        <Ul items={[
          "In warm-weather states, 70–80% of buyers consider a pool a positive feature",
          "In cold-weather states, 40–50% of buyers are neutral or negative about pools",
          "Buyers in warm states will pay a meaningful premium for a pool home",
          "Buyers with young children (under 5) sometimes view pools as a liability, not an asset",
          "Buyers in expensive neighborhoods expect pools — not having one can be a disadvantage",
        ]} />

        <H2>The Hidden Financial Costs That Reduce ROI</H2>
        <P>When calculating true ROI, factor in costs that reduce your net return:</P>
        <Table
          headers={["Cost", "Annual", "Over 15 Years"]}
          rows={[
            ["Chemicals", "$800", "$12,000"],
            ["Electricity", "$1,000", "$15,000"],
            ["Maintenance service", "$2,000", "$30,000"],
            ["Insurance increase", "$350", "$5,250"],
            ["Repairs & equipment", "$500", "$7,500"],
            ["Resurfacing (once)", "—", "$15,000"],
            ["Total operating cost", "~$4,650/yr", "~$84,750"],
          ]}
        />
        <P>If you spend $75,000 to build a pool, operate it for 15 years ($84,750), then sell for $45,000 more than a comparable non-pool home — your net pool "loss" is $114,750 over 15 years, or about $7,650/year. Is the enjoyment worth $7,650/year to your family? That's the real question.</P>

        <H2>When a Pool Genuinely Hurts Resale</H2>
        <Ul items={[
          "In cold-climate states with very short swim seasons",
          "When the pool takes up most of the yard, leaving no green space",
          "When the pool is old, stained, outdated, or in disrepair",
          "In neighborhoods where buyers strongly prefer no pool (families with toddlers)",
          "If the pool is a non-standard size/shape that reads as a quirk to buyers",
        ]} />

        <H2>Our Recommendation</H2>
        <P>Build a pool if: you live in a warm-weather state, plan to stay 7+ years, will use it regularly, and have the budget for ongoing maintenance. The lifestyle ROI is real even when the financial ROI is modest.</P>
        <P>Skip the pool if: you're in a cold state, planning to sell in 3–5 years, or buying it primarily to increase appraised value. In those scenarios, a kitchen or bathroom remodel delivers better financial returns.</P>
      </>
    )
  },

};

/* ─── Per-article metadata: dates, read time, FAQs ─── */
const ARTICLE_META = {
  "fiberglass-vs-gunite-vs-vinyl": {
    date: "April 18, 2026", iso: "2026-04-18", readTime: "18 min read",
    faqs: [
      { q: "Which pool type is cheapest to own over 10 years?", a: "Fiberglass, by a small margin. A realistic 10-year total for a 16×32 pool is approximately $74,000 for fiberglass, $77,500 for vinyl (including two liner replacements), and $119,000–$121,000 for gunite (including one resurfacing). Vinyl wins on upfront cost, fiberglass wins on ongoing cost, and the two are within a few thousand dollars of each other by year 10. Gunite is in a different tier because of chemical demand, resurfacing cycles, and higher install cost." },
      { q: "Is fiberglass or gunite better for cold climates?", a: "Fiberglass, contrary to popular belief. A fiberglass shell flexes roughly 2% without cracking, which is why it tolerates freeze-thaw soil movement better than rigid concrete. Gunite is still widely built in cold states, but it requires experienced builders, expansion allowances, and rigorous winterization. If you're in the Midwest, Northeast, or higher-elevation West and maintenance is a concern, fiberglass is technically safer." },
      { q: "Can I run a saltwater system on a gunite pool?", a: "Yes, but with a caveat: the interior finish matters a lot. Pebble finishes (PebbleTec, PebbleSheen) resist salt erosion well and are the current recommendation from most high-end builders. Standard plaster finishes erode faster under saltwater — the National Plasterers Council has published technical bulletins noting accelerated wear. If saltwater is on your list and you want gunite, specify a pebble finish at quote time." },
      { q: "What is the maximum size of a fiberglass pool?", a: "In practice, 16 feet wide by about 40–44 feet long, and 6.5 feet deep. The US DOT highway transport limit without an oversize permit is 16 feet wide, and shells travel from a handful of US factories (Virginia, Indiana, Texas) to your site on a flatbed. A few manufacturers offer 16.5-foot widths with special permitting. Claims of '18-foot fiberglass pools' are almost always split-mold designs (two pieces bonded on site) or exaggeration. If you need more than 16 feet of width, choose gunite." },
      { q: "What is the most popular pool type in America in 2026?", a: "Gunite still leads US new builds at roughly 55–60% market share, down from about 75% a decade ago. Fiberglass is at 20–23% and growing fastest, driven by saltwater adoption, skilled-labor shortages in concrete trades, and faster build times. Vinyl liner sits at 18–22%, concentrated in the Midwest where regional manufacturers are headquartered. In some Sun Belt submarkets fiberglass now outsells gunite." },
      { q: "How often do you really need to replace a vinyl liner?", a: "Every 8–10 years on average, though well-maintained liners with UV covers can stretch to 12. Marketing materials advertise 20- to 30-year liner warranties, but those are heavily prorated — by year five, the payout against a replacement is typically 20–30% of cost. Plan financially as if you're replacing the liner every 9 years at $4,500–$7,500 installed. Sharp dog claws, pointy pool toys, and incomplete winterization are the top three liner-killers." },
      { q: "What is the difference between gunite and shotcrete?", a: "Gunite is a dry-mix process: dry cement and aggregate travel through a hose, and water is added at the nozzle. Shotcrete is wet-mix: the concrete is batched with water at a plant and pumped pre-mixed. Wet-mix shotcrete produces more consistent density, fewer voids, and less material waste. The National Plasterers Council has favored wet-mix shotcrete since 2022, and most top-tier builders have switched. Ask your builder which process they use — if they can't articulate a reason, that's a signal." },
    ]
  },
  "inground-pool-cost-guide": {
    date: "January 10, 2026", iso: "2026-01-10", readTime: "14 min read",
    faqs: [
      { q: "What is the average cost of an inground pool in 2026?", a: "The average inground pool in 2026 costs $35,000–$100,000 before decking, features, and landscaping. A gunite pool averages $48,000–$120,000+, fiberglass $35,000–$85,000, and vinyl liner $25,000–$65,000. The total project cost including decking, spa, and landscaping typically runs $65,000–$150,000." },
      { q: "What is not included in a standard pool quote?", a: "Most pool quotes exclude: decking ($5,000–$22,000), landscaping and retaining walls, pool fence or barrier (required by code, $2,000–$5,000), gas line for heater, electrical panel upgrades, permit fees (often itemized separately), and any soil remediation if site conditions are problematic." },
      { q: "How can I get the best price on a pool?", a: "Get 3–5 competitive bids, build in fall or winter (October–February) when contractors offer 5–15% off-season discounts, choose fiberglass or vinyl over gunite, skip the attached spa (a portable spa costs $5,000–$12,000 vs $15,000–$44,000 for an attached spa), and avoid change orders once construction starts." },
      { q: "Does pool cost vary by state?", a: "Yes, significantly. Labor costs vary from 76% of the national average (Mississippi) to 155% (Hawaii). A pool that costs $75,000 in Alabama might cost $120,000 in California or $140,000 in Hawaii. State permit costs also vary from $900 to $3,200. Use the PriceAPool calculator for a state-adjusted estimate." },
    ]
  },
  "how-long-to-build-a-pool": {
    date: "January 12, 2026", iso: "2026-01-12", readTime: "8 min read",
    faqs: [
      { q: "How long does it take to build an inground pool?", a: "From contract to swimming: gunite pools take 12–22 weeks, fiberglass 6–14 weeks, vinyl liner 8–16 weeks. The biggest variable is permit processing — some counties take 2–3 weeks, others 8–12 weeks. Spring/summer builds take longer than fall/winter builds due to contractor demand." },
      { q: "What time of year is fastest to start a pool project?", a: "Fall (September–November) is the best time to start. Contractors have more availability, permit offices process faster, and you'll often get 5–15% off. A pool started in October can realistically be swim-ready by March or April." },
      { q: "What causes pool construction delays?", a: "The most common causes: permit processing backlogs (especially FL, TX, CA, AZ), contractor scheduling, rain stopping excavation or concrete work, failed inspections requiring rework, change orders after work starts, unexpected soil or groundwater, and equipment supply delays." },
    ]
  },
  "pool-financing-guide": {
    date: "January 18, 2026", iso: "2026-01-18", readTime: "10 min read",
    faqs: [
      { q: "What is the best way to finance a pool?", a: "For homeowners with 20%+ home equity, a HELOC or home equity loan is typically best — rates are 7–9% vs 10–24% for unsecured loans, and interest may be tax-deductible. For homeowners without equity, pool-specific lenders like Lyon Financial or HFS Financial offer loans with 5–20 year terms." },
      { q: "What credit score is needed for a pool loan?", a: "For a HELOC or home equity loan, most lenders require 680+, with the best rates at 740+. Pool-specific unsecured lenders typically require 640+. Every 20–40 credit score points can lower your rate by 0.5–1.5%, saving thousands over the life of the loan." },
      { q: "Is pool loan interest tax deductible?", a: "Interest on a HELOC or home equity loan used to build a pool may be tax-deductible as home mortgage interest, since a pool is generally a 'substantial improvement.' Unsecured personal pool loans are not deductible. Consult a tax professional — rules changed with the 2017 Tax Cuts and Jobs Act." },
    ]
  },
  "pool-cost-by-size": {
    date: "January 20, 2026", iso: "2026-01-20", readTime: "9 min read",
    faqs: [
      { q: "What is the most common pool size?", a: "The 16×32 foot pool (512 sq ft) is by far the most popular size in the US. It fits most suburban backyards comfortably, accommodates a family of 4–6, and hits the sweet spot between cost and usability. Most fiberglass pool manufacturers' best-selling models are in this 500–550 sq ft range." },
      { q: "How much does a small inground pool cost?", a: "A small inground pool (12×24, about 288 sq ft) costs $25,000–$55,000 depending on type: vinyl liner pools start around $25,000, fiberglass around $32,000, and gunite around $35,000. Small pools cost 30–40% less to install and about 50% less to heat and maintain than large pools." },
      { q: "Is a bigger pool worth the extra cost?", a: "Usually yes, if you have the yard space. The incremental cost per square foot decreases as pools get larger. Most homeowners who build small pools wish they had gone larger. If you're debating between two sizes, go one size up — you'll almost never regret having more pool." },
    ]
  },
  "pool-permits-and-regulations": {
    date: "January 22, 2026", iso: "2026-01-22", readTime: "10 min read",
    faqs: [
      { q: "Can you build a pool without a permit?", a: "No — building a pool without a permit is illegal in virtually every US jurisdiction. Consequences include fines of $500–$10,000+ per day, forced removal of the pool, inability to sell your home, and insurance that won't cover incidents at the unpermitted pool. Always have your licensed contractor pull permits." },
      { q: "What fence is required around a swimming pool?", a: "Most US states require a minimum 48-inch fence with a self-closing, self-latching gate that opens away from the pool. Gaps must be smaller than 4 inches. Some jurisdictions allow the house wall to serve as one barrier if door alarms are installed. Requirements vary — confirm with your local building department." },
      { q: "How much do pool permits cost?", a: "Pool permits typically cost $800–$3,500 depending on state and county. Southern states like Alabama and Texas tend to be lower ($800–$1,500). Northeastern and Pacific states like New York and California are higher ($2,000–$3,500+). Permit fees are usually separate from the contractor's quote." },
    ]
  },
  "gunite-pool-guide": {
    date: "January 25, 2026", iso: "2026-01-25", readTime: "11 min read",
    faqs: [
      { q: "How long does a gunite pool last?", a: "A gunite pool's structural shell lasts 50+ years — essentially indefinitely with proper care. The interior plaster or finish needs resurfacing every 10–15 years at $10,000–$20,000. PebbleTec and quartz finishes last 15–25 years between resurfacings. A properly maintained gunite pool can outlast the home itself." },
      { q: "How often does a gunite pool need to be resurfaced?", a: "Standard white plaster needs resurfacing every 8–12 years. Quartz aggregate lasts 12–18 years. PebbleTec/pebble finishes last 20–30 years. Resurfacing costs $10,000–$20,000 for a standard 500 sq ft pool. Signs it's time: rough texture, stubborn staining, or visible surface deterioration." },
      { q: "Why is gunite more expensive than fiberglass or vinyl?", a: "Gunite is entirely custom-built on-site by multiple skilled trades over 8–14 weeks. The rebar framework, gunite spray, plumbing, electrical, tile, coping, and plaster finish are all separate phases. Fiberglass pools arrive pre-built and install in days. You're paying for unlimited customization and a 50+ year structure." },
    ]
  },
  "fiberglass-pool-guide": {
    date: "January 28, 2026", iso: "2026-01-28", readTime: "11 min read",
    faqs: [
      { q: "How long do fiberglass pools last?", a: "A fiberglass pool shell typically lasts 25–30+ years. The gel coat surface lasts 15–25 years before significant fading or chalking. Unlike concrete, fiberglass does not require resurfacing — the gel coat can be refinished for $5,000–$15,000, far less than a gunite resurfacing. With quality installation, a fiberglass pool is a 30-year asset." },
      { q: "What is the maximum size of a fiberglass pool?", a: "Most fiberglass pools max out at 16 feet wide (some manufacturers offer 18 ft models) and 40–45 feet long. Depth is fixed by the mold, typically 5.5–6.5 feet. If you need a pool wider than 16 feet, longer than 45 feet, or deeper than 7 feet, you'll need gunite or vinyl — fiberglass cannot accommodate these dimensions." },
      { q: "Do fiberglass pools crack?", a: "Fiberglass pools can develop spider cracks (gel coat crazing) over time, but structural cracks are rare. The flexible shell handles soil movement better than rigid concrete. Most spider cracks are cosmetic and repairable. The biggest risk is improper backfill during installation — always verify your installer follows the manufacturer's installation guidelines." },
    ]
  },
  "vinyl-liner-pool-guide": {
    date: "February 1, 2026", iso: "2026-02-01", readTime: "10 min read",
    faqs: [
      { q: "How often does a vinyl pool liner need to be replaced?", a: "Vinyl pool liners typically last 7–10 years. With excellent water chemistry and UV protection (a cover), some liners last 12–15 years. Signs it's time to replace: fading, brittleness, visible tears, wrinkles that won't smooth out, or unexplained water loss. Replacement costs $3,500–$7,500 installed." },
      { q: "Can you patch a vinyl pool liner?", a: "Yes — small tears and punctures can be patched underwater using a vinyl patch kit ($15–$40 at pool supply stores). Patches are effective for holes up to 2–3 inches. Larger tears, shrinkage, or widespread deterioration require full liner replacement. A patched liner is structurally sound but the patch will be visible." },
      { q: "Are vinyl pools cheaper to maintain than gunite?", a: "Vinyl pools use somewhat fewer chemicals than gunite (smooth surface reduces algae), but more than fiberglass. Annual chemical costs: vinyl $500–$900, gunite $700–$1,400, fiberglass $400–$800. The main ongoing cost unique to vinyl is liner replacement every 7–10 years ($3,500–$7,500), which must be factored into long-term budgeting." },
    ]
  },
  "does-a-pool-add-home-value": {
    date: "February 5, 2026", iso: "2026-02-05", readTime: "9 min read",
    faqs: [
      { q: "How much does a pool increase home value?", a: "A pool typically increases home value by 50–70% of its installation cost in warm-climate states. A $75,000 pool might add $40,000–$52,000 to a home's appraised value in Florida, Arizona, or Texas. In cold-climate states, the return is lower — sometimes 20–40% of cost, and occasionally near zero in rural or lower-priced markets." },
      { q: "Does a pool hurt home resale in cold states?", a: "A pool can be neutral to slightly negative in cold-climate states like Minnesota, Wisconsin, or upstate New York, where the swimming season is only 3–4 months. Buyers may factor in winterization costs and liability rather than viewing the pool as a luxury. In high-end suburban markets, well-maintained pools are generally still a positive even in cold states." },
      { q: "Is a pool worth the investment?", a: "Financially, pools rarely break even — the typical 15-year cost of ownership significantly exceeds the home value added. However, the non-financial return — enjoyment, family time, exercise, and lifestyle — can make a pool very worthwhile for families who use it regularly. The question is whether the lifestyle value is worth approximately $5,000–$10,000/year in net cost." },
    ]
  },
};

const BLOG_SLUGS = Object.keys(ARTICLES);

export default function BlogPage() {
  const { slug } = useParams();
  const article = ARTICLES[slug];

  if (!article) return <Navigate to="/" replace />;
  const meta = ARTICLE_META[slug] || {};

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": `https://www.priceapool.com/blog/${slug}`,
    "datePublished": meta.iso || "2026-01-01",
    "dateModified": meta.iso || "2026-01-01",
    "author": { "@type": "Organization", "name": "PriceAPool Editorial Team", "url": "https://www.priceapool.com" },
    "publisher": { "@type": "Organization", "name": "PriceAPool.com", "url": "https://www.priceapool.com" },
  };
  const faqSchema = meta.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta.faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  } : null;

  const wrap = { fontFamily: "'Inter',system-ui,-apple-system,sans-serif", color: T.text, background: T.bg, minHeight: "100vh" };
  const inner = { maxWidth: 720, margin: "0 auto", padding: "0 16px 60px" };

  return (
    <div style={wrap}>
      <Helmet>
        <title>{`${article.title} | PriceAPool`}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={`https://www.priceapool.com/blog/${slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={`https://www.priceapool.com/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, background: "rgba(250,248,243,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" style={{ display: "block" }}><circle cx="14" cy="14" r="14" fill={T.text} /><path d="M6 15.5 Q 9 13, 12 15.5 T 18 15.5 T 24 15.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><path d="M6 19.5 Q 9 17, 12 19.5 T 18 19.5 T 24 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" /></svg>
          <span style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>PriceAPool</span>
        </Link>
        <Link to="/" style={{ fontSize: 12, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Free Calculator →</Link>
      </nav>

      <div style={inner}>
        {/* ARTICLE HEADER */}
        <div style={{ padding: "36px 0 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Pool Guide · 2026</div>
          <h1 style={{ fontSize: "clamp(22px,4.5vw,34px)", fontWeight: 800, color: T.text, lineHeight: 1.2, letterSpacing: "-.5px", marginBottom: 14 }}>{article.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: T.textDim }}>By <strong style={{ color: T.textMid }}>PriceAPool Editorial Team</strong></span>
            {meta.date && <span style={{ fontSize: 12, color: T.textDim }}>Updated {meta.date}</span>}
            {meta.readTime && <span style={{ fontSize: 12, color: T.textDim }}>{meta.readTime}</span>}
          </div>
          <p style={{ fontSize: 15, color: T.textMid, lineHeight: 1.7 }}>{article.description}</p>
        </div>

        {/* CTA BANNER */}
        <div style={{ background: T.accentLight, border: `1px solid ${T.accent}33`, borderRadius: 12, padding: "14px 18px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>Get a free pool cost estimate for your state</div>
          <Link to="/" style={{ padding: "11px 20px", borderRadius: 10, background: T.text, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em", whiteSpace: "nowrap", boxShadow: "0 1px 2px rgba(10,10,10,0.08), 0 4px 12px rgba(10,10,10,0.08)" }}>Try the Calculator →</Link>
        </div>

        {/* ARTICLE BODY */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "28px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {article.content()}
        </div>

        {/* FAQ SECTION */}
        {meta.faqs?.length > 0 && (
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 28px", marginTop: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 18 }}>Frequently Asked Questions</div>
            {meta.faqs.map((faq, i) => (
              <div key={i} style={{ borderTop: i === 0 ? "none" : `1px solid ${T.border}`, paddingTop: i === 0 ? 0 : 16, marginTop: i === 0 ? 0 : 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>{faq.q}</div>
                <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        )}

        <RelatedPosts current={slug} />

        {/* ALL STATE LINKS */}
        <div style={{ marginTop: 16 }}>
          <BrowseByState />
        </div>
      </div>
    </div>
  );
}
