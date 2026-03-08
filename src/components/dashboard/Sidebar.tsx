'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, BarChart2, Calendar, Target,
  Calculator, Settings, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppContext } from '@/contexts/AppContext'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Trade Journal', href: '/dashboard/journal', icon: BookOpen },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { label: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { label: 'Strategies', href: '/dashboard/strategies', icon: Target },
  { label: 'Risk Calculator', href: '/dashboard/calculator', icon: Calculator },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const COLLAPSED_KEY = 'tradelog_sidebar_collapsed'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { settings } = useAppContext()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLLAPSED_KEY)
      if (stored !== null) setCollapsed(stored === 'true')
    } catch {}
  }, [])

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    try { localStorage.setItem(COLLAPSED_KEY, String(next)) } catch {}
  }

  const initials = settings.name
    .split(' ')
    .filter(Boolean)
    .map((w: string) => w[0].toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <aside
      className={cn(
        'flex flex-col bg-background-secondary border-r border-border transition-all duration-300 h-screen sticky top-0',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-text-primary font-bold text-lg">TradeLog</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'text-text-muted hover:bg-surface hover:text-text-primary'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-semibold">
              {initials || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-medium truncate">{settings.name}</p>
              <p className="text-text-muted text-xs truncate">{settings.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={toggleCollapsed}
        className="mx-3 mb-4 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-surface hover:bg-surface-hover border border-border text-text-muted hover:text-text-primary transition-all text-xs"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : (
          <>
            <ChevronLeft className="w-4 h-4" />
            <span>Collapse</span>
          </>
        )}
      </button>
    </aside>
  )
}
