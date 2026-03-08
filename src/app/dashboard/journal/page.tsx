'use client'

import { useState } from 'react'
import { Plus, List, Download, Search } from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { TradeTable } from '@/components/dashboard/TradeTable'
import { TradeFormModal, TradeFormData } from '@/components/dashboard/TradeFormModal'
import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Trade, Direction } from '@/types'

export default function JournalPage() {
  const { trades, addTrade, updateTrade, deleteTrade } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null)
  const [search, setSearch] = useState('')
  const [dirFilter, setDirFilter] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL')

  // ── stats (all-time) ─────────────────────────────────────────────────────
  const closed = trades.filter((t) => t.status === 'CLOSED')
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
    { label: 'Win Rate', value: `${winRate.toFixed(1)}%`, color: 'text-text-primary' },
    { label: 'Profit Factor', value: profitFactor.toFixed(2), color: profitFactor >= 1 ? 'text-success' : 'text-text-primary' },
    { label: 'Avg R:R', value: `${avgRR.toFixed(1)}:1`, color: 'text-text-primary' },
    { label: 'Total Trades', value: String(trades.length), color: 'text-text-primary' },
    { label: 'Open Trades', value: String(trades.filter((t) => t.status === 'OPEN').length), color: 'text-text-primary' },
  ]

  // ── list-view filtering ──────────────────────────────────────────────────
  const filtered = trades.filter((t) => {
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

  const handleSaveTrade = (data: TradeFormData) => {
    const tradeData = {
      asset: data.asset,
      direction: data.direction as Direction,
      entryDate: data.entryDate,
      exitDate: data.exitDate || null,
      entryPrice: parseFloat(data.entryPrice),
      exitPrice: data.exitPrice ? parseFloat(data.exitPrice) : null,
      positionSize: parseFloat(data.positionSize),
      stopLoss: data.stopLoss ? parseFloat(data.stopLoss) : undefined,
      strategyId: data.strategyId || null,
      notes: data.notes || null,
      emotionalState: data.emotionalState || null,
      status: 'OPEN' as const,
    }

    if (editingTrade) {
      updateTrade({ ...editingTrade, ...tradeData })
    } else {
      addTrade(tradeData)
    }
    setEditingTrade(null)
  }

  const handleEdit = (trade: Trade) => {
    setEditingTrade(trade)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTrade(null)
  }

  return (
    <div>
      <TopBar title="Trade Journal" subtitle={`${trades.length} trades`} />

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

          {/* Right-side actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="secondary" size="sm" onClick={exportToCSV}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setEditingTrade(null); setIsModalOpen(true) }}>
              <Plus className="w-4 h-4" />
              Add Trade
            </Button>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <TradeTable
            trades={filtered}
            showActions
            onEdit={handleEdit}
            onDelete={deleteTrade}
          />
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <p>No trades found matching your filters.</p>
          </div>
        )}
      </div>

      <TradeFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTrade}
        initialValues={editingTrade}
      />
    </div>
  )
}
