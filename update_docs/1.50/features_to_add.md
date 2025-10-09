# Orbas CRM v1.50 – Features to Add

## 1. Core CRM & Workspace Fabric
**Objective:** Deliver foundational CRM, collaboration, customization, and productivity tooling that outclasses Salesforce/Monday equivalents.

| Capability | Description | Key Data Structures | Critical Services / Functions |
| --- | --- | --- | --- |
| Contact, Account & Lead 360° | Unified records with hierarchy, segmentation, tagging, dedupe, relationship graph, customer timeline | `contacts`, `accounts`, `leads`, `contact_relationships`, `contact_tags`, `interaction_logs`, `segments` | `ContactController`, `DuplicateDetectionService`, `RelationshipGraphBuilder`, timeline REST endpoints |
| Opportunity & Pipeline | Kanban/funnel stages, probability, weighted forecasting, win/loss analytics, territory assignment | `opportunities`, `pipeline_stages`, `stage_histories`, `territories`, `forecast_snapshots` | `PipelineBoardService`, `StageTransitionPolicy`, `ForecastEngine`, real-time drag/drop sockets |
| Task & Activity Suite | Tasks, subtasks, timers, urgency, recurring templates, SLA tracking, metrics, copy/clone | `tasks`, `subtasks`, `task_timers`, `task_templates`, `task_metrics`, `task_dependencies` | `TaskScheduler`, `TimerWorker`, `SLAService`, `TaskCloneService`, Kanban & Gantt UI components |
| Calendar & Scheduling | Unified calendar, meeting logs, reminders, availability sharing, time zone awareness | `calendar_events`, `meeting_logs`, `reminders`, `availability_slots` | `CalendarSyncService`, `ReminderDispatcher`, Google/Outlook connectors |
| Workspace Collaboration | Team feeds, @mentions, sticky notes, shared docs, chat, video/voice calls, notification center | `workspace_posts`, `comments`, `attachments`, `notes`, `chat_threads`, `chat_messages`, `call_sessions` | `RealTimeMessagingService` (Pusher), `NotificationCenter`, `DocumentLibraryService`, WebRTC gateway |
| Knowledge & Document Library | Versioned documents, templates, approvals, collaborative editing, e-signature prep | `documents`, `document_versions`, `document_templates`, `document_approvals` | `DocumentLibraryService`, `TemplateRenderer`, `ESignatureAdapter` |
| Customization Engine | Custom fields/objects/forms, schema builder, validation rules, formula fields, custom layouts | `custom_objects`, `custom_fields`, `form_layouts`, `validation_rules`, `formula_fields` | `SchemaBuilder`, `DynamicFormRenderer`, `ValidationRuleEngine`, admin UI |
| Personal Productivity | Personal to-do lists, sticky notes, saved views, bookmarks, AI suggestions | `personal_todos`, `personal_notes`, `saved_views`, `ai_suggestions` | `PersonalWorkspaceService`, `AISuggestionEngine` |
| Duplicate Detection & Merge | Automated detection, merge wizard, rules per entity | `duplicate_candidates`, `merge_jobs` | `DuplicateDetectionService`, `MergeWizard` |

**Additional Requirements:**
- Multi-tenant architecture tables (`tenants`, `workspaces`, `workspace_modules`, `tenant_settings`).
- Installation wizard & CodeCanyon license validator microservice (`license_keys`, `license_audits`, `license_events`).
- Drag-and-drop project/task copy, quick create modals, universal search service.

## 2. Revenue Operations, Sales & Marketing Hub
**Objective:** Accelerate revenue lifecycle from lead to cash with automation, analytics, and AI augmentation.

| Capability | Description | Key Data Structures | Critical Services / Functions |
| --- | --- | --- | --- |
| CPQ & Quoting | Price books, product bundles, approvals, margin guardrails, e-signature | `products`, `product_bundles`, `price_books`, `quotes`, `quote_items`, `approvals` | `CPQEngine`, `ApprovalWorkflowService`, `ESignatureAdapter`, document generator |
| Deal & Proposal Lifecycle | Proposals, estimates, renewals, upsells, contract tracking, task auto-generation | `proposals`, `estimates`, `contracts`, `renewal_opportunities`, `contract_documents` | `ProposalComposer`, `ContractLifecycleManager`, `RenewalReminderWorker` |
| Subscription & Billing | Recurring billing, invoices, payment tracking, dunning, tax calc, SaaS seat billing | `subscriptions`, `subscription_items`, `invoices`, `invoice_items`, `payments`, `tax_rates`, `tenant_plans` | `BillingScheduler`, `StripeGateway`, `PayPalGateway`, `TaxCalculator`, `SeatAllocator` |
| Sales Forecasting & Quotas | Territory quotas, rollups, AI forecasting, coach insights | `quotas`, `territories`, `sales_targets`, `forecast_predictions`, `coaching_notes` | `QuotaManager`, `AIRevenueForecaster`, `SalesPerformanceDashboard` |
| Marketing Automation | Campaign planner, drip journeys, landing pages, web-to-lead, lead scoring, ROI | `campaigns`, `journeys`, `journey_steps`, `landing_pages`, `forms`, `lead_scores`, `tracking_events` | `JourneyOrchestrator`, `EmailTemplateService`, `SMSAdapter`, `FormBuilder`, analytics pipeline |
| Campaign & Reputation Management | Goal planning, CTA tracking, paid ad results, review requests, reputation dashboard | `campaign_goals`, `cta_metrics`, `ad_performance`, `review_requests`, `reputation_scores` | `CampaignPlanner`, `AdResultsIngestor`, `ReputationMonitor`, `GoalTrackingService` |
| Sales Commission Automation | Rules, splits, accelerators, payout approvals, statements | `commission_rules`, `commission_plans`, `commission_entries`, `payouts` | `CommissionEngine`, `PayoutProcessor`, `CommissionDashboard` |
| Partner Relationship Management | Deal registration, co-marketing, partner tiers, incentive tracking | `partners`, `partner_deals`, `partner_tiers`, `incentive_records` | `PartnerPortalService`, `DealRegistrationWorkflow`, `PartnerIncentiveManager` |
| Marketing Content Hub | Template library, brand kits, AI copy suggestions, asset approvals | `marketing_assets`, `brand_kits`, `content_templates`, `approval_requests` | `ContentLibrary`, `AICopywriter`, `BrandComplianceChecker` |

**Additional Requirements:**
- Integration credential vault (`integration_credentials`) for Stripe, PayPal, Google Ads, Meta Ads, Twilio, Mail providers.
- Revenue recognition schedules, credit notes, refunds, expense tracking, sales performance KPIs.
- Quote-to-cash automation linking CRM records to accounting ledgers.

## 3. Service, Support, Projects & Workforce Cloud
**Objective:** Provide omnichannel support, project execution, HR/payroll, inventory, logistics, and workforce management.

| Capability | Description | Key Data Structures | Critical Services / Functions |
| --- | --- | --- | --- |
| Omni-Channel Support | Tickets, chat, email, SMS, WhatsApp, phone/video, SLA routing, macros | `tickets`, `ticket_messages`, `sla_policies`, `support_channels`, `support_macros` | `OmniChannelRouter`, `ChatbotAdapter`, `CallBridgeService`, `SLAMonitor` |
| Knowledge Base & Support Centre | Article authoring, approvals, multi-language, analytics, AI suggestions | `knowledge_articles`, `knowledge_versions`, `article_translations`, `article_feedback` | `KnowledgeCMS`, `AIAnswerService`, `SearchIndexer` |
| Customer Community & Portal | Forums, idea submission, gamification, portal permissions, customer area | `portal_users`, `community_posts`, `community_badges`, `customer_permissions` | `PortalGateway`, `CommunityEngagementService`, `GamificationEngine` |
| Project & Program Management | Project workspaces, objectives, milestones, deliverables, Gantt, workload | `projects`, `project_objectives`, `project_milestones`, `deliverables`, `gantt_snapshots`, `workload_capacity` | `ProjectPlanner`, `GanttGenerator`, `CapacityAnalyzer`, `ProjectChatService` |
| Task Management Enhancements | In-project tasks, drag/drop, AI suggestions, cross-project reporting | `project_tasks`, `task_assignments`, `task_updates`, `task_ai_recommendations` | `TaskAutomationService`, `AIProjectAssistant`, reporting endpoints |
| Field Service & Appointments | Scheduling, dispatch, geo check-ins, asset-linked jobs, offline sync | `service_jobs`, `service_routes`, `appointments`, `geo_checkins`, `service_contracts`, `mobile_sync_jobs` | `DispatchEngine`, `MobileSyncService`, `GeoLocationService`, `ContractComplianceChecker` |
| HR & Payroll | Employee records, onboarding, contracts, hours tracking, payroll runs, tax calculation | `employees`, `contracts`, `onboarding_checklists`, `timesheets`, `payroll_runs`, `tax_configs`, `benefits` | `HRPortal`, `PayrollEngine`, `TimesheetReporter`, `TaxComputationService` |
| Workforce & Capacity Management | Workload dashboards, capacity planning, shift scheduling, labor forecasting | `resource_plans`, `capacity_scenarios`, `shift_assignments` | `CapacityPlanner`, `ShiftScheduler`, `LaborForecastEngine` |
| Inventory, Supply & Manufacturing | Warehouses, stock levels, purchase orders, BOM, logistics, supply chain nodes | `warehouses`, `inventory_items`, `stock_movements`, `purchase_orders`, `bills_of_material`, `logistics_shipments`, `supply_chain_nodes` | `InventoryPlanner`, `MRPEngine`, `SupplyChainOptimizer`, `LogisticsTracker` |
| Procurement & Purchase Management | Vendor management, approvals, budgets, spend analytics | `vendors`, `purchase_requests`, `purchase_approvals`, `spend_metrics` | `ProcurementWorkflow`, `BudgetControlService`, `SpendAnalytics` |
| Asset & Investment Management | Asset registry, depreciation, multi-asset portfolios, valuation history | `assets`, `depreciation_schedules`, `investment_portfolios`, `holdings`, `valuation_history`, `fees` | `AssetLifecycleService`, `InvestmentAnalyticsEngine`, `DepreciationCalculator` |
| Hosting & Server Management | Server inventory, uptime monitoring, maintenance schedules | `servers`, `server_checks`, `uptime_incidents`, `maintenance_jobs` | `ServerMonitor`, `IncidentResponder`, `MaintenanceScheduler` |
| Logistics & Fleet | Fleet tracking, route optimisation, maintenance, driver assignments | `fleet_vehicles`, `fleet_routes`, `maintenance_records`, `driver_assignments` | `FleetManagementService`, `RouteOptimizer`, `MaintenancePlanner` |
| Venue & Event Planning | Venue availability, booking, event tasks, attendee management | `venues`, `venue_bookings`, `events`, `event_tasks`, `attendees` | `EventPlanningService`, `VenueScheduler`, `AttendeePortal` |
| Workshop & Service Management | Service jobs, work orders, inventory usage, scheduling | `service_workshops`, `work_orders`, `workshop_schedules`, `inventory_usage` | `WorkshopScheduler`, `WorkOrderManager`, `InventoryAllocator` |

**Additional Requirements:**
- Workforce Flutter app endpoints with offline queue (`sync_jobs`, `device_sessions`).
- Time tracking reports, timesheet exports, project milestones, copy tasks, task progress bars.
- Support for sticky notes, workspace announcements, internal broadcasts, and workload dashboards.

## 4. Intelligence, Automation & AI Fabric
**Objective:** Embed AI, analytics, automation, and marketplace extensibility to drive proactive operations.

| Capability | Description | Key Data Structures | Critical Services / Functions |
| --- | --- | --- | --- |
| Analytics & Reporting | Custom dashboards, metrics builder, scheduled reports, data visualisation | `reports`, `report_widgets`, `dashboards`, `metrics`, `scheduled_reports`, `analytics_filters` | `AnalyticsEngine`, `DashboardBuilder`, `ReportScheduler`, visualisation components |
| Predictive Intelligence | Lead/deal scoring, churn detection, forecast adjustments, capacity predictions | `ai_models`, `model_versions`, `predictions`, `training_datasets`, `prediction_audits` | `ModelTrainingPipeline`, `PredictionAPI`, `RecommendationEngine`, `ForecastAdjuster` |
| AI Studio & Copilot | AI chat, writing assistant, document/image generators, AI copilot overlay | `ai_sessions`, `ai_prompts`, `ai_documents`, `ai_images`, `ai_assets`, `ai_conversations` | `OpenAIClient`, `NanoBananaClient`, `AICopilotService`, `PromptTemplateLibrary`, `ConversationSummarizer` |
| Automation & Workflow | Workflow builder, approvals, triggers, webhooks, cron jobs, process analytics | `workflows`, `workflow_steps`, `workflow_triggers`, `approval_requests`, `webhook_events`, `scheduled_jobs`, `automation_metrics` | `WorkflowRuntime`, `ApprovalEngine`, `WebhookDispatcher`, `CronOrchestrator`, `ProcessAnalytics` |
| AI-Powered Content Creation | AI writer, creative brief generator, AI document creator, AI creative studio | `ai_content_requests`, `ai_briefs`, `ai_documents`, `ai_creatives` | `AIWriterService`, `AIDocumentComposer`, `CreativeStudio`, `ContentVersioningService` |
| AI Image Suite | Image generator, editor, Nano Banana integration, asset approvals | `ai_images`, `image_variations`, `image_edits`, `image_requests` | `ImageGenerationService`, `ImageEditingService`, `AssetApprovalWorkflow` |
| AI Suggestions & Co-Pilot | Next best actions, task suggestions, project insights, marketing recommendations | `ai_recommendations`, `recommendation_feedback` | `RecommendationService`, `FeedbackLoopService` |
| Metrics & Goals Tracking | Goal hierarchies, KPI dashboards, progress updates, alerts | `goals`, `goal_key_results`, `goal_updates`, `goal_alerts` | `GoalManagementService`, `KPIDashboard`, `GoalAlertDispatcher` |

**Additional Requirements:**
- Observability integrations (`audit_logs`, `system_events`, `usage_metrics`, `ai_usage_logs`).
- AI governance (model catalog, prompt library, quota controls, data residency settings).
- Event streaming for automation triggers and analytics warehousing.

## 5. Security, Compliance & Platform Experience
**Objective:** Guarantee security, privacy, branding, accessibility, SaaS-readiness, and administration excellence.

| Capability | Description | Key Data Structures | Critical Services / Functions |
| --- | --- | --- | --- |
| Security & Access Control | RBAC, permission sets, field-level security, hierarchy sharing, audit logs | `users`, `roles`, `permissions`, `role_hierarchy`, `permission_sets`, `share_rules`, `audit_logs` | `AuthService`, `PermissionEvaluator`, `SharingRuleEngine`, `AuditTrailService` |
| Identity & Authentication | MFA/2FA, SSO (SAML/OAuth2), login history, IP restrictions, session management | `mfa_tokens`, `sso_connections`, `login_history`, `ip_whitelist`, `sessions` | `MFAService`, `SSOAdapter`, `SessionManager`, `IPRestrictionService` |
| Compliance Tooling | GDPR/CCPA requests, consent logs, retention policies, backup scheduler | `privacy_requests`, `consent_logs`, `retention_policies`, `backup_jobs`, `data_exports` | `ComplianceCenter`, `DataExporter`, `RetentionEnforcer`, `BackupScheduler` |
| SaaS Operations & Licensing | Tenant billing, seat management, module toggles, switch to SaaS, CodeCanyon check | `tenant_plans`, `tenant_seats`, `module_flags`, `billing_events`, `license_keys`, `license_audits` | `SaaSManager`, `SeatAllocator`, `ModuleToggleService`, `LicenseValidator`, `UsageAnalytics` |
| Branding & UI Theming | Theme presets, template editor, landing page builder, menu configurations, white-labeling | `themes`, `branding_assets`, `page_templates`, `menu_configs`, `brand_packs` | `ThemeEngine`, `TemplateDesigner`, `MenuConfigurator`, React design system |
| Localization & Translation | Multi-language, multi-currency, timezone, RTL support, translation workflows | `localization_strings`, `translation_jobs`, `currency_rates`, `timezone_settings` | `LocalizationService`, `TranslationManager`, `CurrencyConverter` |
| Accessibility & UX Quality | WCAG compliance audits, accessibility reports, usability metrics | `accessibility_audits`, `ux_metrics`, `heatmap_events` | `AccessibilityScanner`, `UXMetricsCollector`, `FeedbackAnalyzer` |
| System Administration | System health dashboard, cron jobs, error logging, storage analyzer, API usage monitor | `system_health`, `cron_jobs`, `error_logs`, `storage_stats`, `api_usage` | `SystemHealthService`, `CronManager`, `ErrorMonitor`, `APIUsageAnalyzer` |

**Additional Requirements:**
- DevOps pipelines, automated deployments, rollback tooling, sandbox management (`sandboxes`, `deployment_pipelines`).
- Social media automation connectors (`social_accounts`, `scheduled_posts`, `social_metrics`).
- Integration SDKs, CLI tools, GraphQL explorer, REST API docs, webhook management.

## 6. Customer, Partner & External Experiences
**Objective:** Empower customers, partners, and prospects with rich self-service, marketing, and collaboration experiences.

| Capability | Description | Key Data Structures | Critical Services / Functions |
| --- | --- | --- | --- |
| Customer Portal & Area | Secure customer area for invoices, subscriptions, support, documents, approvals | `portal_users`, `customer_sessions`, `portal_permissions`, `customer_notifications` | `CustomerPortal`, `PortalAuthService`, `PortalNotificationService` |
| Landing Page & Website Builder | Drag-and-drop landing pages, marketing sites, web portal tracking, CTA analytics | `landing_pages`, `page_sections`, `web_analytics`, `cta_events` | `LandingPageBuilder`, `WebsiteTracker`, `CTAAnalytics` |
| Web-to-Lead & Forms | Embeddable forms, spam protection, mapping to CRM fields, automation triggers | `web_forms`, `form_submissions`, `form_mappings` | `FormBuilder`, `SpamGuard`, `FormSubmissionProcessor` |
| Partner Portal & Marketplace | Partner onboarding, deal collaboration, app marketplace, add-on billing | `partner_accounts`, `partner_users`, `marketplace_apps`, `app_versions`, `addon_subscriptions` | `PartnerPortalService`, `MarketplaceService`, `AddOnInstaller`, `PartnerBillingService` |
| Customer Communications | Email templates, bulk email, SMS campaigns, auto replies, templated responses | `email_templates`, `bulk_emails`, `sms_campaigns`, `auto_replies` | `EmailCampaignService`, `SMSCampaignService`, `AutoReplyEngine` |
| Support Self-Service | Knowledge search, chatbot, ticket submission, appointment booking | `support_widgets`, `chatbot_flows`, `self_service_events` | `SelfServicePortal`, `ChatbotAdapter`, `AppointmentScheduler` |
| Feedback & Surveys | CSAT/NPS/feedback forms, analytics, follow-up automation | `surveys`, `survey_responses`, `survey_metrics` | `SurveyBuilder`, `FeedbackAnalytics`, `FollowUpAutomation` |
| E-commerce & Shopify Management | Product sync, order tracking, fulfillment, returns | `ecommerce_connections`, `orders`, `order_items`, `fulfillment_records`, `returns` | `EcommerceSyncService`, `OrderTrackingService`, `ReturnProcessingService` |

**Additional Requirements:**
- CRM AI chat system integration (admin-provided API keys), AI document & creative studios accessible via portal.
- Appointments module shared between workforce & customer portals with reminders and meeting links.
- Reputation management workflows with alerting and response templates.

## 7. Data Management & Developer Experience
**Objective:** Provide robust data lifecycle controls, developer tooling, and automation to accelerate ecosystem growth.

| Capability | Description | Key Data Structures | Critical Services / Functions |
| --- | --- | --- | --- |
| Data Import/Export & ETL | Import wizard, CSV/JSON templates, data dedupe, export APIs, ETL connectors | `import_jobs`, `import_mappings`, `export_jobs`, `etl_configs` | `DataImportWizard`, `DataExportService`, `ETLConnector`, `DeduplicationEngine` |
| Master Data Management | Data governance, stewardship workflows, data quality rules | `data_governance_policies`, `data_quality_rules`, `data_stewards` | `MDMService`, `DataQualityMonitor`, `StewardWorkflow` |
| Sandbox & Environments | Sandbox provisioning, refresh, anonymisation, versioning | `sandboxes`, `sandbox_snapshots`, `sandbox_refresh_jobs` | `SandboxManager`, `DataMaskingService`, `VersionControlService` |
| Developer Tools & APIs | REST/GraphQL explorer, CLI, SDKs, webhook management, API key lifecycle | `api_keys`, `oauth_clients`, `webhooks`, `developer_apps`, `event_subscriptions` | `APIGateway`, `GraphQLExplorer`, `DeveloperCLI`, `WebhookManager` |
| Event Bus & Streaming | Domain events, event processing, queue workers, background jobs | `domain_events`, `event_consumers`, `queue_jobs` | `EventBusService`, `QueueWorker`, `StreamProcessor` |
| Automation Marketplace | Publish/share workflows, templates, integrations | `automation_templates`, `automation_installs` | `AutomationMarketplace`, `TemplateInstaller` |

**Additional Requirements:**
- CLI/SDK documentation, sample apps, unit test generators, deployment pipelines.
- Data retention, archival, purge policies configurable per entity.
- Usage analytics for developer APIs, quota enforcement, billing integration.

---
**Implementation Note:** All features must expose REST/GraphQL endpoints, emit domain events for the real-time event bus, register audit logs, and provide role-aware UI components. Each module requires comprehensive test coverage, documentation, onboarding tutorials, Flutter parity work packages, and CodeCanyon compliance sign-off.
