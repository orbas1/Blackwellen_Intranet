# Widget Functions & Data Contracts – Version 1.50

## Overview
This document outlines functional behaviour, data inputs, outputs, and refresh cadences for each widget referenced in `Screens_Update.md` and `Screens__Update_widget_types.md`.

## Widget Functional Matrix
| Widget | Primary Function | Data Source | Refresh Cadence | Offline Strategy | Notes |
| --- | --- | --- | --- | --- | --- |
| Personal Task Stack | Surface top tasks assigned to user with quick actions | `/api/v3/tasks?status=open&limit=5` | Auto-refresh every 5 min; manual refresh icon | Cache last 20 tasks in IndexedDB/AsyncStorage; highlight stale badge after 15 min offline | Supports bulk complete via multi-select; uses optimistic updates |
| Quick Launch Actions | Provide shortcuts to create requests, log time, start chat | Static config from `/api/v3/quick-actions` | Daily on login; manual reorder persists | Stored locally; disabled state if action requires online connectivity | CTA navigates to relevant module with context payload |
| AI Insights | Summarise AI recommendations and highlight anomalies | `/api/v3/insights/recommended` (GraphQL) | Background refresh every 10 min or on persona change | Last response cached; hide if older than 1h and offline | Each insight includes `confidenceScore` used for badge colour |
| Celebration Feed | Display recognition updates, allow reactions | `/api/v3/recognition/feed` (WebSocket) | Real-time via WebSocket; fallback poll 30s | Offline shows cached feed with disabled reactions | Reaction interaction posts to `/api/v3/recognition/{id}/react` |
| Alert Summary | Provide compliance/policy warnings | `/api/v3/compliance/alerts` | Poll 15 min; manual refresh available | Cache 10 latest alerts; show “Sync needed” chip offline | Links deep-link to Knowledge articles |
| KPI Tile | Expose KPI value, delta, chart sparkline | `/api/v3/analytics/kpi/{id}` | Real-time via push (GraphQL subscription) | Cached snapshot; show greyed-out state if >30 min old | Supports threshold alerts; delta uses arrow icon + colour semantics |
| Alert Feed | List triggered analytics alerts requiring action | `/api/v3/analytics/alerts` | Push updates; fallback poll 60s | Offline queue stores dismiss/assign actions | Items include severity icons and open in Alert Detail overlay |
| Knowledge Spotlight | Highlight featured articles | `/api/v3/knowledge/spotlight` curated feed | Refresh at login + manual refresh | Offline stores last 3 features; indicates “Updated when online” | CTA opens Document viewer; ensures offline copy availability |
| Team Availability | Show teammates’ status (in office, remote, OOO) | `/api/v3/directory/status` | Poll every 5 min; manual refresh via pull-to-refresh | Offline shows last known state with timestamp | Tap opens detailed availability sheet |
| Route Card | Provide provider route overview and navigation start | `/api/v3/provider/routes/today` + Mapbox Directions | Refresh when location change >1km or manual refresh | Offline caches route steps; indicates when map is outdated | “Start Route” launches native navigation intents |
| Compliance Checklist | Guide provider through audit steps | `/api/v3/provider/checklists/{id}` | Real-time as tasks completed; manual sync button | Offline queue stores step completions; sync once online | Each step has photo capture requirement using camera component |
| Stock Gauge | Display inventory levels for assigned depot | `/api/v3/inventory/summary` | Poll every 15 min; manual refresh | Offline snapshot with percentage difference label | Warning threshold at <20% triggers highlight |
| Ticket Queue | Summarise support tickets awaiting action | `/api/v3/support/tickets?assignee=current` | Poll every 2 min; manual refresh via header action | Offline read-only; indicates actions disabled | Tapping ticket opens detail drawer with comment thread |
| Weather & Travel Advisory | Provide weather + travel alerts for field operations | External API `weather/v2/advisories` + internal travel feed | Refresh hourly; manual refresh  | Offline shows last known data with retrieval timestamp | Contains CTA to view extended forecast |

## Interaction Rules
- Widgets emit telemetry events `widget.view`, `widget.refresh`, `widget.action` with attributes (widget_id, persona, latency, success).
- Manual refresh shows overlay spinner (32px) for up to 4 seconds; if exceeded, display warning toast.
- Offline sync conflicts resolved using last-write-wins with server timestamp priority.

## Security & Permissions
- Widgets honour feature flag service `FFS` with keys (e.g., `widget.ai_insights.enabled`). Hidden widgets show placeholder until flag toggled.
- Sensitive data (Investment metrics) requires `role=FinanceExecutive`; fallback displays masked card with request access CTA.
- Audit logging: All state-changing actions (complete task, approve request) logged to `/api/v1/audit` with widget metadata.

## Error Management
- Hard failures show inline message, `Retry` button triggers exponential backoff (2s, 4s, 8s) up to 3 attempts.
- Partial data loads (e.g., missing chart) display fallback message and degrade gracefully to text summary.
- API schema changes tracked via contract tests; design flagged if field removed/renamed.

## Maintenance & Ownership
- Widget owners listed in Confluence table `DS › Widget Ownership`. Updates require notifying owner + engineering counterpart.
- QA automation uses Detox (mobile) and Cypress (web) scripts referencing widget IDs (`data-widget="kpi_tile"`).
- Localization files located `/locales/v1.50/widgets/*.json`; translation review scheduled Week 6.
