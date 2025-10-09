# Component Types (v1.50)

| Component | Variants | States | Description |
|-----------|----------|--------|-------------|
| Navigation Bar | Default, Scrolled, Compact | Idle, Hover, Active, Sticky | 72px tall desktop with gradient underline, compresses to 56px on scroll. Contains logo (48x48), menu items, search field, profile menu. |
| Sidebar | Expanded, Collapsed, Overlay | Default, Hover, Selected | 264px width expanded; 88px collapsed icon rail; overlay slides in from left on mobile with 16px overlay shadow (#00000022). |
| Cards | Summary, Detail, Metric, Activity | Default, Hover (elevated), Selected (accent border), Disabled (40% opacity) | 16px radius, 24px padding, 1px border (#E2E8F0). Metric cards include 64px stat icon. |
| Tables | Standard, Compact, Embedded | Default, Hover row, Selected, Loading skeleton | 64px header height, 52px row height. Responsive stacking at <768px converts to card layout. |
| Forms | Inline, Modal, Stepper | Idle, Focus, Error, Success, Disabled | Use 12px vertical rhythm; inputs 44px tall desktop, 40px mobile. Stepper includes progress indicator. |
| Buttons | Primary, Secondary, Tertiary, Destructive, Ghost | Default, Hover, Pressed, Focus, Loading, Disabled | 48px height (desktop), 44px mobile. Primary uses gradient fill (#1F8A70 → #27A985). |
| Modals | Dialog, Full-screen, Drawer | Default, Loading, Success, Error | Dialog width 560px, radius 20px, overlay blur 12px; Drawer slides from right 420px wide. |
| Notifications | Toast, Banner, Inline | Info, Success, Warning, Error | Toast 320px width, anchored bottom-right desktop, full width mobile. |
| Charts | Line, Bar, Donut, Heatmap | Default, Hover point, Selected range | Use `recharts@2.8` with custom theme; color palette defined in `colours.md`. |
| Widgets | KPI Capsule, Activity Timeline, Task Kanban, Resource List | Idle, Hover, Dragging (Kanban) | Each defined with dimension spec in `Screens_Updates_widget_functions.md`. |
| Loaders | Skeleton, Spinner, Progress Bar | Idle, Indeterminate | Skeleton uses 8px radius shimmer animation 1.2s. |
| Avatars | Circle, Square (Providers) | Default, Status (online/offline), Placeholder | 40px default, 56px large; placeholders use gradient background (#112B4C → #1F8A70). |

