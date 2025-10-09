# Service Layer Changes — Version 1.50

## Widget Composition Service
- Introduced rule-driven aggregation that stitches widget payloads from HRIS, analytics, and knowledge microservices.
- Added caching decorators using Redis with per-user invalidation triggered by profile updates or feature flag changes.
- Publishes trace context to the telemetry bus for downstream analytics correlation.

## Employee Intelligence Service
- Rebuilt directory synchronisation pipeline to consume HRIS events via Kafka topic `hris.employee.events.v3` with schema validation.
- Added skill inference module leveraging taxonomy maintained by Talent Ops; results persisted with confidence scores and audit timestamps.
- Deprecated `providerLegacySync()` job; replaced by `hrisDeltaSync()` scheduled every 10 minutes with back-pressure handling.

## Knowledge Repository Service
- Added document checksum verification to prevent duplicate uploads and to support legal hold workflows.
- Integrated ClamAV scanning service with retry strategy and quarantine queue.
- Enabled S3-compatible storage support with encryption at rest and lifecycle policies for archive classes.

## Service Hub Workflow Service
- Exposed templated workflow library retrieved via `workflow_templates` table and managed by operations admins.
- Implemented SLA breach detection job emitting events to Opsgenie with severity mapping.
- Added integration connectors for ERPNext (procurement) and Workday (leave approvals) with secure credential rotation via Vault.

## Analytics & Reporting Service
- Added event ingestion pipeline writing to ClickHouse for sub-second analytics dashboards.
- Implemented KPI definition storage with versioning; each definition includes SQL snippet, owner, and review cadence.
- Added scheduled report generator that produces PDF/CSV artifacts stored in object storage and notifies subscribers.

## AI Assistant Service
- Connected to semantic search index powered by OpenSearch 2.9 with vector similarity queries.
- Implemented guardrail policies: profanity filter, personally identifiable information redaction, and escalation to human review for high-risk intents.
- Added feedback collector endpoint storing user rating, comment, and hashed user ID for model retraining.

## Feature Flag Service
- Introduced gradual rollout API accepting percentage targets, segmentation rules, and expiry dates.
- Added audit log stream to central logging with change metadata (actor, reason, rollback plan).
- Implemented circuit-breaker integration with LaunchDarkly fallback in case of service disruption.

## Observability & Error Handling
- Services now push structured metrics (latency, error rate, saturation) to Prometheus with dashboards in Grafana folder `V1.50`.
- Configured distributed tracing via OpenTelemetry collector; traces available in Jaeger with service maps for incident response.
- Added synthetic monitoring for critical APIs to detect regressions post-release.

## Deprecations & Migration Notes
- Legacy provider data service disabled; data archived to cold storage in compliance with retention policy R-2021-17.
- `LegacyNotificationService` replaced by unified notification orchestrator that routes to email, Slack, and mobile push.
- Migration scripts executed in staging and pre-production; runbooks stored in `operations/migrations/provider-removal.md`.
