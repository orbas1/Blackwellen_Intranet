# Component Functional Specifications

## Navigation Bar
- **Responsive behavior:** Converts to hamburger icon (48px) below 1024px; search collapses into icon toggling overlay drawer.
- **Active state rule:** Underline indicator 3px height, 32px rounded corners slides with 200ms ease.
- **Authentication dropdown:** 320px width, includes avatar, status toggle, quick links to profile/settings/logout.

## Sidebar
- Expands/collapses with `framer-motion` slide (duration 240ms, curve cubic-bezier(0.4,0,0.2,1)).
- Houses contextual filters, quick actions; maintains section headings pinned with 16px top padding.
- Keyboard: `Tab` cycles through items; `Shift+[` toggles collapse.

## Cards
- **Metric:** animated count-up (500ms) triggered on viewport entry using Intersection Observer threshold 0.4.
- **Activity:** timeline with left border accent (#1F8A70), icons anchored 16px from border; expansions reveal 14px body text.
- **Detail:** includes quick action button (tertiary) in top-right; supports dropdown menu anchored 8px offset.

## Tables
- Column resizing within 120–320px using drag handles; supports column pinning left/right.
- Inline filters appear in header (32px chips). Bulk actions appear when rows selected (floating bar 64px height).
- Mobile transforms into accordion cards showing key-value pairs.

## Forms
- Inline validation on blur; error message 12px text, #D9534F.
- Date pickers leverage `react-day-picker` with custom range theme (selection background #1F8A70 at 12% with border accent 2px).
- Stepper forms store progress state; `Continue` button disabled until required fields valid.

## Buttons
- Loading state overlays 20px spinner centered; text opacity 0 but width preserved.
- Focus ring 2px #27A985 with 2px outward spread for accessibility.

## Modals & Drawers
- Modal open adds body scroll lock. ESC closes. Primary action right aligned; secondary left aligned.
- Drawer supports nested tabs (56px height) for settings segmentation.

## Notifications
- Toast auto-dismiss 6s; success uses icon `CheckCircle` (#27A985). Hover pauses timer.
- Banners persistent until dismissed; include optional CTA button.

## Charts
- Provide accessible descriptions via `aria-describedby` referencing hidden summary paragraph.
- Hover tooltips use glassmorphism (#112B4Caa backdrop blur 8px) with 12px text.

## Widgets
- **KPI Capsule:** 240x120 card, gradient background, large numeral 48px. Click to open detail modal.
- **Task Kanban:** 3 columns default (Backlog, In Progress, Completed) 320px width each, 24px gutter. Drag handles 16px radius.

## Loaders
- Skeleton uses gradient animation `linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 50%, #F1F5F9 100%)` moving 1200ms infinite.

## Avatars
- Status indicator 12px dot bottom-right (#27A985 online, #C53030 offline); ring 2px #FFFFFF to ensure contrast.

