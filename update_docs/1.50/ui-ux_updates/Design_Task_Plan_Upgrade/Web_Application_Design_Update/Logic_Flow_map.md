# Logic Flow Map — Textual Diagram

```
[Login]
  ↓
[Role Evaluation]
  ↓
[Dashboard Shell]
  ├─> [Global Alerts Banner]
  ├─> [Widget Loader]
  │      ├─> [Metric Cards]
  │      ├─> [Compliance Timeline]
  │      └─> [Task Kanban]
  ├─> [Quick Actions Menu]
  │      ├─> Create Ticket → [Ticket Modal]
  │      ├─> Add Provider → [Stepper Form]
  │      └─> Upload Resource → [Upload Modal]
  ├─> [Navigation Router]
  │      ├─> Providers List → [Table + Filters]
  │      │          └─> [Provider Detail Drawer]
  │      ├─> Resources → [Document Grid]
  │      ├─> Analytics → [Charts]
  │      └─> Settings → [Drawer Tabs]
  └─> [Notifications Stream]
           ├─> Toasts
           └─> Activity Feed
```

