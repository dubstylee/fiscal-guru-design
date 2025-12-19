'use client'

import { Plus, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Legend
} from 'recharts'
import type { DashboardOverviewProps } from '@/../product/sections/dashboard-overview/types'

/**
 * Dashboard & Overview Component
 *
 * Design tokens applied:
 * - Primary: slate (professional blue-gray for main UI elements)
 * - Secondary: amber (warm golden accents for highlights)
 * - Neutral: stone (warm grays for backgrounds)
 * - Typography: Inter (heading and body)
 */
export function DashboardOverview({
  invoices,
  payments,
  keyMetrics,
  paymentTrends,
  monthlyComparison,
  onViewInvoice,
  onViewPayment,
  onAddPayment,
  onAddInvoice,
}: DashboardOverviewProps) {
  // Filter upcoming invoices (upcoming or overdue)
  const upcomingInvoices = invoices
    .filter(inv => inv.status === 'upcoming' || inv.status === 'overdue')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  // Get recent payments
  const recentPayments = payments
    .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
    .slice(0, 5)

  // Helper to determine urgency status
  const getInvoiceUrgency = (invoice: typeof invoices[0]) => {
    if (invoice.status === 'overdue') return 'overdue'

    const dueDate = new Date(invoice.dueDate)
    const today = new Date()
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilDue <= 3) return 'urgent'
    if (daysUntilDue <= 7) return 'soon'
    return 'normal'
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString))
  }

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-stone-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
            {payload[0].payload.monthLabel}
          </p>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Dashboard
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-1">
              Your financial overview at a glance
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onAddPayment}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 dark:bg-slate-600 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Payment</span>
              <span className="sm:hidden">Payment</span>
            </button>
            <button
              onClick={onAddInvoice}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Invoice</span>
              <span className="sm:hidden">Invoice</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Active Accounts
              </p>
              <CheckCircle2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              {keyMetrics.activeAccounts}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Upcoming Invoices
              </p>
              <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              {keyMetrics.upcomingInvoices}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Monthly Spend
              </p>
              <TrendingUp className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              {formatCurrency(keyMetrics.totalMonthlySpend)}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Uncleared Payments
              </p>
              <AlertCircle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              {keyMetrics.unclearedPayments}
            </p>
          </div>
        </div>

        {/* Payment Trends Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              Payment Trends
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Last 6 months
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200 dark:stroke-slate-700" />
                <XAxis
                  dataKey="monthLabel"
                  className="text-sm"
                  tick={{ fill: 'currentColor' }}
                  stroke="currentColor"
                />
                <YAxis
                  className="text-sm"
                  tick={{ fill: 'currentColor' }}
                  stroke="currentColor"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="total"
                  fill="currentColor"
                  className="fill-slate-600 dark:fill-slate-400"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Comparison Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              Monthly Spending Comparison
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              {monthlyComparison.previousMonth.label} vs {monthlyComparison.currentMonth.label} (month-to-date)
            </p>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={(() => {
                  // Combine both months' data for comparison
                  const maxLength = Math.max(
                    monthlyComparison.previousMonth.dailyPayments.length,
                    monthlyComparison.currentMonth.dailyPayments.length
                  )

                  return Array.from({ length: maxLength }, (_, i) => {
                    const prevDay = monthlyComparison.previousMonth.dailyPayments[i]
                    const currDay = monthlyComparison.currentMonth.dailyPayments[i]

                    return {
                      day: i + 1,
                      prevAmount: prevDay?.amount || 0,
                      prevCumulative: prevDay?.cumulative || 0,
                      currAmount: currDay?.amount || 0,
                      currCumulative: currDay?.cumulative || 0,
                    }
                  })
                })()}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200 dark:stroke-slate-700" />
                <XAxis
                  dataKey="day"
                  className="text-sm"
                  tick={{ fill: 'currentColor' }}
                  stroke="currentColor"
                  label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  yAxisId="left"
                  className="text-sm"
                  tick={{ fill: 'currentColor' }}
                  stroke="currentColor"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                  label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  className="text-sm"
                  tick={{ fill: 'currentColor' }}
                  stroke="currentColor"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                  label={{ value: 'Cumulative', angle: 90, position: 'insideRight' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-stone-200 dark:border-slate-700">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                            Day {payload[0].payload.day}
                          </p>
                          <div className="space-y-1 text-sm">
                            {payload.map((entry: any, index: number) => (
                              <p key={index} style={{ color: entry.color }} className="font-medium">
                                {entry.name}: {formatCurrency(entry.value)}
                              </p>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => {
                    const labels: Record<string, string> = {
                      prevAmount: `${monthlyComparison.previousMonth.label} - Daily`,
                      currAmount: `${monthlyComparison.currentMonth.label} - Daily`,
                      prevCumulative: `${monthlyComparison.previousMonth.label} - Cumulative`,
                      currCumulative: `${monthlyComparison.currentMonth.label} - Cumulative`,
                    }
                    return labels[value] || value
                  }}
                />

                {/* Previous month daily payments (bars) */}
                <Bar
                  yAxisId="left"
                  dataKey="prevAmount"
                  fill="#64748b"
                  name="prevAmount"
                  opacity={0.6}
                  radius={[4, 4, 0, 0]}
                />

                {/* Current month daily payments (bars) */}
                <Bar
                  yAxisId="left"
                  dataKey="currAmount"
                  fill="#f59e0b"
                  name="currAmount"
                  opacity={0.8}
                  radius={[4, 4, 0, 0]}
                />

                {/* Previous month cumulative (line) */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="prevCumulative"
                  stroke="#475569"
                  strokeWidth={2}
                  name="prevCumulative"
                  dot={false}
                />

                {/* Current month cumulative (line) */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="currCumulative"
                  stroke="#d97706"
                  strokeWidth={2}
                  name="currCumulative"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Column Layout for Upcoming Payments and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Payments */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Upcoming Payments
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                Next invoices due
              </p>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-slate-700">
              {upcomingInvoices.length === 0 ? (
                <div className="p-8 text-center text-stone-500 dark:text-stone-400">
                  No upcoming payments
                </div>
              ) : (
                upcomingInvoices.map((invoice) => {
                  const urgency = getInvoiceUrgency(invoice)

                  return (
                    <button
                      key={invoice.id}
                      onClick={() => onViewInvoice?.(invoice.id)}
                      className="w-full p-4 hover:bg-stone-50 dark:hover:bg-slate-750 transition-colors duration-150 text-left group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
                              {invoice.companyName}
                            </p>
                            {urgency === 'overdue' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                Overdue
                              </span>
                            )}
                            {urgency === 'urgent' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                                Due Soon
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-stone-600 dark:text-stone-400 truncate">
                            {invoice.description}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                            Due {formatDate(invoice.dueDate)}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-slate-900 dark:text-slate-50">
                            {formatCurrency(invoice.amount)}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Recent Activity
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                Recent payments made
              </p>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-slate-700">
              {recentPayments.length === 0 ? (
                <div className="p-8 text-center text-stone-500 dark:text-stone-400">
                  No recent payments
                </div>
              ) : (
                recentPayments.map((payment) => (
                  <button
                    key={payment.id}
                    onClick={() => onViewPayment?.(payment.id)}
                    className="w-full p-4 hover:bg-stone-50 dark:hover:bg-slate-750 transition-colors duration-150 text-left group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
                            {payment.companyName}
                          </p>
                          {payment.cleared ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-500">
                          {formatDate(payment.paymentDate)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-slate-900 dark:text-slate-50">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                          {payment.cleared ? 'Cleared' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
