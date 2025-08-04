const express = require("express");
const userController= require("../../controllers/common/userController");

const router = express.Router();

router.get('/users', userController.fetchAllUser );
router.put('/users/:userId/status', userController.updateUserStatus);

module.exports = router;