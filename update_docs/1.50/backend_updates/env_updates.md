# Environment & Configuration Updates — Version 1.50

## Feature Flags
```
ADAPTIVE_HOME_PREVIEW=false
DIRECTORY_V2=true
KNOWLEDGE_ATTESTATION=false
SERVICE_HUB_V2=false
ANALYTICS_STREAM=false
```
- Feature flags managed via LaunchDarkly; configuration stored in `ops/feature-flags/v150.yaml`.
- CI pipelines validate flag state per environment before deployment; staging overrides stored in `.env.staging.v150`.

## Configuration Changes
- Added `WIDGET_CACHE_TTL=120` (seconds) controlling adaptive home widget caching.
- Introduced `HRIS_EVENT_TOPIC=hris.employee.events.v3` for Kafka consumer configuration.
- Added `DOCUMENT_STORAGE_BUCKET=blackwellen-documents-v150` with server-side encryption `AES256`.
- Added `SERVICE_HUB_QUEUE=servicehub.requests.v2` for asynchronous workflow ingestion.
- Introduced `ANALYTICS_SSE_MAX_CONNECTIONS=5` to enforce streaming concurrency limits.

## Secrets & Credential Management
- Rotated API keys for ERPNext, Workday, and Slack integrations; secrets stored in HashiCorp Vault path `kv/v1.50/` with rotated leases.
- Added service account `svc-ai-assistant` with scoped permissions; audited by security team (ticket SEC-482).
- Enforced TLS 1.2 minimum in service hub connectors; certificate bundles updated in all environments.

## Logging & Observability
- Enabled OpenTelemetry collector sidecar in staging and production clusters with config `otel-collector-v150.yaml`.
- Added log enrichment middleware injecting `release=1.50` tag for faster query filtering.
- Updated Grafana dashboards (`dashboards/v150/`) to include new widget, directory, and workflow metrics.

## Deployment & Rollback Controls
- Blue/green deployment strategy documented for adaptive home services; pre-switch validation includes smoke tests and data integrity checks.
- Rollback script `scripts/rollback/adaptive-home.sh` prepared to disable new widgets and restore provider fallback within 15 minutes if required.
- Canary alarms configured in Prometheus to watch error rate >2% for new endpoints; auto-disable flags triggered when thresholds breached.
