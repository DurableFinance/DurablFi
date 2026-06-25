/**
 * Durability Score Calculation
 * Formula components: baseScore, tvlScore, stabilityScore, rewardScore, emissionsScore
 */

interface PoolMetrics {
  totalApy: number;
  apyBase?: number | null;
  apyReward?: number | null;
  apyMean30d?: number | null;
  tvlUsd: number;
}

export interface DurabilityScoreResult {
  score: number;
  baseScore: number;
  tvlScore: number;
  stabilityScore: number;
  rewardScore: number;
  emissionsScore: number;
}

export function calculateDurabilityScore(metrics: PoolMetrics): DurabilityScoreResult {
  const {
    totalApy,
    apyBase,
    apyReward,
    apyMean30d,
    tvlUsd,
  } = metrics;

  // Guard against zero APY to prevent NaN/Infinity
  if (totalApy <= 0) {
    return {
      score: 0,
      baseScore: 0,
      tvlScore: 0,
      stabilityScore: 0,
      rewardScore: 0,
      emissionsScore: 0,
    };
  }

  // Base Yield Score (40 points max)
  const baseYield = apyBase ?? totalApy * 0.4;
  const baseScore = (baseYield / totalApy) * 40;

  // TVL Score (25 points max) - normalized to $100M
  const tvlScore = Math.min(tvlUsd / 100_000_000, 1) * 25;

  // Stability Score (20 points max)
  let stabilityScore = 10;
  if (apyMean30d && apyMean30d > 0) {
    const apyDiff = Math.abs(totalApy - apyMean30d);
    const volatility = apyDiff / totalApy;
    stabilityScore = (1 - volatility) * 20;
  }

  // Reward Score (15 points max if no reward, 10 if reward exists)
  const rewardScore = (apyReward ?? 0) > 0 ? 10 : 15;

  // Emissions Score (15 points max if stable, 5 if high emissions)
  const emissionsBoost = Math.max(0, totalApy - ((apyBase ?? 0) + (apyReward ?? 0)));
  const emissionsScore = emissionsBoost < totalApy * 0.3 ? 15 : 5;

  // Total score (capped at 100)
  const score = Math.min(
    baseScore + tvlScore + stabilityScore + rewardScore + emissionsScore,
    100
  );

  return {
    score: Math.round(score),
    baseScore: Math.round(baseScore),
    tvlScore: Math.round(tvlScore),
    stabilityScore: Math.round(stabilityScore),
    rewardScore: Math.round(rewardScore),
    emissionsScore: Math.round(emissionsScore),
  };
}

// Support both pool interface and metrics interface
export function calculateDurabilityScoreFromPool(pool: any): DurabilityScoreResult {
  return calculateDurabilityScore({
    totalApy: pool.apy || 0,
    apyBase: pool.apyBase,
    apyReward: pool.apyReward,
    apyMean30d: pool.apyMean30d,
    tvlUsd: pool.tvlUsd,
  });
}

export function getDurabilityScoreColor(score: number): string {
  if (score >= 70) return "#4ade80"; // green
  if (score >= 41) return "#fbbf24"; // yellow
  return "#ef4444"; // red
}

export function getDurabilityScoreExplanation(score: number): string {
  if (score >= 70) {
    return "This yield is primarily backed by real protocol activity.";
  }
  if (score >= 41) {
    return "This yield has moderate emissions dependency. Monitor closely.";
  }
  return "This yield is heavily emissions-driven. High decay risk.";
}

export function getDurabilityScoreExplanationUI(score: number): string {
  if (score >= 70) {
    return "This yield opportunity demonstrates strong durability. It may be suitable for longer-term positions.";
  }
  if (score >= 41) {
    return "This yield opportunity has moderate risk. Consider your risk tolerance before committing capital.";
  }
  return "This yield opportunity carries significant risk. Proceed with caution and conduct thorough due diligence.";
}

interface RiskFlag {
  label: string;
  color: "red" | "yellow" | "green";
}

export function generateRiskFlags(metrics: PoolMetrics): RiskFlag[] {
  const flags: RiskFlag[] = [];
  const {
    totalApy,
    apyBase,
    apyReward,
    apyMean30d,
    tvlUsd,
  } = metrics;

  // Guard against zero APY
  if (totalApy <= 0) {
    return [{
      label: "Insufficient Data",
      color: "yellow",
    }];
  }

  const baseYield = apyBase ?? 0;
  const rewardYield = apyReward ?? 0;
  const emissionsBoost = Math.max(0, totalApy - (baseYield + rewardYield));

  // Check for Reward-Heavy APY
  if (rewardYield > baseYield) {
    flags.push({
      label: "Reward-Heavy APY",
      color: "red",
    });
  }

  // Check for High Emissions Dependency
  if (emissionsBoost > totalApy * 0.3) {
    flags.push({
      label: "High Emissions Dependency",
      color: "red",
    });
  }

  // Check for Low TVL
  if (tvlUsd < 10_000_000) {
    flags.push({
      label: "Low TVL — Liquidity Risk",
      color: "yellow",
    });
  }

  // Check for APY Volatility
  if (apyMean30d && apyMean30d > 0) {
    const apyDiff = Math.abs(totalApy - apyMean30d);
    if (apyDiff > totalApy * 0.2) {
      flags.push({
        label: "APY Volatility Detected",
        color: "yellow",
      });
    }
  }

  // If all checks pass, show stable yield flag
  if (flags.length === 0) {
    flags.push({
      label: "Relatively Stable Yield",
      color: "green",
    });
  }

  return flags;
}

export function generateRiskFlagsFromPool(pool: any): RiskFlag[] {
  return generateRiskFlags({
    totalApy: pool.apy || 0,
    apyBase: pool.apyBase,
    apyReward: pool.apyReward,
    apyMean30d: pool.apyMean30d,
    tvlUsd: pool.tvlUsd,
  });
}

export function formatTVL(tvlUsd: number): string {
  if (tvlUsd >= 1_000_000_000) {
    return `$${(tvlUsd / 1_000_000_000).toFixed(2)}B`;
  }
  if (tvlUsd >= 1_000_000) {
    return `$${(tvlUsd / 1_000_000).toFixed(2)}M`;
  }
  return `$${tvlUsd.toFixed(0)}`;
}

export function formatAPY(apy: number): string {
  return apy.toFixed(2);
}
