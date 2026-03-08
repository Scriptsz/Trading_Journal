'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Trade, Strategy } from '@/types'
import { mockTrades, mockStrategies } from '@/lib/mockData'

const STORAGE_KEYS = {
  trades: 'tradelog_trades',
  strategies: 'tradelog_strategies',
  settings: 'tradelog_settings',
}

export interface AppSettings {
  name: string
  email: string
  currency: string
  timezone: string
  defaultRiskPercent: string
  theme: string
  emailNotifications: boolean
  weeklyReport: boolean
  tradeAlerts: boolean
}

const defaultSettings: AppSettings = {
  name: 'John Doe',
  email: 'john@example.com',
  currency: 'USD',
  timezone: 'America/New_York',
  defaultRiskPercent: '1.5',
  theme: 'dark',
  emailNotifications: true,
  weeklyReport: true,
  tradeAlerts: false,
}

type AddTradeInput = Omit<Trade, 'id' | 'userId' | 'createdAt' | 'updatedAt'> & { stopLoss?: number }
type UpdateTradeInput = Trade & { stopLoss?: number }

interface AppContextType {
  trades: Trade[]
  strategies: Strategy[]
  settings: AppSettings
  addTrade: (trade: AddTradeInput) => void
  updateTrade: (trade: UpdateTradeInput) => void
  deleteTrade: (id: string) => void
  addStrategy: (s: Omit<Strategy, 'id' | 'userId'>) => void
  updateStrategy: (s: Strategy) => void
  deleteStrategy: (id: string) => void
  saveSettings: (s: AppSettings) => void
}

const AppContext = createContext<AppContextType | null>(null)

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function computeTradeFields(
  direction: string,
  entryPrice: number,
  exitPrice: number | null | undefined,
  positionSize: number,
  stopLoss?: number | null,
): Pick<Trade, 'status' | 'pnl' | 'pnlPercentage' | 'riskReward'> {
  if (!exitPrice) {
    return { status: 'OPEN', pnl: null, pnlPercentage: null, riskReward: null }
  }

  const ep = Number(entryPrice)
  const xp = Number(exitPrice)
  const ps = Number(positionSize)

  const pnl = direction === 'LONG' ? (xp - ep) * ps : (ep - xp) * ps
  const pnlPercentage = ep * ps !== 0 ? (pnl / (ep * ps)) * 100 : 0

  let riskReward: number | null = null
  if (stopLoss != null) {
    const sl = Number(stopLoss)
    const denom = ep - sl
    if (denom !== 0) {
      riskReward = Math.abs((xp - ep) / denom)
    }
  }

  return { status: 'CLOSED', pnl, pnlPercentage, riskReward }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>([])
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)

  useEffect(() => {
    try {
      const storedTrades = localStorage.getItem(STORAGE_KEYS.trades)
      const storedStrategies = localStorage.getItem(STORAGE_KEYS.strategies)
      const storedSettings = localStorage.getItem(STORAGE_KEYS.settings)

      if (storedTrades) {
        setTrades(JSON.parse(storedTrades))
      } else {
        setTrades(mockTrades)
        localStorage.setItem(STORAGE_KEYS.trades, JSON.stringify(mockTrades))
      }

      if (storedStrategies) {
        setStrategies(JSON.parse(storedStrategies))
      } else {
        setStrategies(mockStrategies)
        localStorage.setItem(STORAGE_KEYS.strategies, JSON.stringify(mockStrategies))
      }

      if (storedSettings) {
        setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) })
      }
    } catch {
      // localStorage not available
    }
  }, [])

  const persistTrades = (t: Trade[]) => {
    setTrades(t)
    try { localStorage.setItem(STORAGE_KEYS.trades, JSON.stringify(t)) } catch {}
  }

  const persistStrategies = (s: Strategy[]) => {
    setStrategies(s)
    try { localStorage.setItem(STORAGE_KEYS.strategies, JSON.stringify(s)) } catch {}
  }

  const addTrade = (tradeData: AddTradeInput) => {
    const now = new Date().toISOString()
    const computed = computeTradeFields(
      tradeData.direction,
      tradeData.entryPrice,
      tradeData.exitPrice,
      tradeData.positionSize,
      tradeData.stopLoss,
    )
    // Resolve latest strategy list (use current strategies state via closure)
    const strategyObj = strategies.find(s => s.id === tradeData.strategyId) ?? null
    const { stopLoss: _sl, ...rest } = tradeData as AddTradeInput & { stopLoss?: number }
    const newTrade: Trade = {
      ...rest,
      ...computed,
      id: generateId(),
      userId: 'u1',
      strategy: strategyObj,
      createdAt: now,
      updatedAt: now,
    }
    persistTrades([...trades, newTrade])
  }

  const updateTrade = (trade: UpdateTradeInput) => {
    const computed = computeTradeFields(
      trade.direction,
      trade.entryPrice,
      trade.exitPrice,
      trade.positionSize,
      trade.stopLoss,
    )
    const strategyObj = strategies.find(s => s.id === trade.strategyId) ?? trade.strategy ?? null
    const { stopLoss: _sl, ...rest } = trade as UpdateTradeInput & { stopLoss?: number }
    const updated: Trade = {
      ...rest,
      ...computed,
      strategy: strategyObj,
      updatedAt: new Date().toISOString(),
    }
    persistTrades(trades.map(t => (t.id === trade.id ? updated : t)))
  }

  const deleteTrade = (id: string) => {
    persistTrades(trades.filter(t => t.id !== id))
  }

  const addStrategy = (s: Omit<Strategy, 'id' | 'userId'>) => {
    const newStrategy: Strategy = { ...s, id: generateId(), userId: 'u1' }
    persistStrategies([...strategies, newStrategy])
  }

  const updateStrategy = (s: Strategy) => {
    persistStrategies(strategies.map(st => (st.id === s.id ? s : st)))
  }

  const deleteStrategy = (id: string) => {
    persistStrategies(strategies.filter(s => s.id !== id))
  }

  const saveSettings = (s: AppSettings) => {
    setSettings(s)
    try { localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(s)) } catch {}
  }

  return (
    <AppContext.Provider
      value={{
        trades,
        strategies,
        settings,
        addTrade,
        updateTrade,
        deleteTrade,
        addStrategy,
        updateStrategy,
        deleteStrategy,
        saveSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider')
  return ctx
}
