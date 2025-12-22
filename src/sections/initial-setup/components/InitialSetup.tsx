'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import type { InitialSetupProps } from '@/../product/sections/initial-setup/types'
import { StepIndicator } from './StepIndicator'
import { DatabaseStep } from './DatabaseStep'
import { IdentityProviderStep } from './IdentityProviderStep'
import { AnalyticsStep } from './AnalyticsStep'
import { SummaryStep } from './SummaryStep'
import { WarningDialog } from './WarningDialog'

/**
 * Design tokens: Primary: slate, Secondary: amber, Neutral: stone
 * Typography: Inter (heading & body), IBM Plex Mono (mono)
 *
 * Aesthetic Direction: Guided Setup
 * A clear, step-by-step wizard interface that guides users through initial configuration
 * with helpful warnings, optional steps, and a final review. Uses amber accents for
 * progress indicators and warnings, with clean form layouts.
 */

export function InitialSetup({
  setupState,
  databaseConfig,
  identityProviderConfig,
  analyticsConfig,
  setupSummary,
  onNext,
  onBack,
  onSkip,
  onUpdateDatabase,
  onUpdateIdentityProvider,
  onUpdateAnalytics,
  onTestDatabase,
  onComplete,
}: InitialSetupProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const steps = [
    { number: 1, label: 'Database', completed: setupState.stepsCompleted.database },
    { number: 2, label: 'Identity', completed: setupState.stepsCompleted.identityProvider },
    { number: 3, label: 'Analytics', completed: setupState.stepsCompleted.analytics },
    { number: 4, label: 'Review', completed: false },
  ]

  const handleNext = () => {
    // Validate database on step 1
    if (setupState.currentStep === 1) {
      if (!databaseConfig.provider || !databaseConfig.name) {
        setShowWarning(true)
        return
      }
    }

    // Validate identity provider on step 2 (if configuring, must be complete)
    if (setupState.currentStep === 2 && identityProviderConfig && (!identityProviderConfig.provider || !identityProviderConfig.name)) {
      return // Don't proceed if partially filled
    }

    // Validate analytics on step 3 (if configuring, must be complete)
    if (setupState.currentStep === 3 && analyticsConfig && (!analyticsConfig.provider || !analyticsConfig.name)) {
      return // Don't proceed if partially filled
    }

    onNext?.()
  }

  const handleComplete = () => {
    // Check if database is configured
    if (!databaseConfig.provider || !databaseConfig.name) {
      setShowWarning(true)
      return
    }

    setShowSuccess(true)
    // After showing success, call onComplete
    setTimeout(() => {
      onComplete?.()
    }, 2000)
  }

  const renderStepContent = () => {
    switch (setupState.currentStep) {
      case 1:
        return (
          <DatabaseStep
            config={databaseConfig}
            onUpdate={onUpdateDatabase}
            onTest={onTestDatabase}
          />
        )
      case 2:
        return (
          <IdentityProviderStep
            config={identityProviderConfig}
            onUpdate={onUpdateIdentityProvider}
          />
        )
      case 3:
        return (
          <AnalyticsStep
            config={analyticsConfig}
            onUpdate={onUpdateAnalytics}
          />
        )
      case 4:
        return <SummaryStep summary={setupSummary} />
      default:
        return null
    }
  }

  const canProceed = () => {
    if (setupState.currentStep === 1) {
      return databaseConfig.provider && databaseConfig.name
    }
    // Optional steps: can proceed if null (skipped) or fully configured
    if (setupState.currentStep === 2) {
      return identityProviderConfig === null || (identityProviderConfig && identityProviderConfig.provider && identityProviderConfig.name)
    }
    if (setupState.currentStep === 3) {
      return analyticsConfig === null || (analyticsConfig && analyticsConfig.provider && analyticsConfig.name)
    }
    return true
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Welcome to Fiscal Guru
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
            Let's get your instance configured
          </p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 sm:p-8 mb-6">
          <StepIndicator
            currentStep={setupState.currentStep}
            totalSteps={setupState.totalSteps}
            steps={steps}
          />
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 sm:p-8 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-3 w-full sm:w-auto">
            {setupState.currentStep > 1 && (
              <button
                onClick={onBack}
                className="px-6 py-3 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 font-semibold rounded-lg transition-colors text-sm w-full sm:w-auto"
              >
                Back
              </button>
            )}
            {(setupState.currentStep === 2 || setupState.currentStep === 3) && (
              <button
                onClick={() => onSkip?.(setupState.currentStep === 2 ? 'identityProvider' : 'analytics')}
                className="px-6 py-3 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 font-semibold rounded-lg transition-colors text-sm w-full sm:w-auto"
              >
                Skip
              </button>
            )}
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            {setupState.currentStep < setupState.totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-3 bg-slate-900 dark:bg-slate-50 hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm w-full sm:w-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!databaseConfig.provider || !databaseConfig.name}
                className="px-6 py-3 bg-amber-500 dark:bg-amber-400 hover:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-900 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Complete Setup
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Warning Dialog */}
        <WarningDialog
          isOpen={showWarning}
          title="Database Required"
          message="A database connection is required for Fiscal Guru to function. Please configure a database before completing setup."
          onClose={() => setShowWarning(false)}
        />

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full border border-stone-200 dark:border-slate-800 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">
                Setup Complete!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Redirecting to Dashboard...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

