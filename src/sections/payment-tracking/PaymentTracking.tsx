import data from '@/../product/sections/payment-tracking/data.json'
import { PaymentList } from './components/PaymentList'

export default function PaymentTrackingPreview() {
  return (
    <PaymentList
      payments={data.payments}
      onEdit={(id) => console.log('Edit payment:', id)}
      onToggleCleared={(id) => console.log('Toggle cleared status:', id)}
      onViewCompany={(companyName) => console.log('View company:', companyName)}
      onViewAccount={(accountName) => console.log('View account:', accountName)}
    />
  )
}
