import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/medicine_info.css";

const MedicineInfo = () => {
  // Check sessionStorage for the language, default to 'en' if not found
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );

  // Translations for different languages
  const translations = {
    en: {
      HomeNav: "Home",
      ContactUsNav: "Contact Us",
      LogOut: "Logout",
      SearchLbl: "Medicine Information Search",
      SearchBar: "Enter Medicine Name (example : Paracetamol)",
      ButtonVal: "Search",
      DetailsForVal: "Details for",
      DosageFormVal: "Dosage Form",
      AgeGrpVal: "Age Group",
      SideEffectsVal: "Side Effects",
      PurposeVal: "Purpose",
      WarningsVal: "Warnings",
      OverdosageVal: "Overdosage",
      AdverseActionsVal: "Adverse Actions",
      GeneralPrecautionsVal: "General Precautions",
      LogoutToast: "You have been logged out",
    },
    kn: {
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      SearchLbl: "ಔಷಧಿ ಮಾಹಿತಿಯ ಹುಡುಕಾಟ",
      SearchBar: "ಔಷಧಿಯ ಹೆಸರು ನಮೂದಿಸಿ (ಉದಾಹರಣೆ: ಪ್ಯಾರಾಸಿಟಮೊಲ್)",
      ButtonVal: "ಹುಡುಕಿ",
      DetailsForVal: "ವಿವರಗಳು :",
      DosageFormVal: "ಡೋಸೇಜ್",
      AgeGrpVal: "ವಯೋಮಾನದ ಗುಂಪು",
      SideEffectsVal: "ಪರಿಣಾಮಗಳು",
      PurposeVal: "ಉದ್ದೇಶ",
      WarningsVal: "ಎಚ್ಚರಿಕೆಗಳು",
      OverdosageVal: "ಅತಿಮಾತ್ರೆ ಪರಿಣಾಮಗಳು",
      AdverseActionsVal: "ಅನನುಕೂಲಕಾರಿ ಕ್ರಿಯೆಗಳು",
      GeneralPrecautionsVal: "ಸಾಮಾನ್ಯ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
    },
  };

  const [medicineName, setMedicineName] = useState(""); // Controlled input field
  const [searchQuery, setSearchQuery] = useState(""); // Search query triggered on submit
  const [medicineResults, setMedicineResults] = useState([]); // Array to store search results
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // Array to store pill name suggestions

  // Helper function to get the position of the nth occurrence of a character
  const getNthOccurrence = (str, char, n) => {
    let index = -1;
    for (let i = 0; i < n; i++) {
      index = str.indexOf(char, index + 1);
      if (index === -1) break; // If fewer than n occurrences
    }
    return index;
  };

  // Function to slice text till the 10th full stop
  const sliceText = (text) => {
    if (!text) return "No information available";
    const index = getNthOccurrence(text, ".", 10);
    return index !== -1 ? text.slice(0, index + 1) : text; // Include the 10th full stop
  };

  const handleInputChange = (e) => {
    setMedicineName(e.target.value);
  };

  const handleSearch = () => {
    if (medicineName.trim() === "") {
      setError("Please Enter Valid Medicine Name");
      return;
    }
    fetchMedicineDetails(medicineName);
  };

  const fetchMedicineDetails = async (query) => {
    try {
      // Fetch medicine details from backend API
      const response = await axios.get(
        `http://localhost:3000/medicine/${query}`
      );
      console.log(response.data?.medicine);

      // Append new medicine details to the existing array
      setMedicineResults((prevResults) => [
        ...prevResults,
        { name: query, details: response.data },
      ]);
      setError(null); // Clear error on success
    } catch (err) {
      console.error("Error fetching medicine details:", err);
      setError(err.response?.data?.message);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the session storage items
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("language");
    toast.info(translations[language].LogoutToast),
      {
        autoClose: 5000, // Toast will stay for 10 seconds
      };
    setTimeout(() => {
      navigate("/home");
    }, 5000);
  };

  return (
    <div className="medicine-info-container">
      {/* Navbar */}
      <div className="user-medicineinfo-navbar">
        {/* Logo */}
        <div className="nav-logo-container7">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-medicineinfo">
          <Link to="/user/home" className="nav-linkVal-container-medicineinfo">
            {translations[language].HomeNav}
          </Link>
          <Link to="/contactus" className="nav-linkVal-container-medicineinfo">
            {translations[language].ContactUsNav}
          </Link>
          <Link
            className="nav-linkVal-container-userhome"
            onClick={handleLogout}
          >
            {translations[language].LogOut}
          </Link>
        </div>
      </div>

      <h1 className="title-med-info">{translations[language].SearchLbl}</h1>

      {/* Input card */}
      <div className="input-card-medinfo">
        <input
          type="text"
          placeholder={translations[language].SearchBar}
          value={medicineName}
          onChange={handleInputChange}
        />
        {/* Dropdown for suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown-medinfo">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setMedicineName(suggestion); // Set selected suggestion in input field
                  setSuggestions([]); // Clear suggestions after selection
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <div>
          <button onClick={handleSearch}>
            {translations[language].ButtonVal}
          </button>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display latest searched medicine details */}
      {medicineResults.length > 0 && (
        <div className="medicine-card-medinfo">
          <h2>
            {translations[language].DetailsForVal.toUpperCase()}{" "}
            {medicineResults[medicineResults.length - 1].name.toUpperCase()}
          </h2>
          <p>
            <strong>{translations[language].DosageFormVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.dosage
            )}
          </p>
          <p>
            <strong>{translations[language].AgeGrpVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.ageGroup
            )}
          </p>
          <p>
            <strong>{translations[language].SideEffectsVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.sideEffects
            )}
          </p>
          <p>
            <strong>{translations[language].PurposeVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.medicine
                ?.purpose
            )}
          </p>
          <p>
            <strong>{translations[language].WarningsVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.medicine
                ?.warnings
            )}
          </p>
          <p>
            <strong>{translations[language].OverdosageVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.medicine
                ?.overdosage
            )}
          </p>
          <p>
            <strong>{translations[language].AdverseActionsVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.medicine
                ?.adverse_reactions
            )}
          </p>
          <p>
            <strong>{translations[language].GeneralPrecautionsVal}</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.medicine
                ?.general_precautions
            )}
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MedicineInfo;
