import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { checkAuth } from '../../services/adminApi';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    checkAuth().then(ok => {
      if (!ok) navigate('/admin/login', { replace: true });
      else setReady(true);
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
    navigate('/admin/login');
  };

  if (!ready) return <div className="admin-loading">Đang tải...</div>;

  return (
    <div className={`admin-layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>TOM Admin</h2>
          <button className="admin-sidebar-toggle" onClick={() => setSidebarOpen(v => !v)}>
            <i className={`fas fa-${sidebarOpen ? 'chevron-left' : 'chevron-right'}`}></i>
          </button>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/jobs" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-briefcase"></i>
            <span>Việc làm</span>
          </NavLink>
          <NavLink to="/admin/companies" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-building"></i>
            <span>Công ty</span>
          </NavLink>
          <NavLink to="/admin/applications" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-file-alt"></i>
            <span>Hồ sơ ứng tuyển</span>
          </NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer">
            <i className="fas fa-external-link-alt"></i>
            <span>Xem trang chủ</span>
          </a>
          <button onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
