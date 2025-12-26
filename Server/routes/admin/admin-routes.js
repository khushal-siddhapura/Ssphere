const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const adminController = require("../../controllers/admin/adminController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/addadmin",adminController.createAdmin);
router.get("/getadminsdetails", adminController.getAdmins);
router.put("/manageadmins/:id",adminController.toggleAdminStatus);
router.put("/updateadmin/:id",adminController.adminUpdate);

router.get("/check-auth", authMiddleware, (req, res,next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,

    
  });
});

module.exports = router;
