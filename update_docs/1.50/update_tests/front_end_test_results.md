# Front-End Test Results — Version 1.50 QA Wave 1

| Run ID | Date | Environment | Suite | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| FE-2024-05-09-01 | 09 May 2024 | qa-green | Lint + TypeScript build (`npm run lint`, `npm run build`) | ✅ Pass | Build output 11.2 MB gzip (↓3% vs RC1). No TypeScript errors. |
| FE-2024-05-09-02 | 09 May 2024 | qa-green | React Testing Library smoke pack (`pnpm test --filter widget`, `--filter directory`) | ⚠️ Pass w/ Notes | Widget personalization drag-and-drop test skipped pending Playwright config sync. Manual verification recorded in QA dashboard. |
| FE-2024-05-09-03 | 09 May 2024 | qa-green | Lighthouse accessibility audit (`lighthouse-ci`) | ✅ Pass | Scores — Performance 86, Accessibility 98, Best Practices 100, SEO 100. Emo theme compliance validated. |
| FE-2024-05-09-04 | 09 May 2024 | qa-green | Chromatic visual regression | ✅ Pass | 243 snapshots reviewed; 2 intentional diffs (analytics alert badge) approved by Design QA. |

## Defect Summary
- **QA-V150-117** — Analytics acknowledgement chip lost focus outline in Firefox. Resolved in commit `9a7c1de`; re-tested 09 May.
- **QA-V150-119** — Knowledge article preview skeleton height mismatch. Fixed via token update `spacing-400` (Design & FE sync).

## Evidence Links
- Playwright dashboard: pending config (tracked via task QA-V150-121).
- Lighthouse report: `reports/lighthouse/FE-2024-05-09-03.html`.
- Chromatic build: `https://www.chromatic.com/build?appId=blackwellen-v150&number=138`.
