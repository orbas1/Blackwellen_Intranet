# Styling System Specification

## Spacing & Layout
- Base unit: 8px; micro-spacing permitted at 4px increments for icons.
- Section padding: desktop 64px top/bottom, tablet 48px, mobile 32px.
- Card internal padding: 24px horizontal, 20px vertical; list items 16px vertical.

## Border Radius
- Large surfaces (cards, modals): 16px radius.
- Buttons: 12px; pills/labels: 999px fully rounded.
- Input fields: 10px with inset shadow (0 1px 0 #FFFFFF99) for depth.

## Shadows
- Elevation 1 (cards default): `0 4px 12px rgba(11,29,58,0.08)`.
- Elevation 2 (hover): `0 12px 24px rgba(11,29,58,0.14)`.
- Modal overlay: `0 24px 48px rgba(9,16,30,0.3)` plus backdrop blur 12px.

## Gradients
- Primary gradient: `linear-gradient(135deg, #1F8A70 0%, #27A985 45%, #53C198 100%)`.
- Hero overlay gradient: `linear-gradient(180deg, rgba(11,29,58,0) 0%, rgba(11,29,58,0.72) 100%)` layered over hero images.
- Accent gradient for KPIs: `linear-gradient(140deg, #D07A2D 0%, #F0A44A 60%, #FFD8A1 100%)`.

## Glassmorphism Panels
- Background: rgba(17,43,76,0.55)
- Border: 1px solid rgba(255,255,255,0.28)
- Blur: 18px using CSS `backdrop-filter`.

## Motion Guidelines
- Standard transition: 200ms ease-out for hover/focus.
- Entrance animations: fade+slide 300ms with 40px upward offset.
- Loading skeleton shimmer: 1200ms linear infinite.

## Accessibility Styling
- Focus outlines 2px accent (#27A985) outside element.
- Error states use #C53030 background at 8% opacity with text #8F1F1F.
- Disabled elements 40% opacity but maintain contrast by using lighten (#CBD5E1) backgrounds.

