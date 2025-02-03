import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/manufacturer_home.css";

const ManufacturerHomePage = () => {
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
      languageLabel: "Language / ಭಾಷೆ :",
      WelcomeLbl: "Welcome, ",
      ContactUs: "Contact Us",
      LogOut: "Logout",
      ViewpreviousQr: "View Previous QRs",
      Generateqr: "Generate QR",
      LogoutToast: "You have been logged out",
    },
    kn: {
      languageLabel: "ಭಾಷೆ / Language :",
      WelcomeLbl: "ಸ್ವಾಗತ, ",
      ContactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      ViewpreviousQr: "ಹಿಂದಿನ QR ಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      Generateqr: "QR ರಚಿಸಿ",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
    },
  };

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Refresh the page to reflect the changes
    window.location.reload();
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    setUsername(name || "User");
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the session storage items
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("language");
    toast.info(translations[language].LogoutToast),
      {
        autoClose: 5000, // Toast will stay for 10 seconds
      };
    setTimeout(() => {
      navigate("/home");
    }, 5000);
  };

  return (
    <div className="manufacturer-home-page">
      {/* Navbar */}
      <div className="manufacturer-home-navbar">
        <div className="language-selector11">
          <label htmlFor="language-dropdown11" style={{ color: "white" }}>
            {translations[language].languageLabel}
          </label>
          <div className="language-dropdown-container11">
            <select
              id="language-dropdown11"
              className="language-dropdown11"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>{" "}
            </select>
          </div>
        </div>

        {/* Logo */}
        <div className="nav-logo-container11">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-manufacturerhome">
          <Link
            to="/contactus"
            className="nav-linkVal-container-manufacturerhome"
          >
            {translations[language].ContactUs}
          </Link>
          <Link
            className="nav-linkVal-container-manufacturerhome"
            onClick={handleLogout}
          >
            {translations[language].LogOut}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="manufacturer-home-content">
        <div>
          <h1 className="welcome-text-manufacturerhome">
            {translations[language].WelcomeLbl} {username}
          </h1>
          <div className="button-container-manufacturerhome">
            {[
              {
                path: "/manufacturer/view-previous-qr",
                label: translations[language].ViewpreviousQr,
              },
              {
                path: "/manufacturer/generate-qr",
                label: translations[language].Generateqr,
              },
            ].map((button, index) => (
              <Link
                key={index}
                to={button.path}
                className="custom-btn-manufacturerhome"
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManufacturerHomePage;
