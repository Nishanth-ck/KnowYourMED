import nodemailer from "nodemailer";

const handleContactPage = async (req, res) => {
  const { name, email, message } = req.body;
  const information = {
    name: name,
    email: email,
    message: message,
  };
  const processedInfo = JSON.stringify(information);
  try {
    // Create the transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "webdevelepor001nishanth@gmail.com",
        pass: `${process.env.EMAIL_PASS}`,
      },
    });

    // Email options
    const mailOptions = {
      from: "webdevelepor001nishanth@gmail.com",
      to: "webdevelepor001nishanth@gmail.com",
      subject: "Feedback",
      text: `${processedInfo}`,
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

    sendEmail();

    res.status(200).json({ message: "Done" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export default handleContactPage;
