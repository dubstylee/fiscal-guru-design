import { useState, useMemo } from 'react'
import type { PaymentTrackingProps, Payment } from '@/../product/sections/payment-tracking/types'
import { PaymentRow } from './PaymentRow'
import { PaymentModal } from './PaymentModal'
import { FilterBar } from './FilterBar'

export function PaymentList({
  payments,
  onEdit,
  onToggleCleared,
  onViewCompany,
  onViewAccount
}: PaymentTrackingProps) {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null)
  const [showCleared, setShowCleared] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRangeStart, setDateRangeStart] = useState('')
  const [dateRangeEnd, setDateRangeEnd] = useState('')
  const [amountRangeMin, setAmountRangeMin] = useState('')
  const [amountRangeMax, setAmountRangeMax] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter and sort payments
  const filteredPayments = useMemo(() => {
    let filtered = payments.filter(payment => {
      // Filter by cleared status
      if (!showCleared && payment.cleared) return false

      // Filter by search term (company or account name)
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesCompany = payment.companyName.toLowerCase().includes(search)
        const matchesAccount = payment.accountName.toLowerCase().includes(search)
        if (!matchesCompany && !matchesAccount) return false
      }

      // Filter by date range
      if (dateRangeStart && payment.date < dateRangeStart) return false
      if (dateRangeEnd && payment.date > dateRangeEnd) return false

      // Filter by amount range
      if (amountRangeMin && payment.amount < parseFloat(amountRangeMin)) return false
      if (amountRangeMax && payment.amount > parseFloat(amountRangeMax)) return false

      return true
    })

    // Sort: uncleared oldest first, then cleared newest first
    return filtered.sort((a, b) => {
      if (a.cleared !== b.cleared) {
        return a.cleared ? 1 : -1
      }
      if (a.cleared) {
        // Cleared: newest first
        return b.date.localeCompare(a.date)
      } else {
        // Uncleared: oldest first
        return a.date.localeCompare(b.date)
      }
    })
  }, [payments, showCleared, searchTerm, dateRangeStart, dateRangeEnd, amountRangeMin, amountRangeMax])

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const selectedPayment = payments.find(p => p.id === selectedPaymentId)

  const handleClearFilters = () => {
    setSearchTerm('')
    setDateRangeStart('')
    setDateRangeEnd('')
    setAmountRangeMin('')
    setAmountRangeMax('')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchTerm || dateRangeStart || dateRangeEnd || amountRangeMin || amountRangeMax

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Payment History
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400">
            Track and manage all payment transactions
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          showCleared={showCleared}
          onToggleShowCleared={() => setShowCleared(!showCleared)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateRangeStart={dateRangeStart}
          dateRangeEnd={dateRangeEnd}
          onDateRangeStartChange={setDateRangeStart}
          onDateRangeEndChange={setDateRangeEnd}
          amountRangeMin={amountRangeMin}
          amountRangeMax={amountRangeMax}
          onAmountRangeMinChange={setAmountRangeMin}
          onAmountRangeMaxChange={setAmountRangeMax}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Showing {paginatedPayments.length} of {filteredPayments.length} payments
          </p>
          {!showCleared && (
            <span className="text-sm text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Cleared payments hidden
            </span>
          )}
        </div>

        {/* Payment Table */}
        <div className="bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
          {paginatedPayments.length === 0 ? (
            <div className="py-16 px-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-400 dark:text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No payments found
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                {hasActiveFilters ? 'Try adjusting your filters' : 'No payment records to display'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                      <th className="text-left py-4 px-6 text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        Account
                      </th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-center py-4 px-6 text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-4 px-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPayments.map((payment, index) => (
                      <PaymentRow
                        key={payment.id}
                        payment={payment}
                        isLast={index === paginatedPayments.length - 1}
                        onClick={() => setSelectedPaymentId(payment.id)}
                        onToggleCleared={() => onToggleCleared?.(payment.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-stone-200 dark:divide-stone-800">
                {paginatedPayments.map(payment => (
                  <div
                    key={payment.id}
                    onClick={() => setSelectedPaymentId(payment.id)}
                    className="p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                          {payment.companyName}
                        </p>
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                          {payment.accountName}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleCleared?.(payment.id)
                        }}
                        className="flex-shrink-0"
                      >
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          payment.cleared
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        }`}>
                          {payment.cleared ? (
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                          )}
                          {payment.cleared ? 'Cleared' : 'Pending'}
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {new Date(payment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        ${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-stone-600 dark:text-stone-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <PaymentModal
          payment={selectedPayment}
          onClose={() => setSelectedPaymentId(null)}
          onEdit={(id) => {
            onEdit?.(id)
            setSelectedPaymentId(null)
          }}
          onToggleCleared={(id) => {
            onToggleCleared?.(id)
          }}
          onViewCompany={onViewCompany}
          onViewAccount={onViewAccount}
        />
      )}
    </div>
  )
}
