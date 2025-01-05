import axios from "axios";
import { useState } from "react";

function MedicineInfo() {
  const [medicineName, setMedicineName] = useState("");
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setMedicineName(e.target.value);
  };

  const fetchMedicineDetails = async () => {
    try {
      // Fetch medicine details from backend API
      const response = await axios.get(
        `http://localhost:3000/medicine/${medicineName}`
      );
      console.log(response.data?.medicine);
      // Set state for successful data response
      setMedicineDetails(response.data);
      setError(null); // Clear error on success
    } catch (err) {
      // Handle errors (including 404 and 500)
      console.error("Error fetching medicine details:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching medicine details."
      );
      setMedicineDetails(null); // Clear previous data if error occurs
    }
  };

  return (
    <div className="App">
      <h1>Medicine Information Search</h1>
      <input
        type="text"
        placeholder="Enter medicine name (e.g., Paracetamol)"
        value={medicineName}
        onChange={handleInputChange}
      />
      <button onClick={fetchMedicineDetails}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {medicineDetails && (
        <div>
          <h2>
            Details for{" "}
            {medicineName.charAt(0).toUpperCase() + medicineName.slice(1)}
          </h2>
          <p>
            <strong>Dosage Form:</strong> {medicineDetails.dosage}
          </p>
          <p>
            <strong>AgeGroup:</strong> {medicineDetails.ageGroup}
          </p>
          <p>
            <strong>SideEffects:</strong> {medicineDetails.sideEffects}
          </p>
          {/* {medicineDetails.medicine} */}
        </div>
      )}
    </div>
  );
}

export default MedicineInfo;
