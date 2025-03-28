// src/components/About.jsx
import React from "react";
import aboutus from '../../assets/images/about.jpg'

const About = () => {
  return (
    <>
     
      {/* About Section Start */}
      <div id="about" className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Image Section */}
            <div className="col-lg-6">
              <div className="about-img position-relative overflow-hidden p-5 pe-0">
                <img className="img-fluid w-100" src={aboutus} alt="About Us" />
              </div>
            </div>

            {/* Text Section */}
            <div className="col-lg-6">
              <h1 className="display-5 mb-4">Fresh, Healthy, and Farm-Direct Produce</h1>
              <p className="mb-4">
                Experience the goodness of naturally grown crops delivered directly from trusted farmers.
                Our platform ensures quality, freshness, and fair pricing for every product.
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Directly sourced from local farmers
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>High-quality, pesticide-free products
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Supporting sustainable farming communities
              </p>

              <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="#read-more">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About Section End */}
    </>
  );
};

export default About;
