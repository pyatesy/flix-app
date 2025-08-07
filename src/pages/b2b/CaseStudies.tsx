import React from 'react';

const CaseStudies: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Global Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "Streamlined production processes across 15 facilities",
      solution: "Implemented our analytics platform to reduce downtime by 40%",
      results: "Increased efficiency by 35% and saved $2M annually",
      tags: ["Analytics", "Manufacturing", "Efficiency"]
    },
    {
      id: 2,
      title: "TechStart Solutions",
      industry: "Technology",
      challenge: "Scaling team collaboration for rapid growth",
      solution: "Deployed our collaboration suite for 500+ employees",
      results: "Improved project delivery time by 50%",
      tags: ["Collaboration", "Scaling", "Productivity"]
    },
    {
      id: 3,
      title: "Healthcare Partners Inc",
      industry: "Healthcare",
      challenge: "Securing patient data across multiple locations",
      solution: "Implemented our security suite with HIPAA compliance",
      results: "Achieved 99.9% uptime and zero security breaches",
      tags: ["Security", "Healthcare", "Compliance"]
    }
  ];

  return (
    <div className="case-studies-page">
      <div className="container">
        <div className="row mb-5">
          <div className="col">
            <h1 className="text-center mb-4">Case Studies</h1>
            <p className="text-center lead">
              Real results from real businesses using our solutions
            </p>
          </div>
        </div>

        <div className="row">
          {caseStudies.map((study) => (
            <div className="col-lg-4 col-md-6 mb-4" key={study.id}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <span className="badge bg-secondary me-2">{study.industry}</span>
                    {study.tags.map((tag, index) => (
                      <span className="badge bg-light text-dark me-1" key={index}>{tag}</span>
                    ))}
                  </div>
                  
                  <h5 className="card-title">{study.title}</h5>
                  
                  <div className="mb-3">
                    <h6 className="text-muted">Challenge</h6>
                    <p className="small">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-muted">Solution</h6>
                    <p className="small">{study.solution}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-success">Results</h6>
                    <p className="small fw-bold">{study.results}</p>
                  </div>
                  
                  <button className="btn btn-outline-primary btn-sm">Read Full Case Study</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col text-center">
            <h3>Ready to see similar results?</h3>
            <p className="lead">Let's discuss how our solutions can work for your business</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary">Request Demo</button>
              <button className="btn btn-outline-primary">Contact Sales</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies; 