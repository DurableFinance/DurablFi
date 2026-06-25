import React, { useState } from "react";
import { Grid } from "lucide-react";
import DecompositionTab from "./tabs/DecompositionTab";
import DurabilityScoreTab from "./tabs/DurabilityScoreTab";
import RiskFlagsTab from "./tabs/RiskFlagsTab";
import ExecuteTab from "./tabs/ExecuteTab";

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

interface MainPanelProps {
  selectedPool: YieldPool | null;
}

const tabs = ["Decomposition", "Durability Score", "Risk Flags", "Execute"];

export default function MainPanel({ selectedPool }: MainPanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!selectedPool) {
    return (
      <main className="flex-1 bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Grid size={32} className="text-[#22d3ee] mx-auto mb-4" />
          <h2 className="text-white text-[20px] font-semibold mb-2">Select a pool to begin analysis</h2>
          <p className="text-[#64748b] text-[14px]">
            Choose from the live pool list to decompose yield, score durability, and assess risk.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Pool Header */}
      <div className="border-b border-[#1a1a1a] p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-white font-bold text-[24px]">{selectedPool.symbol}</h1>
            <p className="text-[#64748b] text-[13px]">
              {selectedPool.project} · {selectedPool.chain}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#22d3ee] font-bold text-[28px]">{selectedPool.apy.toFixed(2)}%</p>
            <p className="text-[#64748b] text-[11px]">APY</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-t border-[#1a1a1a] pt-4 -mx-6 px-6">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`pb-2 text-[13px] font-medium transition-colors ${
                activeTab === idx
                  ? "text-[#22d3ee] border-b-2 border-[#22d3ee]"
                  : "text-[#64748b] hover:text-[#94a3b8]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 0 && <DecompositionTab pool={selectedPool} />}
        {activeTab === 1 && <DurabilityScoreTab pool={selectedPool} />}
        {activeTab === 2 && <RiskFlagsTab pool={selectedPool} />}
        {activeTab === 3 && <ExecuteTab pool={selectedPool} />}
      </div>
    </main>
  );
}
