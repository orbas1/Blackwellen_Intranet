# Screen Imagery & Vector Assets – Version 1.50

## Asset Strategy
- Maintain cohesive illustration style using Aurora gradient overlays, rounded geometry, and minimal linework for clarity on both light and dark backgrounds.
- Provide assets in SVG (primary) and PNG @1x/@2x/@3x fallback for platforms with limited SVG support (Android 11, IE mode).
- Store master assets in `/design-system/assets/v1.50/` with mirrored CDN deployment path `/cdn/v1.50/`.

## Illustration Inventory
| Screen | Asset Name | Format | Dimensions | Repository Path | Notes |
| --- | --- | --- | --- | --- | --- |
| Onboarding Carousel | `assistant_welcome.svg`, `service_fastlane.svg`, `offline_ready.svg` | SVG + PNG | 320×240px | `/design-system/assets/v1.50/illustrations/onboarding/` | Looping animation uses Lottie overlay `onboarding_wave.json` |
| Adaptive Home Empty States | `empty_personal_tasks.svg`, `empty_analytics.svg` | SVG | 240×180px | `/design-system/assets/v1.50/illustrations/empty/` | Colour accents align to `aurora-400` & `harbour-400` |
| Notifications | `empty_notifications.svg` | SVG | 240×200px | `/design-system/assets/v1.50/illustrations/notifications/` | Includes 8px stroke to maintain clarity |
| Service Intake Help | `form_helper.svg` | SVG | 280×220px | `/design-system/assets/v1.50/illustrations/forms/` | Displayed inside tooltip popover 240px max width |
| Service Tracker Map Overlay | `provider_route_mask.svg` | SVG mask | 360×240px | `/design-system/vectors/provider/` | Applied as gradient overlay over Mapbox tiles |
| Knowledge Hub Spotlight | `knowledge_stack.svg` | SVG | 320×220px | `/design-system/assets/v1.50/illustrations/knowledge/` | Variation for dark mode with lighter outlines |
| Document Viewer Empty Comments | `empty_comments.svg` | SVG | 200×180px | `/design-system/assets/v1.50/illustrations/comments/` | Transparent background |
| Analytics Story Mode | `insight_story.svg` | SVG | 360×240px | `/design-system/assets/v1.50/illustrations/analytics/` | Contains animated gradient layer exported separately |
| Investment News | `investment_brief.svg` | SVG | 280×220px | `/design-system/assets/v1.50/illustrations/investment/` | Paired with article cards |
| Settings Accessibility Preview | `accessibility_preview.svg` | SVG | 300×200px | `/design-system/assets/v1.50/illustrations/accessibility/` | Shows sample text sizes + colour toggle |

## Iconography
- Base set: Outline 2.0, 1.5px stroke, 24px artboard. Stored at `/design-system/icons/outline2/24px/` with naming `ic_<name>_24.svg`.
- Dense mode: 20px icons in `/design-system/icons/outline2/20px/` for list items and table rows.
- Filled severity icons for notifications stored at `/design-system/icons/filled/`. Primary colours align with semantic tokens.
- Export pipeline ensures 2px corner radius consistent for square icons.

## Vector Effects & Layering
- Gradients applied using linear gradient id `auroraGradient` (120°). Provide fallback solid colour in CSS variables.
- Shadows for illustrations baked with 8% opacity to prevent double-shadow when placed on cards.
- Use mask layers for hero backgrounds (e.g., `home_wave_mask.svg`) to clip gradient backgrounds inside cards without dev heavy lifting.

## Animation Assets
- Lottie JSON stored under `/motion/v1.50/`. Provide keyframes documentation: Onboarding loops 1.6s, Assistant pulse 1.2s, Success confetti 0.8s triggered on approvals.
- Provide fallback static PNG for devices with disabled motion; store at `/design-system/assets/v1.50/animations/static/`.

## Licensing & Attribution
- All illustrations custom-made in-house; no external license required. Document creation source (Figma file `FG:Illustrations/v1.50`).
- Map tiles rely on Mapbox enterprise license; include attribution text in map overlay (12px text, bottom-left alignment).

## Delivery Checklist
- Validate all SVGs with SVGO to minimise size while preserving gradients.
- Provide alt text guidance in `Screens_update_images_and_vectors.md` referencing context-specific descriptions for screen reader support (e.g., “Illustration of assistant presenting insights”).
- Ensure dark mode variants shipped for assets with backgrounds; store in `/design-system/assets/v1.50/illustrations/dark/` with suffix `_dark.svg`.
