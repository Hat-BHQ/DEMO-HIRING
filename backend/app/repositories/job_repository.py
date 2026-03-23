import uuid

from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.models import Job, Company
from app.schemas.schemas import JobFilter


class JobRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, job_id: uuid.UUID) -> Job | None:
        result = await self.db.execute(
            select(Job).options(selectinload(Job.company)).where(Job.id == job_id, Job.is_active.is_(True))
        )
        return result.scalar_one_or_none()

    async def get_list(self, filters: JobFilter) -> tuple[list[Job], int]:
        query = select(Job).options(selectinload(Job.company)).where(Job.is_active.is_(True))
        count_query = select(func.count(Job.id)).where(Job.is_active.is_(True))

        if filters.search:
            search_term = f"%{filters.search}%"
            search_cond = or_(Job.title.ilike(search_term), Job.tags.any(filters.search))
            query = query.where(search_cond)
            count_query = count_query.where(search_cond)

        if filters.location:
            query = query.where(Job.location == filters.location)
            count_query = count_query.where(Job.location == filters.location)

        if filters.salary_min is not None:
            query = query.where(Job.salary_max >= filters.salary_min)
            count_query = count_query.where(Job.salary_max >= filters.salary_min)

        if filters.salary_max is not None:
            query = query.where(Job.salary_min <= filters.salary_max)
            count_query = count_query.where(Job.salary_min <= filters.salary_max)

        if filters.is_hot is not None:
            query = query.where(Job.is_hot == filters.is_hot)
            count_query = count_query.where(Job.is_hot == filters.is_hot)

        if filters.is_featured is not None:
            query = query.where(Job.is_featured == filters.is_featured)
            count_query = count_query.where(Job.is_featured == filters.is_featured)

        total_result = await self.db.execute(count_query)
        total = total_result.scalar() or 0

        offset = (filters.page - 1) * filters.page_size
        query = query.order_by(Job.created_at.desc()).offset(offset).limit(filters.page_size)
        result = await self.db.execute(query)
        return list(result.scalars().all()), total

    async def get_hot_jobs(self, limit: int = 5) -> list[Job]:
        result = await self.db.execute(
            select(Job)
            .options(selectinload(Job.company))
            .where(Job.is_active.is_(True), Job.is_hot.is_(True))
            .order_by(Job.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def get_featured_jobs(self, limit: int = 6) -> list[Job]:
        result = await self.db.execute(
            select(Job)
            .options(selectinload(Job.company))
            .where(Job.is_active.is_(True), Job.is_featured.is_(True))
            .order_by(Job.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def create(self, job: Job) -> Job:
        self.db.add(job)
        await self.db.commit()
        await self.db.refresh(job, attribute_names=["company"])
        return job

    async def get_locations(self) -> list[str]:
        result = await self.db.execute(
            select(Job.location).where(Job.is_active.is_(True)).distinct()
        )
        return [row[0] for row in result.all()]

    # ---------- Admin methods ----------
    async def get_by_id_admin(self, job_id: uuid.UUID) -> Job | None:
        result = await self.db.execute(
            select(Job).options(selectinload(Job.company)).where(Job.id == job_id)
        )
        return result.scalar_one_or_none()

    async def get_all_admin(self, page: int = 1, page_size: int = 20, search: str | None = None) -> tuple[list[Job], int]:
        query = select(Job).options(selectinload(Job.company))
        count_query = select(func.count(Job.id))

        if search:
            term = f"%{search}%"
            cond = or_(Job.title.ilike(term), Job.location.ilike(term))
            query = query.where(cond)
            count_query = count_query.where(cond)

        total_result = await self.db.execute(count_query)
        total = total_result.scalar() or 0

        offset = (page - 1) * page_size
        query = query.order_by(Job.created_at.desc()).offset(offset).limit(page_size)
        result = await self.db.execute(query)
        return list(result.scalars().all()), total

    async def update(self, job: Job, data: dict) -> Job:
        for key, value in data.items():
            setattr(job, key, value)
        await self.db.commit()
        await self.db.refresh(job, attribute_names=["company"])
        return job

    async def delete(self, job: Job) -> None:
        await self.db.delete(job)
        await self.db.commit()
