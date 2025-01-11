// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faYoutube,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const LandingPageFooter = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={"/Logo.png"} alt="logo" className="img-one-logo" />
        </div>
        <div className="footer-icons">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
          <FontAwesomeIcon icon={faYoutube} size="2x" />
          <FontAwesomeIcon icon={faFacebookF} size="2x" />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Quality</span>
          <span>Help</span>
          <span>Share</span>
          {/* <span>Carrers</span> */}
          <span>Testimonials</span>
          {/* <span>Work</span> */}
        </div>
        <div className="footer-section-columns">
          <span>Contact Us</span>
          <span>+91 9535430817</span>
          <span>1by22cs108@bmsit.in</span>
          <span>1by22cs122@bmsit.in</span>
          <span>1by22cs123@bmsit.in</span>
          <span>1by22cs138@bmsit.in</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooter;
