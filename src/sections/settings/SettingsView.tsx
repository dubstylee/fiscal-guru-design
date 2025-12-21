import data from '@/../product/sections/settings/data.json'
import { Settings } from './components/Settings'

export default function SettingsView() {
  return (
    <Settings
      user={data.user}
      appearanceSettings={data.appearanceSettings}
      integrations={data.integrations}
      onUpdateEmail={(email) => console.log('Update email:', email)}
      onUpdatePassword={(current, newPass) => console.log('Update password')}
      onUpdateAppearance={(settings) => console.log('Update appearance:', settings)}
      onAddIntegration={(integration) => console.log('Add integration:', integration)}
      onEditIntegration={(id, updates) => console.log('Edit integration:', id, updates)}
      onTestIntegration={(id) => console.log('Test integration:', id)}
      onToggleIntegration={(id, enabled) => console.log('Toggle integration:', id, enabled)}
      onDeleteIntegration={(id) => console.log('Delete integration:', id)}
    />
  )
}