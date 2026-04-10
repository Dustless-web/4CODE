import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LiveTraffic from "./pages/LiveTraffic";
import Topology from "./pages/Topology";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data);
        setLogs((prev) => [log, ...prev]);
      } catch (e) {
        console.error("Error parsing log:", e);
      }
    };
    
    return () => {
      ws.close();
    }
  }, []);

  return (
    <Router>
      <div className="bg-cat-bg text-cat-text min-h-screen p-6 font-sans flex flex-col overflow-x-hidden">
        <Navigation />
        
        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={<LiveTraffic logs={logs} />} />
            <Route path="/topology" element={<Topology logs={logs} />} />
            <Route path="/analytics" element={<Analytics logs={logs} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
