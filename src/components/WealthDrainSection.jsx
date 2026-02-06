import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import outmigrationData from '../data/ma-outmigration-data.json'
import QuoteBlock from './QuoteBlock'

const agiData = Object.entries(outmigrationData.incomeAndWealthFlight.agiLossHistory).map(([year, data]) => ({
  year,
  loss: data.netAGILoss / 1000000000, // Convert to billions
  formatted: data.formatted
}))

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950 border border-paper/20 p-4 font-serif">
        <p className="font-mono text-warning text-lg">{label}</p>
        <p className="text-blood-light font-mono text-2xl">${payload[0].value.toFixed(1)}B</p>
        <p className="text-paper/70 text-sm">in AGI lost</p>
      </div>
    )
  }
  return null
}

function WealthDrainSection() {
  return (
    <section id="wealth-drain" className="py-24 bg-blood-dark/20 border-y border-blood-light/20">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            THE WEALTH DRAIN
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            When high earners leave, they take their income — and future tax revenue — with them.
          </p>
        </div>

        {/* Main stat */}
        <div className="text-center mb-12">
          <div className="font-mono text-7xl md:text-9xl font-bold text-blood-light mb-4">
            $10.6B
          </div>
          <p className="font-serif text-2xl text-paper/80">
            in Adjusted Gross Income lost from 2020-2022 alone
          </p>
          <p className="font-serif text-lg text-paper/50 mt-2">
            More than the previous 7 years combined
          </p>
        </div>

        {/* Chart */}
        <div className="bg-slate-950 border border-paper/10 p-6 mb-12">
          <h3 className="font-serif text-lg text-paper/90 mb-2">Annual AGI Loss to Outmigration</h3>
          <p className="font-serif text-sm text-paper/50 mb-6">In billions of dollars</p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agiData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,249,246,0.1)" />
                <XAxis
                  dataKey="year"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}B`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="loss" radius={[4, 4, 0, 0]}>
                  {agiData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.loss >= 4 ? '#DC143C' : '#8B0000'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="font-serif text-xs text-paper/40 mt-4">
            Source: IRS Statistics of Income Migration Data, Pioneer Institute
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-4xl text-warning mb-2">4×</div>
            <p className="font-serif text-paper/80">Increase in AGI loss</p>
            <p className="font-serif text-sm text-paper/50">2012 to 2022</p>
          </div>
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-4xl text-blood-light mb-2">55%</div>
            <p className="font-serif text-paper/80">From $200k+ earners</p>
            <p className="font-serif text-sm text-paper/50">Wealth leaving disproportionately</p>
          </div>
          <div className="bg-slate-950 border border-paper/10 p-6 text-center">
            <div className="font-mono text-4xl text-warning mb-2">$2.6B</div>
            <p className="font-serif text-paper/80">Lost from high earners in 2021</p>
            <p className="font-serif text-sm text-paper/50">60% of total that year</p>
          </div>
        </div>

        {/* CPA quote */}
        <QuoteBlock
          quote="90% of CPAs surveyed indicated that their high-income clients were considering leaving Massachusetts in the next year."
          source="Massachusetts Society of CPAs"
          year="2024"
          variant="highlight"
        />

        {/* Additional context */}
        <div className="bg-slate-950 border border-blood-light/30 p-8 mt-8">
          <h3 className="font-serif text-xl text-warning mb-4">The Millionaire Tax Effect</h3>
          <p className="font-serif text-paper/80 mb-4">
            In 2023, Massachusetts implemented a 4% surtax on income above $1 million,
            bringing the top rate to 9%.
          </p>
          <div className="font-mono text-blood-light text-2xl mb-2">64%</div>
          <p className="font-serif text-paper/70">
            of CPAs reported the millionaire tax as a major factor in clients' decisions to move.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WealthDrainSection
