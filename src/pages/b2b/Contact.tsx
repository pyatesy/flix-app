import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="row mb-5">
          <div className="col">
            <h1 className="text-center mb-4">Contact Us</h1>
            <p className="text-center lead">
              Ready to transform your business? Let's start a conversation.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="mb-4">Get in Touch</h3>
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
                        <label>Job Title</label>
                        <input type="text" className="form-control" placeholder="Enter your job title" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label>How can we help? *</label>
                    <select className="form-select" required>
                      <option value="">Select an option</option>
                      <option value="demo">Request a Demo</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label>Message *</label>
                    <textarea className="form-control" rows={5} placeholder="Tell us about your needs..." required></textarea>
                  </div>

                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="marketing" />
                      <label className="form-check-label" htmlFor="marketing">
                        I agree to receive marketing communications
                      </label>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg" type="submit">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h4>Contact Information</h4>
                <div className="mb-3">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <strong>Address:</strong><br />
                  123 Business Park Drive<br />
                  Suite 100<br />
                  San Francisco, CA 94105
                </div>
                <div className="mb-3">
                  <i className="fas fa-phone text-primary me-2"></i>
                  <strong>Phone:</strong><br />
                  +1 (555) 123-4567
                </div>
                <div className="mb-3">
                  <i className="fas fa-envelope text-primary me-2"></i>
                  <strong>Email:</strong><br />
                  sales@company.com
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h4>Business Hours</h4>
                <div className="mb-2">
                  <strong>Monday - Friday:</strong><br />
                  9:00 AM - 6:00 PM PST
                </div>
                <div className="mb-2">
                  <strong>Saturday:</strong><br />
                  10:00 AM - 2:00 PM PST
                </div>
                <div>
                  <strong>Sunday:</strong><br />
                  Closed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 