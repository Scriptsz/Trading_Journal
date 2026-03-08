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

## Getting the Latest Changes

If you already have the repository open locally in VS Code but your code is outdated, follow these steps to pull in the newest commits without re-cloning:

### 1 · Open the built-in terminal in VS Code
Press `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac) to open the integrated terminal.

### 2 · Make sure you are on the right branch
The latest fixes live on the `main` branch (or the feature branch referenced in the PR). Run:

```bash
# see all available branches
git fetch origin

# switch to main (replace with the branch name if different)
git checkout main

# pull the latest commits
git pull origin main
```

> **Tip – if you see a PR branch listed** (e.g. `copilot/implement-trading-journal-platform`), check it out instead:
> ```bash
> git checkout copilot/implement-trading-journal-platform
> git pull origin copilot/implement-trading-journal-platform
> ```

### 3 · Reinstall dependencies (in case new packages were added)

```bash
npm install
```

### 4 · Restart the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the page should now load with the full design.

---

### Troubleshooting: `git pull` is blocked by local changes

If `git pull` prints something like:

```
error: Your local changes to the following files would be overwritten by merge:
    package-lock.json
Please commit your changes or stash them before you merge.
Aborting
```

your local copy of `package-lock.json` (or another file) has uncommitted edits that conflict with the incoming changes.  
`package-lock.json` is auto-generated, so it is safe to discard your local version and let Git replace it with the remote version.

**Option A – discard just the conflicting file, then pull (recommended)**

```bash
git checkout -- package-lock.json   # throw away local changes to this file
git pull origin <branch-name>       # e.g. main, or copilot/implement-trading-journal-platform
npm install                         # regenerate node_modules to match the new lock file
```

**Option B – stash all local changes, pull, then restore**

Use this if you have other uncommitted edits you want to keep:

```bash
git stash                          # temporarily save all local changes
git pull origin <branch-name>      # e.g. main, or copilot/implement-trading-journal-platform
git stash pop                      # restore your other edits
npm install
```

After either option, run `npm run dev` and open [http://localhost:3000](http://localhost:3000).

---

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