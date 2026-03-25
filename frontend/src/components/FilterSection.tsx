import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import type { JobFilter } from '../types';

interface Props {
  onFilter: (filters: JobFilter) => void;
}

export default function FilterSection({ onFilter }: Props) {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [showSecondary, setShowSecondary] = useState(false);
  const [salaryRange, setSalaryRange] = useState('');
  const [workType, setWorkType] = useState('');
  const [tag, setTag] = useState('');

  const buildFilters = (): JobFilter => {
    const filters: JobFilter = {};
    if (search) filters.search = search;
    if (location) filters.location = location;
    if (workType) filters.work_type = workType;
    if (tag) filters.tag = tag;
    if (salaryRange) {
      const ranges: Record<string, [number, number]> = {
        'below10m':   [0,         10000000],
        '10to20m':    [10000000,  20000000],
        '20to40m':    [20000000,  40000000],
        'above40m':   [40000000,  999000000],
      };
      const r = ranges[salaryRange];
      if (r) { filters.salary_min = r[0]; filters.salary_max = r[1]; }
    }
    return filters;
  };

  const handleSearch = () => onFilter(buildFilters());

  const handleClear = () => {
    setSearch('');
    setLocation('');
    setSalaryRange('');
    setWorkType('');
    setTag('');
    onFilter({});
  };

  return (
    <section className="filter-section">
      <div className="container">
        <div className="advanced-filter-box">
          <div className="filter-row-main">
            <div className="filter-select">
              <select value={tag} onChange={e => setTag(e.target.value)}>
                <option value="">{t('filterIndustry')}</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Kế toán">{t('optAccounting')}</option>
                <option value="Thiết kế">{t('optDesign')}</option>
                <option value="DevOps">DevOps</option>
                <option value="React">React</option>
              </select>
            </div>
            <div className="filter-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder={t('placeholderSearch')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="filter-select">
              <select value={location} onChange={e => setLocation(e.target.value)}>
                <option value="">{t('filterLocation')}</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
              </select>
            </div>
            <button className="btn-filter-search" onClick={handleSearch}>{t('btnSearch')}</button>
            <button className="btn-filter-toggle" onClick={() => setShowSecondary(!showSecondary)}>
              <i className="fas fa-sliders-h"></i> <span>{t('btnFilter')}</span>
            </button>
          </div>

          {showSecondary && (
            <div className="filter-row-secondary">
              <div className="filter-select">
                <select value={workType} onChange={e => { setWorkType(e.target.value); }}>
                  <option value="">{t('filterWorkType')}</option>
                  <option value="Toàn thời gian">{t('optFullTime')}</option>
                  <option value="Bán thời gian">{t('optPartTime')}</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="filter-select">
                <select value={salaryRange} onChange={e => setSalaryRange(e.target.value)}>
                  <option value="">{t('filterSalary')}</option>
                  <option value="below10m">{t('optBelow10m')}</option>
                  <option value="10to20m">{t('opt10to20m')}</option>
                  <option value="20to40m">{t('opt20to40m')}</option>
                  <option value="above40m">{t('optAbove40m')}</option>
                </select>
              </div>
              <button className="btn-clear-filter" onClick={handleClear}>{t('btnClearFilter')}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
