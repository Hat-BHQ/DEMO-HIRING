import uuid
from datetime import datetime

from sqlalchemy import String, Text, Integer, Boolean, ForeignKey, DateTime, JSON, CHAR
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class Company(Base):
    __tablename__ = "companies"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=generate_uuid)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    icon: Mapped[str] = mapped_column(String(100), nullable=False, default="fas fa-building")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    jobs: Mapped[list["Job"]] = relationship("Job", back_populates="company", cascade="all, delete-orphan")


class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=generate_uuid)
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    icon: Mapped[str] = mapped_column(String(100), nullable=False, default="fas fa-briefcase")
    badge: Mapped[str | None] = mapped_column(String(20), nullable=True)  # 'hot', 'new', or null
    location: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    salary_min: Mapped[int] = mapped_column(Integer, nullable=False)
    salary_max: Mapped[int] = mapped_column(Integer, nullable=False)
    salary_currency: Mapped[str] = mapped_column(String(10), default="USD")
    tags: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    work_type_vi: Mapped[str] = mapped_column(String(100), default="Toàn thời gian")
    work_type_en: Mapped[str] = mapped_column(String(100), default="Full Time")
    description_vi: Mapped[str] = mapped_column(Text, nullable=False)
    description_en: Mapped[str] = mapped_column(Text, nullable=False)
    requirements_vi: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    requirements_en: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    benefits_vi: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    benefits_en: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    is_hot: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    company_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("companies.id"), nullable=False)
    company: Mapped["Company"] = relationship("Company", back_populates="jobs")
    applications: Mapped[list["Application"]] = relationship("Application", back_populates="job", cascade="all, delete-orphan")


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=generate_uuid)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    cv_filename: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="pending", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    job_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("jobs.id"), nullable=False)
    job: Mapped["Job"] = relationship("Job", back_populates="applications")
