import { Trade, Strategy } from '@/types'

export const mockStrategies: Strategy[] = [
  { id: 's1', userId: 'u1', name: 'Breakout', description: 'Trade price breakouts from key levels', color: '#3B82F6' },
  { id: 's2', userId: 'u1', name: 'Mean Reversion', description: 'Trade reversals from extreme levels', color: '#10B981' },
  { id: 's3', userId: 'u1', name: 'Momentum', description: 'Follow strong trending moves', color: '#F59E0B' },
  { id: 's4', userId: 'u1', name: 'Scalping', description: 'Quick in-and-out trades', color: '#8B5CF6' },
  { id: 's5', userId: 'u1', name: 'Swing Trading', description: 'Multi-day position trades', color: '#EC4899' },
]

export const mockTrades: Trade[] = [
  { id: 't1', userId: 'u1', asset: 'AAPL', direction: 'LONG', entryDate: '2024-01-03', exitDate: '2024-01-03', entryPrice: 185.20, exitPrice: 188.50, positionSize: 100, pnl: 330, pnlPercentage: 1.78, riskReward: 2.2, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'Clean breakout above resistance', emotionalState: 'Confident', createdAt: '2024-01-03', updatedAt: '2024-01-03' },
  { id: 't2', userId: 'u1', asset: 'TSLA', direction: 'SHORT', entryDate: '2024-01-05', exitDate: '2024-01-05', entryPrice: 248.50, exitPrice: 244.20, positionSize: 50, pnl: 215, pnlPercentage: 1.73, riskReward: 1.8, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'Momentum short on failed breakout', emotionalState: 'Calm', createdAt: '2024-01-05', updatedAt: '2024-01-05' },
  { id: 't3', userId: 'u1', asset: 'NVDA', direction: 'LONG', entryDate: '2024-01-08', exitDate: '2024-01-09', entryPrice: 495.30, exitPrice: 510.20, positionSize: 30, pnl: 447, pnlPercentage: 3.01, riskReward: 3.1, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'AI sector momentum breakout', emotionalState: 'Excited', createdAt: '2024-01-08', updatedAt: '2024-01-09' },
  { id: 't4', userId: 'u1', asset: 'SPY', direction: 'LONG', entryDate: '2024-01-10', exitDate: '2024-01-10', entryPrice: 472.30, exitPrice: 470.10, positionSize: 80, pnl: -176, pnlPercentage: -0.47, riskReward: 0.5, strategyId: 's4', strategy: mockStrategies[3], status: 'CLOSED', notes: 'Scalp failed, stopped out', emotionalState: 'Frustrated', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: 't5', userId: 'u1', asset: 'QQQ', direction: 'LONG', entryDate: '2024-01-12', exitDate: '2024-01-15', entryPrice: 401.50, exitPrice: 408.30, positionSize: 60, pnl: 408, pnlPercentage: 1.69, riskReward: 2.4, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'Swing trade over weekend', emotionalState: 'Patient', createdAt: '2024-01-12', updatedAt: '2024-01-15' },
  { id: 't6', userId: 'u1', asset: 'BTC', direction: 'LONG', entryDate: '2024-01-15', exitDate: '2024-01-16', entryPrice: 42500, exitPrice: 43800, positionSize: 0.5, pnl: 650, pnlPercentage: 3.06, riskReward: 2.8, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'Crypto breakout above key level', emotionalState: 'Confident', createdAt: '2024-01-15', updatedAt: '2024-01-16' },
  { id: 't7', userId: 'u1', asset: 'AAPL', direction: 'SHORT', entryDate: '2024-01-18', exitDate: '2024-01-18', entryPrice: 192.30, exitPrice: 194.50, positionSize: 80, pnl: -176, pnlPercentage: -1.14, riskReward: 0.8, strategyId: 's2', strategy: mockStrategies[1], status: 'CLOSED', notes: 'Mean reversion short failed', emotionalState: 'Anxious', createdAt: '2024-01-18', updatedAt: '2024-01-18' },
  { id: 't8', userId: 'u1', asset: 'ETH', direction: 'LONG', entryDate: '2024-01-19', exitDate: '2024-01-22', entryPrice: 2580, exitPrice: 2680, positionSize: 3, pnl: 300, pnlPercentage: 3.88, riskReward: 3.0, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'ETH weekly breakout', emotionalState: 'Calm', createdAt: '2024-01-19', updatedAt: '2024-01-22' },
  { id: 't9', userId: 'u1', asset: 'MSFT', direction: 'LONG', entryDate: '2024-01-22', exitDate: '2024-01-23', entryPrice: 406.30, exitPrice: 412.50, positionSize: 40, pnl: 248, pnlPercentage: 1.53, riskReward: 2.1, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'Momentum continuation', emotionalState: 'Confident', createdAt: '2024-01-22', updatedAt: '2024-01-23' },
  { id: 't10', userId: 'u1', asset: 'TSLA', direction: 'LONG', entryDate: '2024-01-25', exitDate: '2024-01-25', entryPrice: 218.80, exitPrice: 215.50, positionSize: 70, pnl: -231, pnlPercentage: -1.51, riskReward: 0.6, strategyId: 's4', strategy: mockStrategies[3], status: 'CLOSED', notes: 'Scalp stopped out early', emotionalState: 'Neutral', createdAt: '2024-01-25', updatedAt: '2024-01-25' },
  { id: 't11', userId: 'u1', asset: 'NVDA', direction: 'LONG', entryDate: '2024-02-01', exitDate: '2024-02-02', entryPrice: 613.50, exitPrice: 638.20, positionSize: 25, pnl: 617.5, pnlPercentage: 4.03, riskReward: 3.5, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'Post-earnings breakout', emotionalState: 'Excited', createdAt: '2024-02-01', updatedAt: '2024-02-02' },
  { id: 't12', userId: 'u1', asset: 'SPY', direction: 'LONG', entryDate: '2024-02-05', exitDate: '2024-02-06', entryPrice: 490.20, exitPrice: 494.80, positionSize: 70, pnl: 322, pnlPercentage: 0.94, riskReward: 2.0, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'Swing on bull flag', emotionalState: 'Patient', createdAt: '2024-02-05', updatedAt: '2024-02-06' },
  { id: 't13', userId: 'u1', asset: 'AAPL', direction: 'LONG', entryDate: '2024-02-08', exitDate: '2024-02-09', entryPrice: 188.30, exitPrice: 185.20, positionSize: 80, pnl: -248, pnlPercentage: -1.65, riskReward: 0.7, strategyId: 's2', strategy: mockStrategies[1], status: 'CLOSED', notes: 'Support bounce failed', emotionalState: 'Frustrated', createdAt: '2024-02-08', updatedAt: '2024-02-09' },
  { id: 't14', userId: 'u1', asset: 'BTC', direction: 'LONG', entryDate: '2024-02-12', exitDate: '2024-02-14', entryPrice: 48200, exitPrice: 51500, positionSize: 0.4, pnl: 1320, pnlPercentage: 6.85, riskReward: 4.2, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'ETF approval momentum', emotionalState: 'Euphoric', createdAt: '2024-02-12', updatedAt: '2024-02-14' },
  { id: 't15', userId: 'u1', asset: 'AMZN', direction: 'LONG', entryDate: '2024-02-15', exitDate: '2024-02-16', entryPrice: 175.50, exitPrice: 179.80, positionSize: 70, pnl: 301, pnlPercentage: 2.45, riskReward: 2.3, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'Cloud momentum trade', emotionalState: 'Confident', createdAt: '2024-02-15', updatedAt: '2024-02-16' },
  { id: 't16', userId: 'u1', asset: 'QQQ', direction: 'SHORT', entryDate: '2024-02-20', exitDate: '2024-02-20', entryPrice: 438.50, exitPrice: 441.20, positionSize: 50, pnl: -135, pnlPercentage: -0.62, riskReward: 0.6, strategyId: 's4', strategy: mockStrategies[3], status: 'CLOSED', notes: 'Scalp short rejected', emotionalState: 'Impatient', createdAt: '2024-02-20', updatedAt: '2024-02-20' },
  { id: 't17', userId: 'u1', asset: 'MSFT', direction: 'LONG', entryDate: '2024-02-22', exitDate: '2024-02-26', entryPrice: 415.50, exitPrice: 425.20, positionSize: 45, pnl: 436.5, pnlPercentage: 2.33, riskReward: 2.6, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'Multi-day swing winner', emotionalState: 'Calm', createdAt: '2024-02-22', updatedAt: '2024-02-26' },
  { id: 't18', userId: 'u1', asset: 'NVDA', direction: 'LONG', entryDate: '2024-03-01', exitDate: '2024-03-04', entryPrice: 785.50, exitPrice: 820.30, positionSize: 20, pnl: 696, pnlPercentage: 4.43, riskReward: 3.8, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'AI hype breakout continuation', emotionalState: 'Excited', createdAt: '2024-03-01', updatedAt: '2024-03-04' },
  { id: 't19', userId: 'u1', asset: 'TSLA', direction: 'SHORT', entryDate: '2024-03-06', exitDate: '2024-03-07', entryPrice: 178.20, exitPrice: 174.50, positionSize: 90, pnl: 333, pnlPercentage: 2.08, riskReward: 2.5, strategyId: 's2', strategy: mockStrategies[1], status: 'CLOSED', notes: 'Resistance rejection short', emotionalState: 'Confident', createdAt: '2024-03-06', updatedAt: '2024-03-07' },
  { id: 't20', userId: 'u1', asset: 'ETH', direction: 'LONG', entryDate: '2024-03-11', exitDate: '2024-03-12', entryPrice: 3820, exitPrice: 3950, positionSize: 2, pnl: 260, pnlPercentage: 3.40, riskReward: 2.9, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'ETH momentum with BTC', emotionalState: 'Calm', createdAt: '2024-03-11', updatedAt: '2024-03-12' },
  { id: 't21', userId: 'u1', asset: 'SPY', direction: 'SHORT', entryDate: '2024-03-14', exitDate: '2024-03-14', entryPrice: 515.30, exitPrice: 518.50, positionSize: 65, pnl: -208, pnlPercentage: -0.62, riskReward: 0.55, strategyId: 's4', strategy: mockStrategies[3], status: 'CLOSED', notes: 'Scalp short failed, trend too strong', emotionalState: 'Frustrated', createdAt: '2024-03-14', updatedAt: '2024-03-14' },
  { id: 't22', userId: 'u1', asset: 'AAPL', direction: 'LONG', entryDate: '2024-03-18', exitDate: '2024-03-20', entryPrice: 173.50, exitPrice: 178.20, positionSize: 85, pnl: 399.5, pnlPercentage: 2.71, riskReward: 2.4, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'Recovery swing trade', emotionalState: 'Patient', createdAt: '2024-03-18', updatedAt: '2024-03-20' },
  { id: 't23', userId: 'u1', asset: 'AMZN', direction: 'SHORT', entryDate: '2024-03-22', exitDate: '2024-03-22', entryPrice: 182.50, exitPrice: 184.80, positionSize: 75, pnl: -172.5, pnlPercentage: -1.26, riskReward: 0.7, strategyId: 's2', strategy: mockStrategies[1], status: 'CLOSED', notes: 'Mean reversion failed - trend resuming', emotionalState: 'Anxious', createdAt: '2024-03-22', updatedAt: '2024-03-22' },
  { id: 't24', userId: 'u1', asset: 'BTC', direction: 'LONG', entryDate: '2024-03-25', exitDate: '2024-03-28', entryPrice: 69500, exitPrice: 71200, positionSize: 0.3, pnl: 510, pnlPercentage: 2.45, riskReward: 2.7, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'BTC near ATH breakout', emotionalState: 'Excited', createdAt: '2024-03-25', updatedAt: '2024-03-28' },
  { id: 't25', userId: 'u1', asset: 'QQQ', direction: 'LONG', entryDate: '2024-04-01', exitDate: '2024-04-03', entryPrice: 447.80, exitPrice: 455.20, positionSize: 55, pnl: 407, pnlPercentage: 1.65, riskReward: 2.2, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'Tech momentum week', emotionalState: 'Confident', createdAt: '2024-04-01', updatedAt: '2024-04-03' },
  { id: 't26', userId: 'u1', asset: 'MSFT', direction: 'SHORT', entryDate: '2024-04-08', exitDate: '2024-04-08', entryPrice: 428.30, exitPrice: 432.10, positionSize: 40, pnl: -152, pnlPercentage: -0.89, riskReward: 0.65, strategyId: 's4', strategy: mockStrategies[3], status: 'CLOSED', notes: 'Failed scalp, trend continues', emotionalState: 'Neutral', createdAt: '2024-04-08', updatedAt: '2024-04-08' },
  { id: 't27', userId: 'u1', asset: 'NVDA', direction: 'LONG', entryDate: '2024-04-12', exitDate: '2024-04-15', entryPrice: 862.50, exitPrice: 895.20, positionSize: 18, pnl: 588.6, pnlPercentage: 3.79, riskReward: 3.2, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'Pre-earnings swing', emotionalState: 'Excited', createdAt: '2024-04-12', updatedAt: '2024-04-15' },
  { id: 't28', userId: 'u1', asset: 'ETH', direction: 'SHORT', entryDate: '2024-04-18', exitDate: '2024-04-19', entryPrice: 3100, exitPrice: 3020, positionSize: 2.5, pnl: 200, pnlPercentage: 2.58, riskReward: 2.1, strategyId: 's2', strategy: mockStrategies[1], status: 'CLOSED', notes: 'Crypto market correction trade', emotionalState: 'Calm', createdAt: '2024-04-18', updatedAt: '2024-04-19' },
  { id: 't29', userId: 'u1', asset: 'AAPL', direction: 'LONG', entryDate: '2024-04-22', exitDate: '2024-04-23', entryPrice: 165.80, exitPrice: 163.50, positionSize: 90, pnl: -207, pnlPercentage: -1.39, riskReward: 0.6, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'Breakout failed, earnings pressure', emotionalState: 'Disappointed', createdAt: '2024-04-22', updatedAt: '2024-04-23' },
  { id: 't30', userId: 'u1', asset: 'BTC', direction: 'LONG', entryDate: '2024-04-26', exitDate: '2024-04-29', entryPrice: 62500, exitPrice: 63800, positionSize: 0.35, pnl: 455, pnlPercentage: 2.08, riskReward: 2.4, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'Post-halving momentum', emotionalState: 'Confident', createdAt: '2024-04-26', updatedAt: '2024-04-29' },
  { id: 't31', userId: 'u1', asset: 'SPY', direction: 'LONG', entryDate: '2024-05-02', exitDate: '2024-05-03', entryPrice: 520.50, exitPrice: 525.80, positionSize: 60, pnl: 318, pnlPercentage: 1.02, riskReward: 2.0, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'FOMC bounce trade', emotionalState: 'Calm', createdAt: '2024-05-02', updatedAt: '2024-05-03' },
  { id: 't32', userId: 'u1', asset: 'TSLA', direction: 'LONG', entryDate: '2024-05-07', exitDate: '2024-05-08', entryPrice: 178.50, exitPrice: 183.20, positionSize: 75, pnl: 352.5, pnlPercentage: 2.63, riskReward: 2.5, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'TSLA recovery breakout', emotionalState: 'Hopeful', createdAt: '2024-05-07', updatedAt: '2024-05-08' },
  { id: 't33', userId: 'u1', asset: 'NVDA', direction: 'SHORT', entryDate: '2024-05-13', exitDate: '2024-05-13', entryPrice: 905.50, exitPrice: 912.30, positionSize: 16, pnl: -108.8, pnlPercentage: -0.75, riskReward: 0.6, strategyId: 's4', strategy: mockStrategies[3], status: 'CLOSED', notes: 'Short scalp against trend - bad idea', emotionalState: 'Greedy', createdAt: '2024-05-13', updatedAt: '2024-05-13' },
  { id: 't34', userId: 'u1', asset: 'AMZN', direction: 'LONG', entryDate: '2024-05-17', exitDate: '2024-05-20', entryPrice: 186.50, exitPrice: 194.20, positionSize: 65, pnl: 500.5, pnlPercentage: 4.13, riskReward: 3.4, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'AWS growth swing trade', emotionalState: 'Excited', createdAt: '2024-05-17', updatedAt: '2024-05-20' },
  { id: 't35', userId: 'u1', asset: 'ETH', direction: 'LONG', entryDate: '2024-05-22', exitDate: '2024-05-24', entryPrice: 3650, exitPrice: 3820, positionSize: 2, pnl: 340, pnlPercentage: 4.66, riskReward: 3.6, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'ETF announcement catalyst', emotionalState: 'Excited', createdAt: '2024-05-22', updatedAt: '2024-05-24' },
  { id: 't36', userId: 'u1', asset: 'QQQ', direction: 'SHORT', entryDate: '2024-05-28', exitDate: '2024-05-28', entryPrice: 462.30, exitPrice: 466.50, positionSize: 45, pnl: -189, pnlPercentage: -0.91, riskReward: 0.5, strategyId: 's2', strategy: mockStrategies[1], status: 'CLOSED', notes: 'Overextended short - wrong timing', emotionalState: 'Frustrated', createdAt: '2024-05-28', updatedAt: '2024-05-28' },
  { id: 't37', userId: 'u1', asset: 'AAPL', direction: 'LONG', entryDate: '2024-06-03', exitDate: '2024-06-05', entryPrice: 194.30, exitPrice: 200.50, positionSize: 70, pnl: 434, pnlPercentage: 3.19, riskReward: 3.0, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'WWDC momentum trade', emotionalState: 'Confident', createdAt: '2024-06-03', updatedAt: '2024-06-05' },
  { id: 't38', userId: 'u1', asset: 'MSFT', direction: 'LONG', entryDate: '2024-06-10', exitDate: '2024-06-11', entryPrice: 448.20, exitPrice: 455.80, positionSize: 40, pnl: 304, pnlPercentage: 1.70, riskReward: 2.2, strategyId: 's5', strategy: mockStrategies[4], status: 'CLOSED', notes: 'Cloud earnings swing', emotionalState: 'Calm', createdAt: '2024-06-10', updatedAt: '2024-06-11' },
  { id: 't39', userId: 'u1', asset: 'BTC', direction: 'SHORT', entryDate: '2024-06-14', exitDate: '2024-06-14', entryPrice: 67200, exitPrice: 69100, positionSize: 0.2, pnl: -380, pnlPercentage: -2.83, riskReward: 0.4, strategyId: 's4', strategy: mockStrategies[3], status: 'CLOSED', notes: 'Counter-trend short - costly mistake', emotionalState: 'Overconfident', createdAt: '2024-06-14', updatedAt: '2024-06-14' },
  { id: 't40', userId: 'u1', asset: 'NVDA', direction: 'LONG', entryDate: '2024-06-17', exitDate: '2024-06-19', entryPrice: 135.80, exitPrice: 141.50, positionSize: 110, pnl: 627, pnlPercentage: 4.20, riskReward: 3.5, strategyId: 's1', strategy: mockStrategies[0], status: 'CLOSED', notes: 'Post-split breakout trade', emotionalState: 'Excited', createdAt: '2024-06-17', updatedAt: '2024-06-19' },
  { id: 't41', userId: 'u1', asset: 'TSLA', direction: 'LONG', entryDate: '2024-06-24', exitDate: '2024-06-25', entryPrice: 192.30, exitPrice: 197.50, positionSize: 65, pnl: 338, pnlPercentage: 2.70, riskReward: 2.4, strategyId: 's3', strategy: mockStrategies[2], status: 'CLOSED', notes: 'FSD momentum news trade', emotionalState: 'Hopeful', createdAt: '2024-06-24', updatedAt: '2024-06-25' },
  { id: 't42', userId: 'u1', asset: 'SPY', direction: 'LONG', entryDate: '2024-06-27', exitDate: '2024-06-28', entryPrice: 546.80, exitPrice: 551.20, positionSize: 50, pnl: 220, pnlPercentage: 0.80, riskReward: 1.8, strategyId: 's2', strategy: mockStrategies[1], status: 'CLOSED', notes: 'Quarter-end rebalancing trade', emotionalState: 'Neutral', createdAt: '2024-06-27', updatedAt: '2024-06-28' },
  { id: 't43', userId: 'u1', asset: 'AAPL', direction: 'LONG', entryDate: '2024-07-01', exitDate: null, entryPrice: 216.80, exitPrice: null, positionSize: 75, pnl: null, pnlPercentage: null, riskReward: null, strategyId: 's5', strategy: mockStrategies[4], status: 'OPEN', notes: 'AI features swing trade - holding', emotionalState: 'Patient', createdAt: '2024-07-01', updatedAt: '2024-07-01' },
  { id: 't44', userId: 'u1', asset: 'NVDA', direction: 'LONG', entryDate: '2024-07-03', exitDate: null, entryPrice: 127.40, exitPrice: null, positionSize: 120, pnl: null, pnlPercentage: null, riskReward: null, strategyId: 's1', strategy: mockStrategies[0], status: 'OPEN', notes: 'AI chip demand breakout', emotionalState: 'Confident', createdAt: '2024-07-03', updatedAt: '2024-07-03' },
]

// Calculate cumulative PnL for equity curve
export const equityCurveData = (() => {
  const closedTrades = mockTrades.filter(t => t.status === 'CLOSED' && t.pnl !== null)
  let cumulative = 50000 // starting balance
  return closedTrades.map((trade) => {
    cumulative += trade.pnl!
    return {
      date: typeof trade.exitDate === 'string' ? trade.exitDate : new Date(trade.exitDate!).toISOString().split('T')[0],
      value: Math.round(cumulative),
      pnl: trade.pnl!,
    }
  })
})()

export const monthlyPnLData = [
  { month: 'Jan', pnl: 1332, trades: 10, winRate: 60 },
  { month: 'Feb', pnl: 2394, trades: 7, winRate: 71 },
  { month: 'Mar', pnl: 1719, trades: 7, winRate: 71 },
  { month: 'Apr', pnl: 1283, trades: 6, winRate: 67 },
  { month: 'May', pnl: 895, trades: 6, winRate: 67 },
  { month: 'Jun', pnl: 1543, trades: 7, winRate: 71 },
]

export const strategyPerformance = [
  { name: 'Breakout', trades: 12, winRate: 75, totalPnl: 4832, avgRR: 3.0 },
  { name: 'Mean Reversion', trades: 7, winRate: 57, totalPnl: 445, avgRR: 1.6 },
  { name: 'Momentum', trades: 9, winRate: 78, totalPnl: 2890, avgRR: 2.4 },
  { name: 'Scalping', trades: 7, winRate: 43, totalPnl: -899, avgRR: 0.6 },
  { name: 'Swing Trading', trades: 8, winRate: 88, totalPnl: 2898, avgRR: 2.7 },
]

export const winLossData = [
  { name: 'Wins', value: 27, fill: '#10B981' },
  { name: 'Losses', value: 15, fill: '#EF4444' },
]

export const dashboardStats = {
  totalPnl: 9166,
  winRate: 62.8,
  avgRR: 2.3,
  totalTrades: 42,
  winningTrades: 27,
  losingTrades: 15,
  bestTrade: 1320,
  worstTrade: -380,
}
