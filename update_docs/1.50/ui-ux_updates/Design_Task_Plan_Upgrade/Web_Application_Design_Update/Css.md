# CSS Implementation Guidelines

## Architecture
- Adopt BEM-inspired class naming: `.c-card`, `.c-card--metric`, `.c-button--primary`.
- Use CSS custom properties for color, spacing, typography defined under `:root` and theme classes `.theme-default`, `.theme-high-contrast`.
- Limit global styles to resets, typography base, layout containers.

## Layout Utilities
- `.layout-grid` for 12-column using CSS Grid `repeat(12, minmax(0, 1fr))` with `gap: 24px`.
- `.flex-center`, `.flex-between`, `.stack-16` utilities to reduce duplication.

## Responsive Patterns
- Media queries set at `@media (max-width: 1279px)`, `1023px`, `767px`, `479px`.
- Use `clamp()` for fluid typography: e.g., `font-size: clamp(1rem, 1.2vw + 0.8rem, 1.5rem)` for Body L.

## Accessibility Helpers
- `.sr-only` class for accessible text (1px clip).
- `.focus-ring` mixin to ensure visible outlines.

## Animations
- Define keyframes once, reuse via classes: `.fade-in`, `.slide-up-40`, `.shimmer`.
- Respect `prefers-reduced-motion`: disable non-essential animations with `@media (prefers-reduced-motion: reduce)`.

