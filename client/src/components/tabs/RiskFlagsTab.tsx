import React from "react";
import { generateRiskFlagsFromPool, formatTVL } from "@/lib/durability";

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

interface RiskFlagsTabProps {
  pool: YieldPool;
}

export default function RiskFlagsTab({ pool }: RiskFlagsTabProps) {
  const riskFlags = generateRiskFlagsFromPool(pool);

  const getRiskPillStyles = (color: string) => {
    switch (color) {
      case "red":
        return {
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#ef4444",
        };
      case "yellow":
        return {
          background: "rgba(245, 158, 11, 0.1)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          color: "#f59e0b",
        };
      case "green":
        return {
          background: "rgba(34, 197, 94, 0.1)",
          border: "1px solid rgba(34, 197, 94, 0.3)",
          color: "#4ade80",
        };
      default:
        return {};
    }
  };

  return (
    <div>
      <h3 className="text-white text-[16px] font-semibold mb-6">Risk Assessment</h3>

      {/* Risk Flags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {riskFlags.map((flag) => (
          <div
            key={flag.label}
            className="px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-[0.05em] flex items-center gap-1.5"
            style={getRiskPillStyles(flag.color)}
          >
            {flag.label}
          </div>
        ))}
      </div>

      {/* Pool Metadata Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8 border-t border-[#1a1a1a] pt-8">
        <div>
          <p className="text-[#64748b] text-[11px] uppercase tracking-[0.05em] mb-2">Protocol</p>
          <p className="text-white text-[14px]">{pool.project}</p>
        </div>
        <div>
          <p className="text-[#64748b] text-[11px] uppercase tracking-[0.05em] mb-2">Chain</p>
          <p className="text-white text-[14px]">{pool.chain}</p>
        </div>
        <div>
          <p className="text-[#64748b] text-[11px] uppercase tracking-[0.05em] mb-2">TVL</p>
          <p className="text-white text-[14px]">{formatTVL(pool.tvlUsd)}</p>
        </div>
        <div>
          <p className="text-[#64748b] text-[11px] uppercase tracking-[0.05em] mb-2">30d Avg APY</p>
          <p className="text-white text-[14px]">{(pool.apyMean30d || pool.apy).toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-[#64748b] text-[11px] uppercase tracking-[0.05em] mb-2">Symbol</p>
          <p className="text-white text-[14px]">{pool.symbol}</p>
        </div>
        <div>
          <p className="text-[#64748b] text-[11px] uppercase tracking-[0.05em] mb-2">Pool ID</p>
          <p className="text-white text-[14px] font-mono text-[12px] truncate">{pool.pool.substring(0, 12)}...</p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[#64748b] text-[12px] border-t border-[#1a1a1a] pt-6">
        Yield intelligence only. Not financial advice. Always DYOR.
      </p>
    </div>
  );
}
