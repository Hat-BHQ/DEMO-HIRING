import uuid
import hmac

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.auth import create_access_token, get_current_admin
from app.models.models import Job, Application, Company
from app.schemas.schemas import (
    LoginRequest, TokenResponse, JobCreate, JobUpdate, JobResponse,
    JobListResponse, CompanyCreate, CompanyResponse,
    ApplicationAdminResponse, DashboardStats,
)
from app.services.job_service import JobService
from app.repositories.company_repository import CompanyRepository
from app.repositories.application_repository import ApplicationRepository

router = APIRouter(prefix="/admin", tags=["Admin"])


# ---------- Auth ----------
@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    if not (
        hmac.compare_digest(data.username, settings.ADMIN_USERNAME)
        and hmac.compare_digest(data.password, settings.ADMIN_PASSWORD)
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data.username)
    return TokenResponse(access_token=token)


@router.get("/me")
async def get_me(admin: str = Depends(get_current_admin)):
    return {"username": admin}


# ---------- Dashboard ----------
@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard(
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    total_jobs = (await db.execute(select(func.count(Job.id)))).scalar() or 0
    active_jobs = (await db.execute(
        select(func.count(Job.id)).where(Job.is_active.is_(True))
    )).scalar() or 0
    total_apps = (await db.execute(select(func.count(Application.id)))).scalar() or 0
    pending_apps = (await db.execute(
        select(func.count(Application.id)).where(Application.status == "pending")
    )).scalar() or 0
    return DashboardStats(
        total_jobs=total_jobs,
        active_jobs=active_jobs,
        total_applications=total_apps,
        pending_applications=pending_apps,
    )


# ---------- Jobs CRUD ----------
@router.get("/jobs", response_model=JobListResponse)
async def list_jobs(
    search: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    service = JobService(db)
    return await service.get_all_jobs_admin(page, page_size, search)


@router.get("/jobs/{job_id}", response_model=JobResponse)
async def get_job(
    job_id: uuid.UUID,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    service = JobService(db)
    job = await service.get_job_admin(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse.model_validate(job)


@router.post("/jobs", response_model=JobResponse, status_code=201)
async def create_job(
    data: JobCreate,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    service = JobService(db)
    return await service.create_job(data)


@router.put("/jobs/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: uuid.UUID,
    data: JobUpdate,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    service = JobService(db)
    result = await service.update_job(job_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Job not found")
    return result


@router.delete("/jobs/{job_id}", status_code=204)
async def delete_job(
    job_id: uuid.UUID,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    service = JobService(db)
    if not await service.delete_job(job_id):
        raise HTTPException(status_code=404, detail="Job not found")


# ---------- Companies ----------
@router.get("/companies", response_model=list[CompanyResponse])
async def list_companies(
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    repo = CompanyRepository(db)
    return [CompanyResponse.model_validate(c) for c in await repo.get_all()]


@router.post("/companies", response_model=CompanyResponse, status_code=201)
async def create_company(
    data: CompanyCreate,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    repo = CompanyRepository(db)
    company = Company(**data.model_dump())
    return CompanyResponse.model_validate(await repo.create(company))


@router.put("/companies/{company_id}", response_model=CompanyResponse)
async def update_company(
    company_id: uuid.UUID,
    data: CompanyCreate,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    repo = CompanyRepository(db)
    company = await repo.get_by_id(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return CompanyResponse.model_validate(await repo.update(company, data.model_dump()))


@router.delete("/companies/{company_id}", status_code=204)
async def delete_company(
    company_id: uuid.UUID,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    repo = CompanyRepository(db)
    company = await repo.get_by_id(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    await repo.delete(company)


# ---------- Applications ----------
@router.get("/applications")
async def list_applications(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    repo = ApplicationRepository(db)
    items, total = await repo.get_all(page, page_size)
    return {
        "items": [
            {
                **ApplicationAdminResponse.model_validate(a).model_dump(),
                "job_title": a.job.title if a.job else None,
            }
            for a in items
        ],
        "total": total,
        "page": page,
        "page_size": page_size,
    }


@router.patch("/applications/{app_id}/status")
async def update_application_status(
    app_id: uuid.UUID,
    body: dict,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    status_val = body.get("status")
    if status_val not in ("pending", "reviewed", "accepted", "rejected"):
        raise HTTPException(status_code=400, detail="Invalid status")
    repo = ApplicationRepository(db)
    application = await repo.get_by_id(app_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    updated = await repo.update_status(application, status_val)
    return ApplicationAdminResponse.model_validate(updated)


@router.delete("/applications/{app_id}", status_code=204)
async def delete_application(
    app_id: uuid.UUID,
    admin: str = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    repo = ApplicationRepository(db)
    application = await repo.get_by_id(app_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    await repo.delete(application)
