import nodemailer from "nodemailer";
import cron from "node-cron";
import Pill from "../model/pill.js";
// import telesignsdk from "telesignsdk";

const handleUserNotify = async (req, res) => {
  const { email, userId } = req.body;
  let reminderTimes = [];
  try {
    const val = await Pill.find({ user: userId });

    if (!val) {
      return res
        .status(404)
        .json({ error: "User not found or no pill data available." });
    }

    console.log(val);
    reminderTimes = [val?.time1, val?.time2, val?.time3].filter(Boolean);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Try again later!" });
  }
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
        console.log("Error:", error);
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
      const endDate = new Date(val.date); // Assume this is in the database
      endDate.setDate(endDate.getDate() + val.duration); // e.g., 3 days or 7 days

      if (currentDate <= endDate) {
        console.log(`Sending email to ${user.email}...`);
        sendEmail();
      } else {
        console.log(`Stopping email job for ${user.email}, duration exceeded.`);
        job.stop(); // Stop the cron job
        // await updateJobStatus(user.userId, false); // Update job status in DB if needed
      }
    });
  });

  res.status(200).json({ message: "Notification scheduling initialized." });

  // users.forEach((user) => {
  //   user.reminderTimes.forEach((time) => {
  //     const [hour, minute] = time.split(":");
  //     const cronExpression = `${minute} ${hour} * * *`;

  //     // Schedule the cron job
  //     const job = cron.schedule(cronExpression, async () => {
  //       const currentDate = new Date();
  //       const endDate = new Date(user.startDate); // Assume this is in the database
  //       endDate.setDate(endDate.getDate() + user.duration); // e.g., 3 days or 7 days

  //       if (currentDate <= endDate) {
  //         console.log(`Sending email to ${user.email}...`);
  //         sendEmail(user.email);
  //       } else {
  //         console.log(
  //           `Stopping email job for ${user.email}, duration exceeded.`
  //         );
  //         job.stop(); // Stop the cron job
  //         // await updateJobStatus(user.userId, false); // Update job status in DB if needed
  //       }
  //     });
  //   });
  // });

  // res.status(200).json({ message: "Done" });
  // res.send("Notification scheduling initialized.");

  // // Schedule emails at 8 AM, 2 PM, and 8 PM
  // cron.schedule("0 8 * * *", () => {
  //   console.log("Sending email for 8 AM...");
  //   sendEmail();
  // });

  // cron.schedule("0 14 * * *", () => {
  //   console.log("Sending email for 2 PM...");
  //   sendEmail();
  // });

  // cron.schedule("0 20 * * *", () => {
  //   console.log("Sending email for 8 PM...");
  //   sendEmail();
  // });
};

// const smsController = async (req, res) => {
//   const { phone_num } = req.body;

//   const customerId = process.env.SMS_CUSTOMER_ID;
//   const apiKey = process.env.SMS_API_KEY;

//   const message = "Your Otp is : 1234";
//   const messageType = "OTP";

//   const client = new telesignsdk(customerId, apiKey);

//   function smsCallback(error, responseBody) {
//     if (error === null) {
//       res
//         .status(200)
//         .json({ message: "Success", data: JSON.stringify(responseBody) });
//     } else {
//       console.error("Unable to send SMS. Error:\n\n" + error);
//       res.status(500).json({ error: "Try again later!" });
//     }
//   }

//   client.sms.message(smsCallback, phone_num, message, messageType);
// };
// smsController;
export { handleUserNotify };
