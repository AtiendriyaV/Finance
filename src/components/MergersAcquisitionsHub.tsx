import React, { useState, useMemo } from 'react';
import { MergerAcquisitionDeal, DealSector, DealStatus, DealType } from '../types/market';
import { 
  Building2, 
  Search, 
  Filter, 
  PlusCircle, 
  ExternalLink, 
  Briefcase, 
  ShieldCheck, 
  Scale, 
  Layers, 
  ArrowUpRight, 
  X, 
  Check, 
  Calendar,
  DollarSign,
  AlertCircle,
  FileText
} from 'lucide-react';

interface MergersAcquisitionsHubProps {
  deals: MergerAcquisitionDeal[];
  onAddDeal: (deal: MergerAcquisitionDeal) => void;
}

export const MergersAcquisitionsHub: React.FC<MergersAcquisitionsHubProps> = ({
  deals,
  onAddDeal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<DealSector | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<DealStatus | 'ALL'>('ALL');
  const [activeDealModal, setActiveDealModal] = useState<MergerAcquisitionDeal | null>(null);
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);

  // Form states for new M&A logging
  const [newHeadline, setNewHeadline] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newAcquirer, setNewAcquirer] = useState('');
  const [newDealValueCr, setNewDealValueCr] = useState('');
  const [newDealType, setNewDealType] = useState<DealType>('ACQUISITION');
  const [newSector, setNewSector] = useState<DealSector>('INDUSTRIALS');
  const [newStatus, setNewStatus] = useState<DealStatus>('ANNOUNCED');
  const [newValuationMultiple, setNewValuationMultiple] = useState('');
  const [newStrategicRationale, setNewStrategicRationale] = useState('');
  const [newRegulatoryNotes, setNewRegulatoryNotes] = useState('');
  const [newSourceOutlet, setNewSourceOutlet] = useState('The Economic Times');

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSector = selectedSector === 'ALL' || deal.sector === selectedSector;
      const matchesStatus = selectedStatus === 'ALL' || deal.status === selectedStatus;
      const matchesSearch =
        deal.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.targetCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.acquirerCompany.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSector && matchesStatus && matchesSearch;
    });
  }, [deals, selectedSector, selectedStatus, searchQuery]);

  // Aggregate Deal Radar Stats
  const totalDealValueCr = useMemo(() => {
    return deals.reduce((acc, d) => acc + d.dealValueInrCrores, 0);
  }, [deals]);

  const completedCount = useMemo(() => {
    return deals.filter((d) => d.status === 'COMPLETED').length;
  }, [deals]);

  const pendingReviewCount = useMemo(() => {
    return deals.filter((d) => d.status === 'REGULATORY_REVIEW_CCI' || d.status === 'IN_DUE_DILIGENCE').length;
  }, [deals]);

  const handleSaveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeadline || !newTarget || !newAcquirer || !newDealValueCr) return;

    const valCr = parseFloat(newDealValueCr) || 1000;
    const deal: MergerAcquisitionDeal = {
      id: `ma-${Date.now()}`,
      headline: newHeadline,
      targetCompany: newTarget,
      acquirerCompany: newAcquirer,
      dealValueInrCrores: valCr,
      dealValueUsdMillions: Math.round(valCr / 83.8),
      announcementDate: new Date().toISOString().split('T')[0],
      dealType: newDealType,
      paymentMethod: 'ALL_CASH',
      status: newStatus,
      sector: newSector,
      valuationMultiple: newValuationMultiple || 'Fair Value Multiple',
      strategicRationale: newStrategicRationale || 'Strategic horizontal/vertical consolidation to expand market share.',
      regulatoryNotes: newRegulatoryNotes || 'Awaiting standard regulatory clearance.',
      equityImpact: 'Subject to definitive integration and financial closing.',
      sourceHeadlineOutlet: newSourceOutlet,
    };

    onAddDeal(deal);
    setIsAddDealOpen(false);
    // Reset form
    setNewHeadline('');
    setNewTarget('');
    setNewAcquirer('');
    setNewDealValueCr('');
    setNewValuationMultiple('');
    setNewStrategicRationale('');
    setNewRegulatoryNotes('');
  };

  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
      case 'REGULATORY_REVIEW_CCI':
        return 'text-amber-400 bg-amber-950/60 border-amber-800';
      case 'IN_DUE_DILIGENCE':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800';
      case 'ANNOUNCED':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-800';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Deal Flow Radar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                CORPORATE CONSOLIDATION & STRATEGIC M&A
              </span>
              <span className="text-xs font-mono text-slate-400">
                Tracked via MongoDB Enterprise Store
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Mergers, Acquisitions & Corporate Consolidation Radar
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time monitoring of major Indian & global corporate buyouts, antitrust regulatory rulings (CCI/NCLT), and strategic headlines.
            </p>
          </div>

          <button
            onClick={() => setIsAddDealOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 transition self-start md:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log M&A Headline</span>
          </button>
        </div>

        {/* Aggregate Deal KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Tracked Deal Volume</span>
            <div className="text-xl font-bold text-white mt-1">
              ₹{(totalDealValueCr / 1000).toFixed(1)}k Cr
            </div>
            <span className="text-[10px] text-cyan-400 block">~${(totalDealValueCr / (83.8 * 1000)).toFixed(1)}B USD</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Closed Transactions</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">
              {completedCount} Deals
            </div>
            <span className="text-[10px] text-slate-400 block">NCLT / CCI Sanitized</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Regulatory Review (CCI)</span>
            <div className="text-xl font-bold text-amber-400 mt-1">
              {pendingReviewCount} In Pipeline
            </div>
            <span className="text-[10px] text-slate-400 block">Antitrust Scrutiny</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Leading Sector</span>
            <div className="text-lg font-bold text-cyan-300 mt-1">
              Financials & Infra
            </div>
            <span className="text-[10px] text-slate-400 block">HDFC, Adani, Tata Lead</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80 overflow-x-auto w-full sm:w-auto">
          {(
            [
              { key: 'ALL', label: 'All Sectors' },
              { key: 'INDUSTRIALS', label: 'Industrials / EMS' },
              { key: 'RETAIL', label: 'Retail & FMCG' },
              { key: 'TECH_MEDIA', label: 'Tech & Media' },
              { key: 'FINANCIALS', label: 'Financials' },
              { key: 'HEALTHCARE', label: 'Healthcare' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedSector(item.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedSector === item.key
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
            placeholder="Search headline, target, acquirer..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 font-mono"
          />
        </div>
      </div>

      {/* Main Deals & Headlines Cards */}
      <div className="space-y-4">
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => setActiveDealModal(deal)}
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-700/60 hover:bg-slate-900 transition-all cursor-pointer group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${getStatusBadge(deal.status)}`}>
                  {deal.status.replace(/_/g, ' ')}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                  {deal.sector} · {deal.dealType}
                </span>
                {deal.sourceHeadlineOutlet && (
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    Source: {deal.sourceHeadlineOutlet}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">Value:</span>
                <span className="text-base font-bold text-emerald-400">
                  ₹{deal.dealValueInrCrores.toLocaleString()} Cr
                </span>
                {deal.dealValueUsdMillions && (
                  <span className="text-slate-400 text-xs">(${deal.dealValueUsdMillions}M)</span>
                )}
              </div>
            </div>

            {/* Prominent Exact Headline */}
            <h3 className="text-sm sm:text-base font-bold text-white font-sans mt-3 group-hover:text-cyan-300 transition-colors leading-snug">
              "{deal.headline}"
            </h3>

            {/* Acquirer & Target Strip */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block uppercase">Acquirer Entity</span>
                <span className="text-slate-200 font-bold">{deal.acquirerCompany}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block uppercase">Target / Asset</span>
                <span className="text-slate-200 font-bold">{deal.targetCompany}</span>
              </div>
            </div>

            {/* Strategic Rationale & Multiple */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
              <div className="line-clamp-1 max-w-2xl font-sans">
                <strong className="text-slate-300 font-mono">Strategic Driver:</strong> {deal.strategicRationale}
              </div>
              <div className="font-mono text-cyan-400 shrink-0">
                Multiple: {deal.valuationMultiple}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deal Detail Inspection Modal */}
      {activeDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[92vh]">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadge(activeDealModal.status)}`}>
                    {activeDealModal.status.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs font-mono text-cyan-400">{activeDealModal.sector}</span>
                  <span className="text-xs font-mono text-slate-500">Announced: {activeDealModal.announcementDate}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-sans mt-2">
                  "{activeDealModal.headline}"
                </h3>
              </div>
              <button
                onClick={() => setActiveDealModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">TOTAL DEAL CONSIDERATION</span>
                <span className="text-lg font-bold text-emerald-400 mt-1 block">
                  ₹{activeDealModal.dealValueInrCrores.toLocaleString()} Cr
                </span>
                {activeDealModal.dealValueUsdMillions && (
                  <span className="text-slate-500 text-[10px]">(${activeDealModal.dealValueUsdMillions}M USD)</span>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">PAYMENT STRUCTURE</span>
                <span className="text-sm font-bold text-slate-200 mt-1 block">
                  {activeDealModal.paymentMethod.replace(/_/g, ' ')}
                </span>
                <span className="text-slate-500 text-[10px]">Deal Type: {activeDealModal.dealType}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">IMPLIED MULTIPLE</span>
                <span className="text-sm font-bold text-cyan-300 mt-1 block">
                  {activeDealModal.valuationMultiple}
                </span>
                <span className="text-slate-500 text-[10px]">Sector Benchmark Calibrated</span>
              </div>
            </div>

            {/* Deep-Dive Content */}
            <div className="mt-5 space-y-3.5 text-xs font-sans">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-cyan-400 font-bold block mb-1">Strategic M&A Thesis:</span>
                <p className="text-slate-300 leading-relaxed">{activeDealModal.strategicRationale}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-1">
                  Antitrust & Regulatory Approval Status (CCI / NCLT / RBI):
                </span>
                <p className="text-slate-300 leading-relaxed">{activeDealModal.regulatoryNotes}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold block mb-1">Equity Research & EPS Impact:</span>
                <p className="text-slate-300 leading-relaxed">{activeDealModal.equityImpact}</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Source Reporting Outlet: {activeDealModal.sourceHeadlineOutlet || 'Official Corporate Filing'}</span>
              <span>Logged into MongoDB Collection: mergers_acquisitions</span>
            </div>
          </div>
        </div>
      )}

      {/* Log New M&A Headline Modal */}
      {isAddDealOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold font-mono text-white">Log Corporate Acquisition / Merger Headline</h3>
              <button
                onClick={() => setIsAddDealOpen(false)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDeal} className="mt-4 space-y-3.5 text-xs font-sans">
              <div>
                <label className="block text-slate-400 mb-1 font-mono">Exact News Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Tata Motors Board Approves Demerger into Two Distinct Listed Entities..."
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Acquirer Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Reliance Industries"
                    value={newAcquirer}
                    onChange={(e) => setNewAcquirer(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Target Company / Asset</label>
                  <input
                    type="text"
                    placeholder="e.g. Hathway Cable & Datacom"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Deal Value (₹ Cr)</label>
                  <input
                    type="number"
                    placeholder="2500"
                    value={newDealValueCr}
                    onChange={(e) => setNewDealValueCr(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Sector</label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value as DealSector)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  >
                    <option value="INDUSTRIALS">INDUSTRIALS</option>
                    <option value="RETAIL">RETAIL</option>
                    <option value="TECH_MEDIA">TECH / MEDIA</option>
                    <option value="FINANCIALS">FINANCIALS</option>
                    <option value="HEALTHCARE">HEALTHCARE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as DealStatus)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  >
                    <option value="ANNOUNCED">ANNOUNCED</option>
                    <option value="IN_DUE_DILIGENCE">IN DUE DILIGENCE</option>
                    <option value="REGULATORY_REVIEW_CCI">CCI REVIEW</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Valuation Multiple / Terms</label>
                <input
                  type="text"
                  placeholder="e.g. 15.2x EV/EBITDA all-cash buyout"
                  value={newValuationMultiple}
                  onChange={(e) => setNewValuationMultiple(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Strategic Rationale</label>
                <textarea
                  rows={2}
                  placeholder="Why does this deal make strategic sense for the acquirer?"
                  value={newStrategicRationale}
                  onChange={(e) => setNewStrategicRationale(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Antitrust / CCI Regulatory Notes</label>
                <input
                  type="text"
                  placeholder="e.g. CCI Phase-1 filing submitted; no horizontal market share dominance..."
                  value={newRegulatoryNotes}
                  onChange={(e) => setNewRegulatoryNotes(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddDealOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Save to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
