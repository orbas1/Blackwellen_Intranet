# Dashboard Visual Design

## Blueprint Snapshot
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ DB-NAV-001 72px height                                                       │
├───────────────┬──────────────────────────────────────────────────────────────┤
│ DB-SEC-002    │ KPI Row ┌───────┬───────┬───────┬───────┐                    │
│ Sidebar       │         │005a   │005b   │005c   │005d   │                    │
│ 264px         │         └───────┴───────┴───────┴───────┘                    │
│               │ Compliance Pulse (DB-WID-004)  |  Task Kanban (DB-WID-006)   │
│               │ Activity Feed (DB-WID-008) full width                        │
└───────────────┴──────────────────────────────────────────────────────────────┘
```

Grid references use the 12-column system (80px columns, 24px gutters). Heights follow 4pt increments.

## Component Specification Table

| Code | Position & Size | Styling Tokens | Behavior & Packages | Content / Media |
|------|-----------------|----------------|---------------------|-----------------|
| `DB-NAV-001` | Spans columns 1-12, height 72px, padding 0/32 | Background `--surface-elevated`, shadow `--shadow-md`, border-bottom `1px solid #D6DEEB` | Sticky top; uses `framer-motion` fade on scroll; includes responsive collapse at ≤1024px | Company logo (vector `logo-horizontal.svg`), search input, quick actions icons (Phosphor `Gear`, `Bell`). |
| `DB-SEC-002` | Fixed left, 264px desktop, collapses to 88px | Gradient vertical divider (#0B1D3A→#1F8A70), typography `font-weight 600`, icon buttons 48px | Expand/collapse animation via `framer-motion`; keyboard-accessible toggles | Contains navigation stack: Overview, Compliance, Analytics, Settings, with badges showing counts. |
| `DB-CARD-005a` – `005d` | Top row, each spans 3 columns × 2 rows (320×160px), 24px gap | Card radius 20px, gradient background `linear(135°, #102A43, #1F8A70)`, white text; sparkline color `--accent-copper` | Hover lift `translateY(-4px)`, `box-shadow: --shadow-lg`; data auto-refresh every 60s | Metrics: Active Providers, Upcoming Expirations, Tickets Open, Satisfaction Score; mini trend line drawn with `victory@36`. |
| `DB-WID-004` | Columns 1-5, height 480px | Panel background #FFFFFF, left border 4px `#1F8A70`, inner padding 32px | Scrollable list with momentum physics; items expand accordion via `framer-motion` | Items include avatar chips (provider photos from `/assets/media/providers/*.jpg`), milestone icons. Timeline lines use `#CBD5E1`. |
| `DB-WID-006` | Columns 6-12, height 480px | Kanban columns tinted `#F6F9FC`, header text 18px/600, cards radius 16px | Drag-and-drop via `@dnd-kit/core`; status transitions emit toast `DB-MOD-012` | Cards include cover thumbnails (optional) sized 320x120 from DAM `project-shots/`. Due date pill background `#D07A2D`, white text. |
| `DB-WID-008` | Columns 1-12, min-height 360px | Alternating row background (#FFFFFF/#F8FAFF), 2px timeline connector | Infinite scroll hooking `react-query` for pagination | Entries show icon (Phosphor 20px), title, context text, CTA link; attachments icon indicates downloadable file. |
| `DB-MOD-012` | Overlay 720x480 centered | Backdrop `rgba(9,16,28,0.68)`, modal radius 24px, top border accent #1F8A70 3px | Triggered from Kanban + Activity feed; `framer-motion` scale-in 200ms | Displays task details, includes comment thread, file upload (Dropzone). |

## Header Strip Detailing (`DB-NAV-001`)
- Padding top/bottom 12px, left/right 32px; flex layout with 24px gaps.
- Notification bell shows badge chip (20px) using `--status-alert` (#D95050).
- User avatar 48px circle (photos from `/assets/media/team/*.jpg`), status indicator 10px (#32BA7C) bottom-right.

## Metric Row Interactions (`DB-CARD-005a-d`)
- Each card includes numeric value (56px semi-bold), delta indicator (chip 18px high) colored #32BA7C for positive, #D95050 for negative.
- Sparklines generated with `victory-area`, gradient fill `rgba(255,255,255,0.24)`.
- Segmented control `DB-CARD-CTRL-005e` sits above row (columns 9-12), width 224px, toggles dataset (week/month/quarter).

## Compliance Pulse Widget (`DB-WID-004`)
- Items use flex rows: left column 64px for avatars, right column text stack.
- Expand state reveals 120px description area with grey background (#F3F6FA) and link to detail drawer `DB-MOD-013`.
- Top-right actions: filter dropdown (chips by credential type) and export icon button (CSV).

## Task Kanban (`DB-WID-006`)
- Columns: `Backlog`, `In Review`, `Ready`, `Completed`. Each column width 200px + 24px gap; on LG screens 4 columns visible, SM collapses to horizontal scroll.
- Card structure: title 18px/600, metadata row (avatar stack 32px, due date pill 16px height, priority badge color-coded), description preview 2 lines truncated.
- Drag placeholder uses dashed border (#1F8A70, 2px) with 12px rounded corners.

## Activity Feed (`DB-WID-008`)
- Timeline dots 10px filled #1F8A70, connectors 2px #B6C3D5.
- Hover states lighten background (#EEF3F9) and reveal inline action icons (Pin, Share) using `phosphor-react`.
- End of list contains "View historical log" button (tertiary) referencing `DB-BTN-009` style (outlined, 44px tall).

## Imagery & Media Notes
- Provider avatars: stored at 160x160, auto-masked to circles; fallback initials component `AvatarFallback` tinted #102A43.
- Kanban card thumbnails reference project deliverable renders from repo `blackwellen/media-library@v1.2`.
- Activity attachments icons differentiate file types (PDF, XLSX) using colored badges (#D95050 for PDF, #1F8A70 for XLSX).

