# Database Change Log — Version 1.50 Architecture & Data Readiness

## Summary (29 Apr 2024)
- Approved PostgreSQL 15 upgrade roadmap with dual-run replication and rollback procedure documented in `migrations_updates.md`.
- Finalised widget, employee profile, document repository, and service request schemas powering adaptive home and service hub features.
- Completed dry-run rehearsal #0 on anonymised dataset (250 GB) validating migration scripts, retention enforcement, and telemetry events.
- Established governance for retention policies and anonymisation aligned to GDPR, ISO 27001, and financial compliance standards.

## Key Decisions
1. **Partition Strategy:** Adopted monthly partitions for `activity_audit` and `document_events` tables to maintain < 50 GB per partition and accelerate archival.
2. **Encryption Approach:** Customer-managed keys (CMK) stored in AWS KMS; `documents.encryption_key_id` references rotated keys with audit logging enabled.
3. **Search Indexing:** Document metadata to be synchronised to ElasticSearch 8 cluster via Debezium CDC after migration cutover.
4. **Access Control:** Row-level security policies defined for `employee_profiles` (per department visibility) and `service_requests` (requestor + assigned team).

## Completed Activities
- Generated ERD v1.50 diagrams (`/design/erd/v150/employee_service.svg`) and distributed to Analytics, BI, and Support teams.
- Updated data dictionary entries in Confluence for new columns/JSON structures with owner/responsible mapping.
- Implemented automated data quality scripts: duplicate detection, mandatory field validation, retention compliance checks.
- Produced anonymisation runbook for legacy provider data with audit log evidence stored in `compliance/retention/2024-05`.

## Outstanding Items
| Item | Owner | Due Date | Status |
| --- | --- | --- | --- |
| Final sign-off on PostgreSQL 15 parameter tuning (`shared_buffers`, `work_mem`) | DBA Lead | 03 May 2024 | In review |
| ElasticSearch index template update for document metadata | Search Engineer | 08 May 2024 | Scheduled |
| Finance archival verification (expense approvals) | Finance Systems Analyst | 12 May 2024 | Not started |
| Hypercare reporting dashboard configuration | BI Lead | 15 May 2024 | In progress |

## Risks & Mitigations
- **Risk:** Large document migration may exceed maintenance window if S3 copy operations slow. *Mitigation*: Pre-stage 80% of documents via asynchronous copy; keep final delta < 20% for cutover.
- **Risk:** Downstream ETL jobs may fail due to schema drift. *Mitigation*: Provided ETL integration test harness and 3-day blackout period for non-critical pipelines.
- **Risk:** Row-level security misconfiguration blocking analytics. *Mitigation*: Analytics service account granted bypass RLS with audited function `fn_rdl_get_analytics_ctx()`.

## Approvals
- Architecture Review Board — ✅ (29 Apr 2024)
- Security & Compliance — ✅ (29 Apr 2024)
- Data Governance Council — ✅ (29 Apr 2024)
