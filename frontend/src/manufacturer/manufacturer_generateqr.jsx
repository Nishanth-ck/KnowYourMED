import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/manufacturer_generateqr.css"; // Import the CSS file

const GenerateQR = () => {
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
      alert("Please fill in all fields to generate a QR code.");
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
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Error generating QR Code:", error);
      alert("Failed to generate QR code. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!qrCode) {
      alert("Please generate a QR code first.");
      return;
    }

    const link = document.createElement("a");
    link.href = qrCode; // The QR code data URL
    link.download = "qrcode.png"; // The name of the downloaded file
    link.click();
  };

  return (
    <div className="qr-code-generator-container">
      {/* Navbar */}
      <div className="navbar">
        <Link to="/contactus" className="nav-link">
          Contact Us
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          <h1 className="title">Generate QR Code</h1>

          {/* Form for QR Code Generation */}
          <form className="form-container">
            {[
              { name: "medicine_name", label: "Medicine Name" },
              { name: "expiry_date", label: "Expiry Date", type: "date" },
              {
                name: "manufacture_date",
                label: "Manufacture Date",
                type: "date",
              },
              { name: "batch_number", label: "Batch Number" },
              { name: "manufacture_name", label: "Manufacturer Name" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            ))}
          </form>

          {/* Generate QR Code Button */}
          <button onClick={handleGenerate} className="generate-button">
            Generate QR Code
          </button>

          {/* Display QR code */}
          {qrCode && (
            <div className="qr-code-container">
              <img src={qrCode} alt="Generated QR Code" className="qr-code" />
              <button onClick={handleDownload} className="download-button">
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="logo-container-user-login">
        <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
      </div>
    </div>
  );
};

export default GenerateQR;
