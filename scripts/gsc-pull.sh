#!/usr/bin/env bash
# Wrapper for gsc-pull.mjs. Usage: ./scripts/gsc-pull.sh [days]
# Defaults to 90 days.

set -euo pipefail

KEY_PATH="${KEY_PATH:-$HOME/.gcp/priceapool-ga-key.json}"

if [[ ! -f "$KEY_PATH" ]]; then
  echo "Service account key not found at $KEY_PATH"
  exit 1
fi

DAYS="${1:-90}"
cd "$(dirname "$0")/.."
GOOGLE_APPLICATION_CREDENTIALS="$KEY_PATH" node scripts/gsc-pull.mjs "$DAYS"
