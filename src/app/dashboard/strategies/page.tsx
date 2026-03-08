'use client'

import { useState } from 'react'
import { TopBar } from '@/components/dashboard/TopBar'
import { mockStrategies, mockTrades, strategyPerformance } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function StrategiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const strategiesWithStats = mockStrategies.map((strategy) => {
    const trades = mockTrades.filter((t) => t.strategyId === strategy.id && t.status === 'CLOSED')
    const wins = trades.filter((t) => (t.pnl || 0) > 0)
    const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0)
    const avgRR = trades.length > 0
      ? trades.reduce((sum, t) => sum + (t.riskReward || 0), 0) / trades.length
      : 0
    const winRate = trades.length > 0 ? (wins.length / trades.length) * 100 : 0

    return {
      ...strategy,
      tradeCount: trades.length,
      winRate: Math.round(winRate),
      totalPnl,
      avgRR: avgRR.toFixed(1),
    }
  })

  return (
    <div>
      <TopBar title="Strategies" subtitle={`${mockStrategies.length} strategies`} />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${view === 'grid' ? 'bg-primary/15 text-primary' : 'text-text-muted hover:text-text-primary'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${view === 'list' ? 'bg-primary/15 text-primary' : 'text-text-muted hover:text-text-primary'}`}
            >
              List
            </button>
          </div>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            New Strategy
          </Button>
        </div>

        {/* Strategy cards */}
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {strategiesWithStats.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-surface border border-border rounded-xl p-5 hover:bg-surface-hover hover:border-border-hover transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: strategy.color }}
                  >
                    {strategy.name[0]}
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold">{strategy.name}</h3>
                    {strategy.description && (
                      <p className="text-text-muted text-xs mt-0.5 max-w-48 truncate">{strategy.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-surface hover:bg-surface-hover text-text-muted hover:text-text-primary transition-all">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-surface hover:bg-danger/10 text-text-muted hover:text-danger transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background-secondary rounded-lg p-3 text-center">
                  <p className="text-text-muted text-xs mb-1">Trades</p>
                  <p className="text-text-primary font-bold">{strategy.tradeCount}</p>
                </div>
                <div className="bg-background-secondary rounded-lg p-3 text-center">
                  <p className="text-text-muted text-xs mb-1">Win Rate</p>
                  <p className={`font-bold ${strategy.winRate >= 60 ? 'text-success' : strategy.winRate >= 40 ? 'text-warning' : 'text-danger'}`}>
                    {strategy.winRate}%
                  </p>
                </div>
                <div className="bg-background-secondary rounded-lg p-3 text-center">
                  <p className="text-text-muted text-xs mb-1">Total PnL</p>
                  <p className={`font-bold ${strategy.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                    {strategy.totalPnl >= 0 ? '+' : ''}{formatCurrency(strategy.totalPnl)}
                  </p>
                </div>
                <div className="bg-background-secondary rounded-lg p-3 text-center">
                  <p className="text-text-muted text-xs mb-1">Avg R:R</p>
                  <p className={`font-bold ${parseFloat(strategy.avgRR) >= 2 ? 'text-success' : 'text-warning'}`}>
                    {strategy.avgRR}:1
                  </p>
                </div>
              </div>

              {/* Win rate bar */}
              <div className="mt-4">
                <div className="h-1.5 bg-background-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${strategy.winRate}%`,
                      backgroundColor: strategy.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance comparison table */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-text-primary font-semibold">Strategy Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Strategy', 'Trades', 'Win Rate', 'Total PnL', 'Avg R:R', 'Performance'].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-text-muted py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {strategiesWithStats.map((s) => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-text-primary text-sm font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{s.tradeCount}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${s.winRate >= 60 ? 'text-success' : s.winRate >= 40 ? 'text-warning' : 'text-danger'}`}>
                        {s.winRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-semibold ${s.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                        {s.totalPnl >= 0 ? '+' : ''}{formatCurrency(s.totalPnl)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{s.avgRR}:1</td>
                    <td className="py-3 px-4">
                      <div className="w-24 h-1.5 bg-background-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.winRate}%`, backgroundColor: s.color }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
