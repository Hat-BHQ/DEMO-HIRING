import { useLang } from '../contexts/LangContext';

const stats = [
  { icon: 'fas fa-briefcase', value: '2,500+', key: 'statJobs' as const },
  { icon: 'fas fa-building', value: '800+', key: 'statCompanies' as const },
  { icon: 'fas fa-users', value: '50,000+', key: 'statCandidates' as const },
  { icon: 'fas fa-handshake', value: '10,000+', key: 'statSuccess' as const },
];

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map(s => (
            <div className="stat-item" key={s.key}>
              <i className={s.icon}></i>
              <h3>{s.value}</h3>
              <p>{t(s.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
