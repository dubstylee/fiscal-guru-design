# Dashboard & Overview Specification

## Overview
A central financial health view that provides at-a-glance metrics, payment trends visualization over the last 6 months, upcoming payment alerts, and recent activity tracking. Users can quickly assess their financial status and take common actions without navigating to other sections.

## User Flows
- View key financial metrics (Active Accounts, Upcoming Invoices, Total Monthly Spend, Uncleared Payments)
- View payment trends chart showing month-over-month data for the last 6 months
- Browse upcoming payments and click to view invoice details
- Browse recent payment activity and click to view payment details
- Add new payment via quick action button
- Add new invoice via quick action button

## UI Requirements
- Key Metrics section with 4 metric cards displaying Active Accounts, Upcoming Invoices, Total Monthly Spend, and Number of Uncleared Payments
- Payment Trends chart (line or bar chart) showing month-over-month payment data for the last 6 months
- Upcoming Payments section displaying a list/table with company name, due date, amount, and status indicator (color-coded for urgency)
- Recent Activity section showing recent payments made
- All items in Upcoming Payments and Recent Activity are clickable and navigate to detail views
- Quick action buttons prominently placed: "Add Payment" and "Add Invoice"
- Mobile responsive layout with stacked sections on smaller screens

## Configuration
- shell: true
