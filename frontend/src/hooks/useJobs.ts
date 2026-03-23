import { useState, useEffect, useCallback } from 'react';
import type { Job, JobFilter } from '../types';
import { fetchHotJobs, fetchFeaturedJobs, fetchJobs } from '../services/api';

export function useJobs() {
  const [hotJobs, setHotJobs] = useState<Job[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [hot, featured] = await Promise.all([fetchHotJobs(5), fetchFeaturedJobs(6)]);
        if (!cancelled) {
          setHotJobs(hot);
          setFeaturedJobs(featured);
        }
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const searchJobs = useCallback(async (filters: JobFilter) => {
    setLoading(true);
    try {
      const result = await fetchJobs({ ...filters, page_size: 20 });
      setAllJobs(result.items);
      setTotal(result.total);
    } catch (err) {
      console.error('Failed to search jobs', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { hotJobs, featuredJobs, allJobs, loading, total, searchJobs };
}
