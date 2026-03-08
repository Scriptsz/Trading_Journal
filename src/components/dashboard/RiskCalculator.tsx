'use client'

import { useState, useMemo } from 'react'
import { formatCurrency } from '@/lib/utils'

export function RiskCalculator() {
  const [form, setForm] = useState({
    accountBalance: 50000,
    riskPercent: 1.5,
    entryPrice: 185.20,
    stopLoss: 181.50,
    takeProfit: 195.50,
  })

  const calc = useMemo(() => {
    const { accountBalance, riskPercent, entryPrice, stopLoss, takeProfit } = form

    if (!entryPrice || !stopLoss) {
      return null
    }

    const dollarRisk = (accountBalance * riskPercent) / 100
    const riskPerShare = Math.abs(entryPrice - stopLoss)
    const positionSize = riskPerShare > 0 ? Math.floor(dollarRisk / riskPerShare) : 0
    const positionValue = positionSize * entryPrice
    const potentialProfit = takeProfit ? positionSize * Math.abs(takeProfit - entryPrice) : 0
    const riskReward = potentialProfit > 0 && dollarRisk > 0 ? potentialProfit / dollarRisk : 0

    return {
      dollarRisk,
      positionSize,
      positionValue,
      potentialProfit,
      riskReward,
    }
  }, [form])

  const handleChange = (field: string, value: number) => {
    setForm({ ...form, [field]: value })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <h3 className="text-text-primary font-semibold text-lg">Trade Parameters</h3>

        {[
          { label: 'Account Balance', field: 'accountBalance', prefix: '$', step: '1000', min: '100' },
          { label: 'Risk Percentage', field: 'riskPercent', suffix: '%', step: '0.1', min: '0.1', max: '10' },
          { label: 'Entry Price', field: 'entryPrice', prefix: '$', step: '0.01', min: '0' },
          { label: 'Stop Loss Price', field: 'stopLoss', prefix: '$', step: '0.01', min: '0' },
          { label: 'Take Profit Price', field: 'takeProfit', prefix: '$', step: '0.01', min: '0' },
        ].map(({ label, field, prefix, suffix, step, min, max }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>
            <div className="relative">
              {prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">{prefix}</span>
              )}
              <input
                type="number"
                value={form[field as keyof typeof form]}
                onChange={(e) => handleChange(field, parseFloat(e.target.value) || 0)}
                step={step}
                min={min}
                max={max}
                className={`w-full bg-surface border border-border rounded-lg py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm ${prefix ? 'pl-7 pr-4' : suffix ? 'pl-4 pr-8' : 'px-4'}`}
              />
              {suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">{suffix}</span>
              )}
            </div>
          </div>
        ))}

        {/* Risk slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary">Risk Level</span>
            <span className="text-primary font-medium">{form.riskPercent}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={form.riskPercent}
            onChange={(e) => handleChange('riskPercent', parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>Conservative (0.5%)</span>
            <span>Aggressive (5%)</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-5">
        <h3 className="text-text-primary font-semibold text-lg">Calculated Results</h3>

        {calc ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                <p className="text-text-muted text-xs mb-1">Position Size</p>
                <p className="text-primary font-bold text-2xl">{calc.positionSize.toLocaleString()}</p>
                <p className="text-text-muted text-xs mt-1">shares/units</p>
              </div>
              <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 text-center">
                <p className="text-text-muted text-xs mb-1">Dollar Risk</p>
                <p className="text-danger font-bold text-2xl">{formatCurrency(calc.dollarRisk)}</p>
                <p className="text-text-muted text-xs mt-1">{form.riskPercent}% of account</p>
              </div>
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
                <p className="text-text-muted text-xs mb-1">Potential Profit</p>
                <p className="text-success font-bold text-2xl">{formatCurrency(calc.potentialProfit)}</p>
                <p className="text-text-muted text-xs mt-1">at take profit</p>
              </div>
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
                <p className="text-text-muted text-xs mb-1">Risk:Reward</p>
                <p className="text-warning font-bold text-2xl">{calc.riskReward.toFixed(2)}:1</p>
                <p className="text-text-muted text-xs mt-1">{calc.riskReward >= 2 ? '✓ Good' : '⚠ Low'}</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
              <h4 className="text-text-primary font-medium text-sm">Trade Summary</h4>
              {[
                { label: 'Position Value', value: formatCurrency(calc.positionValue) },
                { label: 'Risk Amount', value: formatCurrency(calc.dollarRisk), color: 'text-danger' },
                { label: 'Potential Profit', value: formatCurrency(calc.potentialProfit), color: 'text-success' },
                { label: 'Risk:Reward Ratio', value: `${calc.riskReward.toFixed(2)}:1`, color: calc.riskReward >= 2 ? 'text-success' : 'text-warning' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-text-muted">{label}</span>
                  <span className={`font-medium ${color || 'text-text-primary'}`}>{value}</span>
                </div>
              ))}
            </div>

            {/* Visual bar */}
            <div>
              <div className="flex justify-between text-xs text-text-muted mb-2">
                <span>Risk</span>
                <span>Reward</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden">
                <div
                  className="bg-danger transition-all duration-300"
                  style={{ width: `${100 / (1 + calc.riskReward)}%` }}
                />
                <div
                  className="bg-success transition-all duration-300"
                  style={{ width: `${(100 * calc.riskReward) / (1 + calc.riskReward)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>{formatCurrency(calc.dollarRisk)}</span>
                <span>{formatCurrency(calc.potentialProfit)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-48 text-text-muted text-sm">
            Enter trade parameters to see calculations
          </div>
        )}
      </div>
    </div>
  )
}
