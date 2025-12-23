import React, { useState } from 'react'
import { Search, Plus, Filter, X } from 'lucide-react'
import type { AccountListProps, AccountFilters } from '../types'
import { AccountCard } from './AccountCard'

/**
 * Design Tokens:
 * - Primary: slate (professional, financial)
 * - Secondary: amber (highlights, accents)
 * - Neutral: stone (backgrounds, text)
 * - Typography: Inter (heading & body), IBM Plex Mono (mono)
 */

export function AccountList({
  accounts,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreate,
  onFilterChange,
  onSearch
}: AccountListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<AccountFilters>({
    status: 'all'
  })
  const [showFilters, setShowFilters] = useState(false)

  // Get unique account types and companies
  const accountTypes = [...new Set(accounts.map(a => a.accountType))]
  const companies = [...new Set(accounts.map(a => ({ id: a.companyId, name: a.companyName })))]
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)

  // Filter accounts
  const filteredAccounts = accounts.filter(account => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        account.accountName.toLowerCase().includes(query) ||
        account.accountNumber.toLowerCase().includes(query) ||
        account.companyName.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Status filter
    if (filters.status && filters.status !== 'all' && account.status !== filters.status) {
      return false
    }

    // Type filter
    if (filters.accountType && filters.accountType.length > 0) {
      if (!filters.accountType.includes(account.accountType)) return false
    }

    // Company filter
    if (filters.companyId && account.companyId !== filters.companyId) {
      return false
    }

    return true
  })

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleFilterChange = (newFilters: AccountFilters) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const toggleAccountType = (type: string) => {
    const currentTypes = filters.accountType || []
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]

    handleFilterChange({ ...filters, accountType: newTypes.length > 0 ? newTypes : undefined })
  }

  const clearFilters = () => {
    const clearedFilters: AccountFilters = { status: 'all' }
    setFilters(clearedFilters)
    handleFilterChange(clearedFilters)
  }

  const activeFilterCount =
    (filters.status !== 'all' ? 1 : 0) +
    (filters.accountType?.length || 0) +
    (filters.companyId ? 1 : 0)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            {/* Title and Action */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
                  Accounts
                </h1>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                  Manage your financial accounts and invoices
                </p>
              </div>
              <button
                onClick={onCreate}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">New Account</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by name, number, or company..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="relative flex items-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="p-4 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg space-y-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'active', 'inactive'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleFilterChange({ ...filters, status: status as any })}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          filters.status === status
                            ? 'bg-slate-900 dark:bg-slate-700 text-white'
                            : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Account Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Account Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {accountTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleAccountType(type)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          filters.accountType?.includes(type)
                            ? 'bg-slate-900 dark:bg-slate-700 text-white'
                            : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company Filter */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Company
                  </label>
                  <select
                    value={filters.companyId || ''}
                    onChange={(e) => handleFilterChange({ ...filters, companyId: e.target.value || undefined })}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-md text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400"
                  >
                    <option value="">All Companies</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAccounts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-200 dark:bg-stone-800 rounded-full mb-4">
              <Search className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">
              No accounts found
            </h3>
            <p className="text-stone-600 dark:text-stone-400">
              {searchQuery || activeFilterCount > 0
                ? 'Try adjusting your search or filters'
                : 'Create your first account to get started'}
            </p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-4 text-sm text-stone-600 dark:text-stone-400">
              Showing {filteredAccounts.length} of {accounts.length} account{accounts.length !== 1 ? 's' : ''}
            </div>

            {/* Account Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAccounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onView={() => onView?.(account.id)}
                  onEdit={() => onEdit?.(account.id)}
                  onDelete={() => onDelete?.(account.id)}
                  onToggleStatus={() => onToggleStatus?.(account.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
