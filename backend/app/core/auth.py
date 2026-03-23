import hashlib
import hmac
import json
import base64
import time
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings

security = HTTPBearer()


def _sign(payload: str) -> str:
    return hmac.new(
        settings.SECRET_KEY.encode(), payload.encode(), hashlib.sha256
    ).hexdigest()


def create_access_token(username: str) -> str:
    payload = json.dumps({
        "sub": username,
        "exp": int(time.time()) + settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    })
    encoded = base64.urlsafe_b64encode(payload.encode()).decode()
    signature = _sign(encoded)
    return f"{encoded}.{signature}"


def verify_token(token: str) -> str:
    try:
        encoded, signature = token.rsplit(".", 1)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    if not hmac.compare_digest(_sign(encoded), signature):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    payload = json.loads(base64.urlsafe_b64decode(encoded))
    if payload.get("exp", 0) < time.time():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    return payload["sub"]


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    return verify_token(credentials.credentials)
