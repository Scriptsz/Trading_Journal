# TradeLog - Professional Trading Journal SaaS Platform

A production-ready Trading Journal SaaS platform with dark fintech UI, built with Next.js 14, TypeScript, Tailwind CSS, and Recharts.

## Features

- 📊 **Comprehensive Analytics** - Equity curves, win rate charts, drawdown analysis
- 📔 **Smart Trade Journal** - Log trades with notes, screenshots, and emotional state tracking
- 📅 **Trading Calendar** - Visual calendar view showing daily P&L and trade markers
- 🎯 **Strategy Tracking** - Performance breakdown by trading strategy
- 🧮 **Risk Calculator** - Real-time position size calculator
- 📈 **Performance Dashboard** - Overview of all key trading metrics
- ⚙️ **Settings** - Profile, preferences, and data management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: Clerk

## Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- Clerk account

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Scriptsz/Trading_Journal.git
cd Trading_Journal
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/trading_journal"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

4. **Set up the database**

```bash
npm run db:push
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |

## Clerk Setup

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key to `.env`
4. Configure your allowed origins and redirect URLs in Clerk dashboard

## Database Setup

Recommended providers: [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app)

```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
```

## Building for Production

```bash
npm run build
npm run start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
src/
├── app/
│   ├── (landing)/          # Public landing page
│   ├── (auth)/             # Authentication pages
│   └── dashboard/          # Protected dashboard pages
│       ├── analytics/
│       ├── calendar/
│       ├── calculator/
│       ├── journal/
│       ├── settings/
│       └── strategies/
├── components/
│   ├── dashboard/          # Dashboard components
│   ├── landing/            # Landing page components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── mockData.ts         # Sample data for demo
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript types
prisma/
└── schema.prisma           # Database schema
```

## Design System

Dark fintech aesthetic:
- **Background**: Deep navy (`#0A0E27`)
- **Primary**: Blue (`#3B82F6`)
- **Success**: Green (`#10B981`)
- **Danger**: Red (`#EF4444`)
- Glassmorphism cards, Inter font

## License

MIT License