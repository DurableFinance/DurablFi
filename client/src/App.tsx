import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { trpc } from "@/lib/trpc";
import HeroSection from "./components/HeroSection";
import PoolSelectionSection from "./components/PoolSelectionSection";
import YieldDecompositionSection from "./components/YieldDecompositionSection";
import AttackSurfaceMapSection from "./components/AttackSurfaceMapSection";
import RiskDisclosureSection from "./components/RiskDisclosureSection";
import ExecuteStrategySection from "./components/ExecuteStrategySection";
import Footer from "./components/Footer";

interface YieldPool {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
  apyBase?: number | null;
  apyReward?: number | null;
  apyMean30d?: number | null;
}

function App() {
  const [selectedPool, setSelectedPool] = useState<YieldPool | null>(null);
  const { data: response, isLoading } = trpc.yield.getPools.useQuery();

  const pools = response?.data || [];

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div style={{ backgroundColor: 'var(--bg-darker)' }}>
            {/* Hero Section */}
            <HeroSection />

            {/* Pool Selection Section */}
            <PoolSelectionSection
              pools={pools}
              isLoading={isLoading}
              selectedPool={selectedPool}
              onSelectPool={setSelectedPool}
            />

            {/* Yield Decomposition Section */}
            <YieldDecompositionSection selectedPool={selectedPool} />

            {/* Attack Surface Map Section */}
            <AttackSurfaceMapSection selectedPool={selectedPool} />

            {/* Risk Disclosure Section */}
            <RiskDisclosureSection selectedPool={selectedPool} />

            {/* Execute Strategy Section */}
            <ExecuteStrategySection />

            {/* Footer */}
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
