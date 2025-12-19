# Payment Tracking Specification

## Overview
Payment Tracking allows users to view and manage their complete payment history. Users can filter, search, and update payment records, with uncleared and cleared payments organized for easy visibility.

## User Flows
- View paginated list of all payments sorted with uncleared payments first (oldest first), followed by cleared payments (newest first)
- Toggle show/hide cleared payments
- Search and filter payments by company name, account name, date range, or amount range
- Click on a payment to open a modal displaying full payment details
- Edit payment details (date, company, account, amount, cleared status, notes, payment method) within the modal
- Mark payments as cleared or uncleared directly from the list or modal
- Optionally navigate to related account or company from payment details

## UI Requirements
- Main view displays a table with columns: Date, Company name, Account name, Amount, Cleared status
- Pagination controls for navigating through payment history
- Filter controls: show/hide cleared toggle, search/filter fields for company name, account name, date range, amount range
- Payment detail modal shows all list fields plus: Notes/description, Payment method
- Modal provides edit functionality for all payment fields
- Optional: Clickable links to navigate to related account or company from modal

## Out of Scope
- Creating new companies (handled in Company Management)
- Creating new accounts (handled in Accounts & Invoices)
- Bulk import/export functionality
- Payment scheduling (handled in Accounts & Invoices)

## Configuration
- shell: true
