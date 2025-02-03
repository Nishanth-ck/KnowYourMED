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
    <div className="footer-wrapper1">
      <div className="footer-section-one1">
        <div className="footer-logo-container1">
          <img src={"/logo3.jpg"} alt="logo" className="img-footer-logo" />
        </div>
        <div className="footer-icons1">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
          <FontAwesomeIcon icon={faYoutube} size="2x" />
          <FontAwesomeIcon icon={faFacebookF} size="2x" />
        </div>
      </div>
      <div className="footer-section-two1">
        <div className="footer-section-columns1">
          <span>Contact Us :</span>
          <span>1by22cs108@bmsit.in</span>
          <span>1by22cs122@bmsit.in</span>
          <span>1by22cs123@bmsit.in</span>
          <span>1by22cs138@bmsit.in</span>
        </div>
        <div className="footer-section-columns1">
          <span> Terms & Conditions</span>
          <span> Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooter;
