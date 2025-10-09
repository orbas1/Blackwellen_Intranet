#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
WEB_DIR="$ROOT_DIR/apps/web"
MOBILE_DIR="$ROOT_DIR/apps/mobile"

log() {
  printf '%s %s\n' "[$(date '+%Y-%m-%dT%H:%M:%S%z')]" "$1"
}

log "Starting Version 1.50 build verification"

if [[ -d "$WEB_DIR" ]]; then
  log "Building web client"
  pushd "$WEB_DIR" >/dev/null
  npm ci
  npm run build
  popd >/dev/null
else
  log "WARN: Web directory missing at $WEB_DIR"
fi

if [[ -d "$MOBILE_DIR" ]]; then
  log "Building mobile client (Expo managed)"
  pushd "$MOBILE_DIR" >/dev/null
  npm install
  npm run generate:assets
  EXPO_NO_TELEMETRY=1 npx expo export --platform web --dump-sourcemap --output-dir dist
  popd >/dev/null
else
  log "WARN: Mobile directory missing at $MOBILE_DIR"
fi

log "Build verification complete"
