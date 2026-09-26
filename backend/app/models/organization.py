from datetime import datetime, timezone
from ..extensions import db

class Organization(db.Model):
    __tablename__ = "organizations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), nullable=False, unique=True, index=True)
    organization_type = db.Column(db.String(50), nullable=False)
    member_identifier_label = db.Column(db.String(100), nullable=False, default="Member ID")
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    memberships = db.relationship("OrganizationMembership", back_populates="organization", cascade="all, delete-orphan")
    invitations = db.relationship("OrganizationInvitation", back_populates="organization", cascade="all, delete-orphan")

class OrganizationMembership(db.Model):
    __tablename__ = "organization_memberships"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey("organizations.id"), nullable=False)
    role = db.Column(db.String(30), nullable=False)
    member_identifier = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    joined_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    user = db.relationship("User", back_populates="memberships")
    organization = db.relationship("Organization", back_populates="memberships")

    __table_args__ = (
        db.UniqueConstraint("user_id", "organization_id", name="uq_user_organization_membership"),
        db.UniqueConstraint("organization_id", "member_identifier", name="uq_organization_member_identifier"),
    )

class OrganizationInvitation(db.Model):
    __tablename__ = "organization_invitations"

    id = db.Column(db.Integer, primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey("organizations.id"), nullable=False)
    email = db.Column(db.String(255), nullable=False, index=True)
    role = db.Column(db.String(30), nullable=False)
    token_hash = db.Column(db.String(255), nullable=False, unique=True)
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)
    invited_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    accepted_at = db.Column(db.DateTime(timezone=True), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    organization = db.relationship("Organization", back_populates="invitations")