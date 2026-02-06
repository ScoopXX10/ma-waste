import { useState, useRef, useEffect, useMemo } from 'react'
import budgetSource from '../data/ma-waste-new-features-data.json'

const budgetData = budgetSource.budgetBreakdown
const TAXPAYERS = 3_500_000

const COLORS = [
  '#DC143C', '#4169E1', '#FF6B35', '#6B7280', '#3B82F6',
  '#8B9DC3', '#6B8F9C', '#FFD700', '#9CA3AF', '#374151',
]
const SHORT = [
  'MassHealth', 'K-12 Education', 'Pensions', 'Dev. Disabilities',
  'Higher Ed', 'Early Childhood', 'Transportation', 'Shelter Crisis',
  'Mental Health', 'Other Programs',
]

const VW = 950, VH = 480
const SX = 30, SW = 42, DX = 590, DW = 42
const GAP = 4, MIN_H = 10

function fmt(n) {
  return n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : `$${(n / 1e6).toFixed(0)}M`
}
function fmtTp(n) {
  return `$${Math.round(n / TAXPAYERS).toLocaleString()}`
}

function computeLayout(cats) {
  const totalGap = (cats.length - 1) * GAP
  const flowSpace = VH - totalGap

  const items = cats.map((c, i) => ({
    ...c,
    color: COLORS[i],
    short: SHORT[i],
    rawH: (c.percentOfBudget / 100) * flowSpace,
    h: 0,
    dstY: 0,
    srcY: 0,
  }))

  let deficit = 0
  items.forEach(it => {
    if (it.rawH < MIN_H) {
      deficit += MIN_H - it.rawH
      it.h = MIN_H
    } else {
      it.h = it.rawH
    }
  })

  if (deficit > 0) {
    const bigs = items.filter(it => it.rawH >= MIN_H)
    const bigSum = bigs.reduce((s, it) => s + it.h, 0)
    bigs.forEach(it => { it.h -= deficit * (it.h / bigSum) })
  }

  let dy = 0
  items.forEach(it => { it.dstY = dy; dy += it.h + GAP })

  const srcSum = items.reduce((s, it) => s + it.h, 0)
  const srcOff = (VH - srcSum) / 2
  let sy = srcOff
  items.forEach(it => { it.srcY = sy; sy += it.h })

  return { bars: items, srcOffset: srcOff, srcHeight: srcSum }
}

function flowPath(b) {
  const x0 = SX + SW, x1 = DX
  const cx1 = x0 + (x1 - x0) * 0.42
  const cx2 = x0 + (x1 - x0) * 0.58
  return [
    `M${x0},${b.srcY}`,
    `C${cx1},${b.srcY} ${cx2},${b.dstY} ${x1},${b.dstY}`,
    `L${x1},${b.dstY + b.h}`,
    `C${cx2},${b.dstY + b.h} ${cx1},${b.srcY + b.h} ${x0},${b.srcY + b.h}`,
    'Z',
  ].join(' ')
}

function BudgetSankey() {
  const [perTp, setPerTp] = useState(false)
  const [hover, setHover] = useState(null)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(e.target) } },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const { bars, srcOffset, srcHeight } = useMemo(
    () => computeLayout(budgetData.categories), []
  )

  return (
    <section id="budget" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            WHERE YOUR TAX DOLLAR GOES
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl mb-6">
            {budgetData.fiscalYear} Massachusetts Budget &mdash; ${(budgetData.totalBudget / 1e9).toFixed(0)} Billion
          </p>
          <button
            onClick={() => setPerTp(p => !p)}
            className={`font-mono text-sm px-4 py-2 border transition-colors ${
              perTp
                ? 'bg-warning/20 border-warning text-warning'
                : 'border-paper/20 text-paper/60 hover:text-paper hover:border-paper/40'
            }`}
          >
            {perTp ? '\u2190 Total Budget' : 'Show Per Taxpayer \u2192'}
          </button>
          {perTp && (
            <p className="font-mono text-sm text-paper/50 mt-2">
              Based on ~3.5M MA taxpayers &mdash; your annual share:{' '}
              <span className="text-warning">
                ${Math.round(budgetData.totalBudget / TAXPAYERS).toLocaleString()}
              </span>
            </p>
          )}
        </div>

        {/* Desktop Sankey */}
        <div ref={ref} className="hidden md:block relative mb-12">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className={`w-full transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Budget flow diagram showing how Massachusetts tax dollars are allocated"
          >
            <defs>
              {bars.map((b, i) => (
                <linearGradient key={i} id={`bflow-${i}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor={b.color} stopOpacity={0.65} />
                  <stop offset="100%" stopColor={b.color} stopOpacity={0.3} />
                </linearGradient>
              ))}
            </defs>

            {/* Source bar */}
            <rect
              x={SX} y={srcOffset} width={SW} height={srcHeight}
              fill="#8B0000" rx={2}
            />
            <text
              x={SX + SW / 2} y={VH / 2}
              textAnchor="middle" dominantBaseline="central"
              fill="#faf9f6" fontSize="13"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
              transform={`rotate(-90, ${SX + SW / 2}, ${VH / 2})`}
            >
              YOUR TAXES
            </text>

            {/* Flow paths */}
            {bars.map((b, i) => (
              <path
                key={`f${i}`}
                d={flowPath(b)}
                fill={`url(#bflow-${i})`}
                opacity={hover === null ? 0.65 : hover === i ? 1 : 0.1}
                className="cursor-pointer"
                style={{ transition: 'opacity 0.3s' }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            ))}

            {/* Destination bars */}
            {bars.map((b, i) => (
              <rect
                key={`d${i}`}
                x={DX} y={b.dstY} width={DW} height={b.h}
                fill={b.color} rx={1}
                opacity={hover === null ? 1 : hover === i ? 1 : 0.25}
                className="cursor-pointer"
                style={{ transition: 'opacity 0.3s' }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            ))}

            {/* Labels */}
            {bars.map((b, i) => {
              if (b.h < MIN_H) return null
              const showAmt = b.h >= 24
              const cy = b.dstY + b.h / 2
              return (
                <g
                  key={`l${i}`}
                  opacity={hover === null ? 1 : hover === i ? 1 : 0.3}
                  style={{ transition: 'opacity 0.3s' }}
                >
                  <text
                    x={DX + DW + 12}
                    y={showAmt ? cy - 6 : cy}
                    dominantBaseline="central"
                    fill="#faf9f6"
                    fontSize={b.h >= 18 ? 12 : 10}
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  >
                    {b.short}
                  </text>
                  {showAmt && (
                    <text
                      x={DX + DW + 12}
                      y={cy + 8}
                      dominantBaseline="central"
                      fill="rgba(250,249,246,0.5)"
                      fontSize={11}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {perTp ? fmtTp(b.amount) : fmt(b.amount)} ({b.percentOfBudget}%)
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Hover tooltip */}
          {hover !== null && (
            <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-paper/20 p-4 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: bars[hover].color }} />
                <span className="font-serif text-paper">{bars[hover].name}</span>
              </div>
              <div className="font-mono text-2xl text-warning mb-1">
                {perTp ? `${fmtTp(bars[hover].amount)}/yr` : fmt(bars[hover].amount)}
              </div>
              <div className="font-mono text-sm text-paper/60 mb-2">
                {bars[hover].percentOfBudget}% of budget
              </div>
              {bars[hover].note && (
                <p className="font-serif text-sm text-paper/70">{bars[hover].note}</p>
              )}
              {bars[hover].yearOverYearChange && (
                <p className="font-mono text-xs text-blood-light mt-1">
                  {bars[hover].yearOverYearChange}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Mobile: horizontal bars */}
        <div className="md:hidden space-y-3 mb-12">
          {bars.map((b, i) => (
            <button
              key={i}
              onClick={() => setHover(hover === i ? null : i)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-sm text-paper/80">{b.short}</span>
                <span className="font-mono text-sm text-paper/60">
                  {perTp ? fmtTp(b.amount) : fmt(b.amount)}
                </span>
              </div>
              <div className="h-6 bg-paper/5 relative overflow-hidden">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: inView ? `${Math.max(b.percentOfBudget, 2)}%` : '0%',
                    backgroundColor: b.color,
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs text-paper/70">
                  {b.percentOfBudget}%
                </span>
              </div>
              {hover === i && b.note && (
                <p className="font-serif text-xs text-paper/50 mt-1 animate-fade-in">
                  {b.note}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Callout cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-[#DC143C]/40 bg-[#DC143C]/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#DC143C]" />
              <span className="font-mono text-xs text-[#DC143C] uppercase tracking-wider">
                MassHealth
              </span>
            </div>
            <div className="font-mono text-3xl text-paper mb-2">
              {perTp ? fmtTp(22_100_000_000) : '$22.1B'}
            </div>
            <div className="font-serif text-lg text-paper/80 mb-2">
              36.2% of entire budget
            </div>
            <p className="font-serif text-sm text-paper/60">
              62% of the spending increase goes to MassHealth alone. Up $2B from FY2025.
            </p>
          </div>

          <div className="border border-[#FF6B35]/40 bg-[#FF6B35]/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-xs text-[#FF6B35] uppercase tracking-wider">
                Pensions
              </span>
            </div>
            <div className="font-mono text-3xl text-paper mb-2">
              {perTp ? fmtTp(4_933_000_000) : '$4.9B'}
            </div>
            <div className="font-serif text-lg text-paper/80 mb-2">
              $42.3B unfunded liability
            </div>
            <p className="font-serif text-sm text-paper/60">
              Only 65% funded. Paying $4.9B/year just to chip away at a $42.3 billion hole.
            </p>
          </div>

          <div className="border border-[#FFD700]/40 bg-[#FFD700]/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
              <span className="font-mono text-xs text-[#FFD700] uppercase tracking-wider">
                Shelter Crisis
              </span>
            </div>
            <div className="font-mono text-3xl text-paper mb-2">
              {perTp ? fmtTp(1_000_000_000) : '$1.0B'}
            </div>
            <div className="font-serif text-lg text-paper/80 mb-2">
              $15,166/month per family
            </div>
            <p className="font-serif text-sm text-paper/60">
              This $1B could fund 13,000 teacher salaries or fix 2,000 miles of road.
            </p>
          </div>
        </div>

        {/* Key facts */}
        <div className="bg-blood-dark/20 border border-paper/10 p-8">
          <h3 className="font-display text-2xl text-warning mb-6">THE NUMBERS DON&rsquo;T LIE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetData.keyFacts.map((fact, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-blood-light mt-0.5">&bull;</span>
                <span className="font-serif text-paper/80">{fact}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-serif text-xs text-paper/40 mt-8">
          Source: {budgetData.source}. Per-taxpayer calculations based on approximately
          3.5 million MA income tax filers.
        </p>
      </div>
    </section>
  )
}

export default BudgetSankey
