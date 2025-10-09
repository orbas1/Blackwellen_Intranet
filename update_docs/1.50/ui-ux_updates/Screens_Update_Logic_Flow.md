# Screen Logic Flow Updates — Version 1.50

## Adaptive Home Personalisation Flow
1. User opens adaptive home dashboard.
2. System loads widget configuration via `WidgetCompositionService` respecting `DIRECTORY_V2` and `ADAPTIVE_HOME_PREVIEW` flags.
3. User selects `Customize` → modal lists available widgets with descriptions and data sources.
4. User drags widget to layout slot; client updates layout preview and sends patch request.
5. Server persists configuration, rehydrates layout, triggers analytics event `widget.layout.updated`.
6. Confirmation toast appears; accessibility note: focus returns to widget header and announcement triggers via ARIA live region.

## Service Request Submission Flow
1. User selects `Submit Request` from Service Hub.
2. Intake wizard collects details; each step validates fields and shows SLA indicator.
3. On submit, request persisted via `/api/v2/service-hub/requests`; asynchronous job enriches data.
4. Success screen displays reference ID, expected response time, and next steps.
5. Workflow events notify approvers; approval modal accessible from request timeline.
6. Users can escalate or cancel from timeline with audit logging.

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
