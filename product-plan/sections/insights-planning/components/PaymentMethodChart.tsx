import React from 'react'
import type { PaymentMethodBreakdown } from '../types'

interface PaymentMethodChartProps {
  data: PaymentMethodBreakdown[]
}

const METHOD_ICONS: Record<string, string> = {
  'ACH': 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  'Credit Card': 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  'Check': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'Wire Transfer': 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
}

export function PaymentMethodChart({ data }: PaymentMethodChartProps) {
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
        Payment Methods
      </h3>

      <div className="space-y-4">
        {data.map((item, i) => {
          const iconPath = METHOD_ICONS[item.method] || METHOD_ICONS['ACH']

          return (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {item.method}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                    ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-400 tabular-nums flex-shrink-0 w-12 text-right">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
