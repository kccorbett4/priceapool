import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import App from './App.jsx'

/* Map URL slugs to state codes */
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

const STATE_NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
  CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",
  HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",
  KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",
  MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",
  NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",
  NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",
  OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",
  SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",
  VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",
  DC:"Washington D.C.",
};

export default function StatePage() {
  const { stateSlug } = useParams();
  const code = SLUG_TO_CODE[stateSlug?.toLowerCase()];

  /* If slug doesn't match a state, redirect to home */
  if (!code) return <Navigate to="/" replace />;

  const name = STATE_NAMES[code];

  /* Update document head for SEO */
  useEffect(() => {
    document.title = `How Much Does a Pool Cost in ${name} (2026)? | PriceAPool.com`;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) el.setAttribute('content', content);
    };

    setMeta('name', 'description',
      `Free 2026 pool cost calculator for ${name}. Get instant estimates for gunite, fiberglass, and vinyl inground pools — adjusted for ${name} labor rates, permit fees, and soil conditions.`
    );
    setMeta('property', 'og:title', `Pool Cost Calculator for ${name} (2026)`);
    setMeta('property', 'og:description', `How much does a pool cost in ${name}? Free instant estimate adjusted for local labor, permits, and soil.`);
    setMeta('property', 'og:url', `https://priceapool.com/${stateSlug}`);

    /* Update canonical */
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://priceapool.com/${stateSlug}`);

    return () => {
      document.title = 'Pool Cost Calculator 2026 — How Much Does a Pool Cost in Your State?';
      if (canonical) canonical.setAttribute('href', 'https://priceapool.com/');
    };
  }, [name, stateSlug]);

  return <App initialState={code} />;
}
