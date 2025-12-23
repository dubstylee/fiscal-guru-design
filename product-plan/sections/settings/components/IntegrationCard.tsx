'use client'

import React, { useState } from 'react'
import { Database, TrendingUp, Shield, Power, TestTube, Edit3, Trash2, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import type { Integration } from '../types'

interface IntegrationCardProps {
  integration: Integration
  onTest?: (id: string) => void
  onToggle?: (id: string, enabled: boolean) => void
  onEdit?: (id: string, updates: Partial<Integration>) => void
  onDelete?: (id: string) => void
}

export function IntegrationCard({
  integration,
  onTest,
  onToggle,
  onEdit,
  onDelete,
}: IntegrationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusConfig = {
    connected: { icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950', label: 'Connected' },
    disconnected: { icon: XCircle, color: 'text-stone-500 dark:text-stone-400', bg: 'bg-stone-100 dark:bg-stone-900', label: 'Disconnected' },
    error: { icon: AlertCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950', label: 'Error' },
    testing: { icon: TestTube, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950', label: 'Testing' },
  }

  const providerLabels = {
    postgresql: 'PostgreSQL',
    supabase: 'Supabase',
    mysql: 'MySQL',
    sqlite: 'SQLite',
    posthog: 'PostHog',
    datadog: 'Datadog',
    'supabase-auth': 'Supabase Auth',
  }

  const status = statusConfig[integration.status]
  const StatusIcon = status.icon
  const TypeIcon = integration.type === 'database' ? Database : integration.type === 'analytics' ? TrendingUp : Shield

  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden transition-all">
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0">
            <TypeIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base mb-1">
                  {integration.name}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-mono">
                  {providerLabels[integration.provider]}
                </p>
              </div>

              {/* Status Badge */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 ${status.bg} rounded-full flex-shrink-0`}>
                <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                <span className={`text-xs font-semibold ${status.color}`}>
                  {status.label}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {integration.lastError && (
              <div className="mb-3 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg">
                <p className="text-xs text-red-700 dark:text-red-300 font-mono">
                  {integration.lastError}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button
                onClick={() => onTest?.(integration.id)}
                className="px-3 py-1.5 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <TestTube className="w-3.5 h-3.5" />
                Test
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-1.5 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                onClick={() => onToggle?.(integration.id, !integration.enabled)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  integration.enabled
                    ? 'bg-amber-100 dark:bg-amber-950 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-100'
                    : 'bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                {integration.enabled ? 'Disable' : 'Enable'}
              </button>

              <button
                onClick={() => onDelete?.(integration.id)}
                className="px-3 py-1.5 bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 text-red-700 dark:text-red-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Configuration */}
      {isExpanded && (
        <div className="border-t border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 p-5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-3">
            Configuration
          </h4>
          <div className="space-y-2">
            {Object.entries(integration.config).map(([key, value]) => (
              <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <div className="font-semibold text-stone-600 dark:text-stone-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="sm:col-span-2 font-mono text-slate-900 dark:text-slate-50 break-all">
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                </div>
              </div>
            ))}
          </div>
          {integration.lastTested && (
            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-slate-700">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Last tested: {new Date(integration.lastTested).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}