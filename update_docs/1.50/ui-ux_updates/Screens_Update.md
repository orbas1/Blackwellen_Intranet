# Screens Update – Version 1.50 Mobile & Web

## Overview
- Refines 45 priority screens with enterprise-ready typography, Aurora palette tokens, and shared 8px grid alignment.
- Incorporates adaptive card system for dashboards, modular forms, and analytics visualisations with consistent padding (mobile 20px, web 24px, compact 16px).
- Adds skeleton loaders, offline indicators, and localisation buffers (20–28%) to each screen specification.

## Screen Families & Layout Notes
### 1. Adaptive Home (User App)
- **Structure**: Vertical scroll anchored by sticky contextual header (status summary height 88px). Widget column width 100% with internal card grid 2 columns at ≥414px, single column below.
- **Widgets**: Personal Tasks, AI Insights, Recognition Feed, Compliance Alerts, Quick Links. Each card 320px height default, collapsible to 220px in compact density. Header uses Inter 20/28 bold, body 16/24 regular.
- **Interactions**: Drag-to-reorder with 12px grip icons, animation 180ms ease-out, drop target highlight `aurora-100` (#E4ECFB) with 12px radius.

### 2. Notifications & Activity Centre
- **Modal Height**: 88% of viewport on mobile with rounded top corners radius 28px, E5 elevation shadow (0 24px 48px rgba(18,23,28,0.18)).
- **List Items**: 72px row height, left icon 32px circle with severity fill (`harbour-500`, `catalyst-500`, `granite-400`). Buttons inline (secondary ghost 44px height, 16px horizontal padding).
- **Filters**: Segmented control 4 segments, 56px height, indicator pill 4px radius.

### 3. Service Hub Intake Flow
- **Stepper**: Horizontal at top with 4 steps, 32px diameter nodes, connecting line 2px. Completed state `harbour-500`, current state `aurora-500`, upcoming `granite-300`.
- **Form Layout**: Two-column grid from 600px width; fallback single column below. Field groups separated by 32px vertical spacing, inline help icon 20px.
- **Attachments Panel**: Drag-and-drop dropzone 100% width, 160px height, dashed border `aurora-200`, background `granite-50`.

### 4. Service Tracker & Approvals
- **Kanban View**: 4 columns (Backlog, In Progress, Review, Completed) with column width min 280px, max 320px. Cards 180px height, badge row 16px high.
- **List View**: 64px rows, sticky header with filter chips (12px horizontal padding). Bulk action bar slides up from bottom (height 72px, background `granite-900`, text `granite-0`).
- **Approval Modal**: Width 92% mobile (max 640px). Tabbed detail (Summary, Timeline, Attachments). Primary approve button 56px height, full width, gradient background `aurora-500` → `aurora-400`.

### 5. Knowledge Hub
- **Navigation Tree**: Left drawer width 280px (collapsible). Node height 40px, indent 16px per level. Selected background `aurora-50`.
- **Content Panel**: Card list 3 column masonry on web, single stack mobile. Document preview uses Source Serif 18/28 for body text.
- **Search Results**: Chips (Policy, How-To, Training) 32px height, icons 20px. Sort dropdown anchored top-right.

### 6. Document Viewer & Attestation
- **Toolbar**: Height 64px, icon buttons 44px touch target with 12px padding. Background `granite-950` 92% opacity overlay when scrolled.
- **Annotation Drawer**: Right panel width 320px on tablets/web, overlays as bottom sheet 70% height on phone.
- **Attestation Banner**: Height 96px, gradient `harbour-500` → `harbour-300`, text white, CTA button 48px height.

### 7. Analytics Snapshot
- **Grid**: Web uses 12-column layout (gutter 24px). Cards span 4 columns (KPI), 6 columns (charts), 12 columns (story insights). Mobile reorganises to stacked list with horizontal scroll for charts.
- **Charts**: Legend pinned top, using `granite-500` text. Data strokes 2px width with accessible patterns. Hover tooltip 320px width, 16px padding, drop shadow E4.
- **Alert Panel**: Right rail 320px width web, collapses to overlay bottom sheet on phone.

### 8. Investment Oversight
- **Heatmap**: 4×4 grid, cell size 68px, border radius 8px. Colour ramp from `harbour-100` to `catalyst-600`. Tooltip shows risk value, threshold, last updated timestamp.
- **Compliance Checklist**: Checklist card 24px padding, checkbox 24px, status pill `granite-900` text on `aurora-100` background.

### 9. Provider Operations Work Queue
- **List Layout**: Dual-pane on tablets (list 320px width, detail flex). Mobile uses segmented control to swap between list and map. Row includes priority chip, due SLA, location tag.
- **Map Overlay**: Map tile container 100% width, 260px height, using Mapbox enterprise theme (Dark Gray). Action buttons anchored bottom, 56px height, gradient `aurora-500`.

### 10. Settings & Preferences
- **Section Headers**: 20/28 semibold text, 16px top/bottom padding. Toggle rows 56px height, icon 28px.
- **Accessibility Preview**: Carousel of sample screens (cards 280px width) with ability to adjust text size slider (track 8px height, thumb 24px diameter).

## Responsive Behaviour Summary
- Breakpoint tokens: `bp-xs` 0–413px, `bp-sm` 414–599px, `bp-md` 600–767px, `bp-lg` 768–1023px, `bp-xl` 1024–1279px, `bp-xxl` ≥1280px.
- Cards adopt density modes: Comfort (default heights), Compact (-20% vertical padding), Analytics (custom height based on data density). Documented for each screen.
- Navigation elements collapse (bottom tabs → hamburger) below 360px and expand to include labels once width > 414px.

## Motion & Feedback Patterns
- Skeleton loaders: 12px radius rectangles with shimmer gradient (left: `granite-100`, right: `granite-50`). Duration 1.4s linear.
- Pull-to-refresh: Elastic overscroll 32px amplitude, refresh spinner 24px diameter, 2 rotations per second, `aurora-500` stroke.
- Error states: Inline message bars 48px height with icon 24px, background `catalyst-100`, text `catalyst-700`.

## Asset & Resource Requirements
- Illustrations from `/design-system/assets/v1.50/illustrations/` with dedicated variants: Home (assistant_personalisation.svg), Knowledge (knowledge_stack.svg), Offline (cloud_sync.svg). Provide PNG fallback at 3x for Android 11.
- Icons from Outline 2.0 set stored in `/design-system/icons/outline2/`. All exported at 24px (baseline) with 20px variant for dense lists.
- Lottie animations for onboarding located `/motion/v1.50/mobile/onboarding/`. Frame rate 60fps, loop length 1.6s.

## Documentation Links
- Redlines attached to Figma frames: `FG:Mobile/Home/AdaptiveHome_v150`, `FG:Mobile/ServiceHub/Intake_v150`, etc.
- Interaction maps cross-referenced in `Screens_Update_Logic_Flow.md` and `Logic_Flow_update.md` for gating, permissions, offline fallback.
