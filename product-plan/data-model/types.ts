// =============================================================================
// Global Data Model Types
// =============================================================================

/**
 * Core entities for Fiscal Guru financial management platform
 */

export interface Company {
  id: string
  name: string
  type: 'vendor' | 'client' | 'service_provider'
  contactEmail: string
  notes?: string
  url?: string
  status?: 'active' | 'inactive'
  logo?: string | null
}

export interface Account {
  id: string
  companyId: string
  companyName?: string
  companyLogo?: string | null
  accountName?: string
  accountNumber: string
  accountType: 'subscription' | 'service' | 'utility' | 'insurance' | 'credit' | 'loan' | 'checking'
  balance: number
  status: 'active' | 'closed' | 'suspended' | 'inactive'
  interestRate?: number | null
  dateOpened?: string
  notes?: string
  accountUrl?: string | null
  accountLogo?: string | null
  lastFour?: string | null
}

export interface InvoiceTemplate {
  id: string
  accountId: string
  name: string
  amount: number
  frequency: 'monthly' | 'weekly' | 'yearly' | 'custom'
  nextDueDate: string
}

export interface Invoice {
  id: string
  accountId: string
  companyName: string
  invoiceNumber: string
  amount: number
  dueDate: string
  status: 'upcoming' | 'overdue' | 'paid' | 'cancelled' | 'pending'
  description: string
  issuedDate?: string
  invoiceTemplateId?: string
}

export interface Payment {
  id: string
  invoiceId: string
  companyName: string
  accountName?: string
  amount: number
  paymentDate: string
  date?: string
  cleared: boolean
  paymentMethod: 'credit_card' | 'bank_transfer' | 'check' | 'cash' | 'ACH' | 'Credit Card' | 'Wire Transfer' | 'Debit Card'
  notes?: string
}

