# Web App Wireframe Changes – Version 1.50

## Summary
The web experience for Version 1.50 introduces an adaptive home workspace, unified service hub, enriched knowledge library, analytics console, investment oversight, and administrative tooling. Wireframes standardise navigation, component density, contextual help, and data visualisation patterns across persona-based dashboards (Employee, Manager, Operations, Executive, Admin). Deliverables include annotated layouts, redlines, and persona-specific variants for desktop, large desktop, and tablet breakpoints.

## Navigation & Layout Framework
- **Global Header**: Left logo, centre global search bar (supports quick filters, command palette), right utility cluster (notifications, assistant trigger, help, user menu). Header persists across app with drop shadow and optional environment indicator (Production, Staging).
- **Side Navigation**: Collapsible left rail with primary sections: Home, Directory, Knowledge, Service Hub, Analytics, Investments, Admin, Insights Lab. Icons align with Outline 2.0 set, labels appear on hover when collapsed. Active state uses Aurora 500 border and background tint.
- **Workspace Canvas**: Content area uses 12-column grid (max width 1440px). Default gutter 24px, section spacing 32px. Tablet breakpoint reflows to 8-column grid with 20px gutters.
- **Contextual Sidebar**: Right-hand panel (optional) surfaces quick actions, related content, approvals queue, or assistant insights. Collapsible for minimal view.
- **Persistent Utilities**: Bottom-right quick launcher floating action button replicates mobile shortcuts (Create Request, Log Time, Launch Assistant) for parity.

## Page Wireframes
1. **Adaptive Home Dashboard**
   - Hero banner with welcome message, quick actions (Create Request, Log Time, Launch Assistant, View Release Notes).
   - Widget grid supporting 1x1, 1x2, 2x2, and 3x2 modules. Includes analytics snapshots, task list, knowledge spotlight, recognition feed, service queue, compliance alerts, open approvals, recent conversations.
   - Personalisation drawer allows drag-and-drop, resizing, widget library search, density toggles, and background theme selection.
   - “What’s New” panel summarises recent releases, design updates, and training tips.

2. **Notifications & Activity Centre**
   - Drawer sliding from right. Sections for Alerts, Approvals, Updates, Announcements. Each item shows icon, summary, timestamp, CTA buttons (View, Dismiss, Assign) and quick filter chips.
   - Bulk actions at top (Mark all read, Pause notifications, Configure preferences). Search field filters notifications by keyword.

3. **Employee Directory**
   - Split layout: filters panel (department, location, tenure, skills, language, availability) on left, results table centre, profile preview on right.
   - Table supports infinite scroll, alphabetical grouping, quick column configuration, and export to CSV. Profile preview includes key contact actions and availability schedule.
   - Directory includes “Org Map” toggle to visualise relationships on radial chart.

4. **Employee Profile**
   - Header with photo, name, role, contact actions, pronouns, location. Tabs: Overview (bio, skills, documents, kudos), Org Chart (hierarchical tree with zoom + breadcrumbs), Analytics (engagement metrics, recognitions, time-off), History (projects, performance reviews), Objectives (OKRs with progress bars).
   - Secondary sidebar houses related people, shared projects, and AI suggested collaborators.

5. **Knowledge Hub**
   - Left navigation tree (categories, favourites, saved searches, compliance). Main pane toggles between card gallery, table view, and timeline of updates.
   - Document preview inline on select with metadata, version history timeline, attachments, related articles. AI summary panel provides highlights and recommended actions.
   - Top actions: Upload, Create Article, Request Update, AI Summarise, Compare Versions.
   - Review queue view for knowledge managers showing pending approvals and SLA statuses.

6. **Service Hub Portal**
   - Landing page featuring service catalogue cards grouped by department (IT, HR, Finance, Facilities, Workplace, Legal). Search and filter chips at top, plus recommended templates based on persona.
   - Request intake form uses multi-column layout (form fields left, guidance right) with stepper anchored top. Review step includes summary table, attachments list, comment box, and policy links.
   - Operations dashboard: Kanban board (New, In Progress, Waiting, Resolved), SLA compliance donut charts, workload heatmap, and backlog trend graph.
   - Knowledge embed shows related articles relevant to selected service.

7. **Service Request Detail**
   - Header with status pill, request title, ID, SLA countdown, assigned team, watchers.
   - Tabbed body: Timeline (events, comments), Details (form fields), Attachments, Approvals, Linked Assets. Right column features quick actions (Escalate, Assign, Clone) and assistant suggestions.
   - Approval modal includes risk summary, dependency checklist, and mandatory comment field.

8. **Analytics & AI Console**
   - Toolbar with saved views dropdown, date range picker, compare toggle, filter chips, and share/export actions.
   - KPI overview grid, interactive charts (line, bar, area, heatmap), anomaly alerts list, narrative insight cards.
   - AI Insights tab displays conversational cards with “Apply Insight”, “Schedule Review”, and “Share” actions. Scenario builder modal allows parameter adjustments, baseline comparison, and assumption tagging.
   - Data governance banner indicates data freshness and quality scores.

9. **Investment Management Dashboard**
   - Overview cards (Assets Under Management, Risk Score, Liquidity, Compliance). Middle section dedicated to stacked bar showing allocation by asset class with hover details.
   - Approval queue table with filter row, details drawer showing compliance checklist, risk commentary, approvals history before confirm.
   - Portfolio health timeline shows trends with annotations for major events.
   - Regulatory documents section with quick download and acknowledgement tracking.

10. **Admin Console**
    - Tabs for Roles & Permissions, Feature Flags, Audit Logs, System Health, Integrations.
    - Roles view displays matrix of permissions with inline search, bulk assign, and dependency warnings.
    - Feature flag tab uses toggles, segmentation controls, rollout percentage slider, scheduled activation timeline, and change log.
    - System health page visualises service status, latency, error rate, release train calendar.

11. **Insights Lab (Experimental)**
    - Sandbox workspace for testing AI-driven features. Cards show experiments, opt-in toggles, metrics, and feedback forms.
    - Experiment detail displays hypothesis, metrics, timeline, and survey results.

## Responsive Considerations
- Breakpoint adjustments for 1440px (max width), 1280px (shrink widget columns), 1024px (side nav collapses), 900px (contextual sidebar becomes drawer), 768px (widgets stack, tables convert to cards), 600px (single-column layout matching mobile parity).
- Persistent actions moved into kebab menus at smaller widths; quick launcher shifts to header.
- Drag-and-drop interactions replaced with “Move Up/Down” controls on tablet/mobile for accessibility.

## Interaction Annotations
- **Personalisation Flow**: Documented hover states, drag handles, drop zones, undo toast, and auto-save indicator. Includes onboarding coach marks for first-time customisation.
- **Assistant Sidebar**: Outlines quick prompt library, transcript panel, action cards, and pinned insights. Provides behaviour for collapsed and expanded states.
- **Approval Flow**: Shows guardrails for missing documents, conflict of interest checks, and requirement to assign delegate when out-of-office.
- **Analytics Cross-Filtering**: Redlines demonstrate filter propagation between charts, KPI tiles, and tables with loading overlays.
- **Accessibility States**: Focus order diagrams, skip link placement, keyboard shortcuts (Shift+K knowledge search, Shift+A assistant, Shift+F flag toggle).

## Prototype Deliverables
- Figma pages separated by persona with component references, annotations, and developer links. Include interaction notes per frame.
- Interactive prototypes cover flows: Home Customisation → Save Layout, Service Request Submission → Operations Reassignment, Knowledge Browse → Document Attestation, Analytics Alert Drilldown → Scenario Publishing, Investment Approval → Compliance Checklist, Admin Feature Flag Rollout → Audit Log Review.
- Usability testing prototypes instrumented with Maze for click analytics.

## Research & Validation Insights
- Tree testing validated navigation labels and grouping; adjustments made to rename “Knowledge” to “Knowledge Hub”.
- Concept testing with operations managers led to addition of backlog trend graph and workload heatmap.
- Finance stakeholders requested compliance checklist gating prior to approvals; integrated into detail wireframes.
- Accessibility review surfaced need for alternative to drag-and-drop; added reorder dropdown for keyboard users.

## Outstanding Decisions
- Finalising default widget set for Admin and Executive personas, including thresholds for compliance alerts.
- Determining whether analytics console requires dark canvas mode for chart readability and potential toggle placement.
- Aligning investment dashboard compliance checklist with legal team feedback on required attestations.
- Confirming integration of third-party ticketing (ServiceNow) within service detail drawer vs external link.
- Need guidance on exposing Insights Lab to all users or restricting to opt-in beta cohort.
