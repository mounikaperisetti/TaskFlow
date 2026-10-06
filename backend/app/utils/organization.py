from sqlalchemy import select
from ..extensions import db
from ..models import Organization, OrganizationMembership


def get_user_organization(slug, user_id):
    """Return the organization and active membership for the current user."""
    organization = db.session.scalar(
        select(Organization).where(
            Organization.slug == slug,
            Organization.is_active.is_(True)
        )
    )

    if not organization:
        return None, None

    membership = db.session.scalar(
        select(OrganizationMembership).where(
            OrganizationMembership.organization_id == organization.id,
            OrganizationMembership.user_id == user_id,
            OrganizationMembership.is_active.is_(True)
        )
    )

    if not membership:
        return None, None

    return organization, membership