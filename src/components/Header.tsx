import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Activity, 
  FileText, 
  Sliders, 
  Archive, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Code,
  Award
} from 'lucide-react';
import { MULTI_MARKET_ASSETS } from '../data/mockMarketData';

export type NavTab = 'DASHBOARD' | 'RESEARCH_LAB' | 'MERGERS_ACQUISITIONS' | 'WEEKEND_SYSTEMATIC' | 'MONGO_ARCHIVE' | 'INTERVIEW_LAB';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenDossier: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenDossier }) => {
  const [istTime, setIstTime] = useState('');
  const [estTime, setEstTime] = useState('');
  const [isNseOpen, setIsNseOpen] = useState(false);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      
      // IST Format
      const istOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(new Intl.DateTimeFormat('en-GB', istOptions).format(now));

      // EST Format
      const estOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setEstTime(new Intl.DateTimeFormat('en-GB', estOptions).format(now));

      // Calculate approximate NSE status (09:15 to 15:30 IST on weekdays)
      const istDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const day = istDate.getDay();
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const isOpen = day >= 1 && day <= 5 && totalMinutes >= 9 * 60 + 15 && totalMinutes <= 15 * 60 + 30;
      setIsNseOpen(isOpen);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const tickerItems = MULTI_MARKET_ASSETS.slice(0, 8);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Ticker Tape */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider uppercase text-[11px] shrink-0">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>Real-Time Feed:</span>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          {tickerItems.map((item) => (
            <div key={item.symbol} className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{item.symbol}</span>
              <span className="text-slate-200">
                {item.lastPrice.toLocaleString(undefined, {
                  minimumFractionDigits: item.lastPrice < 100 ? 2 : 1,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className={`flex items-center text-[11px] font-semibold ${item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation & Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold tracking-tight text-white">
                    ARTHA<span className="text-cyan-400">QUANT</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 font-medium px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/50">
                    CFA / FRM DESK
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-none">
                  Institutional Market Intelligence & Quantitative Research Terminal
                </p>
              </div>
            </div>

            {/* Market Clocks */}
            <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">NSE/BSE (IST):</span>
                <span className="text-slate-200 font-semibold">{istTime || '14:25:10'}</span>
                <span className={`inline-block w-2 h-2 rounded-full ${isNseOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-500'}`} />
                <span className="text-[10px] text-slate-400">{isNseOpen ? 'REGULAR' : 'OFF-SESSION'}</span>
              </div>
              <div className="flex items-center gap-2 pl-3 border-l border-slate-800/80">
                <span className="text-slate-400">NYSE (EST):</span>
                <span className="text-slate-200">{estTime || '04:55:10'}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Architecture Dossier */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDossier}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700 transition border border-slate-700/80 shadow-sm"
              title="View Institutional Architecture, CFA/FRM Framework & Student Profile"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full-Stack Architecture</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-1 border-t border-slate-800/70 py-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('DASHBOARD')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'DASHBOARD'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>01. Dashboard (Home)</span>
          </button>

          <button
            onClick={() => setActiveTab('RESEARCH_LAB')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'RESEARCH_LAB'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/80 shadow-sm ring-1 ring-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">02. Research & Backtester</span>
            <span className="text-[10px] bg-cyan-900/60 text-cyan-300 px-1 rounded font-mono">SEPARATE ROUTE</span>
          </button>

          <button
            onClick={() => setActiveTab('MERGERS_ACQUISITIONS')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'MERGERS_ACQUISITIONS'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>03. Companies M&A Radar</span>
            <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800/80 px-1 rounded font-mono">HEADLINES</span>
          </button>

          <button
            onClick={() => setActiveTab('WEEKEND_SYSTEMATIC')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'WEEKEND_SYSTEMATIC'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>04. Weekend Systematic</span>
          </button>

          <button
            onClick={() => setActiveTab('MONGO_ARCHIVE')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'MONGO_ARCHIVE'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>05. MongoDB Historical Archive</span>
          </button>

          <button
            onClick={() => setActiveTab('INTERVIEW_LAB')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'INTERVIEW_LAB'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-700/80 shadow-sm ring-1 ring-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">06. Interview & Concept Lab</span>
            <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1 rounded font-mono">CFA / ER PREP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
