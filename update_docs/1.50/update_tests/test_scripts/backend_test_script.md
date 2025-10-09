# Backend Test Execution Guide

The backend services powering the intranet live in the `services/api` repository. Execute the following steps from the root of
the backend workspace to validate Version 1.50 changes.

```bash
#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f "composer.json" ]]; then
  echo "[ERROR] Run this script from the backend API repository root" >&2
  exit 1
fi

echo "[1/6] Installing PHP dependencies via composer"
composer install --no-interaction --prefer-dist

echo "[2/6] Running static analysis"
./vendor/bin/phpstan analyse --memory-limit=1G

echo "[3/6] Executing unit tests"
./vendor/bin/phpunit --testsuite=Unit --coverage-text

echo "[4/6] Executing feature/HTTP tests"
./vendor/bin/pest --group=http --coverage-text

echo "[5/6] Running API contract verification"
newman run tests/contracts/v150.postman_collection.json \
  -e tests/contracts/envs/qa.postman_env.json \
  --reporters cli,junit --reporter-junit-export build/reports/newman.xml

echo "[6/6] Performing security audit"
composer audit

echo "[SUCCESS] Backend test pipeline completed"
```

## Environment Variables
Ensure the following environment variables are exported before running the script:

| Variable | Description |
| --- | --- |
| `APP_ENV=testing` | Forces the API into testing mode. |
| `DB_CONNECTION=pgsql_testing` | Points migrations and tests to the ephemeral PostgreSQL schema. |
| `QUEUE_CONNECTION=sync` | Prevents background workers from spawning during tests. |
| `AWS_ENDPOINT=http://localhost:4566` | Routes storage operations to LocalStack. |

## Supporting Services
Use the shared docker compose file to provision infrastructure dependencies locally:

```bash
docker compose -f docker-compose.test.yml up -d postgres redis localstack mailhog
```

Tear down resources after execution:

```bash
docker compose -f docker-compose.test.yml down -v
```

## Reporting
- JUnit XML reports are written to `build/reports`. Upload them to the CI test analytics dashboard.
- Coverage reports are published to `build/coverage`; ensure line coverage ≥ 90%, branch coverage ≥ 80%.
- Any deviations trigger Jira tasks linked to the `QA-V150` board with severity and owner.
