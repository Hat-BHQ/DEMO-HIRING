# TOM Organization - Hiring Platform

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: PHP 8+ (PDO MySQL)
- **Database**: MySQL / MariaDB

## Project Structure

```
DEMO-HIRING/
├── backend/                # PHP API
│   ├── config.php          # DB & app config
│   ├── database.php        # PDO connection
│   ├── auth.php            # JWT token
│   ├── helpers.php         # Response helpers
│   ├── index.php           # Router
│   ├── .htaccess           # Apache URL rewrite
│   └── routes/
│       ├── jobs.php        # Public jobs API
│       ├── applications.php # Submit CV
│       └── admin.php       # Admin CRUD
│
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Pages
│   │   ├── services/       # API calls
│   │   └── hooks/          # Custom hooks
│   └── vite.config.ts
└── seed_data.sql               # SQL seed data cho phpMyAdmin
```

## Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev          # http://localhost:5173

# Backend (cần PHP 8+ và MySQL)
cd backend
# Sửa config.php với DB credentials
php -S localhost:8080 router.php
```

## Deploy lên Hostinger

1. **Build frontend:**
   ```bash
   cd frontend && npm run build
   ```
2. **Upload lên Hostinger:**
   - `frontend/dist/*` → `public_html/`
   - `backend/*` → `public_html/api/`
3. **Sửa `public_html/api/config.php`** với DB Hostinger
4. **Chạy `seed_data.sql`** trong phpMyAdmin

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/jobs` | Danh sách jobs (filter, pagination) |
| GET | `/api/jobs/hot` | Jobs nổi bật |
| GET | `/api/jobs/featured` | Jobs đề xuất |
| GET | `/api/jobs/{id}` | Chi tiết job |
| GET | `/api/jobs/locations` | Danh sách địa điểm |
| POST | `/api/applications` | Nộp đơn ứng tuyển (multipart) |
| POST | `/api/admin/login` | Đăng nhập admin |
| GET | `/api/admin/dashboard` | Thống kê |
| CRUD | `/api/admin/jobs/*` | Quản lý jobs |
| CRUD | `/api/admin/companies/*` | Quản lý công ty |
| CRUD | `/api/admin/applications/*` | Quản lý đơn ứng tuyển |
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
