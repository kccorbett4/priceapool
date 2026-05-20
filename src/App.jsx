import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BrowseByState from "./BrowseByState.jsx";

/* ═══════════════ DATA ═══════════════ */
const STATES = {
  AL:{name:"Alabama",labor:0.82,permit:1000,frost:false},AK:{name:"Alaska",labor:1.35,permit:2500,frost:true},AZ:{name:"Arizona",labor:1.02,permit:1600,frost:false},AR:{name:"Arkansas",labor:0.78,permit:900,frost:false},CA:{name:"California",labor:1.38,permit:2900,frost:false},CO:{name:"Colorado",labor:1.10,permit:1900,frost:true},CT:{name:"Connecticut",labor:1.25,permit:2400,frost:true},DE:{name:"Delaware",labor:1.08,permit:1700,frost:true},FL:{name:"Florida",labor:0.92,permit:1300,frost:false},GA:{name:"Georgia",labor:0.88,permit:1200,frost:false},HI:{name:"Hawaii",labor:1.40,permit:3200,frost:false},ID:{name:"Idaho",labor:0.98,permit:1500,frost:true},IL:{name:"Illinois",labor:1.05,permit:1800,frost:true},IN:{name:"Indiana",labor:0.90,permit:1300,frost:true},IA:{name:"Iowa",labor:0.88,permit:1200,frost:true},KS:{name:"Kansas",labor:0.84,permit:1100,frost:true},KY:{name:"Kentucky",labor:0.83,permit:1100,frost:true},LA:{name:"Louisiana",labor:0.80,permit:1000,frost:false},ME:{name:"Maine",labor:1.12,permit:1900,frost:true},MD:{name:"Maryland",labor:1.15,permit:2100,frost:true},MA:{name:"Massachusetts",labor:1.30,permit:2500,frost:true},MI:{name:"Michigan",labor:0.95,permit:1500,frost:true},MN:{name:"Minnesota",labor:1.02,permit:1600,frost:true},MS:{name:"Mississippi",labor:0.76,permit:900,frost:false},MO:{name:"Missouri",labor:0.84,permit:1100,frost:true},MT:{name:"Montana",labor:1.00,permit:1500,frost:true},NE:{name:"Nebraska",labor:0.86,permit:1100,frost:true},NV:{name:"Nevada",labor:1.05,permit:1700,frost:false},NH:{name:"New Hampshire",labor:1.15,permit:2000,frost:true},NJ:{name:"New Jersey",labor:1.28,permit:2600,frost:true},NM:{name:"New Mexico",labor:0.90,permit:1300,frost:false},NY:{name:"New York",labor:1.35,permit:2800,frost:true},NC:{name:"North Carolina",labor:0.87,permit:1200,frost:false},ND:{name:"North Dakota",labor:0.95,permit:1400,frost:true},OH:{name:"Ohio",labor:0.92,permit:1400,frost:true},OK:{name:"Oklahoma",labor:0.80,permit:1000,frost:false},OR:{name:"Oregon",labor:1.12,permit:1900,frost:true},PA:{name:"Pennsylvania",labor:1.10,permit:2000,frost:true},RI:{name:"Rhode Island",labor:1.22,permit:2300,frost:true},SC:{name:"South Carolina",labor:0.85,permit:1100,frost:false},SD:{name:"South Dakota",labor:0.88,permit:1200,frost:true},TN:{name:"Tennessee",labor:0.83,permit:1100,frost:false},TX:{name:"Texas",labor:0.88,permit:1100,frost:false},UT:{name:"Utah",labor:1.05,permit:1800,frost:true},VT:{name:"Vermont",labor:1.15,permit:2000,frost:true},VA:{name:"Virginia",labor:1.02,permit:1700,frost:true},WA:{name:"Washington",labor:1.18,permit:2100,frost:true},WV:{name:"West Virginia",labor:0.82,permit:1000,frost:true},WI:{name:"Wisconsin",labor:0.95,permit:1400,frost:true},WY:{name:"Wyoming",labor:1.00,permit:1400,frost:true},DC:{name:"Washington D.C.",labor:1.30,permit:2800,frost:true},
};

/* ── #20: Zip-to-metro adjustment ── */
const METRO_PREFIXES = {
  "100":"nyc","101":"nyc","102":"nyc","103":"nyc","104":"nyc","105":"nyc","106":"nyc","107":"nyc","108":"nyc","109":"nyc","110":"nyc","111":"nyc","112":"nyc","113":"nyc","114":"nyc","115":"nyc","116":"nyc",
  "900":"la","901":"la","902":"la","903":"la","904":"la","905":"la","906":"la","907":"la","908":"la","910":"la","911":"la","912":"la","913":"la","914":"la","915":"la","916":"la","917":"la","918":"la",
  "941":"sf","940":"sf","943":"sf","944":"sf","945":"sf","946":"sf","947":"sf","948":"sf","949":"sf","950":"sf","951":"sf",
  "600":"chi","601":"chi","602":"chi","603":"chi","604":"chi","605":"chi","606":"chi",
  "200":"dc","201":"dc","202":"dc","203":"dc","204":"dc","205":"dc","206":"dc","207":"dc","208":"dc","209":"dc",
  "021":"bos","022":"bos","023":"bos","024":"bos",
  "981":"sea","980":"sea","982":"sea","983":"sea","984":"sea",
  "330":"mia","331":"mia","332":"mia","333":"mia","334":"mia",
  "750":"dal","751":"dal","752":"dal","753":"dal","760":"dal","761":"dal",
  "770":"hou","771":"hou","772":"hou","773":"hou","774":"hou","775":"hou",
  "850":"phx","851":"phx","852":"phx","853":"phx",
  "050":"vt_rural","051":"vt_rural","052":"vt_rural","053":"vt_rural","054":"vt_rural","056":"vt_rural","057":"vt_rural","058":"vt_rural","059":"vt_rural",
  "040":"me_rural","041":"me_rural","042":"me_rural","043":"me_rural","044":"me_rural","045":"me_rural","046":"me_rural","047":"me_rural","048":"me_rural","049":"me_rural",
  "570":"sd_rural","571":"sd_rural","572":"sd_rural","573":"sd_rural","574":"sd_rural","575":"sd_rural","576":"sd_rural","577":"sd_rural",
  "580":"nd_rural","581":"nd_rural","582":"nd_rural","583":"nd_rural","584":"nd_rural","585":"nd_rural","586":"nd_rural","587":"nd_rural","588":"nd_rural",
  "590":"mt_rural","591":"mt_rural","592":"mt_rural","593":"mt_rural","594":"mt_rural","595":"mt_rural","596":"mt_rural","597":"mt_rural","598":"mt_rural","599":"mt_rural",
  "820":"wy_rural","821":"wy_rural","822":"wy_rural","823":"wy_rural","824":"wy_rural","825":"wy_rural","826":"wy_rural","827":"wy_rural","828":"wy_rural","829":"wy_rural","830":"wy_rural","831":"wy_rural",
  "840":"slc","841":"slc",
  "480":"mi_rural","486":"mi_rural","487":"mi_rural","488":"mi_rural","489":"mi_rural","496":"mi_rural","497":"mi_rural","498":"mi_rural","499":"mi_rural",
  "481":"det","482":"det","483":"det","484":"det","485":"det",
  "430":"oh_rural","436":"oh_rural","437":"oh_rural","438":"oh_rural","439":"oh_rural","456":"oh_rural","457":"oh_rural","458":"oh_rural","459":"oh_rural",
  "431":"col","432":"col","433":"col",
  "441":"cle","440":"cle","442":"cle","443":"cle","444":"cle",
  "191":"phi","190":"phi","193":"phi","194":"phi",
  "300":"atl","301":"atl","302":"atl","303":"atl",
  "800":"den","801":"den","802":"den","803":"den","804":"den","805":"den",
  "551":"nj_metro","070":"nj_metro","071":"nj_metro","072":"nj_metro","073":"nj_metro","074":"nj_metro","076":"nj_metro","077":"nj_metro","078":"nj_metro","079":"nj_metro",
};
const METRO_MULT = {
  nyc:1.18,la:1.12,sf:1.20,chi:1.05,dc:1.12,bos:1.14,sea:1.12,mia:1.04,dal:0.97,hou:0.95,phx:1.00,slc:1.02,det:0.94,col:0.95,cle:0.92,phi:1.08,atl:0.96,den:1.06,nj_metro:1.15,
  vt_rural:0.92,me_rural:0.90,sd_rural:0.88,nd_rural:0.88,mt_rural:0.90,wy_rural:0.90,mi_rural:0.90,oh_rural:0.88,
};
function getMetroMult(zip) {
  if (!zip || zip.length < 3) return { mult: 1.0, label: null };
  const prefix = zip.substring(0, 3);
  const metro = METRO_PREFIXES[prefix];
  if (!metro) return { mult: 1.0, label: null };
  const mult = METRO_MULT[metro] || 1.0;
  const labels = {
    nyc:"New York Metro",la:"Los Angeles Metro",sf:"SF Bay Area",chi:"Chicago Metro",dc:"DC Metro",bos:"Boston Metro",sea:"Seattle Metro",mia:"Miami Metro",dal:"Dallas–Fort Worth",hou:"Houston Metro",phx:"Phoenix Metro",slc:"Salt Lake City",det:"Detroit Metro",col:"Columbus Metro",cle:"Cleveland Metro",phi:"Philadelphia Metro",atl:"Atlanta Metro",den:"Denver Metro",nj_metro:"Northern NJ Metro",
    vt_rural:"Rural Vermont",me_rural:"Rural Maine",sd_rural:"Rural South Dakota",nd_rural:"Rural North Dakota",mt_rural:"Rural Montana",wy_rural:"Rural Wyoming",mi_rural:"Rural Michigan",oh_rural:"Rural Ohio",
  };
  return { mult, label: labels[metro] || metro };
}

const SOIL_TYPES = {
  sandy:{label:"Sandy / Loose",desc:"Easy dig, needs stabilization & dewatering",excavMult:0.85,eng:2500,struct:4000,drain:1500,notes:"Over-excavation with compacted engineered fill likely required.",contAdj:0.02},
  loam:{label:"Loam / Clay Mix",desc:"Ideal — stable, moderate dig, minimal extra engineering",excavMult:1.0,eng:0,struct:0,drain:0,notes:"Standard build conditions.",contAdj:0},
  clay:{label:"Heavy Clay / Expansive",desc:"Expands & contracts — reinforced shell, flex plumbing",excavMult:1.15,eng:4500,struct:6500,drain:3000,notes:"Structural engineer review mandatory. Post-tension or heavy rebar. Flex joints required.",contAdj:0.03},
  rock:{label:"Rocky / Hardpan",desc:"Rock hammering or blasting — major surcharge",excavMult:2.2,eng:3000,struct:2000,drain:500,notes:"Rock removal by breaker or blasting. Add 2–4 weeks.",contAdj:0.04},
  water:{label:"High Water Table",desc:"Dewatering, hydrostatic valves, heavier shell",excavMult:1.35,eng:5000,struct:5500,drain:6000,notes:"Wellpoint dewatering during build. Hydrostatic relief valves. Heavier steel.",contAdj:0.04},
  fill:{label:"Fill Dirt / Disturbed",desc:"Unpredictable — deep piers, geotech required",excavMult:1.5,eng:8000,struct:10000,drain:3500,notes:"Full geotech investigation mandatory. Deep piers or helical piles likely.",contAdj:0.05},
  unknown:{label:"I'm Not Sure",desc:"Blended average — recommended to get a geotech report",excavMult:1.15,eng:2500,struct:3000,drain:1500,notes:"Uses a weighted average. A $2K–$3K geotech report before signing a contract can save $5K–$15K in contractor risk padding.",isUnknown:true,contAdj:0.03},
};

const POOL_TYPES = {
  gunite:{label:"Gunite / Shotcrete",sqftRate:82,min:48000,desc:"Fully custom, most durable",maxDepth:12,maxW:50,maxL:80},
  fiberglass:{label:"Fiberglass",sqftRate:60,min:35000,desc:"Fast install, limited sizes",maxDepth:8.5,maxW:16,maxL:45},
  vinyl:{label:"Vinyl Liner",sqftRate:35,min:25000,desc:"Most affordable, 7–10yr liner",maxDepth:10,maxW:24,maxL:50},
};

const SPA_SIZES = {
  none:{label:"No Spa",cost:{gunite:0,fiberglass:0,vinyl:0}},
  small:{label:"Small (4–5 person)",cost:{gunite:22000,fiberglass:12000,vinyl:9500}},
  medium:{label:"Medium (6–7 person)",cost:{gunite:32000,fiberglass:17000,vinyl:13500}},
  large:{label:"Large (8+ person)",cost:{gunite:44000,fiberglass:23000,vinyl:18000}},
};
const spaPrice = (size, type) => (SPA_SIZES[size]?.cost?.[type]) || 0;

/* #10: Features with conflict groups */
const FEATURES = [
  {id:"waterfall",label:"Rock Waterfall",cost:7500,icon:"🪨",laborIntensive:true},
  {id:"fire",label:"Fire Bowls / Pit",cost:5500,icon:"🔥",laborIntensive:true},
  {id:"tanning",label:"Tanning Ledge",cost:4800,icon:"☀️",laborIntensive:true},
  {id:"lighting",label:"LED Lighting",cost:3500,icon:"💡",laborIntensive:false},
  {id:"auto",label:"Automation System",cost:5000,icon:"📱",laborIntensive:false},
  {id:"heater",label:"Gas Heater",cost:4800,icon:"🌡️",laborIntensive:true,conflictGroup:"heat"},
  {id:"heatpump",label:"Heat Pump",cost:5200,icon:"♻️",laborIntensive:true,conflictGroup:"heat"},
  {id:"saltcell",label:"Salt Cell",cost:2400,icon:"🧂",laborIntensive:false,conflictGroup:"chem"},
  {id:"autocover",label:"Auto Safety Cover",cost:12500,icon:"🛡️",laborIntensive:true},
  {id:"slide",label:"Pool Slide",cost:5000,icon:"🎢",laborIntensive:true},
  {id:"diving",label:"Diving Board",cost:2500,icon:"🏊",laborIntensive:false,minDeep:9},
  {id:"fence",label:"Safety Fence",cost:3200,icon:"🏗️",laborIntensive:true},
  {id:"chemical",label:"Chemical Controller",cost:2800,icon:"⚗️",laborIntensive:false,conflictGroup:"chem"},
  {id:"grotto",label:"Grotto",cost:13000,icon:"🏔️",laborIntensive:true,guniteOnly:true},
  {id:"vanishing",label:"Vanishing Edge",cost:32000,icon:"♾️",laborIntensive:true,guniteOnly:true},
];

const FINISH_OPTIONS = {
  plaster:{label:"Standard White Plaster",rate:5},
  quartz:{label:"Quartz Aggregate",rate:10},
  pebble:{label:"PebbleTec / Pebble Finish",rate:14},
  glass:{label:"Glass Bead Finish",rate:22},
};
const DECK_OPTIONS = {
  none:{label:"No Decking",rate:0},concrete:{label:"Brushed Concrete",rate:12},stamped:{label:"Stamped Concrete",rate:18},travertine:{label:"Travertine Pavers",rate:26},porcelain:{label:"Porcelain Pavers",rate:30},
};

/* #4: Pool shapes with volume factor */
const POOL_SHAPES = {
  rectangle: { label: "Rectangle", factor: 1.0 },
  lshape: { label: "L-Shape", factor: 0.88 },
  kidney: { label: "Kidney / Freeform", factor: 0.85 },
  roman: { label: "Roman / Grecian", factor: 0.93 },
};

const fmt = n => "$" + Math.round(n).toLocaleString();

/* ── Colors — "Editorial Depth": warm paper + deep teal + ink ── */
const T = {
  bg: "#FAF8F3", bg2: "#F2EFE7", card: "#FFFFFF", cardAlt: "#FAF8F3",
  border: "#E8E3D7", borderLight: "#EFEBE0",
  accent: "#0F4C5C", accentLight: "#E6EEF0", accentDark: "#0A3440",
  text: "#0A0A0A", textMid: "#3D3D3D", textDim: "#8A8A8A",
  danger: "#991B1B", dangerBg: "#FDF2F2", dangerBorder: "#F4CCCC",
  warn: "#92400E", warnBg: "#FFFBEB", warnBorder: "#F5E4BC",
  success: "#166534", successBg: "#F0FDF4", successBorder: "#BBF7D0",
};

/* ── Styles (extracted — #15) ── */
const S = {
  card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" },
  ttl: { fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 4, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.01em" },
  dsc: { fontSize: 13, color: T.textMid, marginBottom: 18, lineHeight: 1.55 },
  chip: (on) => ({ display: "flex", alignItems: "center", gap: 7, padding: "9px 11px", borderRadius: 9, border: on ? `2px solid ${T.accent}` : `2px solid ${T.borderLight}`, background: on ? T.accentLight : T.cardAlt, cursor: "pointer", transition: "all .15s" }),
  opt: (sel) => ({ background: sel ? T.accentLight : T.cardAlt, border: sel ? `2px solid ${T.accent}` : `2px solid ${T.borderLight}`, borderRadius: 10, padding: "11px 13px", cursor: "pointer", transition: "all .15s" }),
  btn: (pri, dis) => ({ padding: "13px 28px", borderRadius: 10, border: pri ? "none" : `1px solid ${T.border}`, fontWeight: 600, fontSize: 14, letterSpacing: "-0.005em", cursor: dis ? "not-allowed" : "pointer", background: pri ? (dis ? "#D4D0C7" : T.text) : "transparent", color: pri ? (dis ? "#8A8A8A" : "#FFFFFF") : T.text, transition: "all .18s cubic-bezier(.4,0,.2,1)", boxShadow: pri && !dis ? "0 1px 2px rgba(10,10,10,0.08), 0 4px 16px rgba(10,10,10,0.08)" : "none" }),
  conflictBanner: { background: T.warnBg, border: `1px solid ${T.warnBorder}`, borderRadius: 9, padding: "10px 14px", marginTop: 10, fontSize: 11, color: T.warn, lineHeight: 1.5 },
};

/* ── Reusable Components (extracted from App — #14) ── */
function Card({ children, style: sx }) {
  return <div data-card-hover="true" style={{ ...S.card, ...sx }}>{children}</div>;
}
function Ttl({ children }) { return <div style={S.ttl}>{children}</div>; }
function Dsc({ children }) { return <div style={S.dsc}>{children}</div>; }
function Opt({ sel, onClick, children, style: sx }) {
  return <div data-option onClick={onClick} style={{ ...S.opt(sel), ...sx }}>{children}</div>;
}
function Chip({ on, onClick, children }) {
  return <div data-option onClick={onClick} style={S.chip(on)}>{children}<div style={{ width: 18, height: 18, borderRadius: 4, background: on ? T.accent : T.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{on ? "✓" : ""}</div></div>;
}
function Btn({ pri, dis, children, onClick }) {
  return <button data-btn={pri ? "primary" : "secondary"} onClick={onClick} disabled={dis} style={S.btn(pri, dis)}>{children}</button>;
}
function Slider({ label, val, setter, min, max, stp = 1, warn, suffix = "ft" }) {
  const display = stp >= 1 ? Math.round(val) : Math.round(val / stp) * stp;
  const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  return <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.textMid }}>{label}</span>
      <span style={{ fontSize: 17, fontWeight: 800, color: warn ? T.danger : T.accent, fontVariantNumeric: "tabular-nums" }}>{display} {suffix}</span>
    </div>
    <input type="range" min={min} max={max} step="any" value={val}
      onInput={e => setter(Math.round(+e.target.value / stp) * stp)}
      onChange={e => setter(Math.round(+e.target.value / stp) * stp)}
      style={{ "--fill": `${pct}%` }}
      className="pool-slider" />
  </div>;
}

/* ── Pool Diagram ── */
function ShapeIcon({ shape, active }) {
  const col = active ? T.accent : T.textMid;
  const fill = active ? T.accentLight : "transparent";
  return (
    <svg viewBox="0 0 32 20" style={{ width: 36, height: 22, display: "block", flexShrink: 0 }}>
      {shape === "rectangle" && <rect x="1.5" y="1.5" width="29" height="17" rx="2.5" fill={fill} stroke={col} strokeWidth="1.8" />}
      {shape === "lshape" && <path d="M1.5,1.5 L19,1.5 L19,10.5 L30.5,10.5 L30.5,18.5 L1.5,18.5 Z" fill={fill} stroke={col} strokeWidth="1.8" strokeLinejoin="round" />}
      {shape === "kidney" && <path d="M3,11 C3,4 9,1.5 15,2 C17,2.2 17,7 19,7 C21,7 21,2.2 24,2 C29,1.8 29,7 29,11 C29,17 24,19 17,19 C9,19 3,17.5 3,11 Z" fill={fill} stroke={col} strokeWidth="1.8" strokeLinejoin="round" />}
      {shape === "roman" && <path d="M10,1.5 L22,1.5 A9,9 0 0 1 22,18.5 L10,18.5 A9,9 0 0 1 10,1.5 Z" fill={fill} stroke={col} strokeWidth="1.8" />}
    </svg>
  );
}

function PoolDiagram({ length, width, shallowDepth, deepDepth, hasSpa, spaSize, poolType, shape }) {
  const td = POOL_TYPES[poolType];
  const warn = length > td.maxL || width > td.maxW || deepDepth > td.maxDepth;
  const pR = poolType === "fiberglass" ? 12 : shape === "kidney" ? 20 : 2;

  const planBoxW = 300, planBoxH = 160, planPad = 30;
  const avW = planBoxW - planPad * 2, avH = planBoxH - planPad * 2 - 20;
  const aspect = length / Math.max(width, 1);
  const fitWide = aspect > avW / avH;
  const rW = fitWide ? avW : avH * aspect;
  const rH = fitWide ? avW / aspect : avH;
  const rx = planPad + (avW - rW) / 2;
  const ry = planPad + 10 + (avH - rH) / 2;

  const spaDims = spaSize === "large" ? { w: 8, h: 12 } : spaSize === "medium" ? { w: 8, h: 8 } : { w: 6, h: 6 };
  const ftToPxX = rW / Math.max(length, 1);
  const ftToPxY = rH / Math.max(width, 1);
  const spaW = hasSpa ? Math.max(spaDims.w * ftToPxX, 8) : 0;
  const spaH = hasSpa ? Math.max(spaDims.h * ftToPxY, 8) : 0;
  const spaX = rx + rW - 1;
  const spaY = ry + (rH - spaH) / 2;

  const baseProfW = 260, profPad = 40;
  const profSpaW = hasSpa ? Math.max(spaDims.w * (baseProfW / Math.max(length, 1)), 18) : 0;
  const profBoxW = baseProfW + profPad * 2 + profSpaW + (hasSpa ? 15 : 0);
  const profW = baseProfW;
  const profBoxH = 160;
  const profTop = profPad + 14;
  const maxDepthPx = profBoxH - profPad * 2 - 20;
  const maxD = Math.max(shallowDepth, deepDepth, 3);
  const shPx = (shallowDepth / maxD) * maxDepthPx;
  const dpPx = (deepDepth / maxD) * maxDepthPx;
  const spaDepthPx = (3.5 / maxD) * maxDepthPx;

  /* #3: Slope-aware wall calculation for display */
  const slopeLen = Math.sqrt(Math.pow(length * 0.6, 2) + Math.pow(deepDepth - shallowDepth, 2));
  const flatLen = length * 0.4;
  const effectiveFloorLen = slopeLen + flatLen;

  /* #4: Shape-adjusted volume */
  const shapeFactor = POOL_SHAPES[shape]?.factor || 1.0;
  const avgD = (shallowDepth + deepDepth) / 2;
  const volume = Math.round(length * width * avgD * 7.48 * shapeFactor);

  const totalW = planBoxW + profBoxW + 10;

  /* Pool plan shape path */
  const poolPlanPath = (() => {
    switch (shape) {
      case 'lshape':
        return `M ${rx},${ry} L ${rx+rW*0.58},${ry} L ${rx+rW*0.58},${ry+rH*0.48} L ${rx+rW},${ry+rH*0.48} L ${rx+rW},${ry+rH} L ${rx},${ry+rH} Z`;
      case 'kidney':
        return `M ${rx},${ry+rH*0.5} C ${rx},${ry+rH*0.08} ${rx+rW*0.35},${ry} ${rx+rW*0.5},${ry} C ${rx+rW*0.65},${ry} ${rx+rW},${ry+rH*0.08} ${rx+rW},${ry+rH*0.5} C ${rx+rW},${ry+rH*0.9} ${rx+rW*0.75},${ry+rH} ${rx+rW*0.62},${ry+rH} C ${rx+rW*0.54},${ry+rH} ${rx+rW*0.52},${ry+rH*0.72} ${rx+rW*0.52},${ry+rH*0.63} C ${rx+rW*0.52},${ry+rH*0.54} ${rx+rW*0.48},${ry+rH*0.54} ${rx+rW*0.48},${ry+rH*0.63} C ${rx+rW*0.48},${ry+rH*0.72} ${rx+rW*0.46},${ry+rH} ${rx+rW*0.38},${ry+rH} C ${rx+rW*0.25},${ry+rH} ${rx},${ry+rH*0.9} ${rx},${ry+rH*0.5} Z`;
      case 'roman': {
        const r = Math.min(rH / 2, rW / 4);
        return `M ${rx+r},${ry} L ${rx+rW-r},${ry} A ${r},${r} 0 0 1 ${rx+rW-r},${ry+rH} L ${rx+r},${ry+rH} A ${r},${r} 0 0 1 ${rx+r},${ry} Z`;
      }
      default:
        return null; // rectangle uses <rect>
    }
  })();

  return (
    <svg viewBox={`0 0 ${totalW} ${Math.max(planBoxH, profBoxH)}`} style={{ width: "100%", maxWidth: totalW, display: "block", margin: "0 auto" }}>
      <text x={planBoxW / 2} y={12} textAnchor="middle" fill={T.textMid} fontSize="9" fontWeight="700" letterSpacing="1.5">PLAN VIEW</text>
      {poolPlanPath
        ? <path d={poolPlanPath} fill={T.accentLight} stroke={T.accent} strokeWidth="1.5" />
        : <rect x={rx} y={ry} width={rW} height={rH} rx={pR} fill={T.accentLight} stroke={T.accent} strokeWidth="1.5" />
      }
      {[0.25, 0.5, 0.75].map((f, i) =>
        <line key={i} x1={rx + 8} y1={ry + rH * f} x2={rx + rW - 8} y2={ry + rH * f}
          stroke={T.accent} strokeWidth=".5" strokeOpacity=".2" strokeDasharray="8 6" />
      )}
      {hasSpa && <g>
        <rect x={spaX} y={spaY} width={spaW} height={spaH} rx={3}
          fill={T.accentLight} stroke={T.accent} strokeWidth="1.5" />
        {spaW > 14 && <text x={spaX + spaW / 2} y={spaY + spaH / 2 + 3} textAnchor="middle"
          fill={T.accent} fontSize="6" fontWeight="700" opacity=".5">SPA</text>}
      </g>}
      <g>
        <line x1={rx} y1={ry + rH + 14} x2={rx + rW} y2={ry + rH + 14} stroke={T.textDim} strokeWidth=".7" />
        <line x1={rx} y1={ry + rH + 9} x2={rx} y2={ry + rH + 19} stroke={T.textDim} strokeWidth=".7" />
        <line x1={rx + rW} y1={ry + rH + 9} x2={rx + rW} y2={ry + rH + 19} stroke={T.textDim} strokeWidth=".7" />
        <text x={rx + rW / 2} y={ry + rH + 28} textAnchor="middle"
          fill={length > td.maxL ? T.danger : T.text} fontSize="12" fontWeight="800">{length}′</text>
      </g>
      <g>
        <line x1={rx - 14} y1={ry} x2={rx - 14} y2={ry + rH} stroke={T.textDim} strokeWidth=".7" />
        <line x1={rx - 19} y1={ry} x2={rx - 9} y2={ry} stroke={T.textDim} strokeWidth=".7" />
        <line x1={rx - 19} y1={ry + rH} x2={rx - 9} y2={ry + rH} stroke={T.textDim} strokeWidth=".7" />
        <text x={rx - 22} y={ry + rH / 2 + 4} textAnchor="end"
          fill={width > td.maxW ? T.danger : T.text} fontSize="12" fontWeight="800"
          transform={`rotate(-90 ${rx - 22} ${ry + rH / 2 + 4})`}>{width}′</text>
      </g>

      {/* Cross Section */}
      <g transform={`translate(${planBoxW + 10},0)`}>
        <text x={profBoxW / 2} y={12} textAnchor="middle" fill={T.textMid} fontSize="9" fontWeight="700" letterSpacing="1.5">CROSS SECTION</text>
        <line x1={profPad - 20} y1={profTop} x2={profPad + profW + profSpaW + 10} y2={profTop}
          stroke={T.textMid} strokeWidth="1.5" strokeDasharray="6 3" />
        <path d={`
          M ${profPad} ${profTop}
          L ${profPad} ${profTop + shPx}
          C ${profPad + profW * 0.35} ${profTop + shPx},
            ${profPad + profW * 0.55} ${profTop + dpPx},
            ${profPad + profW} ${profTop + dpPx}
          L ${profPad + profW} ${profTop}
        `} fill={T.accentLight} stroke="none" />
        <path d={`
          M ${profPad - 2} ${profTop - 2}
          L ${profPad - 2} ${profTop + shPx + 2}
          C ${profPad + profW * 0.35} ${profTop + shPx + 2},
            ${profPad + profW * 0.55} ${profTop + dpPx + 2},
            ${profPad + profW + 2} ${profTop + dpPx + 2}
          L ${profPad + profW + 2} ${profTop - 2}
        `} fill="none" stroke={T.textMid} strokeWidth="2" strokeLinecap="round" />
        <line x1={profPad - 18} y1={profTop - 1} x2={profPad - 2} y2={profTop - 1}
          stroke={T.textMid} strokeWidth="2.5" />
        <line x1={profPad + profW + 2} y1={profTop - 1} x2={profPad + profW + 18} y2={profTop - 1}
          stroke={T.textMid} strokeWidth="2.5" />
        {hasSpa && <g>
          <path d={`
            M ${profPad + profW + 4} ${profTop - 2}
            L ${profPad + profW + 4} ${profTop + spaDepthPx}
            Q ${profPad + profW + 4 + profSpaW / 2} ${profTop + spaDepthPx + 5}
              ${profPad + profW + profSpaW} ${profTop + spaDepthPx}
            L ${profPad + profW + profSpaW} ${profTop - 2}
          `} fill="none" stroke={T.textMid} strokeWidth="2" strokeLinecap="round" />
          <path d={`
            M ${profPad + profW + 5} ${profTop}
            L ${profPad + profW + 5} ${profTop + spaDepthPx - 1}
            Q ${profPad + profW + 4 + profSpaW / 2} ${profTop + spaDepthPx + 3}
              ${profPad + profW + profSpaW - 1} ${profTop + spaDepthPx - 1}
            L ${profPad + profW + profSpaW - 1} ${profTop}
            Z
          `} fill={T.accentLight} stroke="none" />
          <path d={`M ${profPad + profW + 5} ${profTop + 1} Q ${profPad + profW + 1} ${profTop + 6} ${profPad + profW - 2} ${profTop + 12}`}
            fill="none" stroke={T.accent} strokeWidth="1" strokeDasharray="2 2" opacity=".5" />
        </g>}
        <line x1={profPad - 8} y1={profTop} x2={profPad - 8} y2={profTop + shPx}
          stroke={T.accent} strokeWidth="1" />
        <circle cx={profPad - 8} cy={profTop} r="2" fill={T.accent} />
        <circle cx={profPad - 8} cy={profTop + shPx} r="2" fill={T.accent} />
        <text x={profPad - 14} y={profTop + shPx / 2 - 2} textAnchor="end"
          fill={T.accent} fontSize="13" fontWeight="800">{shallowDepth}′</text>
        <text x={profPad - 14} y={profTop + shPx / 2 + 10} textAnchor="end"
          fill={T.textDim} fontSize="7" fontWeight="600">SHALLOW</text>
        {(() => {
          const dx = profPad + profW + (hasSpa ? -8 : 8);
          const anchor = hasSpa ? "end" : "start";
          const tx = hasSpa ? dx - 6 : dx + 6;
          return <g>
            <line x1={dx} y1={profTop} x2={dx} y2={profTop + dpPx}
              stroke={deepDepth > td.maxDepth ? T.danger : T.accent} strokeWidth="1" />
            <circle cx={dx} cy={profTop} r="2" fill={deepDepth > td.maxDepth ? T.danger : T.accent} />
            <circle cx={dx} cy={profTop + dpPx} r="2" fill={deepDepth > td.maxDepth ? T.danger : T.accent} />
            <text x={tx} y={profTop + dpPx / 2 - 2} textAnchor={anchor}
              fill={deepDepth > td.maxDepth ? T.danger : T.accent} fontSize="13" fontWeight="800">{deepDepth}′</text>
            <text x={tx} y={profTop + dpPx / 2 + 10} textAnchor={anchor}
              fill={T.textDim} fontSize="7" fontWeight="600">DEEP</text>
          </g>;
        })()}
        <rect x={profW / 2 + profPad - 44} y={profTop + Math.max(shPx, dpPx) + 10} width={88} height={20} rx={5}
          fill={T.accentLight} stroke={T.accent} strokeWidth=".5" strokeOpacity=".3" />
        <text x={profW / 2 + profPad} y={profTop + Math.max(shPx, dpPx) + 23} textAnchor="middle"
          fill={T.accentDark} fontSize="9" fontWeight="700">
          {volume.toLocaleString()} gal
        </text>
      </g>
      {warn && <text x={totalW / 2} y={Math.max(planBoxH, profBoxH) - 2} textAnchor="middle"
        fill={T.danger} fontSize="8" fontWeight="700">
        ⚠ Exceeds {td.label} max ({td.maxL}×{td.maxW}×{td.maxDepth})
      </text>}
    </svg>
  );
}

/* ── #10: Feature conflict detector ── */
function getFeatureConflicts(features, deepDepth) {
  const warnings = [];
  if (features.heater && features.heatpump) {
    warnings.push({ icon: "🌡️", text: "Gas Heater + Heat Pump selected — most builds use one or the other. Gas heats faster, heat pumps are cheaper to run." });
  }
  if (features.saltcell && features.chemical) {
    warnings.push({ icon: "⚗️", text: "Salt Cell + Chemical Controller overlap — salt cells generate chlorine automatically. A chemical controller adds pH/ORP monitoring but isn't always needed with salt." });
  }
  if (features.diving && deepDepth < 9) {
    warnings.push({ icon: "🏊", text: `Diving board selected but deep end is ${deepDepth}ft — most codes require 9ft minimum for safe diving. Increase deep end or remove diving board.` });
  }
  return warnings;
}

/* ── Savings Tips (fixed #16 — shallowDepth is now a prop) ── */
function SavingsTips({ poolType, features, soil, spaSize, deckType, deckSqft, frost, length, width, deepDepth, shallowDepth, onApply }) {
  const tips = [];
  if (poolType === "gunite") { const sf = Math.round((82 - 60) * Math.min(length, 45) * Math.min(width, 16) * .9); const sv = Math.round((82 - 35) * length * width * .85); tips.push({ id: "type", title: "Switch to Fiberglass or Vinyl", save: `${fmt(sf)}–${fmt(sv)}`, desc: `Fiberglass saves ~${fmt(sf)} with faster install. Vinyl saves ~${fmt(sv)} but needs liner replacement every 7–10 yrs.`, impact: 0, action: { label: "Switch to Fiberglass", fn: () => onApply("poolType", "fiberglass") } }); }
  if (spaSize !== "none") { const sc = spaPrice(spaSize, poolType) + (features.autocover ? 8500 : 0); tips.push({ id: "spa", title: "Drop the Attached Spa", save: fmt(sc), desc: `The spillover spa adds ${fmt(spaPrice(spaSize, poolType))}${features.autocover ? " + $8,500 second auto cover" : ""}. A standalone hot tub ($5K–$10K) works without touching the pool shell.`, impact: 0, action: { label: "Remove Spa", fn: () => onApply("spaSize", "none") } }); }
  if (deckType !== "none" && deckType !== "concrete") { const s = (DECK_OPTIONS[deckType].rate - 12) * deckSqft; tips.push({ id: "deck", title: "Switch to Brushed Concrete", save: fmt(s), desc: `Saves ${fmt(s)} over ${DECK_OPTIONS[deckType].label}. Durable, slip-resistant, can be stamped later.`, impact: 1, action: { label: "Switch to Concrete", fn: () => onApply("deckType", "concrete") } }); }
  if (features.autocover) { const s = 9500 + (spaSize !== "none" ? 5500 : 0); tips.push({ id: "cover", title: "Manual Cover Instead of Auto", save: fmt(s), desc: `Manual safety covers run $3K–$4K vs $12.5K automatic${spaSize !== "none" ? " per cover" : ""}. 2 minutes of effort saves ~${fmt(s)}.`, impact: 1, action: { label: "Remove Auto Cover", fn: () => onApply("feature_off", "autocover") } }); }
  if (deepDepth > 6) {
    const depthEngSave = deepDepth <= 8 ? 1200 : deepDepth <= 9 ? 3000 : deepDepth <= 10 ? 5500 : 8500;
    const excavSave = Math.round((length * width * (deepDepth - 6)) / 27 * 35 * 0.3 * ((deepDepth - 6) * 0.15));
    const shellSave = Math.round(length * width * 82 * ((((shallowDepth + deepDepth) / 2) - 5) * 0.07 - (Math.max(((shallowDepth + 6) / 2) - 5, 0)) * 0.07));
    const totalSave = depthEngSave + excavSave + Math.max(shellSave, 0);
    tips.push({ id: "depth", title: "Reduce Deep End to 6ft", save: fmt(totalSave), desc: `Eliminates ${fmt(depthEngSave)} in deep-end engineering, reduces excavation difficulty, and lowers shell material costs. 6ft handles everything except diving boards (9ft+ required).`, impact: 1, action: { label: "Set to 6ft", fn: () => onApply("deepDepth", 6) } });
  }
  const addOn = Object.entries(features).filter(([, v]) => v).reduce((s, [id]) => { const f = FEATURES.find(x => x.id === id); return s + (f ? f.cost : 0); }, 0);
  if (addOn > 8000) tips.push({ id: "phase", title: "Phase Add-Ons Over Time", save: `${fmt(addOn * .4)} deferred`, desc: `${fmt(addOn)} in features selected. Install rough-in stubs now and add extras in year 2.`, impact: 0, action: { label: "Clear All Add-Ons", fn: () => onApply("clear_features", null) } });
  if (["rock", "fill", "water", "unknown"].includes(soil)) tips.push({ id: "geo", title: "Get a Geotech Report First", save: "$5K–$15K", desc: soil === "unknown" ? "Since you're unsure about soil, a $2K–$3K geotech report is the best investment before signing." : `A $2K–$3K geotech removes contractor uncertainty on ${SOIL_TYPES[soil].label.toLowerCase()} soil.`, impact: 0, action: null });
  if (spaSize === "large") { const saveSpa = spaPrice("large", poolType) - spaPrice("medium", poolType); tips.push({ id: "downspa", title: "Downsize Spa to Medium", save: fmt(saveSpa), desc: `Medium 6–7 person handles most families. Save ${fmt(saveSpa)} on your ${POOL_TYPES[poolType]?.label || ""} build.`, impact: 1, action: { label: "Downsize", fn: () => onApply("spaSize", "medium") } }); }
  tips.sort((a, b) => a.impact - b.impact);
  const top3 = tips.slice(0, 3);
  const colors = [T.danger, T.warn, T.accent]; const bgs = [T.dangerBg, T.warnBg, T.accentLight]; const borders = [T.dangerBorder, T.warnBorder, T.accent + "33"]; const labels = ["HIGH IMPACT", "MODERATE", "MINOR"];
  return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {top3.map((tip) => <div key={tip.id} style={{ background: bgs[tip.impact], border: `1px solid ${borders[tip.impact]}`, borderRadius: 12, padding: "18px 20px", borderLeft: `4px solid ${colors[tip.impact]}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: colors[tip.impact] }}>{labels[tip.impact]}</span>
        <div style={{ background: T.successBg, border: `1px solid ${T.successBorder}`, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 800, color: T.success }}>Save {tip.save}</div>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4 }}>{tip.title}</div>
      <div style={{ fontSize: 11, color: T.textMid, lineHeight: 1.6, marginBottom: tip.action ? 10 : 0 }}>{tip.desc}</div>
      {tip.action && <button onClick={tip.action.fn} style={{ padding: "8px 16px", borderRadius: 7, border: "none", fontWeight: 700, fontSize: 12, background: `linear-gradient(135deg,${T.success},#15803d)`, color: "#fff", cursor: "pointer", boxShadow: "0 2px 8px rgba(22,163,74,0.2)" }}>✓ {tip.action.label}</button>}
    </div>)}
  </div>;
}

/* ── #17: Financing Calculator ── */
function FinancingBanner({ total }) {
  const rates = [
    { label: "Home Equity Loan", rate: 0.075, years: 15 },
    { label: "Pool Loan (unsecured)", rate: 0.099, years: 12 },
    { label: "HELOC (variable)", rate: 0.085, years: 15 },
  ];
  const calcPayment = (principal, annualRate, years) => {
    const r = annualRate / 12;
    const n = years * 12;
    return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };
  const [sel, setSel] = useState(0);
  const r = rates[sel];
  const monthly = calcPayment(total, r.rate, r.years);
  return <Card style={{ borderColor: T.accentLight }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 2 }}>💰 Monthly Payment Estimate</div>
    <Dsc>Most pools are financed. Here's what {fmt(total)} looks like monthly.</Dsc>
    <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
      {rates.map((rt, i) => <div key={i} onClick={() => setSel(i)} style={{ padding: "7px 12px", borderRadius: 8, border: sel === i ? `2px solid ${T.accent}` : `2px solid ${T.borderLight}`, background: sel === i ? T.accentLight : T.cardAlt, cursor: "pointer", fontSize: 11, fontWeight: 600, color: sel === i ? T.accent : T.textMid, transition: "all .15s" }}>{rt.label}</div>)}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: T.accent }}>{fmt(monthly)}</span>
      <span style={{ fontSize: 13, color: T.textMid, fontWeight: 600 }}>/mo</span>
    </div>
    <div style={{ fontSize: 11, color: T.textMid, lineHeight: 1.6 }}>
      {r.rate * 100}% APR · {r.years} years · {fmt(monthly * r.years * 12)} total cost · {fmt(monthly * r.years * 12 - total)} interest
    </div>
    <div style={{ fontSize: 10, color: T.textDim, marginTop: 8, lineHeight: 1.5 }}>
      Rates are illustrative — actual rates depend on credit score, equity, and lender. Home equity products typically offer the lowest rates.
    </div>
  </Card>;
}

/* ── #18: Ongoing Cost Estimate ── */
function OngoingCostsBanner({ sqft, volume, features, hasSpa, frost }) {
  const chemMo = Math.round((volume / 15000) * 55 + (hasSpa ? 25 : 0));
  const elecMo = Math.round((sqft / 300) * 60 + (features.heatpump ? 55 : 0) + (hasSpa ? 30 : 0));
  const gasMo = features.heater ? Math.round(45 + (hasSpa ? 20 : 0)) : 0;
  const insurMo = Math.round(15 + (sqft / 400) * 8);
  const maintMo = Math.round(35 + (sqft / 500) * 20);
  const winterize = frost ? 350 : 0;
  const winterMo = Math.round(winterize / 12);
  const totalMo = chemMo + elecMo + gasMo + insurMo + maintMo + winterMo;
  const rows = [
    { l: "Chemicals & water", v: chemMo },
    { l: "Electricity (pump, lights, equip)", v: elecMo },
    ...(gasMo > 0 ? [{ l: "Gas (heater)", v: gasMo }] : []),
    { l: "Insurance increase", v: insurMo },
    { l: "Maintenance & cleaning", v: maintMo },
    ...(winterMo > 0 ? [{ l: "Winterization (amortized)", v: winterMo }] : []),
  ];
  return <Card>
    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 2 }}>📊 Estimated Ongoing Costs</div>
    <Dsc>Budget for these monthly costs beyond the build. Estimates based on your pool size and selections.</Dsc>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {rows.map(r => <div key={r.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.textMid, padding: "3px 0" }}>
        <span>{r.l}</span><strong style={{ color: T.text }}>{fmt(r.v)}/mo</strong>
      </div>)}
      <div style={{ borderTop: `1px solid ${T.borderLight}`, marginTop: 4, paddingTop: 6, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ fontWeight: 700, color: T.text }}>Estimated total</span>
        <strong style={{ color: T.accent, fontSize: 16 }}>~{fmt(totalMo)}/mo</strong>
      </div>
      <div style={{ fontSize: 10, color: T.textDim, marginTop: 4 }}>{fmt(totalMo * 12)}/yr · Actual varies by usage, climate, and utility rates.</div>
    </div>
  </Card>;
}

/* ── #13: Share Button ── */
function ShareButton({ total, poolType, st, sqft, hasSpa, spaSize }) {
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    const text = `🏊 My Pool Estimate — ${fmt(total)}\n${POOL_TYPES[poolType]?.label} · ${sqft.toLocaleString()} sqft${hasSpa ? ` · ${SPA_SIZES[spaSize]?.label} Spa` : ""}\n${STATES[st]?.name || ""}\nBuilt with PriceAPool.com`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => { });
  };
  return <button onClick={handleShare} style={{ padding: "10px 20px", borderRadius: 9, border: `1px solid ${T.border}`, background: T.cardAlt, color: T.textMid, fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
    {copied ? "✓ Copied!" : "📋 Share Estimate"}
  </button>;
}

/* ═══════════════ MAIN ═══════════════ */
export default function App({ initialState = "", hideNav = false }) {
  const [step, setStep] = useState(0);
  const [st, setSt] = useState(initialState);
  const [zip, setZip] = useState("");          /* #20 */
  const [soil, setSoil] = useState("unknown");
  const [poolType, setPoolType] = useState("gunite");
  const [shape, setShape] = useState("rectangle"); /* #4 */
  const [length, setLength] = useState(32);
  const [width, setWidth] = useState(16);
  const [shallowDepth, setShallowDepth] = useState(3.5);
  const [deepDepth, setDeepDepth] = useState(6);
  const [spaSize, setSpaSize] = useState("none");
  const [features, setFeatures] = useState({});
  const [deckType, setDeckType] = useState("none");
  const [deckSqft, setDeckSqft] = useState(600);
  const [finishType, setFinishType] = useState("plaster");
  const [showBrk, setShowBrk] = useState(true);
  const [animTotal, setAnimTotal] = useState(0);
  const [applied, setApplied] = useState("");
  const [ddOpen, setDdOpen] = useState(false);
  const [ddSearch, setDdSearch] = useState("");
  const [stateChanged, setStateChanged] = useState(false); /* #7 */
  const [leadEmail, setLeadEmail] = useState("");           /* #12 */
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const prevTotal = useRef(0);
  const prevState = useRef("");
  const ddRef = useRef(null);

  const handleApply = (k, v) => { switch (k) { case "poolType": setPoolType(v); break; case "spaSize": setSpaSize(v); break; case "deckType": setDeckType(v); break; case "deepDepth": setDeepDepth(v); break; case "feature_off": setFeatures(f => ({ ...f, [v]: false })); break; case "feature_on": setFeatures(f => ({ ...f, [v]: true })); break; case "clear_features": setFeatures({}); break; } setApplied(k); setTimeout(() => setApplied(""), 2200); };
  useEffect(() => { const h = e => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);

  /* #6: Depth validation — shallow can never exceed deep */
  const setShallowSafe = useCallback((v) => {
    setShallowDepth(v);
    setDeepDepth(d => Math.max(d, v + 0.5));
  }, []);
  const setDeepSafe = useCallback((v) => {
    setDeepDepth(v);
    setShallowDepth(s => Math.min(s, v - 0.5));
  }, []);

  /* Scroll to top on step change */
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  /* GA4 funnel tracking */
  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    if (step === 1) window.gtag("event", "calculator_step1_complete", { state: st });
    if (step === 2) window.gtag("event", "calculator_step2_complete", { pool_type: poolType, length, width });
    if (step === 3) window.gtag("event", "calculator_complete", {
      pool_type: poolType,
      state: st,
      estimate: Math.round(total),
      sqft,
      has_spa: hasSpa,
      soil,
    });
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  /* #7: State change detection on results page */
  useEffect(() => {
    if (step === 3 && prevState.current && prevState.current !== st) {
      setStateChanged(true);
      setTimeout(() => setStateChanged(false), 3000);
    }
    prevState.current = st;
  }, [st, step]);

  const td = POOL_TYPES[poolType];
  const cL = Math.min(length, td.maxL), cW = Math.min(width, td.maxW), cDeep = Math.min(deepDepth, td.maxDepth);
  const shapeFactor = POOL_SHAPES[shape]?.factor || 1.0;

  /* #3: Slope-aware wall sqft */
  const slopeRise = Math.abs(cDeep - shallowDepth);
  const slopeRun = cL * 0.6; // assume 60% of length is the slope
  const slopeLength = Math.sqrt(slopeRise * slopeRise + slopeRun * slopeRun);
  const flatLength = cL * 0.4;
  const effectiveFloorLen = slopeLength + flatLength;
  const floorSqft = effectiveFloorLen * cW * shapeFactor;
  const avgD = (shallowDepth + cDeep) / 2;
  const perim = 2 * (cL + cW);
  const wallSqft = perim * avgD;
  const sqft = cL * cW;
  const surfaceSqft = sqft * shapeFactor;
  const cuYd = (sqft * avgD * shapeFactor) / 27;
  const volume = Math.round(sqft * avgD * 7.48 * shapeFactor);

  const sd = STATES[st] || {}, soilD = SOIL_TYPES[soil] || {}, hasSpa = spaSize !== "none";

  /* #20: Effective labor = state base × metro multiplier */
  const metro = getMetroMult(zip);
  const lab = (sd.labor || 1) * metro.mult;

  /* Shell priced off shape-adjusted water surface; depth adds 7% per ft above 5ft avg */
  const depthMult = 1 + Math.max(0, avgD - 5) * 0.07;
  const shell = Math.max(surfaceSqft * td.sqftRate * lab * depthMult, td.min);

  /* Smooth per-foot excavation premium past 6ft deep end (15% per ft) */
  const depthExcavMult = 1 + Math.max(0, cDeep - 6) * 0.15;
  const excav = cuYd * 35 * (soilD.excavMult || 1) * lab * depthExcavMult;

  const depthEng = cDeep <= 6 ? 0 : cDeep <= 8 ? 1200 : cDeep <= 9 ? 3000 : cDeep <= 10 ? 5500 : 8500;

  const soilEng = soilD.eng || 0, soilStruc = soilD.struct || 0, soilDrain = soilD.drain || 0;
  const soilTot = soilEng + soilStruc + soilDrain;

  const plumb = (7000 + sqft * 3.5) * lab;
  const elec = (3500 + sqft * 1.0) * lab;

  /* #2: Interior finish — gunite only; fiberglass/vinyl gel coat is included in shell */
  const finishRate = FINISH_OPTIONS[finishType]?.rate || 5;
  const totalFinishSqft = floorSqft + wallSqft;
  const inter = poolType === "gunite" ? totalFinishSqft * finishRate * lab : 0;

  const permits = sd.permit || 1500;
  const frostC = sd.frost ? 2400 : 0;

  /* #1: Spa — labor applied (consistent with shell) */
  const spaCost = spaPrice(spaSize, poolType) * lab;
  const spaAC = (hasSpa && features.autocover) ? 7500 : 0;
  const poolCoverCost = features.autocover ? 12500 : 0;

  /* #1: Features — apply labor to labor-intensive features */
  let featCost = 0; Object.entries(features).forEach(([id, on]) => {
    if (!on || id === "autocover") return;
    const f = FEATURES.find(x => x.id === id);
    if (!f) return;
    if (f.guniteOnly && poolType !== "gunite") return;
    featCost += f.laborIntensive ? f.cost * lab : f.cost;
  });

  /* #1: Decking — labor adjusted (installation is labor-heavy) */
  const deckCost = DECK_OPTIONS[deckType] ? DECK_OPTIONS[deckType].rate * deckSqft * lab : 0;

  /* #5: Variable contingency based on soil risk */
  const baseContRate = 0.08;
  const soilContAdj = soilD.contAdj || 0;
  const contRate = baseContRate + soilContAdj;
  const sub = shell + excav + depthEng + soilTot + permits + frostC + plumb + elec + inter + spaCost + spaAC + poolCoverCost + featCost + deckCost;
  const cont = sub * contRate;
  const total = sub + cont;

  useEffect(() => { const s = prevTotal.current, e = total, d = 500, t0 = performance.now(); let r; const t = n => { const p = Math.min((n - t0) / d, 1); setAnimTotal(s + (e - s) * (1 - Math.pow(1 - p, 3))); if (p < 1) r = requestAnimationFrame(t); else prevTotal.current = e; }; r = requestAnimationFrame(t); return () => cancelAnimationFrame(r); }, [total]);

  const toggleFeat = id => setFeatures(f => ({ ...f, [id]: !f[id] }));
  const canNext = step === 0 ? !!st : true;
  const filteredStates = Object.entries(STATES).filter(([c, s]) => !ddSearch || s.name.toLowerCase().includes(ddSearch.toLowerCase()) || c.toLowerCase().includes(ddSearch.toLowerCase()));
  const featureConflicts = getFeatureConflicts(features, cDeep); /* #10 */

  /* ── STEP 0: LOCATION + SOIL ── */
  const renderStep0 = () => <>
    <Card>
      <Ttl>Location</Ttl>
      <Dsc>Your state and zip code determine labor costs, permit fees, and frost-line requirements.</Dsc>
      <div ref={ddRef} style={{ position: "relative", maxWidth: 420 }}>
        <div onClick={() => setDdOpen(!ddOpen)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 9, border: `1px solid ${ddOpen ? T.accent : T.border}`, background: T.cardAlt, cursor: "pointer", transition: "all .15s" }}>
          <span style={{ fontSize: 14, color: st ? T.text : T.textDim, fontWeight: st ? 600 : 400 }}>{st ? STATES[st].name : "Select your state..."}</span>
          <span style={{ color: T.textDim, fontSize: 11, transform: ddOpen ? "rotate(180deg)" : "", transition: "transform .2s" }}>▼</span>
        </div>
        {ddOpen && <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", zIndex: 50, overflow: "hidden" }}>
          <div style={{ padding: "8px 8px 0" }}><input autoFocus value={ddSearch} onChange={e => setDdSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", padding: "8px 12px", borderRadius: 7, border: `1px solid ${T.borderLight}`, background: T.cardAlt, color: T.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
          <div style={{ maxHeight: 220, overflowY: "auto", padding: 4 }}>
            {filteredStates.map(([code, s]) => <div key={code} onClick={() => { setSt(code); setDdOpen(false); setDdSearch(""); }} style={{ padding: "9px 12px", borderRadius: 6, cursor: "pointer", background: st === code ? T.accentLight : "transparent", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: st === code ? T.accent : T.text }}>{s.name}</span>
              {st === code && <span style={{ color: T.accent, fontSize: 12 }}>✓</span>}
            </div>)}
            {filteredStates.length === 0 && <div style={{ padding: 12, fontSize: 12, color: T.textDim, textAlign: "center" }}>No match</div>}
          </div>
        </div>}
      </div>

      {/* #20: Zip code input */}
      {st && <div style={{ marginTop: 12, maxWidth: 420 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textMid, marginBottom: 6 }}>Zip Code <span style={{ fontWeight: 400, color: T.textDim }}>(optional — refines labor rate)</span></div>
        <input value={zip} onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 5); setZip(v); }} placeholder="e.g. 84003" style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: `1px solid ${T.border}`, background: T.cardAlt, color: T.text, fontSize: 14, fontWeight: 600, outline: "none", boxSizing: "border-box", fontVariantNumeric: "tabular-nums" }} />
        {metro.label && <div style={{ marginTop: 6, fontSize: 11, color: metro.mult > 1.05 ? T.warn : metro.mult < 0.95 ? T.success : T.textMid, fontWeight: 600 }}>
          📍 {metro.label} — {metro.mult > 1.0 ? `+${Math.round((metro.mult - 1) * 100)}%` : metro.mult < 1.0 ? `${Math.round((metro.mult - 1) * 100)}%` : "baseline"} labor adjustment
        </div>}
      </div>}

      {st && !zip && <div style={{ marginTop: 10, fontSize: 12, color: T.textMid }}>{STATES[st].frost ? "❄️ Frost protection required in your state" : "☀️ No frost-line concerns in your state"}</div>}
      {st && zip && !metro.label && <div style={{ marginTop: 10, fontSize: 12, color: T.textMid }}>{STATES[st].frost ? "❄️ Frost protection required in your state" : "☀️ No frost-line concerns in your state"} · State-average labor rate applied</div>}
    </Card>
  </>;

  /* ── STEP 1: TYPE + DIMS + SHAPE ── */
  const renderStep1 = () => <>
    <Card>
      <Ttl>Pool Type & Dimensions</Ttl>
      <Dsc>2026 installed costs for {STATES[st]?.name || "your state"}{metro.label ? ` (${metro.label})` : ""}. Fiberglass limited to 45×16×8.5.</Dsc>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {Object.entries(POOL_TYPES).map(([k, pt]) => <Opt key={k} sel={poolType === k} onClick={() => setPoolType(k)} style={{ flex: "1 1 145px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{pt.label}</div>
          <div style={{ fontSize: 10, color: T.textMid, marginTop: 1 }}>{pt.desc}</div>
          <div style={{ fontSize: 10, color: T.accent, fontWeight: 700, marginTop: 4 }}>{fmt(pt.sqftRate)}/sqft · Max {pt.maxL}×{pt.maxW}×{pt.maxDepth}</div>
        </Opt>)}
      </div>

      {/* #4: Pool shape selector */}
      <div style={{ fontSize: 12, fontWeight: 600, color: T.textMid, marginBottom: 8 }}>Pool Shape</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 18 }}>
        {Object.entries(POOL_SHAPES).map(([k, sh]) => <div key={k} onClick={() => setShape(k)} style={{ padding: "8px 10px", borderRadius: 8, border: shape === k ? `2px solid ${T.accent}` : `2px solid ${T.borderLight}`, background: shape === k ? T.accentLight : T.cardAlt, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transition: "all .15s" }}>
          <ShapeIcon shape={k} active={shape === k} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: shape === k ? T.accent : T.text }}>{sh.label}</div>
            {sh.factor < 1.0 && <div style={{ fontSize: 9, color: T.textDim }}>~{Math.round(sh.factor * 100)}% vol</div>}
          </div>
        </div>)}
      </div>

      <Slider label="Length" val={length} setter={setLength} min={10} max={80} warn={length > td.maxL} />
      <Slider label="Width" val={width} setter={setWidth} min={8} max={50} warn={width > td.maxW} />
      {/* #6: Safe depth setters */}
      <Slider label="Shallow End" val={shallowDepth} setter={setShallowSafe} min={3} max={5} stp={0.5} />
      <Slider label="Deep End" val={deepDepth} setter={setDeepSafe} min={3.5} max={12} stp={0.5} warn={deepDepth > td.maxDepth} />
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 11, color: T.textMid, marginBottom: 14 }}>
        <span>Surface: <strong style={{ color: T.accent }}>{sqft.toLocaleString()} sqft</strong></span>
        <span>Avg: <strong style={{ color: T.accent }}>{avgD.toFixed(1)} ft</strong></span>
        <span>Vol: <strong style={{ color: T.accent }}>{volume.toLocaleString()} gal</strong></span>
        <span>Excav: <strong style={{ color: T.accent }}>{Math.round(cuYd)} cu yd</strong></span>
        {shape !== "rectangle" && <span>Shape: <strong style={{ color: T.accent }}>{POOL_SHAPES[shape].label}</strong></span>}
      </div>
      <div style={{ background: T.cardAlt, borderRadius: 10, padding: "12px 4px 4px", border: `1px solid ${T.borderLight}` }}>
        <PoolDiagram length={cL} width={cW} shallowDepth={shallowDepth} deepDepth={cDeep} hasSpa={hasSpa} spaSize={spaSize} poolType={poolType} shape={shape} />
      </div>
    </Card>
    <Card><Ttl>Attached Spillover Spa</Ttl><Dsc>Custom-built into the pool shell — pricing varies by construction type. {poolType === "gunite" ? "Gunite spas are fully custom (rebar, shotcrete, tile) — most expensive but unlimited design." : poolType === "fiberglass" ? "Fiberglass spas are pre-molded factory shells — faster install, lower cost." : "Vinyl spas use a framed structure with liner — most affordable but liner needs periodic replacement."}</Dsc>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 8 }}>
        {Object.entries(SPA_SIZES).map(([k, sp]) => <Opt key={k} sel={spaSize === k} onClick={() => setSpaSize(k)}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{sp.label}</div>
          {sp.cost[poolType] > 0 && <div style={{ fontSize: 11, color: T.accent, fontWeight: 700, marginTop: 3 }}>{fmt(sp.cost[poolType])}</div>}
        </Opt>)}
      </div>
      {hasSpa && features.autocover && <div style={S.conflictBanner}>🛡️ <strong>Two auto covers required</strong> — Pool {fmt(12500)} + Spa {fmt(7500)} = <strong>{fmt(20000)}</strong></div>}
    </Card>
  </>;

  /* ── STEP 2: FEATURES + DECK ── */
  const renderStep2 = () => <>
    <Card><Ttl>Add-On Features</Ttl><Dsc>Toggle for live cost updates. 2026 installed pricing.</Dsc>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 6 }}>
        {FEATURES.filter(f => !f.guniteOnly || poolType === "gunite").map(f => <Chip key={f.id} on={features[f.id]} onClick={() => toggleFeat(f.id)}>
          <span style={{ fontSize: 15 }}>{f.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{f.label}{f.id === "autocover" && hasSpa ? " + Spa Cover" : ""}</div>
            <div style={{ fontSize: 10, color: features[f.id] ? T.accent : T.textDim, fontWeight: 600 }}>{f.id === "autocover" && hasSpa ? fmt(f.cost + 7500) : fmt(f.cost)}</div>
          </div>
        </Chip>)}
      </div>
      {hasSpa && features.autocover && <div style={S.conflictBanner}>🛡️ <strong>Two auto covers required</strong> — Pool {fmt(12500)} + Spa {fmt(7500)} = <strong>{fmt(20000)}</strong></div>}
      {/* #10: Feature conflict warnings */}
      {featureConflicts.map((w, i) => <div key={i} style={S.conflictBanner}>
        {w.icon} <strong>Heads up:</strong> {w.text}
      </div>)}
    </Card>
    {poolType === "gunite" && <Card><Ttl>Interior Finish</Ttl><Dsc>Covers pool floor and walls ({Math.round(totalFinishSqft)} total sqft — slope-adjusted). PebbleTec is the most popular premium upgrade.</Dsc>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(165px,1fr))", gap: 8 }}>
        {Object.entries(FINISH_OPTIONS).map(([k, f]) => <Opt key={k} sel={finishType === k} onClick={() => setFinishType(k)}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{f.label}</div>
          <div style={{ fontSize: 10, color: T.accent, fontWeight: 700, marginTop: 2 }}>{fmt(f.rate)}/sqft · {fmt(Math.round(totalFinishSqft * f.rate * lab))} total</div>
        </Opt>)}
      </div>
    </Card>}
    <Card><Ttl>Pool Decking</Ttl><Dsc>Concrete is budget-friendly and durable. Premium pavers at 2–3× the cost.</Dsc>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8, marginBottom: 12 }}>
        {Object.entries(DECK_OPTIONS).map(([k, d]) => <Opt key={k} sel={deckType === k} onClick={() => setDeckType(k)}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{d.label}</div>
          <div style={{ fontSize: 10, color: T.accent, fontWeight: 700, marginTop: 2 }}>{d.rate > 0 ? `${fmt(d.rate)}/sqft` : "—"}</div>
        </Opt>)}
      </div>
      {deckType !== "none" && <Slider label="Deck Area" val={deckSqft} setter={setDeckSqft} min={200} max={2500} stp={50} suffix={`sqft · ${fmt(deckCost)}`} />}
    </Card>
  </>;

  /* ── STEP 3: RESULTS ── */
  const bRows = [
    { l: `${td.label} Shell (${Math.round(surfaceSqft)} sqft)`, v: shell, c: T.accent },
    { l: `Excavation (${Math.round(cuYd)} cu yd)`, v: excav, c: T.warn },
    ...(depthEng > 0 ? [{ l: `⚠️ Deep End Engineering (${cDeep}ft)`, v: depthEng, c: T.danger, h: true }] : []),
    ...(soilTot > 0 ? [{ l: "Soil Engineering*", v: soilTot, c: T.warn, h: false }] : []),
    { l: "Plumbing & Equipment", v: plumb, c: "#059669" },
    { l: "Electrical", v: elec, c: "#7c3aed" },
    ...(poolType === "gunite" ? [{ l: `${FINISH_OPTIONS[finishType]?.label || "Interior"} (${Math.round(totalFinishSqft)} sqft)`, v: inter, c: "#db2777" }] : []),
    ...(hasSpa ? [{ l: `Spa (${SPA_SIZES[spaSize].label})`, v: spaCost, c: T.warn }] : []),
    ...(poolCoverCost > 0 ? [{ l: "🛡️ Auto Safety Cover — Pool", v: poolCoverCost, c: "#059669" }] : []),
    ...(spaAC > 0 ? [{ l: "🛡️ Auto Safety Cover — Spa", v: spaAC, c: "#059669" }] : []),
    ...(featCost > 0 ? [{ l: "Add-Ons", v: featCost, c: "#ea580c" }] : []),
    ...(deckCost > 0 ? [{ l: `${DECK_OPTIONS[deckType].label} Deck`, v: deckCost, c: "#0d9488" }] : []),
    { l: "Permits & Inspections", v: permits, c: "#4f46e5" },
    ...(frostC > 0 ? [{ l: "❄️ Frost Protection", v: frostC, c: T.accent }] : []),
    { l: `Contingency (${Math.round(contRate * 100)}%)`, v: cont, c: T.textDim },
  ];
  const maxR = Math.max(...bRows.map(r => r.v));

  const renderResults = () => <div>
    {applied && <div style={{ textAlign: "center", padding: "9px 14px", background: T.successBg, border: `1px solid ${T.successBorder}`, borderRadius: 8, marginBottom: 12, fontSize: 12, fontWeight: 700, color: T.success, animation: "fadeUp .3s ease" }}>✓ Tip applied — estimate updated</div>}

    {/* #7: State changed notification */}
    {stateChanged && <div style={{ textAlign: "center", padding: "9px 14px", background: T.warnBg, border: `1px solid ${T.warnBorder}`, borderRadius: 8, marginBottom: 12, fontSize: 12, fontWeight: 700, color: T.warn, animation: "fadeUp .3s ease" }}>📍 State changed to {STATES[st]?.name} — estimate recalculated</div>}

    {/* Total */}
    <div data-estimate-card style={{ position: "relative", textAlign: "center", padding: "40px 24px 32px", background: T.text, color: "#fff", borderRadius: 18, marginBottom: 16, boxShadow: "0 2px 4px rgba(10,10,10,0.08), 0 24px 48px -8px rgba(10,10,10,0.24)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 85% 20%, rgba(15,76,92,0.35) 0%, transparent 55%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Estimated Build</div>
      <div style={{ position: "relative", fontSize: "clamp(44px,10vw,76px)", fontWeight: 500, color: "#fff", margin: "8px 0 2px", fontVariantNumeric: "tabular-nums", fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.035em", lineHeight: 1 }}>{fmt(animTotal)}</div>
      <div style={{ position: "relative", fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em", marginTop: 6 }}>{fmt(total / sqft)}/sqft · {td.label}{hasSpa ? " + Spa" : ""}{metro.label ? ` · ${metro.label}` : ""}</div>
      <div style={{ position: "relative", margin: "24px auto 4px", maxWidth: 360 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 500 }}>Contractor Quote Range</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{fmt(total * 0.87)}</span>
          <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.15)", position: "relative", borderRadius: 1 }}>
            <div style={{ position: "absolute", left: "50%", transform: "translate(-50%,-50%)", top: "50%", width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{fmt(total * 1.18)}</span>
        </div>
      </div>
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
        <select value={st} onChange={e => setSt(e.target.value)} style={{ padding: "8px 30px 8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, fontWeight: 500, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23ffffff99'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", cursor: "pointer", outline: "none" }}>
          {Object.entries(STATES).map(([code, s]) => <option key={code} value={code} style={{ color: T.text }}>{s.name}</option>)}
        </select>
        {STATES[st]?.frost && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Frost state</span>}
        {contRate > baseContRate && <span style={{ fontSize: 11, color: "#F5C978", fontWeight: 500 }}>{Math.round(contRate * 100)}% contingency</span>}
      </div>
    </div>

    {/* #12: Lead capture CTA — microcopy + trust signals tightened per Gemini's review */}
    <Card style={{ borderColor: T.accent, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)` }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>🏗️ Match Me With 3 {STATES[st]?.name || "Local"} Pool Builders</div>
      <div style={{ fontSize: 11, color: T.textMid, lineHeight: 1.6, marginBottom: 12 }}>We share your build specs with 3 top-rated contractors in your area who build {td.label.toLowerCase()} pools — they bid against each other. No phone calls until you say so. Your email is never sold.</div>
      {!leadSubmitted ? <><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input value={leadEmail} onChange={e => setLeadEmail(e.target.value)} placeholder="your@email.com" type="email" style={{ flex: "1 1 200px", padding: "11px 14px", borderRadius: 9, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        <button onClick={() => {
          if (!leadEmail.includes("@")) return;
          setLeadSubmitted(true);
          if (typeof window.gtag === "function") window.gtag("event", "lead_submitted", { state: st, pool_type: poolType, estimate: Math.round(total) });
          fetch("https://script.google.com/macros/s/AKfycbzPpHWMgtvWn9ZxV-URWZw4OTLYA7t97FkWHLYsULdIZGU0xuGYHzgQVDCSnRxch0RE/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: leadEmail,
              state: STATES[st]?.name || st,
              zip: zip || "—",
              metro: metro.label || "—",
              poolType: td?.label || poolType,
              shape: POOL_SHAPES[shape]?.label || shape,
              length: cL,
              width: cW,
              sqft,
              shallowDepth,
              deepDepth: cDeep,
              soil: SOIL_TYPES[soil]?.label || soil,
              spa: SPA_SIZES[spaSize]?.label || "None",
              finish: poolType === "gunite" ? (FINISH_OPTIONS[finishType]?.label || finishType) : "—",
              deck: DECK_OPTIONS[deckType]?.label || "None",
              deckSqft: deckType !== "none" ? deckSqft : 0,
              features: Object.entries(features).filter(([,v]) => v).map(([k]) => FEATURES.find(f => f.id === k)?.label || k).join(", ") || "None",
              estimateLow: fmt(total * 0.87),
              estimate: fmt(total),
              estimateHigh: fmt(total * 1.18),
              perSqft: fmt(total / sqft),
            }),
          }).catch(() => {});
        }} style={{ padding: "13px 24px", borderRadius: 10, border: "none", fontWeight: 600, fontSize: 14, letterSpacing: "-0.005em", background: T.text, color: "#fff", cursor: "pointer", boxShadow: "0 1px 2px rgba(10,10,10,0.08), 0 4px 16px rgba(10,10,10,0.08)", whiteSpace: "nowrap" }}>Send My Itemized Quote →</button>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 10, fontSize: 10, color: T.textDim, fontWeight: 600 }}>
        <span>🔒 Email never sold</span>
        <span>📞 No calls until you ask</span>
        <span>✓ Free forever</span>
      </div></> : <div style={{ padding: "12px 16px", background: T.successBg, border: `1px solid ${T.successBorder}`, borderRadius: 9, fontSize: 13, fontWeight: 700, color: T.success }}>✓ We'll be in touch within 24 hours with quotes from {STATES[st]?.name} builders.</div>}
    </Card>

    {/* Quick Summary */}
    <Card>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 10 }}>Quick Summary</div>
      <div style={{ fontSize: 12, color: T.textMid, lineHeight: 2 }}>
        {[["Pool Shell", shell], ["Excavation", excav], ...(depthEng > 0 ? [["Deep End Eng.", depthEng]] : []), ...(soilTot > 0 ? [["Soil Engineering*", soilTot]] : []), ["Plumbing & Equip.", plumb], ["Electrical", elec], [FINISH_OPTIONS[finishType]?.label || "Finish", inter], ...(hasSpa ? [["Spa", spaCost]] : []), ...(poolCoverCost > 0 ? [["Pool Cover", poolCoverCost]] : []), ...(spaAC > 0 ? [["Spa Cover", spaAC]] : []), ...(featCost > 0 ? [["Features", featCost]] : []), ...(deckCost > 0 ? [["Decking", deckCost]] : []), ["Permits", permits], ...(frostC > 0 ? [["Frost", frostC]] : []), [`Contingency (${Math.round(contRate * 100)}%)`, cont]].map(([l, v]) => <div key={l} style={{ display: "flex", justifyContent: "space-between" }}><span>{l}</span><strong style={{ color: T.text }}>{fmt(v)}</strong></div>)}
        <div style={{ borderTop: `1px solid ${T.borderLight}`, marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700, color: T.text }}>Total</span><strong style={{ color: T.accent, fontSize: 15 }}>{fmt(total)}</strong></div>
      </div>
    </Card>

    {/* Diagram */}
    <Card style={{ padding: "16px 8px 8px" }}><div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8, paddingLeft: 14 }}>Your Pool Layout</div><PoolDiagram length={cL} width={cW} shallowDepth={shallowDepth} deepDepth={cDeep} hasSpa={hasSpa} spaSize={spaSize} poolType={poolType} shape={shape} /></Card>

    {/* Breakdown */}
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><Ttl>Cost Breakdown</Ttl><button onClick={() => setShowBrk(!showBrk)} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${T.border}`, background: T.cardAlt, color: T.textMid, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>{showBrk ? "Collapse" : "Expand"}</button></div>
      {showBrk && bRows.map((r, i) => <div key={i} style={{ display: "flex", alignItems: "center", padding: r.h ? "8px 10px" : "8px 0", borderBottom: `1px solid ${T.borderLight}`, background: r.h ? T.dangerBg : "transparent", borderRadius: r.h ? 6 : 0, gap: 6 }}>
        <div style={{ flex: 1, fontSize: 11, color: r.h ? T.danger : T.textMid, fontWeight: r.h ? 700 : 500, minWidth: 0 }}>{r.l}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: r.h ? T.danger : T.text, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{fmt(r.v)}</div>
        <div style={{ width: 60, height: 5, borderRadius: 3, background: T.bg2, flexShrink: 0 }}><div style={{ width: `${Math.min((r.v / maxR) * 100, 100)}%`, height: "100%", borderRadius: 3, background: r.c, transition: "width .4s ease" }} /></div>
      </div>)}
    </Card>


    {/* Savings */}
    <Card style={{ borderColor: T.successBorder }}><div style={{ fontSize: 16, fontWeight: 700, color: T.success, marginBottom: 2 }}>💰 Top 3 Ways to Save</div><Dsc>Personalized to your build. Green buttons apply instantly.</Dsc><SavingsTips poolType={poolType} features={features} soil={soil} spaSize={spaSize} deckType={deckType} deckSqft={deckSqft} frost={frostC} length={cL} width={cW} deepDepth={cDeep} shallowDepth={shallowDepth} onApply={handleApply} /></Card>

    {/* #18: Ongoing costs */}
    <OngoingCostsBanner sqft={sqft} volume={volume} features={features} hasSpa={hasSpa} frost={sd.frost} />

    {/* Adjust */}
    <Card><Ttl>Adjust Your Build</Ttl><Dsc>Change anything — total updates live.</Dsc>{renderStep1()}{renderStep2()}</Card>

    {/* #17: Financing */}
    <FinancingBanner total={total} />

    {/* #13: Share + Start Over */}
    <div style={{ textAlign: "center", margin: "14px 0", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
      <ShareButton total={total} poolType={poolType} st={st} sqft={sqft} hasSpa={hasSpa} spaSize={spaSize} />
    </div>

  </div>;

  const steps = [renderStep0, renderStep1, renderStep2, renderResults];
  const stepNames = ["Location", "Pool Size & Spa", "Features", "Your Estimate"];

  return <div style={{ minHeight: "100vh", fontFamily: "'Inter',system-ui,-apple-system,sans-serif", color: T.text }}>
    {!hideNav && <Helmet>
      <title>Pool Cost Calculator 2026 — How Much Does a Pool Cost in Your State?</title>
      <meta name="description" content="Free pool cost calculator for 2026. Get an instant estimate for gunite, fiberglass, or vinyl pools — adjusted for your state and build specs. Accurate pricing in under 2 minutes." />
      <link rel="canonical" href="https://www.priceapool.com/" />
      <meta property="og:title" content="Pool Cost Calculator 2026 — How Much Does a Pool Cost?" />
      <meta property="og:description" content="Free instant pool cost estimate adjusted for your state and build. Gunite, fiberglass, and vinyl pricing in under 2 minutes." />
      <meta property="og:url" content="https://www.priceapool.com/" />
    </Helmet>}
    <style>{`
      .pool-slider{-webkit-appearance:none;appearance:none;width:100%;height:44px;background:transparent;outline:none;cursor:pointer;margin:0;padding:0;touch-action:pan-x;-webkit-tap-highlight-color:transparent}
      .pool-slider::-webkit-slider-runnable-track{height:8px;border-radius:999px;background:linear-gradient(to right, ${T.accent} 0%, ${T.accent} var(--fill, 50%), ${T.border} var(--fill, 50%), ${T.border} 100%);transition:background .15s ease}
      .pool-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:24px;height:24px;border-radius:50%;background:#fff;border:3px solid ${T.accent};cursor:pointer;box-shadow:0 2px 6px rgba(15,76,92,0.28),0 1px 2px rgba(10,10,10,0.08);margin-top:-8px;position:relative;transition:transform .15s ease, box-shadow .15s ease}
      .pool-slider::-moz-range-track{height:8px;border-radius:999px;background:linear-gradient(to right, ${T.accent} 0%, ${T.accent} var(--fill, 50%), ${T.border} var(--fill, 50%), ${T.border} 100%)}
      .pool-slider::-moz-range-thumb{width:24px;height:24px;border-radius:50%;background:#fff;border:3px solid ${T.accent};cursor:pointer;box-shadow:0 2px 6px rgba(15,76,92,0.28);transition:transform .15s ease, box-shadow .15s ease}
      .pool-slider:hover::-webkit-slider-thumb{transform:scale(1.12);box-shadow:0 4px 12px rgba(15,76,92,0.32),0 0 0 8px rgba(15,76,92,0.08)}
      .pool-slider:hover::-moz-range-thumb{transform:scale(1.12);box-shadow:0 4px 12px rgba(15,76,92,0.32),0 0 0 8px rgba(15,76,92,0.08)}
      .pool-slider:active::-webkit-slider-thumb{transform:scale(1.08)}
      .pool-slider:active::-moz-range-thumb{transform:scale(1.08)}
      *{box-sizing:border-box;margin:0}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px}
      @media print{.no-print{display:none!important}body{background:#fff!important}}
    `}</style>
    {/* NAV */}
    {!hideNav && <nav className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, background: "rgba(250,248,243,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.borderLight}` }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ display: "block" }}>
          <circle cx="14" cy="14" r="14" fill={T.text} />
          <path d="M6 15.5 Q 9 13, 12 15.5 T 18 15.5 T 24 15.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 19.5 Q 9 17, 12 19.5 T 18 19.5 T 24 19.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        </svg>
        <span style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Fraunces',Georgia,serif" }}>PriceAPool</span>
      </Link>
      <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <Link to="/pool-cost-by-state" style={{ fontSize: 13, color: T.textMid, textDecoration: "none", fontWeight: 500 }}>By State</Link>
        <Link to="/builds" style={{ fontSize: 13, color: T.textMid, textDecoration: "none", fontWeight: 500 }}>Builds</Link>
        <Link to="/blog/fiberglass-vs-gunite-vs-vinyl" style={{ fontSize: 13, color: T.textMid, textDecoration: "none", fontWeight: 500 }}>Guides</Link>
        <Link to="/blog/inground-pool-cost-guide" style={{ fontSize: 13, color: T.textMid, textDecoration: "none", fontWeight: 500 }}>Cost Data</Link>
        <a href="https://priceadeck.com" style={{ fontSize: 13, color: T.textMid, textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>Deck Costs<span style={{ fontSize: 9, color: T.accent, fontWeight: 700, background: T.accentLight, padding: "2px 5px", borderRadius: 4 }}>NEW</span></a>
      </div>
    </nav>}
    {step < 3 && !hideNav && <div style={{ textAlign: "center", padding: "72px 20px 24px", maxWidth: 840, margin: "0 auto" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20 }}>Pool Cost Estimator · 2026</div>
      <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: 500, color: T.text, letterSpacing: "-0.035em", lineHeight: 1.02, fontFamily: "'Fraunces',Georgia,serif" }}>How much does a pool <em style={{ fontStyle: "italic", fontWeight: 400 }}>really</em> cost?</h1>
      <p style={{ fontSize: 17, color: T.textMid, marginTop: 20, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55, fontWeight: 400 }}>An honest estimate in under two minutes — priced against 2026 labor rates in your state and metro.</p>
    </div>}
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, margin: "16px 0 20px" }}>
        {stepNames.map((s, i) => <div key={i} onClick={() => i < step && setStep(i)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 100, background: step === i ? T.text : i < step ? T.bg2 : "transparent", border: step === i ? `1px solid ${T.text}` : `1px solid ${T.borderLight}`, cursor: i < step ? "pointer" : "default", transition: "all .15s" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: i < step ? T.text : step === i ? "rgba(255,255,255,0.15)" : T.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: i < step ? "#fff" : step === i ? "#fff" : T.textDim }}>{i < step ? "✓" : i + 1}</div>
          <span style={{ fontSize: 12, fontWeight: 500, color: step === i ? "#fff" : i < step ? T.textMid : T.textDim, display: step === i || i < step ? "inline" : "none" }}>{s}</span>
        </div>)}
      </div>
      <div key={step} style={{ animation: "fadeUp .3s ease", maxWidth: 720, margin: "0 auto" }}>
        {steps[step]()}
      </div>
      {step < 3 && <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
        <Btn pri={false} dis={step === 0} onClick={() => step > 0 && setStep(step - 1)}>← Back</Btn>
        <Btn pri={true} dis={!canNext} onClick={() => canNext && setStep(step + 1)}>{step === 2 ? "Get Estimate →" : "Next →"}</Btn>
      </div>}
      {step === 3 && <div style={{ textAlign: "center", margin: "14px 0" }}><Btn pri={false} onClick={() => setStep(0)}>← Start Over</Btn></div>}
    </div>
    <div style={{ maxWidth: 1080, margin: "56px auto 8px", padding: "0 16px" }}>
      <figure style={{ margin: 0 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 24px 60px -20px rgba(10,10,10,0.22)", aspectRatio: "16 / 9", background: T.bg2 }}>
          <picture>
            <source type="image/avif" srcSet="/hero-pool-800.avif 800w, /hero-pool-1600.avif 1600w" sizes="(max-width: 768px) 800px, 1600px" />
            <img src="/hero-pool.jpg" alt="A family playing in a modern backyard swimming pool at golden hour" loading="lazy" decoding="async" width="1600" height="893" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </picture>
        </div>
        <figcaption style={{ fontSize: 12, color: T.textDim, marginTop: 10, textAlign: "center", fontStyle: "italic" }}>An honest estimate now. A real pool, later.</figcaption>
      </figure>
    </div>
    <footer style={{ marginTop: 40, borderTop: `1px solid ${T.border}`, background: T.bg2 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 28, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Pool Guides</div>
            {[
              { to: "/blog/fiberglass-vs-gunite-vs-vinyl", label: "Fiberglass vs Gunite vs Vinyl" },
              { to: "/blog/inground-pool-cost-guide", label: "Pool Cost Guide 2026" },
              { to: "/blog/pool-cost-by-size", label: "Pool Cost by Size" },
              { to: "/blog/how-long-to-build-a-pool", label: "How Long to Build a Pool" },
              { to: "/blog/pool-financing-guide", label: "Pool Financing Guide" },
            ].map(({ to, label }) => (
              <div key={to} style={{ marginBottom: 6 }}><Link to={to} style={{ fontSize: 12, color: T.textMid, textDecoration: "none" }}>{label}</Link></div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Pool Types</div>
            {[
              { to: "/blog/gunite-pool-guide", label: "Gunite Pool Guide" },
              { to: "/blog/fiberglass-pool-guide", label: "Fiberglass Pool Guide" },
              { to: "/blog/vinyl-liner-pool-guide", label: "Vinyl Liner Pool Guide" },
              { to: "/blog/pool-permits-and-regulations", label: "Pool Permits Guide" },
              { to: "/blog/does-a-pool-add-home-value", label: "Pool ROI & Home Value" },
            ].map(({ to, label }) => (
              <div key={to} style={{ marginBottom: 6 }}><Link to={to} style={{ fontSize: 12, color: T.textMid, textDecoration: "none" }}>{label}</Link></div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Popular States</div>
            {[
              { to: "/florida", label: "Pool Cost in Florida" },
              { to: "/texas", label: "Pool Cost in Texas" },
              { to: "/california", label: "Pool Cost in California" },
              { to: "/arizona", label: "Pool Cost in Arizona" },
              { to: "/georgia", label: "Pool Cost in Georgia" },
              { to: "/north-carolina", label: "Pool Cost in North Carolina" },
              { to: "/tennessee", label: "Pool Cost in Tennessee" },
              { to: "/colorado", label: "Pool Cost in Colorado" },
            ].map(({ to, label }) => (
              <div key={to} style={{ marginBottom: 6 }}><Link to={to} style={{ fontSize: 12, color: T.textMid, textDecoration: "none" }}>{label}</Link></div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>More States</div>
            {[
              { to: "/new-york", label: "Pool Cost in New York" },
              { to: "/pennsylvania", label: "Pool Cost in Pennsylvania" },
              { to: "/ohio", label: "Pool Cost in Ohio" },
              { to: "/illinois", label: "Pool Cost in Illinois" },
              { to: "/washington", label: "Pool Cost in Washington" },
              { to: "/nevada", label: "Pool Cost in Nevada" },
              { to: "/new-jersey", label: "Pool Cost in New Jersey" },
              { to: "/virginia", label: "Pool Cost in Virginia" },
            ].map(({ to, label }) => (
              <div key={to} style={{ marginBottom: 6 }}><Link to={to} style={{ fontSize: 12, color: T.textMid, textDecoration: "none" }}>{label}</Link></div>
            ))}
          </div>
        </div>
        <BrowseByState variant="footer" />
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16, fontSize: 10, color: T.textDim, lineHeight: 1.8, textAlign: "center" }}>
          Estimates based on 2026 national averages adjusted for state, metro area, and scope. Actual costs vary by contractor, site, soil conditions, and materials. Always get 3+ written bids.<br />
          Also from us: <a href="https://priceadeck.com" style={{ color: T.accent, fontWeight: 600, textDecoration: "none" }}>PriceADeck.com</a> — deck cost calculator.<br />
          © 2026 PriceAPool.com
        </div>
      </div>
    </footer>
  </div>;
}
