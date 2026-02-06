const sources = [
  { name: 'US Census Bureau', url: 'https://www.census.gov/' },
  { name: 'IRS Statistics of Income', url: 'https://www.irs.gov/statistics/soi-tax-stats' },
  { name: 'MA State Auditor', url: 'https://www.mass.gov/orgs/office-of-the-state-auditor' },
  { name: 'EIA', url: 'https://www.eia.gov/' },
  { name: 'Bureau of Labor Statistics', url: 'https://www.bls.gov/' },
  { name: 'Pioneer Institute', url: 'https://pioneerinstitute.org/' },
  { name: 'Tax Foundation', url: 'https://taxfoundation.org/' },
  { name: 'The Warren Group', url: 'https://www.thewarrengroup.com/' },
]

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-paper/10 py-16">
      <div className="section-container">
        {/* Sources */}
        <div className="mb-12">
          <h3 className="font-display text-2xl text-paper mb-6">DATA SOURCES</h3>
          <div className="flex flex-wrap gap-4">
            {sources.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-paper/60 hover:text-warning transition-colors text-sm"
              >
                {source.name}
              </a>
            ))}
          </div>
        </div>

        {/* Methodology note */}
        <div className="border-t border-paper/10 pt-8 mb-12">
          <p className="font-serif text-paper/50 text-sm max-w-3xl">
            All data presented on this site comes from official government sources or
            peer-reviewed research institutions. We strive for accuracy and provide
            source citations for all claims. If you find an error, please let us know.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-3xl text-blood-light">MA-WASTE</div>
          <p className="font-serif text-paper/40 text-sm">
            Let the numbers speak for themselves.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
