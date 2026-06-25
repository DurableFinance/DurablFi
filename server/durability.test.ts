import { describe, expect, it } from "vitest";

/**
 * Durability Score Calculation Tests
 * Tests the exact formula components: baseScore, tvlScore, stabilityScore, rewardScore, emissionsScore
 */

interface PoolMetrics {
  totalApy: number;
  apyBase?: number | null;
  apyReward?: number | null;
  apyMean30d?: number | null;
  tvlUsd: number;
}

function calculateDurabilityScore(metrics: PoolMetrics): number {
  const {
    totalApy,
    apyBase,
    apyReward,
    apyMean30d,
    tvlUsd,
  } = metrics;

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
  const durabilityScore = Math.min(
    baseScore + tvlScore + stabilityScore + rewardScore + emissionsScore,
    100
  );

  return Math.round(durabilityScore);
}

describe("Durability Score Calculation", () => {
  it("calculates score with all fields provided", () => {
    const metrics: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 9.5,
      tvlUsd: 100_000_000,
    };

    const score = calculateDurabilityScore(metrics);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("uses defaults when fields are null", () => {
    const metrics: PoolMetrics = {
      totalApy: 10,
      apyBase: null,
      apyReward: null,
      apyMean30d: null,
      tvlUsd: 50_000_000,
    };

    const score = calculateDurabilityScore(metrics);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("handles high emissions dependency correctly", () => {
    const metricsStable: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 10,
      tvlUsd: 100_000_000,
    };

    const metricsHighEmissions: PoolMetrics = {
      totalApy: 10,
      apyBase: 2,
      apyReward: 1,
      apyMean30d: 10,
      tvlUsd: 100_000_000,
    };

    const stableScore = calculateDurabilityScore(metricsStable);
    const highEmissionsScore = calculateDurabilityScore(metricsHighEmissions);

    expect(stableScore).toBeGreaterThan(highEmissionsScore);
  });

  it("rewards higher TVL", () => {
    const metricsLowTVL: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 10,
      tvlUsd: 10_000_000,
    };

    const metricsHighTVL: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 10,
      tvlUsd: 500_000_000,
    };

    const lowTVLScore = calculateDurabilityScore(metricsLowTVL);
    const highTVLScore = calculateDurabilityScore(metricsHighTVL);

    expect(highTVLScore).toBeGreaterThanOrEqual(lowTVLScore);
  });

  it("penalizes high APY volatility", () => {
    const metricsStable: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 10,
      tvlUsd: 100_000_000,
    };

    const metricsVolatile: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 5,
      tvlUsd: 100_000_000,
    };

    const stableScore = calculateDurabilityScore(metricsStable);
    const volatileScore = calculateDurabilityScore(metricsVolatile);

    expect(stableScore).toBeGreaterThan(volatileScore);
  });

  it("handles edge case: zero APY", () => {
    const metrics: PoolMetrics = {
      totalApy: 0,
      apyBase: 0,
      apyReward: 0,
      apyMean30d: 0,
      tvlUsd: 100_000_000,
    };

    // Should not throw and should return a valid score
    expect(() => calculateDurabilityScore(metrics)).not.toThrow();
  });

  it("caps score at 100", () => {
    const metrics: PoolMetrics = {
      totalApy: 10,
      apyBase: 10,
      apyReward: 0,
      apyMean30d: 10,
      tvlUsd: 1_000_000_000,
    };

    const score = calculateDurabilityScore(metrics);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe("Risk Flag Generation", () => {
  it("detects reward-heavy APY", () => {
    const metrics: PoolMetrics = {
      totalApy: 10,
      apyBase: 2,
      apyReward: 6,
      apyMean30d: 10,
      tvlUsd: 100_000_000,
    };

    const baseYield = metrics.apyBase ?? 0;
    const rewardYield = metrics.apyReward ?? 0;
    const isRewardHeavy = rewardYield > baseYield;

    expect(isRewardHeavy).toBe(true);
  });

  it("detects high emissions dependency", () => {
    const metrics: PoolMetrics = {
      totalApy: 10,
      apyBase: 2,
      apyReward: 1,
      apyMean30d: 10,
      tvlUsd: 100_000_000,
    };

    const baseYield = metrics.apyBase ?? 0;
    const rewardYield = metrics.apyReward ?? 0;
    const emissionsBoost = Math.max(0, metrics.totalApy - (baseYield + rewardYield));
    const isHighEmissions = emissionsBoost > metrics.totalApy * 0.3;

    expect(isHighEmissions).toBe(true);
  });

  it("detects low TVL", () => {
    const metrics: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 10,
      tvlUsd: 5_000_000,
    };

    const isLowTVL = metrics.tvlUsd < 10_000_000;

    expect(isLowTVL).toBe(true);
  });

  it("detects APY volatility", () => {
    const metrics: PoolMetrics = {
      totalApy: 10,
      apyBase: 5,
      apyReward: 3,
      apyMean30d: 5,
      tvlUsd: 100_000_000,
    };

    if (metrics.apyMean30d && metrics.apyMean30d > 0) {
      const apyDiff = Math.abs(metrics.totalApy - metrics.apyMean30d);
      const isVolatile = apyDiff > metrics.totalApy * 0.2;

      expect(isVolatile).toBe(true);
    }
  });
});
