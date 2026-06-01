import { memo } from 'react';
import { useLang } from '../contexts/LangContext';
import type { Job } from '../types';
import Currency from '../assets/icons/Currency';
import Building from '../assets/icons/Building';
import MarkerPin from '../assets/icons/MarkerPin';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

interface Props {
  job: Job;
  onCardClick: (job: Job) => void;
  onApplyClick: (job: Job) => void;
  isHot?: boolean;
}

function JobCard({ job, onCardClick, onApplyClick: _onApplyClick, isHot = false }: Props) {
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
          {t('btnViewDetails')} <HiOutlineArrowUpRight />
        </button>
      </div>
      <div className="job-tags">
        {job.tags.map(tag => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="job-card-meta-list">
        <div style={{ display: 'flex', gap: !isHot ? '10px' : '16px', flexDirection: !isHot ? 'column' : 'row' }}>
          <p className="salary">
            <Currency />
            {salary}</p>
          <p className="company-name"><Building /> {job.company.name}</p>
        </div>
        <p className="job-location"><MarkerPin /> {job.location}</p>
      </div>
    </div>
  );
}

export default memo(JobCard);
