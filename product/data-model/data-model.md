# Data Model

## Entities

### Company
A vendor, client, or service provider that the user does business with (includes profile info, logos, contact details).

### Account
A financial account belonging to a Company (checking, credit card, loan, etc.) with balance and account details.

### InvoiceTemplate
A recurring invoice pattern that defines schedule, amount, and frequency (e.g., "Netflix - $15.99/month").

### Invoice
An individual bill or payment obligation with a specific due date and amount (either one-time or generated from a template).

### Payment
A transaction record showing money paid toward an invoice with date, amount breakdown, and clearing status.

## Relationships

- Company has many Accounts
- Account has many Invoices
- Account has many InvoiceTemplates
- Invoice belongs to an Account
- Invoice optionally belongs to an InvoiceTemplate (for recurring invoices)
- InvoiceTemplate generates many Invoices
- Invoice has many Payments
- Payment belongs to an Invoice
