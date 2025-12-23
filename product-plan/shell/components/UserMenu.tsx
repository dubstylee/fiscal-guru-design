'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import type { User } from './AppShell'

interface UserMenuProps {
  user: User
  onLogout?: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  // Get user initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="p-3">
      <div className="flex items-center gap-3 px-3 py-2">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-slate-600 dark:bg-slate-700 flex items-center justify-center shrink-0">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-white">
              {getInitials(user.name)}
            </span>
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
            {user.name}
          </p>
          {user.email && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user.email}
            </p>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

