import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ExecuteStrategySection() {
  const { ref, isVisible } = useScrollAnimation();

  const steps = [
    'Approve token spending from your wallet',
    'Deposit position into DurablFi strategy',
    'Automatic yield routing to your address',
    'Real-time monitoring and rebalancing',
    'Exit anytime — no lock-in period',
  ];

  return (
    <section ref={ref} className="dark" style={{ backgroundColor: '#0d0d2b' }}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Step Label */}
        <div className={`step-label justify-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          STEP 5
        </div>

        {/* Heading */}
        <h2
          className={`text-5xl font-bold mb-4 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          Execute Strategy
        </h2>

        {/* Subtext */}
        <p
          className={`text-lg mb-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{
            color: 'var(--text-muted)',
            animationDelay: '0.2s',
          }}
        >
          One transaction. Five steps. Fully automated from your current wallet position.
        </p>

        {/* Strategy Card */}
        <div
          className={`glass-effect rounded-3xl p-8 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          {/* Steps List */}
          <div className="space-y-4 mb-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
              >
                {/* Step Badge */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Step Text */}
                <p
                  className="pt-2 text-left"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '15px',
                  }}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Execute Button */}
          <button
            className="btn btn-gradient w-full"
            title="Execution coming in Phase 2"
          >
            EXECUTE STRATEGY
          </button>
        </div>
      </div>
    </section>
  );
}
