"use client";

import React from "react";
import { Settings } from "lucide-react";
import type { NavigationItem } from "./AppShell";

interface MainNavProps {
  items: NavigationItem[];
  onNavigate?: (href: string) => void;
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  return (
    <nav className="space-y-1 px-3">
      {/* Main navigation items */}
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.href}
            onClick={() => onNavigate?.(item.href)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-sm font-medium transition-colors duration-200
              ${
                item.isActive
                  ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50"
                  : "text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50"
              }
            `}
          >
            {Icon && <Icon className="w-5 h-5 shrink-0" />}
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* Divider */}
      <div className="pt-4 pb-1">
        <div className="h-px bg-stone-200 dark:bg-slate-700" />
      </div>

      {/* Settings */}
      <button
        onClick={() => onNavigate?.("/settings")}
        className="
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-sm font-medium transition-colors duration-200
          text-slate-600 dark:text-slate-400
          hover:bg-stone-100 dark:hover:bg-slate-800
          hover:text-slate-900 dark:hover:text-slate-50
        "
      >
        <Settings className="w-5 h-5 shrink-0" />
        <span>Settings</span>
      </button>
    </nav>
  );
}
