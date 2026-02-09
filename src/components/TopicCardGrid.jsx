import { useState } from 'react'
import TopicCard from './TopicCard'
import Drawer from './Drawer'

// Import full section content for drawers
import OutmigrationSection from './OutmigrationSection'
import ExodusMap from './ExodusMap'
import WealthDrainSection from './WealthDrainSection'
import SpendingSection from './SpendingSection'
import BudgetSankey from './BudgetSankey'
import FraudSection from './FraudSection'
import HousingSection from './HousingSection'
import AffordabilityGap from './AffordabilityGap'
import EnergySection from './EnergySection'
import ComparisonSection from './ComparisonSection'
import TippingPointTimeline from './TippingPointTimeline'
import StateComparison from './StateComparison'
import PremiumCalculator from './PremiumCalculator'
import TownMapSection from './TownMapSection'
import PensionSection from './PensionSection'
import HealthcareSection from './HealthcareSection'

const topics = [
  {
    id: 'exodus',
    icon: '🚪',
    title: 'THE EXODUS',
    stat: '33,340',
    statLabel: 'Net loss in 2025',
    teaser: 'People are voting with their feet. 182,000 left Massachusetts last year alone.',
    drawerTitle: 'THE EXODUS: Migration Data',
    sources: ['Census', 'IRS SOI', 'BLS'],
    content: (
      <>
        <OutmigrationSection />
        <ExodusMap />
        <WealthDrainSection />
      </>
    ),
  },
  {
    id: 'burden',
    icon: '💸',
    title: 'YOUR BURDEN',
    stat: '$4,000+',
    statLabel: 'Extra cost per year',
    teaser: 'What it costs YOU to live in Massachusetts vs. the national average.',
    drawerTitle: 'YOUR BURDEN: The MA Premium',
    sources: ['BLS', 'EIA', 'Census ACS'],
    content: (
      <>
        <PremiumCalculator />
        <StateComparison />
      </>
    ),
  },
  {
    id: 'waste',
    icon: '🔥',
    title: 'WASTE & FRAUD',
    stat: '$1B+',
    statLabel: 'Annual shelter spending',
    teaser: 'No-bid contracts, SNAP fraud, and $2.1 billion owed to the feds.',
    drawerTitle: 'WASTE & FRAUD: Where Your Money Goes',
    sources: ['State Auditor', 'OCPF', 'USDA-OIG'],
    content: (
      <>
        <SpendingSection />
        <BudgetSankey />
        <FraudSection />
      </>
    ),
  },
  {
    id: 'housing',
    icon: '🏠',
    title: 'HOUSING CRISIS',
    stat: '+245%',
    statLabel: 'Home prices since 2000',
    teaser: "Prices up 245% while incomes only rose 114%. You can't afford to stay.",
    drawerTitle: 'HOUSING CRISIS: The Affordability Gap',
    sources: ['Warren Group', 'Census ACS', 'Zillow'],
    content: (
      <>
        <AffordabilityGap />
        <HousingSection />
        <TownMapSection />
      </>
    ),
  },
  {
    id: 'energy',
    icon: '⚡',
    title: 'ENERGY COSTS',
    stat: '75%',
    statLabel: 'Above US average',
    teaser: 'Highest electricity rates in the continental US. Policy contradictions abound.',
    drawerTitle: 'ENERGY COSTS: Why You Pay More',
    sources: ['EIA', 'BLS', 'DOER'],
    content: <EnergySection />,
  },
  {
    id: 'pensions',
    icon: '💣',
    title: 'PENSION TIME BOMB',
    stat: '$42.3B',
    statLabel: 'Unfunded liability',
    teaser: 'Only 65% funded. $4.9 billion taxpayer bill in FY2026 alone. The math doesn\'t work.',
    drawerTitle: 'PENSION TIME BOMB: The $42B Hole',
    sources: ['PERAC', 'PRIT Fund', 'Pioneer'],
    content: <PensionSection />,
  },
  {
    id: 'healthcare',
    icon: '🏥',
    title: 'HEALTHCARE CRISIS',
    stat: '$32,469',
    statLabel: 'Family cost per year',
    teaser: '#1 most expensive state for healthcare. Half of small businesses may close within 5 years.',
    drawerTitle: 'HEALTHCARE CRISIS: #1 Most Expensive',
    sources: ['CHIA', 'MA DOI', 'KFF'],
    content: <HealthcareSection />,
  },
  {
    id: 'accountability',
    icon: '⚖️',
    title: "WHO'S RESPONSIBLE",
    stat: '2003→2026',
    statLabel: 'Four governors',
    teaser: 'From Romney to Healey: 23 years of budget growth and policy decisions.',
    drawerTitle: "WHO'S RESPONSIBLE: The Political Record",
    sources: ['Cato Institute', 'Mass.gov', 'State Budget'],
    content: (
      <>
        <ComparisonSection />
        <TippingPointTimeline />
      </>
    ),
  },
]

function TopicCardGrid() {
  const [activeDrawer, setActiveDrawer] = useState(null)

  const openDrawer = (id) => setActiveDrawer(id)
  const closeDrawer = () => setActiveDrawer(null)

  const activeTopic = topics.find((t) => t.id === activeDrawer)

  return (
    <section className="py-16 md:py-24 bg-slate-950">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-4">
            EXPLORE THE DATA
          </h2>
          <p className="font-serif text-lg text-paper/60 max-w-2xl mx-auto">
            Click any topic to see the full analysis with charts, sources, and context.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              icon={topic.icon}
              title={topic.title}
              stat={topic.stat}
              statLabel={topic.statLabel}
              teaser={topic.teaser}
              sources={topic.sources}
              onClick={() => openDrawer(topic.id)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={!!activeDrawer}
        onClose={closeDrawer}
        title={activeTopic?.drawerTitle || ''}
      >
        {activeTopic && (
          <div className="drawer-content">
            {/* Remove section IDs and padding to prevent scroll issues */}
            <style>{`
              .drawer-content section {
                padding-top: 0 !important;
                padding-bottom: 2rem !important;
              }
              .drawer-content section:first-child {
                padding-top: 0 !important;
              }
              .drawer-content .section-container {
                padding-left: 0 !important;
                padding-right: 0 !important;
                max-width: none !important;
              }
            `}</style>
            {activeTopic.content}
          </div>
        )}
      </Drawer>
    </section>
  )
}

export default TopicCardGrid
