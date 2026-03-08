'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TopBar } from '@/components/dashboard/TopBar'
import { Button } from '@/components/ui/Button'
import { Save, Download, Trash2, Bell, Moon, Sun } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import type { AppSettings } from '@/contexts/AppContext'

export default function SettingsPage() {
  const { settings: ctxSettings, saveSettings, trades } = useAppContext()
  const router = useRouter()
  const [settings, setSettings] = useState<AppSettings>(ctxSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSettings(ctxSettings)
  }, [ctxSettings])

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = () => {
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleExport = () => {
    const escapeCSV = (val: any): string => {
      const str = String(val ?? '')
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str
    }
    const headers = ['Date', 'Asset', 'Direction', 'Entry', 'Exit', 'Size', 'PnL', 'PnL%', 'R:R', 'Strategy', 'Status', 'Notes']
    const rows = trades.map((t) => [
      t.entryDate, t.asset, t.direction, t.entryPrice,
      t.exitPrice ?? '', t.positionSize, t.pnl ?? '',
      t.pnlPercentage ?? '', t.riskReward ?? '',
      t.strategy?.name ?? '', t.status, t.notes ?? '',
    ])
    const csv = [headers, ...rows].map((r) => r.map(escapeCSV).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trades_export.csv'
    a.click()
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
      try {
        localStorage.removeItem('tradelog_trades')
        localStorage.removeItem('tradelog_strategies')
        localStorage.removeItem('tradelog_settings')
        localStorage.removeItem('tradelog_sidebar_collapsed')
      } catch {}
      router.push('/')
    }
  }

  const initials = settings.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div>
      <TopBar title="Settings" subtitle="Manage your account preferences" />
      <div className="p-6 max-w-3xl space-y-6">
        {/* Profile Settings */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold text-lg mb-5">Profile Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                {initials || 'U'}
              </div>
              <div>
                <p className="text-text-primary font-medium">Profile Photo</p>
                <p className="text-text-muted text-sm">JPG, PNG up to 5MB</p>
                <button className="mt-1 text-primary text-sm hover:text-primary-light transition-colors">
                  Upload photo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
                <input
                  value={settings.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trading Preferences */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold text-lg mb-5">Trading Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Base Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                <option value="USD">USD – US Dollar</option>
                <option value="EUR">EUR – Euro</option>
                <option value="GBP">GBP – British Pound</option>
                <option value="CAD">CAD – Canadian Dollar</option>
                <option value="AUD">AUD – Australian Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Berlin">Central Europe (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Default Risk % per Trade
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={settings.defaultRiskPercent}
                  onChange={(e) => handleChange('defaultRiskPercent', e.target.value)}
                  step="0.1"
                  min="0.1"
                  max="10"
                  className="w-full bg-background-secondary border border-border rounded-lg pl-4 pr-8 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold text-lg mb-5">Appearance</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleChange('theme', 'dark')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${settings.theme === 'dark' ? 'bg-primary/15 border-primary/40 text-primary' : 'bg-background-secondary border-border text-text-secondary hover:border-border-hover'}`}
            >
              <Moon className="w-4 h-4" />
              Dark Mode
            </button>
            <button
              onClick={() => handleChange('theme', 'light')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${settings.theme === 'light' ? 'bg-primary/15 border-primary/40 text-primary' : 'bg-background-secondary border-border text-text-secondary hover:border-border-hover'}`}
            >
              <Sun className="w-4 h-4" />
              Light Mode
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold text-lg mb-5">
            <Bell className="w-5 h-5 inline mr-2 text-primary" />
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { field: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about your account' },
              { field: 'weeklyReport', label: 'Weekly Performance Report', description: 'Get a summary of your trading week every Sunday' },
              { field: 'tradeAlerts', label: 'Trade Alerts', description: 'Receive alerts when trades hit your targets' },
            ].map(({ field, label, description }) => (
              <div key={field} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-text-primary text-sm font-medium">{label}</p>
                  <p className="text-text-muted text-xs mt-0.5">{description}</p>
                </div>
                <button
                  onClick={() => handleChange(field, !settings[field as keyof typeof settings])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings[field as keyof typeof settings] ? 'bg-primary' : 'bg-surface-hover'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[field as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold text-lg mb-5">Data Management</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-background-secondary rounded-xl border border-border">
              <div>
                <p className="text-text-primary font-medium text-sm">Export All Data</p>
                <p className="text-text-muted text-xs mt-0.5">Download all your trades and data as CSV</p>
              </div>
              <Button variant="secondary" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-danger/5 rounded-xl border border-danger/20">
              <div>
                <p className="text-danger font-medium text-sm">Delete Account</p>
                <p className="text-text-muted text-xs mt-0.5">Permanently delete your account and all data</p>
              </div>
              <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-4">
          {saved && (
            <span className="text-success text-sm font-medium">✓ Saved!</span>
          )}
          <Button variant="primary" onClick={handleSave}>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
