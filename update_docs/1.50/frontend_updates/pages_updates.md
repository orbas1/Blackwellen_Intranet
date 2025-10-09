# Page Updates — Version 1.50

## Adaptive Home (`/home`)
- Responsive card grid continues to surface celebrations, compliance, insights, and workflow CTAs with clear data source labelling.
- Widget telemetry hooks emit view/interact events and are ready for downstream analytics ingestion.
- Added drag-and-drop widget orchestration with persisted layout order and density toggles backed by the dashboard preference store.
- Introduced personalisation drawer enabling widget visibility, quick action curation, and live vs cached data modes with accessibility-friendly controls.
- Surfaced offline provenance banner and manual refresh control to complement automatic polling and data freshness indicators.

## Directory (`/people`)
- Added toolbar filters for department, location, and pinned employees with debounced search against the data set.
- Migrated list rendering to a virtualised grid using `@tanstack/react-virtual` to support large organisations without sacrificing performance.
- Introduced a rich profile drawer detailing reporting lines, current projects, coverage hours, and contact information.

## Knowledge Hub (`/knowledge`)
- Added search input with debounced filtering plus category and status selectors to refine the article list.
- Surfaced data source metadata and stale indicators aligned with React Query fetch state, ensuring transparency when operating offline.
- Updated typography, badge styling, and footer metadata to align with refreshed design tokens.

## Service Hub (`/service-hub`)
- Introduced tri-column layout with department filters, search, and SLA-prioritised catalog cards that surface request volume, priority, and tag metadata.
- Added guided intake wizard (details → attachments → review) with validation, checklist gating, offline submission fallback, and manager notification toggle backed by React Query mutations.
- Surfaced SLA telemetry, breach rates, and trend analytics alongside contextual knowledge suggestions and intake checklists to improve submission quality.

## Global Elements
- Navigation shell continues to present adaptive experiences with updated typography and spacing tokens from the design system refresh.
- Theme provider persists preferences and now wraps a new global error boundary to guard against unexpected UI failures.

### Application Shell & Pages (30 Apr 2024)
- **Adaptive Home**: Widget grid renders celebration, compliance, insight, and document call-to-action cards with data source labelling and CTA instrumentation.
- **Directory**: Searchable roster with department counts, contact affordances, and skill chip rendering; integrates with local storage to persist query state in follow-up sprint.
- **Knowledge Hub**: Article list with category badges, tag chips, and reactive status footers; leverages React Query caching for background refresh hints.
- **Service Hub**: Workflow health table exposing SLA, queue depth, and status with actionable styling for remediation cues; includes launch button for intake portal.
