# Provider App Wireframe Changes – Version 1.50

## Summary
- Introduces dual-mode work queue (list + map) with consistent card patterns and bottom action bar for critical workflows.
- Adds compliance-first checklist flows, offline sync management, and enhanced inventory handling.
- Aligns provider shell with Aurora design tokens and 8px grid.

## Screen Updates
1. **Shift Start & Authentication**
   - Splash to shift start checklist (confirm PPE, review route). Cards 320px height.
   - Biometric prompt added for quick unlock; fallback PIN pad redesigned with larger keys (80×80px).

2. **Work Queue – List Mode**
   - Two-tier header: filters (chips) + metrics (open, overdue, SLA risk). Cards show job summary, location, SLA countdown chip.
   - Drag-and-drop reorder for manual prioritisation. Left vertical SLA indicator 6px width.

3. **Work Queue – Map Mode**
   - Map occupies top 60% of screen, list slider bottom 40% with horizontal scroll between jobs.
   - Job pins colour-coded by priority (`harbour-500`, `aurora-500`, `catalyst-500`).
   - Route polyline thickened to 6px for readability.

4. **Request Detail Drawer**
   - Sliding panel 80% height with tabs (Summary, Checklist, Messages). Summary features timeline (status, timestamps) and attachments grid.
   - Quick actions row with icon buttons 44×44px (Start, Pause, Complete, Escalate).

5. **Compliance Checklist**
   - Stepper vertical with progress indicator 8px. Each step card includes requirement details, photo capture CTA, comment field.
   - Confirm step includes signature capture panel (finger sign) 320×160px.

6. **Inventory Overview**
   - Dashboard of stock cards (quantity, reorder threshold). Search with filter chips (Category, Location).
   - Low stock warnings emphasised with `catalyst-500` pill.

7. **Inventory Item Detail**
   - Includes photo, SKU, quantity, audit log list (most recent 5). Action buttons: Adjust, Transfer, Report issue.
   - Chart sparkline shows consumption trend (last 7 days).

8. **Field Scheduling Calendar**
   - Agenda view with timeline (hour slots 80px height). Drag events to reschedule (snap to 15 min increments).
   - Calendar nav top with week/day toggle.

9. **Incident Report Form**
   - Multi-step form with photo upload, voice note capture, location verification.
   - Offline indicator if network weak; shows queue count.

10. **Offline Sync Manager**
    - List of queued actions with status (Pending, Retrying, Synced). Provide manual sync button.
    - Storage usage meter and last sync timestamp.

11. **Provider Settings**
    - Focus on notification preferences, compliance reminders, route auto-optimise toggle.
    - Added training resources section linking to knowledge articles.

## Interaction Highlights
- Bottom FAB labelled “Log Update” accessible from all queue screens. When pressed, opens quick action modal.
- Haptic feedback for checklist completion and route reorder.
- Offline-first: All forms store data locally, display banner when pending sync.

## Accessibility
- Increased touch targets to 48×48px; map mode uses accessible callouts with text + button.
- Voice instructions added for checklist steps via audio icon.

## Assets & References
- Wireframes stored in Figma `FG:Provider/v1.50/`. Variants include portrait/landscape and tablet adaptions.
- Link to motion prototypes for map transitions: `/motion/v1.50/provider/map_toggle.json`.
- QA checklists appended to `provider_application_styling_changes.md` for consistency.
