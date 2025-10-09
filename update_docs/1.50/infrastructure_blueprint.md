# Infrastructure Blueprint — Version 1.50 Architecture Hardening

## 1. Environment Topology
| Environment | Hosting | Runtime Stack | Purpose | DR Strategy | Observability |
| --- | --- | --- | --- | --- | --- |
| Local | Docker Compose (devcontainers) | PHP 8.2, Node 20, PostgreSQL 15, Redis 7 | Developer feature work, contract testing. | Daily snapshot via `docker volume` backups; restore scripts published in `docs/dev/restore.md`. | Local Grafana agent streaming to staging Loki for parity. |
| Staging | Kubernetes (EKS us-east-1) | Laravel API pods, Node SSR pods, Redis cluster, ElasticSearch 8 | End-to-end integration, performance rehearsal. | Cross-region replica in us-west-2 with hourly Velero backups. | Prometheus + Tempo + Loki with SLO burn-rate alerts. |
| Production | Kubernetes (EKS eu-west-1) | Multi-AZ API/worker pools, Next.js SSR pods, Redis, PostgreSQL HA, Kafka | Live traffic with blue/green slot for controlled releases. | Hot standby cluster in eu-central-1 with 5-min WAL shipping; monthly DR game days. | Managed Grafana Cloud with PagerDuty on-call integrations. |

## 2. CI/CD Pipeline Enhancements
- **Source Control Hygiene**
  - Enforced `main` branch protection with mandatory checks: unit tests, integration tests, security scans, Lighthouse performance.
  - Implemented `git-secrets` pre-commit hook and repository secret scanning via GitHub Advanced Security.
- **Build Automation**
  - Backend pipeline: GitHub Actions workflow `ci-backend.yml` runs parallel job matrix (`phpunit`, `pest`, `phpstan`, `infection`). Adds build step for container image using BuildKit with SBOM export to Dependency-Track.
  - Frontend pipeline: `ci-frontend.yml` compiles Storybook, executes Playwright smoke tests across Chromium/Firefox/Webkit, and publishes bundle stats to S3 for regression tracking.
  - Mobile pipeline: Managed via Bitrise with new lanes for Gradle 8.6 and Xcode 15.3; integrates OWASP Mobile Security Testing Guide (MSTG) checks.
- **Deployment Automation**
  - Adopted ArgoCD for GitOps deployments; production changes require signed manifests (cosign) and change management ticket reference.
  - Added canary analysis using Argo Rollouts with Prometheus metrics (error rate, latency, saturation) gating promotion.

## 3. Security Controls
| Control | Implementation | Evidence |
| --- | --- | --- |
| Identity & Access | SSO via Keycloak 23; RBAC mapped to squad roles; GitHub OIDC federation for CI workloads. | Access review log stored in Confluence `Security/Access Reviews/April-2024`. |
| Secrets Management | All runtime secrets stored in AWS Secrets Manager with automated rotation (lambda). CI obtains short-lived tokens via `aws-actions/configure-aws-credentials`. | Rotation evidence in AWS Config rule `secrets-rotation-35d`. |
| Network Segmentation | Service mesh (Istio 1.20) enforces mutual TLS, rate limits, and WAF policies for ingress. | Istio policy set `istio/security/v150.yaml` committed to ops repo. |
| Compliance | CIS Kubernetes Benchmark level 1 automated via kube-bench; audit logs shipped to SIEM with 365-day retention. | Latest kube-bench report uploaded 25 Apr 2024. |
| Backup & Recovery | Velero scheduled snapshots (hourly) + PostgreSQL PITR with 5-min RPO; tested via quarterly restore drills. | April drill evidence: Jira `DR-2024-04` with success metrics (RTO 27 min). |

## 4. Monitoring & Logging Stack
- **Metrics:** Prometheus scrapes Kubernetes, application endpoints, and custom exporters (Redis, PostgreSQL, Kafka). Recording rules created for SLO compliance (availability ≥ 99.5%, latency ≤ 400ms p95).
- **Tracing:** Tempo ingests OpenTelemetry traces from backend services; trace sampling rules set to 20% baseline, 100% for error responses.
- **Logging:** Loki centralises structured JSON logs with derived fields (tenant, request ID, widget context). Retention: 30 days hot, 180 days cold (S3 Glacier).
- **Alerting:** Alertmanager routes severity P1–P3 to PagerDuty; P4 to Slack `#support-internal`. Runbooks referenced in Grafana panels with `runbook_url` annotation.

## 5. Disaster Recovery & Business Continuity
1. **Scenario Planning**
 - Conducted tabletop exercise for regional outage (eu-west-1). Verified DNS failover via Route53 health checks and automated ArgoCD sync to standby cluster.
 - Validated RPO/RTO: < 5 minutes data loss, < 45 minutes service restoration.
  - 10 May 2024: Executed live PostgreSQL primary failover in `preprod-blue` while sustaining 30 req/s workflow traffic; recovery completed in 46 seconds with automated read replica promotion and application reconnect validation via k6 canary scenario.
2. **Backup Validation**
   - PostgreSQL WAL replay tested weekly using staging clone; automated script `scripts/pg-wal-verify.sh` emails results to Data Engineering distribution list.
   - Redis snapshot restoration rehearsed monthly; ensures TTL metadata preserved for session store.
3. **Runbooks & Ownership**
  - DR Runbook `ops/runbooks/dr-playbook-v150.md` lists contact tree, failover steps, rollback guidance, and communication templates; updated 10 May with `pg_autoctl` command sequence, verification SQL (`SELECT pg_is_in_recovery()`), and Grafana dashboard checks.
   - Business continuity owner: Operations Manager (Jane Howard). Deputy: SRE Lead (Miguel Santos).

## 6. Implementation Timeline & Checkpoints
| Date | Milestone | Owner | Deliverables |
| --- | --- | --- | --- |
| 03 May 2024 | Pipeline hardening complete | DevEx Lead | Signed-off GitHub Actions workflows, secrets scanning reports, SBOM ingestion proof. |
| 10 May 2024 | ArgoCD + Rollouts live | SRE Lead | Production GitOps sync, canary policy, rollback tested. |
| 17 May 2024 | Security controls verified | Security Architect | Pen-test closure report, updated Keycloak/WebAuthn policy, Istio audit. |
| 24 May 2024 | DR rehearsal executed | Operations Manager | Exercise report with metrics and remediation tasks tracked in Jira `DRR-150`. |

## 7. Open Risks & Mitigations
- **ERP Certificate Renewal Delay:** ERP vendor pending TLS cert rotation blocking Guzzle upgrade. *Mitigation*: escalate to vendor success manager, maintain WAF IP allowlist for fallback endpoint.
- **ArgoCD Capacity:** Additional 2 vCPU/4 GiB requested via infrastructure ticket `INFRA-221` to handle manifest diff load. *Due*: 02 May 2024.
- **PostgreSQL Logical Replication Load:** Performance testing indicates 15% CPU increase during dry run. *Mitigation*: schedule run during off-peak (02:00 UTC) and provision burstable compute nodes.

> **Status Summary (10 May 2024):** Dependency matrix approved, CI/CD changes merged to main, ArgoCD rollouts in staging and production. Keycloak upgrade completed, preprod failover drill executed successfully, and DR runbooks refreshed with new verification steps.
