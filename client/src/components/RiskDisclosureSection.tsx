import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { generateRiskFlags } from '@/lib/durability';

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

interface RiskDisclosureSectionProps {
  selectedPool: YieldPool | null;
}

export default function RiskDisclosureSection({ selectedPool }: RiskDisclosureSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  if (!selectedPool) {
    return (
      <section className="dark">
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: 'var(--text-muted)' }}>Select a pool to view risk disclosure</p>
        </div>
      </section>
    );
  }

  const riskFlags = generateRiskFlags({
    totalApy: selectedPool.apy,
    apyBase: selectedPool.apyBase,
    apyReward: selectedPool.apyReward,
    apyMean30d: selectedPool.apyMean30d,
    tvlUsd: selectedPool.tvlUsd,
  });

  const riskDescriptions: Record<string, string> = {
    'Reward-Heavy APY': 'Significant portion of yield comes from rewards rather than base lending.',
    'High Emissions Dependency': 'Yield heavily dependent on emissions that may not be sustainable.',
    'Low TVL — Liquidity Risk': 'Limited liquidity may impact exit opportunities.',
    'APY Volatility Detected': 'Significant fluctuations in APY over the past 30 days.',
    'Relatively Stable Yield': 'Yield is relatively stable with low volatility.',
  };

  const getBadgeClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'badge-red';
      case 'yellow':
        return 'badge-amber';
      default:
        return 'badge-emerald';
    }
  };

  const getSeverityLabel = (color: string) => {
    switch (color) {
      case 'red':
        return 'HIGH RISK';
      case 'yellow':
        return 'MEDIUM RISK';
      default:
        return 'LOW RISK';
    }
  };

  return (
    <section ref={ref} className="dark">
      <div className="max-w-6xl mx-auto">
        {/* Step Label */}
        <div className={`step-label ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          STEP 4
        </div>

        {/* Heading */}
        <h2
          className={`text-4xl font-bold mb-4 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          Risk Disclosure
        </h2>

        {/* Subtext */}
        <p
          className={`text-lg mb-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{
            color: 'var(--text-muted)',
            animationDelay: '0.2s',
          }}
        >
          Flagged risks ranked by severity. Full transparency before capital is committed.
        </p>

        {/* Divider */}
        <div className={`divider ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }} />

        {/* Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {riskFlags.map((risk, idx) => (
            <div
              key={risk.label}
              className={`card card-dark p-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
            >
              {/* Risk Badge */}
              <div className={`badge ${getBadgeClass(risk.color)} mb-4 inline-block pulse-animation`}>
                {getSeverityLabel(risk.color)}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-white)' }}>
                {risk.label}
              </h3>

              {/* Description */}
              <p style={{ color: 'var(--text-muted)' }}>{riskDescriptions[risk.label] || 'Risk assessment'}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
