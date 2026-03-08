'use client'

import { Search, Bell } from 'lucide-react'

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-text-primary">{title}</h1>
        {subtitle && <p className="text-text-muted text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 w-64">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search trades, strategies..."
            className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none flex-1"
          />
        </div>
        {/* Notifications */}
        <button className="relative w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full border-2 border-background" />
        </button>
        {/* User Avatar */}
        <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-semibold">
          JD
        </div>
      </div>
    </header>
  )
}
