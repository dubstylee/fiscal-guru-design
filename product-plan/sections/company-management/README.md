# Company Management

## Overview

Company Management allows users to create, view, edit, and delete companies (vendors, clients, service providers). Users can search and filter the company list, view detailed company information, and see all accounts associated with each company.

## User Flows

- View company list with search and status filtering
- Create new company via modal form
- View company details with associated accounts
- Edit company information
- Delete company (with warning if accounts exist)
- Navigate to account details from company page

## Design Decisions

- Card-based layout for company list
- Company initials avatar when no logo is available
- Search and filter controls in header
- Delete confirmation with warning for companies with accounts

## Data Used

**Entities:**
- Company
- Account (for associated accounts list)

**From global model:**
- Company, Account

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `CompanyList` — List view with search and filtering
- `CompanyCard` — Individual company card component
- `CompanyDetails` — Detail view with account list

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreate` | Called when user clicks "Add Company" button |
| `onView` | Called when user clicks on a company card |
| `onEdit` | Called when user clicks "Edit" button on details page |
| `onDelete` | Called when user clicks "Delete" button |
| `onViewAccount` | Called when user clicks on an account in the associated accounts list |

