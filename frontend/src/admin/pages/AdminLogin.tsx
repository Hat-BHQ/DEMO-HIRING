import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/adminApi';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await adminLogin(username, password);
      localStorage.setItem('admin_token', token);
      navigate('/admin');
    } catch {
      setError('Sai tên đăng nhập hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="admin-login-logo">
          <i className="fas fa-shield-alt"></i>
          <h1>TOM Admin</h1>
        </div>
        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        <div className="admin-form-group">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
            autoFocus
          />
        </div>
        <div className="admin-form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="admin-btn admin-btn-primary admin-btn-full" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
