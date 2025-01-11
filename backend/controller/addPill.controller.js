import nodemailer from "nodemailer";
import cron from "node-cron";
import Pill from "../model/pill.js";

const handleUserNotify = async (
  timeOne,
  timeTwo,
  timeThree,
  date,
  duration,
  email
) => {
  const reminderTimes = [timeOne, timeTwo, timeThree].filter(Boolean);
  console.log(email);

  // Create the transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider
    auth: {
      user: "knowyourmed1@gmail.com",
      pass: process.env.EMAIL_PASS, // Use app passwords for Gmail if needed
    },
  });

  // Email options
  const mailOptions = {
    from: "knowyourmed1@gmail.com",
    to: `${email}`,
    subject: "Medicine Reminder",
    text: "This is a friendly reminder to take your medicines.",
  };

  // Function to send email
  const sendEmail = () => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error, email);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };

  reminderTimes.forEach((time) => {
    const [hour, minute] = time.split(":");
    const cronExpression = `${minute} ${hour} * * *`;

    // Schedule the cron job
    const job = cron.schedule(cronExpression, async () => {
      const currentDate = new Date();
      const endDate = new Date(date); // Assume this is in the database
      endDate.setDate(endDate.getDate() + duration); // e.g., 3 days or 7 days

      if (currentDate <= endDate) {
        console.log(`Sending email to ${email}...`);
        sendEmail();
      } else {
        console.log(`Stopping email job for ${email}, duration exceeded.`);
        job.stop(); // Stop the cron job
        // await updateJobStatus(user.userId, false); // Update job status in DB if needed
      }
    });
  });
};

const handleSavePill = async (req, res) => {
  const { pillName, dosage, times, duration, notify, date, userId, email } =
    req.body;
  console.log("from frontend: ", email);

  try {
    const timeOne = times[0] ? times[0] : "";
    const timeTwo = times[1] ? times[1] : "";
    const timeThree = times[2] ? times[2] : "";
    const newPill = await Pill.create({
      pill_name: pillName,
      dosage: dosage,
      time1: timeOne,
      time2: timeTwo,
      time3: timeThree,
      duration: duration,
      notification: notify,
      date: date,
      user: userId,
    });

    const result = await newPill.save();

    if (!result) {
      return res.status(500).json({ error: "Try again later" });
    }

    await handleUserNotify(timeOne, timeTwo, timeThree, date, duration, email);

    res.status(201).json({ message: "Done", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleGetPill = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  try {
    const value = await Pill.find({ user: userId });

    console.log(value);

    res.status(200).json({ message: "done", value });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export { handleSavePill, handleGetPill };
