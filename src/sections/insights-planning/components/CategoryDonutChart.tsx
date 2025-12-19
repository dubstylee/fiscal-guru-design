import type { CategoryBreakdown, SpendingCategory } from '@/../product/sections/insights-planning/types'

interface CategoryDonutChartProps {
  data: CategoryBreakdown[]
  categories: SpendingCategory[]
}

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-500 dark:bg-blue-600', text: 'text-blue-700 dark:text-blue-400' },
  green: { bg: 'bg-emerald-500 dark:bg-emerald-600', text: 'text-emerald-700 dark:text-emerald-400' },
  purple: { bg: 'bg-purple-500 dark:bg-purple-600', text: 'text-purple-700 dark:text-purple-400' },
  orange: { bg: 'bg-orange-500 dark:bg-orange-600', text: 'text-orange-700 dark:text-orange-400' },
  cyan: { bg: 'bg-cyan-500 dark:bg-cyan-600', text: 'text-cyan-700 dark:text-cyan-400' },
  gray: { bg: 'bg-stone-400 dark:bg-stone-600', text: 'text-stone-700 dark:text-stone-400' }
}

export function CategoryDonutChart({ data, categories }: CategoryDonutChartProps) {
  // Calculate donut segments
  const total = data.reduce((sum, item) => sum + item.amount, 0)
  let currentAngle = -90 // Start from top

  const segments = data.map(item => {
    const percentage = (item.amount / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const category = categories.find(c => c.id === item.categoryId)
    const color = COLOR_MAP[category?.color || 'gray']

    return {
      ...item,
      startAngle,
      endAngle,
      color,
      category
    }
  })

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-stone-800">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
        Spending by Category
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Donut Chart (Simplified visualization) */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            {segments.map((segment, i) => {
              const radius = 80
              const innerRadius = 50
              const startAngleRad = (segment.startAngle * Math.PI) / 180
              const endAngleRad = (segment.endAngle * Math.PI) / 180

              const x1 = 100 + radius * Math.cos(startAngleRad)
              const y1 = 100 + radius * Math.sin(startAngleRad)
              const x2 = 100 + radius * Math.cos(endAngleRad)
              const y2 = 100 + radius * Math.sin(endAngleRad)
              const x3 = 100 + innerRadius * Math.cos(endAngleRad)
              const y3 = 100 + innerRadius * Math.sin(endAngleRad)
              const x4 = 100 + innerRadius * Math.cos(startAngleRad)
              const y4 = 100 + innerRadius * Math.sin(startAngleRad)

              const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0

              const pathData = `
                M ${x1} ${y1}
                A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                L ${x3} ${y3}
                A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
                Z
              `

              const colorClass = segment.color.bg.split(' ')[0].replace('bg-', '')

              return (
                <path
                  key={i}
                  d={pathData}
                  className={`fill-${colorClass} transition-opacity hover:opacity-80`}
                  style={{
                    fill: segment.color.bg.includes('blue') ? '#3b82f6' :
                          segment.color.bg.includes('emerald') ? '#10b981' :
                          segment.color.bg.includes('purple') ? '#a855f7' :
                          segment.color.bg.includes('orange') ? '#f97316' :
                          segment.color.bg.includes('cyan') ? '#06b6d4' : '#9ca3af'
                  }}
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Total</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
              ${total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          {segments.map((segment, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${segment.color.bg}`} />
                <span className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                  {segment.categoryName}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  ${segment.amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className={`text-xs font-medium ${segment.color.text} tabular-nums`}>
                  {segment.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
