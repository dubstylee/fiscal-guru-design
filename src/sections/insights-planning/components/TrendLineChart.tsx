import type { DailyTrend } from '@/../product/sections/insights-planning/types'

interface TrendLineChartProps {
  data: DailyTrend[]
}

export function TrendLineChart({ data }: TrendLineChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount))
  const chartHeight = 180
  const chartWidth = 600

  // Generate SVG path for line chart
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth
    const y = chartHeight - (d.amount / maxAmount) * chartHeight
    return { x, y, amount: d.amount, date: d.date }
  })

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  // Area fill path
  const areaData = `${pathData} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
        30-Day Spending Trend
      </h3>

      <div className="relative">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <line
              key={i}
              x1="0"
              y1={chartHeight * ratio}
              x2={chartWidth}
              y2={chartHeight * ratio}
              stroke="currentColor"
              className="text-stone-200 dark:text-stone-800"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <path
            d={areaData}
            fill="url(#gradient)"
            opacity="0.2"
          />

          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((p, i) => (
            p.amount > 0 && (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="4"
                className="fill-slate-700 dark:fill-slate-500"
              />
            )
          ))}

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between -ml-12 text-xs text-stone-600 dark:text-stone-400 tabular-nums">
          <span>${(maxAmount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          <span>${(maxAmount * 0.75).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          <span>${(maxAmount * 0.5).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          <span>${(maxAmount * 0.25).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          <span>$0</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-sm">
        <span className="text-stone-600 dark:text-stone-400">
          Peak spending: ${maxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="text-stone-600 dark:text-stone-400">
          {data.filter(d => d.amount > 0).length} active days
        </span>
      </div>
    </div>
  )
}
