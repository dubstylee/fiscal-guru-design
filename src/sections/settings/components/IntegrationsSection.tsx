'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Database, TrendingUp, Shield } from 'lucide-react'
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
  const formRef = useRef<HTMLDivElement>(null)

  const databaseProviders: IntegrationProvider[] = ['postgresql', 'supabase', 'mysql', 'sqlite']
  const analyticsProviders: IntegrationProvider[] = ['posthog', 'datadog']
  const identityProviders: IntegrationProvider[] = ['supabase-auth']

  const providerLabels: Record<IntegrationProvider, string> = {
    postgresql: 'PostgreSQL',
    supabase: 'Supabase',
    mysql: 'MySQL',
    sqlite: 'SQLite',
    posthog: 'PostHog',
    datadog: 'Datadog',
    'supabase-auth': 'Supabase Auth',
  }

  // Group integrations by type
  const databaseIntegrations = integrations.filter((i) => i.type === 'database')
  const analyticsIntegrations = integrations.filter((i) => i.type === 'analytics')
  const identityIntegrations = integrations.filter((i) => i.type === 'identity-provider')

  const handleAddClick = (type?: IntegrationType) => {
    setIsAddingIntegration(true)
    setIntegrationType(type || '')
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
    } else if (provider === 'sqlite') {
      config = { filePath: '' }
    } else if (provider === 'posthog') {
      config = { apiKey: '', host: 'https://app.posthog.com' }
    } else if (provider === 'datadog') {
      config = { apiKey: '', applicationKey: '', site: 'datadoghq.com' }
    } else if (provider === 'supabase-auth') {
      config = { projectUrl: '', anonKey: '' }
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

  const availableProviders = integrationType === 'database' ? databaseProviders : integrationType === 'analytics' ? analyticsProviders : integrationType === 'identity-provider' ? identityProviders : []

  // Scroll to form when it appears
  useEffect(() => {
    if (isAddingIntegration && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isAddingIntegration])

  // Render a group section
  const renderIntegrationGroup = (
    type: IntegrationType,
    title: string,
    icon: React.ElementType,
    groupIntegrations: Integration[]
  ) => {
    const Icon = icon

    return (
      <div key={type}>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
              {title}
            </h3>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              ({groupIntegrations.length})
            </span>
          </div>
          {!isAddingIntegration && (
            <button
              onClick={() => handleAddClick(type)}
              className="px-3 py-1.5 bg-amber-500 dark:bg-amber-400 hover:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-900 font-semibold rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        {/* Integration Cards or Empty State */}
        {groupIntegrations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-8 text-center mb-8">
            <Icon className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-3">
              No {title.toLowerCase()} configured yet.
            </p>
            {!isAddingIntegration && (
              <button
                onClick={() => handleAddClick(type)}
                className="px-4 py-2 bg-amber-500 dark:bg-amber-400 hover:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-900 font-semibold rounded-lg transition-colors text-sm inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add {title.slice(0, -1)}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {groupIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onTest={onTest}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section>
      {/* Add Integration Form */}
      {isAddingIntegration && (
        <div ref={formRef} className="mb-8 bg-white dark:bg-slate-900 border-2 border-amber-500 dark:border-amber-400 rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
              Add New Integration
            </h3>

            <div className="space-y-4">
              {/* Integration Type - Only show if not pre-selected */}
              {!integrationType && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Integration Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIntegrationType('database')
                        setProvider('')
                      }}
                      className="p-4 rounded-lg border-2 border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700 transition-all"
                    >
                      <Database className="w-5 h-5 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
                      <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                        Database
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIntegrationType('analytics')
                        setProvider('')
                      }}
                      className="p-4 rounded-lg border-2 border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700 transition-all"
                    >
                      <TrendingUp className="w-5 h-5 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
                      <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                        Analytics
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIntegrationType('identity-provider')
                        setProvider('')
                      }}
                      className="p-4 rounded-lg border-2 border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700 transition-all"
                    >
                      <Shield className="w-5 h-5 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
                      <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                        Identity
                      </span>
                    </button>
                  </div>
                </div>
              )}

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

      {/* Integration Groups */}
      <div className="space-y-8">
        {renderIntegrationGroup('database', 'Database Integrations', Database, databaseIntegrations)}
        {renderIntegrationGroup('analytics', 'Analytics Integrations', TrendingUp, analyticsIntegrations)}
        {renderIntegrationGroup('identity-provider', 'Identity Provider Integrations', Shield, identityIntegrations)}
      </div>
    </section>
  )
}
