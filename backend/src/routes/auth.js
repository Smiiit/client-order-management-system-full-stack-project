const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.post(
  "/register",
  [
    body("name").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  authCtrl.register
);

router.post("/login", authCtrl.login);
router.post("/refresh", authCtrl.refresh);
router.post("/logout", authCtrl.logout);

module.exports = router;
