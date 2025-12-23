// =============================================================================
// Data Types
// =============================================================================

export interface Company {
  id: string
  name: string
  type: 'vendor' | 'client' | 'service_provider'
  contactEmail: string
  notes?: string
}

export interface Account {
  id: string
  companyId: string
  accountNumber: string
  accountType: 'subscription' | 'service' | 'utility' | 'insurance' | 'credit' | 'loan' | 'checking'
  balance: number
  status: 'active' | 'closed' | 'suspended'
}

export interface Invoice {
  id: string
  accountId: string
  companyName: string
  invoiceNumber: string
  amount: number
  dueDate: string
  status: 'upcoming' | 'overdue' | 'paid' | 'cancelled'
  description: string
}

export interface Payment {
  id: string
  invoiceId: string
  companyName: string
  amount: number
  paymentDate: string
  cleared: boolean
  paymentMethod: 'credit_card' | 'bank_transfer' | 'check' | 'cash'
}

export interface KeyMetrics {
  activeAccounts: number
  upcomingInvoices: number
  totalMonthlySpend: number
  unclearedPayments: number
}

export interface PaymentTrend {
  month: string
  monthLabel: string
  total: number
}

export interface DailyPayment {
  day: number
  amount: number
  cumulative: number
}

export interface MonthData {
  label: string
  dailyPayments: DailyPayment[]
}

export interface MonthlyComparison {
  previousMonth: MonthData
  currentMonth: MonthData
}

// =============================================================================
// Component Props
// =============================================================================

export interface DashboardOverviewProps {
  /** List of all companies being tracked */
  companies: Company[]
  /** List of all accounts across companies */
  accounts: Account[]
  /** List of invoices with upcoming, overdue, and paid statuses */
  invoices: Invoice[]
  /** List of recent payment records */
  payments: Payment[]
  /** Aggregated key metrics for quick financial health overview */
  keyMetrics: KeyMetrics
  /** Month-over-month payment data for the last 6 months */
  paymentTrends: PaymentTrend[]
  /** Daily payment comparison between previous and current month */
  monthlyComparison: MonthlyComparison
  /** Called when user clicks on an upcoming invoice to view details */
  onViewInvoice?: (invoiceId: string) => void
  /** Called when user clicks on a recent payment to view details */
  onViewPayment?: (paymentId: string) => void
  /** Called when user clicks the "Add Payment" quick action button */
  onAddPayment?: () => void
  /** Called when user clicks the "Add Invoice" quick action button */
  onAddInvoice?: () => void
}
