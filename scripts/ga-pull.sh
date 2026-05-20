#!/usr/bin/env bash
# Wrapper for ga-pull.mjs. Usage: ./scripts/ga-pull.sh [days]
# Defaults to 30 days. Reads GA4_PROPERTY_ID from this file.

set -euo pipefail

GA4_PROPERTY_ID="${GA4_PROPERTY_ID:-531195334}"
KEY_PATH="${KEY_PATH:-$HOME/.gcp/priceapool-ga-key.json}"

if [[ ! -f "$KEY_PATH" ]]; then
  echo "Service account key not found at $KEY_PATH"
  exit 1
fi

DAYS="${1:-30}"
cd "$(dirname "$0")/.."
GA4_PROPERTY_ID="$GA4_PROPERTY_ID" \
GOOGLE_APPLICATION_CREDENTIALS="$KEY_PATH" \
  node scripts/ga-pull.mjs "$DAYS"
