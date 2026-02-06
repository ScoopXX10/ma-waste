import { useState, useRef, useEffect } from 'react'
import {
  ComposedChart, Area, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import dataSource from '../data/ma-waste-new-features-data.json'

const afford = dataSource.affordabilityGap
const { keyMetrics, massGovQuote, nationalComparison } = afford

const chartData = afford.historicalData.map(d => ({
  year: d.year,
  price: d.medianHomePrice,
  income: d.medianHouseholdIncome,
  ratio: d.priceToIncomeRatio,
  gap: d.medianHomePrice - d.medianHouseholdIncome,
}))

function GapTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-slate-950 border border-paper/20 p-4">
      <div className="font-mono text-warning text-lg mb-2">{d.year}</div>
      <div className="space-y-1.5">
        <div className="flex justify-between gap-8">
          <span className="font-serif text-sm text-paper/60">Home Price</span>
          <span className="font-mono text-blood-light">
            ${(d.price / 1000).toFixed(0)}K
          </span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="font-serif text-sm text-paper/60">Income</span>
          <span className="font-mono text-[#4169E1]">
            ${(d.income / 1000).toFixed(0)}K
          </span>
        </div>
        <div className="border-t border-paper/10 pt-1.5">
          <div className="flex justify-between gap-8">
            <span className="font-serif text-sm text-paper/60">Ratio</span>
            <span className="font-mono text-warning">{d.ratio.toFixed(2)}x</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="font-serif text-sm text-paper/60">Gap</span>
            <span className="font-mono text-paper/80">
              ${(d.gap / 1000).toFixed(0)}K
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AffordabilityGap() {
  const [inView, setInView] = useState(false)
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
    <section id="affordability" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            THE GAP THAT KEEPS GROWING
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl mb-6">
            Home Prices vs. Income (2000&ndash;2025)
          </p>
          <div className="bg-blood-dark/30 border-l-4 border-warning p-6 max-w-3xl">
            <blockquote className="font-serif text-lg text-paper/90 italic mb-1">
              &ldquo;{massGovQuote.text}&rdquo;
            </blockquote>
            <cite className="font-mono text-sm text-warning not-italic">
              &mdash; {massGovQuote.source}
            </cite>
            <span className="font-mono text-xs text-paper/40 ml-2">
              ({massGovQuote.note})
            </span>
          </div>
        </div>

        {/* Main chart */}
        <div
          ref={ref}
          className={`bg-slate-950 border border-paper/10 p-4 md:p-6 mb-12 transition-opacity duration-1000 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Custom legend */}
          <div className="flex flex-wrap items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-[#DC143C] rounded" />
              <span className="font-serif text-sm text-paper/70">Median Home Price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-[#4169E1] rounded" />
              <span className="font-serif text-sm text-paper/70">
                Median Household Income
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#DC143C]/15 border border-[#DC143C]/30" />
              <span className="font-serif text-sm text-paper/70">The Gap</span>
            </div>
          </div>

          <div className="h-[420px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="affordGapGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DC143C" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#DC143C" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(250,249,246,0.07)"
                />
                <XAxis
                  dataKey="year"
                  stroke="rgba(250,249,246,0.4)"
                  tick={{
                    fill: 'rgba(250,249,246,0.6)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: 12,
                  }}
                />
                <YAxis
                  stroke="rgba(250,249,246,0.4)"
                  tick={{
                    fill: 'rgba(250,249,246,0.6)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: 12,
                  }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  domain={[0, 700000]}
                  ticks={[0, 100000, 200000, 300000, 400000, 500000, 600000, 700000]}
                />
                <Tooltip content={<GapTooltip />} />

                {/* Stacked areas: income base (transparent) + gap (red fill) */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="gap"
                  fill="transparent"
                  stroke="none"
                  legendType="none"
                  tooltipType="none"
                />
                <Area
                  type="monotone"
                  dataKey="gap"
                  stackId="gap"
                  fill="url(#affordGapGrad)"
                  stroke="none"
                  legendType="none"
                  tooltipType="none"
                />

                {/* Price line */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#DC143C"
                  strokeWidth={3}
                  dot={{ fill: '#DC143C', r: 4, strokeWidth: 0 }}
                  activeDot={{
                    r: 7,
                    fill: '#FFD700',
                    stroke: '#DC143C',
                    strokeWidth: 2,
                  }}
                  legendType="none"
                  tooltipType="none"
                />

                {/* Income line */}
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4169E1"
                  strokeWidth={2}
                  dot={{ fill: '#4169E1', r: 3, strokeWidth: 0 }}
                  activeDot={{
                    r: 6,
                    fill: '#FFD700',
                    stroke: '#4169E1',
                    strokeWidth: 2,
                  }}
                  legendType="none"
                  tooltipType="none"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Inline annotations */}
          <div className="flex flex-wrap justify-between mt-2 px-2">
            <div className="font-mono text-xs">
              <span className="text-[#4169E1]">Income: </span>
              <span className="text-paper/50">
                $50K &rarr; $108K{' '}
                <span className="text-[#4169E1]">(+114%)</span>
              </span>
            </div>
            <div className="font-mono text-xs">
              <span className="text-blood-light">Home Price: </span>
              <span className="text-paper/50">
                $185K &rarr; $638K{' '}
                <span className="text-blood-light">(+245%)</span>
              </span>
            </div>
          </div>

          <p className="font-serif text-xs text-paper/40 mt-4">
            Sources: Warren Group, U.S. Census Bureau ACS, Mass.gov Housing Report
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950 border border-blood-light/30 p-6 text-center">
            <div className="font-mono text-5xl md:text-6xl text-blood-light mb-2">
              +{keyMetrics.homePriceChange2000to2025.percentChange}%
            </div>
            <p className="font-serif text-paper/80">Home price increase</p>
            <p className="font-mono text-sm text-paper/50">
              ${(keyMetrics.homePriceChange2000to2025.startPrice / 1000).toFixed(0)}K
              &rarr; ${(keyMetrics.homePriceChange2000to2025.endPrice / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="bg-slate-950 border border-[#4169E1]/30 p-6 text-center">
            <div className="font-mono text-5xl md:text-6xl text-[#4169E1] mb-2">
              +{keyMetrics.incomeChange2000to2025.percentChange}%
            </div>
            <p className="font-serif text-paper/80">Income increase</p>
            <p className="font-mono text-sm text-paper/50">
              ${(keyMetrics.incomeChange2000to2025.startIncome / 1000).toFixed(0)}K
              &rarr; ${(keyMetrics.incomeChange2000to2025.endIncome / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="bg-blood-dark border border-warning/40 p-6 text-center">
            <div className="font-mono text-5xl md:text-6xl text-warning mb-2">
              {keyMetrics.ratioChange.end}x
            </div>
            <p className="font-serif text-paper/80">Price-to-income ratio</p>
            <p className="font-mono text-sm text-paper/50">
              Was {keyMetrics.ratioChange.start}x in 2000
            </p>
          </div>
        </div>

        {/* What the ratio means */}
        <div className="bg-slate-950 border border-paper/10 p-8 mb-12">
          <h3 className="font-display text-2xl text-warning mb-4">
            WHAT 5.91&times; MEANS
          </h3>
          <p className="font-serif text-lg text-paper/80 mb-4">
            A household earning the median income of $108,000 would need to spend
            nearly <span className="text-warning font-mono">6 full years</span> of
            gross pay&mdash;before taxes, food, or anything else&mdash;just to buy
            the median home.
          </p>
          <p className="font-serif text-paper/60">
            The general rule of thumb is that housing is &ldquo;affordable&rdquo;
            at 3&times; income. Massachusetts passed that threshold before 2005 and
            has never returned.
          </p>
        </div>

        {/* National comparison */}
        <div className="bg-slate-950 border border-paper/10 p-8">
          <h3 className="font-display text-2xl text-warning mb-6">
            VS. THE NATIONAL AVERAGE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="font-mono text-4xl text-blood-light mb-1">
                {nationalComparison.maPriceToIncomeRatio}x
              </div>
              <p className="font-serif text-paper/70">Massachusetts</p>
              <p className="font-mono text-xs text-paper/40">
                Price-to-income ratio
              </p>
            </div>
            <div className="text-center">
              <div className="font-mono text-4xl text-paper/40 mb-1">
                {nationalComparison.nationalPriceToIncomeRatio}x
              </div>
              <p className="font-serif text-paper/70">National Average</p>
              <p className="font-mono text-xs text-paper/40">
                Price-to-income ratio
              </p>
            </div>
            <div className="text-center bg-blood-dark/40 p-4 border border-blood-light/30">
              <div className="font-mono text-2xl text-warning mb-1">
                41% WORSE
              </div>
              <p className="font-serif text-sm text-paper/70">
                {nationalComparison.difference}
              </p>
            </div>
          </div>
        </div>

        <p className="font-serif text-xs text-paper/40 mt-8">
          Sources: U.S. Census Bureau ACS, Warren Group, Mass.gov Housing Report,
          National Association of Realtors. Income figures are nominal unless noted.
        </p>
      </div>
    </section>
  )
}

export default AffordabilityGap
