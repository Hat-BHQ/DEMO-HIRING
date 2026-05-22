import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [clickedMenu, setClickedMenu] = useState<'home' | 'about' | null>(null);
  const [showPlatformMenu, setShowPlatformMenu] = useState(false);
  const platformMenuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (menu: 'home' | 'about') => (_e: ReactMouseEvent<HTMLAnchorElement>) => {
    setClickedMenu(menu);

    window.setTimeout(() => {
      setClickedMenu(null);
    }, 220);
  };

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const node = platformMenuRef.current;
      if (!node) {
        return;
      }

      if (!node.contains(event.target as Node)) {
        setShowPlatformMenu(false);
      }
    };

    if (showPlatformMenu) {
      document.addEventListener('mousedown', onPointerDown);
    }

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [showPlatformMenu]);

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <NavLink to="/" className="logo" aria-label="Trang chủ">
            <img src="/image/logon.png" alt="TOMGROUPVN" className="logo-img" />
            <div className="logo-text">
              <div className="logo-brand">TOM GROUP<br /><span>Vietnam</span></div>
            </div>
          </NavLink>
          <nav className="nav-menu" aria-label="Main menu">
            <ul>
              <li className="nav-item-home">
                <NavLink
                  to="/"
                  end
                  onClick={handleMenuClick('home')}
                  className={({ isActive }) => `${isActive ? 'active' : ''} ${clickedMenu === 'home' ? 'clicked' : ''}`.trim()}
                >
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={handleMenuClick('about')}
                  className={({ isActive }) => `${isActive ? 'active' : ''} ${clickedMenu === 'about' ? 'clicked' : ''}`.trim()}
                >
                  Giới thiệu
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="nav-right-wrapper">
            <div className="logo-slogan">Engineering Sound for the U.S Market</div>
            <div className="header-tools-row">
              <div className="header-socials">
                <a
                  href="https://web.facebook.com/tuyendungtomgroup?_rdc=10&_rdr#"
                  className="facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.youtube.com/@HQsing-Karaoke-Solutions"
                  className="youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/tuyendungtomgroup/"
                  className="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>

              <div className="mobile-platform-menu" ref={platformMenuRef}>
                <button
                  type="button"
                  className="mobile-platform-toggle"
                  aria-label="Mở danh sách nền tảng"
                  aria-expanded={showPlatformMenu}
                  onClick={() => setShowPlatformMenu(current => !current)}
                >
                  <i className="fas fa-globe"></i>
                </button>

                {showPlatformMenu && (
                  <div className="mobile-platform-dropdown" role="menu" aria-label="Nền tảng mạng xã hội">
                    <a
                      href="https://web.facebook.com/tuyendungtomgroup?_rdc=10&_rdr#"
                      className="platform-link facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setShowPlatformMenu(false)}
                    >
                      <i className="fab fa-facebook-f"></i>
                      <span>Facebook</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@HQsing-Karaoke-Solutions"
                      className="platform-link youtube"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setShowPlatformMenu(false)}
                    >
                      <i className="fab fa-youtube"></i>
                      <span>YouTube</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/tuyendungtomgroup/"
                      className="platform-link linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setShowPlatformMenu(false)}
                    >
                      <i className="fab fa-linkedin-in"></i>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
