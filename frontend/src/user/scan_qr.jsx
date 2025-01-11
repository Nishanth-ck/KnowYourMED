import { useState } from "react";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";
import { Link } from "react-router-dom";
import "./scanQR.css";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [url, setUrl] = useState("");
  const [url1, setUrl1] = useState("");

  const handleScan = (result) => {
    if (result) {
      setScanResult(result.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImageSrc(img.src);
          detectQRCode(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const detectQRCode = (img) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
      setImageResult(code.data);
      setUrl(code.data);

      // Regular expression to match the URL
      const urlRegex = /(http[s]?:\/\/[^\s]+)/;

      // Extracting the URL
      const match = url.match(urlRegex);
      const url2 = match ? match[0] : null;
      setUrl1(url2);
    } else {
      setImageResult("No QR code found in the image");
    }
  };

  return (
    <div className="scanner-container">
      <div className="logo-container-user-login ">
        <Link to="/user/home">
          <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
        </Link>
      </div>
      {/* Navbar */}
      <div className="navbar">
        <Link to="/contactus" className="nav-link">
          Contact Us
        </Link>
        <Link to="/" className="nav-link">
          Logout
        </Link>
      </div>
      <h1>QR CODE SCANNING USING CAMERA AND THROUGH IMAGE UPLOADING</h1>
      <div className="scanner-card">
        <h2>Scan QR Code with Camera</h2>
        <QrReader
          onResult={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
        />
        {scanResult && <p>Scanned Result: {scanResult}</p>}
      </div>

      <div className="scanner-card">
        <h2>Upload QR Code Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        {imageSrc && (
          <div>
            <h4>Uploaded Image Preview</h4>
            <img
              src={imageSrc}
              alt="Uploaded QR Code"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
      </div>

      {/* Info Box with Navigation */}
      {/* Info Box with Navigation */}
      {imageResult && (
        <div className="info-box">
          <h2>QR Code Information</h2>
          <p>{imageResult}</p>
          <a href={url1} target="_blank" rel="noopener noreferrer">
            <button className="goto-button">Open URL</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
