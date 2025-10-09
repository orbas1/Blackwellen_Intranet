# Settings Screen Specification – Version 1.50

## Overview
- Applies to both user and provider mobile apps with parity adjustments. Web variant described where applicable.
- Layout uses stacked cards per section with 16px vertical spacing, 20px padding inside each card.

## Header
- Title: “Settings” (Inter 32/40). Secondary text “Manage your experience.”
- Actions: Search icon (20px) for quick find (web), close button (mobile modals) 44×44px.

## Section Details
### Account Security
- Items: Profile photo row (avatar 64px, edit icon overlay 24px), password change CTA, biometric toggle.
- Device list: Table-style rows 72px height with device icon, location, last active, “Sign out” button.

### Notifications
- Channel toggles: Switch rows 56px, icons 28px. Quiet hours row opens bottom sheet with time pickers (24-hour). Display summary text “Quiet hours: 22:00 – 07:00”.
- Digest frequency segmented control (Daily, Weekly, Off) 56px height.

### Offline Data
- Storage meter: Horizontal bar 8px high, label above. “Manage downloads” button (secondary) right aligned.
- Download list: Items 64px height with module name, size, last sync, remove icon.

### Accessibility
- Text size slider: Track 8px height, thumb 24px. Labels (Standard, Comfort, Large) 14/20.
- Contrast toggle + preview: Switch with preview card (280×160px) showing sample widget.
- Reduced motion: Toggle with descriptive text (wrap to 2 lines max).

### Connected Apps
- Integration cards 100% width, 88px height, include logo (48px), description, status pill (Connected/Not connected). Primary button “Manage”.

### Preferences
- Default landing tab dropdown, timezone dropdown (with search). Language selection uses list of radio options with translation preview snippet.

### Support & Legal
- Links list with arrow icons. Feedback button (secondary) opens form modal.

## Footer
- Version label “App version 1.50.0 (build {{buildNumber}})” 14/20 `granite-500`.
- Sign out button (ghost) 56px height, full width, bottom padding 32px.

## Web Variant Adjustments
- Left rail nav width 260px with section list. Content area max width 960px, uses two-column layout for notifications + preferences.
- Save banner appears when multiple settings changed: sticky bottom 72px height with primary “Save changes” button.

## States & Validation
- Inline success banner `harbour-100` background when preferences saved.
- Error states display `catalyst-100` background with icon + message.
- Loading overlay 40% opacity when fetching settings, includes spinner 32px.

## Accessibility
- Provide `Skip to content` link at top (web).
- On mobile, VoiceOver focus after toggling returns to row to confirm state change.
- Ensure controls labelled for screen readers (“Quiet hours start time picker”).

## Asset References
- Icons from Outline 2.0: `settings-lock.svg`, `bell.svg`, `download.svg`, `accessibility.svg`, `plug.svg`, `preferences.svg`, `help.svg`.
- Illustrations for preview card from `/design-system/assets/v1.50/illustrations/accessibility/accessibility_preview.svg`.

## Telemetry
- Events: `settings.section_view`, `settings.toggle_change`, `settings.save`, `settings.error`. Include attributes (section, key, success).
