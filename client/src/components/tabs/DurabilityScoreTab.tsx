import React, { useEffect, useState } from "react";
import { calculateDurabilityScore, calculateDurabilityScoreFromPool } from "@/lib/durability";
import { Shield, TrendingUp, Layers, Activity, Award } from "lucide-react";

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

  const getScoreTheme = (score: number) => {
    if (score < 41) return { text: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "shadow-rose-500/10" };
    if (score < 70) return { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-amber-500/10" };
    return { text: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/20", glow: "shadow-[#3b82f6]/20" };
  };

  const getScoreExplanation = (score: number) => {
    if (score < 41) return "High risk asset structure. Yield generation relies heavily on aggressive dilution or volatile reward emissions.";
    if (score < 70) return "Moderate durability. Well-balanced structural parameters with acceptable real transaction volume coverage.";
    return "Premium grade asset framework. Yield structures are fundamentally secure and derived from actual high-volume utility protocol actions.";
  };

  const theme = getScoreTheme(displayScore);

  // Mapping maximum weights to match the metrics perfectly
  const metrics = [
    { label: "Base Activity Score", value: scoreBreakdown.baseScore, max: 40, icon: <Activity size={16} /> },
    { label: "TVL Depth Score", value: scoreBreakdown.tvlScore, max: 25, icon: <Layers size={16} /> },
    { label: "Stability Index", value: scoreBreakdown.stabilityScore, max: 20, icon: <TrendingUp size={16} /> },
    { label: "Incentive Resilience", value: scoreBreakdown.emissionsScore, max: 15, icon: <Award size={16} /> },
  ];

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* Central Identity Radial Display Box */}
      <div className="relative flex flex-col items-center justify-center p-8 w-full max-w-md rounded-2xl bg-[#090a14]/60 border border-[#1c1e36]/40 backdrop-blur-md shadow-2xl">
        {/* Subtle Brand Background Glow Vector */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-transparent opacity-30 shadow-[inset_0_0_40px_rgba(59,130,246,0.05)]`} />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.border} border flex items-center justify-center mb-3 shadow-lg ${theme.glow}`}>
            <Shield size={18} className={theme.text} />
          </div>
          
          <p className="text-[#5c6499] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
            DURABLFI METRIC CAP
          </p>

          <div className="flex items-baseline justify-center select-none my-1">
            <span className={`text-[80px] font-extrabold font-mono tracking-tighter leading-none ${theme.text}`}>
              {displayScore}
            </span>
            <span className="text-[20px] text-[#4c527d] font-bold ml-1 font-mono">/100</span>
          </div>

          <h3 className="text-[#e2e4f3] text-[14px] font-bold tracking-wide uppercase mt-2 mb-3">
            Durability Integrity Rating
          </h3>
          
          <p className="text-[#8b92c2] text-[13px] leading-relaxed max-w-[340px] px-2">
            {getScoreExplanation(displayScore)}
          </p>
        </div>
      </div>

      {/* Institutional Progress Metrics Area */}
      <div className="w-full max-w-xl bg-[#090a14]/30 border border-[#1c1e36]/20 rounded-2xl p-6 shadow-xl space-y-5">
        <h4 className="text-[#5c6499] text-[11px] font-bold tracking-[0.15em] uppercase px-1 border-b border-[#1c1e36]/30 pb-3">
          Mathematical Weight Attribution
        </h4>

        <div className="space-y-4">
          {metrics.map((metric) => {
            const percentage = (metric.value / metric.max) * 100;
            return (
              <div key={metric.label} className="group">
                <div className="flex justify-between items-center text-[13px] mb-2 px-1">
                  <div className="flex items-center gap-2.5 text-[#8b92c2] group-hover:text-white transition-colors duration-150">
                    <div className="text-[#4c527d] group-hover:text-[#3b82f6] transition-colors duration-150">
                      {metric.icon}
                    </div>
                    <span className="font-medium">{metric.label}</span>
                  </div>
                  <div className="font-mono text-right font-semibold">
                    <span className="text-white">{metric.value}</span>
                    <span className="text-[#4c527d] text-[11px] font-normal ml-0.5">/{metric.max}</span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="w-full h-2.5 bg-[#111328]/80 border border-[#1c1e36]/40 rounded-full overflow-hidden p-[1px]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                    style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
