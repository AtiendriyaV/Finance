import React, { useState, useMemo } from 'react';
import { 
  MarketAsset, 
  MarketRegion 
} from '../types/market';
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Maximize2, 
  Info, 
  BarChart3, 
  Flame, 
  Layers, 
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { INSTITUTIONAL_FLOW_SUMMARY } from '../data/mockMarketData';

interface MultiMarketTrackerProps {
  assets: MarketAsset[];
}

export const MultiMarketTracker: React.FC<MultiMarketTrackerProps> = ({ assets }) => {
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesRegion = selectedRegion === 'ALL' || asset.category === selectedRegion;
      const matchesSearch = 
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.exchange.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [assets, selectedRegion, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Institutional Flow & Volatility Matrix Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">NSE / BSE Cash Net Institutional Flow</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-bold font-mono text-emerald-400">
              +Rs {INSTITUTIONAL_FLOW_SUMMARY.diiCashNetCrores.toLocaleString()} Cr (DII)
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>FII Cash Flow:</span>
            <span className="font-mono text-rose-400">
              {INSTITUTIONAL_FLOW_SUMMARY.fiiCashNetCrores.toLocaleString()} Cr
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Derivatives Positioning (F&O)</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-bold font-mono text-cyan-300">
              {INSTITUTIONAL_FLOW_SUMMARY.fiiIndexFuturesLongShortRatio}x
            </span>
            <span className="text-xs text-slate-400">Long/Short Ratio</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>FII Option Delta:</span>
            <span className="font-mono text-emerald-400">Bullish Accumulation</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">India VIX Volatility Regime</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-bold font-mono text-emerald-400">12.85</span>
            <span className="text-xs text-emerald-400/90 font-mono">-3.16% Today</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>Vol State:</span>
            <span className="text-slate-300">Low Vol / Option Sellers Bias</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Sovereign 10Y Yield Spread</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-bold font-mono text-slate-200">280 bps</span>
            <span className="text-xs text-slate-400 font-mono">(India 6.78% vs US 3.98%)</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>Historical Mean:</span>
            <span className="text-slate-300">Compressed (-65 bps below 5Y avg)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80 overflow-x-auto w-full sm:w-auto">
          {(
            [
              { key: 'ALL', label: 'All Global Assets' },
              { key: 'INDIA', label: 'Indian Equities & Indices' },
              { key: 'GLOBAL', label: 'Global Bourses' },
              { key: 'COMMODITIES', label: 'Commodities' },
              { key: 'RATES_FX', label: 'Rates, FX & Vol' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedRegion(item.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedRegion === item.key
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
            placeholder="Search symbol, index, asset..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Asset Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-4 font-semibold">Instrument</th>
                <th className="py-3 px-4 font-semibold text-right">Last Price</th>
                <th className="py-3 px-4 font-semibold text-right">1D Change</th>
                <th className="py-3 px-4 font-semibold text-right">52-Week Range</th>
                <th className="py-3 px-4 font-semibold text-right">RSI (14)</th>
                <th className="py-3 px-4 font-semibold text-right">20D Vol Ratio</th>
                <th className="py-3 px-4 font-semibold text-right">Order Flow Bias</th>
                <th className="py-3 px-4 font-semibold text-center">Trend Spark</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredAssets.map((asset) => {
                const isPositive = asset.change >= 0;
                // Calculate position in 52W range
                const rangeWidth = asset.high52W - asset.low52W;
                const rangePct = rangeWidth > 0 ? ((asset.lastPrice - asset.low52W) / rangeWidth) * 100 : 50;
                const clampedPct = Math.min(100, Math.max(0, rangePct));

                return (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <td className="py-3.5 px-4 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
                          {asset.symbol}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-mono">
                          {asset.exchange}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{asset.name}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-slate-100">
                      {asset.currency === 'INR' ? '₹' : asset.currency === 'USD' ? '$' : ''}
                      {asset.lastPrice.toLocaleString(undefined, {
                        minimumFractionDigits: asset.lastPrice < 10 ? 2 : asset.lastPrice < 100 ? 2 : 2,
                        maximumFractionDigits: 2,
                      })}
                      {asset.currency === '%' && '%'}
                      {asset.currency === 'PTS' && ' pts'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className={`inline-flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        <span>{isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isPositive ? '+' : ''}{asset.change.toFixed(2)}
                      </div>
                    </td>

                    {/* 52W Range Bar */}
                    <td className="py-3.5 px-4 text-right min-w-[140px]">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span>{asset.low52W.toLocaleString()}</span>
                        <span>{asset.high52W.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full rounded-full transition-all"
                          style={{ width: `${clampedPct}%` }}
                        />
                      </div>
                    </td>

                    {/* RSI */}
                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-semibold ${
                        asset.rsi14 >= 70 
                          ? 'text-rose-400' 
                          : asset.rsi14 <= 30 
                          ? 'text-emerald-400' 
                          : 'text-slate-300'
                      }`}>
                        {asset.rsi14.toFixed(1)}
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {asset.rsi14 >= 70 ? 'Overbought' : asset.rsi14 <= 30 ? 'Oversold' : 'Neutral'}
                      </div>
                    </td>

                    {/* Volume vs 20D */}
                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-semibold ${
                        asset.volumeRatio20D >= 1.25 ? 'text-amber-400' : 'text-slate-300'
                      }`}>
                        {asset.volumeRatio20D.toFixed(2)}x
                      </span>
                      {asset.volumeRatio20D >= 1.25 && (
                        <div className="text-[10px] text-amber-400/90 flex items-center justify-end gap-1">
                          <Flame className="w-2.5 h-2.5" /> High Vol
                        </div>
                      )}
                    </td>

                    {/* Order Flow Depth Imbalance */}
                    <td className="py-3.5 px-4 text-right">
                      {asset.orderBook ? (
                        <div>
                          <span className={`font-semibold ${
                            asset.orderBook.depthImbalanceRatio > 1.15
                              ? 'text-emerald-400'
                              : asset.orderBook.depthImbalanceRatio < 0.85
                              ? 'text-rose-400'
                              : 'text-slate-300'
                          }`}>
                            {asset.orderBook.depthImbalanceRatio.toFixed(2)}x
                          </span>
                          <div className="text-[10px] text-slate-400">
                            {asset.orderBook.depthImbalanceRatio > 1.15 ? 'Bid Imbalance' : asset.orderBook.depthImbalanceRatio < 0.85 ? 'Ask Imbalance' : 'Balanced'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-600">N/A (Cash Index)</span>
                      )}
                    </td>

                    {/* Sparkline */}
                    <td className="py-3.5 px-4 text-center">
                      <svg className="w-20 h-6 mx-auto overflow-visible" viewBox="0 0 100 30">
                        <polyline
                          fill="none"
                          stroke={isPositive ? '#34d399' : '#f87171'}
                          strokeWidth="2"
                          points={asset.sparkline
                            .map((val, idx) => {
                              const min = Math.min(...asset.sparkline);
                              const max = Math.max(...asset.sparkline);
                              const normY = max === min ? 15 : 28 - ((val - min) / (max - min)) * 24;
                              const normX = (idx / (asset.sparkline.length - 1)) * 100;
                              return `${normX},${normY}`;
                            })
                            .join(' ')}
                        />
                      </svg>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAsset(asset);
                        }}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-cyan-950 hover:text-cyan-400 transition"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Deep-Dive Modal / Level-2 Depth Drawer */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold font-mono text-white">{selectedAsset.symbol}</h3>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-800 border border-slate-700 font-mono text-cyan-400">
                    {selectedAsset.exchange} : {selectedAsset.category}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">{selectedAsset.name}</p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400">Last Executed Price</span>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {selectedAsset.currency === 'INR' ? '₹' : selectedAsset.currency === 'USD' ? '$' : ''}
                  {selectedAsset.lastPrice.toLocaleString()}
                </div>
                <div className={`text-xs font-semibold font-mono mt-1 ${selectedAsset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}% ({selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change.toFixed(2)})
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400">Day High / Low Range</span>
                <div className="text-sm font-bold font-mono text-slate-200 mt-1">
                  H: {selectedAsset.high.toLocaleString()}
                </div>
                <div className="text-sm font-bold font-mono text-slate-400 mt-0.5">
                  L: {selectedAsset.low.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  ATR Volatility: {selectedAsset.atrPercent.toFixed(2)}%
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400">Institutional Multiples</span>
                <div className="text-xs text-slate-300 font-mono mt-1">
                  P/E Multiple: {selectedAsset.peRatio ? `${selectedAsset.peRatio}x` : 'N/A'}
                </div>
                <div className="text-xs text-slate-300 font-mono mt-0.5">
                  P/B Multiple: {selectedAsset.pbRatio ? `${selectedAsset.pbRatio}x` : 'N/A'}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Div Yield: {selectedAsset.dividendYield ? `${selectedAsset.dividendYield}%` : 'N/A'}
                </div>
              </div>
            </div>

            {/* Level-2 Order Book if available */}
            {selectedAsset.orderBook ? (
              <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
                      Level-2 Microstructure Depth (Top 5 Queues)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">
                    Depth Imbalance: {selectedAsset.orderBook.depthImbalanceRatio}x ({selectedAsset.orderBook.depthImbalanceRatio > 1 ? 'Buyers Absorb' : 'Sellers Pressure'})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  {/* Bids */}
                  <div>
                    <div className="flex justify-between text-slate-400 pb-1 border-b border-slate-800 text-[11px]">
                      <span>BID QTY</span>
                      <span>BID PRICE</span>
                    </div>
                    <div className="space-y-1 mt-1.5">
                      {selectedAsset.orderBook.topBids.map((b, i) => (
                        <div key={i} className="flex justify-between text-emerald-400">
                          <span className="text-slate-400">{b.qty.toLocaleString()}</span>
                          <span className="font-semibold">{b.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Asks */}
                  <div>
                    <div className="flex justify-between text-slate-400 pb-1 border-b border-slate-800 text-[11px]">
                      <span>ASK PRICE</span>
                      <span>ASK QTY</span>
                    </div>
                    <div className="space-y-1 mt-1.5">
                      {selectedAsset.orderBook.topAsks.map((a, i) => (
                        <div key={i} className="flex justify-between text-rose-400">
                          <span className="font-semibold">{a.price.toFixed(2)}</span>
                          <span className="text-slate-400">{a.qty.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Total Bid Depth: {selectedAsset.orderBook.bidQty.toLocaleString()}</span>
                  <span>Spread: {selectedAsset.orderBook.bidAskSpreadBps} bps</span>
                  <span>Total Ask Depth: {selectedAsset.orderBook.askQty.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <span className="text-slate-300 font-semibold">Macro Benchmark Index Asset:</span> Spot cash market derivative underlying traded via NSE/BSE Futures and Options contract chain.
              </div>
            )}

            {/* Analyst Quick Notes */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 font-mono">
                Equity Research Analyst / PM Thesis Memo
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trading at 52-week high percentile {Math.round(((selectedAsset.lastPrice - selectedAsset.low52W) / (selectedAsset.high52W - selectedAsset.low52W)) * 100)}%. Institutional volume confirmation ratio stands at {selectedAsset.volumeRatio20D}x with RSI momentum at {selectedAsset.rsi14.toFixed(1)}. Position sizing adheres to Kelly Criterion constraint with trailing stop placed below the 20-day exponential moving average.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
