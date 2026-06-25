import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #0d0d2b 0%, #050510 100%)',
      }}
    >
      {/* Badge */}
      <div
        className={`badge mb-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}
        style={{ animationDelay: '0s' }}
      >
        <span className="w-2 h-2 rounded-full bg-white"></span>
        LIVE DEMO · RISK INTELLIGENCE
      </div>

      {/* Logo */}
      <h1
        className={`font-bold mb-6 text-center ${
          isVisible ? 'slide-in-up' : 'opacity-0'
        }`}
        style={{
          animationDelay: '0s',
          fontSize: 'clamp(40px, 8vw, 56px)',
        }}
      >
        <span className="text-white">Durabl</span>
        <span className="text-gradient">IFi</span>
      </h1>

      {/* Tagline */}
      <p
        className={`text-center max-w-xl text-base sm:text-lg mb-12 ${
          isVisible ? 'fade-in' : 'opacity-0'
        }`}
        style={{
          color: 'var(--text-muted)',
          animationDelay: '0.3s',
        }}
      >
        Maps the full attack surface — on-chain & off-chain — before you deposit.
      </p>

      {/* Explore */}
      <div
        className={`flex flex-col items-center gap-2 ${
          isVisible ? 'fade-in' : 'opacity-0'
        }`}
        style={{
          color: 'var(--text-secondary)',
          animationDelay: '0.6s',
        }}
      >
        <span className="text-xs uppercase tracking-widest">Explore</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
