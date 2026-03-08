'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus Johnson',
    role: 'Day Trader, 5 years experience',
    avatar: 'MJ',
    rating: 5,
    content: 'TradeLog completely transformed how I approach trading. The analytics showed me I was over-trading on Mondays and losing money I was making the rest of the week. Now I simply skip Mondays and my account is up 34% this quarter.',
  },
  {
    name: 'Sarah Chen',
    role: 'Swing Trader & Trading Coach',
    avatar: 'SC',
    rating: 5,
    content: 'I recommend TradeLog to every student I coach. The equity curve and drawdown analysis alone are worth it. Being able to see exactly when and why you lose is invaluable. Best journaling tool on the market by far.',
  },
  {
    name: 'Alex Rivera',
    role: 'Options Trader, Prop Firm',
    avatar: 'AR',
    rating: 5,
    content: 'Went from blowing two accounts to becoming consistently profitable in 6 months. The pattern recognition in TradeLog revealed I was revenge trading after losses. Fixing that one habit changed everything for me.',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            Traders Love TradeLog
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Join thousands of traders who have improved their performance with TradeLog.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface backdrop-blur-md border border-border rounded-xl p-6 hover:bg-surface-hover hover:border-border-hover transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Content */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-text-primary font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-text-muted text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
