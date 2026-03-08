import { TopBar } from '@/components/dashboard/TopBar'
import { RiskCalculator } from '@/components/dashboard/RiskCalculator'

export default function CalculatorPage() {
  return (
    <div>
      <TopBar title="Risk Calculator" subtitle="Calculate position size based on your risk tolerance" />
      <div className="p-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <RiskCalculator />
        </div>

        {/* Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'The 1% Rule',
              description: 'Never risk more than 1-2% of your account on a single trade. This protects your capital from large drawdowns.',
            },
            {
              title: 'Risk:Reward Minimum',
              description: 'Always aim for at least a 2:1 risk-to-reward ratio. This means you can be right less than 50% of the time and still be profitable.',
            },
            {
              title: 'Position Sizing Matters',
              description: 'Position sizing is one of the most important factors in trading. Even a strategy with a 40% win rate can be profitable with good position sizing.',
            },
          ].map((tip) => (
            <div key={tip.title} className="bg-surface border border-border rounded-xl p-4">
              <h4 className="text-primary font-semibold text-sm mb-2">{tip.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
