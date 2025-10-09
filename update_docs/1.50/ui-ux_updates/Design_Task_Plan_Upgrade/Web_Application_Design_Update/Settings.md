# Settings Experience Specifications

## Access Points
- Avatar dropdown > Settings.
- Footer link > Settings (opens new tab).
- URL `/settings` loads dedicated page with same drawer layout.

## Structure
- Drawer with tabs: Profile, Notifications, Integrations, Security.
- Each tab uses sticky header with description and Save button location.

## Profile Tab
- Fields: Name, Title, Department, Phone, Timezone (select), Language (select).
- Photo uploader 160x160 with cropper.

## Notifications Tab
- Toggle groups: Email alerts, SMS alerts, In-app notifications.
- Provide frequency radio buttons (Instant, Daily Digest, Weekly Summary).

## Integrations Tab
- List of connected apps (Salesforce, ServiceNow). Each row includes status pill and "Manage" button.
- Add integration button opens modal with search.

## Security Tab
- Contains password change form, 2FA toggle, trusted devices list (table 3 columns: Device, Location, Last Active).
- Show `Enable hardware key` CTA with info tooltip.

## Save Patterns
- Primary Save button sticky bottom; ghost "Cancel" on left.
- Confirmation toast on success; highlight fields changed with subtle background (#FFF7ED) until saved.

