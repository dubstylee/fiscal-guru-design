# Dashboard & Overview

## Overview

A central financial health view that provides at-a-glance metrics, payment trends visualization over the last 6 months, upcoming payment alerts, and recent activity tracking. Users can quickly assess their financial status and take common actions without navigating to other sections.

## User Flows

- View key financial metrics (Active Accounts, Upcoming Invoices, Total Monthly Spend, Uncleared Payments)
- View payment trends chart showing month-over-month data for the last 6 months
- Browse upcoming payments and click to view invoice details
- Browse recent payment activity and click to view payment details
- Add new payment via quick action button
- Add new invoice via quick action button

## Design Decisions

- Uses recharts library for data visualization (BarChart, ComposedChart)
- Color-coded urgency indicators for upcoming invoices (overdue, urgent, soon, normal)
- Two-column layout on desktop for upcoming payments and recent activity
- Quick action buttons prominently placed in header for common tasks

## Data Used

**Entities:**
- Company
- Account
- Invoice
- Payment
- KeyMetrics (aggregated)
- PaymentTrend (monthly aggregates)
- MonthlyComparison (daily breakdowns)

**From global model:**
- Company, Account, Invoice, Payment

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `DashboardOverview` — Main dashboard component with metrics, charts, and activity lists

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewInvoice` | Called when user clicks on an upcoming invoice to view details |
| `onViewPayment` | Called when user clicks on a recent payment to view details |
| `onAddPayment` | Called when user clicks the "Add Payment" quick action button |
| `onAddInvoice` | Called when user clicks the "Add Invoice" quick action button |

