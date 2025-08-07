import React from 'react';

const Solutions: React.FC = () => {
  return (
    <div className="solutions-page">
      <div className="container">
        <div className="row mb-5">
          <div className="col">
            <h1 className="text-center mb-4">Our Solutions</h1>
            <p className="text-center lead">
              Discover how our enterprise solutions can transform your business
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-chart-line fa-3x text-primary"></i>
                </div>
                <h5 className="card-title">Analytics Platform</h5>
                <p className="card-text">
                  Advanced analytics and reporting tools to drive data-driven decisions.
                </p>
                <button className="btn btn-outline-primary">Learn More</button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-users fa-3x text-primary"></i>
                </div>
                <h5 className="card-title">Team Collaboration</h5>
                <p className="card-text">
                  Streamline communication and project management across your organization.
                </p>
                <button className="btn btn-outline-primary">Learn More</button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className="fas fa-shield-alt fa-3x text-primary"></i>
                </div>
                <h5 className="card-title">Security Suite</h5>
                <p className="card-text">
                  Enterprise-grade security solutions to protect your valuable data.
                </p>
                <button className="btn btn-outline-primary">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Custom Integration</h5>
                <p className="card-text">
                  Tailored solutions that integrate seamlessly with your existing infrastructure.
                </p>
                <button className="btn btn-primary">Request Demo</button>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">24/7 Support</h5>
                <p className="card-text">
                  Round-the-clock technical support and dedicated account management.
                </p>
                <button className="btn btn-primary">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions; 