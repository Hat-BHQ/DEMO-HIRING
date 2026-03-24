from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import Company


class CompanyRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self) -> list[Company]:
        result = await self.db.execute(select(Company).order_by(Company.name))
        return list(result.scalars().all())

    async def get_by_id(self, company_id: str) -> Company | None:
        result = await self.db.execute(select(Company).where(Company.id == company_id))
        return result.scalar_one_or_none()

    async def create(self, company: Company) -> Company:
        self.db.add(company)
        await self.db.commit()
        await self.db.refresh(company)
        return company

    async def update(self, company: Company, data: dict) -> Company:
        for key, value in data.items():
            setattr(company, key, value)
        await self.db.commit()
        await self.db.refresh(company)
        return company

    async def delete(self, company: Company) -> None:
        await self.db.delete(company)
        await self.db.commit()
