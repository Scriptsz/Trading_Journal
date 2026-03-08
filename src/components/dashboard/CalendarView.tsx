'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Trade } from '@/types'
import { cn } from '@/lib/utils'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, addMonths, subMonths } from 'date-fns'

function getDayTrades(day: Date, trades: Trade[]) {
  return trades.filter((t) => {
    const tradeDate = new Date(t.entryDate)
    return isSameDay(tradeDate, day)
  })
}

function getDayPnL(trades: Trade[]) {
  return trades.reduce((sum, t) => sum + (t.pnl || 0), 0)
}

interface CalendarViewProps {
  trades?: Trade[]
}

export function CalendarView({ trades = [] }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1)) // June 2024
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startDayOfWeek = getDay(monthStart) // 0 = Sunday

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const selectedDayTrades = selectedDay ? getDayTrades(selectedDay, trades) : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="w-9 h-9 flex items-center justify-center bg-surface border border-border rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all text-sm"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="w-9 h-9 flex items-center justify-center bg-surface border border-border rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2">
          {/* Day names */}
          <div className="grid grid-cols-7 mb-2">
            {dayNames.map((name) => (
              <div key={name} className="text-center text-xs font-medium text-text-muted py-2">
                {name}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before month start */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {days.map((day) => {
              const dayTrades = getDayTrades(day, trades)
              const dayPnL = getDayPnL(dayTrades)
              const isSelected = selectedDay ? isSameDay(day, selectedDay) : false
              const isToday = isSameDay(day, new Date())
              const hasTrades = dayTrades.length > 0
              const isPositive = dayPnL > 0
              const isNegative = dayPnL < 0

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  className={cn(
                    'aspect-square p-1 rounded-lg flex flex-col items-center justify-center transition-all text-sm border',
                    isSelected
                      ? 'bg-primary/20 border-primary/50 text-primary'
                      : isToday
                      ? 'border-primary/30 text-text-primary'
                      : hasTrades && isPositive
                      ? 'bg-success/5 border-success/20 text-text-primary hover:bg-success/10'
                      : hasTrades && isNegative
                      ? 'bg-danger/5 border-danger/20 text-text-primary hover:bg-danger/10'
                      : 'border-transparent text-text-secondary hover:bg-surface hover:border-border'
                  )}
                >
                  <span className="font-medium">{format(day, 'd')}</span>
                  {hasTrades && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayTrades.slice(0, 3).map((t) => (
                        <div
                          key={t.id}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            (t.pnl || 0) >= 0 ? 'bg-success' : 'bg-danger'
                          )}
                        />
                      ))}
                    </div>
                  )}
                  {hasTrades && (
                    <span className={cn(
                      'text-xs leading-none mt-0.5',
                      isPositive ? 'text-success' : 'text-danger'
                    )}>
                      {isPositive ? '+' : ''}{dayPnL.toFixed(0)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected day details */}
        <div className="bg-surface border border-border rounded-xl p-4">
          {selectedDay ? (
            <>
              <h3 className="text-text-primary font-semibold mb-1">
                {format(selectedDay, 'MMMM d, yyyy')}
              </h3>
              <p className="text-text-muted text-sm mb-4">
                {selectedDayTrades.length} trade{selectedDayTrades.length !== 1 ? 's' : ''}
              </p>
              {selectedDayTrades.length > 0 ? (
                <div className="space-y-3">
                  {selectedDayTrades.map((trade) => (
                    <div key={trade.id} className="bg-background-secondary rounded-lg p-3 border border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-text-primary font-medium text-sm">{trade.asset}</span>
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          trade.direction === 'LONG' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                        )}>
                          {trade.direction}
                        </span>
                      </div>
                      {trade.pnl !== null && trade.pnl !== undefined && (
                        <p className={cn(
                          'text-sm font-semibold',
                          trade.pnl >= 0 ? 'text-success' : 'text-danger'
                        )}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                        </p>
                      )}
                      {trade.notes && (
                        <p className="text-text-muted text-xs mt-1 truncate">{trade.notes}</p>
                      )}
                    </div>
                  ))}
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Day PnL</span>
                      <span className={cn(
                        'font-semibold',
                        getDayPnL(selectedDayTrades) >= 0 ? 'text-success' : 'text-danger'
                      )}>
                        {getDayPnL(selectedDayTrades) >= 0 ? '+' : ''}${getDayPnL(selectedDayTrades).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-text-muted text-sm">No trades on this day.</p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <p className="text-text-muted text-sm">Click a day to see trade details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
