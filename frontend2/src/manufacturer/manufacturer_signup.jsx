import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles/manufacturer_signup.css"; // Import the CSS file

function ManufacturerSignup() {
  const navigate = useNavigate();
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
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (
      !formData.username ||
      !formData.phone_number ||
      !formData.address ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/auth/manufacture/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login/manufacturer");
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-heading">Manufacturer Registration</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Manufacturer Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter User Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="number"
              id="phone_number"
              name="phone_number"
              placeholder="Enter Phone Number"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password"
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
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            {error && <small className="error-message">{error}</small>}
          </div>
          <button type="button" className="btn-submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login/manufacturer" className="login-link">
            Login
          </Link>
        </p>
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

export default ManufacturerSignup;
