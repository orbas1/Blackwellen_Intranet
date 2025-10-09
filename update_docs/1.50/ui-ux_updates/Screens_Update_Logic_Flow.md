# Screens Update Logic Flow – Version 1.50

## Overview
This document maps user and provider pathways across the updated screens, describing entry points, decision nodes, data dependencies, and exit states. Each flow references supporting diagrams in `Screens_Update_Logic_Flow_map.md` and API specifications captured in `Logic_Flow_update.md`.

## Key Flows
### 1. Adaptive Home Personalisation
1. **Entry**: User launches app → Home screen loads with cached widgets (Skeleton state ≤800ms).
2. **Context Sync**: App requests `/api/v3/home/context` to retrieve persona, widget preferences, and active campaigns.
3. **Decision Node**: If response includes `requiresPersonalisation=true`, surface overlay drawer. Otherwise, show standard view.
4. **Overlay Steps**: (a) Choose priority topics (multi-select chips). (b) Confirm widget order via drag handles. (c) Save.
5. **Exit**: Persist settings to `/api/v3/home/preferences` (PATCH). Show toast confirmation with undo option 6s. Refresh widget data asynchronously.

### 2. Notification to Approval Completion
1. **Entry**: Push notification deep link or bell tap opens Activity Centre segmented to “Approvals”.
2. **List Interaction**: User swipes card → reveals Approve/Decline/Delegate (left-to-right). Confirm action triggers modal.
3. **Validation**: Modal fetches `/api/v2/approvals/{id}` with expanded context. If `riskLevel=high`, require MFA (Biometric/OTP) before action.
4. **Decision**: Approve (POST `/api/v2/approvals/{id}/approve`), Decline (POST `/decline`), Delegate (POST `/delegate` with user selection).
5. **Exit States**:
   - Success: Show success banner, update list item status and move to “Completed”.
   - Failure: Show inline error, keep item in list, log event to `/api/v1/telemetry/errors`.

### 3. Service Request Intake
1. **Entry**: From Home widget CTA, Service tab, or QR scan (provider app). Pre-populate request type if template selected.
2. **Step 1 – Request Type**: Select from catalogue. Decision: if template contains required attachments, pre-fill attachments list.
3. **Step 2 – Details**: Validate required fields on blur, show inline errors. Real-time SLA estimate retrieved from `/api/v3/service/sla`.
4. **Step 3 – Attachments**: Upload via drag/drop or camera. Progress tracked via `/api/v3/uploads/{id}` websockets. Offline queue retains uploads until network restored.
5. **Step 4 – Review**: Summarise data, allow edits. Submit triggers POST `/api/v3/service/requests`. On success, route to Confirmation screen with share options.

### 4. Service Tracker Workflow (Provider)
1. **Entry**: Provider selects Work Queue tab; view defaults to Kanban with saved filters.
2. **Decision Node**: If `viewMode=map`, load `/api/v3/requests/locations` and display map with route suggestions. Otherwise load `/api/v3/requests?status=*` for list.
3. **Drag Reassign**: Drag card to different column triggers PATCH `/api/v3/requests/{id}` with new status. Visual feedback (ghost card, 200ms).
4. **Detail Drawer**: Tapping card opens overlay with tabs. Comments tab subscribes to WebSocket channel for live chat updates.
5. **Exit**: When request marked Completed, show compliance checklist summary and prompt to log follow-up tasks.

### 5. Knowledge Search to Document Attestation
1. **Entry**: User enters search term; request to `/api/v3/knowledge/search` returns results sorted by relevance.
2. **Filters**: Changing chips updates query with `type` param. Sorting triggers re-fetch.
3. **Open Document**: Loads viewer with skeleton (toolbar, placeholder text). Document body fetched from `/api/v3/knowledge/{id}/content` (HTML) plus metadata for attestation.
4. **Decision**: If `isMandatory` true and `attested=false`, show banner with due date. CTA opens modal requiring checkbox + confirm.
5. **Exit**: On attestation confirm, POST `/api/v3/knowledge/{id}/attest`. Update list badges and send event to analytics.

### 6. Analytics Alert Investigation
1. **Entry**: Alert chip tapped → opens Alert Detail overlay.
2. **Data Fetch**: Request `/api/v3/analytics/alerts/{id}` returns summary, charts, recommended actions.
3. **Decision**: User selects action (Acknowledge, Assign, Create Scenario). Each triggers respective endpoints.
4. **Scenario Path**: Launch scenario builder modal, pre-fill metrics. Save triggers POST `/api/v3/analytics/scenarios`. Provide share link.
5. **Exit**: Completed actions update alert status (Acknowledged, In Progress, Resolved) and log to telemetry.

### 7. Settings & Accessibility Flow
1. **Entry**: Tap “More” tab → Settings.
2. **Sections**: Account, Notifications, Offline Data, Accessibility, Connected Apps.
3. **Accessibility Adjustments**: Slider updates theme preview in real time. Persist to `/api/v2/settings/accessibility` with debounce 500ms.
4. **Offline Management**: Clearing cache prompts confirmation modal, upon confirm call `/api/v2/settings/storage/clear`.
5. **Exit**: Save success toast, navigation back to prior tab retains state via route caching.

## Error Handling & Edge Cases
- All flows include offline queue fallback storing actions in `AsyncStorage`/`IndexedDB` with max 50 actions; user is prompted when queue >30.
- Validation errors follow consistent inline pattern with `catalyst-500` icon and descriptive text. For multi-step forms, prevent progression until resolved.
- Session expiration triggers modal overlay; after re-auth, resume flow at last completed step.

## Telemetry & Analytics
- Capture events for entry, step completion, errors, cancellations, and success for each flow. Event naming convention: `platform.module.flow.step` (e.g., `mobile.service.intake.submit`).
- Performance metrics: record API latency, screen render time, and offline queue flush duration. Data stored in `/api/v1/telemetry/ux`.
- Heatmap instrumentation for drag interactions to refine widget arrangement heuristics.

## Approval & Documentation
- Flow diagrams stored in FigJam board `FGJ:Flows/v1.50/screen-logic`. Exported map references embedded in `Screens_Update_Logic_Flow_map.md`.
- Engineering sign-off required after design walkthrough; track approvals in Jira tickets tagged `UIUX-150-Flow`.
