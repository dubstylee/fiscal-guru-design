'use client'

import { useState } from 'react'
import { TrendingUp, Eye, EyeOff, X } from 'lucide-react'
import type { AnalyticsConfig, IntegrationProvider, IntegrationConfig } from '@/../product/sections/initial-setup/types'

interface AnalyticsStepProps {
  config: AnalyticsConfig
  onUpdate?: (config: AnalyticsConfig) => void
}

const analyticsProviders: IntegrationProvider[] = ['posthog', 'datadog']

const providerLabels: Record<IntegrationProvider, string> = {
  postgresql: 'PostgreSQL',
  supabase: 'Supabase',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  posthog: 'PostHog',
  datadog: 'Datadog',
  'supabase-auth': 'Supabase Auth',
}

export function AnalyticsStep({ config, onUpdate }: AnalyticsStepProps) {
  const [localConfig, setLocalConfig] = useState<AnalyticsConfig>(config)
  const [showPostHogApiKey, setShowPostHogApiKey] = useState(false)
  const [showDatadogApiKey, setShowDatadogApiKey] = useState(false)
  const [showDatadogAppKey, setShowDatadogAppKey] = useState(false)

  const handleProviderChange = (provider: IntegrationProvider) => {
    let newConfig: IntegrationConfig = {}

    if (provider === 'posthog') {
      newConfig = { apiKey: '', host: 'https://app.posthog.com' }
    } else if (provider === 'datadog') {
      newConfig = { apiKey: '', applicationKey: '', site: 'datadoghq.com' }
    }

    const updated: AnalyticsConfig = {
      provider,
      name: '',
      config: newConfig,
    }
    setLocalConfig(updated)
    onUpdate?.(updated)
  }

  const handleNameChange = (name: string) => {
    if (!localConfig) {
      // Initialize config if null
      const newConfig: AnalyticsConfig = {
        provider: 'posthog',
        name,
        config: { apiKey: '', host: 'https://app.posthog.com' },
      }
      setLocalConfig(newConfig)
      onUpdate?.(newConfig)
      return
    }
    const updated = { ...localConfig, name }
    setLocalConfig(updated)
    onUpdate?.(updated)
  }

  const handleConfigChange = (key: string, value: string) => {
    if (!localConfig) {
      // Initialize config if null
      const newConfig: AnalyticsConfig = {
        provider: 'posthog',
        name: '',
        config: { [key]: value, apiKey: '', host: 'https://app.posthog.com' },
      }
      setLocalConfig(newConfig)
      onUpdate?.(newConfig)
      return
    }
    const updated = {
      ...localConfig,
      config: { ...localConfig.config, [key]: value },
    }
    setLocalConfig(updated)
    onUpdate?.(updated)
  }

  const handleClear = () => {
    setLocalConfig(null)
    onUpdate?.(null)
  }

  return (
    <div className="space-y-6">
      {/* Optional Notice */}
      <div className="bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-lg p-4">
        <p className="text-sm text-stone-600 dark:text-stone-400">
          <span className="font-semibold">Optional:</span> Analytics integration can be configured now or later in Settings.
        </p>
      </div>

      {/* Integration Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
          Integration Name
        </label>
        <input
          type="text"
          value={localConfig?.name || ''}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., Analytics Tracking"
          className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
        />
      </div>

      {/* Provider Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50">
            Analytics Provider
          </label>
          {localConfig && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 font-semibold flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {analyticsProviders.map((provider) => (
            <button
              key={provider}
              type="button"
              onClick={() => handleProviderChange(provider)}
              className={`p-4 rounded-lg border-2 transition-all ${
                localConfig?.provider === provider
                  ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/30'
                  : 'border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700'
              }`}
            >
              <TrendingUp className="w-5 h-5 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                {providerLabels[provider]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Fields */}
      {localConfig?.provider && (
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider">
            Configuration
          </h4>
          {localConfig.provider === 'posthog' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showPostHogApiKey ? 'text' : 'password'}
                    value={(localConfig.config as { apiKey: string; host: string }).apiKey || ''}
                    onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                    placeholder="phc_1234567890abcdef..."
                    className="w-full px-4 py-2.5 pr-10 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPostHogApiKey(!showPostHogApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                    aria-label={showPostHogApiKey ? 'Hide API key' : 'Show API key'}
                  >
                    {showPostHogApiKey ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  Host
                </label>
                <input
                  type="url"
                  value={(localConfig.config as { apiKey: string; host: string }).host || ''}
                  onChange={(e) => handleConfigChange('host', e.target.value)}
                  placeholder="https://app.posthog.com"
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>
          )}
          {localConfig.provider === 'datadog' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showDatadogApiKey ? 'text' : 'password'}
                    value={(localConfig.config as { apiKey: string; applicationKey: string; site: string }).apiKey || ''}
                    onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                    placeholder="dd1234567890abcdef"
                    className="w-full px-4 py-2.5 pr-10 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDatadogApiKey(!showDatadogApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                    aria-label={showDatadogApiKey ? 'Hide API key' : 'Show API key'}
                  >
                    {showDatadogApiKey ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  Application Key
                </label>
                <div className="relative">
                  <input
                    type={showDatadogAppKey ? 'text' : 'password'}
                    value={(localConfig.config as { apiKey: string; applicationKey: string; site: string }).applicationKey || ''}
                    onChange={(e) => handleConfigChange('applicationKey', e.target.value)}
                    placeholder="app9876543210fedcba"
                    className="w-full px-4 py-2.5 pr-10 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDatadogAppKey(!showDatadogAppKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                    aria-label={showDatadogAppKey ? 'Hide application key' : 'Show application key'}
                  >
                    {showDatadogAppKey ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  Site
                </label>
                <input
                  type="text"
                  value={(localConfig.config as { apiKey: string; applicationKey: string; site: string }).site || ''}
                  onChange={(e) => handleConfigChange('site', e.target.value)}
                  placeholder="datadoghq.com"
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

