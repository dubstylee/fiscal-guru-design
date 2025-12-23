# Settings

## Overview

Comprehensive settings page with two tabs for organizing user preferences and system configuration. The Profile tab manages personal settings (email, password, appearance), while the Integrations tab handles third-party service connections (databases, analytics, and identity providers) for the open-source application.

## User Flows

- Switch between Profile and Integrations tabs
- **Profile tab:**
  - Update email address via dedicated form
  - Update password via dedicated form
  - Configure app appearance (theme, language, display density)
- **Integrations tab:**
  - Add new integration (database, analytics, or identity provider)
  - Edit existing integration configuration
  - Test integration connection
  - Enable/disable integrations
  - Delete integrations

## Design Decisions

- Tab-based navigation for Profile vs Integrations
- Integration cards grouped by type (Database, Analytics, Identity Provider)
- Type-specific configuration forms (PostgreSQL/MySQL use host/port, SQLite uses file path)
- Connection testing with status indicators
- Empty states for integration sections

## Data Used

**Entities:**
- User
- AppearanceSettings
- Integration

**From global model:**
- None (settings-specific entities)

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `Settings` — Main settings component with tabs
- `UserSettingsSection` — Email and password update forms
- `AppearanceSection` — Theme, language, display density controls
- `IntegrationsSection` — Integration management with grouping
- `IntegrationCard` — Individual integration card with actions

## Callback Props

| Callback | Description |
|----------|-------------|
| `onUpdateEmail` | Called when user updates email address |
| `onUpdatePassword` | Called when user updates password |
| `onUpdateAppearance` | Called when user changes appearance settings |
| `onAddIntegration` | Called when user adds a new integration |
| `onEditIntegration` | Called when user edits an integration |
| `onTestIntegration` | Called when user tests an integration connection |
| `onToggleIntegration` | Called when user enables/disables an integration |
| `onDeleteIntegration` | Called when user deletes an integration |

