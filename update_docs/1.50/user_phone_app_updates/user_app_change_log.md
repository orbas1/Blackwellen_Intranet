# User App Change Log — Version 1.50

## Highlights
- Adaptive home quick actions now surface live, cached, or fallback widget data with clear provenance messaging.
- Directory module adopts React Query backed caching, offline banners, and richer metadata (skills, contact options).
- Knowledge hub incorporates debounced search, category/status filtering, and offline transparency cues.
- Service hub workflow health view mirrors SLA, queue depth, and data-source warnings from the web experience.
- Added breach-rate, backlog trend, and average completion telemetry to mobile workflow cards to stay in lockstep with the enhanced web catalog.
- Global theming continues to respect system preference while powering safe-area aware layouts and typography.
- Analytics intelligence screen delivers KPI summaries, alert context, report schedule visibility, and security posture status with dataset/timeframe/segment filters.

## Platform-Specific Notes
- **iOS**: Expo-managed runtime targeting iOS 13+; AsyncStorage persistence verified across cold launches; background fetch remains opt-in for future milestone.
- **Android**: Minimum SDK 24 with network security config aligned to staging APIs; NetInfo listener hardened for manufacturer-specific behaviours.
- **PWA**: Deferred to future milestone; mobile web experience currently defers to responsive intranet portal.

## Telemetry & Monitoring
- React Query devtools integration available for debugging in development builds.
- Network fallbacks log warnings with API path context to aid observability alignment with backend squads.
- Analytics hooks emit consistent events for widget impressions and directory searches to mirror web dashboards.

## Localization & Accessibility
- Core copy reviewed for truncation across English, French, and Spanish with auto-scaling text support validated on iOS/Android.
- VoiceOver/TalkBack focus order verified for quick action cards, directory list items, and workflow tiles.

## Testing & Certification
- Smoke tested on iOS simulator (iPhone 14, iOS 17) and Android emulator (Pixel 6, API 34) validating offline cache hydration and NetInfo toggling.
- Jest unit coverage extended for service data utilities in preparation for follow-up automation.
- Next TestFlight/Firebase builds scheduled post-integration of analytics instrumentation (target 08 May).

## Analytics Intelligence Snapshot (09 May 2024)
- Added React Query-powered `/analytics` screen with cached KPI metrics, delta indicators, and highlight messaging aligned to web telemetry datasets.
- Surfaced alert severity, SLA countdowns, and recommended actions alongside reporting schedule status for on-the-go triage.
- Displayed mobile security posture (compliant devices, remediations, opt-in, crash-free sessions) with contextual commentary and last audit timing.

## Version 1.50 Implementation Update (30 Apr 2024)
- Introduced Expo-managed React Native shell (`apps/mobile`) delivering adaptive home widgets, directory, knowledge hub, and service hub workflow monitoring with offline-aware fallbacks while continuing to surface native Compose/Swift modules through bridges.
- Centralised API access via Axios client with graceful degradation to cached datasets to stabilise preview builds and enable telemetry parity with web.
- Implemented zustand-powered theming store reacting to system preference changes and ensuring safe-area compliance across devices.

## React Query & Offline Hardening (02 May 2024)
- Added React Query with AsyncStorage persistence to hydrate directory, knowledge, workflow, and widget data for consistent offline behaviour.
- Implemented shared offline notice component, NetInfo powered connectivity hook, and data-source metadata across feature screens.
- Refactored screens to use FlatList headers for telemetry, stale-state warnings, and consistent localisation-ready copy.

## Asset Pipeline Compliance (03 May 2024)
- Removed committed PNG binaries and introduced deterministic asset synthesis via `npm run generate:assets`, rendering icons and splash screens from SVG templates using `sharp` to maintain branding without bloating Git history.
- Wired asset generation into Expo lifecycle scripts (`prestart`, `prebuild`, `preios`, `preandroid`) so developers and CI receive the correct branding artefacts automatically.
- Documented the workflow in the mobile build guide and repository README to support onboarding and compliance reviews.
