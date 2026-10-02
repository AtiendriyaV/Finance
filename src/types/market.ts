export type MarketRegion = 'INDIA' | 'GLOBAL' | 'COMMODITIES' | 'RATES_FX';

export interface MarketAsset {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE' | 'NYSE' | 'NASDAQ' | 'LSE' | 'TSE' | 'MCX' | 'CME' | 'RBI';
  category: MarketRegion;
  lastPrice: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  volumeRatio20D: number; // Volume vs 20-day average
  peRatio?: number;
  pbRatio?: number;
  dividendYield?: number;
  high52W: number;
  low52W: number;
  rsi14: number;
  atrPercent: number;
  currency: string;
  orderBook?: {
    bidQty: number;
    askQty: number;
    bidAskSpreadBps: number;
    depthImbalanceRatio: number; // >1 = bid heavy, <1 = ask heavy
    topBids: { price: number; qty: number }[];
    topAsks: { price: number; qty: number }[];
  };
  sparkline: number[];
}

export type MarketRegimeType = 
  | 'BULL_TREND'
  | 'BEAR_CAPITULATION'
  | 'VOLATILITY_COMPRESSION'
  | 'RISK_OFF_LIQUIDATION'
  | 'RANGE_BOUND'
  | 'EVENT_DRIVEN';

export interface DeterministicAnalytics {
  oneDayReturn: number;
  fiveDayReturn: number;
  oneMonthReturn: number;
  annualizedVolatility20D: number;
  maxDrawdown20D: number;
  parametricVaR95: number; // 95% Parametric VaR %
  historicalVaR95: number;  // 95% Historical VaR %
  currentRegime: MarketRegimeType;
  fiiNetCrores: number;
  diiNetCrores: number;
  pcrRatio: number;
  vixLevel: number;
  vixZScore: number;
  advanceDeclineRatio: number;
}

export interface LLMNarrative {
  headline: string;
  executiveSummary: string;
  institutionalTone: 'GOLDMAN_EQUITY_RESEARCH' | 'MORGAN_STANLEY_MACRO' | 'HEDGE_FUND_RISK_MEMO';
  modelUsed: string;
  generatedAt: string;
  tacticalAction: string;
  keyRisks: string[];
}

export interface DailyInsight {
  id: string;
  date: string;
  headline: string;
  marketRegime: MarketRegimeType;
  vixLevel: number;
  vixChange: number;
  fiiNetFlowCrores: number;
  diiNetFlowCrores: number;
  pcrRatio: number; // Put Call Ratio
  summary: string;
  deterministicAnalytics?: DeterministicAnalytics;
  llmNarrative?: LLMNarrative;
  orderBookDynamics: string;
  keyDrivers: string[];
  sectorWinners: string[];
  sectorLosers: string[];
  factorTilts: {
    factor: 'Quality' | 'Momentum' | 'Low Volatility' | 'Value' | 'High Beta' | 'Small Cap';
    bias: 'OVERWEIGHT' | 'NEUTRAL' | 'UNDERWEIGHT';
    rationale: string;
  }[];
  portfolioManagerNotes: string;
  riskAssessment: {
    var95DailyPercent: number;
    liquidityStressIndex: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
    actionableHedge: string;
  };
}

export type DealType = 
  | 'ACQUISITION'
  | 'MERGER'
  | 'OPEN_OFFER'
  | 'STRATEGIC_STAKE'
  | 'JOINT_VENTURE';

export type DealStatus = 
  | 'ANNOUNCED'
  | 'IN_DUE_DILIGENCE'
  | 'REGULATORY_REVIEW_CCI'
  | 'NCLT_APPROVAL_PENDING'
  | 'COMPLETED'
  | 'TERMINATED';

export type DealSector = 
  | 'RETAIL'
  | 'TECH_MEDIA'
  | 'INDUSTRIALS'
  | 'FINANCIALS'
  | 'ENERGY_INFRA'
  | 'HEALTHCARE';

export interface MergerAcquisitionDeal {
  id: string;
  headline: string; // The exact headline
  targetCompany: string;
  acquirerCompany: string;
  dealValueInrCrores: number;
  dealValueUsdMillions?: number;
  announcementDate: string;
  closingDate?: string;
  dealType: DealType;
  paymentMethod: 'ALL_CASH' | 'STOCK_SWAP' | 'CASH_AND_STOCK' | 'DEBT_ASSUMPTION';
  status: DealStatus;
  sector: DealSector;
  valuationMultiple: string; // e.g., '14.2x EV/EBITDA' or '2.4x P/S'
  strategicRationale: string;
  regulatoryNotes: string; // CCI, NCLT, RBI clearances
  equityImpact: string; // EPS accretion/dilution, sector consolidation effect
  sourceHeadlineOutlet?: string; // e.g., 'The Economic Times', 'Mint', 'Bloomberg'
}

export interface HistoricalEventAnalysis {
  id: string;
  name: string;
  period: string;
  startYear: number;
  endYear: number;
  regimeType: 'CRASH' | 'BULL_RUN' | 'BUDGET_CYCLE' | 'ELECTION_CYCLE' | 'CREDIT_CRISIS' | 'CURRENCY_SHOCK';
  niftyDrawdownOrReturn: number; // percent
  durationDays: number;
  peakVIX?: number;
  fiiFlowPattern: string;
  macroCatalyst: string;
  statisticalSignature: {
    hurstExponent: number; // <0.5 mean reverting, =0.5 random walk, >0.5 trending
    excessKurtosis: number;
    maxDrawdownDuration: number;
    recoveryHalfLifeDays: number;
  };
  randomWalkVsRegimeVerdict: 'PREDICTABLE_REGIME' | 'PARTIALLY_PREDICTABLE' | 'STOCHASTIC_RANDOM_WALK';
  verdictRationale: string;
  quantitativeBacktestRule: string;
  sampleCodeSnippet: string;
}

export interface SectorRotationNode {
  sector: string;
  benchmark: string;
  rsRatio: number;
  rsMomentum: number;
  quadrant: 'LEADING' | 'WEAKENING' | 'LAGGING' | 'IMPROVING';
  oneWeekReturn: number;
  oneMonthReturn: number;
  keyHoldings: string;
}

export interface WeekendMacroReport {
  weekEndingDate: string;
  title: string;
  crossAssetCorrelations: {
    assetPair: string;
    correlation1M: number;
    correlation1Y: number;
    zScore: number;
    status: 'NORMAL' | 'DECOUPLING' | 'ANOMALOUS_BREAKDOWN';
    commentary: string;
  }[];
  breadthMetrics: {
    pctAbove200EMA: number;
    pctAbove50EMA: number;
    net52WHighLows: number;
    advanceDeclineRatio: number;
    mcclellanOscillator: number;
  };
  structuralShifts: string[];
  cyclicalAnomalies: string[];
  weeklyMacroVerdict: string;
  recommendedPositioning: string;
}

export interface BacktestConfig {
  strategyId: string;
  initialCapital: number;
  holdingPeriodDays: number;
  stopLossPercent: number;
  takeProfitPercent: number;
  vixThreshold?: number;
  fiiThresholdCrores?: number;
}

export interface BacktestResult {
  totalReturnPercent: number;
  benchmarkReturnPercent: number;
  cagr: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  winRate: number;
  tradesCount: number;
  profitFactor: number;
  calmarRatio: number;
  equityCurve: { date: string; portfolio: number; benchmark: number }[];
}

export interface MongoStorageStatus {
  isConnected: boolean;
  databaseName: string;
  collections: {
    insightsCount: number;
    mergersCount: number;
    backtestsCount: number;
  };
  lastSyncTimestamp: string;
  storageEngine: 'MONGODB_INSTANCE' | 'LOCAL_INDEXED_STORAGE';
}
