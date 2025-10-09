# Settings Dashboard Overview

## Layout Blueprint
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ST-NAV-001 shared nav                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ Sidebar ST-SEC-001 (filters, profile switcher) | Content 8-col grid          │
│                                              │ ┌───────┬───────┬───────┐     │
│                                              │ │Card a │Card b │Card c │     │
│                                              │ └───────┴───────┴───────┘     │
│                                              │ Notification + Security rows  │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Component Coding & Specs

| Code | Placement | Dimensions | Styling | Behavior & Content |
|------|-----------|------------|---------|--------------------|
| `ST-SEC-001` | Left sidebar, width 256px | Full height, padding 32px | Background `#0F223F`, text `rgba(255,255,255,0.78)`, divider lines `rgba(255,255,255,0.12)` | Contains profile switcher (avatar 48px), environment toggle (Prod/Sandbox), and link list (Profile, Notifications, Security, Integrations, Billing). |
| `ST-CARD-002a` (Profile Health) | Columns 1-4, height 200px | Card radius 24px, background #FFFFFF, top border 3px `#1F8A70`, inner padding 24px | Displays completion ring (64px) using `recharts` radial bar, copy: "Profile 88% complete" + CTA to `Edit`. |
| `ST-CARD-002b` (Notifications) | Columns 5-8, height 200px | Soft gradient (#102A43→#1F8A70), white text | Shows summary of channels active, includes toggle `ST-TGL-005` for weekly digest. |
| `ST-CARD-002c` (Security) | Columns 9-12, height 200px | Dark background #071223, copper accent icons 32px | Contains checklist counts (2/3 complete), CTA `Enable 2FA`. |
| `ST-SEC-002` Notifications Detail | Columns 1-6, height 340px | Section header 24px/600, table list with 48px row height, toggles on right | Each row (Email, SMS, In-app, Slack) uses `@headlessui/react` switch; includes frequency dropdown (Daily/Weekly/Monthly). |
| `ST-SEC-003` Security Checklist | Columns 7-12, height 340px | Background #F6F9FC, border radius 24px, checklist items 56px height | Contains steps: Enable MFA, Add recovery email, Download backup codes; progress bar top 4px height (#1F8A70). |
| `ST-SEC-004` Integrations Snapshot | Full width, height 360px | Data table with compact density, zebra rows (#FFFFFF/#F8FAFF) | Table columns: Integration, Status (pill), Last Sync, Actions. Uses `@tanstack/react-table`. |
| `ST-SEC-005` Activity Timeline | Full width, height 280px | Timeline dots 8px (#1F8A70), connectors 2px (#CBD5E1), text 16px | Logs last 6 configuration changes with timestamp + actor initial avatar. |
| `ST-MOD-006` Session Drawer | Overlay 480px width | Dark overlay `rgba(7,18,35,0.72)`, drawer background #FFFFFF, radius 24px top corners | Triggered from "Review Sessions" quick action; lists active sessions with device info and terminate buttons. |

## Quick Actions Bar (`ST-ACT-007`)
- Located top-right of content area, includes buttons: Update Profile, Manage Integrations, Review Sessions.
- Buttons 48px height; primary uses copper gradient (#D07A2D→#F0A45C), secondary ghost uses border `#1F8A70`.
- On mobile, converts to 3-icon segmented control with tooltips.

## Responsive Behavior
- **Tablet (≤1024px)**: Sidebar collapses to accordion at top; cards stack two per row; Notification & Security sections stack vertically.
- **Mobile (≤768px)**: Content uses single column 4px grid; cards become 100% width with 16px gap; Quick action segmented control sticks below nav; tables convert to accordion rows showing headline + expand for details.

## Imagery & Asset Notes
- Profile avatar uses `/assets/media/team/admin-owner.jpg` 128x128; fallback gradient background `linear(135°, #1F8A70, #27C3A6)`.
- Integration logos pulled from `/assets/media/integrations/*.svg`, displayed 32px inside status column.
- Security checklist uses icon set from `phosphor-react` (ShieldCheck, Key, FileLock) at 28px.
