# Issue List — Version 1.50 Pre-Update Evaluations

1. Backend update documentation is missing concrete endpoint, controller, and service changes for retiring provider functionality, leaving workflows unverified.
2. No backend regression or observability plan exists to validate critical modules or capture errors when deprecated routes are invoked.
3. API contract updates and deprecation messaging have not been shared with client teams, risking schema drift and broken integrations.
4. Dependency inventory, target versions, and compatibility validation are absent, preventing controlled upgrades and CI stability.
5. Security scanning and credential scrub plans for dependency changes are missing, leaving potential CVEs and provider secrets unresolved.
6. Database migration strategy for provider tables, constraints, and archival is undocumented, creating high risk for data loss or failed deployments.
7. Backup, rollback, and dry-run evidence for database changes have not been produced, jeopardising recovery during release.
8. Data consumers and downstream integrations have not been informed of schema impacts, threatening analytics accuracy and ETL reliability.
9. Front-end component updates, UX specifications, and accessibility validations are unavailable, risking inconsistent UI and user confusion.
10. Front-end automated testing, regression coverage, and release notes are missing, leaving critical paths unverified.
11. API contract validation between front-end and backend has not been executed, increasing the likelihood of runtime failures from deprecated fields.
12. User app release notes, build artefacts, and platform-specific regression evidence are missing, obscuring readiness for the provider removal.
13. Mobile UX, localisation, and accessibility updates have not been planned, risking outdated terminology and compliance gaps.
14. User app monitoring, crash reporting, and integration audits (notifications, deep links, offline storage) are unaddressed, reducing visibility into production issues.
15. Security tasks for all tiers—including permission cleanup, token revocation, and signing validation—remain unscheduled, leaving residual provider access paths.
