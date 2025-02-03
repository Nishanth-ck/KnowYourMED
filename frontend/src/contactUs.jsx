import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./contactUs.css";

const ContactUsPage = () => {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Translations for different languages
  const translations = {
    en: {
      HomeNav: "Home",
      ContactUsNav: "Contact Us",
      LogOut: "Logout",
      HeadLbl: "Contact Us",
      subLbl1: "Our Team",
      name1: "MAHESH N",
      usn1: "USN : 1BY22CS108",
      name2: "NIKHIL R YALAWAR",
      usn2: "USN : 1BY22CS122",
      name3: "NISHANTH C K",
      usn3: "USN : 1BY22CS123",
      name4: "PRUTHVI AVALEKAR",
      usn4: "USN : 1BY22CS138",
      sublbl2: "Guide",
      guideName: "DR. USHA B A",
      guideprofession: "Professor",
      sublbl3: "Feedback",
      Namelbl: "Name",
      EmailLbl: "Email",
      Messagelbl: "Message",
      SubmitBtnLbl: "Submit",
      LogoutToast: "You have been logged out",
      alert1: "Feedback sent successfully...",
      alert2: "Error ! Failed to send the feedback...",
    },
    kn: {
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      HeadLbl: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      subLbl1: "ನಮ್ಮ ತಂಡ",
      name1: "ಮಹೇಶ್ ಎನ್",
      usn1: "USN : 1BY22CS108",
      name2: "ನಿಖಿಲ್ ಆರ್ ಯಲವಾರ್",
      usn2: "USN : 1BY22CS122",
      name3: "ನಿಶಾಂತ್ ಸಿ ಕೆ",
      usn3: "USN : 1BY22CS123",
      name4: "ಪೃಥ್ವಿ ಅವಲೇಕರ್",
      usn4: "USN : 1BY22CS138",
      sublbl2: "ಮಾರ್ಗದರ್ಶಕರು",
      guideName: "ಡಾ. ಉಷಾ ಬಿ ಎ",
      guideprofession: "ಪ್ರಾಧ್ಯಾಪಕಿ",
      sublbl3: "ಪ್ರತಿಕ್ರಿಯೆ",
      Namelbl: "ಹೆಸರು",
      EmailLbl: "ಇಮೇಲ್",
      Messagelbl: "ಸಂದೇಶ",
      SubmitBtnLbl: "ಸಲ್ಲಿಸು",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
      alert1: "ಫೀಡ್ಬ್ಯಾಕ್ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ...",
      alert2: "ದೋಷ! ಫೀಡ್ಬ್ಯಾಕ್ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ...",
    },
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info(translations[language].LogoutToast);
    setTimeout(() => navigate("/home"), 5000);
  };

  const handleSubmitFeedback = async (event) => {
    event.preventDefault(); // Prevent page reload

    const feedbackDetails = { name, email, message };
    console.log("Collected data for Backend:", feedbackDetails);

    try {
      const response = await fetch(`http://localhost:3000/contact/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackDetails),
      });

      const data = await response.json();
      if (data.message === "Done") {
        toast.success(translations[language].alert1);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(translations[language].alert2);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(translations[language].alert2);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contactus-navbar">
        <div className="nav-logo-container100">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-contactus">
          <Link to="/home" className="nav-linkVal-container-contactus">
            {translations[language].HomeNav}
          </Link>
          <Link
            className="nav-linkVal-container-contactus"
            onClick={handleLogout}
          >
            {translations[language].LogOut}
          </Link>
        </div>
      </div>

      <div style={{ paddingTop: "100px" }}>
        <h1 className="contactus-header">{translations[language].HeadLbl}</h1>

        {/* Team Section */}
        <div className="team-section-contactus">
          <h2 className="sub-header-contactus">
            {translations[language].subLbl1}
          </h2>
          <div className="team-cards-contactus">
            {[
              {
                name: translations[language].name1,
                usn: translations[language].usn1,
              },
              {
                name: translations[language].name2,
                usn: translations[language].usn2,
              },
              {
                name: translations[language].name3,
                usn: translations[language].usn3,
              },
              {
                name: translations[language].name4,
                usn: translations[language].usn4,
              },
            ].map((member, index) => (
              <div className="team-card-contactus" key={index}>
                <img
                  src={"/default-profile-pic.PNG"}
                  alt={"Profile Picture"}
                  className="team-photo-contactus"
                />
                <div className="team-name-usn-container">
                  <h3 className="team-name-contactus">{member.name}</h3>
                  <p className="team-usn-contactus">({member.usn})</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guide Section */}
        <div className="guide-section-contactus">
          <h2 className="sub-header-contactus">
            {translations[language].sublbl2}
          </h2>
          <div className="guide-card-contactus">
            <img
              src={"/default-profile-pic.PNG"}
              alt={"Guide"}
              className="guide-photo-contactus"
            />
            <h3 className="guide-name-contactus">
              {translations[language].guideName}
            </h3>
            <p className="guide-role-contactus">
              {translations[language].guideprofession}
            </p>
          </div>
        </div>

        <div className="feedback-section-contactus">
          <h2 className="sub-header-contactus">
            {translations[language].sublbl3}
          </h2>
          <form
            className="feedback-form-contactus"
            onSubmit={handleSubmitFeedback}
          >
            <div className="form-group-contactus">
              <label htmlFor="name">{translations[language].Namelbl}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group-contactus">
              <label htmlFor="email">{translations[language].EmailLbl}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group-contactus">
              <label htmlFor="message">
                {translations[language].Messagelbl}
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button-contactus">
              {translations[language].SubmitBtnLbl}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUsPage;
