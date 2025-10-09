# Screen Colour Specifications – Version 1.50

## Palette Overview
- **Primary Accent (Aurora)**: `aurora-700` #2347B8 (pressed), `aurora-600` #2754CD (hover), `aurora-500` #2D5BE3 (default), `aurora-400` #4A74EB, `aurora-300` #7A99F4, `aurora-100` #E4ECFB.
- **Secondary (Harbour)**: `harbour-600` #167B56, `harbour-500` #1D9A6C, `harbour-300` #6AC6A1.
- **Status (Catalyst)**: `catalyst-600` #C04D24, `catalyst-500` #E8683A, `catalyst-100` #FCE8E1.
- **Neutral (Granite)**: `granite-950` #0F1216, `granite-900` #151920, `granite-700` #2C333F, `granite-500` #536074, `granite-300` #8B98AE, `granite-100` #DFE4EE, `granite-50` #F3F6FA.
- **Positive (Harbour Bright)**: `harbour-200` #AEE8CC.
- **Information (Skylight)**: `skylight-500` #1E90D6, `skylight-100` #E0F3FB.

## Screen-Level Colour Assignments
| Screen | Background | Key Components | Gradients | Notes |
| --- | --- | --- | --- | --- |
| Adaptive Home | `granite-50` base, `granite-0` cards | Headers `aurora-500` text on `granite-0`, widget headers `granite-900`, body `granite-700` | Hero gradient `aurora-500` → `aurora-300` (120°) behind persona badge | Dark mode uses `granite-900` base, cards `granite-800` |
| Notifications Modal | Overlay scrim rgba(12,16,20,0.5) | Modal background `granite-0`, header `granite-900` text, severity icons `catalyst-500`/`harbour-500` | None | Focus ring `aurora-400` 2px outside 2px white inset |
| Service Intake | Content background `granite-50` | Stepper active `aurora-500`, completed `harbour-500`, upcoming `granite-300`; form field borders `granite-200`, focus `aurora-400` | Confirmation banner gradient `harbour-500` → `harbour-300` | Error inline `catalyst-100` with `catalyst-600` text |
| Service Tracker (Kanban) | Board background `granite-100` | Column headers `granite-700`, cards `granite-0`, status chips using status tokens | Swimlane highlight gradient `aurora-100` → transparent 0° | Drag ghost uses `aurora-300` 30% opacity |
| Knowledge Hub | Background `granite-0` web, `granite-50` mobile | Navigation tree selected `aurora-100`, text `granite-700`, active indicator `aurora-500` | Featured card overlay gradient `granite-950` 0% → 80% bottom overlay | Reader dark mode uses `granite-900` background, text `granite-50` |
| Document Viewer | Background `granite-0`, toolbar `granite-950` (92% opacity) | Annotation drawer `granite-50`, comment highlights `aurora-100`, attestation banner `harbour-500` text white | Scroll progress bar gradient `aurora-400` → `aurora-500` | Focus highlight `aurora-300` 4px inset |
| Analytics Snapshot | Background `granite-50` | KPI cards `granite-0`, chart lines `aurora-500`, comparisons `skylight-500`, risk `catalyst-500` | Alert panel gradient `granite-900` → `granite-700` vertical | Heatmap uses multi-stop gradient `harbour-200` → `catalyst-600` |
| Investment Oversight | Background `granite-0` | Risk gauge segments `harbour-500`, `skylight-500`, `catalyst-500`; compliance banner `harbour-500` | Portfolio hero gradient `aurora-500` → `granite-900` 135° | Data tables alternate row `granite-50` |
| Provider Work Queue | Background `granite-50` | Column headers `granite-700`, priority pills `catalyst-500`, SLA met `harbour-500` | Map overlay gradient `granite-900` → transparent 180° | Location tags `skylight-500` text white |
| Settings | Background `granite-0` | Section headers `granite-700`, toggles on `aurora-500`, off `granite-300`; preview card `granite-50` | Accessibility preview gradient toggled `aurora-400` → `harbour-400` | Notification quiet hours card uses `skylight-100` fill |

## Colour Accessibility
- All text to background combinations meet WCAG 2.1 AA guidelines; callouts include overlay shading to maintain 4.5:1 ratio.
- Chart patterns overlay high-contrast stripes (12px spacing) when user enables high contrast mode.
- Focus outlines thickened to 4px on high contrast setting using `aurora-200` outer ring + `granite-950` inner border.

## Dark Mode Adjustments
| Token | Light | Dark Equivalent |
| --- | --- | --- |
| `background-surface` | `granite-0` | `granite-900` |
| `background-subtle` | `granite-50` | `granite-800` |
| `text-primary` | `granite-900` | `granite-0` |
| `text-secondary` | `granite-700` | `granite-200` |
| `accent-primary` | `aurora-500` | `aurora-300` |
| `accent-success` | `harbour-500` | `harbour-300` |
| `accent-warning` | `catalyst-500` | `catalyst-300` |

## Implementation Notes
- Provide CSS variable map and React Native theme file with above tokens.
- Ensure gradients exported as assets for native to avoid runtime mismatch; provide start/end RGBA values.
- Chart library (Victory/Highcharts) updated with palette defined in `analytics_palette.json` under `/design-system/palettes/`.
- Document fallback colours for printing: convert to CMYK approximations (Aurora C91 M73 Y0 K0, Harbour C78 M0 Y51 K16, Catalyst C0 M68 Y85 K9).
