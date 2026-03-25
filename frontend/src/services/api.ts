import type { Job, JobListResponse, JobFilter } from '../types';

const BASE = '/api';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchHotJobs(limit = 5, offset = 0): Promise<{ items: Job[]; total: number }> {
  return request<{ items: Job[]; total: number }>(`/jobs/hot?limit=${limit}&offset=${offset}`);
}

export async function fetchFeaturedJobs(limit = 6, offset = 0): Promise<{ items: Job[]; total: number }> {
  return request<{ items: Job[]; total: number }>(`/jobs/featured?limit=${limit}&offset=${offset}`);
}

export async function fetchJobs(filters: JobFilter): Promise<JobListResponse> {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.location) params.set('location', filters.location);
  if (filters.salary_min != null) params.set('salary_min', String(filters.salary_min));
  if (filters.salary_max != null) params.set('salary_max', String(filters.salary_max));
  if (filters.work_type) params.set('work_type', filters.work_type);
  if (filters.tag) params.set('tag', filters.tag);
  if (filters.is_hot != null) params.set('is_hot', String(filters.is_hot));
  if (filters.is_featured != null) params.set('is_featured', String(filters.is_featured));
  if (filters.page) params.set('page', String(filters.page));
  if (filters.page_size) params.set('page_size', String(filters.page_size));
  return request<JobListResponse>(`/jobs?${params}`);
}

export async function fetchJob(id: string): Promise<Job> {
  return request<Job>(`/jobs/${id}`);
}

export async function fetchLocations(): Promise<string[]> {
  return request<string[]>('/jobs/locations');
}

export async function submitApplication(formData: FormData): Promise<void> {
  const res = await fetch(`${BASE}/applications`, { method: 'POST', body: formData });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || 'Submit failed');
  }
}
