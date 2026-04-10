import { useRef, useEffect } from "react";

export default function LiveTraffic({ logs }) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 animate-in fade-in zoom-in duration-300">
      {/* LOG PANEL */}
      <div className="bg-cat-panel p-5 rounded-2xl h-[650px] overflow-hidden flex flex-col shadow-2xl border border-cat-lavender/10 relative">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-cat-bg/50">
          <h2 className="text-cat-green text-xl font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(166,227,161,0.5)] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cat-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Traffic Stream
          </h2>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="bg-cat-bg px-2 py-1 rounded text-cat-lavender border border-cat-lavender/20 shadow-inner">
              Requests Analyzed: <span className="font-bold text-cat-text ml-1">{logs.length}</span>
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 font-mono text-sm">
          {logs.length === 0 && (
            <div className="text-cat-text/40 flex h-full items-center justify-center italic flex-col gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Awaiting intelligent routing...
            </div>
          )}
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={`p-3.5 rounded-lg border-l-[6px] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-[2px] ${
                log.status === "BLOCKED 🚫"
                  ? "bg-cat-red/10 border-cat-red text-cat-red/90 hover:bg-cat-red/20 shadow-[0_0_15px_rgba(243,139,168,0.1)]"
                  : "bg-cat-green/5 border-cat-green text-cat-text hover:bg-cat-green/10"
              }`}
            >
              <div className="flex justify-between mb-1.5 items-center">
                <strong className={`flex items-center gap-2 ${
                  log.status === "BLOCKED 🚫" ? "text-cat-red drop-shadow-[0_0_5px_rgba(243,139,168,0.6)] font-extrabold" : "text-cat-green font-bold"
                }`}>
                  {log.status}
                </strong>
                <span className="text-xs opacity-60 font-medium">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              {log.reason && log.reason !== "Clean" && (
                <div className="mt-1 text-xs font-bold text-cat-red uppercase tracking-widest bg-red-950/40 w-fit px-2 py-0.5 rounded border border-cat-red/30">
                  DETECTED: {log.reason}
                </div>
              )}
              <div className="mt-2.5 text-[0.8rem] text-cat-text/80 break-words font-mono bg-[#181825] p-2.5 rounded-md border border-white/5 font-semibold">
                {JSON.stringify(log.payload)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALERT PANEL */}
      <div className="bg-cat-panel p-5 rounded-2xl flex flex-col gap-5 shadow-2xl border border-cat-pink/20 h-fit">
        <div className="border-b border-cat-bg/50 pb-3 flex items-center justify-between">
          <h2 className="text-cat-pink text-xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(245,194,231,0.6)] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Threat Intelligence
          </h2>
        </div>
        
        <div className={`p-5 rounded-xl border-2 transition-all duration-500 ease-in-out ${
          logs.some(l => l.status === "BLOCKED 🚫") 
            ? "bg-cat-red/10 border-cat-red animate-pulse-glow" 
            : "bg-[#181825] border-cat-bg shadow-inner"
        }`}>
          <h3 className={`font-extrabold uppercase text-sm mb-2 tracking-widest flex items-center gap-2 ${logs.some(l => l.status === "BLOCKED 🚫") ? "text-cat-red" : "text-cat-text/60"}`}>
            {logs.some(l => l.status === "BLOCKED 🚫") ? (
              <><span className="w-2 h-2 rounded-full bg-cat-red animate-ping" /> CRITICAL ALERT</>
            ) : (
              <><span className="w-2 h-2 rounded-full bg-cat-text/40" /> SYSTEM SECURE</>
            )}
          </h3>
          <p className={`text-sm leading-relaxed ${logs.some(l => l.status === "BLOCKED 🚫") ? "text-cat-text/90" : "text-cat-text/50"}`}>
            {logs.some(l => l.status === "BLOCKED 🚫") 
              ? "Active attack vectors detected and autonomously mitigated by the AI Engine." 
              : "Real-time attack detection active. Monitoring ingress traffic for malicious signatures and anomalous behavior."
            }
          </p>
        </div>

        <div className="bg-[#181825] p-5 rounded-xl border border-white/5 shadow-inner">
          <h3 className="text-cat-lavender text-xs uppercase font-extrabold tracking-widest mb-4 opacity-80 border-b border-cat-text/10 pb-2">System Status</h3>
          <div className="space-y-3 text-sm font-medium">
            <div className="flex justify-between items-center group">
              <span className="text-cat-text/60 group-hover:text-cat-text/90 transition-colors">WAF Rules Engine</span>
              <span className="text-cat-green bg-cat-green/10 px-2 py-1 rounded text-xs font-bold border border-cat-green/20 shadow-[0_0_5px_rgba(166,227,161,0.2)]">ONLINE</span>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-cat-text/60 group-hover:text-cat-text/90 transition-colors">Anomaly Detection</span>
              <span className="text-cat-green bg-cat-green/10 px-2 py-1 rounded text-xs font-bold border border-cat-green/20 shadow-[0_0_5px_rgba(166,227,161,0.2)]">ACTIVE</span>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-cat-text/60 group-hover:text-cat-text/90 transition-colors">Target Origin App</span>
              <span className="text-cat-green bg-cat-green/10 px-2 py-1 rounded text-xs font-bold border border-cat-green/20 shadow-[0_0_5px_rgba(166,227,161,0.2)]">HEALTHY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
