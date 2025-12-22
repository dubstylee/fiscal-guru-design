# Settings Specification

## Overview

Comprehensive settings page with two tabs for organizing user preferences and system configuration. The Profile tab manages personal settings (email, password, appearance), while the Integrations tab handles third-party service connections (databases, analytics, and identity providers) for the open-source application.

## User Flows

- Switch between Profile and Integrations tabs
- **Profile tab:**
  - Update email address via dedicated form
  - Update password via dedicated form
  - Configure app appearance (theme, language, display density)
- **Integrations tab:**
  - Add new integration (database, analytics, or identity provider) using inline form
  - Edit existing integration configuration
  - Test integration connection to verify it's working
  - Enable/disable integrations without deleting them
  - Delete/remove integrations

## UI Requirements

- Tab navigation at the top with "Profile" and "Integrations" tabs
- Each tab displays as a single scrollable page organized with section headings
- **Profile tab:**
  - User Settings section with separate forms for email and password updates
  - App Appearance section with controls for theme (light/dark), language, and display density
- **Integrations tab:**
  - Integrations grouped by type with clear section headings:
    - **Database Integrations** - PostgreSQL/Supabase, MySQL, SQLite
    - **Analytics Integrations** - PostHog, Datadog
    - **Identity Provider Integrations** - Supabase Auth
  - Each section has its own "Add Integration" button in the section header
  - Clicking a section's "Add Integration" button pre-selects that integration type in the form
  - Integration cards within each section show logo, name, provider, and status indicator (Connected, Disconnected, etc.)
  - Each integration card provides actions: edit, test connection, enable/disable, delete
  - Integration configuration includes type-specific fields:
    - **Database integrations**:
      - PostgreSQL/MySQL: host, port, credentials (username/password)
      - SQLite: file path with browse/file picker button, plus note explaining it's file-based
    - **Analytics integrations**: API keys
    - **Identity provider integrations**: project URL/API key
  - Connection testing behavior:
    - PostgreSQL/MySQL: test network connection and authentication
    - SQLite: verify file exists and is readable
  - Empty sections (no integrations of that type) show a helpful empty state with the "Add Integration" button

## Configuration

- shell: true
