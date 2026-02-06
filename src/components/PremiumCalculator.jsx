import { useState, useEffect, useRef } from 'react'

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

const HOOKS = [
  "That's a family vacation. Gone.",
  "That's a new iPhone every year. Gone.",
  "That's a car payment every month. Gone.",
  "That's your kid's college fund. Gone.",
  "That's 3 months of groceries. Gone.",
]

function useCountUp(target, duration = 800, active = false) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!active) { setValue(0); return }
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target, duration, active])

  return value
}

function BreakdownBar({ label, amount, total, delay, active }) {
  const [width, setWidth] = useState(0)
  const displayAmount = useCountUp(amount, 800, active)

  useEffect(() => {
    if (!active) { setWidth(0); return }
    const timer = setTimeout(() => {
      setWidth(total > 0 ? Math.max((amount / total) * 100, 4) : 0)
    }, delay)
    return () => clearTimeout(timer)
  }, [amount, total, delay, active])

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-serif text-paper/80 text-sm">{label}</span>
        <span className="font-mono text-blood-light text-sm">
          ${displayAmount.toLocaleString()}/yr
        </span>
      </div>
      <div className="h-3 bg-paper/5 overflow-hidden">
        <div
          className="h-full bg-blood-light transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function PremiumCalculator() {
  const [homeValue, setHomeValue] = useState(638000)
  const [income, setIncome] = useState(100000)
  const [heatingType, setHeatingType] = useState('Natural Gas')
  const [monthlyKwh, setMonthlyKwh] = useState(900)
  const [calculated, setCalculated] = useState(false)
  const [hook] = useState(() => HOOKS[Math.floor(Math.random() * HOOKS.length)])
  const resultsRef = useRef(null)

  // Calculations
  const propertyTaxPremium = homeValue * (RATES.maPropertyTaxRate - RATES.nationalPropertyTaxRate)
  const annualKwh = monthlyKwh * 12
  const electricityPremium = annualKwh * (RATES.maElectricRate - RATES.nationalElectricRate)
  const gasPremium = heatingType === 'Natural Gas'
    ? RATES.avgAnnualTherms * (RATES.maGasRate - RATES.nationalGasRate)
    : 0
  const incomeTaxPremium = income * (RATES.maTaxRate - RATES.avgStateTaxRate)
  const totalPremium = Math.round(propertyTaxPremium + electricityPremium + gasPremium + incomeTaxPremium)
  const monthlyPremium = Math.round(totalPremium / 12)

  const displayTotal = useCountUp(totalPremium, 1200, calculated)
  const displayMonthly = useCountUp(monthlyPremium, 1200, calculated)

  const handleCalculate = () => {
    setCalculated(true)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  // Recalculate on input change
  useEffect(() => {
    if (calculated) setCalculated(false)
  }, [homeValue, income, heatingType, monthlyKwh])

  const formatCurrencyInput = (value) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const parseCurrencyInput = (str) => {
    const num = parseInt(str.replace(/[^0-9]/g, ''), 10)
    return isNaN(num) ? 0 : num
  }

  return (
    <section id="calculator" className="py-24 bg-blood-dark/10 border-y border-blood-light/20">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            YOUR MA PREMIUM
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            How much more are you paying to live in Massachusetts vs. the average American?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-slate-950 border border-paper/10 p-6 md:p-8">
            <h3 className="font-mono text-sm text-paper/50 uppercase tracking-wider mb-6">
              Enter Your Details
            </h3>

            <div className="space-y-6">
              {/* Home Value */}
              <div>
                <label className="block font-serif text-paper/80 mb-2">
                  Home Value
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-paper/50">$</span>
                  <input
                    type="text"
                    value={formatCurrencyInput(homeValue)}
                    onChange={(e) => setHomeValue(parseCurrencyInput(e.target.value))}
                    className="w-full bg-paper/5 border border-paper/20 text-paper font-mono text-lg
                      pl-8 pr-4 py-3 focus:border-warning focus:outline-none transition-colors"
                  />
                </div>
                <p className="font-mono text-xs text-paper/40 mt-1">MA median: $638,000</p>
              </div>

              {/* Annual Income */}
              <div>
                <label className="block font-serif text-paper/80 mb-2">
                  Annual Household Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-paper/50">$</span>
                  <input
                    type="text"
                    value={formatCurrencyInput(income)}
                    onChange={(e) => setIncome(parseCurrencyInput(e.target.value))}
                    className="w-full bg-paper/5 border border-paper/20 text-paper font-mono text-lg
                      pl-8 pr-4 py-3 focus:border-warning focus:outline-none transition-colors"
                  />
                </div>
                <p className="font-mono text-xs text-paper/40 mt-1">MA median: ~$114,000</p>
              </div>

              {/* Heating Type */}
              <div>
                <label className="block font-serif text-paper/80 mb-2">
                  Heating Type
                </label>
                <select
                  value={heatingType}
                  onChange={(e) => setHeatingType(e.target.value)}
                  className="w-full bg-paper/5 border border-paper/20 text-paper font-mono text-lg
                    px-4 py-3 focus:border-warning focus:outline-none transition-colors appearance-none
                    cursor-pointer"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23faf9f6\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Electric">Electric</option>
                  <option value="Oil">Oil</option>
                </select>
              </div>

              {/* Monthly kWh */}
              <div>
                <label className="block font-serif text-paper/80 mb-2">
                  Monthly Electric Usage (kWh)
                </label>
                <input
                  type="number"
                  value={monthlyKwh}
                  onChange={(e) => setMonthlyKwh(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-paper/5 border border-paper/20 text-paper font-mono text-lg
                    px-4 py-3 focus:border-warning focus:outline-none transition-colors"
                />
                <p className="font-mono text-xs text-paper/40 mt-1">Average MA home: ~900 kWh/month</p>
              </div>

              {/* Calculate button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-blood-light hover:bg-blood-light/90 text-paper font-display
                  text-2xl py-4 transition-colors tracking-wider"
              >
                CALCULATE MY PREMIUM
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div ref={resultsRef}>
            {calculated ? (
              <div className="bg-slate-950 border border-blood-light/50 p-6 md:p-8 animate-fade-in">
                <h3 className="font-mono text-sm text-paper/50 uppercase tracking-wider mb-6">
                  Your Massachusetts Premium
                </h3>

                {/* Total */}
                <div className="text-center mb-8 pb-8 border-b border-paper/10">
                  <div className="font-mono text-6xl md:text-7xl text-blood-light font-bold mb-2">
                    ${displayTotal.toLocaleString()}
                  </div>
                  <div className="font-mono text-xl text-paper/60">
                    per year
                  </div>
                  <div className="font-mono text-2xl text-warning mt-2">
                    (${displayMonthly.toLocaleString()}/month)
                  </div>
                </div>

                {/* Breakdown */}
                <div className="mb-8">
                  <h4 className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-4">
                    Breakdown
                  </h4>
                  <BreakdownBar
                    label="Property Tax Premium"
                    amount={Math.round(propertyTaxPremium)}
                    total={totalPremium}
                    delay={200}
                    active={calculated}
                  />
                  <BreakdownBar
                    label="Electricity Premium"
                    amount={Math.round(electricityPremium)}
                    total={totalPremium}
                    delay={400}
                    active={calculated}
                  />
                  {heatingType === 'Natural Gas' && (
                    <BreakdownBar
                      label="Natural Gas Premium"
                      amount={Math.round(gasPremium)}
                      total={totalPremium}
                      delay={600}
                      active={calculated}
                    />
                  )}
                  <BreakdownBar
                    label="State Income Tax Premium"
                    amount={Math.round(incomeTaxPremium)}
                    total={totalPremium}
                    delay={800}
                    active={calculated}
                  />
                </div>

                {/* Rate comparison detail */}
                <div className="bg-paper/5 p-4 mb-6">
                  <h4 className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-3">
                    Rate Comparison
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-serif text-paper/70">Property Tax Rate</span>
                      <span className="font-mono">
                        <span className="text-blood-light">1.12%</span>
                        <span className="text-paper/40"> vs </span>
                        <span className="text-paper/60">0.90% avg</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif text-paper/70">Electricity</span>
                      <span className="font-mono">
                        <span className="text-blood-light">31.2¢</span>
                        <span className="text-paper/40"> vs </span>
                        <span className="text-paper/60">17.8¢/kWh</span>
                      </span>
                    </div>
                    {heatingType === 'Natural Gas' && (
                      <div className="flex justify-between">
                        <span className="font-serif text-paper/70">Natural Gas</span>
                        <span className="font-mono">
                          <span className="text-blood-light">$2.51</span>
                          <span className="text-paper/40"> vs </span>
                          <span className="text-paper/60">$1.35/therm</span>
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-serif text-paper/70">Income Tax</span>
                      <span className="font-mono">
                        <span className="text-blood-light">5.00%</span>
                        <span className="text-paper/40"> vs </span>
                        <span className="text-paper/60">4.60% avg</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emotional hook */}
                <div className="text-center pt-6 border-t border-paper/10">
                  <p className="font-display text-2xl text-warning">
                    {hook}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 border border-paper/10 p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="font-mono text-8xl text-paper/10 mb-6">$?</div>
                <p className="font-serif text-xl text-paper/50 mb-2">
                  Enter your details and hit calculate
                </p>
                <p className="font-serif text-paper/30">
                  See how much more you pay compared to the average American
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Methodology note */}
        <div className="mt-8 bg-paper/5 border border-paper/10 p-6">
          <h4 className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-2">Methodology</h4>
          <p className="font-serif text-sm text-paper/50">
            Compares Massachusetts rates to national averages. Property tax: MA effective rate 1.12% vs 0.90% national
            (Tax Foundation). Electricity: MA 31.22¢/kWh vs 17.8¢ national (EIA, Jan 2026). Natural gas: MA $2.51/therm
            vs $1.35 national (EIA). Income tax: MA flat 5% vs 4.6% weighted national average. Individual results vary.
          </p>
        </div>

        {/* Source citation */}
        <p className="font-serif text-xs text-paper/40 mt-4">
          Sources: Tax Foundation, U.S. Energy Information Administration, MA Department of Revenue
        </p>
      </div>
    </section>
  )
}

export default PremiumCalculator
