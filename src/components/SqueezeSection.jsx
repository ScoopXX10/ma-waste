import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts'
import squeezeData from '../data/ma-income-vs-costs.json'

// Data for the main "squeeze" bar chart
const squeezeChartData = squeezeData.theSqueeze.chartData.map(d => ({
  ...d,
  fill: d.category === 'Income' ? '#16a34a' : '#DC143C'
}))

// Energy cost trend data for line chart
const energyTrendData = [
  { year: '2015', maElectricity: 18.5, nationalElectricity: 12.6, maGas: 1.30, nationalGas: 1.04 },
  { year: '2017', maElectricity: 21.1, nationalElectricity: 12.9, maGas: 1.45, nationalGas: 1.08 },
  { year: '2019', maElectricity: 22.6, nationalElectricity: 13.1, maGas: 1.65, nationalGas: 1.10 },
  { year: '2021', maElectricity: 24.2, nationalElectricity: 14.0, maGas: 1.85, nationalGas: 1.15 },
  { year: '2023', maElectricity: 27.5, nationalElectricity: 15.8, maGas: 2.20, nationalGas: 1.25 },
  { year: '2025', maElectricity: 31.4, nationalElectricity: 18.0, maGas: 2.51, nationalGas: 1.30 },
]

const SqueezeTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-950 border border-paper/20 p-4 font-serif">
        <p className="font-mono text-warning text-lg">{data.category}</p>
        <p className={`font-mono text-3xl ${data.category === 'Income' ? 'text-green-500' : 'text-blood-light'}`}>
          +{data.growth}%
        </p>
      </div>
    )
  }
  return null
}

const EnergyTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950 border border-paper/20 p-4 font-serif">
        <p className="font-mono text-warning mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="font-mono text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.dataKey.includes('Gas') ? '$/therm' : '¢/kWh'}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function SqueezeSection() {
  const quotes = squeezeData.quotesForSite
  const massGovQuote = quotes.find(q => q.source === 'Mass.gov')

  return (
    <section id="squeeze" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            THE SQUEEZE
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            Costs are rising 10-20x faster than incomes. Massachusetts residents are being squeezed from all sides.
          </p>
        </div>

        {/* Key disparity headline */}
        <div className="bg-blood-dark border border-blood-light/30 p-8 mb-12 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div>
              <div className="font-mono text-5xl md:text-7xl text-green-500 mb-1">+4.1%</div>
              <p className="font-serif text-paper/70">Income Growth</p>
              <p className="font-mono text-xs text-paper/40">2015-2024 (inflation-adjusted)</p>
            </div>
            <div className="font-display text-4xl md:text-6xl text-warning">vs</div>
            <div>
              <div className="font-mono text-5xl md:text-7xl text-blood-light mb-1">+90%</div>
              <p className="font-serif text-paper/70">Home Price Growth</p>
              <p className="font-mono text-xs text-paper/40">2015-2025</p>
            </div>
          </div>
          <p className="font-serif text-lg text-paper/60 mt-6 border-t border-paper/10 pt-6">
            Home prices rose <span className="text-warning font-mono">22x faster</span> than incomes
          </p>
        </div>

        {/* Main bar chart - The Squeeze */}
        <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
          <h3 className="font-serif text-xl text-paper mb-2">Growth Comparison: 2015-2025</h3>
          <p className="font-serif text-sm text-paper/50 mb-6">
            How costs have outpaced incomes over the past decade
          </p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={squeezeChartData}
                layout="vertical"
                margin={{ top: 20, right: 60, left: 100, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,249,246,0.1)" />
                <XAxis
                  type="number"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                  tickFormatter={(value) => `+${value}%`}
                  domain={[0, 100]}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'Source Serif 4', fontSize: 14 }}
                  width={95}
                />
                <Tooltip content={<SqueezeTooltip />} />
                <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
                  {squeezeChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.category === 'Income' ? '#16a34a' : '#DC143C'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500"></div>
              <span className="font-serif text-paper/70">Income (lagging)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blood-light"></div>
              <span className="font-serif text-paper/70">Costs (surging)</span>
            </div>
          </div>
        </div>

        {/* Stat cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-950 border border-blood-light/30 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-blood-light mb-2">93%</div>
            <p className="font-serif text-sm text-paper/70">Natural Gas Increase</p>
            <p className="font-mono text-xs text-warning mt-1">4x national rate</p>
          </div>
          <div className="bg-slate-950 border border-blood-light/30 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-blood-light mb-2">65%</div>
            <p className="font-serif text-sm text-paper/70">Electricity Increase</p>
            <p className="font-mono text-xs text-warning mt-1">2x national rate</p>
          </div>
          <div className="bg-slate-950 border border-warning/50 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-warning mb-2">$16B</div>
            <p className="font-serif text-sm text-paper/70">Mass Save Costs</p>
            <p className="font-mono text-xs text-paper/50 mt-1">passed to ratepayers</p>
          </div>
          <div className="bg-slate-950 border border-paper/20 p-6 text-center">
            <div className="font-mono text-4xl md:text-5xl text-paper/70 mb-2">49.5%</div>
            <p className="font-serif text-sm text-paper/70">Property Tax Levy</p>
            <p className="font-mono text-xs text-paper/50 mt-1">+$7.2B since 2015</p>
          </div>
        </div>

        {/* Featured Quote */}
        {massGovQuote && (
          <div className="bg-blood-dark/30 border-l-4 border-warning p-8 mb-12">
            <blockquote className="font-serif text-xl md:text-2xl text-paper/90 italic mb-4">
              "{massGovQuote.quote}"
            </blockquote>
            <cite className="font-mono text-sm text-warning not-italic">
              — {massGovQuote.source}
            </cite>
          </div>
        )}

        {/* Energy cost line chart */}
        <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
          <h3 className="font-serif text-xl text-paper mb-2">Energy Costs Over Time</h3>
          <p className="font-serif text-sm text-paper/50 mb-6">
            Massachusetts vs National Average electricity rates (¢/kWh)
          </p>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,249,246,0.1)" />
                <XAxis
                  dataKey="year"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                  tickFormatter={(value) => `${value}¢`}
                  domain={[10, 35]}
                />
                <Tooltip content={<EnergyTooltip />} />
                <Legend
                  wrapperStyle={{ fontFamily: 'Source Serif 4', fontSize: 12 }}
                  formatter={(value) => <span className="text-paper/70">{value}</span>}
                />
                <Line
                  type="monotone"
                  dataKey="maElectricity"
                  name="MA Electricity"
                  stroke="#DC143C"
                  strokeWidth={3}
                  dot={{ fill: '#DC143C', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="nationalElectricity"
                  name="National Avg"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#64748b', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="font-serif text-xs text-paper/40 mt-4">
            Source: U.S. Energy Information Administration, BLS
          </p>
        </div>

        {/* Comparison to competitor states */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-950 border border-paper/10 p-6">
            <h3 className="font-serif text-xl text-paper mb-4">Income Growth Lags</h3>
            <p className="font-serif text-paper/70 mb-4">
              MA real income growth trails the nation and neighbors
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">Massachusetts</span>
                <span className="font-mono text-blood-light">+4.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">National Average</span>
                <span className="font-mono text-paper/80">+5.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">New Hampshire</span>
                <span className="font-mono text-green-400">+5.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">Rhode Island</span>
                <span className="font-mono text-green-400">+6.2%</span>
              </div>
            </div>
            <p className="font-mono text-xs text-paper/40 mt-4">
              2015-2019 to 2020-2024, inflation-adjusted
            </p>
          </div>

          <div className="bg-slate-950 border border-paper/10 p-6">
            <h3 className="font-serif text-xl text-paper mb-4">Economic Growth Lags</h3>
            <p className="font-serif text-paper/70 mb-4">
              MA GDP growth trails competitor states
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">Massachusetts</span>
                <span className="font-mono text-blood-light">+11.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">National Average</span>
                <span className="font-mono text-paper/80">+13.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">Florida</span>
                <span className="font-mono text-green-400">+17.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">Texas</span>
                <span className="font-mono text-green-400">+15.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-paper/70">New Hampshire</span>
                <span className="font-mono text-green-400">+14.8%</span>
              </div>
            </div>
            <p className="font-mono text-xs text-paper/40 mt-4">
              GDP growth 2020-2024 (Pioneer Institute)
            </p>
          </div>
        </div>

        {/* Policy callout */}
        <div className="bg-blood-dark/20 border border-blood-light/30 p-8">
          <h3 className="font-display text-2xl text-warning mb-4">POLICY CONNECTION</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-mono text-sm text-paper/50 uppercase tracking-wider mb-2">
                Blocked Pipelines
              </h4>
              <p className="font-serif text-paper/80">
                Governor Healey, as Attorney General (2015-2023), blocked two natural gas pipeline projects
                that would have increased supply and lowered prices.
              </p>
              <p className="font-mono text-blood-light mt-2">
                Result: 93% gas price increase
              </p>
            </div>
            <div>
              <h4 className="font-mono text-sm text-paper/50 uppercase tracking-wider mb-2">
                Mass Save Mandate
              </h4>
              <p className="font-serif text-paper/80">
                The "energy efficiency" program has cost ratepayers $16 billion since 2008, now running
                at $1.5 billion per year — all added to utility bills.
              </p>
              <p className="font-mono text-warning mt-2">
                Annual cost: $1.5B passed to consumers
              </p>
            </div>
          </div>
        </div>

        {/* Source citation */}
        <p className="font-serif text-xs text-paper/40 mt-8">
          Sources: US Census Bureau, EIA, BLS, MA Division of Local Services, Pioneer Institute, Warren Group, Mass.gov
        </p>
      </div>
    </section>
  )
}

export default SqueezeSection
