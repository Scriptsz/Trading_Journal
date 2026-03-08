'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

interface EquityDataPoint {
  date: string
  value: number
  pnl?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-secondary border border-border rounded-lg p-3 shadow-xl">
        <p className="text-text-muted text-xs mb-1">{label}</p>
        <p className="text-text-primary font-semibold">{formatCurrency(payload[0].value)}</p>
        {payload[0].payload.pnl != null && (
          <p className={`text-xs ${payload[0].payload.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
            {payload[0].payload.pnl >= 0 ? '+' : ''}{formatCurrency(payload[0].payload.pnl)}
          </p>
        )}
      </div>
    )
  }
  return null
}

interface EquityCurveChartProps {
  data?: EquityDataPoint[]
}

export function EquityCurveChart({ data = [] }: EquityCurveChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,196,196,0.1)" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#9D9D9D', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => val.slice(5)}
        />
        <YAxis
          tick={{ fill: '#9D9D9D', fontSize: 11 }}
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

