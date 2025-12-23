# Insights & Planning

## Overview

Insights & Planning provides financial analytics and budget management tools. Users can visualize spending patterns across custom categories and payment methods, track budget progress, and monitor upcoming invoices to stay ahead of obligations.

## User Flows

- Select time range (30, 60, or 90 days) to view spending analytics
- View spending breakdowns by payment method and custom categories via multiple visualization types
- Create and manage per-category budgets
- Track budget progress comparing actual spending to budgeted amounts
- Review upcoming invoices with due dates, company names, account names, amounts, and days until due

## Design Decisions

- Multiple chart types (pie/donut, bar, line/trend) for different data views
- Time range selector for flexible analysis periods
- Budget progress indicators with visual progress bars
- Upcoming invoices list with countdown to due date

## Data Used

**Entities:**
- SpendingCategory
- Budget
- CategoryBreakdown
- PaymentMethodBreakdown
- DailyTrend
- PeriodData
- UpcomingInvoice

**From global model:**
- Payment, Invoice (for spending calculations)

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `InsightsDashboard` — Main dashboard component
- `MetricsOverview` — Summary cards with key metrics
- `SpendingCharts` — Category and payment method visualizations
- `BudgetManager` — Budget creation and management
- `UpcomingInvoicesList` — List of upcoming invoices with countdown
- `CategoryDonutChart` — Pie/donut chart for category breakdown
- `CategoryBarChart` — Bar chart for category comparison
- `PaymentMethodChart` — Payment method breakdown
- `TrendLineChart` — Daily spending trend over time

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreateBudget` | Called when user creates a new budget |
| `onEditBudget` | Called when user edits an existing budget |
| `onDeleteBudget` | Called when user deletes a budget |
| `onViewInvoice` | Called when user clicks on an upcoming invoice |
| `onCreateCategory` | Called when user creates a new spending category |
| `onEditCategory` | Called when user edits a spending category |

