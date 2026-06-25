import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { trpc } from "@/lib/trpc";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";

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

function AppContent() {
  const [selectedPool, setSelectedPool] = useState<YieldPool | null>(null);
  const [protocolFilter, setProtocolFilter] = useState<string>("All");
  const [chainFilter, setChainFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: pools = [], isLoading, error } = trpc.yield.getPools.useQuery();

  // Apply filters
  const poolsArray = Array.isArray(pools) ? pools : (pools?.data || []);
  const filteredPools = poolsArray.filter((pool: any) => {
    const matchProtocol = protocolFilter === "All" || pool.project.toLowerCase().includes(protocolFilter.toLowerCase());
    const matchChain = chainFilter === "All" || pool.chain.toLowerCase().includes(chainFilter.toLowerCase());
    const matchSearch = searchQuery === "" || pool.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchProtocol && matchChain && matchSearch;
  });

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <Sidebar
        pools={filteredPools}
        selectedPool={selectedPool}
        onSelectPool={setSelectedPool}
        isLoading={isLoading}
        protocolFilter={protocolFilter}
        onProtocolFilterChange={setProtocolFilter}
        chainFilter={chainFilter}
        onChainFilterChange={setChainFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Panel */}
      <MainPanel selectedPool={selectedPool} />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
