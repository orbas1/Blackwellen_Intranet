# Database Migration Dossier — Version 1.50

## 1. Scope & Objectives
- Introduce **modular widget**, **employee intelligence**, **document repository**, and **service hub** schemas required for adaptive home and operations platform features.
- Upgrade PostgreSQL from 13.11 → 15.4 with minimal downtime, enabling logical replication and partitioned audit/event tables.
- Enforce GDPR-compliant retention policies and anonymisation workflows for legacy provider data removal.

## 2. Migration Workstreams
1. **Schema Deployment**
   - `2024_05_01_000001_create_widgets_table.php`: Creates `widgets` table with JSONB `config`, `visibility_rules`, and telemetry columns.
   - `2024_05_01_000002_create_employee_profiles_table.php`: Adds expanded profile fields (`skills`, `certifications`, `manager_path`), referencing `departments` and `locations` tables.
   - `2024_05_01_000003_create_documents_table.php`: Implements document metadata store with `versioning`, `retention_policy`, `encryption_key_id` columns.
   - `2024_05_01_000004_create_service_requests_table.php`: Normalises HR/IT/Finance workflows with `sla_minutes`, `priority`, `assignee_team`, `status_history` JSONB.
   - `2024_05_01_000005_add_audit_partitions.sql`: Converts `activity_audit` to partitioned table by month using native declarative partitioning.
2. **Data Transformation**
   - `2024_05_02_000001_backfill_employee_profiles.php`: Consolidates HRIS exports, deduplicates by `employee_code`, and maps to new schema.
   - `2024_05_02_000002_migrate_documents.php`: Migrates legacy SharePoint metadata, storing object storage key references and tagging taxonomy.
   - `2024_05_02_000003_service_request_history.php`: Replays workflow history into `status_history`, ensuring chronological integrity.
3. **Anonymisation & Purge**
   - `2024_05_03_000001_provider_data_purge.php`: Deletes deprecated provider tables; archives hashed identifiers for audit compliance.
   - `2024_05_03_000002_retention_policy_enforcement.php`: Applies retention policies (HR = 7 years, IT tickets = 3 years, finance approvals = 10 years).

## 3. Execution Schedule
| Phase | Window | Duration Target | Owner | Notes |
| --- | --- | --- | --- | --- |
| Dry Run #1 | 07 May 2024 01:00–03:00 UTC | ≤ 120 min | Data Engineering | Full migration on staging snapshot; capture timing metrics, adjust indexes. |
| Dry Run #2 | 14 May 2024 01:00–03:30 UTC | ≤ 90 min | Data Engineering + SRE | Execute with simulated prod load via k6; validate failover plan. |
| Production Cutover | 21 May 2024 22:00–01:30 UTC | ≤ 150 min | CTO (Go/No-Go), Data Engineering Lead | Blue/green release with logical replication; 15 min read-only window announced. |
| Post-cutover Validation | 22 May 2024 08:00 UTC | ≤ 30 min | BI Lead | Verify dashboards, ETL jobs, and document search results. |

## 4. Verification & Quality Gates
- **Pre-checks:**
  - Confirm backups via `pg_basebackup` snapshots (RPO 5 min). Ticket `DBA-1472` to sign off 24h before cutover.
  - Ensure application feature flags `adaptive_home_v2` and `service_hub_v2` disabled for general tenants during cutover.
- **Validation Queries:**
  - Row counts between legacy and new tables (±0.5% threshold) recorded in `reports/db-migration-v150.csv`.
  - Sample data validation for 500 random employees; HR signs off via checklist `HR-QA-2024-05`.
  - Document preview check: 50 random docs accessible via pre-signed URLs.
  - Workflow history verification: Latest status matches legacy system for 200 ticket IDs.
- **Performance Benchmarks:**
  - p95 query latency for `widgets` queries ≤ 120ms; monitor via pg_stat_statements.
  - Autovacuum health check to ensure new partitions maintain table bloat < 10%.

## 5. Rollback Strategy
1. Maintain logical replication from production (PostgreSQL 13) to shadow cluster (PostgreSQL 15) for 48 hours before cutover.
2. If cutover fails, re-point application to legacy cluster using feature flag `db_shadow_disable`, apply queued write-ahead logs, and re-run catch-up script.
3. Retain full physical backup snapshot for 14 days; destroying only after hypercare sign-off.
4. Document incident post-mortem in case of rollback with timeline, root cause, remediation plan (owner: Data Engineering Manager).

## 6. Stakeholder Communications
- **Change Advisory Board (CAB):** Review meeting 06 May 2024; minutes stored in Confluence page `CAB/2024-05-06`.
- **Notification Plan:** Email template to all department leads 5 days prior, Slack reminder 1 hour before maintenance, status page updates before and after cutover.
- **Hypercare:** Dedicated bridge `Zoom room 542-ARCH` staffed by Data Engineering, SRE, and Support from 21 May 21:30 UTC until cutover complete.

## 7. Tooling & Automation
- Migration orchestrated via Laravel command `php artisan migrate:v150 --with-data --with-audit` triggered by Argo Workflow.
- Observability hooks emit events to Grafana (annotation stream) and PagerDuty (maintenance mode) to suppress non-critical alerts.
- ETL pipelines paused using Airflow DAG pause script; automatically resumed post validation via `airflow unpause dag` command.

> **Approval:** CTO (Accountable), Data Engineering Lead (Responsible), SRE Lead (Consulted), Compliance Officer (Informed).
