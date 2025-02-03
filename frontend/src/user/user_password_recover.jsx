import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/user_password_recover.css"; // External CSS

const UserLoginRecover = () => {
  const [otpReceivedFromBack, setOtpReceivedFromBack] = useState("");
  // State for language selection
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
      topLabel: "Password Recovery",
      Email: "Email",
      sendOTP: "Send OTP",
      OTPLabel: "OTP",
      namudisi: "",
      enterVal: "Enter ",
      LoginLink: "Already have an account?",
      LoginLinkVal: "Login",
      verifyOTP: "Verify OTP",
      newPasswordLabel: "New Password",
      resetPassword: "Reset Password",
      emailPlaceholder: "Enter your email",
      otpPlaceholder: "Enter the OTP",
      newPasswordPlaceholder: "Enter your new password",
      emailError: "Please enter your email.",
      otpError: "Please enter the OTP.",
      passwordError: "Please enter your new password.",
      otpSentMessage: "OTP sent to your email!",
      otpVerifiedMessage: "OTP verified successfully!",
      passwordResetSuccess: "Password reset successful!",
      errorMessage: "An error occurred. Please try again.",
      invalidOTP: "Invalid OTP. Please try again.",
    },
    kn: {
      languageLabel: "ಭಾಷೆ / Language :",
      topLabel: "ಪಾಸ್ವರ್ಡ್ ಮರುಪಡೆಯಿರಿ",
      Email: "ಇಮೇಲ್",
      sendOTP: "OTP ಅನ್ನು ಕಳುಹಿಸಿ",
      OTPLabel: "OTP",
      namudisi: " ನಮೂದಿಸಿ",
      enterVal: "",
      LoginLink: "ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?",
      LoginLinkVal: "ಲಾಗಿನ್",
      verifyOTP: "OTP ಪರಿಶೀಲಿಸಿ",
      newPasswordLabel: "ಹೊಸ ಪಾಸ್ವರ್ಡ್",
      resetPassword: "ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ",
      emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ",
      otpPlaceholder: "OTP ನಮೂದಿಸಿ",
      newPasswordPlaceholder: "ನಿಮ್ಮ ಹೊಸ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ",
      emailError: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ.",
      otpError: "ದಯವಿಟ್ಟು OTP ನಮೂದಿಸಿ.",
      passwordError: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೊಸ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ.",
      otpSentMessage: "OTP ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ!",
      otpVerifiedMessage: "OTP ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ!",
      passwordResetSuccess: "ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸುವಿಕೆ ಯಶಸ್ವಿಯಾಗಿದೆ!",
      errorMessage: "ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      invalidOTP: "ಅಮಾನ್ಯ OTP. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    },
  };

  // Update language in session storage when changed
  useEffect(() => {
    sessionStorage.setItem("language", language);
  }, [language]);

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
    otp: "",
    newPassword: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError(translations[language].emailError);
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
        setOtpReceivedFromBack(result.otp);
        toast.success(translations[language].otpSentMessage);
      } else {
        toast.error(translations[language].errorMessage);
      }
    } catch {
      setError(translations[language].errorMessage);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      setError(translations[language].otpError);
      return;
    }
    setError("");
    if (Number(formData.otp) === Number(otpReceivedFromBack)) {
      setOtpVerified(true);
      toast.success(translations[language].otpVerifiedMessage);
    } else {
      toast.error(translations[language].invalidOTP);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.newPassword) {
      setError(translations[language].passwordError);
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
        toast.success(translations[language].passwordResetSuccess);
        navigate("/login/user");
      } else {
        toast.error(translations[language].errorMessage);
      }
    } catch {
      setError(translations[language].errorMessage);
    }
  };

  return (
    <div className="password-recover-containerU">
      {/* Logo */}
      <div className="nav-logo-container-recoverU">
        <img src={"/logo3.jpg"} alt="KYM Logo" />
      </div>
      <div className="language-selector-recoverU">
        <label htmlFor="language-dropdown-recoverU" style={{ color: "white" }}>
          {translations[language].languageLabel}
        </label>
        <div className="language-dropdown-container-recoverU">
          <select
            id="language-dropdown-recoverU"
            className="language-dropdown-recoverU"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>{" "}
          </select>
        </div>
      </div>

      <div className="password-recover-contentU">
        <div className="password-recover-boxU">
          <h2 className="password-recover-titleU">
            {translations[language].topLabel}
          </h2>
          <form>
            {!otpSent && (
              <div className="form-group-recoverU">
                <label htmlFor="email">
                  <strong>{translations[language].Email}</strong>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={translations[language].emailPlaceholder}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={handleSendOtp}
                >
                  {translations[language].sendOTP}
                </button>
              </div>
            )}

            {otpSent && !otpVerified && (
              <div className="mb-3">
                <label htmlFor="otp">
                  <strong> {translations[language].OTPLabel}</strong>
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder={translations[language].otpPlaceholder}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={handleVerifyOtp}
                >
                  {translations[language].verifyOTP}
                </button>
              </div>
            )}

            {otpVerified && (
              <div className="mb-3">
                <label>
                  <strong>{translations[language].newPasswordLabel}</strong>
                </label>
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder={translations[language].newPasswordPlaceholder}
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
                  {translations[language].resetPassword}
                </button>
              </div>
            )}
          </form>
          {error && <div className="text-danger mt-3">{error}</div>}
          <p className="text-center mt-3">
            {translations[language].LoginLink}{" "}
            <Link to="/login/user">{translations[language].LoginLinkVal}</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLoginRecover;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import "./styles/user_password_recover.css"; // External CSS

// function UserLoginRecover() {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//   });
//   const [translations, setTranslations] = useState({});
//   const [selectedLanguage, setSelectedLanguage] = useState("en");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpReceivedFromBackend, setOtpReceivedFromBackend] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);

//   // Fetch the saved language from sessionStorage
//   useEffect(() => {
//     const storedLanguage = sessionStorage.getItem("language");
//     if (storedLanguage) {
//       setSelectedLanguage(storedLanguage);
//     }
//   }, []);

//   // Update sessionStorage and fetch translations on language change
//   useEffect(() => {
//     sessionStorage.setItem("language", selectedLanguage);
//     fetchTranslations();
//   }, [selectedLanguage]);

//   const fetchTranslations = async () => {
//     const wordsToTranslate = [
//       "Password Recovery",
//       "Email",
//       "OTP",
//       "Send OTP",
//       "Verify OTP",
//       "New Password",
//       "Reset Password",
//       "Please enter your email.",
//       "Failed to send OTP. Please try again.",
//       "Invalid OTP. Please try again.",
//       "Please enter your new password.",
//       "Password reset successful!",
//       "Password reset failed. Please try again.",
//       "An error occurred. Please try again.",
//     ];

//     const translatedTexts = {};
//     for (const word of wordsToTranslate) {
//       try {
//         const response = await fetch("http://localhost:3000/translate/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             text: word,
//             language: selectedLanguage,
//           }),
//         });

//         const result = await response.json();
//         if (response.ok) {
//           let translatedWord = result.translatedText;
//           if (translatedWord.includes("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ")) {
//             translatedWord = translatedWord
//               .replace("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ", "")
//               .trim();
//           }
//           translatedTexts[word] = translatedWord;
//         } else {
//           console.error(`Translation failed for word: ${word}`);
//         }
//       } catch (error) {
//         console.error("Error fetching translations:", error);
//       }
//     }

//     setTranslations({
//       recoveryTitle:
//         translatedTexts["Password Recovery"] || "Password Recovery",
//       emailLabel: translatedTexts["Email"] || "Email",
//       otpLabel: translatedTexts["OTP"] || "OTP",
//       sendOtpButton: translatedTexts["Send OTP"] || "Send OTP",
//       verifyOtpButton: translatedTexts["Verify OTP"] || "Verify OTP",
//       newPasswordLabel: translatedTexts["New Password"] || "New Password",
//       resetPasswordButton:
//         translatedTexts["Reset Password"] || "Reset Password",
//       errorEmailRequired:
//         translatedTexts["Please enter your email."] ||
//         "Please enter your email.",
//       errorOtpSent:
//         translatedTexts["Failed to send OTP. Please try again."] ||
//         "Failed to send OTP. Please try again.",
//       errorOtpInvalid:
//         translatedTexts["Invalid OTP. Please try again."] ||
//         "Invalid OTP. Please try again.",
//       errorNewPasswordRequired:
//         translatedTexts["Please enter your new password."] ||
//         "Please enter your new password.",
//       successPasswordReset:
//         translatedTexts["Password reset successful!"] ||
//         "Password reset successful!",
//       errorPasswordReset:
//         translatedTexts["Password reset failed. Please try again."] ||
//         "Password reset failed. Please try again.",
//       errorGeneral:
//         translatedTexts["An error occurred. Please try again."] ||
//         "An error occurred. Please try again.",
//     });
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       setError(translations.errorEmailRequired || "Please enter your email.");
//       return;
//     }
//     setError("");
//     try {
//       const response = await fetch(
//         "http://localhost:3000/auth/user/email-verification",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: formData.email }),
//         }
//       );

//       const result = await response.json();
//       // console.log(result.otp);
//       setOtpSent(true);
//       setOtpReceivedFromBackend(result.otp);
//       // if (response.ok) {
//       //   setOtpSent(true);
//       //   alert(translations.errorOtpSent || "OTP sent to your email!");
//       // } else {
//       //   setError(
//       //     result.error ||
//       //       translations.errorOtpSent ||
//       //       "Failed to send OTP. Please try again."
//       //   );
//       // }
//     } catch {
//       setError(
//         translations.errorGeneral || "An error occurred. Please try again."
//       );
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!formData.otp) {
//       setError(translations.errorOtpInvalid || "Please enter the OTP.");
//       return;
//     }
//     setError("");
//     if (Number(formData.otp) === Number(otpReceivedFromBackend)) {
//       setOtpVerified(true);
//       alert("OTP verified successfully!");
//     } else {
//       setError(
//         translations.errorOtpInvalid || "Invalid OTP. Please try again."
//       );
//     }
//   };

//   const handlePasswordReset = async () => {
//     if (!formData.newPassword) {
//       setError(
//         translations.errorNewPasswordRequired ||
//           "Please enter your new password."
//       );
//       return;
//     }
//     setError("");
//     try {
//       const response = await fetch(
//         "http://localhost:3000/auth/user/password-reset",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: formData.email,
//             password: formData.newPassword,
//           }),
//         }
//       );

//       const result = await response.json();
//       console.log(response);
//       console.log(result);

//       if (response.ok) {
//         alert(
//           translations.successPasswordReset || "Password reset successful!"
//         );
//         navigate("/login/user");
//       } else {
//         setError(
//           result.error ||
//             translations.errorPasswordReset ||
//             "Password reset failed. Please try again."
//         );
//       }
//     } catch {
//       setError(
//         translations.errorGeneral || "An error occurred. Please try again."
//       );
//     }
//   };

//   const handleLanguageChange = (e) => {
//     setSelectedLanguage(e.target.value);
//   };

//   return (
//     <div className="recover-container">
//       {/* <div className="language-selector">
//         <label htmlFor="language">Language:</label>
//         <select
//           id="language"
//           value={selectedLanguage}
//           onChange={handleLanguageChange}
//         >
//           <option value="en">English</option>
//           <option value="kn">Kannada</option>
//         </select>
//       </div> */}

//       <div className="recover-content">
//         <div className="recover-box">
//           <h2 className="recover-title">
//             {translations.recoveryTitle || "Password Recovery"}
//           </h2>
//           <form>
//             {!otpSent && (
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   <strong>{translations.emailLabel || "Email"}</strong>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="form-control"
//                   placeholder="Enter your email"
//                   onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-primary w-100 mt-3"
//                   onClick={handleSendOtp}
//                 >
//                   {translations.sendOtpButton || "Send OTP"}
//                 </button>
//               </div>
//             )}

//             {otpSent && !otpVerified && (
//               <div className="mb-3">
//                 <label htmlFor="otp" className="form-label">
//                   <strong>{translations.otpLabel || "OTP"}</strong>
//                 </label>
//                 <input
//                   type="text"
//                   id="otp"
//                   name="otp"
//                   className="form-control"
//                   placeholder="Enter the OTP"
//                   onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-primary w-100 mt-3"
//                   onClick={handleVerifyOtp}
//                 >
//                   {translations.verifyOtpButton || "Verify OTP"}
//                 </button>
//               </div>
//             )}

//             {otpVerified && (
//               <div className="mb-3">
//                 <label htmlFor="newPassword" className="form-label">
//                   <strong>
//                     {translations.newPasswordLabel || "New Password"}
//                   </strong>
//                 </label>
//                 <div className="position-relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="newPassword"
//                     name="newPassword"
//                     className="form-control"
//                     placeholder="Enter your new password"
//                     onChange={handleInputChange}
//                   />
//                   <FontAwesomeIcon
//                     icon={showPassword ? faEyeSlash : faEye}
//                     className="password-toggle"
//                     onClick={togglePasswordVisibility}
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="btn btn-primary w-100 mt-3"
//                   onClick={handlePasswordReset}
//                 >
//                   {translations.resetPasswordButton || "Reset Password"}
//                 </button>
//               </div>
//             )}
//           </form>
//           {error && <div className="text-danger mt-3">{error}</div>}
//           <p className="text-center mt-3">
//             {translations.recoverPasswordText || "Remembered your password? "}
//             <Link to="/login/user">Login</Link>
//           </p>
//         </div>
//       </div>
//       <div className="logo-container">
//         <img src="/logo3.jpg" alt="KYM Logo" />
//       </div>
//     </div>
//   );
// }

// export default UserLoginRecover;
