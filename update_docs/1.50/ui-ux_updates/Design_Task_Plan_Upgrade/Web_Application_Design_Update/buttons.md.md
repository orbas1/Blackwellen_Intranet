# Button Styles & Behaviors

## Sizes
- **Large (Hero/Forms):** Height 56px, padding 0 32px, font 16px/600. Used in hero, modal primary.
- **Medium (Default):** Height 48px, padding 0 24px, font 16px/600.
- **Small:** Height 40px, padding 0 20px, font 14px/600 for secondary actions.

## Variants
1. **Primary Solid**
   - Background gradient `#1F8A70 → #27A985`.
   - Text #FFFFFF, icon optional 20px with 12px spacing.
   - Hover: lighten gradient by 8%, add shadow `0 8px 16px rgba(31,138,112,0.2)`.
2. **Secondary Outline**
   - Border 2px #1F8A70, background transparent, text #1F8A70.
   - Hover: background #E1F7F1, maintain border.
3. **Tertiary Ghost**
   - No border, text #112B4C.
   - Hover: background #F1F4F9.
4. **Destructive**
   - Background #C53030, text #FFFFFF.
   - Hover: #E25555, focus ring #F6B73C for visibility.
5. **Icon Button**
   - 44x44 circle, icon 20px center. Use for toolbar/quick actions.

## States
- **Disabled:** reduce opacity to 40%, disable pointer events, maintain accessible contrast (text #FFFFFF at 40% still 4.6:1 on gradient).
- **Loading:** overlay spinner (stroke #FFFFFF) inside; keep width.
- **Focus:** 2px outline #53C198 with 4px offset shadow.
- **Pressed:** translateY 1px, reduce shadow intensity.

## Grouping & Placement
- Primary action right aligned, secondary to left with 12px gap.
- On mobile, stack vertically with 12px spacing; sticky bottom bar for long forms.

