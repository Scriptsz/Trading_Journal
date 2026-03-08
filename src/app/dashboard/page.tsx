'use client'

import { useMemo } from 'react'
import { TopBar } from '@/components/dashboard/TopBar'
import { StatCard } from '@/components/dashboard/StatCard'
import { EquityCurveChart } from '@/components/dashboard/EquityCurveChart'
import { WinLossPieChart, MonthlyPnLChart, StrategyPerformanceChart } from '@/components/dashboard/PerformanceCharts'
import { TradeTable } from '@/components/dashboard/TradeTable'
import { useAppContext } from '@/contexts/AppContext'
import { DollarSign, TrendingUp, Target, BarChart2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function DashboardPage() {
  const { trades, strategies } = useAppContext()

  const closed = useMemo(() => trades.filter(t => t.status === 'CLOSED'), [trades])
  const wins = useMemo(() => closed.filter(t => (t.pnl ?? 0) > 0), [closed])

  const totalPnl = closed.reduce((s, t) => s + (t.pnl ?? 0), 0)
  const winRate = closed.length > 0 ? (wins.length / closed.length) * 100 : 0
  const rrTrades = closed.filter(t => t.riskReward != null)
  const avgRR = rrTrades.length > 0 ? rrTrades.reduce((s, t) => s + (t.riskReward ?? 0), 0) / rrTrades.length : 0
  const bestTrade = wins.length > 0 ? Math.max(...wins.map(t => t.pnl ?? 0)) : 0
  const worstTrade = closed.length > 0 ? Math.min(...closed.map(t => t.pnl ?? 0)) : 0
  const openTrades = trades.filter(t => t.status === 'OPEN').length

  // Equity curve
  const equityCurveData = useMemo(() => {
    const sorted = [...closed].sort((a, b) => new Date(a.exitDate ?? a.entryDate).getTime() - new Date(b.exitDate ?? b.entryDate).getTime())
    let cumulative = 50000
    return sorted.map(t => {
      cumulative += t.pnl ?? 0
      const d = t.exitDate ?? t.entryDate
      return {
        date: typeof d === 'string' ? d.split('T')[0] : new Date(d).toISOString().split('T')[0],
        value: Math.round(cumulative),
        pnl: t.pnl ?? 0,
      }
    })
  }, [closed])

  // Win/Loss
  const winLossData = [
    { name: 'Wins', value: wins.length, fill: '#10B981' },
    { name: 'Losses', value: closed.length - wins.length, fill: '#EF4444' },
  ]

  // Monthly PnL
  const monthlyPnLData = useMemo(() => {
    const map: Record<string, { pnl: number; trades: number; wins: number }> = {}
    closed.forEach(t => {
      const d = new Date(t.exitDate ?? t.entryDate)
      const key = MONTH_NAMES[d.getMonth()]
      if (!map[key]) map[key] = { pnl: 0, trades: 0, wins: 0 }
      map[key].pnl += t.pnl ?? 0
      map[key].trades += 1
      if ((t.pnl ?? 0) > 0) map[key].wins += 1
    })
    return Object.entries(map).map(([month, data]) => ({
      month,
      pnl: Math.round(data.pnl),
      trades: data.trades,
      winRate: data.trades > 0 ? Math.round((data.wins / data.trades) * 100) : 0,
    }))
  }, [closed])

  // Strategy performance
  const strategyPerformanceData = useMemo(() => {
    const map: Record<string, { name: string; trades: number; wins: number; totalPnl: number; rrSum: number; rrCount: number }> = {}
    closed.forEach(t => {
      const name = t.strategy?.name ?? (strategies.find(s => s.id === t.strategyId)?.name) ?? 'Unknown'
      if (!map[name]) map[name] = { name, trades: 0, wins: 0, totalPnl: 0, rrSum: 0, rrCount: 0 }
      map[name].trades += 1
      map[name].totalPnl += t.pnl ?? 0
      if ((t.pnl ?? 0) > 0) map[name].wins += 1
      if (t.riskReward != null) { map[name].rrSum += t.riskReward; map[name].rrCount += 1 }
    })
    return Object.values(map).map(s => ({
      name: s.name,
      trades: s.trades,
      winRate: s.trades > 0 ? Math.round((s.wins / s.trades) * 100) : 0,
      totalPnl: Math.round(s.totalPnl),
      avgRR: s.rrCount > 0 ? parseFloat((s.rrSum / s.rrCount).toFixed(1)) : 0,
    }))
  }, [closed, strategies])

  const recentTrades = [...closed]
    .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
    .slice(0, 8)

  return (
    <div>
      <TopBar title="Dashboard" subtitle="Welcome back! Here's your trading overview." />
      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total PnL"
            value={formatCurrency(totalPnl)}
            changePositive={totalPnl >= 0}
            icon={DollarSign}
            iconBg="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            title="Win Rate"
            value={`${winRate.toFixed(1)}%`}
            changePositive
            icon={TrendingUp}
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Avg R:R"
            value={`${avgRR.toFixed(1)}:1`}
            changePositive
            icon={Target}
            iconBg="bg-warning/10"
            iconColor="text-warning"
          />
          <StatCard
            title="Total Trades"
            value={String(closed.length)}
            change={`${openTrades} open`}
            changePositive
            icon={BarChart2}
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Equity Curve</h3>
            <EquityCurveChart data={equityCurveData} />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-2">Win / Loss Ratio</h3>
            <WinLossPieChart data={winLossData} />
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="bg-success/10 rounded-lg p-3">
                <p className="text-success font-bold text-xl">{wins.length}</p>
                <p className="text-text-muted text-xs">Winning Trades</p>
              </div>
              <div className="bg-danger/10 rounded-lg p-3">
                <p className="text-danger font-bold text-xl">{closed.length - wins.length}</p>
                <p className="text-text-muted text-xs">Losing Trades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Monthly PnL</h3>
            <MonthlyPnLChart data={monthlyPnLData} />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Performance by Strategy</h3>
            <StrategyPerformanceChart data={strategyPerformanceData} />
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-surface border border-border rounded-xl">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="text-text-primary font-semibold">Recent Trades</h3>
            <a href="/dashboard/journal" className="text-primary text-sm hover:text-primary-light transition-colors">
              View all →
            </a>
          </div>
          <TradeTable trades={recentTrades} />
        </div>
      </div>
    </div>
  )
}
