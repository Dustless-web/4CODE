from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SecurityConfig(BaseModel):
    strictness: str = "Standard"
    sql_prevention: bool = True
    brute_force_mitigation: bool = True
    xss_heuristics: bool = False

current_config = SecurityConfig()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        dead_connections = []
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                dead_connections.append(connection)
        for dead in dead_connections:
            self.disconnect(dead)

manager = ConnectionManager()

def detect(data: dict):
    text = str(data)

    if current_config.sql_prevention:
        if "' OR '1'='1" in text or "UNION SELECT" in text:
            return {"action": "block", "reason": "SQL Injection"}

    if current_config.brute_force_mitigation:
        # Note: the payload "admin" / "123456" represents brute force in the attacker payload
        if "password" in text and "admin" in text:
            return {"action": "block", "reason": "Brute Force"}
            
    if current_config.xss_heuristics:
        if "<script>" in text or "javascript:" in text or "onerror=" in text:
            return {"action": "block", "reason": "XSS Detected"}

    if current_config.strictness == "Paranoid":
        if any(char in text for char in [";", "--", "eval()", "`"]):
            return {"action": "block", "reason": "Paranoid Mode: Anomalous Data"}

    return {"action": "allow"}

@app.get("/settings")
def get_settings():
    return current_config.dict()

@app.post("/settings")
def update_settings(config: SecurityConfig):
    global current_config
    current_config = config
    return {"status": "ok"}

@app.post("/check")
async def check(data: dict):
    result = detect(data)
    
    # Broadcast to dashboard
    log_entry = {
        "status": "BLOCKED 🚫" if result["action"] == "block" else "ALLOWED ✅",
        "reason": result.get("reason", "Clean"),
        "payload": data
    }
    await manager.broadcast(log_entry)
    
    return result

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
