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
  const tokenSymbol = pool.symbol.substring(0, 3).toUpperCase();

  return (
    <button
      className={`card card-light pool-card p-6 w-full text-left flex flex-col h-full ${
        isSelected ? 'selected' : ''
      }`}
      onClick={onSelect}
    >
      {/* Token Badge */}
      <div className="token-badge mb-4">
        {tokenSymbol}
      </div>

      {/* Token Name */}
      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-dark)' }}>
        {pool.symbol}
      </h3>

      {/* Protocol & Chain */}
      <p
        className="text-xs uppercase mb-6 flex-1"
        style={{
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          lineHeight: '1.6',
        }}
      >
        {pool.project} • {pool.chain}
      </p>

      {/* APY Section */}
      <div className="mb-4">
        <p
          className="text-xs uppercase mb-2"
          style={{
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}
        >
          APY
        </p>
        <p className="text-3xl font-bold" style={{ color: 'var(--emerald)' }}>
          {formatAPY(pool.apy)}%
        </p>
      </div>

      {/* TVL */}
      <p
        className="text-sm"
        style={{
          color: 'var(--text-secondary)',
        }}
      >
        TVL: {formatTVL(pool.tvlUsd)}
      </p>
    </button>
  );
}
