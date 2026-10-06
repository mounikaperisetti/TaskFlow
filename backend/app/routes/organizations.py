import re
from flask import Blueprint, request
from sqlalchemy import select
from ..extensions import db
from ..models import Organization, OrganizationMembership
from ..utils.auth import jwt_required
from ..utils.organization import get_user_organization

organizations_bp = Blueprint(
    "organizations",
    __name__,
    url_prefix="/api/v1/organizations"
)

ORGANIZATION_TYPES = {
    "education": "Roll ID",
    "corporate": "Employee ID",
    "other": "Member ID"
}


def create_slug(name):
    """Create a unique URL-friendly organization slug."""
    base_slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    slug = base_slug
    counter = 2

    while db.session.scalar(
        select(Organization).where(Organization.slug == slug)
    ):
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug


@organizations_bp.route("", methods=["POST"])
@jwt_required
def create_organization():
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    organization_type = data.get("organization_type", "").strip().lower()

    if not name:
        return {"message": "Organization name is required."}, 400

    if len(name) < 2:
        return {
            "message": "Organization name must be at least 2 characters."
        }, 400

    if len(name) > 255:
        return {
            "message": "Organization name cannot exceed 255 characters."
        }, 400

    if organization_type not in ORGANIZATION_TYPES:
        return {
            "message": "Invalid organization type."
        }, 400

    organization = Organization(
        name=name,
        slug=create_slug(name),
        organization_type=organization_type,
        member_identifier_label=ORGANIZATION_TYPES[organization_type]
    )

    db.session.add(organization)
    db.session.flush()

    membership = OrganizationMembership(
        user_id=request.user_id,
        organization_id=organization.id,
        role="owner",
        member_identifier=None
    )

    db.session.add(membership)
    db.session.commit()

    return {
        "message": "Organization created successfully.",
        "organization": {
            "id": organization.id,
            "name": organization.name,
            "slug": organization.slug,
            "organization_type": organization.organization_type,
            "member_identifier_label": organization.member_identifier_label,
            "role": membership.role
        }
    }, 201


@organizations_bp.route("/<string:slug>", methods=["GET"])
@jwt_required
def get_organization(slug):
    """Return a workspace only when the current user belongs to it."""
    organization, membership = get_user_organization(
        slug,
        request.user_id
    )

    if not organization:
        return {
            "message": "Workspace not found or you do not have access to it."
        }, 404

    return {
        "organization": {
            "id": organization.id,
            "name": organization.name,
            "slug": organization.slug,
            "organization_type": organization.organization_type,
            "member_identifier_label": organization.member_identifier_label
        },
        "membership": {
            "id": membership.id,
            "role": membership.role,
            "member_identifier": membership.member_identifier,
            "joined_at": membership.joined_at.isoformat()
        }
    }, 200