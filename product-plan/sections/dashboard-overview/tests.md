# Test Instructions: Dashboard & Overview

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Dashboard & Overview section displays key financial metrics, payment trends, upcoming invoices, and recent payment activity. Users can quickly assess their financial health and take common actions.

---

## User Flow Tests

### Flow 1: View Financial Overview

**Scenario:** User navigates to dashboard to see their financial status

#### Success Path

**Setup:**
- User has companies, accounts, invoices, and payments configured
- Sample data includes active accounts, upcoming invoices, recent payments

**Steps:**
1. User navigates to `/` or `/dashboard`
2. User sees dashboard page with header "Dashboard"

**Expected Results:**
- [ ] Key metrics section displays 4 metric cards:
  - [ ] "Active Accounts" card shows correct count
  - [ ] "Upcoming Invoices" card shows correct count
  - [ ] "Monthly Spend" card shows formatted currency (e.g., "$1,234.56")
  - [ ] "Uncleared Payments" card shows correct count
- [ ] Payment Trends chart displays with 6 months of data
- [ ] Monthly Comparison chart displays with previous and current month data
- [ ] Upcoming Payments section shows list of invoices (upcoming or overdue status)
- [ ] Recent Activity section shows list of recent payments
- [ ] Quick action buttons "Add Payment" and "Add Invoice" are visible in header

#### Empty State: No Data Yet

**Setup:**
- User has no companies, accounts, invoices, or payments yet
- All data arrays are empty (`[]`)

**Expected Results:**
- [ ] Key metrics show zeros or "0"
- [ ] Charts render with empty data (no errors)
- [ ] Upcoming Payments section shows "No upcoming payments" message
- [ ] Recent Activity section shows "No recent payments" message
- [ ] Quick action buttons are still visible and functional

---

### Flow 2: View Invoice Details

**Scenario:** User clicks on an upcoming invoice to view details

**Steps:**
1. User sees an invoice in the "Upcoming Payments" section
2. User clicks on the invoice row

**Expected Results:**
- [ ] `onViewInvoice` callback is called with the invoice ID
- [ ] User is navigated to invoice details page (handled by routing)

---

### Flow 3: View Payment Details

**Scenario:** User clicks on a recent payment to view details

**Steps:**
1. User sees a payment in the "Recent Activity" section
2. User clicks on the payment row

**Expected Results:**
- [ ] `onViewPayment` callback is called with the payment ID
- [ ] User is navigated to payment details page (handled by routing)

---

### Flow 4: Add Payment via Quick Action

**Scenario:** User clicks "Add Payment" button from dashboard

**Steps:**
1. User clicks "Add Payment" button in header

**Expected Results:**
- [ ] `onAddPayment` callback is called
- [ ] User is navigated to payment creation form/modal (handled by routing)

---

### Flow 5: Add Invoice via Quick Action

**Scenario:** User clicks "Add Invoice" button from dashboard

**Steps:**
1. User clicks "Add Invoice" button in header

**Expected Results:**
- [ ] `onAddInvoice` callback is called
- [ ] User is navigated to invoice creation form/modal (handled by routing)

---

## Component Interaction Tests

### DashboardOverview Component

**Renders correctly:**
- [ ] Displays all 4 key metric cards with correct values
- [ ] Payment Trends chart renders with 6 months of data
- [ ] Monthly Comparison chart renders with both months' data
- [ ] Upcoming invoices are sorted by due date (earliest first)
- [ ] Recent payments are sorted by payment date (newest first)
- [ ] Currency amounts are formatted correctly (e.g., "$1,234.56")
- [ ] Dates are formatted correctly (e.g., "Dec 12, 2025")

**Urgency indicators:**
- [ ] Overdue invoices show "Overdue" badge (red)
- [ ] Invoices due within 3 days show "Due Soon" badge (amber)
- [ ] Invoices due within 7 days show "Due Soon" badge (amber)
- [ ] Other invoices show no badge

**Payment status indicators:**
- [ ] Cleared payments show green checkmark icon
- [ ] Uncleared payments show clock icon
- [ ] Status text shows "Cleared" or "Pending"

**Loading and error states:**
- [ ] Shows loading state while data is fetching
- [ ] Shows error message when data fails to load

---

## Edge Cases

- [ ] Handles very long company names with text truncation
- [ ] Works correctly with 1 invoice and 100+ invoices
- [ ] Works correctly with 1 payment and 100+ payments
- [ ] Charts handle zero values correctly
- [ ] Charts handle missing months in trend data
- [ ] Currency formatting works for very large amounts (e.g., $1,000,000)
- [ ] Currency formatting works for zero amounts
- [ ] Date formatting handles edge cases (leap years, month boundaries)

---

## Accessibility Checks

- [ ] All interactive elements are keyboard accessible
- [ ] Chart tooltips are accessible
- [ ] Color-coded urgency indicators have text labels
- [ ] Focus is managed appropriately after actions

---

## Sample Test Data

Use the data from `sample-data.json` or create variations:

```typescript
// Example test data - populated state
const mockKeyMetrics = {
  activeAccounts: 5,
  upcomingInvoices: 3,
  totalMonthlySpend: 1234.56,
  unclearedPayments: 2
};

const mockPaymentTrends = [
  { month: "2024-07", monthLabel: "Jul 2024", total: 5000 },
  { month: "2024-08", monthLabel: "Aug 2024", total: 5500 },
  // ... more months
];

const mockUpcomingInvoice = {
  id: "inv-001",
  accountId: "acc-001",
  companyName: "Netflix",
  invoiceNumber: "INV-2024-001",
  amount: 15.99,
  dueDate: "2024-12-20",
  status: "upcoming" as const,
  description: "Monthly subscription"
};

// Example test data - empty states
const mockEmptyMetrics = {
  activeAccounts: 0,
  upcomingInvoices: 0,
  totalMonthlySpend: 0,
  unclearedPayments: 0
};

const mockEmptyArrays = {
  companies: [],
  accounts: [],
  invoices: [],
  payments: []
};
```

---

## Notes for Test Implementation

- Mock API calls to test both success and failure scenarios
- Test each callback prop is called with correct arguments
- Verify UI updates when data changes
- Test that loading states appear during async operations
- Ensure error boundaries catch and display errors gracefully
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears (not blank screens)
- Test transitions: empty → first item created, last item deleted → empty state returns

