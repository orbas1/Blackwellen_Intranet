# Screens Update — Version 1.50

## Overview
Version 1.50 refreshes the adaptive home, directory, knowledge, service hub, analytics, and admin screens to remove provider references and deliver personalisation, compliance, and accessibility improvements.

## Adaptive Home
- **Layout**: Three-column desktop grid with drag-and-drop widget slots, density modes (comfortable/compact), and a persistent quick action rail managed via the personalisation drawer.
- **Widgets**: KPI tiles, celebrations, quick links, AI insights, tasks, and knowledge spotlight. Each surfaces provenance badge, last refresh timestamp, and `Configure` icon with tooltip guidance.
- **States**: Loading skeleton, empty state with CTA to add widgets, offline banner displaying cached snapshot provenance, and error fallback with retry button.
- **Accessibility**: Tab order flows left-to-right, top-to-bottom; drag handles expose keyboard listeners; ARIA labels announced when widgets are reordered or toggled within the drawer.

## Employee Directory & Profiles
- **Directory Search**: Faceted filters with pill-style chips, live result count, and pinned quick filters for "My Team" and "New Hires".
- **Profile Drawer**: Contains summary card, contact actions, skill tags, project history timeline, and manager notes.
- **Celebrations View**: Horizontal carousel with quick recognition actions and ability to schedule shout-outs.
- **Accessibility**: Added skip link to bypass filter panel; profile images include descriptive alt text; timeline supports keyboard navigation.

## Knowledge & Document Hub
- **Navigation**: Tree view on left, document table center, preview pane right with metadata accordion.
- **Version Control**: Timeline showing approvals, edits, and attestation history with filter to show only pending acknowledgements.
- **AI Integration**: Tag suggestion panel with accept/reject, plus AI summary card with confidence indicator.
- **Accessibility**: Document preview supports high-contrast mode; keyboard shortcuts documented for toggling metadata and comments.

## Service Hub
- **Request Intake**: Guided wizard (Details → Attachments → Review) with inline SLA telemetry, checklist sidebar, and validation states that call out missing attachments, dates, or routing details.
- **Service Catalog**: Filter rail with department toggles, global search, SLA badge legend, and cards surfacing request volume, priority, tags, and last update timestamp.
- **Knowledge Support**: Contextual knowledge list and readiness checklist persist beside the form, highlighting breach trends, average completion, and must-read articles before submission.
- **Request Tracking**: Kanban board with swimlane toggles (Priority, Department, Age) and quick filters for overdue tasks.
- **Approval Modal**: Includes risk summary, required attachments list, and comment history.
- **Accessibility**: All form elements labelled; error messages include ARIA live region updates; board supports keyboard drag alternatives using move buttons.

## Analytics & AI Console
- **Dashboard**: Tabbed navigation (Overview, KPI Builder, Alerts, Datasets); each tab retains context when switching.
- **KPI Builder**: Multi-step wizard to define metrics, set thresholds, and configure alerts; includes preview chart with annotation tools.
- **AI Drawer**: Provides narrative insights, recommended actions, and timeline of user feedback.
- **Accessibility**: Charts include data tables accessible via toggle; keyboard shortcuts for annotations documented.

## Admin & Settings
- **Feature Flag Console**: Table view with search, segmentation preview, rollout percentage slider, and audit log panel.
- **RBAC Manager**: Role matrix with inline edit support, permission search, and export capability.
- **Notification Preferences**: Multi-channel toggles with context copy, timezone info, and digest frequency settings.
- **Accessibility**: Focus management for modals, tooltip descriptions, and consistent error boundaries across forms.

## Testing & Validation
- Design QA checklists updated with screenshot references and accessibility acceptance criteria per screen.
- Automated visual regression baseline captures 25 key states across web and mobile experiences.
- Usability testing plan prioritises widget personalisation, service request submission, and analytics KPI creation.
