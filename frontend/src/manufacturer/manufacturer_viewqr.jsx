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

  return (
    <div className="manufacturer-viewqr-container">
      {/* Navbar */}
      <div className="navbar-generated">
        <Link
          to="/manufacturer/home"
          className="nav-link"
          style={{ color: "white" }}
        >
          Home
        </Link>
        <Link to="/logout" className="nav-link" style={{ color: "white" }}>
          Logout
        </Link>
      </div>

      <div className="previous-qr-codes-container">
        {/* <h3 style={{ textAlign: "center", color: "white", fontWeight: "900" }}>
          Previously Generated QRs
        </h3> */}
        <p className="previous-gen">Previously Generated QRs</p>
        <div className="row">
          {qrData.length > 0 ? (
            qrData.map((qr, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="custom-card prev-gen-card">
                  <div className="card-body">
                    <h5 className="prev-gen-card-med-name">
                      {qr.medicine_name}
                    </h5>
                    <p className="prev-gen-card-text">
                      <strong>Expiry Date:</strong> {qr.expiry_date}
                    </p>
                    {/* card-text */}
                    <p className="prev-gen-card-text">
                      <strong>Manufacture Date:</strong> {qr.manufacture_date}
                    </p>
                    <p className="prev-gen-card-text">
                      <strong>Batch Number:</strong> {qr.batch_number}
                    </p>
                    <p className="prev-gen-card-text">
                      <strong>Manufacture Name:</strong> {qr.manufacture_name}
                    </p>
                    <a href={qr.qrCode} download>
                      <button className="btn-info prev-gen-btn">
                        Download QR
                      </button>
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
