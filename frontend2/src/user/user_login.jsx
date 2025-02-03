import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/user_login.css"; // Import the external CSS file

function UserLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [translations, setTranslations] = useState({});
  // const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Fetch the saved language from sessionStorage
  // useEffect(() => {
  //   const storedLanguage = sessionStorage.getItem("language");
  //   if (storedLanguage) {
  //     setSelectedLanguage(storedLanguage);
  //   }
  // }, []);

  // Update sessionStorage and fetch translations on language change
  // useEffect(() => {
  //   sessionStorage.setItem("language", selectedLanguage);
  //   fetchTranslations();
  // }, [selectedLanguage]);

  // const fetchTranslations = async () => {
  //   const wordsToTranslate = [
  //     "User Login",
  //     "Email",
  //     "Password",
  //     "Login",
  //     "Sign Up",
  //     "Recover Password",
  //     "Don't have an account?",
  //     "Forgot password?",
  //     "Please fill in all fields.",
  //     "Login failed. Please try again.",
  //     "An unexpected error occurred. Please try again later.",
  //   ];

  //   const translatedTexts = {};
  //   for (const word of wordsToTranslate) {
  //     try {
  //       const response = await fetch("http://localhost:3000/translate/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           text: word,
  //           language: selectedLanguage,
  //         }),
  //       });

  //       const result = await response.json();
  //       if (response.ok) {
  //         // Cleanup: Remove unwanted extra text if present
  //         let translatedWord = result.translatedText;
  //         if (translatedWord.includes("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ")) {
  //           translatedWord = translatedWord
  //             .replace("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ", "")
  //             .trim();
  //         }
  //         translatedTexts[word] = translatedWord;
  //       } else {
  //         console.error(`Translation failed for word: ${word}`);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching translations:", error);
  //     }
  //   }

  //   setTranslations({
  //     loginTitle: translatedTexts["User Login"] || "User Login",
  //     emailLabel: translatedTexts["Email"] || "Email",
  //     passwordLabel: translatedTexts["Password"] || "Password",
  //     loginButton: translatedTexts["Login"] || "Login",
  //     signUpText: translatedTexts["Sign Up"] || "Sign Up",
  //     recoverPasswordText:
  //       translatedTexts["Recover Password"] || "Recover Password",
  //     noAccountText:
  //       translatedTexts["Don't have an account?"] || "Don't have an account?",
  //     forgotPasswordText:
  //       translatedTexts["Forgot password?"] || "Forgot password?",
  //     errorFillFields:
  //       translatedTexts["Please fill in all fields."] ||
  //       "Please fill in all fields.",
  //     errorLoginFailed:
  //       translatedTexts["Login failed. Please try again."] ||
  //       "Login failed. Please try again.",
  //     errorUnexpected:
  //       translatedTexts[
  //         "An unexpected error occurred. Please try again later."
  //       ] || "An unexpected error occurred. Please try again later.",
  //   });
  // };

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

        alert("Login successful! Redirecting to home...");
        navigate("/user/home");
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  // const handleLanguageChange = (e) => {
  //   setSelectedLanguage(e.target.value);
  // };

  return (
    <div className="login-container">
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

      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">User Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <strong>Password</strong>
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  className="form-control"
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
              className="btn btn-primary w-100 rounded-0"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          {error && <small className="text-danger">{error}</small>}
          <p className="text-center mt-3">
            Do not have an account?{" "}
            <Link to="/signup/user" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
          <p className="text-center">
            Forgot password?{" "}
            <Link to="/login/user/recover" className="text-decoration-none">
              Recover Password
            </Link>
          </p>
        </div>
      </div>
      <div className="logo-container-user-login">
        <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
      </div>
    </div>
  );
}

export default UserLogin;
