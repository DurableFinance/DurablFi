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


## Phase 2: Premium UI Rebuild

### Global Design System
- [x] Update body background with gradient #050510 to #0a0a1a
- [x] Implement alternating light (#f0f0f8) and dark (#0a0a1a) sections
- [x] Add 80px+ padding to all sections
- [x] Update color palette: indigo (#6366f1), emerald (#10b981), slate grays

### Hero Section
- [x] Full viewport height with radial gradient background
- [x] "LIVE DEMO · RISK INTELLIGENCE" pill badge
- [x] "Durabl" white + "IFi" blue gradient logo (56px desktop, 40px mobile)
- [x] Tagline: "Maps the full attack surface — on-chain & off-chain — before you deposit."
- [x] "EXPLORE" text with down arrow, letter-spacing 0.2em

### Pool Selection Section (STEP 1)
- [x] Light background #f0f0f8 with "STEP 1" label in indigo
- [x] "Select a yield position" heading
- [x] Indigo divider line (40px, 2px)
- [x] Pool cards: white background, gradient token badges, green APY text (28px)
- [x] Two-column mobile, three-column desktop
- [x] Selected card: 2px indigo border with subtle shadow

### Yield Decomposition Section (STEP 2)
- [x] Dark background with "STEP 2" label
- [x] "TOTAL APY" label with 56px bold number
- [x] Durability Score pill: green border, semi-transparent green background
- [x] APY breakdown bars with indigo-to-purple gradient
- [x] Bar labels: "Base Lending", "PT Discount", "Incentive Rewards"

### Risk Disclosure Section (STEP 4)
- [x] Dark background with "STEP 4" label
- [x] Risk cards with dark background #111128
- [x] Risk badge pills: HIGH RISK (red), MEDIUM RISK (amber), LOW RISK (green)

### Execute Strategy Section (STEP 5)
- [x] Dark background #0d0d2b with centered "STEP 5" label
- [x] "Execute Strategy" heading (40px, centered)
- [x] Frosted glass card: rgba(255,255,255,0.04) background
- [x] Numbered steps 01-05 with badges
- [x] Gradient button: #4f46e5 to #7c3aed with tooltip

### Footer
- [x] Dark background #050510
- [x] "DECOMPOSE · DISCLOSE · EXECUTE" centered
- [x] "DURABLFI" centered below

### Animations
- [x] Card hover: translateY(-6px), shadow 0 20px 40px rgba(99,102,241,0.15)
- [x] Pool cards: border color to #6366f1 on hover
- [x] Hero logo: fade in 0.8s, translateY 20px to 0
- [x] Hero tagline: fade in 0.3s after logo
- [x] Section headings: fade in on scroll, translateY 16px to 0, 0.5s
- [x] Pool cards: stagger fade in 0.08s delay
- [x] Decompose bars: animate width 0 to final, 0.6s ease-out
- [x] Durability Score: count up 0 to final, 0.8s on scroll
- [x] Risk badges: pulse animation 0.7 to 1 opacity, 2s infinite

### Cleanup
- [x] Remove flat cyan buttons
- [x] Remove "Made with Manus" badge
- [x] Remove white backgrounds from dark sections


## Phase 3: Sidebar + Main Panel Restructure

### Layout Architecture
- [x] Remove all hero, step sections, and multi-section page layout
- [x] Implement sidebar (280px, #0d0d0d, fixed) + main panel (#0a0a0a, scrollable) layout
- [ ] Hide sidebar on mobile, show top filter bar instead
- [x] Preserve all backend tRPC procedures and DefiLlama data fetching

### Left Sidebar
- [x] Add "DurablFi" logo (18px white bold) + "Yield Intelligence" subtitle (11px #64748b)
- [x] Add divider (1px solid #1a1a1a)
- [x] Implement search input (background #111111, border #1a1a1a, placeholder "Search pools...")
- [x] Add PROTOCOL filter buttons: All, Pendle, Aave, Morpho, Curve, Compound
- [x] Add CHAIN filter buttons: All, Ethereum, Arbitrum, Base
- [x] Implement pool list with symbol, protocol+chain, APY right-aligned
- [ ] Add pulsing green dot next to "LIVE POOLS" label
- [x] Pool selection: click to load in main panel, highlight with left border

### Main Panel — Empty State
- [x] Show centered empty state when no pool selected
- [x] Icon (32px #22d3ee), heading "Select a pool to begin analysis", subtext

### Main Panel — Pool Selected
- [x] Pool header: symbol (24px white bold), protocol · chain (13px #64748b), APY right-aligned (28px #22d3ee)
- [x] Tab navigation: Decomposition, Durability Score, Risk Flags, Execute
- [x] Active tab: #22d3ee text, 2px bottom border
- [x] Inactive tab: #64748b text

### Tab 1: Decomposition
- [x] "APY Breakdown" heading (16px white)
- [x] Horizontal bars: Base Yield (#22d3ee), Reward APY (#4ade80), Emissions Boost (#fbbf24)
- [x] Animate bars from 0 to final width, 0.6s ease-out
- [x] Show 30d Average APY stat below

### Tab 2: Durability Score
- [x] Large score number (72px bold), color-coded: red 0-40, yellow 41-69, green 70-100
- [x] Count up animation from 0 on tab open
- [x] "/ 100" label beside score
- [x] Score explanation text (one sentence based on range)
- [x] 2x2 grid: baseScore, tvlScore, stabilityScore, emissionsScore cards

### Tab 3: Risk Flags
- [x] "Risk Assessment" heading
- [x] Risk flag pills with colors: red/yellow/green with semi-transparent backgrounds
- [x] Pool metadata grid: Protocol, Chain, TVL, 30d Avg APY, Symbol, Pool ID
- [x] DYOR disclaimer at bottom

### Tab 4: Execute
- [x] "Execute Strategy" heading
- [x] 5 steps in card: Bridge assets, Approve tokens, Swap to position, Deposit to vault, Confirm on-chain
- [x] Number badges (01-05) with #1a1a1a background
- [x] Full-width EXECUTE STRATEGY button (#22d3ee background, #0a0a0a text)
- [x] Hover tooltip: "Execution launches in Phase 2 — wallet connect coming soon."

### Mobile Layout
- [ ] Hide sidebar, show top bar with "DurablFi" left and filter icon right
- [ ] Horizontal scrollable pool pills below top bar
- [ ] Tapping pool opens full-screen analysis overlay with back button

### Global Cleanup
- [x] Remove all light background sections (#f0f0f8)
- [x] Remove "Made with Manus" badge
- [x] Remove "LIVE DEMO" badge
- [x] Remove all STEP labels
- [x] Set background throughout to #0a0a0a
- [ ] Add card hover: translateY(-2px), 0.2s ease
- [ ] Style scrollbar: 4px width, #1a1a1a thumb

### Testing & Verification
- [x] Verify sidebar/main panel layout on desktop
- [ ] Test mobile top bar and pool pills overlay
- [x] Verify all tabs work and display correct data
- [x] Test filter functionality (protocol, chain, search)
- [ ] Verify animations: bar fill, score count-up, card hover
- [x] Check TypeScript compilation
- [x] Run all vitest tests to ensure backend intact
