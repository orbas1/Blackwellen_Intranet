# Typography System

## Font Families
- **Primary:** "Satoshi" (Geometric sans-serif) — weights 300, 400, 500, 700. Hosted internally `/assets/fonts/satoshi-*.woff2`.
- **Secondary Accent:** "Lora" (Serif) weight 500 used for quotes/testimonials.
- **Monospace Utility:** "JetBrains Mono" weight 400 for code snippets in admin logs.

## Type Scale (Desktop)
| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display XL | 40px | 700 | 48px | Hero headline |
| Display L | 32px | 600 | 40px | Section headers |
| Heading M | 24px | 600 | 32px | Card titles |
| Heading S | 20px | 600 | 28px | Widget headings |
| Body L | 18px | 400 | 28px | Intro paragraphs |
| Body M | 16px | 400 | 24px | Standard copy |
| Body S | 14px | 400 | 20px | Secondary text |
| Caption | 12px | 500 | 18px | Labels, metadata |
| Button | 16px | 600 | 20px | Primary/secondary buttons |

## Responsive Adjustments
- Tablet: reduce Display XL to 34px, Body L to 17px.
- Mobile: Display XL 28px, Body M 15px, maintain 1.5 line height minimum.

## Typographic Treatments
- All caps only for micro-labels (tracking 0.16em).
- Use 4px baseline grid to align multi-line headings with imagery.
- Provide `font-display: swap` for performance.

