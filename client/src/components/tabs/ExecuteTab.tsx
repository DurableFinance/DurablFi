import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface YieldPool {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
}

interface ExecuteTabProps {
  pool: YieldPool;
}

const steps = [
  "Bridge assets",
  "Approve tokens",
  "Swap to position",
  "Deposit to vault",
  "Confirm on-chain",
];

export default function ExecuteTab({ pool }: ExecuteTabProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div>
      <h3 className="text-white text-[16px] font-semibold mb-6">Execute Strategy</h3>

      {/* Steps Card */}
      <div className="bg-[#111111] border border-[#1a1a1a] rounded-[12px] p-6 mb-6">
        {steps.map((step, idx) => (
          <div key={step}>
            <div className="flex items-center gap-4">
              <div className="bg-[#1a1a1a] rounded-[6px] px-2 py-1 min-w-[32px] text-center">
                <span className="text-[#64748b] text-[11px] font-bold">{String(idx + 1).padStart(2, "0")}</span>
              </div>
              <span className="text-[#94a3b8] text-[14px]">{step}</span>
            </div>
            {idx < steps.length - 1 && <div className="border-b border-[#1a1a1a] my-4 ml-12" />}
          </div>
        ))}
      </div>

      {/* Execute Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="w-full py-3.5 px-4 bg-[#22d3ee] text-[#0a0a0a] font-bold text-[14px] tracking-[0.05em] rounded-[10px] transition-all transform hover:bg-[#67e8f9] hover:-translate-y-0.5"
          >
            EXECUTE STRATEGY
          </button>
        </TooltipTrigger>
        {hovering && (
          <TooltipContent>
            <p>Execution launches in Phase 2 — wallet connect coming soon.</p>
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
}
