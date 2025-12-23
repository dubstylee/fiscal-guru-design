# Test Instructions: Company Management

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Company Management section allows users to create, view, edit, and delete companies (vendors, clients, service providers). Users can search and filter companies, view detailed information, and see associated accounts.

---

## User Flow Tests

### Flow 1: Create a New Company

**Scenario:** User creates a new company via the modal form

#### Success Path

**Setup:**
- User is on the company list page
- No companies exist yet (or user wants to add another)

**Steps:**
1. User navigates to `/companies`
2. User sees company list page with "Add Company" button
3. User clicks "Add Company" button
4. Modal form opens
5. User enters company name (e.g., "Acme Corp")
6. User enters URL (e.g., "https://acme.com")
7. User enters notes (optional)
8. User sets status to "Active"
9. User clicks "Create" or "Save" button

**Expected Results:**
- [ ] Modal form opens when "Add Company" is clicked
- [ ] Form has fields: name, URL, notes, status toggle
- [ ] User can enter all required fields
- [ ] "Create" button is enabled when form is valid
- [ ] `onCreate` callback is called with company data
- [ ] Modal closes after successful creation
- [ ] New company appears in the list
- [ ] Success message appears (if implemented)

#### Failure Path: Validation Error

**Setup:**
- User attempts to create company with empty name

**Steps:**
1. User clicks "Add Company"
2. User leaves name field empty
3. User clicks "Create"

**Expected Results:**
- [ ] Form shows validation error: "Name is required"
- [ ] Form is not submitted
- [ ] Modal remains open

---

### Flow 2: View Company Details

**Scenario:** User clicks on a company card to view details

**Steps:**
1. User sees a company card in the list
2. User clicks on the company card

**Expected Results:**
- [ ] `onView` callback is called with company ID
- [ ] User is navigated to company details page
- [ ] Details page shows company name, logo/initials, URL, notes, status
- [ ] Associated accounts list is displayed (if any)
- [ ] "Edit" and "Delete" buttons are visible

---

### Flow 3: Edit an Existing Company

**Scenario:** User edits company information

**Steps:**
1. User is on company details page
2. User clicks "Edit" button
3. Modal form opens with pre-filled data
4. User modifies company name
5. User clicks "Save"

**Expected Results:**
- [ ] Modal opens with existing company data pre-filled
- [ ] User can modify all fields
- [ ] `onEdit` callback is called with updated data
- [ ] Changes are reflected on details page
- [ ] Success message appears

---

### Flow 4: Delete a Company

**Scenario:** User deletes a company

#### Success Path: Company with No Accounts

**Steps:**
1. User is on company details page
2. Company has no associated accounts
3. User clicks "Delete" button
4. User confirms deletion

**Expected Results:**
- [ ] Confirmation dialog appears
- [ ] `onDelete` callback is called with company ID
- [ ] Company is removed from list
- [ ] User is redirected to company list
- [ ] Success message appears

#### Failure Path: Company with Accounts

**Steps:**
1. User is on company details page
2. Company has associated accounts
3. User clicks "Delete" button

**Expected Results:**
- [ ] Warning dialog appears: "This company has associated accounts. Deleting will also remove all accounts."
- [ ] User can confirm or cancel
- [ ] If confirmed, `onDelete` is called
- [ ] If cancelled, dialog closes and company remains

---

### Flow 5: Search and Filter Companies

**Scenario:** User searches and filters the company list

**Steps:**
1. User is on company list page
2. User types "Netflix" in search box
3. User selects "Active" from status filter dropdown

**Expected Results:**
- [ ] List filters to show only companies matching "Netflix" in name
- [ ] List further filters to show only active companies
- [ ] Filtered results update in real-time as user types
- [ ] Clear filters option is available

---

## Empty State Tests

### Primary Empty State

**Scenario:** User has no companies yet (first-time user)

**Setup:**
- Companies array is empty (`[]`)

**Expected Results:**
- [ ] Shows helpful empty state message (e.g., "No companies yet")
- [ ] Shows description (e.g., "Create your first company to get started")
- [ ] Shows "Add Company" button prominently
- [ ] Clicking "Add Company" opens the create modal
- [ ] No blank screen or broken layout

---

## Component Interaction Tests

### CompanyList Component

**Renders correctly:**
- [ ] Displays all companies as cards
- [ ] Shows company name and logo/initials
- [ ] Shows status badge (Active/Inactive)
- [ ] Search box is functional
- [ ] Filter dropdown works correctly

**User interactions:**
- [ ] Clicking company card calls `onView` with company ID
- [ ] Clicking "Add Company" calls `onCreate`
- [ ] Search filters results in real-time
- [ ] Status filter updates results

### CompanyCard Component

**Renders correctly:**
- [ ] Shows company logo or initials fallback
- [ ] Shows company name
- [ ] Shows status badge

**User interactions:**
- [ ] Clicking card calls `onView` callback

### CompanyDetails Component

**Renders correctly:**
- [ ] Shows all company information
- [ ] Shows associated accounts list (if any)
- [ ] Shows "Back" button
- [ ] Shows "Edit" and "Delete" buttons

**User interactions:**
- [ ] Clicking "Back" calls `onBack` callback
- [ ] Clicking "Edit" calls `onEdit` callback
- [ ] Clicking "Delete" shows confirmation
- [ ] Clicking account in list calls `onViewAccount` with account ID

---

## Edge Cases

- [ ] Handles very long company names with text truncation
- [ ] Works correctly with 1 company and 100+ companies
- [ ] Company with no logo shows initials correctly
- [ ] Company with no accounts shows empty accounts list
- [ ] Search works with special characters
- [ ] Filter resets correctly when cleared

---

## Accessibility Checks

- [ ] All interactive elements are keyboard accessible
- [ ] Form fields have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Focus is managed appropriately after actions

---

## Sample Test Data

```typescript
// Example test data - populated state
const mockCompany = {
  id: "comp-001",
  name: "Netflix",
  url: "https://netflix.com",
  notes: "Monthly streaming subscription",
  status: "active" as const,
  logo: null,
  accounts: []
};

const mockCompanies = [mockCompany, /* ... more companies */];

// Example test data - empty states
const mockEmptyList = [];

// Example test data - company with accounts
const mockCompanyWithAccounts = {
  ...mockCompany,
  accounts: [
    { id: "acc-001", name: "Netflix Subscription", /* ... */ }
  ]
};
```

---

## Notes for Test Implementation

- Mock API calls to test both success and failure scenarios
- Test each callback prop is called with correct arguments
- Verify UI updates when data changes
- Test that loading states appear during async operations
- Ensure error boundaries catch and display errors gracefully
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears
- Test transitions: empty → first company created, last company deleted → empty state returns

