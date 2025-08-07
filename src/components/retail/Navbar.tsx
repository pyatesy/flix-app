import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeAssets } from '../../hooks/useThemeAssets';

const Navbar : React.FC = () => {
    const { logoUrl } = useThemeAssets();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Womens</a>
            </li>
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
                <li><div className='grid'>
                    <div className='col-12'>
                        <h3>Womens</h3>
                        <li><a className="dropdown-item" href="#">Suits</a></li>
                        <li><a className="dropdown-item" href="#">Evening Wear</a></li>
                        <li><a className="dropdown-item" href="#">Accessories</a></li>
                        <li><hr className="dropdown-divider" /></li>
                    </div>
                    <div className='col-12'></div>
                        <h3>Mens</h3>
                    </div>
                    <div className='col-12'>
                        <h3>Kids</h3>
                    </div>
                    <div className='col-12'>
                </div>
                </li>
              
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;