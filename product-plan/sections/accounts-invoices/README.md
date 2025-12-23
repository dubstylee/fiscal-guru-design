# Accounts & Invoices

## Overview

The Accounts & Invoices section allows users to track financial accounts (checking, savings, credit cards, loans) and manage invoices. Users can view all accounts in a filterable card-based list, drill into detailed account information with contact and address details, create and attach invoices to accounts, and monitor payment activity through a 12-month payment history chart.

## User Flows

- Browse accounts with filtering by type/status/company and search
- View account details with balance, interest rate, contact info, and invoices
- Create and manage accounts (add, edit, delete, toggle active/inactive)
- Add invoices and associate them with specific accounts
- Monitor payments through 12-month payment history chart

## Design Decisions

- Card-based layout for account list
- Logo display hierarchy: account logo → company logo → fallback initials
- 12-month payment history chart using recharts
- Compact invoice list on account details page

## Data Used

**Entities:**
- Account
- Invoice
- Payment
- Company (for company name/logo)

**From global model:**
- Account, Invoice, Payment, Company

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `AccountList` — List view with filtering and search
- `AccountCard` — Individual account card component
- `AccountDetails` — Detail view with invoice list and payment chart
- `InvoiceList` — List of invoices for an account
- `PaymentChart` — 12-month payment history visualization

## Callback Props

| Callback | Description |
|----------|-------------|
| `onView` | Called when user clicks on an account card |
| `onEdit` | Called when user clicks "Edit" button |
| `onDelete` | Called when user clicks "Delete" button |
| `onToggleStatus` | Called when user toggles active/inactive status |
| `onCreate` | Called when user clicks "Add Account" button |
| `onCreateInvoice` | Called when user clicks "Add Invoice" button |
| `onViewInvoice` | Called when user clicks on an invoice |

