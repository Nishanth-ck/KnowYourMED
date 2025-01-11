import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./scan_url.css";

function ScanURL() {
  const { uniqueId } = useParams(); // Get uniqueId from the URL
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [error, setError] = useState("");

  // Fetch the medicine info from the backend
  useEffect(() => {
    const fetchMedicineInfo = async () => {
      try {
        // console.log("Fetching data for uniqueId:", uniqueId); // Debugging the uniqueId
        const response = await fetch(
          `http://localhost:3000/medicine/info/${uniqueId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Medicine Info:", data); // Debugging the data structure
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

  //   const parseMedicineInfo = (info) => {
  //     if (!info) return "No information available.";
  //     return `Medicine Name: ${info.result.medicine_name || "N/A"},
  //       Expiry Date: ${info.result.expiry_date || "N/A"},
  //       Manufacture Date: ${info.result.manufacture_date || "N/A"},
  //       Batch Number: ${info.result.batch_number || "N/A"},
  //       Manufacturer Name: ${info.result.manufacture_name || "N/A"}`;
  //   };

  console.log("Medicine Info State:", medicineInfo); // Debugging the state

  return (
    <div className="scan-container">
      {/* Navbar */}
      <div className="navbar">
        <Link to="/contactus" className="nav-link">
          Contact Us
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </div>

      {/* Logo */}
      <div className="logo-container-user-login">
        <Link to="/user/home">
          <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
        </Link>
      </div>

      {/* Main Content */}
      {error && <p className="error-text">{error}</p>}
      {medicineInfo ? (
        <div className="medicine-card">
          <h2 className="medicine-title">Medicine Information</h2>
          <div className="medicine-detail">
            <span className="detail-label">Medicine Name:</span>
            <span className="detail-value">
              {medicineInfo.result.medicine_name || "N/A"}
            </span>
          </div>
          <div className="medicine-detail">
            <span className="detail-label">Expiry Date:</span>
            <span className="detail-value">
              {medicineInfo.result.expiry_date || "N/A"}
            </span>
          </div>
          <div className="medicine-detail">
            <span className="detail-label">Manufacture Date:</span>
            <span className="detail-value">
              {medicineInfo.result.manufacture_date || "N/A"}
            </span>
          </div>
          <div className="medicine-detail">
            <span className="detail-label">Batch Number:</span>
            <span className="detail-value">
              {medicineInfo.result.batch_number || "N/A"}
            </span>
          </div>
          <div className="medicine-detail">
            <span className="detail-label">Manufacturer Name:</span>
            <span className="detail-value">
              {medicineInfo.result.manufacture_name || "N/A"}
            </span>
          </div>
        </div>
      ) : (
        !error && (
          <p className="loading-text">Loading medicine information...</p>
        )
      )}
    </div>
  );
}

export default ScanURL;
