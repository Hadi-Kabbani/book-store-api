const nodemailer = require("nodemailer");
const apiError = require("../utils/apiError");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const getPasswordResetEmailDesign = (resetUrl) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 {
      color: #007bff;
      margin-bottom: 20px;
      font-size: 24px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      margin: 0 0 20px 0;
    }
    .button {
      display: inline-block;
      padding: 15px 30px;
      font-size: 16px;
      color: #ffffff;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      font-size: 14px;
      color: #888;
      margin-top: 20px;
    }
    @media only screen and (max-width: 600px) {
      .container {
        padding: 15px;
      }
      .button {
        padding: 12px 20px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Reset Request</h1>
    <p>Hello,</p>
    <p>You requested a password reset. Click the button below to reset your password:</p>
    <a href="${resetUrl}" class="button">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
    <div class="footer">
      <p>Best regards,<br>Your Company Name</p>
    </div>
  </div>
</body>
</html>
`;


// Function to send a password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:3000/auth/reset-password/reset/${resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: getPasswordResetEmailDesign(resetUrl),
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new apiError("Failed to send password reset email", 500);
  }
};


const getVerificationCodeEmailDesign = (code) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 {
      color: #007bff;
      margin-bottom: 20px;
      font-size: 24px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      margin: 0 0 20px 0;
    }
    .code {
      display: inline-block;
      padding: 15px 20px;
      font-size: 24px;
      color: #ffffff;
      background-color: #007bff;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
    }
    .footer {
      font-size: 14px;
      color: #888;
      margin-top: 20px;
    }
    @media only screen and (max-width: 600px) {
      .container {
        padding: 15px;
      }
      .code {
        padding: 10px;
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Verification Code</h1>
    <p>Hello,</p>
    <p>Here is your verification code:</p>
    <div class="code">${code}</div>
    <p>Use this code to verify your account. If you did not request this, please ignore this email.</p>
    <div class="footer">
      <p>Best regards,<br>Your Company Name</p>
    </div>
  </div>
</body>
</html>
`;


// Function to send a verification code email
const sendVerificationCodeEmail = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    html: getVerificationCodeEmailDesign(code),
  };
  console.log(code);
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new apiError("Failed to send verification code", 500);
  }
};

module.exports = { sendPasswordResetEmail, sendVerificationCodeEmail };
