import data from '@/../product/sections/initial-setup/data.json'
import { InitialSetup } from './components/InitialSetup'

export default function InitialSetupView() {
  return (
    <InitialSetup
      setupState={data.setupState}
      databaseConfig={data.databaseConfig}
      identityProviderConfig={data.identityProviderConfig}
      analyticsConfig={data.analyticsConfig}
      setupSummary={data.setupSummary}
      onNext={() => console.log('Next step')}
      onBack={() => console.log('Back step')}
      onSkip={(step) => console.log('Skip step:', step)}
      onUpdateDatabase={(config) => console.log('Update database:', config)}
      onUpdateIdentityProvider={(config) => console.log('Update identity provider:', config)}
      onUpdateAnalytics={(config) => console.log('Update analytics:', config)}
      onTestDatabase={() => console.log('Test database connection')}
      onComplete={() => console.log('Complete setup')}
    />
  )
}

