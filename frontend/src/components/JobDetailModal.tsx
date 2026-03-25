import { useEffect } from 'react';
import type { Job } from '../types';
import { useLang } from '../contexts/LangContext';

interface Props {
  job: Job;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export default function JobDetailModal({ job, onClose, onApply }: Props) {
  const { lang, t } = useLang();

  const salary = `${job.salary_min.toLocaleString('vi-VN')} - ${job.salary_max.toLocaleString('vi-VN')} đ`;
  const workType = lang === 'vi' ? job.work_type_vi : job.work_type_en;
  const description = lang === 'vi' ? job.description_vi : job.description_en;
  const requirements = lang === 'vi' ? job.requirements_vi : job.requirements_en;
  const benefits = lang === 'vi' ? job.benefits_vi : job.benefits_en;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="job-modal-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="job-modal">
        <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>
        <div className="modal-header">
          <div className="modal-company-logo">
            <i className={job.icon}></i>
          </div>
          <div className="modal-header-info">
            <div className="modal-badges">
              {job.badge && (
                <span className={`job-badge${job.badge === 'hot' ? ' hot' : ''}`}>
                  {job.badge === 'hot' ? 'Hot' : t('badgeNew')}
                </span>
              )}
            </div>
            <h2>{job.title}</h2>
            <p className="modal-company"><i className="fas fa-building"></i> <span>{job.company.name}</span></p>
            <p className="modal-location"><i className="fas fa-map-marker-alt"></i> <span>{job.location}</span></p>
            <p className="modal-salary"><i className="fas fa-money-bill-wave"></i> <span>{salary}</span></p>
            <p className="modal-type"><i className="fas fa-clock"></i> <span>{workType}</span></p>
          </div>
        </div>
        <div className="modal-tags">
          {job.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <h3>{t('modalDescTitle')}</h3>
            <p>{description}</p>
          </div>
          <div className="modal-section">
            <h3>{t('modalReqTitle')}</h3>
            <ul>{requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
          <div className="modal-section">
            <h3>{t('modalBenTitle')}</h3>
            <ul>{benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-apply-modal" onClick={() => { onClose(); onApply(job); }}>
            {t('btnApplyNow')}
          </button>
          <button className="btn-modal-close" onClick={onClose}>{t('btnClose')}</button>
        </div>
      </div>
    </div>
  );
}
