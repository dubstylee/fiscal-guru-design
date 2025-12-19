import data from '@/../product/sections/accounts-invoices/data.json'
import { AccountList } from './components/AccountList'

export default function AccountListPreview() {
  return (
    <AccountList
      accounts={data.accounts}
      onView={(id) => console.log('View account:', id)}
      onEdit={(id) => console.log('Edit account:', id)}
      onDelete={(id) => console.log('Delete account:', id)}
      onToggleStatus={(id) => console.log('Toggle status:', id)}
      onCreate={() => console.log('Create new account')}
      onFilterChange={(filters) => console.log('Filter change:', filters)}
      onSearch={(query) => console.log('Search:', query)}
    />
  )
}
