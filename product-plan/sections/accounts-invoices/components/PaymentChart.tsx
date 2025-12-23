import React from 'react'
import type { Payment } from '../types'

interface PaymentChartProps {
  payments: Payment[]
}

export function PaymentChart({ payments }: PaymentChartProps) {
  // Group payments by month for the last 12 months
  const getMonthlyData = () => {
    const now = new Date()
    const months = []

    // Generate last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        fullDate: date,
        amount: 0
      })
    }

    // Aggregate payments by month
    payments.forEach(payment => {
      const paymentDate = new Date(payment.date)
      const monthIndex = months.findIndex(m =>
        m.fullDate.getMonth() === paymentDate.getMonth() &&
        m.fullDate.getFullYear() === paymentDate.getFullYear()
      )
      if (monthIndex !== -1) {
        months[monthIndex].amount += payment.amount
      }
    })

    return months
  }

  const monthlyData = getMonthlyData()
  const maxAmount = Math.max(...monthlyData.map(d => d.amount), 1)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-stone-500 dark:text-stone-500">No payment history available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-1 pb-6">
        {monthlyData.map((data, index) => {
          const height = maxAmount > 0 ? (data.amount / maxAmount) * 100 : 0
          const isCurrentMonth = index === monthlyData.length - 1

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
              {/* Bar */}
              <div className="w-full flex flex-col justify-end h-full">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isCurrentMonth
                      ? 'bg-amber-500 dark:bg-amber-600'
                      : 'bg-slate-700 dark:bg-slate-600 group-hover:bg-slate-600 dark:group-hover:bg-slate-500'
                  }`}
                  style={{ height: `${height}%` }}
                >
                  {/* Tooltip on hover */}
                  {data.amount > 0 && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-full -mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-stone-900 dark:bg-stone-700 text-white text-xs rounded whitespace-nowrap pointer-events-none">
                      {formatCurrency(data.amount)}
                    </div>
                  )}
                </div>
              </div>

              {/* Month Label */}
              <p className={`text-xs transition-colors ${
                isCurrentMonth
                  ? 'text-amber-600 dark:text-amber-500 font-semibold'
                  : 'text-stone-500 dark:text-stone-500'
              }`}>
                {data.month}
              </p>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-500 mb-1">Total Paid</p>
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
          </p>
        </div>
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-500 mb-1">Transactions</p>
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {payments.length}
          </p>
        </div>
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-500 mb-1">Avg Payment</p>
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {formatCurrency(payments.length > 0 ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
