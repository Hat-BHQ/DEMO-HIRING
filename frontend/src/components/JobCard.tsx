import { memo } from 'react';
import type { Job } from '../types';
import { useLang } from '../contexts/LangContext';

interface Props {
  job: Job;
  onCardClick: (job: Job) => void;
  onApplyClick: (job: Job) => void;
}

function JobCard({ job, onCardClick, onApplyClick }: Props) {
  const { t } = useLang();

  const salary = `${(job.salary_min / 1000000).toLocaleString('vi-VN')} - ${(job.salary_max / 1000000).toLocaleString('vi-VN')} triệu`;

  return (
    <div className="job-card" onClick={() => onCardClick(job)}>
      <div className="job-card-top">
        <div className="job-card-title-wrap">
          <h3>{job.title}</h3>
          {job.badge && (
            <div className={`job-badge${job.badge === 'hot' ? ' hot' : ''}`}>
              {job.badge === 'hot' ? 'Hot' : t('badgeNew')}
            </div>
          )}
        </div>
        <button
          className="job-card-action"
          onClick={e => {
            e.stopPropagation();
            onCardClick(job);
          }}
        >
          {t('btnViewDetails')} <i className="fas fa-external-link-alt"></i>
        </button>
      </div>
      <div className="job-tags">
        {job.tags.map(tag => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="job-card-meta-list">
        <p className="salary"><i className="fas fa-money-bill-wave"></i> {salary}</p>
        <p className="company-name"><i className="fas fa-building"></i> {job.company.name}</p>
        <p className="job-location"><i className="fas fa-map-marker-alt"></i> {job.location}</p>
      </div>
    </div>
  );
}

export default memo(JobCard);
