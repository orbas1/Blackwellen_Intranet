# User Application Logic Flow Changes – Version 1.50

## Overview
The mobile app’s interaction logic centres on adaptive experiences, real-time service management, and AI-augmented decision support. The flows below capture updated entry points, decision nodes, telemetry expectations, and edge cases required for development and QA alignment across iOS and Android.

## Global Flow Updates
- **Session Initialisation**: Splash → authentication (SSO / password) → biometric/passcode gate → persona fetch → personalised dashboard configuration. Added fallback to cached layout when offline and secure storage purge after 30 days inactivity.
- **Notification Routing**: Push notifications include deep-link metadata specifying tab, stack, optional modal context, and analytics tracking ID. Logic prioritises unsaved work prompts before navigation to prevent data loss; provides “Save draft & continue” option.
- **Assistant Integration**: Universal “Ask Blackwellen” CTA triggers assistant drawer. Responses may surface quick actions (Create Request, Locate Policy, Analyse Metric) with inline confirmation dialogs. Event logging captures question category, recommended action type, acceptance/decline, and follow-through completion.
- **Offline Mode**: Offline sync manager handles queued actions (requests, approvals, notes, document annotations). UI surfaces status chip when queue pending; logic replays actions upon reconnection with exponential back-off and failure escalation.
- **Security & Compliance**: Sensitive actions (investment approvals, access changes) require MFA challenge; repeated failures trigger session lockout and notify security channel.

## Primary Flows
### 1. Adaptive Home Personalisation
1. User authenticates → app fetches persona profile.
2. Persona determines default widget set, ordering, and data permissions.
3. Widgets request data concurrently; skeleton loading displayed until resolved or 5s timeout.
4. If data fetch >3s, assistant suggests “Refresh data” or “View latest summary”.
5. User long-press widget → customise modal to pin/unpin, reorder, change density, adjust thresholds. Changes sync to profile API with optimistic UI update.
6. Customisation success triggers toast + telemetry event; failure reverts to previous layout and surfaces retry.

### 2. Widget Library Management
1. User opens personalisation drawer → taps “Add widget”.
2. Library fetches available widgets filtered by persona and feature flags.
3. Selecting widget prompts configuration (data source, timeframe). Validation ensures required API tokens available.
4. On save, widget inserted into layout; empty state content shown until data arrives.
5. Removing widget prompts confirmation with note about data retention; deletion logged.

### 3. Service Request Creation & Tracking
1. Entry points: Home widget CTA, Service Hub tab, assistant suggestion, notification deep link, or offline queue retry.
2. Flow uses stepper with validation gating; incomplete mandatory fields highlight and block progression. Draft autosave occurs on step exit.
3. SLA chip updates based on form selections (location, priority). If SLA breach risk, assistant offers escalate guidance.
4. On submit, request stored locally and sent via API. Offline scenario queues action with timestamp and displays queued banner.
5. Confirmation screen offers “Track request”, “Share summary”, or “Create another”.
6. Tracker tab fetches paginated results; filters persist per session. Approvals require MFA when high-impact category detected; rejection path requires comment.

### 4. Service Operations & Escalation
1. Operations persona toggles to Team/Operations view.
2. Kanban board loads columns by status; drag card triggers assignment modal if moving to “In Progress”.
3. SLA monitor runs background timer; when request nears breach (<2h), card flagged and assistant surfaces reminder message.
4. Escalate action opens quick form (reason, target team). Submission notifies assigned team and logs timeline entry.

### 5. Knowledge Discovery & Consumption
1. User taps Knowledge tab or search; global search federated across documents, people, and requests.
2. Query analytics service returns recommended filters; user selection updates navigation tree and result cards.
3. Opening document loads metadata, version list, AI summary, and permissions check in parallel.
4. Summary progress indicator displayed until completion; failure triggers fallback summary request with simplified model.
5. Feedback controls allow rating summary accuracy, marking helpful/unhelpful. Data stored for assistant training and monthly report.
6. Offline access toggle caches document; sync manager verifies version freshness on next online session and prompts update if mismatch.

### 6. Document Attestation Workflow
1. Mandatory policy flagged → user sees attestation banner when viewing document.
2. Tapping “Acknowledge” opens modal summarising key points with checkbox for confirmation.
3. Confirmation triggers API call; success updates compliance tracker and removes banner.
4. If user declines, required to provide reason; escalate to manager via notification.

### 7. Employee Profile & Org Navigation
1. Directory search results open profile detail or jump into org chart view.
2. Org chart lazy-loads hierarchy levels; breadcrumb trail persists across navigation to maintain context.
3. “Start chat” CTA integrates with native messaging; permission check ensures user can contact target role.
4. Recognition slider posts kudos, triggering confirmation toast, push to recognition feed, and optional share to manager.
5. Manager-specific action “Adjust goals” opens external HR link with SSO handshake.

### 8. Analytics & Investment Insights
1. Analytics tab requests KPI definitions and latest metrics, applying cached dataset/timeframe/segment filters; managers can adjust via pill selectors with live preview updates.
2. Selecting KPI opens detail modal with chart, commentary, thresholds, and “Create alert” CTA. Modal includes provenance badge, export option, and AI insight card referencing applied segment.
3. Alert configuration requires metric, threshold, channel, frequency. Validation ensures at least one channel selected; success message summarises settings and offers acknowledgement reminder toggle.
4. Reporting schedule list allows pause/resume with reason capture and optional reminder date; paused schedules surface banner and assistant offers follow-up tasks.
5. Security posture panel summarises OS patch, encryption, and MFA compliance for selected segment with “Send guidance” CTA launching templated message workflow.
6. Investment approvals follow maker-checker: request opens summary → user reviews details → must provide note → confirm action → success toast + timeline update. Audit trail persisted and accessible via History tab.
7. Scenario planner flow allows adjusting parameters, previewing impact, and saving scenario to share. Saving triggers permission check; limited to managers/executives.

### 9. Assistant-Driven Automation
1. User prompts assistant for action (e.g., “Raise IT ticket for laptop issue”).
2. NLU classification selects service template; assistant confirms details and pre-fills form.
3. User reviews quick summary; accept executes request creation flow, decline cancels.
4. Completed actions tracked; assistant surfaces follow-up (“Would you like to monitor this request?”).

## Error Handling & Edge Cases
- **Session Timeout**: Idle >15 minutes prompts re-authentication. Unsaved forms cached locally with encryption and purged after successful submit or 48 hours.
- **API Degradation**: When KPI endpoint fails, fallback displays last cached metric with timestamp banner and “Retry” option. Service intake failure stores submission locally and triggers support ticket creation suggestion.
- **Permission Changes**: Role downgrade mid-session triggers soft refresh; restricted tabs show locked state with guidance to contact admin. Attempted access logs telemetry event.
- **Assistant Limits**: Rate limiting surfaces friendly notice, recommended knowledge articles, and re-enable time. Hard limit triggers contact support suggestion.
- **Attachment Upload Failures**: Partial uploads flagged with error status; user can retry individually or remove file. Offline queue excludes attachments above size threshold.

## Telemetry & QA Considerations
- Track conversion from assistant suggestions to completed actions, abandonment rates per step, and average time-to-complete for top flows.
- Ensure offline queue flush events captured with success/failure codes and correlated with network status logs.
- Validate analytics screen performance (<1.5s frame render) across devices; monitor drop-off when >2 charts active.
- Regression tests for navigation deep-links, particularly notifications leading into approval modals and assistant-suggested flows.
- Automate accessibility checks (focus order, label presence) for primary screens and modals.

## Dependencies & Follow-Up
- Requires backend support for widget ordering API, offline sync endpoints, AI summary service, and attestation logging.
- Pending finalisation of investment approval note character limits and comment retention policy.
- Security review scheduled for offline storage encryption configuration and biometric fallback handling.
- Need integration decision for push notification preference sync with web profile settings.
