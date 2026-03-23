import uuid

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.models import Application


class ApplicationRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, application: Application) -> Application:
        self.db.add(application)
        await self.db.commit()
        await self.db.refresh(application)
        return application

    async def get_by_id(self, app_id: uuid.UUID) -> Application | None:
        result = await self.db.execute(select(Application).where(Application.id == app_id))
        return result.scalar_one_or_none()

    async def get_by_job_id(self, job_id: uuid.UUID) -> list[Application]:
        result = await self.db.execute(
            select(Application).where(Application.job_id == job_id).order_by(Application.created_at.desc())
        )
        return list(result.scalars().all())

    # ---------- Admin methods ----------
    async def get_all(self, page: int = 1, page_size: int = 20) -> tuple[list[Application], int]:
        count_result = await self.db.execute(select(func.count(Application.id)))
        total = count_result.scalar() or 0

        offset = (page - 1) * page_size
        result = await self.db.execute(
            select(Application)
            .options(selectinload(Application.job))
            .order_by(Application.created_at.desc())
            .offset(offset)
            .limit(page_size)
        )
        return list(result.scalars().all()), total

    async def update_status(self, application: Application, status: str) -> Application:
        application.status = status
        await self.db.commit()
        await self.db.refresh(application)
        return application

    async def delete(self, application: Application) -> None:
        await self.db.delete(application)
        await self.db.commit()
