import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidePanel from './SidePanel';
import { useThemeAssets } from '../hooks/useThemeAssets';

const Header: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { logoUrl } = useThemeAssets();

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
                    <img src={logoUrl} alt="logo-img" width={100}/>
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
                      <li>
                        <Link to="/movies">Movies</Link>
                      </li>
                      {/*<li>
                        <Link to="/tv-shows">TV Shows</Link>
                      </li>
                      <li className="has-dropdown">
                        <Link to="/pages">Pages</Link>
                        <ul className="submenu">
                          <li><Link to="/about">About Us</Link></li>
                          <li><Link to="/team">Artist</Link></li>
                          <li><Link to="/pricing">Subscriptions</Link></li>
                          <li><Link to="/coming-soon">Coming Soon</Link></li>
                          <li><Link to="/login">Log In</Link></li>
                          <li><Link to="/404">Error 404</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/blog">Blog</Link>
                        <ul className="submenu">
                          <li><Link to="/blog">Blog</Link></li>
                          <li><Link to="/blog-details">Blog Details</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/contact">Contact Us</Link></li>*/}
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
                  <Link to="/pricing" className="theme-btn">
                    subscribe <div className="fas fa-gem"></div>
                  </Link>
                  <Link to="/login" className="theme-btn style-2">
                    sign in <div className="fas fa-user"></div>
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

export default Header; 