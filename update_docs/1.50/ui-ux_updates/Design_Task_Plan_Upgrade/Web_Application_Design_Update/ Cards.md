# Card Component Specifications

## Structure
- Outer dimensions: flexible width based on grid column; default 304px width, min 264px, max 400px.
- Padding: 24px top/bottom, 24px sides.
- Layout: Title row (Heading S) + optional action icon; body content with 16px vertical spacing.

## Variants
1. **Metric Card**
   - Top-left icon container 56x56, background #E1F7F1, icon #1F8A70.
   - Value text 32px/600, delta chip 20px height with arrow icon.
2. **Detail Card**
   - Dividers 1px #E2E8F0 between sections.
   - Buttons anchored bottom with 16px spacing.
3. **List Card**
   - Contains up to 6 list items, each 48px height with avatar (32px) + text.
4. **Action Card**
   - Gradient background (#112B4C → #1F8A70), white text, CTA button ghost style.

## States
- Hover: elevate to `0 12px 24px rgba(11,29,58,0.14)` and translateY(-2px).
- Selected: 2px border #27A985, subtle glow `0 0 0 4px rgba(39,169,133,0.16)`.
- Disabled: apply grayscale filter 40%, lock interactions.

## Content Guidelines
- Titles max 40 characters; wrap to two lines; text should be descriptive (e.g., "Pending Credential Reviews").
- Use icons from Phosphor set sized 24px.
- Provide `aria-labelledby` to tie card to headings for screen readers.

