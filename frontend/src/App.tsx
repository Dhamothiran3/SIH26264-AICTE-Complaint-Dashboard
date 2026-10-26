import { useCallback, useEffect, useState } from 'react'
import './App.css'

type HealthPayload = {
  status: string
  service: string
  app_name: string
  environment: string
  database: string
  version: string
  message: string
}

type HealthState =
  | { status: 'loading' }
  | { status: 'ok'; data: HealthPayload }
  | { status: 'error'; message: string }

function App() {
  const [health, setHealth] = useState<HealthState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  const loadHealth = useCallback(async (): Promise<HealthState> => {
    try {
      const response = await fetch('/api/health')

      if (!response.ok) {
        return {
          status: 'error',
          message: `Backend responded with HTTP ${response.status}`,
        }
      }

      const data = (await response.json()) as HealthPayload

      if (data.status !== 'ok') {
        return {
          status: 'error',
          message: `Unexpected status field: ${String(data.status)}`,
        }
      }

      return { status: 'ok', data }
    } catch (error) {
      return {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unknown error while contacting the backend',
      }
    }
  }, [])

  useEffect(() => {
    let active = true
    void loadHealth().then((next) => {
      if (active) setHealth(next)
    })
    return () => {
      active = false
    }
  }, [loadHealth, attempt])

  const retry = () => {
    setHealth({ status: 'loading' })
    setAttempt((value) => value + 1)
  }

  return (
    <main className="page">
      <header className="header">
        <h1>SIH26264 — AICTE Complaint Case Dashboard</h1>
        <p className="subtitle">Milestone M0: frontend ↔ backend connection check</p>
      </header>

      <section className="card" aria-live="polite">
        <h2>Backend health</h2>

        {health.status === 'loading' && (
          <div className="state state-loading">
            <span className="spinner" aria-hidden="true" />
            <p>Checking backend…</p>
          </div>
        )}

        {health.status === 'ok' && (
          <div className="state state-ok">
            <p className="badge badge-ok">Connected</p>
            <dl>
              <div>
                <dt>Service</dt>
                <dd>{health.data.service}</dd>
              </div>
              <div>
                <dt>Application</dt>
                <dd>{health.data.app_name}</dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>{health.data.version}</dd>
              </div>
              <div>
                <dt>Environment</dt>
                <dd>{health.data.environment}</dd>
              </div>
              <div>
                <dt>Database</dt>
                <dd>{health.data.database}</dd>
              </div>
            </dl>
            <p className="note">{health.data.message}</p>
            <button type="button" onClick={retry}>
              Refresh status
            </button>
          </div>
        )}

        {health.status === 'error' && (
          <div className="state state-error">
            <p className="badge badge-error">Backend unreachable</p>
            <p className="error-message">{health.message}</p>
            <p className="hint">
              Start the API with:{" "}
              <code>uvicorn app.main:app --reload --port 8000</code>
            </p>
            <button type="button" onClick={retry}>
              Retry
            </button>
          </div>
        )}
      </section>

      <footer className="footer">
        Prototype build — all data synthetic. No official AICTE integration.
      </footer>
    </main>
  )
}

export default App
