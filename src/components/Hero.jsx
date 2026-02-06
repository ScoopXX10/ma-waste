function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById('bottom-line')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center relative bg-slate-950 overflow-hidden">
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

      {/* Animated gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blood-light/40 via-blood-dark/20 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="section-container text-center relative z-10">
        {/* Eyebrow */}
        <div className="font-mono text-warning text-xs md:text-sm tracking-[0.3em] mb-6 uppercase">
          Official Government Data
        </div>

        {/* Main title */}
        <h1 className="font-display text-7xl md:text-[10rem] lg:text-[14rem] leading-none text-blood-light mb-6 tracking-tight">
          MA-WASTE
        </h1>

        {/* The ONE stat */}
        <div className="mb-8">
          <div className="font-mono text-6xl md:text-8xl lg:text-9xl text-paper font-bold mb-2">
            182,000
          </div>
          <p className="font-serif text-xl md:text-2xl text-paper/80">
            people left Massachusetts in 2025
          </p>
          <p className="font-mono text-base text-paper/50 mt-2">
            Only 152,000 moved in
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToContent}
          className="group inline-flex flex-col items-center font-mono text-sm uppercase tracking-widest text-paper/60 hover:text-warning transition-colors"
        >
          <span className="mb-3">See why</span>
          <div className="w-10 h-10 border border-paper/30 group-hover:border-warning rounded-full flex items-center justify-center group-hover:bg-warning/10 transition-all">
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
