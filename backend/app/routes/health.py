from flask import Blueprint
from sqlalchemy import text
from ..extensions import db

health_bp = Blueprint("health", __name__)

@health_bp.route("/api/v1/health", methods=["GET"])
def health_check():
    try:
        db.session.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception:
        return {"status": "error", "database": "disconnected"}, 500