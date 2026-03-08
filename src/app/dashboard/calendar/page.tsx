'use client'

import { TopBar } from '@/components/dashboard/TopBar'
import { CalendarView } from '@/components/dashboard/CalendarView'
import { useAppContext } from '@/contexts/AppContext'

export default function CalendarPage() {
  const { trades } = useAppContext()

  return (
    <div>
      <TopBar title="Trading Calendar" subtitle="Visual overview of your trading activity" />
      <div className="p-6">
        <CalendarView trades={trades} />
      </div>
    </div>
  )
}
