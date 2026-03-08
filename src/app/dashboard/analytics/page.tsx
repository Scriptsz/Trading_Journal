'use client'

import { TopBar } from '@/components/dashboard/TopBar'
import { StatCard } from '@/components/dashboard/StatCard'
import { EquityCurveChart } from '@/components/dashboard/EquityCurveChart'
import {
  WinRateChart, RRChart, MonthlyPnLChart, StrategyPerformanceChart,
  AssetPerformanceChart, DrawdownChart
} from '@/components/dashboard/PerformanceCharts'
import { dashboardStats } from '@/lib/mockData'
import { DollarSign, TrendingUp, Target, BarChart2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function AnalyticsPage() {
  return (
    <div>
      <TopBar title="Analytics" subtitle="Deep insights into your trading performance" />
      <div className="p-6 space-y-6">
        {/* KPIs */}
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
            title="Best Trade"
            value={formatCurrency(dashboardStats.bestTrade)}
            changePositive
            icon={Target}
            iconBg="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            title="Worst Trade"
            value={formatCurrency(dashboardStats.worstTrade)}
            changePositive={false}
            change="-7.6%"
            icon={BarChart2}
            iconBg="bg-danger/10"
            iconColor="text-danger"
          />
        </div>

        {/* Equity Curve */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-text-primary font-semibold mb-4">Equity Curve</h3>
          <EquityCurveChart />
        </div>

        {/* Win Rate & R:R */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Win Rate Over Time</h3>
            <WinRateChart />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Average R:R Over Time</h3>
            <RRChart />
          </div>
        </div>

        {/* Monthly PnL & Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Monthly PnL Breakdown</h3>
            <MonthlyPnLChart />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Performance by Strategy</h3>
            <StrategyPerformanceChart />
          </div>
        </div>

        {/* Asset & Drawdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Performance by Asset</h3>
            <AssetPerformanceChart />
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-text-primary font-semibold mb-4">Drawdown Analysis</h3>
            <DrawdownChart />
          </div>
        </div>

        {/* Stats grid */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-text-primary font-semibold mb-4">Advanced Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Trades', value: '42' },
              { label: 'Winning Trades', value: '27', color: 'text-success' },
              { label: 'Losing Trades', value: '15', color: 'text-danger' },
              { label: 'Win Rate', value: '62.8%', color: 'text-primary' },
              { label: 'Avg Win', value: '+$339', color: 'text-success' },
              { label: 'Avg Loss', value: '-$209', color: 'text-danger' },
              { label: 'Profit Factor', value: '2.18', color: 'text-warning' },
              { label: 'Max Drawdown', value: '-8.2%', color: 'text-danger' },
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
