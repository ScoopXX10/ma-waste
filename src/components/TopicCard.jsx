function TopicCard({ icon, title, stat, statLabel, teaser, onClick, delay = 0 }) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-slate-950 border border-paper/10 p-6 md:p-8 text-left
        hover:border-blood-light/50 hover:bg-blood-dark/10 transition-all duration-300
        transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blood-light/5
        focus:outline-none focus:ring-2 focus:ring-warning focus:ring-offset-2 focus:ring-offset-slate-950"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blood-light/10 to-transparent transform rotate-45 translate-x-12 -translate-y-12 group-hover:from-blood-light/20 transition-colors" />
      </div>

      {/* Icon */}
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl md:text-2xl text-paper mb-3 group-hover:text-warning transition-colors">
        {title}
      </h3>

      {/* Big Stat */}
      <div className="mb-3">
        <div className="font-mono text-4xl md:text-5xl text-blood-light font-bold leading-none">
          {stat}
        </div>
        <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mt-1">
          {statLabel}
        </div>
      </div>

      {/* Teaser */}
      <p className="font-serif text-paper/60 text-sm mb-4 line-clamp-2">
        {teaser}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-2 font-mono text-sm text-warning group-hover:text-paper transition-colors">
        <span>See the data</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-blood-light/5 to-transparent" />
      </div>
    </button>
  )
}

export default TopicCard
