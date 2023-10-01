const express = require("express");

const auth = require("./auth");
const form = require("./form");
const app = require("./app");

const router = express.Router();

router.use("/auth", auth);
router.use("/form", form);
router.use("/profile", app);

module.exports = router;
