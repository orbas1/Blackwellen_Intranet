# Build Verification Results — Version 1.50 QA Wave 1

| Run ID | Date | Target | Result | Duration | Notes |
| --- | --- | --- | --- | --- | --- |
| BUILD-2024-05-09-01 | 09 May 2024 | Web (Vite) | ✅ Pass | 3m42s | Bundle analysed with source maps; tree-shaking removed unused legacy provider components. |
| BUILD-2024-05-09-02 | 09 May 2024 | Mobile (Expo export) | ✅ Pass | 4m18s | Asset generation pipeline produced deterministic icons; verified via SHA diff. |
| BUILD-2024-05-09-03 | 09 May 2024 | Infrastructure (Docker API image) | ⚠️ Pass w/ Notes | 6m11s | Base image swapped to Debian 12.5. SBOM uploaded to Dependency-Track; pending sign-off for Keycloak 23 libs. |

## Observations
- Web build size decreased to 3.9 MB (brotli) due to removal of duplicate analytics chart libs.
- Expo export flagged `expo-notifications` warnings; tracked in ticket MOB-245 for follow-up (non-blocking).
- Docker build includes SLSA provenance attestations; pipeline recorded in GitHub Actions run `build-api#458`.
