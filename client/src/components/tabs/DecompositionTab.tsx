import React, { useEffect, useState } from "react";

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

interface DecompositionTabProps {
  pool: YieldPool;
}

export default function DecompositionTab({ pool }: DecompositionTabProps) {
  const [animatedWidths, setAnimatedWidths] = useState({
    base: 0,
    reward: 0,
    emissions: 0,
  });

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => {
      const baseApy = pool.apyBase || 0;
      const rewardApy = pool.apyReward || 0;
      const emissionsBoost = (pool.apy || 0) - baseApy - rewardApy;

      const total = baseApy + rewardApy + Math.max(emissionsBoost, 0);
      const basePercent = total > 0 ? (baseApy / total) * 100 : 0;
      const rewardPercent = total > 0 ? (rewardApy / total) * 100 : 0;
      const emissionsPercent = total > 0 ? (Math.max(emissionsBoost, 0) / total) * 100 : 0;

      setAnimatedWidths({
        base: basePercent,
        reward: rewardPercent,
        emissions: emissionsPercent,
      });
    }, 100);
  }, [pool]);

  const baseApy = pool.apyBase || 0;
  const rewardApy = pool.apyReward || 0;
  const emissionsBoost = Math.max((pool.apy || 0) - baseApy - rewardApy, 0);
  const mean30d = pool.apyMean30d || pool.apy || 0;

  return (
    <div>
      <h3 className="text-white text-[16px] font-semibold mb-6">APY Breakdown</h3>

      {/* Base Yield */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[#94a3b8] text-[13px]">Base Yield</label>
          <span className="text-[#22d3ee] text-[13px] font-medium">{baseApy.toFixed(2)}%</span>
        </div>
        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#22d3ee] rounded-full transition-all duration-600 ease-out"
            style={{ width: `${animatedWidths.base}%` }}
          />
        </div>
      </div>

      {/* Reward APY */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[#94a3b8] text-[13px]">Reward APY</label>
          <span className="text-[#4ade80] text-[13px] font-medium">{rewardApy.toFixed(2)}%</span>
        </div>
        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4ade80] rounded-full transition-all duration-600 ease-out"
            style={{ width: `${animatedWidths.reward}%` }}
          />
        </div>
      </div>

      {/* Emissions Boost */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[#94a3b8] text-[13px]">Emissions Boost</label>
          <span className="text-[#fbbf24] text-[13px] font-medium">{emissionsBoost.toFixed(2)}%</span>
        </div>
        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#fbbf24] rounded-full transition-all duration-600 ease-out"
            style={{ width: `${animatedWidths.emissions}%` }}
          />
        </div>
      </div>

      {/* 30d Average APY */}
      <div className="border-t border-[#1a1a1a] pt-6">
        <div className="flex justify-between items-center">
          <label className="text-[#64748b] text-[13px]">30d Average APY</label>
          <span className="text-white text-[14px] font-medium">{mean30d.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
