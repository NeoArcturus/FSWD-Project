const express = require("express");
const profileControl = require("../../controllers/POST/profile");

const router = express.Router();

router.use("/profile", profileControl);

module.exports = router;
