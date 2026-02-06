import { useState } from 'react'

const RATES = {
  maPropertyTaxRate: 0.0112,
  nationalPropertyTaxRate: 0.0090,
  maElectricRate: 0.3122,
  nationalElectricRate: 0.178,
  maGasRate: 2.51,
  nationalGasRate: 1.35,
  avgAnnualTherms: 600,
  maTaxRate: 0.05,
  avgStateTaxRate: 0.046,
}

function CompactCalculator() {
  const [homeValue, setHomeValue] = useState(638000)
  const [income, setIncome] = useState(100000)
  const [showResult, setShowResult] = useState(false)

  // Simplified calculation (property tax + electricity + gas + income tax)
  const propertyTaxPremium = homeValue * (RATES.maPropertyTaxRate - RATES.nationalPropertyTaxRate)
  const electricityPremium = 900 * 12 * (RATES.maElectricRate - RATES.nationalElectricRate) // avg 900 kWh/mo
  const gasPremium = RATES.avgAnnualTherms * (RATES.maGasRate - RATES.nationalGasRate)
  const incomeTaxPremium = income * (RATES.maTaxRate - RATES.avgStateTaxRate)
  const totalPremium = Math.round(propertyTaxPremium + electricityPremium + gasPremium + incomeTaxPremium)

  const formatCurrency = (value) => new Intl.NumberFormat('en-US').format(value)
  const parseCurrency = (str) => {
    const num = parseInt(str.replace(/[^0-9]/g, ''), 10)
    return isNaN(num) ? 0 : num
  }

  return (
    <section className="py-16 md:py-20 bg-slate-950 border-y border-paper/10">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-blood-light mb-3">
              CALCULATE YOUR MA PREMIUM
            </h2>
            <p className="font-serif text-lg text-paper/60">
              How much extra are you paying to live here?
            </p>
          </div>

          {/* Compact form */}
          <div className="bg-blood-dark/20 border border-blood-light/20 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Home Value */}
              <div>
                <label className="block font-mono text-xs text-paper/50 uppercase tracking-wider mb-2">
                  Home Value
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-paper/50">$</span>
                  <input
                    type="text"
                    value={formatCurrency(homeValue)}
                    onChange={(e) => {
                      setHomeValue(parseCurrency(e.target.value))
                      setShowResult(false)
                    }}
                    className="w-full bg-slate-950 border border-paper/20 text-paper font-mono text-lg
                      pl-8 pr-4 py-3 focus:border-warning focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Income */}
              <div>
                <label className="block font-mono text-xs text-paper/50 uppercase tracking-wider mb-2">
                  Annual Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-paper/50">$</span>
                  <input
                    type="text"
                    value={formatCurrency(income)}
                    onChange={(e) => {
                      setIncome(parseCurrency(e.target.value))
                      setShowResult(false)
                    }}
                    className="w-full bg-slate-950 border border-paper/20 text-paper font-mono text-lg
                      pl-8 pr-4 py-3 focus:border-warning focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Calculate / Result */}
            {!showResult ? (
              <button
                onClick={() => setShowResult(true)}
                className="w-full bg-blood-light hover:bg-blood-light/90 text-paper font-display
                  text-xl py-4 transition-colors tracking-wider"
              >
                CALCULATE
              </button>
            ) : (
              <div className="bg-slate-950 border border-blood-light/50 p-6 text-center animate-fade-in">
                <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-2">
                  Your Annual MA Premium
                </div>
                <div className="font-mono text-5xl md:text-6xl text-blood-light font-bold mb-2">
                  ${formatCurrency(totalPremium)}
                </div>
                <div className="font-mono text-lg text-warning mb-4">
                  ${formatCurrency(Math.round(totalPremium / 12))}/month
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-paper/10 pt-4 mt-4">
                  <div>
                    <div className="font-mono text-xs text-paper/40">Property Tax</div>
                    <div className="font-mono text-sm text-blood-light">+${formatCurrency(Math.round(propertyTaxPremium))}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-paper/40">Electricity</div>
                    <div className="font-mono text-sm text-blood-light">+${formatCurrency(Math.round(electricityPremium))}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-paper/40">Natural Gas</div>
                    <div className="font-mono text-sm text-blood-light">+${formatCurrency(Math.round(gasPremium))}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-paper/40">Income Tax</div>
                    <div className="font-mono text-sm text-blood-light">+${formatCurrency(Math.round(incomeTaxPremium))}</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowResult(false)}
                  className="mt-4 font-mono text-xs text-paper/40 hover:text-warning transition-colors"
                >
                  Recalculate
                </button>
              </div>
            )}
          </div>

          {/* Source note */}
          <p className="font-serif text-xs text-paper/30 text-center mt-4">
            Based on MA vs national average rates. Sources: Tax Foundation, EIA, MA DOR
          </p>
        </div>
      </div>
    </section>
  )
}

export default CompactCalculator
