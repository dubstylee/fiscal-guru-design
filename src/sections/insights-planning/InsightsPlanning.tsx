import data from '@/../product/sections/insights-planning/data.json'
import { InsightsDashboard } from './components/InsightsDashboard'

export default function InsightsPlanningPreview() {
  return (
    <InsightsDashboard
      spendingCategories={data.spendingCategories}
      budgets={data.budgets}
      spendingData={data.spendingData}
      upcomingInvoices={data.upcomingInvoices}
      onCreateBudget={() => console.log('Create budget')}
      onEditBudget={(id) => console.log('Edit budget:', id)}
      onDeleteBudget={(id) => console.log('Delete budget:', id)}
      onViewInvoice={(id) => console.log('View invoice:', id)}
      onCreateCategory={() => console.log('Create category')}
      onEditCategory={(id) => console.log('Edit category:', id)}
    />
  )
}
