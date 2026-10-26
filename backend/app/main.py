from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health
from app.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()

    application = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description=(
            "SIH26264 prototype API. All data used for demonstration is synthetic. "
            "No official AICTE integration is implemented."
        ),
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(health.router, prefix="/api")

    @application.get("/", tags=["root"])
    def root() -> dict:
        return {
            "app_name": settings.app_name,
            "endpoints": ["/api/health", "/docs"],
            "status": "M0 skeleton running",
        }

    return application


app = create_app()
