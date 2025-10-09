# SCSS Structure

## Directory Layout
```
/styles
  /tokens
    _colors.scss
    _typography.scss
    _spacing.scss
  /mixins
    _media.scss
    _elevation.scss
    _focus.scss
  /components
    _buttons.scss
    _cards.scss
    _forms.scss
  main.scss
```

## Tokens
- `_colors.scss`: export maps `$colors: ('base-navy': #0B1D3A, 'emerald': #1F8A70, ...);`
- `_spacing.scss`: `$space-4: 0.25rem; $space-8: 0.5rem;` up to $space-64.

## Mixins
- `@mixin respond($breakpoint)` using map of widths (xl: 1440px, lg:1280px, md:1024px, sm:768px, xs:480px).
- `@mixin elevation($level)` returns box-shadow tokens from map.
- `@mixin focus-ring` apply 2px outline + offset and respect `prefers-reduced-motion` for transitions.

## Component Usage
- Buttons: `@include button-base($variant)` referencing color map.
- Cards: use `@include elevation(1)` default; on hover `@include elevation(2)`.
- Forms: share label mixin `@include label-style;` ensuring consistent font.

## Theming
- Provide `.theme-high-contrast` override partial to adjust color map for compliance.
- Future dark theme partial prepared but toggled off by default.

