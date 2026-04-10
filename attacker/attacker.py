import requests
import time
import random

payloads = [
    {"username": "admin", "password": "' OR '1'='1"},
    {"username": "admin", "password": "123456"},
    {"username": "user", "password": "normalpass"},
    {"username": "hacker", "message": "<script>alert(1)</script>"},
    {"username": "bot", "comment": "testing -- eval() things"}
]

print("Starting attacker simulation...")
while True:
    data = random.choice(payloads)

    try:
        res = requests.post("http://127.0.0.1:7000/login", json=data)

        print("Sent:", data)
        print("Response:", res.json())
        print("-" * 30)
    except Exception as e:
        print("Error connecting to Proxy:", e)
        print("-" * 30)

    time.sleep(1.5)
