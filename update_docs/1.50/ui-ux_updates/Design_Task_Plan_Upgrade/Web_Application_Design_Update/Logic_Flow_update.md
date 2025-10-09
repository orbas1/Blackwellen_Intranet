# Logic Flow Update — Web Application v1.50

## Overview
- Consolidate navigation flows for provider and user dashboards into unified shell.
- Introduce quick actions accessible from global nav (Create Ticket, Add Provider, Upload Resource).
- Implement contextual breadcrumbs that reflect up to 3 levels deep.

## Step-by-Step Flow (Dashboard)
1. **User logs in** → redirected to Dashboard Overview.
2. **System checks** role; loads personalized widgets from config service.
3. **User selects filter** (e.g., Region). Trigger asynchronous request; loading skeleton displayed within affected widgets.
4. **User clicks metric card** → route `/providers?status=pending`.
5. Table loads with filter chips representing previous context; breadcrumb `Dashboard > Providers > Pending`.
6. **User selects multiple rows** → Bulk action bar slides in from bottom.
7. On action completion, toast shows success; metrics refresh via WebSocket push.

## Settings Flow
1. Avatar click opens menu; `Settings` opens right drawer.
2. Drawer defaults to Profile tab; `Edit` toggles inline form state.
3. `Save` triggers validation; success closes edit mode but keeps drawer open.
4. `Security` tab requires re-auth via modal if session older than 15 min.

## Error Recovery
- API failure surfaces inline alert within card + toast.
- Provide "Reload" button to re-fetch.

