import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/user_signup.css";

const UserSignup = () => {
  // State for language selection
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );

  // Navigation and UI states
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [correctOtp, setCorrectOtp] = useState("");
  const [error, setError] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    age: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // Translations object
  const translations = {
    en: {
      languageLabel: "Language / ಭಾಷೆ :",
      topLabel: "User Registration",
      userName: "User Name",
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
    },
    kn: {
      languageLabel: "ಭಾಷೆ / Language :",
      topLabel: "ಬಳಕೆದಾರರ ನೋಂದಣಿ",
      userName: "ಬಳಕೆದಾರರ ಹೆಸರು",
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
    },
  };

  // Update language in session storage when changed
  useEffect(() => {
    sessionStorage.setItem("language", language);
  }, [language]);

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    window.location.reload();
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle initial form submission and OTP sending
  const handleInitialSubmit = async () => {
    // Validate form fields
    if (
      !formData.username ||
      !formData.phone_number ||
      !formData.age ||
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
        // Handle specific error message from the backend
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

  // Handle OTP verification and final registration
  const handleOtpVerification = async () => {
    if (!otp) {
      toast.error(translations[language].alert4);
      return;
    }

    console.log("Entered OTP:", otp);
    console.log("Correct OTP:", correctOtp);

    const enteredOtp = String(otp).trim();
    const expectedOtp = String(correctOtp).trim();

    if (enteredOtp === expectedOtp) {
      console.log("OTP matched, proceeding with registration");
      try {
        const registerResponse = await fetch(
          "http://localhost:3000/auth/user/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        console.log("Registration response status:", registerResponse.status);
        const registerResult = await registerResponse.json();
        console.log("Registration response:", registerResult);

        if (registerResponse.ok) {
          toast.success(translations[language].RegisterSuccess);
          setTimeout(() => {
            navigate("/login/user");
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
      console.log("OTP mismatch");
      toast.error(translations[language].alert5);
    }
  };

  return (
    <div className="signup-containerU">
      <div className="nav-logo-container2">
        <img src={"/logo3.jpg"} alt="KYM Logo" />
      </div>

      <div className="language-selector2">
        <label htmlFor="language-dropdown2" style={{ color: "black" }}>
          {translations[language].languageLabel}
        </label>
        <div className="language-dropdown-container2">
          <select
            id="language-dropdown2"
            className="language-dropdown2"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>
        </div>
      </div>

      <div className="signup-formU">
        <h2 className="signup-headingU">{translations[language].topLabel}</h2>
        <form>
          {!showOtpForm ? (
            <>
              <div className="form-groupU">
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
                  value={formData.username}
                />
              </div>
              <div className="form-groupU">
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
                  value={formData.phone_number}
                />
              </div>
              <div className="form-groupU">
                <label htmlFor="age">{translations[language].Age}</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder={
                    translations[language].enterVal +
                    translations[language].Age +
                    translations[language].namudisi
                  }
                  onChange={handleInputChange}
                  value={formData.age}
                />
              </div>
              <div className="form-groupU">
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
                  value={formData.email}
                />
              </div>
              <div className="form-groupU">
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
                    value={formData.password}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <div className="form-groupU">
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
                  value={formData.confirm_password}
                />
              </div>
              <button
                type="button"
                className="btn-submitU"
                onClick={handleInitialSubmit}
              >
                {translations[language].BtnVal}
              </button>
            </>
          ) : (
            <div className="form-groupU">
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
                className="btn-submitU"
                onClick={handleOtpVerification}
              >
                {translations[language].verifyBtn}
              </button>
            </div>
          )}
          {error && <small className="error-messageU">{error}</small>}
        </form>
        <p className="p-user-signup">
          {translations[language].LoginLink}{" "}
          <Link to="/login/user" className="login-linkU">
            {translations[language].LoginLinkVal}
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserSignup;

// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import "./styles/user_signup.css";

// const UserSignup = () => {
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
//       topLabel: "User Registration",
//       userName: "User Name",
//       phoneNumber: "Phone Number",
//       Age: "Age",
//       Email: "Email",
//       passWord: "Password",
//       confirmPassword: "Confirm Password",
//       BtnVal: "Register",
//       LoginLink: "Already have an account ?",
//       LoginLinkVal: "Login",
//       namudisi: "",
//       enterVal: "Enter ",
//       RegisterSuccess: "Registration of the User has been successful",
//       alert1: "Please fill in all the fields.",
//       alert2: "Passwords do not match.",
//       alert3: "Please enter a valid email address",
//     },
//     kn: {
//       languageLabel: "ಭಾಷೆ / Language :",
//       topLabel: "ಬಳಕೆದಾರರ ನೋಂದಣಿ",
//       userName: "ಬಳಕೆದಾರರ ಹೆಸರು",
//       phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ",
//       Age: "ವಯಸ್ಸು",
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
//     age: "",
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
//       !formData.age ||
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
//       const response = await fetch("http://localhost:3000/auth/user/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.info(translations[language].RegisterSuccess);
//         setTimeout(() => {
//           navigate("/login/user");
//         }, 3000);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError(result.message);
//     }
//   };

//   return (
//     <div className="signup-containerU">
//       {/* Logo */}
//       <div className="nav-logo-container2">
//         <img src={"/logo3.jpg"} alt="KYM Logo" />
//       </div>
//       <div className="language-selector2">
//         <label htmlFor="language-dropdown2" style={{ color: "black" }}>
//           {translations[language].languageLabel}
//         </label>
//         <div className="language-dropdown-container2">
//           <select
//             id="language-dropdown2"
//             className="language-dropdown2"
//             value={language}
//             onChange={handleLanguageChange}
//           >
//             <option value="en">English</option>
//             <option value="kn">ಕನ್ನಡ</option>{" "}
//           </select>
//         </div>
//       </div>

//       {/* Signup Form */}
//       <div className="signup-formU">
//         <h2 className="signup-headingU">{translations[language].topLabel}</h2>
//         <form>
//           <div className="form-groupU">
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
//           <div className="form-groupU">
//             <label htmlFor="age">{translations[language].Age}</label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               placeholder={
//                 translations[language].enterVal +
//                 translations[language].Age +
//                 translations[language].namudisi
//               }
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-groupU">
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
//           <div className="form-groupU">
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
//           <div className="form-groupU">
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
//           {error && <small className="error-messageU">{error}</small>}
//           <button type="button" className="btn-submitU" onClick={handleSubmit}>
//             {translations[language].BtnVal}
//           </button>
//         </form>
//         <p className="p-user-signup">
//           {translations[language].LoginLink}{" "}
//           <Link to="/login/user" className="login-linkU">
//             {translations[language].LoginLinkVal}
//           </Link>
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default UserSignup;
