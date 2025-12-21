'use client'

import { useState } from 'react'
import { Plus, Database, TrendingUp } from 'lucide-react'
import type { Integration, IntegrationProvider, IntegrationType } from '@/../product/sections/settings/types'
import { IntegrationCard } from './IntegrationCard'

interface IntegrationsSectionProps {
  integrations: Integration[]
  onAdd?: (integration: Omit<Integration, 'id' | 'createdAt' | 'lastTested'>) => void
  onEdit?: (id: string, updates: Partial<Integration>) => void
  onTest?: (id: string) => void
  onToggle?: (id: string, enabled: boolean) => void
  onDelete?: (id: string) => void
}

export function IntegrationsSection({
  integrations,
  onAdd,
  onEdit,
  onTest,
  onToggle,
  onDelete,
}: IntegrationsSectionProps) {
  const [isAddingIntegration, setIsAddingIntegration] = useState(false)
  const [integrationType, setIntegrationType] = useState<IntegrationType | ''>('')
  const [provider, setProvider] = useState<IntegrationProvider | ''>('')
  const [integrationName, setIntegrationName] = useState('')

  const databaseProviders: IntegrationProvider[] = ['postgresql', 'supabase', 'mysql']
  const analyticsProviders: IntegrationProvider[] = ['posthog', 'datadog']

  const providerLabels: Record<IntegrationProvider, string> = {
    postgresql: 'PostgreSQL',
    supabase: 'Supabase',
    mysql: 'MySQL',
    posthog: 'PostHog',
    datadog: 'Datadog',
  }

  const handleAddClick = () => {
    setIsAddingIntegration(true)
    setIntegrationType('')
    setProvider('')
    setIntegrationName('')
  }

  const handleCancel = () => {
    setIsAddingIntegration(false)
    setIntegrationType('')
    setProvider('')
    setIntegrationName('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!integrationType || !provider || !integrationName) return

    // Create a basic integration config based on provider
    let config: any = {}

    if (provider === 'postgresql') {
      config = { host: '', port: 5432, database: '', username: '', sslMode: 'require' }
    } else if (provider === 'supabase') {
      config = { projectUrl: '', apiKey: '', serviceRole: false }
    } else if (provider === 'mysql') {
      config = { host: '', port: 3306, database: '', username: '' }
    } else if (provider === 'posthog') {
      config = { apiKey: '', host: 'https://app.posthog.com' }
    } else if (provider === 'datadog') {
      config = { apiKey: '', applicationKey: '', site: 'datadoghq.com' }
    }

    onAdd?.({
      name: integrationName,
      type: integrationType,
      provider,
      status: 'disconnected',
      enabled: false,
      config,
    })

    handleCancel()
  }

  const availableProviders = integrationType === 'database' ? databaseProviders : integrationType === 'analytics' ? analyticsProviders : []

  return (
    <section>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">
            Integrations
          </h2>
          {!isAddingIntegration && (
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-amber-500 dark:bg-amber-400 hover:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-900 font-semibold rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Integration
            </button>
          )}
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Connect databases and analytics tools to your application
        </p>
      </div>

      {/* Add Integration Form */}
      {isAddingIntegration && (
        <div className="mb-6 bg-white dark:bg-slate-900 border-2 border-amber-500 dark:border-amber-400 rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
              Add New Integration
            </h3>

            <div className="space-y-4">
              {/* Integration Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  Integration Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIntegrationType('database')
                      setProvider('')
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      integrationType === 'database'
                        ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950'
                        : 'border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <Database className={`w-5 h-5 mx-auto mb-2 ${
                      integrationType === 'database'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-stone-600 dark:text-stone-400'
                    }`} />
                    <span className={`block text-sm font-medium ${
                      integrationType === 'database'
                        ? 'text-amber-900 dark:text-amber-100'
                        : 'text-slate-900 dark:text-slate-50'
                    }`}>
                      Database
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIntegrationType('analytics')
                      setProvider('')
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      integrationType === 'analytics'
                        ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950'
                        : 'border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <TrendingUp className={`w-5 h-5 mx-auto mb-2 ${
                      integrationType === 'analytics'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-stone-600 dark:text-stone-400'
                    }`} />
                    <span className={`block text-sm font-medium ${
                      integrationType === 'analytics'
                        ? 'text-amber-900 dark:text-amber-100'
                        : 'text-slate-900 dark:text-slate-50'
                    }`}>
                      Analytics
                    </span>
                  </button>
                </div>
              </div>

              {/* Provider Selection */}
              {integrationType && (
                <div>
                  <label htmlFor="provider" className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Provider
                  </label>
                  <select
                    id="provider"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as IntegrationProvider)}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent transition-shadow"
                    required
                  >
                    <option value="">Select a provider</option>
                    {availableProviders.map((p) => (
                      <option key={p} value={p}>
                        {providerLabels[p]}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Integration Name */}
              {provider && (
                <div>
                  <label htmlFor="integration-name" className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Integration Name
                  </label>
                  <input
                    id="integration-name"
                    type="text"
                    value={integrationName}
                    onChange={(e) => setIntegrationName(e.target.value)}
                    placeholder="e.g., Production Database"
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent transition-shadow"
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 font-semibold rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!integrationType || !provider || !integrationName}
                className="px-4 py-2 bg-amber-500 dark:bg-amber-400 hover:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-900 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Add Integration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Integrations List */}
      <div className="space-y-4">
        {integrations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-12 text-center">
            <Database className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              No integrations configured yet. Add your first integration to get started.
            </p>
          </div>
        ) : (
          integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onTest={onTest}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}