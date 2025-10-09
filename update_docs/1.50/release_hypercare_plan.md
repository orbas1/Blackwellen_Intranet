# Release & Hypercare Plan — Version 1.50

## Deployment Window
- **Target Date**: 16 May 2024
- **Change Window**: 20:00–22:00 UTC (low usage)
- **Rollback Window**: 22:00–23:00 UTC
- **Release Manager**: Hannah Lee

## Pre-deployment Checklist
1. ✅ Freeze non-essential merges 24 hours before deployment (`git tag release-1.50-rc`).
2. ✅ Ensure all automated pipelines green (GitHub Actions `qa-*` workflows).
3. ✅ Confirm database migrations reviewed by DBA (`DBA-APP-150`).
4. ✅ Publish stakeholder comms via Email + Teams (template `COMM-V150-DEPLOY`).
5. ✅ Provision feature flag rollout plan in LaunchDarkly with staged audiences.
6. ✅ Validate synthetic monitors in `qa-green` to ensure baseline health prior to cutover.

## Deployment Steps
1. Trigger `deploy-preprod` pipeline to promote container images to production registry (`ECR prod/intranet`).
2. Execute database migration runbook (Ansible play `db-migrate-v150.yml`).
3. Deploy Kubernetes manifests via ArgoCD sync (`apps/intranet-web`, `apps/intranet-api`, `apps/workflow-engine`).
4. Validate health checks, job queues, and background workers via Grafana dashboards `Intranet / Release`.
5. Gradually enable feature flags:
   - `adaptive-home-v2` → 10% / 50% / 100% cohorts (30-minute observation between steps).
   - `service-hub-automation` → Pilot groups first (IT + HR) before general availability.
   - `analytics-insights` → Admin-only for first 24 hours.
6. Confirm content sync jobs executed (`content-sync` GitHub Action manual dispatch).

## Hypercare Support (17–24 May)
| Day | Primary | Secondary | Focus |
| --- | --- | --- | --- |
| Day 1 (17 May) | Platform SRE (Noah Grant) | Backend Guild (Sofia Alvarez) | Infrastructure health, performance telemetry. |
| Day 2 (18 May) | Service Hub Squad (Miguel Santos) | Workflow QA (Emily Chen) | Ticketing, workflow automation accuracy. |
| Day 3 (19 May) | Knowledge Squad (Farah Idris) | Communications (Ryan Patel) | Knowledge publishing, attestation tracking. |
| Day 4 (20 May) | Analytics Squad (Priyanka Nair) | Data Engineering (Leo Kim) | Dashboard integrity, KPI builder, AI assistant. |
| Day 5 (21 May) | Mobile Squad (Olivia Brooks) | Security (Marco Rossi) | Mobile telemetry, push notifications, device hygiene. |
| Day 6 (22 May) | HR Tech (Sara Mendez) | Finance Systems (Amina Torres) | HR/Finance workflows, expense exports. |
| Day 7 (23 May) | Platform SRE (Noah Grant) | PMO (Hannah Lee) | Release retrospective prep, executive reporting. |
| Day 8 (24 May) | All squads | PMO (Hannah Lee) | Hypercare close-out, knowledge transfer. |

## Communications Plan
- Real-time updates in Teams channel `#intranet-release-150`.
- Executive summary email D+1 with adoption metrics, incidents, and outstanding actions.
- Daily hypercare stand-up 09:00 UTC covering incident review, adoption stats, and content backlog.

## Exit Criteria
- ✅ No Sev1/Sev2 incidents for 72 consecutive hours.
- ✅ Service hub workflow success rate ≥ 98% with SLA adherence.
- ✅ Analytics dashboards match finance data warehouse within 2% variance.
- ✅ Mobile crash-free users ≥ 99% on iOS and Android.
- ✅ All UAT action items closed (`UAT-215` tracked for finance export patch).
