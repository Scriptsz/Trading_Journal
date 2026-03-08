'use client'

import { useState } from 'react'
import { TopBar } from '@/components/dashboard/TopBar'
import { TradeTable } from '@/components/dashboard/TradeTable'
import { TradeFormModal } from '@/components/dashboard/TradeFormModal'
import { mockTrades } from '@/lib/mockData'
import { Button } from '@/components/ui/Button'
import { Plus, Download, Search } from 'lucide-react'
import { Trade } from '@/types'

export default function JournalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [dirFilter, setDirFilter] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL')

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
      t.entryDate,
      t.asset,
      t.direction,
      t.entryPrice,
      t.exitPrice || '',
      t.positionSize,
      t.pnl || '',
      t.pnlPercentage || '',
      t.riskReward || '',
      t.strategy?.name || '',
      t.status,
      t.notes || '',
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
      <TopBar title="Trade Journal" subtitle={`${filtered.length} trades`} />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by asset, notes, strategy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none flex-1"
            />
          </div>

          {/* Direction filter */}
          <select
            value={dirFilter}
            onChange={(e) => setDirFilter(e.target.value as any)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="ALL">All Directions</option>
            <option value="LONG">Long Only</option>
            <option value="SHORT">Short Only</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="secondary" size="sm" onClick={exportToCSV}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Add Trade
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <TradeTable trades={filtered} showActions />
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <p>No trades found matching your filters.</p>
          </div>
        )}
      </div>

      <TradeFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
