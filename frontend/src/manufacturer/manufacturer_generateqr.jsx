import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/manufacturer_generateqr.css"; // Import the CSS file

const GenerateQR = () => {
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
      Titlelbl: "Generate QR Code",
      MedicineName: "Medicine Name",
      ExpiryDate: "Expiry Date",
      ManufactureDate: "Manufacture Date",
      BatchNumber: "Batch Number",
      ManufacturerName: "Manufacturer",
      GenerateQRBtn: "Generate QR",
      DownloadQRBtn: "Download QR",
      namudisi: "",
      enterVal: "Enter ",
      alert1: "Please fill in all the details",
      alert2: "Failed to generate the qr code...Please try again...",
      alert3: "Please generate a QR code first...",
      alert4: "QR code generated successfully...",
      LogoutToast: "You have been logged out",
    },
    kn: {
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      Titlelbl: "QR ಕೋಡ್ ರಚಿಸಿ",
      MedicineName: "ಔಷಧಿ ಹೆಸರು",
      ExpiryDate: "ಗಡುವು ದಿನಾಂಕ",
      ManufactureDate: "ತಯಾರಿಸಿದ ದಿನಾಂಕ",
      BatchNumber: "ಬ್ಯಾಚ್ ಸಂಖ್ಯೆ",
      ManufacturerName: "ತಯಾರಕರ ಹೆಸರು",
      GenerateQRBtn: "QR ರಚಿಸಿ",
      DownloadQRBtn: "QR ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      namudisi: " ನಮೂದಿಸಿ",
      enterVal: "",
      alert1: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
      alert2: "QR ಕೋಡ್ ರಚಿಸಲು ವಿಫಲವಾಗಿದೆ... ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ...",
      alert3: "ದಯವಿಟ್ಟು ಮೊದಲು QR ಕೋಡ್ ರಚಿಸಿ...",
      alert4: "QR ಕೋಡ್ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ...",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
    },
  };

  const [formData, setFormData] = useState({
    medicine_name: "",
    expiry_date: "",
    manufacture_date: "",
    batch_number: "",
    manufacture_name: "",
    manufacture_id: "",
  });

  const [qrCode, setQrCode] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    const {
      medicine_name,
      expiry_date,
      manufacture_date,
      batch_number,
      manufacture_name,
    } = formData;

    if (
      !medicine_name ||
      !expiry_date ||
      !manufacture_date ||
      !batch_number ||
      !manufacture_name
    ) {
      toast.info(translations[language].alert1);
      return;
    }

    try {
      const newData = { ...formData, userId: userId };
      console.log("Sending data to backend:", newData);
      const response = await axios.post(
        "http://localhost:3000/generate-qr",
        newData
      );
      console.log("QR Code generated:", response.data.qrCode);
      toast.success(translations[language].alert4);
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Error generating QR Code:", error);
      toast.info(translations[language].alert2);
    }
  };

  const handleDownload = () => {
    if (!qrCode) {
      toast.info(translations[language].alert3);
      return;
    }

    const link = document.createElement("a");
    link.href = qrCode; // The QR code data URL
    link.download = "qrcode.png"; // The name of the downloaded file
    link.click();
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
    <div className="qr-code-generator-container">
      <div className="generateqr-manufacturer-navbar">
        {/* Logo */}
        <div className="nav-logo-container12">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-generateqr">
          <Link
            to="/manufacturer/home"
            className="nav-linkVal-container-generateqr"
          >
            {translations[language].HomeNav}
          </Link>
          <Link to="/contactus" className="nav-linkVal-container-generateqr">
            {translations[language].ContactUsNav}
          </Link>
          <Link
            className="nav-linkVal-container-generateqr"
            onClick={handleLogout}
          >
            {translations[language].LogOut}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content-generateqr">
        <div className="content-container-generateqr">
          <h1 className="title-generateqr">
            {translations[language].Titlelbl}
          </h1>

          {/* Form for QR Code Generation */}
          <form className="form-container-generateqr">
            {[
              {
                name: "medicine_name",
                label: translations[language].MedicineName,
                placeholder:
                  translations[language].enterVal +
                  translations[language].MedicineName +
                  translations[language].namudisi,
              },
              {
                name: "manufacture_date",
                label: translations[language].ManufactureDate,
                type: "date",
                placeholder:
                  translations[language].enterVal +
                  translations[language].ManufactureDateDate +
                  translations[language].namudisi,
              },
              {
                name: "expiry_date",
                label: translations[language].ExpiryDate,
                type: "date",
                placeholder:
                  translations[language].enterVal +
                  translations[language].ExpiryDate +
                  translations[language].namudisi,
              },
              {
                name: "batch_number",
                label: translations[language].BatchNumber,
                placeholder:
                  translations[language].enterVal +
                  translations[language].BatchNumber +
                  translations[language].namudisi,
              },
              {
                name: "manufacture_name",
                label: translations[language].ManufacturerName,
                placeholder:
                  translations[language].enterVal +
                  translations[language].ManufacturerName +
                  translations[language].namudisi,
              },
            ].map(({ name, label, type = "text", placeholder }) => (
              <div key={name}>
                <label className="form-label-generateqr">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="form-input-generateqr"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </form>

          {/* Generate QR Code Button */}
          <button
            onClick={handleGenerate}
            className="generate-button-generateqr"
          >
            {translations[language].GenerateQRBtn}
          </button>

          {/* Display QR code */}
          {qrCode && (
            <div className="qr-code-container-generateqr">
              <img
                src={qrCode}
                alt="Generated QR Code"
                className="qr-code-generateqr"
              />
              <button
                onClick={handleDownload}
                className="download-button-generateqr"
              >
                {translations[language].DownloadQRBtn}
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GenerateQR;
