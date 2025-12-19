import data from '@/../product/sections/company-management/data.json'
import { CompanyList } from './components/CompanyList'

export default function CompanyListPreview() {
  return (
    <CompanyList
      companies={data.companies}
      onCreate={() => console.log('Create new company')}
      onView={(id) => console.log('View company:', id)}
      onEdit={(id) => console.log('Edit company:', id)}
      onDelete={(id) => console.log('Delete company:', id)}
      onViewAccount={(accountId) => console.log('View account:', accountId)}
    />
  )
}
