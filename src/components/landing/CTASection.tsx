'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-primary/20 via-surface to-surface border border-primary/30 rounded-3xl p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6">
              Start Trading Smarter{' '}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Today
              </span>
            </h2>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto mb-10">
              Join 10,000+ traders who use TradeLog to journal, analyze, and improve their trading performance.
              Free to get started — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/sign-up"
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/25"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-surface hover:bg-surface-hover border border-border text-text-primary font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-200"
              >
                View Demo
              </Link>
            </div>
            <p className="text-text-muted text-sm">No credit card required • Free forever plan available • Setup in 2 minutes</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
