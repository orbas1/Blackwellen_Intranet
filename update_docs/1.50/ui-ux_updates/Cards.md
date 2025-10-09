# Card Components – Version 1.50

## Card Families
| Type | Dimensions | Padding | Elevation | Usage |
| --- | --- | --- | --- | --- |
| Standard Card | Mobile width 100%, height variable (min 200px); Web span 4 columns | 20px mobile, 24px web | E2 default, E3 on hover web | Widgets, content sections |
| Compact Card | Height 160–200px | 16px | E1 | Dense data (tables, mini charts) |
| Analytics Tile | 280×240px | 24px | E2, highlight border 2px `aurora-100` | KPI metrics |
| List Card | 100% width, 120px height | 20px | E1 | Request details, notifications |
| Media Card | Image 16:9 top, content below | 20px | E2 | Knowledge spotlight |
| Checklist Card | 320×280px | 24px | E2 | Compliance steps |
| Route Card | 360×320px | 24px | E3 | Provider routes |

## Structural Elements
- Header area includes title (Inter 20/28), optional icon 24px, action buttons (icon button 40×40px).
- Body area uses 16px spacing between rows; metrics align to baseline grid.
- Footer area optional; includes CTA (secondary/tertiary). Footer separated via 1px `granite-100` line with 16px top padding.

## States
- Hover (web): Elevation increase (E2→E3), subtle translateY(-2px).
- Focus: Outline 2px `aurora-400` outside 2px `granite-0`.
- Selected: Border 2px `aurora-500`, background `aurora-100` 40% opacity overlay.
- Dragging: Card shrinks to 96%, drop shadow removed, placeholder outline 2px dashed `aurora-300`.

## Media Handling
- Images maintain 8px corner radius. Use object-fit cover; provide fallback gradient background when missing.
- Chart containers inside cards maintain 16px margin, 8px top/bottom for axis labels.
- Badges sit top-right with 8px offset to maintain optical balance.

## Accessibility
- Card clickable region includes entire surface; provide `aria-label` summarising card contents.
- Keyboard navigation: Tab focus moves to header first; nested controls accessible via arrow keys (list) or Tab sequence.
- Ensure card groups provide heading element for screen reader grouping.

## Implementation Notes
- React component `Card` accepts `variant`, `density`, `interactive` props aligning to design tokens.
- Provide SCSS mixins for spacing/elevation under `/design-system/cards/_mixins.scss`.
- Document sample JSON for dynamic card layouts (Service Hub) mapping to data modules.
