from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api import jobs, applications, admin
from app.seed import seed_data


@asynccontextmanager
async def lifespan(app: FastAPI):
    await seed_data()
    yield


app = FastAPI(
    title="TOM Organization - Hiring API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router, prefix="/api")
app.include_router(applications.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
