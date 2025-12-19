import { useState } from 'react'
import type { UpcomingInvoice } from '@/../product/sections/insights-planning/types'

interface UpcomingInvoicesListProps {
  invoices: UpcomingInvoice[]
  onViewInvoice?: (id: string) => void
}

export function UpcomingInvoicesList({ invoices, onViewInvoice }: UpcomingInvoicesListProps) {
  const [sortBy, setSortBy] = useState<'dueDate' | 'amount'>('dueDate')

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return a.daysUntilDue - b.daysUntilDue
    } else {
      return b.amount - a.amount
    }
  })

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Upcoming Invoices
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'amount')}
          className="px-3 py-1.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      <div className="space-y-3">
        {sortedInvoices.map((invoice) => {
          const isUrgent = invoice.daysUntilDue <= 7
          const isOverdue = invoice.status === 'overdue'

          return (
            <div
              key={invoice.id}
              onClick={() => onViewInvoice?.(invoice.id)}
              className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-0.5 truncate">
                    {invoice.companyName}
                  </h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400 truncate">
                    {invoice.accountName}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-stone-500 dark:text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-stone-600 dark:text-stone-400">
                    {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  isOverdue
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    : isUrgent
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}>
                  {isOverdue
                    ? 'Overdue'
                    : invoice.daysUntilDue === 0
                    ? 'Due today'
                    : invoice.daysUntilDue === 1
                    ? 'Due tomorrow'
                    : `${invoice.daysUntilDue} days`
                  }
                </span>
              </div>
            </div>
          )
        })}

        {sortedInvoices.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-700 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">
              All caught up!
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              No upcoming invoices at this time
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
