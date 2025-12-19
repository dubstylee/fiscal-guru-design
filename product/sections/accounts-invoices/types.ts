// =============================================================================
// Data Types
// =============================================================================

export interface ContactInfo {
  name: string
  email: string
  phone: string
}

export interface AddressInfo {
  street: string
  city: string
  state: string
  zip: string
}

export interface Account {
  id: string
  companyId: string
  companyName: string
  companyLogo: string | null
  accountName: string
  accountNumber: string
  accountUrl: string | null
  accountType: string
  status: 'active' | 'inactive'
  interestRate: number | null
  dateOpened: string
  balance: number
  notes: string
  contactInfo: ContactInfo
  addressInfo: AddressInfo
  accountLogo: string | null
}

export interface Invoice {
  id: string
  accountId: string
  invoiceNumber: string
  amount: number
  dueDate: string
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  description: string
  issuedDate: string
}

export interface Payment {
  id: string
  invoiceId: string
  accountId: string
  amount: number
  date: string
  cleared: boolean
  method: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface AccountListProps {
  /** The list of accounts to display */
  accounts: Account[]
  /** Called when user wants to view an account's details */
  onView?: (id: string) => void
  /** Called when user wants to edit an account */
  onEdit?: (id: string) => void
  /** Called when user wants to delete an account */
  onDelete?: (id: string) => void
  /** Called when user wants to toggle an account's active status */
  onToggleStatus?: (id: string) => void
  /** Called when user wants to create a new account */
  onCreate?: () => void
  /** Called when user changes filter settings */
  onFilterChange?: (filters: AccountFilters) => void
  /** Called when user searches for accounts */
  onSearch?: (query: string) => void
}

export interface AccountFilters {
  accountType?: string[]
  status?: 'active' | 'inactive' | 'all'
  companyId?: string
}

export interface AccountDetailsProps {
  /** The account to display */
  account: Account
  /** Invoices associated with this account */
  invoices: Invoice[]
  /** Payment history for this account (last 12 months) */
  payments: Payment[]
  /** Called when user wants to edit the account */
  onEdit?: () => void
  /** Called when user wants to delete the account */
  onDelete?: () => void
  /** Called when user wants to toggle the account's active status */
  onToggleStatus?: () => void
  /** Called when user wants to create a new invoice for this account */
  onCreateInvoice?: () => void
  /** Called when user wants to view an invoice's details */
  onViewInvoice?: (id: string) => void
  /** Called when user wants to go back to the account list */
  onBack?: () => void
}
