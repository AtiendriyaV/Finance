import React from 'react';
import { 
  ShieldCheck, 
  Code, 
  Briefcase, 
  Award, 
  Terminal, 
  Layers, 
  Cpu, 
  Database, 
  CheckCircle2, 
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface ResumeCenterpieceGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeCenterpieceGuide: React.FC<ResumeCenterpieceGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-sans">
                  Institutional Architecture & Recruiter Dossier
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  CFA L1 / MBA FINANCE PORTFOLIO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Built as a dual-purpose institutional daily research terminal & marquee recruitment centerpiece.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 mb-2 font-mono text-cyan-400 font-bold text-xs uppercase">
              <Award className="w-4 h-4" />
              Candidate Background & Target Role
            </div>
            <p className="text-slate-300">
              This terminal was developed by a <strong className="text-white">1st-Year MBA Finance candidate (CFA Level 1 Candidate)</strong> with prior professional experience in Data Engineering and Full-Stack Development. Designed specifically to demonstrate institutional-caliber readiness for <strong className="text-cyan-300">Equity Research Analyst (Buyside/Sellside)</strong> and <strong className="text-cyan-300">Quantitative Portfolio Management</strong> roles at firms such as Goldman Sachs, Morgan Stanley, JPMorgan, Tata Asset Management, and Aditya Birla Capital.
            </p>
          </div>

          {/* 4 Pillars Architecture Breakdown */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              The 4 Architectural Pillars (Production Deployment Blueprint)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 font-mono text-emerald-400 font-bold text-xs mb-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  1. Multi-Market Streaming & Ingestion
                </div>
                <p className="text-slate-400 text-xs">
                  Ingests real-time and EOD data across Indian bourses (NSE/BSE Nifty 50, Bank Nifty, Midcaps) and global macro markets (S&P 500, Nikkei, Brent Crude, US 10Y Yield, Gold, USD/INR). Features Level-2 order book depth tracking and bid-ask liquidity imbalance estimation.
                </p>
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  Tech: Python websockets, Redis pub/sub, Next.js Server-Sent Events (SSE).
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 font-mono text-cyan-400 font-bold text-xs mb-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  2. Automated Daily Quantitative Insights
                </div>
                <p className="text-slate-400 text-xs">
                  Algorithmic post-market pipeline running daily at 16:15 IST. Computes implied volatility surfaces (India VIX), Put-Call Ratios (PCR), FII vs DII flow divergences, and generates dynamic Fama-French multi-factor tilt recommendations (Quality, Momentum, Low Vol).
                </p>
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  Tech: Python (scipy, statsmodels) + Node.js API routes with automated memo generation.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 font-mono text-amber-400 font-bold text-xs mb-1.5">
                  <Database className="w-3.5 h-3.5" />
                  3. Historical PostgreSQL / Supabase Archiving
                </div>
                <p className="text-slate-400 text-xs">
                  Every daily market state, macro driver, factor allocation, and discretionary analyst memo is stored in a normalized SQL schema. Enables quantitative walk-forward optimization, historical regime queries, and CSV/JSON institutional audit exports.
                </p>
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  Tech: Supabase / PostgreSQL with row-level security and full-text search indexing.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 font-mono text-indigo-400 font-bold text-xs mb-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  4. Weekend Systematic Macro Synthesis
                </div>
                <p className="text-slate-400 text-xs">
                  Saturday cron sweeps calculating Cross-Asset Correlation Anomaly Z-scores, Sector Relative Rotation Graphs (JdK RRG with RS-Ratio & RS-Momentum), and Nifty 500 breadth indicators (% above 200 EMA) to detect structural cyclical shifts.
                </p>
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  Tech: Scheduled GitHub Actions / Modal serverless workers + Vercel edge caching.
                </div>
              </div>
            </div>
          </div>

          {/* CFA & FRM Institutional Frameworks Applied */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
              Financial Rigor: CFA & FRM Methodologies Embedded
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Fama-French Multi-Factor Models:</strong> Quantitative factor exposures for Size (SMB), Value (HML), Profitability (RMW), Investment (CMA), and Momentum (WML).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Parametric & Historical VaR:</strong> 95% Daily Value at Risk monitoring with Cornish-Fisher expansion to account for Dalal Street fat-tailed kurtosis.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Econometric Regime Switching:</strong> Rescaled range Hurst exponent ($H$) testing and volatility clustering (GARCH) to avoid random-walk fallacies.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Microstructure & Liquidity:</strong> Tracking domestic SIP inflows ($2.8B/month) as an inelastic structural liquidity put against foreign capital volatility.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Deployment Target: Vercel / Lovable.dev + Supabase</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-sans font-semibold transition"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
