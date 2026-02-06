import comparisonData from '../data/ma-historical-comparison.json'

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

function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 bg-blood-dark/10 border-y border-blood-light/20">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            BAKER VS HEALEY
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            A side-by-side comparison of Massachusetts under two different administrations.
          </p>
        </div>

        {/* Governor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-950 border border-paper/20 p-6">
            <div className="font-display text-4xl text-paper mb-2">CHARLIE BAKER</div>
            <div className="font-mono text-sm text-paper/50 mb-4">Republican • 2015-2023</div>
            <p className="font-serif text-paper/70">
              Won reelection with 67% of vote in 2018 — largest margin since 1994.
              Among highest approval ratings of any US governor throughout tenure.
            </p>
          </div>
          <div className="bg-slate-950 border border-blood-light/30 p-6">
            <div className="font-display text-4xl text-blood-light mb-2">MAURA HEALEY</div>
            <div className="font-mono text-sm text-paper/50 mb-4">Democrat • 2023-Present</div>
            <p className="font-serif text-paper/70">
              Former Attorney General. First woman and first openly gay person
              elected Governor of Massachusetts.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
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
        <div className="mt-12 bg-slate-950 border border-paper/10 p-8">
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
