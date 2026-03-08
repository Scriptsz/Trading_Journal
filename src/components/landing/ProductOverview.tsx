'use client'

import { motion } from 'framer-motion'
import { BarChart2, Calendar, Target } from 'lucide-react'

const sections = [
  {
    title: 'Track Every Trade with Precision',
    description: 'Log trades in seconds with our intuitive journal. Capture entry, exit, strategy, emotional state, and detailed notes. Build a comprehensive trading history that reveals your edge.',
    bullets: ['One-click trade entry', 'Screenshot uploads', 'Emotional state tracking', 'Tag and filter trades'],
    icon: BarChart2,
    visual: 'journal',
  },
  {
    title: 'Uncover Patterns with Deep Analytics',
    description: 'Move beyond basic P&L. TradeLog reveals when you trade best, which strategies work, and what behaviors are costing you money. Data-driven insights for better decisions.',
    bullets: ['Equity curve visualization', 'Win rate by time of day', 'Strategy performance comparison', 'Drawdown analysis'],
    icon: BarChart2,
    visual: 'analytics',
    reverse: true,
  },
  {
    title: 'Master Your Risk Management',
    description: 'Protect your capital with our built-in position sizer. Set your account balance and risk percentage, then get exact position sizes for any setup.',
    bullets: ['Position size calculator', 'Risk/reward visualizer', 'Maximum drawdown alerts', 'Daily loss limits'],
    icon: Target,
    visual: 'risk',
  },
]

function JournalVisual() {
  return (
    <div className="bg-background-secondary rounded-xl border border-border overflow-hidden">
      <div className="border-b border-border p-4 flex items-center justify-between">
        <span className="text-text-primary font-semibold">Trade Journal</span>
        <button className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg">+ Add Trade</button>
      </div>
      <div className="p-4 space-y-2">
        {[
          { asset: 'NVDA', dir: 'LONG', entry: '$127.40', pnl: '+$627', status: 'win' },
          { asset: 'TSLA', dir: 'LONG', entry: '$192.30', pnl: '+$338', status: 'win' },
          { asset: 'SPY', dir: 'SHORT', entry: '$546.80', pnl: '+$220', status: 'win' },
          { asset: 'BTC', dir: 'SHORT', entry: '$67,200', pnl: '-$380', status: 'loss' },
        ].map((t) => (
          <div key={t.asset} className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs font-bold">
              {t.asset[0]}
            </div>
            <div className="flex-1">
              <span className="text-text-primary text-sm font-medium">{t.asset}</span>
              <span className="ml-2 text-xs text-text-muted">{t.entry}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.dir === 'LONG' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{t.dir}</span>
            <span className={`text-sm font-semibold ${t.status === 'win' ? 'text-success' : 'text-danger'}`}>{t.pnl}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  return (
    <div className="bg-background-secondary rounded-xl border border-border overflow-hidden p-4">
      <p className="text-text-secondary text-sm mb-4">Equity Curve</p>
      <div className="h-40 flex items-end gap-1 mb-4">
        {[30, 45, 40, 60, 55, 75, 65, 80, 70, 88, 82, 95, 88, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ height: `${h}%`, background: `rgba(59, 130, 246, ${0.4 + i * 0.04})` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Win Rate', value: '62.8%', positive: true },
          { label: 'Avg R:R', value: '2.3:1', positive: true },
          { label: 'Drawdown', value: '-8.2%', positive: false },
        ].map((s) => (
          <div key={s.label} className="bg-surface rounded-lg p-3 border border-border text-center">
            <p className="text-text-muted text-xs">{s.label}</p>
            <p className={`font-bold text-sm mt-1 ${s.positive ? 'text-success' : 'text-danger'}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RiskVisual() {
  return (
    <div className="bg-background-secondary rounded-xl border border-border overflow-hidden p-4">
      <p className="text-text-secondary text-sm mb-4">Risk Calculator</p>
      <div className="space-y-3 mb-4">
        {[
          { label: 'Account Balance', value: '$50,000' },
          { label: 'Risk %', value: '1.5%' },
          { label: 'Entry Price', value: '$185.20' },
          { label: 'Stop Loss', value: '$181.50' },
        ].map((f) => (
          <div key={f.label} className="flex items-center justify-between bg-surface rounded-lg px-3 py-2.5 border border-border">
            <span className="text-text-muted text-xs">{f.label}</span>
            <span className="text-text-primary text-sm font-medium">{f.value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
        <div className="bg-primary/10 rounded-lg p-3 text-center">
          <p className="text-text-muted text-xs">Position Size</p>
          <p className="text-primary font-bold mt-1">202 shares</p>
        </div>
        <div className="bg-success/10 rounded-lg p-3 text-center">
          <p className="text-text-muted text-xs">Dollar Risk</p>
          <p className="text-success font-bold mt-1">$750.00</p>
        </div>
      </div>
    </div>
  )
}

export function ProductOverview() {
  return (
    <section id="analytics" className="py-24 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            Built for Serious Traders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Every feature is designed to help you find your edge and exploit it consistently.
          </motion.p>
        </div>

        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${section.reverse ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={section.reverse ? 'lg:order-2' : ''}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-text-primary mb-4">{section.title}</h3>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">{section.description}</p>
                <ul className="space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-text-secondary">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={section.reverse ? 'lg:order-1' : ''}>
                {section.visual === 'journal' && <JournalVisual />}
                {section.visual === 'analytics' && <AnalyticsVisual />}
                {section.visual === 'risk' && <RiskVisual />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
