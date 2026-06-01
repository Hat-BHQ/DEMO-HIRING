import { useEffect } from 'react';
import type { Job } from '../types';
import { useLang } from '../contexts/LangContext';
import Building from '../assets/icons/Building';
import MarkerPin from '../assets/icons/MarkerPin';
import Currency from '../assets/icons/Currency';
import { LuClock } from 'react-icons/lu';

interface Props {
  job: Job;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export default function JobDetailModal({ job, onClose, onApply }: Props) {
  const { t } = useLang();

  const salary = `${job.salary_min.toLocaleString('vi-VN')} - ${job.salary_max.toLocaleString('vi-VN')} đ`;
  const workType = job.work_type_vi;
  const description = job.description_vi;
  const requirements = job.requirements_vi;
  const benefits = job.benefits_vi;

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
            <p className="modal-company"><Building /> <span>{job.company.name}</span></p>
            <p className="modal-location"><MarkerPin /> <span>{job.location}</span></p>
            <p className="modal-salary"><Currency /> <span>{salary}</span></p>
            <p className="modal-type"><LuClock size={20} stroke='#A3A3A3' /> <span>{workType}</span></p>
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
          <button className="btn-default" style={{ width: '100%' }} onClick={() => { onClose(); onApply(job); }}>
            <span>{t('btnApplyNow')}</span>
          </button>
          <button className="btn-filter-toggle" onClick={onClose}>{t('btnClose')}</button>
        </div>
      </div>
    </div>
  );
}
