# User Application Styling Changes – Version 1.50

## Overview
Mobile styling updates align the native experience with the refreshed design system introduced for Version 1.50. Changes cover colour tokens, typography, component theming, motion guidance, accessibility accommodations, platform conventions, and developer implementation checkpoints. Styling documentation now includes redlines, Figma component references, and Storybook parity requirements.

## Colour & Theme Tokens
- **Primary (Aurora 500)** `#3A5BE0`: Applied to primary buttons, active navigation tabs, major icons, and focus outlines.
- **Secondary (Harbour 500)** `#1F8A70`: Used for secondary actions, informational badges, tab backgrounds, and analytics legends.
- **Status Palette**:
  - Success `#2BA673`, Warning `#F9A13A`, Error `#E84E4E`, Info `#5090F0`, Neutral `#9AA3B5`.
  - Each includes lighter (100) and darker (700) shades for backgrounds, borders, and pressed states.
- **Neutral Palette**: Granite ramp (N0 `#FFFFFF` → N950 `#0B0E15`) ensures high contrast. Backgrounds use N050, cards N100 with E2 elevation shadow, surfaces-lowered N075, surfaces-raised N150.
- **Gradients**: Profile headers and recognition highlights use `linear-gradient(135deg, #3A5BE0 0%, #7F56D9 100%)`; analytics alert banners use `linear-gradient(135deg, #1F8A70 0%, #2BA673 100%)`.
- **Dark Mode Prep**: Tokens stored in theming layer to allow future inversion. Dark equivalents documented (Aurora 400, Harbour 400, Granite N950 backgrounds). Not shipped yet but theming infrastructure validated in prototypes.

## Typography
- **Primary Typeface**: Inter with dynamic type support (Text Styles mapped to iOS Dynamic Type and Android SP scaling). Secondary Source Serif for long-form knowledge articles and AI summaries.
- **Font Scale**: Display 32/38, Headline 28/34, Title 24/32, Section 22/30, Subtitle 18/26, Body 16/24, Caption 14/20, Micro 12/18.
- **Weight Usage**: 700 for hero headings, 600 for section headers, 500 for actionable labels/buttons, 400 for body text. Numbers in analytics cards use tabular lining figures for alignment.
- **Accessibility**: Minimum body copy 16sp; system respects OS text scaling up to 200% without clipping thanks to auto-layout adjustments and vertical stack expansions.
- **Fallbacks**: Android uses Roboto fallback; iOS uses San Francisco fallback. Right-to-left scripts utilise Geeza Pro (iOS) and Noto Naskh (Android).

## Component & Pattern Styling
- **App Bar**: Solid N000 background with subtle shadow E1. Icons 24px, labels Title style. Optional gradient overlay on scroll collapse with blur effect. Status indicator icons tinted using status palette.
- **Bottom Navigation**: 5-item bar with pill highlight under active icon (8px height), 12px labels. Safe-area padding enforced. Vibration feedback on tap. Badges use Harbour 300 background with white text.
- **Drawer & Modal Sheets**: Rounded corners 24px top radius, handle indicator 48x4px N200. Drag thresholds tuned for accessibility.
- **Cards & Widgets**: Rounded corners 16px, internal padding 16px, drop shadow E2 (0,8,16, -6 blur). Analytics cards optionally use compact density (12px padding, 8px corner) when flagged by persona.
- **Buttons**:
  - Primary: Filled Aurora 500, white text, 12px radius, 16px vertical padding. Hover (for stylus) lighten by 10%; pressed darken to Aurora 700.
  - Secondary: Outline Aurora 500, 2px stroke, text Aurora 500, pressed state adds N050 fill.
  - Tertiary: Text-only with underline on focus; pressed adds 0.1 opacity background.
  - Destructive: Error 500 fill with Error 700 pressed. All include spinner overlay and maintain label legibility at 80% opacity.
- **Inputs**: Filled style by default (N050 background, 1px border N200). Focus state border Aurora 500 + glow; error state border Error 500 with inline message and icon. Multi-line fields auto-expand up to 4 lines.
- **Chips & Filters**: Assistive chips for filters (rounded 20px) with selected fill Harbour 500/white text. Suggestion chips for assistant use tonal backgrounds (Aurora 050) and drop shadow E1.
- **Lists & Tables**: Divider spacing 8px, uses ripple effect on Android (primary tint with 12% opacity) and highlight on iOS (N050 overlay). Sticky headers adopt N075 background and 1px border bottom.
- **Charts**: Palette adheres to accessible combinations: blue `#3A5BE0`, teal `#1F8A70`, purple `#7F56D9`, amber `#F9A13A`, coral `#FF6B6B`, slate `#5E6675`. Line thickness 2px; markers 6px with white stroke. Tooltips use N900 background, white text, 12px radius.
- **Shimmers & Skeletons**: Gradient animation N050 → N100 → N050 with 1.2s loop; cards include placeholder icon blocks.

## Motion & Interaction
- Entrance transitions: bottom sheet 250ms ease-out, list shimmer 500ms loops, widget reorder animation 200ms spring.
- Micro-interactions: Buttons scale to 0.97 on press, tab transitions use fade + slide (100ms crossfade, 150ms slide). Pull-to-refresh uses bounce overshoot limited to 12px.
- Assistant responses animate card expansion (spring 250ms, damping 28). Carousel transitions adhere to 200ms snap with 40ms overlap.
- Reduced motion preference disables non-essential transitions, substitutes fade, and shortens durations to 100ms.

## Accessibility Enhancements
- Focus indicators: 2px Aurora outline for keyboard focus (accessible via connected keyboard) with 4px radius corners.
- High-contrast mode ensures text/icon colours adjust to meet 7:1 ratios when OS high-contrast enabled; uses alternative palette mapping documented in appendix.
- VoiceOver/TalkBack: Added descriptive hints for assistant suggestions (“Double tap to send prompt to assistant”) and analytics charts (“Double tap and hold to hear data points”).
- Dynamic type accommodations include multi-line truncation behaviour, vertical scroll within cards, and safe overflow areas for long strings.
- All touch targets minimum 44x44px; dense tables include secondary overflow menu for additional actions.

## Platform Specific Notes
- **iOS**: Utilises SF Symbols fallback when Outline 2.0 icon missing. Navigation bar large title variant used on primary screens with background blur. Supports context menus via long-press with haptic feedback.
- **Android**: Material 3 baseline with custom colour scheme. Uses Top App Bar Medium on scrolled content, Motion specs align to Material easing curves, bottom sheet leverages `ShapeAppearanceOverlay` for 24px top radius.
- **Tablet Split View**: Layouts expand to multi-column; typography increases one step for titles. Side panels adopt 320px min width.
- **Foldable Devices**: Adaptive layout uses two-pane design when width >720dp; bottom navigation converts to rail.

## Asset & Icon Specifications
- Icon exports in 1x, 2x, 3x PNG + SVG (for vector). Provide tinted and monochrome variants. Notification icons follow Android adaptive icon guidelines with 72x72 keyline.
- Lottie animations packaged for success, warning, and empty states. Colour tokens parameterised for theme swapping.

## Implementation Guidance
- Update theming files (`Theme.kt` / `Theme.swift`) with new token definitions and maintain parity with shared JSON design token pipeline.
- Ensure component variants documented in Storybook/Compose Preview for QA sign-off; include examples for enabled, disabled, loading, error, and focus states.
- Extend automated visual regression tests for top 15 screens under new styling to maintain consistency across devices and OS versions.
- Include snapshot tests for dynamic type sizes and dark mode preview to catch clipping early.
- Collaborate with accessibility QA to validate screen reader order, label accuracy, and focus retention across modals.

## Open Issues & Follow-Up
- Pending confirmation on animation curves for assistant suggestions when reduced motion enabled.
- Need to finalise dark mode palette token mapping before enabling toggle in 1.51.
- Evaluate performance impact of gradient-heavy components on older Android devices; consider fallback to solid fills if necessary.
- Awaiting localisation QA for RTL adjustments on analytics legends and filter chips.
