export default function LoadingSkeleton() {
  return (
    <div
      className="card p-6 animate-pulse"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="mb-4">
        <div className="h-6 bg-[#1a1a1a] rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[#1a1a1a] rounded w-1/2"></div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-[#1a1a1a] rounded w-1/4"></div>
          <div className="h-4 bg-[#1a1a1a] rounded w-1/4"></div>
        </div>

        <div className="flex justify-between">
          <div className="h-4 bg-[#1a1a1a] rounded w-1/4"></div>
          <div className="h-4 bg-[#1a1a1a] rounded w-1/4"></div>
        </div>
      </div>

      <div className="h-10 bg-[#1a1a1a] rounded mt-6 w-full"></div>
    </div>
  );
}
