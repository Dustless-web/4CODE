# 🛡️ AI Reverse Proxy Cyber Defense System

An interactive cyber-range demonstration that visualizes real-time threat detection. The system intercepts API traffic using a Reverse Proxy, queries an AI Security Engine to determine if incoming requests are malicious (e.g., SQL Injections, XSS, or Brute Force attacks), and securely forwards legitimate traffic. Actions are logged and visually mapped live to a dynamically updating, multi-page Command Center UI built in React.

## 🧱 Architecture

```text
Attacker (Script) 
    │
    ▼
Reverse Proxy (Port 7000) ──► AI Security Engine (Port 8000)
    │                                │ 
    │                                ├──► REST Updates (Rules Configuration)
    ▼ (If allowed)                   ▼    (Live Logs via WebSocket)
Demo Target App (Port 9000)     Live Dashboard UI (Port 5173 / React)
```

## 📂 Project Structure

- `ai_engine/main.py` - FastAPI app (Port 8000). Inspects traffic payloads, dynamically accepts real-time configuration settings (`/settings`), blocks threats, and runs the WebSocket broadcaster.
- `proxy/main.py` - FastAPI app (Port 7000). Intercepts all traffic and enforces the block/allow verdict passed down by the AI Engine.
- `app/main.py` - FastAPI app (Port 9000). A lightweight target victim app to receive secure requests.
- `attacker/attacker.py` - Python script. Simulates real-time threat traffic by throwing combined malicious (SQLi, XSS, Brute Force) and basic requests at the reverse proxy continually.
- `dashboard/` - React frontend powered by Vite and formatted in the dark, premium _Catppuccin_ system aesthetics with Neon visual alerts. Features a multi-page routed SPA.
- `start-demo.bat` - Quick-launch Windows `.bat` script to initialize the entire topology concurrently. 

## 🎨 Interactive Dashboard Panels

The React Command Center now fully controls and visualizes the simulation via four primary views:
1. **Live Traffic:** Real-time stream of intercepted packets showing explicit JSON payloads and highlighted threat verdicts.
2. **Topology:** A rich, animated visual network map explicitly demonstrating data routing between the attacking origin, proxy, AI Engine, and the target application.
3. **Analytics:** Global traffic evaluation charting total packets, blocked malicious traffic ratios, and explicit threat breakdowns (SQLi vs Brute Force vs XSS).
4. **Settings:** A functional command panel enabling you to toggle AI WAF heuristics natively. (e.g., Turn off XSS heuristics, and the AI Engine natively stops catching `<script>` payloads in real time!).

## 🚀 Quick Start (Windows)

All components must be running concurrently for the simulation to work.

We have included an automated script to launch everything for you! Open a PowerShell or Command Prompt terminal in this exact directory and simply run:

```bash
.\start-demo.bat
```

Once the 5 terminal windows pop up:
1. Wait a few seconds for Bootup.
2. The `Attacker` window will begin transmitting exploit payloads automatically.
3. Open your browser to the URL displayed (usually `http://localhost:5173/`).
4. Watch the AI intercept, secure, and drop bad requests in real-time! Toggle settings in the UI to dynamically alter the AI's detection capabilities. 

## 🧪 Tech Stack
- **Backend Services**: Python, FastAPI, Pydantic, Uvicorn, WebSockets
- **Frontend Panel**: React, React Router, Vite, Tailwind CSS (v4)
- **Networking**: `requests` synchronous traffic, `ws` asynchronous log propagation
