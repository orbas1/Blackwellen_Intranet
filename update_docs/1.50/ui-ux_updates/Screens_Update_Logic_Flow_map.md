# Screens Update Logic Flow Map – Version 1.50

## Diagram References
| Flow ID | Diagram File | Description | Notes |
| --- | --- | --- | --- |
| `FLOW-01` | `/figjam/v1.50/screen-logic/home_personalisation.svg` | Adaptive Home personalisation overlay with decision gates for mandatory onboarding | Includes offline fallback branch and telemetry hooks |
| `FLOW-02` | `/figjam/v1.50/screen-logic/notification_to_approval.svg` | Notification deep link through approval completion | Highlights MFA gateway and error states |
| `FLOW-03` | `/figjam/v1.50/screen-logic/service_intake.svg` | 4-step service intake journey for user and provider variants | Annotated with form validation rules and API dependencies |
| `FLOW-04` | `/figjam/v1.50/screen-logic/provider_queue.svg` | Provider Kanban/list/map toggle logic | Contains WebSocket subscription logic and offline caching |
| `FLOW-05` | `/figjam/v1.50/screen-logic/knowledge_attestation.svg` | Knowledge search → document viewer → attestation completion | Notes translation handling and attestation audit logging |
| `FLOW-06` | `/figjam/v1.50/screen-logic/analytics_alert.svg` | Analytics alert investigation including scenario creation | Shows branching into collaborative hand-off |
| `FLOW-07` | `/figjam/v1.50/screen-logic/settings_accessibility.svg` | Settings adjustments and persistence | Documents debounce timing and preview updates |

## Legend
- **Green Nodes**: Successful states (colour token `harbour-500`).
- **Blue Nodes**: Interaction steps (token `aurora-500`).
- **Orange Nodes**: Decision points/branching logic (token `catalyst-500`).
- **Grey Nodes**: System processes or background sync (token `granite-400`).
- **Red Outline**: Error or escalation path requiring user attention.
- **Dashed Line**: Optional branch or fallback (e.g., offline queue).

## Swimlane Assignments
- Lanes include User, Provider, System, API, Notification. Each diagram uses consistent lane height 120px with 24px separation.
- Timeline axis labelled in increments of 0.5 seconds for micro interactions; macro flows (service intake) use step numbering rather than time.

## Documentation Attachments
- Each SVG exported with accessible text labels and alt descriptions for documentation portal.
- PDF bundle stored at `/design-system/flows/v1.50/screen-logic-pack.pdf` for stakeholder review.
- Version history logged in Figma with comments referencing Jira `UIUX-150-Flow-*`.

## Next Actions
- Validate diagrams with engineering leads during Flow Review 2 (Week 6, Tuesday).
- Update `FLOW-04` after final decision on dynamic routing algorithm (pending data science sign-off).
- Ensure translations for decision node labels available in FR/ES/DE before publishing to Confluence.
