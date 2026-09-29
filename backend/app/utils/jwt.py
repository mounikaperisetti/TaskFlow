import os
from datetime import datetime, timedelta, timezone
import jwt

def create_access_token(user_id):
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "iat": now,
        "exp": now + timedelta(minutes=30),
        "type": "access"
    }
    return jwt.encode(payload, os.getenv("JWT_SECRET_KEY"), algorithm="HS256")

def decode_access_token(token):
    return jwt.decode(
        token,
        os.getenv("JWT_SECRET_KEY"),
        algorithms=["HS256"]
    )