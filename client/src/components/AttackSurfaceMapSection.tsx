import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AlertCircle, Lock, TrendingUp, Zap } from 'lucide-react';

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

interface AttackSurfaceMapSectionProps {
  selectedPool: YieldPool | null;
}

export default function AttackSurfaceMapSection({ selectedPool }: AttackSurfaceMapSectionProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = React.useState<'on-chain' | 'off-chain'>('on-chain');

  const onChainRisks = [
    {
      icon: AlertCircle,
      title: 'Smart Contract Risk',
      description: 'Audited but not risk-free. Exploit vectors always exist.',
    },
    {
      icon: Lock,
      title: 'Liquidation Risk',
      description: 'Collateral ratios may drop below safety thresholds.',
    },
    {
      icon: TrendingUp,
      title: 'Slippage & MEV',
      description: 'Rebalancing may face front-running and sandwich attacks.',
    },
  ];

  const offChainRisks = [
    {
      icon: Zap,
      title: 'Team Risk',
      description: 'Centralized governance or key person dependency.',
    },
    {
      icon: AlertCircle,
      title: 'Regulatory Risk',
      description: 'DeFi protocols face evolving legal frameworks.',
    },
    {
      icon: TrendingUp,
      title: 'Market Risk',
      description: 'Underlying assets may depreciate or decouple.',
    },
  ];

  const risks = activeTab === 'on-chain' ? onChainRisks : offChainRisks;

  if (!selectedPool) {
    return (
      <section className="light">
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: 'var(--text-secondary)' }}>Select a pool to view attack surface</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="light">
      <div className="max-w-6xl mx-auto">
        {/* Step Label */}
        <div className={`step-label ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          STEP 3
        </div>

        {/* Heading */}
        <h2
          className={`text-4xl font-bold mb-4 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s', color: 'var(--text-dark)' }}
        >
          Attack Surface Map
        </h2>

        {/* Subtext */}
        <p
          className={`text-lg mb-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{
            color: 'var(--text-secondary)',
            animationDelay: '0.2s',
          }}
        >
          Identify all vectors of risk — both on-chain and off-chain — before capital deployment.
        </p>

        {/* Divider */}
        <div className={`divider ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }} />

        {/* Tab Toggle */}
        <div
          className={`flex gap-4 mb-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          <button
            onClick={() => setActiveTab('on-chain')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'on-chain'
                ? 'bg-indigo-100 text-indigo-900'
                : 'bg-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            On-Chain
          </button>
          <button
            onClick={() => setActiveTab('off-chain')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'off-chain'
                ? 'bg-indigo-100 text-indigo-900'
                : 'bg-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            Off-Chain
          </button>
        </div>

        {/* Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {risks.map((risk, idx) => {
            const Icon = risk.icon;
            return (
              <div
                key={risk.title}
                className={`card card-light p-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
              >
                <Icon size={32} style={{ color: 'var(--indigo)', marginBottom: '16px' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-dark)' }}>
                  {risk.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{risk.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
