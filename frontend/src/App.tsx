import { useState, useCallback } from 'react';
import type { Job, JobFilter } from './types';
import { useLang } from './contexts/LangContext';
import { useJobs } from './hooks/useJobs';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FilterSection from './components/FilterSection';
import HotJobCard from './components/HotJobCard';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import ApplyModal from './components/ApplyModal';
import Footer from './components/Footer';
import SuccessToast from './components/SuccessToast';

export default function App() {
  const { t } = useLang();
  const {
    hotJobs, hotTotal, loadMoreHotJobs, loadingMoreHot,
    featuredJobs, featuredTotal, loadMoreFeaturedJobs, loadingMoreFeatured,
    allJobs, total, searchJobs,
  } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filtered, setFiltered] = useState(false);

  const handleFilter = useCallback((filters: JobFilter) => {
    const hasFilters = Object.values(filters).some(v => v !== undefined && v !== '');
    setFiltered(hasFilters);
    if (hasFilters) {
      searchJobs(filters);
    } else {
      setFiltered(false);
    }
  }, [searchJobs]);

  const handleSuccess = useCallback(() => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  }, []);

  const defaultJobs = featuredJobs.length > 0 ? featuredJobs : allJobs;
  const defaultTotal = featuredJobs.length > 0 ? featuredTotal : total;

  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <FilterSection onFilter={handleFilter} />

      {filtered && allJobs.length > 0 && (
        <section className="jobs">
          <div className="container">
            <div className="section-header">
              <h2>{t('btnSearch')} ({allJobs.length})</h2>
            </div>
            <div className="jobs-grid">
              {allJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onCardClick={setSelectedJob}
                  onApplyClick={setApplyJob}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {!filtered && (
        <>
          {/* Hot Jobs */}
          <section className="hot-jobs">
            <div className="container">
              <div className="section-header">
                <h2>{t('hotJobsTitle')} <span className="highlight">{t('hotJobsHighlight')}</span></h2>
                <p>{t('hotJobsSubtitle')}</p>
              </div>
              <div className="hot-jobs-list">
                {hotJobs.map(job => (
                  <HotJobCard
                    key={job.id}
                    job={job}
                    onCardClick={setSelectedJob}
                    onApplyClick={setApplyJob}
                  />
                ))}
              </div>
              {hotJobs.length < hotTotal && (
                <div className="load-more">
                  <button className="btn-load-more" onClick={loadMoreHotJobs} disabled={loadingMoreHot}>
                    {loadingMoreHot ? <><i className="fas fa-spinner fa-spin"></i> Đang tải...</> : t('btnSeeMoreHot')}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Featured Jobs */}
          <section className="jobs" id="jobs">
            <div className="container">
              <div className="section-header">
                <h2>{t('featuredJobsTitle')} <span className="highlight">{t('featuredJobsHighlight')}</span></h2>
                <p>{t('featuredJobsSubtitle')}</p>
              </div>
              <div className="jobs-grid">
                {defaultJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onCardClick={setSelectedJob}
                    onApplyClick={setApplyJob}
                  />
                ))}
              </div>
              {featuredJobs.length > 0 && featuredJobs.length < defaultTotal && (
                <div className="load-more">
                  <button className="btn-load-more" onClick={loadMoreFeaturedJobs} disabled={loadingMoreFeatured}>
                    {loadingMoreFeatured ? <><i className="fas fa-spinner fa-spin"></i> Đang tải...</> : t('btnSeeMore')}
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={job => { setSelectedJob(null); setApplyJob(job); }}
        />
      )}

      {applyJob && (
        <ApplyModal
          job={applyJob}
          onClose={() => setApplyJob(null)}
          onSuccess={handleSuccess}
        />
      )}

      <SuccessToast visible={showSuccess} />
    </>
  );
}
