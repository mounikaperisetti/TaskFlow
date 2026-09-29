from functools import wraps
from flask import request
from jwt import ExpiredSignatureError, InvalidTokenError
from ..utils.jwt import decode_access_token

def jwt_required(route_function):
    @wraps(route_function)
    def wrapper(*args, **kwargs):
        authorization = request.headers.get("Authorization", "")

        if not authorization.startswith("Bearer "):
            return {"message": "Authentication required."}, 401

        token = authorization.split(" ", 1)[1].strip()

        try:
            payload = decode_access_token(token)
        except ExpiredSignatureError:
            return {"message": "Access token has expired."}, 401
        except InvalidTokenError:
            return {"message": "Invalid access token."}, 401

        request.user_id = int(payload["sub"])
        return route_function(*args, **kwargs)

    return wrapper