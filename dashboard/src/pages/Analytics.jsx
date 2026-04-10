export default function Analytics({ logs }) {
  const totalRequests = logs.length;
  const blockedRequests = logs.filter(l => l.status === "BLOCKED 🚫").length;
  const allowedRequests = logs.filter(l => l.status !== "BLOCKED 🚫").length;
  
  // Aggregate threats
  const threats = {};
  logs.forEach(l => {
    if (l.status === "BLOCKED 🚫" && l.reason) {
      threats[l.reason] = (threats[l.reason] || 0) + 1;
    }
  });

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-cat-pink text-2xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(245,194,231,0.6)] mb-6">
        Global Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-cat-panel p-6 rounded-2xl border border-cat-lavender/10 shadow-lg flex flex-col items-center justify-center text-center">
          <span className="text-cat-lavender/70 font-bold uppercase tracking-widest text-sm mb-2">Total Packets</span>
          <span className="text-5xl font-extrabold text-cat-text">{totalRequests}</span>
        </div>
        <div className="bg-cat-panel p-6 rounded-2xl border border-cat-red/30 shadow-[0_0_15px_rgba(243,139,168,0.1)] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cat-red/5 -z-10"></div>
          <span className="text-cat-red/70 font-bold uppercase tracking-widest text-sm mb-2">Malicious Blocked</span>
          <span className="text-5xl font-extrabold text-cat-red">{blockedRequests}</span>
        </div>
        <div className="bg-cat-panel p-6 rounded-2xl border border-cat-green/30 shadow-[0_0_15px_rgba(166,227,161,0.1)] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cat-green/5 -z-10"></div>
          <span className="text-cat-green/70 font-bold uppercase tracking-widest text-sm mb-2">Secure Traffic</span>
          <span className="text-5xl font-extrabold text-cat-green">{allowedRequests}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cat-panel p-6 rounded-2xl border border-cat-lavender/10 shadow-lg min-h-[300px]">
          <h3 className="text-cat-lavender text-lg font-bold uppercase tracking-widest mb-6 border-b border-cat-bg pb-3">Threat Breakdown</h3>
          {Object.keys(threats).length === 0 ? (
             <div className="text-cat-text/40 h-full flex items-center justify-center italic mt-10">
               No threats detected yet.
             </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(threats).map(([reason, count]) => (
                <div key={reason}>
                  <div className="flex justify-between text-sm font-bold text-cat-text/80 mb-1">
                    <span>{reason}</span>
                    <span className="text-cat-red">{count} ({Math.round(count/blockedRequests * 100)}%)</span>
                  </div>
                  <div className="w-full bg-cat-bg rounded-full h-2.5 shadow-inner">
                    <div className="bg-cat-red h-2.5 rounded-full shadow-[0_0_8px_rgba(243,139,168,0.8)]" style={{ width: `${(count/blockedRequests) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-cat-panel p-6 rounded-2xl border border-cat-lavender/10 shadow-lg flex flex-col items-center">
          <h3 className="text-cat-lavender text-lg font-bold uppercase tracking-widest mb-6 border-b border-cat-bg pb-3 w-full">AI Engine Confidence</h3>
          <div className="flex items-center justify-center h-48 relative w-full pt-4">
            <div className="absolute text-center">
              <span className="text-4xl font-extrabold text-cat-green block mb-1 drop-shadow-[0_0_8px_rgba(166,227,161,0.5)]">99.9%</span>
              <span className="text-xs text-cat-text/50 uppercase tracking-widest">Accuracy</span>
            </div>
            {/* Visual circle via SVG */}
            <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-cat-bg" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="440" strokeDashoffset="0" className="text-cat-green shadow-[0_0_10px_#a6e3a1]" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
