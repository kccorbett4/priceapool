import { Link } from 'react-router-dom';
import { STATE_SLUGS } from './routes.js';

// All 50 states + DC, alphabetized. Rendered on every page for internal-link equity
// to thin state pages and to give crawlers a full path to all state URLs.

const SLUG_TO_NAME = {
  "alabama":"Alabama","alaska":"Alaska","arizona":"Arizona","arkansas":"Arkansas",
  "california":"California","colorado":"Colorado","connecticut":"Connecticut",
  "delaware":"Delaware","florida":"Florida","georgia":"Georgia","hawaii":"Hawaii",
  "idaho":"Idaho","illinois":"Illinois","indiana":"Indiana","iowa":"Iowa",
  "kansas":"Kansas","kentucky":"Kentucky","louisiana":"Louisiana","maine":"Maine",
  "maryland":"Maryland","massachusetts":"Massachusetts","michigan":"Michigan",
  "minnesota":"Minnesota","mississippi":"Mississippi","missouri":"Missouri",
  "montana":"Montana","nebraska":"Nebraska","nevada":"Nevada",
  "new-hampshire":"New Hampshire","new-jersey":"New Jersey","new-mexico":"New Mexico",
  "new-york":"New York","north-carolina":"North Carolina","north-dakota":"North Dakota",
  "ohio":"Ohio","oklahoma":"Oklahoma","oregon":"Oregon","pennsylvania":"Pennsylvania",
  "rhode-island":"Rhode Island","south-carolina":"South Carolina",
  "south-dakota":"South Dakota","tennessee":"Tennessee","texas":"Texas","utah":"Utah",
  "vermont":"Vermont","virginia":"Virginia","washington":"Washington",
  "west-virginia":"West Virginia","wisconsin":"Wisconsin","wyoming":"Wyoming",
  "washington-dc":"Washington D.C.",
};

const ALPHABETIZED = [...STATE_SLUGS].sort((a, b) =>
  SLUG_TO_NAME[a].localeCompare(SLUG_TO_NAME[b])
);

export default function BrowseByState({ variant = 'card' }) {
  const outer = variant === 'footer'
    ? { padding: "24px 16px 8px", borderTop: "1px solid #E8E3D7", marginTop: 28 }
    : { background: "#FFFFFF", border: "1px solid #E8E3D7", borderRadius: 14, padding: 28, marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" };

  const heading = variant === 'footer'
    ? { fontSize: 11, fontWeight: 600, color: "#8A8A8A", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16, textAlign: "center" }
    : { fontSize: 22, fontWeight: 600, color: "#0A0A0A", marginBottom: 16, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.015em" };

  const linkStyle = {
    fontSize: 13,
    color: "#3D3D3D",
    textDecoration: "none",
    padding: "5px 8px",
    borderRadius: 6,
    display: "block",
    lineHeight: 1.45,
    fontWeight: 400,
    transition: "color .15s",
  };

  return (
    <nav aria-label="Pool cost by state" style={outer}>
      <div style={heading}>Browse Pool Costs by State</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 2,
        maxWidth: 960,
        margin: "0 auto",
      }}>
        {ALPHABETIZED.map(slug => (
          <Link key={slug} to={`/${slug}`} style={linkStyle}>
            {SLUG_TO_NAME[slug]}
          </Link>
        ))}
      </div>
    </nav>
  );
}
