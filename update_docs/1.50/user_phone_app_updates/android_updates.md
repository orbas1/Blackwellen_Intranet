# Android Updates — Version 1.50

## Build Information
- **Version Code**: 150000
- **Version Name**: 1.50.0
- **Target SDK**: 34
- **Minimum SDK**: 24

## Feature Summary
- Expo-managed React Native stack provides adaptive home quick actions, directory, knowledge, and service hub parity modules.
- React Query + AsyncStorage caching ensures resilient offline experience across modules with stale data warnings.
- NetInfo-driven connectivity banner alerts users when operating on cached data.
- Navigation stack harmonises with theming provider for consistent dark/light rendering and safe-area padding.

## Technical Changes
- Added `@tanstack/react-query`, `@tanstack/query-async-storage-persister`, `@react-native-async-storage/async-storage`, and `@react-native-community/netinfo` dependencies.
- Configured Axios client with 8s timeout, cache persistence key namespace, and warning logs for offline fallbacks.
- Updated Expo config to ensure Android network security config honours staging/prod API endpoints.

## Testing
- Manual smoke tests executed on Android emulator (Pixel 6, API 34) validating offline caching, NetInfo transitions, and navigation stack.
- Jest unit suite expanded to cover API safe-get utilities (run via `npm test`).
- TalkBack spot checks confirm focus order for quick action cards and directory list items.

## Release Checklist
- Play Store assets remain unchanged; updated feature summary to highlight offline-ready modules.
- Privacy/data-safety review scheduled post integration testing (target 08 May).
- Release to internal testing track once analytics parity validation completes.
