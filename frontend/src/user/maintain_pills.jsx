import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./styles/maintain_pills.css";

const MaintainPills = () => {
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
      PillName: "Pill Name",
      Dosage: "Dosage",
      TimeSlots: "Time slots (atlease one required)",
      Duration: "Duration (days)",
      NotifyMe: "Notify Me",
      AddTask: "Add Task",
      SubmitTask: "Submit All Tasks",
      TitleText: "Maintain Your Pills ",
      LogoutToast: "You have been logged out",
    },
    kn: {
      HomeNav: "ಹೋಮ್",
      ContactUsNav: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      LogOut: "ಲಾಗ್ ಔಟ್",
      PillName: "ಔಷಧಿಯ ಹೆಸರು",
      Dosage: "ಡೋಸೇಜ್",
      TimeSlots: "ಸಮಯ ಅವಧಿಗಳು (ಕನಿಷ್ಠ ಒಂದು ಅಗತ್ಯ)",
      Duration: "ಅವಧಿ (ದಿನಗಳು)",
      NotifyMe: "ನನಗೆ ಸೂಚಿಸಿ",
      AddTask: "ಕಾರ್ಯವನ್ನು ಸೇರಿಸಿ",
      SubmitTask: "ಎಲ್ಲಾ ಕಾರ್ಯಗಳನ್ನು ಸಲ್ಲಿಸಿ",
      TitleText: "ನಿಮ್ಮ ಔಷಧಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
      LogoutToast: "ನೀವು ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ",
    },
  };

  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [pillName, setPillName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");
  const [duration, setDuration] = useState("");
  const [notify, setNotify] = useState(true);
  const [collectedTasks, setCollectedTasks] = useState([]);

  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDateChange = (selectedDate) => setDate(selectedDate);

  const addTask = () => {
    if (!pillName.trim() || !dosage.trim() || !duration.trim()) {
      toast.error("Please fill in pill name, dosage, and duration!");
      return;
    }

    if (!time1 && !time2 && !time3) {
      toast.error("Please set at least one time slot!");
      return;
    }

    const userId = sessionStorage.getItem("userId");
    const email = sessionStorage.getItem("email");
    console.log(email);

    const key = date.toDateString();
    const taskDetails = {
      pillName,
      dosage,
      times: [time1, time2, time3].filter((time) => time !== ""),
      duration,
      notify,
      date: key,
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      userId: userId,
      email: email,
    };

    if ((tasks[key] || []).some((task) => task.pillName === pillName)) {
      toast.error("Task for this pill already exists on this date!");
      return;
    }

    setTasks((prevTasks) => ({
      ...prevTasks,
      [key]: [...(prevTasks[key] || []), taskDetails],
    }));

    setCollectedTasks((prevCollected) => [...prevCollected, taskDetails]);

    // Reset form
    setPillName("");
    setDosage("");
    setTime1("");
    setTime2("");
    setTime3("");
    setDuration("");
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

    setCollectedTasks((prevCollected) =>
      prevCollected.filter(
        (task) =>
          task.date !== key ||
          task.pillName !== (tasks[key] || [])[taskIndex]?.pillName
      )
    );

    toast.info("Task deleted!");
  };

  const sendToBackend = () => {
    console.log("Collected Tasks for Backend:", collectedTasks);

    const backendUrl = "http://localhost:3000/maintain/save-pill";

    const email = sessionStorage.getItem("email");

    collectedTasks.forEach((task) => {
      fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pillName: task.pillName,
          dosage: task.dosage,
          times: task.times,
          duration: task.duration,
          notify: task.notify,
          date: task.date,
          userId: task.userId,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Done") {
            toast.success(`Task for ${task.pillName} saved successfully!`);
          } else {
            toast.error("Failed to save task.");
          }
        })
        .catch((error) => {
          console.error("Error submitting tasks:", error);
        });
    });
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    setUsername(name || "User");
  }, []);

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
    <div className="maintain-pills-container">
      <div className="maintain-pills-navbar">
        {/* Logo */}
        <div className="nav-logo-container5">
          <img src={"/logo3.jpg"} alt="KYM Logo" />
        </div>
        <div className="nav-links-container-maintainpills">
          <Link to="/user/home" className="nav-linkVal-container-maintainpills">
            {translations[language].HomeNav}
          </Link>
          <Link to="/contactus" className="nav-linkVal-container-maintainpills">
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

      <div className="main-content-maintainpills">
        {/* Calendar on Left */}
        <div className="column1-maintainpills">
          <Calendar onChange={handleDateChange} value={date} />
        </div>

        {/* Form on Right */}
        <div className="column1-maintainpills">
          <h3 className="date-text-maintainpills">{date.toDateString()}</h3>
          <ul className="ul-maintainpills">
            {(tasks[date.toDateString()] || []).map((task, index) => (
              <li key={index}>
                <span>
                  {task.pillName} - {task.dosage}
                  <br />
                  Times: {task.times.join(", ")}
                  <br />
                  Duration: {task.duration} days
                  {task.notify && <span> (Notify)</span>}
                </span>
                <div>
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

          {/* Form Inputs */}
          <div className="mt-3">
            <input
              type="text"
              placeholder={translations[language].PillName}
              value={pillName}
              onChange={(e) => setPillName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder={translations[language].Dosage}
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="form-control mb-2"
            />
            <div className="mb-2">
              <label className="label-txt-maintainpills">
                {translations[language].TimeSlots}
              </label>
              <input
                type="time"
                value={time1}
                onChange={(e) => setTime1(e.target.value)}
                className="form-control mb-1"
                placeholder="Time 1 (Required)"
              />
              <input
                type="time"
                value={time2}
                onChange={(e) => setTime2(e.target.value)}
                className="form-control mb-1"
                placeholder="Time 2 (Optional)"
              />
              <input
                type="time"
                value={time3}
                onChange={(e) => setTime3(e.target.value)}
                className="form-control mb-1"
                placeholder="Time 3 (Optional)"
              />
            </div>
            <input
              type="number"
              placeholder={translations[language].Duration}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-control mb-2"
              min="1"
            />
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="notifyCheck"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
              />
              <label className="label-txt-maintainpills" htmlFor="notifyCheck">
                {translations[language].NotifyMe}
              </label>
            </div>
            <button onClick={addTask} className="btn btn-primary w-100">
              {translations[language].AddTask}
            </button>
            <button
              onClick={sendToBackend}
              className="btn btn-success w-100 mt-2"
            >
              {translations[language].SubmitTask}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MaintainPills;
