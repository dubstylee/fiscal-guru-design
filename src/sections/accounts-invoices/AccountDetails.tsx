import data from '@/../product/sections/accounts-invoices/data.json'
import { AccountDetails } from './components/AccountDetails'

export default function AccountDetailsPreview() {
  // Get the first account for preview
  const account = data.accounts[0]

  // Filter invoices and payments for this account
  const accountInvoices = data.invoices.filter(inv => inv.accountId === account.id)
  const accountPayments = data.payments.filter(pay => pay.accountId === account.id)

  return (
    <AccountDetails
      account={account}
      invoices={accountInvoices}
      payments={accountPayments}
      onEdit={() => console.log('Edit account')}
      onDelete={() => console.log('Delete account')}
      onToggleStatus={() => console.log('Toggle status')}
      onCreateInvoice={() => console.log('Create new invoice')}
      onViewInvoice={(id) => console.log('View invoice:', id)}
      onBack={() => console.log('Back to account list')}
    />
  )
}
