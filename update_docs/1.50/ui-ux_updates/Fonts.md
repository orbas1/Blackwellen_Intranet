# Typography Specification – Version 1.50

## Typeface Overview
- **Inter**: Primary UI typeface for all interface elements. Weights 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).
- **Source Serif Pro**: Secondary typeface for long-form knowledge content and analytics narratives. Weights 400 and 600.
- **Fallbacks**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`; `Source Serif Pro, 'Times New Roman', serif`.

## Type Scale (Mobile)
| Style Token | Font | Weight | Size / Line Height | Usage |
| --- | --- | --- | --- | --- |
| `display` | Inter | 700 | 48 / 56 | Hero metrics, major announcements |
| `hero` | Inter | 600 | 40 / 48 | Screen titles (Analytics, Investment) |
| `heading` | Inter | 600 | 32 / 40 | Section headers, modals |
| `subheading` | Inter | 500 | 24 / 32 | Widget headers, drawer titles |
| `title` | Inter | 600 | 20 / 28 | Card titles, form sections |
| `body` | Inter | 400 | 16 / 24 | Body text, form copy |
| `body-strong` | Inter | 600 | 16 / 24 | Emphasis in body paragraphs |
| `supporting` | Inter | 400 | 14 / 20 | Metadata, timestamps |
| `micro` | Inter | 500 | 12 / 18 | Labels, button footnotes |

## Type Scale (Web/Desktop)
| Style Token | Font | Weight | Size / Line Height | Usage |
| --- | --- | --- | --- | --- |
| `display-web` | Inter | 700 | 56 / 64 | Dashboard hero metrics |
| `hero-web` | Inter | 600 | 44 / 52 | Page headers |
| `heading-web` | Inter | 600 | 36 / 44 | Section headers |
| `subheading-web` | Inter | 500 | 28 / 36 | Card headers |
| `title-web` | Inter | 600 | 22 / 30 | Table headers |
| `body-web` | Inter | 400 | 16 / 24 | General copy |
| `body-compact` | Inter | 400 | 14 / 20 | Dense tables |
| `caption` | Inter | 500 | 12 / 18 | Tooltips, chart legends |
| `serif-body` | Source Serif | 400 | 18 / 28 | Knowledge articles |

## Accessibility & Responsive Rules
- Minimum font size 14px (supporting text) except legal footers (12px) with accessible contrast.
- Text scaling: respect OS dynamic type; layout adjusts via auto layout to accommodate up to 200% scaling.
- Provide line height ratio ≥1.4 for readability; adjust to 1.6 for long paragraphs (Serif).

## Usage Guidelines
- Limit uppercase usage to button labels and chips; letter spacing 0.5px for uppercase.
- Avoid mixing serif and sans in the same block; use serif for knowledge article body only.
- Numbers in analytics use tabular lining with Inter features for alignment.
- For code snippets (rare), use `JetBrains Mono` fallback `monospace`.

## Implementation Notes
- Typography tokens defined in `/design-system/tokens/v1_50/typography.json`.
- React Native uses `@shopify/react-native-skia` for advanced text rendering in charts.
- Ensure font files hosted under `/cdn/fonts/v1.50/` with WOFF2, WOFF, TTF; preconnect for performance.
- Include `font-display: swap` to avoid FOIT.
- Provide guidance for dark mode: maintain same sizes; ensure text colour tokens adjust as defined in `Screen_update_Screen_colours.md`.
