import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-text-primary font-bold text-2xl">TradeLog</span>
          </Link>
          <p className="text-text-secondary mt-2">Start your journey</p>
        </div>

        {/* Card */}
        <div className="bg-surface backdrop-blur-md border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Create Account</h1>
          <p className="text-text-secondary text-sm mb-6">
            Join 10,000+ traders improving their performance with TradeLog.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="accent-primary mt-0.5" />
              <span className="text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary-light">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:text-primary-light">Privacy Policy</a>
              </span>
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-[1.01]"
            >
              Create Account
            </Link>
          </form>

          <p className="text-center text-text-secondary text-sm mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-primary hover:text-primary-light transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
