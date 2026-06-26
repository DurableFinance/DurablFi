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
      <main className="flex-1 bg-[#09090b] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#141416]/60 border border-[#27272a]/50 rounded-2xl p-8 backdrop-blur-md text-center shadow-xl">
          <div className="w-12 h-12 bg-[#22d3ee]/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#22d3ee]/20">
            <Grid size={24} className="text-[#22d3ee]" />
          </div>
          <h2 className="text-white text-[18px] font-semibold tracking-tight mb-2">Select a pool to begin analysis</h2>
          <p className="text-[#a1a1aa] text-[14px] leading-relaxed">
            Choose from the live pool list to decompose yield mechanics, audit durability scores, and assess dynamic execution risks.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#09090b] flex flex-col overflow-hidden p-6 gap-6">
      {/* Premium Integrated Header and Tab Bar Container */}
      <div className="bg-[#141416]/60 border border-[#27272a]/50 rounded-2xl p-6 backdrop-blur-md shadow-lg flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-white font-bold text-[24px] tracking-tight">{selectedPool.symbol}</h1>
              <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-md uppercase tracking-wider bg-[#27272a] text-[#a1a1aa] border border-[#3f3f46]/50">
                {selectedPool.chain}
              </span>
            </div>
            <p className="text-[#71717a] text-[13px] font-medium">
              Protocol: <span className="text-[#e4e4e7]">{selectedPool.project}</span>
            </p>
          </div>
          <div className="text-right bg-[#1c1c1e] px-4 py-2 rounded-xl border border-[#27272a]">
            <p className="text-[#22d3ee] font-mono font-bold text-[26px] leading-none mb-1">{selectedPool.apy.toFixed(2)}%</p>
            <p className="text-[#71717a] text-[10px] font-bold uppercase tracking-widest">Live APY</p>
          </div>
        </div>

        {/* Institutional Pill-Style Tab Bar */}
        <div className="flex bg-[#09090b] p-1 rounded-xl border border-[#27272a] max-w-xl">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2 px-3 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                activeTab === idx
                  ? "bg-[#1c1c1e] text-[#22d3ee] shadow-sm border border-[#27272a] font-semibold"
                  : "text-[#71717a] hover:text-[#e4e4e7]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analytical Content Workspace Card */}
      <div className="flex-1 overflow-y-auto bg-[#141416]/40 border border-[#27272a]/40 rounded-2xl p-6 backdrop-blur-sm shadow-inner">
        {activeTab === 0 && <DecompositionTab pool={selectedPool} />}
        {activeTab === 1 && <DurabilityScoreTab pool={selectedPool} />}
        {activeTab === 2 && <RiskFlagsTab pool={selectedPool} />}
        {activeTab === 3 && <ExecuteTab pool={selectedPool} />}
      </div>
    </main>
  );
}
