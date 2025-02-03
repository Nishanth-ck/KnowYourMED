import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/manufacturer_home.css"; // Make sure this file exists

function ManufacturerHomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    setUsername(name || "User");
  }, []);

  return (
    <div className="home-page">
      {/* Navbar */}
      <div className="navbar">
        <Link to="/contactus" className="nav-link">
          Contact Us
        </Link>
        <Link to="/" className="nav-link">
          Logout
        </Link>
      </div>

      {/* Main Content */}
      <div className="main-content-2">
        <div>
          <h1 className="welcome-text">Welcome {username}</h1>
          <div>
            {[
              { path: "/manufacturer/generate-qr", label: "Generate QR" },
              {
                path: "/manufacturer/view-previous-qr",
                label: "View Previous QRs",
              },
            ].map((button, index) => (
              <div key={index} className="btnnnn">
                <Link to={button.path} className="custom-btn">
                  {button.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo */}

      <div className="logo-container-user-login">
        <Link to="/manufacturer/home">
          <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
        </Link>
      </div>
    </div>
  );
}

export default ManufacturerHomePage;
