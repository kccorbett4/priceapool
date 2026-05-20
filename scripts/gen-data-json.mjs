#!/usr/bin/env node
// Generates /public/pool-cost-data.json — a machine-readable pool cost dataset
// for AI search engines (ChatGPT, Claude, Gemini, Perplexity) to cite directly.
// Runs at build time. Mirrors the same cost formulas used in StatePage.jsx.

import fs from "node:fs";
import path from "node:path";

const STATE_DATA = {
  AL:{name:"Alabama",labor:0.82,permit:1000,frost:false},
  AK:{name:"Alaska",labor:1.35,permit:2500,frost:true},
  AZ:{name:"Arizona",labor:1.02,permit:1600,frost:false},
  AR:{name:"Arkansas",labor:0.78,permit:900,frost:false},
  CA:{name:"California",labor:1.38,permit:2900,frost:false},
  CO:{name:"Colorado",labor:1.10,permit:1900,frost:true},
  CT:{name:"Connecticut",labor:1.25,permit:2400,frost:true},
  DE:{name:"Delaware",labor:1.08,permit:1700,frost:true},
  FL:{name:"Florida",labor:0.92,permit:1300,frost:false},
  GA:{name:"Georgia",labor:0.88,permit:1200,frost:false},
  HI:{name:"Hawaii",labor:1.40,permit:3200,frost:false},
  ID:{name:"Idaho",labor:0.98,permit:1500,frost:true},
  IL:{name:"Illinois",labor:1.05,permit:1800,frost:true},
  IN:{name:"Indiana",labor:0.90,permit:1300,frost:true},
  IA:{name:"Iowa",labor:0.88,permit:1200,frost:true},
  KS:{name:"Kansas",labor:0.84,permit:1100,frost:true},
  KY:{name:"Kentucky",labor:0.83,permit:1100,frost:true},
  LA:{name:"Louisiana",labor:0.80,permit:1000,frost:false},
  ME:{name:"Maine",labor:1.12,permit:1900,frost:true},
  MD:{name:"Maryland",labor:1.15,permit:2100,frost:true},
  MA:{name:"Massachusetts",labor:1.30,permit:2500,frost:true},
  MI:{name:"Michigan",labor:0.95,permit:1500,frost:true},
  MN:{name:"Minnesota",labor:1.02,permit:1600,frost:true},
  MS:{name:"Mississippi",labor:0.76,permit:900,frost:false},
  MO:{name:"Missouri",labor:0.84,permit:1100,frost:true},
  MT:{name:"Montana",labor:1.00,permit:1500,frost:true},
  NE:{name:"Nebraska",labor:0.86,permit:1100,frost:true},
  NV:{name:"Nevada",labor:1.05,permit:1700,frost:false},
  NH:{name:"New Hampshire",labor:1.15,permit:2000,frost:true},
  NJ:{name:"New Jersey",labor:1.28,permit:2600,frost:true},
  NM:{name:"New Mexico",labor:0.90,permit:1300,frost:false},
  NY:{name:"New York",labor:1.35,permit:2800,frost:true},
  NC:{name:"North Carolina",labor:0.87,permit:1200,frost:false},
  ND:{name:"North Dakota",labor:0.95,permit:1400,frost:true},
  OH:{name:"Ohio",labor:0.92,permit:1400,frost:true},
  OK:{name:"Oklahoma",labor:0.80,permit:1000,frost:false},
  OR:{name:"Oregon",labor:1.12,permit:1900,frost:true},
  PA:{name:"Pennsylvania",labor:1.10,permit:2000,frost:true},
  RI:{name:"Rhode Island",labor:1.22,permit:2300,frost:true},
  SC:{name:"South Carolina",labor:0.85,permit:1100,frost:false},
  SD:{name:"South Dakota",labor:0.88,permit:1200,frost:true},
  TN:{name:"Tennessee",labor:0.83,permit:1100,frost:false},
  TX:{name:"Texas",labor:0.88,permit:1100,frost:false},
  UT:{name:"Utah",labor:1.05,permit:1800,frost:true},
  VT:{name:"Vermont",labor:1.15,permit:2000,frost:true},
  VA:{name:"Virginia",labor:1.02,permit:1700,frost:true},
  WA:{name:"Washington",labor:1.18,permit:2100,frost:true},
  WV:{name:"West Virginia",labor:0.82,permit:1000,frost:true},
  WI:{name:"Wisconsin",labor:0.95,permit:1400,frost:true},
  WY:{name:"Wyoming",labor:1.00,permit:1400,frost:true},
  DC:{name:"Washington D.C.",labor:1.30,permit:2800,frost:true},
};

const SLUG = {
  AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming",DC:"washington-dc"
};

function getStateCosts(d) {
  const sqft = 500;
  const avgD = 4.75;
  const cuYd = (sqft * avgD) / 27;
  const lab = d.labor;
  const permits = d.permit || 1500;
  const frostC = d.frost ? 2400 : 0;
  const cont = 0.08;

  const gShell = Math.max(48000, sqft * 82 * lab);
  const gExcav = cuYd * 35 * lab;
  const gPlumb = (7000 + sqft * 3.5) * lab;
  const gElec  = (3500 + sqft * 1.0) * lab;
  const gInter = (sqft * 1.4) * 5 * lab;
  const gunite = Math.round(((gShell + gExcav + gPlumb + gElec + gInter + permits + frostC) * (1 + cont)) / 1000) * 1000;

  const fShell = Math.max(35000, sqft * 60 * lab);
  const fiber = Math.round(((fShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + permits + frostC) * (1 + cont)) / 1000) * 1000;

  const vShell = Math.max(25000, sqft * 35 * lab);
  const vinyl = Math.round(((vShell + cuYd * 35 * lab + (7000 + sqft * 3.5) * lab + (3500 + sqft * 1.0) * lab + permits + frostC) * (1 + cont)) / 1000) * 1000;

  return { gunite, fiber, vinyl };
}

const today = new Date().toISOString().slice(0, 10);

const states = Object.entries(STATE_DATA).map(([code, d]) => {
  const costs = getStateCosts(d);
  return {
    state_code: code,
    state_name: d.name,
    slug: SLUG[code],
    url: `https://www.priceapool.com/${SLUG[code]}`,
    labor_index: d.labor,
    labor_index_note: "1.00 = national median. >1 means above national average; <1 means below.",
    permit_cost_usd: d.permit,
    frost_state: d.frost,
    pool_costs_usd_2026: {
      assumptions: {
        size_sqft: 500,
        shape: "rectangle",
        avg_depth_ft: 4.75,
        site_conditions: "standard loam, no metro multiplier",
        includes: ["shell", "excavation", "plumbing", "equipment", "electrical", "interior finish (gunite only)", "permits", "frost protection where applicable", "8% contingency"],
        excludes: ["decking", "spa", "fence", "features", "heater", "automation", "metro premium"]
      },
      gunite: costs.gunite,
      fiberglass: costs.fiber,
      vinyl_liner: costs.vinyl
    }
  };
});

const dataset = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "2026 US Inground Pool Cost by State",
  "description": "Programmatic 2026 inground pool building cost estimates for all 50 US states plus Washington D.C. Includes baseline pricing for gunite, fiberglass, and vinyl liner pools at a standard 500 sq ft size, adjusted for each state's labor index and permit costs.",
  "url": "https://www.priceapool.com/pool-cost-data.json",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "creator": {
    "@type": "Organization",
    "name": "PriceAPool.com",
    "url": "https://www.priceapool.com"
  },
  "dateModified": today,
  "datePublished": "2026-04-03",
  "spatialCoverage": { "@type": "Country", "name": "United States" },
  "temporalCoverage": "2026",
  "keywords": ["inground pool cost", "swimming pool cost calculator", "pool construction cost by state", "gunite pool cost", "fiberglass pool cost", "vinyl liner pool cost", "2026 pool cost data"],
  "variableMeasured": [
    { "@type": "PropertyValue", "name": "gunite pool cost (500 sq ft baseline)", "unitText": "USD" },
    { "@type": "PropertyValue", "name": "fiberglass pool cost (500 sq ft baseline)", "unitText": "USD" },
    { "@type": "PropertyValue", "name": "vinyl liner pool cost (500 sq ft baseline)", "unitText": "USD" },
    { "@type": "PropertyValue", "name": "labor index", "description": "Multiplier vs. US median, 1.00 = average" },
    { "@type": "PropertyValue", "name": "permit cost", "unitText": "USD" }
  ],
  "data": states,
  "methodology": {
    "summary": "Each state's pool cost is computed from a base 500 sq ft rectangular pool with a 4.75 ft average depth and standard loam soil. The state's labor index multiplies shell, excavation, plumbing, electrical, and interior finish line items. Permit and frost-protection costs are added directly. A flat 8% contingency is applied to the subtotal. Metro and ZIP-level multipliers are NOT included in this dataset; see the interactive calculator at https://www.priceapool.com for those adjustments.",
    "shell_price_per_sqft_2026_usd": { "gunite": 82, "fiberglass": 60, "vinyl_liner": 35 },
    "shell_minimum_2026_usd": { "gunite": 48000, "fiberglass": 35000, "vinyl_liner": 25000 },
    "excavation_rate_per_cu_yd_usd": 35,
    "plumbing_formula_usd": "7000 + sqft * 3.5",
    "electrical_formula_usd": "3500 + sqft * 1.0",
    "interior_finish_only_for": "gunite",
    "frost_protection_usd": 2400,
    "contingency_pct": 0.08
  }
};

const outDir = path.resolve(process.cwd(), "public");
const outPath = path.join(outDir, "pool-cost-data.json");
fs.writeFileSync(outPath, JSON.stringify(dataset, null, 2));

console.log(`[gen-data-json] wrote ${outPath} (${fs.statSync(outPath).size} bytes, ${states.length} states)`);
