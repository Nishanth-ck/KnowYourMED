import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./styles/maintain_pills.css";

function MaintainPills() {
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
  const [translations, setTranslations] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Fetch translations
  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("language", selectedLanguage);
    fetchTranslations();
  }, [selectedLanguage]);

  const fetchTranslations = async () => {
    const wordsToTranslate = [
      "Home",
      "Contact Us",
      "Logout",
      "Pill Name",
      "Dosage",
      "Time Slots",
      "Duration",
      "Notify me",
      "Add Task",
      "Submit All Tasks",
      "Task deleted!",
      "Task added successfully!",
      "Please fill in pill name, dosage, and duration!",
      "Please set at least one time slot!",
      "Task for this pill already exists on this date!",
    ];

    const translatedTexts = {};
    for (const word of wordsToTranslate) {
      try {
        const response = await fetch("http://localhost:3000/translate/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: word,
            language: selectedLanguage,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          let translatedWord = result.translatedText;
          if (translatedWord.includes("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ")) {
            translatedWord = translatedWord
              .replace("ಇದನ್ನು ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ", "")
              .trim();
          }
          translatedTexts[word] = translatedWord;
        } else {
          console.error(`Translation failed for word: ${word}`);
        }
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    }

    setTranslations(translatedTexts);
  };

  // const handleLanguageChange = (e) => {
  //   setSelectedLanguage(e.target.value);
  // };

  const handleDateChange = (selectedDate) => setDate(selectedDate);

  const addTask = () => {
    if (!pillName.trim() || !dosage.trim() || !duration.trim()) {
      toast.error(
        translations["Please fill in pill name, dosage, and duration!"] ||
          "Please fill in pill name, dosage, and duration!"
      );
      return;
    }

    if (!time1 && !time2 && !time3) {
      toast.error(
        translations["Please set at least one time slot!"] ||
          "Please set at least one time slot!"
      );
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
      toast.error(
        translations["Task for this pill already exists on this date!"] ||
          "Task for this pill already exists on this date!"
      );
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
    toast.success(
      translations["Task added successfully!"] || "Task added successfully!"
    );
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

    toast.info(translations["Task deleted!"] || "Task deleted!");
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

  return (
    <div className="maintain-pills-container">
      {/* Language Selector */}
      {/* <div className="language-selector">
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="kn">Kannada</option>
        </select>
      </div> */}

      <div className="navbar">
        <Link to="/user/home" className="nav-link">
          {translations["Home"] || "Home"}
        </Link>
        <Link to="/contactus" className="nav-link">
          {translations["Contact Us"] || "Contact Us"}
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </div>

      <div className="main-content">
        {/* Calendar on Left */}
        <div className="col-md-6">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="shadow rounded calendar-dark"
          />
        </div>

        {/* Form on Right */}
        <div className="col-md-6">
          <h3 className="text-white font-extrabold">{date.toDateString()}</h3>
          <ul className="list-group">
            {(tasks[date.toDateString()] || []).map((task, index) => (
              <li
                key={index}
                // className="list-group-item d-flex justify-content-between align-items-center"
              >
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
              placeholder={translations["Pill Name"] || "Pill Name"}
              value={pillName}
              onChange={(e) => setPillName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder={translations["Dosage"] || "Dosage"}
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="form-control mb-2"
            />
            <div className="mb-2">
              <label className="text-white mb-1">
                {translations["Time Slots"] || "Time Slots"} (at least one
                required)
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
              placeholder={translations["Duration"] || "Duration (days)"}
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
              <label
                className="form-check-label text-white"
                htmlFor="notifyCheck"
              >
                {translations["Notify me"] || "Notify me"}
              </label>
            </div>
            <button onClick={addTask} className="btn btn-primary w-100">
              {translations["Add Task"] || "Add Task"}
            </button>
            <button
              onClick={sendToBackend}
              className="btn btn-success w-100 mt-2"
            >
              {translations["Submit All Tasks"] || "Submit All Tasks"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
      <div className="logo-container-user-login">
        <img src="/logo3.jpg" alt="KYM Logo" className="logo-user-page" />
      </div>
    </div>
  );
}

export default MaintainPills;
