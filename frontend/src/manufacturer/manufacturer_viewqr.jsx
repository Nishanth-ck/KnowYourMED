import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/manufacturer_viewqr.css"; // Import your styles

function ManufacturerViewQR() {
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
      Titlelbl: "Previously Generated QRs",
      MedicineName: "Medicine Name",
      ExpiryDate: "Expiry Date",
      ManufactureDate: "Manufacture Date",
      BatchNumber: "Batch Number",
      ManufacturerName: "Manufacturer",
      DownloadQRBtn: "Download QR",
      LogoutToast: "You have been logged out",
      NoQRLbl: "No QR Codes have been generated yet...",
    },
    kn: {
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      Titlelbl: "ಪೂರ್ವದಲ್ಲಿ ರಚಿಸಲಾದ ಕ್ಯೂಆರ್‌ಗಳು",
      MedicineName: "ಔಷಧಿ ಹೆಸರು",
      ExpiryDate: "ಗಡುವು ದಿನಾಂಕ",
      ManufactureDate: "ತಯಾರಿಸಿದ ದಿನಾಂಕ",
      BatchNumber: "ಬ್ಯಾಚ್ ಸಂಖ್ಯೆ",
      ManufacturerName: "ತಯಾರಕರ ಹೆಸರು",
      DownloadQRBtn: "QR ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
      NoQRLbl: "ಇದುವರೆಗೆ ಯಾವುದೇ ಕ್ಯೂಆರ್ ಕೋಡ್ಗಳು ರಚಿಸಲ್ಪಟ್ಟಿಲ್ಲ...",
    },
  };

  const [qrData, setQrData] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      // Send POST request to fetch QR data for the userId
      fetch("http://localhost:3000/manufacture/generated-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }), // Send userId in the body
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the response to see its structure
          // if (Array.isArray(data)) {
          //   setQrData(data); // Set QR data if it's an array
          // } else {
          //   console.error("Received unexpected data structure:", data);
          // }
          setQrData(data?.value);
        })
        .catch((error) => {
          console.error("Failed to fetch QR data:", error);
        });
    }
  }, [userId]);

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
    <div className="manufacturer-viewqr-container">
      <div className="generateqr-manufacturer-navbar">
        {/* Logo */}
        <div className="nav-logo-container-manufacturerviewqr">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-manufacturerviewqr">
          <Link
            to="/manufacturer/home"
            className="nav-linkVal-container-manufacturerviewqr"
          >
            {translations[language].HomeNav}
          </Link>
          <Link
            to="/contactus"
            className="nav-linkVal-container-manufacturerviewqr"
          >
            {translations[language].ContactUsNav}
          </Link>
          <Link
            className="nav-linkVal-container-manufacturerviewqr"
            onClick={handleLogout}
          >
            {translations[language].LogOut}
          </Link>
        </div>
      </div>

      <div className="previous-qr-codes-container">
        {/* <h3 style={{ textAlign: "center", color: "white", fontWeight: "900" }}>
          Previously Generated QRs
        </h3> */}
        <p className="previous-generatedqr">
          {translations[language].Titlelbl}
        </p>
        <div className="row-generateqr">
          {qrData.length > 0 ? (
            qrData.map((qr, index) => (
              <div
                key={index}
                className="col-12 col-md-4 mb-4"
                style={{ width: "100%" }}
              >
                <div className="custom-card prev-gen-card">
                  <div className="card-body">
                    <h5
                      className="prev-gen-card-med-name"
                      style={{ color: "white" }}
                    >
                      {qr.medicine_name}
                    </h5>
                    <p className="prev-gen-card-text">
                      <strong>{translations[language].ExpiryDate}</strong>{" "}
                      {qr.expiry_date}
                    </p>
                    {/* card-text */}
                    <p className="prev-gen-card-text">
                      <strong>{translations[language].ManufactureDate}</strong>{" "}
                      {qr.manufacture_date}
                    </p>
                    <p className="prev-gen-card-text">
                      <strong>{translations[language].BatchNumber}</strong>{" "}
                      {qr.batch_number}
                    </p>
                    <p className="prev-gen-card-text">
                      <strong>{translations[language].ManufacturerName}</strong>{" "}
                      {qr.manufacture_name}
                    </p>
                    <a href={qr.qrCode} download>
                      <button
                        className="btn-info prev-gen-btn"
                        style={{ color: "white" }}
                      >
                        {translations[language].DownloadQRBtn}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "white" }}>{translations[language].NoQRLbl}</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManufacturerViewQR;
