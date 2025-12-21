# Settings Specification

## Overview
Comprehensive settings page for managing user account preferences, app appearance, and third-party integrations. Users can update their credentials, customize the interface, and configure database and analytics connections for the open-source application.

## User Flows
- Update email address via dedicated form
- Update password via dedicated form
- Configure app appearance (theme, language, display density)
- Add new integration (database or analytics) using inline form
- Edit existing integration configuration
- Test integration connection to verify it's working
- Enable/disable integrations without deleting them
- Delete/remove integrations

## UI Requirements
- Single scrollable page organized with section headings
- User Settings section with separate forms for email and password updates
- App Appearance section with controls for theme (light/dark), language, and display density
- Integrations section displaying each integration as a card
- Integration cards show logo, name, type, and status indicator (Connected, Disconnected, etc.)
- "Add Integration" button reveals inline configuration form
- Support for database integrations: PostgreSQL/Supabase, MySQL
- Support for analytics integrations: PostHog, Datadog
- Database configuration includes connection-specific fields (address, login/password, token depending on database type)
- Each integration card provides actions: edit, test connection, enable/disable, delete

## Configuration
- shell: true