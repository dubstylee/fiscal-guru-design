import type { PeriodData, SpendingCategory } from '@/../product/sections/insights-planning/types'
import { CategoryDonutChart } from './CategoryDonutChart'
import { CategoryBarChart } from './CategoryBarChart'
import { PaymentMethodChart } from './PaymentMethodChart'
import { TrendLineChart } from './TrendLineChart'

interface SpendingChartsProps {
  data: PeriodData
  categories: SpendingCategory[]
  period: '30' | '60' | '90'
}

export function SpendingCharts({ data, categories, period }: SpendingChartsProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Category Breakdown - Donut & Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryDonutChart data={data.byCategory} categories={categories} />
        <CategoryBarChart data={data.byCategory} />
      </div>

      {/* Payment Method & Trend Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentMethodChart data={data.byPaymentMethod} />
        {period === '30' && data.dailyTrend && (
          <TrendLineChart data={data.dailyTrend} />
        )}
      </div>
    </div>
  )
}
