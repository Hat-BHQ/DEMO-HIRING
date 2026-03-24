"""initial migration

Revision ID: 001
Revises:
Create Date: 2026-03-23
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "companies",
        sa.Column("id", sa.CHAR(36), primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("icon", sa.String(100), nullable=False, server_default="fas fa-building"),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
    )
    op.create_index("ix_companies_name", "companies", ["name"])

    op.create_table(
        "jobs",
        sa.Column("id", sa.CHAR(36), primary_key=True),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("icon", sa.String(100), nullable=False, server_default="fas fa-briefcase"),
        sa.Column("badge", sa.String(20), nullable=True),
        sa.Column("location", sa.String(100), nullable=False),
        sa.Column("salary_min", sa.Integer, nullable=False),
        sa.Column("salary_max", sa.Integer, nullable=False),
        sa.Column("salary_currency", sa.String(10), server_default="USD"),
        sa.Column("tags", sa.JSON, nullable=False),
        sa.Column("work_type_vi", sa.String(100), server_default="Toàn thời gian"),
        sa.Column("work_type_en", sa.String(100), server_default="Full Time"),
        sa.Column("description_vi", sa.Text, nullable=False),
        sa.Column("description_en", sa.Text, nullable=False),
        sa.Column("requirements_vi", sa.JSON, nullable=False),
        sa.Column("requirements_en", sa.JSON, nullable=False),
        sa.Column("benefits_vi", sa.JSON, nullable=False),
        sa.Column("benefits_en", sa.JSON, nullable=False),
        sa.Column("is_hot", sa.Boolean, server_default="0"),
        sa.Column("is_featured", sa.Boolean, server_default="0"),
        sa.Column("is_active", sa.Boolean, server_default="1"),
        sa.Column("company_id", sa.CHAR(36), sa.ForeignKey("companies.id"), nullable=False),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now()),
    )
    op.create_index("ix_jobs_title", "jobs", ["title"])
    op.create_index("ix_jobs_location", "jobs", ["location"])
    op.create_index("ix_jobs_is_hot", "jobs", ["is_hot"])
    op.create_index("ix_jobs_is_featured", "jobs", ["is_featured"])
    op.create_index("ix_jobs_is_active", "jobs", ["is_active"])

    op.create_table(
        "applications",
        sa.Column("id", sa.CHAR(36), primary_key=True),
        sa.Column("full_name", sa.String(255), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("phone", sa.String(20), nullable=False),
        sa.Column("cv_filename", sa.String(500), nullable=False),
        sa.Column("status", sa.String(50), server_default="pending"),
        sa.Column("job_id", sa.CHAR(36), sa.ForeignKey("jobs.id"), nullable=False),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
    )
    op.create_index("ix_applications_email", "applications", ["email"])
    op.create_index("ix_applications_status", "applications", ["status"])


def downgrade() -> None:
    op.drop_table("applications")
    op.drop_table("jobs")
    op.drop_table("companies")
