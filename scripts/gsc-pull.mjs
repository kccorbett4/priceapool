#!/usr/bin/env node
// Pull Google Search Console data for all properties the service account has access to.
// Saves reports per-site to analytics/<date>_<days>d/gsc/<site-slug>/

import { google } from "googleapis";
import fs from "node:fs";
import path from "node:path";

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GSC_ACCESS_TOKEN) {
  console.error("Need GOOGLE_APPLICATION_CREDENTIALS (service account) or GSC_ACCESS_TOKEN (one-time OAuth token).");
  process.exit(1);
}

const days = Number(process.argv[2] || 90);

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
const endDate = isoDate(new Date());
const startDate = isoDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));

let auth;
if (process.env.GSC_ACCESS_TOKEN) {
  const oauth2 = new google.auth.OAuth2();
  oauth2.setCredentials({ access_token: process.env.GSC_ACCESS_TOKEN });
  auth = oauth2;
  console.log("Using GSC_ACCESS_TOKEN (one-time OAuth token)");
} else {
  auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
}
const webmasters = google.webmasters({ version: "v3", auth });

function slugifySite(siteUrl) {
  return siteUrl
    .replace(/^sc-domain:/, "domain-")
    .replace(/^https?:\/\//, "")
    .replace(/[\/:]/g, "_")
    .replace(/_+$/, "");
}

async function runReport(siteUrl, name, body) {
  const start = Date.now();
  try {
    const res = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: { startDate, endDate, rowLimit: 1000, ...body },
    });
    const rows = res.data.rows ?? [];
    console.log(`    ok  ${name.padEnd(20)} ${rows.length} rows  (${Date.now() - start}ms)`);
    return { rows, dimensions: body.dimensions ?? [] };
  } catch (err) {
    console.error(`    FAIL ${name}: ${err.message}`);
    return { error: err.message };
  }
}

function reportToCsv(report) {
  if (report.error) return `error: ${report.error}\n`;
  if (!report.rows?.length) return "no data\n";
  const dims = report.dimensions ?? [];
  const headers = [...dims, "clicks", "impressions", "ctr", "position"];
  const rows = report.rows.map((r) => {
    const keys = r.keys ?? [];
    const cells = [
      ...keys.map((k) => `"${(k || "").replace(/"/g, '""')}"`),
      r.clicks ?? 0,
      r.impressions ?? 0,
      r.ctr ?? 0,
      r.position ?? 0,
    ];
    return cells.join(",");
  });
  return [headers.join(","), ...rows].join("\n") + "\n";
}

const todayStr = isoDate(new Date());
const outRoot = path.join("analytics", `${todayStr}_${days}d`, "gsc");
fs.mkdirSync(outRoot, { recursive: true });

console.log(`Listing Search Console sites accessible to service account...`);
let sites;
try {
  const list = await webmasters.sites.list();
  sites = (list.data.siteEntry ?? []).filter((s) => s.permissionLevel !== "siteUnverifiedUser");
} catch (err) {
  console.error(`FAIL: ${err.message}`);
  process.exit(1);
}

if (!sites.length) {
  console.error("\nNo Search Console sites accessible. Did you add the service account to a property in Search Console?");
  console.error("Service account email: priceapool-ga-reader@healthy-fuze-496903-p0.iam.gserviceaccount.com");
  process.exit(1);
}

console.log(`Found ${sites.length} accessible site(s):`);
for (const s of sites) console.log(`  - ${s.siteUrl}  (${s.permissionLevel})`);

const allReports = {};

for (const site of sites) {
  const siteUrl = site.siteUrl;
  const slug = slugifySite(siteUrl);
  const siteOut = path.join(outRoot, slug);
  fs.mkdirSync(siteOut, { recursive: true });

  console.log(`\nPulling ${siteUrl} (${startDate} -> ${endDate})`);

  const reports = {};

  reports.queries = await runReport(siteUrl, "queries", {
    dimensions: ["query"],
  });

  reports.pages = await runReport(siteUrl, "pages", {
    dimensions: ["page"],
  });

  reports.queries_by_page = await runReport(siteUrl, "queries_by_page", {
    dimensions: ["page", "query"],
  });

  reports.countries = await runReport(siteUrl, "countries", {
    dimensions: ["country"],
  });

  reports.devices = await runReport(siteUrl, "devices", {
    dimensions: ["device"],
  });

  reports.daily = await runReport(siteUrl, "daily", {
    dimensions: ["date"],
  });

  reports.search_appearance = await runReport(siteUrl, "search_appearance", {
    dimensions: ["searchAppearance"],
  });

  for (const [name, report] of Object.entries(reports)) {
    fs.writeFileSync(path.join(siteOut, `${name}.csv`), reportToCsv(report));
    fs.writeFileSync(path.join(siteOut, `${name}.json`), JSON.stringify(report, null, 2));
  }

  allReports[siteUrl] = Object.fromEntries(
    Object.entries(reports).map(([name, r]) => [
      name,
      r.error ? { error: r.error } : { rows: r.rows?.length ?? 0 },
    ]),
  );
}

fs.writeFileSync(
  path.join(outRoot, "summary.json"),
  JSON.stringify(
    {
      pulled_at: new Date().toISOString(),
      days,
      date_range: { start: startDate, end: endDate },
      sites: allReports,
    },
    null,
    2,
  ),
);

console.log(`\nSaved Search Console reports to ${outRoot}/`);
