// =============================================================================
// Data Types
// =============================================================================

// Reuse integration types from Settings
export type IntegrationType = 'database' | 'analytics' | 'identity-provider'

export type IntegrationProvider = 'postgresql' | 'supabase' | 'mysql' | 'sqlite' | 'posthog' | 'datadog' | 'supabase-auth'

export interface PostgreSQLConfig {
  host: string
  port: number
  database: string
  username: string
  sslMode?: 'disable' | 'require' | 'verify-ca' | 'verify-full'
}

export interface SupabaseConfig {
  projectUrl: string
  apiKey: string
  serviceRole?: boolean
}

export interface MySQLConfig {
  host: string
  port: number
  database: string
  username: string
}

export interface SQLiteConfig {
  filePath: string
}

export interface PostHogConfig {
  apiKey: string
  host: string
}

export interface DatadogConfig {
  apiKey: string
  applicationKey: string
  site: string
}

export interface SupabaseAuthConfig {
  projectUrl: string
  anonKey: string
}

export type IntegrationConfig =
  | PostgreSQLConfig
  | SupabaseConfig
  | MySQLConfig
  | SQLiteConfig
  | PostHogConfig
  | DatadogConfig
  | SupabaseAuthConfig

export interface SetupState {
  currentStep: number
  totalSteps: number
  stepsCompleted: {
    database: boolean
    identityProvider: boolean
    analytics: boolean
  }
  stepsSkipped: {
    identityProvider: boolean
    analytics: boolean
  }
}

export interface DatabaseConfig {
  provider: IntegrationProvider | ''
  name: string
  config: IntegrationConfig | Record<string, never>
}

export interface IdentityProviderConfig {
  provider: IntegrationProvider
  name: string
  config: IntegrationConfig
} | null

export interface AnalyticsConfig {
  provider: IntegrationProvider
  name: string
  config: IntegrationConfig
} | null

export interface SetupSummaryIntegration {
  provider: IntegrationProvider
  name: string
  type: IntegrationType
  config: IntegrationConfig
}

export interface SetupSummary {
  database: SetupSummaryIntegration | null
  identityProvider: SetupSummaryIntegration | null
  analytics: SetupSummaryIntegration | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface InitialSetupProps {
  /** Current state of the setup wizard */
  setupState: SetupState
  /** Database configuration being set up (required) */
  databaseConfig: DatabaseConfig
  /** Identity provider configuration being set up (optional) */
  identityProviderConfig: IdentityProviderConfig
  /** Analytics configuration being set up (optional) */
  analyticsConfig: AnalyticsConfig
  /** Summary of configured integrations for review step */
  setupSummary: SetupSummary
  /** Called when user navigates to the next step */
  onNext?: () => void
  /** Called when user navigates to the previous step */
  onBack?: () => void
  /** Called when user skips an optional step */
  onSkip?: (step: 'identityProvider' | 'analytics') => void
  /** Called when user updates database configuration */
  onUpdateDatabase?: (config: Partial<DatabaseConfig>) => void
  /** Called when user updates identity provider configuration */
  onUpdateIdentityProvider?: (config: IdentityProviderConfig) => void
  /** Called when user updates analytics configuration */
  onUpdateAnalytics?: (config: AnalyticsConfig) => void
  /** Called when user tests a database connection */
  onTestDatabase?: () => void
  /** Called when user completes the setup wizard */
  onComplete?: () => void
}

