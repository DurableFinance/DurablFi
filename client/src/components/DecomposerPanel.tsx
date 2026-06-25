import { useMemo } from "react";
import {
  calculateDurabilityScore,
  getDurabilityScoreColor,
  getDurabilityScoreExplanation,
  generateRiskFlags,
  formatTVL,
  formatAPY,
} from "@/lib/durability";

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

interface DecomposerPanelProps {
  pool: YieldPool;
}

export default function DecomposerPanel({ pool }: DecomposerPanelProps) {
  const metrics = useMemo(
    () => ({
      totalApy: pool.apy,
      apyBase: pool.apyBase,
      apyReward: pool.apyReward,
      apyMean30d: pool.apyMean30d,
      tvlUsd: pool.tvlUsd,
    }),
    [pool]
  );

  const durabilityScoreResult = useMemo(
    () => calculateDurabilityScore(metrics),
    [metrics]
  );
  const durabilityScore = durabilityScoreResult.score;

  const scoreColor = getDurabilityScoreColor(durabilityScore);
  const scoreExplanation = getDurabilityScoreExplanation(durabilityScore);
  const riskFlags = generateRiskFlags(metrics);

  // Calculate APY components
  const baseYield = pool.apyBase ?? pool.apy * 0.4;
  const rewardYield = pool.apyReward ?? pool.apy * 0.35;
  const emissionsBoost = Math.max(0, pool.apy - (baseYield + rewardYield));
  const mean30d = pool.apyMean30d ?? 0;

  // Calculate percentages for bar chart (guard against zero APY)
  const basePercent = pool.apy > 0 ? (baseYield / pool.apy) * 100 : 0;
  const rewardPercent = pool.apy > 0 ? (rewardYield / pool.apy) * 100 : 0;
  const emissionsPercent = pool.apy > 0 ? (emissionsBoost / pool.apy) * 100 : 0;

  return (
    <div
      className="rounded-lg p-8 border"
      style={{
        backgroundColor: "var(--panel)",
        borderColor: "var(--border)",
      }}
    >
      <h3 className="text-2xl font-bold text-white mb-8">Yield Decomposition</h3>

      {/* APY Breakdown */}
      <section className="mb-10">
        <h4 className="text-lg font-semibold text-white mb-4">APY Breakdown</h4>

        <div className="space-y-4">
          {/* Base Yield */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#94a3b8]">Base Yield</span>
              <span className="text-sm font-semibold text-white">
                {basePercent.toFixed(1)}% ({formatAPY(baseYield)}%)
              </span>
            </div>
            <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${basePercent}%`,
                  backgroundColor: "#22d3ee",
                }}
              ></div>
            </div>
          </div>

          {/* Reward APY */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#94a3b8]">Reward APY</span>
              <span className="text-sm font-semibold text-white">
                {rewardPercent.toFixed(1)}% ({formatAPY(rewardYield)}%)
              </span>
            </div>
            <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${rewardPercent}%`,
                  backgroundColor: "#4ade80",
                }}
              ></div>
            </div>
          </div>

          {/* Emissions Boost */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#94a3b8]">Emissions Boost</span>
              <span className="text-sm font-semibold text-white">
                {emissionsPercent.toFixed(1)}% ({formatAPY(emissionsBoost)}%)
              </span>
            </div>
            <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${emissionsPercent}%`,
                  backgroundColor: "#fbbf24",
                }}
              ></div>
            </div>
          </div>

          {/* Mean 30d APY Reference Line */}
          {mean30d > 0 && (
            <div className="mt-4 p-3 bg-[#111111] rounded border border-[#27272a]">
              <div className="flex justify-between">
                <span className="text-sm text-[#94a3b8]">30-day Mean APY</span>
                <span className="text-sm font-semibold text-white">
                  {formatAPY(mean30d)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Durability Score */}
      <section className="mb-10">
        <h4 className="text-lg font-semibold text-white mb-4">Durability Score</h4>

        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <div
              className="text-6xl font-bold"
              style={{ color: scoreColor }}
            >
              {durabilityScore}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-sm text-[#94a3b8] mb-2">
              Score Range: 0-40 (Red) | 41-69 (Yellow) | 70-100 (Green)
            </p>
            <p className="text-base text-white">{scoreExplanation}</p>
          </div>
        </div>
      </section>

      {/* Risk Flags */}
      <section className="mb-10">
        <h4 className="text-lg font-semibold text-white mb-4">Risk Assessment</h4>

        <div className="flex flex-wrap gap-2">
          {riskFlags.map((flag, idx) => {
            const bgColor =
              flag.color === "red"
                ? "bg-red-900 bg-opacity-30 text-red-300 border-red-700"
                : flag.color === "yellow"
                ? "bg-yellow-900 bg-opacity-30 text-yellow-300 border-yellow-700"
                : "bg-green-900 bg-opacity-30 text-green-300 border-green-700";

            return (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${bgColor}`}
              >
                {flag.label}
              </span>
            );
          })}
        </div>
      </section>

      {/* Pool Metadata */}
      <section className="mb-10">
        <h4 className="text-lg font-semibold text-white mb-4">Pool Details</h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-[#64748b] mb-1">Protocol</p>
            <p className="text-sm font-semibold text-white">{pool.project}</p>
          </div>

          <div>
            <p className="text-xs text-[#64748b] mb-1">Chain</p>
            <p className="text-sm font-semibold text-white">{pool.chain}</p>
          </div>

          <div>
            <p className="text-xs text-[#64748b] mb-1">TVL</p>
            <p className="text-sm font-semibold text-white">{formatTVL(pool.tvlUsd)}</p>
          </div>

          <div>
            <p className="text-xs text-[#64748b] mb-1">30d Avg APY</p>
            <p className="text-sm font-semibold text-white">
              {mean30d > 0 ? `${formatAPY(mean30d)}%` : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#64748b] mb-1">Pool Symbol</p>
            <p className="text-sm font-semibold text-white">{pool.symbol}</p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="pt-6 border-t border-[#27272a]">
        <p className="text-xs text-[#64748b]" style={{ color: "var(--text-muted)" }}>
          This is yield intelligence, not financial advice. Always DYOR before depositing.
        </p>
      </div>
    </div>
  );
}
