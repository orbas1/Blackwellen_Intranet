# Dummy Data Requirements – Version 1.50

## Purpose
Provide realistic yet anonymised data sets for prototyping, usability testing, and QA to validate screen designs without exposing sensitive information.

## Data Sets Needed
| Module | Dataset | Volume | Fields | Notes |
| --- | --- | --- | --- | --- |
| Adaptive Home | Widget feed | 50 records per persona | `widgetId`, `title`, `metric`, `trend`, `ctaLabel`, `status` | Provide variations for employee, manager, executive |
| Notifications | Activity log | 200 entries | `type`, `severity`, `timestamp`, `summary`, `actions[]` | Include mix of approvals, compliance, info |
| Service Hub | Request catalogue | 40 templates | `id`, `name`, `department`, `slaHours`, `description`, `requiredFields[]` | Ensure translation ready text |
| Service Requests | Active requests | 120 records | `requestId`, `title`, `status`, `assignee`, `due`, `priority`, `channel` | Provide multi-status distribution |
| Approvals | Pending approvals | 25 records | `approvalId`, `requester`, `riskScore`, `amount`, `deadline` | Include high risk (>80) for MFA path |
| Knowledge Hub | Articles | 150 items | `articleId`, `title`, `type`, `tags[]`, `updatedAt`, `isMandatory`, `summary` | Provide long & short copy variants |
| Analytics | KPI metrics | 30 metrics | `metricId`, `name`, `value`, `delta`, `comparison`, `chartData[]` | Data for line/bar charts |
| Analytics Alerts | Alerts dataset | 40 alerts | `alertId`, `severity`, `description`, `recommendedAction`, `owner` | Provide resolved/in-progress states |
| Investment | Portfolio holdings | 35 items | `holdingId`, `name`, `exposure`, `risk`, `actionRequired` | Variation for risk heatmap |
| Provider Queue | Field requests | 80 items | `jobId`, `location`, `priority`, `sla`, `status`, `routeOrder` | Include geo coordinates |
| Inventory | Stock levels | 30 items | `itemId`, `itemName`, `quantity`, `threshold`, `status` | Provide near-threshold cases |
| Settings | Preferences | 5 persona profiles | `persona`, `notifications`, `offlineData`, `accessibility`, `connectedApps` | For toggles & previews |

## Data Generation Rules
- Use fictional names and departments (e.g., “Aster Manufacturing”, “Helios Analytics”).
- Dates within ±90 days from current to test relative formatting.
- Monetary values randomised within defined ranges (Approvals: 5,000–250,000). Use currency USD for baseline; include multi-currency for international testing.
- Geolocation coordinates approximated around major cities (NYC, London, Singapore) for provider routes.

## Storage & Access
- Store JSON fixtures in `/design-system/data/v1.50/` with modules as subdirectories.
- Provide CSV exports for analytics teams to load into PowerBI prototypes.
- Access controlled via Git with limited contributors; do not store in production environments.

## Refresh Cadence
- Update datasets every release (quarterly). Document changes in `design_change_log.md` under Data Updates.
- Provide changelog for field additions/removals to maintain schema parity with API mocks.

## Tooling
- Use Mockoon/Postman collections to simulate APIs using dummy data. Collections stored in `/design-system/mocks/v1.50/`.
- Provide Figma data plug-in (Google Sheets connection) for dynamic text injection using `screens_text.csv`.

## Compliance
- Ensure dummy data contains no PII resembling real employees.
- Legal reviewed dataset template (Doc ID LEG-UI-150) to ensure compliance.
- For investment module, ensure fictional companies clearly marked “Sample Data” within UI (badge `granite-500`).
