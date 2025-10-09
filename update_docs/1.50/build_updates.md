# Build & Release Engineering Updates — Version 1.50 Architecture Hardening

## 1. Pipeline Overview
- **Backend CI (`ci-backend.yml`)**
  - Stage 1: Composer install with cache restoration (`actions/cache@v3`), `composer audit` gating step.
  - Stage 2: Parallel matrix of `phpunit`, `pest`, `phpstan`, `infection` mutation tests with 80% MSI threshold.
  - Stage 3: Docker image build using BuildKit + provenance attestation (SLSA level 2) and SBOM export to Dependency-Track.
  - Stage 4: Deploy to staging via ArgoCD on successful tests; requires signed-off change ticket.
- **Frontend CI (`ci-frontend.yml`)**
  - Stage 1: Install Node.js 20 using Volta, run `pnpm audit --prod` and `pnpm lint`.
  - Stage 2: Build Next.js SSR bundle and static assets with bundle analyzer output stored in S3 `build-metrics/v150`.
  - Stage 3: Execute Playwright suite across Chromium/Firefox/WebKit; threshold: < 0.5% flake rate.
  - Stage 4: Publish Storybook to Chromatic for visual regression with `required` status check.
- **Mobile CI (Bitrise)**
  - Introduced parallel lanes for Android (Gradle 8.6, AGP 8.4) and iOS (Xcode 15.3) builds.
  - Integrated OWASP MSTG static checks and Firebase Crashlytics symbol upload automation.
  - Configured build cache warmup to reduce build time by 18%.
  - Added deterministic pre-build step invoking `npm run generate:assets` to synthesise Expo icon/splash PNGs from SVG templates so that pipelines remain binary-free while producing brand-compliant artefacts for store submissions.

## 2. Release Cadence & Environments
| Environment | Release Channel | Frequency | Approval Required |
| --- | --- | --- | --- |
| Development | Feature branches | Continuous | Squad lead |
| Staging | Release candidate (`release/v150-rc`) | Twice weekly | PMO + QA lead |
| Pre-Production | Blue slot in production cluster | Ad-hoc (pre-release) | CAB approval |
| Production | Green slot in production cluster | Weekly or emergency fix | CTO + Incident Commander |

## 3. Quality Gates
- Code coverage threshold enforced at 85% lines / 80% branches for backend; 80% lines / 75% branches for frontend.
- Lighthouse performance budgets: PWA >= 80, Accessibility >= 95 on staging builds.
- Performance regression tests using k6 hitting critical APIs (widgets, directory, service hub) with baseline comparison stored in Grafana.
- Release cannot progress without updated changelog entries referencing Jira epics and architecture approval.

## 4. Artifact Management
- Docker images pushed to ECR with immutability and retention (120 days). Tag format: `v150-{service}-{buildNumber}`.
- Frontend artefacts stored in S3 bucket `frontend-artifacts-v150` with CloudFront invalidation automatically triggered post-deploy.
- Mobile builds signed and uploaded to TestFlight/Internal App Sharing with metadata auto-generated from release notes YAML.

## 5. Observability & Telemetry
- CI pipelines emit events to Honeycomb for build duration analytics; SLO defined at 90th percentile < 12 minutes.
- Deployment events annotated in Grafana and Slack channel `#deployments` with context (commit SHA, change ticket, owner).
- Synthetic monitoring (Checkly) updated with new routes (adaptive home, knowledge hub, service hub) to validate post-deploy health.

## 6. Release Checklists
1. Confirm dependency matrix actions green across tracked items.
2. Verify migration dossier pre-checklist complete (backups, feature flags, comms).
3. Conduct release readiness review with Architecture, Security, and PMO (template `release-readiness-v150.md`).
4. Post-release: run smoke tests, update status page, capture metrics for GO/NO-GO review.

> **Status (29 Apr 2024):** CI/CD enhancements deployed to staging and pre-production; production rollout contingent on Keycloak upgrade and PostgreSQL dry run #1 sign-off.
