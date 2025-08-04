const express = require("express");
const router = express.Router();
const complaintController = require("../../controllers/common/complaintController");
const { upload } = require("../../helpers/cloudinary");
const { getAllComplaints, getComplaintById, responseComplaint } = require("../../controllers/admin/complaint-controller");

router.post("/", upload.single("defectImage"), complaintController.submitComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintById);
router.post("/send-complaint-email", responseComplaint);

module.exports = router;