# Version 1.50 Design Change Log

## Overview
Version 1.50 consolidates all user experience refresh items captured in the `Application_Design_Update_Plan` and `Web_Application_Design_Update` workspaces. The change log below summarises the artefacts that have been updated, introduced, or deprecated to align the provider, user, and web applications with the adaptive home, service hub, and analytics initiatives.

---

## Global Design System Updates
- **Design Language Extension**: Expanded the base colour palette, typography scales, and iconography tokens to support adaptive themes and responsive breakpoints documented across `Colours.md`, `Fonts.md`, and `Icons` references in both directories.
- **Component Inventory Refresh**: Reclassified widgets, cards, buttons, forms, and menu families (`Cards.md`, `Screen_buttons.md`, `Forms.md`, `Menus.md`) into an enterprise catalogue with documented states, accessibility criteria, and usage guardrails.
- **Accessibility & Compliance Enhancements**: Embedded WCAG 2.2 AA checks, localisation hooks, and security status call-outs in `Screen_text.md`, `Organisation_and_positions.md`, and `Accessibility` notes to ensure consistent navigation cues and critical messaging.
- **Theme & Layout Orchestration**: Added support for theme variants, emo themes, and partial template overrides to accommodate departmental home pages and microsites, using shared layout primitives (`Logic_Flow_map.md`, `Screens_Update_Logic_Flow_map.md`).

---

## Application Design Updates (Provider & User Apps)
### Navigation & Information Architecture
- Introduced adaptive mega menu and contextual breadcrumb patterns documented in `Organisation_and_positions` and `Menus.md` to simplify cross-module movement.
- Refined layout grids for dashboard, knowledge, and service hub screens (`Screens_Update_Plan.md`, `Screens_Update.md`) to prioritise task completion and telemetry widgets.

### Interface Components
- Updated button hierarchy, icon-button combinations, and call-to-action placements (`Screen_buttons.md`, `Screens_Updates_widget_functions.md`) to reflect critical operations and approvals.
- Reworked card templates for directory entries, service requests, and analytics snapshots (`Cards.md`) with support for quick actions, segmentation chips, and data freshness indicators.

### Content & Typography
- Standardised font pairings, typographic scales, and truncation behaviour across application contexts (`Fonts.md`, `Screen_text.md`).
- Refreshed copy decks for new service workflows, knowledge hub notices, and alerts to reflect updated compliance wording and proactive security messaging.

### Visual Treatments & Media
- Replaced outdated illustrations and vectors with role-based imagery from `Screens_update_images_and_vectors.md` to match the redefined personas.
- Integrated dynamic theming for hero banners, celebration widgets, and analytics overlays to harmonise with holiday or departmental campaigns.

### Workflow & Logic Alignment
- Updated logic flow diagrams (`Logic_Flow_map.md`, `Logic_Flow_update.md`) for onboarding, approvals, and request escalations to mirror the reconfigured service hub experience.
- Added adaptive guidance patterns in screens that rely on AI or automation, ensuring guardrail messaging around predictive analytics and consent.

---

## Web Application Design Updates
### Homepage & Landing Experiences
- Re-composed hero layouts, promotional slots, and navigation rails (`Home page components.md`, `Home page images.md`, `Home Page Organisations.md`) to highlight adaptive home and intelligence capabilities.
- Introduced modular page sections for partial rendering and microsite takeover (`pages.md`, `pages_list.md`) enabling business units to mix curated and global content.

### Theming & Styling
- Implemented expanded SCSS/CSS tokens (`Scss.md`, `Css.md`) to deliver light/dark, emo-inspired, and departmental palettes with automatic contrast testing.
- Refreshed card, button, and typography styles (`Cards.md.md`, `Colours.md`, `text.md.md`) to maintain parity with application-level design decisions.

### Functional Components
- Defined component functions and types (`component_functions.md`, `component_types.md`) for dashboards, profile modules, and resource carousels to ensure consistent interactivity and analytics instrumentation.
- Updated settings and profile experiences (`Settings.md`, `Profile Styling`, `Profile Look.md`) to allow user-led layout personalisation and security prompts.

### Assets & Resources
- Curated a new assets library (`Assets.md`, `images_and _vectors.md`) with optimised web imagery, vector sets, and icon packages aligned to performance budgets.
- Documented resource linking strategies (`Resources.md`) for knowledge bases, policy downloads, and video explainers to support role-based access.

---

## Deprecated & Replaced Artefacts
- Removed legacy dashboard blueprints superseded by adaptive widget layouts (previous `Dashboard Designs` and `Dashboard Organisation` baselines).
- Retired redundant menu schematics and form variants that conflicted with the new accessibility posture, consolidating patterns under the updated `Menus.md` and `Forms.md` specifications.

---

## Pending Follow-Up Items
- Complete final accessibility validation for departmental emo themes to confirm colour contrast and focus treatment compliance.
- Finalise integration notes for third-party widget providers to ensure UI shell parity between internal applications and public web surfaces.
- Publish annotated prototypes for user testing covering onboarding, analytics deep dives, and cross-device responsiveness.
