// =============================================================================
// Data Types
// =============================================================================

export interface Payment {
  id: string
  date: string
  companyName: string
  accountName: string
  amount: number
  cleared: boolean
  notes: string
  paymentMethod: 'ACH' | 'Credit Card' | 'Check' | 'Wire Transfer' | 'Debit Card' | 'Cash'
}

// =============================================================================
// Component Props
// =============================================================================

export interface PaymentTrackingProps {
  /** The list of payments to display */
  payments: Payment[]
  /** Called when user wants to edit a payment's details */
  onEdit?: (id: string) => void
  /** Called when user toggles a payment's cleared status */
  onToggleCleared?: (id: string) => void
  /** Called when user wants to navigate to the related company */
  onViewCompany?: (companyName: string) => void
  /** Called when user wants to navigate to the related account */
  onViewAccount?: (accountName: string) => void
}
