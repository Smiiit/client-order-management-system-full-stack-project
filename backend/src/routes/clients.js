const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createClient,
  listClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clients");

router.post("/", auth, createClient);
router.get("/", auth, listClients);
router.get("/:id", auth, getClient);
router.put("/:id", auth, updateClient);
router.delete("/:id", auth, deleteClient);

module.exports = router;
