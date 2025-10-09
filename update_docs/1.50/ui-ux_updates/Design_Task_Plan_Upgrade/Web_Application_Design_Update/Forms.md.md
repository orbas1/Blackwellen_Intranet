# Form Design Specification

## Layout
- Forms align to 8-column grid (max width 720px). Multi-column forms use 2 columns at ≥1280px with 24px gutter.
- Section headers 24px spacing above, 16px below.
- Group related fields using fieldsets with 1px border #CBD5E1 and 16px radius.

## Input Fields
| Field Type | Height | Padding | Notes |
|------------|--------|---------|-------|
| Text Input | 48px | 12px 16px | Placeholder #94A3B8, label 14px/500. |
| Textarea | Auto, min 120px | 12px 16px | Expand icon bottom-right. |
| Select | 48px | 12px 16px | Chevron icon 16px, dropdown list max height 320px. |
| Checkbox | 20px square | 12px gap | Checked fill #1F8A70, 2px border radius. |
| Radio | 20px circle | 12px gap | Selected inner dot 8px. |
| Toggle | 44x24 | 4px padding | Active background #27A985, knob 16px. |

## Labels & Helper Text
- Labels top-aligned, 12px spacing to input.
- Helper text 12px/400 #64748B placed beneath with 8px spacing.
- Required indicator red asterisk (#C53030) appended to label.

## Error States
- Border color #C53030, background #FDE8E8 (12% opacity).
- Error icon `WarningCircle` 16px inline with message.

## Success States
- Border #27A985, background #E1F7F1, success message optional.

## Stepper Flow
- Progress indicator across top with numbered circles (32px). Completed steps filled #1F8A70, current step #D07A2D border 2px.
- CTA area includes "Save Draft" ghost button + primary continue.

## File Upload
- Dropzone 320px height, dashed border #27A98566, center icon 48px.
- On upload, display file chips (height 36px) with remove icon.

## Accessibility
- Ensure `aria-describedby` binds errors to inputs.
- Keyboard nav: highlight on focus, `Enter` triggers default button, `Shift+Enter` moves to previous step where relevant.

