import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Job, JobListResponse } from '../../types';
import { fetchAdminJobs, deleteAdminJob } from '../../services/adminApi';

export default function JobList() {
  const [data, setData] = useState<JobListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const load = useCallback(() => {
    fetchAdminJobs(page, 20, search || undefined).then(setData);
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (job: Job) => {
    if (!confirm(`Xóa "${job.title}"?`)) return;
    await deleteAdminJob(job.id);
    load();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const totalPages = data ? Math.ceil(data.total / data.page_size) : 0;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Quản lý việc làm</h1>
          <p>{data ? `${data.total} việc làm` : 'Đang tải...'}</p>
        </div>
        <Link to="/admin/jobs/new" className="admin-btn admin-btn-primary">
          <i className="fas fa-plus"></i> Thêm việc làm
        </Link>
      </div>

      <form className="admin-search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề, địa điểm..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button type="submit" className="admin-btn admin-btn-primary">
          <i className="fas fa-search"></i>
        </button>
        {search && (
          <button type="button" className="admin-btn admin-btn-secondary" onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </form>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Công ty</th>
              <th>Địa điểm</th>
              <th>Lương (VND)</th>
              <th>Badge</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map(job => (
              <tr key={job.id}>
                <td>
                  <div className="admin-job-title">
                    <i className={job.icon}></i>
                    <span>{job.title}</span>
                  </div>
                </td>
                <td>{job.company?.name}</td>
                <td>{job.location}</td>
                <td>{job.salary_min.toLocaleString('vi-VN')} - {job.salary_max.toLocaleString('vi-VN')}</td>
                <td>
                  {job.badge && <span className={`admin-badge admin-badge-${job.badge}`}>{job.badge}</span>}
                  {job.is_hot && <span className="admin-badge admin-badge-hot">Hot</span>}
                  {job.is_featured && <span className="admin-badge admin-badge-featured">Featured</span>}
                </td>
                <td>
                  <span className={`admin-badge ${job.is_active ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                    {job.is_active ? 'Hoạt động' : 'Ẩn'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link to={`/admin/jobs/${job.id}`} className="admin-btn-icon" title="Sửa">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="admin-btn-icon admin-btn-danger" title="Xóa" onClick={() => handleDelete(job)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data?.items.length === 0 && (
              <tr><td colSpan={7} className="admin-empty">Không tìm thấy việc làm nào</td></tr>
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
