import React, { useState } from 'react';
import { WeekendMacroReport, SectorRotationNode } from '../types/market';
import { 
  Compass, 
  BarChart2, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Layers, 
  TrendingUp, 
  Activity,
  Zap,
  Info
} from 'lucide-react';

interface WeekendSystematicOverviewProps {
  report: WeekendMacroReport;
  sectorData: SectorRotationNode[];
}

export const WeekendSystematicOverview: React.FC<WeekendSystematicOverviewProps> = ({
  report,
  sectorData,
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorRotationNode | null>(sectorData[0]);

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'LEADING':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
      case 'IMPROVING':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800';
      case 'WEAKENING':
        return 'text-amber-400 bg-amber-950/40 border-amber-800';
      case 'LAGGING':
        return 'text-rose-400 bg-rose-950/40 border-rose-800';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Weekend Report Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/50 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                WEEKEND SWEEP · CRON RUN 18:00 SATURDAY
              </span>
              <span className="text-xs font-mono text-slate-400">Week Ending: {report.weekEndingDate}</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {report.title}
            </h2>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0 text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Weekly Verdict</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              STRUCTURALLY BULLISH / DISPERSION HIGH
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {report.weeklyMacroVerdict}
        </p>

        <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-cyan-900/40 text-xs text-cyan-200">
          <span className="font-bold text-cyan-400 font-mono">RECOMMENDED POSITIONING: </span>
          {report.recommendedPositioning}
        </div>
      </div>

      {/* Relative Rotation Graph (RRG) & Sector Rotation Quadrants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                Sector Relative Rotation Graph (RRG) Matrix
              </h3>
              <p className="text-xs text-slate-400">
                JdK RS-Ratio (trend) vs RS-Momentum (velocity) normalized against NIFTY 50.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Benchmark: NIFTY 50 (100, 100)</span>
          </div>

          {/* Interactive Visual Quadrant Canvas */}
          <div className="relative w-full h-80 bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden">
            {/* Quadrant Axis Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 border-dashed border-l border-slate-700/80" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800 border-dashed border-t border-slate-700/80" />

            {/* Quadrant Labels */}
            <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-cyan-400/80 uppercase">
              Improving (RS-Mom &gt; 100, RS-Ratio &lt; 100)
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-emerald-400/80 uppercase">
              Leading (RS-Mom &gt; 100, RS-Ratio &gt; 100)
            </div>
            <div className="absolute bottom-3 left-3 text-[10px] font-mono font-bold text-rose-400/80 uppercase">
              Lagging (RS-Mom &lt; 100, RS-Ratio &lt; 100)
            </div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-amber-400/80 uppercase">
              Weakening (RS-Mom &lt; 100, RS-Ratio &gt; 100)
            </div>

            {/* Plotted Sectors */}
            {sectorData.map((node) => {
              // Map rsRatio 94-106 to 5% - 95% X
              // Map rsMomentum 96-104 to 90% - 10% Y (higher momentum = higher Y)
              const minRatio = 95;
              const maxRatio = 106;
              const minMom = 96;
              const maxMom = 104;

              const xPct = Math.min(92, Math.max(8, ((node.rsRatio - minRatio) / (maxRatio - minRatio)) * 100));
              const yPct = Math.min(90, Math.max(10, 100 - ((node.rsMomentum - minMom) / (maxMom - minMom)) * 100));

              const isSelected = selectedSector?.sector === node.sector;

              return (
                <button
                  key={node.sector}
                  onClick={() => setSelectedSector(node)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded text-[11px] font-mono font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer z-10 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 scale-110 ring-2 ring-cyan-300'
                      : getQuadrantColor(node.quadrant)
                  }`}
                  style={{ left: `${xPct}%`, top: `${yPct}%` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{node.sector.replace('Nifty ', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Quadrant Guide */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-[11px] font-mono text-center">
            <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
              LEADING: Auto, Realty, Bank
            </div>
            <div className="p-2 rounded bg-amber-950/30 border border-amber-800/40 text-amber-300">
              WEAKENING: Metal, Energy
            </div>
            <div className="p-2 rounded bg-rose-950/30 border border-rose-800/40 text-rose-300">
              LAGGING: FMCG, IT
            </div>
            <div className="p-2 rounded bg-cyan-950/30 border border-cyan-800/40 text-cyan-300">
              IMPROVING: Pharma, Infra
            </div>
          </div>
        </div>

        {/* Selected Sector Details Box */}
        {selectedSector && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">Sector Analysis</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getQuadrantColor(selectedSector.quadrant)}`}>
                  {selectedSector.quadrant} QUADRANT
                </span>
              </div>

              <h4 className="text-xl font-bold font-mono text-white mt-3">{selectedSector.sector}</h4>
              <p className="text-xs text-slate-400 mt-1">Relative to {selectedSector.benchmark}</p>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">RS-RATIO (TREND)</span>
                  <span className="text-base font-bold text-slate-200">{selectedSector.rsRatio}</span>
                  <span className="text-[10px] text-slate-400 block">{selectedSector.rsRatio > 100 ? 'Outperforming' : 'Underperforming'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">RS-MOMENTUM</span>
                  <span className="text-base font-bold text-cyan-400">{selectedSector.rsMomentum}</span>
                  <span className="text-[10px] text-slate-400 block">{selectedSector.rsMomentum > 100 ? 'Accelerating' : 'Decelerating'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">1-WEEK RETURN</span>
                  <span className={`text-sm font-bold ${selectedSector.oneWeekReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedSector.oneWeekReturn >= 0 ? '+' : ''}{selectedSector.oneWeekReturn}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">1-MONTH RETURN</span>
                  <span className={`text-sm font-bold ${selectedSector.oneMonthReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedSector.oneMonthReturn >= 0 ? '+' : ''}{selectedSector.oneMonthReturn}%
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Heavyweight Drivers:</span>
                <span className="text-xs text-slate-200">{selectedSector.keyHoldings}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
              Algorithmic action: {selectedSector.quadrant === 'LEADING' || selectedSector.quadrant === 'IMPROVING' ? 'Maintain tactical overweight factor exposure.' : 'Hold or trim to minimize benchmark tracking drag.'}
            </div>
          </div>
        )}
      </div>

      {/* Market Breadth & Cross-Asset Correlation Anomaly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cross-Asset Correlation Anomaly Table */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Cross-Asset Correlation Anomalies (Z-Score &gt; |1.5|)</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Flags statistical regime breakdowns in historical cross-asset relationships using 30-day vs 1-year rolling Pearson correlations.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {report.crossAssetCorrelations.map((pair) => (
              <div key={pair.assetPair} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{pair.assetPair}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      pair.status === 'ANOMALOUS_BREAKDOWN'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : pair.status === 'DECOUPLING'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {pair.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                  <span>1M Corr: <strong className="text-slate-200">{pair.correlation1M.toFixed(2)}</strong></span>
                  <span>1Y Corr: <strong className="text-slate-200">{pair.correlation1Y.toFixed(2)}</strong></span>
                  <span>Z-Score: <strong className={Math.abs(pair.zScore) > 1.5 ? 'text-amber-400' : 'text-slate-200'}>{pair.zScore.toFixed(2)}</strong></span>
                </div>

                <p className="mt-2 text-xs font-sans text-slate-300">
                  {pair.commentary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Breadth & Structural Shifts Scanner */}
        <div className="space-y-6">
          {/* Breadth Thermometer */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              Nifty 500 Market Breadth Thermometer
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">&gt; 200-DAY EMA</span>
                <span className="text-lg font-bold text-emerald-400">{report.breadthMetrics.pctAbove200EMA}%</span>
                <span className="text-[10px] text-slate-400">Bullish structural trend</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">&gt; 50-DAY EMA</span>
                <span className="text-lg font-bold text-cyan-400">{report.breadthMetrics.pctAbove50EMA}%</span>
                <span className="text-[10px] text-slate-400">Intermediate healthy</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">NET 52W HIGHS</span>
                <span className="text-lg font-bold text-emerald-400">+{report.breadthMetrics.net52WHighLows}</span>
                <span className="text-[10px] text-slate-400">Expansion mode</span>
              </div>
            </div>
          </div>

          {/* Structural Shifts & Cyclical Anomalies Alert Cards */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              Systematic Anomaly Flags (Weekend Sweep)
            </h3>

            <div className="space-y-2.5 text-xs">
              {report.cyclicalAnomalies.map((anomaly, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-relaxed">{anomaly}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
