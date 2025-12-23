import React from 'react'
import type { Budget, SpendingCategory } from '../types'

interface BudgetManagerProps {
  budgets: Budget[]
  categories: SpendingCategory[]
  onCreateBudget?: () => void
  onEditBudget?: (id: string) => void
  onDeleteBudget?: (id: string) => void
  onCreateCategory?: () => void
  onEditCategory?: (id: string) => void
}

export function BudgetManager({
  budgets,
  categories,
  onCreateBudget,
  onEditBudget
}: BudgetManagerProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Budget Tracker
        </h3>
        <button
          onClick={onCreateBudget}
          className="px-3 py-1.5 text-sm font-medium text-white bg-slate-700 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          + New Budget
        </button>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.currentSpending / budget.monthlyLimit) * 100
          const isOverBudget = percentage > 100
          const isNearLimit = percentage > 80 && percentage <= 100

          return (
            <div
              key={budget.id}
              className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
              onClick={() => onEditBudget?.(budget.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {budget.categoryName}
                  </h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {budget.transactionCount} {budget.transactionCount === 1 ? 'transaction' : 'transactions'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    ${budget.currentSpending.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    of ${budget.monthlyLimit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                    isOverBudget
                      ? 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700'
                      : isNearLimit
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600'
                      : 'bg-gradient-to-r from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              {/* Status */}
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className={`font-medium ${
                  isOverBudget
                    ? 'text-red-700 dark:text-red-400'
                    : isNearLimit
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-emerald-700 dark:text-emerald-400'
                }`}>
                  {isOverBudget
                    ? `Over budget by $${(budget.currentSpending - budget.monthlyLimit).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                    : `$${(budget.monthlyLimit - budget.currentSpending).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} remaining`
                  }
                </span>
                <span className={`tabular-nums font-medium ${
                  isOverBudget
                    ? 'text-red-700 dark:text-red-400'
                    : isNearLimit
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-stone-600 dark:text-stone-400'
                }`}>
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          )
        })}

        {budgets.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-stone-400 dark:text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              No budgets created yet
            </p>
            <button
              onClick={onCreateBudget}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 underline"
            >
              Create your first budget
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
