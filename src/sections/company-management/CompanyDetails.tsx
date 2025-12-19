import data from '@/../product/sections/company-management/data.json'
import { CompanyDetails } from './components/CompanyDetails'

export default function CompanyDetailsPreview() {
  // Use the first company with accounts (Chase Bank has 2 accounts)
  const company = data.companies.find((c) => c.id === 'comp-007') || data.companies[0]

  return (
    <CompanyDetails
      company={company}
      onBack={() => console.log('Back to list')}
      onEdit={() => console.log('Edit company:', company.id)}
      onDelete={() => console.log('Delete company:', company.id)}
      onViewAccount={(accountId) => console.log('View account:', accountId)}
    />
  )
}
