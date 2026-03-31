import { useLang } from '../contexts/LangContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/image/logon.png" alt="TOMGROUPVN" />
              <span className='footer-company-name'>TOM GROUP <span>Vietnam</span></span>
            </div>
            <p className="footer-slogan">{t('footerDesc')}</p>
            <div className="social-links">
              <a href="https://web.facebook.com/tuyendungtomgroup?_rdc=1&_rdr"><i className="fab fa-facebook"></i></a>
              <a href="https://www.youtube.com/@HQsing-Karaoke-Solutions"><i className="fab fa-youtube"></i></a>
              <a href="https://www.linkedin.com/in/tuyendungtomgroup/"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t('footerAbout')}</h4>
            <ul>
              <li><a href="#">{t('footerIntro')}</a></li>
              <li><a href="#">{t('footerContact')}</a></li>
              <li><a href="#">{t('footerBlog')}</a></li>
              <li><a href="#">{t('footerFaq')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footerForCandidate')}</h4>
            <ul>
              <li><a href="#">{t('footerFindJob')}</a></li>
              <li><a href="#">{t('footerCompany')}</a></li>
              <li><a href="#">{t('footerCvGuide')}</a></li>
              <li><a href="#">{t('footerCareerGuide')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footerForEmployer')}</h4>
            <ul>
              <li><a href="#">{t('footerPostJob')}</a></li>
              <li><a href="#">{t('footerFindCandidate')}</a></li>
              <li><a href="#">{t('footerPricing')}</a></li>
              <li><a href="#">{t('footerPartner')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footerCopyright')}</p>
          <p className="footer-address">
            <i className="fas fa-map-marker-alt"></i> 189C1/6 Nguyễn Văn Hưởng, Phường An Khánh, Thành phố Hồ Chí Minh
          </p>
          <div className="footer-links">
            <a href="#">{t('footerTerms')}</a>
            <a href="#">{t('footerPrivacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
