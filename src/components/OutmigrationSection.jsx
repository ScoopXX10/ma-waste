import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts'
import outmigrationData from '../data/ma-outmigration-data.json'
import StatCard from './StatCard'
import QuoteBlock from './QuoteBlock'

// Full historical data for area chart (2010-2025)
const chartData = Object.entries(outmigrationData.netDomesticMigrationByYear.byYear).map(
  ([year, data]) => ({
    year,
    loss: Math.abs(data.netMigration),
    governor: data.governor,
    note: data.note || null,
  })
)

// Census Bureau data 2020-2025 for bar chart
const censusData = [
  { year: '2020', loss: 41000 },
  { year: '2021', loss: 48000 },
  { year: '2022', loss: 54843, isPeak: true },
  { year: '2023', loss: 36572 },
  { year: '2024', loss: 27480 },
  { year: '2025', loss: 33340, isCurrent: true },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-950 border border-paper/20 p-4 font-serif">
        <p className="font-mono text-warning text-lg">{label}</p>
        <p className="text-blood-light font-mono text-2xl">
          -{data.loss.toLocaleString()}
        </p>
        <p className="text-paper/70 text-sm">net residents lost</p>
        {data.governor && (
          <p className="text-paper/50 text-xs mt-2">{data.governor}</p>
        )}
        {data.note && (
          <p className="text-paper/50 text-xs italic">{data.note}</p>
        )}
        {data.isPeak && (
          <p className="text-blood-light text-xs mt-1 font-mono">PEAK YEAR</p>
        )}
        {data.isCurrent && (
          <p className="text-warning text-xs mt-1 font-mono">
            LATEST DATA — Jan 2026
          </p>
        )}
      </div>
    )
  }
  return null
}

function OutmigrationSection() {
  const destinations = outmigrationData.whereTheyreGoing.topDestinations2022
  const [activeChart, setActiveChart] = useState('census') // 'census' or 'historical'

  return (
    <section id="exodus" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            THE EXODUS
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            {outmigrationData.subtitle}
          </p>
        </div>

        {/* ─── NEW: 2025 Census Headline ─── */}
        <div className="bg-blood-dark border border-blood-light/40 p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] text-warning uppercase tracking-[3px] mb-2">
                Census Bureau — Released Jan 27, 2026
              </div>
              <div className="font-display text-5xl md:text-7xl text-paper mb-2">
                33,340
              </div>
              <p className="font-serif text-xl text-paper/80">
                net residents lost to other states in 2025
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="text-center md:text-right">
                <div className="font-mono text-3xl md:text-4xl text-blood-light">
                  182K
                </div>
                <p className="font-serif text-sm text-paper/60">people left MA</p>
              </div>
              <div className="text-center md:text-right">
                <div className="font-mono text-3xl md:text-4xl text-paper/60">
                  149K
                </div>
                <p className="font-serif text-sm text-paper/60">people moved in</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-paper/10 flex flex-wrap gap-4 md:gap-8">
            <div>
              <span className="font-mono text-warning text-lg">+21%</span>
              <span className="font-serif text-paper/60 text-sm ml-2">
                vs 2024 (27,480)
              </span>
            </div>
            <div>
              <span className="font-mono text-paper/60 text-lg">5th</span>
              <span className="font-serif text-paper/60 text-sm ml-2">
                worst state for outmigration
              </span>
            </div>
            <div>
              <span className="font-mono text-blood-light text-lg">0.2%</span>
              <span className="font-serif text-paper/60 text-sm ml-2">
                population growth (↓75% from prior year)
              </span>
            </div>
          </div>
        </div>

        {/* ─── Chart Toggle ─── */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveChart('census')}
            className={`px-4 py-2 font-mono text-sm border transition-colors ${
              activeChart === 'census'
                ? 'bg-blood-light text-paper border-blood-light'
                : 'bg-transparent text-paper/60 border-paper/20 hover:border-paper/40'
            }`}
          >
            2020–2025 Census
          </button>
          <button
            onClick={() => setActiveChart('historical')}
            className={`px-4 py-2 font-mono text-sm border transition-colors ${
              activeChart === 'historical'
                ? 'bg-blood-light text-paper border-blood-light'
                : 'bg-transparent text-paper/60 border-paper/20 hover:border-paper/40'
            }`}
          >
            2010–2025 Historical
          </button>
        </div>

        {/* ─── Census Bar Chart (2020-2025) ─── */}
        {activeChart === 'census' && (
          <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
            <h3 className="font-serif text-lg text-paper/90 mb-1">
              Net Domestic Migration (Census Bureau)
            </h3>
            <p className="font-serif text-sm text-paper/50 mb-6">
              People lost to other states each year — most current data available
            </p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={censusData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(250,249,246,0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(250,249,246,0.5)"
                    tick={{
                      fill: 'rgba(250,249,246,0.7)',
                      fontFamily: 'JetBrains Mono',
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    stroke="rgba(250,249,246,0.5)"
                    tick={{
                      fill: 'rgba(250,249,246,0.7)',
                      fontFamily: 'JetBrains Mono',
                      fontSize: 12,
                    }}
                    tickFormatter={(v) => `-${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="loss" radius={[4, 4, 0, 0]}>
                    {censusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.isCurrent
                            ? '#FFD700'
                            : entry.isPeak
                            ? '#DC143C'
                            : 'rgba(220,20,60,0.6)'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#FFD700]" />
                <span className="font-mono text-xs text-paper/60">
                  2025 (Latest)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blood-light" />
                <span className="font-mono text-xs text-paper/60">
                  2022 (Peak)
                </span>
              </div>
            </div>
            <p className="font-serif text-xs text-paper/40 mt-4">
              Source: U.S. Census Bureau, released January 27, 2026
            </p>
          </div>
        )}

        {/* ─── Historical Area Chart (2010-2025) ─── */}
        {activeChart === 'historical' && (
          <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
            <h3 className="font-serif text-lg text-paper/90 mb-1">
              Net Domestic Migration by Year
            </h3>
            <p className="font-serif text-sm text-paper/50 mb-6">
              15-year trend showing 10× increase since 2010
            </p>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC143C" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#DC143C" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(250,249,246,0.1)"
                  />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(250,249,246,0.5)"
                    tick={{
                      fill: 'rgba(250,249,246,0.7)',
                      fontFamily: 'JetBrains Mono',
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    stroke="rgba(250,249,246,0.5)"
                    tick={{
                      fill: 'rgba(250,249,246,0.7)',
                      fontFamily: 'JetBrains Mono',
                      fontSize: 12,
                    }}
                    tickFormatter={(value) => `-${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    x="2023"
                    stroke="#FFD700"
                    strokeDasharray="5 5"
                    label={{
                      value: 'Healey takes office',
                      fill: '#FFD700',
                      fontSize: 11,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="loss"
                    stroke="#DC143C"
                    strokeWidth={2}
                    fill="url(#lossGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="font-serif text-xs text-paper/40 mt-4">
              Sources: {outmigrationData.netDomesticMigrationByYear.dataSource}
            </p>
          </div>
        )}

        {/* ─── Immigration Dependency Callout ─── */}
        <div className="bg-slate-900 border border-warning/30 p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="text-warning text-3xl">⚠</div>
            <div>
              <h4 className="font-display text-xl text-warning mb-2">
                100% DEPENDENT ON IMMIGRATION
              </h4>
              <p className="font-serif text-paper/80 mb-4">
                Massachusetts population growth is now{' '}
                <span className="text-warning font-semibold">
                  entirely dependent
                </span>{' '}
                on international immigration. Without it, the state would already
                be losing population.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-950 border border-paper/10 p-3">
                  <div className="font-mono text-2xl text-paper/60">76K</div>
                  <p className="font-serif text-xs text-paper/50">
                    Avg. immigrants/yr (2022-24)
                  </p>
                </div>
                <div className="bg-slate-950 border border-paper/10 p-3">
                  <div className="font-mono text-2xl text-warning">40K</div>
                  <p className="font-serif text-xs text-paper/50">
                    Immigrants in 2025
                  </p>
                </div>
                <div className="bg-slate-950 border border-blood-light/30 p-3">
                  <div className="font-mono text-2xl text-blood-light">?</div>
                  <p className="font-serif text-xs text-paper/50">
                    Future under federal policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key stats grid — updated with 2025 Census data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            value="33,340"
            label="Net loss in 2025"
            sublabel="+21% vs 2024 — trend worsening"
            highlight
          />
          <StatCard
            value="$10.6B"
            label="AGI lost 2020-2022"
            sublabel="More than previous 7 years combined"
            highlight
          />
          <StatCard
            value="182K"
            label="People left MA in 2025"
            sublabel="Only 149K moved in"
          />
          <StatCard
            value="5th"
            label="Worst state for outmigration"
            sublabel="Behind NY, CA, IL, NJ"
          />
        </div>

        {/* Where they're going */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-950 border border-paper/10 p-6">
            <h3 className="font-serif text-xl text-paper mb-6">Where They're Going</h3>
            <div className="space-y-4">
              {destinations.map((dest, index) => (
                <div key={dest.state} className="flex items-center justify-between border-b border-paper/10 pb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-2xl text-warning">#{index + 1}</span>
                    <div>
                      <span className="font-serif text-lg text-paper">{dest.state}</span>
                      <p className="font-serif text-sm text-paper/50">{dest.reason}</p>
                    </div>
                  </div>
                  <span className="font-mono text-blood-light">-{dest.netLoss.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-sm text-warning mt-6">
              {outmigrationData.whereTheyreGoing.pattern}
            </p>
          </div>

          <div className="bg-slate-950 border border-paper/10 p-6">
            <h3 className="font-serif text-xl text-paper mb-6">Who's Leaving</h3>
            <div className="space-y-6">
              <div>
                <div className="font-mono text-3xl text-blood-light mb-2">26-35 year olds</div>
                <p className="font-serif text-paper/70">Largest cohort leaving — 5× the amount a decade earlier</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-blood-light mb-2">$150k+</div>
                <p className="font-serif text-paper/70">53% of those leaving earn this amount annually</p>
              </div>
              <div>
                <div className="font-mono text-3xl text-blood-light mb-2">25-44 year olds</div>
                <p className="font-serif text-paper/70">Account for 44% of total AGI leaving the state</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key quote — Pioneer Institute 2026 */}
        <QuoteBlock
          quote={outmigrationData.quotesForSite[0].quote}
          speaker={outmigrationData.quotesForSite[0].speaker}
          role={outmigrationData.quotesForSite[0].role}
          year={outmigrationData.quotesForSite[0].year}
          variant="highlight"
        />

        {/* CPA Survey quote */}
        <QuoteBlock
          quote={outmigrationData.quotesForSite[4].quote}
          source={outmigrationData.quotesForSite[4].source}
          year={outmigrationData.quotesForSite[4].year}
        />

        {/* BU Professor quote */}
        <QuoteBlock
          quote={outmigrationData.quotesForSite[3].quote}
          speaker={outmigrationData.quotesForSite[3].speaker}
          role={outmigrationData.quotesForSite[3].role}
          year={outmigrationData.quotesForSite[3].year}
        />
      </div>
    </section>
  )
}

export default OutmigrationSection
