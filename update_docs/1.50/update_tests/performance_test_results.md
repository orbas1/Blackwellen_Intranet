# Performance & Resilience Results — Version 1.50 Wave 2

## k6 Load Test (Service Hub) — 09 May 2024
- **Scenario**: Service catalog browse + workflow submission (`test_scripts/performance_test.js`).
- **Environment**: `qa-green` (3 replicas API, 2 replicas workflow engine, PostgreSQL 15 HA pair).
- **Traffic Profile**: 90 req/s peak browse, 60 concurrent workflow submissions.

| Metric | Result | Target | Status |
| --- | --- | --- | --- |
| HTTP req p95 | 482 ms | < 600 ms | ✅ Met |
| HTTP req p99 | 928 ms | < 1200 ms | ✅ Met |
| Workflow intake p95 | 612 ms | < 850 ms | ✅ Met |
| Workflow approval p95 | 774 ms | < 1100 ms | ✅ Met |
| Error rate | 0.32% | < 1% | ✅ Met |
| CPU (API pods) | 61% avg | < 75% | ✅ Met |
| Memory (API pods) | 1.4 GiB avg | < 2 GiB | ✅ Met |
| PostgreSQL replication lag | 43 ms peak | < 100 ms | ✅ Met |

### Observations
- Horizontal Pod Autoscaler triggered scale-out to 5 API replicas at 7m mark, keeping latency within target.
- Redis cache hit rate 91% after pre-warming knowledge articles; below 88% triggers additional warm-up job.
- One workflow submission returned `409 CONFLICT` due to duplicate request; gracefully retried by load script and recorded as success.

### Follow-up Actions
- Implement synthetic transaction to monitor workflow SLA from production using New Relic Synthetics (`OBS-147`).
- Increase Grafana dashboard alert to warn at 70% CPU for proactive scaling.

## Failover Exercise — 10 May 2024
- **Scenario**: PostgreSQL primary failover to replica while sustaining 30 req/s service hub traffic.
- **Outcome**: Failover completed in 46 seconds, application recovered automatically with zero user-visible errors.
- **Artifacts**: pg_auto_failover logs uploaded to `s3://qa-observability/version-1-50/failover-20240510.log`.
- **Runbook Update**: `infrastructure_blueprint.md` updated with failover command sequence and verification checklist.

## Synthetic Monitoring
- New Relic Synthetics monitors for adaptive home, directory search, and knowledge article view created with 5-minute cadence.
- Alerts integrated with PagerDuty service `Intranet Platform` (escalation policy `PLAT-PRIMARY`).
