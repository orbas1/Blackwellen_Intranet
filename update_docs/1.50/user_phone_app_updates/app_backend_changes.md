# Mobile Backend Integration Updates — Version 1.50

- React Native Axios client now targets `https://intranet.blackwellen.com/api` by default with overridable base URL for staging/dev builds.
- `fetchDirectory`, `fetchKnowledge`, `fetchWorkflows`, and `fetchWidgets` return typed results indicating source (`api`, `cache`, `fallback`) and stale state for UI messaging.
- Workflow summary schema expanded with breach percentage, backlog trend, and average completion metrics to match the enhanced service hub telemetry feed.
- Added analytics snapshot generator with dataset/timeframe/segment support mirroring web mock data, powering KPI, alert, schedule, and mobile security cards when API responses are unavailable.
- AsyncStorage persister caches payloads for 30 minutes; safe-get utility writes cache on successful calls and falls back to cache/mock data on failures.
- NetInfo integration exposes connectivity state to React Query focus manager ensuring refetching when app regains foreground + connectivity.
- Error handling centralised to log warnings with API path context while preserving user-facing offline banners.
