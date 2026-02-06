import { useState, useRef, useEffect } from 'react'
import dataSource from '../data/ma-waste-new-features-data.json'

const comp = dataSource.stateComparison
const { disposableIncome, verdict, assumptions } = comp.annualizedComparison

const STATES = [
  { key: 'massachusetts', label: 'Massachusetts', abbr: 'MA', flag: true },
  { key: 'newHampshire', label: 'New Hampshire', abbr: 'NH' },
  { key: 'florida', label: 'Florida', abbr: 'FL' },
  { key: 'texas', label: 'Texas', abbr: 'TX' },
]

const bars = STATES.map(s => {
  const st = comp.states[s.key]
  const di = disposableIncome[s.key]
  const taxes = st.federalTax + st.stateTax + st.fica
  return {
    ...s,
    stateTax: st.stateTax,
    stateTaxNote: st.stateTaxNote,
    taxes,
    housing: di.housing,
    energy: di.energy,
    remaining: di.remaining,
    advantage: s.key !== 'massachusetts'
      ? di.remaining - disposableIncome.massachusetts.remaining
      : 0,
  }
})

const SEGS = [
  { key: 'taxes', label: 'Taxes', color: '#DC143C' },
  { key: 'housing', label: 'Housing', color: '#4169E1' },
  { key: 'energy', label: 'Energy', color: '#EAB308' },
  { key: 'remaining', label: 'What You Keep', color: '#16a34a' },
]

function StateComparison() {
  const [inView, setInView] = useState(false)
  const [hover, setHover] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.unobserve(e.target) }
      },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="state-comparison" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            WHAT $100K BUYS YOU
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl mb-2">
            {comp.annualizedComparison.description}
          </p>
          <p className="font-mono text-sm text-paper/40">
            Housing = {assumptions.housingCost} &middot; {assumptions.energyCost} &middot; {assumptions.otherCosts}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mb-8">
          {SEGS.map(seg => (
            <div key={seg.key} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: seg.color, opacity: seg.key === 'remaining' ? 1 : 0.85 }}
              />
              <span className="font-serif text-sm text-paper/70">{seg.label}</span>
            </div>
          ))}
        </div>

        {/* Stacked bars */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {bars.map((bar, i) => {
            const active = hover === i
            return (
              <div
                key={bar.key}
                className="flex flex-col items-center"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {/* State header */}
                <div className="text-center mb-3">
                  <div
                    className={`font-display text-2xl ${
                      bar.flag ? 'text-blood-light' : 'text-paper'
                    }`}
                  >
                    {bar.abbr}
                  </div>
                  <div className="font-serif text-xs text-paper/50">{bar.label}</div>
                  <div className="font-mono text-[10px] text-paper/30 mt-0.5">
                    {bar.stateTaxNote}
                  </div>
                </div>

                {/* Bar */}
                <div
                  className={`w-full h-[300px] md:h-[380px] relative flex flex-col cursor-pointer border transition-colors duration-300 ${
                    bar.flag
                      ? 'border-blood-light/40'
                      : active
                      ? 'border-warning/50'
                      : 'border-paper/10'
                  }`}
                >
                  {SEGS.map((seg, si) => {
                    const pct = (bar[seg.key] / 100000) * 100
                    return (
                      <div
                        key={seg.key}
                        className="relative flex items-center justify-center overflow-hidden transition-all duration-700"
                        style={{
                          height: inView ? `${pct}%` : '0%',
                          backgroundColor: seg.color,
                          opacity: seg.key === 'remaining' ? 1 : 0.8,
                          transitionDelay: `${si * 120 + i * 80}ms`,
                        }}
                      >
                        {pct >= 6 && (
                          <span className="font-mono text-[11px] text-white/90 text-center leading-tight drop-shadow-sm">
                            ${(bar[seg.key] / 1000).toFixed(1)}k
                          </span>
                        )}
                      </div>
                    )
                  })}

                  {/* MA reference line across non-MA bars */}
                  {!bar.flag && inView && (
                    <div
                      className="absolute left-0 right-0 border-t border-dashed border-blood-light/50 pointer-events-none"
                      style={{
                        bottom: `${(disposableIncome.massachusetts.remaining / 100000) * 100}%`,
                      }}
                    />
                  )}
                </div>

                {/* Remaining callout */}
                <div className="mt-3 text-center">
                  <div
                    className={`font-mono text-xl md:text-2xl ${
                      bar.flag ? 'text-blood-light' : 'text-green-400'
                    }`}
                  >
                    ${bar.remaining.toLocaleString()}
                  </div>
                  <div className="font-serif text-xs text-paper/50">remaining</div>
                  {bar.advantage > 0 && (
                    <div className="font-mono text-sm text-warning mt-1">
                      +${bar.advantage.toLocaleString()}/yr vs MA
                    </div>
                  )}
                  {bar.flag && (
                    <div className="font-mono text-xs text-blood-light/60 mt-1">
                      LOWEST
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Hover detail panel */}
        {hover !== null && (
          <div className="bg-slate-900/90 backdrop-blur-sm border border-paper/15 p-5 mb-8 animate-fade-in">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <span className="font-display text-xl text-warning">
                  {bars[hover].label}
                </span>
                <span className="font-mono text-sm text-paper/40 ml-3">
                  $100,000 gross salary
                </span>
              </div>
              {bars[hover].advantage > 0 && (
                <div className="font-mono text-lg text-warning">
                  +${bars[hover].advantage.toLocaleString()}/yr vs MA
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {SEGS.map(seg => (
                <div key={seg.key} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <div>
                    <span className="font-mono text-sm text-paper">
                      ${bars[hover][seg.key].toLocaleString()}
                    </span>
                    <span className="font-serif text-xs text-paper/40 ml-1.5">
                      {seg.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verdict */}
        <div className="bg-blood-dark border border-blood-light/30 p-8 mb-12 text-center">
          <p className="font-serif text-xl md:text-2xl text-paper/90 mb-6">
            {verdict.headline}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="font-mono text-3xl text-warning mb-1">
                +${verdict.nhAdvantage.toLocaleString()}
              </div>
              <p className="font-serif text-paper/60">per year in New Hampshire</p>
            </div>
            <div>
              <div className="font-mono text-3xl text-warning mb-1">
                +${verdict.floridaAdvantage.toLocaleString()}
              </div>
              <p className="font-serif text-paper/60">per year in Florida</p>
            </div>
            <div>
              <div className="font-mono text-3xl text-warning mb-1">
                +${verdict.texasAdvantage.toLocaleString()}
              </div>
              <p className="font-serif text-paper/60">per year in Texas</p>
            </div>
          </div>
        </div>

        {/* Compact breakdown table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-paper/20">
                <th className="font-serif text-sm text-paper/50 py-3 pr-4">Category</th>
                {bars.map(b => (
                  <th
                    key={b.key}
                    className={`font-mono text-sm py-3 px-2 text-center ${
                      b.flag ? 'text-blood-light' : 'text-paper/70'
                    }`}
                  >
                    {b.abbr}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              <tr className="border-b border-paper/10">
                <td className="font-serif text-paper/60 py-2 pr-4">Federal Tax</td>
                {bars.map(b => (
                  <td key={b.key} className="text-center text-paper/50 py-2 px-2">
                    -$14,439
                  </td>
                ))}
              </tr>
              <tr className="border-b border-paper/10">
                <td className="font-serif text-paper/60 py-2 pr-4">State Tax</td>
                {bars.map(b => (
                  <td
                    key={b.key}
                    className={`text-center py-2 px-2 ${
                      b.stateTax > 0 ? 'text-blood-light' : 'text-green-400'
                    }`}
                  >
                    {b.stateTax > 0 ? `-$${b.stateTax.toLocaleString()}` : '$0'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-paper/10">
                <td className="font-serif text-paper/60 py-2 pr-4">FICA</td>
                {bars.map(b => (
                  <td key={b.key} className="text-center text-paper/50 py-2 px-2">
                    -$7,650
                  </td>
                ))}
              </tr>
              <tr className="border-b border-paper/10">
                <td className="font-serif text-paper/60 py-2 pr-4">Housing</td>
                {bars.map(b => (
                  <td
                    key={b.key}
                    className={`text-center py-2 px-2 ${
                      b.flag ? 'text-blood-light' : 'text-paper/60'
                    }`}
                  >
                    -${b.housing.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-paper/10">
                <td className="font-serif text-paper/60 py-2 pr-4">Energy</td>
                {bars.map(b => (
                  <td
                    key={b.key}
                    className={`text-center py-2 px-2 ${
                      b.flag ? 'text-blood-light' : 'text-paper/60'
                    }`}
                  >
                    -${b.energy.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-t-2 border-paper/20">
                <td className="font-serif text-paper py-3 pr-4 font-semibold">
                  Remaining
                </td>
                {bars.map(b => (
                  <td
                    key={b.key}
                    className={`text-center py-3 px-2 font-bold ${
                      b.flag ? 'text-blood-light' : 'text-green-400'
                    }`}
                  >
                    ${b.remaining.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-serif text-xs text-paper/40">
          Based on $100,000 gross salary. Housing = 28% of gross income. Energy costs
          based on state average rates. Federal tax assumes single filer, standard
          deduction. Sources: EIA, U.S. Census Bureau, Tax Foundation.
        </p>
      </div>
    </section>
  )
}

export default StateComparison
