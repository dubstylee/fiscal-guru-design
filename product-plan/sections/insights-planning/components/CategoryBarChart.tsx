import React from 'react'
import type { CategoryBreakdown } from '../types'

interface CategoryBarChartProps {
  data: CategoryBreakdown[]
}

export function CategoryBarChart({ data }: CategoryBarChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount))

  // Sort by amount descending
  const sortedData = [...data].sort((a, b) => b.amount - a.amount)

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
        Category Comparison
      </h3>

      <div className="space-y-4">
        {sortedData.map((item, i) => {
          const widthPercentage = (item.amount / maxAmount) * 100

          return (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {item.categoryName}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="relative h-8 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-lg transition-all duration-500 ease-out"
                  style={{ width: `${widthPercentage}%` }}
                >
                  <div className="flex items-center justify-end h-full pr-3">
                    {widthPercentage > 15 && (
                      <span className="text-xs font-medium text-white tabular-nums">
                        {item.percentage.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
