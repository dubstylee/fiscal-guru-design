// =============================================================================
// Data Types
// =============================================================================

export interface Account {
  id: string
  name: string
  type: string
  balance: number
  lastFour: string | null
}

export interface Company {
  id: string
  name: string
  url: string
  notes: string
  status: 'active' | 'inactive'
  logo: string | null
  accounts: Account[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface CompanyManagementProps {
  /** The list of companies to display */
  companies: Company[]
  /** Called when user wants to create a new company */
  onCreate?: () => void
  /** Called when user wants to view a company's details */
  onView?: (id: string) => void
  /** Called when user wants to edit a company */
  onEdit?: (id: string) => void
  /** Called when user wants to delete a company */
  onDelete?: (id: string) => void
  /** Called when user wants to view an account's details */
  onViewAccount?: (accountId: string) => void
}

export interface CompanyDetailsProps {
  /** The company to display */
  company: Company
  /** Called when user wants to go back to the list */
  onBack?: () => void
  /** Called when user wants to edit the company */
  onEdit?: () => void
  /** Called when user wants to delete the company */
  onDelete?: () => void
  /** Called when user wants to view an account's details */
  onViewAccount?: (accountId: string) => void
}
