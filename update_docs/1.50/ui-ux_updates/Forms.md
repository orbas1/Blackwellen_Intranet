# Form Design Specification – Version 1.50

## Components
- **Text Input**: Height 56px, border radius 12px, border `granite-200`. Focus border `aurora-400`, box shadow 0 0 0 4px rgba(45,91,227,0.12). Label 14/20, helper text 12/18.
- **Text Area**: Resizable vertical, min height 120px. Character counter bottom-right 12/18 grey.
- **Dropdown**: Trigger height 56px, chevron 20px. Menu radius 12px, shadow E3. Supports search with 16px top/bottom padding inside menu.
- **Date Picker**: Calendar grid 7×6 cells, cell size 44px, selected background `aurora-500`, text `granite-0`. Range selection uses gradient overlay.
- **Stepper**: Number input with +/- buttons 44px square.
- **Toggle**: Track 44×24px, thumb 20px. On `aurora-500`, off `granite-300`.
- **Radio/Checkbox**: 24px, label 16/24. Checkbox uses 2px border `granite-400`, check `aurora-500`.
- **File Upload**: Dropzone 100% width, 160px height, dashed border `aurora-300`. File pill 40px height with icon 20px.

## Layout Guidelines
- Two-column layout from 600px width (field width 50%). Align validation messages below field full width.
- Group related fields with section headers (20/28) and divider `granite-100` 1px.
- Inline helper text 8px below input; for longer guidance use info tooltip icon 20px.

## Validation Patterns
- On blur validation for required fields. Error state: border `catalyst-500`, helper text `catalyst-600`. Provide icon 20px left of message.
- Success state optional; when used, border `harbour-500`, check icon 20px.
- Global form-level error summary at top listing issues with anchor links.

## Interactions
- Keyboard navigation order top-to-bottom, left-to-right. On desktop, pressing Enter submits when focus in final field.
- Loading state disables inputs, shows spinner overlay on submit button.
- Autosave forms display “Saved {{timestamp}}” inline; uses debounce 2s.

## Accessibility
- All inputs labelled using `aria-labelledby`. Error messages associated via `aria-describedby`.
- Minimum target 44px height ensures touch compliance.
- Provide keyboard shortcuts for toggles (Space) and dropdown (Arrow keys, Enter to select).

## Special Flows
- **Service Intake**: Multi-step with persistent summary column. Step progression prevents navigation until required fields valid.
- **Incident Report**: Photo capture integrated; ensures metadata (location, timestamp) auto-filled but editable.
- **Provider Checklist**: Form fields appear sequentially; next field unlocks after previous completion.

## Implementation Notes
- React Native uses `react-hook-form` with custom components; web uses same schema definitions.
- Provide JSON schema examples in `/design-system/forms/v1.50/`. Each includes validation rules and error copy keys referencing `Screen_text.md`.
- Input masking for phone numbers and currency; fallback to manual entry when locale unsupported.
