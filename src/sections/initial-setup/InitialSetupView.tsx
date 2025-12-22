'use client'

import { useState } from 'react'
import data from '@/../product/sections/initial-setup/data.json'
import { InitialSetup } from './components/InitialSetup'
import type { SetupState, DatabaseConfig, IdentityProviderConfig, AnalyticsConfig, SetupSummary } from '@/../product/sections/initial-setup/types'

export default function InitialSetupView() {
  const [setupState, setSetupState] = useState<SetupState>(data.setupState)
  const [databaseConfig, setDatabaseConfig] = useState<DatabaseConfig>(data.databaseConfig)
  const [identityProviderConfig, setIdentityProviderConfig] = useState<IdentityProviderConfig>(data.identityProviderConfig)
  const [analyticsConfig, setAnalyticsConfig] = useState<AnalyticsConfig>(data.analyticsConfig)
  const [setupSummary, setSetupSummary] = useState<SetupSummary>(data.setupSummary)

  const handleNext = () => {
    const newStep = setupState.currentStep + 1
    
    // Mark current step as completed
    const updatedStepsCompleted = { ...setupState.stepsCompleted }
    if (setupState.currentStep === 1) {
      updatedStepsCompleted.database = true
    } else if (setupState.currentStep === 2) {
      updatedStepsCompleted.identityProvider = true
    } else if (setupState.currentStep === 3) {
      updatedStepsCompleted.analytics = true
    }

    // If moving to step 4 (summary), build the summary
    if (newStep === 4) {
      const summary: SetupSummary = {
        database: databaseConfig.provider && databaseConfig.provider !== '' && databaseConfig.name && databaseConfig.name.trim() !== ''
          ? {
              provider: databaseConfig.provider as any,
              name: databaseConfig.name,
              type: 'database',
              config: databaseConfig.config as any,
            }
          : null,
        identityProvider: identityProviderConfig && identityProviderConfig.provider && identityProviderConfig.name
          ? {
              provider: identityProviderConfig.provider,
              name: identityProviderConfig.name,
              type: 'identity-provider',
              config: identityProviderConfig.config,
            }
          : null,
        analytics: analyticsConfig && analyticsConfig.provider && analyticsConfig.name
          ? {
              provider: analyticsConfig.provider,
              name: analyticsConfig.name,
              type: 'analytics',
              config: analyticsConfig.config,
            }
          : null,
      }
      setSetupSummary(summary)
    }

    setSetupState({
      ...setupState,
      currentStep: newStep,
      stepsCompleted: updatedStepsCompleted,
    })
  }

  const handleBack = () => {
    const newStep = setupState.currentStep - 1
    setSetupState({
      ...setupState,
      currentStep: newStep,
    })
  }

  const handleSkip = (step: 'identityProvider' | 'analytics') => {
    const updatedStepsSkipped = { ...setupState.stepsSkipped }
    updatedStepsSkipped[step] = true

    const newStep = setupState.currentStep + 1

    // Clear the config when skipping
    let clearedIdentityProvider: IdentityProviderConfig | null = identityProviderConfig
    let clearedAnalytics: AnalyticsConfig | null = analyticsConfig
    
    if (step === 'identityProvider') {
      clearedIdentityProvider = null
      setIdentityProviderConfig(null)
    } else if (step === 'analytics') {
      clearedAnalytics = null
      setAnalyticsConfig(null)
    }

    // If moving to step 4 (summary), rebuild the summary with cleared configs
    if (newStep === 4) {
      const summary: SetupSummary = {
        database: databaseConfig.provider && databaseConfig.provider !== '' && databaseConfig.name && databaseConfig.name.trim() !== ''
          ? {
              provider: databaseConfig.provider as any,
              name: databaseConfig.name,
              type: 'database',
              config: databaseConfig.config as any,
            }
          : null,
        identityProvider: clearedIdentityProvider && clearedIdentityProvider.provider && clearedIdentityProvider.name
          ? {
              provider: clearedIdentityProvider.provider,
              name: clearedIdentityProvider.name,
              type: 'identity-provider',
              config: clearedIdentityProvider.config,
            }
          : null,
        analytics: clearedAnalytics && clearedAnalytics.provider && clearedAnalytics.name
          ? {
              provider: clearedAnalytics.provider,
              name: clearedAnalytics.name,
              type: 'analytics',
              config: clearedAnalytics.config,
            }
          : null,
      }
      setSetupSummary(summary)
    }

    setSetupState({
      ...setupState,
      stepsSkipped: updatedStepsSkipped,
      currentStep: newStep,
    })
  }

  const handleUpdateDatabase = (config: Partial<DatabaseConfig>) => {
    setDatabaseConfig({ ...databaseConfig, ...config })
  }

  const handleUpdateIdentityProvider = (config: IdentityProviderConfig) => {
    setIdentityProviderConfig(config)
  }

  const handleUpdateAnalytics = (config: AnalyticsConfig) => {
    setAnalyticsConfig(config)
  }

  const handleComplete = () => {
    // Build summary from current configs
    const summary: SetupSummary = {
      database: databaseConfig.provider && databaseConfig.name
        ? {
            provider: databaseConfig.provider as any,
            name: databaseConfig.name,
            type: 'database',
            config: databaseConfig.config as any,
          }
        : null,
      identityProvider: identityProviderConfig
        ? {
            provider: identityProviderConfig.provider,
            name: identityProviderConfig.name,
            type: 'identity-provider',
            config: identityProviderConfig.config,
          }
        : null,
      analytics: analyticsConfig
        ? {
            provider: analyticsConfig.provider,
            name: analyticsConfig.name,
            type: 'analytics',
            config: analyticsConfig.config,
          }
        : null,
    }

    setSetupSummary(summary)
    console.log('Setup complete!', summary)
  }

  return (
    <InitialSetup
      setupState={setupState}
      databaseConfig={databaseConfig}
      identityProviderConfig={identityProviderConfig}
      analyticsConfig={analyticsConfig}
      setupSummary={setupSummary}
      onNext={handleNext}
      onBack={handleBack}
      onSkip={handleSkip}
      onUpdateDatabase={handleUpdateDatabase}
      onUpdateIdentityProvider={handleUpdateIdentityProvider}
      onUpdateAnalytics={handleUpdateAnalytics}
      onTestDatabase={() => console.log('Test database connection')}
      onComplete={handleComplete}
    />
  )
}

