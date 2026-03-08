export type Direction = 'LONG' | 'SHORT'
export type TradeStatus = 'OPEN' | 'CLOSED' | 'CANCELLED'

export interface Trade {
  id: string
  userId: string
  asset: string
  direction: Direction
  entryDate: Date | string
  exitDate?: Date | string | null
  entryPrice: number
  exitPrice?: number | null
  positionSize: number
  pnl?: number | null
  pnlPercentage?: number | null
  riskReward?: number | null
  strategyId?: string | null
  strategy?: Strategy | null
  status: TradeStatus
  notes?: string | null
  screenshots?: string[]
  emotionalState?: string | null
  mistakesMade?: string | null
  tags?: Tag[]
  createdAt: Date | string
  updatedAt: Date | string
}

export interface Strategy {
  id: string
  userId: string
  name: string
  description?: string | null
  color: string
  trades?: Trade[]
  tradeCount?: number
  winRate?: number
  totalPnl?: number
  avgRR?: number
}

export interface Tag {
  id: string
  userId: string
  name: string
  color: string
}

export interface User {
  id: string
  clerkId: string
  email: string
  name?: string | null
  avatar?: string | null
  createdAt: Date | string
  updatedAt: Date | string
  settings?: UserSettings | null
}

export interface UserSettings {
  id: string
  userId: string
  currency: string
  timezone: string
  defaultRiskPercent: number
  theme: string
}

export interface TradeFormData {
  asset: string
  direction: Direction
  entryDate: string
  exitDate?: string
  entryPrice: number
  exitPrice?: number
  positionSize: number
  stopLoss?: number
  takeProfit?: number
  strategyId?: string
  notes?: string
  emotionalState?: string
}

export interface DashboardStats {
  totalPnl: number
  winRate: number
  avgRR: number
  totalTrades: number
  winningTrades: number
  losingTrades: number
  bestTrade: number
  worstTrade: number
}

export interface ChartDataPoint {
  date: string
  value: number
  pnl?: number
  cumulative?: number
}

export interface PerformanceByStrategy {
  name: string
  trades: number
  winRate: number
  totalPnl: number
  avgRR: number
}

export interface MonthlyPnL {
  month: string
  pnl: number
  trades: number
  winRate: number
}
