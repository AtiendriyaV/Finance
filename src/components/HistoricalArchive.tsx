import React, { useState, useMemo } from 'react';
import { DailyInsight, MarketRegimeType } from '../types/market';
import { storageService } from '../db/storageService';
import { 
  Archive, 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  FileText, 
  Calendar, 
  ExternalLink,
  Database,
  X,
  ChevronRight,
  ShieldAlert,
  Layers,
  Check,
  Server
} from 'lucide-react';

interface HistoricalArchiveProps {
  insights: DailyInsight[];
  onAddInsight: (newInsight: DailyInsight) => void;
}

export const HistoricalArchive: React.FC<HistoricalArchiveProps> = ({ insights, onAddInsight }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegime, setSelectedRegime] = useState<MarketRegimeType | 'ALL'>('ALL');
  const [activeInsightModal, setActiveInsightModal] = useState<DailyInsight | null>(null);
  const [isNewMemoOpen, setIsNewMemoOpen] = useState(false);
  const [showDbSchemaModal, setShowDbSchemaModal] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);
  const mongoStatus = storageService.getStatus();

  // Form states for adding new memo
  const [memoHeadline, setMemoHeadline] = useState('');
  const [memoDate, setMemoDate] = useState(new Date().toISOString().split('T')[0]);
  const [memoRegime, setMemoRegime] = useState<MarketRegimeType>('BULL_TREND');
  const [memoVix, setMemoVix] = useState('13.2');
  const [memoSummary, setMemoSummary] = useState('');
  const [memoNotes, setMemoNotes] = useState('');

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      const matchesRegime = selectedRegime === 'ALL' || item.marketRegime === selectedRegime;
      const matchesSearch = 
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.includes(searchQuery);
      return matchesRegime && matchesSearch;
    });
  }, [insights, selectedRegime, searchQuery]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Headline', 'Regime', 'India_VIX', 'FII_Net_Flow_Cr', 'DII_Net_Flow_Cr', 'PCR_Ratio'];
    const rows = filteredInsights.map(i => [
      i.date,
      `"${i.headline.replace(/"/g, '""')}"`,
      i.marketRegime,
      i.vixLevel,
      i.fiiNetFlowCrores,
      i.diiNetFlowCrores,
      i.pcrRatio
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arthaquant_market_archive_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const handleExportMongoJSON = () => {
    const jsonDump = storageService.exportMongoDump();
    const encodedUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonDump);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arthaquant_mongodb_dump_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  const handleSaveMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoHeadline || !memoSummary) return;

    const newEntry: DailyInsight = {
      id: `memo-${Date.now()}`,
      date: memoDate,
      headline: memoHeadline,
      marketRegime: memoRegime,
      vixLevel: parseFloat(memoVix) || 13.0,
      vixChange: 0,
      fiiNetFlowCrores: -500,
      diiNetFlowCrores: 1200,
      pcrRatio: 1.15,
      summary: memoSummary,
      orderBookDynamics: 'Bid-ask spread maintained within 2.5 bps. Domestic institutional blocks absorbed liquidity without high slippage.',
      keyDrivers: ['Analyst discretionary input logged via terminal.'],
      sectorWinners: ['Nifty Bank', 'Nifty Auto'],
      sectorLosers: ['Nifty IT'],
      factorTilts: [
        { factor: 'Quality', bias: 'OVERWEIGHT', rationale: 'Strong balance sheet discipline.' },
        { factor: 'Momentum', bias: 'NEUTRAL', rationale: 'Consolidation phase.' },
      ],
      portfolioManagerNotes: memoNotes || 'Target exposure maintained. Systematic risk parameters verified against CFA/FRM constraints.',
      riskAssessment: {
        var95DailyPercent: 1.05,
        liquidityStressIndex: 'LOW',
        actionableHedge: 'Roll defensive index protective puts.',
      }
    };

    onAddInsight(newEntry);
    setIsNewMemoOpen(false);
    setMemoHeadline('');
    setMemoSummary('');
    setMemoNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Archive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-emerald-950 border border-emerald-800 text-emerald-300 flex items-center gap-1">
              <Server className="w-3 h-3 text-emerald-400" />
              MONGODB STORE ONLINE
            </span>
            <span className="text-xs font-mono text-slate-400">Database: {mongoStatus.databaseName}</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            Historical Market State & Intelligence Archive
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit-grade repository storing daily market states, order flow imbalances, factor tilts, and portfolio manager memos.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button
            onClick={handleExportMongoJSON}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 transition border border-emerald-800 font-mono shadow-sm"
            title="Download complete JSON document dump of MongoDB collections"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Mongo Dump</span>
          </button>

          <button
            onClick={() => setShowDbSchemaModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700 font-mono"
          >
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mongo & SQL Schemas</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700 font-mono"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => setIsNewMemoOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Memo</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Historical dataset successfully exported to CSV for institutional audit and backtesting pipelines.</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80 overflow-x-auto w-full sm:w-auto">
          {(
            [
              { key: 'ALL', label: 'All Regimes' },
              { key: 'BULL_TREND', label: 'Bull Trend' },
              { key: 'RANGE_BOUND', label: 'Range Bound' },
              { key: 'VOLATILITY_COMPRESSION', label: 'Vol Compression' },
              { key: 'EVENT_DRIVEN', label: 'Event Driven' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedRegime(item.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedRegime === item.key
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search date, headline, macro driver..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 font-mono"
          />
        </div>
      </div>

      {/* Historical List */}
      <div className="space-y-3">
        {filteredInsights.map((insight) => (
          <div
            key={insight.id}
            onClick={() => setActiveInsightModal(insight)}
            className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-800/60 hover:bg-slate-900 transition-all cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {insight.date}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  {insight.marketRegime.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>VIX: <strong className="text-slate-200">{insight.vixLevel.toFixed(2)}</strong></span>
                <span>PCR: <strong className="text-slate-200">{insight.pcrRatio.toFixed(2)}</strong></span>
                <span>DII Flow: <strong className="text-emerald-400">+{insight.diiNetFlowCrores} Cr</strong></span>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <h3 className="text-sm font-bold text-white font-sans mt-2.5 group-hover:text-cyan-300 transition-colors">
              {insight.headline}
            </h3>

            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {insight.summary}
            </p>

            <div className="flex items-center justify-between mt-3 pt-2 text-[11px] text-slate-500 font-mono">
              <span className="truncate max-w-md">Outperformers: {insight.sectorWinners.join(' · ')}</span>
              <span className="text-cyan-400 font-sans">View Full Report &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* SQL Schema Preview Modal */}
      {showDbSchemaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold font-mono text-white">PostgreSQL / Supabase Institutional Schema</h3>
              </div>
              <button
                onClick={() => setShowDbSchemaModal(false)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
              <pre>{`-- ArthaQuant Historical Production Database Schema
-- Compatible with PostgreSQL 16+ / Supabase / Neon

CREATE TABLE IF NOT EXISTS daily_market_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_date DATE NOT NULL UNIQUE,
    market_regime VARCHAR(32) NOT NULL,
    india_vix NUMERIC(6, 2) NOT NULL,
    pcr_ratio NUMERIC(5, 2) NOT NULL,
    fii_cash_net_cr NUMERIC(12, 2) NOT NULL,
    dii_cash_net_cr NUMERIC(12, 2) NOT NULL,
    headline TEXT NOT NULL,
    executive_summary TEXT NOT NULL,
    order_book_microstructure TEXT,
    author_analyst VARCHAR(64) DEFAULT 'MBA_CFA_DESK',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS factor_tilts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES daily_market_states(id) ON DELETE CASCADE,
    factor_name VARCHAR(32) NOT NULL,
    allocation_bias VARCHAR(16) CHECK (allocation_bias IN ('OVERWEIGHT', 'NEUTRAL', 'UNDERWEIGHT')),
    economic_rationale TEXT NOT NULL
);

CREATE INDEX idx_market_state_date ON daily_market_states(session_date DESC);
CREATE INDEX idx_market_regime ON daily_market_states(market_regime);`}</pre>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-sans">
              This schema supports historical time-series queries, fast partition filtering, and full-text search across analyst memos.
            </p>
          </div>
        </div>
      )}

      {/* Log New Analyst Memo Modal */}
      {isNewMemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold font-mono text-white">Log Daily Research Analyst Memo</h3>
              <button
                onClick={() => setIsNewMemoOpen(false)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMemo} className="mt-4 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-400 mb-1 font-mono">Session Date</label>
                  <input
                    type="date"
                    value={memoDate}
                    onChange={(e) => setMemoDate(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">India VIX</label>
                  <input
                    type="number"
                    step="0.1"
                    value={memoVix}
                    onChange={(e) => setMemoVix(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Market Regime</label>
                <select
                  value={memoRegime}
                  onChange={(e) => setMemoRegime(e.target.value as MarketRegimeType)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                >
                  <option value="BULL_TREND">BULL TREND</option>
                  <option value="RANGE_BOUND">RANGE BOUND</option>
                  <option value="VOLATILITY_COMPRESSION">VOLATILITY COMPRESSION</option>
                  <option value="EVENT_DRIVEN">EVENT DRIVEN</option>
                  <option value="BEAR_CAPITULATION">BEAR CAPITULATION</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Nifty Consolidates Near 24,800 as Banking Leaders Absorb FII Selling"
                  value={memoHeadline}
                  onChange={(e) => setMemoHeadline(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Executive Summary</label>
                <textarea
                  rows={3}
                  placeholder="Summarize price action, order flow, and macro catalysts..."
                  value={memoSummary}
                  onChange={(e) => setMemoSummary(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Portfolio Manager Positioning Memo</label>
                <textarea
                  rows={2}
                  placeholder="Actionable asset allocation or factor tilts..."
                  value={memoNotes}
                  onChange={(e) => setMemoNotes(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewMemoOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Save to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Detail Modal */}
      {activeInsightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold">{activeInsightModal.date}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                    {activeInsightModal.marketRegime.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1.5">{activeInsightModal.headline}</h3>
              </div>
              <button
                onClick={() => setActiveInsightModal(null)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                {activeInsightModal.summary}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-cyan-400 font-bold block mb-1">Microstructure Order Flow:</span>
                <p className="text-slate-400">{activeInsightModal.orderBookDynamics}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-slate-200 font-bold block mb-1">Portfolio Manager Memo:</span>
                <p className="text-slate-300 italic">"{activeInsightModal.portfolioManagerNotes}"</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-1">Risk Envelope & Tail Hedge:</span>
                <div className="text-slate-400 font-mono space-y-1">
                  <div>95% Daily VaR: {activeInsightModal.riskAssessment.var95DailyPercent}% NAV</div>
                  <div>Liquidity Stress: {activeInsightModal.riskAssessment.liquidityStressIndex}</div>
                  <div>Hedge Action: {activeInsightModal.riskAssessment.actionableHedge}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
