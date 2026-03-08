import { TopBar } from '@/components/dashboard/TopBar'
import { CalendarView } from '@/components/dashboard/CalendarView'

export default function CalendarPage() {
  return (
    <div>
      <TopBar title="Trading Calendar" subtitle="Visual overview of your trading activity" />
      <div className="p-6">
        <CalendarView />
      </div>
    </div>
  )
}
