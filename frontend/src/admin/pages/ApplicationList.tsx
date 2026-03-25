import { useEffect, useState, useCallback } from 'react';
import type { ApplicationAdmin, ApplicationListResponse, Job } from '../../types';
import {
  fetchAdminApplications, updateApplicationStatus,
  deleteAdminApplication, fetchAdminJobs,
} from '../../services/adminApi';

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  pending: { label: 'Chờ duyệt', className: 'admin-badge-pending' },
  reviewed: { label: 'Đã xem', className: 'admin-badge-reviewed' },
  accepted: { label: 'Chấp nhận', className: 'admin-badge-accepted' },
  rejected: { label: 'Từ chối', className: 'admin-badge-rejected' },
};

export default function ApplicationList() {
  const [data, setData] = useState<ApplicationListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [jobFilter, setJobFilter] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);

  const load = useCallback(() => {
    fetchAdminApplications(page, 20, jobFilter || undefined).then(setData);
  }, [page, jobFilter]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetchAdminJobs(1, 100).then(r => setJobs(r.items));
  }, []);

  const handleStatus = async (app: ApplicationAdmin, status: string) => {
    await updateApplicationStatus(app.id, status);
    load();
  };

  const handleDelete = async (app: ApplicationAdmin) => {
    if (!confirm(`Xóa hồ sơ của "${app.full_name}"?`)) return;
    await deleteAdminApplication(app.id);
    load();
  };

  const handleJobFilterChange = (jobId: string) => {
    setJobFilter(jobId);
    setPage(1);
  };

  const downloadAllCVs = () => {
    if (!data?.items.length) return;
    data.items.forEach((app, i) => {
      if (!app.cv_filename) return;
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = `/api/uploads/${app.cv_filename}?download=1`;
        a.download = `${app.full_name.replace(/\s+/g, '_')}_CV`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 400);
    });
  };

  const totalPages = data ? Math.ceil(data.total / data.page_size) : 0;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Hồ sơ ứng tuyển</h1>
          <p>{data ? `${data.total} hồ sơ` : 'Đang tải...'}</p>
        </div>
        <div className="admin-header-actions">
          <select
            className="admin-status-select"
            value={jobFilter}
            onChange={e => handleJobFilterChange(e.target.value)}
          >
            <option value="">-- Tất cả vị trí --</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
          {data && data.items.length > 0 && (
            <button className="admin-btn admin-btn-secondary" onClick={downloadAllCVs}>
              <i className="fas fa-download"></i> Tải tất cả CV ({data.total})
            </button>
          )}
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vị trí</th>
              <th>CV</th>
              <th>Trạng thái</th>
              <th>Ngày nộp</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map(app => (
              <tr key={app.id}>
                <td><strong>{app.full_name}</strong></td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{app.job_title || '—'}</td>
                <td>
                  {app.cv_filename ? (
                    <div className="admin-cv-actions">
                      <a
                        href={`/api/uploads/${app.cv_filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn-icon admin-btn-view"
                        title="Xem CV"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                      <a
                        href={`/api/uploads/${app.cv_filename}?download=1`}
                        download={`${app.full_name.replace(/\s+/g, '_')}_CV`}
                        className="admin-btn-icon admin-btn-info"
                        title="Tải xuống CV"
                      >
                        <i className="fas fa-download"></i>
                      </a>
                    </div>
                  ) : '—'}
                </td>
                <td>
                  <span className={`admin-badge ${STATUS_MAP[app.status]?.className || ''}`}>
                    {STATUS_MAP[app.status]?.label || app.status}
                  </span>
                </td>
                <td>{new Date(app.created_at).toLocaleDateString('vi-VN')}</td>
                <td>
                  <div className="admin-actions">
                    <select
                      className="admin-status-select"
                      value={app.status}
                      onChange={e => handleStatus(app, e.target.value)}
                    >
                      <option value="pending">Chờ duyệt</option>
                      <option value="reviewed">Đã xem</option>
                      <option value="accepted">Chấp nhận</option>
                      <option value="rejected">Từ chối</option>
                    </select>
                    <button className="admin-btn-icon admin-btn-danger" title="Xóa" onClick={() => handleDelete(app)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data?.items.length === 0 && (
              <tr><td colSpan={8} className="admin-empty">Chưa có hồ sơ ứng tuyển</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="admin-btn admin-btn-secondary">
            <i className="fas fa-chevron-left"></i>
          </button>
          <span>Trang {page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="admin-btn admin-btn-secondary">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
