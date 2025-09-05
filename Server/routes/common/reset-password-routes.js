const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../../models/User");

const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL_ID,
    pass: process.env.SMTP_MAIL_PASS,
  },
});

// Forgot Password Endpoint
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("No user found with that email.");
  }

  // Generate a reset token and expiration time
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

  // Save the reset token and expiration to the database
  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  // Send the reset link via email
  const resetLink = `https://ssphere-e-commerce-company.vercel.app/auth/reset-password/${resetToken}`;

  const mailOptions = {
    from: "vivek@gmail.com",
    to: user.email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Password reset link sent to email.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("There was an error sending the email.");
  }
});

// Reset Password Endpoint
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find user by reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).send("Password successfully reset.");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Error resetting password.");
  }
});

module.exports = router;
