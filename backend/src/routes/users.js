const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, usersCtrl.createUser); // create user (admin)
router.get("/", authenticate, usersCtrl.listUsers); // list users
router.get("/:id", authenticate, usersCtrl.getUser); // get single
router.put("/:id", authenticate, usersCtrl.updateUser); // update
router.delete("/:id", authenticate, usersCtrl.deleteUser); // soft delete

module.exports = router;
