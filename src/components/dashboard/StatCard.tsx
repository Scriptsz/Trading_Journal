import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change?: string
  changePositive?: boolean
  icon: React.ComponentType<{ className?: string }>
  iconBg?: string
  iconColor?: string
}

export function StatCard({
  title,
  value,
  change,
  changePositive,
  icon: Icon,
  iconBg = 'bg-primary/10',
  iconColor = 'text-primary',
}: StatCardProps) {
  return (
    <div className="bg-surface backdrop-blur-md border border-border rounded-xl p-5 hover:bg-surface-hover hover:border-border-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
        {change && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
            changePositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          )}>
            {changePositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-text-muted text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
    </div>
  )
}
