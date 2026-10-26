# SIH26264 — AICTE Integrated Dashboard for Monitoring Complaint Cases

Smart India Hackathon prototype for monitoring and tracking institution-related
complaint cases across AICTE Bureaus/Cells.

> **Prototype notice:** This is a student prototype. All institutions, complaints,
> officers, deadlines, and policies used for demonstration are synthetic.
> No official AICTE API, access policy, or production integration is implemented.
> The system never automatically merges, closes, or decides complaints.

## Stack

- Frontend: React + Vite + TypeScript
- Backend: FastAPI (Python 3.13)
- Database: PostgreSQL (planned; **not configured in milestone M0**)

## Setup (Windows PowerShell)

### Backend

```powershell
cd "D:\College\Projects\Hackathons\Sem 3\SIH26264"
python -m venv backend\.venv
backend\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
```

Run the API (terminal 1):

```powershell
cd "D:\College\Projects\Hackathons\Sem 3\SIH26264\backend"
.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

### Frontend (new terminal, no venv)

```powershell
cd "D:\College\Projects\Hackathons\Sem 3\SIH26264\frontend"
npm install
npm run dev
```

## Run tests

```powershell
cd "D:\College\Projects\Hackathons\Sem 3\SIH26264\backend"
.venv\Scripts\Activate.ps1
pytest -v
```

## Verify the M0 connection

1. Backend up: open <http://127.0.0.1:8000/api/health> — JSON with `"status": "ok"`.
2. Frontend up: open <http://localhost:5173> — shows the "Connected" card.
3. Stop the backend and press **Retry** in the UI — shows the error state.

## Milestone status

| Milestone | Scope | Status |
|---|---|---|
| M0 | Frontend/backend skeleton + health check | In progress |
| M1 | PostgreSQL persistence + migrations + demo seed | Not started |
| M2 | Authentication + permissions | Not started |
