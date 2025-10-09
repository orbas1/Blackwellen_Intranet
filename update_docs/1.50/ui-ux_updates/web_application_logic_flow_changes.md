# Web Application Logic Flow Changes – Version 1.50

## Overview
Web interaction flows prioritise adaptive personalisation, cross-department service management, analytics-driven decision-making, governance oversight, and parity with native experiences. The logic maps below highlight entry points, state transitions, telemetry, and conditional behaviours for the primary modules with emphasis on persona-specific nuances.

## Global Interaction Updates
- **Authentication & Persona Detection**: Post-login, system fetches persona configuration (Employee, Manager, Operations, Executive, Admin). Persona controls navigation visibility, default dashboard layout, widget availability, and feature toggles.
- **Feature Flag Handling**: UI respects flag combinations for adaptive widgets, AI assistant, investment approvals, analytics scenarios, and Insights Lab. Flag changes propagate via websocket to update components without hard refresh and log event for audit.
- **Notification Routing**: Notifications accessible via header icon and optional email digest. Clicking an item executes guard checks (permissions, unsaved changes) before deep-linking into detail view. Multi-select within notification drawer triggers bulk actions.
- **Assistant Integration**: Assistant sidebar can open anywhere; interactions produce suggestions with inline CTAs (e.g., “Create IT Ticket”, “Prepare summary”). Completed actions tracked for analytics, including drop-off reasons when user dismisses suggestion.
- **Session Continuity**: Auto-save drafts for service requests, knowledge articles, and admin configurations. Unsaved items persist across sessions with explicit restore prompts.

## Primary Module Flows
### 1. Adaptive Home
1. Persona determines widget library (core + persona-specific modules) and layout template.
2. Widgets load concurrently; skeletons displayed until data or timeout (5s). Data freshness indicator updates per widget.
3. Personalisation drawer allows drag-and-drop; changes persisted to profile service with optimistic UI update and error fallback.
4. Widget settings modal adjusts filters, thresholds, density, and notifications. Save triggers immediate re-fetch of data.
5. “Reset Layout” button restores default arrangement after confirmation; telemetry logs include reason (user-supplied).
6. Assistant monitors usage to propose new widgets based on recent activity; user can accept to auto-add or dismiss with reason.

### 2. Home Coaching Overlays
1. First-time persona sees guided tour overlay with step indicators.
2. Users can snooze tour or mark as complete; state stored in profile and accessible from help menu.
3. Tour progression tracked to ensure required steps completed (view widget library, open assistant, configure widget).

### 3. Service Hub Intake & Operations
1. User selects service from catalogue; guard rails confirm eligibility (role/location, required training).
2. Intake form uses multi-step process with inline validation. Required documents flagged; uploads validated for type/size and virus scan status.
3. On submission, confirmation modal summarises SLA, owner, next steps; user can add watchers or create follow-up task.
4. Operations dashboard auto-refreshes statuses via websocket. Managers can reassign requests via drag-and-drop between Kanban columns or using bulk actions.
5. Approvers receive notification; approval drawer enforces comment requirement when rejecting and requires review of outstanding tasks before approval.
6. Escalation triggers routing to next tier, sends notifications, and logs reason code.

### 4. Service Analytics Panel
1. Operations persona opens analytics tab within Service Hub.
2. Filters set default to last 30 days; user can adjust timeframe, department, priority.
3. Charts update and maintain cross-filter state; clicking data point opens filtered request list.
4. Export generates CSV or PDF; progress indicator shown. If >10k records, system prompts to narrow filters or schedule export.

### 5. Knowledge Management
1. Search queries concurrently index documents, FAQs, people. Results sorted by relevance; quick filter chips pre-populated from history.
2. Selecting article loads preview; AI summary generated asynchronously with progress indicator. Summary card includes accuracy rating option.
3. Users can request updates; flow triggers form capturing reason, urgency, and attachments. Submission routes to knowledge managers with SLA timer.
4. Attestation workflow: policies flagged “Requires Attestation” show banner; user must acknowledge (checkbox + confirm). Completion logged to compliance service, and reminder notifications suppressed.
5. Editorial workflow includes statuses (Draft, In Review, Approved, Published). Approvers can add inline comments; publishing triggers version increment and notification to subscribers.

### 6. Analytics & AI Insights
1. User lands on Analytics → loads saved default view with KPI set, dataset/timeframe/segment filters, and data freshness indicator persisted per persona.
2. Interacting with charts (hover, select range) updates detail panel and triggers cross-filters across other widgets while filter rail chips reflect applied segment. Undo/redo controls support quick comparison and restore previous filter state.
3. Alert creation flow: user selects metric → sets threshold → chooses notification channel (email, in-app, assistant) → optionally adds recipient group. Confirmation summarises settings with ability to test alert and set acknowledgement reminder window.
4. Alert acknowledgement drawer captures assignee, remediation note, and optional follow-up time. Completed acknowledgements update audit log and feed assistant insights.
5. Reporting schedules table exposes cadence, delivery channel, and pause/resume toggle requiring reason and optional resume date; schedule changes log to audit feed and notify subscribers.
6. Security posture sidebar surfaces OS patch, encryption, and MFA compliance gauges for the filtered segment with drilldown modal enabling device-level remediation actions and communication templates.
7. AI Insights cards propose actions; clicking “Apply” pre-fills request or configuration modal. If lacking permission, user sees escalation prompt with request access CTA.
8. Scenario planner allows saving, duplicating, sharing scenarios. Publishing scenario requires manager approval; system tracks revision history and comparisons.

### 7. Investment Management
1. Dashboard pulls portfolio data; risk gauge updates based on asset mix and compliance rules.
2. Approval queue filter sorts by risk, due date, asset class. Selecting row opens details drawer with compliance checklist, audit trail, supporting documents.
3. Approver must review checklist items (toggle or comment) before enabling confirm. Maker-checker logic ensures same user cannot submit and approve; if conflict detected, system prompts to assign delegate.
4. Completing approval triggers audit log entry, optional Slack notification, and updates to risk ledger.
5. Exception handling: if compliance issue flagged, approval blocked and comment required; system suggests remedial steps.

### 8. Admin Console
1. Roles & Permissions: Admin selects role → matrix of permissions displayed; updates saved after validation to ensure no orphaned required permissions. Changes require justification text and optional expiry date.
2. Feature Flags: Toggle change prompts confirmation modal with rollout notes. Bulk rollout uses staged percentage slider; progress tracked in status banner with pause option.
3. Audit Logs: Filters by date, user, module; export to CSV or JSON with pagination for large result sets. Sensitive entries require additional confirmation before export.
4. System Health: Real-time status tiles; clicking opens metrics modal with charts from observability service. Alerts escalate when thresholds exceeded.
5. Integrations: Connect/disconnect third-party apps; OAuth handshake flows instrumented with error handling and rollback on failure.

### 9. Insights Lab (Experimental)
1. Eligible users opt-in via toggle; acceptance triggers feature flag enabling experimental modules.
2. Experiments list displays status (Active, Upcoming, Completed) and metrics. Selecting experiment opens detail with hypothesis, rollout progress, participant feedback.
3. Feedback submission stored and aggregated; closing experiment prompts summary export and toggles off associated feature flags.

## Error Handling & Edge Cases
- **Unsaved Changes**: Leaving forms triggers modal; user can discard, save draft, or stay. Auto-save status displayed at footer.
- **Permission Revocation**: If backend signals permission change, UI hides restricted modules, surfaces toast, and optionally prompts to contact admin. Session log records event.
- **Data Latency**: When real-time updates fail, system displays stale data banner with timestamp and retry option. Widgets fallback to last known data snapshot.
- **Session Timeout**: 30-minute inactivity triggers warning countdown. User can extend session; otherwise redirect to login with restore draft prompt.
- **Conflict Resolution**: Concurrent edits on knowledge articles or admin settings display conflict modal with diff comparison and merge guidance.
- **Upload Limits**: Oversized attachments prompt error, suggest compression, and provide link to guidelines.

## Telemetry & QA Focus
- Monitor widget customisation adoption, layout resets, and time spent per widget to refine recommendations.
- Verify service request cycle times, approval completion rates, and escalation frequency; instrument SLA breach alerts.
- Track AI insight acceptance vs dismissal to calibrate recommendations; capture reasons for dismissal.
- Automated tests for persona-specific navigation, feature flag gating, cross-filter interactions, and compliance checklists.
- Accessibility testing covers keyboard navigation, skip links, focus retention, and aria-live messaging for dynamic updates.

## Dependencies & Follow-Up
- Requires completed API contracts for widget library, service catalog metadata, AI insights, investment approvals, attestation logging, and feature flag telemetry.
- Pending decision on caching strategy for knowledge search results and analytics scenarios to balance performance vs freshness.
- Security sign-off required for real-time websocket channel authentication and audit log export safeguards.
- Need alignment with DevOps on observability data sources for system health module.
