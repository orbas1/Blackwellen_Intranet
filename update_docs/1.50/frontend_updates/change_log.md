# Frontend Change Log — Version 1.50

## Highlights
- Implemented adaptive home dashboard with modular widget grid, personalization controls, and telemetry instrumentation.
- Replaced provider-facing components with employee-centric directory, knowledge, and service hub modules.
- Launched analytics control tower with KPI grid, AI assistant, alert acknowledgement workflow, reporting schedule governance, and security posture dashboards aligned with backend telemetry.
- Hardened accessibility support (WCAG 2.2 AA) including keyboard navigation, ARIA annotations, focus management, and high-contrast themes.

## Component Updates
- New `WidgetGrid` component supporting drag-and-drop, density modes, and lazy loading.
- `DirectorySearch` rewritten to leverage GraphQL search queries with debounced filtering and skeleton placeholders.
- `KnowledgeDocumentViewer` integrates version history timeline, attestation CTA, and offline indicator.
- `ServiceRequestWizard` uses multi-step form pattern with validation summary and autosave to IndexedDB for offline resilience.
- `AnalyticsKPIBuilder` includes dataset selector, chart preview, annotation tools, and scheduling panel.

## Theming & Tokens
- Adopted updated colour, spacing, and typography tokens delivered by design system pipeline.
- Introduced CSS variables for theme switching with runtime persistence and accessible contrast fallbacks.
- Added storybook stories covering light/dark/emo themes with Chromatic snapshots for regression detection.

## Telemetry
- Added event tracking for widget personalization, service request submission, knowledge attestation, and AI insight interactions.
- Configured OpenTelemetry browser instrumentation to propagate correlation IDs across API calls.
- Updated analytics dashboards to display adoption metrics and error rates by feature.

## Deprecations
- Removed provider dashboards, profile widgets, and navigation entries; replaced with redirect banner guiding users to new experiences.
- Deleted legacy Sass partials and locale strings referencing providers.

## Testing & QA
- Extended Cypress suites to cover adaptive home personalization, directory search filters, knowledge attestation, and service request workflows.
- Added accessibility audits via axe-core to ensure compliance for new components.
- Implemented visual regression baseline for top 25 pages using Playwright trace viewer snapshots.

## Version 1.50 Application Foundation (30 Apr 2024)
- Bootstrapped Vite + React intranet portal (`apps/web`) with adaptive home widgets, directory explorer, knowledge hub, and service hub workflow reporting backed by React Query and Axios clients with mock fallbacks.
- Implemented theming provider with local storage persistence, CSS variable tokens, and responsive navigation shell aligning with design artefacts.
- Added service layer abstractions (HTTP client, typed API contracts, offline dataset fallbacks) to accelerate integration once backend endpoints are promoted.

## Directory, Knowledge, and Resilience Enhancements (02 May 2024)
- Added a preferences context with `localStorage` persistence for pinned employees and wired it through the layout providers.
- Replaced the directory list rendering with `@tanstack/react-virtual` backed virtualization, filter toolbar (department, location, pinned), and a profile drawer surfacing reporting lines, project assignments, and coverage hours.
- Expanded knowledge hub to include debounced search, category/status filters, data source metadata, and refreshed styling aligned to the new token set.
- Introduced a reusable `ErrorBoundary` component around the routing shell and tightened CSS variable definitions for surface, border, badge, and typography tokens.

## Adaptive Home Personalisation & Telemetry (06 May 2024)
- Implemented draggable widget grid backed by `@dnd-kit` with persisted layout order, density modes, and offline provenance messaging surfaced through contextual banners.
- Added personalisation drawer for widget visibility, data freshness, and quick action management wired to the new dashboard preference store.
- Instrumented telemetry events for widget load, reorder, refresh, quick link interactions, and manual refresh toggles using the browser beacon pipeline.
- Refreshed widget card visuals with status badges, metric deltas, and accessible drag handles aligning to updated design tokens.

## Service Hub Catalog & Intake (07 May 2024)
- Replaced the static workflow table with a tri-column service catalog supporting search, department filters, SLA badges, and request volume prioritisation.
- Introduced a guided intake wizard with validation, attachment guidance, manager notifications, and React Query-backed submission handling with offline fallbacks.
- Surfaced SLA telemetry, breach trends, and operational checklists alongside knowledge suggestions to improve request quality before automation hand-off.
- Extended workflow metadata types and mock datasets (service catalog, knowledge links, telemetry) for both web and mobile clients to ensure consistent SLA messaging.

## Analytics Control Tower & Security Insights (09 May 2024)
- Introduced `/analytics` route with dataset/timeframe/segment selectors, KPI cards, SVG trend visualisation, and data quality summaries backed by mock analytics generators.
- Embedded AI assistant panel generating deterministic recommendations from KPI deltas and alert severity while tracking interactions through the telemetry service.
- Added alert acknowledgement mutation, reporting schedule toggle, and security control/mobile posture summaries with accessible styling and responsive layout.
