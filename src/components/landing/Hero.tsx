'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2, Shield, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8"
        >
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">The #1 Trading Journal Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight"
        >
          Trade Smarter,{' '}
          <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Journal Better
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Stop guessing why you&apos;re losing. TradeLog gives you the analytics, pattern recognition,
          and insights to become a consistently profitable trader.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/sign-up"
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/25"
          >
            Start for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-surface hover:bg-surface-hover border border-border text-text-primary font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200"
          >
            View Demo Dashboard
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm mb-16"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span>Bank-level security</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" />
            <span>2.5M+ trades analyzed</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span>10,000+ active traders</span>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="bg-surface backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Mock dashboard UI */}
            <div className="bg-background-secondary border-b border-border px-6 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <div className="flex-1 mx-8 bg-surface rounded-md py-1.5 px-4 text-xs text-text-muted text-center">
                app.tradelog.io/dashboard
              </div>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
              {[
                { label: 'Total PnL', value: '+$9,166', change: '+18.3%', positive: true },
                { label: 'Win Rate', value: '62.8%', change: '+4.2%', positive: true },
                { label: 'Avg R:R', value: '2.3:1', change: '+0.3', positive: true },
                { label: 'Total Trades', value: '42', change: '6 open', positive: true },
              ].map((stat) => (
                <div key={stat.label} className="bg-background-secondary rounded-xl p-4 border border-border">
                  <p className="text-text-muted text-xs mb-1">{stat.label}</p>
                  <p className="text-text-primary font-bold text-xl">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.positive ? 'text-success' : 'text-danger'}`}>{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 grid grid-cols-2 gap-4">
              <div className="bg-background-secondary rounded-xl p-4 border border-border h-40 flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `rgba(48, 51, 50, ${0.3 + i * 0.05})` }} />
                ))}
              </div>
              <div className="bg-background-secondary rounded-xl p-4 border border-border h-40">
                <p className="text-text-muted text-xs mb-3">Recent Trades</p>
                <div className="space-y-2">
                  {[
                    { asset: 'NVDA', dir: 'LONG', pnl: '+$627', color: 'text-success' },
                    { asset: 'TSLA', dir: 'LONG', pnl: '+$338', color: 'text-success' },
                    { asset: 'BTC', dir: 'SHORT', pnl: '-$380', color: 'text-danger' },
                  ].map((t) => (
                    <div key={t.asset} className="flex items-center justify-between">
                      <span className="text-text-primary text-xs font-medium">{t.asset}</span>
                      <span className={`text-xs px-2 py-0.5 rounded bg-primary/10 text-primary`}>{t.dir}</span>
                      <span className={`text-xs font-semibold ${t.color}`}>{t.pnl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-3xl" />
        </motion.div>
      </div>
    </section>
  )
}
