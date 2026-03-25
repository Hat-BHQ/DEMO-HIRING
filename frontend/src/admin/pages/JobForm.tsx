import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Company } from '../../types';
import {
  fetchAdminJob, createAdminJob, updateAdminJob,
  fetchAdminCompanies, createAdminCompany,
} from '../../services/adminApi';

interface FormData {
  title: string;
  icon: string;
  badge: string;
  location: string;
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  tags: string;
  work_type_vi: string;
  work_type_en: string;
  description_vi: string;
  description_en: string;
  requirements_vi: string;
  requirements_en: string;
  benefits_vi: string;
  benefits_en: string;
  is_hot: boolean;
  is_featured: boolean;
  is_active: boolean;
  company_id: string;
}

const JOB_ICONS = [
  { value: 'fas fa-briefcase',        label: 'Briefcase - Văn phòng' },
  { value: 'fas fa-code',             label: 'Code - Lập trình' },
  { value: 'fas fa-laptop-code',      label: 'Laptop Code - Dev' },
  { value: 'fas fa-paint-brush',      label: 'Paint Brush - Thiết kế' },
  { value: 'fas fa-pencil-ruler',     label: 'Pencil Ruler - UX/UI' },
  { value: 'fas fa-chart-line',       label: 'Chart - Kinh doanh' },
  { value: 'fas fa-chart-bar',        label: 'Chart Bar - Phân tích' },
  { value: 'fas fa-bullhorn',         label: 'Bullhorn - Marketing' },
  { value: 'fas fa-ad',               label: 'Ad - Quảng cáo' },
  { value: 'fas fa-users',            label: 'Users - HR/Nhân sự' },
  { value: 'fas fa-user-tie',         label: 'User Tie - Quản lý' },
  { value: 'fas fa-graduation-cap',   label: 'Graduation - Giáo dục' },
  { value: 'fas fa-stethoscope',      label: 'Stethoscope - Y tế' },
  { value: 'fas fa-heartbeat',        label: 'Heartbeat - Sức khỏe' },
  { value: 'fas fa-cogs',             label: 'Cogs - Kỹ thuật' },
  { value: 'fas fa-tools',            label: 'Tools - Kỹ thuật/Cơ khí' },
  { value: 'fas fa-server',           label: 'Server - DevOps' },
  { value: 'fas fa-shield-alt',       label: 'Shield - Bảo mật' },
  { value: 'fas fa-database',         label: 'Database - DBA' },
  { value: 'fas fa-cloud',            label: 'Cloud - Cloud/AWS' },
  { value: 'fas fa-mobile-alt',       label: 'Mobile - Mobile Dev' },
  { value: 'fas fa-robot',            label: 'Robot - AI/ML' },
  { value: 'fas fa-calculator',       label: 'Calculator - Kế toán' },
  { value: 'fas fa-money-bill-wave',  label: 'Money - Tài chính' },
  { value: 'fas fa-handshake',        label: 'Handshake - Bán hàng' },
  { value: 'fas fa-truck',            label: 'Truck - Logistics' },
  { value: 'fas fa-building',         label: 'Building - Bất động sản' },
  { value: 'fas fa-hard-hat',         label: 'Hard Hat - Xây dựng' },
  { value: 'fas fa-camera',           label: 'Camera - Truyền thông' },
  { value: 'fas fa-film',             label: 'Film - Video/Media' },
  { value: 'fas fa-pen-nib',          label: 'Pen - Copywriter' },
  { value: 'fas fa-globe',            label: 'Globe - Quốc tế' },
  { value: 'fas fa-shopping-cart',    label: 'Cart - E-commerce' },
  { value: 'fas fa-leaf',             label: 'Leaf - Nông nghiệp' },
  { value: 'fas fa-flask',            label: 'Flask - Nghiên cứu' },
];

const defaultForm: FormData = {
  title: '', icon: 'fas fa-briefcase', badge: '', location: '',
  salary_min: 0, salary_max: 0, salary_currency: 'VND',
  tags: '', work_type_vi: 'Toàn thời gian', work_type_en: 'Full Time',
  description_vi: '', description_en: '',
  requirements_vi: '', requirements_en: '',
  benefits_vi: '', benefits_en: '',
  is_hot: false, is_featured: false, is_active: true, company_id: '',
};

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<FormData>(defaultForm);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNewCompany, setShowNewCompany] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', icon: 'fas fa-building' });

  useEffect(() => {
    fetchAdminCompanies().then(setCompanies);
    if (id) {
      fetchAdminJob(id).then(job => {
        setForm({
          title: job.title,
          icon: job.icon,
          badge: job.badge || '',
          location: job.location,
          salary_min: job.salary_min,
          salary_max: job.salary_max,
          salary_currency: job.salary_currency,
          tags: job.tags.join(', '),
          work_type_vi: job.work_type_vi,
          work_type_en: job.work_type_en,
          description_vi: job.description_vi,
          description_en: job.description_en,
          requirements_vi: job.requirements_vi.join('\n'),
          requirements_en: job.requirements_en.join('\n'),
          benefits_vi: job.benefits_vi.join('\n'),
          benefits_en: job.benefits_en.join('\n'),
          is_hot: job.is_hot,
          is_featured: job.is_featured,
          is_active: job.is_active,
          company_id: job.company_id,
        });
      });
    }
  }, [id]);

  const set = (key: keyof FormData, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleAddCompany = async () => {
    if (!newCompany.name.trim()) return;
    const c = await createAdminCompany(newCompany);
    setCompanies(prev => [...prev, c]);
    setForm(prev => ({ ...prev, company_id: c.id }));
    setNewCompany({ name: '', icon: 'fas fa-building' });
    setShowNewCompany(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      title: form.title,
      icon: form.icon,
      badge: form.badge || null,
      location: form.location,
      salary_min: form.salary_min,
      salary_max: form.salary_max,
      salary_currency: 'VND',
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      work_type_vi: form.work_type_vi,
      work_type_en: form.work_type_en,
      description_vi: form.description_vi,
      description_en: form.description_en,
      requirements_vi: form.requirements_vi.split('\n').filter(Boolean),
      requirements_en: form.requirements_en.split('\n').filter(Boolean),
      benefits_vi: form.benefits_vi.split('\n').filter(Boolean),
      benefits_en: form.benefits_en.split('\n').filter(Boolean),
      is_hot: form.is_hot,
      is_featured: form.is_featured,
      is_active: form.is_active,
      company_id: form.company_id,
    };

    try {
      if (isEdit && id) {
        await updateAdminJob(id, payload);
      } else {
        await createAdminJob(payload);
      }
      navigate('/admin/jobs');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? 'Chỉnh sửa việc làm' : 'Thêm việc làm mới'}</h1>
          <p>{isEdit ? 'Cập nhật thông tin bài tuyển dụng' : 'Tạo bài tuyển dụng mới'}</p>
        </div>
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/jobs')}>
          <i className="fas fa-arrow-left"></i> Quay lại
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="admin-form-section">
          <h3><i className="fas fa-info-circle"></i> Thông tin cơ bản</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group admin-col-2">
              <label>Tiêu đề *</label>
              <input type="text" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="VD: Senior Developer" />
            </div>
            <div className="admin-form-group">
              <label>Icon</label>
              <div className="admin-icon-picker">
                <div className="admin-icon-preview">
                  <i className={form.icon}></i>
                </div>
                <select value={form.icon} onChange={e => set('icon', e.target.value)}>
                  {JOB_ICONS.map(ic => (
                    <option key={ic.value} value={ic.value}>{ic.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="admin-form-group">
              <label>Badge</label>
              <select value={form.badge} onChange={e => set('badge', e.target.value)}>
                <option value="">Không có</option>
                <option value="hot">Hot</option>
                <option value="new">New</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Địa điểm *</label>
              <input type="text" value={form.location} onChange={e => set('location', e.target.value)} required placeholder="Hồ Chí Minh" />
            </div>
            <div className="admin-form-group">
              <label>
                Công ty *
                <button type="button" className="admin-btn-link" onClick={() => setShowNewCompany(v => !v)}>
                  {showNewCompany ? 'Hủy' : '+ Thêm mới'}
                </button>
              </label>
              {showNewCompany ? (
                <div className="admin-inline-form">
                  <input type="text" placeholder="Tên công ty" value={newCompany.name} onChange={e => setNewCompany(p => ({ ...p, name: e.target.value }))} />
                  <button type="button" className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleAddCompany}>Thêm</button>
                </div>
              ) : (
                <select value={form.company_id} onChange={e => set('company_id', e.target.value)} required>
                  <option value="">Chọn công ty</option>
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Salary & Tags */}
        <div className="admin-form-section">
          <h3><i className="fas fa-dollar-sign"></i> Lương & Tags</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Lương tối thiểu (VND)</label>
              <input type="number" value={form.salary_min} onChange={e => set('salary_min', Number(e.target.value))} min={0} step={500000} placeholder="VD: 10000000" />
            </div>
            <div className="admin-form-group">
              <label>Lương tối đa (VND)</label>
              <input type="number" value={form.salary_max} onChange={e => set('salary_max', Number(e.target.value))} min={0} step={500000} placeholder="VD: 25000000" />
            </div>
            <div className="admin-form-group admin-col-2">
              <label>Tags (phân cách bằng dấu phẩy)</label>
              <input type="text" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, TypeScript, Node.js" />
            </div>
          </div>
        </div>

        {/* Work Type */}
        <div className="admin-form-section">
          <h3><i className="fas fa-clock"></i> Hình thức làm việc</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Tiếng Việt</label>
              <input type="text" value={form.work_type_vi} onChange={e => set('work_type_vi', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Tiếng Anh</label>
              <input type="text" value={form.work_type_en} onChange={e => set('work_type_en', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="admin-form-section">
          <h3><i className="fas fa-align-left"></i> Mô tả công việc</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Mô tả (Tiếng Việt) *</label>
              <textarea rows={4} value={form.description_vi} onChange={e => set('description_vi', e.target.value)} required placeholder="Mô tả công việc..." />
            </div>
            <div className="admin-form-group">
              <label>Mô tả (Tiếng Anh) *</label>
              <textarea rows={4} value={form.description_en} onChange={e => set('description_en', e.target.value)} required placeholder="Job description..." />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="admin-form-section">
          <h3><i className="fas fa-list-check"></i> Yêu cầu ứng viên</h3>
          <p className="admin-hint">Mỗi yêu cầu một dòng</p>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Tiếng Việt</label>
              <textarea rows={5} value={form.requirements_vi} onChange={e => set('requirements_vi', e.target.value)} placeholder="Tốt nghiệp đại học&#10;Kinh nghiệm 3+ năm&#10;..." />
            </div>
            <div className="admin-form-group">
              <label>Tiếng Anh</label>
              <textarea rows={5} value={form.requirements_en} onChange={e => set('requirements_en', e.target.value)} placeholder="Bachelor's degree&#10;3+ years experience&#10;..." />
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="admin-form-section">
          <h3><i className="fas fa-gift"></i> Quyền lợi</h3>
          <p className="admin-hint">Mỗi quyền lợi một dòng</p>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Tiếng Việt</label>
              <textarea rows={5} value={form.benefits_vi} onChange={e => set('benefits_vi', e.target.value)} placeholder="Lương thưởng hấp dẫn&#10;Đào tạo chuyên nghiệp&#10;..." />
            </div>
            <div className="admin-form-group">
              <label>Tiếng Anh</label>
              <textarea rows={5} value={form.benefits_en} onChange={e => set('benefits_en', e.target.value)} placeholder="Competitive salary&#10;Professional training&#10;..." />
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="admin-form-section">
          <h3><i className="fas fa-toggle-on"></i> Tùy chọn hiển thị</h3>
          <div className="admin-checkbox-group">
            <label className="admin-checkbox">
              <input type="checkbox" checked={form.is_hot} onChange={e => set('is_hot', e.target.checked)} />
              <span>Hot Job</span>
            </label>
            <label className="admin-checkbox">
              <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} />
              <span>Featured Job</span>
            </label>
            <label className="admin-checkbox">
              <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} />
              <span>Đang hoạt động</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="admin-form-actions">
          <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/jobs')}>Hủy</button>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Đang lưu...' : (isEdit ? 'Cập nhật' : 'Tạo việc làm')}
          </button>
        </div>
      </form>
    </div>
  );
}
