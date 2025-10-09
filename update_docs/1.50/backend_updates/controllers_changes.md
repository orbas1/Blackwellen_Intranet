# Controller Changes — Version 1.50

## Summary
The controller layer has been refactored to support adaptive home widgets, directory intelligence, service hub workflows, and analytics instrumentation while deprecating the legacy provider-specific routes. Every change is backed by automated contract tests and feature-flag toggles to guard rollouts.

## Updated Controllers
### `DashboardController`
- Added `indexV2()` action exposing personalised widget payloads aggregated via the `WidgetCompositionService` with contextual caching per audience segment.
- Introduced `previewLayout()` endpoint behind the `adaptive-home-preview` feature flag to allow administrators to validate layout experiments without impacting production users.
- Deprecated `indexProvider()` action; the method now responds with HTTP 410 and emits `dashboard.provider.deprecated` metric. Sunset date communicated as **30 June 2024**.

### `EmployeeDirectoryController`
- Replaced legacy `list()` method with `search()` supporting faceted filters (location, skills, tenure) and pagination parameters validated against API schema v1.4.
- Added `celebrations()` action to surface birthday, anniversary, and promotion events; integrates with HRIS event stream and caches results for 30 minutes.
- Added `orgChart()` endpoint returning hierarchical JSON for client consumption with optional `format=svg|png` export parameter.
- Deprecated query parameters `providerId` and `providerRole`; requests including them receive `400` with remediation hint linking to migration guide.

### `KnowledgeController`
- Introduced `documents()` index returning paginated policy and SOP metadata with version history and approval states.
- Added `attest()` POST action requiring `policy_attest` scope; records acknowledgements and triggers workflow events.
- Added `aiTagging()` webhook receiver validating signature headers before accepting AI-generated tags. Wrapped with idempotency key enforcement.

### `ServiceHubController`
- New `catalog()` route listing service offerings with SLA metadata and dynamic eligibility rules sourced from the workflow engine.
- Added `submitRequest()` to create service tickets; integrates with `RequestSubmissionJob` for asynchronous enrichment and notifies watchers.
- Added `approvalDecision()` to support maker-checker approvals with audit trail persistence.

### `AnalyticsController`
- Added `kpiDefinitions()` read endpoint returning KPI schema, calculation metadata, and ownership info for analytics teams.
- Added `scheduleReport()` action allowing administrators to queue BI reports with cron-like syntax validated by `ScheduleExpressionRule`.
- Added `eventStream()` SSE endpoint broadcasting near real-time telemetry for dashboards; requires `analytics.stream` permission and connection throttling.

### `Admin\FeatureFlagController`
- Extended `toggle()` method to include staged rollout percentages and automatically register change events with observability service.
- Added `bulkPreview()` to allow pre-flight evaluation of multiple flags for QA automation.

## Controller Decommissioning
- Removed `ProviderProfileController` and `ProviderCaseNotesController`; endpoints return HTTP 410 with migration link to support article.
- Controller removal logged in audit table with ref codes `DECOM-PP-2024` and `DECOM-PCN-2024`.

## Telemetry & Observability Updates
- All updated controllers emit structured logs via OpenTelemetry instrumentation (span names `controller.<action>`).
- Feature-flag-protected routes include `flag_state` attribute for analytics.
- Error responses include `correlation_id` header persisted to central logging for triage.

## Testing & Validation
- Added controller unit tests covering new endpoints and deprecation responses (Jira tickets `BE-1204` to `BE-1216`).
- Contract tests for `DashboardController` and `EmployeeDirectoryController` updated to schema v1.4; results stored in CI artifacts.
- Smoke tests executed in staging environment; no regressions observed across top 20 user journeys.
