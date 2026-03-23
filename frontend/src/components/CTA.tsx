import { useLang } from '../contexts/LangContext';

export default function CTA() {
  const { t } = useLang();

  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaDesc')}</p>
          <button className="btn-cta">{t('ctaBtn')}</button>
        </div>
      </div>
    </section>
  );
}
