const express = require("express");
const topProducts = require("../../controllers/admin/topProductsData");

const router = express.Router();

router.get("/",topProducts);

module.exports = router;