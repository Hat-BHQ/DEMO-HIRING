import { useState, useCallback } from 'react';
import type { JobFilter } from './types';
import { useLang } from './contexts/LangContext';
import { useJobs } from './hooks/useJobs';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FilterSection from './components/FilterSection';
import JobCard from './components/JobCard';
import Footer from './components/Footer';
import { HiOutlineChevronDown } from 'react-icons/hi2';

export default function App() {
  const { t } = useLang();
  const {
    hotJobs, hotTotal, loadMoreHotJobs, loadingMoreHot,
    featuredJobs, featuredTotal, loadMoreFeaturedJobs, loadingMoreFeatured,
    allJobs, searchJobs,
  } = useJobs();

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
                {/* <p>{t('hotJobsSubtitle')}</p> */}
              </div>
              <div className="hot-jobs-list">
                {hotJobs.length === 0 ? (
                  <p className="jobs-empty-hint">{t('hotJobsEmpty')}</p>
                ) : (
                  hotJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                    />
                  ))
                )}
              </div>
              {hotJobs.length < hotTotal && (
                <div className="load-more">
                  <button className="btn-load-more" onClick={loadMoreHotJobs} disabled={loadingMoreHot}>
                    {loadingMoreHot ? <><i className="fas fa-spinner fa-spin"></i> Đang tải...</> : <>{t('btnSeeMoreHot')} <HiOutlineChevronDown />
                    </>}

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
                {/* <p>{t('featuredJobsSubtitle')}</p> */}
              </div>
              <div className="jobs-grid">
                {featuredJobs.length === 0 ? (
                  <p className="jobs-empty-hint jobs-empty-hint--full">{t('featuredJobsEmpty')}</p>
                ) : (
                  featuredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isHot={true}
                    />
                  ))
                )}
              </div>
              {featuredJobs.length > 0 && featuredJobs.length < featuredTotal && (
                <div className="load-more">
                  <button className="btn-load-more" onClick={loadMoreFeaturedJobs} disabled={loadingMoreFeatured}>
                    {loadingMoreFeatured ? <><i className="fas fa-spinner fa-spin"></i> Đang tải...</> : <>{t('btnSeeMore')}<HiOutlineChevronDown /></>}
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
