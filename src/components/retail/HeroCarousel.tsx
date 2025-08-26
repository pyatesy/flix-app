import React from 'react';

const HeroCarousel: React.FC = () => {
//const HeroCarousel = () => {
  return (
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#heroCarousel" data-bs-slide-to="1"></li>
        <li data-bs-target="#heroCarousel" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
            <div className="row">
                <div className="col-md-6">
                        <img className="d-block w-100" src="https://images3.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/ce05032063c211f09ca7eac7851c45ec" alt="First slide" />
                </div>
                <div className="col-md-6">                   
                    <div className="carousel-caption-right d-inline-block w-100 h-50 text-center p-5">
                        <h2 className="d-block w-100 mt-2 fs-6">The Etheral Bloom Gown</h2>
                        <p>Step into a dream with The Ethereal Bloom Gown, a bridal masterpiece that whispers tales of delicate beauty and timeless romance. Crafted from the purest white fabrics, this gown is adorned with transparent flower patterns that gracefully unfurl across its entire design, creating an illusion of blossoms dancing on air. Each petal and vine is meticulously woven, allowing the gown to capture and reflect light with an enchanting subtlety. The silhouette is designed to flow effortlessly, embracing the figure with a gentle grace that is both regal and ethereal. The Ethereal Bloom Gown is more than just a dress; it is a poetic expression of love, a celebration of natural beauty, and a testament to the artistry of haute couture, ensuring your walk down the aisle is nothing short of magical.</p>
                        <button className="btn btn-primary w-100">Shop Now</button>
                    </div>
                    <img className="d-inline-block w-50" src="https://images1.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/cdfd85be63c211f0ad657614976283e1" alt="Second Image" />
                    <img className="d-inline-block w-50" src="https://images4.cmp.optimizely.com/assets/The+Etheral+Bloom+Gown/cddbbd4e63c211f090590630c286bea8" alt="Second Image" />
                </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-50" src="https://images2.cmp.optimizely.com/assets/black-dress.png/Zz01NmQwZjI3NDYxOGMxMWYwYmQ0ZDlhOWQyZWFjYzViMQ==" alt="Second slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Unleash Your Potential</h5>
            <p>Tools for every need.</p>
          </div>
        </div>

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;