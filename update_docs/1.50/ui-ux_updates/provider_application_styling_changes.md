# Provider Application Styling Changes – Version 1.50

## Visual Direction
- Utilises Aurora design tokens with emphasis on high-contrast readability in outdoor conditions.
- Increased font sizes for key metrics (title 22/30, body 16/24, metadata 14/20).
- Enhanced iconography using filled severity icons for urgent tasks.

## Colour Palette Usage
- Primary actions `aurora-500`. Secondary supportive `harbour-500`. Critical warnings `catalyst-500`.
- Background default `granite-50`, cards `granite-0`. Map overlays use translucent gradients to maintain legibility.
- Offline state banner `skylight-500` text white to differentiate from error.

## Components
- **Cards**: Elevated to E3 for queue visibility outdoors. Header includes priority pill (12px radius) and SLA countdown badge.
- **Buttons**: Primary 56px height, gradient `aurora-500`→`aurora-300`. Icon-only actions 48×48px.
- **Badges**: Status pill backgrounds `harbour-100` (on track), `catalyst-100` (at risk), `granite-200` (waiting). Text uppercase 12/18.
- **Map Pins**: 32px height with drop shadow; border 2px to maintain contrast.

## Typography
- Inter 600 for headers, 500 for body. All-caps limited to badges and small labels.
- Provide 120% text scaling by default vs user app to improve readability in field environments.

## Motion
- Checklist completion animates check icon with 200ms scale-up + fade.
- Map mode transitions fade/scale (duration 300ms). Provide reduce motion alternative (instant switch) when accessibility preference enabled.

## Dark Mode
- Uses `granite-900` backgrounds, `granite-0` text, `aurora-300` accents. Map overlays lighten to maintain readability.
- Buttons adopt `aurora-400` → `aurora-600` gradient.

## Iconography
- Outline 2.0 icons with 2px stroke to maintain clarity outdoors. Provide filled variant for urgent actions.
- Photo capture overlay uses camera icon 32px, tinted `granite-0`.

## Feedback & Alerts
- Success toast `harbour-500` background, text white. Error toast `catalyst-500`.
- Offline indicator uses animated dot (pulse 2s) to draw attention without distracting.

## QA & Handoff
- Provide redlines for queue card (padding, metrics) and map overlay (pin size, label). Stored `/handoff/provider/v1.50/`.
- Storybook references: `ProviderQueueCard`, `ProviderChecklistStep`, `ProviderMapOverlay` updated.
- Accessibility audit scheduled Week 7 to test outdoor readability and contrast under sunlight simulation.
