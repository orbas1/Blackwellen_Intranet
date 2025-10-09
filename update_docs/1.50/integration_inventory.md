# Integration Inventory & Remediation Plan — Version 1.50

## 1. Enterprise Connectors Overview
| System | Purpose | Integration Pattern | Current Status | Remediation Actions | Owner | Target Date |
| --- | --- | --- | --- | --- | --- | --- |
| ERPNext | Finance, procurement, vendor management | REST (OAuth2) via middleware | Rate limiting spikes; TLS cert expiring 12 May | Coordinate cert renewal, implement request batching, add circuit breaker in middleware. | Integrations Lead | 10 May 2024 |
| Workday | HRIS employee master data | SOAP + scheduled SFTP exports | Schema drift detected (new `preferred_name` field) | Update mapping script, extend validation, notify HR for governance. | HRIS Engineer | 06 May 2024 |
| Salesforce | CRM for account intelligence | REST streaming API (bulk + streaming) | Webhook retries failing on 429 | Implement exponential backoff, expand concurrency pool, add DLQ via SQS. | Revenue Ops | 09 May 2024 |
| ServiceNow | Incident + change management sync | REST API (OAuth) | Duplicate incidents due to missing dedupe keys | Apply deterministic hashing on `source_id`, enable delta sync filter. | ITSM Lead | 07 May 2024 |
| Microsoft Teams | Notifications + adaptive cards | Graph API | Adaptive card schema update pending | Update card templates, add fallback plain text; compliance review. | Communications | 08 May 2024 |
| Slack | Alerts + workflow triggers | Events API + incoming webhooks | Token rotation due 30 Apr | Rotate tokens, enforce granular scopes, configure signing secret rotation automation. | Operations | 30 Apr 2024 |
| Tableau | Analytics dashboards | Tableau Server REST | Refresh tasks failing post schema change | Update published data sources, re-run extracts with new fields, add alerting. | BI Team | 11 May 2024 |
| AWS SES | Email notifications | SMTP + SDK | Bounce rate 4.3% on digest emails | Cleanse mailing lists, enable configuration sets for reputation metrics. | Platform Engineering | 05 May 2024 |
| Twilio | SMS MFA + alerts | REST API | SMS cost spike due to fallback routes | Optimise messaging service routing; add usage alerts. | Security | 12 May 2024 |
| Zoom | Virtual events + trainings | REST API + webhook | Webhook signature validation failing | Rotate secrets, upgrade SDK to v3.5 for new signing method. | L&D Team | 07 May 2024 |

## 2. Integration Readiness Checklist
- **Authentication & Secrets**
  - Vaulted credentials rotated within past 30 days, tracked via Secrets Manager rotation logs.
  - OAuth client rotations scheduled before dependencies upgrade (Keycloak 23) to avoid token invalidation.
- **Throughput & Scaling**
  - Load tests executed on middleware (k6) verifying 500 req/s sustained throughput for ERPNext + Salesforce connectors.
  - Queue depth alerts configured in SQS (`integration-queue`) with auto-scaling triggers for worker pods.
- **Error Handling**
  - Implemented Dead Letter Queue (DLQ) for all event-driven integrations with 7-day retention.
  - Observability dashboards per connector showing success rate, latency, retry count.
- **Compliance**
  - Audit logs stored in centralized SIEM with connector-specific tags for traceability.
  - Data residency requirements validated for EU employees (Workday, Salesforce) ensuring EU data centres usage.

## 3. Communication Plan
- Weekly integration stand-up with ERP, CRM, LMS, and communications stakeholders.
- Daily Slack digest `#integration-ops` summarising failure counts, remediation actions, upcoming change windows.
- CAB approvals required for high-risk changes (ERPNext cert renewal, Salesforce concurrency adjustments).

## 4. Dependencies & Risks
- **Vendor Dependencies:** ERPNext certificate renewal reliant on vendor operations; escalation path triggered via vendor success manager (ticket `ERP-3421`).
- **Internal Dependencies:** Salesforce concurrency changes require Infrastructure to increase NAT gateway throughput (ticket `NET-771`).
- **Risk Mitigation:** Defined fallback messaging via email if Slack or Teams integration experiences downtime > 15 minutes.

> **Status (29 Apr 2024):** Inventory signed off by Architecture Review Board; remediation actions underway with tracking in Jira board `INTG-V150`.
