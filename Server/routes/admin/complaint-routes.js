const express = require("express");
const { getAllComplaints, getComplaintById, responseComplaint } = require("../../controllers/admin/complaint-controller");
const { submitComplaint } = require("../../controllers/common/complaintController");

const router = express.Router();

router.post("/complaints", upload.single("defectImage"), submitComplaint);

// Get all complaints
router.get("/complaints", getAllComplaints);

// Get a single complaint by ID
router.get("/complaints/:id", getComplaintById);

module.exports = router;
