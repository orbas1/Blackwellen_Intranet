# Administration Layout & Element Positioning

## Global Header (`AD-NAV-001`)
- Logo left (max width 160px), nav center (items spaced 32px), utilities right (search `AD-NAV-003`, notifications, avatar `AD-AVT-004`).
- Height 72px; sticky with shadow `0 6px 24px rgba(9,16,28,0.08)` after scroll 16px.
- Includes breadcrumb trail `AD-SEC-003` under nav on admin pages, 48px height, background `#F3F6FA`.

## Sidebar (`AD-SEC-002`)
- Width 280px desktop, collapses to 92px icon rail.
- Sections: Governance, Users, Roles, Audit. Each section header 14px uppercase, letter spacing 2%.
- Active item uses background `rgba(31,138,112,0.16)` with left indicator bar 4px `#1F8A70` and icon tinted `#1F8A70`.
- Bottom dock houses "Invite Admin" button `AD-BTN-002` (48px tall) and storage usage meter `AD-WID-014` (8px progress bar).

## Content Area Grid
- Uses 12-column system (80px columns, 24px gutters).
- **User Directory Table (`AD-TBL-005`)**: Spans columns 1-12, 560px height. Table header sticky, 56px row height, zebra stripes (#FFFFFF/#F7F9FC). Includes selection checkboxes left 48px column, action buttons right (Deactivate, Reset Password).
- **Role Matrix Cards (`AD-CARD-007a-f`)**: After table, grid of 3 columns × 2 rows, each 344x260px. Contains title, description, permission chips (Wrap). Footer houses toggle `AD-TGL-007x` to enable/disable role.
- **Audit Timeline Drawer (`AD-WID-010`)**: Right-side drawer overlay width 420px triggered from table row click. Contains timeline steps (timestamp, actor, event). Background #FFFFFF with drop shadow `0 24px 48px rgba(11,29,58,0.28)`.

## Modal & Drawer Placement
- `AD-MOD-011` (Create Role) centers on screen 720x540, uses 3-step progress indicator along top (Steps: Details, Permissions, Review). Buttons primary/secondary align right with 16px gap.
- `AD-DRW-012` (Bulk Upload) slides from bottom, width 100%, height 520px, contains drag-and-drop zone (dashed border #1F8A70).

## Imagery & Resource Usage
- User avatars from `/assets/media/admins/*.jpg`, displayed 40px circle inside table.
- Role cards use abstract iconography from `blackwellen/illustrations/role-icons/*.svg` sized 48px.
- Empty state illustration `admin-empty.svg` shown when no users, 320x240 centered.

## Responsive Adjustments
- **LG (1280–1439px)**: Sidebar compresses to 220px; table maintains columns, but actions collapse to kebab menu `AD-ICO-005k`.
- **MD (1024–1279px)**: Role cards become 2 columns; audit drawer overlay covers 75% width.
- **SM (768–1023px)**: Content converts to stacked sections; table uses responsive cards (each row becomes card with key data). Sidebar overlays full height on toggle.
- **XS (≤767px)**: Admin experiences route to simplified list-first view; actions accessible via bottom sheet `AD-SHEET-016` 88px tall.

## Interaction Notes
- Hover on table rows changes background to `#EEF3F9`; selected rows show 2px border `#1F8A70`.
- Permission chips use `phosphor-react` check icons; toggling permission animates via `framer-motion` scale effect.
- Search field provides typeahead results (list of names + roles) using `@algolia/autocomplete` integration.
