import {
  Navigation,
  Hero,
  StatsBanner,
  SqueezeSection,
  PremiumCalculator,
  OutmigrationSection,
  WealthDrainSection,
  SpendingSection,
  ComparisonSection,
  TippingPointTimeline,
  BudgetSankey,
  ExodusMap,
  AffordabilityGap,
  StateComparison,
  FraudSection,
  HousingSection,
  TownMapSection,
  EnergySection,
  Footer,
} from './components'

function App() {
  return (
    <div className="bg-slate-950 text-paper min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <StatsBanner />
        <SqueezeSection />
        <PremiumCalculator />
        <StateComparison />
        <SpendingSection />
        <BudgetSankey />
        <FraudSection />
        <ComparisonSection />
        <TippingPointTimeline />
        <OutmigrationSection />
        <ExodusMap />
        <WealthDrainSection />
        <AffordabilityGap />
        <HousingSection />
        <TownMapSection />
        <EnergySection />
      </main>
      <Footer />
    </div>
  )
}

export default App
