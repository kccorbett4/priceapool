#!/usr/bin/env node
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import fs from "node:fs";
import path from "node:path";

const propertyId = process.env.GA4_PROPERTY_ID;
if (!propertyId) {
  console.error("GA4_PROPERTY_ID env var is required (the numeric property id, not G-XXXX).");
  process.exit(1);
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS env var must point to the service-account JSON key.");
  process.exit(1);
}

const days = Number(process.argv[2] || 30);
const startDate = `${days}daysAgo`;
const endDate = "today";

const client = new BetaAnalyticsDataClient();
const property = `properties/${propertyId}`;

async function runReport(name, request) {
  const start = Date.now();
  try {
    const [response] = await client.runReport({ property, ...request });
    console.log(`  ok  ${name.padEnd(20)} ${response.rows?.length ?? 0} rows  (${Date.now() - start}ms)`);
    return response;
  } catch (err) {
    console.error(`  FAIL ${name}: ${err.message}`);
    return { error: err.message };
  }
}

console.log(`Pulling ${days} days of data (${startDate} → ${endDate}) from property ${propertyId}`);

const reports = {};

reports.events = await runReport("events", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "eventName" }],
  metrics: [{ name: "eventCount" }, { name: "totalUsers" }, { name: "eventCountPerUser" }],
  orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  limit: 100,
});

reports.acquisition = await runReport("acquisition", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "sessionDefaultChannelGroup" }, { name: "sessionSource" }, { name: "sessionMedium" }],
  metrics: [
    { name: "sessions" },
    { name: "totalUsers" },
    { name: "engagedSessions" },
    { name: "engagementRate" },
    { name: "averageSessionDuration" },
  ],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 100,
});

reports.pages = await runReport("pages", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "pagePath" }],
  metrics: [
    { name: "screenPageViews" },
    { name: "totalUsers" },
    { name: "averageSessionDuration" },
    { name: "engagementRate" },
  ],
  orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  limit: 200,
});

reports.geography = await runReport("geography", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "country" }, { name: "region" }],
  metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "engagementRate" }],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 200,
});

reports.device = await runReport("device", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "deviceCategory" }],
  metrics: [
    { name: "sessions" },
    { name: "totalUsers" },
    { name: "engagementRate" },
    { name: "averageSessionDuration" },
  ],
});

reports.landing_pages = await runReport("landing_pages", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "landingPage" }],
  metrics: [
    { name: "sessions" },
    { name: "engagedSessions" },
    { name: "engagementRate" },
    { name: "averageSessionDuration" },
  ],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 100,
});

reports.daily = await runReport("daily", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "date" }],
  metrics: [
    { name: "totalUsers" },
    { name: "sessions" },
    { name: "screenPageViews" },
    { name: "engagementRate" },
  ],
  orderBys: [{ dimension: { dimensionName: "date" } }],
  limit: 400,
});

reports.funnel_by_channel = await runReport("funnel_by_channel", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "sessionDefaultChannelGroup" }, { name: "eventName" }],
  metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
  dimensionFilter: {
    filter: {
      fieldName: "eventName",
      inListFilter: {
        values: [
          "page_view",
          "calculator_step1_complete",
          "calculator_step2_complete",
          "calculator_complete",
          "lead_submitted",
        ],
      },
    },
  },
  orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  limit: 200,
});

reports.lead_pages = await runReport("lead_pages", {
  dateRanges: [{ startDate, endDate }],
  dimensions: [{ name: "pagePath" }, { name: "eventName" }],
  metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
  dimensionFilter: {
    filter: {
      fieldName: "eventName",
      inListFilter: {
        values: ["calculator_step1_complete", "calculator_complete", "lead_submitted"],
      },
    },
  },
  orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  limit: 200,
});

const todayStr = new Date().toISOString().slice(0, 10);
const outDir = path.join("analytics", `${todayStr}_${days}d`);
fs.mkdirSync(outDir, { recursive: true });

function reportToCsv(report) {
  if (report.error) return `error: ${report.error}\n`;
  if (!report.rows?.length) return "no data\n";
  const headers = [
    ...(report.dimensionHeaders ?? []).map((h) => h.name),
    ...(report.metricHeaders ?? []).map((h) => h.name),
  ];
  const rows = report.rows.map((r) =>
    [
      ...(r.dimensionValues ?? []).map((v) => `"${(v.value || "").replace(/"/g, '""')}"`),
      ...(r.metricValues ?? []).map((v) => v.value ?? ""),
    ].join(","),
  );
  return [headers.join(","), ...rows].join("\n") + "\n";
}

for (const [name, report] of Object.entries(reports)) {
  fs.writeFileSync(path.join(outDir, `${name}.csv`), reportToCsv(report));
  fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(report, null, 2));
}

const summary = {
  pulled_at: new Date().toISOString(),
  property_id: propertyId,
  days,
  date_range: { start: startDate, end: endDate },
  reports: Object.fromEntries(
    Object.entries(reports).map(([name, r]) => [
      name,
      r.error ? { error: r.error } : { rows: r.rows?.length ?? 0 },
    ]),
  ),
};
fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));

console.log(`\nSaved ${Object.keys(reports).length} reports to ${outDir}/`);
console.log("Files:");
for (const name of Object.keys(reports)) {
  console.log(`  ${outDir}/${name}.csv  +  ${name}.json`);
}
