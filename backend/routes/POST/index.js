const express = require("express");

const auth = require("./auth");
const form = require("./form");

const router = express.Router();

router.use("/auth", auth);
router.use("/form", form);

module.exports = router;
