const express = require("express");
const auth = require("../../controllers/POST/auth");

const router = express.Router();
router.use("/authController", auth);

module.exports = router;
