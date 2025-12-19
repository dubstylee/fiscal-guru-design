# Insights & Planning Specification

## Overview
Insights & Planning provides financial analytics and budget management tools. Users can visualize spending patterns across custom categories and payment methods, track budget progress, and monitor upcoming invoices to stay ahead of obligations.

## User Flows
- Select time range (30, 60, or 90 days) to view spending analytics
- View spending breakdowns by payment method and custom categories via multiple visualization types
- Create and manage per-category budgets
- Track budget progress comparing actual spending to budgeted amounts
- Review upcoming invoices with due dates, company names, account names, amounts, and days until due

## UI Requirements
- Time range selector for 30/60/90 day views
- Summary cards showing key metrics (total spent, average per day, number of transactions)
- Pie/donut charts for spending breakdown by category as percentages
- Bar charts comparing spending across categories
- Line/trend charts showing spending patterns over time
- Budget creation and editing interface for custom spending categories
- Budget progress indicators showing actual vs. budgeted amounts with visual progress bars
- Upcoming invoices list displaying: due date, company name, account name, amount, and countdown to due date
- Ability to filter and sort upcoming invoices

## Out of Scope
- Creating payments (handled in Payment Tracking)
- Creating invoices (handled in Accounts & Invoices)
- Editing companies (handled in Company Management)
- Exporting reports

## Configuration
- shell: true
