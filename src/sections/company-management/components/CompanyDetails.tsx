import type { CompanyDetailsProps } from '@/../product/sections/company-management/types'

export function CompanyDetails({
  company,
  onBack,
  onEdit,
  onDelete,
  onViewAccount,
}: CompanyDetailsProps) {
  // Generate initials from company name
  const getInitials = (name: string) => {
    const words = name.split(' ')
    if (words.length === 1) return name.substring(0, 2).toUpperCase()
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Companies
        </button>

        {/* Header card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo or initials */}
            <div className="flex-shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {getInitials(company.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Company info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {company.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        company.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-stone-50 dark:bg-stone-950 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      {company.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={onEdit}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={onDelete}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>

              {/* Company details */}
              <div className="space-y-4">
                {company.url && (
                  <div>
                    <dt className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">
                      Website
                    </dt>
                    <dd>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                      >
                        {company.url}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </dd>
                  </div>
                )}

                {company.notes && (
                  <div>
                    <dt className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">
                      Notes
                    </dt>
                    <dd className="text-stone-700 dark:text-stone-300">
                      {company.notes}
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Accounts section */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              Associated Accounts
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Financial accounts linked to this company
            </p>
          </div>

          {company.accounts.length > 0 ? (
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {company.accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => onViewAccount?.(account.id)}
                  className="w-full px-6 py-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                          {account.name}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          {account.type}
                        </span>
                      </div>
                      {account.lastFour && (
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          ···· {account.lastFour}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p
                          className={`text-lg font-semibold ${
                            account.balance < 0
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-stone-900 dark:text-stone-100'
                          }`}
                        >
                          {formatCurrency(account.balance)}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          Balance
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-stone-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 mb-3">
                <svg
                  className="w-6 h-6 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <p className="text-stone-600 dark:text-stone-400">
                No accounts associated with this company
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
