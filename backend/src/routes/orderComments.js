const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createOrderComment,
  listOrderComments,
  getOrderComment,
  updateOrderComment,
  deleteOrderComment
} = require("../controllers/orderComments");

router.post("/", auth, createOrderComment);
router.get("/", auth, listOrderComments);
router.get("/:id", auth, getOrderComment);
router.put("/:id", auth, updateOrderComment);
router.delete("/:id", auth, deleteOrderComment);

module.exports = router;
