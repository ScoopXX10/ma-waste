import spendingData from '../data/ma-spending-accountability.json'
import QuoteBlock from './QuoteBlock'

function SpendingSection() {
  const shelterData = spendingData.shelterCrisis
  const auditFindings = shelterData.auditFindings

  return (
    <section id="spending" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            WHERE YOUR MONEY GOES
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            {spendingData.overview.keyMessage}
          </p>
        </div>

        {/* Shelter crisis headline stat */}
        <div className="bg-blood-dark border border-blood-light/30 p-8 mb-12 text-center">
          <div className="font-mono text-6xl md:text-8xl font-bold text-warning mb-4">
            $1B+
          </div>
          <p className="font-serif text-2xl text-paper/90 mb-2">
            Annual shelter system spending
          </p>
          <p className="font-serif text-lg text-paper/60">
            Emergency declared August 2023 — ended August 2025
          </p>
        </div>

        {/* Per-family costs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-blood-light mb-2">
              ${shelterData.costs.costPerFamilyPerMonth.toLocaleString()}
            </div>
            <p className="font-serif text-paper/80">Per family, per month</p>
            <p className="font-serif text-sm text-paper/50">$182,000 annually</p>
          </div>
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-blood-light mb-2">
              ${shelterData.costs.costPerFamilyPerWeek.toLocaleString()}
            </div>
            <p className="font-serif text-paper/80">Per family, per week</p>
          </div>
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-warning mb-2">
              $4-5B
            </div>
            <p className="font-serif text-paper/80">Estimated total cost</p>
            <p className="font-serif text-sm text-paper/50">Over emergency period</p>
          </div>
        </div>

        {/* State Auditor findings */}
        <div className="bg-slate-950 border border-blood-light/30 p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-blood-light text-paper font-mono text-sm px-3 py-1">AUDIT</div>
            <div>
              <h3 className="font-serif text-xl text-paper mb-1">State Auditor's Findings</h3>
              <p className="font-serif text-sm text-paper/50">
                {auditFindings.reportLength} report released {auditFindings.releaseDate}
              </p>
            </div>
          </div>
          <ul className="space-y-3 mb-6">
            {auditFindings.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blood-light mt-1">•</span>
                <span className="font-serif text-paper/80">{finding}</span>
              </li>
            ))}
          </ul>
          <p className="font-serif text-xs text-paper/40">
            Source: State Auditor Diana DiZoglio, May 2025
          </p>
        </div>

        {/* ─── YOUR TAX DOLLARS AT WORK — No-Bid Contract Cards ─── */}
        <h3 className="font-display text-3xl text-warning mb-8">
          YOUR TAX DOLLARS AT WORK
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Spinelli Ravioli */}
          <div className="bg-slate-950 border border-paper/10 hover:border-blood-light/40 transition-colors group">
            <div className="p-6 pb-4">
              <div className="font-mono text-sm text-warning mb-1">
                Spinelli Ravioli Manufacturing Company
              </div>
              <div className="font-mono text-4xl md:text-5xl text-blood-light mb-2">
                $10M
              </div>
              <div className="inline-block font-mono text-[10px] text-paper bg-blood-light/90 px-2 py-0.5 uppercase tracking-widest mb-3">
                NO-BID CONTRACT
              </div>
              <p className="font-serif text-paper/70 text-sm">
                Overpayments of 9.6% on deliveries; contract lasted 8 months
                instead of weeks. East Boston.
              </p>
            </div>
            {/* Outrage math */}
            <div className="border-t border-dashed border-warning/30 bg-warning/[0.04] px-6 py-4">
              <div className="font-mono text-[10px] text-warning uppercase tracking-[3px] mb-2">
                The Math
              </div>
              <div className="font-display text-3xl text-blood-light mb-1">
                9.6% OVERPAYMENT
              </div>
              <div className="font-mono text-xl text-paper mb-2">
                = $960,000 extra
              </div>
              <div className="font-serif text-warning font-bold text-lg">
                For ravioli.
              </div>
            </div>
          </div>

          {/* Card 2: Mercedes Cab / Pilgrim Transit */}
          <div className="bg-slate-950 border border-paper/10 hover:border-blood-light/40 transition-colors group">
            <div className="p-6 pb-4">
              <div className="font-mono text-sm text-warning mb-1">
                Mercedes Cab Company / Pilgrim Transit
              </div>
              <div className="font-mono text-4xl md:text-5xl text-blood-light mb-2">
                $6.8M
              </div>
              <div className="inline-block font-mono text-[10px] text-paper bg-blood-light/90 px-2 py-0.5 uppercase tracking-widest mb-3">
                NO-BID CONTRACT
              </div>
              <p className="font-serif text-paper/70 text-sm">
                Charged $140 for a 223-foot parking lot ride; excessive costs
                throughout. Cape Cod.
              </p>
            </div>
            {/* Outrage math */}
            <div className="border-t border-dashed border-warning/30 bg-warning/[0.04] px-6 py-4">
              <div className="font-mono text-[10px] text-warning uppercase tracking-[3px] mb-2">
                The Math
              </div>
              <div className="font-display text-3xl text-blood-light mb-1">
                $140 FOR 223 FEET
              </div>
              <div className="grid grid-cols-2 gap-3 my-3">
                <div>
                  <div className="font-mono text-[10px] text-paper/40 uppercase">Per foot</div>
                  <div className="font-mono text-xl text-paper">$0.63</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-paper/40 uppercase">Per mile</div>
                  <div className="font-mono text-xl text-paper">$3,326</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-paper/40">Normal cab rate</span>
                <span className="font-mono text-sm text-paper/60">~$3/mile</span>
              </div>
              <div className="font-serif text-warning font-bold text-lg">
                State paid 1,108&times; the normal rate
              </div>
            </div>
          </div>
        </div>

        {/* ─── Scrolling ticker of waste ─── */}
        <div className="relative overflow-hidden border-y border-paper/10 py-3 mb-12 bg-blood-dark/20">
          <div className="font-mono text-[10px] text-warning uppercase tracking-[3px] text-center mb-2">
            Your Tax Dollars at Work
          </div>
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'tickerScroll 30s linear infinite' }}
          >
            {[
              '$140 for a 223-foot ride',
              '$960K in overpaid ravioli',
              '$15,166/mo per shelter family',
              '8-month "emergency" ravioli contract',
              '9.6% markup — nobody noticed',
              '$182K/yr to house one family',
              '$1B+ annual shelter spending',
              '$140 for a 223-foot ride',
              '$960K in overpaid ravioli',
              '$15,166/mo per shelter family',
              '8-month "emergency" ravioli contract',
              '9.6% markup — nobody noticed',
              '$182K/yr to house one family',
              '$1B+ annual shelter spending',
            ].map((item, i) => (
              <span key={i} className="inline-flex items-center mx-6">
                <span className="text-blood-light mr-2">&bull;</span>
                <span className="font-mono text-sm text-paper/70">{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Healey response */}
        <QuoteBlock
          quote={spendingData.quotes[3].quote}
          speaker={spendingData.quotes[3].speaker}
          year="2025"
          variant="highlight"
        />
        <p className="font-serif text-paper/50 text-sm -mt-4 mb-8 pl-6 border-l-4 border-transparent">
          — When asked if she would make changes based on the audit findings
        </p>

        {/* DiZoglio quote */}
        <QuoteBlock
          quote={spendingData.quotes[4].quote}
          speaker={spendingData.quotes[4].speaker}
          source="Official Audit Report"
          year="May 2025"
        />
      </div>
    </section>
  )
}

export default SpendingSection
