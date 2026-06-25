import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { calculateDurabilityScore } from '@/lib/durability';

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

interface YieldDecompositionSectionProps {
  selectedPool: YieldPool | null;
}

export default function YieldDecompositionSection({ selectedPool }: YieldDecompositionSectionProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: scoreRef, count: scoreCount } = useCountUp(
    selectedPool
      ? calculateDurabilityScore({
          totalApy: selectedPool.apy,
          apyBase: selectedPool.apyBase,
          apyReward: selectedPool.apyReward,
          apyMean30d: selectedPool.apyMean30d,
          tvlUsd: selectedPool.tvlUsd,
        }).score
      : 0,
    800
  );

  if (!selectedPool) {
    return (
      <section className="dark">
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: 'var(--text-muted)' }}>Select a pool to view yield decomposition</p>
        </div>
      </section>
    );
  }

  const baseLending = selectedPool.apyBase || 0;
  const rewards = selectedPool.apyReward || 0;
  const totalApy = selectedPool.apy || 0;
  const incentives = Math.max(0, totalApy - baseLending - rewards);

  const basePercent = totalApy > 0 ? (baseLending / totalApy) * 100 : 0;
  const rewardPercent = totalApy > 0 ? (rewards / totalApy) * 100 : 0;
  const incentivePercent = totalApy > 0 ? (incentives / totalApy) * 100 : 0;

  return (
    <section ref={ref} className="dark">
      <div className="max-w-6xl mx-auto">
        {/* Step Label */}
        <div className={`step-label ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          STEP 2
        </div>

        {/* Heading */}
        <h2
          className={`text-4xl font-bold mb-4 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          Yield Decomposition
        </h2>

        {/* Subtext */}
        <p
          className={`text-lg mb-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{
            color: 'var(--text-muted)',
            animationDelay: '0.2s',
          }}
        >
          Every basis point explained. Understand what drives returns before risk exposure.
        </p>

        {/* Divider */}
        <div className={`divider ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }} />

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: APY Display */}
          <div>
            <p
              className="text-xs uppercase mb-4"
              style={{
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
              }}
            >
              Total APY
            </p>
            <p className="text-6xl font-bold mb-8" style={{ color: 'var(--text-white)' }}>
              {totalApy.toFixed(2)}%
            </p>

            {/* Durability Score Pill */}
            <div ref={scoreRef} className="badge badge-emerald inline-flex">
              Durability Score {scoreCount} / 100
            </div>
          </div>

          {/* Right: Breakdown Bars */}
          <div className="space-y-6">
            {/* Base Lending */}
            <div>
              <div className="flex justify-between mb-2">
                <span style={{ color: 'var(--text-muted)' }}>Base Lending</span>
                <span style={{ color: 'var(--text-muted)' }}>{basePercent.toFixed(1)}%</span>
              </div>
              <div className="bar-container">
                <div
                  className={`bar-fill ${isVisible ? 'fade-in' : 'opacity-0'}`}
                  style={{
                    width: isVisible ? `${basePercent}%` : '0%',
                    animationDelay: '0.4s',
                  }}
                />
              </div>
            </div>

            {/* Incentive Rewards */}
            <div>
              <div className="flex justify-between mb-2">
                <span style={{ color: 'var(--text-muted)' }}>PT Discount</span>
                <span style={{ color: 'var(--text-muted)' }}>{rewardPercent.toFixed(1)}%</span>
              </div>
              <div className="bar-container">
                <div
                  className={`bar-fill ${isVisible ? 'fade-in' : 'opacity-0'}`}
                  style={{
                    width: isVisible ? `${rewardPercent}%` : '0%',
                    animationDelay: '0.5s',
                  }}
                />
              </div>
            </div>

            {/* Incentive Boost */}
            <div>
              <div className="flex justify-between mb-2">
                <span style={{ color: 'var(--text-muted)' }}>Incentive Rewards</span>
                <span style={{ color: 'var(--text-muted)' }}>{incentivePercent.toFixed(1)}%</span>
              </div>
              <div className="bar-container">
                <div
                  className={`bar-fill ${isVisible ? 'fade-in' : 'opacity-0'}`}
                  style={{
                    width: isVisible ? `${incentivePercent}%` : '0%',
                    animationDelay: '0.6s',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
