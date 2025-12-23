import React, { useState } from 'react'
import type { InsightsPlanningProps } from '../types'
import { MetricsOverview } from './MetricsOverview'
import { SpendingCharts } from './SpendingCharts'
import { BudgetManager } from './BudgetManager'
import { UpcomingInvoicesList } from './UpcomingInvoicesList'

export function InsightsDashboard({
  spendingCategories,
  budgets,
  spendingData,
  upcomingInvoices,
  onCreateBudget,
  onEditBudget,
  onDeleteBudget,
  onViewInvoice,
  onCreateCategory,
  onEditCategory
}: InsightsPlanningProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'30' | '60' | '90'>('30')

  const currentPeriodData =
    selectedPeriod === '30' ? spendingData.period30Days :
    selectedPeriod === '60' ? spendingData.period60Days :
    spendingData.period90Days

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Insights & Planning
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400">
            Financial analytics, budgets, and upcoming obligations
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-8 flex items-center gap-2">
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            Time Range:
          </span>
          <div className="inline-flex rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 p-1">
            {(['30', '60', '90'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  selectedPeriod === period
                    ? 'bg-slate-700 dark:bg-slate-600 text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {period} Days
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Overview */}
        <MetricsOverview data={currentPeriodData} />

        {/* Spending Analytics */}
        <SpendingCharts
          data={currentPeriodData}
          categories={spendingCategories}
          period={selectedPeriod}
        />

        {/* Two Column Layout: Budgets & Upcoming Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
          {/* Budget Manager */}
          <BudgetManager
            budgets={budgets}
            categories={spendingCategories}
            onCreateBudget={onCreateBudget}
            onEditBudget={onEditBudget}
            onDeleteBudget={onDeleteBudget}
            onCreateCategory={onCreateCategory}
            onEditCategory={onEditCategory}
          />

          {/* Upcoming Invoices */}
          <UpcomingInvoicesList
            invoices={upcomingInvoices}
            onViewInvoice={onViewInvoice}
          />
        </div>
      </div>
    </div>
  )
}
