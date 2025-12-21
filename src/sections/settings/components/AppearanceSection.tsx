'use client'

import { Sun, Moon, Monitor, Globe, Layout } from 'lucide-react'
import type { AppearanceSettings } from '@/../product/sections/settings/types'

interface AppearanceSectionProps {
  settings: AppearanceSettings
  onUpdate?: (settings: Partial<AppearanceSettings>) => void
}

export function AppearanceSection({ settings, onUpdate }: AppearanceSectionProps) {
  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ]

  const languages = [
    { value: 'en' as const, label: 'English' },
    { value: 'es' as const, label: 'Español' },
    { value: 'fr' as const, label: 'Français' },
    { value: 'de' as const, label: 'Deutsch' },
    { value: 'ja' as const, label: '日本語' },
    { value: 'zh' as const, label: '中文' },
  ]

  const densities = [
    { value: 'compact' as const, label: 'Compact', description: 'Maximum information density' },
    { value: 'comfortable' as const, label: 'Comfortable', description: 'Balanced spacing' },
    { value: 'spacious' as const, label: 'Spacious', description: 'Generous whitespace' },
  ]

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
          Appearance
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Customize how the application looks and feels
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 shadow-sm space-y-8">
        {/* Theme */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {themes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onUpdate?.({ theme: value })}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  settings.theme === value
                    ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950'
                    : 'border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon
                  className={`w-5 h-5 mx-auto mb-2 ${
                    settings.theme === value
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                />
                <span
                  className={`block text-sm font-medium ${
                    settings.theme === value
                      ? 'text-amber-900 dark:text-amber-100'
                      : 'text-slate-900 dark:text-slate-50'
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Language
          </label>
          <select
            id="language"
            value={settings.language}
            onChange={(e) => onUpdate?.({ language: e.target.value as AppearanceSettings['language'] })}
            className="w-full sm:w-auto px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent transition-shadow"
          >
            {languages.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Display Density */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
            <Layout className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Display Density
          </label>
          <div className="space-y-2">
            {densities.map(({ value, label, description }) => (
              <button
                key={value}
                onClick={() => onUpdate?.({ displayDensity: value })}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  settings.displayDensity === value
                    ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950'
                    : 'border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 hover:border-stone-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`block font-medium text-sm mb-0.5 ${
                        settings.displayDensity === value
                          ? 'text-amber-900 dark:text-amber-100'
                          : 'text-slate-900 dark:text-slate-50'
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400">
                      {description}
                    </span>
                  </div>
                  {settings.displayDensity === value && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 dark:bg-amber-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white dark:bg-slate-900" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}