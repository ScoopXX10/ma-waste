function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById('stats-banner')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-slate-950 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(250, 249, 246, 0.03) 50px,
            rgba(250, 249, 246, 0.03) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(250, 249, 246, 0.03) 50px,
            rgba(250, 249, 246, 0.03) 51px
          )`
        }} />
      </div>

      <div className="section-container text-center relative z-10">
        {/* Eyebrow */}
        <div className="font-mono text-warning text-sm md:text-base tracking-widest mb-6 uppercase">
          Data-Driven Accountability
        </div>

        {/* Main title */}
        <h1 className="font-display text-8xl md:text-[12rem] lg:text-[16rem] leading-none text-blood-light mb-4 tracking-tight">
          MA-WASTE
        </h1>

        {/* Subtitle */}
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-paper/90 max-w-4xl mx-auto mb-8">
          People are voting with their feet —<br />
          <span className="text-warning">and they're voting AGAINST Massachusetts</span>
        </p>

        {/* Supporting text */}
        <p className="font-serif text-lg text-paper/60 max-w-2xl mx-auto mb-12">
          Official government data reveals a state in decline. High taxes. Runaway spending.
          Policies that drive residents to flee. The numbers don't lie.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToContent}
          className="group font-mono text-sm uppercase tracking-widest text-paper/70 hover:text-warning transition-colors"
        >
          <span>See the data</span>
          <div className="mt-4 animate-bounce">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}

export default Hero
