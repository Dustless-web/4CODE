import { useEffect, useState } from "react";

export default function Topology({ logs }) {
  const latestLog = logs?.[0];
  const isBlocked = latestLog?.status === "BLOCKED 🚫";
  const isAllowed = latestLog?.status === "ALLOWED ✅";

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!latestLog) return;
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(timer);
  }, [latestLog]);

  const proxyColor = pulse
    ? isBlocked
      ? "border-cat-red shadow-[0_0_20px_#f38ba8]"
      : "border-cat-green shadow-[0_0_20px_#a6e3a1]"
    : "border-cat-lavender/50";

  const lineToAiColor = pulse
    ? isBlocked
      ? "bg-cat-red shadow-[0_0_15px_#f38ba8]"
      : "bg-cat-green shadow-[0_0_15px_#a6e3a1]"
    : "bg-cat-lavender/20";

  const aiEngineColor = pulse
    ? isBlocked
      ? "border-cat-red text-cat-red shadow-[0_0_20px_#f38ba8]"
      : "border-cat-green text-cat-green shadow-[0_0_20px_#a6e3a1]"
    : "border-cat-mauve text-cat-mauve";

  const lineToTargetColor =
    pulse && isAllowed
      ? "bg-cat-green shadow-[0_0_15px_#a6e3a1]"
      : "bg-cat-lavender/10 opacity-30";

  const targetAppColor =
    pulse && isAllowed
      ? "border-cat-green shadow-[0_0_20px_#a6e3a1] text-cat-text"
      : "border-cat-lavender/30 opacity-50 text-cat-text/50";

  return (
    <div className="animate-in fade-in duration-500 w-full min-h-[600px] bg-gradient-to-b from-[#181825] to-[#11111b] rounded-3xl border border-cat-lavender/10 shadow-2xl flex flex-col p-6 md:p-10 relative overflow-hidden font-sans">

      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent bg-[length:20px_20px]" />

      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10 md:mb-14 z-30">
        <h2 className="text-cat-pink text-2xl md:text-3xl font-extrabold tracking-widest drop-shadow-[0_0_15px_rgba(245,194,231,0.5)]">
          THREAT TOPOLOGY
        </h2>

        {latestLog && (
          <div className="w-full md:w-auto text-sm font-mono flex flex-col items-start md:items-end backdrop-blur-md bg-black/40 p-4 rounded-xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full animate-ping bg-cat-green" />
              <span className="text-cat-text/50 uppercase tracking-widest text-[10px] font-bold">
                Latest Intercept
              </span>
            </div>

            <span className="text-[13px] uppercase tracking-wider text-cat-green font-black">
              [SECURE] Forwarded Safely
            </span>

            <div className="mt-3 text-[11px] text-cat-lavender/80 bg-black/60 p-2.5 rounded-lg max-w-full md:max-w-[420px] break-words border border-white/5 shadow-inner">
              {JSON.stringify(latestLog.payload)}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full z-10 relative">
        <div className="w-full max-w-6xl mx-auto bg-black/20 p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm overflow-x-auto">

          <div className="min-w-[980px] xl:min-w-0 flex items-center justify-center gap-6 xl:gap-8">

            {/* Origin */}
            <div className="flex flex-col items-center w-32">
              <div className="w-28 h-28 bg-black/40 rounded-2xl border-2 flex flex-col items-center justify-center border-cat-red/30 shadow-lg">
                <span className="text-4xl mb-2">👽</span>
                <span className="text-[10px] uppercase tracking-widest text-cat-red font-bold">
                  Origin
                </span>
              </div>
              <div className="mt-3 text-[11px] text-cat-text/50 font-mono">IP: 192.x</div>
            </div>

            {/* Arrow */}
            <div className="w-12 flex items-center">
              <div className="w-full h-1 bg-cat-lavender/20 rounded-full" />
            </div>

            {/* Gateway (THICKER BORDER) */}
            <div className="flex flex-col items-center w-32">
              <div className={`w-28 h-28 bg-black/40 rounded-2xl border-[3px] flex flex-col items-center justify-center ${proxyColor}`}>
                <span className="text-4xl mb-2">🛡️</span>
                <span className="text-[11px] uppercase tracking-widest text-cat-text font-black">
                  Gateway
                </span>
              </div>
              <div className="mt-3 text-[11px] text-cat-text/50 font-mono">:7000</div>
            </div>

            {/* Arrow */}
            <div className="w-24 flex flex-col items-center">
              <span className="text-[10px] uppercase mb-2 text-cat-text/60">Evaluating</span>
              <div className={`w-full h-1.5 rounded-full ${lineToAiColor}`} />
            </div>

            {/* AI Engine */}
            <div className="flex flex-col items-center w-44">
              <div className={`w-40 h-40 bg-[#1e1e2e] rounded-3xl border-2 flex flex-col items-center justify-center ${aiEngineColor}`}>
                <span className="text-6xl mb-2">🧠</span>
                <span className="text-[12px] uppercase font-black text-center">
                  AI WAF Engine
                </span>
              </div>
              <div className="mt-3 text-[11px] text-cat-text/50 font-mono">:8000</div>
            </div>

            {/* Arrow */}
            <div className="w-16 flex items-center">
              <div className={`w-full h-1.5 rounded-full ${lineToTargetColor}`} />
            </div>

            {/* Victim App (THICKER BORDER) */}
            <div className="flex flex-col items-center w-32">
              <div className={`w-28 h-28 bg-black/40 rounded-2xl border-[3px] flex flex-col items-center justify-center ${targetAppColor}`}>
                <span className="text-4xl mb-2">📱</span>
                <span className="text-[11px] uppercase tracking-widest font-black">
                  Victim App
                </span>
              </div>
              <div className="mt-3 text-[11px] text-cat-text/50 font-mono">:9000</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}