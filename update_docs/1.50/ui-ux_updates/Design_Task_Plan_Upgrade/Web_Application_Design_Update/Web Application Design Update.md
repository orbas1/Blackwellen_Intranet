# Blackwellen Intranet Web Application — Version 1.50 Design Update

## Executive Summary
- Deliver a cohesive, enterprise-grade visual and interaction language that unifies provider and user portals under a single responsive design system.
- Introduce modular component library with precise sizing, spacing, and tokenized styling variables for scalable maintenance.
- Provide exhaustive specifications for imagery, iconography, motion, and accessibility to support implementation without additional clarification.

## Design Principles
1. **Clarity & Hierarchy** — prioritize scannability using 4pt spacing grid, 8px base units, typographic scale (12–40px) and color-coded strata.
2. **Trust & Professionalism** — leverage deep blues (#0B1D3A, #112B4C) with copper accent (#D07A2D) and emerald success cues (#1F8A70) to convey stability.
3. **Inclusivity & Accessibility** — WCAG 2.2 AA compliance: minimum contrast ratios 4.5:1 for body text, 3:1 for large headings; focus outlines >= 2px using accent 60% opacity.
4. **Efficiency & Feedback** — micro-interactions (200ms easing-out) provide immediate feedback; loader skeletons for async actions; consistent iconography (Phosphor Icons) sized 20/24px.

## Information Architecture Overview
- **Global Navigation:** Top horizontal nav with logo left, primary menu centered, utility icons right. Collapses into hamburger for ≤1024px.
- **Left Contextual Sidebar:** For dashboard and settings pages; width 264px desktop, 88px collapsed icon-only, overlays on mobile.
- **Content Grid:** 12-column layout (80px columns, 24px gutters) up to 1440px, then centered with 64px outer margin; tablet uses 8-column (72px columns, 16px gutters); mobile 4-column (72px columns, 16px gutters).
- **Component Library:** Card, table, form, modal, drawer, and notification patterns standardized per docs below.

## Responsive Breakpoints & Behavior
| Breakpoint | Width Range | Layout Adjustments |
|------------|-------------|--------------------|
| XL | ≥1440px | Max content width 1280px; nav items spaced 32px; cards arranged 4 per row. |
| LG | 1280–1439px | Content width 1120px; cards 3 per row; sidebar fixed. |
| MD | 1024–1279px | Content width 960px; nav shrink to smaller padding; data tables convert to compact density. |
| SM | 768–1023px | Sidebar collapses to icon rail; nav uses menu button; cards 2 per row. |
| XS | ≤767px | Single column flow; sticky bottom action buttons; fonts scale down by 1 step. |

## Asset & Resource Sourcing
- **Imagery:** Corporate photography pulled from internal DAM repository `blackwellen/brand-assets@v2.4`. Use hero images `team-conference-01.jpg`, `city-network-02.jpg` (licensed, 3200x1800). Crop to 16:9 hero, 4:3 cards.
- **Icons:** Phosphor Icons (MIT) via npm package `phosphor-react@2.0.0`. Use outlined set for neutral states, fill for active.
- **Illustrations:** Vector overlays from `blackwellen/illustrations/ui-kit` stored as SVG, sized to 640x480, tinted with #1F8A70 at 24% opacity overlay.
- **Typography:** Fonts served via self-hosted WOFF2 from `/assets/fonts` (details in Fonts.md). Preload primary font to avoid FOIT.

## Implementation Checklist
1. Establish SCSS design tokens (colors, typography, spacing, shadows, radii) within `/styles/tokens.scss`.
2. Build React component wrappers aligning with `component_types.md` definitions.
3. Validate interactions using `provider_application_logic_flow_changes.md` & `user_application_logic_flow_changes.md` for parity.
4. Update Storybook (if available) to include new components & states; reference blueprint drawings below for geometry.
5. Ensure QA tests for focus order, keyboard traps, and dynamic resizing per `Screen Size Changes.md`.

## Component Coding System
Every distinct UI element receives a persistent code to keep designers, engineers, and QA aligned. Codes follow the syntax `{PAGE}-{LAYER}-{SEQUENCE}` where `PAGE ∈ {HP, DB, AD, ST}` (Home, Dashboard, Admin, Settings), `LAYER ∈ {NAV, HERO, SEC, WID, CARD, MOD, FTR}` and `SEQUENCE` is zero-padded (001–999).

| Code Example | Element | Primary File | Notes |
|--------------|---------|--------------|-------|
| `HP-NAV-001` | Top marketing navigation bar | `Home Page Organisations.md` | Sticky, translucent background on scroll. |
| `DB-WID-004` | Compliance Pulse timeline widget | `Dashboard Designs.md` | Scrollable column with 64px top padding. |
| `AD-CARD-007` | Role privilege matrix card | `Organisation_and_positions.md` | Houses role toggles and chips. |
| `ST-SEC-002` | Notifications settings block | `Settings Dashboard.md` | Contains toggles and frequency dropdown. |

All subsequent documents reference these codes to describe placement, styling, and functional hooks.

## Page Blueprints

### Home (HP) High-Fidelity Blueprint
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ HP-NAV-001  ┆  Logo (48x48)  |  Menu (96px spacing)  |  CTA Button (HP-NAV-004) │
├──────────────────────────────────────────────────────────────────────────────┤
│                              HERO SECTION (HP-HERO-001)                      │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Headline (HP-HERO-002) 48px | Subcopy (HP-HERO-003) 20px | CTA pair       │ │
│ │ Illustration 640x480 right-aligned (HP-HERO-005)                          │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ VALUE STRIP (HP-SEC-006)                                                     │
│ ┌───────┬───────┬───────┬───────┐                                          │
│ │Card 1│Card 2 │Card 3 │Card 4 │ -> each HP-CARD-007a…d, 288x220            │
│ └───────┴───────┴───────┴───────┘                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ CUSTOMER GRID (HP-SEC-011) 4x3 logos 120x48 (HP-LOGO-012a…l)                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ FOOTER (HP-FTR-015) two-column links & newsletter signup                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Operations Dashboard (DB) Blueprint
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ DB-NAV-001 Top nav 72px height | User menu DB-NAV-003                        │
├───────────────┬──────────────────────────────────────────────────────────────┤
│ Sidebar 264px │ Content  (12-col grid @ 80px columns)                         │
│ DB-SEC-002    │ ┌──────────────────────────────────────────────────────────┐ │
│ icon rail     │ │ KPI Row (DB-CARD-005a-d) 320x160 each with sparklines     │ │
│               │ ├──────────────────────────────────────────────────────────┤ │
│               │ │ Compliance Pulse (DB-WID-004) left 5 cols (640px)        │ │
│               │ │ Task Kanban (DB-WID-006) right 7 cols (896px)            │ │
│               │ ├──────────────────────────────────────────────────────────┤ │
│               │ │ Activity Feed (DB-WID-008) full width                     │ │
│               │ └──────────────────────────────────────────────────────────┘ │
└───────────────┴──────────────────────────────────────────────────────────────┘
```

### Administration Panel (AD) Blueprint
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AD-NAV-001 Global nav shared with dashboard                                  │
├───────────────┬──────────────────────────────────────────────────────────────┤
│ Sidebar       │ Header strip (AD-SEC-003) with breadcrumbs + search (AD-SEC-004)
│ AD-SEC-002    │ ├──────────────────────────────────────────────────────────┤ │
│ Collapsible   │ │ User Directory Table (AD-TBL-005) 12-col span             │ │
│ filters       │ │ Inline filters row (AD-FIL-006)                           │ │
│               │ ├──────────────────────────────────────────────────────────┤ │
│               │ │ Role Matrix Cards grid 3x2 (AD-CARD-007a-f)              │ │
│               │ │ Audit Timeline drawer (AD-WID-010) right column          │ │
│               │ ├──────────────────────────────────────────────────────────┤ │
│               │ │ Modal triggers (AD-MOD-011) overlay spec below           │ │
└───────────────┴──────────────────────────────────────────────────────────────┘
```

Each drawing reflects the 4pt spacing grid. Component-specific colors, fonts, and behavior are elaborated in the supporting markdown files cited above.

## Dependencies & Integrations
- Requires upgrading to `framer-motion@10.16` for micro-interactions (used for menu slide-down, card hover lifts).
- Adopt `@tanstack/react-table@8` for responsive tables defined in Dashboard specs.
- Integrate with existing asset pipeline; ensure all new SVG/PNG optimized via SVGO/TinyPNG (<150KB).

## Change Log Reference
Summaries of modifications are mirrored in `design_change_log.md` with cross-links to provider/user app updates to maintain parity.

