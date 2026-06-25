import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

// Types for yield pool data
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

interface CachedYieldData {
  data: YieldPool[];
  timestamp: number;
}

// In-memory cache for yield data (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let yieldCache: CachedYieldData | null = null;

async function fetchYieldPools(): Promise<YieldPool[]> {
  try {
    const response = await fetch("https://yields.llama.fi/pools");
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("[Yield API] Error fetching pools:", error);
    throw new Error("Failed to fetch yield pools from DefiLlama");
  }
}

function filterAndSortPools(pools: YieldPool[]): YieldPool[] {
  const allowedProjects = ["aave-v3", "morpho", "pendle", "curve", "compound"];

  return pools
    .filter(
      (pool) =>
        allowedProjects.includes(pool.project) &&
        pool.tvlUsd > 5_000_000 &&
        pool.apy > 1
    )
    .sort((a, b) => b.apy - a.apy)
    .slice(0, 12);
}

async function getCachedYieldPools(): Promise<YieldPool[]> {
  const now = Date.now();

  // Return cached data if still valid
  if (yieldCache && now - yieldCache.timestamp < CACHE_DURATION) {
    console.log("[Yield Cache] Returning cached data");
    return yieldCache.data;
  }

  // Fetch fresh data
  console.log("[Yield Cache] Fetching fresh data from API");
  const pools = await fetchYieldPools();
  const filtered = filterAndSortPools(pools);

  // Update cache
  yieldCache = {
    data: filtered,
    timestamp: now,
  };

  return filtered;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  yield: router({
    getPools: publicProcedure.query(async () => {
      try {
        const pools = await getCachedYieldPools();
        return {
          success: true,
          data: pools,
        };
      } catch (error) {
        console.error("[Yield Router] Error in getPools:", error);
        return {
          success: false,
          data: [],
          error: "Unable to load live data. Please refresh.",
        };
      }
    }),

    getPoolDetails: publicProcedure
      .input(
        z.object({
          poolId: z.string(),
        })
      )
      .query(async ({ input }) => {
        try {
          const pools = await getCachedYieldPools();
          const pool = pools.find((p) => p.pool === input.poolId);

          if (!pool) {
            return {
              success: false,
              data: null,
              error: "Pool not found",
            };
          }

          return {
            success: true,
            data: pool,
          };
        } catch (error) {
          console.error("[Yield Router] Error in getPoolDetails:", error);
          return {
            success: false,
            data: null,
            error: "Unable to load pool details",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
