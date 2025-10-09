# Screens Widget Types – Version 1.50

## Widget Catalogue Overview
The adaptive widget library supports both user and provider applications, ensuring consistent design tokens, spacing, and behaviours across screens documented in `Screens_Update.md`.

## Widget Categories
| Category | Widget Name | Description | Dimensions & Layout | Asset Dependencies |
| --- | --- | --- | --- | --- |
| Productivity | Personal Task Stack | Displays assigned tasks with priority chips and due dates. | Mobile: 320×320px default, adjustable to 320×220px (compact). 20px padding, 16px gap between rows. | Icons from `/design-system/icons/outline2/task.svg`; background pattern optional from `/design-system/textures/subtle-grid.png`. |
| Productivity | Quick Launch Actions | Horizontal pill set enabling creation shortcuts. | Height 80px, pill width 120–160px, 16px spacing. | Uses gradient overlay `aurora-500` → `aurora-300`. |
| Intelligence | AI Insights | AI-generated recommendations with supporting metrics. | Card height 280px, includes chart micro-visual (sparkline 240×80px). | Lottie animation `/motion/v1.50/widgets/insight_pulse.json`. |
| Recognition | Celebration Feed | Social recognition stream with avatars and emoji reactions. | Card height 360px, 3 items visible, 16px vertical spacing. | Avatar assets 48px from `/design-system/avatars/v1.50/`. |
| Compliance | Alert Summary | Highlights policy changes, audits, compliance risk. | Card height 260px, includes banner stripe 8px top using `catalyst-500`. | Warning icon `/design-system/icons/outline2/shield-alert.svg`. |
| Analytics | KPI Tile | Core metric display with delta, mini chart. | Width flexible (min 280px). Metric text 48/56 bold, delta 16/24. | Chart library component `ChartMiniLine` referencing analytics palette. |
| Analytics | Alert Feed | List of triggered alerts with severity. | Height 320px, scrollable, item row 64px. | Real-time data via WebSocket channel `analytics-alerts`. |
| Knowledge | Spotlight | Featured knowledge article with cover image and summary. | Card height 300px, image 320×180px with 8px radius. | Image pulled from `/content/knowledge/covers/`. |
| Collaboration | Team Availability | Visual calendar of teammate status. | Height 280px, grid 7 columns × 2 rows. | Uses `granite-200` background stripes, icons 20px. |
| Operations | Route Card | Provider-focused route summary with map thumbnail. | Width 360px, map preview 320×160px, badges row 40px. | Map tile from Mapbox (enterprise style `blackwellen-field`). |
| Operations | Compliance Checklist | Step tracker for field audits. | Height 280px, list items 56px. | Check icons `harbour-500`, due date label `catalyst-500`. |
| Inventory | Stock Gauge | Displays stock levels with donut chart. | Diameter 160px, legend right-aligned. | Donut chart component `ChartDonut` referencing inventory palette. |
| Support | Ticket Queue | Support escalations summarised in table format. | Table rows 56px, columns: Ticket ID, Priority, Age. | Data from `/api/v3/support/tickets`. |
| Utility | Weather & Travel Advisory | Field operations weather data. | Card 260px height, icon 72px, text 16/24. | Weather API integration (Dark Sky enterprise). |

## Interaction Patterns
- Widgets support collapse/expand with animation 200ms ease-in-out. Collapsed state retains header (56px height) and summary metric.
- Each widget includes overflow menu (kebab icon 24px) with options: Configure, Pin/Unpin, Remove, View Details.
- Refresh icon 20px appears on hover (web) or within header actions (mobile) and triggers data refresh with spinner overlay.

## State Guidelines
- **Loading**: Skeleton placeholder matching widget layout (rounded 12px corners).
- **Empty**: Illustration tile referencing `/design-system/illustrations/empty_state.svg`, supporting text 16/24, CTA secondary button 48px height.
- **Error**: Background tinted `catalyst-50`, inline message with icon 24px and “Retry” tertiary button.
- **Offline**: Grey overlay (rgba(15,18,22,0.35)) with badge “Offline cached data” positioned top-right.

## Configuration & Personalisation
- Widgets store settings in `/api/v3/widgets/{id}/preferences` including density, filters, timeframe.
- Drag handles use 24px icon with 8px margin from card edge. Haptics triggered on mobile when reorder starts.
- Multi-column dashboards maintain 16px gap between widgets; sticky guidelines ensure alignment to 8px grid at all breakpoints.

## Accessibility Notes
- All charts include accessible data table view triggered via header action.
- Colour-coded statuses pair with icons to maintain legibility for colour-blind users.
- Minimum font size 14px for supporting text; body copy uses 16/24.

## Maintenance
- Widget component library versioned `v1.50`. Breaking changes require update to `design_change_log.md` and communication to engineering.
- Document owner: Design Systems PM. Review cadence: monthly plus release-specific audit.
