// =============================================================================
// Data Types
// =============================================================================

export interface User {
  id: string
  name: string
  email: string
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh'
  displayDensity: 'compact' | 'comfortable' | 'spacious'
}

export type IntegrationType = 'database' | 'analytics'

export type IntegrationProvider = 'postgresql' | 'supabase' | 'mysql' | 'posthog' | 'datadog'

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'testing'

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

export interface PostHogConfig {
  apiKey: string
  host: string
}

export interface DatadogConfig {
  apiKey: string
  applicationKey: string
  site: string
}

export type IntegrationConfig =
  | PostgreSQLConfig
  | SupabaseConfig
  | MySQLConfig
  | PostHogConfig
  | DatadogConfig

export interface Integration {
  id: string
  name: string
  type: IntegrationType
  provider: IntegrationProvider
  status: IntegrationStatus
  enabled: boolean
  config: IntegrationConfig
  lastTested: string | null
  lastError?: string
  createdAt: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface SettingsProps {
  /** Current user account information */
  user: User
  /** Current appearance settings */
  appearanceSettings: AppearanceSettings
  /** List of configured integrations */
  integrations: Integration[]
  /** Called when user updates their email address */
  onUpdateEmail?: (newEmail: string) => void
  /** Called when user updates their password */
  onUpdatePassword?: (currentPassword: string, newPassword: string) => void
  /** Called when user changes appearance settings */
  onUpdateAppearance?: (settings: Partial<AppearanceSettings>) => void
  /** Called when user adds a new integration */
  onAddIntegration?: (integration: Omit<Integration, 'id' | 'createdAt' | 'lastTested'>) => void
  /** Called when user edits an existing integration's configuration */
  onEditIntegration?: (id: string, updates: Partial<Integration>) => void
  /** Called when user tests an integration connection */
  onTestIntegration?: (id: string) => void
  /** Called when user toggles an integration on/off */
  onToggleIntegration?: (id: string, enabled: boolean) => void
  /** Called when user deletes an integration */
  onDeleteIntegration?: (id: string) => void
}