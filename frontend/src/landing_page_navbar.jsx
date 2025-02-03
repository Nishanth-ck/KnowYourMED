import React, { useState, useEffect } from "react";
import "./landing_page.css";

const LandingPageNavbar = () => {
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
      titleLabel: "Know Your Med",
      languageLabel: "Language / ಭಾಷೆ :",
      home: "Home",
      userLogin: "User Login",
      userSignup: "User Signup",
      manufacturerLogin: "Manufacturer Login",
      manufacturerSignup: "Manufacturer Signup",
      contactUs: "Contact Us",
    },
    kn: {
      titleLabel: "ಕ್ನೋ ಯುವರ್ ಮೆಡ್",
      languageLabel: "ಭಾಷೆ / Language :",
      home: "ಹೋಮ್",
      userLogin: "ಬಳಕೆದಾರ ಲಾಗಿನ್",
      userSignup: "ಬಳಕೆದಾರ ಸೈನ್ ಅಪ್",
      manufacturerLogin: "ತಯಾರಕ ಲಾಗಿನ್",
      manufacturerSignup: "ತಯಾರಕ ಸೈನ್ ಅಪ್",
      contactUs: "ನಮಗೆ ಸಂಪರ್ಕಿಸಿ",
    },
  };

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Refresh the page to reflect the changes
    window.location.reload();
  };

  return (
    <div>
      {/* Language selector */}
      <div className="language-selector1">
        <label
          htmlFor="language-dropdown1"
          style={{ color: "rgba(16, 134, 150, 0.87)" }}
        >
          {translations[language].languageLabel}
        </label>
        <div className="language-dropdown-container1">
          <select
            id="language-dropdown1"
            className="language-dropdown1"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>{" "}
          </select>
        </div>
      </div>

      {/* Logo */}
      <div className="nav-logo-container1">
        <img src={"./logo3.jpg"} alt="KYM Logo" />
      </div>

      <div className="title-text-container100">
        <h1 className="title-text-format100">
          {translations[language].titleLabel}
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links-container1">
        <a href="/home">{translations[language].home}</a>
        <a href="/login/user">{translations[language].userLogin}</a>
        <a href="/signup/user">{translations[language].userSignup}</a>
        <a href="/login/manufacturer">
          {translations[language].manufacturerLogin}
        </a>
        <a href="/signup/manufacturer">
          {translations[language].manufacturerSignup}
        </a>
        <a href="/contactus">{translations[language].contactUs}</a>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
