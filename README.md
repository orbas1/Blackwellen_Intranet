# Blackwellen Intranet Platform

This repository hosts the Version 1.50 intranet platform for Blackwellen, including the adaptive web experience and companion mobile clients. The codebase is structured as a multi-app workspace:

- `apps/web` — Vite + React + TypeScript implementation of the adaptive intranet web portal with widget-driven home, employee directory, knowledge hub, and service hub experiences. The latest update adds production-ready preferences storage, virtualised directory rendering, richer knowledge filtering, and an application-wide error boundary.
- `apps/mobile` — Expo-managed React Native application delivering a mobile-first companion with parity modules, React Query powered caching, offline persistence backed by AsyncStorage, and connectivity-aware messaging.
- `update_docs/1.50` — Programme documentation, governance packs, design artefacts, and progress tracking for the Version 1.50 release stream.

## Getting Started

Each application ships with its own `package.json`. Install dependencies and start the development servers from the respective directories.

```bash
cd apps/web
npm install
npm run dev
```

```bash
cd apps/mobile
npm install
npm run start
```

The mobile workspace generates its icons and splash art on demand via `npm run generate:assets`, which is executed automatically before `start`, `run:ios`, `run:android`, and production `build` commands. The generated PNG files live under `apps/mobile/generated-assets` (ignored by Git) and are derived from the shared design palette so teams retain deterministic branding without committing binaries.

The web client exposes a Vite development server on port `5173` by default. The mobile client uses Expo for local development and supports the full Expo tooling chain.

### Environment configuration

- Web (`apps/web`)
  - `VITE_API_BASE_URL` — optional override for the intranet API base URL (defaults to `/api`).
- Mobile (`apps/mobile`)
  - Update the Expo config or runtime environment to point to the correct API host if you are not using the production default `https://intranet.blackwellen.com/api`.

Both applications gracefully fall back to enriched mock data when the configured APIs are unreachable. The web app stores user directory pins in `localStorage`, while the mobile app caches API payloads in AsyncStorage for 30 minutes and surfaces offline banners when network connectivity drops.

## Continuous Delivery

Both applications implement structured API clients with graceful fallbacks to enable local development against mocked data when platform endpoints are unavailable. When connecting to production, configure the `VITE_API_BASE_URL` environment variable for the web app and update the mobile API base URL via Expo config or environment injection before building native binaries.

Refer to the update documentation under `update_docs/1.50` for architecture decisions, migration plans, design sign-off artefacts, and programme governance updates.
