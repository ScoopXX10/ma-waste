import { useState, useEffect } from 'react'

const navItems = [
  { id: 'squeeze', label: 'The Squeeze' },
  { id: 'calculator', label: 'Your Premium' },
  { id: 'spending', label: 'Spending' },
  { id: 'budget', label: 'Budget' },
  { id: 'fraud', label: 'Fraud' },
  { id: 'comparison', label: 'Baker vs Healey' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'exodus', label: 'The Exodus' },
  { id: 'housing', label: 'Housing' },
  { id: 'town-map', label: 'Your Town' },
  { id: 'energy', label: 'Energy' },
]

function Navigation() {
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setVisible(window.scrollY > heroHeight * 0.8)

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPos = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-slate-950/95 backdrop-blur-sm border-b border-paper/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-2xl text-blood-light hover:text-warning transition-colors"
            >
              MA-WASTE
            </button>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 font-serif text-sm transition-colors ${
                    activeSection === item.id
                      ? 'text-warning'
                      : 'text-paper/70 hover:text-paper'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
