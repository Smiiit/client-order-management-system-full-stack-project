const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.post("/", auth, createProduct);
router.get("/", auth, listProducts);
router.get("/:id", auth, getProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
