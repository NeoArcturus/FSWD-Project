const express = require("express");
const adminController = require("../adminController/auth");
const applicant = require("./form");

const router = express.Router();

router.use("/control", adminController);
router.use("/applications", applicant);

module.exports = router;
