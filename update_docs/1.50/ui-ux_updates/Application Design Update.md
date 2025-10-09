# Application Design Update – Version 1.50

## Vision & Scope
- **Unified Experience**: Deliver a cohesive enterprise-grade interface for employee (user), provider/operations, and web admin touchpoints rooted in the Aurora design system tokens introduced in 1.50. Every layout adheres to the 8px grid with responsive breakpoints at 360, 414, 600, 768, 1024, 1280, and 1600px to guarantee parity across native phone, tablet, and desktop contexts.
- **Modular Architecture**: Screen compositions are assembled from adaptive widget cards, structured panels, and contextual drawers. Each component references shared token names (colour, typography, spacing, elevation) to ensure cross-platform maintainability and Storybook + Figma alignment.
- **Performance & Accessibility**: Specify light/dark contrast ratios ≥4.5:1 for primary text, minimum tap targets 48×48px on native, keyboard focus rings 2px inner + 2px outer on web. Motion easing follows 200ms ease-out entrance, 150ms ease-in exit, 400ms spring for drag/overscroll interactions.

## Platform Overview
| Platform | Primary Personas | Navigation Shell | Key Modules |
| --- | --- | --- | --- |
| **User Phone App** (iOS/Android) | Employees, Managers, Executives | 5-tab bottom nav + assistant floating action | Adaptive Home, Notifications, Service Hub, Knowledge Hub, Analytics Snapshot, Investment Oversight |
| **Provider Phone App** (Field & Operations) | Fulfilment teams, Service owners | Dual-rail navigation (bottom core tabs + contextual top filters) | Work Queue, Request Detail, Inventory, Field Scheduling, Compliance Checks |
| **Web Application** | Admins, Analysts, HR, Finance | Left rail + utility header + breadcrumb | Admin Console, Workforce Analytics, Content Management, Configuration, Audit Trails |

## Core Deliverables
1. **Screen Specifications**: Redline tables for 45 core screens (24 user mobile, 14 provider mobile, 7 responsive web). Each screen doc includes layout grid, component stacking order, breakpoints, and states (default, hover, focus, error, success, empty, loading).
2. **Interaction Blueprints**: Flow charts mapping entry → decision → exit nodes with API contracts and guardrails (validation, offline fallback, permission gating).
3. **Asset Registry**: Enumerate imagery, iconography, Lottie animations, and vector sources. Provide repository path (e.g., `/design-system/assets/v1.50/mobile/illustrations/assistant_welcome.svg`) and licensing (all internal). Specify export sizes (1x, 1.5x, 2x, 3x) and naming conventions.
4. **Typography Matrix**: Update Inter (400/500/600/700) and Source Serif (400/600) usage by context with precise size/line height per platform (e.g., Body on mobile 16/24, Body Compact 14/20 for dense tables).
5. **Colour Governance**: Map Aurora palette tokens to semantics: `aurora-500` (#2D5BE3) for primary fills, `harbour-500` (#1D9A6C) for success, `catalyst-500` (#E8683A) for warnings, Granite neutrals (N0–N950) for backgrounds and typography. Provide gradient recipes (`aurora-500` → `aurora-300` with 120° angle) and overlay opacities.
6. **Component Library Expansion**: Document new provider operations widgets (Route Card, Compliance Checklist, Inventory Gauge) plus updated analytics tile families. Include padding (e.g., card inner padding 24px web, 20px mobile) and elevation values (E3 shadow: 0 12px 24px rgba(28,32,36,0.12)).

## Implementation Handoff Guidance
- **Design Tokens**: Delivered via Style Dictionary JSON export (`/design-system/tokens/v1_50.json`). Front-end teams consume through React Native + web theme packages. Provide changelog entries for renamed tokens and deprecation schedule.
- **Prototype References**: Figma project `Blackwellen DS › Release 1.50` contains page-level prototypes labelled `[Platform]_[Module]_[Screen]`. Each includes variant panel (Default, Dark Mode, High Contrast) and auto-layout annotations.
- **Widget Blueprints**: Documented in `Screens__Update_widget_types.md` and `Screens_Updates_widget_functions.md` with technical acceptance criteria (data feed, refresh cadence, offline caching rules).
- **Motion Specs**: After Effects sources stored in `/motion/v1.50/` with JSON Lottie exports. Provide integration notes for React Native (lottie-react-native 6.x) and web (lottie-web 5.x) builds.
- **QA Checklists**: Pair each screen spec with success criteria: visual (component placement vs redlines), functional (flows complete with expected states), and accessibility (screen reader labels, focus order). Link to `Logic_Flow_update.md` for validation steps.

## Dependencies & Risks
- **API Contracts**: Analytics widgets rely on `/api/v3/analytics/snapshot` (JSON) with 1.5s SLA. Service Hub queue requires WebSocket channel for live updates; fallback to 15s polling when offline mode active.
- **Asset Pipeline**: New illustration set (generated via internal Figma + SVGOMG) depends on gradient masks not supported in Android < 12; provide PNG fallback at 3x.
- **Dark Mode Harmonisation**: Need to finalise dark token mapping (`granite-950` backgrounds, `aurora-300` text for accents) before development freeze. Documented adjustments scheduled Milestone 4.
- **Regulatory Review**: Compliance overlays and audit trails must align with SOC2 / ISO controls; legal review pending for provider checklist language.

## Success Metrics
- 20% increase in task completion speed (goal: <3 steps for top workflows) measured via in-app analytics.
- ≥92 Lighthouse accessibility score across responsive web screens.
- <2.5s perceived load time on mobile home via skeleton loaders and async data fetch.
- ≥4.3/5 post-launch usability rating from pilot cohort (n=80) gathered via in-app survey.

## Next Steps
1. Finalise outstanding dark mode specs and share with engineering by Sprint 6 Day 2.
2. Run design quality review for provider operations workflows with service leadership; capture sign-off in `provider_application_styling_changes.md`.
3. Upload annotated PNG redlines to shared handoff folder and link from each screen doc.
4. Coordinate translation review for microcopy variations (EN/FR/ES/DE) and update `Screen_text.md` accordingly.
5. Prepare Storybook update notes for the React component team referencing new tokens and states.
