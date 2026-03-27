import { useLang } from '../contexts/LangContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <img src="/image/logon.png" alt="TOMGROUPVN" className="logo-img" />
            <div className="logo-text">
              <div className="logo-brand">TOM GROUP<br /><span>Vietnam</span></div>
            </div>
          </div>
          <div className="nav-right-wrapper">
            <div className="logo-slogan">Engineering Sound for the U.S Market</div>
            <div className="nav-controls">
              <button className="btn-lang-toggle" onClick={toggleLang}>
                {lang === 'vi' ? 'EN' : 'VI'}
              </button>
              <button className="btn-theme-toggle" onClick={toggleTheme}>
                <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
