# Screen Logic Flow Updates — Version 1.50

## Adaptive Home Personalisation Flow
1. User opens adaptive home dashboard.
2. System loads widget configuration and quick action set from `WidgetCompositionService`, applying persisted preferences (`DIRECTORY_V2`, `ADAPTIVE_HOME_PREVIEW`) and data view mode (`live`/`cached`).
3. User selects `Manage layout` or `Manage quick actions`; slide-out personalisation drawer lists widgets, density options, data freshness toggle, and quick action catalogue with provenance notes.
4. User drags widget to layout slot or toggles visibility; client updates layout preview, announces change via ARIA live region, and queues telemetry event `widget.layout.updated`.
5. System persists configuration, rehydrates layout, and emits telemetry payload (widget order, density, view mode, quick link set).
6. Drawer closes; confirmation banner summarises the update while focus returns to originating control.

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

## AI Insight Feedback Loop
1. AI assistant surfaces recommendation with confidence score.
2. User can accept, snooze, or dismiss; any action logs event with reason codes.
3. Feedback captured via `/api/v2/ai/feedback` to retraining pipeline.
4. If flagged as inappropriate, ticket created for human review with context snapshot.
