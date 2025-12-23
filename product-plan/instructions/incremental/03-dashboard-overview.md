# Milestone 3: Dashboard & Overview

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-2 complete

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

See `product-plan/sections/dashboard-overview/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

The test instructions are framework-agnostic — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

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

The provided components include empty state designs — make sure to render them when data is empty rather than showing blank screens.

## Files to Reference

- `product-plan/sections/dashboard-overview/README.md` — Feature overview and design intent
- `product-plan/sections/dashboard-overview/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/dashboard-overview/components/` — React components
- `product-plan/sections/dashboard-overview/types.ts` — TypeScript interfaces
- `product-plan/sections/dashboard-overview/sample-data.json` — Test data
- `product-plan/sections/dashboard-overview/screenshot.png` — Visual reference

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: View Financial Overview

1. User navigates to Dashboard
2. User sees key metrics, payment trends, upcoming payments, and recent activity
3. **Outcome:** User has comprehensive view of financial status at a glance

### Flow 2: View Invoice Details

1. User clicks on an upcoming invoice in the "Upcoming Payments" section
2. **Outcome:** User is navigated to invoice details page

### Flow 3: View Payment Details

1. User clicks on a recent payment in the "Recent Activity" section
2. **Outcome:** User is navigated to payment details page

### Flow 4: Add Payment via Quick Action

1. User clicks "Add Payment" button in header
2. **Outcome:** User is navigated to payment creation form

### Flow 5: Add Invoice via Quick Action

1. User clicks "Add Invoice" button in header
2. **Outcome:** User is navigated to invoice creation form

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly when no records exist
- [ ] All user actions work (view invoice, view payment, add payment, add invoice)
- [ ] User can complete all expected flows end-to-end
- [ ] Matches the visual design
- [ ] Responsive on mobile

