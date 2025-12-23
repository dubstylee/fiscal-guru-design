# Fiscal Guru — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

# Product Overview

Fiscal Guru is a modern financial management platform that helps small business owners, freelancers, and financially conscious individuals manage their companies, accounts, invoices, and payments through an intuitive dashboard with real-time insights and automated tracking.

## Planned Sections

1. **Dashboard & Overview** — Central financial health view with at-a-glance metrics, upcoming payments, and timeline visualizations.
2. **Company Management** — Create and manage companies (vendors, clients, service providers) with profiles and contact information.
3. **Accounts & Invoices** — Track financial accounts and manage invoices with flexible scheduling and payment status.
4. **Payment Tracking** — Record and monitor all payments with detailed breakdowns and comprehensive history.
5. **Insights & Planning** — Budget planning, transaction history, watchlists, and analytics for proactive financial management.
6. **Settings** — User preferences, financial configuration, integration setup, and database connection management for the open-source application.
7. **Initial Setup** — A multi-step wizard for first-time users to configure their Fiscal Guru instance with database, identity provider, and analytics integrations.

## Data Model

**Core Entities:**
- **Company** — A vendor, client, or service provider that the user does business with (includes profile info, logos, contact details).
- **Account** — A financial account belonging to a Company (checking, credit card, loan, etc.) with balance and account details.
- **InvoiceTemplate** — A recurring invoice pattern that defines schedule, amount, and frequency (e.g., "Netflix - $15.99/month").
- **Invoice** — An individual bill or payment obligation with a specific due date and amount (either one-time or generated from a template).
- **Payment** — A transaction record showing money paid toward an invoice with date, amount breakdown, and clearing status.

**Relationships:**
- Company has many Accounts
- Account has many Invoices
- Account has many InvoiceTemplates
- Invoice belongs to an Account
- Invoice optionally belongs to an InvoiceTemplate (for recurring invoices)
- InvoiceTemplate generates many Invoices
- Invoice has many Payments
- Payment belongs to an Invoice

## Design System

**Colors:**
- Primary: `slate` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, secondary elements
- Neutral: `stone` — Used for backgrounds, text, borders

**Typography:**
- Heading: `Inter` — Google Fonts
- Body: `Inter` — Google Fonts
- Mono: `IBM Plex Mono` — Google Fonts

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, and routing structure.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:**
- Primary: `slate` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, secondary elements
- Neutral: `stone` — Used for backgrounds, text, borders

**Typography:**
- Heading: `Inter` — Google Fonts
- Body: `Inter` — Google Fonts
- Mono: `IBM Plex Mono` — Google Fonts

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- Company — Vendor, client, or service provider
- Account — Financial account belonging to a Company
- InvoiceTemplate — Recurring invoice pattern
- Invoice — Individual bill or payment obligation
- Payment — Transaction record showing money paid toward an invoice

### 3. Routing Structure

Create placeholder routes for each section:

- `/` or `/dashboard` — Dashboard & Overview
- `/companies` — Company Management
- `/accounts` — Accounts & Invoices
- `/payments` — Payment Tracking
- `/insights` — Insights & Planning
- `/settings` — Settings
- `/setup` — Initial Setup (first-time configuration)

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions

## Done When

- [ ] Design tokens are configured
- [ ] Data model types are defined
- [ ] Routes exist for all sections (can be placeholder pages)

---

# Milestone 2: Application Shell

## Goal

Implement the application shell — the persistent navigation and layout that wraps all sections.

## What to Implement

### Shell Components

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

### Wire Up Navigation

Connect navigation to your routing:

- Dashboard & Overview → `/` or `/dashboard`
- Company Management → `/companies`
- Accounts & Invoices → `/accounts`
- Payment Tracking → `/payments`
- Insights & Planning → `/insights`
- Settings → `/settings` (below divider)

### User Menu

The user menu expects:
- User name
- Avatar URL (optional)
- Logout callback

## Files to Reference

- `product-plan/shell/README.md` — Design intent
- `product-plan/shell/components/` — React components

## Done When

- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Responsive on mobile

---

# Milestone 3: Dashboard & Overview

## Goal

Implement the Dashboard & Overview feature — central financial health view with at-a-glance metrics, upcoming payments, and timeline visualizations.

## Overview

The Dashboard provides users with a comprehensive financial overview at a glance. It displays key metrics, payment trends, upcoming invoices, and recent payment activity, enabling quick assessment of financial status and easy access to common actions.

**Key Functionality:**
- View key financial metrics (Active Accounts, Upcoming Invoices, Total Monthly Spend, Uncleared Payments)
- View payment trends chart showing month-over-month data for the last 6 months
- View monthly spending comparison chart with daily and cumulative data
- Browse upcoming payments and click to view invoice details
- Browse recent payment activity and click to view payment details
- Add new payment via quick action button
- Add new invoice via quick action button

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/dashboard-overview/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/dashboard-overview/components/`:

- `DashboardOverview` — Main dashboard component with metrics, charts, and activity lists

### Data Layer

The components expect these data shapes:

- `Company[]` — List of companies
- `Account[]` — List of accounts
- `Invoice[]` — List of invoices
- `Payment[]` — List of payments
- `KeyMetrics` — Aggregated metrics object
- `PaymentTrend[]` — Month-over-month payment data
- `MonthlyComparison` — Daily payment comparison data

You'll need to:
- Create API endpoints to fetch companies, accounts, invoices, and payments
- Calculate key metrics (active accounts count, upcoming invoices count, total monthly spend, uncleared payments count)
- Aggregate payment data by month for trends
- Calculate daily payment breakdowns for monthly comparison
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onViewInvoice` — Navigate to invoice details page when user clicks on upcoming invoice
- `onViewPayment` — Navigate to payment details page when user clicks on recent payment
- `onAddPayment` — Navigate to payment creation form when user clicks "Add Payment" button
- `onAddInvoice` — Navigate to invoice creation form when user clicks "Add Invoice" button

### Empty States

Implement empty state UI for when no records exist yet:

- **No data yet:** Show helpful messages in Upcoming Payments and Recent Activity sections when arrays are empty
- **No upcoming invoices:** Show "No upcoming payments" message
- **No recent payments:** Show "No recent payments" message

## Files to Reference

- `product-plan/sections/dashboard-overview/README.md` — Feature overview and design intent
- `product-plan/sections/dashboard-overview/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/dashboard-overview/components/` — React components
- `product-plan/sections/dashboard-overview/types.ts` — TypeScript interfaces
- `product-plan/sections/dashboard-overview/sample-data.json` — Test data
- `product-plan/sections/dashboard-overview/screenshot.png` — Visual reference

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly when no records exist
- [ ] All user actions work
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 4: Company Management

## Goal

Implement the Company Management feature — create and manage companies (vendors, clients, service providers) with profiles and contact information.

## Overview

Company Management allows users to create, view, edit, and delete companies. Users can search and filter the company list, view detailed company information, and see all accounts associated with each company.

**Key Functionality:**
- View company list with search and status filtering
- Create new company via modal form
- View company details with associated accounts
- Edit company information
- Delete company (with warning if accounts exist)
- Navigate to account details from company page

## Recommended Approach: Test-Driven Development

See `product-plan/sections/company-management/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/company-management/components/`:

- `CompanyList` — List view with search and filtering
- `CompanyCard` — Individual company card component
- `CompanyDetails` — Detail view with account list

### Data Layer

The components expect:
- `Company[]` — List of companies with name, URL, notes, status, logo, accounts

You'll need to:
- Create API endpoints for CRUD operations on companies
- Handle logo uploads (if implementing file storage)
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onCreate` — Open create modal/form
- `onView` — Navigate to company details page
- `onEdit` — Open edit modal/form with pre-filled data
- `onDelete` — Delete company (with confirmation if accounts exist)
- `onViewAccount` — Navigate to account details page

### Empty States

Implement empty state UI for when no companies exist yet:

- **No companies yet:** Show helpful message and "Add Company" button

## Files to Reference

- `product-plan/sections/company-management/README.md` — Feature overview
- `product-plan/sections/company-management/tests.md` — Test-writing instructions
- `product-plan/sections/company-management/components/` — React components
- `product-plan/sections/company-management/types.ts` — TypeScript interfaces
- `product-plan/sections/company-management/sample-data.json` — Test data
- `product-plan/sections/company-management/screenshot.png` — Visual reference

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] All user actions work
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 5: Accounts & Invoices

## Goal

Implement the Accounts & Invoices feature — track financial accounts and manage invoices with flexible scheduling and payment status.

## Overview

The Accounts & Invoices section allows users to track financial accounts (checking, savings, credit cards, loans) and manage invoices. Users can view all accounts in a filterable card-based list, drill into detailed account information with contact and address details, create and attach invoices to accounts, and monitor payment activity through a 12-month payment history chart.

**Key Functionality:**
- Browse accounts with filtering by type/status/company and search
- View account details with balance, interest rate, contact info, and invoices
- Create and manage accounts (add, edit, delete, toggle active/inactive)
- Add invoices and associate them with specific accounts
- Monitor payments through 12-month payment history chart

## Recommended Approach: Test-Driven Development

See `product-plan/sections/accounts-invoices/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/accounts-invoices/components/`:

- `AccountList` — List view with filtering and search
- `AccountCard` — Individual account card component
- `AccountDetails` — Detail view with invoice list and payment chart
- `InvoiceList` — List of invoices for an account
- `PaymentChart` — 12-month payment history visualization

### Data Layer

The components expect:
- `Account[]` — List of accounts with company info, account details, contact info, address info
- `Invoice[]` — List of invoices for an account
- `Payment[]` — Payment history for chart

You'll need to:
- Create API endpoints for accounts and invoices
- Handle account creation, editing, deletion
- Handle invoice creation and association with accounts
- Aggregate payment data for 12-month chart
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onView` — Navigate to account details
- `onEdit` — Open edit form
- `onDelete` — Delete account
- `onToggleStatus` — Toggle active/inactive status
- `onCreate` — Open create account form
- `onCreateInvoice` — Open create invoice form
- `onViewInvoice` — Navigate to invoice details

### Empty States

Implement empty state UI:

- **No accounts yet:** Show helpful message and "Add Account" button
- **No invoices for account:** Show message in invoice list section

## Files to Reference

- `product-plan/sections/accounts-invoices/README.md` — Feature overview
- `product-plan/sections/accounts-invoices/tests.md` — Test-writing instructions
- `product-plan/sections/accounts-invoices/components/` — React components
- `product-plan/sections/accounts-invoices/types.ts` — TypeScript interfaces
- `product-plan/sections/accounts-invoices/sample-data.json` — Test data
- `product-plan/sections/accounts-invoices/screenshot.png` — Visual reference

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] All user actions work
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 6: Payment Tracking

## Goal

Implement the Payment Tracking feature — record and monitor all payments with detailed breakdowns and comprehensive history.

## Overview

Payment Tracking allows users to view and manage their complete payment history. Users can filter, search, and update payment records, with uncleared and cleared payments organized for easy visibility.

**Key Functionality:**
- View paginated list of all payments (uncleared first, then cleared)
- Toggle show/hide cleared payments
- Search and filter by company, account, date range, amount range
- View payment details in modal
- Edit payment details (date, company, account, amount, cleared status, notes, payment method)
- Mark payments as cleared/uncleared
- Navigate to related account or company

## Recommended Approach: Test-Driven Development

See `product-plan/sections/payment-tracking/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/payment-tracking/components/`:

- `PaymentList` — Main list view with pagination
- `PaymentRow` — Individual payment row component
- `PaymentModal` — Modal for viewing/editing payment details
- `FilterBar` — Filter controls component

### Data Layer

The components expect:
- `Payment[]` — List of payments with date, company, account, amount, cleared status, notes, payment method

You'll need to:
- Create API endpoints for payments
- Handle payment creation, editing, deletion
- Handle cleared status toggling
- Implement pagination
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onEdit` — Open edit modal with payment data
- `onToggleCleared` — Toggle cleared status
- `onViewCompany` — Navigate to company details
- `onViewAccount` — Navigate to account details

### Empty States

Implement empty state UI:

- **No payments yet:** Show helpful message

## Files to Reference

- `product-plan/sections/payment-tracking/README.md` — Feature overview
- `product-plan/sections/payment-tracking/tests.md` — Test-writing instructions
- `product-plan/sections/payment-tracking/components/` — React components
- `product-plan/sections/payment-tracking/types.ts` — TypeScript interfaces
- `product-plan/sections/payment-tracking/sample-data.json` — Test data
- `product-plan/sections/payment-tracking/screenshot.png` — Visual reference

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] All user actions work
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 7: Insights & Planning

## Goal

Implement the Insights & Planning feature — budget planning, transaction history, watchlists, and analytics for proactive financial management.

## Overview

Insights & Planning provides financial analytics and budget management tools. Users can visualize spending patterns across custom categories and payment methods, track budget progress, and monitor upcoming invoices to stay ahead of obligations.

**Key Functionality:**
- Select time range (30, 60, or 90 days) to view spending analytics
- View spending breakdowns by payment method and custom categories via multiple visualization types
- Create and manage per-category budgets
- Track budget progress comparing actual spending to budgeted amounts
- Review upcoming invoices with due dates, company names, account names, amounts, and days until due

## Recommended Approach: Test-Driven Development

See `product-plan/sections/insights-planning/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/insights-planning/components/`:

- `InsightsDashboard` — Main dashboard component
- `MetricsOverview` — Summary cards with key metrics
- `SpendingCharts` — Category and payment method visualizations
- `BudgetManager` — Budget creation and management
- `UpcomingInvoicesList` — List of upcoming invoices with countdown
- Additional chart components (CategoryDonutChart, CategoryBarChart, PaymentMethodChart, TrendLineChart)

### Data Layer

The components expect:
- `SpendingCategory[]` — Custom spending categories
- `Budget[]` — Per-category budgets
- `PeriodData` — Spending data for 30/60/90 day periods
- `UpcomingInvoice[]` — List of upcoming invoices

You'll need to:
- Create API endpoints for budgets and categories
- Calculate spending breakdowns by category and payment method
- Aggregate spending data for different time periods
- Calculate budget progress (actual vs. budgeted)
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onCreateBudget` — Create new budget
- `onEditBudget` — Edit existing budget
- `onDeleteBudget` — Delete budget
- `onViewInvoice` — Navigate to invoice details
- `onCreateCategory` — Create new spending category
- `onEditCategory` — Edit spending category

### Empty States

Implement empty state UI:

- **No budgets yet:** Show helpful message and "Create Budget" button
- **No categories yet:** Show message in category section

## Files to Reference

- `product-plan/sections/insights-planning/README.md` — Feature overview
- `product-plan/sections/insights-planning/tests.md` — Test-writing instructions
- `product-plan/sections/insights-planning/components/` — React components
- `product-plan/sections/insights-planning/types.ts` — TypeScript interfaces
- `product-plan/sections/insights-planning/sample-data.json` — Test data
- `product-plan/sections/insights-planning/screenshot.png` — Visual reference

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] All user actions work
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 8: Settings

## Goal

Implement the Settings feature — user preferences, financial configuration, integration setup, and database connection management for the open-source application.

## Overview

Comprehensive settings page with two tabs for organizing user preferences and system configuration. The Profile tab manages personal settings (email, password, appearance), while the Integrations tab handles third-party service connections (databases, analytics, and identity providers).

**Key Functionality:**
- Switch between Profile and Integrations tabs
- Update email address and password
- Configure app appearance (theme, language, display density)
- Add, edit, test, enable/disable, and delete integrations
- Manage database, analytics, and identity provider integrations

## Recommended Approach: Test-Driven Development

See `product-plan/sections/settings/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/settings/components/`:

- `Settings` — Main settings component with tabs
- `UserSettingsSection` — Email and password update forms
- `AppearanceSection` — Theme, language, display density controls
- `IntegrationsSection` — Integration management with grouping
- `IntegrationCard` — Individual integration card with actions

### Data Layer

The components expect:
- `User` — User information
- `AppearanceSettings` — Appearance preferences
- `Integration[]` — List of integrations with type-specific configs

You'll need to:
- Create API endpoints for user settings
- Create API endpoints for integrations
- Handle integration connection testing
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onUpdateEmail` — Update user email
- `onUpdatePassword` — Update user password
- `onUpdateAppearance` — Update appearance settings
- `onAddIntegration` — Add new integration
- `onEditIntegration` — Edit integration
- `onTestIntegration` — Test integration connection
- `onToggleIntegration` — Enable/disable integration
- `onDeleteIntegration` — Delete integration

### Empty States

Implement empty state UI:

- **No integrations of a type:** Show helpful message and "Add Integration" button

## Files to Reference

- `product-plan/sections/settings/README.md` — Feature overview
- `product-plan/sections/settings/tests.md` — Test-writing instructions
- `product-plan/sections/settings/components/` — React components
- `product-plan/sections/settings/types.ts` — TypeScript interfaces
- `product-plan/sections/settings/sample-data.json` — Test data
- `product-plan/sections/settings/screenshot.png` — Visual reference

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] All user actions work
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 9: Initial Setup

## Goal

Implement the Initial Setup feature — multi-step wizard for first-time users to configure their Fiscal Guru instance with database, identity provider, and analytics integrations.

## Overview

A multi-step wizard for first-time users to configure their Fiscal Guru instance. Users configure database (required), identity provider (optional), and analytics (optional) integrations with guidance and warnings about requirements. After completion, users are redirected to the Dashboard to begin using the application.

**Key Functionality:**
- Navigate through multi-step wizard (Database → Identity Provider → Analytics → Review)
- Configure database integration (required, with warning banner)
- Optionally configure identity provider integration (can skip)
- Optionally configure analytics integration (can skip)
- Review configured integrations summary
- Complete setup and redirect to Dashboard

## Recommended Approach: Test-Driven Development

See `product-plan/sections/initial-setup/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/initial-setup/components/`:

- `InitialSetup` — Main wizard component
- `StepIndicator` — Progress indicator component
- `DatabaseStep` — Database configuration step
- `IdentityProviderStep` — Identity provider configuration step
- `AnalyticsStep` — Analytics configuration step
- `SummaryStep` — Final review step
- `WarningDialog` — Warning dialog for database requirement

### Data Layer

The components expect:
- `SetupState` — Current step and completion status
- `DatabaseConfig` — Database configuration
- `IdentityProviderConfig` — Identity provider configuration (optional)
- `AnalyticsConfig` — Analytics configuration (optional)
- `SetupSummary` — Summary of all configured integrations

You'll need to:
- Create API endpoints for saving setup configuration
- Handle database connection testing
- Handle integration configuration validation
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onNext` — Advance to next step
- `onBack` — Go to previous step
- `onSkip` — Skip optional step
- `onUpdateDatabase` — Update database configuration
- `onUpdateIdentityProvider` — Update identity provider configuration
- `onUpdateAnalytics` — Update analytics configuration
- `onTestDatabase` — Test database connection
- `onComplete` — Complete setup and redirect

### Empty States

The wizard handles empty/unconfigured states:
- **Not configured integrations:** Show "Not configured" in summary

## Files to Reference

- `product-plan/sections/initial-setup/README.md` — Feature overview
- `product-plan/sections/initial-setup/tests.md` — Test-writing instructions
- `product-plan/sections/initial-setup/components/` — React components
- `product-plan/sections/initial-setup/types.ts` — TypeScript interfaces
- `product-plan/sections/initial-setup/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render correctly
- [ ] Wizard navigation works
- [ ] Database configuration is validated
- [ ] Optional steps can be skipped
- [ ] Summary shows correct configuration status
- [ ] Setup completion redirects to Dashboard
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

## Implementation Complete

Once all milestones are complete, you should have a fully functional Fiscal Guru application with:

- ✅ Design tokens configured
- ✅ Data model types defined
- ✅ Application shell with navigation
- ✅ Dashboard with metrics and visualizations
- ✅ Company management
- ✅ Accounts & invoices tracking
- ✅ Payment tracking and history
- ✅ Insights & planning with budgets
- ✅ Settings and integrations
- ✅ Initial setup wizard

All components are props-based and portable, ready to integrate with your backend and data layer.

