const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order",  
    required: true,
  },
  complaintType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  defectImage: {
    type: String, 
  },
  userEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done", "rejected"], 
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
