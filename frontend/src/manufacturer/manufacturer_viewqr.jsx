import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/manufacturer_viewqr.css"; // Import your styles

function ManufacturerViewQR() {
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
          if (Array.isArray(data)) {
            setQrData(data); // Set QR data if it's an array
          } else {
            console.error("Received unexpected data structure:", data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch QR data:", error);
        });
    }
  }, [userId]);

  return (
    <div className="manufacturer-viewqr-container">
      {/* Navbar */}
      <div className="navbar-generated">
        <Link to="/manufacturer/home" className="nav-link">
          Home
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </div>

      <div className="previous-qr-codes-container">
        <h3 style={{ textAlign: "center", color: "white", fontWeight: "900" }}>
          Previously Generated QRs
        </h3>
        <div className="row">
          {qrData.length > 0 ? (
            qrData.map((qr, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="custom-card">
                  <div className="card-body">
                    <h5 className="card-title">{qr.medicineName}</h5>
                    <p className="card-text">
                      <strong>Expiry Date:</strong> {qr.expiryDate}
                    </p>
                    <p className="card-text">
                      <strong>Manufacture Date:</strong> {qr.manufactureDate}
                    </p>
                    <p className="card-text">
                      <strong>Batch Number:</strong> {qr.batchNumber}
                    </p>
                    <p className="card-text">
                      <strong>Manufacture Name:</strong> {qr.manufactureName}
                    </p>
                    <a href={qr.qrCodeUrl} download>
                      <button className="btn-info">Download QR</button>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "white" }}>No QR codes generated yet.</p>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="logo-container-user-login">
        <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
      </div>
    </div>
  );
}

export default ManufacturerViewQR;
