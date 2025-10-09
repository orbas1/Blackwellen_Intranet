# Route Updates — Version 1.50

## REST API Routing Changes
| Route | Method | Status | Notes |
| --- | --- | --- | --- |
| `/api/v2/dashboard` | GET | ✅ Active | Returns personalised widget payloads; requires `dashboard.view` scope. Caches per user for 120s. |
| `/api/v2/dashboard/preview` | POST | ✅ Active | Admin-only preview endpoint behind `adaptive-home-preview` flag. Requires `dashboard.preview` scope. |
| `/api/v1/dashboard/provider` | GET | ⛔ Deprecated | Responds with HTTP 410 and `Deprecation` header pointing to `/api/v2/dashboard`. Sunset 30 Jun 2024. |
| `/api/v2/directory/search` | GET | ✅ Active | Supports filters `location`, `skill`, `tenure`, `availability`. Paginates using `page` and `per_page`. |
| `/api/v2/directory/celebrations` | GET | ✅ Active | Aggregates HRIS celebration events; results limited to 100 per request. |
| `/api/v2/directory/org-chart` | GET | ✅ Active | Accepts `format=tree|svg|png`. Default `tree` returning hierarchical JSON. |
| `/api/v2/knowledge/documents` | GET | ✅ Active | Replaces `/api/v1/knowledge`. Adds query params `category`, `tag`, `updated_after`. |
| `/api/v2/knowledge/attest` | POST | ✅ Active | Requires `policy_attest` scope; returns acknowledgement receipt ID. |
| `/api/v2/service-hub/catalog` | GET | ✅ Active | Lists service offerings with SLA metadata and prerequisites. |
| `/api/v2/service-hub/requests` | POST | ✅ Active | Creates service request; returns request ID and SLA commitments. |
| `/api/v2/service-hub/requests/{id}/approval` | POST | ✅ Active | Maker-checker approval endpoint with audit log entry creation. |
| `/api/v2/analytics/kpi-definitions` | GET | ✅ Active | Exposes KPI metadata; includes caching and ETag headers. |
| `/api/v2/analytics/reports/schedule` | POST | ✅ Active | Accepts payload with cron expression and dataset ID; validated server-side. |
| `/api/v2/analytics/events/stream` | GET | ✅ Active | Server-sent events stream; client must support heartbeat for keep-alive. |

## GraphQL Schema Changes
- Deprecated provider-specific types (`ProviderProfile`, `ProviderCaseNote`) flagged for removal in schema v3.0.
- Introduced `Widget`, `WidgetLayout`, `EmployeeCelebration`, `KnowledgeDocument`, `ServiceRequest`, `KpiDefinition` types with field-level descriptions and deprecation annotations where necessary.
- Added custom scalars `DateRange`, `CronExpression`, and `SvgDocument` with validation resolvers.

## Versioning & Header Contracts
- New endpoints require header `X-Client-Version` ≥ `2024.4`. Requests below threshold receive HTTP 426 with upgrade instructions.
- `Deprecation` and `Sunset` headers configured for all v1 provider routes to aid automated client monitoring.
- Added `X-Feature-Flag-State` header for flagged endpoints to assist client logging.

## Routing Security Controls
- All new routes enforce OAuth scopes defined in `config/authz.php` and leverage policy middleware for row-level access.
- Rate limits updated: `/api/v2/directory/search` limited to 120 req/min per token; `/api/v2/analytics/events/stream` limited to 5 concurrent streams per user.
- Implemented IP allowlist for `/api/v2/analytics/events/stream` to restrict to corporate networks.

## Observability
- Added route tags for APM (`route:/api/v2/dashboard`) and dashboards capturing latency, throughput, and error rate.
- 404 responses for deprecated routes include `X-Deprecated-Route` header to ease log filtering.
