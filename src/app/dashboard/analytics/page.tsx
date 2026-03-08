'use client'

import { useMemo } from 'react'
import { TopBar } from '@/components/dashboard/TopBar'
import { StatCard } from '@/components/dashboard/StatCard'
import { EquityCurveChart } from '@/components/dashboard/EquityCurveChart'
import {
  WinRateChart, RRChart, MonthlyPnLChart, StrategyPerformanceChart,
  AssetPerformanceChart, DrawdownChart
} from '@/components/dashboard/PerformanceCharts'
import { useAppContext } from '@/contexts/AppContext'
import { DollarSign, TrendingUp, Target, BarChart2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function AnalyticsPage() {
  const { trades, strategies } = useAppContext()

  const closed = useMemo(() => trades.filter(t => t.status === 'CLOSED'), [trades])
  const wins = useMemo(() => closed.filter(t => (t.pnl ?? 0) > 0), [closed])
  const losses = useMemo(() => closed.filter(t => (t.pnl ?? 0) < 0), [closed])

  const totalPnl = closed.reduce((s, t) => s + (t.pnl ?? 0), 0)
  const winRate = closed.length > 0 ? (wins.length / closed.length) * 100 : 0
  const bestTrade = wins.length > 0 ? Math.max(...wins.map(t => t.pnl ?? 0)) : 0
  const worstTrade = closed.length > 0 ? Math.min(...closed.map(t => t.pnl ?? 0)) : 0
  const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + (t.pnl ?? 0), 0) / wins.length : 0
  const avgLoss = losses.length > 0 ? losses.reduce((s, t) => s + (t.pnl ?? 0), 0) / losses.length : 0
  const grossWins = wins.reduce((s, t) => s + (t.pnl ?? 0), 0)
  const grossLosses = Math.abs(losses.reduce((s, t) => s + (t.pnl ?? 0), 0))
  const profitFactor = grossLosses > 0 ? grossWins / grossLosses : 0
  const rrTrades = closed.filter(t => t.riskReward != null)
  const avgRR = rrTrades.length > 0 ? rrTrades.reduce((s, t) => s + (t.riskReward ?? 0), 0) / rrTrades.length : 0

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

  // Monthly aggregates
  const monthlyData = useMemo(() => {
    const map: Record<string, { pnl: number; trades: number; wins: number; rrSum: number; rrCount: number }> = {}
    closed.forEach(t => {
      const d = new Date(t.exitDate ?? t.entryDate)
      const key = MONTH_NAMES[d.getMonth()]
      if (!map[key]) map[key] = { pnl: 0, trades: 0, wins: 0, rrSum: 0, rrCount: 0 }
      map[key].pnl += t.pnl ?? 0
      map[key].trades += 1
      if ((t.pnl ?? 0) > 0) map[key].wins += 1
      if (t.riskReward != null) { map[key].rrSum += t.riskReward; map[key].rrCount += 1 }
    })
    return Object.entries(map).map(([month, data]) => ({
      month,
      pnl: Math.round(data.pnl),
      trades: data.trades,
      winRate: data.trades > 0 ? Math.round((data.wins / data.trades) * 100) : 0,
      avgRR: data.rrCount > 0 ? parseFloat((data.rrSum / data.rrCount).toFixed(1)) : 0,
    }))
  }, [closed])

  const monthlyPnLData = monthlyData.map(m => ({ month: m.month, pnl: m.pnl, trades: m.trades, winRate: m.winRate }))
  const winRateData = monthlyData.map(m => ({ month: m.month, winRate: m.winRate }))
  const rrData = monthlyData.map(m => ({ month: m.month, avgRR: m.avgRR }))

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

  // Asset performance
  const assetData = useMemo(() => {
    const map: Record<string, number> = {}
    closed.forEach(t => { map[t.asset] = (map[t.asset] ?? 0) + (t.pnl ?? 0) })
    return Object.entries(map)
      .map(([asset, pnl]) => ({ asset, pnl: Math.round(pnl) }))
      .sort((a, b) => b.pnl - a.pnl)
  }, [closed])

  // Drawdown from equity curve
  const drawdownData = useMemo(() => {
    let peak = 50000
    let equity = 50000
    const monthMap: Record<string, number> = {}
    const sorted = [...closed].sort((a, b) => new Date(a.exitDate ?? a.entryDate).getTime() - new Date(b.exitDate ?? b.entryDate).getTime())
    sorted.forEach(t => {
      equity += t.pnl ?? 0
      if (equity > peak) peak = equity
      const dd = peak > 0 ? ((equity - peak) / peak) * 100 : 0
      const d = new Date(t.exitDate ?? t.entryDate)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (!(key in monthMap) || dd < monthMap[key]) monthMap[key] = dd
    })
    return Object.entries(monthMap).map(([date, drawdown]) => ({ date, drawdown: parseFloat(drawdown.toFixed(1)) }))
  }, [closed])

  return (
    <div>
      <TopBar title="Analytics" subtitle="Deep insights into your trading performance" />
      <div className="p-6 space-y-6">
        {/* KPIs */}
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
            title="Best Trade"
            value={formatCurrency(bestTrade)}
            changePositive
            icon={Target}
            iconBg="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            title="Worst Trade"
            value={formatCurrency(worstTrade)}
            changePositive={false}
            icon={BarChart2}
            iconBg="bg-danger/10"
            iconColor="text-danger"
          />
        </div>

        {/* Equity Curve */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-text-primary font-semibold mb-4">Equity Curve</h3>
          <EquityCurveChart data={equityCurveData} />
        </div>

        {/* Win Rate & R:R */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Win Rate Over Time</h3>
            <WinRateChart data={winRateData} />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Average R:R Over Time</h3>
            <RRChart data={rrData} />
          </div>
        </div>

        {/* Monthly PnL & Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Monthly PnL Breakdown</h3>
            <MonthlyPnLChart data={monthlyPnLData} />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Performance by Strategy</h3>
            <StrategyPerformanceChart data={strategyPerformanceData} />
          </div>
        </div>

        {/* Asset & Drawdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Performance by Asset</h3>
            <AssetPerformanceChart data={assetData} />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Drawdown Analysis</h3>
            <DrawdownChart data={drawdownData} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-text-primary font-semibold mb-4">Advanced Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Trades', value: String(closed.length) },
              { label: 'Winning Trades', value: String(wins.length), color: 'text-success' },
              { label: 'Losing Trades', value: String(losses.length), color: 'text-danger' },
              { label: 'Win Rate', value: `${winRate.toFixed(1)}%`, color: 'text-primary' },
              { label: 'Avg Win', value: `+${formatCurrency(avgWin)}`, color: 'text-success' },
              { label: 'Avg Loss', value: formatCurrency(avgLoss), color: 'text-danger' },
              { label: 'Profit Factor', value: profitFactor.toFixed(2), color: 'text-warning' },
              { label: 'Avg R:R', value: `${avgRR.toFixed(1)}:1`, color: 'text-text-primary' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-background-secondary rounded-lg p-3 border border-border text-center">
                <p className="text-text-muted text-xs mb-1">{label}</p>
                <p className={`font-bold text-lg ${color || 'text-text-primary'}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
