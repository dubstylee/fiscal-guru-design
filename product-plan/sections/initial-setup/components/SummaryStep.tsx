'use client'

import React from 'react'
import { Database, Shield, TrendingUp, CheckCircle, XCircle } from 'lucide-react'
import type { SetupSummary } from '../types'

interface SummaryStepProps {
  summary: SetupSummary
}

const providerLabels: Record<string, string> = {
  postgresql: 'PostgreSQL',
  supabase: 'Supabase',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  posthog: 'PostHog',
  datadog: 'Datadog',
  'supabase-auth': 'Supabase Auth',
}

export function SummaryStep({ summary }: SummaryStepProps) {
  const renderIntegrationCard = (
    title: string,
    icon: React.ElementType,
    integration: SetupSummary['database'] | SetupSummary['identityProvider'] | SetupSummary['analytics']
  ) => {
    const Icon = icon

    if (!integration) {
      return (
        <div className="bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-stone-200 dark:bg-slate-800 rounded-lg">
              <Icon className="w-5 h-5 text-stone-400 dark:text-stone-600" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-50">{title}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
            <XCircle className="w-4 h-4" />
            <span>Not configured</span>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 dark:bg-amber-950/30 rounded-lg">
            <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-50">{title}</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-mono">
              {providerLabels[integration.provider]}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold">Configured</span>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Name
            </span>
            <p className="text-sm font-mono text-slate-900 dark:text-slate-50 mt-1">{integration.name}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Configuration
            </span>
            <div className="mt-1 space-y-1">
              {Object.entries(integration.config).map(([key, value]) => (
                <div key={key} className="text-xs font-mono text-stone-600 dark:text-stone-400">
                  <span className="text-stone-500 dark:text-stone-500">{key}:</span>{' '}
                  <span className="text-slate-900 dark:text-slate-50">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value).slice(0, 50)}
                    {typeof value === 'string' && value.length > 50 ? '...' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Setup Complete</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Review your configuration before completing setup
        </p>
      </div>

      <div className="space-y-4">
        {renderIntegrationCard('Database', Database, summary.database)}
        {renderIntegrationCard('Identity Provider', Shield, summary.identityProvider)}
        {renderIntegrationCard('Analytics', TrendingUp, summary.analytics)}
      </div>

      {summary.database && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              Database is configured. You're ready to complete setup!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

