import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import comparisonData from '../data/ma-historical-comparison.json'

const governors = [
  {
    name: 'Mitt Romney',
    party: 'R',
    years: '2003-2007',
    budgetStart: 23,
    budgetEnd: 25.7,
    budgetGrowth: '+12%',
    catoGrade: 'C',
    keyPoints: [
      'Created Romneycare (2006)',
      'Left claiming surplus',
      'Patrick found $1B deficit',
    ],
    color: '#4169E1',
  },
  {
    name: 'Deval Patrick',
    party: 'D',
    years: '2007-2015',
    budgetStart: 25.7,
    budgetEnd: 36.5,
    budgetGrowth: '+42%',
    catoGrade: 'F',
    catoNote: 'Down from C',
    keyPoints: [
      'Raised sales tax 5% → 6.25%',
      'Pension liability +196%',
      '"Mr. Taxachusetts" — Cato',
    ],
    color: '#DC143C',
    highlight: true,
  },
  {
    name: 'Charlie Baker',
    party: 'R',
    years: '2015-2023',
    budgetStart: 36.5,
    budgetEnd: 52.7,
    budgetGrowth: '+44%',
    catoGrade: 'B',
    keyPoints: [
      'COVID spending surge',
      'Shelter crisis began',
      'Housing prices doubled',
    ],
    color: '#4169E1',
  },
  {
    name: 'Maura Healey',
    party: 'D',
    years: '2023-Present',
    budgetStart: 56,
    budgetEnd: 62,
    budgetGrowth: '+11%',
    budgetNote: '2 years',
    catoGrade: '?',
    keyPoints: [
      'Blocked pipelines (as AG)',
      '$1B+ shelter spending',
      '33,340 net outmigration',
    ],
    color: '#DC143C',
    current: true,
  },
]

// Budget data for line chart
const budgetData = [
  { year: 2003, budget: 23, gov: 'Romney' },
  { year: 2004, budget: 23.5, gov: 'Romney' },
  { year: 2005, budget: 24, gov: 'Romney' },
  { year: 2006, budget: 24.8, gov: 'Romney' },
  { year: 2007, budget: 25.7, gov: 'Patrick' },
  { year: 2008, budget: 27.5, gov: 'Patrick' },
  { year: 2009, budget: 28.2, gov: 'Patrick' },
  { year: 2010, budget: 29, gov: 'Patrick' },
  { year: 2011, budget: 30.5, gov: 'Patrick' },
  { year: 2012, budget: 32.3, gov: 'Patrick' },
  { year: 2013, budget: 33.8, gov: 'Patrick' },
  { year: 2014, budget: 35.2, gov: 'Patrick' },
  { year: 2015, budget: 36.5, gov: 'Baker' },
  { year: 2016, budget: 38.1, gov: 'Baker' },
  { year: 2017, budget: 39.4, gov: 'Baker' },
  { year: 2018, budget: 40.9, gov: 'Baker' },
  { year: 2019, budget: 42.7, gov: 'Baker' },
  { year: 2020, budget: 44.6, gov: 'Baker' },
  { year: 2021, budget: 47.6, gov: 'Baker' },
  { year: 2022, budget: 50.6, gov: 'Baker' },
  { year: 2023, budget: 52.7, gov: 'Healey' },
  { year: 2024, budget: 56, gov: 'Healey' },
  { year: 2025, budget: 58.8, gov: 'Healey' },
  { year: 2026, budget: 62, gov: 'Healey' },
]

const comparisons = [
  {
    category: 'Rainy Day Fund',
    baker: { value: '$1.1B → $8.4B', detail: '+664% growth, no new taxes', positive: true },
    healey: { value: '$8.4B → $8.2B', detail: 'Slight decrease', positive: false },
  },
  {
    category: 'Budget Growth',
    baker: { value: '38% over 8 years', detail: 'No new taxes', positive: true },
    healey: { value: '10% in 2 years', detail: 'With millionaire tax', positive: false },
  },
  {
    category: 'Tax Competitiveness',
    baker: { value: '17th worst', detail: 'Maintained without increases', positive: true },
    healey: { value: '9th worst', detail: 'Dropped 8 places', positive: false },
  },
  {
    category: 'Shelter Spending',
    baker: { value: 'No emergency', detail: 'System manageable', positive: true },
    healey: { value: '$1B+/year', detail: '"Unlawful" no-bid contracts', positive: false },
  },
  {
    category: 'Audit Response',
    baker: { value: 'N/A', detail: 'No major audit issues', positive: true },
    healey: { value: '"I doubt it"', detail: 'Rejected findings', positive: false },
  },
  {
    category: 'MBTA',
    baker: { value: 'Struggled', detail: 'FTA safety report 2022', positive: false },
    healey: { value: 'Improved', detail: 'Slow zones eliminated', positive: true },
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-950 border border-paper/20 p-4 font-serif">
        <p className="font-mono text-warning text-lg">{label}</p>
        <p className="text-blood-light font-mono text-2xl">${data.budget}B</p>
        <p className="text-paper/50 text-sm">{data.gov} administration</p>
      </div>
    )
  }
  return null
}

function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 bg-blood-dark/10 border-y border-blood-light/20">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            WHO'S RESPONSIBLE?
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            How Massachusetts got here — 23 years and 4 governors later.
          </p>
        </div>

        {/* ─── GOVERNOR TIMELINE ─── */}
        <div className="mb-16">
          <h3 className="font-display text-2xl text-warning mb-6">THE GUBERNATORIAL RECORD</h3>

          {/* Scrollable governor cards */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
            {governors.map((gov) => (
              <div
                key={gov.name}
                className={`flex-shrink-0 w-72 md:w-auto bg-slate-950 border p-5 ${
                  gov.current ? 'border-blood-light' : gov.highlight ? 'border-warning/50' : 'border-paper/20'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-display text-xl text-paper">{gov.name}</div>
                    <div className="font-mono text-xs text-paper/50">
                      {gov.party === 'D' ? 'Democrat' : 'Republican'} • {gov.years}
                    </div>
                  </div>
                  <div
                    className={`font-mono text-xs px-2 py-0.5 ${
                      gov.party === 'D' ? 'bg-blue-900/50 text-blue-300' : 'bg-red-900/50 text-red-300'
                    }`}
                  >
                    {gov.party}
                  </div>
                </div>

                {/* Budget */}
                <div className="bg-blood-dark/20 p-3 mb-3">
                  <div className="font-mono text-xs text-paper/50 mb-1">BUDGET</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl text-blood-light">{gov.budgetGrowth}</span>
                    {gov.budgetNote && (
                      <span className="font-mono text-xs text-paper/40">({gov.budgetNote})</span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-paper/50">
                    ${gov.budgetStart}B → ${gov.budgetEnd}B
                  </div>
                </div>

                {/* Cato Grade */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-paper/50">Cato Grade:</span>
                  <span
                    className={`font-mono text-lg font-bold ${
                      gov.catoGrade === 'F'
                        ? 'text-blood-light'
                        : gov.catoGrade === 'B' || gov.catoGrade === 'C'
                        ? 'text-warning'
                        : 'text-paper/40'
                    }`}
                  >
                    {gov.catoGrade}
                  </span>
                  {gov.catoNote && (
                    <span className="font-mono text-xs text-paper/40">({gov.catoNote})</span>
                  )}
                </div>

                {/* Key Points */}
                <div className="space-y-1">
                  {gov.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-paper/30 mt-0.5">•</span>
                      <span className="font-serif text-sm text-paper/70">{point}</span>
                    </div>
                  ))}
                </div>

                {gov.current && (
                  <div className="mt-3 pt-3 border-t border-paper/10">
                    <span className="font-mono text-xs text-blood-light">Current Governor</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── BUDGET GROWTH CHART ─── */}
        <div className="bg-slate-950 border border-paper/10 p-6 mb-16">
          <h3 className="font-serif text-lg text-paper/90 mb-2">State Budget Growth: 2003-2026</h3>
          <p className="font-serif text-sm text-paper/50 mb-6">
            From $23 billion to $62 billion = <span className="text-blood-light font-mono">+170%</span> in 23 years
          </p>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(250,249,246,0.1)" />
                <XAxis
                  dataKey="year"
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 11 }}
                  tickFormatter={(v) => `'${String(v).slice(2)}`}
                />
                <YAxis
                  stroke="rgba(250,249,246,0.5)"
                  tick={{ fill: 'rgba(250,249,246,0.7)', fontFamily: 'JetBrains Mono', fontSize: 11 }}
                  tickFormatter={(v) => `$${v}B`}
                  domain={[20, 65]}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Governor transition lines */}
                <ReferenceLine x={2007} stroke="#FFD700" strokeDasharray="3 3" />
                <ReferenceLine x={2015} stroke="#FFD700" strokeDasharray="3 3" />
                <ReferenceLine x={2023} stroke="#FFD700" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#DC143C"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: '#FFD700' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-mono text-paper/50">
            <span>Romney '03-'07</span>
            <span className="text-warning">|</span>
            <span>Patrick '07-'15</span>
            <span className="text-warning">|</span>
            <span>Baker '15-'23</span>
            <span className="text-warning">|</span>
            <span>Healey '23-</span>
          </div>
        </div>

        {/* ─── PATRICK SPOTLIGHT ─── */}
        <div className="bg-blood-dark border border-blood-light/50 p-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="font-mono text-6xl text-blood-light font-bold">F</div>
            <div>
              <h3 className="font-display text-2xl text-warning mb-2">
                "MR. TAXACHUSETTS"
              </h3>
              <p className="font-serif text-paper/80 mb-4">
                The Cato Institute gave Deval Patrick an <span className="text-blood-light">F grade</span> —
                down from a C in 2012 — making Massachusetts one of the worst-governed states for
                fiscal responsibility.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-3 text-center">
                  <div className="font-mono text-2xl text-blood-light">+196%</div>
                  <p className="font-serif text-xs text-paper/50">Pension liability growth</p>
                </div>
                <div className="bg-slate-950 p-3 text-center">
                  <div className="font-mono text-2xl text-blood-light">5% → 6.25%</div>
                  <p className="font-serif text-xs text-paper/50">Sales tax increase</p>
                </div>
                <div className="bg-slate-950 p-3 text-center">
                  <div className="font-mono text-2xl text-blood-light">#47</div>
                  <p className="font-serif text-xs text-paper/50">Business climate rank</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BAKER VS HEALEY COMPARISON ─── */}
        <h3 className="font-display text-2xl text-warning mb-6">BAKER VS HEALEY</h3>

        {/* Governor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-950 border border-paper/20 p-6">
            <div className="font-display text-3xl text-paper mb-2">CHARLIE BAKER</div>
            <div className="font-mono text-sm text-paper/50 mb-4">Republican • 2015-2023</div>
            <p className="font-serif text-paper/70">
              Won reelection with 67% of vote in 2018 — largest margin since 1994.
              Among highest approval ratings of any US governor throughout tenure.
            </p>
          </div>
          <div className="bg-slate-950 border border-blood-light/30 p-6">
            <div className="font-display text-3xl text-blood-light mb-2">MAURA HEALEY</div>
            <div className="font-mono text-sm text-paper/50 mb-4">Democrat • 2023-Present</div>
            <p className="font-serif text-paper/70">
              Former Attorney General. First woman and first openly gay person
              elected Governor of Massachusetts.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-paper/20">
                <th className="font-serif text-left text-paper/70 py-4 pr-4 w-1/4">Category</th>
                <th className="font-serif text-left text-paper py-4 px-4 w-[37.5%]">Baker (R)</th>
                <th className="font-serif text-left text-paper py-4 pl-4 w-[37.5%]">Healey (D)</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr key={index} className="border-b border-paper/10">
                  <td className="font-serif text-paper/70 py-6 pr-4 align-top">
                    {row.category}
                  </td>
                  <td className={`py-6 px-4 align-top ${row.baker.positive ? 'bg-green-900/10' : 'bg-blood-dark/10'}`}>
                    <div className={`font-mono text-lg mb-1 ${row.baker.positive ? 'text-green-400' : 'text-blood-light'}`}>
                      {row.baker.value}
                    </div>
                    <div className="font-serif text-sm text-paper/60">{row.baker.detail}</div>
                  </td>
                  <td className={`py-6 pl-4 align-top ${row.healey.positive ? 'bg-green-900/10' : 'bg-blood-dark/10'}`}>
                    <div className={`font-mono text-lg mb-1 ${row.healey.positive ? 'text-green-400' : 'text-blood-light'}`}>
                      {row.healey.value}
                    </div>
                    <div className="font-serif text-sm text-paper/60">{row.healey.detail}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom line */}
        <div className="bg-slate-950 border border-paper/10 p-8">
          <h3 className="font-serif text-xl text-warning mb-4">The Bottom Line</h3>
          <p className="font-serif text-paper/80 text-lg">
            {comparisonData.bottomLine.summary}
          </p>
        </div>

        {/* Key question */}
        <div className="mt-8 text-center">
          <p className="font-serif text-xl text-paper/70 italic max-w-3xl mx-auto">
            "{comparisonData.bottomLine.voterQuestion}"
          </p>
        </div>
      </div>
    </section>
  )
}

export default ComparisonSection
