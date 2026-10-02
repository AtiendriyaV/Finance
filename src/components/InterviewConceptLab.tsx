import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Briefcase, 
  HelpCircle, 
  TrendingUp, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Zap, 
  Calendar,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MULTI_MARKET_ASSETS, INSTITUTIONAL_FLOW_SUMMARY } from '../data/mockMarketData';
import { MERGER_ACQUISITION_DEALS } from '../data/mergersData';

export const InterviewConceptLab: React.FC = () => {
  const [periodType, setPeriodType] = useState<'WEEKLY' | 'MONTHLY'>('WEEKLY');
  const [copiedDispatch, setCopiedDispatch] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(FULL_MARKDOWN_DISPATCH);
    setCopiedDispatch(true);
    setTimeout(() => setCopiedDispatch(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([FULL_MARKDOWN_DISPATCH], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `arthaquant_market_dispatch_${periodType.toLowerCase()}_october_2026.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                CFA / FRM CANDIDATE ACCELERATOR
              </span>
              <span className="text-xs font-mono text-slate-400">Institutional Strategy & Risk Committee Memo</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Institutional Market Dispatch & Interview Concept Lab
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rigorous data-grounded weekly wrap & monthly dossier formatted after Goldman Sachs GIR and Morgan Stanley Research.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setPeriodType('WEEKLY')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  periodType === 'WEEKLY'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Weekly Wrap
              </button>
              <button
                onClick={() => setPeriodType('MONTHLY')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  periodType === 'MONTHLY'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly Dossier
              </button>
            </div>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700"
            >
              {copiedDispatch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedDispatch ? 'Copied Markdown' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dispatch</span>
            </button>
          </div>
        </div>

        {/* 4 Core Pillars Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">1. Macro Regime</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block">Expansionary Floor</span>
            <span className="text-[10px] text-slate-500">VIX 12.85 · Vol Compression</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">2. Cross-Asset Transm.</span>
            <span className="text-sm font-bold text-cyan-300 mt-0.5 block">Yield Spread 280 bps</span>
            <span className="text-[10px] text-slate-500">India 6.78% vs US 3.98%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">3. Strategic Tilt</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">Quality + Momentum</span>
            <span className="text-[10px] text-slate-500">Underweight Low-Margin Cyclicals</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">4. Interview Concept</span>
            <span className="text-sm font-bold text-amber-300 mt-0.5 block">Gordon Growth & VaR</span>
            <span className="text-[10px] text-slate-500">Cornish-Fisher Leptokurtosis</span>
          </div>
        </div>
      </div>

      {/* Interactive Concept Lab Section: 3 Columns / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Concept in Action Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            Core Concept in Action
          </div>
          <h3 className="text-sm font-bold text-white font-sans">
            Equity Duration & Gordon Growth Model Sensitivity
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            When sovereign yields decline (India 10Y from 7.24% to 6.78%), the equity discount rate compresses. In the Gordon formula P0 = D1 / (r - g), high-growth sectors with distant cash flows (IT, Consumer EV, Defense) exhibit elongated Macaulay equity duration:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
            Equity Duration ≈ (1 + r) / (r - g) ≈ 28 to 35 Years
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A 50 bps compression in real sovereign yields yields a theoretical +14% expansion in terminal intrinsic equity multiples, explaining the mid-cap expansion on Dalal Street.
          </p>
        </div>

        {/* Institutional Interview Q&A Flashcard */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Interview Questions
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedQuestion(1)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedQuestion === 1 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                Q1: Valuation
              </button>
              <button
                onClick={() => setSelectedQuestion(2)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedQuestion === 2 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                Q2: Risk / VaR
              </button>
            </div>
          </div>

          {selectedQuestion === 1 ? (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-sans">
                "How does a 100 bps parallel shift in the yield curve impact DCF valuation across Banks vs IT Services?"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <strong className="text-cyan-400 font-mono">Model Answer:</strong> Banks have short-duration financial assets and benefit from asset repricing elasticity before liabilities adjust, widening Net Interest Margins (NIM) in the short-run. Conversely, IT Services have long-duration cash flows and zero debt; a 100 bps discount rate rise discounts their terminal value aggressively (-12% to -15% multiple compression).
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-sans">
                "Why does Gaussian 95% Parametric VaR severely fail during market crashes, and how do you adjust for it?"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <strong className="text-cyan-400 font-mono">Model Answer:</strong> Gaussian models assume Excess Kurtosis K = 0. Emerging markets like India exhibit K &gt; 4.5 and negative skewness (S &lt; 0). We apply the <em>Cornish-Fisher expansion</em> to calibrate the critical value Z_cf by factoring skewness and fat-tailed kurtosis, adjusting our 95% VaR from 0.72% to 0.94% NAV.
              </p>
            </div>
          )}
        </div>

        {/* 30-Second Stock / Macro Pitch Frame */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <Zap className="w-4 h-4" />
            30-Second Pitch Angle
          </div>
          <h3 className="text-sm font-bold text-white font-sans">
            Long Private Banking Titans (HDFC Bank / ICICI) vs State PSUs
          </h3>
          <div className="space-y-1.5 text-xs text-slate-300 font-sans">
            <div>
              <strong className="text-cyan-400 font-mono">1. Thesis:</strong> High deposit franchise pricing power enables credit growth CAGR &gt; 16% as corporate balance sheets re-leverage.
            </div>
            <div>
              <strong className="text-cyan-400 font-mono">2. Variant Perception:</strong> Street overestimates post-merger NIM compression; branch cross-sell penetration is accelerating 180 bps ahead of consensus.
            </div>
            <div>
              <strong className="text-cyan-400 font-mono">3. Catalyst:</strong> RBI monetary easing cycle initiating in Q4 with neutral stance shift.
            </div>
            <div>
              <strong className="text-cyan-400 font-mono">4. Downside:</strong> Protected by 2.3x P/ABV historical trough multiple and domestic SIP support.
            </div>
          </div>
        </div>
      </div>

      {/* Full Formatted Institutional Markdown Document Viewer */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Institutional Markdown Dispatch (Morgan Stanley / Goldman Sachs Format)
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Period: October 2026 · Benchmark: NIFTY 50
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto max-h-[600px] whitespace-pre-wrap">
          {FULL_MARKDOWN_DISPATCH}
        </div>
      </div>
    </div>
  );
};

const FULL_MARKDOWN_DISPATCH = `## 1. Executive Summary & Market Regime

**Prevailing Regime:** **Expansionary Consolidation & Volatility Compression**

* **Domestic SIP Liquidity Outweighs FII Cash Selling:** Domestic Institutional Investors (DIIs) absorbed net cash flows of **+₹1,945.8 Cr** against modest Foreign Institutional Investor (FPI) liquidation of **-₹482.5 Cr**. The monthly domestic SIP run-rate of $>₹24,000\\text{ Cr}$ continues to provide an inelastic valuation floor at 24,700 on the NIFTY 50, dampening foreign macro-induced drawdowns.
* **Rates & Real Yield Anchoring:** The US 10-Year Treasury yield held stable at **3.98%**, while India's 10-Year G-Sec yield compressed to **6.78%**, tightening the sovereign credit spread to **280 bps** (well below the 5-year historical average of 345 bps). This compression provides an ongoing structural tailwind to Indian corporate cost-of-capital.
* **Volatility Compression with Complacent Option Skew:** India VIX dropped **-3.16%** to **12.85**, signaling widespread option-writing complacency. The Derivatives Put-Call Ratio (PCR) closed at **1.18x**, reflecting sustained open-interest accumulation at key out-of-the-money put strikes (24,600 and 24,700 PE).
* **Corporate Balance-Sheet Confidence via Strategic M&A:** Accelerated consolidation in Industrials, Retail, and Technology (notably Tata Electronics' ₹5,500 Cr Pegatron iPhone plant acquisition and Reliance Retail's completed ₹2,850 Cr Metro Cash & Carry takeover) demonstrates corporate willingness to deploy long-term balance-sheet cash.

---

## 2. Cross-Asset Macro & Sector Rotation Analysis

### Rates & FX Transmission
* **Sovereign Yield Spread:** The India-US 10Y sovereign yield differential compressed to **280 bps** (India 10Y at 6.78% vs. US 10Y at 3.98%). As Uncovered Interest Rate Parity (UIP) would imply, this low spread would normally pressure the domestic currency; however, active RBI foreign exchange reserve intervention ($>\\$690\\text{B}$) anchored USD/INR spot volatility within an ultra-tight band (**83.88**, 1-month realized volatility $<2.5\\%$).
* **Commodity Deflation Pass-Through:** Brent crude softening to **$74.85/bbl** (-1.51%) functions as an immediate macroeconomic transfer of wealth to net oil-importing economies like India. This alleviation eases Current Account Deficit (CAD) pressures and directly expands gross margins for domestic transport, automotive OEMs, and paint manufacturers.
* **Gold / Dollar Decoupling:** MCX Gold held firm at **₹76,150/10g** despite positive US 10Y real yields, reflecting structural sovereign central-bank diversification away from G10 reserve assets.

### Sector Attribution & Relative Strength
* **Cyclical Outperformance:**
  * **Nifty Auto (+1.97% 1D, RS-Ratio 104.5):** Sits firmly in the **Leading Quadrant** of the Relative Rotation Graph (RRG). Commercial vehicle fleet replacement cycles and passenger EV localization drove outperformance across Tata Motors and Mahindra & Mahindra.
  * **Nifty Bank (+0.74% 1D, RS-Ratio 101.2):** Private banking balance sheets demonstrated resilient asset quality; credit growth CAGR continues to compound at $>15.5\\%$, driving institutional accumulation in HDFC Bank and ICICI Bank.
  * **Nifty Realty (+1.45% 1D, RS-Ratio 103.8):** Sustained low-inventory residential cycles coupled with yield stabilization spurred strong institutional buying in tier-1 real estate developers.
* **Defensive & Export Laggards:**
  * **Nifty IT (-0.50% 1D, RS-Ratio 96.8):** Languishing in the **Lagging Quadrant** on conservative North American client discretionary tech spending, creating short-term multiple drag across Tier-1 software exporters.
  * **Nifty FMCG (-0.15% 1D, RS-Ratio 97.2):** Slower rural volume recovery and competitive pricing pressure restricted relative multiple expansion.

### Risk Diagnostic
* **India VIX:** Current print at **12.85** represents the 18th percentile of 52-week historical volatility, indicating extreme baseline calm.
* **Parametric vs. Historical 95% Value at Risk (VaR):**
  * **95% Daily Parametric VaR (Cornish-Fisher Adjusted):** **0.94% NAV**
  * **95% Daily Historical Quantile VaR:** **0.88% NAV**
  * The **+6 bps spread** of Parametric over Historical VaR captures the leptokurtic fat-tail penalty (Excess Kurtosis $K = 4.2$) required to avoid understating tail-risk during sudden regime switches.
* **Maximum Drawdown (Trailing 20D):** Contained at **-1.82%**, reflecting minimal systematic selling pressure.

---

## 3. Strategic Implications & Asset Allocation

### Equity Risk Premium (ERP) Synthesis
With the NIFTY 50 trading at an implied earnings yield of **4.46%** (P/E $\\approx 22.4\\text{x}$) and the India 10-Year G-Sec yield at **6.78%**, the conventional Equity Risk Premium ($\text{ERP} = E/P - R_f$) is deeply compressed at **-232 bps**. In mature markets, this inversion would signal severe equity overvaluation; on Dalal Street, however, the negative spread is justified by superior structural real GDP growth ($>6.8\\%$) and corporate ROE expansion ($>15.2\\%$).

### Tactical Asset Allocation Matrix
* **Equities (65% Weight / Overweight Quality-Momentum):** Overweight Large-Cap Private Banks, Automotive, and Power/Capital Goods. Underweight deep cyclical commodity producers facing weak global manufacturing demand.
* **Fixed Income (20% Weight / Long Duration Sovereign):** Maintain allocation to 10-Year and 14-Year G-Secs. As inflation glides toward the RBI's 4.0% medium-term target, real bond yields ($>2.5\\%$) offer compelling risk-adjusted real returns with high capital-gains convexity.
* **Gold / Hard Assets (10% Weight / Strategic Tail Hedge):** Retain systematic exposure to sovereign and physically backed gold as an uncorrelated hedge against Middle Eastern and Strait of Hormuz supply shocks.
* **Cash & Overnight Liquid G-Secs (5% Weight):** Buffer dry powder to exploit sudden volatility spikes (VIX $>18$) to deploy into oversold mega-caps.

### Corporate Balance-Sheet Deployment (M&A Radar)
Corporate India is transitioning from defensive balance-sheet repair to **aggressive capital deployment**:
* **Supply-Chain Reshoring:** Tata Electronics' ₹5,500 Cr acquisition of Pegatron's iPhone facility marks a structural pivot toward high-tech contract manufacturing leadership.
* **Supply-Chain Verticalization:** Reliance Retail's integration of Metro Cash & Carry (₹2,850 Cr) locks in wholesale B2B distribution to insulate gross margins.
* **Market Consolidation:** Adani Cement (Sanghi Industries ₹10,422 Cr) and UltraTech Cement (India Cements ₹3,954 Cr) demonstrate duopolistic consolidation in asset-heavy industries, raising barriers to entry and preserving industry pricing discipline.

---

## 4. Interview Intelligence & CFA / ER Concept Lab

### Core Concept in Action: Gordon Growth Model & Equity Duration Sensitivity
**The Theoretical Mechanism:**
Under the Gordon Growth Model, the intrinsic value of an equity security is expressed as:
$$P_0 = \\frac{D_1}{r - g} = \\frac{E_1 \\cdot (1 - b)}{R_f + \\beta(\\text{ERP}) - (b \\cdot \\text{ROE})}$$
Where $r$ is the required rate of return, $g$ is the sustainable growth rate, $b$ is the retention ratio, and $R_f$ is the risk-free rate.

**Empirical Application to Current Indian Markets:**
As India 10-Year G-Sec yields compressed from **7.24% to 6.78%**, the denominator $(r - g)$ contracted by 46 basis points. For mature high-dividend payout companies (FMCG), equity duration is low ($\approx 12 - 15\\text{ years}$). For high-growth companies reinvesting 80%+ of earnings (Mid-cap EMS, Tech, Defense), **Macaulay equity duration exceeds 28–35 years**:
$$\\frac{\\Delta P}{P} \\approx -\\text{Duration} \\cdot \\Delta r = -(30) \\cdot (-0.0046) = +13.8\\%$$
This mathematical relationship proves why lower sovereign yields disproportionately re-rate growth sectors over value sectors.

---

### Institutional Interview Questions & Answers

#### Question 1 (Valuation / Corporate Finance):
> **Interviewer:** *"If a firm's terminal value represents 75% of its total Enterprise Value in a 10-year DCF, and the cost of debt rises by 150 bps due to credit rating migration, how does that transmit through WACC, the EV/EBITDA multiple, and the terminal value calculation?"*

**High-Conviction Model Answer:**
> *"An increase in the pre-tax cost of debt ($K_d$) transmits directly into WACC via the weighted capital structure: $\\Delta \\text{WACC} = (D/V) \\cdot \\Delta K_d \\cdot (1 - T)$. Assuming a 30% debt-to-capital ratio and a 25% corporate tax rate, a 150 bps rise in $K_d$ expands WACC by approximately 34 basis points.
> 
> Because the firm's Enterprise Value is 75% back-loaded into the terminal period, the terminal value is exponentially sensitive to WACC. Under the perpetual growth formula $\\text{TV} = \\frac{\\text{FCFF}_{11}}{\\text{WACC} - g}$, if WACC expands from 10.0% to 10.34% with $g = 5.0\\%$, the implied terminal capitalization rate rises from 5.0% to 5.34%. This reduces the un-discounted terminal value by:
> $$\\frac{5.0\\%}{5.34\\%} - 1 \\approx -6.36\\%$$
> Compounded with the higher discount factor over 10 years $\\left(\\frac{1}{(1+\\text{WACC})^{10}}\\right)$, the present value of the terminal value contracts by over **-9.5%**. 
> 
> In terms of trading multiples, the target's implied exit EV/EBITDA multiple must compress by approximately 1.2x to 1.5x to reflect the higher hurdle rate and debt service burden."*

---

#### Question 2 (Risk Management & Financial Risk Analysis):
> **Interviewer:** *"Our portfolio has a 1-day 95% Parametric VaR of 0.72% under the normal distribution assumption, but our risk committee reports a 95% VaR of 0.94% using the Cornish-Fisher expansion. Explain mathematically why this divergence occurs, and state why VaR is not a coherent risk measure during tail-liquidation events."*

**High-Conviction Model Answer:**
> *"The divergence occurs because the standard Parametric VaR assumes asset returns follow a Gaussian distribution where skewness $S = 0$ and excess kurtosis $K = 0$, applying a fixed standard normal quantile $Z = 1.645$. 
> 
> In reality, emerging market equities like the NIFTY 50 exhibit negative skewness (frequent downward gaps) and heavy leptokurtosis ($K > 4.0$). The **Cornish-Fisher expansion** adjusts the standard normal quantile $Z$ by incorporating higher-order moments:
> $$Z_{\\text{CF}} = Z + \\frac{Z^2 - 1}{6}S + \\frac{Z^3 - 3Z}{24}K - \\frac{2Z^3 - 5Z}{36}S^2$$
> For our portfolio ($S = -0.45, K = 4.2$), $Z_{\\text{CF}}$ expands from $1.645$ to approximately **$2.15$**, increasing calculated VaR from 0.72% to **0.94% NAV**. Relying strictly on Gaussian VaR would undercapitalize the portfolio against tail risk by 30%.
> 
> Furthermore, **VaR is fundamentally not a coherent risk measure** because it fails the axiom of **subadditivity**:
> $$\\text{VaR}(X + Y) \\not\\le \\text{VaR}(X) + \\text{VaR}(Y)$$
> For non-normal, asymmetric distributions, merging two portfolios can yield a VaR greater than the sum of their individual VaRs. Under extreme liquidity stress, we instead report **Expected Shortfall (Conditional VaR)**:
> $$\\text{CVaR}_\\alpha = E[L \\mid L > \\text{VaR}_\\alpha]$$
> which captures the average magnitude of losses beyond the VaR cutoff and strictly satisfies subadditivity."*

---

### 30-Second Stock / Macro Pitch Framework

* **Asset / Ticker:** **Long Private Indian Banking Behemoths (HDFC Bank / ICICI Bank)**
* **Thesis:** Expanding credit growth ($>15.5\\%\\text{ YoY}$) fueled by the formalization of Indian retail lending, combined with an imminent monetary easing cycle that will expand Net Interest Margins (NIMs) through deposit cost repricing.
* **Variant Perception:** Consensus is overly fixated on transient post-merger integration compression; institutional branch cross-selling efficiency is pacing 180 bps ahead of Street sell-side models.
* **Key Catalyst:** RBI monetary policy stance shift from withdrawal of accommodation to neutral in Q4, paired with JP Morgan EM Bond Index foreign inflows reducing sovereign yield competition for private bank deposits.
* **Downside Protection:** Trading at $2.3\\text{x}$ P/ABV (historical 10-year bottom quartile) backed by an inelastic domestic SIP capital bid of ₹24,000 Cr/month.
`;
