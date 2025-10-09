# API Schema Update Pack — Version 1.50

## Deliverables
- **OpenAPI v1.4** (`/docs/openapi/v1.4.yaml`): includes adaptive home, directory, knowledge, service hub, analytics endpoints with example payloads and error responses.
- **GraphQL Schema v1.50** (`/docs/graphql/schema-v1.50.graphql`): adds widget, knowledge, service request types; provider fragments deprecated.
- **gRPC Protos** (`/docs/grpc/telemetry/v2`): telemetry ingestion and directory sync definitions with compatibility notes.
- **Postman Collection** (`postman/V1.50 Governance Pack.json`): curated requests, test scripts validating headers and feature flags.
- **SDK Updates**: TypeScript SDK v1.4.0, Java SDK v2.1.0 with typed models and migration guides.

## Migration Guides
- `docs/migrations/v150-rest-clients.md`: enumerates endpoint replacements, query parameter changes, header requirements, and sample code.
- `docs/migrations/v150-graphql-clients.md`: outlines new queries/mutations, deprecation strategy, caching updates.
- `docs/migrations/v150-grpc-clients.md`: explains proto changes, streaming requirements, and fallback behaviour.

## Communication Templates
- Email announcement for API clients with timeline, action items, and support contacts (sent 24 Apr).
- Release notes for partner portal linking to changelog, Postman collection, and FAQ.
- Slack announcement template for internal channel `#integrations` summarising changes and linking to migration resources.

## Support & Certification
- Partner sandbox updated to v1.50 endpoints; certification checklist includes automated Newman tests and error handling cases.
- Office hours scheduled 29 Apr and 6 May; recordings stored in partner portal.
- Support escalation path documented with RACI: API Architect (Owner), Partner Success (Support), DevOps (Incident Response).

## Tracking & Compliance
- Deprecation metrics monitored via API gateway dashboards; weekly report distributed to PMO and partner success teams.
- All documents version-controlled; commit references captured in governance tracker for audit.
