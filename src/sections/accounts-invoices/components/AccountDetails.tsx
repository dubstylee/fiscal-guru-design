import { ArrowLeft, Edit, Trash2, Power, ExternalLink, Plus, Mail, Phone, MapPin } from 'lucide-react'
import type { AccountDetailsProps } from '@/../product/sections/accounts-invoices/types'
import { InvoiceList } from './InvoiceList'
import { PaymentChart } from './PaymentChart'

/**
 * Design Tokens:
 * - Primary: slate (professional, financial)
 * - Secondary: amber (highlights, accents)
 * - Neutral: stone (backgrounds, text)
 * - Typography: Inter (heading & body), IBM Plex Mono (mono)
 */

export function AccountDetails({
  account,
  invoices,
  payments,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreateInvoice,
  onViewInvoice,
  onBack
}: AccountDetailsProps) {
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Accounts</span>
          </button>

          {/* Account Header */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar / Logo */}
            <div className="flex-shrink-0">
              {account.accountLogo || account.companyLogo ? (
                <img
                  src={account.accountLogo || account.companyLogo || ''}
                  alt={account.accountName}
                  className="w-24 h-24 rounded-2xl object-cover bg-stone-100 dark:bg-stone-800"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {getInitials(account.accountName)}
                  </span>
                </div>
              )}
            </div>

            {/* Account Info & Actions */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
                      {account.accountName}
                    </h1>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      account.status === 'active'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-400'
                    }`}>
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-600 dark:text-stone-400">{account.companyName}</p>
                    <p className="text-sm font-mono text-stone-500 dark:text-stone-500">{account.accountNumber}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={onEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="font-medium">Edit</span>
                  </button>
                  <button
                    onClick={onDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details Card */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                Account Details
              </h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {account.accountUrl && (
                  <div>
                    <dt className="text-sm font-medium text-stone-500 dark:text-stone-500 mb-1">Website</dt>
                    <dd>
                      <a
                        href={account.accountUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                      >
                        <span className="truncate">{account.accountUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      </a>
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-stone-500 dark:text-stone-500 mb-1">Account Type</dt>
                  <dd className="text-sm text-stone-900 dark:text-stone-100">{account.accountType}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-stone-500 dark:text-stone-500 mb-1">Date Opened</dt>
                  <dd className="text-sm text-stone-900 dark:text-stone-100">{formatDate(account.dateOpened)}</dd>
                </div>

                {account.interestRate !== null && (
                  <div>
                    <dt className="text-sm font-medium text-stone-500 dark:text-stone-500 mb-1">Interest Rate</dt>
                    <dd className="text-sm font-semibold text-amber-600 dark:text-amber-500">{account.interestRate}% APR</dd>
                  </div>
                )}
              </dl>

              {account.notes && (
                <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800">
                  <dt className="text-sm font-medium text-stone-500 dark:text-stone-500 mb-2">Notes</dt>
                  <dd className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{account.notes}</dd>
                </div>
              )}
            </div>

            {/* Payment History Chart */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                Payment History (Last 12 Months)
              </h2>
              <PaymentChart payments={payments} />
            </div>

            {/* Invoices */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Invoices
                </h2>
                <button
                  onClick={onCreateInvoice}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">New Invoice</span>
                </button>
              </div>

              <InvoiceList
                invoices={invoices}
                onView={(id) => onViewInvoice?.(id)}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 text-white">
              <p className="text-sm text-slate-300 uppercase tracking-wide mb-2">Current Balance</p>
              <p className={`text-4xl font-bold mb-1 ${
                account.balance < 0 ? 'text-emerald-400' : 'text-white'
              }`}>
                {formatCurrency(account.balance)}
              </p>
              {account.balance < 0 && (
                <p className="text-xs text-emerald-400 font-medium">Amount owed to you</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wide mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg">
                    <Mail className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-500 dark:text-stone-500 mb-0.5">Email</p>
                    <a
                      href={`mailto:${account.contactInfo.email}`}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 break-all transition-colors"
                    >
                      {account.contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg">
                    <Phone className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-500 dark:text-stone-500 mb-0.5">Phone</p>
                    <a
                      href={`tel:${account.contactInfo.phone}`}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                    >
                      {account.contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wide mb-4">
                Address
              </h3>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg flex-shrink-0">
                  <MapPin className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                </div>
                <div className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p>{account.addressInfo.street}</p>
                  <p>{account.addressInfo.city}, {account.addressInfo.state} {account.addressInfo.zip}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wide mb-4">
                Quick Actions
              </h3>

              <div className="space-y-2">
                <button
                  onClick={onToggleStatus}
                  className="w-full flex items-center gap-3 px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-left"
                >
                  <Power className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {account.status === 'active' ? 'Deactivate Account' : 'Activate Account'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
