import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/user_login.css"; // Import the external CSS file

const UserLogin = () => {
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
      topLabel: "User Login",
      Email: "Email",
      passWord: "Password",
      BtnVal: "Login",
      LoginLink: "Don't have an account ?",
      LoginLinkVal: "Register",
      ForgotPassword: "Forgot Password ?",
      RecoverPassword: "Recover Password",
      namudisi: "",
      enterVal: "Enter ",
      LoginSuccess: "Login of the User has been successful",
    },
    kn: {
      languageLabel: "ಭಾಷೆ / Language :",
      topLabel: "ಬಳಕೆದಾರರ ಲಾಗಿನ್",
      Email: "ಇಮೇಲ್",
      passWord: "ಗುಪ್ತಪದ",
      BtnVal: "ಲಾಗಿನ್",
      LoginLink: "ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿಲ್ಲವೇ?",
      LoginLinkVal: "ನೋಂದಣಿ",
      ForgotPassword: "ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ ?",
      RecoverPassword: "ಪಾಸ್ವರ್ಡ್ ಮರುಪಡೆಯಿರಿ",
      namudisi: " ನಮೂದಿಸಿ",
      enterVal: "",
      LoginSuccess: "ಬಳಕೆದಾರರ ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ",
    },
  };

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Refresh the page to reflect the changes
    window.location.reload();
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      ("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("userName", result.response.username);
        sessionStorage.setItem("userToken", result.accessToken);
        sessionStorage.setItem("userId", result.response._id);
        sessionStorage.setItem("email", result.response.email);

        toast.info(translations[language].LoginSuccess);
        setTimeout(() => {
          navigate("/user/home");
        }, 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-containerUL">
      {/* Logo */}
      <div className="nav-logo-container3">
        <img src={"/logo3.jpg"} alt="KYM Logo" />
      </div>
      <div className="language-selector3">
        <label htmlFor="language-dropdown2" style={{ color: "white" }}>
          {translations[language].languageLabel}
        </label>
        <div className="language-dropdown-container3">
          <select
            id="language-dropdown3"
            className="language-dropdown3"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>{" "}
          </select>
        </div>
      </div>

      <div className="login-contentUL">
        <div className="login-boxUL">
          <h2 className="login-titleUL">{translations[language].topLabel}</h2>
          <form>
            <div className="form-groupUL">
              <label htmlFor="email">
                <strong>{translations[language].Email}</strong>
              </label>
              <input
                type="email"
                placeholder={
                  translations[language].enterVal +
                  translations[language].Email +
                  translations[language].namudisi
                }
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-groupUL">
              <label htmlFor="password">
                <strong>{translations[language].passWord}</strong>
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    translations[language].enterVal +
                    translations[language].passWord +
                    translations[language].namudisi
                  }
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn-submitUL"
              onClick={handleSubmit}
            >
              {translations[language].BtnVal}
            </button>
          </form>
          {error && <small className="error-messageUL">{error}</small>}
          <p className="p-user-login">
            {translations[language].LoginLink}{" "}
            <Link to="/signup/user" className="signup-linkUL">
              {translations[language].LoginLinkVal}
            </Link>
          </p>
          <p className="p-user-login">
            {translations[language].ForgotPassword}{" "}
            <Link to="/login/user/recover" className="signup-linkUL">
              {translations[language].RecoverPassword}
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
