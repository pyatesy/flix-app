import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidePanel from '../SidePanel';
import { useThemeAssets } from '../../hooks/useThemeAssets';
import { useMenuConfig } from '../../hooks/useMenuConfig';
import '../../styles/retail/retail.css';

const RetailHeader: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { logoUrl } = useThemeAssets();
  
  // Get menu configuration
  const menuConfig = useMenuConfig();

  // Check localStorage for initial state on mount
  useEffect(() => {
    const shouldOpenPanel = localStorage.getItem('sidePanelOpen') === 'true';
    if (shouldOpenPanel) {
      setIsPanelOpen(true);
      localStorage.removeItem('sidePanelOpen');
    }
    
    // Mock cart count - in real app this would come from cart context
    setCartCount(3);
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  
  return (  
    <>
    
      <header className="retail-header">
        <div className="container-fluid navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="header-left">
                <div className="logo">
                  <Link to="/" className="header-logo">
                    <img src={logoUrl} alt="logo-img" width={100}/>
                  </Link>
                </div>
        </div>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            
            {/* Dynamic top-level menu items */}
            {menuConfig.topLevelItems.map((menuItem) => (
              <li key={menuItem.id} className="nav-item">
                <a className="nav-link" href={`/category/${menuItem.slug}`}>
                  {menuItem.name}
                </a>
              </li>
            ))}
            
            {/* Categories dropdown with all categories */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {menuConfig.categories.map((category) => (
                  <li key={category.id}>
                    <div className="dropdown-section">
                      <h6 className="dropdown-header">{category.name}</h6>
                      {category.children && category.children.map((child) => (
                        <a key={child.id} className="dropdown-item" href={`/category/${child.slug}`}>
                          {child.name}
                        </a>
                      ))}
                      {category.children && category.children.length > 0 && (
                        <hr className="dropdown-divider" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
                  <Link to="/account" className="nav-link">
                    <i className="fa-solid fa-user-circle fa-2x"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link sidebar__toggle" onClick={togglePanel}>
                    <i className="fa-solid fa-bars fa-2x"></i>
                  </div>
                </li>
            </ul>
        </div>
      </div>
    </nav>

        </div>

      </header>
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
};

export default RetailHeader; 