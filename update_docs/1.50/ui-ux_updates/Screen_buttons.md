# Button Specifications – Version 1.50

## Button Types
| Type | Usage | Dimensions | Style | States |
| --- | --- | --- | --- | --- |
| Primary Filled | Critical actions (Submit, Approve, Start Route) | Mobile: min width 200px, height 56px; Web: min width 220px | Background `aurora-500`, text `granite-0`, radius 12px, shadow E2 (0 8px 16px rgba(20,28,36,0.15)) | Hover `aurora-600`, Pressed `aurora-700`, Focus outline 2px `aurora-200` inner + 2px `granite-0` outer, Disabled `aurora-200` text `granite-300` |
| Secondary Outline | Supporting actions (Preview, Share) | Height 52px, padding 16px horizontal | Border 2px `aurora-500`, text `aurora-500`, background transparent | Hover background `aurora-50`, Pressed `aurora-100`, Focus same as primary, Disabled border `granite-200` |
| Secondary Ghost | Low emphasis (Dismiss, Cancel) | Height 48px | Text `granite-700`, background transparent | Hover background `granite-100`, Pressed `granite-200`, Disabled `granite-300` |
| Tertiary Icon Button | Quick actions in cards | 44×44px (mobile), 40×40px (web) | Icon 24px, background transparent, radius 12px | Hover `granite-100`, Pressed `granite-200`, Focus ring 2px `aurora-400` |
| Floating Action Button | Assistant invocation, Add actions | 64×64px circle | Gradient `aurora-500` → `aurora-300`, icon 28px white, shadow E4 | Hover (web) increases shadow; Pressed reduces scale to 96%, Focus white ring 4px |
| Pill Toggle | Filter chips, segmented controls | Height 40px (filters), 56px (segmented) | Background `granite-100` default, active `aurora-100` with text `aurora-600`, radius 20/28px | Focus outline `aurora-400`, Disabled `granite-200` |
| CTA Link Button | Text-only with chevron | Auto width | Text `aurora-500`, underline on hover | Focus underline + outline 2px `aurora-200` |

## Layout & Spacing
- Primary buttons align to grid; maintain 24px spacing between stacked buttons, 16px when inline.
- On mobile, full-width buttons use 24px horizontal padding from screen edges.
- Multi-button modals follow order: Primary right, Secondary middle, Ghost left (LTR). For RTL, order mirrored.

## Iconography
- Icons sized 20px within buttons except FAB (28px). Use Outline 2.0 set with consistent stroke 1.5px.
- Buttons with icons maintain 12px spacing between icon and text.

## Animation & Feedback
- Button press uses scale animation 96% over 120ms ease-out, returning to 100% on release.
- Loading state replaces text with spinner (20px) and optional text “Loading…”. Buttons maintain width to prevent layout shift.
- Success actions trigger confetti Lottie overlay for approvals and subtle highlight (background `harbour-100`) for saved states.

## Accessibility
- Minimum touch target 48×48px; add invisible padding where button is visually smaller (icon buttons).
- Provide aria-labels for icon-only buttons (“Refresh widget”, “Open assistant”).
- Ensure focus order logical; high contrast mode increases border thickness to 3px using `aurora-200`.

## Theming Considerations
- Dark mode primary buttons use gradient `aurora-400` → `aurora-600` with text `granite-0` and same interaction states adjusted for contrast.
- Provide CSS and React Native tokens: `btn-primary-bg`, `btn-primary-text`, etc. Documented in tokens JSON.
- Print/export versions convert buttons to outlines for clarity.

## Implementation Checklist
- Validate with Storybook components `ButtonPrimary`, `ButtonSecondary`, `IconButton`, `FloatingButton`.
- Provide design QA checklist verifying padding, font (Inter 16/24 bold for primary, 16/24 medium for secondary).
- Ensure disabled state prevents pointer events, uses `cursor: not-allowed` on web.
