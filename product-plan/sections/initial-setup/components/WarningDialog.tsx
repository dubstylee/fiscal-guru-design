'use client'

import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface WarningDialogProps {
  isOpen: boolean
  title: string
  message: string
  onClose?: () => void
  onConfirm?: () => void
  confirmLabel?: string
}

export function WarningDialog({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmLabel = 'Continue',
}: WarningDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full border border-stone-200 dark:border-slate-800">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">{title}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">{message}</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50 font-semibold rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
                {onConfirm && (
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    {confirmLabel}
                  </button>
                )}
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

