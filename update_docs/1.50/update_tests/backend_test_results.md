# Backend Test Results — Version 1.50 QA Wave 1

| Run ID | Date | Environment | Suite | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| BE-2024-05-08-01 | 08 May 2024 | qa-green | PHPUnit unit tests | ✅ Pass | 3,248 assertions; coverage 91.4% lines / 83.2% branches. |
| BE-2024-05-08-02 | 08 May 2024 | qa-green | Pest HTTP feature tests | ✅ Pass | Service hub intake wizard flows validated with SLA telemetry and fallback messaging. |
| BE-2024-05-08-03 | 08 May 2024 | qa-green | Newman API contract pack (`contracts/v150.postman_collection.json`) | ✅ Pass | No schema diffs vs OpenAPI spec build `2024.05.07`. |
| BE-2024-05-08-04 | 08 May 2024 | qa-green | k6 load test (`tests/load/service_hub.js`) | ⚠️ Pass w/ Degradation | P95 = 438 ms (within SLO), error rate 0.27%. Observed CPU spike on workflow engine pod; flagged to SRE. |
| BE-2024-05-08-05 | 08 May 2024 | qa-green | Composer audit | ✅ Pass | All high/critical vulnerabilities resolved; laravel/framework upgrade branch ready. |

## Incidents & Actions
- **SRE-ALERT-529** — CPU spike on workflow engine under load. Mitigation: increased horizontal pod autoscaler minimum from 2 → 3 replicas; retest scheduled 10 May.
- **QA-V150-113** — Detected stale credential in `.env.staging`. Credential scrub completed; vault rotation confirmed by Security.

## Evidence
- k6 dashboard: Grafana `QA Control Tower > Service Hub Throughput` snapshot `k6-2024-05-08`.
- Newman report: `build/reports/newman/BE-2024-05-08-03.xml`.
