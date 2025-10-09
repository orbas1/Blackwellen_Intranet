# Screen Logic Flow Updates — Version 1.50

## Adaptive Home Personalisation Flow
1. User opens adaptive home dashboard.
2. System loads widget configuration and quick action set from `WidgetCompositionService`, applying persisted preferences (`DIRECTORY_V2`, `ADAPTIVE_HOME_PREVIEW`) and data view mode (`live`/`cached`).
3. User selects `Manage layout` or `Manage quick actions`; slide-out personalisation drawer lists widgets, density options, data freshness toggle, and quick action catalogue with provenance notes.
4. User drags widget to layout slot or toggles visibility; client updates layout preview, announces change via ARIA live region, and queues telemetry event `widget.layout.updated`.
5. System persists configuration, rehydrates layout, and emits telemetry payload (widget order, density, view mode, quick link set).
6. Drawer closes; confirmation banner summarises the update while focus returns to originating control.

## Theme & Contrast Switching Flow
1. User activates the theme switcher button in the global header; menu opens with focus on the current theme.
2. Arrow/Home/End keys cycle options (Aurora Light, Midnight Dark, Twilight, Ember, Tide, High Contrast) while description text updates via `aria-live` to confirm accent usage and accessibility notes.
3. Selecting an option persists preference via `PreferenceProvider`, applies token set from `themes.ts`, updates document colour-scheme, and emits telemetry `personalisation.theme.selected` with theme id and device context.
4. Double-clicking the trigger or pressing Ctrl/⌘ + Enter cycles to the next theme for power users; action recorded via `personalisation.theme.cycled` event.
5. Menu closes, focus returns to trigger, and success toast summarises the active theme when High Contrast is enabled to reinforce accessibility mode change.

## Service Request Submission Flow
1. User searches or filters the service catalog; selecting a template loads SLA telemetry, readiness checklist, and recommended knowledge articles.
2. Details step captures summary, urgency, date targets, and dynamic fields with inline validation and accessibility announcements for errors.
3. Attachments step enforces required documents, validates shareable links, and highlights acceptable file types before continuing.
4. Review step collates captured data, highlights outstanding validation items, and surfaces manager notification toggle prior to submission.
5. Submission posts to `/api/v2/service-hub/requests` with offline fallback queuing; success banner returns reference ID, ETA, and source (live vs cached).
6. Workflow telemetry updates the health dashboard; approvers receive notifications and can drill into the approval modal from the operations queue.

## Knowledge Attestation Flow
1. Compliance team publishes updated policy; flagged as mandatory with due date.
2. User receives notification; knowledge hub surfaces policy in top row with badge.
3. User opens document; attestation CTA requires acknowledging understanding.
4. Upon acknowledgment, system records attestation, updates progress tracker, and triggers confirmation email.
5. If user declines, a follow-up task is created for manager review.

## Analytics KPI Builder Flow
1. Admin enters Analytics console, selects `Create KPI`.
2. Wizard requests dataset selection, calculation logic, thresholds, and alert recipients.
3. On preview step, user adjusts chart type, annotations, and comparison baseline.
4. Saving persists KPI definition to analytics service and publishes to widget catalogue.
5. Telemetry event `analytics.kpi.created` recorded with metadata for governance.

## Analytics Control Tower Filter Flow
1. User lands on Overview tab; default dataset/timeframe/segment filters applied from last session or persona defaults.
2. Adjusting dataset opens searchable dropdown with dataset description and ownership metadata; selecting dataset triggers loading spinner and optimistic update of KPI cards.
3. Timeframe and segment chips update in place; cross-filtered KPI cards animate count-up with delta badges while assistant drawer context updates to reflect filter scope.
4. Filter changes broadcast to Alerts and Schedules tabs so switching tabs preserves selections without additional requests; stale data banner appears if backend timestamp exceeds freshness threshold.
5. User can reset to defaults via `Clear filters`, which restores persona baseline, removes stale banners, and emits telemetry `analytics.filters.reset` with previous selections stored for undo.

## Alert Acknowledgement & Schedule Governance Flow
1. User navigates to Alerts tab; rows display severity icon, dataset, impacted segment, and status.
2. Selecting `Acknowledge` opens side drawer with metric trend, recommended action checklist, and assignee dropdown; submission requires remediation note when severity is Critical.
3. On confirm, alert row updates to Acknowledged, timeline logs action, and follow-up reminder is scheduled with optional Slack/email notifications.
4. Switching to Schedules tab lists active reports; toggling `Pause` opens modal requesting pause duration and reason. Confirmation updates schedule badge, logs audit entry, and notifies subscribers.
5. Resume action validates that pause window elapsed or admin override provided; upon resume, assistant suggests reviewing last generated report and surfaces quick link to export.

## Security Posture Drilldown Flow
1. Security sidebar summarises mobile OS patch compliance, encryption state, and MFA status for selected segment.
2. Clicking a metric opens modal with device list, severity filters, and recommended remediation steps; unresolved items can be assigned to mobile support queue directly from modal.
3. User can trigger "Send instructions" to affected users, selecting channel (email, push) and message template. Confirmation logs communication event and updates device row history.
4. If device resolves issue, analytics refresh updates compliance gauge; resolved items auto-collapse after toast confirmation.

## AI Insight Feedback Loop
1. AI assistant surfaces recommendation with confidence score.
2. User can accept, snooze, or dismiss; any action logs event with reason codes.
3. Feedback captured via `/api/v2/ai/feedback` to retraining pipeline.
4. If flagged as inappropriate, ticket created for human review with context snapshot.
