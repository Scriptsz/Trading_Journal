'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts'
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

interface MonthlyPnLData {
  month: string
  pnl: number
  trades: number
  winRate: number
}

export function MonthlyPnLChart({ data = [] }: { data?: MonthlyPnLData[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis dataKey="month" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="pnl" name="Monthly PnL" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.pnl >= 0 ? '#10B981' : '#EF4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

interface StrategyPerfData {
  name: string
  trades: number
  winRate: number
  totalPnl: number
  avgRR: number
}

export function StrategyPerformanceChart({ data = [] }: { data?: StrategyPerfData[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis type="number" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <YAxis type="category" dataKey="name" tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="totalPnl" name="Total PnL" fill="#3B82F6" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.totalPnl >= 0 ? '#10B981' : '#EF4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

interface WinRateData {
  month: string
  winRate: number
}

export function WinRateChart({ data = [] }: { data?: WinRateData[] }) {
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
        <YAxis tick={{ fill: '#9D9D9D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={(['auto', 'auto'] as [string, string])} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="winRate" name="Win Rate" stroke="#10B981" strokeWidth={2} fill="url(#winRateGradient)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

interface WinLossData {
  name: string
  value: number
  fill: string
}

export function WinLossPieChart({ data = [] }: { data?: WinLossData[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [value, name]}
          contentStyle={{
            background: '#FFFFFF',
            border: '1px solid #C4C4C4',
            borderRadius: '8px',
            color: '#191F1D',
          }}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#9D9D9D', fontSize: '12px' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

interface RRData {
  month: string
  avgRR: number
}

export function RRChart({ data = [] }: { data?: RRData[] }) {
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

interface AssetData {
  asset: string
  pnl: number
}

export function AssetPerformanceChart({ data = [] }: { data?: AssetData[] }) {
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

interface DrawdownData {
  date: string
  drawdown: number
}

export function DrawdownChart({ data = [] }: { data?: DrawdownData[] }) {
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
