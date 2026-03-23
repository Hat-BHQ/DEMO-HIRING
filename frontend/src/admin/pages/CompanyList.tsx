import { useEffect, useState } from 'react';
import type { Company } from '../../types';
import {
  fetchAdminCompanies, createAdminCompany,
  updateAdminCompany, deleteAdminCompany,
} from '../../services/adminApi';

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', icon: 'fas fa-building' });
  const [showAdd, setShowAdd] = useState(false);

  const load = () => { fetchAdminCompanies().then(setCompanies); };
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    await createAdminCompany(form);
    setForm({ name: '', icon: 'fas fa-building' });
    setShowAdd(false);
    load();
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId || !form.name.trim()) return;
    await updateAdminCompany(editId, form);
    setEditId(null);
    setForm({ name: '', icon: 'fas fa-building' });
    load();
  };

  const handleDelete = async (c: Company) => {
    if (!confirm(`Xóa công ty "${c.name}"? Các việc làm liên quan cũng sẽ bị xóa.`)) return;
    await deleteAdminCompany(c.id);
    load();
  };

  const startEdit = (c: Company) => {
    setEditId(c.id);
    setForm({ name: c.name, icon: c.icon });
    setShowAdd(false);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: '', icon: 'fas fa-building' });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Quản lý công ty</h1>
          <p>{companies.length} công ty</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setShowAdd(v => !v); cancelEdit(); }}>
          <i className="fas fa-plus"></i> Thêm công ty
        </button>
      </div>

      {(showAdd || editId) && (
        <form className="admin-inline-card" onSubmit={editId ? handleEdit : handleAdd}>
          <h3>{editId ? 'Chỉnh sửa công ty' : 'Thêm công ty mới'}</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Tên công ty *</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Tên công ty" autoFocus />
            </div>
            <div className="admin-form-group">
              <label>Icon (FontAwesome)</label>
              <input type="text" value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="fas fa-building" />
            </div>
          </div>
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => { setShowAdd(false); cancelEdit(); }}>Hủy</button>
            <button type="submit" className="admin-btn admin-btn-primary">{editId ? 'Cập nhật' : 'Thêm'}</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Tên</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td><i className={c.icon} style={{ fontSize: '1.2rem' }}></i></td>
                <td>{c.name}</td>
                <td>{new Date(c.created_at).toLocaleDateString('vi-VN')}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" title="Sửa" onClick={() => startEdit(c)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="admin-btn-icon admin-btn-danger" title="Xóa" onClick={() => handleDelete(c)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr><td colSpan={4} className="admin-empty">Chưa có công ty nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
