// import React from "react";
import { Link } from "react-router-dom";
import "./contactus.css";

const ContactUsPage = () => {
  return (
    <div>
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "rgba(1, 14, 22, 0.7)",
          padding: "10px 30px",
          position: "fixed",
          width: "100%",
          height: "80px",
          top: 0,
          left: 0,
          zIndex: 500,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        className="navbar"
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            // padding: "30px 50px",
            padding: "10px 20px",
            fontSize: "25px",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "yellow";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Home
        </Link>
        <Link
          to="/logout"
          style={{
            textDecoration: "none",
            color: "white",
            // padding: "30px 50px",
            padding: "10px 20px",
            fontSize: "25px",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "red";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Logout
        </Link>
      </div>

      {/* Main Content Section */}
      <div className="contact-us-container" style={{ paddingTop: "100px" }}>
        <h1 className="header">Contact Us</h1>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="sub-header">Our Team</h2>
          <div className="team-cards">
            {[
              "MAHESH N",
              "NISHANTH C K",
              "PRUTHVI AVALEKAR",
              "NIKHIL R YALAWAR",
            ].map((member, index) => (
              <div className="team-card" key={index}>
                <img
                  src={"https://via.placeholder.com/200"}
                  alt={""}
                  className="team-photo"
                />
                <h3 className="team-name">{member}</h3>
                <p className="team-role"></p>
              </div>
            ))}
          </div>
        </div>

        {/* Guide Section */}
        <div className="guide-section">
          <h2 className="sub-header">Guide</h2>
          <div className="guide-card">
            <img
              src="https://via.placeholder.com/150?text=Guide"
              alt="Guide"
              className="guide-photo"
            />
            <h3 className="guide-name">Dr. USHA B A</h3>
            <p className="guide-role">Professor</p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="feedback-section">
          <h2 className="sub-header">Feedback</h2>
          <form className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
