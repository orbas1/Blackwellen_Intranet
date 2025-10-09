# Dashboard Layout Organization

## Grid Allocation
- Row 1: Greeting + filters (span 12) with background #FFFFFF and 16px shadow separation.
- Row 2: Metric cards (span 3 each). On tablets, row wraps to two columns.
- Row 3: Compliance timeline (span 7) + Alerts card (span 5).
- Row 4: Task Kanban (span 8) + Activity feed (span 4).
- Row 5: Analytics preview chart (span 12) with toggles for deeper insights.

## Sidebar Behavior
- Optional right sidebar (span 3) for notifications on wide screens; collapses for <1440px.
- Contains quick action buttons stacked vertical with 16px spacing.

## Mobile Adaptation
- Convert grid to vertical stack with order: Greeting, Metrics (horizontal scroll), Alerts, Compliance, Tasks, Activity.
- Provide sticky quick action bar at bottom with icons (Add Provider, Create Ticket).

