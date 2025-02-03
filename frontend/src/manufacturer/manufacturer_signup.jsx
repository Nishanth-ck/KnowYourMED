import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/manufacturer_signup.css";

const ManufacturerSignup = () => {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    address: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [correctOtp, setCorrectOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("language", language);
  }, [language]);

  const translations = {
    en: {
      languageLabel: "Language / ಭಾಷೆ :",
      topLabel: "Manufacturer Registration",
      userName: "Manufacturer Name",
      phoneNumber: "Phone Number",
      Age: "Age",
      Email: "Email",
      passWord: "Password",
      confirmPassword: "Confirm Password",
      BtnVal: "Register",
      LoginLink: "Already have an account ?",
      LoginLinkVal: "Login",
      namudisi: "",
      enterVal: "Enter ",
      RegisterSuccess: "Registration of the User has been successful",
      alert1: "Please fill in all the fields.",
      alert2: "Passwords do not match.",
      alert3: "Please enter a valid email address",
      alert4: "Please enter the OTP",
      alert5: "Invalid OTP. Please try again.",
      alert6: "Registration failed. Please try again.",
      otpSent: "OTP has been sent to your email id",
      otpLabel: "Enter OTP",
      verifyBtn: "Verify & Register",
      emailNotRegistered:
        "This email is not registered. Please use a different email.",
      Address: "Address",
    },
    kn: {
      languageLabel: "ಭಾಷೆ / Language :",
      topLabel: "ತಯಾರಕರ ನೋಂದಣಿ",
      userName: "ತಯಾರಕರ ಹೆಸರು",
      phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ",
      Age: "ವಯಸ್ಸು",
      Email: "ಇಮೇಲ್",
      passWord: "ಗುಪ್ತಪದ",
      confirmPassword: "ಗುಪ್ತಪದವನ್ನು ದೃಢೀಕರಿಸಿ",
      BtnVal: "ನೋಂದಣಿ",
      LoginLink: "ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?",
      LoginLinkVal: "ಲಾಗಿನ್",
      namudisi: " ನಮೂದಿಸಿ",
      enterVal: "",
      RegisterSuccess: "ಬಳಕೆದಾರರ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ",
      alert1: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
      alert2: "ಗುಪ್ತಪದಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
      alert3: "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.",
      alert4: "ದಯವಿಟ್ಟು OTP ಅನ್ನು ನಮೂದಿಸಿ",
      alert5: "ಅಮಾನ್ಯ OTP. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      alert6: "ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      otpSent: "OTP ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ",
      otpLabel: "OTP ನಮೂದಿಸಿ",
      verifyBtn: "ಪರಿಶೀಲಿಸಿ & ನೋಂದಣಿ",
      emailNotRegistered: "ಈ ಇಮೇಲ್ ನೋಂದಾಯಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಇಮೇಲ್ ಬಳಸಿ.",
      Address: "ವಿಳಾಸ",
    },
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    window.location.reload();
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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInitialSubmit = async () => {
    if (
      !formData.username ||
      !formData.phone_number ||
      !formData.address ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError(translations[language].alert1);
      toast.error(translations[language].alert1);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError(translations[language].alert2);
      toast.error(translations[language].alert2);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError(translations[language].alert3);
      toast.error(translations[language].alert3);
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/auth/user/new/email-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const result = await response.json();
      console.log("Email verification response:", result);

      if (response.ok) {
        setCorrectOtp(result.otp);
        setShowOtpForm(true);
        toast.info(translations[language].otpSent);
      } else {
        if (result.message === "Email does not exist") {
          setError(translations[language].emailNotRegistered);
          toast.error(translations[language].emailNotRegistered);
        } else {
          setError(result.message);
          toast.error(result.message);
        }
      }
    } catch (err) {
      console.error("Email verification error:", err);
      setError(translations[language].alert6);
      toast.error(translations[language].alert6);
    }
  };

  const handleOtpVerification = async () => {
    if (!otp) {
      toast.error(translations[language].alert4);
      return;
    }

    const enteredOtp = String(otp).trim();
    const expectedOtp = String(correctOtp).trim();

    if (enteredOtp === expectedOtp) {
      try {
        const registerResponse = await fetch(
          "http://localhost:3000/auth/manufacture/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const registerResult = await registerResponse.json();

        if (registerResponse.ok) {
          toast.success(translations[language].RegisterSuccess);
          setTimeout(() => {
            navigate("/login/manufacturer");
          }, 3000);
        } else {
          setError(registerResult.message || translations[language].alert6);
          toast.error(registerResult.message || translations[language].alert6);
        }
      } catch (err) {
        console.error("Registration error:", err);
        setError(translations[language].alert6);
        toast.error(translations[language].alert6);
      }
    } else {
      toast.error(translations[language].alert5);
    }
  };

  return (
    <div className="signup-containerM">
      <div className="nav-logo-container9">
        <img src={"/logo3.jpg"} alt="KYM Logo" />
      </div>
      <div className="language-selector9">
        <label htmlFor="language-dropdown9" style={{ color: "black" }}>
          {translations[language].languageLabel}
        </label>
        <div className="language-dropdown-container9">
          <select
            id="language-dropdown9"
            className="language-dropdown9"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>
        </div>
      </div>

      <div className="signup-formM">
        <h2 className="signup-headingM">{translations[language].topLabel}</h2>
        <form>
          {!showOtpForm ? (
            <>
              <div className="form-groupM">
                <label htmlFor="username">
                  {translations[language].userName}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={
                    translations[language].enterVal +
                    translations[language].userName +
                    translations[language].namudisi
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-groupM">
                <label htmlFor="phone_number">
                  {translations[language].phoneNumber}
                </label>
                <input
                  type="number"
                  id="phone_number"
                  name="phone_number"
                  placeholder={
                    translations[language].enterVal +
                    translations[language].phoneNumber +
                    translations[language].namudisi
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-groupM">
                <label htmlFor="address">
                  {translations[language].Address}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder={
                    translations[language].enterVal +
                    translations[language].Address +
                    translations[language].namudisi
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-groupM">
                <label htmlFor="email">{translations[language].Email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={
                    translations[language].enterVal +
                    translations[language].Email +
                    translations[language].namudisi
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-groupM">
                <label htmlFor="password">
                  {translations[language].passWord}
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder={
                      translations[language].enterVal +
                      translations[language].passWord +
                      translations[language].namudisi
                    }
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <div className="form-groupM">
                <label htmlFor="confirm_password">
                  {translations[language].confirmPassword}
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  placeholder={
                    translations[language].enterVal +
                    translations[language].confirmPassword +
                    translations[language].namudisi
                  }
                  onChange={handleInputChange}
                />
              </div>
              {error && <small className="error-messageM">{error}</small>}
              <button
                type="button"
                className="btn-submitM"
                onClick={handleInitialSubmit}
              >
                {translations[language].BtnVal}
              </button>
            </>
          ) : (
            <div className="form-groupM">
              <label htmlFor="otp">{translations[language].otpLabel}</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP sent to your email"
              />
              <button
                type="button"
                className="btn-submitM"
                onClick={handleOtpVerification}
              >
                {translations[language].verifyBtn}
              </button>
            </div>
          )}
        </form>
        <p className="p-manufacturer-signup">
          {translations[language].LoginLink}{" "}
          <Link to="/login/manufacturer" className="login-linkM">
            {translations[language].LoginLinkVal}
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManufacturerSignup;

// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import "./styles/manufacturer_signup.css";

// const ManufacturerSignup = () => {
//   // Check sessionStorage for the language, default to 'en' if not found
//   const [language, setLanguage] = useState(
//     sessionStorage.getItem("language") || "en"
//   );

//   useEffect(() => {
//     // Whenever the language changes, update the sessionStorage
//     sessionStorage.setItem("language", language);
//   }, [language]);

//   // Translations for different languages
//   const translations = {
//     en: {
//       languageLabel: "Language / ಭಾಷೆ :",
//       topLabel: "Manufacturer Registration",
//       userName: "Manufacturer Name",
//       phoneNumber: "Phone Number",
//       Address: "Address",
//       Email: "Email",
//       passWord: "Password",
//       confirmPassword: "Confirm Password",
//       BtnVal: "Register",
//       LoginLink: "Already have an account ?",
//       LoginLinkVal: "Login",
//       namudisi: "",
//       enterVal: "Enter ",
//       RegisterSuccess: "Registration of the Manufacturer has been successful",
//       alert1: "Please fill in all the fields.",
//       alert2: "Passwords do not match.",
//       alert3: "Please enter a valid email address",
//     },
//     kn: {
//       languageLabel: "ಭಾಷೆ / Language :",
//       topLabel: "ತಯಾರಕರ ನೋಂದಣಿ",
//       userName: "ತಯಾರಕರ ಹೆಸರು",
//       phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ",
//       Address: "ವಿಲಾಸ",
//       Email: "ಇಮೇಲ್",
//       passWord: "ಗುಪ್ತಪದ",
//       confirmPassword: "ಗುಪ್ತಪದವನ್ನು ದೃಢೀಕರಿಸಿ",
//       BtnVal: "ನೋಂದಣಿ",
//       LoginLink: "ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?",
//       LoginLinkVal: "ಲಾಗಿನ್",
//       namudisi: " ನಮೂದಿಸಿ",
//       enterVal: "",
//       RegisterSuccess: "ಬಳಕೆದಾರರ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ",
//       alert1: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
//       alert2: "ಗುಪ್ತಪದಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
//       alert3: "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.",
//     },
//   };

//   // Function to handle language change
//   const handleLanguageChange = (e) => {
//     setLanguage(e.target.value);
//     // Refresh the page to reflect the changes
//     window.location.reload();
//   };

//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     phone_number: "",
//     address: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   });
//   const [error, setError] = useState("");

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Email validation function
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async () => {
//     console.log("button clicked");
//     console.log(formData);
//     if (
//       !formData.username ||
//       !formData.phone_number ||
//       !formData.address ||
//       !formData.email ||
//       !formData.password ||
//       !formData.confirm_password
//     ) {
//       setError("Please fill in all fields.");
//       toast.error(translations[language].alert1);
//       return;
//     }

//     if (formData.password !== formData.confirm_password) {
//       setError("Passwords do not match!");
//       toast.error(translations[language].alert2);
//       return;
//     }

//     // Check if email is valid
//     if (!isValidEmail(formData.email)) {
//       setError("Please enter a valid email address.");
//       toast.error(translations[language].alert3);
//       return;
//     }

//     setError("");

//     try {
//       const response = await fetch(
//         "http://localhost:3000/auth/manufacture/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         toast.info(translations[language].RegisterSuccess);
//         setTimeout(() => {
//           navigate("/login/manufacturer");
//         }, 3000);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError(result.message);
//     }
//   };

//   return (
//     <div className="signup-containerM">
//       {/* Logo */}
//       <div className="nav-logo-container9">
//         <img src={"/logo3.jpg"} alt="KYM Logo" />
//       </div>
//       <div className="language-selector9">
//         <label htmlFor="language-dropdown9" style={{ color: "black" }}>
//           {translations[language].languageLabel}
//         </label>
//         <div className="language-dropdown-container9">
//           <select
//             id="language-dropdown9"
//             className="language-dropdown9"
//             value={language}
//             onChange={handleLanguageChange}
//           >
//             <option value="en">English</option>
//             <option value="kn">ಕನ್ನಡ</option>{" "}
//           </select>
//         </div>
//       </div>

//       {/* Signup Form */}
//       <div className="signup-formM">
//         <h2 className="signup-headingM">{translations[language].topLabel}</h2>
//         <form>
//           <div className="form-groupM">
//             <label htmlFor="username">{translations[language].userName}</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               placeholder={
//                 translations[language].enterVal +
//                 translations[language].userName +
//                 translations[language].namudisi
//               }
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-groupU">
//             <label htmlFor="phone_number">
//               {translations[language].phoneNumber}
//             </label>
//             <input
//               type="number"
//               id="phone_number"
//               name="phone_number"
//               placeholder={
//                 translations[language].enterVal +
//                 translations[language].phoneNumber +
//                 translations[language].namudisi
//               }
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-groupM">
//             <label htmlFor="address">{translations[language].Address}</label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               placeholder={
//                 translations[language].enterVal +
//                 translations[language].Address +
//                 translations[language].namudisi
//               }
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-groupM">
//             <label htmlFor="email">{translations[language].Email}</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder={
//                 translations[language].enterVal +
//                 translations[language].Email +
//                 translations[language].namudisi
//               }
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-groupM">
//             <label htmlFor="password">{translations[language].passWord}</label>
//             <div className="password-input">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 placeholder={
//                   translations[language].enterVal +
//                   translations[language].passWord +
//                   translations[language].namudisi
//                 }
//                 onChange={handleInputChange}
//               />
//               <FontAwesomeIcon
//                 icon={showPassword ? faEyeSlash : faEye}
//                 className="password-toggle"
//                 onClick={togglePasswordVisibility}
//               />
//             </div>
//           </div>
//           <div className="form-groupM">
//             <label htmlFor="confirm_password">
//               {translations[language].confirmPassword}
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="confirm_password"
//               name="confirm_password"
//               placeholder={
//                 translations[language].enterVal +
//                 translations[language].confirmPassword +
//                 translations[language].namudisi
//               }
//               onChange={handleInputChange}
//             />
//           </div>
//           {error && <small className="error-messageM">{error}</small>}
//           <button type="button" className="btn-submitM" onClick={handleSubmit}>
//             {translations[language].BtnVal}
//           </button>
//         </form>
//         <p className="p-manufacturer-signup">
//           {translations[language].LoginLink}{" "}
//           <Link to="/login/manufacturer" className="login-linkM">
//             {translations[language].LoginLinkVal}
//           </Link>
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ManufacturerSignup;
