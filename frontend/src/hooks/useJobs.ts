import { useState, useEffect, useCallback } from 'react';
import type { Job, JobFilter } from '../types';
import { fetchHotJobs, fetchFeaturedJobs, fetchJobs } from '../services/api';

const HOT_PAGE = 6;
const FEATURED_PAGE = 6;

export function useJobs() {
  const [hotJobs, setHotJobs] = useState<Job[]>([]);
  const [hotTotal, setHotTotal] = useState(0);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [featuredTotal, setFeaturedTotal] = useState(0);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [loadingMoreHot, setLoadingMoreHot] = useState(false);
  const [loadingMoreFeatured, setLoadingMoreFeatured] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [hot, featured] = await Promise.all([
          fetchHotJobs(HOT_PAGE, 0),
          fetchFeaturedJobs(FEATURED_PAGE, 0),
        ]);
        if (!cancelled) {
          setHotJobs(hot.items);
          setHotTotal(hot.total);
          setFeaturedJobs(featured.items);
          setFeaturedTotal(featured.total);
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

  const loadMoreHotJobs = useCallback(async () => {
    setLoadingMoreHot(true);
    try {
      const res = await fetchHotJobs(HOT_PAGE, hotJobs.length);
      setHotJobs(prev => {
        const existingIds = new Set(prev.map(j => j.id));
        const newItems = res.items.filter(j => !existingIds.has(j.id));
        return [...prev, ...newItems];
      });
      setHotTotal(res.total);
    } catch (err) {
      console.error('Failed to load more hot jobs', err);
    } finally {
      setLoadingMoreHot(false);
    }
  }, [hotJobs.length]);

  const loadMoreFeaturedJobs = useCallback(async () => {
    setLoadingMoreFeatured(true);
    try {
      const res = await fetchFeaturedJobs(FEATURED_PAGE, featuredJobs.length);
      setFeaturedJobs(prev => {
        const existingIds = new Set(prev.map(j => j.id));
        const newItems = res.items.filter(j => !existingIds.has(j.id));
        return [...prev, ...newItems];
      });
      setFeaturedTotal(res.total);
    } catch (err) {
      console.error('Failed to load more featured jobs', err);
    } finally {
      setLoadingMoreFeatured(false);
    }
  }, [featuredJobs.length]);

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

  return {
    hotJobs, hotTotal, loadMoreHotJobs, loadingMoreHot,
    featuredJobs, featuredTotal, loadMoreFeaturedJobs, loadingMoreFeatured,
    allJobs, loading, total, searchJobs,
  };
}
