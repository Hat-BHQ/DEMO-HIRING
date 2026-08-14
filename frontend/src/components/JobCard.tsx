import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import type { Job } from '../types';
import Currency from '../assets/icons/Currency';
import Building from '../assets/icons/Building';
import MarkerPin from '../assets/icons/MarkerPin';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

interface Props {
  job: Job;
  isHot?: boolean;
}

function JobCard({ job, isHot = false }: Props) {
  const { t } = useLang();

  const salary = `${(job.salary_min / 1000000).toLocaleString('vi-VN')} - ${(job.salary_max / 1000000).toLocaleString('vi-VN')} triệu`;

  return (
    <Link to={`/jobs/${job.id}`} className="job-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="job-card-top">
        <div className="job-card-title-wrap">
          <h3>{job.title}</h3>
          {job.badge && (
            <div className={`job-badge${job.badge === 'hot' ? ' hot' : ''}`}>
              {job.badge === 'hot' ? 'Hot' : t('badgeNew')}
            </div>
          )}
        </div>
        <div className="job-card-action">
          {t('btnViewDetails')} <HiOutlineArrowUpRight />
        </div>
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
    </Link>
  );
}

export default memo(JobCard);
