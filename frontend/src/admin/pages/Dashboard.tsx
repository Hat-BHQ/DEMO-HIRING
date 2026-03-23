import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DashboardStats } from '../../types';
import { fetchDashboard } from '../../services/adminApi';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchDashboard().then(setStats);
  }, []);

  if (!stats) return <div className="admin-loading">Đang tải...</div>;

  const cards = [
    { label: 'Tổng việc làm', value: stats.total_jobs, icon: 'fas fa-briefcase', color: '#2563eb', link: '/admin/jobs' },
    { label: 'Đang hoạt động', value: stats.active_jobs, icon: 'fas fa-check-circle', color: '#16a34a', link: '/admin/jobs' },
    { label: 'Hồ sơ ứng tuyển', value: stats.total_applications, icon: 'fas fa-file-alt', color: '#9333ea', link: '/admin/applications' },
    { label: 'Chờ duyệt', value: stats.pending_applications, icon: 'fas fa-clock', color: '#ea580c', link: '/admin/applications' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Tổng quan hệ thống tuyển dụng</p>
      </div>
      <div className="admin-stats-grid">
        {cards.map(card => (
          <Link to={card.link} key={card.label} className="admin-stat-card" style={{ '--accent': card.color } as React.CSSProperties}>
            <div className="admin-stat-icon">
              <i className={card.icon}></i>
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{card.value}</span>
              <span className="admin-stat-label">{card.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
