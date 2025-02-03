import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported correctly
import "./styles/view_notifications.css"; // Include the new CSS file for styles

const ViewNotifications = () => {
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
      NotificationLbl: "'s Notifications",
      Dosage: "Dosage :",
      Time1: "Time 1 :",
      Time2: "Time 2 :",
      Time3: "Time 3 :",
      Duration: "Duration (in days) :",
      Date: "Date : ",
      NotifyMeYes: "You will be notified about this pill through your Email ID",
      NotifyMeNo: "You will not be notified about this pill",
      NoNotifications: "No Notifications are available.",
      LogoutToast: "You have been logged out",
    },
    kn: {
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      NotificationLbl: " ರವರ ಅಧಿಸೂಚನೆಗಳು",
      Dosage: "ಡೋಸೇಜ್ :",
      Time1: "ಸಮಯ 1 :",
      Time2: "ಸಮಯ 2 :",
      Time3: "ಸಮಯ 3 :",
      Duration: "ಅವಧಿ (ದಿನಗಳು) :",
      Date: "ದಿನಾಂಕ : ",
      NotifyMeYes: "ಈ ಮಾತ್ರೆಯನ್ನು ನಿಮ್ಮ ಇಮೇಲ್ ಐಡಿ ಮೂಲಕ ಅಧಿಸೂಚಿಸಲಾಗುತ್ತದೆ",
      NotifyMeNo: "ನೀವು ಈ ಔಷಧಿಗೆ ಅಧಿಸೂಚಿಸಲ್ಪಡುವುದಿಲ್ಲ",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
    },
  };

  const [notifications, setNotifications] = useState([]);
  const userId = sessionStorage.getItem("userId"); // Get userId from session
  const name = sessionStorage.getItem("userName");

  useEffect(() => {
    // Fetch notifications from the backend using POST with userId
    if (userId) {
      fetch("http://localhost:3000/maintain/get-pill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }), // Send userId in the body
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data); // Log the fetched data to check its structure

          if (Array.isArray(data.value)) {
            setNotifications(data.value); // Set notifications if it's an array
          } else {
            setNotifications([]); // Fallback to empty array if the data is not as expected
            toast.error("Invalid data format received!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: true,
              pauseOnHover: true,
            });
          }
        })
        .catch((error) => {
          toast.error("Failed to fetch notifications: " + error.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
            pauseOnHover: true,
          });
        });
    } else {
      toast.error("User ID not found in session.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
        pauseOnHover: true,
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
    <div className="view-user-notifications-container">
      {/* Navbar */}
      <div className="user-viewnotifications-navbar">
        {/* Logo */}
        <div className="nav-logo-container6">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-viewnotifications">
          <Link
            to="/user/home"
            className="nav-linkVal-container-viewnotifications"
          >
            {translations[language].HomeNav}
          </Link>
          <Link
            to="/contactus"
            className="nav-linkVal-container-viewnotifications"
          >
            {translations[language].ContactUsNav}
          </Link>
          <Link
            className="nav-linkVal-container-userhome"
            onClick={handleLogout}
          >
            {translations[language].LogOut}
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container py-5">
          <h3 className="h3-style-viewnotifications">
            {name}
            {translations[language].NotificationLbl}
          </h3>
          <div className="row">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div className="col-md-4 mb-3" key={notification._id}>
                  {" "}
                  {/* Use _id if available */}
                  <div className="card custom-card-viewnotifications">
                    <h5 className="card-title-viewnotifications">
                      {notification.pill_name}
                    </h5>
                    <p className="card-text-viewnotifications">
                      {translations[language].Dosage} {notification.dosage}
                    </p>
                    <p className="card-text-viewnotifications">
                      {translations[language].Time1}{" "}
                      {notification.time1 || "N/A"}
                    </p>
                    <p className="card-text-viewnotifications">
                      {translations[language].Time2}{" "}
                      {notification.time2 || "N/A"}
                    </p>
                    <p className="card-text-viewnotifications">
                      {translations[language].Time3}{" "}
                      {notification.time3 || "N/A"}
                    </p>
                    <p className="card-text-viewnotifications">
                      {translations[language].Duration}
                      {notification.duration}
                    </p>
                    <p className="card-text-viewnotifications">
                      {translations[language].Date} {notification.date}
                    </p>
                    {/* Conditional rendering based on notification value */}
                    <p
                      className="card-text-viewnotifications"
                      style={{
                        fontStyle: "italic",
                        color: notification.notification
                          ? "lightgreen"
                          : "lightcoral",
                      }}
                    >
                      {notification.notification
                        ? translations[language].NotifyMeYes
                        : translations[language].NotifyMeNo}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>
                {translations[language].NoNotifications}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ViewNotifications;
