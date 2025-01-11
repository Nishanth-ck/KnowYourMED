import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faInfoCircle,
  faPhone,
  // faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./landing_page.css";
import { GlobalContext } from "./context";

const LandingPageNavbar = () => {
  const { setLang } = useContext(GlobalContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [language, setLanguage] = useState("en"); // Default to 'en' (English)
  const [kannadaTranslation, setKannadaTranslation] = useState("Kannada"); // Store translated text for Kannada

  // Menu options with FontAwesome icons
  const menuOptions = [
    { text: "Home", icon: <FontAwesomeIcon icon={faHome} /> },
    { text: "FAQ", icon: <FontAwesomeIcon icon={faInfoCircle} /> },
    { text: "Contact Us", icon: <FontAwesomeIcon icon={faPhone} /> },
  ];

  // When the component mounts, retrieve the saved language from sessionStorage
  useEffect(() => {
    const savedLanguage = sessionStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage); // Update the state with saved language
    }

    // Fetch translation for Kannada when the component mounts
    fetchKannadaTranslation();
  }, []);

  // Fetch translation for Kannada option
  const fetchKannadaTranslation = async () => {
    try {
      const response = await fetch("http://localhost:3000/translate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Kannada" }), // Send "Kannada" text to translate
      });

      const result = await response.json();

      if (response.ok) {
        setKannadaTranslation(result.translatedText); // Update the translated text
      } else {
        console.error("Translation failed:", result.message);
      }
    } catch (err) {
      console.error("Error in translation:", err);
    }
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    selectedLanguage === "kn" ? setLang("kannada") : setLang("english");
    setLanguage(selectedLanguage); // Update language state
    sessionStorage.setItem("language", selectedLanguage); // Store selected language in sessionStorage
  };

  return (
    <nav>
      {/* Language selector */}
      <div className="language-selector">
        <label htmlFor="language-dropdown">Choose your language:</label>
        <div className="language-dropdown-container">
          <select
            id="language-dropdown"
            className="language-dropdown"
            value={language} // Controlled input with state
            onChange={handleLanguageChange} // Handle change in language
          >
            <option value="en">English</option>
            <option value="kn">{kannadaTranslation}</option>{" "}
            {/* Dynamically set Kannada translation */}
          </select>
        </div>
      </div>

      {/* Logo */}
      <div className="nav-logo-container">
        <img src={"./Logo.png"} alt="Company Logo" />
      </div>

      {/* Navigation Links */}
      <div className="navbar-links-container">
        <a href="/">Home</a> {/* Link component for routing */}
        <a href="/login/user">User Login</a> {/* Link component for routing */}
        <a href="/signup/user">User Signup</a>
        <a href="/login/manufacturer">Manufacturer Login</a>{" "}
        {/* Link component for routing */}
        <a href="/signup/manufacturer">Manufacturer Signup</a>
        {/* <a href="/fiq">FAQ</a> Updated link to "/fiq" */}
        <a href="/contactus">Contact Us</a> {/* Updated link to "/contactus" */}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="navbar-menu-container">
        <FontAwesomeIcon
          icon={faBars}
          size="lg"
          onClick={() => setOpenMenu(!openMenu)}
        />
      </div>

      {/* Mobile Menu (Drawer alternative) */}
      {openMenu && (
        <div className="mobile-menu">
          <ul>
            {menuOptions.map((item) => (
              <li key={item.text}>
                <a
                  href={`#${item.text.toLowerCase().replace(" ", "")}`}
                  onClick={() => setOpenMenu(false)}
                >
                  <span>{item.icon}</span>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavbar;
