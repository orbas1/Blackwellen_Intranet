# Dashboard Layout Organization

## Grid Allocation (Desktop ≥1280px)
- **Row 0 — Navigation (`DB-NAV-001`)**: Occupies full width. Height 72px.
- **Row 1 — Greeting Strip (`DB-SEC-003`)**: Spans columns 1-9 for text (height 120px) and columns 10-12 for filter capsule cluster (`DB-WID-003b`). Background #FFFFFF, subtle shadow `var(--shadow-sm)`.
- **Row 2 — KPI Cards (`DB-CARD-005a–d`)**: Four cards, each 3 columns wide × 2 rows tall (320×160px). Gutters 24px. Align baseline at y=120px from nav.
- **Row 3 — Dual Widgets**: Columns 1-5 host `DB-WID-004` (Compliance Pulse). Columns 6-12 host `DB-WID-006` (Task Kanban). Both share 480px height, aligned top, 32px gutter between sections.
- **Row 4 — Activity Feed (`DB-WID-008`)**: Spans all 12 columns, min-height 360px. 48px padding top to delineate section.
- **Row 5 — Analytics Preview (`DB-WID-009`)**: Optional chart module, spans columns 1-8 (720px width) with heat map; columns 9-12 reserved for announcement panel `DB-CARD-010` (stacked cards 320×240).

## Sidebar Behavior (`DB-SEC-002`)
- Desktop: Fixed left rail 264px with 32px internal padding. Contains icon buttons 48px square labelled (text reveals on hover) plus quick-add button `DB-BTN-002` anchored bottom.
- Tablet (1024–1279px): Collapses to 88px icon-only rail; tooltips appear on hover/focus; text labels moved to header crumb `DB-SEC-003`.
- Mobile: Sidebar becomes top drawer triggered by hamburger icon `DB-NAV-002`. Drawer width 80% viewport, overlay darkens rest of screen `rgba(7,18,35,0.64)`.

## Responsive Reflow
- **LG (1280–1439px)**: KPI row reduces card width to 296px; Task Kanban columns compress to 184px width; analytics preview optional.
- **MD (1024–1279px)**: KPI cards show two per row (wrap). `DB-WID-004` stacks above `DB-WID-006`. Activity feed retains full width.
- **SM (768–1023px)**: Content grid becomes 8-column; Kanban converts to horizontal scroll snapping per column (min width 264px). Greeting strip condenses to 2-line message with filters below.
- **XS (≤767px)**: Components stack vertically in order: Greeting, KPI horizontal scroll (cards width 260px, gap 16px), Compliance, Task Kanban (single column list), Activity feed. Sticky bottom action bar `DB-BAR-015` appears with three icons (Add Task, Invite Provider, View Alerts).

## Interaction & Motion Mapping
- Hover states apply `translateY(-4px)` with 200ms ease-out to cards (`DB-CARD-005*`).
- Sidebar collapse/expand uses `framer-motion` `AnimatePresence` with 160ms duration; ensure focus trap when overlay is open on mobile.
- Activity feed infinite scroll triggers skeleton loaders `DB-SKEL-008b` (three rows, 48px height each) using shimmering gradient (#E2EAF3→#F6F9FC).

## Data Visualization Placement
- Sparklines on KPI cards anchored to bottom 48px area with 8px radius clip mask.
- Compliance Pulse timeline uses vertical stepper at x=40px from widget edge; ensures avatars align center on stepper line.
- Analytics preview heat map uses `@nivo/heatmap` with tooltip card `DB-TOOL-009a` (width 220px) showing metric delta.

## Imagery & Asset Anchors
- Sidebar user avatar pulled from `/assets/media/team/current-user.jpg`, caches at 64px.
- Task Kanban optional background illustration `patterns/kanban-diagonal.svg` tinted at 8% opacity, anchored top-right of widget.
- Announcement panel `DB-CARD-010` uses iconography from `phosphor-react` (Megaphone, ShieldCheck) sized 28px.
