# Navigation & Menu Specification – Version 1.50

## Global Navigation
- **Mobile User App**: Bottom navigation (Home, Directory, Service Hub, Knowledge, More). Icons 28px, labels Inter 12/18. Active state: filled icon, underline 4px `aurora-500`.
- **Provider App**: Bottom tabs (Queue, Map, Inventory, More) plus top filter bar for status/timeframe. Provide quick action FAB for “Log update”.
- **Web**: Left rail navigation with collapsible sections (Dashboard, Service, Knowledge, Analytics, Administration). Utility bar top-right for search, notifications, profile.

## Secondary Navigation
- **Top App Bar**: Contains search, assistant button, profile avatar. Height 64px mobile, 72px web.
- **Quick Launcher Drawer**: Accessible from home header (icon 24px). Contains 8 shortcuts displayed in 2-column grid 120×120px tiles.
- **Service Hub Subnav**: Tab bar with “Requests”, “Templates”, “Approvals”, “Reports”. On mobile displayed as segmented control 56px height.

## Menu Styles
| Menu Type | Dimensions | Behaviour | Usage |
| --- | --- | --- | --- |
| Context Menu | 280px width, 12px radius | Appears on icon tap, anchored top-right, shadow E3 | Widget overflow, table actions |
| Mega Menu | 720px width, 3 columns | Desktop only, opens below top nav, closes on outside click | Web knowledge categories |
| Bottom Sheet Menu | Full width, 75% height | Swipe down to dismiss, includes drag handle | Mobile filters, quick sort |
| Drawer | 320px width | Slides from right (web) / bottom (mobile) | Notification preferences, share dialogs |

## Menu Content Guidelines
- Items height 48px (context), 56px (mobile lists). Include icon 24px optional.
- Provide section headers for grouped items (14/20 uppercase, letter spacing 1px).
- Active menu item uses background `aurora-100`, text `aurora-600`.

## Interaction & Motion
- Menu open animation 200ms ease-out, scale from 98% to 100% (context menus).
- Bottom sheets slide up with 320px overshoot bounce (spring 400ms). Provide scrim opacity 0→0.5.
- Drawer overlays use focus trap to maintain accessibility; ESC closes on web.

## Accessibility
- Provide keyboard navigation: Arrow keys within menus, Enter to select, ESC to close.
- For bottom sheets, set `aria-modal=true` and ensure focus returns to invoking element when closed.
- Provide visible focus ring (2px `aurora-400`).

## Content Strategy
- Use concise labels (max 24 characters). Provide supporting description for complex items using 14/20 text grey.
- Include status badges (new, beta) as 12px pill on right side.

## Implementation Notes
- React navigation uses `react-navigation` (mobile) with bottom tab + stack. Web uses Next.js layout with side nav component.
- Provide configuration JSON `/design-system/navigation/v1.50/navigation.json` mapping routes to icons/labels.
- Analytics events: `nav.tab_select`, `nav.drawer_open`, `nav.menu_action`.
