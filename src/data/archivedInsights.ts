import { DailyInsight } from '../types/market';

export const ARCHIVED_DAILY_INSIGHTS: DailyInsight[] = [
  {
    id: 'insight-2026-10-01',
    date: '2026-10-01',
    headline: 'Nifty Defends 24,800 Pivot as DII SIP Flows Buffer Modest FII Cash Outflows',
    marketRegime: 'BULL_TREND',
    vixLevel: 12.85,
    vixChange: -3.16,
    fiiNetFlowCrores: -482.50,
    diiNetFlowCrores: 1945.80,
    pcrRatio: 1.18,
    summary: 'Dalal Street registered firm gains in afternoon trade, powered by private banks and auto majors. India VIX compressed down towards 12.85, indicating pervasive complacency among options writers. Order flow metrics show heavy call writing at the 25,000 psychological ceiling, while 24,700 PE accumulated significant open interest.',
    orderBookDynamics: 'Depth imbalance stood at 1.21x (buy bids dominated the level-2 order book). Iceberg orders from domestic institutional asset managers absorbed block offerings in HDFC Bank and Reliance. VWAP slippage on execution was contained under 4.2 bps across benchmark constituents.',
    keyDrivers: [
      'Brent crude softening below $75/bbl alleviates imported inflation and fiscal subsidy pressures.',
      'Domestic SIP monthly run-rate sustained at record high (>Rs 24,000 Cr), acting as a non-correlated domestic liquidity floor.',
      'RBI monetary policy committee expected to maintain status quo on repo rates while softening stance to neutral.',
      'US 10-year Treasury yield trading steady at 3.98%, reducing immediate capital repatriation pressure.'
    ],
    sectorWinners: ['Nifty Auto (+1.97%)', 'Nifty Bank (+0.74%)', 'Nifty Realty (+1.45%)'],
    sectorLosers: ['Nifty IT (-0.50%)', 'Nifty FMCG (-0.15%)'],
    factorTilts: [
      { factor: 'Quality', bias: 'OVERWEIGHT', rationale: 'Strong balance sheet discipline and ROE expansion amid high interest rates.' },
      { factor: 'Momentum', bias: 'OVERWEIGHT', rationale: 'Midcap leaders breaking out of 6-week consolidation zones with volume confirmation.' },
      { factor: 'Low Volatility', bias: 'NEUTRAL', rationale: 'Risk-on regime reduces necessity for defensive cash drag.' },
      { factor: 'Value', bias: 'UNDERWEIGHT', rationale: 'Deep value cyclicals face slowing European industrial export demand.' },
    ],
    portfolioManagerNotes: 'Maintained 85% equity exposure with 15% ultra-short duration G-Secs. Added exposure to commercial EV ecosystem and private lenders with improving Net Interest Margins (NIM). Put protection rolled up to 24,600 strike for weekend gamma risk coverage.',
    riskAssessment: {
      var95DailyPercent: 0.94,
      liquidityStressIndex: 'LOW',
      actionableHedge: 'Maintain 24,600 / 24,200 bear put spread at 1:2 ratio costing 18 bps of portfolio NAV.',
    }
  },
  {
    id: 'insight-2026-09-30',
    date: '2026-09-30',
    headline: 'Quarter-End NAV Propping Fuels Broad-Based Rally; IT Sector Faces Margin Scrutiny',
    marketRegime: 'RANGE_BOUND',
    vixLevel: 13.27,
    vixChange: 1.45,
    fiiNetFlowCrores: -1120.00,
    diiNetFlowCrores: 2310.40,
    pcrRatio: 1.05,
    summary: 'The final trading session of the quarter saw institutional portfolio rebalancing. While IT bellwethers saw modest profit-taking ahead of Q2 earnings previews, industrials and capital goods maintained institutional accumulation.',
    orderBookDynamics: 'Late-session closing auctions witnessed concentrated liquidity in large-cap index heavyweights. High-frequency market-making algorithms narrowed bid-ask spreads to 1.8 bps on Nifty 50 futures.',
    keyDrivers: [
      'Global funds rebalancing emerging market allocations towards China following fresh PBOC liquidity stimulus.',
      'Indian domestic mutual funds deploying fresh inflows into manufacturing and infrastructure themes.',
      'Currency markets: USD/INR held steady at 83.92, supported by active RBI foreign exchange intervention.'
    ],
    sectorWinners: ['Nifty Metals (+1.62%)', 'Nifty Infra (+1.10%)'],
    sectorLosers: ['Nifty IT (-1.25%)', 'Nifty Media (-0.45%)'],
    factorTilts: [
      { factor: 'Quality', bias: 'OVERWEIGHT', rationale: 'Resilient earnings delivery amid global growth crosscurrents.' },
      { factor: 'High Beta', bias: 'UNDERWEIGHT', rationale: 'Avoid unhedged speculative mid-tier equities ahead of earnings season.' },
      { factor: 'Momentum', bias: 'OVERWEIGHT', rationale: 'Capital goods order books at multi-year highs.' },
    ],
    portfolioManagerNotes: 'Trimmed tactical IT overweight positions into strength. Reallocated capital to domestic capex beneficiaries. Prepared portfolio for Q2 earnings season dispersion.',
    riskAssessment: {
      var95DailyPercent: 1.08,
      liquidityStressIndex: 'LOW',
      actionableHedge: 'Cover short calls on IT leaders prior to tier-1 earnings releases.',
    }
  },
  {
    id: 'insight-2026-09-27',
    date: '2026-09-27',
    headline: 'Pre-Expiry Volatility Compression Sparks Short Covering in Banking Index',
    marketRegime: 'VOLATILITY_COMPRESSION',
    vixLevel: 13.08,
    vixChange: -4.10,
    fiiNetFlowCrores: 340.20,
    diiNetFlowCrores: 1250.00,
    pcrRatio: 1.25,
    summary: 'A classic gamma squeeze unfolded in the final 90 minutes of weekly derivative expiry. Bank Nifty broke through stubborn resistance at 52,000 as option sellers rushed to cover short 52,000 call positions.',
    orderBookDynamics: 'Massive ask-side book thinning above 52,050 triggered rapid slippage upwards. Sweeper orders across banking counters drove total cash market turnover above Rs 98,000 Cr.',
    keyDrivers: [
      'Lower-than-expected US core PCE print solidified expectations of ongoing Fed rate cuts.',
      'Foreign portfolio investors turned net buyers in index futures after 8 consecutive sessions of net shorting.',
      'Crude oil stabilized near $74, curbing inflationary tail risks.'
    ],
    sectorWinners: ['Nifty Bank (+1.85%)', 'Nifty Financial Services (+1.72%)'],
    sectorLosers: ['Nifty Pharma (-0.35%)'],
    factorTilts: [
      { factor: 'Momentum', bias: 'OVERWEIGHT', rationale: 'Breakout above 20-day moving average on expanded volume.' },
      { factor: 'Low Volatility', bias: 'UNDERWEIGHT', rationale: 'Underperforming during rapid cyclical rotation.' },
    ],
    portfolioManagerNotes: 'Captured 280 points on tactical Bank Nifty long futures position. Rebalanced portfolio tracking error against benchmark down to 1.85%.',
    riskAssessment: {
      var95DailyPercent: 1.15,
      liquidityStressIndex: 'MODERATE',
      actionableHedge: 'Hold trailing profit stop on bank futures at 51,750 level.',
    }
  },
  {
    id: 'insight-2026-09-24',
    date: '2026-09-24',
    headline: 'Geopolitical Tensions in Middle East Flare; Safe-Haven Bid Lifts Gold and Defense',
    marketRegime: 'EVENT_DRIVEN',
    vixLevel: 15.60,
    vixChange: 12.50,
    fiiNetFlowCrores: -2410.80,
    diiNetFlowCrores: 2890.10,
    pcrRatio: 0.88,
    summary: 'Risk-off sentiment rippled through global bourses following overnight escalations in the Levant corridor. Brent crude spiked +3.2%, triggering an initial 180-point gap down in Nifty 50 before aggressive DII dip-buying emerged at the 20-day exponential moving average.',
    orderBookDynamics: 'Initial 30 minutes saw bid books hollow out with bid-ask spreads widening to 7.8 bps on large caps. Institutional smart-money limit bids were concentrated at the S1 pivot (24,550), successfully absorbing institutional liquidation.',
    keyDrivers: [
      'Brent crude shock to $78.20/bbl elevating fiscal deficit and transport sector cost burdens.',
      'Gold spot prices at new record highs on MCX, indicating global sovereign and institutional flight to hard assets.',
      'FII selling in high-beta consumer cyclicals offset by structural domestic SIP commitments.'
    ],
    sectorWinners: ['Nifty Defense & Aerospace (+3.40%)', 'MCX Gold (+1.85%)', 'Nifty Oil & Gas (+0.95%)'],
    sectorLosers: ['Nifty Paints (-2.80%)', 'Nifty Aviation (-3.15%)', 'Nifty Auto (-1.10%)'],
    factorTilts: [
      { factor: 'Low Volatility', bias: 'OVERWEIGHT', rationale: 'Capital preservation in high-geopolitical risk environment.' },
      { factor: 'Quality', bias: 'OVERWEIGHT', rationale: 'High pricing power companies can pass on raw material input surges.' },
      { factor: 'High Beta', bias: 'UNDERWEIGHT', rationale: 'Vulnerable to foreign institutional de-risking.' },
    ],
    portfolioManagerNotes: 'Exercised discipline: did not panic-sell into the opening gap down. Added allocation to gold ETF hedges and domestic defense manufacturing order-book winners.',
    riskAssessment: {
      var95DailyPercent: 1.48,
      liquidityStressIndex: 'HIGH',
      actionableHedge: 'Purchased 1-month Nifty 24,400 puts as catastrophe insurance.',
    }
  },
  {
    id: 'insight-2026-09-20',
    date: '2026-09-20',
    headline: 'US Federal Reserve Delivers Dovish Guidance; Emerging Market Carry Trade Accelerates',
    marketRegime: 'BULL_TREND',
    vixLevel: 12.10,
    vixChange: -6.40,
    fiiNetFlowCrores: 3120.40,
    diiNetFlowCrores: 1450.20,
    pcrRatio: 1.34,
    summary: 'Synchronized global rally as Federal Open Market Committee delivered accommodative policy commentary. The US Dollar Index (DXY) slipped below 101, revitalizing foreign capital flows into Indian equities and sovereign debt.',
    orderBookDynamics: 'High institutional participation: foreign custody banks were aggressive price-takers across top 20 index constituents. Average trade size jumped +38% compared to the 30-day moving average.',
    keyDrivers: [
      'DXY dollar weakness driving global emerging market cross-border portfolio reallocation.',
      'India 10Y G-Sec yield rallying towards 6.75% on JP Morgan EM Bond Index foreign inclusion inflows.',
      'Monsoon conclusion reports confirm above-normal rainfall, setting stage for bumper Kharif harvest and rural consumption revival.'
    ],
    sectorWinners: ['Nifty IT (+2.40%)', 'Nifty FMCG (+1.80%)', 'Nifty Bank (+1.25%)'],
    sectorLosers: ['None (Broad-based market advance: Advance-Decline 4:1)'],
    factorTilts: [
      { factor: 'Momentum', bias: 'OVERWEIGHT', rationale: 'Breakout across all major sectoral indices.' },
      { factor: 'Small Cap', bias: 'OVERWEIGHT', rationale: 'Liquidity abundance driving high risk tolerance in quality small caps.' },
    ],
    portfolioManagerNotes: 'Increased portfolio beta to 1.15. Trimmed defensive cash holdings down to 5%. Initiated tactical long positions in rural consumption themes.',
    riskAssessment: {
      var95DailyPercent: 0.88,
      liquidityStressIndex: 'LOW',
      actionableHedge: 'Trailing profit stops tightened across high-beta tactical longs.',
    }
  }
];
