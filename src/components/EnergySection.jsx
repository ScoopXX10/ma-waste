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
            ENERGY COSTS
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            {summary.headline}
          </p>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950 border border-blood-light/30 p-6 text-center">
            <div className="font-mono text-5xl md:text-6xl text-blood-light mb-2">
              {summary.maRate}¢
            </div>
            <p className="font-serif text-paper/80">per kWh in MA</p>
          </div>
          <div className="bg-slate-950 border border-paper/20 p-6 text-center">
            <div className="font-mono text-5xl md:text-6xl text-paper/50 mb-2">
              {summary.nationalAverage}¢
            </div>
            <p className="font-serif text-paper/80">national average</p>
          </div>
          <div className="bg-slate-950 border border-warning/50 p-6 text-center">
            <div className="font-mono text-5xl md:text-6xl text-warning mb-2">
              #3
            </div>
            <p className="font-serif text-paper/80">highest in nation</p>
          </div>
        </div>

        {/* Premium display */}
        <div className="bg-blood-dark border border-blood-light p-8 mb-12 text-center">
          <div className="font-mono text-7xl md:text-9xl font-bold text-warning mb-4">
            75%
          </div>
          <p className="font-serif text-2xl text-paper/90">
            above national average
          </p>
          <p className="font-serif text-lg text-paper/60 mt-2">
            ~$500 extra per household, every year
          </p>
        </div>

        {/* Chart */}
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

        {/* Business impact */}
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

        {/* New England comparison */}
        <div className="bg-slate-950 border border-paper/10 p-6">
          <h3 className="font-serif text-lg text-paper mb-6">Even in High-Cost New England, MA Pays More</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {energyData.neighboringStatesComparison.data.slice(0, 4).map((state) => (
              <div key={state.state} className={`p-4 text-center ${state.state === 'Massachusetts' ? 'bg-blood-dark/20' : ''}`}>
                <div className="font-serif text-paper/70 text-sm mb-1">{state.state}</div>
                <div className={`font-mono text-2xl ${state.state === 'Massachusetts' ? 'text-blood-light' : 'text-paper/80'}`}>
                  {state.rate}¢
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnergySection
