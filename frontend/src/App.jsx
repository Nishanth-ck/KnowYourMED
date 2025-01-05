import { useState } from "react";
import axios from "axios";
import MedicineInfo from "./component/medicineInfo/medicineInfo";

const App = () => {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate a QR code.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/generate-qr", {
        text,
      });
      setQrCode(response.data.qrCode); // QR Code as base64
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
    link.href = qrCode; // The Base64 string of the QR code
    link.download = "qrcode.png"; // File name for the download
    link.click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleGenerate} style={{ padding: "10px 20px" }}>
        Generate QR Code
      </button>
      <div style={{ marginTop: "20px" }}>
        {qrCode && (
          <>
            <img
              src={qrCode}
              alt="Generated QR Code"
              style={{
                width: "1cm",
                height: "1cm",
                border: "1px solid #ddd",
              }}
            />
            <br />
            <button
              onClick={handleDownload}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Download QR Code
            </button>
          </>
        )}
      </div>
      <MedicineInfo />
    </div>
  );
};

export default App;
