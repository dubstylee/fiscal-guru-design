# Fiscal Guru — Product Overview

## Summary

Fiscal Guru is a modern financial management platform that helps small business owners, freelancers, and financially conscious individuals manage their companies, accounts, invoices, and payments through an intuitive dashboard with real-time insights and automated tracking.

## Planned Sections

1. **Dashboard & Overview** — Central financial health view with at-a-glance metrics, upcoming payments, and timeline visualizations.
2. **Company Management** — Create and manage companies (vendors, clients, service providers) with profiles and contact information.
3. **Accounts & Invoices** — Track financial accounts and manage invoices with flexible scheduling and payment status.
4. **Payment Tracking** — Record and monitor all payments with detailed breakdowns and comprehensive history.
5. **Insights & Planning** — Budget planning, transaction history, watchlists, and analytics for proactive financial management.
6. **Settings** — User preferences, financial configuration, integration setup, and database connection management for the open-source application.
7. **Initial Setup** — A multi-step wizard for first-time users to configure their Fiscal Guru instance with database, identity provider, and analytics integrations.

## Data Model

**Core Entities:**
- **Company** — A vendor, client, or service provider that the user does business with (includes profile info, logos, contact details).
- **Account** — A financial account belonging to a Company (checking, credit card, loan, etc.) with balance and account details.
- **InvoiceTemplate** — A recurring invoice pattern that defines schedule, amount, and frequency (e.g., "Netflix - $15.99/month").
- **Invoice** — An individual bill or payment obligation with a specific due date and amount (either one-time or generated from a template).
- **Payment** — A transaction record showing money paid toward an invoice with date, amount breakdown, and clearing status.

**Relationships:**
- Company has many Accounts
- Account has many Invoices
- Account has many InvoiceTemplates
- Invoice belongs to an Account
- Invoice optionally belongs to an InvoiceTemplate (for recurring invoices)
- InvoiceTemplate generates many Invoices
- Invoice has many Payments
- Payment belongs to an Invoice

## Design System

**Colors:**
- Primary: `slate` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, secondary elements
- Neutral: `stone` — Used for backgrounds, text, borders

**Typography:**
- Heading: `Inter` — Google Fonts
- Body: `Inter` — Google Fonts
- Mono: `IBM Plex Mono` — Google Fonts

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens and data model types
2. **Shell** — Implement the application shell and navigation
3. **Dashboard & Overview** — Central financial health view with metrics and visualizations
4. **Company Management** — Create and manage companies with profiles
5. **Accounts & Invoices** — Track financial accounts and manage invoices
6. **Payment Tracking** — Record and monitor all payments
7. **Insights & Planning** — Budget planning and financial analytics
8. **Settings** — User preferences and integration configuration
9. **Initial Setup** — Multi-step wizard for first-time configuration

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

