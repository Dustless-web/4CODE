from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


AI_ENGINE = "http://127.0.0.1:8000/check"
TARGET_APP = "http://127.0.0.1:9000"

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy(path: str, request: Request):

    try:
        body = await request.json()
    except:
        body = {}

    # STEP 1: send to AI engine
    try:
        ai_response = requests.post(AI_ENGINE, json=body, timeout=5).json()
    except Exception as e:
        ai_response = {"action": "allow", "error": "AI Engine unavailable"}

    # STEP 2: block or allow
    if ai_response.get("action") == "block":
        return {
            "status": "BLOCKED 🚫",
            "reason": ai_response.get("reason", "Threat detected")
        }

    # STEP 3: forward request
    try:
        # FastAPI request.method gives the HTTP method used
        response = requests.request(
            method=request.method,
            url=f"{TARGET_APP}/{path}",
            json=body,
            timeout=5
        )
        return response.json()
    except Exception as e:
        return {"status": "Error forwarding to target app"}
