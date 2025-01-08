import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "./maintain_pills.css"; // Custom CSS for background image

function MaintainPills() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [pillName, setPillName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [notify, setNotify] = useState(true);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [collectedTasks, setCollectedTasks] = useState([]); // Array for all tasks

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const addTask = () => {
    if (pillName.trim() === "" || dosage.trim() === "" || time.trim() === "") {
      toast.error("Please fill all the fields!");
      return;
    }

    const key = date.toDateString();
    const taskDetails = {
      pillName,
      dosage,
      time,
      notify,
    };

    // Check if task already exists for the selected date
    if ((tasks[key] || []).some((task) => task.pillName === pillName)) {
      toast.error("Task for this pill already exists on this date!");
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = {
        ...prevTasks,
        [key]: [...(prevTasks[key] || []), taskDetails],
      };
      return updatedTasks;
    });

    // Add to collectedTasks
    setCollectedTasks((prevCollected) => [
      ...prevCollected,
      { date: key, ...taskDetails },
    ]);

    setPillName("");
    setDosage("");
    setTime("");
    setNotify(true);
    toast.success("Task added successfully!");
  };

  const deleteTask = (taskIndex) => {
    const key = date.toDateString();
    setTasks((prevTasks) => {
      const updatedTasks = [...(prevTasks[key] || [])];
      updatedTasks.splice(taskIndex, 1);
      return { ...prevTasks, [key]: updatedTasks };
    });

    // Update collectedTasks
    setCollectedTasks((prevCollected) =>
      prevCollected.filter(
        (task) =>
          task.date !== key ||
          task.pillName !== (tasks[key] || [])[taskIndex]?.pillName
      )
    );

    toast.info("Task deleted!");
  };

  const startEditingTask = (index) => {
    setEditingTaskIndex(index);
    const task = tasks[date.toDateString()][index];
    setPillName(task.pillName);
    setDosage(task.dosage);
    setTime(task.time);
    setNotify(task.notify);
  };

  const saveEditedTask = () => {
    if (pillName.trim() === "" || dosage.trim() === "" || time.trim() === "") {
      toast.error("Please fill all the fields!");
      return;
    }

    const key = date.toDateString();
    setTasks((prevTasks) => {
      const updatedTasks = [...(prevTasks[key] || [])];
      updatedTasks[editingTaskIndex] = { pillName, dosage, time, notify };
      return { ...prevTasks, [key]: updatedTasks };
    });

    // Update collectedTasks
    setCollectedTasks((prevCollected) =>
      prevCollected.map((task) =>
        task.date === key &&
        task.pillName === (tasks[key] || [])[editingTaskIndex]?.pillName
          ? { date: key, pillName, dosage, time, notify }
          : task
      )
    );

    setEditingTaskIndex(null);
    setPillName("");
    setDosage("");
    setTime("");
    setNotify(true);
    toast.success("Task updated successfully!");
  };

  const cancelEditing = () => {
    setEditingTaskIndex(null);
    setPillName("");
    setDosage("");
    setTime("");
    setNotify(true);
  };

  const sendToBackend = () => {
    console.log("Collected Tasks for Backend:", collectedTasks);

    // Example backend API endpoint
    const backendUrl = "https://your-backend-api.com/submit-tasks"; // Replace with your backend API URL

    // Send collected tasks to the backend
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: collectedTasks }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Tasks submitted successfully!");
        } else {
          toast.error("Failed to submit tasks. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting tasks:", error);
        toast.error("An error occurred while submitting tasks.");
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

      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage: `url('/pill4.PNG')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="row py-5">
          <div className="col-md-6">
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="shadow rounded"
            />
          </div>

          <div className="col-md-6">
            <h3 style={{ color: "white", fontWeight: 900 }}>
              Tasks for {date.toDateString()}{" "}
            </h3>
            <ul className="list-group">
              {(tasks[date.toDateString()] || []).map((task, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {task.pillName} - {task.dosage} - {task.time}{" "}
                    {task.notify && <span>(Notify)</span>}
                  </span>
                  <div>
                    <button
                      onClick={() => startEditingTask(index)}
                      className="btn btn-warning btn-sm mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <div className="d-flex flex-row align-items-center mb-2">
                <input
                  type="text"
                  placeholder="Pill Name"
                  value={pillName}
                  onChange={(e) => setPillName(e.target.value)}
                  className="form-control me-2"
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="form-control me-2"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="d-flex align-items-center mb-2">
                <label
                  htmlFor="notifyCheckbox"
                  className="me-2"
                  style={{ color: "white" }}
                >
                  Notify
                </label>
                <input
                  type="checkbox"
                  checked={notify}
                  onChange={() => setNotify(!notify)}
                  id="notifyCheckbox"
                />
              </div>
              <button onClick={addTask} className="btn btn-primary mt-2">
                Add Task
              </button>

              {/* Submit Button on a new row */}
              <div className="mt-3">
                <button
                  onClick={sendToBackend}
                  className="btn btn-success w-100"
                >
                  Submit All Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      {/* Logo */}
      <div
        style={{
          position: "absolute",
          height: "150px",
          width: "150px",
          top: "10px",
          left: "10px",
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
              borderRadius: "50%",
            }}
          />
        </Link>
      </div>
    </div>
  );
}

export default MaintainPills;
