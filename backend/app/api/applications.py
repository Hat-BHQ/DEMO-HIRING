from fastapi import APIRouter, Depends, Form, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.schemas import ApplicationCreate, ApplicationResponse
from app.services.application_service import ApplicationService

router = APIRouter(prefix="/applications", tags=["Applications"])


@router.post("", response_model=ApplicationResponse, status_code=201)
async def submit_application(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    job_id: str = Form(...),
    cv: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    data = ApplicationCreate(full_name=full_name, email=email, phone=phone, job_id=job_id)
    service = ApplicationService(db)
    try:
        return await service.submit(data, cv)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
