# Company Management Specification

## Overview
Company Management allows users to create, view, edit, and delete companies (vendors, clients, service providers). Users can search and filter the company list, view detailed company information, and see all accounts associated with each company.

## User Flows
- **View company list**: User sees all companies displayed as cards with logo/initials and name. Can search by name or filter by status (Active/Inactive).
- **Create new company**: User clicks "Add Company" button, opens a modal form to enter company name, URL, notes, status, and upload logo. Defaults to company initials if no logo provided.
- **View company details**: User clicks on a company card to navigate to the details page showing company name, logo/initials, URL, notes, status, and list of associated accounts.
- **Edit company**: User clicks "Edit" button on details page, opens the same modal form (pre-filled) to update company information.
- **Delete company**: User clicks "Delete" button on details page. If accounts are associated, shows warning and requires confirmation before deleting.
- **Navigate to account**: User clicks on an account in the associated accounts list to navigate to the account details page.

## UI Requirements
- Company list page with card layout displaying logo/initials and company name
- Search box to filter by company name
- Filter dropdown for status (Active/Inactive, show all)
- "Add Company" button to open create modal
- Company details page showing all company information
- Edit and Delete buttons on details page
- Associated accounts list on details page with clickable links to account details
- Modal form for create/edit with fields: company name, URL, notes, status toggle, logo upload
- Company initials avatar when no logo is available
- Delete confirmation dialog with warning if accounts exist

## Configuration
- shell: true
