import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/manufacturer_password_recover.css"; // External CSS

const ManufacturerLoginRecover = () => {
  // State for language selection
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );
  const [otpReceivedFromB, setOtpReceivedFromB] = useState("");

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
        "http://localhost:3000/auth/manufacture/email-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setOtpReceivedFromB(result.otp);
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
    if (Number(formData.otp) === Number(otpReceivedFromB)) {
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
        "http://localhost:3000/auth/manufacture/password-reset",
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
        navigate("/login/manufacturer");
      } else {
        toast.error(translations[language].errorMessage);
      }
    } catch {
      setError(translations[language].errorMessage);
    }
  };

  return (
    <div className="password-recover-containerM">
      {/* Logo */}
      <div className="nav-logo-container-recoverM">
        <img src={"/logo3.jpg"} alt="KYM Logo" />
      </div>
      <div className="language-selector-recoverM">
        <label htmlFor="language-dropdown-recoverM" style={{ color: "white" }}>
          {translations[language].languageLabel}
        </label>
        <div className="language-dropdown-container-recoverM">
          <select
            id="language-dropdown-recoverM"
            className="language-dropdown-recoverM"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>{" "}
          </select>
        </div>
      </div>

      <div className="password-recover-contentM">
        <div className="password-recover-boxM">
          <h2 className="password-recover-titleM">
            {translations[language].topLabel}
          </h2>
          <form>
            {!otpSent && (
              <div className="form-group-recoverM">
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
            <Link to="/login/manufacturer">
              {translations[language].LoginLinkVal}
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManufacturerLoginRecover;

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate, Link } from "react-router-dom";
// import "./styles/manufacturer_password_recover.css"; // External CSS

// function ManufacturerLoginRecover() {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//   });

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       setError("Please enter your email.");
//       return;
//     }
//     setError("");
//     try {
//       const response = await fetch(
//         "http://localhost:3000/auth/manufacture/email-verification",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: formData.email }),
//         }
//       );

//       const result = await response.json();
//       if (response.ok) {
//         setOtpSent(true);
//         alert("OTP sent to your email!");
//       } else {
//         setError(result.error || "Failed to send OTP. Please try again.");
//       }
//     } catch {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!formData.otp) {
//       setError("Please enter the OTP.");
//       return;
//     }
//     setError("");
//     if (formData.otp === "expectedOtpValue") {
//       setOtpVerified(true);
//       alert("OTP verified successfully!");
//     } else {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   const handlePasswordReset = async () => {
//     if (!formData.newPassword) {
//       setError("Please enter your new password.");
//       return;
//     }
//     setError("");
//     try {
//       const response = await fetch(
//         "http://localhost:3000/auth/manufacture/password-reset",
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
//       if (response.ok) {
//         alert("Password reset successful!");
//         navigate("/manufacturer/login");
//       } else {
//         setError(result.error || "Password reset failed. Please try again.");
//       }
//     } catch {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="recover-container">
//       <div className="recover-content">
//         <div className="recover-box">
//           <h2 className="recover-title">Password Recovery</h2>
//           <form>
//             {!otpSent && (
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email
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
//                   Send OTP
//                 </button>
//               </div>
//             )}

//             {otpSent && !otpVerified && (
//               <div className="mb-3">
//                 <label htmlFor="otp" className="form-label">
//                   OTP
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
//                   Verify OTP
//                 </button>
//               </div>
//             )}

//             {otpVerified && (
//               <div className="mb-3">
//                 <label htmlFor="newPassword" className="form-label">
//                   New Password
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
//                   Reset Password
//                 </button>
//               </div>
//             )}
//           </form>
//           {error && <div className="text-danger mt-3">{error}</div>}
//           <p className="text-center mt-3">
//             Remembered your password?{" "}
//             <Link to="/login/manufacturer">Login</Link>
//           </p>
//         </div>
//       </div>
//       <div className="logo-container">
//         <img src="/logo3.jpg" alt="KYM Logo" />
//       </div>
//     </div>
//   );
// }

// export default ManufacturerLoginRecover;
