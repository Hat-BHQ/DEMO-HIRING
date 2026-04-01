import { useEffect, useState } from 'react';
import type { Location } from '../../types';
import {
  fetchAdminLocations, createAdminLocation,
  updateAdminLocation, deleteAdminLocation,
} from '../../services/adminApi';

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '' });
  const [showAdd, setShowAdd] = useState(false);

  const load = () => { fetchAdminLocations().then(setLocations); };
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    await createAdminLocation(form);
    setForm({ name: '' });
    setShowAdd(false);
    load();
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId || !form.name.trim()) return;
    await updateAdminLocation(editId, form);
    setEditId(null);
    setForm({ name: '' });
    load();
  };

  const handleDelete = async (loc: Location) => {
    if (!confirm(`Xóa địa điểm "${loc.name}"?`)) return;
    await deleteAdminLocation(loc.id);
    load();
  };

  const startEdit = (loc: Location) => {
    setEditId(loc.id);
    setForm({ name: loc.name });
    setShowAdd(false);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: '' });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Quản lý địa điểm</h1>
          <p>{locations.length} địa điểm</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setShowAdd(v => !v); cancelEdit(); }}>
          <i className="fas fa-plus"></i> Thêm địa điểm
        </button>
      </div>

      {(showAdd || editId) && (
        <form className="admin-inline-card" onSubmit={editId ? handleEdit : handleAdd}>
          <h3>{editId ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới'}</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group admin-col-2">
              <label>Tên địa điểm *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ name: e.target.value })}
                required
                placeholder="VD: Hồ Chí Minh"
                autoFocus
              />
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
              <th>Tên địa điểm</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(loc => (
              <tr key={loc.id}>
                <td><i className="fas fa-map-marker-alt" style={{ marginRight: '0.5rem', color: '#6366f1' }}></i>{loc.name}</td>
                <td>{new Date(loc.created_at).toLocaleDateString('vi-VN')}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" title="Sửa" onClick={() => startEdit(loc)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="admin-btn-icon admin-btn-danger" title="Xóa" onClick={() => handleDelete(loc)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {locations.length === 0 && (
              <tr><td colSpan={3} className="admin-empty">Chưa có địa điểm nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
