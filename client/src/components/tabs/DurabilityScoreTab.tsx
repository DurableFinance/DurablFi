import React, { useEffect, useState } from "react";
import { calculateDurabilityScore } from "@/lib/durability";

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

interface DurabilityScoreTabProps {
  pool: YieldPool;
}

export default function DurabilityScoreTab({ pool }: DurabilityScoreTabProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({
    baseScore: 0,
    tvlScore: 0,
    stabilityScore: 0,
    rewardScore: 0,
    emissionsScore: 0,
  });

  useEffect(() => {
    const { calculateDurabilityScoreFromPool } = require('@/lib/durability');
    const result = calculateDurabilityScoreFromPool(pool);
    const breakdown = {
      baseScore: result.baseScore,
      tvlScore: result.tvlScore,
      stabilityScore: result.stabilityScore,
      rewardScore: result.rewardScore,
      emissionsScore: result.emissionsScore,
    };
    setScoreBreakdown(breakdown);

    // Count up animation
    let current = 0;
    const target = result.score;
    const increment = target / 40;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayScore(target);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [pool]);

  const getScoreColor = (score: number) => {
    if (score < 41) return "#ef4444"; // red
    if (score < 70) return "#f59e0b"; // yellow
    return "#4ade80"; // green
  };

  const getScoreExplanation = (score: number) => {
    if (score < 41) return "This yield opportunity carries significant risk. Proceed with caution and conduct thorough due diligence.";
    if (score < 70) return "This yield opportunity has moderate risk. Consider your risk tolerance before committing capital.";
    return "This yield opportunity demonstrates strong durability. It may be suitable for longer-term positions.";
  };

  return (
    <div>
      {/* Large Score */}
      <div className="flex items-baseline justify-center mb-8">
        <span className="text-[72px] font-bold" style={{ color: getScoreColor(displayScore) }}>
          {displayScore}
        </span>
        <span className="text-[24px] text-[#64748b] ml-2">/ 100</span>
      </div>

      {/* Label */}
      <p className="text-[#64748b] text-[13px] tracking-[0.1em] font-bold text-center mb-4 uppercase">
        Durability Score
      </p>

      {/* Explanation */}
      <p className="text-white text-[14px] text-center max-w-[400px] mx-auto mb-8">{getScoreExplanation(displayScore)}</p>

      {/* Score Breakdown Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: "Base Score", value: scoreBreakdown.baseScore },
          { label: "TVL Score", value: scoreBreakdown.tvlScore },
          { label: "Stability Score", value: scoreBreakdown.stabilityScore },
          { label: "Emissions Score", value: scoreBreakdown.emissionsScore },
        ].map((item) => (
          <div key={item.label} className="bg-[#111111] border border-[#1a1a1a] rounded-[8px] p-4">
            <p className="text-[#64748b] text-[11px] uppercase tracking-[0.05em] mb-2">{item.label}</p>
            <p className="text-white font-bold text-[20px]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
