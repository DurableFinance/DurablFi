import React from "react";
import { Search } from "lucide-react";

interface YieldPool {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
}

interface SidebarProps {
  pools: YieldPool[];
  selectedPool: YieldPool | null;
  onSelectPool: (pool: YieldPool) => void;
  isLoading: boolean;
  protocolFilter: string;
  onProtocolFilterChange: (protocol: string) => void;
  chainFilter: string;
  onChainFilterChange: (chain: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const protocols = ["All", "Pendle", "Aave", "Morpho", "Curve", "Compound"];
const chains = ["All", "Ethereum", "Arbitrum", "Base"];

export default function Sidebar({
  pools,
  selectedPool,
  onSelectPool,
  isLoading,
  protocolFilter,
  onProtocolFilterChange,
  chainFilter,
  onChainFilterChange,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  return (
    <aside className="flex flex-col w-[310px] bg-[#090a14] border-r border-[#1c1e36]/60 shadow-xl overflow-hidden sticky top-0 h-screen">
      {/* Signature DurablFi Branding Header */}
      <div className="p-6 pb-5 relative overflow-hidden bg-gradient-to-b from-[#111329]/50 to-transparent">
        <div className="absolute top-[-30px] left-[-30px] w-[120px] h-[120px] bg-[#3b82f6]/10 rounded-full blur-2xl pointer-events-none" />
        <h1 className="text-white font-extrabold text-[24px] tracking-tight uppercase leading-none font-sans">
          DURABL<span className="text-[#3b82f6]">FI</span>
        </h1>
        <p className="text-[#5c6499] text-[10px] font-bold tracking-[0.18em] uppercase mt-1.5 pl-[1px]">
          Yield Intelligence & Execution
        </p>
      </div>

      {/* Elegant Fine Separator */}
      <div className="border-b border-[#1c1e36]/40 px-6 mx-2" />

      {/* Styled Modern Search bar */}
      <div className="p-4">
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#4c527d]" />
          <input
            type="text"
            placeholder="Search yield opportunities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#111328]/60 border border-[#1c1e36] rounded-xl pl-9 pr-3 py-2.5 text-white text-[13px] placeholder-[#4c527d] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/30 transition-all duration-200"
          />
        </div>
      </div>

      {/* Horizontal Pill Row - Protocols */}
      <div className="px-4 py-2">
        <p className="text-[#5c6499] text-[10px] tracking-[0.15em] font-bold mb-2.5 uppercase">Protocol</p>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {protocols.map((protocol) => (
            <button
              key={protocol}
              onClick={() => onProtocolFilterChange(protocol)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                protocolFilter === protocol
                  ? "bg-[#3b82f6] text-white shadow-md shadow-[#3b82f6]/20 font-semibold"
                  : "bg-[#111328]/40 text-[#8b92c2] hover:bg-[#1c1e36] hover:text-white border border-[#1c1e36]/30"
              }`}
            >
              {protocol}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Pill Row - Chains */}
      <div className="px-4 py-2">
        <p className="text-[#5c6499] text-[10px] tracking-[0.15em] font-bold mb-2.5 uppercase">Chain</p>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {chains.map((chain) => (
            <button
              key={chain}
              onClick={() => onChainFilterChange(chain)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                chainFilter === chain
                  ? "bg-[#4f46e5] text-white shadow-md shadow-[#4f46e5]/20 font-semibold"
                  : "bg-[#111328]/40 text-[#8b92c2] hover:bg-[#1c1e36] hover:text-white border border-[#1c1e36]/30"
              }`}
            >
              {chain}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-[#1c1e36]/30 my-2 mx-4" />

      {/* Live Active Pools Feed */}
      <div className="px-4 py-2 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981] animate-pulse" />
          <p className="text-[#5c6499] text-[10px] tracking-[0.15em] font-bold uppercase">Live Terminal Feed</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-[68px] bg-[#111328]/40 rounded-xl border border-[#1c1e36]/30 animate-pulse" />
            ))
          ) : pools.length === 0 ? (
            <p className="text-[#5c6499] text-[13px] italic p-2">No matching feeds available.</p>
          ) : (
            pools.map((pool) => {
              const isSelected = selectedPool?.pool === pool.pool;
              return (
                <button
                  key={pool.pool}
                  onClick={() => onSelectPool(pool)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 border group ${
                    isSelected
                      ? "bg-gradient-to-r from-[#171b3d] to-[#111328] border-[#3b82f6] shadow-lg"
                      : "bg-[#111328]/30 border-[#1c1e36]/50 hover:bg-[#1c1e36]/50 hover:border-[#1c1e36]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`font-bold text-[14px] transition-colors ${isSelected ? "text-white" : "text-[#e2e4f3] group-hover:text-white"}`}>
                        {pool.symbol}
                      </p>
                      <p className="text-[#5c6499] text-[11px] font-medium mt-0.5">
                        {pool.project} <span className="mx-1 text-[#2c3052]">·</span> {pool.chain}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-mono font-bold text-[14px] ${isSelected ? "text-[#3b82f6]" : "text-[#4f46e5] group-hover:text-[#3b82f6]"}`}>
                        {pool.apy.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
