"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { MainNav } from "./MainNav";
import { UserMenu } from "./UserMenu";

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

export interface User {
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface AppShellProps {
  children: React.ReactNode;
  navigationItems: NavigationItem[];
  user?: User;
  onNavigate?: (href: string) => void;
  onLogout?: () => void;
}

export function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate?.(href);
  };

  return (
    <div className="flex h-screen bg-stone-50 dark:bg-slate-900">
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-stone-200 dark:border-slate-700"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72
          transform transition-transform duration-200 ease-in-out
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          bg-white dark:bg-slate-800 border-r border-stone-200 dark:border-slate-700
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-stone-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Fiscal Guru
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <MainNav items={navigationItems} onNavigate={handleNavigate} />
        </div>

        {/* User Menu */}
        {user && (
          <div className="border-t border-stone-200 dark:border-slate-700">
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
