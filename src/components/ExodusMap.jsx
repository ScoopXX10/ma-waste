import { useState, useRef, useEffect } from 'react'
import dataSource from '../data/ma-waste-new-features-data.json'

const exodus = dataSource.exodusFlows
const { incomeProfile, aggregateStats } = exodus

const MA = { x: 862, y: 155 }

const POS = {
  'New Hampshire': { x: 875, y: 108, cpx: 838, cpy: 125, abbr: 'NH' },
  'Florida':       { x: 742, y: 432, cpx: 655, cpy: 215, abbr: 'FL' },
  'Texas':         { x: 488, y: 388, cpx: 585, cpy: 72,  abbr: 'TX' },
  'South Carolina':{ x: 722, y: 318, cpx: 682, cpy: 178, abbr: 'SC' },
  'Maine':         { x: 897, y: 78,  cpx: 907, cpy: 112, abbr: 'ME' },
  'North Carolina':{ x: 737, y: 278, cpx: 698, cpy: 158, abbr: 'NC' },
}

const dests = exodus.topDestinations.map(d => ({
  ...d,
  ...POS[d.state],
  sw: d.netMigration2015to2023 >= 90000 ? 5 : d.netMigration2015to2023 >= 25000 ? 3.5 : 2,
}))

const byAgi = [...dests].sort((a, b) => b.agiLoss - a.agiLoss)
const maxAgi = Math.max(...dests.map(d => d.agiLoss))

const US = 'M100,82 L68,168 L55,295 L110,365 L190,405 L305,420 L435,432 L505,452 L570,442 L622,432 L680,422 L732,450 L745,472 L772,422 L762,342 L782,292 L822,242 L852,212 L867,182 L875,162 L885,142 L902,102 L912,72 L872,72 L832,82 L762,102 L702,92 L652,82 L582,72 L502,62 L402,52 L302,48 L202,52 Z'

function fmt(n) {
  return n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : `$${(n / 1e6).toFixed(0)}M`
}

function ExodusMap() {
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

  const hd = hover !== null ? dests[hover] : null

  return (
    <section className="py-20 bg-slate-950">
      <style>{`
        @keyframes flowDash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -20; }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.55; }
        }
      `}</style>

      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="font-display text-4xl md:text-6xl text-blood-light mb-3">
            WHERE THE WEALTH IS FLOWING
          </h3>
          <p className="font-mono text-lg text-warning">
            ${(aggregateStats.totalAGILoss / 1e9).toFixed(1)} Billion in AGI Lost (2010&ndash;2024)
          </p>
          <p className="font-serif text-paper/50 mt-2">
            Hover a state to see the full picture
          </p>
        </div>

        {/* IntersectionObserver anchor */}
        <div ref={ref} />

        {/* Desktop SVG map */}
        <div className="hidden md:block relative mb-12">
          <svg
            viewBox="0 0 960 520"
            className={`w-full transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Map showing wealth migration flows from Massachusetts to other states"
          >
            {/* US silhouette */}
            <path d={US} fill="rgba(250,249,246,0.03)" stroke="rgba(250,249,246,0.08)" strokeWidth="1" />

            {/* Invisible wide hit areas for arcs */}
            {dests.map((d, i) => (
              <path
                key={`hit-${i}`}
                d={`M${MA.x},${MA.y} Q${d.cpx},${d.cpy} ${d.x},${d.y}`}
                fill="none"
                stroke="transparent"
                strokeWidth="16"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer"
              />
            ))}

            {/* Visible flow arcs */}
            {dests.map((d, i) => (
              <path
                key={`arc-${i}`}
                d={`M${MA.x},${MA.y} Q${d.cpx},${d.cpy} ${d.x},${d.y}`}
                fill="none"
                stroke="#DC143C"
                strokeWidth={hover === i ? d.sw + 2 : d.sw}
                strokeDasharray="12 8"
                strokeLinecap="round"
                opacity={hover === null ? 0.55 : hover === i ? 0.95 : 0.12}
                style={{
                  animation: inView ? 'flowDash 1.5s linear infinite' : 'none',
                  animationDelay: `${i * 0.15}s`,
                  transition: 'opacity 0.3s, stroke-width 0.3s',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* MA source — layered glow */}
            <circle cx={MA.x} cy={MA.y} r="20" fill="#DC143C" opacity="0.1" />
            <circle cx={MA.x} cy={MA.y} r="14" fill="#DC143C" opacity="0.2"
              style={{ animation: inView ? 'pulseFade 2.5s ease-in-out infinite' : 'none' }}
            />
            <circle cx={MA.x} cy={MA.y} r="7" fill="#DC143C" />
            <text
              x={MA.x - 28} y={MA.y - 16}
              fill="#DC143C" fontSize="12"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
            >
              MA
            </text>

            {/* Destination markers + labels */}
            {dests.map((d, i) => {
              const active = hover === i
              const dimmed = hover !== null && hover !== i
              return (
                <g
                  key={`dest-${i}`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                  opacity={dimmed ? 0.25 : 1}
                  style={{ transition: 'opacity 0.3s' }}
                >
                  {/* Glow ring when active */}
                  {active && (
                    <circle cx={d.x} cy={d.y} r="14" fill="#FFD700" opacity="0.15" />
                  )}
                  <circle
                    cx={d.x} cy={d.y}
                    r={active ? 6 : 4}
                    fill={active ? '#FFD700' : '#faf9f6'}
                    style={{ transition: 'fill 0.3s' }}
                  />
                  <text
                    x={d.x} y={d.y - 14}
                    textAnchor="middle"
                    fill={active ? '#FFD700' : 'rgba(250,249,246,0.8)'}
                    fontSize="12"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", transition: 'fill 0.3s' }}
                  >
                    {d.abbr}
                  </text>
                  <text
                    x={d.x} y={d.y + 22}
                    textAnchor="middle"
                    fill="#FFD700"
                    fontSize="10"
                    opacity={active ? 1 : 0.7}
                    style={{ fontFamily: "'JetBrains Mono', monospace", transition: 'opacity 0.3s' }}
                  >
                    {fmt(d.agiLoss)}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Tooltip */}
          {hd && (
            <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-paper/20 p-5 max-w-xs z-10">
              <div className="font-display text-xl text-warning mb-3">{hd.state}</div>
              <div className="space-y-2">
                <div>
                  <span className="font-mono text-2xl text-blood-light">
                    {hd.netMigration2015to2023.toLocaleString()}
                  </span>
                  <span className="font-serif text-sm text-paper/60 ml-2">
                    people left for {hd.abbr}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-2xl text-warning">{fmt(hd.agiLoss)}</span>
                  <span className="font-serif text-sm text-paper/60 ml-2">in wealth lost</span>
                </div>
                <div className="font-serif text-sm text-paper/60">
                  Avg leaver income:{' '}
                  <span className="text-paper font-mono">
                    ${hd.averageIncomeLeavers.toLocaleString()}
                  </span>
                </div>
                {hd.distance && (
                  <div className="font-mono text-xs text-paper/40">{hd.distance}</div>
                )}
                <div className="font-serif text-sm text-paper/50 mt-2 pt-2 border-t border-paper/10">
                  Why: {hd.reason}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: ranked list */}
        <div className="md:hidden space-y-4 mb-12">
          {byAgi.map((d, i) => (
            <button
              key={d.state}
              onClick={() => setHover(hover === dests.indexOf(d) ? null : dests.indexOf(d))}
              className="w-full text-left border border-paper/10 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl text-warning">#{i + 1}</span>
                  <span className="font-serif text-lg text-paper">{d.state}</span>
                </div>
                <span className="font-mono text-blood-light">{fmt(d.agiLoss)}</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="font-mono text-sm text-paper/60">
                  {d.netMigration2015to2023.toLocaleString()} people
                </span>
                <span className="font-mono text-sm text-paper/40">
                  avg ${d.averageIncomeLeavers.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-paper/5 overflow-hidden">
                <div
                  className="h-full bg-blood-light transition-all duration-700"
                  style={{
                    width: inView ? `${(d.agiLoss / maxAgi) * 100}%` : '0%',
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              </div>
              <p className="font-serif text-xs text-paper/40 mt-1">{d.reason}</p>
            </button>
          ))}
        </div>

        {/* Income profile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-950 border border-blood-light/30 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-blood-light mb-2">
              ${incomeProfile.leaversMedianIncome.toLocaleString()}
            </div>
            <p className="font-serif text-paper/80">Median income of</p>
            <p className="font-display text-xl text-paper">LEAVERS</p>
          </div>
          <div className="bg-slate-950 border border-paper/20 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-paper/60 mb-2">
              ${incomeProfile.arriverMedianIncome.toLocaleString()}
            </div>
            <p className="font-serif text-paper/80">Median income of</p>
            <p className="font-display text-xl text-paper">ARRIVERS</p>
          </div>
          <div className="bg-blood-dark border border-warning/40 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-warning mb-2">
              ${incomeProfile.incomeGap.toLocaleString()}
            </div>
            <p className="font-serif text-paper/80">Income gap</p>
            <p className="font-display text-xl text-warning">PER PERSON</p>
          </div>
        </div>

        <p className="font-serif text-lg text-paper/70 text-center italic mb-8">
          &ldquo;High earners leave. Low earners arrive. The tax base erodes.&rdquo;
        </p>

        {/* Quote */}
        <div className="bg-blood-dark/30 border-l-4 border-warning p-6">
          <blockquote className="font-serif text-lg text-paper/90 italic mb-2">
            &ldquo;{exodus.quote.text}&rdquo;
          </blockquote>
          <cite className="font-mono text-sm text-warning not-italic">
            &mdash; {exodus.quote.source}
          </cite>
        </div>

        <p className="font-serif text-xs text-paper/40 mt-8">
          Sources: IRS Statistics of Income Migration Data, U.S. Census Bureau, Pioneer Institute.
          Migration data covers 2015&ndash;2023 tax returns.
        </p>
      </div>
    </section>
  )
}

export default ExodusMap
