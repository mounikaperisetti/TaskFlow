import hashlib
import os
import secrets

from datetime import datetime, timedelta, timezone

from flask import Blueprint, request
from sqlalchemy import select
from werkzeug.security import generate_password_hash, check_password_hash

from ..extensions import db
from ..models import PendingUser, User, UserProfile, PasswordResetToken
from ..utils.email import send_verification_email, send_password_reset_email
from ..utils.jwt import create_access_token
from ..utils.auth import jwt_required

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")

def hash_otp(otp):
    """Hash the OTP before storing it in the database."""
    return hashlib.sha256(otp.encode()).hexdigest()

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    confirm_password = data.get("confirm_password", "")

    if not email or not password or not confirm_password:
        return {"message": "Email and password are required."}, 400

    if password != confirm_password:
        return {"message": "Passwords do not match."}, 400

    if len(password) < 8:
        return {"message": "Password must be at least 8 characters."}, 400

    existing_user = db.session.scalar(select(User).where(User.email == email))
    if existing_user:
        return {"message": "An account with this email already exists."}, 409

    pending_user = db.session.scalar(
        select(PendingUser).where(PendingUser.email == email)
    )

    otp = f"{secrets.randbelow(1000000):06d}"
    otp_hash = hash_otp(otp)
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=5)

    if pending_user:
        # Restart an unfinished registration with fresh credentials and OTP.
        pending_user.password_hash = generate_password_hash(password)
        pending_user.verification_otp_hash = otp_hash
        pending_user.verification_expires_at = expires_at
        pending_user.otp_attempts = 0
    else:
        pending_user = PendingUser(
            email=email,
            password_hash=generate_password_hash(password),
            verification_otp_hash=otp_hash,
            verification_expires_at=expires_at,
            otp_attempts=0
        )
        db.session.add(pending_user)

    try:
        # Flush validates the database changes without committing them.
        db.session.flush()

        # Send the OTP before making the database changes permanent.
        send_verification_email(email, otp)

        # Email succeeded, so make the pending registration permanent.
        db.session.commit()

    except Exception:
        # Email or database failure leaves no unusable pending registration.
        db.session.rollback()
        return {
            "message": "We couldn't send the verification email. Please try again."
        }, 500

    return {
        "message": "Verification OTP sent successfully.",
        "email": email
    }, 201

@auth_bp.route("/verify-email", methods=["POST"])
def verify_email():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    otp = data.get("otp", "").strip()

    if not email or not otp:
        return {"message": "Email and OTP are required."}, 400

    if not otp.isdigit() or len(otp) != 6:
        return {"message": "Please enter a valid 6-digit OTP."}, 400

    pending_user = db.session.scalar(
        select(PendingUser).where(PendingUser.email == email)
    )

    if not pending_user:
        return {"message": "No pending registration was found for this email."}, 404

    now = datetime.now(timezone.utc)

    # The backend is the final authority for OTP expiry.
    if pending_user.verification_expires_at < now:
        return {"message": "This OTP has expired. Please request a new OTP."}, 400

    if pending_user.otp_attempts >= 5:
        return {
            "message": "Too many incorrect attempts. Please request a new OTP."
        }, 429

    if hash_otp(otp) != pending_user.verification_otp_hash:
        pending_user.otp_attempts += 1
        db.session.commit()

        remaining_attempts = 5 - pending_user.otp_attempts
        return {
            "message": f"Incorrect OTP. {remaining_attempts} attempt(s) remaining."
        }, 400

    existing_user = db.session.scalar(select(User).where(User.email == email))
    if existing_user:
        db.session.delete(pending_user)
        db.session.commit()
        return {"message": "This email is already verified."}, 409

    try:
        # Create the permanent user only after successful OTP verification.
        user = User(
            email=pending_user.email,
            password_hash=pending_user.password_hash,
            email_verified_at=now
        )
        db.session.add(user)
        db.session.flush()

        # Create the separate profile record.
        profile = UserProfile(user_id=user.id)
        db.session.add(profile)

        # Remove the temporary registration.
        db.session.delete(pending_user)

        db.session.commit()

    except Exception:
        db.session.rollback()
        return {
            "message": "We couldn't complete your account verification. Please try again."
        }, 500

    return {
        "message": "Email verified successfully. Your account is ready."
    }, 200

@auth_bp.route("/resend-otp", methods=["POST"])
def resend_otp():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()

    if not email:
        return {"message": "Email is required."}, 400

    pending_user = db.session.scalar(
        select(PendingUser).where(PendingUser.email == email)
    )

    if not pending_user:
        return {"message": "No pending registration was found for this email."}, 404

    otp = f"{secrets.randbelow(1000000):06d}"
    pending_user.verification_otp_hash = hash_otp(otp)
    pending_user.verification_expires_at = (
        datetime.now(timezone.utc) + timedelta(minutes=5)
    )
    pending_user.otp_attempts = 0

    try:
        # Send the new OTP before committing the replacement OTP.
        db.session.flush()
        send_verification_email(email, otp)
        db.session.commit()

    except Exception:
        # Keep the previous valid OTP if sending the new one fails.
        db.session.rollback()
        return {
            "message": "We couldn't send the new verification email. Please try again."
        }, 500

    return {
        "message": "A new verification OTP has been sent."
    }, 200
    
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return {"message": "Email and password are required."}, 400

    user = db.session.scalar(select(User).where(User.email == email))

    if not user:
        return {"message": "Invalid email or password."}, 401

    if not user.is_active:
        return {"message": "Your account is inactive."}, 403

    if not check_password_hash(user.password_hash, password):
        return {"message": "Invalid email or password."}, 401

    access_token = create_access_token(user.id)

    return {
        "message": "Login successful.",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "email": user.email
        }
    }, 200   

@auth_bp.route("/me", methods=["GET"])
@jwt_required
def get_current_user():
    user = db.session.get(User, request.user_id)

    if not user:
        return {"message": "User not found."}, 404

    if not user.is_active:
        return {"message": "Your account is inactive."}, 403

    memberships = [
        {
            "organization_id": membership.organization_id,
            "organization_name": membership.organization.name,
            "role": membership.role,
            "member_identifier": membership.member_identifier
        }
        for membership in user.memberships
        if membership.is_active and membership.organization.is_active
    ]

    return {
        "user": {
            "id": user.id,
            "email": user.email
        },
        "memberships": memberships
    }, 200

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()

    if not email:
        return {"message": "Email is required."}, 400

    user = db.session.scalar(select(User).where(User.email == email))

    # Return the same response whether the email exists or not.
    # This prevents revealing registered accounts.
    if not user:
        return {
            "message": "If an account exists for this email, a password reset link has been sent."
        }, 200

    # Invalidate any previous unused reset tokens.
    existing_tokens = db.session.scalars(
        select(PasswordResetToken).where(
            PasswordResetToken.user_id == user.id,
            PasswordResetToken.used_at.is_(None)
        )
    ).all()

    for reset_token in existing_tokens:
        reset_token.used_at = datetime.now(timezone.utc)

    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=30)

    reset_token = PasswordResetToken(
        user_id=user.id,
        token_hash=token_hash,
        expires_at=expires_at
    )

    db.session.add(reset_token)
    db.session.commit()

    frontend_url = os.getenv("FRONTEND_URL")
    reset_link = f"{frontend_url}/reset-password/{token}"
    send_password_reset_email(user.email, reset_link)

    return {
        "message": "If an account exists for this email, a password reset link has been sent."
    }, 200   
    
@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json() or {}
    token = data.get("token", "").strip()
    new_password = data.get("password", "")
    confirm_password = data.get("confirm_password", "")

    if not token or not new_password or not confirm_password:
        return {"message": "All fields are required."}, 400

    if new_password != confirm_password:
        return {"message": "Passwords do not match."}, 400

    if len(new_password) < 8:
        return {"message": "Password must be at least 8 characters."}, 400

    token_hash = hashlib.sha256(token.encode()).hexdigest()

    reset_token = db.session.scalar(
        select(PasswordResetToken).where(
            PasswordResetToken.token_hash == token_hash
        )
    )

    if not reset_token:
        return {"message": "This password reset link is invalid."}, 400

    now = datetime.now(timezone.utc)

    if reset_token.used_at is not None:
        return {"message": "This password reset link has already been used."}, 400

    if reset_token.expires_at < now:
        return {"message": "This password reset link has expired."}, 400

    user = db.session.get(User, reset_token.user_id)

    if not user:
        return {"message": "Unable to reset the password."}, 400

    # Prevent the user from reusing their current password.
    if check_password_hash(user.password_hash, new_password):
        return {
            "message": "Your new password must be different from your current password."
        }, 400

    user.password_hash = generate_password_hash(new_password)
    user.updated_at = now
    reset_token.used_at = now

    db.session.commit()

    return {
        "message": "Password reset successfully. You can now sign in."
    }, 200
    
