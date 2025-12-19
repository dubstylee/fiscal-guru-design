import data from '@/../product/sections/dashboard-overview/data.json'
import { DashboardOverview } from './components/DashboardOverview'

export default function DashboardOverviewPreview() {
  return (
    <DashboardOverview
      companies={data.companies}
      accounts={data.accounts}
      invoices={data.invoices}
      payments={data.payments}
      keyMetrics={data.keyMetrics}
      paymentTrends={data.paymentTrends}
      monthlyComparison={data.monthlyComparison}
      onViewInvoice={(id) => console.log('View invoice:', id)}
      onViewPayment={(id) => console.log('View payment:', id)}
      onAddPayment={() => console.log('Add payment')}
      onAddInvoice={() => console.log('Add invoice')}
    />
  )
}
