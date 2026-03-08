import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function SignInPage() {
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
          <p className="text-text-secondary mt-2">Welcome back</p>
        </div>

        {/* Card */}
        <div className="bg-surface backdrop-blur-md border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Sign In</h1>
          <p className="text-text-secondary text-sm mb-6">
            Sign in to your TradeLog account to access your journal.
          </p>

          <form className="space-y-4">
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
                placeholder="••••••••"
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:text-primary-light transition-colors">
                Forgot password?
              </a>
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-[1.01]"
            >
              Sign In
            </Link>
          </form>

          <p className="text-center text-text-secondary text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-primary hover:text-primary-light transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
