from fastapi import APIRouter

from app.config import get_settings

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check() -> dict:
    settings = get_settings()
    return {
        "status": "ok",
        "service": "sih26264-backend",
        "app_name": settings.app_name,
        "environment": settings.app_env,
        "database": "not_configured",
        "version": "0.1.0",
        "message": "Synthetic demo build. No AICTE production integration.",
    }
