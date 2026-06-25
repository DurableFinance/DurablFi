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
    <aside className="flex flex-col w-[280px] bg-[#0d0d0d] border-r border-[#1a1a1a] overflow-y-auto">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-white font-bold text-[18px]">DurablFi</h1>
        <p className="text-[#64748b] text-[11px] tracking-[0.1em] mt-1">Yield Intelligence</p>
      </div>

      {/* Divider */}
      <div className="border-b border-[#1a1a1a]" />

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search pools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#111111] border border-[#1a1a1a] rounded-[8px] pl-9 pr-3 py-[10px] text-white text-[13px] placeholder-[#64748b] focus:outline-none focus:border-[#22d3ee]"
          />
        </div>
      </div>

      {/* Protocol Filter */}
      <div className="px-4 py-2">
        <p className="text-[#64748b] text-[10px] tracking-[0.15em] font-bold mb-3">PROTOCOL</p>
        <div className="space-y-1">
          {protocols.map((protocol) => (
            <button
              key={protocol}
              onClick={() => onProtocolFilterChange(protocol)}
              className={`w-full text-left px-3 py-2 rounded-[6px] text-[13px] transition-colors ${
                protocolFilter === protocol
                  ? "bg-[#111111] text-[#22d3ee] border-l-2 border-[#22d3ee]"
                  : "bg-transparent text-[#94a3b8] hover:bg-[#111111]"
              }`}
            >
              {protocol}
            </button>
          ))}
        </div>
      </div>

      {/* Chain Filter */}
      <div className="px-4 py-2">
        <p className="text-[#64748b] text-[10px] tracking-[0.15em] font-bold mb-3">CHAIN</p>
        <div className="space-y-1">
          {chains.map((chain) => (
            <button
              key={chain}
              onClick={() => onChainFilterChange(chain)}
              className={`w-full text-left px-3 py-2 rounded-[6px] text-[13px] transition-colors ${
                chainFilter === chain
                  ? "bg-[#111111] text-[#22d3ee] border-l-2 border-[#22d3ee]"
                  : "bg-transparent text-[#94a3b8] hover:bg-[#111111]"
              }`}
            >
              {chain}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-[#1a1a1a] my-4" />

      {/* Live Pools */}
      <div className="px-4 py-2 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-[#64748b] text-[10px] tracking-[0.15em] font-bold">LIVE POOLS</p>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-[#111111] rounded-[6px] animate-pulse" />
            ))}
          </div>
        ) : pools.length === 0 ? (
          <p className="text-[#64748b] text-[13px]">No pools found</p>
        ) : (
          <div className="space-y-2">
            {pools.map((pool) => (
              <button
                key={pool.pool}
                onClick={() => onSelectPool(pool)}
                className={`w-full text-left px-3 py-3 rounded-[6px] transition-colors ${
                  selectedPool?.pool === pool.pool
                    ? "bg-[#111111] border-l-2 border-[#22d3ee]"
                    : "bg-transparent hover:bg-[#111111]"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-bold text-[13px]">{pool.symbol}</p>
                    <p className="text-[#64748b] text-[11px]">
                      {pool.project} · {pool.chain}
                    </p>
                  </div>
                  <p className="text-[#22d3ee] font-bold text-[14px]">{pool.apy.toFixed(2)}%</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
