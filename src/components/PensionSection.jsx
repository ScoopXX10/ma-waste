import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const taxpayerCostData = [
  { year: 'FY2024', cost: 4.1 },
  { year: 'FY2025', cost: 4.5 },
  { year: 'FY2026', cost: 4.9 },
]

const breakdownData = [
  { name: 'Teachers', unfunded: 25.5, funded: 60.4, color: '#dc2626' },
  { name: 'State', unfunded: 13.8, funded: 72.5, color: '#f59e0b' },
  { name: 'Municipal', unfunded: 15.2, funded: 65, color: '#64748b' },
]

function PensionSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-950">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-sm text-blood-light uppercase tracking-widest mb-4">
            The Pension Time Bomb
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-paper mb-4">
            <span className="text-blood-light">$42.3 BILLION</span>
          </h2>
          <p className="font-serif text-xl text-paper/60 max-w-2xl mx-auto">
            Unfunded pension liability as of January 2024. The bill is coming due.
          </p>
        </div>

        {/* Key stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-warning font-bold">65%</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              Funded Ratio
            </div>
          </div>
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-blood-light font-bold">$4.9B</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              FY2026 Taxpayer Cost
            </div>
          </div>
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-paper font-bold">104</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              Pension Systems
            </div>
          </div>
          <div className="bg-slate-900/50 border border-paper/10 p-4 text-center">
            <div className="font-mono text-3xl text-blood-light font-bold">2040</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              Full Funding Deadline
            </div>
          </div>
        </div>

        {/* Breakdown section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Breakdown by system */}
          <div className="bg-slate-900/30 border border-paper/10 p-6">
            <h3 className="font-display text-2xl text-paper mb-6">Where the Hole Is</h3>
            <div className="space-y-4">
              {breakdownData.map((system) => (
                <div key={system.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-paper/70">{system.name} Retirement</span>
                    <span className="font-mono text-lg font-bold" style={{ color: system.color }}>
                      ${system.unfunded}B
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-sm overflow-hidden">
                    <div
                      className="h-full rounded-sm"
                      style={{
                        width: `${system.funded}%`,
                        backgroundColor: system.color,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-paper/40 font-mono">
                    <span>{system.funded}% funded</span>
                    <span>{100 - system.funded}% shortfall</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Taxpayer cost trend */}
          <div className="bg-slate-900/30 border border-paper/10 p-6">
            <h3 className="font-display text-2xl text-paper mb-6">Your Annual Bill</h3>
            <p className="font-serif text-paper/60 text-sm mb-4">
              Annual taxpayer contributions to pensions (billions)
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taxpayerCostData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                    tickFormatter={(v) => `$${v}B`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid rgba(245,241,232,0.1)',
                      borderRadius: 0,
                    }}
                    labelStyle={{ color: 'rgba(245,241,232,0.7)' }}
                    formatter={(value) => [`$${value}B`, 'Taxpayer Cost']}
                  />
                  <Bar dataKey="cost" radius={[2, 2, 0, 0]}>
                    {taxpayerCostData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === taxpayerCostData.length - 1 ? '#dc2626' : '#64748b'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Historical context */}
        <div className="bg-blood-dark/20 border border-blood-light/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💣</div>
            <div>
              <div className="font-mono text-blood-light font-bold mb-2">+196% Growth (2003-2017)</div>
              <p className="font-serif text-paper/70">
                "From 2003 to 2017, Massachusetts' public pension unfunded liability increased by 196%,
                from $13.4 billion to $39.6 billion."
              </p>
              <div className="font-mono text-xs text-paper/40 mt-2">— Pioneer Institute</div>
            </div>
          </div>
        </div>

        {/* Demographic crisis */}
        <div className="text-center">
          <div className="inline-block bg-slate-900/50 border border-paper/10 px-8 py-4">
            <div className="font-mono text-4xl text-warning font-bold">1.3 : 1</div>
            <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
              Workers per Retiree
            </div>
            <p className="font-serif text-sm text-paper/40 mt-2 max-w-xs">
              The math doesn't work. Fewer workers supporting more retirees every year.
            </p>
          </div>
        </div>

        {/* Source */}
        <div className="text-center mt-8">
          <div className="font-mono text-xs text-paper/30">
            Sources: PERAC Annual Report • PRIT Fund • Pioneer Institute
          </div>
        </div>
      </div>
    </section>
  )
}

export default PensionSection
