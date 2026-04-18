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
    ? { padding: "18px 16px 6px", borderTop: "1px solid #e2ddd6", marginTop: 24 }
    : { background: "#ffffff", border: "1px solid #e2ddd6", borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };

  const heading = variant === 'footer'
    ? { fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12, textAlign: "center" }
    : { fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 12 };

  const linkStyle = {
    fontSize: 12,
    color: "#475569",
    textDecoration: "none",
    padding: "4px 8px",
    borderRadius: 6,
    display: "block",
    lineHeight: 1.4,
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
