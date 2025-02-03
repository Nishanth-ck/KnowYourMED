import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/manufacturer_login.css"; // Import the external CSS file

function ManufacturerLogin() {
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
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/auth/manufacture/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(result.response);

        sessionStorage.setItem("userName", result.response.username);
        sessionStorage.setItem("userToken", result.accessToken);
        sessionStorage.setItem("userId", result.response._id);

        alert("Login successful! Redirecting to home...");
        navigate("/manufacturer/home");
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">Manufacturer Login</h2>
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
            Don't have an account?{" "}
            <Link to="/signup/manufacturer" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
          <p className="text-center">
            Forgot password?{" "}
            <Link
              to="/login/manufacturer/recover"
              className="text-decoration-none"
            >
              Recover Password
            </Link>
          </p>
        </div>
      </div>
      <div className="logo-container-user-login">
        <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
      </div>
      {/* <div className="logo-container">
        <img src="/logo3.jpg" alt="KYM Logo" />
      </div> */}
    </div>
  );
}

export default ManufacturerLogin;
