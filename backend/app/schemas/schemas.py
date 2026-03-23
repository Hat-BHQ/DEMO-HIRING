import uuid
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


# ---------- Company ----------
class CompanyBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    icon: str = "fas fa-building"


class CompanyCreate(CompanyBase):
    pass


class CompanyResponse(CompanyBase):
    id: uuid.UUID
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------- Job ----------
class JobBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    icon: str = "fas fa-briefcase"
    badge: str | None = None
    location: str = Field(..., min_length=1, max_length=100)
    salary_min: int = Field(..., ge=0)
    salary_max: int = Field(..., ge=0)
    salary_currency: str = "USD"
    tags: list[str] = []
    work_type_vi: str = "Toàn thời gian"
    work_type_en: str = "Full Time"
    description_vi: str
    description_en: str
    requirements_vi: list[str] = []
    requirements_en: list[str] = []
    benefits_vi: list[str] = []
    benefits_en: list[str] = []
    is_hot: bool = False
    is_featured: bool = False
    is_active: bool = True


class JobCreate(JobBase):
    company_id: uuid.UUID


class JobUpdate(BaseModel):
    title: str | None = None
    icon: str | None = None
    badge: str | None = None
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    tags: list[str] | None = None
    description_vi: str | None = None
    description_en: str | None = None
    requirements_vi: list[str] | None = None
    requirements_en: list[str] | None = None
    benefits_vi: list[str] | None = None
    benefits_en: list[str] | None = None
    is_hot: bool | None = None
    is_featured: bool | None = None
    is_active: bool | None = None


class JobResponse(JobBase):
    id: uuid.UUID
    company_id: uuid.UUID
    company: CompanyResponse
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class JobListResponse(BaseModel):
    items: list[JobResponse]
    total: int
    page: int
    page_size: int


# ---------- Application ----------
class ApplicationCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=255)
    email: str = Field(..., pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
    phone: str = Field(..., pattern=r"^[0-9\s\+\-]{8,15}$")
    job_id: uuid.UUID


class ApplicationResponse(BaseModel):
    id: uuid.UUID
    full_name: str
    email: str
    phone: str
    cv_filename: str
    status: str
    job_id: uuid.UUID
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------- Filter ----------
class JobFilter(BaseModel):
    search: str | None = None
    location: str | None = None
    industry: str | None = None
    work_type: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    is_hot: bool | None = None
    is_featured: bool | None = None
    page: int = 1
    page_size: int = 12


# ---------- Auth ----------
class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------- Application (admin) ----------
class ApplicationAdminResponse(BaseModel):
    id: uuid.UUID
    full_name: str
    email: str
    phone: str
    cv_filename: str
    status: str
    job_id: uuid.UUID
    job_title: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------- Dashboard ----------
class DashboardStats(BaseModel):
    total_jobs: int
    active_jobs: int
    total_applications: int
    pending_applications: int
