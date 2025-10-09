# Web Application Styling Changes – Version 1.50

## Overview
The web styling refresh extends the unified design language across dashboards, service workflows, analytics consoles, investment tooling, and administrative modules. Updates include revised design tokens, component elevations, responsive behaviour, accessibility standards, dark mode preparation, and documentation artefacts for engineering alignment.

## Design Tokens
- **Grid & Spacing**: Base unit 8px; container max width 1440px with responsive breakpoints at 1600px, 1440px, 1280px, 1024px, 900px, 768px, and 600px. Spacing scale {4, 8, 12, 16, 20, 24, 32, 40, 48, 64}. Section padding 48px desktop, 32px tablet, 24px mobile.
- **Colour Palette**:
  - Primary Aurora ramp: 100 `#E7ECFF`, 300 `#5A73E5`, 500 `#3A5BE0`, 700 `#2C43B8`, 900 `#1E2C80`.
  - Secondary Harbour ramp: 100 `#D7F2EA`, 300 `#36A58C`, 500 `#1F8A70`, 700 `#136152`, 900 `#0D4239`.
  - Accent Catalyst set for statuses: Success `#2BA673`, Warning `#F9A13A`, Error `#E84E4E`, Info `#5090F0`, Neutral `#9AA3B5`.
  - Neutrals Granite: N000 `#FFFFFF`, N050 `#F7F8FA`, N075 `#F0F2F6`, N100 `#EEF1F5`, N150 `#E4E7ED`, N200 `#D5DAE2`, N400 `#9AA3B5`, N600 `#5E6675`, N800 `#2F3542`, N900 `#1A1F2C`.
- **Typography**: Inter (400/500/600/700) for UI, Source Serif (400/600) for knowledge articles. Rem-based scale: Display 2.75rem, H1 2.25rem, H2 2rem, H3 1.75rem, H4 1.5rem, H5 1.25rem, Body 1rem, Caption 0.875rem, Micro 0.75rem. Line height ratio 1.4.
- **Elevation**: Cards E1 (0 1px 2px rgba(17,24,39,0.08)), hover E2 (0 8px 16px rgba(17,24,39,0.1)), sticky headers E3 (0 12px 20px rgba(17,24,39,0.12)), modals E4 (0 24px 48px rgba(17,24,39,0.16)). Drawer shadows include lateral gradient.
- **Borders & Radius**: Default radius 12px for cards, 8px for buttons, 6px for inputs. Border colour N150 for light mode, N800 for dark mode.
- **Motion Tokens**: Duration scale {100ms, 150ms, 200ms, 250ms, 300ms, 400ms}, easing curves (easeOutQuad, easeInOutCubic, springOut). Documented usage per component.

## Component Styling
- **Header**: Solid N000 background, 1px bottom border N100, drop shadow on scroll (E1). Search bar uses pill shape with inset icon, focus glow Aurora 300. Environment indicator uses pill badge with gradient border.
- **Side Navigation**: Background N000 with subtle gradient; active item uses Aurora 500 left border 4px and N050 background. Collapsed mode displays icons with tooltip. Notification counts appear as pill badges.
- **Widgets & Cards**: Title area includes 16px icon, uppercase label, and action menu. Body copy uses Body style, supporting text N600. Footer houses CTA links; chart cards embed simplified legend with chips and sparkline preview.
- **Tables**: Header background N075, text uppercase 0.75rem. Row hover uses N050 highlight. Zebra striping optional (N000/N050). Sticky column shadows using linear gradient to indicate overflow. Condensed density reduces row height to 40px.
- **Forms**: Inputs adopt filled variant with subtle shadow. Focus state border Aurora 500 + 2px inset highlight. Validation states use icon + message (Success/Warning/Error tokens). Section headers include help icon linking to knowledge article; required fields marked with dot indicator.
- **Buttons**:
  - Primary filled Aurora 500, hover Aurora 600, active Aurora 700; focus ring 2px Aurora 300 + 2px white offset.
  - Secondary outline with 2px stroke; hover adds Aurora 100 background; pressed darkens stroke to Aurora 700.
  - Tertiary text button uses Aurora 500 text + underline on hover. Ghost buttons available for neutral actions with N200 border.
  - Destructive buttons use Error 500 fill, hover Error 600, pressed Error 700.
- **Tabs**: Underline indicator 4px radius, animated using transform + opacity. Overflow handling adds scroll shadows and chevron controls.
- **Modals & Drawers**: Header uses H3, close icon 20px, optional progress bar. Footer sticky with shadow. Background overlay 0.4 alpha, dark mode 0.6.
- **Tooltips & Popovers**: Rounded 8px, background N900, white text, arrow 8px. Delay 300ms. Support keyboard activation.
- **Assistant Sidebar**: Gradient header, chat bubbles with alternating backgrounds, action card styling aligned with cards (E2). Transcript area uses subdued background N075.

## Data Visualisation Styling
- Chart palette optimised for contrast: Blue `#3A5BE0`, Teal `#1F8A70`, Purple `#7F56D9`, Amber `#F9A13A`, Coral `#FF6B6B`, Slate `#5E6675`, Indigo `#4338CA`.
- Gridlines use N100, axis labels N600. Tooltips styled with dark background N900, white text, 12px radius, drop shadow E2. Provide optional percentage vs absolute toggle styling.
- AI Insight cards incorporate gradient accent bar and icon badges with consistent 36px size; actionable buttons align right with tertiary style.
- Heatmaps use diverging palette (Teal → Neutral → Coral) with 12 steps, accessible pattern overlays for colourblind safety.
- KPI tiles include sparkline, delta badge (success/warning/error) with arrow icons and accessible text alt.

## Interaction & Motion
- Hover states emphasise depth via elevation increase + subtle scale (1.02x) for cards and list items. Buttons use fill/outline adjustments with 150ms transitions.
- Transition durations: 200ms for navigation hover, 250ms for drawer slide, 300ms for modal fade, 400ms for complex chart transitions.
- Loading skeletons adopt shimmer gradient (N050 → N100) with 1.2s animation loop; chart skeleton uses layered bars/lines.
- Focus management ensures modals trap focus, drawers restore focus to trigger, and notification drawer supports arrow-key navigation.
- Reduced motion preference disables parallax backgrounds, crossfade transitions replaced with instant updates, and skeleton shimmer slows to 2s.

## Accessibility Improvements
- Ensured all text on coloured backgrounds meets contrast ratios (≥4.5:1). Analytics charts include patterned fills for stacked areas and alternative data table toggle.
- Focus outlines 2px Aurora 500, offset 2px. Skip-to-content link visible on focus with pill styling. Keyboard shortcuts documented within help modal.
- Table row focus states highlight entire row with N100 background and 2px left border; selection states add checkmark icon.
- Forms include ARIA live regions for validation feedback; error summaries appear top-of-form for screen reader prioritisation.
- Added support for high-contrast mode by mapping tokens to WCAG AAA palette; documented fallback icons for monochrome printing.

## Responsive Adjustments
- Tablet: reduces spacing tokens to {4,8,12,16,24}, navigation collapses to icons with optional text tooltips, contextual sidebar becomes bottom drawer.
- Mobile web: Header condenses, side nav becomes hamburger drawer. Cards stack vertically with 16px spacing; tables convert to card list with key-value pairs.
- Multi-column forms convert to single column with stepper repositioned top; sticky actions move to bottom bar.
- Large desktop: introduces wide layout variant with additional whitespace, optional secondary nav rail, and multi-column knowledge listing.

## Dark Mode Preparation
- Draft dark theme palette maps Aurora 300 as primary accent, Granite backgrounds invert to N900/N950, text tokens adjust to maintain contrast.
- Component-specific notes highlight adjustments (reduced shadow, higher border contrast, revised gradient values).
- Provided sample mockups for analytics console, service detail, and assistant sidebar in dark theme for engineering spike.

## Documentation & Implementation Notes
- Update CSS variable map (`:root` tokens) and ensure SCSS mixins reference new palette, motion, and elevation tokens. Provide fallback variables for legacy modules.
- Refresh Storybook documentation for new states and responsive behaviours with interactive controls and accessibility annotations.
- Expand visual regression suite (Percy/Loki) to cover adaptive home, service intake, analytics console, investment dashboard, admin feature flag screens, and assistant sidebar.
- Provide code snippets for token consumption in React (styled-components/Tailwind) and CSS Modules to ensure consistent adoption.
- Document runtime theme registry (`apps/web/src/styles/themes.ts`) and navigation theme switcher interactions so engineering teams implement persisted preferences, high-contrast focus states, and telemetry hooks consistently across shell components.
- Coordinate with frontend devs to apply tokens within component library and deprecate legacy colour classes by Sprint 7.

## Open Issues & Follow-Up
- Validate performance impact of additional shadows and gradients on low-powered devices; adjust tokens if necessary.
- Awaiting decision on dark mode rollout timeline and whether to launch as beta feature in 1.51.
- Need localisation QA on long labels within side navigation and table headers for German/French expansions.
- Explore printing styles update for service requests and compliance exports (monochrome palette, print-safe fonts).
- Confirm asset pipeline for new illustrations supporting “What’s New” panel and empty states.
