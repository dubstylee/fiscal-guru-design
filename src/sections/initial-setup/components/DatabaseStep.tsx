'use client'

import { useState } from 'react'
import { AlertTriangle, Database, TestTube } from 'lucide-react'
import type { DatabaseConfig, IntegrationProvider, IntegrationConfig } from '@/../product/sections/initial-setup/types'

interface DatabaseStepProps {
  config: DatabaseConfig
  onUpdate?: (config: Partial<DatabaseConfig>) => void
  onTest?: () => void
}

const databaseProviders: IntegrationProvider[] = ['postgresql', 'supabase', 'mysql', 'sqlite']

const providerLabels: Record<IntegrationProvider, string> = {
  postgresql: 'PostgreSQL',
  supabase: 'Supabase',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  posthog: 'PostHog',
  datadog: 'Datadog',
  'supabase-auth': 'Supabase Auth',
}

export function DatabaseStep({ config, onUpdate, onTest }: DatabaseStepProps) {
  const [localConfig, setLocalConfig] = useState<DatabaseConfig>(config)

  const handleProviderChange = (provider: IntegrationProvider) => {
    let newConfig: IntegrationConfig = {}

    if (provider === 'postgresql') {
      newConfig = { host: '', port: 5432, database: '', username: '', sslMode: 'require' as const }
    } else if (provider === 'supabase') {
      newConfig = { projectUrl: '', apiKey: '', serviceRole: false }
    } else if (provider === 'mysql') {
      newConfig = { host: '', port: 3306, database: '', username: '' }
    } else if (provider === 'sqlite') {
      newConfig = { filePath: '' }
    }

    const updated = { ...localConfig, provider, config: newConfig }
    setLocalConfig(updated)
    onUpdate?.(updated)
  }

  const handleNameChange = (name: string) => {
    const updated = { ...localConfig, name }
    setLocalConfig(updated)
    onUpdate?.(updated)
  }

  const handleConfigChange = (key: string, value: string | number | boolean) => {
    const updated = {
      ...localConfig,
      config: { ...localConfig.config, [key]: value },
    }
    setLocalConfig(updated)
    onUpdate?.(updated)
  }

  const renderConfigFields = () => {
    if (!localConfig.provider) return null

    if (localConfig.provider === 'postgresql' || localConfig.provider === 'mysql') {
      const dbConfig = localConfig.config as { host: string; port: number; database: string; username: string }
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Host
            </label>
            <input
              type="text"
              value={dbConfig.host || ''}
              onChange={(e) => handleConfigChange('host', e.target.value)}
              placeholder="localhost"
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Port
            </label>
            <input
              type="number"
              value={dbConfig.port || ''}
              onChange={(e) => handleConfigChange('port', parseInt(e.target.value) || 0)}
              placeholder={localConfig.provider === 'postgresql' ? '5432' : '3306'}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Database Name
            </label>
            <input
              type="text"
              value={dbConfig.database || ''}
              onChange={(e) => handleConfigChange('database', e.target.value)}
              placeholder="fiscal_guru"
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Username
            </label>
            <input
              type="text"
              value={dbConfig.username || ''}
              onChange={(e) => handleConfigChange('username', e.target.value)}
              placeholder="postgres"
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        </div>
      )
    }

    if (localConfig.provider === 'supabase') {
      const supabaseConfig = localConfig.config as { projectUrl: string; apiKey: string; serviceRole?: boolean }
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Project URL
            </label>
            <input
              type="url"
              value={supabaseConfig.projectUrl || ''}
              onChange={(e) => handleConfigChange('projectUrl', e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={supabaseConfig.apiKey || ''}
              onChange={(e) => handleConfigChange('apiKey', e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        </div>
      )
    }

    if (localConfig.provider === 'sqlite') {
      const sqliteConfig = localConfig.config as { filePath: string }
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
              Database File Path
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sqliteConfig.filePath || ''}
                onChange={(e) => handleConfigChange('filePath', e.target.value)}
                placeholder="/path/to/database.db"
                className="flex-1 px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 font-semibold rounded-lg transition-colors text-sm"
              >
                Browse
              </button>
            </div>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              SQLite uses a file-based database. Select the database file location.
            </p>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
              Database Required
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              A database connection is required for Fiscal Guru to function. The application will not work without a properly configured database.
            </p>
          </div>
        </div>
      </div>

      {/* Integration Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
          Integration Name
        </label>
        <input
          type="text"
          value={localConfig.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., Production Database"
          className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
        />
      </div>

      {/* Provider Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
          Database Provider
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {databaseProviders.map((provider) => (
            <button
              key={provider}
              type="button"
              onClick={() => handleProviderChange(provider)}
              className={`p-4 rounded-lg border-2 transition-all ${
                localConfig.provider === provider
                  ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/30'
                  : 'border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700'
              }`}
            >
              <Database className="w-5 h-5 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                {providerLabels[provider]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Fields */}
      {localConfig.provider && (
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider">
            Configuration
          </h4>
          {renderConfigFields()}
          {localConfig.provider && (
            <button
              type="button"
              onClick={onTest}
              className="mt-4 px-4 py-2 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 font-semibold rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <TestTube className="w-4 h-4" />
              Test Connection
            </button>
          )}
        </div>
      )}
    </div>
  )
}

