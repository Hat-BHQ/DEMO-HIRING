import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Job } from './types';
import { useLang } from './contexts/LangContext';
import { fetchJob } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import SuccessToast from './components/SuccessToast';
import Building from './assets/icons/Building';
import MarkerPin from './assets/icons/MarkerPin';
import Currency from './assets/icons/Currency';
import { LuClock, LuArrowLeft } from 'react-icons/lu';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLang();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    fetchJob(id)
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch job:', err);
        setError(err.message || 'Không thể tải thông tin công việc');
        setLoading(false);
      });
  }, [id]);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '48px', color: '#FF6B35' }}></i>
          <p style={{ marginTop: '20px', fontSize: '18px' }}>Đang tải...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Header />
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '48px', color: '#FF6B35' }}></i>
          <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>{error || 'Không tìm thấy công việc'}</p>
          <button className="btn-default" onClick={() => navigate('/')} style={{ marginTop: '30px' }}>
            <LuArrowLeft /> Quay lại trang chủ
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const salary = `${job.salary_min.toLocaleString('vi-VN')} - ${job.salary_max.toLocaleString('vi-VN')} đ`;
  const workType = job.work_type_vi;
  const description = job.description_vi;
  const requirements = job.requirements_vi;
  const benefits = job.benefits_vi;

  return (
    <>
      <Header />
      
      <div className="job-detail-page">
        <div className="container">
          <button className="btn-back" onClick={() => navigate('/')}>
            <LuArrowLeft /> {t('btnBack') || 'Quay lại'}
          </button>

          <div className="job-detail-container">
            <div className="job-detail-header">
              <div className="job-detail-company-logo">
                <i className={job.icon}></i>
              </div>
              <div className="job-detail-header-info">
                {job.badge && (
                  <div className="job-detail-badges">
                    <span className={`job-badge${job.badge === 'hot' ? ' hot' : ''}`}>
                      {job.badge === 'hot' ? 'Hot' : t('badgeNew')}
                    </span>
                  </div>
                )}
                <h1>{job.title}</h1>
                <div className="job-detail-meta">
                  <p className="job-detail-company"><Building /> <span>{job.company.name}</span></p>
                  <p className="job-detail-location"><MarkerPin /> <span>{job.location}</span></p>
                  <p className="job-detail-salary"><Currency /> <span>{salary}</span></p>
                  <p className="job-detail-type"><LuClock size={20} stroke='#A3A3A3' /> <span>{workType}</span></p>
                </div>
                <div className="job-detail-tags">
                  {job.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>

            <div className="job-detail-content">
              <div className="job-detail-section">
                <h3>{t('modalDescTitle')}</h3>
                <p>{description}</p>
              </div>
              <div className="job-detail-section">
                <h3>{t('modalReqTitle')}</h3>
                <ul>{requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
              <div className="job-detail-section">
                <h3>{t('modalBenTitle')}</h3>
                <ul>{benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            </div>

            <div className="job-detail-footer">
              <button className="btn-default" onClick={() => setApplyJob(job)}>
                <span>{t('btnApplyNow')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {applyJob && (
        <ApplyModal
          job={applyJob}
          onClose={() => setApplyJob(null)}
          onSuccess={handleSuccess}
        />
      )}

      {showSuccess && <SuccessToast />}
    </>
  );
}
