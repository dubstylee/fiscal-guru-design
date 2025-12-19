import { ChevronRight } from 'lucide-react'
import type { Invoice } from '@/../product/sections/accounts-invoices/types'

interface InvoiceListProps {
  invoices: Invoice[]
  onView?: (id: string) => void
}

export function InvoiceList({ invoices, onView }: InvoiceListProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      overdue: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      cancelled: 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-400'
    }
    return colors[status] || colors.pending
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-stone-500 dark:text-stone-500">No invoices yet</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-stone-200 dark:divide-stone-800">
      {invoices.map((invoice) => (
        <button
          key={invoice.id}
          onClick={() => onView?.(invoice.id)}
          className="w-full flex items-center justify-between py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors text-left group"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <p className="font-medium text-sm text-stone-900 dark:text-stone-100 truncate">
                {invoice.invoiceNumber}
              </p>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(invoice.status)}`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 truncate">
              {invoice.description}
            </p>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {formatCurrency(invoice.amount)}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-500">
                Due {formatDate(invoice.dueDate)}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors" />
          </div>
        </button>
      ))}
    </div>
  )
}
