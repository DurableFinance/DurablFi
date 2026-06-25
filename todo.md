# DurablFi TODO

## Design System & Setup
- [x] Update globals.css with custom design system (colors, fonts, card styles)
- [x] Configure Inter font in index.html
- [x] Verify Tailwind configuration

## Backend Implementation
- [x] Create tRPC procedure for fetching yield pools from DefiLlama API
- [x] Implement 5-minute caching for API responses
- [x] Add filtering logic: projects (aave-v3, morpho, pendle, curve, compound), TVL > $5M, APY > 1%
- [x] Implement sorting by APY descending and top 12 results
- [x] Add error handling for API failures

## Frontend - Header Section
- [x] Build header with "DurablFi" logo text in white
- [x] Display tagline "Decompose. Disclose. Execute." in cyan (#22d3ee)
- [x] Add sub-tagline: "Yield intelligence for DeFi. Know what's holding up that APY before you deposit."
- [x] Ensure no navigation links or login button

## Frontend - Live Yield Pools Section
- [x] Create pool card component showing: symbol, protocol, chain, APY, TVL, Decompose button
- [x] Implement 3-column grid layout for desktop
- [x] Add loading skeleton with pulse animation
- [x] Display top 12 pools sorted by APY descending
- [x] Format TVL as $X.XXM or $X.XXB
- [x] Round APY to 2 decimal places and display in cyan

## Frontend - Yield Decomposer Panel
- [x] Build inline decomposer panel (no page navigation)
- [x] Implement APY breakdown horizontal bar chart with 4 segments
- [x] Calculate and display: Base Yield, Reward APY, Emissions Boost, Mean 30d APY reference
- [x] Use correct colors: Base (#22d3ee), Reward (#4ade80), Emissions (#fbbf24), Background (#1a1a1a)
- [x] Label each bar with percentage and value

## Durability Score Calculation
- [x] Implement exact formula: baseScore, tvlScore, stabilityScore, rewardScore, emissionsScore
- [x] Display score as large number in cyan with color coding (red 0-40, yellow 41-69, green 70-100)
- [x] Add explanation text based on score range
- [x] Implement all edge cases (null fields, zero values)

## Risk Flags
- [x] Implement Reward-Heavy APY detection (apyReward > apyBase)
- [x] Implement High Emissions Dependency detection (emissionsBoost > totalApy * 0.3)
- [x] Implement Low TVL detection (tvlUsd < 10000000)
- [x] Implement APY Volatility detection (abs(totalApy - apyMean30d) > totalApy * 0.2)
- [x] Display risk flags as colored pills (red for high risk, yellow for medium, green for stable)

## Pool Metadata Display
- [x] Create grid showing: Protocol, Chain, TVL, 30d Average APY, Pool Symbol
- [x] Add DYOR disclaimer in muted text

## Footer Section
- [x] Build footer with left text: "DurablFi — Decompose. Disclose. Execute."
- [x] Add right text: "Built for DeFi users who want the full picture."
- [x] Style with #0a0a0a background and #27272a top border

## Responsive Design
- [x] Implement mobile layout: single column pool cards below 768px
- [x] Make decomposer panel full-width on mobile
- [x] Test responsive breakpoints

## Loading & Error States
- [x] Show loading skeleton with pulse animation while fetching
- [x] Display error message: "Unable to load live data. Please refresh."
- [x] Implement graceful error recovery

## Testing & Verification
- [x] Test all pool filtering and sorting logic (vitest: 11 tests passing)
- [x] Verify durability score calculations with edge cases (vitest: 11 tests passing)
- [x] Test responsive layouts on mobile and desktop (mobile 375x812 and desktop 1280x720 screenshots verified)
- [x] Verify all colors match design system (design tokens in CSS variables, accent colors in components)
- [x] Test error handling and loading states (error UI and loading skeletons implemented)
- [x] Verify no hardcoded data anywhere (all data from DefiLlama API, no mock/hardcoded pools)
