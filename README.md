# TOM Organization - Hiring Platform

## Architecture Overview

Full-stack recruitment platform migrated from static HTML/CSS/JS to:
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Python FastAPI (async)
- **Database**: PostgreSQL + SQLAlchemy + Alembic

---

## Project Structure

```
DEMO-HIRING/
├── backend/
│   ├── app/
│   │   ├── api/                  # API routers (FastAPI)
│   │   │   ├── jobs.py           # GET /api/jobs, /api/jobs/hot, /api/jobs/featured, /api/jobs/{id}
│   │   │   └── applications.py   # POST /api/applications
│   │   ├── core/
│   │   │   ├── config.py         # Pydantic Settings (.env)
│   │   │   └── database.py       # Async SQLAlchemy engine & session
│   │   ├── models/
│   │   │   └── models.py         # SQLAlchemy ORM: Company, Job, Application
│   │   ├── repositories/
│   │   │   ├── job_repository.py
│   │   │   └── application_repository.py
│   │   ├── schemas/
│   │   │   └── schemas.py        # Pydantic request/response schemas
│   │   ├── services/
│   │   │   ├── job_service.py
│   │   │   └── application_service.py
│   │   ├── seed.py               # Initial data seeding (migrated from JS)
│   │   └── main.py               # FastAPI app entry point
│   ├── alembic/
│   │   ├── versions/
│   │   │   └── 001_initial_migration.py
│   │   ├── env.py
│   │   └── script.py.mako
│   ├── alembic.ini
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── image/                # Hero images (hcm01.jpg, hcm02.jpg)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx        # Nav + lang/theme toggles
│   │   │   ├── Hero.tsx          # Hero slideshow
│   │   │   ├── Stats.tsx         # Statistics section
│   │   │   ├── FilterSection.tsx # Search + advanced filters
│   │   │   ├── HotJobCard.tsx    # Hot job list item
│   │   │   ├── JobCard.tsx       # Featured job grid card
│   │   │   ├── JobDetailModal.tsx
│   │   │   ├── ApplyModal.tsx    # Application form modal
│   │   │   ├── CTA.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SuccessToast.tsx
│   │   ├── contexts/
│   │   │   ├── LangContext.tsx   # i18n (vi/en)
│   │   │   └── ThemeContext.tsx  # light/dark theme
│   │   ├── hooks/
│   │   │   └── useJobs.ts       # Data fetching hook
│   │   ├── i18n/
│   │   │   └── translations.ts  # All translation strings
│   │   ├── services/
│   │   │   └── api.ts           # API client functions
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── styles.css            # Migrated from original
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── index.html                    # [ORIGINAL] - kept for reference
├── script.js                     # [ORIGINAL]
├── styles.css                    # [ORIGINAL]
└── image/                        # [ORIGINAL]
```

---

## Setup & Run

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### 1. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE tom_hiring;"
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your PostgreSQL credentials

# Run database migrations
alembic upgrade head

# Start server (auto-seeds data on first run)
uvicorn app.main:app --reload --port 8090
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**  
API docs at **http://localhost:8090/docs** (Swagger UI)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List jobs with filters (search, location, salary, pagination) |
| GET | `/api/jobs/hot` | Get hot jobs |
| GET | `/api/jobs/featured` | Get featured jobs |
| GET | `/api/jobs/{id}` | Get job detail |
| GET | `/api/jobs/locations` | Get available locations |
| POST | `/api/jobs` | Create a new job |
| POST | `/api/applications` | Submit job application (multipart form) |
| GET | `/api/health` | Health check |

---

## Migration Mapping: Old → New

| Old System (Static) | New System | Notes |
|---------------------|------------|-------|
| `index.html` - monolithic HTML | React components (`Header`, `Hero`, `Stats`, etc.) | Each section → reusable component |
| `jobsData[]` in script.js | PostgreSQL `jobs` table + `companies` table | Data normalized, relationships added |
| `data-i18n` attributes + `translations{}` | `LangContext` + `translations.ts` | Type-safe i18n with Context API |
| `data-theme` + CSS vars | `ThemeContext` + same CSS vars | Same visual result, React-managed |
| No backend / form doesn't submit | FastAPI REST API + file upload | Real data persistence |
| `findJob()` by title matching | Database queries with UUID-based lookups | Proper indexing, no string matching |
| Client-only filter UI | API-based search with query params | Server-side filtering, pagination |
| Inline event handlers | React event handlers + hooks | Proper state management |
| No CV storage | File upload → server filesystem | Secure file handling with validation |

---

## Key Technical Decisions

1. **React + Vite** over Next.js: This is an SPA without SEO requirements for job listings (can add SSR later). Vite provides faster DX.

2. **Context API** over Redux/Zustand: Only 2 global states (theme, language). Context is sufficient and avoids extra dependencies.

3. **FastAPI async**: All DB operations use `async/await` with `asyncpg` for non-blocking I/O.

4. **Clean Architecture (Router → Service → Repository)**: Separation of concerns makes testing and modification easier.

5. **UUID primary keys**: Better for distributed systems, no sequential ID enumeration.

6. **ARRAY columns** for tags/requirements/benefits: PostgreSQL native arrays avoid extra junction tables for simple string lists.

7. **Seed data in lifespan**: Auto-migrates hardcoded JS data to DB on first startup.

8. **`memo()` on card components**: Prevents unnecessary re-renders when parent state changes.
