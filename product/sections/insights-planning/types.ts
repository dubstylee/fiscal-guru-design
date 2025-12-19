// =============================================================================
// Data Types
// =============================================================================

export interface SpendingCategory {
  id: string
  name: string
  color: string
  icon: string
}

export interface Budget {
  id: string
  categoryId: string
  categoryName: string
  monthlyLimit: number
  currentSpending: number
  transactionCount: number
  lastUpdated: string
}

export interface CategoryBreakdown {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
}

export interface PaymentMethodBreakdown {
  method: 'ACH' | 'Credit Card' | 'Check' | 'Wire Transfer' | 'Debit Card' | 'Cash'
  amount: number
  percentage: number
}

export interface DailyTrend {
  date: string
  amount: number
}

export interface PeriodData {
  totalSpent: number
  averagePerDay: number
  transactionCount: number
  byCategory: CategoryBreakdown[]
  byPaymentMethod: PaymentMethodBreakdown[]
  dailyTrend?: DailyTrend[]
}

export interface SpendingData {
  period30Days: PeriodData
  period60Days: PeriodData
  period90Days: PeriodData
}

export interface UpcomingInvoice {
  id: string
  companyName: string
  accountName: string
  amount: number
  dueDate: string
  daysUntilDue: number
  status: 'pending' | 'overdue' | 'paid'
}

// =============================================================================
// Component Props
// =============================================================================

export interface InsightsPlanningProps {
  /** Spending categories for organizing analytics */
  spendingCategories: SpendingCategory[]
  /** User-defined budgets for spending categories */
  budgets: Budget[]
  /** Aggregated spending data for different time periods */
  spendingData: SpendingData
  /** List of upcoming invoices */
  upcomingInvoices: UpcomingInvoice[]
  /** Called when user wants to create a new budget */
  onCreateBudget?: () => void
  /** Called when user wants to edit a budget */
  onEditBudget?: (id: string) => void
  /** Called when user wants to delete a budget */
  onDeleteBudget?: (id: string) => void
  /** Called when user wants to view invoice details */
  onViewInvoice?: (id: string) => void
  /** Called when user wants to create a new spending category */
  onCreateCategory?: () => void
  /** Called when user wants to edit a spending category */
  onEditCategory?: (id: string) => void
}
