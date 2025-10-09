# Colour System – Version 1.50

## Token Summary
| Token | Hex | Usage |
| --- | --- | --- |
| `aurora-700` | #2347B8 | Primary button pressed, FAB pressed |
| `aurora-600` | #2754CD | Primary hover |
| `aurora-500` | #2D5BE3 | Primary default, links, highlights |
| `aurora-400` | #4A74EB | Focus ring outer, gradient midpoint |
| `aurora-300` | #7A99F4 | Hover backgrounds, gradient light |
| `aurora-100` | #E4ECFB | Selected states, backgrounds |
| `harbour-600` | #167B56 | Success pressed |
| `harbour-500` | #1D9A6C | Success default |
| `harbour-300` | #6AC6A1 | Success hover |
| `harbour-200` | #AEE8CC | Positive backgrounds |
| `catalyst-600` | #C04D24 | Error pressed |
| `catalyst-500` | #E8683A | Error default |
| `catalyst-300` | #F29B7D | Error hover |
| `catalyst-100` | #FCE8E1 | Error background |
| `skylight-500` | #1E90D6 | Info chips |
| `skylight-100` | #E0F3FB | Info background |
| `granite-950` | #0F1216 | Body text on light |
| `granite-900` | #151920 | Headers |
| `granite-700` | #2C333F | Secondary text |
| `granite-500` | #536074 | Tertiary text |
| `granite-300` | #8B98AE | Borders |
| `granite-200` | #B8C2D3 | Subtle dividers |
| `granite-100` | #DFE4EE | Background subtle |
| `granite-50` | #F3F6FA | Page background |
| `granite-0` | #FFFFFF | Surfaces |

## Semantic Mapping
- **Primary**: `aurora-500` for main CTAs, icons, progress bars.
- **Secondary**: `harbour-500` for success, completion, positive metrics.
- **Warning**: `catalyst-500` for alerts, deadlines.
- **Information**: `skylight-500` for info banners, travel advisories.
- **Neutral**: Granite scale for surfaces, text, borders.

## Gradients
- `gradient-aurora`: `linear(120°, aurora-500 0%, aurora-300 100%)` used for hero backgrounds.
- `gradient-harbour`: `linear(135°, harbour-500 0%, harbour-300 100%)` used for confirmation banners.
- `gradient-midnight`: `linear(180°, granite-900 0%, granite-700 100%)` used for analytics alert panel.

## Elevation & Shadows
- E1: 0 2px 8px rgba(15,18,22,0.08).
- E2: 0 8px 16px rgba(20,28,36,0.12).
- E3: 0 12px 24px rgba(28,32,36,0.12).
- E4: 0 24px 48px rgba(15,18,22,0.18).
- E5: 0 32px 64px rgba(12,16,20,0.22).

## Dark Mode Palette
| Light Token | Dark Token | Hex |
| --- | --- | --- |
| `granite-0` | `granite-900` | #151920 |
| `granite-50` | `granite-850` | #1C222B |
| `granite-100` | `granite-800` | #202835 |
| `granite-300` | `granite-400` | #6F7A8D |
| `aurora-500` | `aurora-300` | #7A99F4 |
| `harbour-500` | `harbour-300` | #6AC6A1 |
| `catalyst-500` | `catalyst-300` | #F29B7D |

## Accessibility
- Minimum contrast 4.5:1 for text <24px; use `granite-950` on light surfaces, `granite-50` on dark.
- Buttons ensure 3:1 contrast between text and background in all states.
- Provide high contrast theme toggling to `granite-0` text on `granite-950` backgrounds with accent tokens unchanged.

## Implementation
- CSS variables defined under `:root[data-theme="light"]` and `[data-theme="dark"]`.
- React Native theme uses exported JSON tokens; integrate via `@shopify/restyle`.
- Chart library uses complementary palette `analytics_palette.json` with accessible patterns.
- Print palette mapping includes CMYK approximations documented in `Screen_update_Screen_colours.md`.
- Web runtime consumes shared registry at `apps/web/src/styles/themes.ts`, ensuring persisted preferences and high-contrast variants map to the same token IDs surfaced in design documentation.
