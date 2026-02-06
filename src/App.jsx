import {
  Hero,
  BottomLine,
  TopicCardGrid,
  CompactCalculator,
  CTASection,
  SupportSection,
  Footer,
} from './components'

function App() {
  return (
    <div className="bg-slate-950 text-paper min-h-screen">
      <main>
        <Hero />
        <div id="bottom-line">
          <BottomLine />
        </div>
        <TopicCardGrid />
        <CompactCalculator />
        <CTASection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
