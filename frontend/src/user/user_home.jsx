import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/user_home.css";

function UserHomePage() {
  const [username, setUsername] = useState("");
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
  //     "Welcome",
  //     "Contact Us",
  //     "Logout",
  //     "View Notifications",
  //     "Maintain Pills",
  //     "Scan QR",
  //     "Medicine Information",
  //   ];

  // const translatedTexts = {};
  // for (const word of wordsToTranslate) {
  //   try {
  //     const response = await fetch("http://localhost:3000/translate/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         text: word,
  //         language: selectedLanguage,
  //       }),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       let translatedWord = result.translatedText;
  //       if (translatedWord.includes("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ")) {
  //         translatedWord = translatedWord
  //           .replace("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ", "")
  //           .trim();
  //       }
  //       translatedTexts[word] = translatedWord;
  //     } else {
  //       console.error(`Translation failed for word: ${word}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching translations:", error);
  //   }
  // }

  //   setTranslations({
  //     welcomeText: translatedTexts["Welcome"] || "Welcome",
  //     contactUsText: translatedTexts["Contact Us"] || "Contact Us",
  //     logoutText: translatedTexts["Logout"] || "Logout",
  //     viewNotificationsText:
  //       translatedTexts["View Notifications"] || "View Notifications",
  //     maintainPillsText: translatedTexts["Maintain Pills"] || "Maintain Pills",
  //     scanQrText: translatedTexts["Scan QR"] || "Scan QR",
  //     viewMedicineInfoText:
  //       translatedTexts["Medicine Information"] || "Medicine Information",
  //   });
  // };

  // const handleLanguageChange = (e) => {
  //   setSelectedLanguage(e.target.value);
  // };

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    setUsername(name || "User");
  }, []);

  return (
    <div className="home-page">
      {/* Language Selector */}
      {/* <div className="language-selector user-home-lang">
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
      <div className="main-content-1">
        <div>
          <h1 className="welcome-text">Welcome {username}</h1>
          <div className="button-container">
            {[
              {
                path: "/user/notifications",
                label: "View Notifications",
              },
              {
                path: "/user/maintain-pills",
                label: "Maintain Pills",
              },
              {
                path: "/user/scan-qr",
                label: "Scan QR",
              },
              {
                path: "/user/medicine-info",
                label: "View Medicine Info",
              },
            ].map((button, index) => (
              <Link key={index} to={button.path} className="custom-btn">
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="logo-container-user-login">
        <Link to="/user/home">
          <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
        </Link>
      </div>
    </div>
  );
}

export default UserHomePage;
