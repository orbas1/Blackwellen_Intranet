#!/usr/bin/env bash
set -euo pipefail

MIGRATIONS_DIR="migrations/v150"
SEED_SCRIPT="scripts/seed-analytics.ts"

if [[ ! -d "$MIGRATIONS_DIR" ]]; then
  echo "[ERROR] Migration directory $MIGRATIONS_DIR not found. Run from database repository root." >&2
  exit 1
fi

psql "${PG_URL:-postgresql://qa:qa@localhost:5433/intranet_v150}" <<'SQL'
SET client_min_messages TO WARNING;
SELECT current_timestamp;
SQL

echo "[1/5] Applying migrations"
psql "$PG_URL" -v ON_ERROR_STOP=1 -f "$MIGRATIONS_DIR/main.sql"

echo "[2/5] Running anonymisation checks"
psql "$PG_URL" -f "$MIGRATIONS_DIR/anonymise.sql"

echo "[3/5] Executing verification queries"
psql "$PG_URL" -f "$MIGRATIONS_DIR/verification.sql"

echo "[4/5] Seeding analytics fixtures"
node "$SEED_SCRIPT" --env=qa --limit=10000

echo "[5/5] Running pg_prove regression"
pg_prove --dbname="$PG_URL" tests/regression/*.pg

echo "[SUCCESS] Database migration validation completed"
