import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/user_signup.css";

function UserSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    age: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );
  const [translations, setTranslations] = useState({});

  const wordsToTranslate = [
    "User Registration",
    "User Name",
    "Phone Number",
    "Age",
    "Email",
    "Password",
    "Confirm Password",
    "Register",
    "Already have an account?",
    "Login",
    "Please fill in all fields.",
    "Passwords do not match!",
  ];

  // Fetch translations from the backend
  const fetchTranslations = async () => {
    const translatedTexts = {};

    for (const word of wordsToTranslate) {
      try {
        const response = await fetch("http://localhost:3000/translate/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: word }),
        });

        const result = await response.json();

        if (response.ok) {
          // Clean up unwanted text from the translation
          let translatedWord = result.translatedText;
          if (translatedWord.includes("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ")) {
            translatedWord = translatedWord
              .replace("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ", "")
              .trim();
          }
          translatedTexts[word] = translatedWord;
        }
      } catch (error) {
        console.error(`Translation failed for "${word}":`, error);
        translatedTexts[word] = word; // Fallback to original word
      }
    }

    setTranslations(translatedTexts);
  };

  // Fetch saved language and translations on mount
  useEffect(() => {
    fetchTranslations();
  }, [selectedLanguage]);

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    sessionStorage.setItem("language", newLanguage);
    fetchTranslations();
  };

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
    if (
      !formData.username ||
      !formData.phone_number ||
      !formData.age ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError(translations["Please fill in all fields."]);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError(translations["Passwords do not match!"]);
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login/user");
      } else {
        setError(result.message || translations["Registration failed."]);
      }
    } catch (err) {
      setError(translations["An unexpected error occurred."]);
    }
  };

  return (
    <div className="signup-container">
      {/* Language Selector */}
      {/* <div className="language-selector">
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="kn">Kannada</option>
        </select>
      </div> */}

      {/* Signup Form */}
      <div className="signup-form">
        <h2 className="signup-heading">
          {translations["User Registration"] || "User Registration"}
        </h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">
              {translations["User Name"] || "User Name"}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder={translations["User Name"] || "Enter User Name"}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">
              {translations["Phone Number"] || "Phone Number"}
            </label>
            <input
              type="number"
              id="phone_number"
              name="phone_number"
              placeholder={translations["Phone Number"] || "Enter Phone Number"}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">{translations["Age"] || "Age"}</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder={translations["Age"] || "Enter Age"}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{translations["Email"] || "Email"}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={translations["Email"] || "Enter Email"}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              {translations["Password"] || "Password"}
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder={translations["Password"] || "Enter Password"}
                onChange={handleInputChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">
              {translations["Confirm Password"] || "Confirm Password"}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              placeholder={
                translations["Confirm Password"] || "Confirm Password"
              }
              onChange={handleInputChange}
            />
          </div>
          {error && <small className="error-message">{error}</small>}
          <button type="button" className="btn-submit" onClick={handleSubmit}>
            {translations["Register"] || "Register"}
          </button>
        </form>
        <p>
          {translations["Already have an account?"] ||
            "Already have an account?"}{" "}
          <Link to="/login/user" className="login-link">
            {translations["Login"] || "Login"}
          </Link>
        </p>
      </div>
      <div className="logo-container-user-login">
        <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
      </div>
    </div>
  );
}

export default UserSignup;
