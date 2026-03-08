import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { AppProvider } from '@/contexts/AppContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  )
}
