import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary hover:bg-primary-hover text-white font-semibold transition-all duration-200 hover:scale-105',
      secondary: 'bg-surface hover:bg-surface-hover border border-border text-text-primary font-semibold transition-all duration-200',
      ghost: 'hover:bg-surface text-text-secondary hover:text-text-primary transition-all duration-200',
      danger: 'bg-danger hover:bg-danger-dark text-white font-semibold transition-all duration-200',
      success: 'bg-success hover:bg-success-dark text-white font-semibold transition-all duration-200',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-6 py-3 text-sm rounded-lg',
      lg: 'px-8 py-4 text-base rounded-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
