const express = require("express")
const {protect} = require("../middleware/authMiddleware");
const {getDashboardData} = require("../controllers/dashbordController");

const router = express.Router();

router.get("/", protect, getDashboardData)

module.exports = router;