import type { Payment } from '@/../product/sections/payment-tracking/types'

interface PaymentRowProps {
  payment: Payment
  isLast: boolean
  onClick: () => void
  onToggleCleared: () => void
}

export function PaymentRow({ payment, isLast, onClick, onToggleCleared }: PaymentRowProps) {
  return (
    <tr
      className={`group hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors ${
        !isLast ? 'border-b border-stone-200 dark:border-stone-800' : ''
      }`}
    >
      <td className="py-4 px-6">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {new Date(payment.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {payment.companyName}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-sm text-stone-700 dark:text-stone-300">
          {payment.accountName}
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
          ${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleCleared()
            }}
            className="group/btn"
          >
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              payment.cleared
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50'
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
      </td>
      <td className="py-4 px-6">
        <button
          onClick={onClick}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </td>
    </tr>
  )
}
