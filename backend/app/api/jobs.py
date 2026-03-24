from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.schemas import JobCreate, JobFilter, JobListResponse, JobResponse
from app.services.job_service import JobService

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("", response_model=JobListResponse)
async def get_jobs(
    search: str | None = None,
    location: str | None = None,
    salary_min: int | None = None,
    salary_max: int | None = None,
    is_hot: bool | None = None,
    is_featured: bool | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    filters = JobFilter(
        search=search,
        location=location,
        salary_min=salary_min,
        salary_max=salary_max,
        is_hot=is_hot,
        is_featured=is_featured,
        page=page,
        page_size=page_size,
    )
    service = JobService(db)
    return await service.get_jobs(filters)


@router.get("/hot", response_model=list[JobResponse])
async def get_hot_jobs(
    limit: int = Query(5, ge=1, le=20),
    db: AsyncSession = Depends(get_db),
):
    service = JobService(db)
    return await service.get_hot_jobs(limit)


@router.get("/featured", response_model=list[JobResponse])
async def get_featured_jobs(
    limit: int = Query(6, ge=1, le=20),
    db: AsyncSession = Depends(get_db),
):
    service = JobService(db)
    return await service.get_featured_jobs(limit)


@router.get("/locations", response_model=list[str])
async def get_locations(db: AsyncSession = Depends(get_db)):
    service = JobService(db)
    return await service.get_locations()


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: str, db: AsyncSession = Depends(get_db)):
    service = JobService(db)
    job = await service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse.model_validate(job)


@router.post("", response_model=JobResponse, status_code=201)
async def create_job(data: JobCreate, db: AsyncSession = Depends(get_db)):
    service = JobService(db)
    return await service.create_job(data)
