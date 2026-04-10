import { useState, useEffect } from "react";

export default function Settings() {
  const [config, setConfig] = useState({
    strictness: "Standard",
    sql_prevention: true,
    brute_force_mitigation: true,
    xss_heuristics: false
  });
  const [loading, setLoading] = useState(true);

  // Fetch initial config from AI Engine
  useEffect(() => {
    fetch("http://localhost:8000/settings")
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to load settings from AI engine", e);
        setLoading(false);
      });
  }, []);

  const updateConfig = async (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig); // Optimistic UI update
    
    try {
      await fetch("http://localhost:8000/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig)
      });
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  };

  if (loading) {
    return <div className="text-cat-text/50 italic p-6">Loading secure configurations from AI Engine...</div>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-cat-pink text-2xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(245,194,231,0.6)] mb-6">
        Engine Settings
      </h2>

      <div className="max-w-3xl space-y-6">
        <div className="bg-cat-panel p-6 rounded-2xl border border-cat-lavender/10 shadow-lg">
          <h3 className="text-cat-lavender text-sm font-bold uppercase tracking-widest mb-4 border-b border-cat-bg pb-2">AI Detection Strictness</h3>
          <div className="flex justify-between items-center bg-[#181825] p-4 rounded-xl border border-white/5 shadow-inner">
            <div>
              <div className="font-bold text-cat-text mb-1 flex items-center gap-2">
                Heuristic Aggressiveness
                <span className="text-[10px] bg-cat-mauve text-cat-bg px-1.5 py-0.5 rounded uppercase font-black tracking-widest">Active</span>
              </div>
              <div className="text-xs text-cat-text/60">Define how strictly the AI flags anomalous behavior.</div>
            </div>
            <div className="flex gap-2 bg-cat-bg rounded-lg p-1 border border-white/5">
              <button 
                onClick={() => updateConfig("strictness", "Standard")}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${config.strictness === "Standard" ? "bg-cat-green/20 text-cat-green border border-cat-green/30 shadow-[0_0_5px_rgba(166,227,161,0.2)]" : "hover:bg-cat-text/10 text-cat-text/60 border border-transparent"}`}
              >
                Standard
              </button>
              <button 
                onClick={() => updateConfig("strictness", "Paranoid")}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${config.strictness === "Paranoid" ? "bg-cat-red/20 text-cat-red border border-cat-red/30 shadow-[0_0_5px_rgba(243,139,168,0.2)]" : "hover:bg-cat-text/10 text-cat-text/60 border border-transparent"}`}
              >
                Paranoid
              </button>
            </div>
          </div>
        </div>

        <div className="bg-cat-panel p-6 rounded-2xl border border-cat-lavender/10 shadow-lg">
          <h3 className="text-cat-lavender text-sm font-bold uppercase tracking-widest mb-4 border-b border-cat-bg pb-2">Rule Definitions</h3>
          <div className="space-y-4 font-medium text-sm">
            
            {/* SQL Injection Toggle */}
            <div className="flex justify-between items-center bg-[#181825] p-3 rounded-lg border border-white/5">
              <span className={config.sql_prevention ? "text-cat-text" : "text-cat-text/50"}>SQL Injection Prevention</span>
              <div 
                onClick={() => updateConfig("sql_prevention", !config.sql_prevention)}
                className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer shadow-[0_0_5px_rgba(166,227,161,0.5)] ${config.sql_prevention ? "bg-cat-green" : "bg-cat-bg border border-white/10 shadow-none"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute shadow-md transition-all ${config.sql_prevention ? "right-0" : "left-0 bg-cat-text/40"}`}></div>
              </div>
            </div>

            {/* Brute Force Toggle */}
            <div className="flex justify-between items-center bg-[#181825] p-3 rounded-lg border border-white/5">
              <span className={config.brute_force_mitigation ? "text-cat-text" : "text-cat-text/50"}>Brute Force Mitigation</span>
              <div 
                onClick={() => updateConfig("brute_force_mitigation", !config.brute_force_mitigation)}
                className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer shadow-[0_0_5px_rgba(166,227,161,0.5)] ${config.brute_force_mitigation ? "bg-cat-green" : "bg-cat-bg border border-white/10 shadow-none"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute shadow-md transition-all ${config.brute_force_mitigation ? "right-0" : "left-0 bg-cat-text/40"}`}></div>
              </div>
            </div>

            {/* XSS Toggle */}
            <div className="flex justify-between items-center bg-[#181825] p-3 rounded-lg border border-white/5">
              <span className={config.xss_heuristics ? "text-cat-text" : "text-cat-text/50"}>XSS Zero-Day Heuristics</span>
              <div 
                onClick={() => updateConfig("xss_heuristics", !config.xss_heuristics)}
                className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer shadow-[0_0_5px_rgba(166,227,161,0.5)] ${config.xss_heuristics ? "bg-cat-green" : "bg-cat-bg border border-white/10 shadow-none"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute shadow-md transition-all ${config.xss_heuristics ? "right-0" : "left-0 bg-cat-text/40"}`}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
