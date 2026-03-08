'use client'

import { motion } from 'framer-motion'
import {
  BookOpen, BarChart2, Shield, Calendar, Target, TrendingUp,
  FileText, Lock, Zap
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Smart Journaling',
    description: 'Log every trade with detailed notes, screenshots, and emotional state tracking. Never miss a pattern again.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: BarChart2,
    title: 'Deep Analytics',
    description: 'Comprehensive charts and statistics showing your true performance across strategies, assets, and time frames.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Built-in position sizer and risk calculator. Define your risk tolerance and let TradeLog keep you accountable.',
    color: 'text-danger',
    bg: 'bg-danger/10',
  },
  {
    icon: Calendar,
    title: 'Trading Calendar',
    description: 'Visual calendar view of all your trades. Spot your best and worst trading days at a glance.',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: Target,
    title: 'Strategy Tracking',
    description: 'Track performance by strategy. Know exactly which setups are working and which to abandon.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: TrendingUp,
    title: 'Performance Dashboard',
    description: 'Real-time equity curve, win rate trends, and R:R analysis. Watch your account grow over time.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Export comprehensive reports to CSV or PDF. Perfect for tax season or sharing with mentors.',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: 'Your trading data is encrypted and secure. We use industry-standard encryption and never sell your data.',
    color: 'text-danger',
    bg: 'bg-danger/10',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js 14 for instant page loads. No waiting, no lag – just fast, reliable journaling.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Trade Better
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            A complete suite of tools designed to help traders at every level improve their consistency and profitability.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group bg-surface backdrop-blur-md border border-border rounded-xl p-6 hover:bg-surface-hover hover:border-border-hover hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-text-primary font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
