const express = require("express");
const { getCategorySales } = require("../../controllers/admin/salesCategory");


const router = express.Router();

router.get("/",getCategorySales);


module.exports = router;