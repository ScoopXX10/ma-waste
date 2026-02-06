MA-WASTE: Massachusetts Accountability Website
Project Overview
A data-driven accountability website proving Massachusetts government policies are failing residents through high taxes, runaway spending, and policies that drive people out of the state. The site uses official government data to make an undeniable case.
Core Message
"People are voting with their feet - and they're voting AGAINST Massachusetts"
Tech Stack

React + Vite
Recharts for data visualization
Tailwind CSS for styling
Single-page app with smooth scroll navigation

Design Direction
Aesthetic: Investigative journalism / editorial / newspaper exposé

Bold, high-contrast, authoritative
Color palette: Deep slate (#1a1a2e), blood red (#8B0000, #DC143C), warning yellow (#FFD700), off-white paper (#faf9f6)
Typography: Display font for headlines (Bebas Neue or similar), serif for body (Source Serif), monospace for data (JetBrains Mono)
NO generic AI aesthetics - no purple gradients, no Inter font, no cookie-cutter layouts

Key Design Elements:

Large stat callouts with red numbers for alarming data
Quote blocks with damning statements from officials
Side-by-side comparison tables (Baker vs Healey)
Interactive charts that tell a story
Sticky navigation that appears on scroll

Data Files (in src/data/)
1. ma-outmigration-data.json
The most powerful dataset. Key stats:

10× increase in outmigration from 2010 to 2023
$10.6B in AGI lost 2020-2022 (more than previous 7 years combined)
55% of income leaving is from $200k+ earners
67% of those leaving went to no-income-tax states (FL, NH)
33,340 net loss in 2025 - trend worsening
"Absent immigration, Massachusetts would already be losing population"

2. ma-spending-accountability.json
Shelter crisis and government waste:

$1B+ annual shelter spending
$15,166/month per family ($182k/year)
State Auditor found "improper and unlawful no-bid emergency procurements"
Spinelli Ravioli: $10M no-bid contract, 9.6% overpayments
Mercedes Cab: $140 for 223-foot ride
Healey's response to audit: "I doubt it. This has been territory pretty well covered."

3. ma-historical-comparison.json
Baker (R) vs Healey (D) comparison:

Rainy Day Fund: Baker grew $1.1B→$8.4B (+664%) without taxes; Healey slight decrease
Budget: Baker 38% growth over 8 years, no new taxes; Healey 10% growth in 2 years with millionaire tax
Tax Competitiveness: Dropped from 17th worst to 9th worst under Healey
MBTA: Problems span both, but Healey eliminated slow zones

4. ma-housing-tax-burden.json
Housing and tax data:

Home prices: $335k (2015) → $658k (2025) = 96.5% increase
Home prices up 73% since 2000, income up only 4% (inflation-adjusted)
MA is #2 most expensive state (only Hawaii higher)
Tax competitiveness: 9th worst (42nd of 50)
Property tax varies wildly: $712 (Hancock) to $24,448 (Weston)

5. energy-costs.json
Energy burden:

MA electricity: 31.22¢/kWh vs 17.78¢ national average (75% higher)
Rank: #3 highest in nation
~$500/year extra per household
MA generates only 41% of own electricity
Policy contradiction: Healey signed aggressive climate mandates, then quietly delayed clean heat standard

Site Sections (in order)

Hero - "MA-WASTE" with dramatic headline, tagline about data-driven accountability
Stats Banner - 5 key numbers at a glance (10×, $10.6B, 75%, $1B+, #5)
The Exodus (Outmigration) - The flagship section

Area chart of net migration by year (2010-2025)
Cards: 10× multiplier, $10.6B gone, who's leaving, where they go
Quote from BU professor on why people leave


The Wealth Drain - AGI loss over time

Bar chart showing $900M (2012) → $3.9B (2022)
CPA survey quote about millionaire tax driving people out


Where Your Money Goes (Spending)

Shelter crisis costs with specific examples
Audit findings
Healey's "I doubt it" response


Baker vs Healey Comparison

Side-by-side table with color-coded results
Key metrics: rainy day fund, taxes, budget growth, competitiveness


Housing Crisis

Line chart of home prices over time
Income vs home price gap
Cost of living ranking


Energy Costs

Rate comparison
Policy contradictions


Footer - Sources attribution

Key Quotes to Feature

"Absent immigration, Massachusetts would already be losing population." — Pioneer Institute, 2026
"I doubt it. This has been territory pretty well covered." — Governor Healey (on audit findings)
"The top driving factors behind domestic out-migration are taxes, housing costs, and health care expenses." — Mark Williams, BU Professor
"90 percent of Mass. CPAs surveyed indicated their high-income clients were considering leaving Massachusetts." — MA Society of CPAs
"Outmigration levels were 10 times greater in 2023 than they were in 2010." — Pioneer Institute

Data Sources (for credibility)

US Census Bureau
IRS Statistics of Income
MA State Auditor Diana DiZoglio
EIA (Energy Information Administration)
BLS (Bureau of Labor Statistics)
Pioneer Institute
UMass Donahue Institute
Mass Opportunity Alliance
Tax Foundation
The Warren Group (housing data)

Development Notes

All data is in JSON files - import and use directly
Charts should be interactive (tooltips on hover)
Mobile responsive is important
Smooth scroll between sections
Consider adding: town-by-town property tax lookup, "calculate your burden" tool