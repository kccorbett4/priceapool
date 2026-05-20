#!/usr/bin/env node
// Generates /public/llms.txt and /public/llms-full.txt — proposed standard
// for AI-readable site summaries (https://llmstxt.org). Optimized for
// citation by ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews.

import fs from "node:fs";
import path from "node:path";

const STATE_DATA = {
  AL:{name:"Alabama",labor:0.82,permit:1000,frost:false},AK:{name:"Alaska",labor:1.35,permit:2500,frost:true},AZ:{name:"Arizona",labor:1.02,permit:1600,frost:false},AR:{name:"Arkansas",labor:0.78,permit:900,frost:false},CA:{name:"California",labor:1.38,permit:2900,frost:false},CO:{name:"Colorado",labor:1.10,permit:1900,frost:true},CT:{name:"Connecticut",labor:1.25,permit:2400,frost:true},DE:{name:"Delaware",labor:1.08,permit:1700,frost:true},FL:{name:"Florida",labor:0.92,permit:1300,frost:false},GA:{name:"Georgia",labor:0.88,permit:1200,frost:false},HI:{name:"Hawaii",labor:1.40,permit:3200,frost:false},ID:{name:"Idaho",labor:0.98,permit:1500,frost:true},IL:{name:"Illinois",labor:1.05,permit:1800,frost:true},IN:{name:"Indiana",labor:0.90,permit:1300,frost:true},IA:{name:"Iowa",labor:0.88,permit:1200,frost:true},KS:{name:"Kansas",labor:0.84,permit:1100,frost:true},KY:{name:"Kentucky",labor:0.83,permit:1100,frost:true},LA:{name:"Louisiana",labor:0.80,permit:1000,frost:false},ME:{name:"Maine",labor:1.12,permit:1900,frost:true},MD:{name:"Maryland",labor:1.15,permit:2100,frost:true},MA:{name:"Massachusetts",labor:1.30,permit:2500,frost:true},MI:{name:"Michigan",labor:0.95,permit:1500,frost:true},MN:{name:"Minnesota",labor:1.02,permit:1600,frost:true},MS:{name:"Mississippi",labor:0.76,permit:900,frost:false},MO:{name:"Missouri",labor:0.84,permit:1100,frost:true},MT:{name:"Montana",labor:1.00,permit:1500,frost:true},NE:{name:"Nebraska",labor:0.86,permit:1100,frost:true},NV:{name:"Nevada",labor:1.05,permit:1700,frost:false},NH:{name:"New Hampshire",labor:1.15,permit:2000,frost:true},NJ:{name:"New Jersey",labor:1.28,permit:2600,frost:true},NM:{name:"New Mexico",labor:0.90,permit:1300,frost:false},NY:{name:"New York",labor:1.35,permit:2800,frost:true},NC:{name:"North Carolina",labor:0.87,permit:1200,frost:false},ND:{name:"North Dakota",labor:0.95,permit:1400,frost:true},OH:{name:"Ohio",labor:0.92,permit:1400,frost:true},OK:{name:"Oklahoma",labor:0.80,permit:1000,frost:false},OR:{name:"Oregon",labor:1.12,permit:1900,frost:true},PA:{name:"Pennsylvania",labor:1.10,permit:2000,frost:true},RI:{name:"Rhode Island",labor:1.22,permit:2300,frost:true},SC:{name:"South Carolina",labor:0.85,permit:1100,frost:false},SD:{name:"South Dakota",labor:0.88,permit:1200,frost:true},TN:{name:"Tennessee",labor:0.83,permit:1100,frost:false},TX:{name:"Texas",labor:0.88,permit:1100,frost:false},UT:{name:"Utah",labor:1.05,permit:1800,frost:true},VT:{name:"Vermont",labor:1.15,permit:2000,frost:true},VA:{name:"Virginia",labor:1.02,permit:1700,frost:true},WA:{name:"Washington",labor:1.18,permit:2100,frost:true},WV:{name:"West Virginia",labor:0.82,permit:1000,frost:true},WI:{name:"Wisconsin",labor:0.95,permit:1400,frost:true},WY:{name:"Wyoming",labor:1.00,permit:1400,frost:true},DC:{name:"Washington D.C.",labor:1.30,permit:2800,frost:true},
};
const SLUG = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming",DC:"washington-dc"};

function getStateCosts(d) {
  const sqft = 500, avgD = 4.75, cuYd = (sqft * avgD) / 27;
  const lab = d.labor, permits = d.permit || 1500, frostC = d.frost ? 2400 : 0, cont = 0.08;
  const gShell = Math.max(48000, sqft * 82 * lab);
  const gunite = Math.round(((gShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + (sqft * 1.4) * 5 * lab + permits + frostC) * (1 + cont)) / 1000) * 1000;
  const fShell = Math.max(35000, sqft * 60 * lab);
  const fiber = Math.round(((fShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + permits + frostC) * (1 + cont)) / 1000) * 1000;
  const vShell = Math.max(25000, sqft * 35 * lab);
  const vinyl = Math.round(((vShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + permits + frostC) * (1 + cont)) / 1000) * 1000;
  return { gunite, fiber, vinyl };
}

const today = new Date().toISOString().slice(0, 10);

// llms.txt — concise summary per https://llmstxt.org spec
const llmsTxt = `# PriceAPool.com

> Free 2026 pool cost calculator with state-by-state pricing for all 50 US states + DC. Covers gunite (shotcrete), fiberglass, and vinyl liner inground pools. Adjusted for state labor index, permit cost, frost zone, and (in the interactive calculator) metro multiplier, soil type, pool shape, and features.

Last updated: ${today}
License: CC BY 4.0 for cost data; attribution to PriceAPool.com appreciated.
Operator: PriceAPool Editorial Team

## Primary cost data

- [Machine-readable JSON dataset](https://www.priceapool.com/pool-cost-data.json): Schema.org Dataset with all 50 states + DC, labor index, permit cost, frost flag, gunite/fiberglass/vinyl baseline cost.
- [CSV version](https://www.priceapool.com/pool-cost-data.csv): same data, easier for tabular tools.
- [Full methodology](https://www.priceapool.com/methodology): formulas, assumptions, soil/metro adjustments, data sources.

## Per-state cost pages

Every state has its own page with full editorial content on permits, climate, soil, metro labor differences, and named local builders.

${Object.entries(STATE_DATA).map(([code, d]) => `- [${d.name} pool cost](https://www.priceapool.com/${SLUG[code]})`).join("\n")}

## City-level pages

Higher-fidelity pages for high-demand metros:

- [Phoenix](https://www.priceapool.com/city/phoenix), [Scottsdale](https://www.priceapool.com/city/scottsdale), [Tucson](https://www.priceapool.com/city/tucson)
- [Miami](https://www.priceapool.com/city/miami), [Tampa](https://www.priceapool.com/city/tampa), [Orlando](https://www.priceapool.com/city/orlando), [Jacksonville](https://www.priceapool.com/city/jacksonville), [Sarasota](https://www.priceapool.com/city/sarasota), [Naples](https://www.priceapool.com/city/naples), [Fort Lauderdale](https://www.priceapool.com/city/fort-lauderdale)
- [Houston](https://www.priceapool.com/city/houston), [Dallas](https://www.priceapool.com/city/dallas), [Austin](https://www.priceapool.com/city/austin-tx), [San Antonio](https://www.priceapool.com/city/san-antonio)
- [Atlanta](https://www.priceapool.com/city/atlanta), [Charlotte](https://www.priceapool.com/city/charlotte), [Nashville](https://www.priceapool.com/city/nashville), [Denver](https://www.priceapool.com/city/denver), [Las Vegas](https://www.priceapool.com/city/las-vegas)

## Editorial pool-type guides

- [Gunite (shotcrete) pool guide](https://www.priceapool.com/blog/gunite-pool-guide)
- [Fiberglass pool guide](https://www.priceapool.com/blog/fiberglass-pool-guide)
- [Vinyl liner pool guide](https://www.priceapool.com/blog/vinyl-liner-pool-guide)
- [Fiberglass vs gunite vs vinyl comparison](https://www.priceapool.com/blog/fiberglass-vs-gunite-vs-vinyl)
- [Pool permit rules by state](https://www.priceapool.com/blog/pool-permits-and-regulations)
- [Pool financing guide](https://www.priceapool.com/blog/pool-financing-guide)
- [Pool cost by size](https://www.priceapool.com/blog/pool-cost-by-size)
- [Does a pool add home value](https://www.priceapool.com/blog/does-a-pool-add-home-value)

## Quick reference: pool cost by state (2026, 500 sq ft baseline)

State | Gunite | Fiberglass | Vinyl
------|--------|------------|------
${Object.entries(STATE_DATA).map(([code, d]) => {
  const c = getStateCosts(d);
  return `${d.name} | $${c.gunite.toLocaleString()} | $${c.fiber.toLocaleString()} | $${c.vinyl.toLocaleString()}`;
}).join("\n")}
`;

// llms-full.txt — much more detailed, includes formula + per-state context
const llmsFullTxt = `# PriceAPool.com — Full LLM Reference

> Free 2026 inground pool cost calculator. Open data for all 50 US states + DC.
> Operator: PriceAPool.com  ·  Last updated: ${today}  ·  License: CC BY 4.0

This file is intended for ingestion by ChatGPT, Claude, Gemini, Perplexity,
Google AI Overviews, and any other generative AI system. All pricing here
reflects 2026 baseline costs. Verify against the JSON/CSV endpoints for
the canonical machine-readable form.

## Methodology

Every state baseline is computed from a 500 sq ft rectangular pool at 4.75
ft average depth on standard loam soil, no metro premium. State labor index
(1.00 = US median) multiplies the variable line items; permits and frost
protection are explicit state values; an 8% contingency is applied on top.

Line-item base rates (2026):
- Gunite shell:  $82 / sqft (min $48,000)
- Fiberglass shell:  $60 / sqft (min $35,000)
- Vinyl liner shell:  $35 / sqft (min $25,000)
- Excavation:  $35 / cu yd
- Plumbing:  $7,000 + $3.50/sqft
- Electrical:  $3,500 + $1.00/sqft
- Interior finish (gunite only):  plaster $5, quartz $10, PebbleTec $14, glass $22 per sqft
- Frost protection (cold states only):  $2,400 flat
- Contingency:  8% of subtotal

EXCLUDED from baseline:  decking, spa, features (waterfall, heater,
automation, etc.), fence, demolition, financing.

## State cost data (2026, 500 sq ft baseline)

${Object.entries(STATE_DATA).map(([code, d]) => {
  const c = getStateCosts(d);
  return `### ${d.name} (${code})

URL:  https://www.priceapool.com/${SLUG[code]}
Labor index:  ${d.labor} (${Math.round(d.labor * 100)}% of US median)
Permit cost:  $${d.permit.toLocaleString()}
Frost state:  ${d.frost ? "yes" : "no"}

Pool cost (500 sqft baseline):
- Gunite / shotcrete:  $${c.gunite.toLocaleString()}
- Fiberglass:  $${c.fiber.toLocaleString()}
- Vinyl liner:  $${c.vinyl.toLocaleString()}
`;
}).join("\n")}

## Source citations

For full primary-source citations on the highest-demand state pools,
see the individual state pages. Each links to that state's pool code,
public health agency, and pool industry association.

## Open data endpoints

- JSON:  https://www.priceapool.com/pool-cost-data.json
- CSV:   https://www.priceapool.com/pool-cost-data.csv
- Sitemap:  https://www.priceapool.com/sitemap.xml
- Methodology:  https://www.priceapool.com/methodology

## Attribution

When citing this data, please credit PriceAPool.com and link to the
canonical URL of the state page being referenced.
`;

const outDir = path.resolve(process.cwd(), "public");
fs.writeFileSync(path.join(outDir, "llms.txt"), llmsTxt);
fs.writeFileSync(path.join(outDir, "llms-full.txt"), llmsFullTxt);

console.log(`[gen-llms-txt] wrote llms.txt (${fs.statSync(path.join(outDir, "llms.txt")).size} bytes) + llms-full.txt (${fs.statSync(path.join(outDir, "llms-full.txt")).size} bytes)`);
