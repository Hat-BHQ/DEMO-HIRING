import { useLang } from '../contexts/LangContext';
import WorkBag from '../assets/icons/WorkBag';
import Company from '../assets/icons/Company';
import People from '../assets/icons/People';
import ShakeHands from '../assets/icons/ShakeHands';

const stats = [
  { icon: WorkBag, value: '30+', key: 'statJobs' as const },
  { icon: Company, value: '5+', key: 'statCompanies' as const },
  { icon: People, value: '1.000+', key: 'statCandidates' as const },
  { icon: ShakeHands, value: '100+', key: 'statSuccess' as const },
];

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="stats" id="about">
      <div className="container">
        <div className="stats-grid">
          {stats.map(s => (
            <div className="stat-item" key={s.key}>
              <s.icon />
              <h3>{s.value}</h3>
              <p>{t(s.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
