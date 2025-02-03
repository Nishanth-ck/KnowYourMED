import React, { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/scan_qr.css";

const QRCodeScanner = () => {
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
      HeadingLbl: "QR SCANNING USING CAMERA AND THROUGH IMAGE UPLOADING",
      CameraLbl: "Scan QR Code with Camera :",
      UploadLbl: "Upload QR Code Image :",
      UploadPreview: "Uploaded Image Preview",
      QRInfo: "QR Code Information",
      OpenUrl: "Open URL",
      CameraResult: "Scanned Result",
      LogoutToast: "You have been logged out",
    },
    kn: {
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      HeadingLbl: "ಕ್ಯಾಮೆರಾ ಮತ್ತು ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮೂಲಕ QR ಸ್ಕ್ಯಾನಿಂಗ್",
      CameraLbl: "ಕ್ಯಾಮೆರಾದೊಂದಿಗೆ QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ:",
      UploadLbl: "QR ಕೋಡ್ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
      UploadPreview: "ಅಪ್ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರದ ಪೂರ್ವವೀಕ್ಷಣೆ",
      QRInfo: "QR ಕೋಡ್ ಮಾಹಿತಿ",
      OpenUrl: "URL ತೆರೆಯಿರಿ",
      CameraResult: "ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ಫಲಿತಾಂಶ",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
    },
  };

  const [scanResult, setScanResult] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [url, setUrl] = useState("");
  const [url1, setUrl1] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start camera and scanning QR codes from video stream
  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      // Start scanning once the video plays
      videoRef.current.addEventListener("play", () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const scan = () => {
          if (videoRef.current.paused || videoRef.current.ended) return;

          // Draw the video frame on the canvas
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            setScanResult(code.data);
            setImageResult(code.data);
            const urlRegex = /(http[s]?:\/\/[^\s]+)/;
            const match = code.data.match(urlRegex); // Use code.data, not url
            const url2 = match ? match[0] : null;
            setUrl1(url2);
            // setUrl1(code.data);
          } else {
            requestAnimationFrame(scan); // Keep scanning
          }
        };

        scan(); // Start scanning loop
      });
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle image upload and QR code detection from the image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          setImageSrc(img.src);
          detectQRCode(img); // Call QR code detection after image is loaded
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Detect QR code in the uploaded image
  const detectQRCode = (img) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the canvas size based on the image size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image on the canvas
    context.drawImage(img, 0, 0, img.width, img.height);

    // Get image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Scan for QR code
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
      setImageResult(code.data);
      setUrl(code.data);

      // Regular expression to match URLs
      const urlRegex = /(http[s]?:\/\/[^\s]+)/;
      const match = code.data.match(urlRegex); // Use code.data, not url
      const url2 = match ? match[0] : null;
      setUrl1(url2);
    } else {
      setImageResult("No QR code found in the image");
    }
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
    <div className="scanqr-container">
      <div className="scanqr-navbar">
        {/* Logo */}
        <div className="nav-logo-container8">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-scanqr">
          <Link to="/user/home" className="nav-linkVal-container-scanqr">
            {translations[language].HomeNav}
          </Link>
          <Link to="/contactus" className="nav-linkVal-container-scanqr">
            {translations[language].ContactUsNav}
          </Link>
          <Link className="nav-linkVal-container-scanqr" onClick={handleLogout}>
            {translations[language].LogOut}
          </Link>
        </div>
      </div>
      <h1 className="h1-scanqr">{translations[language].HeadingLbl}</h1>

      {/* Camera Scanner */}
      <div className="scanner-card">
        <h2 className="h2-scanqr">{translations[language].CameraLbl}</h2>
        <video ref={videoRef} width="100%" height="auto" />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {scanResult && <p>Scanned Result: {scanResult}</p>}
      </div>

      {/* Image Upload Scanner */}
      <div className="scanner-card">
        <h2 className="h2-scanqr">{translations[language].UploadLbl}</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        {imageSrc && (
          <div>
            <h4 className="h4-scanqr">
              {translations[language].UploadPreview}
            </h4>
            <img
              src={imageSrc}
              alt="Uploaded QR Code"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
      </div>

      {/* Info Box with Navigation */}
      {imageResult && (
        <div className="info-box-scanqr">
          <h2 className="h2-scanqr">{translations[language].QRInfo}</h2>
          <p>{imageResult}</p>
          {url1 && (
            <a href={url1} target="_blank" rel="noopener noreferrer">
              <button className="goto-button-scanqr">
                {translations[language].OpenUrl}
              </button>
            </a>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default QRCodeScanner;
