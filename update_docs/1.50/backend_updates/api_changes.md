# API Contract Updates — Version 1.50

## OpenAPI Specification (REST)
- Bumped API version from `1.3.0` to `1.4.0`; published under `/docs/openapi/v1.4.yaml`.
- Added schemas `Widget`, `WidgetLayout`, `EmployeeCelebration`, `KnowledgeDocument`, `ServiceRequestSubmission`, `KpiDefinition`, `ScheduledReport`.
- Documented new query parameters and error responses, including `X-Correlation-Id` header for tracing.
- Marked provider-specific endpoints as deprecated with `sunset` extensions referencing 30 June 2024 retirement date.
- Provided example payloads for new endpoints including analytics scheduling and policy attestations.

## GraphQL Schema
- Published schema diff (`schema.graphql` → `schema-v1.50.graphql`) highlighting new types and field deprecations.
- Added documentation for `widgetLayout(persona: PersonaEnum!): WidgetLayout!` resolver and `serviceRequests(status: [ServiceStatus!], slaBreached: Boolean)` query with filter definitions.
- Provided migration notes instructing clients to remove `providerContext` fragments and adopt `employeeProfile { roles, squads, certifications }`.

## gRPC Services
- Introduced gRPC service `TelemetryIngestion` with method `StreamEvents(stream EventPayload)` for analytics pipeline ingestion.
- Updated `DirectorySync` proto to v2: `ListEmployees` now requires `FilterOptions` message supporting skills and tenure filters; old fields kept with `deprecated = true` annotations.

## Versioning & Release Notes
- REST: `Accept-Version: 1.4` header recommended; compatibility maintained for 90 days.
- GraphQL: Schema introspection reflects `deprecated` reason fields to assist automated linting.
- gRPC: New `.proto` files published to artifact repository with SemVer tags `v2.0.0`.

## Client Migration Guides
- Authored `docs/migrations/v150-rest-clients.md` summarising endpoint replacements, header changes, and sample refactoring steps for TypeScript/Java clients.
- Published `docs/migrations/v150-graphql-clients.md` covering fragment updates, new queries, and recommended caching adjustments.
- Shared Postman collection `V1.50 Governance Pack` containing requests for all new endpoints with test scripts verifying headers.

## Deprecation Messaging
- Automated email templates triggered to registered API clients two weeks before sunsetting provider endpoints.
- API responses include `Link` header pointing to knowledge base article `https://kb.blackwellen.io/v1.50/provider-deprecation`.
- Monitoring via API gateway ensures traffic volume on deprecated routes is tracked; weekly reports sent to integrator mailing list.
