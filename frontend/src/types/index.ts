export interface Company {
  id: string;
  name: string;
  icon: string;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  icon: string;
  badge: string | null;
  location: string;
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  tags: string[];
  work_type_vi: string;
  work_type_en: string;
  description_vi: string;
  description_en: string;
  requirements_vi: string[];
  requirements_en: string[];
  benefits_vi: string[];
  benefits_en: string[];
  is_hot: boolean;
  is_featured: boolean;
  is_active: boolean;
  company_id: string;
  company: Company;
  created_at: string;
  updated_at: string;
}

export interface JobListResponse {
  items: Job[];
  total: number;
  page: number;
  page_size: number;
}

export interface JobFilter {
  search?: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  work_type?: string;
  tag?: string;
  is_hot?: boolean;
  is_featured?: boolean;
  page?: number;
  page_size?: number;
}

export interface ApplicationForm {
  full_name: string;
  email: string;
  phone: string;
  job_id: string;
  cv: File | null;
}

export type Lang = 'vi' | 'en';
export type Theme = 'light' | 'dark';

// ---------- Admin ----------
export interface DashboardStats {
  total_jobs: number;
  active_jobs: number;
  total_applications: number;
  pending_applications: number;
}

export interface ApplicationAdmin {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  cv_filename: string;
  status: string;
  job_id: string;
  job_title: string | null;
  created_at: string;
}

export interface ApplicationListResponse {
  items: ApplicationAdmin[];
  total: number;
  page: number;
  page_size: number;
}
