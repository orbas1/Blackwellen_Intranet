#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
MOBILE_DIR="$ROOT_DIR/apps/mobile"

declare -a DEVICES=("Pixel_7_API_34" "iPhone_14_16.4")

if [[ ! -d "$MOBILE_DIR" ]]; then
  echo "[ERROR] Mobile workspace missing at $MOBILE_DIR" >&2
  exit 1
fi

pushd "$MOBILE_DIR" >/dev/null

echo "[1/5] Installing dependencies"
npm install

echo "[2/5] Running lint checks"
npm run lint

echo "[3/5] Executing Jest unit tests"
npm test -- --runInBand --coverage

echo "[4/5] Building development clients for Detox"
npx expo prebuild --platform all --clean

for device in "${DEVICES[@]}"; do
  echo "[Detox] Testing on $device"
  npx detox test --configuration "release.$device" --record-logs failing --artifacts-location "artifacts/$device"
done

popd >/dev/null

echo "[SUCCESS] Mobile application QA suite complete"
