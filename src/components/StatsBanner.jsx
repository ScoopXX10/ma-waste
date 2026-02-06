const stats = [
  { value: '10×', label: 'Outmigration increase', sublabel: '2010 to 2023' },
  { value: '$10.6B', label: 'Income fled', sublabel: '2020-2022 alone' },
  { value: '75%', label: 'Above national avg', sublabel: 'electricity costs' },
  { value: '$1B+', label: 'Annual shelter spend', sublabel: '"unlawful" contracts' },
  { value: '#5', label: 'Worst for exodus', sublabel: 'in the nation' },
]

function StatsBanner() {
  return (
    <section id="stats-banner" className="bg-blood-dark py-12 border-y border-blood-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-warning mb-1">
                {stat.value}
              </div>
              <div className="font-serif text-paper/90 text-sm md:text-base">
                {stat.label}
              </div>
              <div className="font-serif text-paper/50 text-xs md:text-sm">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
