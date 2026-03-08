'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Trade } from '@/types'
import { cn } from '@/lib/utils'
import {
  format,
  startOfMonth,
  endOfMonth,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  startOfWeek,
} from 'date-fns'

// ── helpers ────────────────────────────────────────────────────────────────

function getDayTrades(day: Date, trades: Trade[]): Trade[] {
  return trades.filter((t) => isSameDay(new Date(t.entryDate), day))
}

function sumPnL(trades: Trade[]): number {
  return trades.reduce((s, t) => s + (t.pnl ?? 0), 0)
}

function calcAvgRR(trades: Trade[]): number | null {
  const withRR = trades.filter((t) => t.riskReward != null)
  if (withRR.length === 0) return null
  return withRR.reduce((s, t) => s + (t.riskReward ?? 0), 0) / withRR.length
}

function calcWinRate(trades: Trade[]): number | null {
  const closed = trades.filter((t) => t.pnl != null)
  if (closed.length === 0) return null
  return Math.round((closed.filter((t) => (t.pnl ?? 0) > 0).length / closed.length) * 100)
}

function fmtMoney(value: number): string {
  if (value === 0) return '$0'
  const abs = Math.abs(value)
  const sign = value > 0 ? '+' : '-'
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(1)}K`
  return `${sign}$${abs.toFixed(0)}`
}

// ── component ──────────────────────────────────────────────────────────────

interface JournalCalendarProps {
  trades: Trade[]
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function JournalCalendar({ trades }: JournalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1)) // June 2024
  const currentMonth = currentDate.getMonth()

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  // Build array of full weeks (Sun → Sat) that cover the month
  const weeks: Date[][] = []
  let weekCursor = startOfWeek(monthStart, { weekStartsOn: 0 })
  while (weekCursor <= monthEnd) {
    weeks.push(Array.from({ length: 7 }, (_, i) => addDays(weekCursor, i)))
    weekCursor = addDays(weekCursor, 7)
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="text-base font-bold text-text-primary">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:bg-surface-hover transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 rounded-lg border border-border text-text-secondary hover:bg-surface-hover text-sm transition-all"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:bg-surface-hover transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day-name header */}
      <div
        className="grid border-b border-border"
        style={{ gridTemplateColumns: 'repeat(7, 1fr) 128px' }}
      >
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="py-2.5 text-center text-xs font-semibold text-text-muted uppercase border-r border-border bg-surface"
          >
            {name}
          </div>
        ))}
        <div className="py-2.5 text-center text-xs font-semibold text-text-muted uppercase bg-surface">
          Week
        </div>
      </div>

      {/* Calendar rows */}
      {weeks.map((week, wi) => {
        const weekMonthTrades = week
          .filter((d) => d.getMonth() === currentMonth)
          .flatMap((d) => getDayTrades(d, trades))
        const weekPnL = sumPnL(weekMonthTrades)
        const weekCount = weekMonthTrades.length
        const weekWins = weekMonthTrades.filter((t) => (t.pnl ?? 0) > 0).length

        return (
          <div
            key={week[0].toISOString()}
            className="grid border-b border-border last:border-b-0"
            style={{ gridTemplateColumns: 'repeat(7, 1fr) 128px' }}
          >
            {/* Day cells */}
            {week.map((day) => {
              const inMonth = day.getMonth() === currentMonth
              const dayTrades = inMonth ? getDayTrades(day, trades) : []
              const pnl = sumPnL(dayTrades)
              const hasTrades = dayTrades.length > 0
              const isPos = pnl > 0
              const isNeg = pnl < 0
              const rr = hasTrades ? calcAvgRR(dayTrades) : null
              const wr = hasTrades ? calcWinRate(dayTrades) : null
              const isToday = isSameDay(day, new Date())

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'min-h-[108px] p-2.5 border-r border-border flex flex-col gap-0.5 transition-colors',
                    !inMonth && 'bg-surface/30',
                    inMonth && !hasTrades && 'bg-white hover:bg-surface/30',
                    hasTrades && isPos && 'bg-success/10 hover:bg-success/[0.15]',
                    hasTrades && isNeg && 'bg-danger/10 hover:bg-danger/[0.15]',
                    isToday && 'ring-2 ring-inset ring-primary/40',
                  )}
                >
                  {/* Date number */}
                  <span
                    className={cn(
                      'text-xs font-bold',
                      !inMonth
                        ? 'text-text-muted opacity-30'
                        : isToday
                        ? 'text-primary'
                        : 'text-text-secondary',
                    )}
                  >
                    {format(day, 'd')}
                  </span>

                  {/* Per-day trade data */}
                  {hasTrades && (
                    <>
                      <span
                        className={cn(
                          'text-sm font-bold leading-snug',
                          isPos ? 'text-success' : 'text-danger',
                        )}
                      >
                        {fmtMoney(pnl)}
                      </span>
                      <span className="text-[11px] text-text-muted leading-tight">
                        {dayTrades.length} trade{dayTrades.length !== 1 ? 's' : ''}
                      </span>
                      {rr !== null && (
                        <span className="text-[11px] text-text-muted leading-tight">
                          {rr.toFixed(1)}R{wr !== null ? `, ${wr}%` : ''}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )
            })}

            {/* Weekly summary cell */}
            <div className="min-h-[108px] p-3 bg-surface flex flex-col justify-center gap-0.5">
              {weekCount > 0 ? (
                <>
                  <p className="text-[11px] font-semibold text-text-muted">Week {wi + 1}</p>
                  <p
                    className={cn(
                      'text-sm font-bold leading-snug',
                      weekPnL > 0
                        ? 'text-success'
                        : weekPnL < 0
                        ? 'text-danger'
                        : 'text-text-secondary',
                    )}
                  >
                    {fmtMoney(weekPnL)}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {weekCount} trade{weekCount !== 1 ? 's' : ''}
                  </p>
                  {weekCount > 0 && (
                    <p className="text-[11px] text-text-muted">
                      {weekWins}W / {weekCount - weekWins}L
                    </p>
                  )}
                </>
              ) : (
                <p className="text-[11px] text-text-muted opacity-30">—</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
