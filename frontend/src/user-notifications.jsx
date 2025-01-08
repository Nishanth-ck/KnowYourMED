import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported correctly
import "./user-notifications.css"; // Include the new CSS file for styles

function UserNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Static sample data for demo purposes
    const sampleNotifications = [
      {
        id: 1,
        pillName: "Vitamin C",
        dosage: "500mg",
        time: "08:00 AM",
        notifybool: "true",
        message: "Take your Vitamin C for a boost in immunity.",
      },
      {
        id: 2,
        pillName: "Ibuprofen",
        dosage: "200mg",
        time: "02:00 PM",
        notifybool: "true",
        message: "Don't forget to take your Ibuprofen for pain relief.",
      },
      {
        id: 3,
        pillName: "Paracetamol",
        dosage: "500mg",
        time: "06:00 PM",
        notifybool: "false",
        message: "Reminder: Paracetamol for fever relief.",
      },
      {
        id: 4,
        pillName: "Aspirin",
        dosage: "100mg",
        time: "10:00 PM",
        notifybool: "false",
        message: "Aspirin is recommended for long-term pain management.",
      },
      {
        id: 5,
        pillName: "Vitamin D",
        dosage: "1000 IU",
        time: "07:00 AM",
        notifybool: "false",
        message: "Make sure to take your Vitamin D for bone health.",
      },
      {
        id: 6,
        pillName: "Zinc",
        dosage: "50mg",
        time: "01:00 PM",
        notifybool: "true",
        message: "Zinc is great for supporting the immune system.",
      },
    ];
    setNotifications(sampleNotifications);
  }, []);

  const handleDeleteButtonClick = (id) => {
    // Remove the notification with the given id from the array
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );

    // Show a toast success message
    toast.success("Notification deleted successfully!", {
      position: "top-right",
      autoClose: 3000, // Toast will disappear after 3 seconds
      hideProgressBar: true, // Hide the progress bar if not needed
      closeButton: true, // Optional: show close button
      pauseOnHover: true, // Pause on hover to keep toast visible
    });
  };

  const handleSubmit = () => {
    // Log the updated notifications array
    console.log("Updated notifications array:", notifications);

    // Send modified notifications array to backend
    fetch("YOUR_BACKEND_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notifications),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Notifications updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
            pauseOnHover: true,
          });
        } else {
          toast.error("Failed to update notifications.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
            pauseOnHover: true,
          });
        }
      })
      .catch((error) => {
        toast.error("An error occurred: " + error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div style={{ fontFamily: "Reem Kufi, sans-serif" }}>
      {/* Navbar */}
      <div
        style={{
          backgroundColor: "rgba(1, 14, 22, 0.7)",
          padding: "10px 30px",
          position: "fixed",
          width: "100%",
          height: "80px",
          top: 0,
          left: 0,
          zIndex: 500,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        className="navbar"
      >
        <Link
          to="/contactus"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "30px 50px",
            fontSize: "25px",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "yellow";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Contact Us
        </Link>
        <Link
          to="/aboutus"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "30px 50px",
            fontSize: "25px",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "yellow";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          About Us
        </Link>
        <Link
          to="/logout"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "30px 50px",
            fontSize: "25px",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "yellow";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Logout
        </Link>
      </div>

      {/* Main content */}
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage: `url('/pill4.PNG')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginTop: "80px",
        }}
      >
        <div className="container py-5">
          <h3
            style={{ color: "white", fontWeight: "900", textAlign: "center" }}
          >
            Notifications
          </h3>
          <div className="row">
            {notifications.map((notification) => (
              <div className="col-md-4 mb-3" key={notification.id}>
                <div className="card custom-card">
                  <div className="card-body">
                    <h5 className="card-title">{notification.pillName}</h5>
                    <p className="card-text">Dosage: {notification.dosage}</p>
                    <p className="card-text">Time: {notification.time}</p>
                    {/* Conditional rendering based on notifybool */}
                    <p className="card-text" style={{ fontStyle: "italic" }}>
                      {notification.notifybool === "true"
                        ? "You will be notified about this pill through your Gmail ID."
                        : "You will not be notified about this pill through your Gmail ID."}
                    </p>
                    {/* Delete Button */}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteButtonClick(notification.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Submit Button */}
          <div className="text-center mt-3">
            <button className="btn custom-submit-btn" onClick={handleSubmit}>
              Submit
            </button>
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

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          height: "130px",
          width: "130px",
          top: "10px",
          left: "1px",
          zIndex: 1000,
        }}
      >
        <Link to="/user/home">
          <img
            src="/kym-logo.jpeg"
            alt="KYM Logo"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "60%",
            }}
          />
        </Link>
      </div>
    </div>
  );
}

export default UserNotifications;
