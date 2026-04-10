from fastapi import FastAPI

app = FastAPI()

@app.post("/login")
def login(data: dict):
    return {"status": "LOGIN SUCCESS"}
