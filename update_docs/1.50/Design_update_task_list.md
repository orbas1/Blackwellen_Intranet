# Version 1.50 Design Task List

> **Note**: Tasks span provider application, user application, and web portal surfaces. Each task includes coordination checkpoints with engineering, product, and compliance counterparts.

1. **Design System Unification & Token Expansion — 25%**
   - *Goal*: Refresh foundational tokens and component specs to support adaptive home, service hub, and analytics initiatives.
   - *Subtasks*:
     1. Audit existing colour, typography, spacing, and elevation tokens against new accessibility requirements. ✅ Completed — documented in `Screen_update_Screen_colours.md`.
     2. Publish unified token library covering light, dark, emo, and departmental palettes with fallback mapping. ✅ Completed — distributed via Style Dictionary pipeline.
     3. Document component anatomy and states for cards, buttons, forms, menus, and widgets across app and web contexts. ✅ Completed — referenced in `Screens_Updates_widget_functions.md`.
     4. Integrate token updates into design tooling (Figma libraries) and provide change notes to engineering repositories. ✅ Completed — release notes shared 24 Apr.
     5. Establish governance workflows for partial template updates and theme variant approvals. 🟡 In Progress — governance doc in review, final sign-off pending.

2. **Navigation & Layout Architecture Redesign — 35%**
   - *Goal*: Recompose navigation structures and page frameworks for provider, user, and web experiences.
   - *Subtasks*:
     1. Produce adaptive navigation blueprints (mega menus, breadcrumbs, quick actions) aligned to `Organisation_and_positions` artefacts. ✅ Completed — incorporated into `web_app_wireframe_changes.md`.
     2. Redesign home, directory, knowledge, and service hub layouts using modular sections and widget rails. ✅ Completed — see `Screens_Update.md` and wireframe files.
     3. Define responsive breakpoints, grid systems, and spacing rules for cross-device consistency. ✅ Completed — documented in `web_app_wireframe_changes.md` and `Screens_Update.md`.
     4. Validate navigation flows against updated logic diagrams and service escalations. 🟢 On Track — validation now executed against implemented routing shells with follow-up review booked Week 3.

  **Progress Update (02 May 2024)**: Directory profile drawer, knowledge filters, and offline notices reflected in updated wireframes; analytics console flows remain in review pending telemetry instrumentation.

3. **Content, Copy, and Compliance Refresh — 10%**
   - *Goal*: Update textual assets, microcopy, and compliance messaging across all surfaces.
   - *Subtasks*:
     1. Draft copy decks for new analytics, AI, and service workflows with tone and localisation guidance. 🟡 In Progress — drafts prepared, awaiting compliance review.
     2. Embed compliance disclaimers, consent notices, and audit cues into key screens and pages. 🟡 In Progress — placeholders noted in wireframes, final copy pending.
     3. Align typography usage with revised scales and truncation behaviours to preserve readability. ✅ Completed — applied in `Screens_Update.md` and design tokens.
     4. Coordinate legal, privacy, and security reviews before publishing final copy packages. ⚪ Not Started — meeting scheduled Week 4.

4. **Theming & Personalisation Enablement — 15%**
   - *Goal*: Deliver adaptive theme variants, emo themes, and personalisation controls.
   - *Subtasks*:
     1. Define theme matrices covering colour, typography, and motion settings for each variant. ✅ Completed — `Screen_update_Screen_colours.md` updated.
     2. Configure partial template logic for departmental home pages and microsites. 🟡 In Progress — configuration notes drafted, engineering validation pending.
     3. Design personalisation controls for layout toggles, widget pinning, and theme switching. ✅ Completed — captured in `Screens_Update.md` and logic flows.
     4. Conduct accessibility validation for all themes, addressing contrast, focus, and animation preferences. 🟡 In Progress — Chromatic regression tests queued.
     5. Publish implementation guidance for engineers, including token mappings and runtime switching patterns. ⚪ Not Started — targeted for Week 4.

5. **Asset & Media Optimisation — 10%**
   - *Goal*: Curate performant imagery, vectors, and iconography aligned to new experiences.
   - *Subtasks*:
     1. Inventory existing assets across application and web libraries, identifying gaps and redundancies. 🟡 In Progress — audit underway with mobile branding assets now sourced from generated SVG templates.
     2. Produce new illustration and photography sets for adaptive home, service hub, and analytics scenarios. ⚪ Not Started.
     3. Optimise assets for multiple breakpoints (1x, 2x, 3x) and document compression guidelines. ⚪ Not Started.
     4. Update asset management documentation with CDN strategy, naming conventions, and usage rights. 🟡 In Progress — documented deterministic asset generation workflow; CDN policy pending analytics imagery sign-off.

6. **Design QA & Handover Enablement — 10%**
   - *Goal*: Ensure design fidelity through build and release by defining QA processes and artefacts.
   - *Subtasks*:
     1. Create design QA checklist covering responsiveness, accessibility, and component parity. ✅ Completed — referenced in `Screens_Update.md` testing section.
     2. Provide annotated specifications, redlines, and interaction notes for engineering consumption. ✅ Completed — distributed via Figma handoff kit.
     3. Coordinate visual regression baselines and accessibility automation scripts with QA teams. 🟡 In Progress — automation scripts in development.
     4. Run design acceptance reviews on implemented screens/pages, logging deviations and remediation owners. ⚪ Not Started — dependent on engineering builds.
     5. Compile final design handover package including release notes, training materials, and support guidelines. ⚪ Not Started.

7. **Usability & Accessibility Validation — 5%**
   - *Goal*: Test new experiences with representative users and remediate findings before release.
   - *Subtasks*:
     1. Develop usability testing plan targeting adaptive home, service hub, and analytics workflows. ✅ Completed — plan appended to research board.
     2. Facilitate moderated sessions across desktop, mobile web, and native app contexts, capturing behavioural insights. ⚪ Not Started — sessions scheduled Week 5.
     3. Perform accessibility audits (WCAG 2.2 AA) across theme variants, recording issues and severity. 🟡 In Progress — initial automated scans complete.
     4. Partner with engineering and QA to resolve usability and accessibility findings, confirming retests. ⚪ Not Started.

8. **Documentation & Training Delivery — 10%**
   - *Goal*: Produce comprehensive documentation and training materials for stakeholders and support teams.
   - *Subtasks*:
     1. Update design playbooks, component usage guides, and content governance manuals. 🟡 In Progress — draft updates underway.
     2. Create training decks and video walkthroughs for support, operations, and communications teams. ⚪ Not Started.
     3. Document release communications, change impacts, and rollout checklists for design-led updates. ⚪ Not Started.
     4. Archive final artefacts in knowledge repositories with versioning and ownership metadata. ⚪ Not Started.
