'use client'

import { useState } from 'react'
import type { SettingsProps } from '@/../product/sections/settings/types'
import { UserSettingsSection } from './UserSettingsSection'
import { AppearanceSection } from './AppearanceSection'
import { IntegrationsSection } from './IntegrationsSection'

/**
 * Design tokens: Primary: slate, Secondary: amber, Neutral: stone
 * Typography: Inter (heading & body), IBM Plex Mono (mono)
 *
 * Aesthetic Direction: Technical Precision
 * A refined, utilitarian interface that balances professional clarity with subtle warmth.
 * Uses tabular layouts, monospace details, and amber accents to create a confident,
 * developer-friendly settings experience.
 */

type Tab = 'profile' | 'integrations'

export function Settings({
  user,
  appearanceSettings,
  integrations,
  onUpdateEmail,
  onUpdatePassword,
  onUpdateAppearance,
  onAddIntegration,
  onEditIntegration,
  onTestIntegration,
  onToggleIntegration,
  onDeleteIntegration,
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950">
      {/* Header with Tab Navigation */}
      <div className="border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Settings
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
              Manage your profile and system integrations
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                activeTab === 'profile'
                  ? 'text-slate-900 dark:text-slate-50 border-b-2 border-amber-500 dark:border-amber-400'
                  : 'text-stone-500 dark:text-stone-400 hover:text-slate-700 dark:hover:text-slate-300 border-b-2 border-transparent'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                activeTab === 'integrations'
                  ? 'text-slate-900 dark:text-slate-50 border-b-2 border-amber-500 dark:border-amber-400'
                  : 'text-stone-500 dark:text-stone-400 hover:text-slate-700 dark:hover:text-slate-300 border-b-2 border-transparent'
              }`}
            >
              Integrations
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'profile' ? (
          <div className="space-y-8 sm:space-y-12">
            <UserSettingsSection
              user={user}
              onUpdateEmail={onUpdateEmail}
              onUpdatePassword={onUpdatePassword}
            />
            <AppearanceSection
              settings={appearanceSettings}
              onUpdate={onUpdateAppearance}
            />
          </div>
        ) : (
          <IntegrationsSection
            integrations={integrations}
            onAdd={onAddIntegration}
            onEdit={onEditIntegration}
            onTest={onTestIntegration}
            onToggle={onToggleIntegration}
            onDelete={onDeleteIntegration}
          />
        )}
      </div>
    </div>
  )
}