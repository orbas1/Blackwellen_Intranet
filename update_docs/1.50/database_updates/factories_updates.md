# Factory Updates — Version 1.50 Data Preparation

## Objectives
- Provide realistic seed data for QA environments validating adaptive home widgets, service hub workflows, and knowledge base features.
- Align Laravel factories with new schema fields, ensuring relational integrity and telemetry coverage.

## Changes Implemented
1. **WidgetFactory**
   - Added support for widget types `celebrations`, `org_insights`, `policy_alerts`, `service_queue`, `knowledge_trending`.
   - Generated JSONB `config` payloads with thresholds, API endpoints, and accessibility labels for screen reader testing.
   - Instrumented `telemetry_key` and `default_layout_span` attributes to mirror production layout.
2. **EmployeeProfileFactory**
   - Enriched with `skills`, `certifications`, `language_codes`, and `manager_path` arrays.
   - Pulls avatar references from CDN stub with signed URL expiry for testing.
   - Associates each profile with `department`, `location`, and `employment_type` enumerations.
3. **DocumentFactory**
   - Creates multi-version records with `version_number`, `retention_policy`, `encryption_key_id`, and `classification` tags (Public/Internal/Confidential).
   - Links to `owner_id` and `review_cycle_days`, enabling governance validation.
   - Generates `search_tokens` to feed ElasticSearch smoke tests.
4. **ServiceRequestFactory**
   - Emits workflow history events with statuses (New, Triaged, In Progress, Awaiting Approval, Resolved) and SLA breach simulation.
   - Populates `assignee_team`, `priority`, `due_at`, and `catalog_item_id` for operations analytics dashboards.
   - Injects attachments (S3 mock keys) and audit metadata for compliance testing.

## Data Volume Targets
| Environment | Widget Records | Employee Profiles | Documents | Service Requests |
| --- | --- | --- | --- | --- |
| Local | 50 | 200 | 120 | 80 |
| QA | 250 | 2,000 | 750 | 600 |
| Staging | 500 | 5,500 | 2,000 | 1,500 |

## Automation & Validation
- Factories invoked via `php artisan db:seed --class=V150DemoSeeder`.
- Post-seed validation script verifies:
  - Foreign key integrity using `SELECT COUNT(*) FROM ... WHERE ... IS NULL` queries.
  - JSON schema compliance via Laravel `Validator` rules for widget configurations.
  - Telemetry sample events emitted to Kafka `widget_interactions` topic for analytics testing.
- Daily reset job in staging re-seeds dataset to maintain parity with production configuration (job `staging-refresh-v150`).

> **Status:** Factories merged to `develop` (PR #582). Awaiting QA sign-off after React 18.3 upgrade.
