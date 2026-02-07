import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import energyData from '../data/energy-costs.json'

const stateComparison = energyData.residentialRates.data
  .filter(d => d.rank !== null || d.state === 'National Average')
  .slice(0, 8)
  .map(d => ({
    state: d.state,
    rate: d.rate,
    highlight: d.highlight || false
  }))

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-950 border border-paper/20 p-4 font-serif">
        <p className="font-mono text-warning text-lg">{data.state}</p>
        <p className="text-blood-light font-mono text-2xl">{data.rate}¢/kWh</p>
      </div>
    )
  }
  return null
}

function EnergySection() {
  const summary = energyData.summary

  return (
    <section id="energy" className="py-24 bg-blood-dark/10 border-y border-blood-light/20">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            THE ENERGY CRISIS
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            Massachusetts pays more for energy than almost anywhere in America. Here's why.
          </p>
        </div>

        {/* ─── ELECTRICITY + NATURAL GAS SIDE BY SIDE ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Electricity Card */}
          <div className="bg-slate-950 border border-blood-light/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚡</span>
              <h3 className="font-display text-2xl text-paper">ELECTRICITY</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-mono text-4xl text-blood-light">{summary.maRate}¢</div>
                <p className="font-serif text-sm text-paper/50">MA per kWh</p>
              </div>
              <div>
                <div className="font-mono text-4xl text-paper/40">{summary.nationalAverage}¢</div>
                <p className="font-serif text-sm text-paper/50">US average</p>
              </div>
            </div>
            <div className="bg-blood-dark/30 p-4 text-center">
              <div className="font-mono text-3xl text-warning">+73%</div>
              <p className="font-serif text-sm text-paper/70">above national average</p>
            </div>
            <div className="mt-4 pt-4 border-t border-paper/10">
              <div className="flex justify-between text-sm">
                <span className="font-serif text-paper/60">10-year increase</span>
                <span className="font-mono text-blood-light">+65%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-serif text-paper/60">US 10-year increase</span>
                <span className="font-mono text-paper/40">+32%</span>
              </div>
              <p className="font-mono text-xs text-warning mt-2">2x faster than nation</p>
            </div>
          </div>

          {/* Natural Gas Card */}
          <div className="bg-slate-950 border border-blood-light/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔥</span>
              <h3 className="font-display text-2xl text-paper">NATURAL GAS</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-mono text-4xl text-blood-light">$2.51</div>
                <p className="font-serif text-sm text-paper/50">MA per therm</p>
              </div>
              <div>
                <div className="font-mono text-4xl text-paper/40">$1.52</div>
                <p className="font-serif text-sm text-paper/50">US average</p>
              </div>
            </div>
            <div className="bg-blood-dark/30 p-4 text-center">
              <div className="font-mono text-3xl text-warning">+65%</div>
              <p className="font-serif text-sm text-paper/70">above national average</p>
            </div>
            <div className="mt-4 pt-4 border-t border-paper/10">
              <div className="flex justify-between text-sm">
                <span className="font-serif text-paper/60">10-year increase</span>
                <span className="font-mono text-blood-light">+93%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-serif text-paper/60">US 10-year increase</span>
                <span className="font-mono text-paper/40">+25%</span>
              </div>
              <p className="font-mono text-xs text-warning mt-2">4x faster than nation</p>
            </div>
            <p className="font-serif text-xs text-paper/40 mt-3">
              50% of MA households heat with natural gas
            </p>
          </div>
        </div>

        {/* Combined Annual Premium */}
        <div className="bg-blood-dark border border-blood-light p-8 mb-16 text-center">
          <div className="font-mono text-[10px] text-paper/50 uppercase tracking-widest mb-2">
            Combined Annual Energy Premium
          </div>
          <div className="font-mono text-7xl md:text-9xl font-bold text-warning mb-4">
            $900+
          </div>
          <p className="font-serif text-xl text-paper/80 mb-2">
            extra per household, every year
          </p>
          <div className="flex justify-center gap-8 text-sm font-mono text-paper/50">
            <span>Electricity: ~$500</span>
            <span>+</span>
            <span>Natural Gas: ~$400</span>
          </div>
        </div>

        {/* ─── THE PIPELINE SCANDAL ─── */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blood-light/50" />
            <h3 className="font-display text-3xl text-blood-light">WHY SO HIGH?</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blood-light/50" />
          </div>

          <div className="bg-slate-950 border border-paper/10 p-8 mb-8">
            <p className="font-serif text-xl text-paper/90 mb-6">
              In 2016, Attorney General Maura Healey helped kill two major pipelines that would have
              brought cheap American natural gas from Pennsylvania's Marcellus Shale to Massachusetts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-l-4 border-blood-light pl-4">
                <div className="font-display text-xl text-paper mb-1">Kinder Morgan NED</div>
                <div className="font-mono text-2xl text-blood-light mb-1">$3.3 billion</div>
                <p className="font-serif text-sm text-paper/60">Northeast Energy Direct pipeline</p>
              </div>
              <div className="border-l-4 border-blood-light pl-4">
                <div className="font-display text-xl text-paper mb-1">Access Northeast</div>
                <div className="font-mono text-2xl text-blood-light mb-1">$3+ billion</div>
                <p className="font-serif text-sm text-paper/60">Regional pipeline expansion</p>
              </div>
            </div>

            <div className="bg-blood-dark/20 border border-warning/30 p-4">
              <div className="font-mono text-xs text-warning uppercase tracking-wider mb-2">
                Kinder Morgan Testimony (2022)
              </div>
              <blockquote className="font-serif text-lg text-paper/90 italic">
                "Had that project gone in service... it would have saved the region{' '}
                <span className="text-warning font-semibold not-italic">$2.8 billion</span>."
              </blockquote>
            </div>
          </div>
        </div>

        {/* ─── THE RUSSIAN GAS CONSEQUENCE ─── */}
        <div className="bg-blood-dark border-2 border-blood-light p-8 mb-16">
          <div className="font-mono text-xs text-warning uppercase tracking-[0.3em] mb-4">
            The Consequence
          </div>
          <h3 className="font-display text-4xl md:text-5xl text-paper mb-6">
            RUSSIAN GAS IN BOSTON HARBOR
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <p className="font-serif text-lg text-paper/90 mb-4">
                In January 2018, a tanker carrying Russian liquefied natural gas docked in
                Boston Harbor — the first in the terminal's <span className="text-warning">50-year history</span>.
              </p>
              <p className="font-serif text-paper/70">
                The gas came from <span className="text-blood-light">Yamal LNG</span>, a $27 billion
                Russian Arctic facility owned by a company <span className="text-warning">under US sanctions</span>.
              </p>
            </div>
            <div className="bg-slate-950 border border-paper/20 p-6">
              <div className="text-center">
                <div className="font-mono text-6xl mb-2">🇷🇺</div>
                <p className="font-display text-xl text-paper mb-2">Siberian Arctic</p>
                <p className="font-mono text-sm text-paper/50">~5,000 miles away</p>
              </div>
              <div className="text-center mt-4 pt-4 border-t border-paper/10">
                <div className="font-mono text-2xl text-paper/30 line-through mb-1">Pennsylvania</div>
                <p className="font-mono text-sm text-paper/30">~300 miles away</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-paper/20 p-4">
            <p className="font-serif text-lg text-paper/80 text-center">
              <span className="text-blood-light">Massachusetts blocked American pipelines from Pennsylvania.</span>
              <br />
              <span className="text-warning">Then imported Russian gas from Siberia.</span>
            </p>
          </div>
        </div>

        {/* ─── HEALEY'S CHANGING STORY ─── */}
        <div className="mb-16">
          <h3 className="font-display text-3xl text-warning mb-8 text-center">
            HEALEY'S CHANGING STORY
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quote 1 - The Brag */}
            <div className="bg-slate-950 border border-paper/10 p-6">
              <div className="font-mono text-xs text-paper/40 uppercase tracking-wider mb-3">
                April 27, 2022
              </div>
              <div className="font-mono text-xs text-green-500 mb-3">Campaign Event</div>
              <blockquote className="font-serif text-paper/90 italic mb-4">
                "Remember, <span className="text-blood-light not-italic font-semibold">I stopped two gas pipelines</span> from coming into this state."
              </blockquote>
              <p className="font-mono text-xs text-paper/40">— Maura Healey</p>
            </div>

            {/* Quote 2 - The Denial */}
            <div className="bg-slate-950 border border-warning/30 p-6">
              <div className="font-mono text-xs text-paper/40 uppercase tracking-wider mb-3">
                October 14, 2025
              </div>
              <div className="font-mono text-xs text-warning mb-3">NBC Boston</div>
              <blockquote className="font-serif text-paper/90 italic mb-4">
                "You know, <span className="text-warning not-italic font-semibold">I never stopped pipelines</span>."
              </blockquote>
              <p className="font-mono text-xs text-paper/40">— Maura Healey</p>
            </div>

            {/* Quote 3 - The Walkback */}
            <div className="bg-slate-950 border border-paper/10 p-6">
              <div className="font-mono text-xs text-paper/40 uppercase tracking-wider mb-3">
                December 2025
              </div>
              <div className="font-mono text-xs text-paper/50 mb-3">Boston Herald</div>
              <blockquote className="font-serif text-paper/90 italic mb-4">
                "They were <span className="text-blood-light not-italic font-semibold">a lousy deal</span> for ratepayers."
              </blockquote>
              <p className="font-mono text-xs text-paper/40">— Maura Healey</p>
            </div>
          </div>
        </div>

        {/* ─── RATE HIKES COMING ─── */}
        <div className="bg-slate-950 border border-warning/50 p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="text-warning text-4xl">⚠</div>
            <div className="flex-1">
              <h3 className="font-display text-2xl text-warning mb-4">
                AND IT'S GETTING WORSE
              </h3>
              <p className="font-serif text-paper/70 mb-4">
                Rate hikes approved for 2025:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blood-dark/20 p-4">
                  <div className="font-display text-xl text-paper mb-1">Eversource</div>
                  <div className="font-mono text-3xl text-blood-light">25-30%</div>
                  <p className="font-serif text-sm text-paper/50">increase</p>
                </div>
                <div className="bg-blood-dark/20 p-4">
                  <div className="font-display text-xl text-paper mb-1">National Grid</div>
                  <div className="font-mono text-3xl text-blood-light">11-13%</div>
                  <p className="font-serif text-sm text-paper/50">increase</p>
                </div>
              </div>
              <p className="font-mono text-xs text-paper/40 mt-4">
                Source: MA Department of Public Utilities, Fall 2024
              </p>
            </div>
          </div>
        </div>

        {/* ─── BOSTON GLOBE QUOTE ─── */}
        <div className="bg-slate-950 border-l-4 border-warning p-6 mb-12">
          <blockquote className="font-serif text-lg text-paper/90 italic mb-4">
            "To build the new $27 billion gas export plant on the Arctic Ocean that now keeps the
            lights on in Massachusetts, Russian firms bored wells into fragile permafrost; blasted
            a new international airport into a pristine landscape... On the plus side, though,
            <span className="text-warning not-italic">they didn't offend Pittsfield or Winthrop,
            Danvers or Groton, with even an inch of pipeline.</span>"
          </blockquote>
          <cite className="font-mono text-sm text-paper/50 not-italic">
            — Boston Globe Editorial Board, February 2018
          </cite>
        </div>

        {/* ─── ELECTRICITY CHART ─── */}
        <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
          <h3 className="font-serif text-lg text-paper/90 mb-2">Residential Electricity Rates by State</h3>
          <p className="font-serif text-sm text-paper/50 mb-6">Cents per kilowatt-hour, November 2025</p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateComparison} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,249,246,0.1)" />
                <XAxis
                  type="number"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                  tickFormatter={(value) => `${value}¢`}
                  domain={[0, 45]}
                />
                <YAxis
                  type="category"
                  dataKey="state"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'Source Serif 4', fontSize: 12 }}
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={summary.nationalAverage} stroke="#FFD700" strokeDasharray="5 5" label={{ value: 'National Avg', fill: '#FFD700', fontSize: 11, position: 'top' }} />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                  {stateComparison.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.state === 'Massachusetts' ? '#DC143C' : entry.state === 'National Average' ? '#FFD700' : '#64748b'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="font-serif text-xs text-paper/40 mt-4">
            Source: {energyData.source.name}
          </p>
        </div>

        {/* Business impact + Self-sufficiency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-950 border border-paper/10 p-6">
            <h3 className="font-serif text-xl text-paper mb-4">Business Impact</h3>
            <div className="font-mono text-4xl text-blood-light mb-2">81%</div>
            <p className="font-serif text-paper/80">
              Massachusetts businesses pay 81% more for electricity than the national average
            </p>
            <p className="font-serif text-sm text-paper/50 mt-2">
              Commercial rate: 23.93¢/kWh vs 13.19¢ national
            </p>
          </div>
          <div className="bg-slate-950 border border-paper/10 p-6">
            <h3 className="font-serif text-xl text-paper mb-4">Self-Sufficiency Problem</h3>
            <div className="font-mono text-4xl text-warning mb-2">41%</div>
            <p className="font-serif text-paper/80">
              Massachusetts generates only 41% of its own electricity needs
            </p>
            <p className="font-serif text-sm text-paper/50 mt-2">
              Dependent on imported energy
            </p>
          </div>
        </div>

        {/* Policy contradiction */}
        <div className="bg-slate-950 border border-blood-light/30 p-8 mb-12">
          <h3 className="font-serif text-xl text-warning mb-4">The Policy Contradiction</h3>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm text-paper/50 mb-2">NOVEMBER 2024</p>
              <p className="font-serif text-paper/80">
                Governor Healey signs aggressive climate legislation requiring net zero emissions by 2050,
                50% reduction by 2030, 75% reduction by 2040.
              </p>
            </div>
            <div className="border-l-4 border-blood-light pl-4">
              <p className="font-mono text-sm text-paper/50 mb-2">DECEMBER 2025</p>
              <p className="font-serif text-paper/80">
                Administration <span className="text-warning">quietly delays</span> clean heat standard
                from 2026 to 2028, citing "affordability concerns."
              </p>
            </div>
            <p className="font-serif text-paper/60 italic">
              Campaigns as "climate governor" — delays climate policies when costs become politically inconvenient.
            </p>
          </div>
        </div>

        {/* Sources */}
        <p className="font-serif text-xs text-paper/40">
          Sources: U.S. Energy Information Administration, Kinder Morgan testimony (2022),
          Boston Globe, NBC Boston, Boston Herald, MA Department of Public Utilities
        </p>
      </div>
    </section>
  )
}

export default EnergySection
