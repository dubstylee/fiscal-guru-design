import { MoreVertical, ExternalLink, Edit, Trash2, Power } from 'lucide-react'
import { useState } from 'react'
import type { Account } from '@/../product/sections/accounts-invoices/types'

interface AccountCardProps {
  account: Account
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onToggleStatus?: () => void
}

export function AccountCard({
  account,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}: AccountCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Generate color based on account type
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Checking Account': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      'Credit Card': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      'Savings Account': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      'Subscription': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      'Monthly Service': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
      'Insurance Premium': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
      'Utility Service': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      'Receivables': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
      'Trade Account': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
    }
    return colors[type] || 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-400'
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div
      onClick={onView}
      className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer"
    >
      {/* Status Indicator Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        account.status === 'active'
          ? 'bg-emerald-500'
          : 'bg-stone-300 dark:bg-stone-700'
      }`} />

      <div className="p-5">
        {/* Header: Avatar + Actions */}
        <div className="flex items-start justify-between mb-4">
          {/* Avatar / Logo */}
          <div className="flex-shrink-0">
            {account.accountLogo || account.companyLogo ? (
              <img
                src={account.accountLogo || account.companyLogo || ''}
                alt={account.accountName}
                className="w-12 h-12 rounded-lg object-cover bg-stone-100 dark:bg-stone-800"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {getInitials(account.accountName)}
                </span>
              </div>
            )}
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                  }}
                />

                {/* Menu */}
                <div className="absolute right-0 top-8 z-20 w-48 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit?.()
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Account
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleStatus?.()
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
                  >
                    <Power className="w-4 h-4" />
                    {account.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <div className="my-1 h-px bg-stone-200 dark:bg-stone-700" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete?.()
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-2 mb-4">
          <div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-lg leading-tight">
              {account.accountName}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">
              {account.companyName}
            </p>
          </div>

          {/* Account Number */}
          <p className="text-xs font-mono text-stone-500 dark:text-stone-500">
            {account.accountNumber}
          </p>
        </div>

        {/* Account Type Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getTypeColor(account.accountType)}`}>
            {account.accountType}
          </span>
        </div>

        {/* Balance */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wide mb-1">
                Balance
              </p>
              <p className={`text-2xl font-bold ${
                account.balance < 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-stone-900 dark:text-stone-100'
              }`}>
                {formatCurrency(account.balance)}
              </p>
            </div>

            {account.accountUrl && (
              <a
                href={account.accountUrl}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-stone-400 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Visit account portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Interest Rate (if applicable) */}
          {account.interestRate !== null && account.interestRate > 0 && (
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-2 font-medium">
              {account.interestRate}% APR
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
