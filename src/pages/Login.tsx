import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeAssets } from '../hooks/useThemeAssets';

const Login: React.FC = () => {
  const { logoUrl, breadcrumbBackgroundUrl } = useThemeAssets();

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="breadcrumb-wrapper bg-cover" style={{ backgroundImage: `url(${breadcrumbBackgroundUrl})` }}>
        <div className="container-fluid">
          <div className="page-heading">
            <div className="page-header-left">
              <div className="logo">                  
                <img src={logoUrl} alt="img" width={300}/>
              </div>
              <h1 className="wow fadeInUp" data-wow-delay=".3s">Log in</h1>
              <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-house"></i>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-slash-forward"></i>
                </li>
                <li>
                  Log in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Section */}
      <section className="login-section section-padding pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="login-wrapper">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="sign-img">
                      <img src="/assets/img/sign-img.png" alt="img" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="signin-item">
                      <div className="logo">
                        <img src="/assets/img/logo/white-logo.svg" alt="img" />
                      </div>
                      <div className="sign-header">
                        <h3>Welcome Back</h3>
                        <p>Please Enter Your Details</p>
                      </div>
                      <form action="#">
                        <div className="input-item">
                          <input id="email" type="email" placeholder="Email" />
                        </div>
                        <div className="input-item">
                          <input id="password" type="password" placeholder="Password" />
                        </div>
                        <div className="form-check">
                          <div className="">
                            <input id="reviewcheck" name="reviewcheck" type="checkbox" />
                            <label className="form-check-label" htmlFor="reviewcheck">
                              Remember For 30 days
                            </label>
                          </div>
                          <span>Forgot Password?</span>
                        </div>
                        <div className="button-items">
                          <button type="submit" className="theme-btn">Log In</button>
                          <button type="submit" className="theme-btn style-2">
                            <img src="/assets/img/google.png" alt="img" /> Log In With Google
                          </button>
                        </div>
                        <h6>Don't have an account? <Link to="/signup">Sign Up</Link></h6>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login; 