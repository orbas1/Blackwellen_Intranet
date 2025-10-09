# Image & Vector Asset Requirements

## Repository Structure
- `/assets/images/web/v1.50/` for raster (JPG, PNG) at 2x resolution.
- `/assets/vectors/web/v1.50/` for SVG illustrations.

## Required Assets
1. Hero illustration `operations-holo.svg` (vector) — layered for animation.
2. Department icons `department-*.svg` (Provider, Compliance, Support, IT).
3. Dashboard placeholders `dashboard-placeholder.png` 1200x720.
4. Testimonials background `emerald-wave.svg`.
5. Footer pattern `footer-wave.svg`.

## Optimization
- Raster images compressed using TinyPNG (target <200KB).
- SVGs optimized with SVGO plugin `--multipass` and include descriptive titles for accessibility.

## Usage Notes
- Provide `srcset` for hero images (1440w, 1920w) to support retina displays.
- Use lazy loading for below-the-fold imagery; placeholders use blurred 20px version.

