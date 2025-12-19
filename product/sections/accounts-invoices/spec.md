# Accounts & Invoices Specification

## Overview
The Accounts & Invoices section allows users to track financial accounts (checking, savings, credit cards, loans) and manage invoices. Users can view all accounts in a filterable card-based list, drill into detailed account information with contact and address details, create and attach invoices to accounts, and monitor payment activity through a 12-month payment history chart.

## User Flows
- Browse accounts - View all accounts as cards, filter by type/status/company, search by name or number
- View account details - Click an account to see full details including balance, interest rate, contact info, and associated invoices
- Create and manage accounts - Add new accounts, edit existing account information, toggle active/inactive status, delete accounts
- Add invoices - Create new invoices and associate them with specific accounts
- Monitor payments - Review payment history through a 12-month chart showing invoice payments over time

## UI Requirements
- Account list displayed as cards with filtering options (type, status, company) and search
- Account details page showing: name, number, URL, type, status, interest rate, date opened, balance, notes, contact information, address information
- Logo display hierarchy: account logo → company logo → fallback
- Compact list of related invoices on account details page
- 12-month payment history chart showing invoice payments over time
- Action buttons for creating, editing, deleting accounts and marking them active/inactive
- Ability to create new invoices from the account details page

## Configuration
- shell: true
