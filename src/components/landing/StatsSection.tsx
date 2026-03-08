'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '10,000+', label: 'Active Traders', description: 'Professionals using TradeLog daily' },
  { value: '2.5M+', label: 'Trades Analyzed', description: 'Across all asset classes' },
  { value: '$120M+', label: 'PnL Tracked', description: 'Total profit and loss documented' },
  { value: '94%', label: 'User Retention', description: 'Traders stick with TradeLog' },
]

export function StatsSection() {
  return (
    <section className="py-20 border-y border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-text-primary font-semibold mb-1">{stat.label}</div>
              <div className="text-text-muted text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
