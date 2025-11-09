const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { createOrder } = require("../controllers/orders");
const { getOrdersSummary } = require("../controllers/ordersSummary");

router.post("/", auth, createOrder);
router.get("/summary", getOrdersSummary);

module.exports = router;
