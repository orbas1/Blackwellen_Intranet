# Screen Blueprint Drawings – Version 1.50

The following annotated wireframe drawings translate the v1.50 specifications into full-screen schematics. Measurements follow the shared 8px spacing scale. Mobile frames reference 390×844pt (iPhone 14), web frames reference 1440×900px viewport unless noted. All colour tokens and assets derive from the Aurora design system as documented in `Colours.md`, `Fonts.md`, and the component specifications.

---

## Mobile Screen Drawings

### 1. Adaptive Home Dashboard (Employee Persona)
```
┌───────────────────────────── 390pt ─────────────────────────────┐
│  Status Bar (notch safe)                                       │ 0pt
├────────────────────────────────────────────────────────────────┤
│ App Bar 64pt                                                    │ 44pt
│ ┌──────────────┐  Persona Title (Inter 20/28)   🔔  🔍          │
│ │ Quick Launch │                                             ││
├────────────────────────────────────────────────────────────────┤
│ Filter Chips Row 56pt (Today | Week | Quarter | Custom)        │
├────────────────────────────────────────────────────────────────┤
│ Widget Stack (padding 20pt each side)                          │
│ ┌─────────────────────── Personal Tasks Card ───────────────┐   │
│ │ KPI Metric 40pt bold                                     │   │
│ │ ----------------------------------------------------------------│
│ │ Task list (3 items @ 56pt each)                         •│   │
│ │ CTA Pill 120×44pt | Overflow ⋮                           │   │
│ └───────────────────────────────────────────────────────────┘   │
│ 16pt gap                                                       │
│ ┌────────────────────── AI Insights Carousel ───────────────┐   │
│ │ Slide indicators bottom (8×8pt dots, 8pt spacing)        │   │
│ └───────────────────────────────────────────────────────────┘   │
│ 16pt gap                                                       │
│ ┌───────────── Recognition Feed Card ─────────────┐             │
│ │ Avatar stack 40pt, message text 16/24           │             │
│ └──────────────────────────────────────────────────┘             │
│ … (Compliance Alerts, Quick Links) …                             │
├────────────────────────────────────────────────────────────────┤
│ Floating Personalise FAB (56pt, bottom right, elevation E4)     │
├────────────────────────────────────────────────────────────────┤
│ Tab Bar 88pt – 5 items (icon 24pt + label 12pt)                 │
└────────────────────────────────────────────────────────────────┘
```
- Background: `granite-25`. Cards: `granite-0` with 16pt radius, shadow E2.
- Widget default height 320pt, collapsible to 220pt via density control.
- Illustrations referenced: `assistant_personalisation.svg`, `recognition_wave.svg` stored in `/design-system/assets/v1.50/mobile/`.

### 2. Notification & Activity Centre Modal
```
┌─────────────── Top Safe 24pt ────────────────┐
│ Drag Handle 48×6pt centered                  │
├──────────────────────────────────────────────┤
│ Modal Header 72pt                            │
│ Alerts  Approvals  Updates  System (SegCtrl) │
├──────────────────────────────────────────────┤
│ Search Field 52pt (icon 20pt, radius 16pt)   │
├──────────────────────────────────────────────┤
│ Scroll List                                  │
│ ┌──────────────────────────────────────────┐ │
│ │ Icon 32pt | Summary (Inter 16/24)        │ │ row 72pt
│ │ Timestamp 14/20 | Buttons: View Snooze   │ │
│ └──────────────────────────────────────────┘ │
│ … repeat                                     │
├──────────────────────────────────────────────┤
│ Bottom Actions Bar 72pt (Dismiss All, Prefs) │
└──────────────────────────────────────────────┘
```
- Backdrop blur radius 24pt, overlay colour `granite-950` @40%.
- Critical alerts highlight strip 4pt left border `catalyst-500`.

### 3. Service Request Intake – Step 2 (Details)
```
┌──────────────────────────── App Bar 64pt ───────────────────────┐
│ Back  Stepper (4 nodes 32pt)            Help?                   │
├────────────────────────────────────────────────────────────────┤
│ Progress Pill: Step 2 of 4 – Details (Inter 14/20)              │
├────────────────────────────────────────────────────────────────┤
│ Form Body padding 20pt                                          │
│ ┌────────────── Section Header 20/28 ────────────────┐          │
│ │ Field Group A (Two-column ≥600pt)                  │          │
│ │ ┌─────────────┬───────────────┐                    │          │
│ │ │ Text Field  │ Text Field    │                    │          │
│ │ │ 320×64pt    │ 320×64pt      │                    │          │
│ │ └─────────────┴───────────────┘ 12pt gap          │          │
│ │ Helper text 14/20                                    │
│ │ Attachment hint w/ icon 20pt                         │
│ └──────────────────────────────────────────────────────┘          
│ 24pt spacing                                                    │
│ Repeat Section B, Section C                                     │
├────────────────────────────────────────────────────────────────┤
│ Primary CTA (Full width 56pt, gradient aurora-500→400)          │
│ Secondary CTA Outline 56pt                                      │
└────────────────────────────────────────────────────────────────┘
```
- Inline validation icons 20pt right aligned, error copy `catalyst-600`.
- Dropzone (Step 3) 160pt height with dashed border 2pt `aurora-200`.

### 4. Service Tracker – Kanban View
```
┌──────────────────────────── Header 96pt ────────────────────────┐
│ Back | Title "My Requests"                • Filter • Sort      │
├────────────────────────────────────────────────────────────────┤
│ Horizontal Scroll Container (4 columns @ 300pt width)          │
│ ┌───── Backlog ─────┐┌── In Progress ──┐┌──── Review ───┐┌── Done ─┐
│ │ Card 1 180pt      ││ Card 1          ││ Card 1        ││ Card 1 │
│ │ ┌──────────────┐  ││ ┌────────────┐  ││ ┌──────────┐  ││        │
│ │ │ Status Pill  │  ││ │ Status    │  ││ │ Status  │  ││ …      │
│ │ │ Title 16/24  │  ││ │ Title     │  ││ │ Title   │  ││        │
│ │ │ Meta 14/20   │  ││ │ Meta      │  ││ │ Meta    │  ││        │
│ │ └──────────────┘  ││ └────────────┘  ││ └──────────┘  ││        │
│ └───────────────────┘└─────────────────┘└───────────────┘└────────┘
├────────────────────────────────────────────────────────────────┤
│ Bulk Action Bar (on select) 72pt, background `granite-900`      │
└────────────────────────────────────────────────────────────────┘
```
- Card drag shadow: elevation E5, scale 1.02, 180ms ease-out.
- Column headers use `harbour-500` bottom border 2pt.

### 5. Knowledge Hub – Document List
```
┌─────────────── Collapsible Drawer 280pt ────────────────┬───────────────┐
│ Search 48pt input                                       │               │
│ Favorites                                               │               │
│ Categories                                              │ Content Panel │
│  ├ Policies                                             │ padding 20pt  │
│  ├ How-To                                               │ ┌───────────┐ │
│  └ Training                                             │ │ Card 1    │ │
│ Saved Searches                                          │ │ 320×196pt │ │
│ Offline Downloads                                       │ │ Thumb 120 │ │
└─────────────────────────────────────────────────────────┴───────────────┘
```
- Content cards display thumbnail top (Aspect 16:9), metadata row icons 16pt.
- Drawer collapses to 72pt rail on mobile with icons only.

### 6. Document Viewer & Attestation Banner
```
┌────────────────────────── Toolbar 64pt ─────────────────────────┐
│ ← Back | Title truncated | Share | Bookmark | AI | Version      │
├────────────────────────────────────────────────────────────────┤
│ Document Canvas (scroll) with margin 16pt each side             │
│ …                                                               │
├────────────────────────────────────────────────────────────────┤
│ Attestation Banner 96pt (Harbour gradient)                      │
│ │ Mandatory Policy • Due 12 Aug • [Acknowledge 48×160pt CTA] │ │
├────────────────────────────────────────────────────────────────┤
│ Comment Drawer Handle (16pt)                                    │
└────────────────────────────────────────────────────────────────┘
```
- Comment drawer expands to 320pt width (web) or 70% height (mobile).

### 7. Analytics Snapshot
```
┌──────────────────────── Tabs: My | Team | Benchmarks ──────────┐
├────────────────────────────────────────────────────────────────┤
│ KPI Card Grid (2 columns, gap 16pt)                             │
│ ┌───────────────┐ ┌───────────────┐                             │
│ │ KPI 1         │ │ KPI 2         │                             │
│ │ Value 48pt    │ │ Value 48pt    │                             │
│ └───────────────┘ └───────────────┘                             │
│ 16pt gap                                                       │
│ Trend Chart (line) 320×220pt with legend top                   │
│ Horizontal scroll mini charts                                  │
├────────────────────────────────────────────────────────────────┤
│ Alerts Panel 280pt width anchored bottom with list rows 64pt    │
└────────────────────────────────────────────────────────────────┘
```
- Chart axes 1px `granite-200`, tooltips 320×160pt.

### 8. Investment Oversight – Heatmap
```
┌────────────── Summary Card 160pt ───────────────┐
│ Net Assets • Risk Gauge • Upcoming Actions       │
├──────────────────────────────────────────────────┤
│ Exposure Heatmap 4×4 (cell 68×68pt, radius 8pt)  │
│ ┌──────┬──────┬──────┬──────┐                    │
│ │A1    │A2    │A3    │A4    │                    │
│ ├──────┼──────┼──────┼──────┤                    │
│ │B1    │B2    │B3    │B4    │                    │
│ └──────┴──────┴──────┴──────┘                    │
│ Tooltip triggered on tap, anchored top-right     │
├──────────────────────────────────────────────────┤
│ Compliance Checklist Card (checkbox rows 64pt)   │
└──────────────────────────────────────────────────┘
```
- Heatmap palette: `harbour-100` (low) → `catalyst-600` (high) with accessible pattern overlays for colour-blind mode.

### 9. Settings & Accessibility
```
┌──────────────────────────── Header 64pt ───────────────────────┐
│ ← Settings                                     Help            │
├────────────────────────────────────────────────────────────────┤
│ Section List (Account, Notifications, Offline, Accessibility)  │
│ Each row 56pt, icon 28pt, chevron 16pt                          │
├────────────────────────────────────────────────────────────────┤
│ Accessibility Preview Card 320×240pt                           │
│ ┌──────────── Sample Screen ─────────────┐                      │
│ │ Text size slider (track 8pt, thumb 24)│                      │
│ │ Contrast toggle, Reduced motion toggle│                      │
│ └────────────────────────────────────────┘                      │
├────────────────────────────────────────────────────────────────┤
│ Connected Apps list, Manage Data buttons                        │
└────────────────────────────────────────────────────────────────┘
```
- Toggle uses `aurora-500` active, `granite-300` inactive.

### 10. Offline & Error Resolution
```
┌──────────────────────── Offline Banner 64pt ───────────────────┐
│ ⚠ Offline • Last sync 3m ago          [Retry] [View Queue]     │
├────────────────────────────────────────────────────────────────┤
│ Queued Actions Card 320×180pt (list up to 3 items)             │
│ Diagnostics Link (opens modal 88% height)                      │
│ Support CTA (Call, Message, Email) Buttons 44pt height         │
└────────────────────────────────────────────────────────────────┘
```
- Banner background `catalyst-100`, text `catalyst-700`.

---

## Web Screen Drawings

### A. Web Adaptive Home (Manager Persona) – 1440×900px
```
┌────────────────────────────── Global Header 88px ──────────────────────────────┐
│ Logo | Global Nav (Home, Operations, Analytics, Knowledge, Admin) | Profile ▼ │
├───────────────────────────────────────────────────────────────────────────────┤
│ 24px padding                                                                │
│ ┌───────────── KPI Strip (4 cards 312×140px, 24px gap) ─────────────────────┐ │
│ │ [Team Health] [Approvals Due] [Service Load] [Engagement Pulse]           │ │
│ └───────────────────────────────────────────────────────────────────────────┘ │
│ 32px gap                                                                      │
│ Content Grid (12-column, gutter 24px)                                         │
│ ┌────── Column 1-6 ──────┐ ┌──── Column 7-12 ────┐                             │
│ │ Service Queue Card     │ │ Analytics Story Card│                             │
│ │ (height 420px)         │ │ (height 420px)      │                             │
│ └────────────────────────┘ └──────────────────────┘                             │
│ 24px gap                                                                      │
│ Bottom Row: Knowledge Updates (cols 1-4, height 320px) | Recognition (cols 5-8)
│ | AI Assistant Panel (cols 9-12, collapsible)                                 │
└───────────────────────────────────────────────────────────────────────────────┘
│ Persistent Assistant Bubble bottom-right 72px                                 │
└───────────────────────────────────────────────────────────────────────────────┘
```
- Background `granite-50`. Cards 24px padding, 16px radius.
- Charts follow accessibility contrast 4.5:1.

### B. Service Hub Intake (Web)
```
┌────────────────────────────── Sticky Header 104px ────────────────────────────┐
│ Breadcrumbs > Service Hub > New Request                Save Draft | Close     │
│ Stepper (4 nodes 32px, label below)                                         │
├───────────────────────────────────────────────────────────────────────────────┤
│ Form Grid (2 columns, max-width 960px centered)                              │
│ ┌────────────── Column L ─────────────┐ ┌──────────── Column R ─────────────┐ │
│ │ Text Field label 16/24, input 48px  │ │ Dropdown + multi-select chips     │ │
│ │ Date picker (popup)                 │ │ Rich text field (180px height)    │ │
│ └─────────────────────────────────────┘ └────────────────────────────────────┘ │
│ 32px vertical rhythm                                                        │
│ Supporting sidebar (cols 10-12) with SLA info card 280px width              │
├───────────────────────────────────────────────────────────────────────────────┤
│ Footer Actions 88px (Primary Submit, Secondary Save Draft)                   │
└───────────────────────────────────────────────────────────────────────────────┘
```
- Validation summary appears inline at top when errors, `catalyst-500` border.

### C. Service Tracker Kanban (Web)
```
┌──────────────────────────── Toolbar 96px ─────────────────────────────┐
│ Title "Operations Queue" | Filters | View Toggle (Kanban/List) | +New │
├──────────────────────────────────────────────────────────────────────┤
│ 24px padding                                                        │
│ Kanban Board width 1440px scrollable horizontally                   │
│ ┌─Column Backlog (min 320px)─┐┌─Column Triage─┐┌─Column Active─┐…   │
│ │ Card 1 (height auto)      ││ Card 2        ││ Card 3        │     │
│ │ Badges row 24px           ││ ...           ││ ...           │     │
│ └────────────────────────────┘└──────────────┘└───────────────┘     │
├──────────────────────────────────────────────────────────────────────┤
│ Timeline Drawer collapsed right (handle 16px)                         │
└──────────────────────────────────────────────────────────────────────┘
```
- Swimlane headers sticky when scrolling vertically.

### D. Knowledge Hub Search (Web)
```
┌──────────────────────────── Search Hero 200px ────────────────────────────┐
│ Background image `knowledge_stack.svg` overlay @60%                       │
│ Search bar centred 640px width, voice input, filter dropdown             │
├───────────────────────────────────────────────────────────────────────────┤
│ Results Layout (3-column masonry, gutter 24px)                            │
│ Card height 280px, includes type pill, snippet, updated date              │
│ Left rail 280px for filters (checkbox groups, toggles, rating slider)     │
├───────────────────────────────────────────────────────────────────────────┤
│ Footer CTA to create article, support chat widget bottom-right           │
└───────────────────────────────────────────────────────────────────────────┘
```
- Images pulled from `/design-system/assets/v1.50/knowledge/hero/`.

### E. Analytics Control Tower (Web)
```
┌──────────────────────────── Masthead 120px ───────────────────────────────┐
│ Title | Date Range Picker | Persona Toggle (Manager/Executive)            │
├───────────────────────────────────────────────────────────────────────────┤
│ KPI Strip (6 cards across, 200×140px)                                     │
│ Large Chart (cols 1-8, height 420px) | Alert Stream (cols 9-12, 420px)    │
│ Scenario Builder Drawer (slides from right, width 360px)                  │
├───────────────────────────────────────────────────────────────────────────┤
│ Table Module (cols 1-12, height 360px) with column controls               │
└───────────────────────────────────────────────────────────────────────────┘
```
- Charts use D3 templates stored `/data-viz/v1.50/`. Alerts integrate icons from Outline 2.0 set.

---

## Interaction & Accessibility Notes
- All actionable elements maintain 44px/44pt minimum touch targets.
- Focus outlines use `aurora-500` 2px solid with 2px offset. Keyboard order follows top-to-bottom, left-to-right flow depicted in diagrams.
- Motion durations: component entrance 220ms, exit 160ms, emphasised transitions 320ms cubic-bezier(0.22, 1, 0.36, 1).
- Dynamic states: Cards compress by 12% height on scroll for sticky context, FAB morphs into full-width bar when personalisation drawer open.

## Asset & Resource Dependencies
- Illustrations and iconography referenced align with `Screens_update_images_and_vectors.md` and should be exported in 1x/2x/3x densities.
- Lottie files for assistant bubble and loading states located at `/motion/v1.50/`. Developers should integrate via Bodymovin player with reduced motion fallbacks (static SVG frames).
- Fonts served via self-hosted Inter, Source Serif, and IBM Plex Mono subsets defined in `Fonts.md`.

