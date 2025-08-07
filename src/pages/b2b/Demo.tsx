import React from 'react';

const Demo: React.FC = () => {
  return (
    <div className="demo-page">
      <div className="container">
        <div className="row mb-5">
          <div className="col">
            <h1 className="text-center mb-4">Request a Demo</h1>
            <p className="text-center lead">
              See our solutions in action with a personalized demonstration
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="mb-4">What You'll See</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Live Platform Walkthrough</strong><br />
                    <small className="text-muted">See our solutions in real-time with your data</small>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Custom Use Cases</strong><br />
                    <small className="text-muted">Tailored to your specific business needs</small>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Integration Examples</strong><br />
                    <small className="text-muted">How our solutions work with your existing tools</small>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Q&A Session</strong><br />
                    <small className="text-muted">Get answers to your specific questions</small>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Next Steps Planning</strong><br />
                    <small className="text-muted">Clear roadmap for implementation</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="mb-4">Schedule Your Demo</h3>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input type="text" className="form-control" placeholder="Enter your first name" required />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input type="text" className="form-control" placeholder="Enter your last name" required />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>Email *</label>
                        <input type="email" className="form-control" placeholder="Enter your email" required />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" className="form-control" placeholder="Enter your phone number" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>Company *</label>
                        <input type="text" className="form-control" placeholder="Enter your company name" required />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>Company Size</label>
                        <select className="form-select">
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-1000">201-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label>Primary Interest *</label>
                    <select className="form-select" required>
                      <option value="">Select your primary interest</option>
                      <option value="analytics">Analytics Platform</option>
                      <option value="collaboration">Team Collaboration</option>
                      <option value="security">Security Suite</option>
                      <option value="integration">Custom Integration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>Preferred Demo Date</label>
                    <input type="date" className="form-control" />
                  </div>

                  <div className="form-group mb-3">
                    <label>Additional Notes</label>
                    <textarea className="form-control" rows={3} placeholder="Tell us about your specific needs..."></textarea>
                  </div>

                  <button className="btn btn-primary btn-lg w-100" type="submit">
                    Schedule Demo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <div className="alert alert-info">
              <h5><i className="fas fa-info-circle me-2"></i>Demo Details</h5>
              <ul className="mb-0">
                <li>Demos typically last 30-45 minutes</li>
                <li>No commitment required - this is purely educational</li>
                <li>We'll send you a calendar invite with video conference details</li>
                <li>You can reschedule up to 24 hours before your demo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <h3>Can't wait for a demo?</h3>
            <p className="lead">Check out our self-service resources</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-outline-primary">Watch Video Tutorials</button>
              <button className="btn btn-outline-primary">Download Brochure</button>
              <button className="btn btn-outline-primary">Read Documentation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo; 