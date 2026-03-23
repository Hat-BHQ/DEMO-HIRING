import os
import uuid

from fastapi import UploadFile

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.models import Application
from app.repositories.application_repository import ApplicationRepository
from app.schemas.schemas import ApplicationCreate, ApplicationResponse


ALLOWED_EXTENSIONS = {".pdf", ".doc", ".docx"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


class ApplicationService:
    def __init__(self, db: AsyncSession):
        self.repo = ApplicationRepository(db)

    async def submit(self, data: ApplicationCreate, cv_file: UploadFile) -> ApplicationResponse:
        ext = os.path.splitext(cv_file.filename or "")[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise ValueError("Only PDF, DOC, DOCX files are allowed")

        content = await cv_file.read()
        if len(content) > MAX_FILE_SIZE:
            raise ValueError("File size must be less than 10MB")

        upload_dir = settings.UPLOAD_DIR
        os.makedirs(upload_dir, exist_ok=True)

        safe_filename = f"{uuid.uuid4().hex}{ext}"
        file_path = os.path.join(upload_dir, safe_filename)
        with open(file_path, "wb") as f:
            f.write(content)

        application = Application(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone,
            cv_filename=safe_filename,
            job_id=data.job_id,
        )
        created = await self.repo.create(application)
        return ApplicationResponse.model_validate(created)
