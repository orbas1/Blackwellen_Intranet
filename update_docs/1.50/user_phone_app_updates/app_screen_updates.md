# Mobile App Screen Updates — Version 1.50

## Adaptive Home
- Quick action cards display adaptive widgets with provenance (live/cache/fallback) messaging and optional deep links.
- Offline notice component surfaces above the stack whenever connectivity drops.
- **Implementation Snapshot (02 May 2024)**: React Native cards backed by React Query cache; personalization gestures remain on roadmap.
- Aurora tokens now drive card, text, and border styling to mirror web palettes and meet updated accessibility baselines.

## Directory & Org Chart
- Search input uses debounced filtering with NetInfo-aware refresh; filter chips cover department/location/pinned states (org chart remains backlog item).
- Profile card surfaces role, skills, email, and phone with offline-safe linking.
- **Implementation Snapshot (02 May 2024)**: FlatList header reports record counts, data source, and stale indicators; org chart visualisation remains mapped in design backlog.
- Input fields and metadata rows consume shared Aurora tokens for consistent contrast, while placeholder/selection colours follow design QA overlay guidance.

## Knowledge Hub
- Single list with debounced search plus category/status selectors; each row shows category badge, summary, and metadata.
- Offline notice + data provenance header clarifies when cached data is displayed.
- **Implementation Snapshot (02 May 2024)**: Knowledge list operational with React Query caching and stale warnings; document preview remains future milestone.
- Tag chips and status badges restyled with shared info palette to match web analytics theme specifications.

## Service Hub
- Workflow health feed displays SLA hours, queue depth, and health badge per workflow with offline provenance header.
- Intake/approval flows remain scoped for later milestone.
- **Implementation Snapshot (02 May 2024)**: Workflow table uses shared offline notice component; next sprint adds intake wizard.
- Health badges and SLA labels now use status token ramp aligned with design QA overlay diagnostics.

## Analytics & AI
- Added analytics intelligence screen with dataset/timeframe/segment selectors, KPI summaries, alert cards, and schedule status mirroring the web control tower.
- Highlights and mobile security posture tiles reuse mock analytics generators, React Query caching, and offline provenance messaging.
- **Implementation Snapshot (09 May 2024)**: Screen live in navigation with deterministic datasets, alert severity badges, and responsive grid; conversational AI interaction remains scoped to future sprint.
- KPI cards, alerts, and security tiles leverage harmonised token palette; design QA overlay parity scenarios documented for QA acceptance.

## Settings & Admin
- Theme selection respects system preference with zustand store; manual theme toggles planned.
- Notification/feature flag consoles remain backlog while prerequisites finalised.
- **Implementation Snapshot (02 May 2024)**: Theme hydration stable across cold launches; admin tooling pending future sprint.
- Overlay usage guidance embedded in settings documentation so designers and QA can verify parity from native builds.
