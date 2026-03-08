'use client'

import { useState } from 'react'
import { Plus, CalendarDays, List, Download, Search } from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { JournalCalendar } from '@/components/dashboard/JournalCalendar'
import { TradeTable } from '@/components/dashboard/TradeTable'
import { TradeFormModal } from '@/components/dashboard/TradeFormModal'
import { mockTrades } from '@/lib/mockData'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function JournalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [search, setSearch] = useState('')
  const [dirFilter, setDirFilter] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL')

  // ── stats (all-time) ─────────────────────────────────────────────────────
  const closed = mockTrades.filter((t) => t.status === 'CLOSED')
  const wins = closed.filter((t) => (t.pnl ?? 0) > 0)
  const losses = closed.filter((t) => (t.pnl ?? 0) < 0)
  const totalPnL = closed.reduce((s, t) => s + (t.pnl ?? 0), 0)
  const winRate = closed.length > 0 ? (wins.length / closed.length) * 100 : 0
  const grossWins = wins.reduce((s, t) => s + (t.pnl ?? 0), 0)
  const grossLosses = Math.abs(losses.reduce((s, t) => s + (t.pnl ?? 0), 0))
  const profitFactor = grossLosses > 0 ? grossWins / grossLosses : 0
  const rrTrades = closed.filter((t) => t.riskReward != null)
  const avgRR =
    rrTrades.length > 0
      ? rrTrades.reduce((s, t) => s + (t.riskReward ?? 0), 0) / rrTrades.length
      : 0

  const stats = [
    {
      label: 'Net P&L',
      value: `${totalPnL >= 0 ? '+' : ''}$${Math.abs(totalPnL).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      color: totalPnL >= 0 ? 'text-success' : 'text-danger',
    },
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      color: 'text-text-primary',
    },
    {
      label: 'Profit Factor',
      value: profitFactor.toFixed(2),
      color: profitFactor >= 1 ? 'text-success' : 'text-text-primary',
    },
    {
      label: 'Avg R:R',
      value: `${avgRR.toFixed(1)}:1`,
      color: 'text-text-primary',
    },
    {
      label: 'Total Trades',
      value: String(mockTrades.length),
      color: 'text-text-primary',
    },
    {
      label: 'Open Trades',
      value: String(mockTrades.filter((t) => t.status === 'OPEN').length),
      color: 'text-text-primary',
    },
  ]

  // ── list-view filtering ──────────────────────────────────────────────────
  const filtered = mockTrades.filter((t) => {
    const matchesSearch =
      search === '' ||
      t.asset.toLowerCase().includes(search.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(search.toLowerCase())) ||
      (t.strategy?.name && t.strategy.name.toLowerCase().includes(search.toLowerCase()))
    const matchesDir = dirFilter === 'ALL' || t.direction === dirFilter
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter
    return matchesSearch && matchesDir && matchesStatus
  })

  const exportToCSV = () => {
    const headers = ['Date', 'Asset', 'Direction', 'Entry', 'Exit', 'Size', 'PnL', 'PnL%', 'R:R', 'Strategy', 'Status', 'Notes']
    const rows = filtered.map((t) => [
      t.entryDate, t.asset, t.direction, t.entryPrice,
      t.exitPrice ?? '', t.positionSize, t.pnl ?? '',
      t.pnlPercentage ?? '', t.riskReward ?? '',
      t.strategy?.name ?? '', t.status, t.notes ?? '',
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trades.csv'
    a.click()
  }

  return (
    <div>
      <TopBar title="Trade Journal" subtitle={`${mockTrades.length} trades`} />

      <div className="p-6 space-y-5">
        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-border rounded-xl px-4 py-3 shadow-sm"
            >
              <p className="text-xs text-text-muted mb-1 font-medium">{s.label}</p>
              <p className={cn('text-lg font-bold', s.color)}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Toolbar ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center gap-1 bg-white border border-border rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setView('calendar')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                view === 'calendar'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-primary',
              )}
            >
              <CalendarDays className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                view === 'list'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-primary',
              )}
            >
              <List className="w-4 h-4" />
              List
            </button>
          </div>

          {/* List-view filters (only visible in list mode) */}
          {view === 'list' && (
            <>
              <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 flex-1 min-w-48 shadow-sm">
                <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by asset, notes, strategy..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none flex-1"
                />
              </div>
              <select
                value={dirFilter}
                onChange={(e) => setDirFilter(e.target.value as 'ALL' | 'LONG' | 'SHORT')}
                className="bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="ALL">All Directions</option>
                <option value="LONG">Long Only</option>
                <option value="SHORT">Short Only</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'OPEN' | 'CLOSED')}
                className="bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="ALL">All Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </>
          )}

          {/* Right-side actions */}
          <div className="flex items-center gap-2 ml-auto">
            {view === 'list' && (
              <Button variant="secondary" size="sm" onClick={exportToCSV}>
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Add Trade
            </Button>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────────────── */}
        {view === 'calendar' ? (
          <JournalCalendar trades={mockTrades} />
        ) : (
          <>
            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
              <TradeTable trades={filtered} showActions />
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-text-muted">
                <p>No trades found matching your filters.</p>
              </div>
            )}
          </>
        )}
      </div>

      <TradeFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
