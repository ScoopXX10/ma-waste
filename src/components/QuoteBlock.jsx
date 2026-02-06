function QuoteBlock({ quote, speaker, role, source, year, variant = 'default' }) {
  const isHighlight = variant === 'highlight'

  return (
    <blockquote className={`border-l-4 pl-6 py-4 my-8 ${isHighlight ? 'border-blood-light bg-blood-dark/10' : 'border-warning'}`}>
      <p className={`font-serif text-xl md:text-2xl italic ${isHighlight ? 'text-paper' : 'text-paper/90'}`}>
        "{quote}"
      </p>
      <footer className="mt-4 font-serif text-paper/70">
        {speaker && <span className="font-semibold text-paper/90">{speaker}</span>}
        {role && <span className="text-paper/60">, {role}</span>}
        {source && !speaker && <span className="font-semibold text-paper/90">{source}</span>}
        {source && speaker && <span className="text-paper/60"> — {source}</span>}
        {year && <span className="text-paper/50">, {year}</span>}
      </footer>
    </blockquote>
  )
}

export default QuoteBlock
