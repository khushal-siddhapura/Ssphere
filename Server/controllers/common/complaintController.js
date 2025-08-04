const { upload, imageUploadUtil } = require("../../helpers/cloudinary");
const Complaint = require("../../models/Complaint");
const Order = require("../../models/Order");
const mongoose = require("mongoose");

const submitComplaint = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);
    console.log("Received File:", req.file);

    const { complaintType, orderId, description, userEmail } = req.body;
    // Validate if orderId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID." });
    }

    // Check if order exists in the database
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(400).json({ message: "Order does not exist." });
    }

    // Check if the order has been delivered
    if (existingOrder.orderStatus !== "delivered") {
      return res.status(400).json({ message: "Order not delivered yet." });
    }

    if (!complaintType || !orderId || !description || !userEmail) {
      return res.status(400).json({ error: "All fields are required." });
    }

    let imageUrl = "";

    // Handle image upload if file is provided
    if (req.file) {
      console.log("Processing Image...");
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = `data:${req.file.mimetype};base64,${b64}`;
      const uploadResult = await imageUploadUtil(url);
      imageUrl = uploadResult.secure_url;
    }

    const complaint = new Complaint({
      complaintType,
      orderId,
      description,
      userEmail,
      defectImage: imageUrl,
    });

    await complaint.save();
    console.log("Complaint saved successfully!");

    res
      .status(201)
      .json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    console.error("Error during complaint submission:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to submit complaint" });
  }
};

module.exports = { submitComplaint };
