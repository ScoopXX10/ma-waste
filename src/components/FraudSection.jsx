import { useState, useRef, useEffect } from 'react'
import fraudData from '../data/ma-fraud-mismanagement.json'

const snap = fraudData.snapFraud
const unemp = fraudData.unemploymentFraud
const pattern = fraudData.patternOfMismanagement

function StatBox({ val, label, sub, highlight }) {
  return (
    <div
      className={`border p-5 text-center ${
        highlight ? 'border-warning/50 bg-warning/5' : 'border-paper/10'
      }`}
    >
      <div
        className={`font-mono text-3xl md:text-4xl mb-1 ${
          highlight ? 'text-warning' : 'text-blood-light'
        }`}
      >
        {val}
      </div>
      <p className="font-serif text-sm text-paper/80">{label}</p>
      <p className="font-mono text-xs text-paper/40 mt-0.5">{sub}</p>
    </div>
  )
}

function CaseCard({ number, title, date, location, children, expanded, onToggle }) {
  return (
    <div className="mb-6 border border-paper/10">
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 hover:bg-paper/[0.02] transition-colors"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-mono text-xs bg-blood-light text-paper px-2 py-0.5">
              CASE #{number}
            </span>
            {date && (
              <span className="font-mono text-xs text-paper/40">{date}</span>
            )}
            {location && (
              <span className="font-mono text-xs text-paper/30">{location}</span>
            )}
          </div>
          <h3 className="font-display text-xl md:text-2xl text-paper">{title}</h3>
        </div>
        <span
          className={`font-mono text-paper/40 text-xl flex-shrink-0 transition-transform duration-300 ${
            expanded ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-[1400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 md:px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  )
}

function TimelineStep({ year, text, highlight }) {
  return (
    <div className="relative">
      <div
        className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full ${
          highlight ? 'bg-blood-light' : 'bg-paper/30'
        }`}
      />
      <span
        className={`font-mono text-sm ${
          highlight ? 'text-blood-light' : 'text-paper/50'
        }`}
      >
        {year}
      </span>
      <p
        className={`font-serif text-sm ${
          highlight ? 'text-paper' : 'text-paper/70'
        }`}
      >
        {text}
      </p>
    </div>
  )
}

function QuoteBox({ text, speaker, label, variant }) {
  const border =
    variant === 'warning' ? 'border-warning' : 'border-blood-light/50'
  const labelClr =
    variant === 'warning' ? 'text-warning' : 'text-blood-light/70'
  return (
    <div className={`border-l-4 ${border} bg-blood-dark/20 p-5`}>
      {label && (
        <div
          className={`font-mono text-[10px] uppercase tracking-wider mb-2 ${labelClr}`}
        >
          {label}
        </div>
      )}
      <blockquote className="font-serif text-paper/90 italic mb-2">
        &ldquo;{text}&rdquo;
      </blockquote>
      <cite className="font-mono text-xs text-paper/50 not-italic">
        &mdash; {speaker}
      </cite>
    </div>
  )
}

function FraudSection() {
  const [expanded, setExpanded] = useState({})
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.unobserve(e.target)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="fraud" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            THE FRAUD FILES
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            Billions lost to fraud, waste, and mismanagement. A pattern
            of failure no one is held accountable for.
          </p>
        </div>

        {/* Hero stats */}
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-opacity duration-1000 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <StatBox val="$2.1B" label="Owed to feds" sub="Unemployment mistake" />
          <StatBox val="$7M" label="SNAP trafficking" sub="One 150-sqft store" />
          <StatBox
            val="$11.9M"
            label="Annual fraud found"
            sub="FY2025 — BSI report"
          />
          <StatBox
            val="$0"
            label="Accountability"
            sub="No officials fired"
            highlight
          />
        </div>

        {/* ─── CASE 1: SNAP Trafficking ─── */}
        <CaseCard
          number="01"
          title="$7M SNAP TRAFFICKING SCHEME"
          date={snap.mainCase.date}
          location={snap.mainCase.location}
          expanded={expanded.snap}
          onToggle={() => toggle('snap')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Store details */}
            <div>
              <h4 className="font-mono text-sm text-warning mb-3 uppercase tracking-wider">
                The Store
              </h4>
              <div className="font-mono text-5xl text-paper mb-1">
                150{' '}
                <span className="text-xl text-paper/50">sq ft</span>
              </div>
              <p className="font-serif text-paper/70 mb-4">
                Processed{' '}
                <span className="text-blood-light font-mono">$6.9 million</span>{' '}
                in SNAP benefits over 3 years
              </p>
              <div className="space-y-1.5">
                {snap.mainCase.storeDetails.redFlags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-blood-light mt-0.5 text-sm">&#10005;</span>
                    <span className="font-serif text-sm text-paper/70">{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly redemptions */}
            <div>
              <h4 className="font-mono text-sm text-warning mb-3 uppercase tracking-wider">
                Monthly Redemptions
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-xs text-paper/50">
                      Oct 2023
                    </span>
                    <span className="font-mono text-sm text-paper/70">
                      $6,467
                    </span>
                  </div>
                  <div className="h-5 bg-paper/5 overflow-hidden">
                    <div
                      className="h-full bg-paper/30 transition-all duration-1000"
                      style={{ width: inView ? '1.2%' : '0%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-xs text-paper/50">
                      Aug 2024 (peak)
                    </span>
                    <span className="font-mono text-sm text-blood-light">
                      $540,870
                    </span>
                  </div>
                  <div className="h-5 bg-paper/5 overflow-hidden">
                    <div
                      className="h-full bg-blood-light transition-all duration-1000"
                      style={{
                        width: inView ? '100%' : '0%',
                        transitionDelay: '300ms',
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-warning">
                    83&times; increase
                  </span>
                  <span className="font-serif text-xs text-paper/40">
                    &mdash; and nobody noticed
                  </span>
                </div>
              </div>

              <div className="mt-5 bg-slate-900 border border-paper/10 p-3">
                <p className="font-serif text-sm text-paper/60">
                  <span className="text-warning font-mono">How it worked:</span>{' '}
                  {snap.mainCase.howItWorked}
                </p>
              </div>
            </div>
          </div>

          {/* Oversight failures */}
          <div className="bg-blood-dark/30 border border-blood-light/30 p-5 mb-6">
            <h4 className="font-mono text-sm text-blood-light mb-3 uppercase tracking-wider">
              Oversight Failures
            </h4>
            <div className="space-y-2">
              {snap.mainCase.oversightFailures.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-warning mt-0.5 font-mono text-sm">!</span>
                  <span className="font-serif text-sm text-paper/80">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <QuoteBox
            text={snap.quotes.usAttorney.text}
            speaker={snap.quotes.usAttorney.speaker}
          />
        </CaseCard>

        {/* ─── CASE 2: Identity Theft Ring ─── */}
        <CaseCard
          number="02"
          title="$1.1M IDENTITY FRAUD RING"
          date={snap.identityTheftCase.date}
          expanded={expanded.identity}
          onToggle={() => toggle('identity')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900 border border-paper/10 p-4 text-center">
              <div className="font-mono text-4xl text-blood-light mb-1">100+</div>
              <p className="font-serif text-sm text-paper/70">
                Stolen identities
              </p>
            </div>
            <div className="bg-slate-900 border border-paper/10 p-4 text-center">
              <div className="font-mono text-4xl text-warning mb-1">7</div>
              <p className="font-serif text-sm text-paper/70">
                States targeted
              </p>
            </div>
            <div className="bg-slate-900 border border-paper/10 p-4 text-center">
              <div className="font-mono text-4xl text-paper mb-1">$1.1M</div>
              <p className="font-serif text-sm text-paper/70">
                Total fraud (SNAP + PUA)
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <p className="font-serif text-paper/70">
              Identities stolen from residents of{' '}
              {snap.identityTheftCase.scheme.identitySourceStates.join(', ')}.
              Used to file fraudulent SNAP applications in Massachusetts and
              Rhode Island, plus unemployment claims in 6 states.
            </p>
            <div className="bg-slate-900 border border-paper/10 p-4">
              <p className="font-serif text-sm text-paper/70">
                <span className="text-warning font-mono">Detection: </span>
                {snap.identityTheftCase.detection}
              </p>
            </div>
            <div className="bg-slate-900 border border-paper/10 p-4">
              <p className="font-serif text-sm text-paper/70">
                <span className="text-warning font-mono">Evidence: </span>
                {snap.identityTheftCase.evidence}
              </p>
            </div>
          </div>
        </CaseCard>

        {/* ─── CASE 3: $2.1B Unemployment Mistake ─── */}
        <CaseCard
          number="03"
          title='THE $2.1 BILLION "OOPS"'
          date="2020 &ndash; 2025"
          expanded={expanded.ui}
          onToggle={() => toggle('ui')}
        >
          <p className="font-serif text-paper/80 mb-6">
            {unemp.bilionDollarMistake.cause}. The error went undetected for
            years.
          </p>

          {/* Mini timeline */}
          <div className="relative pl-8 border-l-2 border-blood-light/30 space-y-6 mb-8">
            <TimelineStep
              year="2020"
              text="Pandemic unemployment programs begin"
            />
            <TimelineStep
              year="2020-22"
              text="Baker admin uses wrong federal funding source for state UI benefits"
              highlight
            />
            <TimelineStep
              year="2022"
              text="State sells $2.7B in bonds to repay federal Treasury loans"
            />
            <TimelineStep
              year="2023"
              text="Healey administration discovers $2.5B accounting error"
              highlight
            />
            <TimelineStep
              year="Dec 2025"
              text="Settlement: $2.1B repayment to feds over 10 years"
              highlight
            />
            <TimelineStep
              year="2025+"
              text="Employers pay through UI tax surcharges — up to $3B"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900 border border-paper/10 p-4 text-center">
              <div className="font-mono text-[10px] text-paper/40 mb-1 uppercase">
                Original Error
              </div>
              <div className="font-mono text-3xl text-paper/60">$2.5B</div>
            </div>
            <div className="bg-slate-900 border border-blood-light/30 p-4 text-center">
              <div className="font-mono text-[10px] text-paper/40 mb-1 uppercase">
                With Penalties
              </div>
              <div className="font-mono text-3xl text-blood-light">$3.0B+</div>
            </div>
            <div className="bg-blood-dark border border-warning/40 p-4 text-center">
              <div className="font-mono text-[10px] text-paper/40 mb-1 uppercase">
                Settlement
              </div>
              <div className="font-mono text-3xl text-warning">$2.1B</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-paper/10 p-4 mb-6">
            <p className="font-serif text-sm text-paper/60">
              <span className="text-warning font-mono">Who pays: </span>
              Massachusetts employers, through the Unemployment Insurance Trust
              Fund. The trust fund is expected to be{' '}
              <span className="text-blood-light">
                hundreds of millions in the red by 2028
              </span>
              .
            </p>
          </div>

          <QuoteBox
            text={unemp.quotes.nfib.text}
            speaker={unemp.quotes.nfib.speaker}
          />
        </CaseCard>

        {/* ─── Pattern of Mismanagement ─── */}
        <div className="bg-blood-dark/20 border border-paper/10 p-8 mb-12">
          <h3 className="font-display text-3xl text-warning mb-6">
            A PATTERN OF FAILURE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {pattern.commonThemes.map((theme, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-blood-light text-sm mt-0.5">
                  {i + 1}.
                </span>
                <span className="font-serif text-paper/80">{theme}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-paper/10 pt-4">
            <p className="font-mono text-xs text-paper/40">
              {pattern.totalWaste.note}
            </p>
          </div>
        </div>

        {/* ─── Dueling quotes ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <QuoteBox
            text={fraudData.politicalContext.healeyDefense.onSnapFraud}
            speaker="Governor Maura Healey"
            label="THE GOVERNOR SAYS"
          />
          <QuoteBox
            text={snap.quotes.usda.text}
            speaker={snap.quotes.usda.speaker}
            label="THE FEDS SAY"
            variant="warning"
          />
        </div>

        {/* ─── Closing ─── */}
        <div className="text-center py-12 border-t border-b border-paper/10">
          <p className="font-serif text-xl md:text-2xl text-paper/80 italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;In Massachusetts, fraud is detected by accident.
            <br />
            Mistakes cost billions.
            <br />
            And the only people who pay are you.&rdquo;
          </p>
        </div>

        <p className="font-serif text-xs text-paper/40 mt-8">
          Sources: U.S. Attorney&rsquo;s Office District of Massachusetts, USDA
          Office of Inspector General, Massachusetts State Auditor, Government
          Accountability Office, Massachusetts Bureau of Special Investigations.
        </p>
      </div>
    </section>
  )
}

export default FraudSection
