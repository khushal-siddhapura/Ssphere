const Complaint = require("../../models/Complaint");
const nodemailer = require("nodemailer");

// Fetch all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }); // Fetch latest complaints first
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
  }
};

// Fetch complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaint details", error: error.message });
  }
};

const responseComplaint = async (req, res) => {
  const { userEmail, complaintId, complaintType, description } = req.body;

  // Configure Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL_ID, 
      pass: process.env.SMTP_MAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL_ID,
    to: userEmail,
    subject: `Your Complaint (ID: ${complaintId}) - ${complaintType}`,
    html: `
      <h2>Complaint Details</h2>
      <p><strong>Complaint ID:</strong> ${complaintId}</p>
      <p><strong>Complaint Type:</strong> ${complaintType}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p>We have received your complaint and our team is working on it.We will resolve it soon.</p>
      <p>Best regards,</p>
      <p>Ssphere Support Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
    await Complaint.findByIdAndUpdate(complaintId, { status: "done" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
}

module.exports = { getAllComplaints, getComplaintById, responseComplaint };
