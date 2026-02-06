import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import housingData from '../data/ma-housing-tax-burden.json'

const priceData = Object.entries(housingData.housingCosts.medianHomePriceHistory.singleFamilyMedian).map(([year, data]) => ({
  year,
  price: data.price / 1000, // Convert to thousands
  note: data.note || null
}))

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-950 border border-paper/20 p-4 font-serif">
        <p className="font-mono text-warning text-lg">{label}</p>
        <p className="text-blood-light font-mono text-2xl">${(data.price * 1000).toLocaleString()}</p>
        <p className="text-paper/70 text-sm">median home price</p>
        {data.note && <p className="text-paper/50 text-xs mt-2 italic">{data.note}</p>}
      </div>
    )
  }
  return null
}

function HousingSection() {
  const summary = housingData.housingCosts.medianHomePriceHistory.summary

  return (
    <section id="housing" className="py-24 bg-slate-950">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            HOUSING CRISIS
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            Home prices have nearly doubled in a decade while incomes barely budged.
          </p>
        </div>

        {/* Main stat */}
        <div className="text-center mb-12">
          <div className="font-mono text-7xl md:text-9xl font-bold text-blood-light mb-4">
            96.5%
          </div>
          <p className="font-serif text-2xl text-paper/80">
            Home price increase from 2015 to 2025
          </p>
          <p className="font-serif text-lg text-paper/50 mt-2">
            $335,000 → $658,200
          </p>
        </div>

        {/* Chart */}
        <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
          <h3 className="font-serif text-lg text-paper/90 mb-2">Median Single-Family Home Price</h3>
          <p className="font-serif text-sm text-paper/50 mb-6">Massachusetts, 2015-2025</p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,249,246,0.1)" />
                <XAxis
                  dataKey="year"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}k`}
                  domain={[300, 700]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="2023" stroke="#FFD700" strokeDasharray="5 5" label={{ value: 'Healey', fill: '#FFD700', fontSize: 11 }} />
                <ReferenceLine x="2020" stroke="#DC143C" strokeDasharray="5 5" label={{ value: 'COVID', fill: '#DC143C', fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#DC143C"
                  strokeWidth={3}
                  dot={{ fill: '#DC143C', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#FFD700' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="font-serif text-xs text-paper/40 mt-4">
            Source: The Warren Group
          </p>
        </div>

        {/* Era comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-950 border border-paper/20 p-6">
            <h3 className="font-serif text-lg text-paper/70 mb-4">Baker Era (2015-2022)</h3>
            <div className="font-mono text-4xl text-blood-light mb-2">+70%</div>
            <p className="font-serif text-paper/80">$335k → $570k</p>
            <p className="font-serif text-sm text-paper/50 mt-2">Includes COVID spike (2020-2022)</p>
          </div>
          <div className="bg-slate-950 border border-blood-light/30 p-6">
            <h3 className="font-serif text-lg text-paper/70 mb-4">Healey Era (2023-2025)</h3>
            <div className="font-mono text-4xl text-blood-light mb-2">+15.5%</div>
            <p className="font-serif text-paper/80">$570k → $658k</p>
            <p className="font-serif text-sm text-paper/50 mt-2">On already-elevated base</p>
          </div>
        </div>

        {/* Cost of living ranking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-5xl text-warning mb-2">#2</div>
            <p className="font-serif text-paper/80">Most expensive state</p>
            <p className="font-serif text-sm text-paper/50">Only Hawaii is higher</p>
          </div>
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-5xl text-blood-light mb-2">#9</div>
            <p className="font-serif text-paper/80">Worst tax competitiveness</p>
            <p className="font-serif text-sm text-paper/50">42nd of 50 states</p>
          </div>
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-5xl text-blood-light mb-2">400k</div>
            <p className="font-serif text-paper/80">Adults living with parents</p>
            <p className="font-serif text-sm text-paper/50">Can't afford to move out</p>
          </div>
        </div>

        {/* Property tax extremes */}
        <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
          <h3 className="font-serif text-xl text-paper mb-6">Property Tax: A Tale of Two Towns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-sm text-paper/50 mb-2">HIGHEST</p>
              <div className="font-display text-3xl text-blood-light mb-1">Weston</div>
              <div className="font-mono text-4xl text-warning">$24,448</div>
              <p className="font-serif text-paper/60">average annual tax bill</p>
            </div>
            <div>
              <p className="font-mono text-sm text-paper/50 mb-2">LOWEST</p>
              <div className="font-display text-3xl text-green-400 mb-1">Hancock</div>
              <div className="font-mono text-4xl text-green-400">$712</div>
              <p className="font-serif text-paper/60">average annual tax bill</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HousingSection
