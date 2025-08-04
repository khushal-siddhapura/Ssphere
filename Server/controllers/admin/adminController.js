const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// Create Admin
const createAdmin = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingAdmin = await User.findOne({ email });
    const existingUserName = await User.findOne({ userName });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }
    else if (existingUserName) {
      return res
        .status(400)
        .json({ message: "Admin Username already exist" });
    }

    const newAdmin = new User({
      userName,
      email,
      password: hashedPassword,
      role: "admin",
      status: "active", // Default status for new admin
    });

    await newAdmin.save();

    // Return success response
    res.status(201).json({
      message: "Admin added successfully",
      admin: newAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Admins
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found." });
    }

    res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle Admin Status (Block/Unblock)
const toggleAdminStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expected status value ("active" or "blocked")

  try {
    const admin = await User.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update admin status
    admin.status = status;
    await admin.save();

    res.status(200).json({
      message: `Admin ${status === "active" ? "unblocked" : "blocked"} successfully`,
      admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const adminUpdate = async (req, res) => {
  const { id } = req.params;
  const { userName, email, password } = req.body;

  try {
    // Find the admin by ID and role
    const admin = await User.findOne({ _id: id, role: "admin" });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found or user is not an admin" });
    }

    if (userName && userName !== admin.userName) {
      const usernameExists = await User.findOne({ userName });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    if (email && email !== admin.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // If the password is provided, hash it before saving (optional)
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    // Update the admin's details
    admin.userName = userName || admin.userName;
    admin.email = email || admin.email;

    // Save the updated admin
    const updatedAdmin = await admin.save();

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createAdmin, getAdmins, toggleAdminStatus, adminUpdate };
