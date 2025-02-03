import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/user_home.css";

const UserHomePage = () => {
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
      Viewnotifications: "View Notifications",
      Maintainpills: "Maintain Pills",
      Scanqr: "Scan QR",
      Viewmedicineinfo: "View Medicine Info",
      LogoutToast: "You have been logged out",
    },
    kn: {
      languageLabel: "ಭಾಷೆ / Language :",
      WelcomeLbl: "ಸ್ವಾಗತ, ",
      ContactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      Viewnotifications: "ಅಧಿಸೂಚನೆಗಳನ್ನು ನೋಡಿ",
      Maintainpills: "ಔಷಧಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
      Scanqr: "QR ಕೋಡ್ ಅನ್ನು ಸ್ಕಾನ್ ಮಾಡಿ",
      Viewmedicineinfo: "ಔಷಧ ಮಾಹಿತಿಯನ್ನು ನೋಡಿ",
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
    <div className="user-home-page">
      {/* Navbar */}
      <div className="user-home-navbar">
        <div className="language-selector4">
          <label htmlFor="language-dropdown4" style={{ color: "white" }}>
            {translations[language].languageLabel}
          </label>
          <div className="language-dropdown-container4">
            <select
              id="language-dropdown4"
              className="language-dropdown4"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>{" "}
            </select>
          </div>
        </div>

        {/* Logo */}
        <div className="nav-logo-container4">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-userhome">
          <Link to="/contactus" className="nav-linkVal-container-userhome">
            {translations[language].ContactUs}
          </Link>
          {/* Logout link */}
          <Link
            className="nav-linkVal-container-userhome"
            onClick={handleLogout}
          >
            {translations[language].LogOut}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="user-home-content">
        <div>
          <h1 className="welcome-text-userhome">
            {translations[language].WelcomeLbl} {username}
          </h1>
          <div className="button-container-userhome">
            {[
              {
                path: "/user/notifications",
                label: translations[language].Viewnotifications,
              },
              {
                path: "/user/maintain-pills",
                label: translations[language].Maintainpills,
              },
              {
                path: "/user/scan-qr",
                label: translations[language].Scanqr,
              },
              {
                path: "/user/medicine-info",
                label: translations[language].Viewmedicineinfo,
              },
            ].map((button, index) => (
              <Link
                key={index}
                to={button.path}
                className="custom-btn-userhome"
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

export default UserHomePage;
