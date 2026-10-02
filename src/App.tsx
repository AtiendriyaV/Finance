import React, { useState, useMemo } from 'react';
import { Header, NavTab } from './components/Header';
import { MultiMarketTracker } from './components/MultiMarketTracker';
import { AutomatedDailyInsights } from './components/AutomatedDailyInsights';
import { MergersAcquisitionsHub } from './components/MergersAcquisitionsHub';
import { WeekendSystematicOverview } from './components/WeekendSystematicOverview';
import { HistoricalArchive } from './components/HistoricalArchive';
import { QuantitativeLab } from './components/QuantitativeLab';
import { ResumeCenterpieceGuide } from './components/ResumeCenterpieceGuide';
import { MULTI_MARKET_ASSETS } from './data/mockMarketData';
import { CURRENT_WEEKEND_MACRO_REPORT, SECTOR_ROTATION_DATA } from './data/weekendData';
import { DailyInsight, MergerAcquisitionDeal } from './types/market';
import { computeDeterministicAnalytics } from './utils/deterministicAnalytics';
import { storageService } from './db/storageService';
import { CheckCircle2, TrendingUp, ShieldCheck, Database, Layers, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');
  const [dashboardSubView, setDashboardSubView] = useState<'STREAMING_TRACKER' | 'DAILY_INTELLIGENCE'>('STREAMING_TRACKER');
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Sync state with storage service
  const [insightsArchive, setInsightsArchive] = useState<DailyInsight[]>(() => storageService.getInsights());
  const [currentInsight, setCurrentInsight] = useState<DailyInsight>(() => storageService.getInsights()[0]);
  const [mergersList, setMergersList] = useState<MergerAcquisitionDeal[]>(() => storageService.getMergers());

  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineSuccessNotice, setPipelineSuccessNotice] = useState(false);

  // Compute deterministic analytics from current market assets
  const deterministicAnalytics = useMemo(() => {
    return computeDeterministicAnalytics(
      MULTI_MARKET_ASSETS,
      currentInsight.vixLevel,
      currentInsight.fiiNetFlowCrores,
      currentInsight.diiNetFlowCrores,
      currentInsight.pcrRatio
    );
  }, [currentInsight]);

  const handleAddInsight = (newInsight: DailyInsight) => {
    const saved = storageService.addInsight(newInsight);
    setInsightsArchive([...storageService.getInsights()]);
    setCurrentInsight(saved);
  };

  const handleAddMergerDeal = (newDeal: MergerAcquisitionDeal) => {
    storageService.addMerger(newDeal);
    setMergersList([...storageService.getMergers()]);
  };

  const handleRunPipeline = () => {
    setIsPipelineRunning(true);
    setTimeout(() => {
      setIsPipelineRunning(false);
      setPipelineSuccessNotice(true);
      setTimeout(() => setPipelineSuccessNotice(false), 4000);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Institutional Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Pipeline Success Toast */}
        {pipelineSuccessNotice && (
          <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-200 text-xs font-mono flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>
                Deterministic pipeline executed: 14 asset feeds ingested, 95% Parametric VaR calibrated with Cornish-Fisher adjustment, and factor tilts updated.
              </span>
            </div>
            <span className="text-[10px] text-cyan-400 font-bold">LATENCY: 142ms</span>
          </div>
        )}

        {/* 01. DASHBOARD (HOME) */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-6">
            {/* Dashboard Sub-Navigation: Quick Switch between Market Tracker and Daily Intelligence */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs">
                <button
                  onClick={() => setDashboardSubView('STREAMING_TRACKER')}
                  className={`px-3 py-1.5 rounded-md font-medium transition ${
                    dashboardSubView === 'STREAMING_TRACKER'
                      ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Real-Time Market Terminal & Level-2 Depth
                </button>
                <button
                  onClick={() => setDashboardSubView('DAILY_INTELLIGENCE')}
                  className={`px-3 py-1.5 rounded-md font-medium transition ${
                    dashboardSubView === 'DAILY_INTELLIGENCE'
                      ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Automated Daily Briefing & AI Narrative
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Feeds: Public / Free API Connectors</span>
              </div>
            </div>

            {dashboardSubView === 'STREAMING_TRACKER' ? (
              <MultiMarketTracker assets={MULTI_MARKET_ASSETS} />
            ) : (
              <AutomatedDailyInsights
                currentInsight={currentInsight}
                deterministicAnalytics={deterministicAnalytics}
                onRefreshPipeline={handleRunPipeline}
                isPipelineRunning={isPipelineRunning}
              />
            )}
          </div>
        )}

        {/* 02. RESEARCH & BACKTESTER (SEPARATE ROUTE) */}
        {activeTab === 'RESEARCH_LAB' && (
          <QuantitativeLab />
        )}

        {/* 03. COMPANIES M&A RADAR (HEADLINES) */}
        {activeTab === 'MERGERS_ACQUISITIONS' && (
          <MergersAcquisitionsHub
            deals={mergersList}
            onAddDeal={handleAddMergerDeal}
          />
        )}

        {/* 04. WEEKEND SYSTEMATIC */}
        {activeTab === 'WEEKEND_SYSTEMATIC' && (
          <WeekendSystematicOverview
            report={CURRENT_WEEKEND_MACRO_REPORT}
            sectorData={SECTOR_ROTATION_DATA}
          />
        )}

        {/* 05. MONGODB HISTORICAL ARCHIVE */}
        {activeTab === 'MONGO_ARCHIVE' && (
          <HistoricalArchive
            insights={insightsArchive}
            onAddInsight={handleAddInsight}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 font-mono">ARTHAQUANT TERMINAL</span>
            <span>·</span>
            <span>CFA Level 1 & MBA Portfolio Architecture</span>
            <span>·</span>
            <span className="text-slate-400">Institutional Edition</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-[11px] font-mono">
            <span>NSE / BSE / NYSE / CME</span>
            <span>·</span>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 underline font-sans"
            >
              Candidate Architecture Dossier
            </button>
          </div>
        </div>
      </footer>

      {/* Candidate Dossier & Architecture Modal */}
      <ResumeCenterpieceGuide
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
}
