import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported correctly
import "./styles/view_notifications.css"; // Include the new CSS file for styles

function ViewNotifications() {
  const [notifications, setNotifications] = useState([]);
  const userId = sessionStorage.getItem("userId"); // Get userId from session

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

  return (
    <div style={{ fontFamily: "Reem Kufi, sans-serif" }}>
      {/* Navbar */}
      <div className="navbar">
        <Link to="/user/home" className="nav-link">
          Home
        </Link>
        <Link to="/contactus" className="nav-link">
          Contact Us
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </div>

      {/* Main content */}
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage: `url('../../../public/img4.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginTop: "80px",
        }}
      >
        <div className="container py-5">
          <h3
            style={{
              color: "white",
              fontWeight: "900",
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            Notifications
          </h3>
          <div className="row">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div className="col-md-4 mb-3" key={notification._id}>
                  {" "}
                  {/* Use _id if available */}
                  <div className="card custom-card">
                    <div className="card-body">
                      <h5 className="card-title">{notification.pill_name}</h5>
                      <p className="card-text">Dosage: {notification.dosage}</p>
                      <p className="card-text">
                        Time: {notification.time1 || "N/A"}
                      </p>
                      <p className="card-text">
                        Duration: {notification.duration} days
                      </p>
                      <p className="card-text">Date: {notification.date}</p>
                      {/* Conditional rendering based on notification value */}
                      <p className="card-text" style={{ fontStyle: "italic" }}>
                        {notification.notification
                          ? "You will be notified about this pill through your Gmail ID."
                          : "You will not be notified about this pill through your Gmail ID."}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>No notifications available</p>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Change position to top-center
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={true} // Hide the progress bar
        closeButton={true} // Show close button
        pauseOnHover={true} // Pause toast on hover
      />

      {/* <div className="logo-container">
        <img src="/logo3.jpg" alt="KYM Logo" />
      </div> */}
      <div className="logo-container-user-login">
        <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
      </div>
    </div>
  );
}

export default ViewNotifications;
