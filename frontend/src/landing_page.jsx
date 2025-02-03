import React, { useState, useEffect } from "react";
import "./landing_page.css";
import LandingPageNavbar from "./landing_page_navbar";
import LandingPageFooter from "./landing_page_footer";

const LandingPage = () => {
  // Check sessionStorage for the language, default to 'en' if not found
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );

  useEffect(() => {
    // Whenever the language changes, update the sessionStorage
    sessionStorage.setItem("language", language);
  }, [language]);

  // Translations for different languages
  const translations = {
    en: {
      titleData: "Everything That You Need to Know About Your Medicines",
      mainData:
        "Our web application leverages QR code technology to combat counterfeit drugs and manage medicine expiry dates, ensuring safer and more reliable medication practices. By scanning QR codes on medicine packaging, users can verify product authenticity against a secure database, access detailed expiry information, and receive automated alerts about expiring medications. The platform features bilingual support for seamless accessibility across diverse user groups and ensures data security with robust encryption and authentication. Designed for individuals, pharmacies, and healthcare facilities, this solution addresses critical healthcare challenges, reducing health risks and fostering trust in medication systems.",
    },
    kn: {
      titleData: "ನಿಮ್ಮ ಔಷಧಿಗಳ ಬಗ್ಗೆ ತಿಳಿಯಬೇಕಾದ ಎಲ್ಲಾ ಮಾಹಿತಿಗಳು",
      mainData:
        "ನಮ್ಮ ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್ ಕ್ಯೂಆರ್ ಕೋಡ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿಕೊಂಡು ಕೃತಕ ಔಷಧಿಗಳ ವಿರುದ್ಧ ಹೋರಾಡಲು ಮತ್ತು ಔಷಧಿ ಅವಧಿ ಮುಗಿಯುವ ದಿನಾಂಕಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ, ಇದರಿಂದ ಸುರಕ್ಷಿತ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಔಷಧಿ ಅಭ್ಯಾಸಗಳನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ಔಷಧಿ ಪ್ಯಾಕೇಜಿಂಗ್‌ನ ಮೇಲೆ ಕ್ಯೂಆರ್ ಕೋಡ್ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡುವ ಮೂಲಕ, ಬಳಕೆದಾರರು ಸುರಕ್ಷಿತ ಡೇಟಾಬೇಸ್ ವಿರುದ್ಧ ಉತ್ಪನ್ನದ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು, ವಿಶ್ದೀರ್ಣ ಅವಧಿ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಬಹುದು, ಮತ್ತು ಅವಧಿ ಮುಗಿಯುತ್ತಿರುವ ಔಷಧಿಗಳ ಬಗ್ಗೆ ಸ್ವಯಂಚಾಲಿತ ಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಬಹುದು.ಈ ವೇದಿಕೆ ವಿಭಿನ್ನ ಬಳಕೆದಾರ ಗುಂಪುಗಳಲ್ಲಿ ಸುಲಭ ಪ್ರವೇಶಕ್ಕಾಗಿ ದ್ವಿಭಾಷಾ ಬೆಂಬಲವನ್ನು ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ಬಲವಾದ ಎನ್ಕ್ರಿಪ್ಷನ್ ಮತ್ತು ಪ್ರಮಾಣೀಕರಣದೊಂದಿಗೆ ಡೇಟಾ ಭದ್ರತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ವ್ಯಕ್ತಿಗಳು, ಫಾರ್ಮಸಿಗಳು, ಮತ್ತು ಆರೈಕೆ ಕೇಂದ್ರಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಈ ಪರಿಹಾರವು ಪ್ರಮುಖ ಆರೈಕೆ ಸವಾಲುಗಳನ್ನು ಪೂರೈಸಿ, ಆರೋಗ್ಯ ಅಪಾಯಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಮತ್ತು ಔಷಧಿ ವ್ಯವಸ್ಥೆಗಳ ಮೇಲೆ ವಿಶ್ವಾಸವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    },
  };

  return (
    <>
      <div className="home-container1">
        {" "}
        <LandingPageNavbar />
        <div className="home-banner-container1">
          <div className="home-bannerImage-container1">
            <img
              src={"./home-banner-background.png"}
              alt="Home banner background"
            />
          </div>

          <div className="home-text-section1">
            <h1 className="primary-heading1">
              {" "}
              {translations[language].titleData}
            </h1>
            <p className="primary-text1"> {translations[language].mainData}</p>
            <div className="home-image-container1">
              <img
                src={"./home-banner-image.png"}
                alt="Banner Image"
                className="land-img-one"
              />
            </div>
          </div>
        </div>
      </div>
      <LandingPageFooter />
    </>
  );
};

export default LandingPage;
