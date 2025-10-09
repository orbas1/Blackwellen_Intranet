# Provider Application Logic Flow Changes – Version 1.50

## Overview
- Supports field operations with resilient offline flows, automated route optimisation, and compliance enforcement.

## Key Logic Updates
1. **Shift Start Workflow**
   - Sequence: Authentication → Shift checklist (PPE confirmation) → Route preview. Completion required before queue access.
   - Checklist states stored locally; unsatisfied requirement prevents progression.

2. **Work Queue Management**
   - Queue data retrieved from `/api/v3/provider/queue` with filters (status, priority). Polling 30s; WebSocket subscription for live updates.
   - Manual reorder triggers PATCH `/queue/reorder` with new priority order. Conflict resolution uses server timestamp.
   - Map mode fetches geodata `/queue/locations` and calculates ETA via Mapbox Directions API. Offline fallback uses last cached coordinates.

3. **Request Detail & Checklist**
   - Steps enforced sequentially. Each step requires `completed=true` with optional attachments (photo, note). On completion, POST `/requests/{id}/steps`.
   - Compliance step with risk rating >3 requires supervisor approval; prompts escalation modal with call button.
   - Messages tab uses WebSocket `provider-requests-{id}` channel for chat updates.

4. **Inventory Adjustments**
   - Adjust action opens modal; entries validated against threshold rules. Submit PATCH `/inventory/{id}` with audit metadata.
   - Offline adjustments queued with `pendingSync=true`. On sync, UI updates status and adds success toast.

5. **Incident Reporting**
   - Multi-step: Details → Photos → Impact → Submit. Supports offline caching. On submit, POST `/incidents` with attachments (chunked upload).
   - If offline, store attachments locally, show countdown to automatic sync every 15 min.

6. **Offline Sync Manager**
   - Tracks queued actions in local DB. Sync cycle triggered when connectivity restored (two successful ping responses).
   - Provides manual “Sync now” action calling `/api/v3/sync`. Each item shows retries count; after 5 failures, mark as `attention` requiring manual resolution.

7. **Route Optimisation**
   - Triggered when new job assigned or manual request. Calls `/routes/optimise` with job list + constraints (time windows, skills). Returns new order and ETA.
   - UI shows preview with accept/decline. Declining requires reason (selected from list) stored for analytics.

8. **Notifications**
   - Provider notifications filtered to job-critical items. Approvals requiring provider response show CTA linking to detail screen.
   - On offline, notifications stored and displayed with timestamp + offline badge.

## Error Handling
- Provide actionable error messages (e.g., “Route optimisation unavailable. Retry when connected.”).
- Queue retrieval failure surfaces skeleton + retry button; after 3 failures, escalate to support link.

## Analytics & Telemetry
- Events: `provider.shift_start_complete`, `provider.queue_reorder`, `provider.checklist_step_complete`, `provider.sync_error`.
- Track time-to-complete for compliance checklists and incidents.

## Security
- Provider actions require device binding token refreshed daily.
- Sensitive data (customer addresses) masked in logs; only hashed references stored.

## References
- Flow diagrams stored `/figjam/v1.50/provider/logic/*.svg`.
- Aligns with documentation in `Logic_Flow_update.md` for shared services.
