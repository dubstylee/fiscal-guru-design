# Payment Tracking

## Overview

Payment Tracking allows users to view and manage their complete payment history. Users can filter, search, and update payment records, with uncleared and cleared payments organized for easy visibility.

## User Flows

- View paginated list of all payments (uncleared first, then cleared)
- Toggle show/hide cleared payments
- Search and filter by company, account, date range, amount range
- View payment details in modal
- Edit payment details (date, company, account, amount, cleared status, notes, payment method)
- Mark payments as cleared/uncleared
- Navigate to related account or company

## Design Decisions

- Table layout for payment list
- Modal for payment details and editing
- Pagination for large payment histories
- Filter bar with multiple filter options
- Uncleared payments shown first (oldest first), cleared payments shown last (newest first)

## Data Used

**Entities:**
- Payment
- Company (for company name)
- Account (for account name)

**From global model:**
- Payment, Company, Account

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `PaymentList` — Main list view with pagination
- `PaymentRow` — Individual payment row component
- `PaymentModal` — Modal for viewing/editing payment details
- `FilterBar` — Filter controls component

## Callback Props

| Callback | Description |
|----------|-------------|
| `onEdit` | Called when user clicks to edit a payment |
| `onToggleCleared` | Called when user toggles cleared status |
| `onViewCompany` | Called when user clicks to view related company |
| `onViewAccount` | Called when user clicks to view related account |

