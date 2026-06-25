import { formatTVL, formatAPY } from "@/lib/durability";

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

interface PoolCardProps {
  pool: YieldPool;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PoolCard({ pool, isSelected, onSelect }: PoolCardProps) {
  return (
    <button
      className="card p-6 cursor-pointer transition-all w-full text-left flex flex-col h-full"
      style={{
        backgroundColor: "var(--card)",
        border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
        boxShadow: isSelected ? "0 0 25px rgba(34, 211, 238, 0.15)" : "none",
      }}
      onClick={onSelect}
    >
      <div className="mb-4 flex-1">
        <h3 className="text-lg font-semibold text-white mb-1">{pool.symbol}</h3>
        <p className="text-sm text-[#94a3b8]" style={{ color: "var(--text-secondary)" }}>
          {pool.project} • {pool.chain}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#64748b]" style={{ color: "var(--text-muted)" }}>
            APY
          </span>
          <span className="text-xl font-bold text-[#22d3ee]" style={{ color: "var(--accent)" }}>
            {formatAPY(pool.apy)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[#64748b]" style={{ color: "var(--text-muted)" }}>
            TVL
          </span>
          <span className="text-sm font-semibold text-white">{formatTVL(pool.tvlUsd)}</span>
        </div>
      </div>

      <div className="btn-primary w-full mt-auto text-center">
        Decompose
      </div>
    </button>
  );
}
