import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { MapContainer, GeoJSON, useMap } from 'react-leaflet'
import { scaleLinear } from 'd3-scale'
import 'leaflet/dist/leaflet.css'
import townData from '../data/ma-town-data.json'
import geoData from '../data/ma-municipalities-full.js'

// Color scale for tax bills - green (low) to red (high)
const colorScale = scaleLinear()
  .domain([700, 5000, 10000, 15000, 25000])
  .range(['#16a34a', '#84cc16', '#eab308', '#f97316', '#DC143C'])
  .clamp(true)

// Create a lookup map for town data by name
const townDataMap = {}
townData.towns.forEach(town => {
  townDataMap[town.name] = town
  // Also add uppercase version for matching
  townDataMap[town.name.toUpperCase()] = town
})

// Component to fit bounds
function FitBounds({ geoJsonRef }) {
  const map = useMap()

  useEffect(() => {
    if (geoJsonRef.current) {
      const bounds = geoJsonRef.current.getBounds()
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] })
      }
    }
  }, [map, geoJsonRef])

  return null
}

function TownMapSection() {
  const [selectedTown, setSelectedTown] = useState(null)
  const [hoveredTown, setHoveredTown] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('taxBill')
  const geoJsonRef = useRef(null)

  const sortedTowns = useMemo(() => {
    const towns = [...townData.towns]
    if (sortBy === 'taxBill') {
      return towns.sort((a, b) => b.avgTaxBill - a.avgTaxBill)
    } else if (sortBy === 'taxRate') {
      return towns.sort((a, b) => b.taxRate - a.taxRate)
    } else if (sortBy === 'population') {
      return towns.sort((a, b) => (b.populationChange || 0) - (a.populationChange || 0))
    }
    return towns
  }, [sortBy])

  const displayTown = hoveredTown || selectedTown

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  const getPopulationChangeColor = (change) => {
    if (change > 1) return 'text-green-400'
    if (change > 0) return 'text-green-300'
    if (change > -1) return 'text-paper/70'
    return 'text-blood-light'
  }

  const getPopulationChangeIcon = (change) => {
    if (change > 0) return '↑'
    if (change < 0) return '↓'
    return '→'
  }

  // Find matching town data for a GeoJSON feature
  const findTownData = useCallback((featureName) => {
    if (!featureName) return null
    // Try exact match first
    if (townDataMap[featureName]) return townDataMap[featureName]
    // Try uppercase match
    if (townDataMap[featureName.toUpperCase()]) return townDataMap[featureName.toUpperCase()]
    // Try with common variations
    const variations = [
      featureName,
      featureName.replace(/ Town$/i, ''),
      featureName.replace(/ city$/i, ''),
    ]
    for (const v of variations) {
      if (townDataMap[v]) return townDataMap[v]
    }
    return null
  }, [])

  // Style function for GeoJSON features
  const getFeatureStyle = useCallback((feature) => {
    const townName = feature.properties.name
    const town = findTownData(townName)
    const isSelected = selectedTown?.name === town?.name
    const isHovered = hoveredTown?.name === town?.name
    const isFiltered = filter === 'all' || (town && town.category === filter)

    // Base color based on tax bill
    let fillColor = '#374151' // Default gray for towns without data
    let fillOpacity = 0.7

    if (town) {
      fillColor = colorScale(town.avgTaxBill)
      if (!isFiltered && filter !== 'all') {
        fillOpacity = 0.15
        fillColor = '#374151'
      }
    }

    return {
      fillColor,
      fillOpacity: isHovered ? 0.95 : (isSelected ? 0.9 : fillOpacity),
      color: isSelected ? '#FFD700' : isHovered ? '#ffffff' : 'rgba(250, 249, 246, 0.25)',
      weight: isSelected ? 3 : isHovered ? 2 : 0.5,
    }
  }, [selectedTown, hoveredTown, filter, findTownData])

  // Event handlers for GeoJSON features
  const onEachFeature = useCallback((feature, layer) => {
    const townName = feature.properties.name
    const town = findTownData(townName)

    layer.on({
      mouseover: (e) => {
        if (town) {
          setHoveredTown(town)
        }
        // Highlight style
        e.target.setStyle({
          weight: 2,
          color: '#ffffff',
          fillOpacity: 0.95
        })
        e.target.bringToFront()
      },
      mouseout: (e) => {
        setHoveredTown(null)
        // Reset style
        if (geoJsonRef.current) {
          geoJsonRef.current.resetStyle(e.target)
        }
      },
      click: () => {
        if (town) {
          setSelectedTown(town)
        }
      }
    })

    // Add tooltip
    const tooltipContent = town
      ? `<div class="font-mono text-sm"><strong>${town.name}</strong><br/>Tax Bill: ${formatCurrency(town.avgTaxBill)}</div>`
      : `<div class="font-mono text-sm"><strong>${townName}</strong><br/><span class="text-paper/50">No data available</span></div>`

    layer.bindTooltip(tooltipContent, {
      sticky: true,
      className: 'town-tooltip',
      direction: 'top',
      offset: [0, -10]
    })
  }, [findTownData])

  // Key to force GeoJSON re-render when filter or selection changes
  const geoJsonKey = useMemo(() => `${filter}-${selectedTown?.name}`, [filter, selectedTown])

  return (
    <section id="town-map" className="py-24 bg-slate-950">
      <style>{`
        .town-tooltip {
          background: #1a1a2e !important;
          border: 1px solid rgba(250, 249, 246, 0.3) !important;
          border-radius: 0 !important;
          color: #faf9f6 !important;
          font-family: 'JetBrains Mono', monospace !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5) !important;
        }
        .town-tooltip::before {
          border-top-color: rgba(250, 249, 246, 0.3) !important;
        }
        .leaflet-container {
          background: #1a1a2e !important;
          font-family: 'Source Serif 4', serif;
        }
        .leaflet-control-zoom a {
          background: #1a1a2e !important;
          color: #faf9f6 !important;
          border-color: rgba(250, 249, 246, 0.2) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #2a2a3e !important;
        }
      `}</style>

      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="font-display text-6xl md:text-8xl text-blood-light mb-4">
            YOUR TOWN'S BURDEN
          </h2>
          <p className="font-serif text-xl md:text-2xl text-paper/80 max-w-3xl">
            Explore property tax data for all 351 Massachusetts municipalities. Click on any town to see details.
          </p>
        </div>

        {/* Key disparity stat */}
        <div className="bg-blood-dark border border-blood-light/30 p-8 mb-12 text-center">
          <div className="font-mono text-6xl md:text-8xl font-bold text-warning mb-4">
            34×
          </div>
          <p className="font-serif text-xl text-paper/90">
            The disparity between the highest and lowest tax bills in Massachusetts
          </p>
          <div className="flex justify-center gap-8 mt-6 flex-wrap">
            <div>
              <span className="font-serif text-paper/60">Highest:</span>
              <span className="font-mono text-blood-light ml-2">Weston $24,448</span>
            </div>
            <div>
              <span className="font-serif text-paper/60">Lowest:</span>
              <span className="font-mono text-green-400 ml-2">Hancock $712</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 bg-slate-950 border border-paper/10 p-4 relative">
            <div className="aspect-[4/3] w-full relative">
              <MapContainer
                center={[42.1, -71.8]}
                zoom={8}
                style={{ height: '100%', width: '100%', background: '#1a1a2e' }}
                zoomControl={true}
                attributionControl={false}
                scrollWheelZoom={true}
              >
                <GeoJSON
                  ref={geoJsonRef}
                  key={geoJsonKey}
                  data={geoData}
                  style={getFeatureStyle}
                  onEachFeature={onEachFeature}
                />
                <FitBounds geoJsonRef={geoJsonRef} />
              </MapContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-between items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-serif text-paper/60">Tax Bill:</span>
                <div className="flex items-center">
                  <div className="w-20 h-4 rounded-sm" style={{
                    background: 'linear-gradient(to right, #16a34a, #84cc16, #eab308, #f97316, #DC143C)'
                  }}></div>
                </div>
                <span className="text-paper/50">$700</span>
                <span className="text-paper/30 mx-1">→</span>
                <span className="text-paper/50">$25k+</span>
              </div>
              <div className="font-mono text-paper/40">
                351 municipalities • Scroll to zoom
              </div>
            </div>

            {/* Filter */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  filter === 'all' ? 'bg-warning text-slate-950' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                All Towns
              </button>
              <button
                onClick={() => setFilter('wealthy-suburb')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  filter === 'wealthy-suburb' ? 'bg-warning text-slate-950' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                Wealthy Suburbs
              </button>
              <button
                onClick={() => setFilter('gateway-city')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  filter === 'gateway-city' ? 'bg-warning text-slate-950' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                Gateway Cities
              </button>
              <button
                onClick={() => setFilter('cape-islands')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  filter === 'cape-islands' ? 'bg-warning text-slate-950' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                Cape & Islands
              </button>
              <button
                onClick={() => setFilter('urban-core')}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  filter === 'urban-core' ? 'bg-warning text-slate-950' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                Urban Core
              </button>
            </div>
          </div>

          {/* Town Details Panel */}
          <div className="bg-slate-950 border border-paper/10 p-6">
            {displayTown ? (
              <div>
                <div className="mb-6">
                  <h3 className="font-display text-3xl text-paper mb-1">{displayTown.name}</h3>
                  <p className="font-serif text-paper/50">{displayTown.county} County</p>
                </div>

                <div className="space-y-6">
                  {/* Tax Bill */}
                  <div>
                    <p className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-1">Avg Tax Bill (FY2025)</p>
                    <p className="font-mono text-4xl" style={{ color: colorScale(displayTown.avgTaxBill) }}>
                      {formatCurrency(displayTown.avgTaxBill)}
                    </p>
                  </div>

                  {/* Tax Rate */}
                  <div>
                    <p className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-1">Tax Rate</p>
                    <p className="font-mono text-2xl text-paper">
                      ${displayTown.taxRate.toFixed(2)} <span className="text-sm text-paper/50">per $1,000</span>
                    </p>
                  </div>

                  {/* Median Home Price - only show if available */}
                  {displayTown.medianHomePrice && (
                    <div>
                      <p className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-1">Median Home Price</p>
                      <p className="font-mono text-2xl text-paper">
                        {formatCurrency(displayTown.medianHomePrice)}
                      </p>
                    </div>
                  )}

                  {/* Population - only show if available */}
                  {displayTown.population2024 && (
                    <div>
                      <p className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-1">Population (2024)</p>
                      <p className="font-mono text-2xl text-paper">
                        {displayTown.population2024.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Population Change - only show if available */}
                  {displayTown.populationChange !== undefined && (
                    <div>
                      <p className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-1">Population Change (2020-24)</p>
                      <p className={`font-mono text-2xl ${getPopulationChangeColor(displayTown.populationChange)}`}>
                        {getPopulationChangeIcon(displayTown.populationChange)} {displayTown.populationChange > 0 ? '+' : ''}{displayTown.populationChange}%
                      </p>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="pt-4 border-t border-paper/10">
                    <span className="inline-block px-3 py-1 bg-paper/10 text-paper/70 font-mono text-xs">
                      {townData.categories[displayTown.category]?.label || displayTown.category}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="font-mono text-6xl text-paper/20 mb-4">?</div>
                <p className="font-serif text-paper/50 mb-2">
                  Click or hover on a town to see details
                </p>
                <p className="font-serif text-xs text-paper/30">
                  Data available for all 351 municipalities
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Town Rankings */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="font-display text-3xl text-warning">TOWN RANKINGS</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSortBy('taxBill')}
                className={`px-4 py-2 font-mono text-sm transition-colors ${
                  sortBy === 'taxBill' ? 'bg-blood-light text-paper' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                Highest Tax Bills
              </button>
              <button
                onClick={() => setSortBy('taxRate')}
                className={`px-4 py-2 font-mono text-sm transition-colors ${
                  sortBy === 'taxRate' ? 'bg-blood-light text-paper' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                Highest Tax Rates
              </button>
              <button
                onClick={() => setSortBy('population')}
                className={`px-4 py-2 font-mono text-sm transition-colors ${
                  sortBy === 'population' ? 'bg-blood-light text-paper' : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                }`}
              >
                Population Growth
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTowns.slice(0, 12).map((town, index) => (
              <button
                key={town.name}
                onClick={() => setSelectedTown(town)}
                className={`bg-slate-950 border p-4 text-left transition-colors hover:border-warning/50 ${
                  selectedTown?.name === town.name ? 'border-warning' : 'border-paper/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-warning text-lg">#{index + 1}</span>
                    <h4 className="font-serif text-paper text-lg">{town.name}</h4>
                    <p className="font-mono text-xs text-paper/50">{town.county}</p>
                  </div>
                  <div className="text-right">
                    {sortBy === 'taxBill' && (
                      <p className="font-mono text-blood-light text-lg">{formatCurrency(town.avgTaxBill)}</p>
                    )}
                    {sortBy === 'taxRate' && (
                      <p className="font-mono text-blood-light text-lg">${town.taxRate.toFixed(2)}</p>
                    )}
                    {sortBy === 'population' && (
                      <p className={`font-mono text-lg ${getPopulationChangeColor(town.populationChange || 0)}`}>
                        {town.populationChange !== undefined ? (
                          <>{town.populationChange > 0 ? '+' : ''}{town.populationChange}%</>
                        ) : (
                          <span className="text-paper/40">N/A</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Key insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {townData.keyInsights.map((insight, index) => (
            <div key={index} className="bg-slate-950 border border-paper/10 p-6">
              <div className="font-mono text-2xl text-warning mb-2">{insight.insight}</div>
              <p className="font-serif text-paper/70">{insight.detail}</p>
            </div>
          ))}
        </div>

        {/* Source citation */}
        <p className="font-serif text-xs text-paper/40 mt-8">
          Sources: MA Division of Local Services / Massachusetts Almanac (FY2025 tax rates), US Census Bureau TIGER/Line (boundaries)
        </p>
      </div>
    </section>
  )
}

export default TownMapSection
