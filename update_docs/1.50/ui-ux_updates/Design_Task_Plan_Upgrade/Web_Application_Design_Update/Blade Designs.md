# Blade Template Design Notes

## Layout Blade (`layouts/app.blade.php`)
- Include `<header>` with sticky class, dynamic classes for scrolled state via Alpine.js.
- Slot for breadcrumbs below header, with 64px top padding.
- Include `<aside>` component toggled via `@include('partials.sidebar')` with collapse state stored in session.

## Dashboard Blade (`dashboard/index.blade.php`)
- Compose sections with Blade components: `<x-metric-card>`, `<x-task-board>`, `<x-activity-feed>`.
- Use `@push('scripts')` to inject chart config JSON for `recharts` wrappers.

## Profile Blade (`profile/show.blade.php`)
- Top slot for hero banner, accept `backgroundImage` prop.
- Use `<x-tabs>` component for nav; each tab content in `<x-slot name="tab">`.

## Modal Components
- `<x-modal>` accepts width, `title`, `description`, `footerButtons` arrays to maintain consistent layout.
- Provide `@once` block to include focus-trap script.

## Form Components
- `<x-input>` with `label`, `hint`, `error` slots.
- `<x-form-section>` wraps groups with heading + description.

