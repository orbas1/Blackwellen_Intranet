# Logic Flow Update – Version 1.50

## Objective
Detail systemic logic changes required to support updated screens across user, provider, and web applications. Focus on decision rules, service calls, permissions, and offline handling.

## Global Logic Enhancements
- **Unified Context Service**: `/api/v3/context` merges persona, permissions, feature flags, and locale. Cached for 15 minutes; invalidated upon manual refresh or role switch.
- **Offline Queue Manager**: Shared module handles enqueue/dequeue of actions with retry policy (exponential backoff up to 5 attempts). Provides status UI in Settings → Offline Data.
- **Telemetry Hooks**: Standardised instrumentation naming, auto-attached to button components and forms via design token config.

## Flow-Specific Updates
### Adaptive Home Personalisation
- Load order: Render skeleton → fetch context & widget registry in parallel → load widget data sequentially prioritising quick wins (tasks, alerts) before heavy analytics.
- Personalisation overlay triggered when `context.personalisationStatus != COMPLETE`. Completed state persisted server-side; overlay suppressed for 30 days unless new widget added.
- Widget reorder persists via `PATCH /api/v3/widgets/order` with optimistic update; rollback if server fails.

### Service Intake
- Form sections use schema-driven definition from `/api/v3/service/forms/{type}` enabling dynamic fields and validation rules.
- Attachments support multi-part uploads with chunking (5MB chunks). On failure, chunk re-uploaded; final commit triggered when all chunks complete.
- SLA indicator computed client-side using thresholds from `/api/v3/service/sla`. If SLA <24h, highlight in `catalyst-500`.

### Approvals
- Approval actions require double-confirmation when risk score >80; triggers OTP modal (server verifies via `/api/v2/auth/otp`).
- Delegation logic fetches eligible delegates from `/api/v3/directory?role=approver`. Provide search with debounced requests (300ms).
- Post-action updates use WebSocket to update other clients; fallback poll 30s.

### Provider Workflows
- Route optimisation triggered when provider accepts >3 tasks with `distance >10km`. Calls `/api/v3/routes/optimise` returning new order.
- Compliance checklist enforces sequential steps; unlocking next step requires `completed=true` + optional photo. Logic handled client-side but validated server-side.
- Inventory adjustments create audit entry via `/api/v3/inventory/audit` (POST) before UI updates to ensure traceability.

### Knowledge & Attestation
- Attestation modal cannot be closed without action when due date < current date + 2 days. Provide “Remind me later” only if `allowDeferral=true`.
- Version history uses diff service `/api/v3/knowledge/{id}/versions` with `?compare=latest`. Diff overlay logic highlight modifications by text node.

### Analytics & Investment
- Alert detail loads recommended actions sorted by priority from `/api/v3/analytics/alerts/{id}/actions` (score property). Completed actions update scoreboard.
- Scenario planner ensures baseline dataset loaded before allowing modifications. If dataset missing, present CTA to connect data sources.
- Investment approvals require dual sign-off: first from finance, second from compliance. UI shows progress bar based on `approvalStages` array.

## Error Handling & Recovery
- Global error boundary surfaces friendly message and logs to `/api/v1/telemetry/errors` with screen + action context.
- Retry states present consistent UI with `Retry` button, `Contact support` link, and issue ID.
- Network detection uses exponential smoothing to avoid flicker; offline indicator triggered after 2 consecutive failures within 10s window.

## Security Considerations
- Sensitive data masked when user lacks `viewSensitiveData` permission; design indicates masked sections via hashed background pattern.
- Logging excludes PII; only hashed IDs stored. Telemetry sanitized before send.
- Session token refresh triggered silently 5 minutes before expiry.

## Implementation Alignment
- Engineering teams provided with JSON schema updates (Widget registry, Form definitions) by API team.
- QA to create flow-specific automated tests verifying decision logic (Detox, Cypress) aligned with this document.
- Any deviation must be logged in change log and reviewed with design + product leads.
