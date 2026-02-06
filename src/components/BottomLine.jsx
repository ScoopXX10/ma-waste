function BottomLine() {
  return (
    <section className="py-16 md:py-20 bg-slate-950 border-b border-paper/10">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blood-light/50" />
            <span className="font-mono text-xs text-warning uppercase tracking-[0.3em]">
              The Bottom Line
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blood-light/50" />
          </div>

          {/* Main statement */}
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-paper/90 text-center leading-relaxed mb-8">
            Massachusetts costs{' '}
            <span className="text-blood-light font-semibold">$4,000+ more per year</span>{' '}
            to live in than the national average. High taxes, runaway spending, and
            housing costs are driving out residents—especially high earners—taking{' '}
            <span className="text-warning font-semibold">$10.6 billion in income</span>{' '}
            with them since 2020.
          </p>

          {/* Supporting statement */}
          <p className="font-serif text-base md:text-lg text-paper/50 text-center max-w-2xl mx-auto">
            This site uses official government data to show what's happening
            and who's responsible.
          </p>

          {/* Visual separator */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blood-light/50 transform rotate-45" />
              <div className="w-2 h-2 bg-blood-light transform rotate-45" />
              <div className="w-2 h-2 bg-blood-light/50 transform rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BottomLine
