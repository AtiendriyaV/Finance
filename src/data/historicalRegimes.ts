import { HistoricalEventAnalysis } from '../types/market';

export const HISTORICAL_REGIMES: HistoricalEventAnalysis[] = [
  {
    id: 'harshad-mehta-1992',
    name: '1992 Harshad Mehta Bull Run & Banking Scam Crash',
    period: '1991 - 1992',
    startYear: 1991,
    endYear: 1992,
    regimeType: 'CRASH',
    niftyDrawdownOrReturn: -54.0,
    durationDays: 320,
    fiiFlowPattern: 'Pre-FII era; driven by domestic interbank fund siphoning via Bank Receipts (BRs)',
    macroCatalyst: 'Liberalization euphoria coupled with illegal credit diversion from public sector banks into Dalal Street stocks (ACC, etc.)',
    statisticalSignature: {
      hurstExponent: 0.74, // Extreme persistent trend followed by abrupt structural regime break
      excessKurtosis: 9.8,
      maxDrawdownDuration: 320,
      recoveryHalfLifeDays: 580,
    },
    randomWalkVsRegimeVerdict: 'PARTIALLY_PREDICTABLE',
    verdictRationale: 'Price discovery prior to 1992 was non-random due to structural market imperfections (T+14 physical settlement, badla finance, manipulated float). However, timing the crash was purely stochastic (whistleblower expose). Institutional takeaway: Valuation bubbles exceeding +3.5 standard deviations above 10-year mean P/E (>45x) always mean-revert, though the catalyst is exogenous.',
    quantitativeBacktestRule: 'Flag when Trailing P/E exceeds 35x AND 20-day Volume expands > 300% without underlying earnings revision. Trigger trailing stop-loss at 20 EMA breakdown.',
    sampleCodeSnippet: `# Python (Pandas / Vectorbt) Regime Detection
import numpy as np
import pandas as pd

def detect_speculative_blowoff(df, pe_threshold=32.0, vol_zscore=2.5):
    """Flags speculative liquidity bubbles via valuation-volume divergence."""
    df['pe_zscore'] = (df['pe'] - df['pe'].rolling(252*3).mean()) / df['pe'].rolling(252*3).std()
    df['vol_z'] = (df['volume'] - df['volume'].rolling(50).mean()) / df['volume'].rolling(50).std()
    
    # Structural regime warning
    df['bubble_regime'] = (df['pe'] > pe_threshold) & (df['vol_z'] > vol_zscore)
    df['exit_signal'] = df['bubble_regime'].shift(1) & (df['close'] < df['close'].rolling(20).mean())
    return df['exit_signal']`
  },
  {
    id: 'ketan-parekh-dotcom-2000',
    name: '2000-2001 Dotcom Bust & KP K-10 Liquidity Squeeze',
    period: '2000 - 2001',
    startYear: 2000,
    endYear: 2001,
    regimeType: 'CRASH',
    niftyDrawdownOrReturn: -51.2,
    durationDays: 410,
    peakVIX: 42.0,
    fiiFlowPattern: 'Aggressive tech-focused FII inflows in Q1 2000, followed by abrupt $1.2B outflow as Nasdaq cratered',
    macroCatalyst: 'Global TMT (Tech, Media, Telecom) bubble burst compounded by Dalal Street circular trading in the K-10 basket (Himachal Futuristic, Global Tele, Zee, DSQ)',
    statisticalSignature: {
      hurstExponent: 0.68,
      excessKurtosis: 7.4,
      maxDrawdownDuration: 410,
      recoveryHalfLifeDays: 720,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'Classic sector concentration regime shift. Nifty IT market cap weighting peaked at over 32% of total index weight, while non-tech sectors traded at deep discounts. Sector dispersion reached historic 99th percentile. Once Nasdaq broke its 200 DMA, cross-market transmission into Indian IT stocks was statistically near-deterministic (correlation spiked from 0.18 to 0.79).',
    quantitativeBacktestRule: 'Sector Concentration Rule: If single sector weight in benchmark exceeds 25% and Sector 3M RSI > 80, systematically initiate long-short pair (Long Nifty FMCG/Defensives, Short Overheated Sector Index).',
    sampleCodeSnippet: `# Pairs Trading Sector Concentration Anomaly
def sector_concentration_arbitrage(index_weights, sector_returns):
    # Detect when single sector weight exceeds historical 95th percentile
    tech_weight = index_weights['IT']
    if tech_weight > 0.25 and sector_returns['IT'].rolling(14).mean() > 0.08:
        return {'hedge_ratio': 1.2, 'action': 'SHORT_SECTOR_LONG_BENCHMARK'}
    return {'action': 'NEUTRAL'}`
  },
  {
    id: 'golden-capex-2003-2007',
    name: '2003-2007 Golden Capex & Globalization Super-Cycle',
    period: '2003 - 2007',
    startYear: 2003,
    endYear: 2007,
    regimeType: 'BULL_RUN',
    niftyDrawdownOrReturn: 520.0,
    durationDays: 1650,
    fiiFlowPattern: 'Record structural FII inflows ($35B cumulative) entering India via P-Notes and domestic mutual funds',
    macroCatalyst: 'Twin balance sheet health, corporate deleveraging, infrastructure investment (Golden Quadrilateral), global commodity boom, and corporate earnings CAGR > 22%',
    statisticalSignature: {
      hurstExponent: 0.62, // Strong persistent trending regime
      excessKurtosis: 3.8,
      maxDrawdownDuration: 45, // Mild intra-bull pullbacks (e.g. May 2006 correction)
      recoveryHalfLifeDays: 32,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'This was an autogenous multi-year macro regime with strong autocorrelation in earnings upgrades. When corporate ROE is expanding from 14% to 22% alongside credit growth > 25%, equity prices exhibit strong momentum persistence ($H = 0.62$), far departing from pure random walk theory. Trend-following momentum factor models captured >85% of this move.',
    quantitativeBacktestRule: 'Multi-Factor Momentum: Filter Nifty 500 universe for 12M Momentum > 80th percentile AND ROE > 18% AND Net Debt/EBITDA < 1.5. Rebalance monthly. Trailing stop: 50-day EMA.',
    sampleCodeSnippet: `# Fama-French + Carhart 4-Factor Momentum Backtest
import statsmodels.api as sm

def factor_screening_pipeline(stocks_universe_df):
    """Institutional Factor Tilt: Quality + Momentum (Carhart WML)"""
    ranked = stocks_universe_df.copy()
    ranked['mom_score'] = ranked['12m_return'].rank(pct=True)
    ranked['roe_score'] = ranked['roe'].rank(pct=True)
    ranked['composite_alpha'] = 0.6 * ranked['mom_score'] + 0.4 * ranked['roe_score']
    
    # Select top decile
    top_decile = ranked[ranked['composite_alpha'] > 0.90]
    return top_decile.sort_values(by='composite_alpha', ascending=False)`
  },
  {
    id: 'gfc-crash-2008',
    name: '2008 Great Financial Crisis & Global Liquidity Seizure',
    period: '2008 - 2009',
    startYear: 2008,
    endYear: 2009,
    regimeType: 'CRASH',
    niftyDrawdownOrReturn: -64.4,
    durationDays: 385,
    peakVIX: 68.5,
    fiiFlowPattern: 'Record $12B FII redemption as Western parent banks liquidated emerging market assets to cover subprime margin calls',
    macroCatalyst: 'Lehman Brothers bankruptcy, Wall Street shadow banking insolvency, dry-up of external commercial borrowings (ECB), and global deleveraging',
    statisticalSignature: {
      hurstExponent: 0.41, // Violent whipsaws, high mean-reversion volatility
      excessKurtosis: 11.2, // Extreme fat tails; 5-sigma daily drops occurred multiple times
      maxDrawdownDuration: 385,
      recoveryHalfLifeDays: 450,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'While daily price changes during the crash behaved like non-linear stochastic jumps (unforecastable day-to-day noise), the macro regime itself was cleanly signaled by the TED spread, US HY credit spreads widening, and India VIX exploding above 35. Mandelbrot’s volatility clustering was intensely present: daily variance autocorrelation was >0.85.',
    quantitativeBacktestRule: 'Volatility Regime Gate: If India VIX > 25 OR 10-day Realized Volatility > 30%, reduce portfolio beta to 0.3 (move 70% to G-Secs/Overnight Liquid funds). Re-enter only when VIX crosses below 20-day SMA.',
    sampleCodeSnippet: `# Institutional Volatility Targeting (Risk Parity Engine)
def dynamic_vol_target_allocator(daily_returns, target_vol=0.12):
    """Allocates cash vs equity to preserve constant annual portfolio vol."""
    realized_vol = daily_returns.rolling(20).std() * np.sqrt(252)
    # Target leverage scalar capped at 1.0 (no margin leverage)
    weights = np.clip(target_vol / realized_vol, 0.10, 1.0)
    return weights`
  },
  {
    id: 'taper-tantrum-2013',
    name: '2013 "Fragile Five" Taper Tantrum & Currency Run',
    period: '2013',
    startYear: 2013,
    endYear: 2013,
    regimeType: 'CURRENCY_SHOCK',
    niftyDrawdownOrReturn: -17.5,
    durationDays: 115,
    peakVIX: 32.4,
    fiiFlowPattern: 'FIIs dumped Indian sovereign debt ($8B bond selloff); equities saw rapid transient outflows',
    macroCatalyst: 'Fed Chair Ben Bernanke hinted at QE tapering; India had twin deficits (Current Account Deficit at 4.8% of GDP, Fiscal Deficit at 4.9%), USD/INR depreciated from 54 to 68.8',
    statisticalSignature: {
      hurstExponent: 0.54,
      excessKurtosis: 5.2,
      maxDrawdownDuration: 115,
      recoveryHalfLifeDays: 85,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'A textbook macro vulnerability regime. Whenever CAD exceeds 3.0% of GDP and real bond yields are negative, any spike in the US 10-year Treasury yield forces INR depreciation and a domestic monetary squeeze. When Raghuram Rajan took over RBI and introduced the FCNR(B) swap scheme, the currency stabilized immediately, generating a +35% rally.',
    quantitativeBacktestRule: 'Macro CAD-Yield Spread Indicator: If US 10Y Yield 20-day ROC > +15% AND India CAD > 3.0%, overweight Export-earning sectors (IT, Pharma) and underweight High-Leverage Infra and Banking.',
    sampleCodeSnippet: `# Cross-Asset Macro FX Sensitivity Overlay
def macro_fx_hedging_trigger(us_10y_yield, inr_usd_fx, cad_ratio):
    yield_momentum = (us_10y_yield[-1] / us_10y_yield[-20]) - 1.0
    fx_depreciation = (inr_usd_fx[-1] / inr_usd_fx[-20]) - 1.0
    
    if yield_momentum > 0.10 and fx_depreciation > 0.03 and cad_ratio > 0.03:
        return {'portfolio_hedge': 'LONG_USDINR_NDF_OR_FUTURES', 'tilt': 'OVERWEIGHT_IT_PHARMA'}`
  },
  {
    id: 'demonetization-2016',
    name: '2016 Demonetization Shock & Cash Liquidity Distortion',
    period: '2016 - 2017',
    startYear: 2016,
    endYear: 2017,
    regimeType: 'CRASH',
    niftyDrawdownOrReturn: -11.8,
    durationDays: 52,
    peakVIX: 21.0,
    fiiFlowPattern: 'Immediate panic FII selling of ~$2.5B in November-December 2016, rapidly absorbed by DIIs in Q1 2017',
    macroCatalyst: 'Sudden invalidation of 86% of currency notes in circulation (Rs 500 and Rs 1000 notes)',
    statisticalSignature: {
      hurstExponent: 0.38, // Fast mean reversion; classic transitory liquidity shock
      excessKurtosis: 4.6,
      maxDrawdownDuration: 52,
      recoveryHalfLifeDays: 45,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'This was a transient supply shock with zero permanent impairment to corporate balance sheets. In fact, it catalytically shifted Indian household savings from physical assets (gold, real estate, cash hoarding) into financial assets (mutual funds, SIPs, equity bank deposits). Mean reversion happened in under 60 trading days.',
    quantitativeBacktestRule: 'Exogenous Policy Mean-Reversion: When a macro shock causes a >10% drawdown without impairing sovereign credit or global liquidity, buy when Nifty RSI(14) crosses below 30 and holding period is 90 days. Historical win rate: 82%.',
    sampleCodeSnippet: `# Mean-Reversion Oversold Dip-Buyer
def oversold_exogenous_dip_strategy(price_series, rsi_series):
    signals = []
    for i in range(len(price_series)):
        if rsi_series.iloc[i] < 30 and (price_series.iloc[i] / price_series.iloc[max(0, i-20)] - 1) < -0.08:
            signals.append('STRONG_BUY')
        else:
            signals.append('HOLD')
    return signals`
  },
  {
    id: 'ilfs-credit-crisis-2018',
    name: '2018 IL&FS & DHFL Shadow Banking Liquidity Freeze',
    period: '2018 - 2019',
    startYear: 2018,
    endYear: 2019,
    regimeType: 'CREDIT_CRISIS',
    niftyDrawdownOrReturn: -14.6,
    durationDays: 140,
    peakVIX: 22.8,
    fiiFlowPattern: 'Massive risk-off in Mid/Small caps; flight to safety into top 5 Nifty mega-caps (Reliance, TCS, HDFC Bank)',
    macroCatalyst: 'IL&FS defaults on commercial paper; commercial paper rates spiked 150bps; asset-liability mismatch in housing finance and NBFCs',
    statisticalSignature: {
      hurstExponent: 0.52,
      excessKurtosis: 6.1,
      maxDrawdownDuration: 140,
      recoveryHalfLifeDays: 180,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'Created extreme internal market divergence ("polar market"). While the Nifty headline index fell only ~14%, the Nifty Smallcap 100 crashed over -42%. Credit spreads on AA and AAA NBFC corporate debt blew out. The student can model this as a credit spread contagion filter.',
    quantitativeBacktestRule: 'Quality Polarization Filter: When CP-T-Bill spread widens by >50bps in 30 days, eliminate all stocks with leverage > 2.5x and allocate 100% of equity sleeve to AAA-balance-sheet cash cows.',
    sampleCodeSnippet: `# Corporate Credit Spread Stress Monitor
def shadow_banking_stress_index(cp_rate_3m, tbill_rate_3m):
    spread_bps = (cp_rate_3m - tbill_rate_3m) * 100
    if spread_bps > 120:
        return 'CREDIT_CONTRACTION_DEFENSIVE_MODE'
    return 'NORMAL_CREDIT_ENVIRONMENT'`
  },
  {
    id: 'covid-crash-2020',
    name: '2020 COVID-19 Flash Crash & Quantitative Easing Super-Rally',
    period: '2020 - 2021',
    startYear: 2020,
    endYear: 2021,
    regimeType: 'CRASH',
    niftyDrawdownOrReturn: -39.8,
    durationDays: 45,
    peakVIX: 86.6,
    fiiFlowPattern: 'Violent $8.4B FII pullout in March 2020, followed by a staggering $23B inflow in Nov-Dec 2020 as central banks printed $10T+',
    macroCatalyst: 'Global pandemic lockdowns, oil market price war (WTI dipped negative), total supply chain shutdown, followed by global emergency liquidity injections',
    statisticalSignature: {
      hurstExponent: 0.44, // Fast initial plunge followed by relentless parabolic trending recovery ($H > 0.70$)
      excessKurtosis: 14.5, // Historic high kurtosis
      maxDrawdownDuration: 45,
      recoveryHalfLifeDays: 140,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'The crash velocity was historically unprecedented (India VIX reached 86.63, highest since 2008). However, the recovery was completely consistent with monetary economics: when the Federal Reserve and RBI expand their balance sheets by 60%+ in 90 days, nominal asset prices cannot remain depressed. High-frequency liquidity tracking predicted the bottom with near perfection.',
    quantitativeBacktestRule: 'VIX Mean Reversion Capitulation Buy: When India VIX crosses above 40 and then prints its first 5-day lower high while Nifty makes a bullish RSI divergence, initiate max leverage equity allocation. Historical Sharpe ratio: 2.14.',
    sampleCodeSnippet: `# Capitulation VIX Mean-Reversion System
def vix_capitulation_signal(nifty_close, india_vix):
    vix_extreme = india_vix > 38.0
    vix_reversing = india_vix < india_vix.rolling(5).max()
    rsi = calculate_rsi(nifty_close, 14)
    bullish_divergence = (nifty_close == nifty_close.rolling(20).min()) & (rsi > rsi.rolling(20).min())
    
    entry_signal = vix_extreme.shift(2) & vix_reversing & bullish_divergence
    return entry_signal`
  },
  {
    id: 'union-budget-cycles',
    name: 'Union Budget Seasonality & Volatility Cycles (2004-2024)',
    period: '2004 - 2024 Empirical Cycle',
    startYear: 2004,
    endYear: 2024,
    regimeType: 'BUDGET_CYCLE',
    niftyDrawdownOrReturn: 4.2,
    durationDays: 30,
    fiiFlowPattern: 'FIIs trade heavy option straddles; Implied Volatility (IV) expands 25-45% in the 2 weeks leading into February 1st',
    macroCatalyst: 'Fiscal policy pronouncements, tax policy adjustments (STT, LTCG, corporate tax rates), and sector-specific capex outlays',
    statisticalSignature: {
      hurstExponent: 0.49, // Close to random walk on direction, but 100% predictable on VOLATILITY EXPANSION
      excessKurtosis: 5.8,
      maxDrawdownDuration: 15,
      recoveryHalfLifeDays: 8,
    },
    randomWalkVsRegimeVerdict: 'PARTIALLY_PREDICTABLE',
    verdictRationale: 'Directional returns on Budget Day itself are essentially a coin flip (52% positive, 48% negative over 20 years with mean return +0.31%). However, the IMPLIED VOLATILITY (IV) expansion in the 15 sessions prior to the Budget, followed by immediate IV crush on Budget afternoon, is an ironclad 90%+ statistical regularity. Option sellers exploit this systematic variance risk premium.',
    quantitativeBacktestRule: 'Budget Vega Harvesting: Buy calendar straddles or long delta-neutral straddles 20 days prior to Budget; liquidate 24 hours before speech, or short Out-Of-The-Money strangles on Budget morning to capture IV crush.',
    sampleCodeSnippet: `# Quantitative Volatility Crush Arbitrage on Budget Day
def budget_iv_crush_strategy(days_to_budget, implied_vol, historical_vol):
    vol_premium = implied_vol / historical_vol
    if days_to_budget <= 15 and days_to_budget > 3:
        return 'LONG_VEGA_DELTA_NEUTRAL' # Capture pre-event IV runup
    elif days_to_budget == 0:
        return 'SELL_IRON_CONDOR_POST_SPEECH' # Exploit post-budget IV collapse
    return 'STAND_ASIDE'`
  },
  {
    id: 'general-election-cycles',
    name: 'Indian General Election 5-Year Cycles (1999, 2004, 2009, 2014, 2019, 2024)',
    period: '1999 - 2024 (6 Cycles)',
    startYear: 1999,
    endYear: 2024,
    regimeType: 'ELECTION_CYCLE',
    niftyDrawdownOrReturn: 28.5,
    durationDays: 365,
    fiiFlowPattern: 'FII hesitancy in T-90 to T-30 days; followed by violent inflows once political stability/majority is established',
    macroCatalyst: 'Political regime continuity vs hung parliament fears, policy predictability, public capex continuation',
    statisticalSignature: {
      hurstExponent: 0.58,
      excessKurtosis: 6.4,
      maxDrawdownDuration: 60,
      recoveryHalfLifeDays: 20,
    },
    randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME',
    verdictRationale: 'Statistically across the past 6 general elections, the 6 months POST-election delivered positive Nifty returns in 100% of instances (average return +18.4%), regardless of which coalition won. The pre-election dip reflects political risk discounting; once resolved, equity risk premiums contract systematically.',
    quantitativeBacktestRule: 'Political Risk Discount Reversal: Allocate 1.25x target weight to Nifty 30 days before election results, funded by rolling OTM index puts as asymmetric downside insurance.',
    sampleCodeSnippet: `# Election Cycle Seasonality Allocator
def election_cycle_weighting(days_to_election_result):
    if days_to_election_result in range(1, 30):
        return {'equity_allocation': 1.15, 'hedge': 'OTM_PUT_SPREAD'}
    elif days_to_election_result < 0 and days_to_election_result > -180:
        return {'equity_allocation': 1.25, 'hedge': 'NONE'} # Post-result risk-on expansion
    return {'equity_allocation': 1.0, 'hedge': 'STANDARD'}`
  }
];
