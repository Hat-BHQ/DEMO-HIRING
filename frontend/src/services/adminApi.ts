import type {
  Job, Company, JobListResponse, DashboardStats,
  ApplicationListResponse,
} from '../types';

const BASE = '/api/admin';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    ...init,
    headers: { ...authHeaders(), ...init?.headers },
  });
  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// Auth
export async function adminLogin(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const data = await res.json();
  return data.access_token;
}

export async function checkAuth(): Promise<boolean> {
  try {
    await request('/me');
    return true;
  } catch {
    return false;
  }
}

// Dashboard
export async function fetchDashboard(): Promise<DashboardStats> {
  return request<DashboardStats>('/dashboard');
}

// Jobs
export async function fetchAdminJobs(page = 1, pageSize = 20, search?: string): Promise<JobListResponse> {
  const params = new URLSearchParams({ page: String(page), page_size: String(pageSize) });
  if (search) params.set('search', search);
  return request<JobListResponse>(`/jobs?${params}`);
}

export async function fetchAdminJob(id: string): Promise<Job> {
  return request<Job>(`/jobs/${id}`);
}

export async function createAdminJob(data: Record<string, unknown>): Promise<Job> {
  return request<Job>('/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateAdminJob(id: string, data: Record<string, unknown>): Promise<Job> {
  return request<Job>(`/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteAdminJob(id: string): Promise<void> {
  return request(`/jobs/${id}`, { method: 'DELETE' });
}

// Companies
export async function fetchAdminCompanies(): Promise<Company[]> {
  return request<Company[]>('/companies');
}

export async function createAdminCompany(data: { name: string; icon: string }): Promise<Company> {
  return request<Company>('/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateAdminCompany(id: string, data: { name: string; icon: string }): Promise<Company> {
  return request<Company>(`/companies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteAdminCompany(id: string): Promise<void> {
  return request(`/companies/${id}`, { method: 'DELETE' });
}

// Applications
export async function fetchAdminApplications(page = 1, pageSize = 20): Promise<ApplicationListResponse> {
  return request<ApplicationListResponse>(`/applications?page=${page}&page_size=${pageSize}`);
}

export async function updateApplicationStatus(id: string, status: string): Promise<void> {
  return request(`/applications/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}

export async function deleteAdminApplication(id: string): Promise<void> {
  return request(`/applications/${id}`, { method: 'DELETE' });
}
