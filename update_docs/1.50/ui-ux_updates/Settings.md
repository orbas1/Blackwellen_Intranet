# Settings Architecture – Version 1.50

## Sections & Hierarchy
1. **Account Security**
   - Profile info, password management (web), biometric toggle (mobile).
   - Session history with device list and revoke options.
2. **Notifications**
   - Channel toggles (Push, Email, SMS), digest frequency, quiet hours.
   - Approval reminders with escalate to manager option.
3. **Offline Data**
   - Downloaded modules list (Knowledge, Analytics snapshots, Service templates).
   - Storage usage meter with clear cache CTA.
4. **Accessibility**
   - Text size slider, contrast mode, reduced motion toggle, haptic feedback intensity.
   - Preview carousel to validate selections.
5. **Connected Apps**
   - Integrations (Teams, Slack, Jira). Enable/disable switches, scopes summary.
6. **Preferences**
   - Default landing tab, timezone override, language selection.
7. **Support & Legal**
   - Help links, contact support, privacy policy, terms.

## Layout Patterns
- Mobile: List of sections with 16px padding, icons 24px left, chevron 16px right. Tapping reveals detail screen or bottom sheet.
- Web: Left rail navigation with section content on right (max width 960px). Sticky sub-nav for long sections.

## Interaction Rules
- Toggles update immediately via API with optimistic UI. Failed updates revert and display error toast.
- Multi-select (channels) uses chips with checkmarks; confirm button at bottom for apply.
- Text size slider shows preview card update in real time (debounce 200ms).

## Data Flow
- Settings retrieved from `/api/v2/settings` on load. Each section updates via dedicated endpoints (e.g., `/api/v2/settings/notifications`).
- Offline downloads stored locally; UI displays last sync timestamp and size.
- Connected apps fetch OAuth status; revoked connections remove tokens server-side.

## Accessibility Considerations
- Provide instructions for screen readers (“Double tap to toggle notifications”).
- Focus order follows visual order; breadcrumbs available on web for navigation.
- Use descriptive headings for each section to aid orientation.

## Visual Specifications
- Background `granite-0`, section cards `granite-50`. Section header text Inter 20/28 semibold.
- Toggle track 44×24px, on `aurora-500`, off `granite-300`. Icons `granite-500` default, `aurora-500` when active.
- Storage meter uses horizontal bar 8px height with gradient `harbour-500` → `harbour-300`.

## Error Handling
- When API call fails, show inline message (“Couldn’t save changes. Try again.”) with `Retry` button.
- Offline mode disables toggles requiring server communication, showing tooltip “Available when you reconnect.”

## Documentation
- Detail screen specs captured in `Settings Screen.md`.
- Interaction flows in `Logic_Flow_update.md` (Settings section).
- Microcopy stored in `Screen_text.md` (Settings section).
