import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { MultiMarketTracker } from './components/MultiMarketTracker';
import { MergersAcquisitionsHub } from './components/MergersAcquisitionsHub';
import { WeekendSystematicOverview } from './components/WeekendSystematicOverview';
import { HistoricalArchive } from './components/HistoricalArchive';
import { QuantitativeLab } from './components/QuantitativeLab';
import { InterviewConceptLab } from './components/InterviewConceptLab';
import { ResumeCenterpieceGuide } from './components/ResumeCenterpieceGuide';
import { MULTI_MARKET_ASSETS } from './data/mockMarketData';
import { CURRENT_WEEKEND_MACRO_REPORT, SECTOR_ROTATION_DATA } from './data/weekendData';
import { DailyInsight, MergerAcquisitionDeal } from './types/market';
import { storageService } from './db/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Sync state with storage service
  const [insightsArchive, setInsightsArchive] = useState<DailyInsight[]>(() => storageService.getInsights());
  const [mergersList, setMergersList] = useState<MergerAcquisitionDeal[]>(() => storageService.getMergers());

  const handleAddInsight = (newInsight: DailyInsight) => {
    storageService.addInsight(newInsight);
    setInsightsArchive([...storageService.getInsights()]);
  };

  const handleAddMergerDeal = (newDeal: MergerAcquisitionDeal) => {
    storageService.addMerger(newDeal);
    setMergersList([...storageService.getMergers()]);
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
        {/* 01. DASHBOARD (HOME) */}
        {activeTab === 'DASHBOARD' && (
          <MultiMarketTracker assets={MULTI_MARKET_ASSETS} />
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

        {/* 06. INTERVIEW INTELLIGENCE & CFA / ER CONCEPT LAB */}
        {activeTab === 'INTERVIEW_LAB' && (
          <InterviewConceptLab />
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
