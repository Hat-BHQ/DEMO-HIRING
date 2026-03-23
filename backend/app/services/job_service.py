import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import Job
from app.repositories.job_repository import JobRepository
from app.schemas.schemas import JobCreate, JobFilter, JobListResponse, JobResponse, JobUpdate


class JobService:
    def __init__(self, db: AsyncSession):
        self.repo = JobRepository(db)

    async def get_job(self, job_id: uuid.UUID) -> Job | None:
        return await self.repo.get_by_id(job_id)

    async def get_jobs(self, filters: JobFilter) -> JobListResponse:
        items, total = await self.repo.get_list(filters)
        return JobListResponse(
            items=[JobResponse.model_validate(j) for j in items],
            total=total,
            page=filters.page,
            page_size=filters.page_size,
        )

    async def get_hot_jobs(self, limit: int = 5) -> list[JobResponse]:
        jobs = await self.repo.get_hot_jobs(limit)
        return [JobResponse.model_validate(j) for j in jobs]

    async def get_featured_jobs(self, limit: int = 6) -> list[JobResponse]:
        jobs = await self.repo.get_featured_jobs(limit)
        return [JobResponse.model_validate(j) for j in jobs]

    async def create_job(self, data: JobCreate) -> JobResponse:
        job = Job(**data.model_dump())
        created = await self.repo.create(job)
        return JobResponse.model_validate(created)

    async def get_locations(self) -> list[str]:
        return await self.repo.get_locations()

    # ---------- Admin methods ----------
    async def get_all_jobs_admin(self, page: int = 1, page_size: int = 20, search: str | None = None) -> JobListResponse:
        items, total = await self.repo.get_all_admin(page, page_size, search)
        return JobListResponse(
            items=[JobResponse.model_validate(j) for j in items],
            total=total,
            page=page,
            page_size=page_size,
        )

    async def get_job_admin(self, job_id: uuid.UUID) -> Job | None:
        return await self.repo.get_by_id_admin(job_id)

    async def update_job(self, job_id: uuid.UUID, data: JobUpdate) -> JobResponse | None:
        job = await self.repo.get_by_id_admin(job_id)
        if not job:
            return None
        update_data = data.model_dump(exclude_unset=True)
        updated = await self.repo.update(job, update_data)
        return JobResponse.model_validate(updated)

    async def delete_job(self, job_id: uuid.UUID) -> bool:
        job = await self.repo.get_by_id_admin(job_id)
        if not job:
            return False
        await self.repo.delete(job)
        return True
