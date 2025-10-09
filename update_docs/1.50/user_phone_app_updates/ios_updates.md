# iOS Updates — Version 1.50

## Build Information
- **Bundle Version**: 150.0.0
- **Build Number**: 150000
- **Minimum OS**: iOS 15
- **Target OS**: iOS 17

## Feature Summary
- Expo-managed React Native experience mirrors adaptive home quick actions, directory, knowledge, and service hub modules.
- React Query caching with AsyncStorage persistence enables offline reads and stale-data warnings across all screens.
- Offline notice banner surfaces when NetInfo reports loss of connectivity or API failures.
- Status bar styling aligns with system theme via Zustand-powered theming store.

## Technical Changes
- Added `@tanstack/react-query`, `@tanstack/react-query-persist-client`, and `@tanstack/query-async-storage-persister` for persistent caching.
- Configured Axios base URL and timeouts; structured warning logs for offline fallback debugging.
- Confirmed Safe Area + StatusBar handling across light/dark modes when using Expo StatusBar component.

## Testing
- Smoke validation on iPhone 14 (iOS 17 simulator) covering offline caching, React Query hydration, and navigation.
- Jest suite exercised to confirm API fallbacks hydrate AsyncStorage when offline.
- VoiceOver checks confirm rotor order for quick actions, directory entries, and knowledge tags; Dynamic Type medium verified.

## Release Checklist
- TestFlight build pending once analytics events verified against staging backend (target 08 May).
- App Store metadata update deferred until analytics parity sign-off; current listing remains accurate for preview build.
- Privacy questionnaire review queued with security/engineering following telemetry integration.
