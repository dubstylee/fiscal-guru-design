import React, { useState, useEffect } from 'react'
import type { Payment } from '../types'

interface PaymentModalProps {
  payment: Payment
  onClose: () => void
  onEdit: (id: string) => void
  onToggleCleared: (id: string) => void
  onViewCompany?: (companyName: string) => void
  onViewAccount?: (accountName: string) => void
}

export function PaymentModal({
  payment,
  onClose,
  onEdit,
  onToggleCleared,
  onViewCompany,
  onViewAccount
}: PaymentModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPayment, setEditedPayment] = useState(payment)

  useEffect(() => {
    setEditedPayment(payment)
  }, [payment])

  const handleSave = () => {
    onEdit(payment.id)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedPayment(payment)
    setIsEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/50 dark:bg-stone-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 w-full max-w-2xl animate-[slideUp_200ms_ease-out]">
          {/* Header */}
          <div className="border-b border-stone-200 dark:border-stone-800 px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Payment Details
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                  {isEditing ? 'Edit payment information' : 'View payment information'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleCleared(payment.id)}
                className="group"
              >
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  editedPayment.cleared
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                }`}>
                  {editedPayment.cleared ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {editedPayment.cleared ? 'Cleared' : 'Pending'}
                  <span className="text-xs opacity-75">(click to toggle)</span>
                </span>
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedPayment.date}
                    onChange={(e) => setEditedPayment({ ...editedPayment, date: e.target.value })}
                    className="block w-full px-3 py-2.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                  />
                ) : (
                  <p className="text-base text-slate-900 dark:text-slate-100 px-3 py-2.5">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Amount
                </label>
                {isEditing ? (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-stone-500 dark:text-stone-400">$</span>
                    </div>
                    <input
                      type="number"
                      value={editedPayment.amount}
                      onChange={(e) => setEditedPayment({ ...editedPayment, amount: parseFloat(e.target.value) })}
                      step="0.01"
                      className="block w-full pl-7 pr-3 py-2.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                    />
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 px-3 py-1 tabular-nums">
                    ${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Company
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedPayment.companyName}
                    onChange={(e) => setEditedPayment({ ...editedPayment, companyName: e.target.value })}
                    className="block w-full px-3 py-2.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100 px-3 py-2.5">
                      {payment.companyName}
                    </p>
                    {onViewCompany && (
                      <button
                        onClick={() => onViewCompany(payment.companyName)}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        title="View company"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Account */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Account
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedPayment.accountName}
                    onChange={(e) => setEditedPayment({ ...editedPayment, accountName: e.target.value })}
                    className="block w-full px-3 py-2.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-base text-slate-900 dark:text-slate-100 px-3 py-2.5">
                      {payment.accountName}
                    </p>
                    {onViewAccount && (
                      <button
                        onClick={() => onViewAccount(payment.accountName)}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        title="View account"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Payment Method
                </label>
                {isEditing ? (
                  <select
                    value={editedPayment.paymentMethod}
                    onChange={(e) => setEditedPayment({ ...editedPayment, paymentMethod: e.target.value as Payment['paymentMethod'] })}
                    className="block w-full px-3 py-2.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                  >
                    <option value="ACH">ACH</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Check">Check</option>
                    <option value="Wire Transfer">Wire Transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                ) : (
                  <p className="text-base text-slate-900 dark:text-slate-100 px-3 py-2.5">
                    {payment.paymentMethod}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Notes
                </label>
                {isEditing ? (
                  <textarea
                    value={editedPayment.notes}
                    onChange={(e) => setEditedPayment({ ...editedPayment, notes: e.target.value })}
                    rows={3}
                    className="block w-full px-3 py-2.5 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent resize-none"
                    placeholder="Add notes about this payment..."
                  />
                ) : (
                  <p className="text-base text-slate-900 dark:text-slate-100 px-3 py-2.5 min-h-[4rem]">
                    {payment.notes || (
                      <span className="text-stone-500 dark:text-stone-400 italic">No notes</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 text-sm font-medium text-white bg-slate-700 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 text-sm font-medium text-white bg-slate-700 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Edit Payment
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
