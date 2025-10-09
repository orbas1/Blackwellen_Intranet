# Logic Flow Map Index – Version 1.50

## Diagram Inventory
| ID | Name | Platform | Diagram File | Description |
| --- | --- | --- | --- | --- |
| LF-01 | Adaptive Home Load & Personalisation | Mobile | `/figjam/v1.50/logic/adaptive_home.svg` | Details context fetch, widget load sequencing, and personalisation overlay logic |
| LF-02 | Notification → Approval | Mobile/Web | `/figjam/v1.50/logic/notification_approval.svg` | Captures deep-link entry, MFA gate, and audit logging |
| LF-03 | Service Intake Wizard | Mobile/Web | `/figjam/v1.50/logic/service_intake.svg` | Schema-driven form rendering, validation, offline queue |
| LF-04 | Provider Work Queue | Mobile | `/figjam/v1.50/logic/provider_queue.svg` | Kanban/list/map toggles, WebSocket updates, route optimisation |
| LF-05 | Knowledge Attestation | Mobile/Web | `/figjam/v1.50/logic/knowledge_attestation.svg` | Search, filter, attestation gating |
| LF-06 | Analytics Alert Investigation | Web/Mobile | `/figjam/v1.50/logic/analytics_alert.svg` | Alert detail, scenario builder, assignment |
| LF-07 | Investment Approval Chain | Web/Mobile | `/figjam/v1.50/logic/investment_approval.svg` | Dual sign-off, compliance logging, notifications |
| LF-08 | Settings & Offline Data | Mobile/Web | `/figjam/v1.50/logic/settings_offline.svg` | Preference save debounce, offline queue management |

## Legend & Notation
- **Rounded rectangles**: User-visible screens.
- **Hexagons**: Decision nodes (feature flags, permissions).
- **Parallelograms**: External service/API calls.
- **Circles**: Start/end points.
- Colour coding matches `Screen_update_Screen_colours.md` tokens.

## Supporting Files
- Mermaid diagrams exported to `/docs/logic/mermaid/*.md` for developer reference.
- PNG previews sized 1920×1080 stored in `/design-system/flows/v1.50/previews/`.
- Layer naming conventions follow `LF-XX_<element>` for easier updates.

## Review Schedule
- Diagram review with engineering in Week 6 Flow Review.
- Update to incorporate API contract changes tracked in `Logic_Flow_update.md`.
- Archive final diagrams post-release in `/archive/v1.50/logic/`.
