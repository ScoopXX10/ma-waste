import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const premiumTrend = [
  { year: 2019, premium: 22000 },
  { year: 2020, premium: 23000 },
  { year: 2021, premium: 24000 },
  { year: 2022, premium: 25000 },
  { year: 2023, premium: 26355 },
  { year: 2024, premium: 28151 },
]

const affordabilityData = [
  { group: 'Hispanic Families', percent: 41, color: '#dc2626' },
  { group: 'Black Families', percent: 26, color: '#f59e0b' },
  { group: 'White Families', percent: 9, color: '#64748b' },
]

function HealthcareSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-950">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-sm text-blood-light uppercase tracking-widest mb-4">
            Healthcare Crisis
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-paper mb-2">
            <span className="text-blood-light">$32,469</span>
          </h2>
          <p className="font-mono text-lg text-warning mb-4">
            #1 MOST EXPENSIVE IN AMERICA
          </p>
          <p className="font-serif text-xl text-paper/60 max-w-2xl mx-auto">
            Average annual cost of health care for a Massachusetts family in 2024
          </p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-blood-light font-bold">$28,151</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              Avg Family Premium
            </div>
          </div>
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-warning font-bold">+14.7%</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              vs National Average
            </div>
          </div>
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-blood-light font-bold">+11.5%</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              2026 Increase
            </div>
          </div>
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-paper font-bold">#1</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              Highest in US
            </div>
          </div>
        </div>

        {/* Charts section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Premium trend */}
          <div className="bg-slate-900/30 border border-paper/10 p-6">
            <h3 className="font-display text-2xl text-paper mb-2">Premium Explosion</h3>
            <p className="font-serif text-paper/60 text-sm mb-4">
              Average family health insurance premium in MA
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={premiumTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis
                    dataKey="year"
                    tick={{ fill: 'rgba(245,241,232,0.5)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(245,241,232,0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(245,241,232,0.5)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(245,241,232,0.1)' }}
                    tickLine={false}
                    domain={[20000, 30000]}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid rgba(245,241,232,0.1)',
                      borderRadius: 0,
                    }}
                    labelStyle={{ color: 'rgba(245,241,232,0.7)' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Family Premium']}
                  />
                  <ReferenceLine
                    y={24546}
                    stroke="rgba(245,241,232,0.3)"
                    strokeDasharray="3 3"
                    label={{
                      value: 'US Avg',
                      position: 'right',
                      fill: 'rgba(245,241,232,0.4)',
                      fontSize: 10,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="premium"
                    stroke="#dc2626"
                    strokeWidth={3}
                    dot={{ fill: '#dc2626', strokeWidth: 0, r: 4 }}
                    activeDot={{ fill: '#dc2626', strokeWidth: 0, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Affordability gap by race */}
          <div className="bg-slate-900/30 border border-paper/10 p-6">
            <h3 className="font-display text-2xl text-paper mb-2">Who Gets Crushed</h3>
            <p className="font-serif text-paper/60 text-sm mb-4">
              % of families spending 25%+ of income on healthcare
            </p>
            <div className="space-y-4 mt-8">
              {affordabilityData.map((item) => (
                <div key={item.group} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-paper/70">{item.group}</span>
                    <span className="font-mono text-xl font-bold" style={{ color: item.color }}>
                      {item.percent}%
                    </span>
                  </div>
                  <div className="w-full h-4 bg-slate-800 rounded-sm overflow-hidden">
                    <div
                      className="h-full rounded-sm transition-all duration-500"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-paper/40 mt-4">
              The healthcare burden falls hardest on minority families
            </p>
          </div>
        </div>

        {/* Business impact */}
        <div className="bg-blood-dark/20 border border-blood-light/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🏪</div>
            <div>
              <div className="font-mono text-blood-light font-bold mb-2">Small Businesses Are Dying</div>
              <p className="font-serif text-paper/70 mb-2">
                Half of small businesses surveyed predict they will have to <strong className="text-paper">sell or close within 5 years</strong> due to healthcare costs.
              </p>
              <p className="font-serif text-paper/60 text-sm">
                Small business premium increases: 10-30% in 2025-2026
              </p>
              <div className="font-mono text-xs text-paper/40 mt-2">— UMass Donahue Institute, February 2025</div>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/30 border-l-4 border-warning p-6">
            <p className="font-serif text-paper/80 italic mb-3">
              "I haven't seen rate increases like this in a long, long time. The market is really, really hard right now."
            </p>
            <div className="font-mono text-xs text-paper/50">
              — Mark Gaunya, Principal at Borislow Insurance
            </div>
          </div>
          <div className="bg-slate-900/30 border-l-4 border-blood-light p-6">
            <p className="font-serif text-paper/80 italic mb-3">
              "It's just not sustainable. Nothing else has gone up that much."
            </p>
            <div className="font-mono text-xs text-paper/50">
              — Neil Abramson, Retailer in Leominster
            </div>
          </div>
        </div>

        {/* Rate hikes coming */}
        <div className="text-center">
          <div className="inline-block bg-slate-900/50 border border-blood-light/30 px-8 py-6">
            <div className="font-mono text-xs text-blood-light uppercase tracking-widest mb-2">
              Coming in 2026
            </div>
            <div className="font-mono text-4xl text-blood-light font-bold">+11.5%</div>
            <div className="font-mono text-sm text-paper/50 mt-1">
              Average premium increase approved
            </div>
            <p className="font-serif text-xs text-paper/40 mt-3 max-w-xs">
              After 8-10% hikes in 2025, another double-digit increase is locked in
            </p>
          </div>
        </div>

        {/* Source */}
        <div className="text-center mt-8">
          <div className="font-mono text-xs text-paper/30">
            Sources: CHIA • MA Division of Insurance • Kaiser Family Foundation
          </div>
        </div>
      </div>
    </section>
  )
}

export default HealthcareSection
