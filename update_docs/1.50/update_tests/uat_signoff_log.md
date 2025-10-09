# UAT Session Log — Version 1.50 Wave 1 & 2

## Session Overview
| Date | Department | Facilitator | Focus Areas | Outcome |
| --- | --- | --- | --- | --- |
| 08 May 2024 | HR Operations | Lisa Moore | Adaptive home widgets, celebrations feed, service hub intake | ✅ Approved — minor copy update for parental leave widget placeholder text. |
| 09 May 2024 | Communications | Ryan Patel | Knowledge hub publishing, attestation tracker, search relevance | ✅ Approved — request for newsletter template default tags implemented. |
| 10 May 2024 | Finance | Amina Torres | Expense workflow, analytics dashboards, budget export | ⚠️ Conditional — export CSV missing cost centre breakdown (tracked as `UAT-215`). |
| 11 May 2024 | IT Services | Derek Shaw | Workflow automation templates, asset lifecycle dashboards | ✅ Approved — automation template cloning validated. |
| 11 May 2024 | Facilities | Priya Gupta | Service catalog, SLA indicators, notifications | ✅ Approved — SLA thresholds accepted. |

## Issues & Actions
- `UAT-215`: Finance export enhancement committed to branch `feature/budget-export-breakdown`, scheduled for QA regression 13 May.
- `UAT-219`: Accessibility concern raised about contrast on analytics trend line; design tokens updated and verified in Chromatic run `#2215`.
- `UAT-204`: Request to preload HR knowledge articles pinned to adaptive home resolved via content migration script 10 May.

## Sign-off Statements
- HR Operations, Communications, IT Services, and Facilities provided written sign-off via DocuSign envelope `D-150-2024`.
- Finance sign-off pending until `UAT-215` is resolved; contingency plan includes manual CSV enrichment documented in release checklist.

## Next Steps
1. Re-run Finance UAT after deployment of cost centre breakdown patch (target 13 May 2024).
2. Prepare Wave 3 UAT schedule focusing on mobile offline workflows and analytics AI assistant prompts.
3. Publish knowledge base article summarising key user journeys validated and outstanding training assets.
