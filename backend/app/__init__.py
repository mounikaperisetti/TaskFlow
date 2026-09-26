from flask import Flask
from .config import Config
from .extensions import db, migrate, cors
from .routes.health import health_bp
from .routes.auth import auth_bp
from .models import PendingUser, User, UserProfile, Organization, OrganizationMembership, OrganizationInvitation, PasswordResetToken

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)

    return app