'use client'

import { TopBar } from '@/components/dashboard/TopBar'
import { StatCard } from '@/components/dashboard/StatCard'
import { EquityCurveChart } from '@/components/dashboard/EquityCurveChart'
import { WinLossPieChart, MonthlyPnLChart, StrategyPerformanceChart } from '@/components/dashboard/PerformanceCharts'
import { TradeTable } from '@/components/dashboard/TradeTable'
import { mockTrades, dashboardStats } from '@/lib/mockData'
import { DollarSign, TrendingUp, Target, BarChart2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function DashboardPage() {
  const recentTrades = [...mockTrades]
    .filter((t) => t.status === 'CLOSED')
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
            value={formatCurrency(dashboardStats.totalPnl)}
            change="+18.3%"
            changePositive
            icon={DollarSign}
            iconBg="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            title="Win Rate"
            value={`${dashboardStats.winRate}%`}
            change="+4.2%"
            changePositive
            icon={TrendingUp}
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Avg R:R"
            value={`${dashboardStats.avgRR}:1`}
            change="+0.3"
            changePositive
            icon={Target}
            iconBg="bg-warning/10"
            iconColor="text-warning"
          />
          <StatCard
            title="Total Trades"
            value={String(dashboardStats.totalTrades)}
            change="6 open"
            changePositive
            icon={BarChart2}
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equity Curve */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Equity Curve</h3>
            <EquityCurveChart />
          </div>

          {/* Win/Loss Pie */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-2">Win / Loss Ratio</h3>
            <WinLossPieChart />
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="bg-success/10 rounded-lg p-3">
                <p className="text-success font-bold text-xl">{dashboardStats.winningTrades}</p>
                <p className="text-text-muted text-xs">Winning Trades</p>
              </div>
              <div className="bg-danger/10 rounded-lg p-3">
                <p className="text-danger font-bold text-xl">{dashboardStats.losingTrades}</p>
                <p className="text-text-muted text-xs">Losing Trades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Monthly PnL</h3>
            <MonthlyPnLChart />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Performance by Strategy</h3>
            <StrategyPerformanceChart />
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
