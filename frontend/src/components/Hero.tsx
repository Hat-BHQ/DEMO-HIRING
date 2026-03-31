import { useState, useEffect, useCallback } from 'react';
import { useLang } from '../contexts/LangContext';

const slides = ['/image/hcm01.jpg', '/image/hcm02.jpg'];

export default function Hero() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero" id="home">
      <div className="hero-slides">
        {slides.map((src, i) => (
          <div
            key={src}
            className={`hero-slide${i === current ? ' active' : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('heroTitle')}<br />
            <span className="highlight">{t('heroTitleHighlight')}</span> {t('heroTitleSuffix')}
          </h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
          <button className="btn-visit-us">
            {t('visitUs')} <i className="fas fa-arrow-right"></i>
          </button>
          <div className="hero-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.youtube.com/@HQsing-Karaoke-Solutions" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
}
