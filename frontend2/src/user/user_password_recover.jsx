import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/user_password_recover.css"; // External CSS

function UserLoginRecover() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [translations, setTranslations] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Fetch the saved language from sessionStorage
  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  // Update sessionStorage and fetch translations on language change
  useEffect(() => {
    sessionStorage.setItem("language", selectedLanguage);
    fetchTranslations();
  }, [selectedLanguage]);

  const fetchTranslations = async () => {
    const wordsToTranslate = [
      "Password Recovery",
      "Email",
      "OTP",
      "Send OTP",
      "Verify OTP",
      "New Password",
      "Reset Password",
      "Please enter your email.",
      "Failed to send OTP. Please try again.",
      "Invalid OTP. Please try again.",
      "Please enter your new password.",
      "Password reset successful!",
      "Password reset failed. Please try again.",
      "An error occurred. Please try again.",
    ];

    const translatedTexts = {};
    for (const word of wordsToTranslate) {
      try {
        const response = await fetch("http://localhost:3000/translate/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: word,
            language: selectedLanguage,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          let translatedWord = result.translatedText;
          if (translatedWord.includes("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ")) {
            translatedWord = translatedWord
              .replace("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ", "")
              .trim();
          }
          translatedTexts[word] = translatedWord;
        } else {
          console.error(`Translation failed for word: ${word}`);
        }
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    }

    setTranslations({
      recoveryTitle:
        translatedTexts["Password Recovery"] || "Password Recovery",
      emailLabel: translatedTexts["Email"] || "Email",
      otpLabel: translatedTexts["OTP"] || "OTP",
      sendOtpButton: translatedTexts["Send OTP"] || "Send OTP",
      verifyOtpButton: translatedTexts["Verify OTP"] || "Verify OTP",
      newPasswordLabel: translatedTexts["New Password"] || "New Password",
      resetPasswordButton:
        translatedTexts["Reset Password"] || "Reset Password",
      errorEmailRequired:
        translatedTexts["Please enter your email."] ||
        "Please enter your email.",
      errorOtpSent:
        translatedTexts["Failed to send OTP. Please try again."] ||
        "Failed to send OTP. Please try again.",
      errorOtpInvalid:
        translatedTexts["Invalid OTP. Please try again."] ||
        "Invalid OTP. Please try again.",
      errorNewPasswordRequired:
        translatedTexts["Please enter your new password."] ||
        "Please enter your new password.",
      successPasswordReset:
        translatedTexts["Password reset successful!"] ||
        "Password reset successful!",
      errorPasswordReset:
        translatedTexts["Password reset failed. Please try again."] ||
        "Password reset failed. Please try again.",
      errorGeneral:
        translatedTexts["An error occurred. Please try again."] ||
        "An error occurred. Please try again.",
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError(translations.errorEmailRequired || "Please enter your email.");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        "http://localhost:3000/auth/user/email-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert(translations.errorOtpSent || "OTP sent to your email!");
      } else {
        setError(
          result.error ||
            translations.errorOtpSent ||
            "Failed to send OTP. Please try again."
        );
      }
    } catch {
      setError(
        translations.errorGeneral || "An error occurred. Please try again."
      );
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      setError(translations.errorOtpInvalid || "Please enter the OTP.");
      return;
    }
    setError("");
    if (formData.otp === "expectedOtpValue") {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      setError(
        translations.errorOtpInvalid || "Invalid OTP. Please try again."
      );
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.newPassword) {
      setError(
        translations.errorNewPasswordRequired ||
          "Please enter your new password."
      );
      return;
    }
    setError("");
    try {
      const response = await fetch(
        "http://localhost:3000/auth/user/password-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.newPassword,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(
          translations.successPasswordReset || "Password reset successful!"
        );
        navigate("/login/user");
      } else {
        setError(
          result.error ||
            translations.errorPasswordReset ||
            "Password reset failed. Please try again."
        );
      }
    } catch {
      setError(
        translations.errorGeneral || "An error occurred. Please try again."
      );
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="recover-container">
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

      <div className="recover-content">
        <div className="recover-box">
          <h2 className="recover-title">
            {translations.recoveryTitle || "Password Recovery"}
          </h2>
          <form>
            {!otpSent && (
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <strong>{translations.emailLabel || "Email"}</strong>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={handleSendOtp}
                >
                  {translations.sendOtpButton || "Send OTP"}
                </button>
              </div>
            )}

            {otpSent && !otpVerified && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  <strong>{translations.otpLabel || "OTP"}</strong>
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="form-control"
                  placeholder="Enter the OTP"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={handleVerifyOtp}
                >
                  {translations.verifyOtpButton || "Verify OTP"}
                </button>
              </div>
            )}

            {otpVerified && (
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  <strong>
                    {translations.newPasswordLabel || "New Password"}
                  </strong>
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    className="form-control"
                    placeholder="Enter your new password"
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={handlePasswordReset}
                >
                  {translations.resetPasswordButton || "Reset Password"}
                </button>
              </div>
            )}
          </form>
          {error && <div className="text-danger mt-3">{error}</div>}
          <p className="text-center mt-3">
            {translations.recoverPasswordText || "Remembered your password? "}
            <Link to="/login/user">Login</Link>
          </p>
        </div>
      </div>
      <div className="logo-container">
        <img src="/logo3.jpg" alt="KYM Logo" />
      </div>
    </div>
  );
}

export default UserLoginRecover;
