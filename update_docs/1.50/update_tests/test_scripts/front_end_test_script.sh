#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
WEB_DIR="$ROOT_DIR/apps/web"

if [[ ! -d "$WEB_DIR" ]]; then
  echo "[ERROR] Web application directory not found at $WEB_DIR" >&2
  exit 1
fi

cd "$WEB_DIR"

echo "[1/4] Installing dependencies with npm ci"
npm ci

echo "[2/4] Running static analysis (eslint)"
npm run lint

echo "[3/4] Building production bundle to validate TypeScript contracts"
npm run build

PLAYWRIGHT_CONFIG="playwright.config.ts"
if [[ -f "$PLAYWRIGHT_CONFIG" ]]; then
  echo "[4/4] Launching Playwright end-to-end smoke tests"
  npx playwright install --with-deps
  npx playwright test --config="$PLAYWRIGHT_CONFIG" --project=chromium --reporter=list
else
  cat <<'MSG'
[WARN] Playwright configuration not detected (playwright.config.ts).
       Refer to update_docs/1.50/test_plan.md §5 to align the configuration
       before enabling E2E automation on local machines.
MSG
fi

echo "[SUCCESS] Frontend test pipeline completed"
