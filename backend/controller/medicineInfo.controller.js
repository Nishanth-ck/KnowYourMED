import axios from "axios";
import Qr from "../model/qr.js";

const handleMedInfo = async (req, res) => {
  const name = req.params.name.trim(); // Ensure the name is trimmed

  try {
    // Request to OpenFDA API's drug/ndc endpoint
    // const response = await axios.get("https://api.fda.gov/drug/ndc.json", {
    const response = await axios.get("https://api.fda.gov/drug/label.json", {
      params: {
        search: `"${encodeURIComponent(name)}"`, // Encode the brand name
        limit: 1,
      },
    });

    // Check if data exists
    const medicine = response.data.results && response.data.results[0];

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Extract relevant data
    // const dosage = medicine.dosage_form || "No dosage information available";
    // const ageGroup = medicine.route || "No route information available";
    // const sideEffects =
    //   medicine.marketing_category ||
    //   "No marketing category information available";
    // console.log(medicine);

    const dosage = medicine.dosage_and_administration
      ? medicine.dosage_and_administration[0]
      : "No dosage information available";
    const ageGroup = medicine.pediatric_use
      ? medicine.pediatric_use[0]
      : "No specific age group information available";
    const sideEffects = medicine.warnings
      ? medicine.warnings[0]
      : "No side effects information available";

    // Return the results
    res.json({ dosage, ageGroup, sideEffects, medicine });
  } catch (error) {
    // Log the error and send response with 500
    console.error("Error fetching data from OpenFDA API:", error.message);
    res.status(500).json({
      message: "Error fetching data from OpenFDA API",
      error: error.message,
    });
  }
};

const handleMedRetrieve = async (req, res) => {
  const medId = req.params.medId;

  try {
    const result = await Qr.findById(medId);

    res.status(200).json({ message: "Done", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

export { handleMedInfo, handleMedRetrieve };
