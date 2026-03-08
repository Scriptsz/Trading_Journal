'use client'

import { useState } from 'react'
import { Trade } from '@/types'
import { formatDate, formatCurrency, formatPercentage, cn } from '@/lib/utils'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface TradeTableProps {
  trades: Trade[]
  showActions?: boolean
}

type SortField = 'entryDate' | 'asset' | 'pnl' | 'riskReward'
type SortDir = 'asc' | 'desc'

export function TradeTable({ trades, showActions = false }: TradeTableProps) {
  const [sortField, setSortField] = useState<SortField>('entryDate')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const sorted = [...trades].sort((a, b) => {
    let aVal: any = a[sortField]
    let bVal: any = b[sortField]
    if (sortField === 'entryDate') {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
    }
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUp className="w-3 h-3 opacity-30" />
    return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-primary" /> : <ArrowDown className="w-3 h-3 text-primary" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th
              className="text-left text-xs font-medium text-text-muted py-3 px-4 cursor-pointer hover:text-text-primary"
              onClick={() => handleSort('entryDate')}
            >
              <div className="flex items-center gap-1">Date <SortIcon field="entryDate" /></div>
            </th>
            <th
              className="text-left text-xs font-medium text-text-muted py-3 px-4 cursor-pointer hover:text-text-primary"
              onClick={() => handleSort('asset')}
            >
              <div className="flex items-center gap-1">Asset <SortIcon field="asset" /></div>
            </th>
            <th className="text-left text-xs font-medium text-text-muted py-3 px-4">Direction</th>
            <th className="text-left text-xs font-medium text-text-muted py-3 px-4">Entry</th>
            <th className="text-left text-xs font-medium text-text-muted py-3 px-4">Exit</th>
            <th className="text-left text-xs font-medium text-text-muted py-3 px-4">Size</th>
            <th
              className="text-left text-xs font-medium text-text-muted py-3 px-4 cursor-pointer hover:text-text-primary"
              onClick={() => handleSort('pnl')}
            >
              <div className="flex items-center gap-1">PnL <SortIcon field="pnl" /></div>
            </th>
            <th className="text-left text-xs font-medium text-text-muted py-3 px-4">Strategy</th>
            <th className="text-left text-xs font-medium text-text-muted py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((trade) => (
            <tr
              key={trade.id}
              className="border-b border-border/50 hover:bg-surface/50 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-text-secondary">
                {formatDate(trade.entryDate)}
              </td>
              <td className="py-3 px-4">
                <span className="text-text-primary text-sm font-semibold">{trade.asset}</span>
              </td>
              <td className="py-3 px-4">
                <span className={cn(
                  'text-xs font-medium px-2.5 py-1 rounded-full',
                  trade.direction === 'LONG' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                )}>
                  {trade.direction}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-text-secondary">
                ${trade.entryPrice.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-text-secondary">
                {trade.exitPrice ? `$${trade.exitPrice.toLocaleString()}` : '—'}
              </td>
              <td className="py-3 px-4 text-sm text-text-secondary">
                {trade.positionSize}
              </td>
              <td className="py-3 px-4">
                {trade.pnl !== null && trade.pnl !== undefined ? (
                  <div>
                    <span className={cn(
                      'text-sm font-semibold',
                      trade.pnl >= 0 ? 'text-success' : 'text-danger'
                    )}>
                      {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                    </span>
                    {trade.pnlPercentage && (
                      <span className={cn(
                        'ml-1 text-xs',
                        trade.pnlPercentage >= 0 ? 'text-success/70' : 'text-danger/70'
                      )}>
                        ({formatPercentage(trade.pnlPercentage)})
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-text-muted text-sm">Open</span>
                )}
              </td>
              <td className="py-3 px-4">
                {trade.strategy ? (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      color: trade.strategy.color,
                      borderColor: `${trade.strategy.color}40`,
                      backgroundColor: `${trade.strategy.color}15`,
                    }}
                  >
                    {trade.strategy.name}
                  </span>
                ) : (
                  <span className="text-text-muted text-sm">—</span>
                )}
              </td>
              <td className="py-3 px-4">
                <span className={cn(
                  'text-xs px-2.5 py-1 rounded-full',
                  trade.status === 'CLOSED' ? 'bg-surface text-text-muted' :
                  trade.status === 'OPEN' ? 'bg-primary/10 text-primary' :
                  'bg-warning/10 text-warning'
                )}>
                  {trade.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
