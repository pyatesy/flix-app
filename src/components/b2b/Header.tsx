import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidePanel from '../SidePanel';
import { useThemeAssets } from '../../hooks/useThemeAssets';
import '../../styles/b2b/b2b.css';

const B2BHeader: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { logoUrl } = useThemeAssets();

  // Check localStorage for initial state on mount
  useEffect(() => {
    const shouldOpenPanel = localStorage.getItem('sidePanelOpen') === 'true';
    if (shouldOpenPanel) {
      setIsPanelOpen(true);
      localStorage.removeItem('sidePanelOpen');
    }
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      <header className="header-1">
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main style-2">
              <div className="header-left">
                <div className="logo">
                  <Link to="/" className="header-logo">
                    <img src={logoUrl} alt="Enterprise Solutions" width={100}/>
                  </Link>
                </div>
              </div>
              <div className="mean__menu-wrapper">
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul>
                      <li className="has-dropdown active">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="has-dropdown">
                        <Link to="/solutions">Solutions</Link>
                        <ul className="submenu">
                          <li><Link to="/solutions/enterprise">Enterprise</Link></li>
                          <li><Link to="/solutions/smb">SMB</Link></li>
                          <li><Link to="/solutions/startup">Startup</Link></li>
                          <li><Link to="/solutions/industry">Industry Solutions</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/case-studies">Case Studies</Link>
                      </li>
                      <li>
                        <Link to="/resources">Resources</Link>
                      </li>
                      <li>
                        <Link to="/pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
             <div className="header-right d-flex justify-content-end align-items-center">
                <div className="tp-header-search d-none d-md-flex">
                  <button className="d-flex align-items-center tp-search-toggle">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
                <div className="header-button">
                  <Link to="/demo" className="theme-btn">
                    <i className="fas fa-play"></i> Request Demo
                  </Link>
                  <Link to="/contact" className="theme-btn style-2">
                    <i className="fas fa-phone"></i> Contact Sales
                  </Link>
                </div>
                <div className="header__hamburger">
                  <div className="sidebar__toggle" onClick={togglePanel}>
                    <i className="fas fa-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
};

export default B2BHeader; 