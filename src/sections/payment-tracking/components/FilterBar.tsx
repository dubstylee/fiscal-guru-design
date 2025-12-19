import { useState } from 'react'

interface FilterBarProps {
  showCleared: boolean
  onToggleShowCleared: () => void
  searchTerm: string
  onSearchChange: (value: string) => void
  dateRangeStart: string
  dateRangeEnd: string
  onDateRangeStartChange: (value: string) => void
  onDateRangeEndChange: (value: string) => void
  amountRangeMin: string
  amountRangeMax: string
  onAmountRangeMinChange: (value: string) => void
  onAmountRangeMaxChange: (value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function FilterBar({
  showCleared,
  onToggleShowCleared,
  searchTerm,
  onSearchChange,
  dateRangeStart,
  dateRangeEnd,
  onDateRangeStartChange,
  onDateRangeEndChange,
  amountRangeMin,
  amountRangeMax,
  onAmountRangeMinChange,
  onAmountRangeMaxChange,
  onClearFilters,
  hasActiveFilters
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="mb-6 space-y-4">
      {/* Primary Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-stone-400 dark:text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by company or account..."
              className="block w-full pl-10 pr-3 py-2.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 placeholder-stone-500 dark:placeholder-stone-400 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        {/* Show/Hide Cleared Toggle */}
        <button
          onClick={onToggleShowCleared}
          className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center gap-2 whitespace-nowrap ${
            showCleared
              ? 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-slate-700 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-stone-800'
              : 'bg-amber-500 dark:bg-amber-600 border-amber-500 dark:border-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700'
          }`}
        >
          {showCleared ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Show All
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
              Hide Cleared
            </>
          )}
        </button>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 space-y-4 animate-[slideDown_200ms_ease-out]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Advanced Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRangeStart}
                  onChange={(e) => onDateRangeStartChange(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                  placeholder="Start"
                />
                <input
                  type="date"
                  value={dateRangeEnd}
                  onChange={(e) => onDateRangeEndChange(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                  placeholder="End"
                />
              </div>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Amount Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={amountRangeMin}
                  onChange={(e) => onAmountRangeMinChange(e.target.value)}
                  placeholder="Min"
                  step="0.01"
                  className="block w-full px-3 py-2 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                />
                <input
                  type="number"
                  value={amountRangeMax}
                  onChange={(e) => onAmountRangeMaxChange(e.target.value)}
                  placeholder="Max"
                  step="0.01"
                  className="block w-full px-3 py-2 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
