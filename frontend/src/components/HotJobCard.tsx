import { memo } from 'react';
import type { Job } from '../types';
import { useLang } from '../contexts/LangContext';

interface Props {
  job: Job;
  onCardClick: (job: Job) => void;
  onApplyClick: (job: Job) => void;
}

function HotJobCard({ job, onCardClick, onApplyClick }: Props) {
  const { t } = useLang();

  const salary = `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} ${job.salary_currency}`;

  return (
    <div className="hot-job-card" onClick={() => onCardClick(job)}>
      <div className="hot-job-left">
        <div className="company-logo">
          <i className={job.icon}></i>
        </div>
        <div className="hot-job-info">
          <h3>{job.title}</h3>
          <p className="company-name"><i className="fas fa-building"></i> {job.company.name}</p>
          <p className="job-location"><i className="fas fa-map-marker-alt"></i> {job.location}</p>
        </div>
      </div>
      <div className="hot-job-right">
        <div className="job-tags">
          {job.tags.map(tag => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <div className="hot-job-footer">
          <span className="salary"><i className="fas fa-dollar-sign"></i> {salary}</span>
          {job.badge && <span className={`job-badge${job.badge === 'hot' ? ' hot' : ''}`}>{job.badge === 'hot' ? 'Hot' : t('badgeNew')}</span>}
          <button className="btn-apply" onClick={e => { e.stopPropagation(); onApplyClick(job); }}>
            {t('btnApplyNow')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(HotJobCard);
