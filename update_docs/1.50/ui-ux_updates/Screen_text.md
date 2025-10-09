# Screen Text & Microcopy – Version 1.50

## Tone & Voice Principles
- Confident, concise, empathetic. Use action-oriented verbs (“Review”, “Submit”, “Explore”).
- Provide clarity on next steps, avoid jargon, ensure compliance-critical text includes legal disclaimers when required.
- Support localisation by using placeholders (`{{variable}}`) and avoiding hard-coded concatenation.

## Primary Screens Microcopy
### Adaptive Home
- Persona header: “Good {{timeOfDay}}, {{firstName}}.”
- AI Insights widget: “Here’s what changed since yesterday.”
- Compliance alert: “Policy {{policyId}} needs your acknowledgment.”
- Quick links: “Create request”, “Log time”, “Share update”, “Open analytics”.
- Empty states: “No tasks scheduled. Create one or sync with your planner.”

### Notifications & Activity Centre
- Tabs: “Alerts”, “Approvals”, “Updates”, “System”.
- Action buttons: “Review details”, “Snooze for 1 day”, “Dismiss”.
- Success toast: “Approval recorded. Stakeholders notified.”
- Empty copy: “All caught up. New updates arrive here.”

### Service Intake
- Stepper labels: “Select type”, “Add details”, “Attachments”, “Review & submit”.
- Field hints: “Describe the request in clear terms so our team can help faster.”
- Validation message: “Please provide a due date to set expectations.”
- Confirmation message: “Request {{requestId}} submitted. We’ll keep you updated.”

### Service Tracker & Approvals
- Column headers: “Backlog”, “In progress”, “Needs review”, “Completed”.
- Card metadata: “Due in {{duration}}”, “Assigned to {{assignee}}”.
- Bulk action banner: “{{count}} items selected. Choose an action.”
- Approval modal: “Review the summary and approve when you’re confident.”

### Knowledge Hub & Document Viewer
- Search placeholder: “Search policies, guides, and training.”
- Filter chips: “Policies”, “How-to”, “News”, “Training”.
- Attestation banner: “Please confirm you’ve read {{documentTitle}} by {{dueDate}}.”
- Version history: “Version {{versionNumber}} · {{author}} · {{timestamp}}”.

### Analytics Snapshot
- Section titles: “My metrics”, “Team metrics”, “Benchmarks”.
- Tooltip text: “Delta compares current period to {{comparisonPeriod}}.”
- Alert CTA: “Investigate alert”, “Assign follow-up”, “Acknowledge”.

### Investment Oversight
- Risk gauge labels: “Stable”, “Watch”, “Action needed”.
- Compliance checklist: “Capture supporting documentation before final approval.”
- Portfolio summary: “Next review on {{reviewDate}}.”

### Provider Work Queue
- List filter placeholder: “Filter by status, SLA, or route.”
- Empty state: “No scheduled visits. New assignments will appear here.”
- Map callout: “Start route” / “Navigate with Maps”.

### Settings
- Section headings: “Account security”, “Notifications”, “Offline data”, “Accessibility”, “Connected apps”.
- Toggle labels: “Enable biometric sign-in”, “Quiet hours”, “Download for offline use”.
- Accessibility slider: “Text size” with markers “Standard”, “Comfort”, “Large”.
- Confirmation toast: “Preferences saved.”

## Microcopy for Error & Offline States
- Generic error: “Something went wrong. Try again or contact support if the issue persists.”
- Offline banner: “You’re offline. We’ll sync changes when you reconnect.”
- Upload failure: “Attachment failed to upload. Retry when connection improves.”
- Approval error: “We couldn’t record your decision. Double-check your connection.”

## Compliance & Legal
- Investment approvals include disclaimer: “Decisions must comply with corporate investment policy section 4.2. Audit trail recorded.”
- Data privacy: “We process your data according to the Blackwellen privacy policy.”
- Attestation confirmation: “Your acknowledgment is recorded for compliance audit.”

## Localisation Guidance
- Provide translation strings in `/locales/v1.50/screens/*.json`.
- Reserve 25% horizontal expansion for German/French translations. Avoid truncated CTA text.
- Support RTL languages with mirrored iconography and navigation order.
- Provide glossary for key terms (e.g., “Service Hub”, “Scenario Planner”) to maintain consistency.

## Content Governance
- Content strategist reviews microcopy during Milestone 4 and 6.
- Track revisions in Ditto version history and update this doc accordingly.
- Ensure date/time formats follow user locale (ISO 8601 fallback).
