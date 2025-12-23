# Test Instructions: Initial Setup

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Initial Setup section is a multi-step wizard for first-time users to configure their Fiscal Guru instance. Users configure database (required), identity provider (optional), and analytics (optional) integrations, then review and complete setup.

---

## User Flow Tests

### Flow 1: Complete Setup with All Integrations

**Scenario:** User configures database, identity provider, and analytics, then completes setup

#### Success Path

**Setup:**
- User is on step 1 (Database)

**Steps:**
1. User sees step indicator showing "Step 1 of 4"
2. User sees warning banner: "Database Required"
3. User enters integration name (e.g., "Production Database")
4. User selects "PostgreSQL" as provider
5. User enters host, port, database name, username
6. User clicks "Test Connection" button
7. User clicks "Next" button
8. User is on step 2 (Identity Provider)
9. User enters integration name (e.g., "User Authentication")
10. User selects "Supabase Auth" as provider
11. User enters project URL and anonymous key
12. User clicks "Next" button
13. User is on step 3 (Analytics)
14. User enters integration name (e.g., "Analytics Tracking")
15. User selects "PostHog" as provider
16. User enters API key and host
17. User clicks "Next" button
18. User is on step 4 (Review)
19. User sees summary of all configured integrations
20. User clicks "Complete Setup" button

**Expected Results:**
- [ ] Step indicator shows correct step number
- [ ] Warning banner is visible on step 1
- [ ] Database form validates required fields
- [ ] "Next" button is disabled until database is configured
- [ ] Step 2 shows optional notice banner
- [ ] Step 3 shows optional notice banner
- [ ] Step 4 shows summary with all three integrations marked as "Configured"
- [ ] "Complete Setup" button is enabled
- [ ] Success message appears after completion
- [ ] `onComplete` callback is called
- [ ] User is redirected to Dashboard (handled by routing)

---

### Flow 2: Complete Setup with Database Only (Skip Optional Steps)

**Scenario:** User configures only the required database and skips optional steps

**Steps:**
1. User configures database on step 1
2. User clicks "Next" to step 2
3. User clicks "Skip" button on step 2
4. User is on step 3
5. User clicks "Skip" button on step 3
6. User is on step 4 (Review)
7. User sees summary: Database "Configured", Identity Provider "Not configured", Analytics "Not configured"
8. User clicks "Complete Setup"

**Expected Results:**
- [ ] Skipping step 2 moves to step 3
- [ ] Skipping step 3 moves to step 4
- [ ] Summary shows database as "Configured"
- [ ] Summary shows identity provider as "Not configured"
- [ ] Summary shows analytics as "Not configured"
- [ ] "Complete Setup" is enabled (database is required)
- [ ] Setup completes successfully

---

### Flow 3: Navigate Back Through Steps

**Scenario:** User goes back to previous steps to make changes

**Steps:**
1. User is on step 2
2. User clicks "Back" button
3. User is on step 1
4. User modifies database configuration
5. User clicks "Next" to step 2

**Expected Results:**
- [ ] "Back" button navigates to previous step
- [ ] Previous step data is preserved
- [ ] User can modify previous step's configuration
- [ ] Changes are saved when moving forward

---

### Flow 4: Clear Optional Integration

**Scenario:** User starts configuring an optional integration, then clears it

**Steps:**
1. User is on step 2 (Identity Provider)
2. User selects "Supabase Auth" provider
3. User enters some configuration
4. User clicks "Clear" button
5. User clicks "Next"

**Expected Results:**
- [ ] "Clear" button appears when provider is selected
- [ ] Clicking "Clear" resets form to empty state
- [ ] Summary shows identity provider as "Not configured"
- [ ] User can proceed to next step

---

### Flow 5: Attempt to Complete Without Database

**Scenario:** User tries to complete setup without configuring database

**Steps:**
1. User is on step 1
2. User does not enter database configuration
3. User navigates to step 4 (via some method, if possible)
4. User clicks "Complete Setup"

**Expected Results:**
- [ ] Warning dialog appears: "Database Required"
- [ ] Dialog explains database is required for functionality
- [ ] User can cancel and return to step 1
- [ ] Setup is not completed

---

## Component Interaction Tests

### InitialSetup Component

**Renders correctly:**
- [ ] Shows welcome header: "Welcome to Fiscal Guru"
- [ ] Step indicator displays correct step
- [ ] Navigation buttons are visible and positioned correctly
- [ ] "Skip" button appears on steps 2 and 3
- [ ] "Back" button appears on steps 2, 3, and 4

**User interactions:**
- [ ] "Next" button advances to next step
- [ ] "Back" button goes to previous step
- [ ] "Skip" button skips optional step and advances
- [ ] "Complete Setup" button completes wizard

### DatabaseStep Component

**Renders correctly:**
- [ ] Warning banner is visible
- [ ] Integration name field is present
- [ ] Provider selection shows all database options (PostgreSQL, Supabase, MySQL, SQLite)
- [ ] Configuration fields appear when provider is selected
- [ ] SQLite shows file path input with "Browse" button
- [ ] PostgreSQL/MySQL show host, port, database, username fields
- [ ] Supabase shows project URL and API key fields
- [ ] "Test Connection" button is visible

**User interactions:**
- [ ] Selecting provider updates form fields
- [ ] SQLite file path field works
- [ ] API key fields have show/hide toggle (eye icon)
- [ ] "Test Connection" calls `onTestDatabase` callback

### IdentityProviderStep Component

**Renders correctly:**
- [ ] Optional notice banner is visible
- [ ] "Clear" button appears when provider is selected
- [ ] Provider selection shows Supabase Auth option
- [ ] Configuration fields appear when provider is selected

**User interactions:**
- [ ] "Clear" button resets configuration to null
- [ ] Form can be filled out completely
- [ ] Anonymous key field has show/hide toggle

### AnalyticsStep Component

**Renders correctly:**
- [ ] Optional notice banner is visible
- [ ] "Clear" button appears when provider is selected
- [ ] Provider selection shows PostHog and Datadog options
- [ ] Configuration fields appear when provider is selected

**User interactions:**
- [ ] "Clear" button resets configuration to null
- [ ] PostHog shows API key and host fields
- [ ] Datadog shows API key, application key, and site fields
- [ ] All API key fields have show/hide toggles

### SummaryStep Component

**Renders correctly:**
- [ ] Shows "Setup Complete" heading
- [ ] Displays summary card for each integration type
- [ ] Configured integrations show provider, name, and configuration details
- [ ] Not configured integrations show "Not configured" status
- [ ] Success banner appears if database is configured

---

## Edge Cases

- [ ] Handles very long integration names
- [ ] Handles very long file paths (SQLite)
- [ ] Handles very long API keys
- [ ] Works correctly when user goes back and forth multiple times
- [ ] Preserves data when navigating between steps
- [ ] Handles network errors during connection testing
- [ ] Handles validation errors gracefully

---

## Accessibility Checks

- [ ] All form fields have associated labels
- [ ] Step indicator is accessible
- [ ] Warning dialogs are announced to screen readers
- [ ] Focus is managed appropriately between steps
- [ ] Keyboard navigation works through all steps

---

## Sample Test Data

```typescript
// Example test data - database configured
const mockDatabaseConfig = {
  provider: "postgresql" as const,
  name: "Production Database",
  config: {
    host: "db.example.com",
    port: 5432,
    database: "fiscal_guru",
    username: "app_user"
  }
};

// Example test data - identity provider configured
const mockIdentityProviderConfig = {
  provider: "supabase-auth" as const,
  name: "User Authentication",
  config: {
    projectUrl: "https://project.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
};

// Example test data - analytics configured
const mockAnalyticsConfig = {
  provider: "posthog" as const,
  name: "Analytics Tracking",
  config: {
    apiKey: "phc_1234567890abcdef...",
    host: "https://app.posthog.com"
  }
};

// Example test data - empty/unconfigured
const mockEmptyDatabaseConfig = {
  provider: "",
  name: "",
  config: {}
};

const mockNullConfig = null;
```

---

## Notes for Test Implementation

- Mock API calls for connection testing
- Test each callback prop is called with correct arguments
- Verify step navigation works correctly
- Test that validation prevents invalid progression
- Ensure warning dialogs appear when appropriate
- **Always test empty states** — Verify summary shows "Not configured" for skipped steps
- Test transitions: step 1 → step 2 → step 3 → step 4 → completion

