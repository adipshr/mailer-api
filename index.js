const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

const fromEmail = "havvnapp@gmail.com";
const emailPassword = "svfx nrpl hjql elpa";

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: fromEmail,
    pass: emailPassword,
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.query;
  const mailOptions = {
    from: fromEmail,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error.message);
      res.status(500).send("Error occurred while sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
