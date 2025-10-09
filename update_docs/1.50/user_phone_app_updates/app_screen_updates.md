# Mobile App Screen Updates — Version 1.50

## Adaptive Home
- Quick action cards display adaptive widgets with provenance (live/cache/fallback) messaging and optional deep links.
- Offline notice component surfaces above the stack whenever connectivity drops.
- **Implementation Snapshot (02 May 2024)**: React Native cards backed by React Query cache; personalization gestures remain on roadmap.

## Directory & Org Chart
- Search input uses debounced filtering with NetInfo-aware refresh; filter chips cover department/location/pinned states (org chart remains backlog item).
- Profile card surfaces role, skills, email, and phone with offline-safe linking.
- **Implementation Snapshot (02 May 2024)**: FlatList header reports record counts, data source, and stale indicators; org chart visualisation remains mapped in design backlog.

## Knowledge Hub
- Single list with debounced search plus category/status selectors; each row shows category badge, summary, and metadata.
- Offline notice + data provenance header clarifies when cached data is displayed.
- **Implementation Snapshot (02 May 2024)**: Knowledge list operational with React Query caching and stale warnings; document preview remains future milestone.

## Service Hub
- Workflow health feed displays SLA hours, queue depth, and health badge per workflow with offline provenance header.
- Intake/approval flows remain scoped for later milestone.
- **Implementation Snapshot (02 May 2024)**: Workflow table uses shared offline notice component; next sprint adds intake wizard.

## Analytics & AI
- Analytics dashboards remain in design prototyping; mobile shell currently hosts telemetry hooks awaiting data endpoints.
- AI assistant experiences scoped for later milestone.
- **Implementation Snapshot (02 May 2024)**: Navigation placeholders intact; instrumentation ready for future modules.

## Settings & Admin
- Theme selection respects system preference with zustand store; manual theme toggles planned.
- Notification/feature flag consoles remain backlog while prerequisites finalised.
- **Implementation Snapshot (02 May 2024)**: Theme hydration stable across cold launches; admin tooling pending future sprint.
