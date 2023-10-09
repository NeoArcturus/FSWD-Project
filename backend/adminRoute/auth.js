const express = require("express");
const adminController = require("../adminController/auth");

const router = express.Router();

router.use("/control", adminController);

module.exports = router;
