# Screens Update Plan – Version 1.50

## Objectives
1. Deliver complete redlines, flows, and component references for 45 screens spanning user mobile, provider mobile, and responsive web.
2. Align cross-functional teams (design, engineering, product, research, QA) on sequencing, approvals, and release readiness.
3. Guarantee accessibility, localisation, and performance requirements are addressed during design iterations.

## Milestones & Timeline
| Milestone | Dates | Deliverables | Owners |
| --- | --- | --- | --- |
| **M1 – Discovery & Audit** | Week 1 | Screen inventory validation, usage analytics review, legacy asset gap list | Lead Product Designer, UX Researcher |
| **M2 – Wireframe Refresh** | Weeks 2–3 | Updated low/high fidelity wireframes for all screens, motion storyboards | Platform Designers (User, Provider, Web) |
| **M3 – Visual Polish & Tokens** | Weeks 4–5 | Final UI comps with Aurora tokens, typography matrix, colour overlays | UI Design Lead, Design Ops |
| **M4 – Interaction Specs** | Week 6 | Flow charts, state tables, microcopy, accessibility annotations | Interaction Designer, Content Strategist |
| **M5 – Handoff & QA Prep** | Week 7 | Figma component linking, Zeplin/PNG redlines, QA checklist packages | Design Program Manager |
| **M6 – Validation & Sign-off** | Week 8 | Stakeholder sign-offs (Product, Eng, Compliance), pilot feedback integration | Director of Product Design |

## Workstreams & RACI
- **Adaptive Home**: R (User App Designer), A (Design Lead), C (Mobile Engineering, Data Science), I (Research, Marketing).
- **Service Hub Intake**: R (Service UX Designer), A (Product Manager), C (Legal, Compliance), I (Ops Leads).
- **Provider Operations**: R (Provider Designer), A (Ops Product Manager), C (Field SMEs), I (Support).
- **Analytics & Investment**: R (Data Visualisation Designer), A (Design Lead), C (Analytics Engineering), I (Executive Stakeholders).
- **Settings & Menus**: R (Systems Designer), A (Design Lead), C (Security, Support), I (Customer Success).

## Review Ceremonies
- **Weekly Design Critique** (Fridays): Focus on layout consistency, interaction rationale, cross-platform parity.
- **Motion Review** (Bi-weekly Tuesdays): Evaluate Lottie sequences, transitions, and assistive alternatives.
- **Accessibility Clinic** (Week 5 & 7): Screen reader order validation, colour contrast tests, haptic feedback alignment.
- **Product Readout** (Week 6): Walkthrough for exec stakeholders using clickable prototypes.

## Tooling & Deliverable Standards
- Figma versioning with branching per screen family; merge only after critique sign-off.
- Redlines exported via Zeplin with component references (naming: `platform_module_screen_state.png`).
- Flow diagrams produced in FigJam (`/figjam/v1.50/screen-flows/`) and exported as SVG for documentation.
- Copy stored in Ditto workspace with localisation placeholders (`{{variable}}` format) and embedded in `Screen_text.md`.
- Asset repository mirrored in Git under `/design-system/assets/v1.50/` with README detailing licensing.

## Risk Mitigation
- **Scope Creep**: Maintain change log in `design_change_log.md`; additions require approval during weekly triage.
- **Cross-team Dependencies**: Map API or backend dependencies in `Logic_Flow_update.md`; escalate blockers to Program Manager.
- **Localisation Delays**: Pre-book translators during Week 4, include buffer for text expansion in all comps.
- **Compliance Reviews**: Provide early drafts of approval and checklist screens to legal by Week 3.

## Success Criteria
- 100% of screens documented with measurement tables and state definitions in relevant markdown files.
- Accessibility acceptance criteria signed off before development handoff.
- All widgets referenced have data owner, refresh cadence, and offline plan recorded in `Screens_Updates_widget_functions.md`.
- Stakeholder sign-off recorded in `provider_application_styling_changes.md`, `user_application_styling_changes.md`, and `web_application_styling_changes.md`.
