from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint_returns_ok() -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["service"] == "sih26264-backend"
    assert body["database"] == "not_configured"


def test_health_route_is_exposed_at_api_prefix() -> None:
    openapi_paths = app.openapi().get("paths", {})

    assert "/api/health" in openapi_paths


def test_root_endpoint_lists_available_routes() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert "/api/health" in response.json()["endpoints"]
