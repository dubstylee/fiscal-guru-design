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
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Settings
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
            Manage your account, customize your experience, and configure integrations
          </p>
        </div>

        {/* Settings Sections */}
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

          <IntegrationsSection
            integrations={integrations}
            onAdd={onAddIntegration}
            onEdit={onEditIntegration}
            onTest={onTestIntegration}
            onToggle={onToggleIntegration}
            onDelete={onDeleteIntegration}
          />
        </div>
      </div>
    </div>
  )
}