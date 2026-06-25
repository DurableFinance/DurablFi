import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { formatTVL, formatAPY } from "@/lib/durability";
import PoolCard from "@/components/PoolCard";
import DecomposerPanel from "@/components/DecomposerPanel";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Zap } from "lucide-react";

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

export default function Home() {
  const [selectedPool, setSelectedPool] = useState<YieldPool | null>(null);
  const { data: response, isLoading, error } = trpc.yield.getPools.useQuery();

  const pools = response?.data || [];
  const hasError = error || !response?.success;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]" style={{ backgroundColor: "var(--background)" }}>
      {/* Header Section */}
      <header className="border-b border-[#27272a] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">DurablFi</h1>
          <p className="text-lg sm:text-xl font-semibold mb-3" style={{ color: "var(--accent)" }}>
            Decompose. Disclose. Execute.
          </p>
          <p className="text-base sm:text-lg text-[#94a3b8]" style={{ color: "var(--text-secondary)" }}>
            Yield intelligence for DeFi. Know what's holding up that APY before you deposit.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Live Yield Pools Section */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Live Yield Pools</h2>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>

            {/* Error State */}
            {hasError && (
              <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4 mb-8">
                <p className="text-red-400">Unable to load live data. Please refresh.</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            ) : pools.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#94a3b8]">No yield pools available at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {pools.map((pool) => (
                  <PoolCard
                    key={pool.pool}
                    pool={pool}
                    isSelected={selectedPool?.pool === pool.pool}
                    onSelect={() => setSelectedPool(pool)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Yield Decomposer Panel */}
          {selectedPool && !isLoading && (
            <section className="mt-12">
              <DecomposerPanel pool={selectedPool} />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272a] bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-[#94a3b8]">DurablFi — Decompose. Disclose. Execute.</p>
          <p className="text-[#94a3b8]">Built for DeFi users who want the full picture.</p>
        </div>
      </footer>
    </div>
  );
}
