# Build & Release Updates — Version 1.50

## Build Artifacts
| Platform | Build ID | Distribution Channel | Notes |
| --- | --- | --- | --- |
| iOS | 150000 (pending) | TestFlight (Internal) | Expo React Native build with adaptive home, directory, knowledge, service hub parity modules. Requires iOS 13+. |
| Android | 150000 (pending) | Firebase App Distribution | Expo-managed build with React Query offline caching and NetInfo banner. |
| PWA | 1.50.0 | Azure Static Web Apps | Responsive web experience delivered via `apps/web`; dedicated PWA deferred. |
| Shared Assets | Generated per build | Expo asset pipeline | `npm run generate:assets` synthesises icons/splash PNGs from SVG templates to guarantee consistent branding without storing binaries in Git. |

## Release Schedule
- **02 May**: Complete React Query/AsyncStorage integration validation on simulators/emulators.
- **03 May**: Cut refreshed internal builds (TestFlight/Firebase) once analytics parity smoke tests pass.
- **08 May**: Targeted beta distribution to departmental champions following privacy/telemetry review.
- **15 May**: General availability contingent on backend readiness and mobile crash-free rate ≥ 99% during beta.

## Localization Plan
- Strings validated for EN, ES, FR; additional locales planned post GA.
- Localisation QA performed via manual screenshot review and copy deck annotation.
- RTL review scheduled for post-GA once module scope stabilises.

## Support Readiness
- Support article drafted covering offline caching behaviour and connectivity banners; publication pending release date confirmation.
- Helpdesk scripts updated with troubleshooting for cache reset and API fallback messaging.
- Monitoring dashboards configured in Firebase and Expo Application Services for crash trends and API error logging.

## Risk & Mitigation
- **Risk**: Offline cache may grow beyond expectations. *Mitigation*: capped persistence window (30 minutes) and future telemetry hook to monitor size.
- **Risk**: Analytics parity not yet validated. *Mitigation*: block beta release until events reconciled with web dashboards.
- **Risk**: Limited locale coverage at launch. *Mitigation*: communicate scope in release notes and fast-follow translations post-GA.
- **Risk**: Asset generation step skipped by contributors. *Mitigation*: wired `npm run generate:assets` into `prestart`, `prebuild`, and native run scripts; documented expectation in README and build guide.
