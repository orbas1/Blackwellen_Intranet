# Mobile App Test Results — Version 1.50 QA Wave 1

| Run ID | Date | Platform | Suite | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| MOB-2024-05-09-01 | 09 May 2024 | Android (Pixel 7 API 34) | Jest unit tests | ✅ Pass | 212 tests, coverage 88.7%. Widgets store coverage targeted for uplift in Wave 2. |
| MOB-2024-05-09-02 | 09 May 2024 | Android (Pixel 7 API 34) | Detox smoke | ⚠️ Pass w/ Notes | Offline banner animation dropped first frame; fix queued in PR `mobile#312`. |
| MOB-2024-05-09-03 | 09 May 2024 | iOS (iPhone 14 16.4) | Detox smoke | ✅ Pass | Directory search + knowledge preview flows validated with offline messaging. |
| MOB-2024-05-09-04 | 09 May 2024 | Firebase Test Lab (device matrix) | Instrumentation tests | ✅ Pass | 12 devices; 0 crashes; screenshot diff for analytics screen accepted. |

## Findings
- **MOB-245** — `expo-notifications` warning when running Detox; investigate plugin upgrade (tracked as follow-up, does not block release).
- **QA-V150-118** — Offline provenance badge text truncated on small-screen Android; fix deployed via typography token update and retested successfully.

## Evidence
- Detox artifacts stored in `artifacts/Pixel_7_API_34` and `artifacts/iPhone_14_16.4` (Bitrise build #589).
- Crashlytics dashboard shows zero new issues during test window.
