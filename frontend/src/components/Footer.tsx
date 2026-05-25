import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useLang();
  const [copiedField, setCopiedField] = useState<'mail' | 'hotline' | null>(null);
  const buildMapUrl = (destination: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  const mainOfficeAddress = '189C1/6 Nguyễn Văn Hưởng, P.Thảo Điền, Hồ Chí Minh, Việt Nam';
  const factoryOfficeAddress = '199M Nguyễn Văn Hưởng, P.Thảo Điền, Hồ Chí Minh, Việt Nam';

  // When Google Maps resolves duplicate addresses incorrectly, replace these URLs
  // with the exact share links copied from the correct pin on Google Maps.
  const mainOfficeExactMapUrl = 'https://maps.app.goo.gl/7SApJby6RQEyJudk8';
  const factoryOfficeExactMapUrl = 'https://maps.app.goo.gl/nWZjGxHF5h9T2QVu7';

  const mainOfficeMapUrl = mainOfficeExactMapUrl || buildMapUrl(mainOfficeAddress);
  const factoryOfficeMapUrl = factoryOfficeExactMapUrl || buildMapUrl(factoryOfficeAddress);

  const copyToClipboard = async (value: string, field: 'mail' | 'hotline') => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopiedField(field);
      window.setTimeout(() => setCopiedField(current => (current === field ? null : current)), 1800);
    } catch {
      setCopiedField(null);
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <img src="/image/logon.png" alt="TOMGROUPVN" />
              <span className="footer-company-name">TOM GROUP <span>Vietnam</span></span>
            </div>
            <p className="footer-slogan">{t('footerDesc')}</p>
            <div className="social-links">
              <a href="https://web.facebook.com/tuyendungtomgroup?_rdc=1&_rdr" className="facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://www.youtube.com/@HQsing-Karaoke-Solutions" className="youtube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              <a href="https://www.linkedin.com/in/tuyendungtomgroup/" className="linkedin" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t('footerAbout')}</h4>
            <ul>
              <li><Link to="/about">{t('footerIntro')}</Link></li>
              <li><a href="#contact">{t('footerContact')}</a></li>
              <li><a href="#">{t('footerBlog')}</a></li>
              <li><a href="#">{t('footerFaq')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footerForCandidate')}</h4>
            <ul>
              <li><a href="#jobs">{t('footerFindJob')}</a></li>
              <li><a href="#">{t('footerCompany')}</a></li>
              <li><a href="#">{t('footerCvGuide')}</a></li>
              <li><a href="#">{t('footerCareerGuide')}</a></li>
            </ul>
          </div>
          <div className="footer-col footer-contact-col">
            <h4>{t('footerContact')}</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><i className="fas fa-envelope"></i></span>
                <p className="footer-contact-text">
                  <strong>{t('footerMailLabel')}</strong>{' '}
                  <button
                    type="button"
                    className="footer-copy-btn"
                    onClick={() => copyToClipboard(t('footerMailValue'), 'mail')}
                    aria-label="Copy email"
                  >
                    {t('footerMailValue')}
                  </button>
                  {copiedField === 'mail' && <span className="footer-copy-status">Đã copy</span>}
                </p>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><i className="fas fa-phone-alt"></i></span>
                <p className="footer-contact-text">
                  <strong>{t('footerHotlineLabel')}</strong>{' '}
                  <button
                    type="button"
                    className="footer-copy-btn"
                    onClick={() => copyToClipboard(t('footerHotlineValue'), 'hotline')}
                    aria-label="Copy hotline"
                  >
                    {t('footerHotlineValue')}
                  </button>
                  {copiedField === 'hotline' && <span className="footer-copy-status">Đã copy</span>}
                </p>
              </div>
              <div className="footer-contact-item footer-contact-item--top">
                <span className="footer-contact-icon"><i className="fas fa-map-marker-alt"></i></span>
                <div className="footer-contact-text footer-contact-addresses">
                  <p><strong>{t('footerOfficeLabel')}</strong></p>
                  <p>
                    <strong>{t('footerOfficeMainLabel')}</strong>{' '}
                    <a href={mainOfficeMapUrl} target="_blank" rel="noopener noreferrer" className="footer-map-link">
                      {t('footerOfficeMainValue')}
                    </a>
                  </p>
                  <p>
                    <strong>{t('footerOfficeFactoryLabel')}</strong>{' '}
                    <a href={factoryOfficeMapUrl} target="_blank" rel="noopener noreferrer" className="footer-map-link">
                      {t('footerOfficeFactoryValue')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footerCopyright')}</p>
          <div className="footer-links">
            <a href="#">{t('footerTerms')}</a>
            <a href="#">{t('footerPrivacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
