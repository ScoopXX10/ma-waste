import { useState, useEffect, useRef } from 'react'
import timelineSource from '../data/ma-waste-new-features-data.json'

const timelineData = timelineSource.tippingPointTimeline

const eventTypeColors = {
  policy: '#FFD700',
  political: '#4169E1',
  energy: '#FF6B35',
  crisis: '#DC143C',
  exodus: '#DC143C',
  housing: '#FF6B35',
  scandal: '#8B5CF6',
  legal: '#4169E1',
}

const eventTypeLabels = {
  policy: 'Policy',
  political: 'Political',
  energy: 'Energy',
  crisis: 'Crisis',
  exodus: 'Exodus',
  housing: 'Housing',
  scandal: 'Scandal',
  legal: 'Legal',
}

// Events that get highlighted as key moments
const keyEvents = new Set([
  'Maura Healey becomes Attorney General',
  'Kinder Morgan cancels $3.3B Northeast Energy Direct pipeline',
  'National Grid & Eversource abandon Access Northeast',
  'Energy crisis - MA imports Russian LNG',
  "Healey brags: 'I stopped two gas pipelines'",
  'Worst outmigration year: -54,843 net domestic',
  'Emergency shelter crisis declared',
  "Healey claims: 'I never stopped pipelines'",
])

const quotes = [
  {
    afterEvent: "Healey brags: 'I stopped two gas pipelines'",
    text: "Remember, I stopped two gas pipelines from coming into this state.",
    source: "Maura Healey, April 2022",
  },
  {
    afterEvent: "Healey claims: 'I never stopped pipelines'",
    text: "I have never stopped pipelines.",
    source: "Governor Healey, October 2025",
  },
]

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.15, ...options })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function TimelineEvent({ event, index, isKey, quote }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [expanded, setExpanded] = useState(false)
  const isLeft = index % 2 === 0
  const color = eventTypeColors[event.type] || '#FFD700'
  const isCrisis = event.type === 'crisis' || event.type === 'exodus'

  return (
    <>
      <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0">
        {/* Left content (desktop) */}
        <div className={`hidden md:flex ${isLeft ? 'justify-end pr-8' : ''}`}>
          {isLeft && (
            <div
              className={`max-w-sm transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: `${100}ms` }}
            >
              <EventCard
                event={event}
                color={color}
                isKey={isKey}
                isCrisis={isCrisis}
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)}
              />
            </div>
          )}
        </div>

        {/* Center spine + dot */}
        <div className="hidden md:flex flex-col items-center relative">
          <div
            className={`w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${
              inView ? 'scale-100' : 'scale-0'
            } ${isCrisis && inView ? 'animate-pulse-once' : ''}`}
            style={{
              backgroundColor: color,
              borderColor: color,
              boxShadow: isKey ? `0 0 12px ${color}60` : 'none',
            }}
          />
        </div>

        {/* Right content (desktop) */}
        <div className={`hidden md:flex ${!isLeft ? 'pl-8' : ''}`}>
          {!isLeft && (
            <div
              className={`max-w-sm transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: `${100}ms` }}
            >
              <EventCard
                event={event}
                color={color}
                isKey={isKey}
                isCrisis={isCrisis}
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)}
              />
            </div>
          )}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex gap-4">
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className={`w-3 h-3 rounded-full z-10 transition-all duration-500 ${
                inView ? 'scale-100' : 'scale-0'
              } ${isCrisis && inView ? 'animate-pulse-once' : ''}`}
              style={{ backgroundColor: color, boxShadow: isKey ? `0 0 10px ${color}60` : 'none' }}
            />
          </div>
          <div
            className={`flex-1 transition-all duration-700 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <EventCard
              event={event}
              color={color}
              isKey={isKey}
              isCrisis={isCrisis}
              expanded={expanded}
              onToggle={() => setExpanded(!expanded)}
            />
          </div>
        </div>
      </div>

      {/* Quote callout */}
      {quote && (
        <QuoteCallout quote={quote} inView={inView} />
      )}
    </>
  )
}

function EventCard({ event, color, isKey, isCrisis, expanded, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`text-left w-full p-4 border transition-all duration-300 cursor-pointer group ${
        isKey
          ? 'border-opacity-60 bg-opacity-10'
          : 'border-paper/10 hover:border-paper/30'
      }`}
      style={{
        borderColor: isKey ? `${color}60` : undefined,
        backgroundColor: isKey ? `${color}08` : undefined,
      }}
    >
      {/* Date + type badge */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-sm text-paper/50">
          {event.month ? `${event.month} ` : ''}{event.year}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5"
          style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        >
          {eventTypeLabels[event.type]}
        </span>
      </div>

      {/* Event title */}
      <h4 className={`font-serif text-base mb-1 ${isKey ? 'text-paper' : 'text-paper/80'}`}>
        {event.event}
      </h4>

      {/* Description - always visible for key events, toggle for others */}
      <div className={`overflow-hidden transition-all duration-300 ${
        expanded || isKey ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <p className="font-serif text-sm text-paper/60 mt-1">
          {event.description}
        </p>
      </div>

      {/* Expand hint for non-key events */}
      {!isKey && (
        <div className={`font-mono text-[10px] text-paper/30 mt-1 transition-opacity ${
          expanded ? 'opacity-0' : 'opacity-100 group-hover:opacity-60'
        }`}>
          Click for details
        </div>
      )}
    </button>
  )
}

function QuoteCallout({ quote, inView }) {
  return (
    <div className={`my-6 mx-auto max-w-lg transition-all duration-700 ${
      inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`} style={{ transitionDelay: '300ms' }}>
      <div className="bg-blood-dark/30 border-l-4 border-warning p-6">
        <blockquote className="font-serif text-lg text-paper/90 italic mb-2">
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <cite className="font-mono text-sm text-warning not-italic">
          — {quote.source}
        </cite>
      </div>
    </div>
  )
}

function SpineSegment() {
  return <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-paper/10" />
}

function NarrativeMarker({ label, color = 'text-paper/30' }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <div ref={ref} className={`text-center py-6 transition-all duration-700 ${
      inView ? 'opacity-100' : 'opacity-0'
    }`}>
      <span className={`font-mono text-xs uppercase tracking-[0.3em] ${color}`}>
        {label}
      </span>
    </div>
  )
}

function TippingPointTimeline() {
  const sectionRef = useRef(null)
  const [spineHeight, setSpineHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight

      if (sectionTop < viewportHeight && sectionTop + sectionHeight > 0) {
        const progress = Math.min(
          Math.max((viewportHeight - sectionTop) / (sectionHeight + viewportHeight), 0),
          1
        )
        setSpineHeight(progress * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Build event list with quotes inserted
  const quoteMap = {}
  quotes.forEach(q => { quoteMap[q.afterEvent] = q })

  // Group events by narrative phase
  const phases = [
    { label: '— Setup: The Decisions —', startYear: 2014, endYear: 2016 },
    { label: '— Consequence: Immediate Fallout —', startYear: 2017, endYear: 2019 },
    { label: '— Acceleration: COVID + Exodus —', startYear: 2020, endYear: 2022 },
    { label: '— Present: Crises Converge —', startYear: 2023, endYear: 2024 },
    { label: '— Denial: Rewriting History —', startYear: 2025, endYear: 2099 },
  ]

  return (
    <section id="timeline" className="py-24 bg-slate-950">
      <style>{`
        @keyframes pulseOnce {
          0% { box-shadow: 0 0 0 0 currentColor; }
          50% { box-shadow: 0 0 0 8px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .animate-pulse-once {
          animation: pulseOnce 1s ease-out 0.5s 1;
        }
      `}</style>

      <div className="section-container">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            THE TIPPING POINT
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            When Massachusetts started to fail. A decade of policy decisions and their consequences.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-12">
          {Object.entries(eventTypeColors).filter(([key]) =>
            !['exodus'].includes(key)
          ).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-xs text-paper/50 uppercase">
                {eventTypeLabels[type]}
              </span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={sectionRef} className="relative">
          {/* Animated spine */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-paper/5" style={{ height: '100%' }}>
            <div
              className="w-full bg-gradient-to-b from-paper/20 via-blood-light/30 to-paper/20 transition-none"
              style={{ height: `${spineHeight}%` }}
            />
          </div>
          {/* Mobile spine */}
          <div className="md:hidden absolute left-[5px] top-0 w-0.5 bg-paper/5" style={{ height: '100%' }}>
            <div
              className="w-full bg-gradient-to-b from-paper/20 via-blood-light/30 to-paper/20 transition-none"
              style={{ height: `${spineHeight}%` }}
            />
          </div>

          <div className="space-y-8 md:space-y-6">
            {phases.map((phase, phaseIdx) => {
              const phaseEvents = timelineData.events.filter(
                e => e.year >= phase.startYear && e.year <= phase.endYear
              )
              // Calculate global index offset for alternating
              const globalOffset = timelineData.events.indexOf(phaseEvents[0])

              return (
                <div key={phaseIdx}>
                  <NarrativeMarker
                    label={phase.label}
                    color={phase.startYear >= 2023 ? 'text-blood-light/50' : 'text-paper/30'}
                  />
                  {phaseEvents.map((event, localIdx) => {
                    const globalIdx = globalOffset + localIdx
                    const isKey = keyEvents.has(event.event)
                    const quote = quoteMap[event.event] || null
                    return (
                      <TimelineEvent
                        key={`${event.year}-${localIdx}`}
                        event={event}
                        index={globalIdx}
                        isKey={isKey}
                        quote={quote}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>

          {/* End marker */}
          <div className="text-center pt-12">
            <div className="inline-block bg-blood-dark border border-blood-light/40 px-8 py-4">
              <p className="font-display text-xl text-warning">THE STORY ISN&rsquo;T OVER</p>
              <p className="font-serif text-sm text-paper/60 mt-1">
                Every decision has consequences. Every number is a person.
              </p>
            </div>
          </div>
        </div>

        {/* Source */}
        <p className="font-serif text-xs text-paper/40 mt-12">
          Sources: Fall River Reporter, Pioneer Institute, MA Division of Local Services, EIA, US Census Bureau, Mass.gov
        </p>
      </div>
    </section>
  )
}

export default TippingPointTimeline
