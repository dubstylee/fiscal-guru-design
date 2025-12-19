import type { Company } from '@/../product/sections/company-management/types'

interface CompanyCardProps {
  company: Company
  onView?: () => void
}

export function CompanyCard({ company, onView }: CompanyCardProps) {
  // Generate initials from company name
  const getInitials = (name: string) => {
    const words = name.split(' ')
    if (words.length === 1) return name.substring(0, 2).toUpperCase()
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  return (
    <button
      onClick={onView}
      className="group relative w-full text-left bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-6 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300"
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            company.status === 'active'
              ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-stone-50 dark:bg-stone-950 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-800'
          }`}
        >
          {company.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="flex items-start gap-4">
        {/* Logo or initials */}
        <div className="flex-shrink-0">
          {company.logo ? (
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {getInitials(company.name)}
              </span>
            </div>
          )}
        </div>

        {/* Company info */}
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
            {company.name}
          </h3>

          {company.url && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 truncate">
              {company.url.replace(/^https?:\/\/(www\.)?/, '')}
            </p>
          )}

          {company.notes && (
            <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
              {company.notes}
            </p>
          )}

          {/* Accounts count */}
          {company.accounts.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>
                {company.accounts.length}{' '}
                {company.accounts.length === 1 ? 'account' : 'accounts'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-slate-400 dark:group-hover:border-slate-600 transition-colors pointer-events-none" />
    </button>
  )
}
