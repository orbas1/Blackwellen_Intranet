# User App Wireframe Changes – Version 1.50

## Summary
The Version 1.50 mobile experience prioritises parity with the adaptive home, service intake, analytics insights, and investment oversight delivered on web. Wireframes cover iOS and Android with a shared component library, platform-specific navigation chrome, tablet adaptations, and offline contingencies. Each screen accounts for biometric entry, push notification deep links, AI assistant integration, and progressive disclosure for dense data sets.

## Screen Catalogue
1. **First-Run Orientation & Permissions**
   - **Welcome Carousel**: Three-card sequence introducing adaptive home, assistant, and offline support with illustrations. Final slide prompts notification and biometric permissions.
   - **Personalisation Survey**: Optional two-step form collecting role, team, and priority topics to seed widget order and knowledge feeds.
   - **Data Sync Status**: Progress panel shows initial sync of tasks, requests, analytics. Includes cancel/defer option for low bandwidth environments.

2. **Authentication & Session Management**
   - Splash screen with logo animation transitions to sign-in (SSO button, fallback username/password). Loading indicator uses progress ring with accessible text.
   - Biometric/passcode gate for returning users. Error states show inline hints and “Reset via desktop” CTA.
   - Session timeout dialog features countdown, extend button, and security reminder.

3. **Adaptive Home Dashboard**
   - **Structure**: App bar (left: quick launcher, centre: persona-based title, right: notification bell + search). Beneath sits horizontal chip filter (“Today”, “Week”, “Quarter”, “Custom”). Main body uses vertically stacked widget cards with peek carousels for analytics, recognition, and knowledge highlights.
   - **Widgets**: Personal tasks, service requests, knowledge spotlight, AI assistant prompt, team metrics, recognition feed, compliance alerts, quick links. Each widget includes primary metric, supporting text, CTA pill, and overflow menu for configuration.
   - **Personalise Drawer**: Floating button opens drawer allowing reorder (drag handles), toggle density, change timeframe, and add/remove widgets from catalogue.
   - **Footer Navigation**: 5-tab bar (Home, Directory, Service Hub, Knowledge, More). Active tab uses primary accent underline, filled icon, haptic feedback.

4. **Notification & Activity Centre**
   - Fullscreen modal accessible via bell or deep link. Segment control toggles Alerts / Approvals / Updates / System.
   - Each list item shows icon, summary, timestamp, CTA buttons (“View”, “Snooze”, “Dismiss”). Swipe gestures for quick actions, with confirmation snackbar.
   - Settings gear opens notification preference stack (per channel toggles, digest frequency, quiet hours).

5. **AI Assistant Drawer**
   - Sliding panel anchored bottom with 75% height expansion option. Input field supports text, voice, and attachment of screenshots.
   - Conversation timeline uses alternating bubbles; assistant responses include action buttons (Create Request, Share Report, Summarise Policy) and copy-to-clipboard.
   - Suggested prompt carousel updates contextually (based on page, time, persona). Contains “What changed since yesterday?”, “Prepare approval summary”, etc.

6. **Service Request Intake & Templates**
   - Entry via Home widget, Service tab, assistant suggestion, or QR code scan. Landing shows catalogue cards grouped by department with metrics (SLA, trending volume).
   - Stepper header (Request Type → Details → Attachments → Review). Each step uses segmented form layout with inline validation, context help, and required/optional tags.
   - Template picker lists frequently used request templates with preview of auto-filled fields. Allows saving personal templates.
   - Confirmation view summarises SLA, assigned team, attachments, and provides track/share/export actions.

7. **Service Request Tracker & Approvals**
   - Tabbed layout (My Requests, Team, Approvals, Archive). Cards show status pill (colour-coded), request title, ID, last update, watchers, and action button (view, approve, escalate).
   - Detailed view includes timeline (submitted, triaged, in-progress, completed), message thread, attachments, and SLA gauge.
   - Bulk approval flow allows multi-select with summary banner; security step enforces MFA for high-risk categories.

8. **Employee Directory & People Search**
   - Search bar pinned below app bar with filter drawer (Department, Location, Skills, Availability, Language). Results list shows avatar, name, role, availability dot, and quick actions (Call, Message, Schedule).
   - Smart suggestions surface frequent contacts and cross-functional partners. Empty state provides tips and add-to-favourites CTA.

9. **Employee Profile & Org Chart**
   - Hero header with gradient overlay on profile photo, key info (role, department, manager), recognition badges, and follow button.
   - Tabs for Overview (contact chips, skills tags, recognition slider, current goals), Org Chart (expandable tree with breadcrumbs, jump-to-team), Projects (cards with status), Knowledge contributions (list with filter chips).
   - Manager view includes team health cards (engagement score, open requests) and quick notes panel.

10. **Knowledge Hub & Document Library**
    - Two-panel responsive layout: left side collapsible tree (categories, favourites, saved searches), right side card list or document preview. Filter chips (Policy, How-To, News, Training) and sort (Newest, Trending, Mandatory).
    - Featured “What’s New” carousel highlights updated policies. Offline badge for synced documents, with manage downloads modal.
    - Search results show content type, snippet, tags, and relevance score. Long-press to save offline or share.

11. **Document Viewer & Annotations**
    - Fullscreen reader with toolbar (back, share, bookmark, AI summary, version history). Floating comment button opens anchored annotations.
    - Version history bottom sheet shows timeline with author, change summary, diff preview, and restore option.
    - Attestation banner for mandatory policies includes acknowledge button, due date, and escalate link.

12. **Analytics Snapshot & Drilldowns**
    - Dashboard screen with KPI cards in 2-column grid, trend charts (line, bar, area), and alert list. Toggle for “My Metrics”, “Team Metrics”, “Benchmarks”.
    - Chart interactions support pinch-to-zoom, filter chips, and share as PDF. Alert detail surfaces context, thresholds, and recommended action.
    - Scenario builder modal allows adjusting parameters (date range, department, scenario) and previewing impact summary.

13. **Investment Portfolio & Approvals**
    - Tabs for Overview, Holdings, Approvals, History. Overview features net asset card, risk gauge, upcoming actions timeline, and exposure heatmap.
    - Approval detail view summarises investment request, compliance checklist, risk commentary, supporting documents, and notes field.
    - Holdings table includes sort, filter, and quick export; card view for small screens.

14. **Collaboration & Messaging Hooks**
    - Inline chat widget accessible from service request or project detail screens. Provides history, attachments, and escalate to call button.
    - Mentions (using @) trigger suggestion list with avatars and roles.

15. **Settings, Preferences & Accessibility**
    - Sectioned list (Account, Notifications, Offline Data, Accessibility, Connected Apps). Toggles, dropdowns, navigation rows align to updated component styles.
    - Accessibility panel exposes text size preview, colour contrast toggle, reduced motion, and haptic feedback options. Includes preview screen to verify selections.
    - Data controls allow clearing caches, managing downloads, and viewing privacy notice.

16. **Support & Feedback**
    - Help centre screen offering quick links (FAQs, Contact Support, Submit Idea, View Release Notes). Inline search filters by topic.
    - Feedback form uses stepped modal capturing rating, sentiment, description, and optional attachment/screenshot capture.

17. **Offline Mode & Error States**
    - Dedicated offline banner with quick sync action, queue length indicator, and view queued actions link.
    - Error resolution screen suggests next steps, includes contact support, retry, and diagnostics sharing toggle.

## Layout & Interaction Annotations
- **Gesture Mapping**: Documented swipe, drag, long-press, and pull-to-refresh behaviours with guardrails to prevent accidental navigation conflicts.
- **Adaptive Grid**: Provided redlines for small (360–400px), medium (401–600px), and large (>600px) device widths, including padding, card heights, and typographic adjustments.
- **Status Indicators**: All list items now support dual-status presentation (primary state pill + secondary icon for urgency or SLA risk).
- **Loading Patterns**: Skeleton variations defined for cards, tables, charts, forms, and modals. Progress indicators contextual (spinner, progress bar, shimmer) based on action type.
- **Empty & Zero States**: Each module includes message copy, illustration reference, and recommended next action (e.g., “Create request”, “Invite teammates”, “Adjust filters”).

## Persona-Specific Variants
- **Manager Persona**: Home emphasises team metrics, pending approvals, and engagement. Additional screen variant for team workload heatmap and recognition actions.
- **Operations Persona**: Service tracker defaults to Kanban layout with bulk tools pinned. Includes quick filters for queue owner, aging threshold, and SLA breaches.
- **Executive Persona**: Analytics snapshot includes portfolio of KPIs with drillthrough to board-ready report view and share to email/assistant.

## Prototype Deliverables
- Annotated wireframes created in Figma with screen variants for iPhone 14, Pixel 7, Galaxy Fold (expanded & folded), and iPad Mini landscape/portrait.
- Clickable prototype flows cover: Adaptive Home → Widget Personalisation, Notification Deep Link → Approval Completion, Knowledge Search → Document Attestation, Analytics Alert → Scenario Planner, Investment Approval → Compliance Sign-off.
- Accessibility overlays show focus order, label annotations, and motion alternatives. Offline overlays depict cached data messaging.
- Developer handoff includes component references, token usage tables, and API state notes (loading, success, empty, error).

## Research Notes & Validation Tasks
- Conducted card sorting for widget library to validate categorisation and naming. Insights incorporated into quick launcher.
- Usability tests highlighted need for clearer offline queue messaging; wireframes updated with explicit “Queued actions” counter.
- Analytics drilldown prototype validated with finance stakeholders; added guardrail preventing scenario publication without approval.
- Ongoing diary study with six pilot users to assess notification digest comprehension and assistant adoption.

## Open Design Questions
- Pending confirmation of final number of default widgets per persona (Employee vs Manager vs Operations).
- Awaiting API payload limits for analytics cards to ensure chart density matches mobile constraints.
- Decision required on enabling gesture-based back navigation when approval modals open to avoid accidental dismissal.
- Need alignment on whether assistant suggestions can trigger third-party integrations (Teams, Slack) directly from mobile context.
