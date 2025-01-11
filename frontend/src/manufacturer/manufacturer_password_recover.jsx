import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import "./styles/manufacturer_password_recover.css"; // External CSS

function ManufacturerLoginRecover() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email.");
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
        alert("OTP sent to your email!");
      } else {
        setError(result.error || "Failed to send OTP. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    if (formData.otp === "expectedOtpValue") {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.newPassword) {
      setError("Please enter your new password.");
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
        alert("Password reset successful!");
        navigate("/manufacturer/login");
      } else {
        setError(result.error || "Password reset failed. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="recover-container">
      <div className="recover-content">
        <div className="recover-box">
          <h2 className="recover-title">Password Recovery</h2>
          <form>
            {!otpSent && (
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
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
                  Send OTP
                </button>
              </div>
            )}

            {otpSent && !otpVerified && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP
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
                  Verify OTP
                </button>
              </div>
            )}

            {otpVerified && (
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
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
                  Reset Password
                </button>
              </div>
            )}
          </form>
          {error && <div className="text-danger mt-3">{error}</div>}
          <p className="text-center mt-3">
            Remembered your password?{" "}
            <Link to="/login/manufacturer">Login</Link>
          </p>
        </div>
      </div>
      <div className="logo-container">
        <img src="/logo3.jpg" alt="KYM Logo" />
      </div>
    </div>
  );
}

export default ManufacturerLoginRecover;
