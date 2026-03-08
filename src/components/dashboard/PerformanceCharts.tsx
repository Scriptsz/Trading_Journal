'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts'
import { monthlyPnLData, strategyPerformance, winLossData, equityCurveData } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-secondary border border-border rounded-lg p-3 shadow-xl">
        <p className="text-text-muted text-xs mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.name.includes('PnL') ? formatCurrency(entry.value) : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function MonthlyPnLChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={monthlyPnLData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis dataKey="month" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="pnl" name="Monthly PnL" radius={[4, 4, 0, 0]}>
          {monthlyPnLData.map((entry, index) => (
            <Cell key={index} fill={entry.pnl >= 0 ? '#10B981' : '#EF4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function StrategyPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={strategyPerformance} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis type="number" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <YAxis type="category" dataKey="name" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="totalPnl" name="Total PnL" fill="#3B82F6" radius={[0, 4, 4, 0]}>
          {strategyPerformance.map((entry, index) => (
            <Cell key={index} fill={entry.totalPnl >= 0 ? '#10B981' : '#EF4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function WinRateChart() {
  const data = [
    { month: 'Jan', winRate: 60 },
    { month: 'Feb', winRate: 71 },
    { month: 'Mar', winRate: 71 },
    { month: 'Apr', winRate: 67 },
    { month: 'May', winRate: 67 },
    { month: 'Jun', winRate: 71 },
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="winRateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis dataKey="month" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[40, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="winRate" name="Win Rate" stroke="#10B981" strokeWidth={2} fill="url(#winRateGradient)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function WinLossPieChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={winLossData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {winLossData.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [value, name]}
          contentStyle={{
            background: '#303332',
            border: '1px solid rgba(196,196,196,0.2)',
            borderRadius: '8px',
            color: '#F2F2F2',
          }}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#9D9D9D', fontSize: '12px' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function RRChart() {
  const data = [
    { month: 'Jan', avgRR: 1.9 },
    { month: 'Feb', avgRR: 2.5 },
    { month: 'Mar', avgRR: 2.2 },
    { month: 'Apr', avgRR: 2.1 },
    { month: 'May', avgRR: 2.4 },
    { month: 'Jun', avgRR: 2.6 },
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis dataKey="month" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}:1`} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="avgRR" name="Avg R:R" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4, fill: '#F59E0B' }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function AssetPerformanceChart() {
  const data = [
    { asset: 'NVDA', pnl: 2478 },
    { asset: 'BTC', pnl: 2065 },
    { asset: 'AAPL', pnl: 957 },
    { asset: 'AMZN', pnl: 801 },
    { asset: 'TSLA', pnl: 697 },
    { asset: 'SPY', pnl: 672 },
    { asset: 'ETH', pnl: 900 },
    { asset: 'MSFT', pnl: 988 },
    { asset: 'QQQ', pnl: 108 },
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis dataKey="asset" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="pnl" name="Total PnL" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.pnl >= 0 ? '#3B82F6' : '#EF4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DrawdownChart() {
  const data = [
    { date: '2024-01', drawdown: 0 },
    { date: '2024-02', drawdown: -2.1 },
    { date: '2024-03', drawdown: -4.5 },
    { date: '2024-04', drawdown: -1.8 },
    { date: '2024-05', drawdown: -8.2 },
    { date: '2024-06', drawdown: -3.1 },
    { date: '2024-07', drawdown: -1.2 },
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis dataKey="date" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="drawdown" name="Drawdown %" stroke="#EF4444" strokeWidth={2} fill="url(#drawdownGradient)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
