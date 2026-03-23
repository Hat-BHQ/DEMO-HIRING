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

  const handleSearch = () => {
    const filters: JobFilter = {};
    if (search) filters.search = search;
    if (location) filters.location = location;
    if (salaryRange) {
      const ranges: Record<string, [number, number]> = {
        'below500': [0, 500],
        '500to1000': [500, 1000],
        '1000to2000': [1000, 2000],
        'above2000': [2000, 100000],
      };
      const r = ranges[salaryRange];
      if (r) {
        filters.salary_min = r[0];
        filters.salary_max = r[1];
      }
    }
    onFilter(filters);
  };

  const handleClear = () => {
    setSearch('');
    setLocation('');
    setSalaryRange('');
    onFilter({});
  };

  return (
    <section className="filter-section">
      <div className="container">
        <div className="advanced-filter-box">
          <div className="filter-row-main">
            <div className="filter-select">
              <select defaultValue="">
                <option value="">{t('filterIndustry')}</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="accounting">{t('optAccounting')}</option>
                <option value="business">{t('optBusiness')}</option>
                <option value="design">{t('optDesign')}</option>
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
                <select defaultValue="">
                  <option value="">{t('filterWorkType')}</option>
                  <option value="fulltime">{t('optFullTime')}</option>
                  <option value="parttime">{t('optPartTime')}</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              <div className="filter-select">
                <select defaultValue="">
                  <option value="">{t('filterSector')}</option>
                  <option value="tech">{t('optTech')}</option>
                  <option value="business">{t('optBusiness')}</option>
                  <option value="operations">{t('optOperations')}</option>
                </select>
              </div>
              <div className="filter-select">
                <select value={salaryRange} onChange={e => setSalaryRange(e.target.value)}>
                  <option value="">{t('filterSalary')}</option>
                  <option value="below500">{t('optBelow500')}</option>
                  <option value="500to1000">{t('opt500to1000')}</option>
                  <option value="1000to2000">{t('opt1000to2000')}</option>
                  <option value="above2000">{t('optAbove2000')}</option>
                </select>
              </div>
              <div className="filter-select">
                <select defaultValue="">
                  <option value="">{t('filterOption')}</option>
                  <option value="bonus">{t('optBonus')}</option>
                  <option value="insurance">{t('optInsurance')}</option>
                  <option value="travel">{t('optTravel')}</option>
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
