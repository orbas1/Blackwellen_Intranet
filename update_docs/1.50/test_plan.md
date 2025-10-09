# Version 1.50 Master Test Plan

## 1. Introduction
Version 1.50 introduces adaptive home orchestration, expanded service hub workflows, analytics control tower capabilities, and
mobile parity improvements across the Blackwellen intranet ecosystem. This master test plan defines the strategy, scope,
responsibilities, tooling, and reporting cadence required to validate the release across web, backend services, mobile apps,
database migrations, integrations, and design/UX guardrails. The plan aligns with Milestone 5 of the update roadmap and reflects
quality expectations captured in the feature, architecture, and design workstreams.

## 2. Scope & Objectives
- **Regression Coverage**: Validate existing critical workflows (authentication, adaptive widgets, directory search, knowledge
  consumption, service intake, analytics dashboards) remain stable following new features and dependency upgrades.
- **Feature Validation**: Confirm new analytics acknowledgement flows, service hub SLA telemetry, offline provenance messaging,
and AI assistant interactions operate as documented in the implementation specs.
- **Non-Functional Assurance**: Exercise performance, load, failover, and resilience behaviours for API gateways, widget catalog services, document repository endpoints, and the workflow automation engine to ensure SLOs and RTO/RPO objectives are satisfied.
- **Security & Compliance**: Execute automated security scanning (Snyk, Dependabot, npm audit, composer audit), targeted
penetration tests, and credential scrubs per risk register entries.
- **Release Readiness**: Provide evidence packages (test run logs, dashboards, sign-off forms) required for CAB approval and
hypercare planning.

### Out of Scope
- Vendor-hosted third-party portals with independent release cycles (tracked separately via vendor SLAs).
- Experimental feature flags explicitly disabled in production (e.g., AI auto-remediation preview).

## 3. Test Team & Responsibilities
| Role | Owner | Responsibilities |
| --- | --- | --- |
| QA Lead | Priya Raman (QA Guild) | Orchestrate test execution, maintain dashboards, manage defect triage, compile sign-off pack. |
| Backend QA | Luís Monteiro | Execute API regression (Postman/Newman), contract tests, k6 load suites, review observability alerts. |
| Frontend QA | Amara Clarke | Run Playwright, React Testing Library suites, accessibility checks, Lighthouse audits, visual regression. |
| Mobile QA | Celeste Wong | Manage Expo E2E smoke tests via Detox, device-matrix regression (Test Lab), Crashlytics verification. |
| Data QA | Mateo Gruber | Validate PostgreSQL migrations, ETL reconciliation queries, anonymisation job outputs. |
| Security Engineer | Nora Patel | Drive Snyk/Dependabot triage, pen-test coordination, credential scrub verification. |
| UAT Coordinator | Jordan Ellis | Schedule departmental champion sessions, capture sign-offs, manage feedback loop. |
| Design QA Partner | Liyah Osei | Verify UI fidelity, accessibility findings, alignment with design system baselines. |

## 4. Test Environment Matrix
| Environment | Purpose | Configuration Notes | Data Set |
| --- | --- | --- | --- |
| `dev-shared` | Developer verification | Feature flags unrestricted; mocked HRIS/ERP connectors. | Synthetic dataset v150.2 |
| `qa-green` | Automated regression & load testing | Mirrors production topology (PostgreSQL 15 replica, Redis 7, Keycloak 23 in preview). Observability via Grafana `QA Control Tower`. | Sanitised prod snapshot (Mar 2024) with PII masked via Vault policies. |
| `uat-gold` | Business UAT & accessibility validation | Feature flags aligned to planned rollout; integrates with staging HRIS. | Departmental dataset (HR, Finance, IT, Ops) curated 01 May 2024. |
| `preprod-blue` | Release rehearsal & failover drills | Canary deployment of release candidate artifacts, active-active traffic simulation. | Production clone with anonymised tokens; rotates nightly. |

### Environment Readiness Checklist
- ✅ Vault secrets rotated for QA/Preprod with limited-scoped tokens.
- ✅ Synthetic email/SMS gateways configured to prevent real-world dispatch.
- ✅ Observability dashboards (`QA Release Health`) updated with new widget/service hub metrics.
- ✅ Data anonymisation jobs completed (`vault jobs run anonymise-v150`).
- ✅ Preprod Keycloak realm upgrade completed 12 May enabling SSO failover rehearsal.

## 5. Test Types & Tooling
| Test Type | Owner | Tooling / Command | Frequency | Exit Criteria |
| --- | --- | --- | --- | --- |
| Unit Tests (Backend) | Backend QA | `composer test`, `phpunit`, `pest` via GitHub Actions | Per commit & nightly | ≥ 90% pass rate with no critical failures. |
| API Contract Tests | Backend QA | Newman CLI `newman run contracts/v150.postman_collection.json -e envs/qa.postman_env.json` | Nightly & pre-release | Zero schema diffs vs. OpenAPI/GraphQL specs. |
| Load Testing | Backend QA | `k6 run update_docs/1.50/update_tests/test_scripts/performance_test.js` | Weekly & pre-release | P95 < 600ms, error rate < 1%. |
| Frontend Unit & Component | Frontend QA | `pnpm --filter @blackwellen/intranet-web test` (React Testing Library) | Per commit & nightly | 100% suites passing; coverage ≥ 80%. |
| Frontend E2E | Frontend QA | `pnpm --filter @blackwellen/intranet-web exec playwright test --project=chromium` | Nightly & release candidate | Critical paths green across Chromium/Firefox/WebKit. |
| Accessibility | Frontend & Design QA | `pnpm exec axe-storybook-ci`, `lighthouse-ci http://qa-web/adaptive-home` | Weekly | WCAG 2.2 AA compliance; Lighthouse accessibility ≥ 95. |
| Visual Regression | Frontend QA | Chromatic GitHub check | Per PR | All diffs reviewed; no unapproved regressions. |
| Mobile Unit Tests | Mobile QA | `npm --prefix apps/mobile run test` (Jest) | Per commit | > 90% suites green. |
| Mobile E2E | Mobile QA | Detox via Bitrise lane `detox-release` | RC builds | Critical flows (dashboard, directory, knowledge, service requests) pass on Pixel 7, iPhone 14. |
| Mobile Device Matrix | Mobile QA | Firebase Test Lab orchestrator (`gcloud firebase test android run ...`) | Weekly | No blocker-level crashes; Crashlytics alerts 0. |
| Database Migration Tests | Data QA | `psql -f migrations/v150/dry-run.sql`, `pg_prove` | Dry run & post-deploy | Zero blocking errors; verification queries matched. |
| Security Scans | Security Engineer | `update_docs/1.50/update_tests/test_scripts/security_scan.sh`, OWASP ZAP authenticated scan | Weekly & release candidate | All high/critical vulnerabilities mitigated or accepted with waiver. |
| Failover & Resilience | Backend QA & SRE | `ansible-playbook db-failover.yml`, `k6 run update_docs/1.50/update_tests/test_scripts/performance_test.js --tag failover=true` | Monthly & pre-release | Automated failover < 60s; zero lost transactions. |
| Penetration Tests | Security Engineer | External vendor script `pentest-suite-2024` | Pre-release | Findings ≤ medium severity with remediation plan. |
| UAT | UAT Coordinator | Playbooks per department (see §7) | Twice (sprint end & release readiness) | Sign-off forms completed; no open critical issues. |
| Design QA | Design QA | Figma-to-build checklist, `aria-live` audit | Per feature completion | All gating issues resolved before release. |

## 6. Test Data Management
- Synthetic identities generated via `scripts/mock-data/generateIdentities.ts` with deterministic seeds for reproducibility.
- Finance/HR records anonymised using Vault transformation policies; mapping keys stored in `qa-secure` secret engine.
- Document repository leverages minio bucket `qa-docs-v150`; versioning enabled to validate retention workflow.
- Analytics datasets seeded via `scripts/seed-analytics.ts` to provide deterministic KPI trends for verification of sparkline and AI assistant narratives.

## 7. UAT Strategy
- **Participants**: Department champions from HR, Finance, IT Services, Facilities, Communications, and People Ops leadership (12 total).
- **Schedule Execution**:
  - Wave 1 (08–09 May): Adaptive home personalisation, celebrations feed, knowledge hub publishing (HR & Communications) — ✅ Completed with sign-off `D-150-2024`.
  - Wave 2 (10–11 May): Service hub intake wizard, SLA telemetry, workflow automation dashboards (Finance, IT Services, Facilities) — ⚠️ Finance follow-up pending export enhancement (`UAT-215`).
  - Wave 3 (Planned 20 May): Analytics control tower (KPI builder, alert acknowledgement, schedule governance) and security posture console (Admin & Finance) — 🔄 Data seeding and scripts staged.
- **Process**: Each wave includes 60-minute guided sessions with defined success metrics, live recording in Teams `#uat-v150`, issue logging via Jira project `UAT-V150`, and same-day feedback triage with engineering owners.
- **Sign-Off**: Formal acceptance recorded in Confluence (`UAT Sign-off - V1.50`) with DocuSign signatures; conditional approvals documented with mitigation plans prior to CAB.

## 8. Entry & Exit Criteria
### Entry Criteria
- Feature development complete and merged into `release/v150` branch.
- Latest database migrations deployed to QA with verification queries green.
- Security scans show no outstanding critical vulnerabilities.
- Test environments available with monitoring dashboards active.

### Exit Criteria
- All planned test suites executed with ≥ 95% pass rate.
- No open Severity 1 or 2 defects; Severity 3 issues triaged with mitigation plan and target fix date.
- UAT sign-off obtained from each department champion group.
- Accessibility audits confirm WCAG 2.2 AA compliance across supported themes.
- Release checklist completed (deployment plan, rollback strategy, communication pack, training artefacts).
- Hypercare staffing roster confirmed and on-call rotations published.

## 9. Defect Management
- Defects recorded in Jira project `QA-V150` with severity, environment, repro steps, and linked Figma/design references.
- Daily defect triage at 10:00 UTC with QA Lead, Engineering Manager, Product Owner.
- SLA: Severity 1 fix within 24h, Severity 2 within 48h, Severity 3 within 5 days or waived by CAB.
- Defect metrics visualised in Grafana panel `QA Defect Burn-down`.

## 10. Reporting & Communication
- **Daily**: Slack `#release-v150` summary of executed suites, failures, and blockers (auto-posted by GitHub Action `qa-digest.yml`).
- **Twice Weekly**: QA status report circulated to PMO, Security, Product, and Engineering leads summarising coverage metrics,
defect trends, and release readiness score.
- **Pre-CAB**: Consolidated evidence pack (test logs, Lighthouse reports, k6 outputs, security attestation, UAT sign-offs).

## 11. Risk Management
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Keycloak 23 upgrade delays preprod SSO testing | High | Parallel smoke testing in QA with preview realm; escalate to Security steering. |
| Performance regression due to analytics dataset volume | Medium | Baseline k6 tests with synthetic 10k employee dataset; monitor P95 and adjust caching. |
| Accessibility regressions on emo theme animations | Medium | Include reduced-motion scenarios in Playwright + axe suite; design QA to confirm alternatives. |
| Mobile detox flakes on CI | Low | Use deterministic seeds, record flake rate, rerun limit 2x before failing pipeline. |

## 12. Approvals
- **QA Lead**: Priya Raman — _approved 11 May 2024_
- **Engineering Director**: Malik Serrano — _pending review of failover drill evidence_
- **Product Owner**: Helena Costa — _signs upon closure of `UAT-215`_
- **Security**: Nora Patel — _approved 11 May 2024 following OWASP ZAP retest_

This plan is a living document; updates will be version-controlled in `update_docs/1.50/test_plan.md` with change history captured
in the programme changelog.
