import { LayoutDashboard, Building2, CreditCard, Receipt, BarChart3 } from 'lucide-react'
import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    {
      label: 'Dashboard & Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      label: 'Company Management',
      href: '/companies',
      icon: Building2,
    },
    {
      label: 'Accounts & Invoices',
      href: '/accounts',
      icon: CreditCard,
    },
    {
      label: 'Payment Tracking',
      href: '/payments',
      icon: Receipt,
    },
    {
      label: 'Insights & Planning',
      href: '/insights',
      icon: BarChart3,
    },
  ]

  const user = {
    name: 'Alex Morgan',
    email: 'alex@example.com',
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout clicked')}
    >
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Dashboard & Overview
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8">
          This is the main content area where section screens will render. The
          sidebar navigation provides access to all sections of Fiscal Guru.
        </p>

        {/* Demo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Total Companies', value: '12', color: 'slate' },
            { title: 'Active Accounts', value: '28', color: 'slate' },
            { title: 'Pending Invoices', value: '5', color: 'amber' },
            { title: 'Due This Week', value: '$2,450', color: 'amber' },
            { title: 'Total Payments', value: '156', color: 'slate' },
            { title: 'Monthly Spend', value: '$8,920', color: 'slate' },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-stone-200 dark:border-slate-700 shadow-sm"
            >
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                {card.title}
              </p>
              <p className={`text-2xl font-bold text-${card.color}-900 dark:text-${card.color}-50`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
