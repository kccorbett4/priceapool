import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import App from './App.jsx'
import { STATE_CONTENT } from './stateContent.js'
import BrowseByState from './BrowseByState.jsx'

const T = {
  bg: "#FAF8F3", bg2: "#F2EFE7", card: "#FFFFFF",
  border: "#E8E3D7", borderLight: "#EFEBE0",
  accent: "#0F4C5C", accentLight: "#E6EEF0", accentDark: "#0A3440",
  text: "#0A0A0A", textMid: "#3D3D3D", textDim: "#8A8A8A",
  success: "#166534", successBg: "#F0FDF4", successBorder: "#BBF7D0",
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
  AK:{name:"Alaska",labor:1.35,permit:2500,frost:true,region:"north",cities:["Anchorage","Fairbanks","Juneau"],neighbors:[]},
  AZ:{name:"Arizona",labor:1.02,permit:1600,frost:false,region:"southwest",cities:["Phoenix","Tucson","Scottsdale","Mesa","Chandler"],neighbors:["california","nevada","utah","new-mexico"]},
  AR:{name:"Arkansas",labor:0.78,permit:900,frost:false,region:"south",cities:["Little Rock","Fayetteville","Fort Smith","Jonesboro"],neighbors:["missouri","tennessee","mississippi","louisiana","texas","oklahoma"]},
  CA:{name:"California",labor:1.38,permit:2900,frost:false,region:"west",cities:["Los Angeles","San Diego","San Jose","San Francisco","Sacramento","Fresno"],neighbors:["oregon","nevada","arizona"]},
  CO:{name:"Colorado",labor:1.10,permit:1900,frost:true,region:"mountain",cities:["Denver","Colorado Springs","Aurora","Fort Collins","Boulder"],neighbors:["wyoming","nebraska","kansas","oklahoma","new-mexico","utah"]},
  CT:{name:"Connecticut",labor:1.25,permit:2400,frost:true,region:"northeast",cities:["Bridgeport","New Haven","Hartford","Stamford"],neighbors:["new-york","massachusetts","rhode-island"]},
  DE:{name:"Delaware",labor:1.08,permit:1700,frost:true,region:"midatlantic",cities:["Wilmington","Dover","Newark"],neighbors:["maryland","pennsylvania","new-jersey"]},
  FL:{name:"Florida",labor:0.92,permit:1300,frost:false,region:"south",cities:["Miami","Tampa","Orlando","Jacksonville","Fort Lauderdale","Naples","Sarasota"],neighbors:["georgia","alabama"]},
  GA:{name:"Georgia",labor:0.88,permit:1200,frost:false,region:"south",cities:["Atlanta","Augusta","Savannah","Columbus","Marietta","Alpharetta"],neighbors:["florida","alabama","tennessee","north-carolina","south-carolina"]},
  HI:{name:"Hawaii",labor:1.40,permit:3200,frost:false,region:"pacific",cities:["Honolulu","Kailua","Pearl City","Hilo"],neighbors:[]},
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
const fmtK = n => "$" + Math.round(n / 1000) + "K";

// Per-state click triggers + primary-source citations.
// Listed only for the 5 highest-demand states from GSC.
const STATE_HOOKS = {
  FL: {
    hook: "screen enclosures, HVHZ cages, dewatering",
    descClickTrigger: "Includes pool cage costs, HVHZ enclosure rules, and high-water-table dewatering surcharges.",
    sources: [
      { label: "Florida Statute 515 — Residential Swimming Pool Safety Act", url: "http://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0515/0515.html" },
      { label: "Florida Building Code (current edition) — pool barrier & enclosure rules", url: "https://www.floridabuilding.org/c/default.aspx" },
      { label: "Florida Swimming Pool Association (FSPA)", url: "https://floridapoolpro.com/" },
    ],
  },
  AZ: {
    hook: "caliche, ARS § 36-1681, HOA design review",
    descClickTrigger: "Includes caliche excavation surcharges, ARS § 36-1681 barrier rules, and HOA design-review timelines.",
    sources: [
      { label: "ARS § 36-1681 — Pool Enclosure (Arizona Revised Statute)", url: "https://www.azleg.gov/ars/36/01681.htm" },
      { label: "City of Phoenix pool permit info", url: "https://www.phoenix.gov/pdd/development-fees" },
      { label: "Maricopa County environmental & permit services", url: "https://www.maricopa.gov/" },
    ],
  },
  CA: {
    kook: null,
    hook: "Title 24, drought, geotech",
    descClickTrigger: "Includes Title 24 energy requirements, expansive clay engineering, and hillside-lot geotech surcharges.",
    sources: [
      { label: "California Swimming Pool Safety Act (Health & Safety Code §§ 115920–115929)", url: "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=HSC&division=104.&title=&part=10.&chapter=5.&article=" },
      { label: "California Energy Commission — Title 24 pool requirements", url: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards" },
      { label: "California Pool & Spa Association (CPSA)", url: "https://www.cpsa.org/" },
    ],
  },
  TX: {
    hook: "expansive clay, Hill Country limestone, geotech",
    descClickTrigger: "Includes expansive-clay engineering (Dallas/Houston) and Hill Country limestone excavation surcharges (Austin).",
    sources: [
      { label: "Texas Health & Safety Code Chapter 757 — Pool Yard Enclosures", url: "https://statutes.capitol.texas.gov/Docs/HS/htm/HS.757.htm" },
      { label: "Texas Department of State Health Services — Pool & Spa", url: "https://www.dshs.texas.gov/swimming-pool-spa" },
      { label: "Texas Pool & Spa Coalition", url: "https://www.atlanticpools.com/texas-pool-association/" },
    ],
  },
  NV: {
    hook: "Clark County permits, desert evaporation",
    descClickTrigger: "Includes Clark County permit timelines, alkaline-soil notes, and desert evaporation rates.",
    sources: [
      { label: "Clark County (NV) Building Department — Pool Permits", url: "https://www.clarkcountynv.gov/government/departments/building.php" },
      { label: "Nevada Revised Statutes Chapter 461 — Construction", url: "https://www.leg.state.nv.us/nrs/" },
    ],
  },
  NY: {
    hook: "Westchester permits, glacial till, frost",
    descClickTrigger: "Includes Westchester/Long Island permit overhead, glacial-till rock excavation, and frost-line winterization.",
    sources: [
      { label: "NY State Uniform Code Chapter 18-K — Residential Swimming Pools", url: "https://dos.ny.gov/codes" },
      { label: "Westchester County permit/zoning resources", url: "https://planning.westchestergov.com/" },
      { label: "NY Public Health Law § 1399 — pool barrier rules", url: "https://www.nysenate.gov/legislation/laws/PBH" },
    ],
  },
  NJ: {
    hook: "shore towns, fence rules, glacial soils",
    descClickTrigger: "Includes shore-town permitting overhead, NJ Pool Code fence rules, and glacial-soil engineering.",
    sources: [
      { label: "NJ Administrative Code 5:23 — Uniform Construction Code (pools)", url: "https://www.nj.gov/dca/divisions/codes/" },
      { label: "NJ Department of Community Affairs — Pool Safety", url: "https://www.nj.gov/dca/" },
    ],
  },
  MA: {
    hook: "Title 5, frost line, granite",
    descClickTrigger: "Includes 105 CMR pool barrier rules, deep frost-line winterization, and granite-bedrock rock removal.",
    sources: [
      { label: "Massachusetts 105 CMR 435 — Minimum Standards for Swimming Pools", url: "https://www.mass.gov/regulations/105-CMR-43500-minimum-standards-for-swimming-pools-state-sanitary-code-chapter-v" },
      { label: "Massachusetts Department of Public Health pool resources", url: "https://www.mass.gov/orgs/department-of-public-health" },
    ],
  },
  GA: {
    hook: "red clay, Fulton/Cobb permits",
    descClickTrigger: "Includes Georgia red-clay soil engineering and Fulton/Cobb county permit timelines.",
    sources: [
      { label: "Georgia O.C.G.A. § 31-45 — Public Swimming Pool & Aquatic Facility Safety Act", url: "https://law.justia.com/codes/georgia/2022/title-31/chapter-45/" },
      { label: "Georgia Department of Public Health — Pool & Spa", url: "https://dph.georgia.gov/EnvHealthLU" },
    ],
  },
  NC: {
    hook: "Mecklenburg/Wake permits, red clay",
    descClickTrigger: "Includes Mecklenburg (Charlotte) and Wake (Raleigh) permit timelines and red-clay engineering notes.",
    sources: [
      { label: "NC Administrative Code 15A NCAC 18A .2500 — Swimming Pools", url: "https://www.deq.nc.gov/about/divisions/environmental-health" },
      { label: "NC Department of Health & Human Services — Public Swimming Pools", url: "https://epi.dph.ncdhhs.gov/oee/pools/" },
    ],
  },
  PA: {
    hook: "Pittsburgh shale, Philly permits, frost",
    descClickTrigger: "Includes Pittsburgh-area Marcellus shale excavation, Philadelphia permit timelines, and PA frost-line winterization.",
    sources: [
      { label: "PA Construction Code Act (Act 45 of 1999) — pool barrier rules", url: "https://www.dli.pa.gov/ucc/Pages/default.aspx" },
      { label: "PA Department of Labor & Industry — Uniform Construction Code", url: "https://www.dli.pa.gov/" },
    ],
  },
  IL: {
    hook: "Cook County permits, expansive soils, frost",
    descClickTrigger: "Includes Cook County (Chicago) permit timelines, expansive prairie-soil engineering, and IL frost-line winterization.",
    sources: [
      { label: "Illinois Swimming Pool & Bathing Beach Act (210 ILCS 125)", url: "https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=1267&ChapterID=21" },
      { label: "Illinois Department of Public Health — Pools & Spas", url: "https://dph.illinois.gov/topics-services/environmental-health-protection/swimming-facilities.html" },
    ],
  },
  OH: {
    hook: "shale rock, Cleveland frost, OBC barrier",
    descClickTrigger: "Includes northern-Ohio shale-rock excavation surcharges, severe winter winterization, and Ohio Building Code barrier rules.",
    sources: [
      { label: "Ohio Administrative Code 3701-31 — Swimming Pools", url: "https://codes.ohio.gov/ohio-administrative-code/chapter-3701-31" },
      { label: "Ohio Department of Health — Pool Program", url: "https://odh.ohio.gov/wps/portal/gov/odh/" },
    ],
  },
  MI: {
    hook: "glacial till, Detroit permits, deep frost",
    descClickTrigger: "Includes glacial-till rock excavation, Detroit/Oakland County permit timelines, and Michigan's deep-frost winterization.",
    sources: [
      { label: "Michigan Public Act 368 of 1978 — Public Health Code, Part 125 (Pools)", url: "http://www.legislature.mi.gov/(S(0))/mileg.aspx?page=GetObject&objectname=mcl-Act-368-of-1978" },
      { label: "Michigan EGLE — Drinking Water & Environmental Health", url: "https://www.michigan.gov/egle" },
    ],
  },
  VA: {
    hook: "NoVA permits, red clay, mild frost",
    descClickTrigger: "Includes Fairfax/Arlington/Loudoun permit timelines, red-clay engineering, and Virginia mild-frost winterization rules.",
    sources: [
      { label: "Virginia Uniform Statewide Building Code (USBC) — pool barrier rules", url: "https://www.dhcd.virginia.gov/sbcca" },
      { label: "Virginia Department of Health — Pool & Spa", url: "https://www.vdh.virginia.gov/" },
    ],
  },
  WA: {
    hook: "Seattle permits, glacial till, mild winters",
    descClickTrigger: "Includes Seattle/King County permit timelines, glacial-till rock excavation, and Pacific Northwest mild-winter pool care.",
    sources: [
      { label: "WAC 246-260 — Water Recreation Facilities", url: "https://app.leg.wa.gov/wac/default.aspx?cite=246-260" },
      { label: "Washington Department of Health — Pool Safety", url: "https://doh.wa.gov/community-and-environment/pool-and-spa" },
    ],
  },
};

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
  const gInter = (sqft * 1.4) * 5 * lab; // ~700 sqft plaster finish at $5/sqft
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

function permitSentence(d) {
  const low = d.permit;
  const high = Math.round(d.permit * 1.8);
  return `Building permits in ${d.name} typically run ${fmt(low)}–${fmt(high)} depending on your county, pool type, and local requirements. Most municipalities also require a fence or barrier around the pool.`;
}

export default function StatePage() {
  const { stateSlug } = useParams();
  const code = SLUG_TO_CODE[stateSlug?.toLowerCase()];

  if (!code) return <Navigate to="/" replace />;

  const d = STATE_DATA[code];
  const costs = getStateCosts(d);
  const content = STATE_CONTENT[code];

  const dateModified = "2026-05-19";

  const stateFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does an inground pool cost in ${d.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In ${d.name}, a gunite (concrete) pool averages ${fmt(costs.gunite)}, fiberglass pools average ${fmt(costs.fiber)}, and vinyl liner pools average ${fmt(costs.vinyl)} for a standard-size pool. These are base estimates — your final cost depends on size, soil conditions, features like spas or water features, and decking.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the cheapest inground pool in ${d.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Vinyl liner pools are the most affordable option in ${d.name}, starting around ${fmt(costs.vinyl)}. The liner will need replacement every 7-10 years at a cost of $3,500-$6,000. Fiberglass pools offer a middle ground - faster to install and lower long-term maintenance than vinyl.`
        }
      },
      {
        "@type": "Question",
        "name": `How much do pool permits cost in ${d.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": permitSentence(d) }
      },
      {
        "@type": "Question",
        "name": `How long does it take to build a pool in ${d.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Gunite pools in ${d.name} typically take 8-14 weeks from permit approval to completion. Fiberglass pools can be installed in 3-6 weeks. Vinyl liner pools fall in between at 4-8 weeks. Delays can occur due to weather, permit processing times, or contractor availability - especially during peak season (spring and summer).`
        }
      },
      {
        "@type": "Question",
        "name": `Do I need to winterize my pool in ${d.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": d.frost
            ? `Yes - ${d.name} winters require proper pool winterization to prevent freeze damage to pipes and equipment. Professional closing and opening typically costs $300-$600 combined. Plan for this as an annual operating cost.`
            : `Most of ${d.name} does not require traditional pool winterization. In rare cold snaps, running equipment overnight is usually sufficient to protect your pool. This is one of the advantages of building a pool in ${d.name}.`
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Pool Cost Calculator", "item": "https://www.priceapool.com/" },
      { "@type": "ListItem", "position": 2, "name": "Pool Cost by State", "item": "https://www.priceapool.com/pool-cost-by-state" },
      { "@type": "ListItem", "position": 3, "name": `${d.name} Pool Cost`, "item": `https://www.priceapool.com/${stateSlug}` }
    ]
  };

  const stateArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${d.name} Pool Cost 2026: ${fmtK(costs.vinyl)}-${fmtK(costs.gunite)} — Free Estimate`,
    "description": `2026 pool building cost data for ${d.name}: gunite, fiberglass, and vinyl prices including permits, labor, and metro adjustments.`,
    "dateModified": dateModified,
    "datePublished": "2026-04-03",
    "author": { "@type": "Organization", "name": "PriceAPool Editorial Team", "url": "https://www.priceapool.com" },
    "publisher": { "@type": "Organization", "name": "PriceAPool.com", "url": "https://www.priceapool.com" },
    "mainEntityOfPage": `https://www.priceapool.com/${stateSlug}`
  };

  const wrap = { fontFamily: "'Inter',system-ui,-apple-system,sans-serif", color: T.text, background: T.bg, minHeight: "100vh" };
  const card = { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" };
  const inner = { maxWidth: 720, margin: "0 auto", padding: "0 16px" };

  return (
    <div style={wrap}>
      <Helmet>
        <title>{`${d.name} Pool Cost 2026: ${fmtK(costs.vinyl)}-${fmtK(costs.gunite)} (Free Estimate)`}</title>
        <meta name="description" content={`2026 ${d.name} pool prices: gunite from ${fmt(costs.gunite)}, fiberglass from ${fmt(costs.fiber)}, vinyl from ${fmt(costs.vinyl)}.${STATE_HOOKS[code] ? ` ${STATE_HOOKS[code].descClickTrigger}` : ""} Free instant estimate by ZIP — no signup, no calls.`} />
        <link rel="canonical" href={`https://www.priceapool.com/${stateSlug}`} />
        <meta property="og:title" content={`${d.name} Pool Cost 2026: ${fmtK(costs.vinyl)}-${fmtK(costs.gunite)}`} />
        <meta property="og:description" content={`2026 ${d.name} pool prices: gunite from ${fmt(costs.gunite)}, fiberglass from ${fmt(costs.fiber)}, vinyl from ${fmt(costs.vinyl)}. Free instant estimate, no signup.`} />
        <meta property="og:url" content={`https://www.priceapool.com/${stateSlug}`} />
        <meta property="article:modified_time" content={`${dateModified}T00:00:00Z`} />
        <script type="application/ld+json">{JSON.stringify(stateFaqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(stateArticleSchema)}</script>
      </Helmet>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, background: "rgba(250,248,243,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" style={{ display: "block" }}><circle cx="14" cy="14" r="14" fill={T.text} /><path d="M6 15.5 Q 9 13, 12 15.5 T 18 15.5 T 24 15.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><path d="M6 19.5 Q 9 17, 12 19.5 T 18 19.5 T 24 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" /></svg>
          <span style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>PriceAPool</span>
        </Link>
        <Link to="/blog/fiberglass-vs-gunite-vs-vinyl" style={{ fontSize: 12, color: T.accent, textDecoration: "none", fontWeight: 600 }}>Pool Guides →</Link>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "56px 20px 32px", background: `linear-gradient(180deg,${T.bg} 0%,#eef2f5 60%,#eaf4f8 100%)` }}>
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
            { type: "Fiberglass", cost: costs.fiber, tag: "Fastest Install", color: T.accentDark },
            { type: "Vinyl Liner", cost: costs.vinyl, tag: "Most Affordable", color: T.success },
          ].map(({ type, cost, tag, color }) => (
            <div key={type} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px 16px", textAlign: "center", boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{tag}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: "-.5px" }}>{fmt(cost)}</div>
              <div style={{ fontSize: 12, color: T.textMid, marginTop: 4 }}>{type}</div>
              <div style={{ fontSize: 10, color: T.textDim, marginTop: 3 }}>avg. 500 sq ft pool</div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE — semantic HTML for AI search/LLM extraction (Gemini's GEO Fix 1) */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 8 }}>{d.name} Pool Cost Comparison Table (2026)</h2>
          <p style={{ fontSize: 12, color: T.textMid, marginBottom: 14, lineHeight: 1.55 }}>Standard 500 sq ft pool, {d.name} labor index ({Math.round(d.labor * 100)}% of US average), permits included, decking/spa/features excluded.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <caption style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>2026 {d.name} inground pool cost comparison by pool type</caption>
              <thead>
                <tr style={{ background: T.bg, textAlign: "left", color: T.text }}>
                  <th style={{ padding: "10px 12px", fontWeight: 700, borderBottom: `1px solid ${T.border}` }} scope="col">Pool Type</th>
                  <th style={{ padding: "10px 12px", fontWeight: 700, borderBottom: `1px solid ${T.border}`, textAlign: "right" }} scope="col">Avg Cost ({d.name})</th>
                  <th style={{ padding: "10px 12px", fontWeight: 700, borderBottom: `1px solid ${T.border}`, textAlign: "right" }} scope="col">$/sqft</th>
                  <th style={{ padding: "10px 12px", fontWeight: 700, borderBottom: `1px solid ${T.border}` }} scope="col">Build Time</th>
                  <th style={{ padding: "10px 12px", fontWeight: 700, borderBottom: `1px solid ${T.border}` }} scope="col">Lifespan</th>
                  <th style={{ padding: "10px 12px", fontWeight: 700, borderBottom: `1px solid ${T.border}` }} scope="col">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: T.accent, borderBottom: `1px solid ${T.borderLight}` }}>Gunite / Shotcrete</th>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: T.text, borderBottom: `1px solid ${T.borderLight}` }}>{fmt(costs.gunite)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: T.textMid, borderBottom: `1px solid ${T.borderLight}`, fontVariantNumeric: "tabular-nums" }}>${Math.round(82 * d.labor)}</td>
                  <td style={{ padding: "10px 12px", color: T.textMid, borderBottom: `1px solid ${T.borderLight}` }}>12-22 weeks</td>
                  <td style={{ padding: "10px 12px", color: T.textMid, borderBottom: `1px solid ${T.borderLight}` }}>50+ years</td>
                  <td style={{ padding: "10px 12px", color: T.textMid, borderBottom: `1px solid ${T.borderLight}` }}>Fully custom shape, premium finishes</td>
                </tr>
                <tr>
                  <th scope="row" style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: T.accentDark, borderBottom: `1px solid ${T.borderLight}` }}>Fiberglass</th>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: T.text, borderBottom: `1px solid ${T.borderLight}` }}>{fmt(costs.fiber)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: T.textMid, borderBottom: `1px solid ${T.borderLight}`, fontVariantNumeric: "tabular-nums" }}>${Math.round(60 * d.labor)}</td>
                  <td style={{ padding: "10px 12px", color: T.textMid, borderBottom: `1px solid ${T.borderLight}` }}>3-6 weeks</td>
                  <td style={{ padding: "10px 12px", color: T.textMid, borderBottom: `1px solid ${T.borderLight}` }}>25-30 years</td>
                  <td style={{ padding: "10px 12px", color: T.textMid, borderBottom: `1px solid ${T.borderLight}` }}>Fast install, low maintenance, freeze-thaw</td>
                </tr>
                <tr>
                  <th scope="row" style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: T.success }}>Vinyl Liner</th>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: T.text }}>{fmt(costs.vinyl)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", color: T.textMid, fontVariantNumeric: "tabular-nums" }}>${Math.round(35 * d.labor)}</td>
                  <td style={{ padding: "10px 12px", color: T.textMid }}>4-8 weeks</td>
                  <td style={{ padding: "10px 12px", color: T.textMid }}>Liner 7-10 yr, frame 20+</td>
                  <td style={{ padding: "10px 12px", color: T.textMid }}>Lowest upfront cost, simple design</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 11, color: T.textDim, marginTop: 12, lineHeight: 1.55 }}>
            Pricing methodology: see <Link to="/methodology" style={{ color: T.accent, fontWeight: 600 }}>how we calculate these costs</Link>. Machine-readable data: <a href="/pool-cost-data.json" style={{ color: T.accent, fontWeight: 600 }}>/pool-cost-data.json</a>.
          </p>
        </div>

        {/* ABOUT THIS STATE — intro paragraph */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>Pool Costs in {d.name}: What You Need to Know</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>
            {content.intro}
          </p>
        </div>

        {/* LOCAL DETAIL SECTIONS — hand-written per state */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>Pool Permits and Building Code in {d.name}</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>
            {content.permits}
          </p>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>Pool Season and Climate in {d.name}</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>
            {content.climate}
          </p>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>Soil and Site Conditions in {d.name}</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>
            {content.soil}
          </p>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>Metro Labor and Where {d.name} Pool Costs Spike</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>
            {content.metros}
          </p>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 14 }}>Pool Builders Operating in {d.name}</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>
            {content.builders}
          </p>
        </div>

        {/* PRIMARY SOURCE CITATIONS — for high-demand states only (FL, AZ, CA, TX, NV) */}
        {STATE_HOOKS[code]?.sources?.length > 0 && (
          <div style={card}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 8 }}>{d.name} Pool Building — Primary Sources</h2>
            <p style={{ fontSize: 12, color: T.textMid, marginBottom: 14, lineHeight: 1.55 }}>Direct references to the laws, codes, and agencies that govern {d.name} pool construction. Click any source to verify our data.</p>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {STATE_HOOKS[code].sources.map((src, i) => (
                <li key={i} style={{ fontSize: 13, color: T.textMid, lineHeight: 1.75, marginBottom: 6 }}>
                  <a href={src.url} rel="noopener nofollow" target="_blank" style={{ color: T.accent, fontWeight: 600, textDecoration: "none" }}>{src.label}</a>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 11, color: T.textDim, marginTop: 12 }}>Methodology: see <Link to="/methodology" style={{ color: T.accent, fontWeight: 600 }}>how we calculate these costs</Link>. Open data: <a href="/pool-cost-data.json" style={{ color: T.accent, fontWeight: 600 }}>/pool-cost-data.json</a>.</p>
          </div>
        )}

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

        <BrowseByState />
      </div>

      {/* STICKY MOBILE CTA — visible only <=768px wide. Codex+Gemini both flagged this. */}
      <style>{`
        @media (max-width: 768px) {
          .pap-sticky-cta { display: flex !important; }
          body { padding-bottom: 64px; }
        }
      `}</style>
      <a href="#calculator-start"
        className="pap-sticky-cta"
        onClick={(e) => {
          e.preventDefault();
          const cal = document.querySelector('input[type="range"]') || document.querySelector('h1');
          if (cal && cal.scrollIntoView) cal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
        style={{
          display: "none",
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "10px 14px",
          background: T.text,
          color: "#fff",
          textDecoration: "none",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          boxShadow: "0 -4px 18px rgba(10,10,10,0.18)",
          fontFamily: "'Inter',system-ui,-apple-system,sans-serif",
        }}>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Your {d.name} Estimate</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>From {fmtK(costs.vinyl)} to {fmtK(costs.gunite)}+</span>
        </div>
        <span style={{ padding: "9px 16px", borderRadius: 8, background: "#fff", color: T.text, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>Customize →</span>
      </a>
    </div>
  );
}
