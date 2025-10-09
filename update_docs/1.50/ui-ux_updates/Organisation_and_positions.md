# Layout Organisation & Positioning – Version 1.50

## Grid System
- Base grid: 8px increments. Mobile content safe area 16px horizontal padding; tablets 24px; desktop 32px.
- Web uses 12-column responsive grid with 24px gutters. Column widths: 72px (≤1024px), 80px (≥1280px).
- Vertical rhythm maintained with 24px baseline for primary sections; cards stack with 32px gap between sections.

## Key Layout Patterns
### Adaptive Home
- Sticky header (height 88px) includes persona info left, search/assistant right.
- Widget column spans full width; from 600px width, second column introduced (two 50/50 columns with 16px gutter).
- Quick launcher pill row positioned below header with 16px top margin.

### Service Intake
- Form container max width 720px on mobile/tablet overlays, 960px on desktop.
- Stepper pinned to top with 24px padding; content scrolls separately.
- Field labels left-aligned, helper text 8px below field.

### Notifications Modal
- Modal anchored from top with 48px margin to maintain readability. Dismiss handle 48px width, 4px height.
- List items align icon left, text block centre, actions right, using 3-column flexible layout.

### Provider Work Queue
- Top filters row (chips) horizontally scrollable with gradient fade edges (width 24px) to hint overflow.
- Kanban cards maintain 16px gap vertically, columns 24px apart.
- Map view uses bottom action bar pinned 24px from edges with safe area adjustments for iPhone notch / Android navigation gestures.

### Analytics Console
- Left rail width 280px contains navigation; content uses 12-column grid.
- Insight summary cards pinned top with sticky state when scrolling chart area.
- Alert panel on right 320px width, collapsible icon pinned 16px from edge.

## Alignment Rules
- Buttons align to right edge of forms or bottom centre on mobile when single CTA.
- Avatars align with text baseline using 8px offset to account for optical alignment.
- Icons in list items align to 24px square bounding box; maintain 16px spacing from text.

## Responsive Adjustments
- Breakpoint behaviours documented in `Screens_Update.md`. Additional details:
  - At `bp-sm` (414–599px), bottom nav labels hidden to save space; tooltips appear on long press.
  - At `bp-md` (600–767px), layout introduces split view for Knowledge Hub (tree + content).
  - At `bp-xl` (1024–1279px), Service Intake displays supporting info panel right side (width 280px).

## Spacing Tokens
| Token | Value | Usage |
| --- | --- | --- |
| `space-xxs` | 2px | Divider hairlines |
| `space-xs` | 4px | Icon padding |
| `space-sm` | 8px | Micro spacing between labels and inputs |
| `space-md` | 12px | Dense layouts |
| `space-base` | 16px | Default intra-component spacing |
| `space-lg` | 24px | Section gaps |
| `space-xl` | 32px | Major breaks |
| `space-xxl` | 48px | Page transitions |
| `space-xxxl` | 64px | Hero/heroic spacing |

## Layering & Z-index
- Base content `z=0`, sticky headers `z=10`, drawers `z=20`, modals `z=30`, toasts `z=40`, global alerts `z=50`.
- Map overlays use `z=25` to appear above cards but below modals.

## Safe Area Considerations
- Respect iOS notch and Android gesture bar with safe area insets (top 44px, bottom 34px default). Add gradient background fade to bottom nav to avoid visual cut-off.
- Provider photo capture overlay ensures capture button sits above safe area with 12px additional padding.

## Documentation
- Auto-layout settings documented in Figma components (stretch, fixed, hugging). Provide plugin export for redlines.
- Provide layout variants (left-to-right, right-to-left) ensuring components mirror correctly.
