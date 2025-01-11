import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./styles/medicine_info.css";

function MedicineInfo() {
  const [medicineName, setMedicineName] = useState(""); // Controlled input field
  const [searchQuery, setSearchQuery] = useState(""); // Search query triggered on submit
  const [medicineResults, setMedicineResults] = useState([]); // Array to store search results
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // Array to store pill name suggestions
  // const [translations, setTranslations] = useState({}); // Store translated text
  // const [selectedLanguage, setSelectedLanguage] = useState("en"); // Language state

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

  // Function to fetch translations for static texts
  // const fetchTranslations = async () => {
  //   const storedLanguage = sessionStorage.getItem("language");
  //   if (storedLanguage) {
  //     setSelectedLanguage(storedLanguage);
  //   }

  //   const textsToTranslate = [
  //     "Medicine Information Search",
  //     "Please enter a valid medicine name.",
  //     "Dosage Form",
  //     "Age Group",
  //     "Side Effects",
  //     "Purpose",
  //     "Warnings",
  //     "Overdosage",
  //     "Adverse Actions",
  //     "General Precautions",
  //     "Home",
  //     "Contact Us",
  //     "Logout",
  //     "Search",
  //     "Enter medicine name (e.g., Paracetamol)",
  //     "Details for",
  //     "No information available.",
  //   ];

  //   const translatedTexts = {};

  //   for (const text of textsToTranslate) {
  //     try {
  //       const response = await axios.post("http://localhost:3000/translate", {
  //         text,
  //       });
  //       translatedTexts[text] = response.data.translatedText || text;
  //     } catch (error) {
  //       console.error("Error fetching translations:", error);
  //     }
  //   }

  //   setTranslations(translatedTexts);
  // };

  // Fetch pill names suggestions from backend
  const fetchSuggestions = async (query) => {
    if (query.trim() === "") {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }
    try {
      // Fetch pill names from backend API based on search query
      const response = await axios.get(
        `http://localhost:3000/medicine/suggestions?query=${query}`
      );
      setSuggestions(response.data || []); // Set the list of suggestions
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleInputChange = (e) => {
    setMedicineName(e.target.value);
    fetchSuggestions(e.target.value); // Fetch suggestions as user types
  };

  const handleSearch = () => {
    if (medicineName.trim() === "") {
      // setError(
      //   translations["Please enter a valid medicine name."] ||
      //     "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಔಷಧಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ."
      // );
      return;
    }
    setSearchQuery(medicineName); // Update search query on submit
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
      setError(
        err.response?.data?.message
        // translations["An error occurred while fetching medicine details."] ||
        // "ಊಷಧಿ ವಿವರಗಳನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷವಾಗಿದೆ."
      );
    }
  };

  // Handle language change
  // const handleLanguageChange = (e) => {
  //   const newLanguage = e.target.value;
  //   setSelectedLanguage(newLanguage);
  //   fetchTranslations(newLanguage); // Fetch translations based on the selected language
  // };

  // Call fetchTranslations once the component is mounted or language is changed
  // useEffect(() => {
  //   fetchTranslations();
  // }, [selectedLanguage]);

  return (
    <div className="HomeBody">
      {/* Language Selector Dropdown */}
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
        <Link to="/user/home" className="nav-link">
          Home
        </Link>
        <Link to="/contactus" className="nav-link">
          Contact Us
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </div>

      <h1 className="title-med-info">Medicine Information Search</h1>

      {/* Input card */}
      <div className="input-card">
        <input
          type="text"
          placeholder={"Enter medicine name (e.g., Paracetamol)"}
          value={medicineName}
          onChange={handleInputChange}
        />
        {/* Dropdown for suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
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
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display latest searched medicine details */}
      {medicineResults.length > 0 && (
        <div className="medicine-card">
          <h2>
            Details for {medicineResults[medicineResults.length - 1].name}
          </h2>
          <p>
            <strong>Dosage Form</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.dosage
            )}
          </p>
          <p>
            <strong>Age Group</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.ageGroup
            )}
          </p>
          <p>
            <strong>Side Effects</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.sideEffects
            )}
          </p>
          <p>
            <strong>Purpose</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.medicine
                ?.purpose
            )}
          </p>
          <p>
            <strong>Warnings</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.warnings
            )}
          </p>
          <p>
            <strong>Overdosage</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.overdosage
            )}
          </p>
          <p>
            <strong>Adverse Actions</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details.adverseActions
            )}
          </p>
          <p>
            <strong>General Precautions</strong>{" "}
            {sliceText(
              medicineResults[medicineResults.length - 1].details
                .generalPrecautions
            )}
          </p>
        </div>
      )}

      {/* Logo */}
      <div className="logo-container">
        <Link to="/user/home">
          <img src="/logo3.jpg" alt="KYM Logo" className="logo-img" />
        </Link>
      </div>
    </div>
  );
}

export default MedicineInfo;
