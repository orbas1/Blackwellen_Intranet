# Architecture & Dependency Hardening — Version 1.50

## 1. Enterprise Dependency Matrix
| Domain | Dependency | Current Version | Target Version | Action & Rationale | Security / Compliance Notes | Owner | Status | Target Completion |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Backend (Laravel Core) | PHP 8.1 LTS | PHP 8.2.17 | Upgrade runtime to align with upstream security support window and performance improvements. | Requires container base image rebuild and QA of GMP/GDPR encryption modules. | Platform Engineering | In progress | 10 May 2024 |
| Backend Packages | laravel/framework 9.x | 10.22 | Framework uplift unlocks native job batching, cache tags, and security patches (CVE-2023-4822). | Run `php artisan test` matrix, update config cache, refresh route:list outputs. | Backend Guild | Scheduled | 14 May 2024 |
| Service Integrations | guzzlehttp/guzzle 7.5 | 7.8 | Adopt PSR-18 client compliance and HTTP/2 multiplexing for ERP/CRM connectors. | Pen-test TLS 1.3 enforcement, update service allowlist. | API Platform | Blocked (ERP cert) | 17 May 2024 |
| Frontend Build | Node.js 18.17 LTS | 20.12 LTS | Required for React 18.3 features and SWC compiler improvements. | Validate Docker multi-arch build; update Snyk baseline. | Frontend Guild | In progress | 08 May 2024 |
| Frontend Packages | React 18.2 | 18.3 | Enables concurrent rendering for adaptive widgets and server actions. | Run Chromatic visual diff, axe accessibility sweeps, and Storybook smoke tests. | Frontend Guild | Scheduled | 13 May 2024 |
| Frontend UI Libraries | (new) @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/modifiers | 6.x / 7.x | Adopt accessible drag-and-drop orchestration for adaptive home widgets with keyboard support. | Validate bundle size impact, run axe scans on draggable controls, and update dependency audit baselines. | Frontend Guild | Completed | 06 May 2024 |
| Mobile Android | Gradle 7.6 | 8.6 | Align with AGP 8.4 and enable configuration cache. | Confirm Play Integrity API compatibility; run Firebase Test Lab regression. | Mobile Team | In progress | 15 May 2024 |
| Mobile iOS | Xcode 15.0 | 15.3 | Support iOS 18 beta SDK and SwiftData-based offline cache. | Validate code signing, renew provisioning profiles, confirm ATS policies. | Mobile Team | Scheduled | 20 May 2024 |
| Mobile Tooling | (new) | sharp 0.33.3 | Introduce Node-based SVG → PNG asset synthesis for Expo builds, replacing committed binaries. | Review licence compliance (Apache 2.0) and ensure CI caches native binaries. | Mobile Team | Completed | 03 May 2024 |
| Data & Search | PostgreSQL 13.11 | 15.4 | Required for declarative partitioning for audit tables and logical replication. | Perform pg_upgrade dry-run; enable SCRAM-SHA-256 for all users. | Data Engineering | In progress | 22 May 2024 |
| Data & Search | Redis 6.2 | 7.2 | Unlock ACL v2 for fine-grained permissioning and RedisJSON modules. | Update failover sentinel config, rotate replication password. | SRE | Planned | 24 May 2024 |
| Observability | Prometheus 2.43 | 2.51 | Adopt exemplar storage for distributed tracing correlation. | Harden via mTLS between Prometheus <> Alertmanager. | SRE | Scheduled | 27 May 2024 |
| Security | Keycloak 21.1 | 23.0 | Required for multi-tenant realm segregation and WebAuthn policy. | Execute pen-test of OIDC flows; refresh realm signing keys. | Security Engineering | Scheduled | 29 May 2024 |

### Remediation Workflow
- **Automation:** GitHub Actions job `dependency-scan.yml` now runs daily `npm audit`, `composer audit`, `bundle audit`, and Snyk scans against the matrix above. Failing checks open Jira tickets with pre-assigned owners using the Automation for Jira rule `DEP-MTRX-ROUTER`.
- **Change Control:** All upgrades require RFC submission to the architecture review board (ARB). ARB sessions scheduled each Tuesday; emergency fast-track available for CVSS ≥ 8 vulnerabilities.
- **Rollback Strategy:** Lockfiles are committed per service. In-flight upgrades must maintain `*.lock.bak` artifacts with Terraform/Helm states captured before deploy. Revert instructions recorded in `runbooks/dependency-rollbacks.md` (central ops repo).

## 2. Security Scan Actions
| Vulnerability Ref | Component | CVSS | Interim Mitigation | Permanent Fix | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GHSA-3h2r-q2gw-87h3 | laravel/framework 9.x | 7.4 | Block direct upload endpoints via WAF rule `UPLOAD-STRICT-01`. | Upgrade to 10.22 with patched file validation. | Backend Guild | Ready for deployment |
| CVE-2024-3094 | xz-utils (base image) | 9.8 | Removed vulnerable xz 5.6.0 from CI images; built custom Debian slim image. | Replace base image with Debian 12.5 + xz 5.4.6 across pipelines. | Platform Engineering | Completed |
| GHSA-5m9v-jw8p-9p2h | React DOM | 6.5 | Feature flagged server components to internal preview only. | Upgrade React DOM to 18.3 with patched hydration flow. | Frontend Guild | Scheduled |
| CVE-2023-48795 | OpenSSH (bastion hosts) | 8.1 | Enabled `postponed-key` mitigation, rotated host keys. | Patch to OpenSSH 9.6p1 and enforce FIPS crypto policy. | SRE | In progress |

## 3. Dependency Upgrade Execution Timeline
1. **Week of 6 May**
   - Finalise Node.js 20 build images; update Yarn constraints and rerun Storybook smoke tests.
   - Complete PHP 8.2 container rebuild; run regression on `artisan queue:work` and scheduler.
2. **Week of 13 May**
   - Execute Laravel 10 upgrade branch; run contract tests against ERP, CRM, LMS connectors.
   - Publish React 18.3 rollout plan, including Chromatic baseline refresh and Lighthouse audits.
3. **Week of 20 May**
   - Perform PostgreSQL 15 dry-run upgrade in staging with 500 GB dataset snapshot.
   - Rollout Gradle 8.6 to Android CI; recompile release candidate builds and run instrumentation tests.
4. **Week of 27 May**
   - Upgrade Prometheus/Alertmanager stack; enable Grafana 10 exemplars.
   - Apply Keycloak 23 realm migrations and WebAuthn policies; revalidate SSO flows with HR/Finance service owners.

## 4. Reporting & Monitoring
- **Dashboards:** Grafana dashboard `Dependency Health - V1.50` aggregates pipeline statuses, open vulnerabilities, and ARB decisions. Alerts trigger Slack channel `#arch-harden` if any upgrade misses target completion by >2 days.
- **Documentation:** Upgrade SOPs stored in Confluence space `Architecture > V1.50 Hardening`. Links embedded in each Jira ticket for traceability.
- **Stakeholder Updates:** Weekly summary distributed to CTO, Head of Security, and squad leads highlighting completed upgrades, blockers, and next-week focus.
