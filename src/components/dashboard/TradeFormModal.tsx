'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Trade } from '@/types'
import { useAppContext } from '@/contexts/AppContext'

interface TradeFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: TradeFormData) => void
  initialValues?: Trade | null
}

export interface TradeFormData {
  asset: string
  direction: string
  entryDate: string
  exitDate: string
  entryPrice: string
  exitPrice: string
  positionSize: string
  stopLoss: string
  takeProfit: string
  strategyId: string
  notes: string
  emotionalState: string
}

export function TradeFormModal({ isOpen, onClose, onSave, initialValues }: TradeFormModalProps) {
  const { strategies } = useAppContext()

  const [form, setForm] = useState({
    asset: '',
    direction: 'LONG',
    entryDate: new Date().toISOString().split('T')[0],
    exitDate: '',
    entryPrice: '',
    exitPrice: '',
    positionSize: '',
    stopLoss: '',
    takeProfit: '',
    strategyId: '',
    notes: '',
    emotionalState: '',
  })

  useEffect(() => {
    if (initialValues) {
      setForm({
        asset: initialValues.asset ?? '',
        direction: initialValues.direction ?? 'LONG',
        entryDate: initialValues.entryDate
          ? (typeof initialValues.entryDate === 'string'
              ? initialValues.entryDate.split('T')[0]
              : new Date(initialValues.entryDate).toISOString().split('T')[0])
          : '',
        exitDate: initialValues.exitDate
          ? (typeof initialValues.exitDate === 'string'
              ? initialValues.exitDate.split('T')[0]
              : new Date(initialValues.exitDate).toISOString().split('T')[0])
          : '',
        entryPrice: initialValues.entryPrice != null ? String(initialValues.entryPrice) : '',
        exitPrice: initialValues.exitPrice != null ? String(initialValues.exitPrice) : '',
        positionSize: initialValues.positionSize != null ? String(initialValues.positionSize) : '',
        stopLoss: '',
        takeProfit: '',
        strategyId: initialValues.strategyId ?? '',
        notes: initialValues.notes ?? '',
        emotionalState: initialValues.emotionalState ?? '',
      })
    } else {
      setForm({
        asset: '',
        direction: 'LONG',
        entryDate: new Date().toISOString().split('T')[0],
        exitDate: '',
        entryPrice: '',
        exitPrice: '',
        positionSize: '',
        stopLoss: '',
        takeProfit: '',
        strategyId: '',
        notes: '',
        emotionalState: '',
      })
    }
  }, [initialValues, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  if (!isOpen) return null

  const isEditing = !!initialValues

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-background-secondary border border-border rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">
            {isEditing ? 'Edit Trade' : 'Add New Trade'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface hover:bg-surface-hover text-text-muted hover:text-text-primary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Asset</label>
              <input
                name="asset"
                value={form.asset}
                onChange={handleChange}
                placeholder="AAPL, BTC, etc."
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Direction</label>
              <select
                name="direction"
                value={form.direction}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Entry Date</label>
              <input
                type="date"
                name="entryDate"
                value={form.entryDate}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Exit Date</label>
              <input
                type="date"
                name="exitDate"
                value={form.exitDate}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Entry Price</label>
              <input
                type="number"
                name="entryPrice"
                value={form.entryPrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Exit Price</label>
              <input
                type="number"
                name="exitPrice"
                value={form.exitPrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Position Size</label>
              <input
                type="number"
                name="positionSize"
                value={form.positionSize}
                onChange={handleChange}
                placeholder="100"
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                required
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Stop Loss</label>
              <input
                type="number"
                name="stopLoss"
                value={form.stopLoss}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Take Profit</label>
              <input
                type="number"
                name="takeProfit"
                value={form.takeProfit}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
          </div>

          {/* Strategy */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Strategy</label>
            <select
              name="strategyId"
              value={form.strategyId}
              onChange={handleChange}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            >
              <option value="">Select Strategy</option>
              {strategies.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Emotional State */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Emotional State</label>
            <select
              name="emotionalState"
              value={form.emotionalState}
              onChange={handleChange}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            >
              <option value="">Select State</option>
              {['Confident', 'Calm', 'Excited', 'Anxious', 'Frustrated', 'Neutral', 'Patient', 'Greedy', 'Fearful'].map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Trade rationale, observations, lessons learned..."
              rows={3}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {isEditing ? 'Save Changes' : 'Add Trade'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
