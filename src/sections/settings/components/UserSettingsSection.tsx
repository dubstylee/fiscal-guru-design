'use client'

import { useState } from 'react'
import { Mail, Lock, Check, AlertCircle } from 'lucide-react'
import type { User } from '@/../product/sections/settings/types'

interface UserSettingsSectionProps {
  user: User
  onUpdateEmail?: (newEmail: string) => void
  onUpdatePassword?: (currentPassword: string, newPassword: string) => void
}

export function UserSettingsSection({
  user,
  onUpdateEmail,
  onUpdatePassword,
}: UserSettingsSectionProps) {
  const [emailValue, setEmailValue] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateEmail?.(emailValue)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword === confirmPassword) {
      onUpdatePassword?.(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const passwordsMatch = newPassword === confirmPassword || confirmPassword === ''

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
          Account
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Update your email address and password
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Form */}
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
          <form onSubmit={handleEmailSubmit}>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-950 rounded-lg">
                <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent transition-shadow"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Update Email
              </button>
            </div>
          </form>
        </div>

        {/* Password Form */}
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
          <form onSubmit={handlePasswordSubmit}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-2 bg-amber-100 dark:bg-amber-950 rounded-lg">
                <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
                      passwordsMatch
                        ? 'border-stone-300 dark:border-slate-700 focus:ring-amber-500 dark:focus:ring-amber-400'
                        : 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
                    }`}
                  />
                  {!passwordsMatch && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Passwords do not match</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!passwordsMatch || !newPassword || !currentPassword}
                className="px-5 py-2.5 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}