import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./scan_url.css";

const ScanURL = () => {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );

  useEffect(() => {
    sessionStorage.setItem("language", language);
  }, [language]);

  const translations = {
    en: {
      languageLabel: "Language / ಭಾಷೆ :",
      HomeNav: "Home",
      ContactUsNav: "Contact Us",
      LogOut: "Logout",
      Titlelbl: "Medicine Information",
      MedicineName: "Medicine Name",
      ExpiryDate: "Expiry Date",
      ManufactureDate: "Manufacture Date",
      BatchNumber: "Batch Number",
      ManufacturerName: "Manufacturer Name",
      loadingText: "Loading Medicine Information...",
      Titlelbl2: "Details of Medicine :",
      DosageFormVal: "Dosage Form",
      AgeGrpVal: "Age Group",
      SideEffectsVal: "Side Effects",
      PurposeVal: "Purpose",
      WarningsVal: "Warnings",
      OverdosageVal: "Overdosage",
      AdverseActionsVal: "Adverse Actions",
      GeneralPrecautionsVal: "General Precautions",
    },
    kn: {
      languageLabel: "ಭಾಷೆ / Language :",
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      Titlelbl: "ಔಷಧಿ ಮಾಹಿತಿಗಳು",
      MedicineName: "ಔಷಧಿ ಹೆಸರು",
      ExpiryDate: "ಗಡುವು ದಿನಾಂಕ",
      ManufactureDate: "ತಯಾರಿಸಿದ ದಿನಾಂಕ",
      BatchNumber: "ಬ್ಯಾಚ್ ಸಂಖ್ಯೆ",
      ManufacturerName: "ತಯಾರಕರ ಹೆಸರು",
      loadingText: "ಔಷಧಿ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      Titlelbl2: "ಔಷಧಿಯ ವಿವರಗಳು :",
      DosageFormVal: "ಡೋಸೇಜ್",
      AgeGrpVal: "ವಯೋಮಾನದ ಗುಂಪು",
      SideEffectsVal: "ಪರಿಣಾಮಗಳು",
      PurposeVal: "ಉದ್ದೇಶ",
      WarningsVal: "ಎಚ್ಚರಿಕೆಗಳು",
      OverdosageVal: "ಅತಿಮಾತ್ರೆ ಪರಿಣಾಮಗಳು",
      AdverseActionsVal: "ಅನನುಕೂಲಕಾರಿ ಕ್ರಿಯೆಗಳು",
      GeneralPrecautionsVal: "ಸಾಮಾನ್ಯ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು",
    },
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    window.location.reload();
  };

  const { uniqueId } = useParams();
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicineInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/medicine/info/${uniqueId}`
        );
        if (response.ok) {
          const data = await response.json();
          setMedicineInfo(data);
        } else {
          setError("Failed to fetch medicine information.");
        }
      } catch (err) {
        console.error("Error fetching medicine info:", err);
        setError("An error occurred while fetching medicine information.");
      }
    };

    if (uniqueId) {
      fetchMedicineInfo();
    }
  }, [uniqueId]);

  const renderMedicineDetails = () => {
    if (!medicineInfo) return null;

    return (
      <>
        <div className="medicine-card-scanurl">
          <h2 className="medicine-title-scanurl">
            {translations[language].Titlelbl}
          </h2>
          <div className="medicine-detail-scanurl">
            <span className="detail-label-scanurl">
              {translations[language].MedicineName}
            </span>
            <span className="detail-value-scanurl">
              {medicineInfo.result.medicine_name?.toUpperCase() || "N/A"}
            </span>
          </div>
          <div className="medicine-detail-scanurl">
            <span className="detail-label-scanurl">
              {translations[language].ExpiryDate}
            </span>
            <span className="detail-value-scanurl">
              {medicineInfo.result.expiry_date || "N/A"}
            </span>
          </div>
          <div className="medicine-detail-scanurl">
            <span className="detail-label-scanurl">
              {translations[language].ManufactureDate}
            </span>
            <span className="detail-value-scanurl">
              {medicineInfo.result.manufacture_date || "N/A"}
            </span>
          </div>
          <div className="medicine-detail-scanurl">
            <span className="detail-label-scanurl">
              {translations[language].BatchNumber}
            </span>
            <span className="detail-value-scanurl">
              {medicineInfo.result.batch_number || "N/A"}
            </span>
          </div>
          <div className="medicine-detail-scanurl">
            <span className="detail-label-scanurl">
              {translations[language].ManufacturerName}
            </span>
            <span className="detail-value-scanurl">
              {medicineInfo.result.manufacture_name?.toUpperCase() || "N/A"}
            </span>
          </div>
        </div>

        <div className="medicine-card-scanurl">
          <h2 className="medicine-title-scanurl">
            {translations[language].Titlelbl2}
          </h2>
          {[
            { label: translations[language].DosageFormVal, field: "dosage" },
            {
              label: translations[language].SideEffectsVal,
              field: "sideEffects",
            },
            { label: translations[language].AgeGrpVal, field: "ageGroup" },
            { label: translations[language].PurposeVal, field: "purpose" },
            {
              label: translations[language].GeneralPrecautionsVal,
              field: "generalPrecautions",
            },
            { label: translations[language].WarningsVal, field: "warnings" },
            {
              label: translations[language].AdverseActionsVal,
              field: "adverseActions",
            },
            {
              label: translations[language].OverdosageVal,
              field: "overdosage",
            },
          ].map((item) => (
            <div key={item.field} className="medicine-detail-scanurl">
              <span className="detail-label-scanurl">{item.label}</span>
              <span className="detail-value-scanurl">
                {medicineInfo.result.medicine_info[item.field] || "N/A"}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="scanurl-wrapper">
      <div className="scanurl-container">
        <div className="scanurl-navbar">
          <div className="nav-logo-container-scanurl">
            <img src="/logo3.jpg" alt="KYM Logo" />
          </div>

          <div className="language-selector-scanurl">
            <label
              htmlFor="language-dropdown-scanurl"
              style={{ color: "white" }}
            >
              {translations[language].languageLabel}
            </label>
            <div className="language-dropdown-container-scanurl">
              <select
                id="language-dropdown-scanurl"
                className="language-dropdown-scanurl"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
            </div>
          </div>

          <div className="nav-links-container-scanurl">
            <Link to="/user/home" className="nav-linkVal-container-scanurl">
              {translations[language].HomeNav}
            </Link>
            <Link to="/contactus" className="nav-linkVal-container-scanurl">
              {translations[language].ContactUsNav}
            </Link>
          </div>
        </div>

        {error && <p className="error-text-scanurl">{error}</p>}
        {medicineInfo
          ? renderMedicineDetails()
          : !error && (
              <p className="loading-text-scanurl">
                {translations[language].loadingText}
              </p>
            )}
      </div>
    </div>
  );
};

export default ScanURL;
