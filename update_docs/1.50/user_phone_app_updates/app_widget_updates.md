# Mobile Widget Updates — Version 1.50

| Widget | Description | Interaction | Offline Behaviour | Feature Flags |
| --- | --- | --- | --- | --- |
| Celebrations | Highlights upcoming milestones with CTA to open celebrations flow. | Tap navigates to celebrations page when link provided. | Falls back to cached dataset with provenance banner. | `adaptive-home-foundation` |
| Compliance Tracker | Summarises outstanding attestations with progress metrics. | Tap opens knowledge/service hub via deep link when available. | Displays cached counts when offline and marks data as stale. | `adaptive-home-foundation` |
| Engagement Insight | Shares weekly sentiment/engagement trend for leadership visibility. | Informational card; instrumentation logs impressions. | Fallback message shown when API unreachable. | `adaptive-home-foundation` |
| Document Sign-offs | Reminds user of pending document approvals with CTA. | Tap launches service hub intake screen. | Uses cached dataset; CTA disabled if offline. | `service-hub-foundation` |
| Quick Links | Static shortcuts to directory, knowledge, and service hub modules. | Tap navigates to in-app screen via React Navigation. | Always available; local config stored within app bundle. | None |
