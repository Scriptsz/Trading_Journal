'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import { equityCurveData } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-secondary border border-border rounded-lg p-3 shadow-xl">
        <p className="text-text-muted text-xs mb-1">{label}</p>
        <p className="text-text-primary font-semibold">{formatCurrency(payload[0].value)}</p>
        {payload[0].payload.pnl && (
          <p className={`text-xs ${payload[0].payload.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
            {payload[0].payload.pnl >= 0 ? '+' : ''}{formatCurrency(payload[0].payload.pnl)}
          </p>
        )}
      </div>
    )
  }
  return null
}

export function EquityCurveChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={equityCurveData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#9CA3AF', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => val.slice(5)}
        />
        <YAxis
          tick={{ fill: '#9CA3AF', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#equityGradient)"
          dot={false}
          activeDot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
