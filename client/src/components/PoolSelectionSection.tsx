import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PoolCard from './PoolCard';
import LoadingSkeleton from './LoadingSkeleton';

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

interface PoolSelectionSectionProps {
  pools: YieldPool[];
  isLoading: boolean;
  selectedPool: YieldPool | null;
  onSelectPool: (pool: YieldPool) => void;
}

export default function PoolSelectionSection({
  pools,
  isLoading,
  selectedPool,
  onSelectPool,
}: PoolSelectionSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="light">
      <div className="max-w-6xl mx-auto">
        {/* Step Label */}
        <div className={`step-label ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          STEP 1
        </div>

        {/* Heading */}
        <h2
          className={`text-4xl font-bold mb-4 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          Select a yield position
        </h2>

        {/* Subtext */}
        <p
          className={`text-lg mb-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{
            color: 'var(--text-secondary)',
            animationDelay: '0.2s',
          }}
        >
          Choose from curated DeFi strategies. Each position is decomposed and stress-tested before you commit.
        </p>

        {/* Divider */}
        <div className={`divider ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }} />

        {/* Pool Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </>
          ) : pools.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p style={{ color: 'var(--text-secondary)' }}>No yield pools available at this time.</p>
            </div>
          ) : (
            pools.map((pool, idx) => (
              <div
                key={pool.pool}
                className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.4 + idx * 0.08}s` }}
              >
                <PoolCard
                  pool={pool}
                  isSelected={selectedPool?.pool === pool.pool}
                  onSelect={() => onSelectPool(pool)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
