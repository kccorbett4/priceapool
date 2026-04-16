export const STATE_SLUGS = [
  "alabama","alaska","arizona","arkansas","california","colorado","connecticut",
  "delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa",
  "kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan",
  "minnesota","mississippi","missouri","montana","nebraska","nevada",
  "new-hampshire","new-jersey","new-mexico","new-york","north-carolina",
  "north-dakota","ohio","oklahoma","oregon","pennsylvania","rhode-island",
  "south-carolina","south-dakota","tennessee","texas","utah","vermont",
  "virginia","washington","west-virginia","wisconsin","wyoming","washington-dc"
];

export const BLOG_SLUGS = [
  "fiberglass-vs-gunite-vs-vinyl","inground-pool-cost-guide",
  "how-long-to-build-a-pool","pool-financing-guide","pool-cost-by-size",
  "pool-permits-and-regulations","gunite-pool-guide","fiberglass-pool-guide",
  "vinyl-liner-pool-guide","does-a-pool-add-home-value"
];

export const CITY_SLUGS = [
  "houston","dallas","phoenix","miami","orlando",
  "atlanta","charlotte","denver","las-vegas","nashville"
];

export function getAllPaths() {
  return [
    '/',
    '/pool-cost-by-state',
    '/pool-cost-data',
    ...STATE_SLUGS.map(s => `/${s}`),
    ...BLOG_SLUGS.map(s => `/blog/${s}`),
    ...CITY_SLUGS.map(s => `/city/${s}`),
  ];
}
