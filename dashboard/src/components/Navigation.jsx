import { NavLink } from "react-router-dom";

export default function Navigation() {
  const activeStyle = "bg-cat-mauve/20 text-cat-mauve border-b-2 border-cat-mauve";
  const defaultStyle = "text-cat-text/60 hover:text-cat-text transition-colors";

  return (
    <nav className="mb-6 flex justify-between items-center bg-cat-panel bg-opacity-50 p-4 rounded-xl border border-cat-mauve/20 shadow-lg backdrop-blur text-cat-pink relative z-20">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-extrabold tracking-tight relative z-10 flex items-center gap-2">
          <span className="text-cat-mauve">AI</span> Cyber Command
        </h1>
        
        <div className="hidden md:flex gap-4 font-bold text-sm tracking-wide">
          <NavLink 
            to="/" 
            className={({ isActive }) => `px-3 py-1.5 rounded-t-md ${isActive ? activeStyle : defaultStyle}`}
          >
            LIVE TRAFFIC
          </NavLink>
          <NavLink 
            to="/topology" 
            className={({ isActive }) => `px-3 py-1.5 rounded-t-md ${isActive ? activeStyle : defaultStyle}`}
          >
            TOPOLOGY
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => `px-3 py-1.5 rounded-t-md ${isActive ? activeStyle : defaultStyle}`}
          >
            ANALYTICS
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => `px-3 py-1.5 rounded-t-md ${isActive ? activeStyle : defaultStyle}`}
          >
            SETTINGS
          </NavLink>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-cat-bg/80 px-4 py-2 rounded-full border border-cat-green/30 shadow-[0_0_15px_rgba(166,227,161,0.2)]">
        <div className="w-3 h-3 bg-cat-green rounded-full animate-pulse shadow-[0_0_10px_#a6e3a1]"></div>
        <span className="uppercase text-xs tracking-wider text-cat-green font-bold">Defenses Online</span>
      </div>
    </nav>
  );
}
